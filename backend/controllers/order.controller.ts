import { Request, Response } from "express";
import { Order } from "../models/order.model";
import Razorpay from "razorpay";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.id }).populate(
      "user restaurant"
    );
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest = req.body;

    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    ).populate("menus");

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const order = await Order.create({
      restaurantId: restaurant._id,
      userId: req.id,
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      status: "pending",
    });

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY!,
      key_secret: process.env.RAZORPAY_SECRET!,
    });

    let totalAmount = 0;
    for (const cartItem of checkoutSessionRequest.cartItems) {
      const menu = await Menu.findById(cartItem.menuId);
      if (menu) {
        totalAmount += menu.price * cartItem.quantity;
      } else {
        return res
          .status(404)
          .json({ message: `Menu item not found: ${cartItem.menuId}` });
      }
    }

    const options = {
      amount: (totalAmount * 100).toString(),
      currency: "INR",
      receipt: order._id as string,
      payment_capture: 1,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    return res
      .status(201)
      .json({ success: true, message: "payment successfull" });
  } catch (error) {
    console.error("Error creating session or payment:", error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};
