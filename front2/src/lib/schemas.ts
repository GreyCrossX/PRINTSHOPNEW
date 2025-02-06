import { z } from "zod";

export const LocalOrderSchema = z.object({
  orderId: z.number().int().min(1).max(4),
  clientID: z.number().nullable(),
  productId: z.number().nullable(),
  variantsIDs: z.array(
    z.object({
      variant: z.number().positive("Variant ID must be a positive number"),
      option: z.number().positive("Option ID must be a positive number"),
      custom_option_input: z.string().nullable().optional(),
    })
  ),
});

export const ProductSchema = z.object({
  id: z.number().positive("Product ID must be a positive number"),
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  variants: z.array(
    z.object({
      id: z.number().positive("Variant ID must be a positive number"),
      name: z.string().min(1, "Variant name is required"),
      render_name: z.string().min(1, "Render name is required"),
      options: z.array(
        z.object({
          id: z.number().positive("Option ID must be a positive number"),
          description: z.string().min(1, "Option description is required"),
          is_optional: z.boolean(),
        })
      ),
    })
  ),
});

export type LocalOrder = z.infer<typeof LocalOrderSchema>;
export type ProductType = z.infer<typeof ProductSchema>;

export type Users = {
  id: number | null;
  name: string;
  address: string;
  user_id: string;
  last_name: string;
  email: string;
  phone: string;
};

export const defaultLocalOrder: LocalOrder = {
  orderId: 0,
  clientID: null,
  productId: null,
  variantsIDs: [],
};

export const defaultLocalOrders: LocalOrder[] = [];

export const defaultProduct: ProductType = {
  id: 0,
  name: "",
  description: "",
  variants: [
    {
      id: 0,
      name: "",
      render_name: "",
      options: [
        {
          id: 0,
          description: "",
          is_optional: false,
        },
      ],
    },
  ],
};

export const defaultProducts: ProductType[] = [];

export const defaultUser: Users = {
  id: null,
  user_id: "",
  name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
};

export const defaultUsers: Users[] = [];
