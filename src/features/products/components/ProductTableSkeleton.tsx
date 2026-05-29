import { Skeleton } from "@/components/ui/skeleton";

export function ProductTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="px-4 py-3 w-10" />
            <th className="px-4 py-3 text-left text-sm font-medium text-dark">Product</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-dark">SKU</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-dark">Category</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-dark">Stock</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-dark">Price</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-dark">Added</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-dark">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-4 rounded" />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-md shrink-0" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3.5 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-3.5 w-16" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-3.5 w-16" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-3.5 w-8" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-3.5 w-14" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-3.5 w-20" />
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-6 rounded" />
                  <Skeleton className="h-6 w-6 rounded" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
