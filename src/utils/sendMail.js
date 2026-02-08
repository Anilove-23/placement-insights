import Mailgen from 'mailgen'
import nodemailer from 'nodemailer'
import { ApiError } from '../utils/ApiError.js'


const mailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "PlaceWise",
        link: "https://yourapp.com"
    }
});

const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: Number(process.env.MAILTRAP_PORT),
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
    }
})

const sendEmail = async function (options) {

    const emailHtml = mailGenerator.generate(options.mailgenContent);
    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)



    try {
        await transporter.sendMail({
            from: '"PlaceWise" <placewise@placewise.com>',
            to: options.email,
            subject: options.subject,
            html: emailHtml,
            text: emailTextual
        });
    } catch (err) {
        throw new ApiError(503, "Something went wrong while sending mail !!! Try again later")
    }
}

const generateMailGenContent = (username, link) => {
    return {
        body: {
            name: username,
            intro: "Welcome to PlaceWise! 🎉 We're excited to have you on board.",
            action: {
                instructions: "Click the button below to verify your email address:",
                button: {
                    color: "#22BC66",
                    text: "Verify Email",
                    link
                }
            },
            outro: "This link will expire in 10 minutes. If you did not request this, please ignore this email."
        }
    }
}

const generateForgotPasswordContent = (username, link) => {
  return {
    body: {
      name: username,
      intro: "We received a request to reset your PlaceWise account password 🔐",
      action: {
        instructions: "Click the button below to reset your password:",
        button: {
          color: "#FF5733",
          text: "Reset Password",
          link,
        },
      },
      outro: [
        "This password reset link will expire in 10 minutes.",
        "If you did not request a password reset, you can safely ignore this email."
      ],
    },
  };
};



export { sendEmail ,mailgenContent,generateForgotPasswordContent}