import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import type { Product, ProductsResponse } from "../types/product.types";

export function useProduct(id: number) {
  const queryClient = useQueryClient();

  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Product>(`/products/${id}`);
      return data;
    },
    enabled: !!id,
    placeholderData: () => {
      const queries = queryClient.getQueriesData<ProductsResponse>({ queryKey: ["products"] });
      for (const [, data] of queries) {
        const found = data?.products.find((p) => p.id === id);
        if (found) return found;
      }
      return undefined;
    },
  });
}
