"use client";

import React, { useState } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface ChiPhiNhanSuItem {
  id: string;
  nhanSu: string;
  gioTt: number;
  ngay8: number | null;
  donGiaNgay: number | null;
  chiPhi: number | null;
}

const SAMPLE_CHI_PHI_DATA: ChiPhiNhanSuItem[] = [
  {
    id: '1',
    nhanSu: 'Kỳ Anh',
    gioTt: 17,
    ngay8: 2.13,
    donGiaNgay: null,
    chiPhi: null,
  },
  {
    id: '2',
    nhanSu: 'Nguyễn Phú Quang',
    gioTt: 12,
    ngay8: 1.50,
    donGiaNgay: 727790,
    chiPhi: 1091685,
  },
  {
    id: '3',
    nhanSu: 'Thảo Phùng',
    gioTt: 1,
    ngay8: 0.13,
    donGiaNgay: null,
    chiPhi: null,
  },
  {
    id: '4',
    nhanSu: 'Bùi Thị Duyên',
    gioTt: 0,
    ngay8: null,
    donGiaNgay: 1013665,
    chiPhi: null,
  },
  {
    id: '5',
    nhanSu: 'Bùi Phương Uyên',
    gioTt: 0,
    ngay8: null,
    donGiaNgay: 682918,
    chiPhi: null,
  },
];

const ITEMS_PER_PAGE = 10;

function formatMoney(amount: number | null): string {
  if (amount === null || amount === undefined) return '—';
  return `${amount.toLocaleString('vi-VN')} đ`;
}

export default function ChiPhiPhongBanTab() {
  const [dataList] = useState<ChiPhiNhanSuItem[]>(SAMPLE_CHI_PHI_DATA);
  const [currentPage, setCurrentPage] = useState(1);

  // Summary Metrics
  const totalNhanSu = dataList.length;
  const totalGioTt = dataList.reduce((sum, item) => sum + item.gioTt, 0);
  const totalChiPhi = dataList.reduce((sum, item) => sum + (item.chiPhi || 0), 0);

  // Pagination logic
  const totalFiltered = dataList.length;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalFiltered);
  const paginatedList = dataList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex-1 flex flex-col h-full space-y-3 min-h-0 overflow-hidden">
      {/* ── 1. Summary Stats Cards (Row of 3 Cards matching screenshot) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs flex flex-col justify-center min-h-[72px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Nhân sự</p>
          <p className="text-xl font-black text-slate-900 tracking-tight">{totalNhanSu}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs flex flex-col justify-center min-h-[72px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Tổng Giờ TT</p>
          <p className="text-xl font-black text-amber-600 tracking-tight">{totalGioTt}h</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs flex flex-col justify-center min-h-[72px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Tổng chi phí</p>
          <p className="text-xl font-black text-emerald-600 tracking-tight">
            {formatMoney(totalChiPhi)}
          </p>
        </div>
      </div>

      {/* ── 2. Data Table Matching Screenshot ── */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead className="sticky top-0 z-10 bg-slate-50/90 border-b border-slate-200">
              <tr className="text-slate-500 font-bold text-[11px]">
                <th className="px-4 py-3 text-left font-bold text-slate-600">Nhân sự</th>
                <th className="px-4 py-3 text-right font-bold text-slate-600 w-28">Giờ TT</th>
                <th className="px-4 py-3 text-right font-bold text-slate-600 w-28">Ngày (÷8)</th>
                <th className="px-4 py-3 text-right font-bold text-slate-600 w-36">Đơn giá/ngày</th>
                <th className="px-4 py-3 text-right font-bold text-slate-600 w-36">Chi phí</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedList.map((item, idx) => (
                <tr key={`${item.id}-${idx}`} className="hover:bg-slate-50/70 transition-colors">
                  {/* Tên nhân sự */}
                  <td className="px-4 py-3.5 font-bold text-slate-800 text-xs">
                    {item.nhanSu}
                  </td>

                  {/* Giờ TT */}
                  <td className="px-4 py-3.5 text-right font-bold text-amber-600">
                    {item.gioTt}h
                  </td>

                  {/* Ngày (÷8) */}
                  <td className="px-4 py-3.5 text-right font-medium text-slate-400">
                    {item.ngay8 !== null ? item.ngay8.toFixed(2) : '—'}
                  </td>

                  {/* Đơn giá/ngày */}
                  <td className="px-4 py-3.5 text-right font-medium text-slate-500">
                    {formatMoney(item.donGiaNgay)}
                  </td>

                  {/* Chi phí */}
                  <td className="px-4 py-3.5 text-right font-bold text-emerald-600">
                    {formatMoney(item.chiPhi)}
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Total Row */}
            <tfoot className="bg-slate-50/80 border-t border-slate-200 font-bold">
              <tr>
                <td className="px-4 py-3 text-left font-black text-slate-900">Tổng cộng</td>
                <td className="px-4 py-3 text-right text-amber-600">
                  {paginatedList.reduce((sum, item) => sum + item.gioTt, 0)}h
                </td>
                <td className="px-4 py-3 text-right text-slate-400"></td>
                <td className="px-4 py-3 text-right text-slate-500"></td>
                <td className="px-4 py-3 text-right font-black text-emerald-600 text-sm">
                  {formatMoney(totalChiPhi)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* ── 3. Pagination Footer (Pinned at Bottom) ── */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div>
            Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> -{' '}
            <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số{' '}
            <span className="font-bold text-slate-700">{totalFiltered}</span> nhân sự
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <IconChevronLeft size={13} />
              <span>Trước</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#406c89] text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Sau</span>
              <IconChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
