import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateVerificationToken } from "../utils/generateVerificationToken";
import { generateJwtToken } from "../utils/generateJwtToken";
import {
  sendResetPasswordEmail,
  sendResetPasswordSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../nodemailer/email";
import { uploadImageOnCloudinary } from "../utils/uploadImageOnCloudinary";

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, contact, role = "user" } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(401).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const verificationToken = generateVerificationToken();
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      contact: Number(contact),
      role,
      verificationToken,
      verificationExpires: Date.now() + 24 * 60 * 60 * 1000,
    });

    generateJwtToken(res, user);

    await sendVerificationEmail(email, verificationToken);

    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role = "user" } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }
    const comparePassword = await bcryptjs.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ message: "password doesn't match" });
    }
    user.lastLogin = new Date();
    user.role = role;
    await user.save();
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    generateJwtToken(res, user);
    return res.status(200).json({
      success: true,
      message: "logined successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationCode } = req.body;

    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationExpires: { $gt: Date.now() },
    }).select("-password");
    if (!user) {
      return res.status(401).json({ message: "user not found!.." });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.fullName);

    return res.status(200).json({
      success: true,
      message: "email varified successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const logout = async (_: Request, res: Response) => {
  try {
    return res.clearCookie("token").status(200).json({
      success: true,
      message: "logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(401).json({ message: "user not found!.." });
    }
    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();
    await sendResetPasswordEmail(
      user.email,
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    );
    return res.status(200).json({
      success: true,
      message: `password reset link sent to your email:${email}`,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { resetToken } = req.params;
    console.log(resetToken);

    const { newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(401).json({ message: "invalid or token expired.." });
    }
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    await sendResetPasswordSuccessEmail(user.email);

    return res.status(200).json({
      success: true,
      message: `password reset successfully`,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "invalid or token expired.." });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const { fullName, city, contact, address, country } = req.body;
    const profilePicture = req.file;
    let cloudninaryRes;
    if (profilePicture) {
      cloudninaryRes = await uploadImageOnCloudinary(
        profilePicture as Express.Multer.File
      );
    }
    const updateUser = {
      fullName,
      city,
      contact,
      address,
      country,
      profilePicture: cloudninaryRes || undefined,
    };
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: updateUser,
      },
      {
        new: true,
      }
    ).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, user, message: "prrofile updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
