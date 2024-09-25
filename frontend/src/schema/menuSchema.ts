import { z } from "zod";

export const menuSchema = z.object({
  name: z
    .string()
    .min(3, { message: "name must required at least 3 character" }),
  description: z.string().nonempty({ message: "description required" }),
  price: z.number().min(0, { message: "price required " }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "image required" }),
});

export type MenuInputState = z.infer<typeof menuSchema>;
