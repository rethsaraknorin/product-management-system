import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface Category {
  slug: string;
  name: string;
  url: string;
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Category[]>("/products/categories");
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
