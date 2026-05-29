"use client";

import { use } from "react";
import { DashboardLayout } from "@/components/common/DashboardLayout";
import { ProductForm } from "@/features/products/components/ProductForm";
import { useProduct } from "@/features/products/hooks/useProduct";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const productId = Number(id);
  const { data: product, isLoading } = useProduct(productId);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center text-sm text-neutral">
            Loading product...
          </div>
        ) : (
          <ProductForm
            mode="edit"
            productId={productId}
            defaultValues={
              product
                ? {
                    title: product.title,
                    description: product.description ?? "",
                    price: String(product.price),
                    discountPercentage: String(product.discountPercentage ?? 0),
                    sku: product.sku,
                    stock: String(product.stock),
                    category: product.category,
                  }
                : undefined
            }
          />
        )}
      </div>
    </DashboardLayout>
  );
}
