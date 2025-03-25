import { RequestHandler } from "express";



import { CreateUser, VerifyEmailReqeuest } from "#/@types/user";
import User from "#/models/user";
import { generateToken } from "#/utils/helper";
import { sendForgetPasswordLink, sendPassResetSuccessEmail, sendVerificationMail } from "#/utils/mail";
import EmailVerificationToken from "#/models/emailVerificationToken";
import { isValidObjectId } from "mongoose";
import passwordResetToken from "#/models/passwordResetToken";

import crypto from "crypto";
import { PASSWORD_RESET_LINK } from "#/utils/variables";


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