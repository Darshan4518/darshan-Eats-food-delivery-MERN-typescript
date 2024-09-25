import mongoose, { Document } from "mongoose";

export interface ImenuSchema {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface ImenuDocument extends ImenuSchema, Document {}

const menuSchema = new mongoose.Schema<ImenuDocument>(
  {
    name: {
      type: String,
      required: [true, "Menu name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

menuSchema.index({ name: 1 });

export const Menu = mongoose.model<ImenuDocument>("Menu", menuSchema);
