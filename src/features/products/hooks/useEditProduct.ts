import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import type { ProductFormValues } from "../schemas/product.schema";
import type { ProductsResponse } from "../types/product.types";

export function useEditProduct(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: ProductFormValues) => {
      const { data } = await axiosInstance.put(`/products/${id}`, {
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
    onSettled: (updatedProduct, _, variables) => {
      const normalized = {
        ...(updatedProduct ?? {}),
        title: updatedProduct?.title || variables.title,
        sku: updatedProduct?.sku || variables.sku,
        stock: updatedProduct?.stock ?? Number(variables.stock),
        price: updatedProduct?.price ?? Number(variables.price),
        category: updatedProduct?.category || variables.category,
        description: updatedProduct?.description ?? variables.description ?? "",
        discountPercentage:
          updatedProduct?.discountPercentage ?? Number(variables.discountPercentage ?? 0),
        tags: updatedProduct?.tags ?? [],
        meta: {
          createdAt: updatedProduct?.meta?.createdAt ?? new Date().toISOString(),
        },
      };

      queryClient.setQueriesData<ProductsResponse>({ queryKey: ["products"] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          products: old.products.map((p) => (p.id === id ? { ...p, ...normalized } : p)),
        };
      });

      queryClient.setQueryData(["product", id], normalized);
    },
  });
}
