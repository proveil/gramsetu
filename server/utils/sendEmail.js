import Transporter from "../config/nodemailer.js";
import {verifyEmailHtml,verifiedEmailWelcome,resetEmailHtml,passwordResetHtml} from "./EmailTemplates.js"


export const sendVerificationEmail = async (email,verificationToken)=>{
    try {
        const mailOptions = {
            from: process.env.SMTP_SENDER_EMAIL,
            to: email,
            subject: "Welcome to GRAMSETU",
            html: verifyEmailHtml.replace("{email}",email).replace("{code}",verificationToken),
            category: "Email verification"
        }
        await Transporter.sendMail(mailOptions);
        console.log(`Verification Email sent: ${email}`);
    } catch (error) {
        console.log(`verification email: ${error.message}`);
    }
}

export const sendVerifiedWelcomeEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_SENDER_EMAIL,
            to: email,
            subject: "Email Verified",
            html: verifiedEmailWelcome
                .replace(/{{?email}}?/gi, email)
                .replace(/{{?name}}?/gi, name),
            category: "Email Verification"
        };
        await Transporter.sendMail(mailOptions);
        console.log(`Account Verified: ${email}`);
    } catch (error) {
        console.log(`Welcome Email: ${error.message}`);
    }
};

export const sendResetEmail = async (email, resetURL) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_SENDER_EMAIL,
            to: email,
            subject: "Email Verified",
            html: resetEmailHtml
                .replace(/{{?email}}?/gi, email)
                .replace(/{{?link}}?/gi, resetURL),
            category: "Password Reset"
        };
        await Transporter.sendMail(mailOptions);
        console.log(`Reset Request: ${email}`);
    } catch (error) {
        console.log(`Reset Request: ${error.message}`);
    }
};

export const sendResetEmailNotice = async (email) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_SENDER_EMAIL,
            to: email,
            subject: "Email Verified",
            html: passwordResetHtml
                .replace(/{{?email}}?/gi, email),
            category: "Password Reset"
        };
        await Transporter.sendMail(mailOptions);
        console.log(`Reset Request Completed: ${email}`);
    } catch (error) {
        console.log(`Reset Notice: ${error.message}`);
    }
};