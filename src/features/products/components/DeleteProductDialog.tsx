"use client";

import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { toast } from "sonner";

interface DeleteProductDialogProps {
  productId: number;
  productName: string;
  onClose: () => void;
}

export function DeleteProductDialog({ productId, productName, onClose }: DeleteProductDialogProps) {
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  function handleDelete() {
    deleteProduct(productId, {
      onSettled: () => {
        toast.success("Product deleted successfully");
        onClose();
      },
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-[0px_4px_30px_0px_#2E2D740D] p-6 w-full max-w-sm mx-4">
        <h2 className="text-base font-semibold text-dark mb-2">Delete Product</h2>
        <p className="text-sm text-body mb-6">
          Are you sure you want to delete{" "}
          <span className="font-medium text-dark">&quot;{productName}&quot;</span>? This action
          cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="h-10 px-4 text-sm font-medium border border-gray-200 rounded-lg text-body hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="h-10 px-4 text-sm font-medium bg-warning text-white rounded-lg hover:bg-warning/90 transition-colors disabled:opacity-50"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
