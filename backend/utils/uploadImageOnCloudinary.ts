import cloudninary from "./cloudinary";

export const uploadImageOnCloudinary = async (file: Express.Multer.File) => {
  const base64Image = Buffer.from(file.buffer).toString("base64");
  const dataUri = `data:${file.mimetype};base64,${base64Image}`;
  const cloudinaryResponse = await cloudninary.uploader.upload(dataUri);
  return cloudinaryResponse.secure_url;
};
