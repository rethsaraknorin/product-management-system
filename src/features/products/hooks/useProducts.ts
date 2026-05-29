import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import type { ProductsResponse } from "../types/product.types";

export const PRODUCTS_LIMIT = 10;
const SELECT_FIELDS = "title,price,sku,stock,category,thumbnail,meta,tags";

export function useProducts(page: number = 1, search: string = "") {
  const skip = (page - 1) * PRODUCTS_LIMIT;
  const isSearching = search.trim().length > 0;

  return useQuery<ProductsResponse>({
    queryKey: ["products", page, search],
    queryFn: async () => {
      const endpoint = isSearching ? "/products/search" : "/products";
      const { data } = await axiosInstance.get<ProductsResponse>(endpoint, {
        params: isSearching
          ? { q: search.trim(), limit: PRODUCTS_LIMIT, skip, select: SELECT_FIELDS }
          : { limit: PRODUCTS_LIMIT, skip, select: SELECT_FIELDS },
      });
      return data;
    },
    placeholderData: keepPreviousData,
  });
}
