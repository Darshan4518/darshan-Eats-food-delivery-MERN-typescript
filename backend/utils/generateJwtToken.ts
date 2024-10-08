import { Response } from "express";
import { IUserDocument } from "../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateJwtToken = async (res: Response, user: IUserDocument) => {
  try {
    const token = jwt.sign({ _id: user._id }, process.env.JWTSECRETEKEY!, {
      expiresIn: "3d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    return token;
  } catch (error) {
    throw new Error("token not found");
  }
};
