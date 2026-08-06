"use client";

import React, { useState, useMemo } from 'react';
import { IconSearch, IconArrowsSort, IconChevronDown } from '@tabler/icons-react';

interface StaffSystemItem {
  id: string;
  staffName: string;
  department: string;
  plannedHours: number;  // Tổng giờ KH
  actualHours: number;   // Tổng giờ TT
  projectCount: number;  // Số dự án
  proportionPct: number; // Tỷ trọng (Giờ TT) %
}

const MOCK_TOP_STAFF_SYSTEM: StaffSystemItem[] = [
  { id: '1', staffName: '', department: 'Phòng Ghép', plannedHours: 6603.0, actualHours: 5181.0, projectCount: 12, proportionPct: 27.7 },
  { id: '2', staffName: '', department: 'Phòng Cảnh Quan', plannedHours: 5389.3, actualHours: 3921.6, projectCount: 13, proportionPct: 21.0 },
  { id: '3', staffName: '', department: 'Phòng Khai triển', plannedHours: 3629.1, actualHours: 3102.1, projectCount: 13, proportionPct: 16.6 },
  { id: '4', staffName: '', department: 'Phòng Cắt', plannedHours: 2663.0, actualHours: 2249.0, projectCount: 11, proportionPct: 12.0 },
  { id: '5', staffName: '', department: 'Phòng Điện', plannedHours: 2503.5, actualHours: 2131.0, projectCount: 11, proportionPct: 11.4 },
  { id: '6', staffName: '', department: 'Phòng Mộc Sơn', plannedHours: 2788.0, actualHours: 1656.5, projectCount: 11, proportionPct: 8.9 },
  { id: '7', staffName: '', department: 'Phòng Công nghệ và Thiết kế', plannedHours: 1038.0, actualHours: 255.2, projectCount: 11, proportionPct: 1.4 },
  { id: '8', staffName: '', department: 'Khối Văn phòng', plannedHours: 677.0, actualHours: 155.6, projectCount: 11, proportionPct: 0.8 },
  { id: '9', staffName: '', department: 'Ban Giám đốc', plannedHours: 170.0, actualHours: 20.0, projectCount: 10, proportionPct: 0.1 },
];

export default function TopNhanSuSystem() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof StaffSystemItem | null>('actualHours');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: keyof StaffSystemItem) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const filteredAndSorted = useMemo(() => {
    return MOCK_TOP_STAFF_SYSTEM.filter(
      (s) =>
        s.department.toLowerCase().includes(search.toLowerCase()) ||
        s.staffName.toLowerCase().includes(search.toLowerCase())
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

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2 overflow-hidden select-none">
      {/* SEARCH BAR */}
      <div className="relative shrink-0">
        <IconSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo nhân sự, phòng ban..."
          className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200/80 rounded-lg text-[11px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
        />
      </div>

      {/* TABLE MATCHING USER SCREENSHOT EXACTLY */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[760px]">
            <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-slate-200">
              <tr className="bg-slate-50 text-slate-600 font-bold">
                {/* Nhân sự */}
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

                {/* Phòng ban */}
                <th className="px-4 py-3 border-b border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleSort('department')}
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
                    Không tìm thấy dữ liệu nhân sự phù hợp.
                  </td>
                </tr>
              ) : (
                filteredAndSorted.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Nhân sự */}
                    <td className="px-4 py-3.5 font-bold text-slate-800">
                      {s.staffName}
                    </td>

                    {/* Phòng ban */}
                    <td className="px-4 py-3.5 font-bold text-slate-700">
                      {s.department}
                    </td>

                    {/* Tổng giờ KH */}
                    <td className="px-4 py-3.5 text-right font-bold text-emerald-600">
                      {s.plannedHours.toFixed(1)}h
                    </td>

                    {/* Tổng giờ TT */}
                    <td className="px-4 py-3.5 text-right font-bold text-amber-700">
                      {s.actualHours.toFixed(1)}h
                    </td>

                    {/* Số dự án */}
                    <td className="px-4 py-3.5 text-right font-semibold text-slate-600">
                      {s.projectCount}
                    </td>

                    {/* Tỷ trọng (Giờ TT) Bar + Pct */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shrink-0">
                          <div
                            className="h-full rounded-full bg-amber-500 transition-all duration-500 shadow-2xs"
                            style={{ width: `${Math.min(s.proportionPct * 3.2, 100)}%` }}
                          />
                        </div>
                        <span className="font-semibold text-slate-500 w-10 text-right">
                          {s.proportionPct.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
