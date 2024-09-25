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
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return token;
  } catch (error) {
    console.log("wt  ", error);
  }
};
