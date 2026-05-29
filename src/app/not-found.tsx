import Link from "next/link";
import { DashboardLayout } from "@/components/common/DashboardLayout";

export default function NotFound() {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-screen bg-white">
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <h1 className="text-6xl font-bold text-brand">404</h1>
          <p className="text-lg font-semibold text-body">Page not found</p>
          <p className="text-sm text-neutral">The page you are looking for does not exist.</p>
          <Link
            href="/products"
            className="mt-2 px-5 py-2.5 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand/90 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
