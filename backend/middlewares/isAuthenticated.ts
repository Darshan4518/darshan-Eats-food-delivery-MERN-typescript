import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "token not found!.." });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWTSECRETEKEY!
    ) as jwt.JwtPayload;
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.id = decoded._id;
    next();
  } catch (error) {
    error;
    return res.status(500).json({ message: "internal server error" });
  }
};
