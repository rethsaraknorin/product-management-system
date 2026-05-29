"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { CalendarIcon } from "@/components/icons/CalendarIcon";
import { FiltersIcon } from "@/components/icons/FiltersIcon";
import { BellIcon } from "@/components/icons/BellIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { DownloadIcon } from "@/components/icons/DownloadIcon";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useProducts, PRODUCTS_LIMIT } from "../hooks/useProducts";
import { ProductTable } from "./ProductTable";
import { ProductTableSkeleton } from "./ProductTableSkeleton";
import { ProductPagination } from "./ProductPagination";
import { DeleteProductDialog } from "./DeleteProductDialog";

const TABS = ["All Product", "Published", "Low Stock", "Draft"];

export function ProductListContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isError, refetch } = useProducts(currentPage, searchQuery);

  const totalPages = data ? Math.ceil(data.total / PRODUCTS_LIMIT) : 0;

  return (
    <>
      <div className="flex flex-col h-full md:h-screen">
        {/* Page header */}
        <div className="flex items-center justify-between px-5.25 py-3.5 h-15 bg-white border-b shrink-0 gap-2.5">
          <h1 className="text-base md:text-xl font-semibold text-dark">Product</h1>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-dark text-sm transition-colors hover:bg-secondary/80">
              Nik Shop
              <ChevronDown size={14} />
            </button>
            <div className="relative">
              <button className="p-1.5 text-brand transition-colors">
                <BellIcon className="w-5 h-5" />
              </button>
              <span className="absolute -top-0.5 -right-0.5 bg-warning text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
                4
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-gray-400 to-gray-600 shrink-0" />
          </div>
        </div>

        {/* Search + action buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-4 md:px-6 py-3 md:py-4 bg-white border-b shrink-0">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral pointer-events-none" />
            <Input placeholder="Search order..." className="pl-9 h-10 text-sm" />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center justify-center gap-1 h-10 px-3.5 bg-brand/15 text-brand text-sm font-medium rounded-lg transition-colors hover:bg-brand/25 flex-1 sm:flex-none">
              <DownloadIcon />
              Export
            </button>
            <button
              onClick={() => router.push("/products/add")}
              className="flex items-center justify-center gap-1 h-10 px-3.5 bg-brand text-white text-sm font-medium rounded-lg transition-colors hover:bg-brand/90 flex-1 sm:flex-none"
            >
              <PlusIcon />
              Add Product
            </button>
          </div>
        </div>

        {/* Tabs + secondary filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 py-3 bg-white border-b shrink-0 gap-2 md:gap-3">
          {/* Tabs row */}
          <div className="relative">
            <div className="flex items-center gap-2 p-1 border border-gray-200 rounded-lg h-10 overflow-x-auto scrollbar-none">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={cn(
                    "px-3 h-8 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                    tab === "All Product"
                      ? "bg-brand/15 text-brand"
                      : "text-neutral hover:text-body"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-8 bg-linear-to-l from-white to-transparent pointer-events-none rounded-r-lg md:hidden" />
          </div>

          {/* Filters row */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:flex-none">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral pointer-events-none" />
              <Input
                type="text"
                placeholder="Search product..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="h-10 pl-8 pr-3 w-full md:w-44"
              />
            </div>
            <button className="flex items-center gap-1.5 h-10 px-3 text-sm border border-gray-200 rounded-lg text-neutral hover:text-body hover:bg-gray-50 transition-colors whitespace-nowrap shrink-0">
              <CalendarIcon />
              <span className="hidden sm:inline">Select Date</span>
            </button>
            <button className="flex items-center gap-1.5 h-10 px-3 text-sm border border-gray-200 rounded-lg text-neutral hover:text-body hover:bg-gray-50 transition-colors shrink-0">
              <FiltersIcon />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto bg-gray-50 px-4 md:px-6 py-4 scrollbar-gutter-stable">
          {isError ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3 text-neutral bg-white rounded-xl shadow-sm">
              <p className="text-sm">Failed to load products.</p>
              <button
                onClick={() => refetch()}
                className="text-sm text-brand underline hover:no-underline"
              >
                Try again
              </button>
            </div>
          ) : isLoading ? (
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <ProductTableSkeleton />
            </div>
          ) : data?.products.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-sm text-neutral bg-white rounded-xl shadow-sm">
              No products found.
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <div className="min-w-200">
                  <ProductTable
                    products={data!.products}
                    onEdit={(id) => router.push(`/products/${id}/edit`)}
                    onDelete={(id) => {
                      const product = data!.products.find((p) => p.id === id);
                      setDeleteTarget({ id, name: product?.title ?? "" });
                    }}
                  />
                </div>
              </div>
              {data && data.total > 0 && (
                <div className="border-t border-gray-100">
                  <ProductPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    total={data.total}
                    limit={PRODUCTS_LIMIT}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {deleteTarget && (
        <DeleteProductDialog
          productId={deleteTarget.id}
          productName={deleteTarget.name}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
