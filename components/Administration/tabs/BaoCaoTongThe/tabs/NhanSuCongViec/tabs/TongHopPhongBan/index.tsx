"use client";

import React, { useState, useMemo } from 'react';
import { IconSearch, IconArrowsSort, IconChevronDown } from '@tabler/icons-react';

interface DepartmentSummaryItem {
  id: string;
  name: string;
  plannedHours: number; // Tổng giờ KH
  actualHours: number;  // Tổng giờ TT
  staffCount: number;   // Số NV
  projectCount: number; // Số dự án
  proportionPct: number; // Tỷ trọng (Giờ TT) %
}

const MOCK_SUMMARY_DEPTS: DepartmentSummaryItem[] = [
  { id: '1', name: 'Phòng Ghép', plannedHours: 6603, actualHours: 5181, staffCount: 1, projectCount: 12, proportionPct: 27.7 },
  { id: '2', name: 'Phòng Cảnh Quan', plannedHours: 5389, actualHours: 3922, staffCount: 1, projectCount: 13, proportionPct: 21.0 },
  { id: '3', name: 'Phòng Khai triển', plannedHours: 3629, actualHours: 3102, staffCount: 1, projectCount: 13, proportionPct: 16.6 },
  { id: '4', name: 'Phòng Cắt', plannedHours: 2663, actualHours: 2249, staffCount: 1, projectCount: 11, proportionPct: 12.0 },
  { id: '5', name: 'Phòng Điện', plannedHours: 2504, actualHours: 2131, staffCount: 1, projectCount: 11, proportionPct: 11.4 },
  { id: '6', name: 'Phòng Mộc Sơn', plannedHours: 2788, actualHours: 1657, staffCount: 1, projectCount: 11, proportionPct: 8.9 },
  { id: '7', name: 'Phòng Công nghệ và Thiết kế', plannedHours: 1038, actualHours: 255, staffCount: 1, projectCount: 11, proportionPct: 1.4 },
  { id: '8', name: 'Khối Văn phòng', plannedHours: 677, actualHours: 156, staffCount: 1, projectCount: 11, proportionPct: 0.8 },
  { id: '9', name: 'Ban Giám đốc', plannedHours: 170, actualHours: 20, staffCount: 1, projectCount: 10, proportionPct: 0.1 },
];

export default function TongHopPhongBan() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof DepartmentSummaryItem | null>('actualHours');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: keyof DepartmentSummaryItem) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const filteredAndSorted = useMemo(() => {
    return MOCK_SUMMARY_DEPTS.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
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

  // Totals
  const totalPlanned = useMemo(() => MOCK_SUMMARY_DEPTS.reduce((sum, d) => sum + d.plannedHours, 0), []);
  const totalActual = useMemo(() => MOCK_SUMMARY_DEPTS.reduce((sum, d) => sum + d.actualHours, 0), []);
  const totalStaff = useMemo(() => MOCK_SUMMARY_DEPTS.reduce((sum, d) => sum + d.staffCount, 0), []);
  const totalProjects = 13; // Distinct projects count across departments

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2 overflow-hidden select-none">
      {/* SEARCH BAR */}
      <div className="relative shrink-0">
        <IconSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm phòng ban..."
          className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200/80 rounded-lg text-[11px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
        />
      </div>

      {/* TABLE WITHOUT PAGINATION */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[760px]">
            <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-slate-200">
              <tr className="bg-slate-50 text-slate-600 font-bold">
                {/* Phòng ban */}
                <th className="px-4 py-3 border-b border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold"
                  >
                    <span>Phòng ban</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>

                {/* Tổng giờ KH */}
                <th className="px-4 py-3 border-b border-slate-200 text-right">
                  <button
                    type="button"
                    onClick={() => handleSort('plannedHours')}
                    className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold w-full"
                  >
                    <span>Tổng giờ KH</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>

                {/* Tổng giờ TT */}
                <th className="px-4 py-3 border-b border-slate-200 text-right">
                  <button
                    type="button"
                    onClick={() => handleSort('actualHours')}
                    className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold w-full"
                  >
                    <span>Tổng giờ TT</span>
                    <IconChevronDown size={12} className="text-slate-600" />
                  </button>
                </th>

                {/* Số NV */}
                <th className="px-4 py-3 border-b border-slate-200 text-right">
                  <button
                    type="button"
                    onClick={() => handleSort('staffCount')}
                    className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold w-full"
                  >
                    <span>Số NV</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>

                {/* Số dự án */}
                <th className="px-4 py-3 border-b border-slate-200 text-right">
                  <button
                    type="button"
                    onClick={() => handleSort('projectCount')}
                    className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold w-full"
                  >
                    <span>Số dự án</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>

                {/* Tỷ trọng (Giờ TT) */}
                <th className="px-4 py-3 border-b border-slate-200 text-right w-44">
                  <button
                    type="button"
                    onClick={() => handleSort('proportionPct')}
                    className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold w-full"
                  >
                    <span>Tỷ trọng (Giờ TT)</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredAndSorted.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400 text-xs">
                    Không tìm thấy phòng ban phù hợp.
                  </td>
                </tr>
              ) : (
                filteredAndSorted.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Phòng ban */}
                    <td className="px-4 py-3.5 font-bold text-slate-800">
                      {d.name}
                    </td>

                    {/* Tổng giờ KH */}
                    <td className="px-4 py-3.5 text-right font-bold text-indigo-600">
                      {d.plannedHours}h
                    </td>

                    {/* Tổng giờ TT */}
                    <td className="px-4 py-3.5 text-right font-bold text-amber-700">
                      {d.actualHours}h
                    </td>

                    {/* Số NV */}
                    <td className="px-4 py-3.5 text-right font-semibold text-slate-600">
                      {d.staffCount}
                    </td>

                    {/* Số dự án */}
                    <td className="px-4 py-3.5 text-right font-semibold text-slate-600">
                      {d.projectCount}
                    </td>

                    {/* Tỷ trọng (Giờ TT) Bar + Pct */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shrink-0">
                          <div
                            className="h-full rounded-full bg-amber-500 transition-all duration-500 shadow-2xs"
                            style={{ width: `${Math.min(d.proportionPct * 3.2, 100)}%` }}
                          />
                        </div>
                        <span className="font-semibold text-slate-500 w-10 text-right">
                          {d.proportionPct.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            {/* TOTAL FOOTER ROW MATCHING SCREENSHOT */}
            <tfoot className="bg-slate-50/80 border-t-2 border-slate-200 font-bold sticky bottom-0">
              <tr>
                <td className="px-4 py-3 text-slate-900 font-black">Tổng cộng</td>
                <td className="px-4 py-3 text-right font-black text-indigo-600">{totalPlanned}h</td>
                <td className="px-4 py-3 text-right font-black text-amber-700">{totalActual}h</td>
                <td className="px-4 py-3 text-right font-black text-slate-900">{totalStaff}</td>
                <td className="px-4 py-3 text-right font-black text-slate-900">{totalProjects}</td>
                <td className="px-4 py-3 text-right font-black text-slate-800">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
