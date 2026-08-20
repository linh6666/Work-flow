"use client";

import React, { useState } from 'react';
import {
  IconSearch,
  IconChartBar,
  IconPlus,
  IconPencil,
  IconTrash,
  IconSelector,
  IconArrowDown,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';

/* ─── Mock Data ─────────────────────────────────────────────── */
interface MonthRecord {
  id: string;
  thang: string;
  nam: number;
  loai: Array<'Đề xuất duyệt chi' | 'Hạch toán' | 'Chi thực tế'>;
  soBanGhi: number;
  tongTien: string;
}

const mockData: MonthRecord[] = [
  {
    id: 'thang-8',
    thang: 'Tháng 8',
    nam: 2026,
    loai: ['Đề xuất duyệt chi', 'Hạch toán'],
    soBanGhi: 3,
    tongTien: '19.640.450 đ',
  },
  {
    id: 'thang-7',
    thang: 'Tháng 7',
    nam: 2026,
    loai: ['Hạch toán', 'Chi thực tế', 'Đề xuất duyệt chi'],
    soBanGhi: 6,
    tongTien: '68.128.600 đ',
  },
  {
    id: 'thang-6',
    thang: 'Tháng 6',
    nam: 2026,
    loai: ['Hạch toán', 'Đề xuất duyệt chi', 'Chi thực tế'],
    soBanGhi: 6,
    tongTien: '87.187.352 đ',
  },
  {
    id: 'thang-5',
    thang: 'Tháng 5',
    nam: 2026,
    loai: ['Hạch toán', 'Đề xuất duyệt chi', 'Chi thực tế'],
    soBanGhi: 10,
    tongTien: '356.934.120 đ',
  },
  {
    id: 'thang-4',
    thang: 'Tháng 4',
    nam: 2026,
    loai: ['Hạch toán', 'Đề xuất duyệt chi', 'Chi thực tế'],
    soBanGhi: 5,
    tongTien: '207.485.820 đ',
  },
  {
    id: 'thang-3',
    thang: 'Tháng 3',
    nam: 2026,
    loai: ['Hạch toán', 'Đề xuất duyệt chi', 'Chi thực tế'],
    soBanGhi: 5,
    tongTien: '207.485.820 đ',
  },
  {
    id: 'thang-2',
    thang: 'Tháng 2',
    nam: 2026,
    loai: ['Hạch toán', 'Chi thực tế', 'Đề xuất duyệt chi'],
    soBanGhi: 6,
    tongTien: '340.263.840,78 đ',
  },
  {
    id: 'thang-1',
    thang: 'Tháng 1',
    nam: 2026,
    loai: ['Hạch toán', 'Đề xuất duyệt chi', 'Chi thực tế'],
    soBanGhi: 3,
    tongTien: '139.968.906 đ',
  },
];

type FilterTab = 'Tất cả' | 'Đề xuất duyệt chi' | 'Hạch toán' | 'Chi thực tế';

/* ─── Main Component ─────────────────────────────────────────── */
export default function DeXuatHachToanTab() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filterTabs: FilterTab[] = ['Tất cả', 'Đề xuất duyệt chi', 'Hạch toán', 'Chi thực tế'];

  // Filter records based on selected tab and search term
  const filteredData = mockData.filter((row) => {
    const matchesFilter =
      activeFilter === 'Tất cả' || row.loai.includes(activeFilter as any);
    const matchesSearch =
      row.thang.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.nam.toString().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  // Calculate pagination values
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const handleFilterChange = (tab: FilterTab) => {
    setActiveFilter(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden gap-3.5 bg-slate-50 p-1">
      {/* ── Top Bar Controls ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
        
        {/* Left: Filter Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => handleFilterChange(tab)}
                className={`px-3.5 py-1.5 text-xs rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#406c89] text-white font-medium shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-100/60 font-normal'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Right: Search Input & Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Tìm theo tháng, năm..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            />
          </div>

          {/* Report Analytics Button */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200/90 text-slate-700 text-xs font-normal rounded-lg hover:bg-slate-50 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
          >
            <IconChartBar size={14} className="text-slate-500" />
            <span>Báo cáo tổng hợp</span>
          </button>

          {/* Create New Button */}
          <button
            type="button"
            className="flex items-center gap-1 px-3.5 py-1.5 bg-[#406c89] text-white text-xs font-medium rounded-lg hover:bg-[#345870] transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
          >
            <IconPlus size={14} />
            <span>Tạo mới</span>
          </button>
        </div>
      </div>

      {/* ── Table Container ── */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col overflow-hidden">
        <div className="overflow-auto flex-1">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-[#f8fafc] border-b border-slate-200/90 sticky top-0 z-10">
              <tr>
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>THÁNG</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap text-center">
                  THAO TÁC
                </th>
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>NĂM</span>
                    <IconArrowDown size={13} className="text-slate-500" />
                  </div>
                </th>
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap">
                  LOẠI
                </th>
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1 cursor-pointer select-none">
                    <span>SỐ BẢN GHI</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-5 font-semibold text-slate-500 uppercase tracking-wider text-[11px] whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1 cursor-pointer select-none">
                    <span>TỔNG TIỀN</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  {/* THÁNG */}
                  <td className="py-3.5 px-5 font-semibold text-[#406c89] whitespace-nowrap">
                    {row.thang}
                  </td>

                  {/* THAO TÁC */}
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        className="text-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer"
                        title="Thêm"
                      >
                        <IconPlus size={15} className="stroke-[2.5]" />
                      </button>
                      <button
                        type="button"
                        className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        title="Sửa"
                      >
                        <IconPencil size={15} />
                      </button>
                      <button
                        type="button"
                        className="text-rose-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Xóa"
                      >
                        <IconTrash size={15} />
                      </button>
                    </div>
                  </td>

                  {/* NĂM */}
                  <td className="py-3.5 px-5 text-slate-600 font-medium whitespace-nowrap">
                    {row.nam}
                  </td>

                  {/* LOẠI (Badges) */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {row.loai.map((item) => {
                        if (item === 'Đề xuất duyệt chi') {
                          return (
                            <span
                              key={item}
                              className="px-2.5 py-0.5 rounded-full text-[10.5px] font-normal bg-[#eef2ff] text-[#3b51b5] border border-[#c7d2fe]"
                            >
                              Đề xuất duyệt chi
                            </span>
                          );
                        }
                        if (item === 'Hạch toán') {
                          return (
                            <span
                              key={item}
                              className="px-2.5 py-0.5 rounded-full text-[10.5px] font-normal bg-[#fffbe6] text-[#d97706] border border-[#fef08a]"
                            >
                              Hạch toán
                            </span>
                          );
                        }
                        return (
                          <span
                            key={item}
                            className="px-2.5 py-0.5 rounded-full text-[10.5px] font-normal bg-[#fcf0ff] text-[#c026d3] border border-[#f5d0fe]"
                          >
                            Chi thực tế
                          </span>
                        );
                      })}
                    </div>
                  </td>

                  {/* SỐ BẢN GHI */}
                  <td className="py-3.5 px-5 text-slate-700 font-medium text-right whitespace-nowrap">
                    {row.soBanGhi}
                  </td>

                  {/* TỔNG TIỀN */}
                  <td className="py-3.5 px-5 text-slate-900 font-bold text-right whitespace-nowrap">
                    {row.tongTien}
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Không tìm thấy dữ liệu phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Bottom Pagination Bar ── */}
        <div className="shrink-0 z-10 bg-white border-t border-slate-200/90 px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs select-none">
          <div className="flex items-center gap-3 text-slate-500 font-medium text-xs">
            <div>
              Hiển thị{' '}
              <span className="font-bold text-slate-800">
                {totalItems > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + pageSize, totalItems)}
              </span>{' '}
              trên <span className="font-bold text-slate-800">{totalItems}</span> bản ghi
            </div>
            <div className="flex items-center gap-1.5 ml-2 border-l border-slate-200 pl-3">
              <span>Hiển thị:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value={5}>5 bản ghi</option>
                <option value={10}>10 bản ghi</option>
                <option value={20}>20 bản ghi</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-lg border transition-all ${
                currentPage === 1
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
              }`}
              title="Trang trước"
            >
              <IconChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                  currentPage === pageNum
                    ? 'bg-[#406c89] text-white shadow-2xs font-bold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-lg border transition-all ${
                currentPage === totalPages
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
              }`}
              title="Trang sau"
            >
              <IconChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
