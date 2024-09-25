import { z } from "zod";

export const restaurantSchema = z.object({
  restaurantName: z
    .string()
    .min(3, { message: "restaurantName must required at least 3 character" }),
  cuisines: z.array(z.string()),
  country: z.string().nonempty({ message: "country name required" }),
  city: z.string().nonempty({ message: "city name required" }),
  restaurantDescription: z
    .string()
    .nonempty({ message: "restaurantDescription  required" }),

  address: z.string().nonempty({ message: "address required" }),

  deliveryTime: z.number().min(0, { message: "deliveryTime required " }),
  imageFile: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "image required" }),
});

export type restaurantInputState = z.infer<typeof restaurantSchema>;
