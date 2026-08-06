"use client";

import React, { useState, useMemo } from 'react';
import { IconSearch, IconArrowsSort, IconChevronDown, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface DeptAllocation {
  deptName: string;
  pct: number;
}

interface ProjectPercentItem {
  id: string;
  projectName: string;
  allocations: DeptAllocation[];
  totalPct: number;
  status: string;
}

const MOCK_PERCENT_PROJECTS: ProjectPercentItem[] = [
  {
    id: '1',
    projectName: '22 LIỄU GIAI',
    allocations: [
      { deptName: 'Ghép', pct: 25.0 },
      { deptName: 'Khai triển', pct: 15.0 },
      { deptName: 'Cảnh Quan', pct: 13.0 },
      { deptName: 'Điện', pct: 12.0 },
      { deptName: 'Ban Giám đốc', pct: 10.0 },
      { deptName: 'Khối Văn phòng', pct: 10.0 },
      { deptName: 'Mộc Sơn', pct: 7.0 },
      { deptName: 'Cắt', pct: 4.0 },
      { deptName: 'Công nghệ và Thiết kế', pct: 4.0 },
    ],
    totalPct: 100.0,
    status: 'Chờ phê duyệt',
  },
  {
    id: '2',
    projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
    allocations: [
      { deptName: 'Ghép', pct: 26.0 },
      { deptName: 'Khai triển', pct: 15.0 },
      { deptName: 'Điện', pct: 12.0 },
      { deptName: 'Ban Giám đốc', pct: 10.0 },
      { deptName: 'Khối Văn phòng', pct: 10.0 },
      { deptName: 'Cảnh Quan', pct: 10.0 },
      { deptName: 'Mộc Sơn', pct: 8.0 },
      { deptName: 'Công nghệ và Thiết kế', pct: 5.0 },
      { deptName: 'Cắt', pct: 4.0 },
    ],
    totalPct: 100.0,
    status: 'Chờ phê duyệt',
  },
  { id: '3', projectName: 'QUÀ TẶNG KHÁCH HÀNG', allocations: [], totalPct: 0.0, status: 'Chờ phê duyệt' },
  { id: '4', projectName: 'PHÒNG HỌP MHV', allocations: [], totalPct: 0.0, status: 'Chờ phê duyệt' },
  { id: '5', projectName: 'VSIP LẠNG SƠN', allocations: [], totalPct: 0.0, status: 'Chờ phê duyệt' },
  { id: '6', projectName: 'THE HERITAGE TÂY NINH - Lắp đặt tại Hà Nội', allocations: [], totalPct: 0.0, status: 'Chờ phê duyệt' },
  { id: '7', projectName: 'CHỈNH SỬA MÔ HÌNH NEWEB', allocations: [], totalPct: 0.0, status: 'Chờ phê duyệt' },
  { id: '8', projectName: 'KIEN GIANG MASTER PLAN PROJECT MODEL', allocations: [], totalPct: 0.0, status: 'Chờ phê duyệt' },
  { id: '9', projectName: 'QUY HOẠCH TỈNH HƯNG YÊN', allocations: [], totalPct: 0.0, status: 'Chờ phê duyệt' },
  { id: '10', projectName: 'HERITAGE VILLAGE MOC CHAU', allocations: [], totalPct: 0.0, status: 'Chờ phê duyệt' },
  { id: '11', projectName: 'BÁO CÁO NGOÀI DỰ ÁN', allocations: [], totalPct: 0.0, status: 'Chờ phê duyệt' },
  { id: '12', projectName: 'THE HERITAGE TÂY NINH - Lắp đặt tại Tây Ninh', allocations: [], totalPct: 0.0, status: 'Chờ phê duyệt' },
  { id: '13', projectName: 'Dự án IA25 -CIPUTRA', allocations: [], totalPct: 0.0, status: 'Chờ phê duyệt' },
];

export default function PercentTheoDuAn() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof ProjectPercentItem | null>('totalPct');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key: keyof ProjectPercentItem) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const filteredAndSorted = useMemo(() => {
    return MOCK_PERCENT_PROJECTS.filter((p) =>
      p.projectName.toLowerCase().includes(search.toLowerCase())
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
          placeholder="Tìm kiếm dự án..."
          className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200/80 rounded-lg text-[11px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
        />
      </div>

      {/* TABLE WITH PAGINATION */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[760px]">
            <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-slate-200">
              <tr className="bg-slate-50 text-slate-600 font-bold">
                {/* Cột 1: Dự án */}
                <th className="px-4 py-3 border-b border-slate-200 w-64">
                  <button
                    type="button"
                    onClick={() => handleSort('projectName')}
                    className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold"
                  >
                    <span>Dự án</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>

                {/* Cột 2: Phân bổ % theo phòng */}
                <th className="px-4 py-3 border-b border-slate-200">
                  <span>Phân bổ % theo phòng</span>
                </th>

                {/* Cột 3: Tổng */}
                <th className="px-4 py-3 border-b border-slate-200 text-right w-24">
                  <button
                    type="button"
                    onClick={() => handleSort('totalPct')}
                    className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold w-full"
                  >
                    <span>Tổng</span>
                    <IconChevronDown size={12} className="text-slate-600" />
                  </button>
                </th>

                {/* Cột 4: Trạng thái */}
                <th className="px-4 py-3 border-b border-slate-200 text-center w-36">
                  <button
                    type="button"
                    onClick={() => handleSort('status')}
                    className="flex items-center justify-center gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold w-full"
                  >
                    <span>Trạng thái</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-slate-400 text-xs">
                    Không tìm thấy dự án phù hợp.
                  </td>
                </tr>
              ) : (
                paginated.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Cột 1: Dự án */}
                    <td className="px-4 py-3.5 font-bold text-slate-800 uppercase leading-snug">
                      {p.projectName}
                    </td>

                    {/* Cột 2: Phân bổ % theo phòng */}
                    <td className="px-4 py-3.5">
                      {p.allocations.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {p.allocations.map((a, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 bg-[#f5efff] text-[#6b21a8] border border-[#e9d5ff] rounded px-2 py-0.5 text-[11px] font-medium"
                            >
                              <span>{a.deptName}</span>
                              <strong className="font-bold text-[#581c87]">{a.pct.toFixed(1)}%</strong>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 font-normal italic text-xs">
                          Chưa có dữ liệu %
                        </span>
                      )}
                    </td>

                    {/* Cột 3: Tổng */}
                    <td className="px-4 py-3.5 text-right font-bold text-slate-900 text-xs">
                      {p.totalPct.toFixed(1)}%
                    </td>

                    {/* Cột 4: Trạng thái */}
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#fffbeb] text-[#b45309] border border-[#fde68a]">
                        {p.status}
                      </span>
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
            Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalFiltered}</span> dự án
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
