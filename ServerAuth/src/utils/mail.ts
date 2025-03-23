
import nodemailer from 'nodemailer';
import path from 'path';

import { CreateUser } from "#/@types/user";
import User from "#/models/user";
import { MAILTRAP_PASS, MAILTRAP_USER, VERIFICATION_EMAIL } from "#/utils/variables";
import { generateToken } from "#/utils/helper";

import EmailVerificationToken from "#/models/emailVerificationToken";
import { generateTemplate } from "#/mail/template";

const generateMailTrasporter = () => {

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: MAILTRAP_USER,
            pass: MAILTRAP_PASS
        }
    });

    return transport;

}

interface Profile {
    name: string;
    email: string;
    userId: string;
}


export const sendVerificationMail = async (token: string, profile: Profile) => {
    const transport = generateMailTrasporter();
    const { name, email, userId } = profile;

    await EmailVerificationToken.create({
        owner: userId,
        token: token
    })

    const welcomeMessage = `hi ${name},welcome to podify,use the following code to verify your email}`;



    transport.sendMail({
        to: email,
        from: VERIFICATION_EMAIL,
        subject: "Welcome to podify",
        html: generateTemplate({
            title: "Welcome to podify",
            message: welcomeMessage,
            logo: "cid:logo",
            banner: "cid:welcome",
            link: "#",
            btnTitle: token

        }),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname, "../mail/logo.png"),
                cid: "logo"
            },
            {
                filename: "welcome.png",
                path: path.join(__dirname, "../mail/welcome.png"),
                cid: "welcome"
            }
        ]
    });
}


