"use client";

import React, { useState } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface NhanSuProgressItem {
  id: string;
  nhanSu: string;
  soCv: number;
  gioKh: number;
  gioTt: number;
  pctTtKh: number;
}

const SAMPLE_NHAN_SU_DATA: NhanSuProgressItem[] = [
  {
    id: '1',
    nhanSu: 'Kỳ Anh',
    soCv: 44,
    gioKh: 43,
    gioTt: 17,
    pctTtKh: 40,
  },
  {
    id: '2',
    nhanSu: 'Nguyễn Phú Quang',
    soCv: 26,
    gioKh: 26,
    gioTt: 12,
    pctTtKh: 46,
  },
  {
    id: '3',
    nhanSu: 'Thảo Phùng',
    soCv: 0,
    gioKh: 0,
    gioTt: 1,
    pctTtKh: 0,
  },
  {
    id: '4',
    nhanSu: 'Bùi Thị Duyên',
    soCv: 8,
    gioKh: 8,
    gioTt: 0,
    pctTtKh: 0,
  },
  {
    id: '5',
    nhanSu: 'Bùi Phương Uyên',
    soCv: 2,
    gioKh: 2,
    gioTt: 0,
    pctTtKh: 0,
  },
  {
    id: '6',
    nhanSu: 'Kỳ Anh (Dự án 2)',
    soCv: 44,
    gioKh: 43,
    gioTt: 17,
    pctTtKh: 40,
  },
  {
    id: '7',
    nhanSu: 'Nguyễn Phú Quang (Dự án 2)',
    soCv: 26,
    gioKh: 26,
    gioTt: 12,
    pctTtKh: 46,
  },
  {
    id: '8',
    nhanSu: 'Thảo Phùng (Dự án 2)',
    soCv: 0,
    gioKh: 0,
    gioTt: 1,
    pctTtKh: 0,
  },
  {
    id: '9',
    nhanSu: 'Bùi Thị Duyên (Dự án 2)',
    soCv: 8,
    gioKh: 8,
    gioTt: 0,
    pctTtKh: 0,
  },
  {
    id: '10',
    nhanSu: 'Bùi Phương Uyên (Dự án 2)',
    soCv: 2,
    gioKh: 2,
    gioTt: 0,
    pctTtKh: 0,
  },
  {
    id: '11',
    nhanSu: 'Kỳ Anh (Dự án 3)',
    soCv: 44,
    gioKh: 43,
    gioTt: 17,
    pctTtKh: 40,
  },
  {
    id: '12',
    nhanSu: 'Nguyễn Phú Quang (Dự án 3)',
    soCv: 26,
    gioKh: 26,
    gioTt: 12,
    pctTtKh: 46,
  },
  {
    id: '13',
    nhanSu: 'Thảo Phùng (Dự án 3)',
    soCv: 0,
    gioKh: 0,
    gioTt: 1,
    pctTtKh: 0,
  },
  {
    id: '14',
    nhanSu: 'Bùi Thị Duyên (Dự án 3)',
    soCv: 8,
    gioKh: 8,
    gioTt: 0,
    pctTtKh: 0,
  },
  {
    id: '15',
    nhanSu: 'Bùi Phương Uyên (Dự án 3)',
    soCv: 2,
    gioKh: 2,
    gioTt: 0,
    pctTtKh: 0,
  },
];

const ITEMS_PER_PAGE = 10;

export default function NhanSuCongViecTab() {
  const [dataList] = useState<NhanSuProgressItem[]>(SAMPLE_NHAN_SU_DATA);
  const [currentPage, setCurrentPage] = useState(1);

  // Summary Card values
  const totalNhanSu = dataList.length;
  const totalGioKh = dataList.reduce((sum, item) => sum + item.gioKh, 0);
  const totalGioTt = dataList.reduce((sum, item) => sum + item.gioTt, 0);
  const pctGioTtKh = totalGioKh > 0 ? Math.round((totalGioTt / totalGioKh) * 100) : 0;

  // Pagination logic
  const totalFiltered = dataList.length;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalFiltered);
  const paginatedList = dataList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex-1 flex flex-col h-full space-y-3 min-h-0 overflow-hidden">
      {/* ── 1. Summary Stats Cards (Row of 4 Cards) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[68px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Nhân sự</p>
          <p className="text-xl font-black text-slate-900 tracking-tight">{totalNhanSu}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[68px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Tổng Giờ KH</p>
          <p className="text-xl font-black text-indigo-700 tracking-tight">{totalGioKh}h</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[68px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Tổng Giờ TT</p>
          <p className="text-xl font-black text-amber-600 tracking-tight">{totalGioTt}h</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-center min-h-[68px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">%Giờ TT/KH</p>
          <p className="text-xl font-black text-emerald-600 tracking-tight">{pctGioTtKh}%</p>
        </div>
      </div>

      {/* ── 2. Data Table with Fixed Pagination ── */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead className="sticky top-0 z-10 bg-slate-50/90 border-b border-slate-200">
              <tr className="text-slate-500 font-bold text-[11px]">
                <th className="px-4 py-3 text-left font-bold text-slate-600">Nhân sự</th>
                <th className="px-4 py-3 text-right font-bold text-slate-600 w-24">Số CV</th>
                <th className="px-4 py-3 text-right font-bold text-slate-600 w-24">Giờ KH</th>
                <th className="px-4 py-3 text-right font-bold text-slate-600 w-24">Giờ TT</th>
                <th className="px-4 py-3 text-right font-bold text-slate-600 w-44">% TT/KH</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedList.map((item, idx) => (
                <tr key={`${item.id}-${idx}`} className="hover:bg-slate-50/70 transition-colors">
                  {/* Tên nhân sự */}
                  <td className="px-4 py-3.5 font-bold text-slate-800 text-xs">
                    {item.nhanSu}
                  </td>

                  {/* Số CV */}
                  <td className="px-4 py-3.5 text-right font-semibold text-slate-700">
                    {item.soCv}
                  </td>

                  {/* Giờ KH */}
                  <td className="px-4 py-3.5 text-right font-bold text-indigo-700">
                    {item.gioKh}h
                  </td>

                  {/* Giờ TT */}
                  <td className="px-4 py-3.5 text-right font-bold text-amber-600">
                    {item.gioTt}h
                  </td>

                  {/* % TT/KH Progress Bar + Label */}
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(item.pctTtKh, 100)}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 w-8 text-right">
                        {item.pctTtKh}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
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
