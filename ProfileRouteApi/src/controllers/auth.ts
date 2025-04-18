import { RequestHandler } from "express";

import jwt from "jsonwebtoken";

import { CreateUser, VerifyEmailReqeuest } from "#/@types/user";
import User from "#/models/user";
import { formatProfile, generateToken } from "#/utils/helper";
import { sendForgetPasswordLink, sendPassResetSuccessEmail, sendVerificationMail } from "#/utils/mail";
import EmailVerificationToken from "#/models/emailVerificationToken";
import { isValidObjectId } from "mongoose";
import passwordResetToken from "#/models/passwordResetToken";
import cloudinary from "#/cloud";
import crypto from "crypto";
import { JWT_SECRET, PASSWORD_RESET_LINK } from "#/utils/variables";
import formidable from "formidable";
import { url } from "inspector";
import { RequestWithFiles } from "#/middleware/fileParser";

export const create: RequestHandler = async (req: CreateUser, res) => {

    const { name, email, password } = req.body;





    const user = await User.create({ name, email, password });
    //send verification email

    const token = generateToken();
    await EmailVerificationToken.create({
        owner: user._id,
        token: token
    })
    sendVerificationMail(token, { name, email, userId: user._id.toString() });



    res.status(201).json({ user: { id: user._id, name, email } });




}



export const verifyEmail: RequestHandler = async (req: VerifyEmailReqeuest, res) => {

    const { token, userId } = req.body;

    const verificationToken = await EmailVerificationToken.findOne({ owner: userId });

    if (!verificationToken) {
        res.status(403).json({ error: "Invalid token" });
        return;
    };

    const matched = await verificationToken.compareToken(token);

    if (!matched) {
        res.status(403).json({ error: "Invalid token" });
        return;
    };

    await User.findByIdAndUpdate(userId, {
        verified: true
    });

    await EmailVerificationToken.findByIdAndDelete(verificationToken._id);
    res.status(200).json({ message: "Email verified" });

};


export const sendReVerificationToken: RequestHandler = async (req, res) => {

    const { userId } = req.body;

    if (!isValidObjectId(userId)) {
        res.status(403).json({ error: "Invalid user id" });
        return;
    };

    const user = await User.findById(userId)
    if (!user) {
        res.status(403).json({ error: "User not found and invalid request" });
        return;
    };


    await EmailVerificationToken.findOneAndDelete({ owner: userId });

    const token = generateToken();
    await EmailVerificationToken.create({ owner: userId, token });

    sendVerificationMail(token, {
        name: user?.name,
        email: user?.email,
        userId: user?._id.toString()
    })

    res.status(200).json({ message: "Verification email sent check your mail" });

};


export const generateForgetPasswordLink: RequestHandler = async (req, res) => {

    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    };

    //generate Link

    await passwordResetToken.findOneAndDelete({ owner: user._id });


    const token = crypto.randomBytes(36).toString("hex");


    await passwordResetToken.create({
        owner: user._id,
        token

    })

    const resetLink = `${PASSWORD_RESET_LINK}?token=${token}&userId=${user._id}`;

    sendForgetPasswordLink({ email: user.email, link: resetLink });

    res.status(200).json({ Message: "Reset link generated check your mail" });

};




export const grantValid: RequestHandler = async (req, res) => {

    res.status(200).json({ message: "Token is valid" });
};


export const updatePassword: RequestHandler = async (req, res) => {


    const { password, userId } = req.body;


    const user = await User.findById(userId);

    if (!user) {
        res.status(403).json({ error: "User not found" });
        return;
    }
    const matched = await user.comparePassword(password);

    if (matched) {
        res.status(422).json({ error: "New password should not be same as old password" });
        return;
    }

    user.password = password;
    await user.save();

    //dleting the previous token
    await passwordResetToken.findOneAndDelete({ owner: userId });


    //send success email

    sendPassResetSuccessEmail(user.name, user.email);
    res.status(200).json({ message: "Password updated successfully" });


};



export const signIn: RequestHandler = async (req, res) => {


    const { password, email } = req.body;



    const user = await User.findOne({ email });
    if (!user) {
        res.status(403).json({ error: "User not found" });
        return;
    }

    //comparing the password
    const matched = await user.comparePassword(password);
    if (!matched) {
        res.status(403).json({ error: "Invalid password" });
        return;
    }

    //generating token


    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    user.tokens.push(token);
    await user.save();

    res.json({ profile: { id: user._id, name: user.name, email: user.email, verified: user.verified, avatar: user.avatar?.url, followers: user.followers.length, followings: user.followings.length }, token });





};


export const updateProfile: RequestHandler = async (req: RequestWithFiles, res) => {
    const { name } = req.body;
    const avatar = req.files?.avatar as formidable.File;


    const user = await User.findById(req.user.id);
    if (!user) {
        throw new Error("something went wrong, user not found")

    }

    if (typeof name !== "string") {
        throw new Error("Name must be a string")
    }

    if (name.trim().length < 3) {
        throw new Error("Name must be at least 3 characters")
    }

    user.name = name;

    if (avatar) {


        if (user.avatar?.publicId) {
            await cloudinary.uploader.destroy(user.avatar?.publicId);
        }

        const { secure_url, public_id } = await cloudinary.uploader.upload(avatar.filepath, {
            width: 300,
            height: 300,
            crop: "thumb",
            gravity: "face"

        })

        user.avatar = { url: secure_url, publicId: public_id };



    }

    await user.save();

    res.json({ profile: formatProfile(user) });







};



export const sendProfile: RequestHandler = async (req, res) => {
    res.json({ profile: req.user });
}
export const logOut: RequestHandler = async (req, res) => {
    //one is simple log out
    //other is log out from all devices

    const { fromAll } = req.query
    const token = req.token;
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(403).json({ error: "User not found" });
        return;
    }
    //log out from all

    if (fromAll === "yes") {
        user.tokens = [];

    } else {
        user.tokens = user.tokens.filter((t) => t !== token);
    }
    await user.save();
    res.status(200).json({ message: "Logged out successfully" });
}