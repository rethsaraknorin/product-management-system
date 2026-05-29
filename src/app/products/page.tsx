import { DashboardLayout } from "@/components/common/DashboardLayout";
import { ProductListContent } from "@/features/products/components/ProductListContent";

export const metadata = {
  title: "Products | Product Management System",
};

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <ProductListContent />
    </DashboardLayout>
  );
}
