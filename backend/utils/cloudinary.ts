import { v2 as cloudninary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudninary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRETE,
});

export default cloudninary;
