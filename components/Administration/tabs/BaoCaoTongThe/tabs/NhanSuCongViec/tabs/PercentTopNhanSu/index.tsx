"use client";

import React, { useState, useMemo } from 'react';
import { IconSearch, IconArrowsSort, IconChevronDown, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface ProjectShare {
  projectName: string;
  pct: number;
}

interface StaffPercentParticipationItem {
  id: string;
  staffName: string;
  department: string;
  totalPct: number;
  actualHours: number;
  projectShares: ProjectShare[];
}

const MOCK_TOP_PARTICIPATION_STAFF: StaffPercentParticipationItem[] = [
  {
    id: '1',
    staffName: 'Lê Quốc Long',
    department: 'Phòng Khai triển',
    totalPct: 8.21,
    actualHours: 445.0,
    projectShares: [
      { projectName: '22 LIỄU GIAI', pct: 8.16 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.04 },
      { projectName: 'PHÒNG HỌP MHV', pct: 0.00 },
      { projectName: 'VSIP LẠNG SƠN', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.00 },
      { projectName: 'QUY HOẠCH TỈNH ...', pct: 0.00 },
      { projectName: 'HERITAGE VILLAG...', pct: 0.00 },
      { projectName: 'BÁO CÁO NGOÀI D...', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'Dự án IA25 -CIPUT...', pct: 0.00 },
    ],
  },
  {
    id: '2',
    staffName: 'Nguyễn Thanh Tuấn',
    department: 'Phòng Khai triển',
    totalPct: 6.43,
    actualHours: 264.0,
    projectShares: [
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 6.43 },
      { projectName: 'Dự án IA25 -CIPUT...', pct: 0.00 },
    ],
  },
  {
    id: '3',
    staffName: 'Trần Diễm My',
    department: 'Phòng Khai triển',
    totalPct: 5.37,
    actualHours: 655.1,
    projectShares: [
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 3.48 },
      { projectName: '22 LIỄU GIAI', pct: 1.89 },
      { projectName: 'QUÀ TẶNG KHÁCH...', pct: 0.00 },
      { projectName: 'PHÒNG HỌP MHV', pct: 0.00 },
      { projectName: 'VSIP LẠNG SƠN', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.00 },
      { projectName: 'QUY HOẠCH TỈNH ...', pct: 0.00 },
      { projectName: 'HERITAGE VILLAG...', pct: 0.00 },
      { projectName: 'BÁO CÁO NGOÀI D...', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'Dự án IA25 -CIPUT...', pct: 0.00 },
    ],
  },
  {
    id: '4',
    staffName: 'Đào Văn Thọ',
    department: 'Phòng Khai triển',
    totalPct: 3.35,
    actualHours: 311.7,
    projectShares: [
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 1.85 },
      { projectName: '22 LIỄU GIAI', pct: 1.50 },
      { projectName: 'VSIP LẠNG SƠN', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'HERITAGE VILLAG...', pct: 0.00 },
      { projectName: 'BÁO CÁO NGOÀI D...', pct: 0.00 },
    ],
  },
  {
    id: '5',
    staffName: 'Nguyễn Thiên Hương',
    department: 'Phòng Khai triển',
    totalPct: 3.33,
    actualHours: 498.0,
    projectShares: [
      { projectName: '22 LIỄU GIAI', pct: 2.63 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.70 },
      { projectName: 'PHÒNG HỌP MHV', pct: 0.00 },
      { projectName: 'VSIP LẠNG SƠN', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.00 },
      { projectName: 'QUY HOẠCH TỈNH ...', pct: 0.00 },
      { projectName: 'HERITAGE VILLAG...', pct: 0.00 },
      { projectName: 'BÁO CÁO NGOÀI D...', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'Dự án IA25 -CIPUT...', pct: 0.00 },
    ],
  },
  {
    id: '6',
    staffName: 'Dương Việt Anh',
    department: 'Phòng Khai triển',
    totalPct: 2.10,
    actualHours: 409.7,
    projectShares: [
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 1.87 },
      { projectName: '22 LIỄU GIAI', pct: 0.22 },
      { projectName: 'QUÀ TẶNG KHÁCH...', pct: 0.00 },
      { projectName: 'PHÒNG HỌP MHV', pct: 0.00 },
      { projectName: 'VSIP LẠNG SƠN', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.00 },
      { projectName: 'QUY HOẠCH TỈNH ...', pct: 0.00 },
      { projectName: 'HERITAGE VILLAG...', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'Dự án IA25 -CIPUT...', pct: 0.00 },
    ],
  },
  {
    id: '7',
    staffName: 'Phạm Tiến Thành',
    department: 'Phòng Khai triển',
    totalPct: 1.23,
    actualHours: 497.7,
    projectShares: [
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.63 },
      { projectName: '22 LIỄU GIAI', pct: 0.60 },
      { projectName: 'QUÀ TẶNG KHÁCH...', pct: 0.00 },
      { projectName: 'PHÒNG HỌP MHV', pct: 0.00 },
      { projectName: 'VSIP LẠNG SƠN', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'QUY HOẠCH TỈNH ...', pct: 0.00 },
      { projectName: 'HERITAGE VILLAG...', pct: 0.00 },
      { projectName: 'BÁO CÁO NGOÀI D...', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
    ],
  },
  {
    id: '8',
    staffName: 'Phạm Thị Thu Trang',
    department: 'Phòng Cảnh Quan',
    totalPct: 0.00,
    actualHours: 451.5,
    projectShares: [
      { projectName: 'QUÀ TẶNG KHÁCH...', pct: 0.00 },
      { projectName: 'VSIP LẠNG SƠN', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.00 },
      { projectName: '22 LIỄU GIAI', pct: 0.00 },
      { projectName: 'QUY HOẠCH TỈNH ...', pct: 0.00 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.00 },
      { projectName: 'HERITAGE VILLAG...', pct: 0.00 },
      { projectName: 'BÁO CÁO NGOÀI D...', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
    ],
  },
  {
    id: '9',
    staffName: 'Nguyễn Thị Hương',
    department: 'Phòng Cảnh Quan',
    totalPct: 0.00,
    actualHours: 363.0,
    projectShares: [
      { projectName: 'QUÀ TẶNG KHÁCH...', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'QUY HOẠCH TỈNH ...', pct: 0.00 },
      { projectName: 'HERITAGE VILLAG...', pct: 0.00 },
      { projectName: 'BÁO CÁO NGOÀI D...', pct: 0.00 },
    ],
  },
  {
    id: '10',
    staffName: 'Sầm Thị Thúy',
    department: 'Phòng Cảnh Quan',
    totalPct: 0.00,
    actualHours: 438.5,
    projectShares: [
      { projectName: 'QUÀ TẶNG KHÁCH...', pct: 0.00 },
      { projectName: 'VSIP LẠNG SƠN', pct: 0.00 },
      { projectName: '22 LIỄU GIAI', pct: 0.00 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'Dự án IA25 -CIPUT...', pct: 0.00 },
    ],
  },
  {
    id: '11',
    staffName: 'Tống Thị Thu',
    department: 'Phòng Cảnh Quan',
    totalPct: 0.00,
    actualHours: 621.5,
    projectShares: [
      { projectName: 'QUÀ TẶNG KHÁCH...', pct: 0.00 },
      { projectName: 'VSIP LẠNG SƠN', pct: 0.00 },
      { projectName: '22 LIỄU GIAI', pct: 0.00 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'Dự án IA25 -CIPUT...', pct: 0.00 },
    ],
  },
  {
    id: '12',
    staffName: 'Hoàng Hữu Vinh',
    department: 'Phòng Cắt',
    totalPct: 0.00,
    actualHours: 411.0,
    projectShares: [
      { projectName: 'VSIP LẠNG SƠN', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.00 },
      { projectName: '22 LIỄU GIAI', pct: 0.00 },
      { projectName: 'QUY HOẠCH TỈNH ...', pct: 0.00 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.00 },
      { projectName: 'HERITAGE VILLAG...', pct: 0.00 },
      { projectName: 'BÁO CÁO NGOÀI D...', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'Dự án IA25 -CIPUT...', pct: 0.00 },
    ],
  },
  {
    id: '13',
    staffName: 'Nguyễn Tuấn Việt',
    department: 'Phòng Cắt',
    totalPct: 0.00,
    actualHours: 388.0,
    projectShares: [
      { projectName: 'VSIP LẠNG SƠN', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: '22 LIỄU GIAI', pct: 0.00 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.00 },
      { projectName: 'HERITAGE VILLAG...', pct: 0.00 },
      { projectName: 'BÁO CÁO NGOÀI D...', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'Dự án IA25 -CIPUT...', pct: 0.00 },
    ],
  },
  {
    id: '14',
    staffName: 'Lê Trung Hiếu',
    department: 'Phòng Cắt',
    totalPct: 0.00,
    actualHours: 411.0,
    projectShares: [
      { projectName: 'VSIP LẠNG SƠN', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.00 },
      { projectName: '22 LIỄU GIAI', pct: 0.00 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.00 },
      { projectName: 'HERITAGE VILLAG...', pct: 0.00 },
      { projectName: 'BÁO CÁO NGOÀI D...', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'Dự án IA25 -CIPUT...', pct: 0.00 },
    ],
  },
  {
    id: '15',
    staffName: 'MÁY CẮT 5 - CMH1610-B-A-2025',
    department: 'Phòng Cắt',
    totalPct: 0.00,
    actualHours: 124.0,
    projectShares: [
      { projectName: 'VSIP LẠNG SƠN', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'CHỈNH SỬA MÔ HÌ...', pct: 0.00 },
      { projectName: '22 LIỄU GIAI', pct: 0.00 },
      { projectName: 'THE HERITAGE TÂ...', pct: 0.00 },
      { projectName: 'Dự án IA25 -CIPUT...', pct: 0.00 },
    ],
  },
];

export default function PercentTopNhanSu() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof StaffPercentParticipationItem | null>('totalPct');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key: keyof StaffPercentParticipationItem) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const filteredAndSorted = useMemo(() => {
    return MOCK_TOP_PARTICIPATION_STAFF.filter(
      (s) =>
        s.staffName.toLowerCase().includes(search.toLowerCase()) ||
        s.department.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => {
      if (!sortKey) return 0;
      const va = a[sortKey];
      const vb = b[sortKey];
      if (typeof va === 'number' && typeof vb === 'number') {
        return sortDir === 'asc' ? va - vb : vb - va;
      }
      return sortDir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
  }, [search, sortKey, sortDir]);

  const totalFiltered = filteredAndSorted.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFiltered);
  const paginated = filteredAndSorted.slice(startIndex, endIndex);

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2 overflow-hidden select-none">
      {/* SEARCH BAR */}
      <div className="relative shrink-0">
        <IconSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên nhân sự, phòng ban..."
          className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200/80 rounded-lg text-[11px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
        />
      </div>

      {/* TABLE MATCHING USER SCREENSHOT EXACTLY */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[850px]">
            <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-slate-200">
              <tr className="bg-slate-50 text-slate-600 font-bold">
                {/* Cột 1: Nhân sự */}
                <th className="px-4 py-3 border-b border-slate-200 w-44">
                  <button
                    type="button"
                    onClick={() => handleSort('staffName')}
                    className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold"
                  >
                    <span>Nhân sự</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>

                {/* Cột 2: Phòng ban */}
                <th className="px-4 py-3 border-b border-slate-200 w-36">
                  <button
                    type="button"
                    onClick={() => handleSort('department')}
                    className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold"
                  >
                    <span>Phòng ban</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>

                {/* Cột 3: Tổng % tham gia */}
                <th className="px-4 py-3 border-b border-slate-200 text-right w-28">
                  <button
                    type="button"
                    onClick={() => handleSort('totalPct')}
                    className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold w-full"
                  >
                    <span>Tổng % tham gia</span>
                    <IconChevronDown size={12} className="text-slate-600" />
                  </button>
                </th>

                {/* Cột 4: Giờ TT */}
                <th className="px-4 py-3 border-b border-slate-200 text-right w-24">
                  <button
                    type="button"
                    onClick={() => handleSort('actualHours')}
                    className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold w-full"
                  >
                    <span>Giờ TT</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>

                {/* Cột 5: Phân bổ theo dự án */}
                <th className="px-4 py-3 border-b border-slate-200">
                  <span>Phân bổ theo dự án</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400 text-xs">
                    Không tìm thấy nhân sự phù hợp.
                  </td>
                </tr>
              ) : (
                paginated.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Cột 1: Nhân sự */}
                    <td className="px-4 py-3.5 font-bold text-slate-800">
                      {s.staffName}
                    </td>

                    {/* Cột 2: Phòng ban */}
                    <td className="px-4 py-3.5 font-semibold text-slate-500 text-[11px]">
                      {s.department}
                    </td>

                    {/* Cột 3: Tổng % tham gia */}
                    <td className="px-4 py-3.5 text-right font-bold text-emerald-600 text-xs">
                      {s.totalPct.toFixed(2)}%
                    </td>

                    {/* Cột 4: Giờ TT */}
                    <td className="px-4 py-3.5 text-right font-bold text-amber-700 text-xs">
                      {s.actualHours.toFixed(1)}h
                    </td>

                    {/* Cột 5: Phân bổ theo dự án (Green pill badges) */}
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {s.projectShares.map((ps, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] rounded px-2 py-0.5 text-[11px] font-medium"
                          >
                            <span>{ps.projectName}</span>
                            <strong className="font-bold text-[#065f46]">{ps.pct.toFixed(2)}%</strong>
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div>
            Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalFiltered}</span> nhân sự
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
