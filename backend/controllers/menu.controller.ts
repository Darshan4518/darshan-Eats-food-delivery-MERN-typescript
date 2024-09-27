import { Request, Response } from "express";
import { ImenuSchema, Menu } from "../models/menu.model";
import { uploadImageOnCloudinary } from "../utils/uploadImageOnCloudinary";
import { Restaurant } from "../models/restaurant.model";
import mongoose from "mongoose";

export const createMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;

    const isExistMenu = await Menu.findOne({ name });
    if (isExistMenu) {
      return res.status(400).json({ message: "Menu already exists" });
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

    const menu = await Menu.create({
      name,
      description,
      price,
      image: imageUrl,
    });

    const restaurant = await Restaurant.findOne({ user: req.id });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    restaurant.menus.push(menu._id as mongoose.Schema.Types.ObjectId);
    await restaurant.save();

    res.status(201).json({
      success: true,
      menu,
      message: "Menu created successfully",
    });
  } catch (error) {
   
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;

    let imageUrl = req.body.image;

    if (file) {
      imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    }
    const updatedMenu: ImenuSchema = {
      name,
      description,
      price,
      image: imageUrl,
    };
    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatedMenu,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, menu, message: "menu updated successfully" });
  } catch (error) {
    error;
    return res.status(500).json({ message: "internal server error" });
  }
};

export const getMenu = async (req: Request, res: Response) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res.status(200).json({ success: true, menu });
  } catch (error) {
    error;
    return res.status(500).json({ message: "internal server error" });
  }
};

export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "menu deleted successfully" });
  } catch (error) {
    error;
    return res.status(500).json({ message: "internal server error" });
  }
};
