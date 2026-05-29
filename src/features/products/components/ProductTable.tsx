"use client";

import { useState } from "react";
import Image from "next/image";
import { PencilIcon } from "@/components/icons/PencilIcon";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Product } from "../types/product.types";

function formatCategory(category: string) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface ProductTableProps {
  products: Product[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  function toggleAll() {
    if (selectedIds.size === products.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(products.map((p) => p.id)));
    }
  }

  function toggleOne(id: number) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const allSelected = selectedIds.size === products.length && products.length > 0;
  const someSelected = selectedIds.size > 0 && !allSelected;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="px-4 py-3 text-left w-10">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onCheckedChange={toggleAll}
              />
            </th>
            <th className="px-4 py-3 text-left">
              <div className="flex items-center justify-between pr-[10%]">
                <span className="text-sm font-medium text-dark leading-5 tracking-[0.005em]">
                  Product
                </span>
                <ChevronDownIcon className="text-icon hover:text-body transition-colors cursor-pointer shrink-0" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-dark leading-5 tracking-[0.005em]">
              SKU
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-dark leading-5 tracking-[0.005em]">
              Category
            </th>
            <th className="px-4 py-3 text-left">
              <div className="flex items-center justify-between pr-[10%]">
                <span className="text-sm font-medium text-dark leading-5 tracking-[0.005em]">
                  Stock
                </span>
                <ChevronDownIcon className="text-icon hover:text-body transition-colors cursor-pointer shrink-0" />
              </div>
            </th>
            <th className="px-4 py-3 text-left">
              <div className="flex items-center justify-between pr-[10%]">
                <span className="text-sm font-medium text-dark leading-5 tracking-[0.005em]">
                  Price
                </span>
                <ChevronDownIcon className="text-icon hover:text-body transition-colors cursor-pointer shrink-0" />
              </div>
            </th>
            <th className="px-4 py-3 text-left">
              <div className="flex items-center justify-between pr-[10%]">
                <span className="text-sm font-medium text-dark leading-5 tracking-[0.005em]">
                  Added
                </span>
                <ChevronDownIcon className="text-icon hover:text-body transition-colors cursor-pointer shrink-0" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-dark leading-5 tracking-[0.005em]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const isSelected = selectedIds.has(product.id);
            return (
              <tr
                key={product.id}
                className={cn(
                  "border-b border-gray-100 transition-colors cursor-pointer",
                  isSelected ? "bg-surface" : "bg-white hover:bg-surface"
                )}
                onClick={() => toggleOne(product.id)}
              >
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <Checkbox checked={isSelected} onCheckedChange={() => toggleOne(product.id)} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 relative bg-gray-100 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dark leading-tight">{product.title}</p>
                      {product.tags.length > 0 && (
                        <p className="text-xs text-neutral mt-0.5">
                          {product.tags.length} Variants
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-brand font-medium">{product.sku}</span>
                </td>
                <td className="px-4 py-3 text-sm text-body">{formatCategory(product.category)}</td>
                <td className="px-4 py-3 text-sm text-body">{product.stock}</td>
                <td className="px-4 py-3 text-sm text-body">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-body">
                  {format(new Date(product.meta.createdAt), "d MMM yyyy")}
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit?.(product.id)}
                      className="p-1 text-neutral hover:text-body transition-colors"
                      aria-label="Edit product"
                    >
                      <PencilIcon />
                    </button>
                    <button
                      onClick={() => onDelete?.(product.id)}
                      className="p-1 text-neutral hover:text-warning transition-colors"
                      aria-label="Delete product"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
