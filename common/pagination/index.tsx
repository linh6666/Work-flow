"use client";

import React from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage?: number;
  itemName?: string;
  onPageChange: (page: number) => void;
  className?: string;
  maxPageDisplay?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  itemName = 'mục',
  onPageChange,
  className = '',
  maxPageDisplay = 5,
}: PaginationProps) {
  if (totalItems === 0) return null;

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  // Tính toán danh sách số trang hiển thị (hỗ trợ ellipsis nếu nhiều trang)
  const getVisiblePages = () => {
    if (totalPages <= maxPageDisplay) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const half = Math.floor(maxPageDisplay / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxPageDisplay - 1);

    if (end - start + 1 < maxPageDisplay) {
      start = Math.max(1, end - maxPageDisplay + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div
      className={`shrink-0 border-t border-slate-100 px-3 sm:px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60 ${className}`}
    >
      {/* Thông tin số lượng hiển thị */}
      <div className="text-center sm:text-left select-none">
        Hiển thị <span className="font-bold text-slate-700">{startIndex}</span> -{' '}
        <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số{' '}
        <span className="font-bold text-slate-700">{totalItems}</span> {itemName}
      </div>

      {/* Danh sách nút phân trang */}
      <div className="flex flex-wrap items-center justify-center gap-1 select-none">
        {/* Nút Trước */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer active:scale-95"
        >
          <IconChevronLeft size={13} />
          <span>Trước</span>
        </button>

        {/* Các nút số trang */}
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="w-7 h-7 flex items-center justify-center text-xs text-slate-400">
                ...
              </span>
            );
          }

          const pageNum = Number(page);
          const isActive = currentPage === pageNum;

          return (
            <button
              key={`page-${pageNum}`}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-[#406c89] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Nút Sau */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer active:scale-95"
        >
          <span>Sau</span>
          <IconChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}
