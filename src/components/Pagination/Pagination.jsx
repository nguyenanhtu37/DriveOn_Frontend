import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PageButton = React.memo(({ pageNum, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex h-8 w-8 items-center justify-center rounded-full",
      isActive ? "bg-black text-white" : "hover:bg-gray-100"
    )}
  >
    {pageNum}
  </button>
));

const Ellipsis = React.memo(() => (
  <span className="flex h-8 w-8 items-center justify-center">...</span>
));

const Pagination = ({
  page = 1,
  totalPages = 2,
  onPageChange,
  siblingsCount = 1,
}) => {
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange?.(newPage);
  };

  const pageNumbers = useMemo(() => {
    const pages = [];
    const rangeStart = Math.max(2, page - siblingsCount);
    const rangeEnd = Math.min(totalPages - 1, page + siblingsCount);

    // Always show first page
    pages.push(
      <PageButton
        key={1}
        pageNum={1}
        isActive={page === 1}
        onClick={() => handlePageChange(1)}
      />
    );

    // Show dots if needed before the range
    if (rangeStart > 2) {
      pages.push(<Ellipsis key="ellipsis-start" />);
    }

    // Show pages in the middle range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (i <= 1 || i >= totalPages) continue;
      pages.push(
        <PageButton
          key={i}
          pageNum={i}
          isActive={page === i}
          onClick={() => handlePageChange(i)}
        />
      );
    }

    // Show dots if needed after the range
    if (rangeEnd < totalPages - 1) {
      pages.push(<Ellipsis key="ellipsis-end" />);
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <PageButton
          key={totalPages}
          pageNum={totalPages}
          isActive={page === totalPages}
          onClick={() => handlePageChange(totalPages)}
        />
      );
    }

    return pages;
  }, [page, totalPages, siblingsCount, handlePageChange]);

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full",
          page === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pageNumbers}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full",
          page === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default React.memo(Pagination);
