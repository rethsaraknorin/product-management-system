import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z
    .string()
    .min(1, "Base price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a positive number",
    }),
  discountPercentage: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100), {
      message: "Discount must be between 0 and 100",
    }),
  sku: z.string().min(1, "SKU is required"),
  stock: z
    .string()
    .min(1, "Quantity is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number.isInteger(Number(val)), {
      message: "Quantity must be a positive integer",
    }),
  category: z.string().min(1, "Category is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
