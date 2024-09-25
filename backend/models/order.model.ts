import mongoose, { Document } from "mongoose";

type DeliveryDetails = {
  email: string;
  name: string;
  address: string;
  contact: number;
  city: string;
  country: string;
};

type CartItems = {
  menuId: mongoose.Schema.Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

interface IorderSchema {
  user: mongoose.Schema.Types.ObjectId;
  restaurant: mongoose.Schema.Types.ObjectId;
  deliveryDetails: DeliveryDetails;
  cartItems: CartItems;
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "outfordelivery"
    | "delivered";
}

interface IorderDocument extends IorderSchema, Document {}

const orderSchema = new mongoose.Schema<IorderDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    deliveryDetails: {
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      contact: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    cartItems: [
      {
        menuId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "outfordelivery",
        "delivered",
      ],
      required: true,
    },
  },

  { timestamps: true }
);

export const Order = mongoose.model<IorderDocument>("Order", orderSchema);
