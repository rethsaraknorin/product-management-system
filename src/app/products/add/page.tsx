import { DashboardLayout } from "@/components/common/DashboardLayout";
import { ProductForm } from "@/features/products/components/ProductForm";

export default function AddProductPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <ProductForm mode="create" />
      </div>
    </DashboardLayout>
  );
}
