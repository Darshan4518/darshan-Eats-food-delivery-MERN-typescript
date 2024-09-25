import mongoose, { Document } from "mongoose";

interface IUserSchema {
  fullName: string;
  email: string;
  password: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  role: string;
  lastLogin?: Date;
  isVerified?: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  verificationToken?: string;
  verificationExpires?: Date;
}

export interface IUserDocument extends IUserSchema, Document {}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // advanced auth fields
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    verificationToken: {
      type: String,
    },
    verificationExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUserDocument>("User", userSchema);
