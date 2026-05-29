"use client";

import { useState } from "react";
import { ChevronLeftIcon } from "@/components/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/components/icons/ChevronRightIcon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }
  if (currentPage >= totalPages - 3) {
    return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}

export function ProductPagination({
  currentPage,
  totalPages,
  total,
  limit,
  onPageChange,
}: ProductPaginationProps) {
  const [jumpIndex, setJumpIndex] = useState<number | null>(null);
  const [jumpValue, setJumpValue] = useState("");

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);
  const pages = getPageNumbers(currentPage, totalPages);

  function handleJump() {
    const page = parseInt(jumpValue);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
    setJumpIndex(null);
    setJumpValue("");
  }

  return (
    <div className="flex items-center justify-between px-4 py-4">
      <span className="text-sm text-neutral">
        Showing {startItem}-{endItem} from {total}
      </span>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 p-1.5 flex items-center justify-center rounded-lg bg-brand/15 text-brand hover:bg-brand/25 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeftIcon />
        </button>

        {pages.map((page, i) =>
          page === "..." ? (
            jumpIndex === i ? (
              <Input
                key={`jump-${i}`}
                autoFocus
                type="number"
                min={1}
                max={totalPages}
                value={jumpValue}
                onChange={(e) => setJumpValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleJump();
                  if (e.key === "Escape") {
                    setJumpIndex(null);
                    setJumpValue("");
                  }
                }}
                onBlur={handleJump}
                className="w-12 h-8 text-center border-brand"
              />
            ) : (
              <button
                key={`ellipsis-${i}`}
                onClick={() => {
                  setJumpIndex(i);
                  setJumpValue("");
                }}
                className="w-8 h-8 flex items-center justify-center text-sm text-neutral hover:text-brand hover:bg-brand/10 rounded-lg transition-colors"
              >
                ...
              </button>
            )
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={cn(
                "w-8 h-8 p-1.5 flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
                currentPage === page
                  ? "bg-brand text-white"
                  : "bg-brand/15 text-brand hover:bg-brand/25"
              )}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 p-1.5 flex items-center justify-center rounded-lg bg-brand/15 text-brand hover:bg-brand/25 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
