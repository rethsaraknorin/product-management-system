import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import type { ProductsResponse } from "../types/product.types";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(`/products/${id}`);
      return data;
    },
    onSettled: (_, __, id) => {
      queryClient.setQueriesData<ProductsResponse>({ queryKey: ["products"] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          products: old.products.filter((p) => p.id !== id),
          total: old.total - 1,
        };
      });
    },
  });
}
