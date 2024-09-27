import { Request, Response } from "express";
import { Order } from "../models/order.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose from "mongoose";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.id }).populate(
      "user restaurant"
    );
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    error;
    return res.status(500).json({ message: "internal server error" });
  }
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest = req.body;

    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    ).populate("menus orders");
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const order = await Order.create({
      restaurantId: restaurant._id,
      userId: req.id,
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      status: "confirmed",
      totalAmount: checkoutSessionRequest.totalAmount,
      discount: checkoutSessionRequest.discount,
      deliveryCharge: checkoutSessionRequest.deliveryCharge,
    });

    restaurant.orders.push(order?._id as mongoose.Schema.Types.ObjectId);
    await restaurant.save();

    return res.status(201).json({
      success: true,
      message: "payment successfull",
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};
