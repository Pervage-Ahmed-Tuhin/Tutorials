
import nodemailer from 'nodemailer';
import path from 'path';

import { CreateUser } from "#/@types/user";
import User from "#/models/user";
import { MAILTRAP_PASS, MAILTRAP_USER, SIGN_IN_URL, VERIFICATION_EMAIL } from "#/utils/variables";
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


interface Options {
    email: string;
    link: string;
}


export const sendForgetPasswordLink = async (options: Options) => {
    const transport = generateMailTrasporter();
    const { email, link } = options;



    const message = "Please click the link below to reset your password if you did not request this please ignore this email";




    transport.sendMail({
        to: email,
        from: VERIFICATION_EMAIL,
        subject: "Reset your password",
        html: generateTemplate({
            title: "Reset your password",
            message,
            logo: "cid:logo",
            banner: "cid:forget_password",
            link: link,
            btnTitle: "Reset password",

        }),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname, "../mail/logo.png"),
                cid: "logo"
            },
            {
                filename: "forget_password.png",
                path: path.join(__dirname, "../mail/forget_password.png"),
                cid: "forget_password"
            }
        ]
    });
}
export const sendPassResetSuccessEmail = async (name: string, email: string) => {
    const transport = generateMailTrasporter();




    const message = `dear ${name},your password has been successfully reset`;




    transport.sendMail({
        to: email,
        from: VERIFICATION_EMAIL,
        subject: "passwprd reset success",
        html: generateTemplate({
            title: "Password reset success",
            message,
            logo: "cid:logo",
            banner: "cid:forget_password",
            link: SIGN_IN_URL,
            btnTitle: "SIGN IN",

        }),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname, "../mail/logo.png"),
                cid: "logo"
            },
            {
                filename: "forget_password.png",
                path: path.join(__dirname, "../mail/forget_password.png"),
                cid: "forget_password"
            }
        ]
    });
}



