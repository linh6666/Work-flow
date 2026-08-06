"use client";

import React, { useState, useMemo } from 'react';
import { IconX, IconBuilding, IconArrowsSort, IconChevronDown } from '@tabler/icons-react';

export interface ProjectDeptDetail {
  deptName: string;
  staffCount: number;
  plannedHours: number;
  actualHours: number;
}

export interface ProjectModalData {
  id: string;
  name: string;
  plannedHours: number;
  actualHours: number;
  deptCount: number;
  departments: ProjectDeptDetail[];
}

interface ChiTietDuAnModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectModalData | null;
}

export default function ChiTietDuAnModal({ isOpen, onClose, project }: ChiTietDuAnModalProps) {
  const [sortKey, setSortKey] = useState<keyof ProjectDeptDetail | null>('actualHours');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: keyof ProjectDeptDetail) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sortedDepartments = useMemo(() => {
    if (!project) return [];
    return [...project.departments].sort((a, b) => {
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
  }, [project, sortKey, sortDir]);

  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-2xs p-4 animate-fade-in select-none"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh] text-left transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="px-5 py-3.5 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#406c89] flex items-center justify-center font-bold shrink-0 border border-sky-100">
              <IconBuilding size={16} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                {project.name}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Chi tiết phòng ban tham gia ({project.plannedHours}h KH · {project.actualHours}h TT · {project.deptCount} phòng)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* TABLE MATCHING USER SCREENSHOT EXACTLY */}
        <div className="flex-1 overflow-auto p-4 min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[500px]">
            <thead className="sticky top-0 bg-slate-50/90 shadow-2xs border-b border-slate-200 z-10">
              <tr className="text-slate-600 font-bold">
                {/* Cột 1: Phòng */}
                <th className="px-4 py-3 border-b border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleSort('deptName')}
                    className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold"
                  >
                    <span>Phòng</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>

                {/* Cột 2: Nhân sự */}
                <th className="px-4 py-3 border-b border-slate-200 text-right">
                  <button
                    type="button"
                    onClick={() => handleSort('staffCount')}
                    className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold w-full"
                  >
                    <span>Nhân sự</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>

                {/* Cột 3: Giờ KH */}
                <th className="px-4 py-3 border-b border-slate-200 text-right">
                  <button
                    type="button"
                    onClick={() => handleSort('plannedHours')}
                    className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold w-full"
                  >
                    <span>Giờ KH</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>

                {/* Cột 4: Giờ TT */}
                <th className="px-4 py-3 border-b border-slate-200 text-right">
                  <button
                    type="button"
                    onClick={() => handleSort('actualHours')}
                    className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold w-full"
                  >
                    <span>Giờ TT</span>
                    <IconChevronDown size={12} className="text-slate-600" />
                  </button>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {sortedDepartments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-slate-400 text-xs">
                    Không có dữ liệu phòng ban.
                  </td>
                </tr>
              ) : (
                sortedDepartments.map((d, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    {/* Cột 1: Phòng */}
                    <td className="px-4 py-3.5 font-bold text-slate-800">
                      {d.deptName}
                    </td>

                    {/* Cột 2: Nhân sự */}
                    <td className="px-4 py-3.5 text-right font-medium text-slate-500">
                      {d.staffCount}
                    </td>

                    {/* Cột 3: Giờ KH */}
                    <td className="px-4 py-3.5 text-right font-bold text-slate-900">
                      {d.plannedHours}h
                    </td>

                    {/* Cột 4: Giờ TT */}
                    <td className="px-4 py-3.5 text-right font-bold text-amber-700">
                      {d.actualHours}h
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-5 py-3 bg-slate-50/90 border-t border-slate-200 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
