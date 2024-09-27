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
  } catch (error) {
    throw new Error("failed send email");
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
  } catch (error) {
    throw new Error("failed send email");
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
  } catch (error) {
    throw new Error("failed send email");
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
  } catch (error) {
    throw new Error("failed send email");
  }
};
