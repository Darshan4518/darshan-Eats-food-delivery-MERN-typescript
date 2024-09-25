// import {
//   generatePasswordResetEmailHtml,
//   generateResetSuccessEmailHtml,
//   generateWelcomeEmailHtml,
//   htmlContent,
// } from "./htmlEmailContent";
// import { client, sender } from "./mailTrap";

// export const sendVerificationEmail = async (
//   email: string,
//   varificationToken: string
// ) => {
//   const recipients = [
//     {
//       email,
//     },
//   ];
//   try {
//     const res = client
//       .send({
//         from: sender,
//         to: recipients,
//         subject: "verify your email",
//         html: htmlContent.replace("{verificationToken}", varificationToken),
//         category: "Email Verfication",
//       })
//       .then(console.log, console.error);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const sendWelcomeEmail = async (email: string, name: string) => {
//   const htmlContent = generateWelcomeEmailHtml(name);
//   const recipients = [
//     {
//       email,
//     },
//   ];
//   try {
//     const res = client
//       .send({
//         from: sender,
//         to: recipients,
//         subject: "Welcome to DarshanEats",
//         html: htmlContent,
//         template_variables: {
//           company_info_name: "DarshanEats",
//           name,
//         },
//       })
//       .then(console.log, console.error);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const sendResetPasswodEmail = async (
//   email: string,
//   frontend_Url: string
// ) => {
//   const htmlContent = generatePasswordResetEmailHtml(frontend_Url);
//   const recipients = [
//     {
//       email,
//     },
//   ];
//   try {
//     const res = client
//       .send({
//         from: sender,
//         to: recipients,
//         subject: "Reset your password",
//         html: htmlContent,
//         category: "Reset Password",
//       })
//       .then(console.log, console.error);
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const sendResetPosswordSuccessEmail = async (email: string) => {
//   const htmlContent = generateResetSuccessEmailHtml();

//   const recipients = [
//     {
//       email,
//     },
//   ];
//   try {
//     const res = client
//       .send({
//         from: sender,
//         to: recipients,
//         subject: "password reset successfully",
//         html: htmlContent,
//         category: "password reseted",
//       })
//       .then(console.log, console.error);
//   } catch (error) {
//     console.log(error);
//   }
// };

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmailContent";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string,
  },
});

// Define a type for the sendMail response

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: htmlContent.replace("{verificationToken}", verificationToken),
  };

  try {
    const info: any = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.response);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export const sendWelcomeEmail = async (
  email: string,
  name: string
): Promise<void> => {
  const htmlContent = generateWelcomeEmailHtml(name);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to DarshanEats",
    html: htmlContent,
  };

  try {
    const info: any = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info.response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

export const sendResetPasswordEmail = async (
  email: string,
  frontendUrl: string
): Promise<void> => {
  const htmlContent = generatePasswordResetEmailHtml(frontendUrl);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Your Password",
    html: htmlContent,
  };

  try {
    const info: any = await transporter.sendMail(mailOptions);
    console.log("Reset password email sent:", info.response);
  } catch (error) {
    console.error("Error sending reset password email:", error);
  }
};

export const sendResetPasswordSuccessEmail = async (
  email: string
): Promise<void> => {
  const htmlContent = generateResetSuccessEmailHtml();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Successfully",
    html: htmlContent,
  };

  try {
    const info: any = await transporter.sendMail(mailOptions);
    console.log("Password reset success email sent:", info.response);
  } catch (error) {
    console.error("Error sending reset password success email:", error);
  }
};
