"use client";

import React from 'react';
import { IconX, IconBuilding, IconCurrencyDollar, IconUsers } from '@tabler/icons-react';

export interface StaffCostDetail {
  deptName: string;
  staffName: string;
  actualHours: number;
  dailyRate: string;
  totalAmount: string;
}

export interface ProjectCostGroup {
  deptName: string;
  staffList: StaffCostDetail[];
}

export interface ProjectCostModalData {
  id: string;
  projectName: string;
  deptCount: number;
  staffCount: number;
  totalCost: string;
  groups: ProjectCostGroup[];
}

interface ChiTietChiPhiModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectCostModalData | null;
}

export default function ChiTietChiPhiModal({ isOpen, onClose, project }: ChiTietChiPhiModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-2xs p-4 animate-fade-in select-none"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[85vh] text-left transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="px-5 py-3.5 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0 border border-emerald-100">
              <IconCurrencyDollar size={16} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                {project.projectName}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Chi tiết nhân sự & chi phí phân bổ ({project.deptCount} phòng · {project.staffCount} nhân sự)
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
          <table className="w-full text-xs text-left border-collapse min-w-[650px]">
            <thead className="sticky top-0 bg-slate-50/90 shadow-2xs border-b border-slate-200 z-10">
              <tr className="text-slate-600 font-bold">
                <th className="px-4 py-3 border-b border-slate-200">Phòng ban</th>
                <th className="px-4 py-3 border-b border-slate-200">Nhân sự</th>
                <th className="px-4 py-3 border-b border-slate-200 text-right">Giờ TT</th>
                <th className="px-4 py-3 border-b border-slate-200 text-right">Đơn giá/ngày</th>
                <th className="px-4 py-3 border-b border-slate-200 text-right">Thành tiền</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {project.groups.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400 text-xs">
                    Chưa có dữ liệu chi tiết chi phí.
                  </td>
                </tr>
              ) : (
                project.groups.map((group, groupIdx) =>
                  group.staffList.map((staff, staffIdx) => (
                    <tr key={`${groupIdx}-${staffIdx}`} className="hover:bg-slate-50/70 transition-colors">
                      {/* Cột 1: Phòng ban (chỉ render 1 lần per group với thanh accent xanh lá) */}
                      {staffIdx === 0 ? (
                        <td 
                          rowSpan={group.staffList.length}
                          className="px-4 py-3 font-bold text-slate-800 align-top border-l-2 border-emerald-500 bg-slate-50/20"
                        >
                          {group.deptName}
                        </td>
                      ) : null}

                      {/* Cột 2: Nhân sự */}
                      <td className="px-4 py-3 font-semibold text-slate-700">
                        {staff.staffName}
                      </td>

                      {/* Cột 3: Giờ TT */}
                      <td className="px-4 py-3 text-right font-medium text-slate-500">
                        {staff.actualHours}h
                      </td>

                      {/* Cột 4: Đơn giá/ngày */}
                      <td className="px-4 py-3 text-right font-medium text-slate-600">
                        {staff.dailyRate}
                      </td>

                      {/* Cột 5: Thành tiền (Green bold text) */}
                      <td className="px-4 py-3 text-right font-bold text-emerald-600">
                        {staff.totalAmount}
                      </td>
                    </tr>
                  ))
                )
              )}
            </tbody>

            {/* TOTAL FOOTER MATCHING SCREENSHOT */}
            <tfoot className="border-t-2 border-slate-200 font-bold">
              <tr>
                <td colSpan={4} className="px-4 py-3 text-right text-slate-900 font-black tracking-tight">
                  Tổng {project.projectName}:
                </td>
                <td className="px-4 py-3 text-right text-emerald-700 font-black text-sm">
                  {project.totalCost}
                </td>
              </tr>
            </tfoot>
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
