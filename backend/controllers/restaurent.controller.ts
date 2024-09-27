import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { uploadImageOnCloudinary } from "../utils/uploadImageOnCloudinary";
import { Order } from "../models/order.model";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      restaurantName,
      restaurantDescription,
      country,
      city,
      deliveryTime,
      address,
      cuisines,
    } = req.body;

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: " image required",
      });
    }
    const restaurant = await Restaurant.findOne({ user: req.id }).populate(
      "menus"
    );

    if (restaurant) {
      return res.status(400).json({
        message:
          "restaurant already exist this user please create in another email ",
      });
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

    await Restaurant.create({
      user: req.id,
      restaurantName,
      restaurantDescription,
      country,
      city,
      deliveryTime,
      address,
      cuisines,
      imageUrl,
    });

    return res.status(200).json({
      success: true,
      message: "Restaurant added successfully",
    });
  } catch (error) {
    error;
    return res.status(500).json({ message: "internal server error" });
  }
};

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id }).populate(
      "menus orders"
    );
    if (!restaurant) {
      return res.status(400).json({ message: "restaurant not found!.." });
    }
    return res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    error;
    return res.status(500).json({ message: "internal server error" });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      restaurantName,
      restaurantDescription,
      country,
      city,
      deliveryTime,
      address,
      cuisines,
    } = req.body;

    const file = req.file;
    let updatedimageUrl = req.body.imageUrl;

    if (file) {
      updatedimageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
    }

    const updatedData = {
      restaurantName,
      restaurantDescription,
      country,
      city,
      deliveryTime,
      address,
      cuisines,
      imageUrl: updatedimageUrl,
    };

    const restaurant = await Restaurant.findOneAndUpdate(
      { user: req.id },
      updatedData,
      { new: true }
    ).populate("menus");

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    error;
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById({ user: req.id });
    if (!restaurant) {
      return res.status(400).json({ message: "restaurant not found" });
    }
    const orders = await Order.find({ restaurant: restaurant?._id }).populate(
      "user restaurant"
    );
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    error;
    return res.status(500).json({ message: "internal server error" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId).populate("menus");
    if (!order) {
      return res.status(400).json({ message: "order not found" });
    }
    order.status = status;
    await order.save();
    return res.status(200).json({
      success: true,
      message: "ode status updated",
      order,
    });
  } catch (error) {
    error;
    return res.status(500).json({ message: "internal server error" });
  }
};

export const searchRestaurants = async (req: Request, res: Response) => {
  try {
    const searchByText = req.params.searchText || "";
    const searchByQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines =
      (req.query.cuisines as string)?.split(",").filter((cuisine) => cuisine) ||
      [];

    let query: any = {};

    if (searchByText) {
      query.$or = [
        { restaurantName: { $regex: searchByText, $options: "i" } },
        { city: { $regex: searchByText, $options: "i" } },
        { country: { $regex: searchByText, $options: "i" } },
      ];
    }

    if (searchByQuery) {
      query.$or = [
        { restaurantName: { $regex: searchByQuery, $options: "i" } },
        { cuisines: { $regex: searchByQuery, $options: "i" } },
      ];
    }

    if (selectedCuisines.length > 0) {
      query.cuisines = { $in: selectedCuisines };
    }

    const restaurants = await Restaurant.find(query).populate("menus");
    if (!restaurants.length) {
      return res
        .status(404)
        .json({ message: "No restaurants found matching the criteria." });
    }

    return res.status(200).json({ success: true, restaurants });
  } catch (error) {
  
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleRestaurant = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id).populate("menus");

    if (!restaurant) {
      res.status(400).json({ message: "restaurants not found!.." });
    }
    res.status(200).json({ success: true, restaurant });
  } catch (error) {
    error;
    return res.status(500).json({ message: "internal server error" });
  }
};

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find().populate("menus");
    if (!restaurants) {
      return res.status(400).json({ message: "restaurants not found!.." });
    }
    return res.status(200).json({
      success: true,
      restaurants,
    });
  } catch (error) {
    error;
    return res.status(500).json({ message: "internal server error" });
  }
};
