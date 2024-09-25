import { z } from "zod";

export const singupSchema = z.object({
  fullName: z.string().nonempty({ message: "fullname name required" }),
  email: z.string().email("invalid email"),
  password: z.string().min(8, "password must be at least 8 character"),
  contact: z.string().min(10, "contact must be at least 10 character"),
  role: z.string(),
});

export type SignupInputState = z.infer<typeof singupSchema>;

export const loginSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(8, "password must be at least 8 character"),
  role: z.string(),
});

export type LoginInputState = z.infer<typeof loginSchema>;

export const updateUserSchema = z.object({
  fullName: z.string().nonempty({ message: "fullname name required" }),
  contact: z.string().min(10, "contact must be at least 10 character"),
  city: z.string().nonempty({ message: "city name required" }),
  country: z.string().nonempty({ message: "county name required" }),
  address: z.string().nonempty({ message: "address name required" }),
  profilePicture: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "image required" }),
});

export type UserInputState = z.infer<typeof updateUserSchema>;
