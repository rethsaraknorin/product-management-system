"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { productSchema, type ProductFormValues } from "../schemas/product.schema";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useCategories } from "../hooks/useCategories";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@/components/icons/PlusIcon";

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  productId?: number;
  mode: "create" | "edit";
}

export function ProductForm({ defaultValues, mode }: ProductFormProps) {
  const router = useRouter();
  const { mutate: createProduct, isPending } = useCreateProduct();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      discountPercentage: "",
      sku: "",
      stock: "",
      category: "",
      ...defaultValues,
    },
  });

  function onSubmit(values: ProductFormValues) {
    if (mode === "create") {
      createProduct(values, {
        onSuccess: () => {
          toast.success("Product created successfully");
          router.push("/products");
        },
        onError: () => {
          toast.error("Failed to create product. Please try again.");
        },
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5.25 py-3.5 h-15 bg-white border-b shrink-0 gap-2.5">
        <div>
          <h1 className="text-base md:text-xl font-semibold text-dark">
            {mode === "create" ? "Add Product" : "Edit Product"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-dark text-sm transition-colors hover:bg-secondary/80 cursor-pointer">
            <span>Nik Shop</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <button type="button" className="relative p-1.5 text-brand">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8333 5.41667C10.8333 4.22005 11.8034 3.25 13 3.25C14.1966 3.25 15.1666 4.22005 15.1666 5.41667C17.7018 6.61543 19.3685 9.11543 19.5 11.9167V15.1667C19.6653 16.5325 20.4694 17.7387 21.6666 18.4167H4.33331C5.53052 17.7387 6.33465 16.5325 6.49998 15.1667V11.9167C6.63146 9.11543 8.29813 6.61543 10.8333 5.41667"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.75 18.4166V19.5C9.75 21.2949 11.2051 22.75 13 22.75C14.7949 22.75 16.25 21.2949 16.25 19.5V18.4166"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-warning text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              4
            </span>
          </button>
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-gray-400 to-gray-600 shrink-0" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 md:px-6 py-4 scrollbar-gutter-stable">
        <div className="flex items-center justify-between mb-4">
          <nav className="flex items-center gap-2 text-sm">
            <button
              type="button"
              onClick={() => router.push("/products")}
              className="text-brand hover:underline"
            >
              Product
            </button>
            <span className="text-neutral">›</span>
            <span className="text-body">{mode === "create" ? "Add Product" : "Edit Product"}</span>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/products")}
              className="flex items-center gap-1.5 h-10 px-4 text-sm font-medium border border-gray-200 rounded-lg text-body hover:bg-gray-50 transition-colors"
            >
              <span className="text-warning font-bold">✕</span>
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-1.5 h-10 px-4 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <PlusIcon className="w-4 h-4" />
              {isPending ? "Saving..." : mode === "create" ? "Add Product" : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-4">
            {/* General Information */}
            <div className="bg-white rounded-xl p-6 shadow-[0px_4px_30px_0px_#2E2D740D]">
              <h2 className="text-base font-semibold text-dark mb-4">General Information</h2>
              <div className="flex flex-col gap-3.5">
                <div>
                  <label className="block text-sm font-medium text-body mb-1.5">Product Name</label>
                  <Input
                    placeholder="Type product name here..."
                    {...register("title")}
                    className={errors.title ? "border-warning focus-visible:border-warning" : ""}
                  />
                  {errors.title && (
                    <p className="mt-1 text-xs text-warning">{errors.title.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-body mb-1.5">Description</label>
                  <textarea
                    placeholder="Type product description here..."
                    {...register("description")}
                    rows={6}
                    className="w-full px-3 py-2 text-sm text-dark placeholder:text-neutral border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Category — mobile only */}
            <div className="lg:hidden bg-white rounded-xl p-6 shadow-[0px_4px_30px_0px_#2E2D740D]">
              <h2 className="text-base font-semibold text-dark mb-4">Category</h2>
              <div>
                <label className="block text-sm font-medium text-body mb-1.5">
                  Product Category
                </label>
                <div className="relative">
                  <select
                    {...register("category")}
                    className={`w-full h-9 px-3 pr-8 text-sm text-neutral bg-white border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.category ? "border-warning" : "border-gray-200"}`}
                  >
                    <option value="">Select a category</option>
                    {categoriesLoading ? (
                      <option disabled>Loading...</option>
                    ) : (
                      categories?.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))
                    )}
                  </select>
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4.27602 6H11.724C11.8559 6.00003 11.9847 6.03914 12.0943 6.1124C12.2039 6.18565 12.2894 6.28976 12.3398 6.41156C12.3903 6.53336 12.4035 6.66738 12.3777 6.79669C12.352 6.92599 12.2886 7.04476 12.1954 7.138L8.47135 10.862C8.34634 10.987 8.1768 11.0572 8.00002 11.0572C7.82325 11.0572 7.65371 10.987 7.52869 10.862L3.80469 7.138C3.71148 7.04476 3.64801 6.92599 3.6223 6.79669C3.59659 6.66738 3.60979 6.53336 3.66024 6.41156C3.71068 6.28976 3.79611 6.18565 3.90572 6.1124C4.01532 6.03914 4.14419 6.00003 4.27602 6Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                {errors.category && (
                  <p className="mt-1 text-xs text-warning">{errors.category.message}</p>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl p-6 shadow-[0px_4px_30px_0px_#2E2D740D]">
              <h2 className="text-base font-semibold text-dark mb-4">Pricing</h2>
              <div className="flex flex-col gap-3.5">
                <div>
                  <label className="block text-sm font-medium text-body mb-1.5">Base Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral">
                      $
                    </span>
                    <Input
                      placeholder="Type base price here..."
                      {...register("price")}
                      className={`pl-7 ${errors.price ? "border-warning focus-visible:border-warning" : ""}`}
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-xs text-warning">{errors.price.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-body mb-1.5">
                    Discount Percentage (%)
                  </label>
                  <Input
                    placeholder="Type discount percentage..."
                    {...register("discountPercentage")}
                    className={
                      errors.discountPercentage ? "border-warning focus-visible:border-warning" : ""
                    }
                  />
                  {errors.discountPercentage && (
                    <p className="mt-1 text-xs text-warning">{errors.discountPercentage.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white rounded-xl p-6 shadow-[0px_4px_30px_0px_#2E2D740D]">
              <h2 className="text-base font-semibold text-dark mb-4">Inventory</h2>
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-sm font-medium text-body mb-1.5">SKU</label>
                  <Input
                    placeholder="Type product SKU here..."
                    {...register("sku")}
                    className={errors.sku ? "border-warning focus-visible:border-warning" : ""}
                  />
                  {errors.sku && <p className="mt-1 text-xs text-warning">{errors.sku.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-body mb-1.5">Quantity</label>
                  <Input
                    placeholder="Type product quantity here..."
                    {...register("stock")}
                    className={errors.stock ? "border-warning focus-visible:border-warning" : ""}
                  />
                  {errors.stock && (
                    <p className="mt-1 text-xs text-warning">{errors.stock.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar — desktop only */}
          <div className="hidden lg:block lg:w-66 shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-[0px_4px_30px_0px_#2E2D740D]">
              <h2 className="text-base font-semibold text-dark mb-4">Category</h2>
              <div>
                <label className="block text-sm font-medium text-body mb-1.5">
                  Product Category
                </label>
                <div className="relative">
                  <select
                    {...register("category")}
                    className={`w-full h-9 px-3 pr-8 text-sm text-neutral bg-white border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${
                      errors.category ? "border-warning" : "border-gray-200"
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categoriesLoading ? (
                      <option disabled>Loading...</option>
                    ) : (
                      categories?.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))
                    )}
                  </select>
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4.27602 6H11.724C11.8559 6.00003 11.9847 6.03914 12.0943 6.1124C12.2039 6.18565 12.2894 6.28976 12.3398 6.41156C12.3903 6.53336 12.4035 6.66738 12.3777 6.79669C12.352 6.92599 12.2886 7.04476 12.1954 7.138L8.47135 10.862C8.34634 10.987 8.1768 11.0572 8.00002 11.0572C7.82325 11.0572 7.65371 10.987 7.52869 10.862L3.80469 7.138C3.71148 7.04476 3.64801 6.92599 3.6223 6.79669C3.59659 6.66738 3.60979 6.53336 3.66024 6.41156C3.71068 6.28976 3.79611 6.18565 3.90572 6.1124C4.01532 6.03914 4.14419 6.00003 4.27602 6Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                {errors.category && (
                  <p className="mt-1 text-xs text-warning">{errors.category.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
