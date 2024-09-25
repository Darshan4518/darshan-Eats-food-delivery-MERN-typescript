import mongoose, { Document } from "mongoose";

interface IrestaurantSchema {
  user: mongoose.Schema.Types.ObjectId;
  restaurantName: string;
  restaurantDescription: string;
  country: string;
  city: string;
  deliveryTime: number;
  address: string;
  cuisines: string[];
  menus: mongoose.Schema.Types.ObjectId[];
  imageUrl: string;
}

interface IrestaurantDocument extends IrestaurantSchema, Document {
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new mongoose.Schema<IrestaurantDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantName: {
      type: String,
      required: [true, "Restaurant name is required"],
      trim: true,
    },
    restaurantDescription: {
      type: String,
      default: "",
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Delivery time cannot be negative"],
    },
    cuisines: [
      {
        type: String,
        required: [true, "Cuisine type is required"],
        trim: true,
      },
    ],
    menus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
    ],
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
  },
  { timestamps: true }
);

restaurantSchema.index({ user: 1, restaurantName: 1 });

export const Restaurant = mongoose.model<IrestaurantDocument>(
  "Restaurant",
  restaurantSchema
);
