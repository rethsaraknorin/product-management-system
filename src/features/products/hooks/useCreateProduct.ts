import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import type { ProductFormValues } from "../schemas/product.schema";
import type { ProductsResponse } from "../types/product.types";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: ProductFormValues) => {
      const { data } = await axiosInstance.post("/products/add", {
        title: values.title,
        description: values.description ?? "",
        price: Number(values.price),
        discountPercentage: Number(values.discountPercentage ?? 0),
        sku: values.sku,
        stock: Number(values.stock),
        category: values.category,
      });
      return data;
    },
    onSuccess: (newProduct, variables) => {
      const normalized = {
        ...newProduct,
        sku: newProduct.sku || variables.sku,
        stock: newProduct.stock ?? Number(variables.stock),
        price: newProduct.price ?? Number(variables.price),
        category: newProduct.category || variables.category,
        tags: newProduct.tags ?? [],
        meta: {
          createdAt: newProduct.meta?.createdAt ?? new Date().toISOString(),
        },
      };
      queryClient.setQueriesData<ProductsResponse>({ queryKey: ["products"] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          products: [normalized, ...old.products],
          total: old.total + 1,
        };
      });
    },
  });
}
