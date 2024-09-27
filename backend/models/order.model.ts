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
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "outfordelivery"
    | "delivered";
  restaurantId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  totalAmount: number;
  discount: number;
  deliveryCharge: number;
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
      fullName: {
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
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalAmount: Number,
    discount: Number,
    deliveryCharge: Number,
  },

  { timestamps: true }
);

export const Order = mongoose.model<IorderDocument>("Order", orderSchema);
