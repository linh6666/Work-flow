"use client";

import React from 'react';
import {
  IconX,
  IconBuilding,
} from '@tabler/icons-react';
import { ProjectItem } from '../../types';

interface ChiTietDuAnModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
}

export interface DepartmentItem {
  id: string;
  name: string;
  progressPct: number;
  completedTasks: string;
  inProgressTasks: number;
  plannedHours: string;
  actualHours: string;
}

const DEFAULT_DEPARTMENTS: DepartmentItem[] = [
  { id: '1', name: 'Ban Giám đốc', progressPct: 0, completedTasks: '0/16', inProgressTasks: 0, plannedHours: '17h', actualHours: '0.0h' },
  { id: '2', name: 'Khối Văn phòng', progressPct: 58, completedTasks: '19/32', inProgressTasks: 0, plannedHours: '45h', actualHours: '26.0h' },
  { id: '3', name: 'Phòng Khai triển', progressPct: 87, completedTasks: '20/23', inProgressTasks: 0, plannedHours: '55h', actualHours: '41.0h' },
  { id: '4', name: 'Phòng Cắt', progressPct: 59, completedTasks: '16/27', inProgressTasks: 0, plannedHours: '102h', actualHours: '42.0h' },
  { id: '5', name: 'Phòng Ghép', progressPct: 74, completedTasks: '14/19', inProgressTasks: 0, plannedHours: '110h', actualHours: '70.0h' },
  { id: '6', name: 'Phòng Mộc Sơn', progressPct: 56, completedTasks: '10/17', inProgressTasks: 0, plannedHours: '13h', actualHours: '8.5h' },
  { id: '7', name: 'Phòng Điện', progressPct: 67, completedTasks: '4/6', inProgressTasks: 0, plannedHours: '16h', actualHours: '7.0h' },
  { id: '8', name: 'Phòng Cảnh Quan', progressPct: 43, completedTasks: '3/7', inProgressTasks: 0, plannedHours: '10h', actualHours: '1.5h' },
  { id: '9', name: 'Phòng Công nghệ và Thiết kế', progressPct: 9, completedTasks: '1/11', inProgressTasks: 0, plannedHours: '13h', actualHours: '1.0h' },
];

export default function ChiTietDuAnModal({
  isOpen,
  onClose,
  project,
}: ChiTietDuAnModalProps) {
  if (!isOpen || !project) return null;

  const getEvaluationBadgeStyle = (evalType: ProjectItem['evaluation']) => {
    switch (evalType) {
      case 'Đúng tiến độ':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Vượt tiến độ':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
      case 'Chưa đánh giá':
        return 'bg-slate-100 text-slate-500 border-slate-200';
      case 'Chậm tiến độ':
        return 'bg-rose-50 text-rose-700 border-rose-200 font-bold';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all">
        {/* MODAL HEADER */}
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/70 flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-50 text-[#406c89] font-bold text-sm flex items-center justify-center shrink-0 border border-sky-100 shadow-2xs mt-0.5">
              {project.name.trim().split(/\s+/).pop()?.[0]?.toUpperCase() || 'P'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-slate-900 uppercase leading-snug tracking-tight">
                  {project.name}
                </h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getEvaluationBadgeStyle(
                    project.evaluation
                  )}`}
                >
                  {project.evaluation}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase mt-0.5">
                Mã / Khách hàng: {project.subName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer shrink-0"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs no-scrollbar flex-1">

          {/* DEPARTMENT BREAKDOWN TABLE MATCHING USER SCREENSHOT EXACTLY */}
          <div className="bg-white border border-slate-200/90 rounded-lg shadow-2xs overflow-hidden">
            <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <IconBuilding size={15} className="text-slate-500" />
                <span>Tiến độ thực hiện theo Phòng ban</span>
              </h4>
              <span className="text-[11px] font-semibold text-[#406c89] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                Tổng tiến độ: {project.progressPct}%
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50/50">
                    <th className="py-2.5 px-4 font-bold text-slate-600">Phòng ban</th>
                    <th className="py-2.5 px-3 text-right font-bold text-slate-600">%HT</th>
                    <th className="py-2.5 px-3 text-right font-bold text-slate-600">Hoàn thành</th>
                    <th className="py-2.5 px-3 text-right font-bold text-slate-600">Đang làm</th>
                    <th className="py-2.5 px-3 text-right font-bold text-slate-600">Giờ KH</th>
                    <th className="py-2.5 px-3 text-right font-bold text-slate-600">Giờ TH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {DEFAULT_DEPARTMENTS.map((dept) => (
                    <tr
                      key={dept.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Phòng ban */}
                      <td className="py-2.5 px-4 font-bold text-slate-800">
                        {dept.name}
                      </td>

                      {/* %HT */}
                      <td className="py-2.5 px-3 text-right font-bold text-[#406c89]">
                        {dept.progressPct}%
                      </td>

                      {/* Hoàn thành */}
                      <td className="py-2.5 px-3 text-right font-bold text-emerald-600">
                        {dept.completedTasks}
                      </td>

                      {/* Đang làm */}
                      <td className="py-2.5 px-3 text-right font-semibold text-slate-400">
                        {dept.inProgressTasks}
                      </td>

                      {/* Giờ KH */}
                      <td className="py-2.5 px-3 text-right font-medium text-slate-500">
                        {dept.plannedHours}
                      </td>

                      {/* Giờ TH */}
                      <td className="py-2.5 px-3 text-right font-bold text-amber-600">
                        {dept.actualHours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-md shadow-2xs transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
