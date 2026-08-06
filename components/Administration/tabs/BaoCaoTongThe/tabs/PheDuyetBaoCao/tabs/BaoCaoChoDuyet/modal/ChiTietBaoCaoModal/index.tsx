"use client";

import React from 'react';
import { IconX, IconPencil, IconUserCheck } from '@tabler/icons-react';

export interface TaskDetailRow {
  taskName: string;
  startDate: string;
  endDate: string;
  planHours: number;
  actualHours: string;
  htPct: string;
  dkPct: string;
  progressStatus: 'Quá hạn' | 'Đúng tiến độ' | 'Chưa triển khai';
  reportStatus: 'Chưa báo' | 'Đã báo cáo';
}

export interface ProjectTaskGroup {
  projectName: string;
  departmentName: string;
  tasks: TaskDetailRow[];
}

export interface StaffReportModalData {
  stt: number;
  staffName: string;
  department: string;
  projectCount: number;
  scheduledTasks: number;
  unimplemented: number;
  reported: number;
  unreported: number;
  lateReport: number;
  lateTasks: number;
  projectGroups?: ProjectTaskGroup[];
}

interface ChiTietBaoCaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: StaffReportModalData | null;
}

const DEFAULT_PROJECT_GROUPS: ProjectTaskGroup[] = [
  {
    projectName: 'THE HERITAGE TÂY NINH - Lắp đặt tại Hà Nội',
    departmentName: 'Ban Giám đốc',
    tasks: [
      { taskName: 'THIẾT LẬP QUY CHUẨN KHAI TRIỂN CỦA DỰ ÁN', startDate: '27/07/2026', endDate: '27/07/2026', planHours: 2, actualHours: '—', htPct: '0%', dkPct: '100%', progressStatus: 'Quá hạn', reportStatus: 'Chưa báo' },
      { taskName: 'TỔ CHỨC HỌP PHỔ BIẾN YÊU CẦU VỀ QUY CHUẨN KHAI TRIỂN', startDate: '28/07/2026', endDate: '28/07/2026', planHours: 1, actualHours: '—', htPct: '0%', dkPct: '100%', progressStatus: 'Quá hạn', reportStatus: 'Chưa báo' },
      { taskName: 'KIỂM TRA CÔNG VIỆC TUẦN 1', startDate: '29/07/2026', endDate: '29/07/2026', planHours: 1, actualHours: '—', htPct: '0%', dkPct: '100%', progressStatus: 'Quá hạn', reportStatus: 'Chưa báo' },
      { taskName: 'KIỂM TRA CÔNG VIỆC TUẦN 2', startDate: '30/07/2026', endDate: '30/07/2026', planHours: 1, actualHours: '—', htPct: '0%', dkPct: '100%', progressStatus: 'Quá hạn', reportStatus: 'Chưa báo' },
      { taskName: 'KIỂM TRA CÔNG VIỆC TUẦN 3', startDate: '31/07/2026', endDate: '31/07/2026', planHours: 1, actualHours: '—', htPct: '0%', dkPct: '100%', progressStatus: 'Quá hạn', reportStatus: 'Chưa báo' },
      { taskName: 'KIỂM TRA TRƯỚC KHI VẬN CHUYỂN', startDate: '01/08/2026', endDate: '01/08/2026', planHours: 1, actualHours: '—', htPct: '0%', dkPct: '100%', progressStatus: 'Quá hạn', reportStatus: 'Chưa báo' },
    ],
  },
  {
    projectName: 'CHỈNH SỬA MÔ HÌNH NEWEB',
    departmentName: 'Ban Giám đốc',
    tasks: [
      { taskName: 'THIẾT LẬP QUY CHUẨN KHAI TRIỂN CỦA DỰ ÁN', startDate: '28/07/2026', endDate: '28/07/2026', planHours: 2, actualHours: '—', htPct: '0%', dkPct: '100%', progressStatus: 'Quá hạn', reportStatus: 'Chưa báo' },
      { taskName: 'TỔ CHỨC HỌP PHỔ BIẾN YÊU CẦU VỀ QUY CHUẨN KHAI TRIỂN', startDate: '29/07/2026', endDate: '29/07/2026', planHours: 1, actualHours: '—', htPct: '0%', dkPct: '100%', progressStatus: 'Quá hạn', reportStatus: 'Chưa báo' },
      { taskName: 'KIỂM TRA CÔNG VIỆC TUẦN 1', startDate: '30/07/2026', endDate: '30/07/2026', planHours: 1, actualHours: '—', htPct: '0%', dkPct: '100%', progressStatus: 'Quá hạn', reportStatus: 'Chưa báo' },
      { taskName: 'KIỂM TRA CÔNG VIỆC TUẦN 2', startDate: '31/07/2026', endDate: '31/07/2026', planHours: 1, actualHours: '—', htPct: '0%', dkPct: '100%', progressStatus: 'Quá hạn', reportStatus: 'Chưa báo' },
      { taskName: 'KIỂM TRA CÔNG VIỆC TUẦN 3', startDate: '01/08/2026', endDate: '01/08/2026', planHours: 1, actualHours: '—', htPct: '0%', dkPct: '100%', progressStatus: 'Quá hạn', reportStatus: 'Chưa báo' },
      { taskName: 'KIỂM TRA TRƯỚC KHI VẬN CHUYỂN', startDate: '10/08/2026', endDate: '10/08/2026', planHours: 1, actualHours: '—', htPct: '0%', dkPct: '0%', progressStatus: 'Đúng tiến độ', reportStatus: 'Chưa báo' },
    ],
  },
  {
    projectName: '22 LIỄU GIAI',
    departmentName: 'Ban Giám đốc',
    tasks: [
      { taskName: 'KHAI TRIỂN BẢN VẼ MỘC TẦNG 1-5', startDate: '25/07/2026', endDate: '28/07/2026', planHours: 4, actualHours: '—', htPct: '0%', dkPct: '100%', progressStatus: 'Quá hạn', reportStatus: 'Chưa báo' },
      { taskName: 'LẮP ĐẶT ĐÈN VÀ HỆ THỐNG ĐIỆN CHIẾU SÁNG', startDate: '30/07/2026', endDate: '02/08/2026', planHours: 2, actualHours: '—', htPct: '0%', dkPct: '100%', progressStatus: 'Quá hạn', reportStatus: 'Chưa báo' },
    ],
  },
];

export default function ChiTietBaoCaoModal({ isOpen, onClose, staff }: ChiTietBaoCaoModalProps) {
  if (!isOpen || !staff) return null;

  const projectGroups = staff.projectGroups || DEFAULT_PROJECT_GROUPS;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-2xs p-4 animate-fade-in select-none"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-5xl overflow-hidden flex flex-col max-h-[88vh] text-left transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="px-5 py-3.5 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#406c89] flex items-center justify-center font-bold shrink-0 border border-sky-100">
              <IconUserCheck size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <span>{staff.staffName}</span>
                <span className="text-[11px] font-semibold text-slate-500 normal-case">({staff.department})</span>
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Bảng theo dõi tiến độ & báo cáo công việc chi tiết theo từng dự án
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
          <table className="w-full text-xs text-left border-collapse min-w-[850px]">
            <thead className="sticky top-0 bg-slate-50 shadow-2xs border-b border-slate-200 z-10">
              <tr className="text-slate-600 font-bold text-[11px]">
                <th className="px-3 py-2.5 border-b border-slate-200">Công việc</th>
                <th className="px-3 py-2.5 border-b border-slate-200 text-center w-24">Bắt đầu</th>
                <th className="px-3 py-2.5 border-b border-slate-200 text-center w-24">Kết thúc</th>
                <th className="px-3 py-2.5 border-b border-slate-200 text-center w-12">KH</th>
                <th className="px-3 py-2.5 border-b border-slate-200 text-center w-20">Thực hiện</th>
                <th className="px-3 py-2.5 border-b border-slate-200 text-center w-14">%HT</th>
                <th className="px-3 py-2.5 border-b border-slate-200 text-center w-14">%DK</th>
                <th className="px-3 py-2.5 border-b border-slate-200 text-center w-28">Tiến độ</th>
                <th className="px-3 py-2.5 border-b border-slate-200 text-center w-28">Báo cáo</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {projectGroups.map((group, groupIdx) => (
                <React.Fragment key={groupIdx}>
                  {/* PROJECT HEADER BANNER ROW (DARK SLATE BLUE) */}
                  <tr className="bg-[#406c89] text-white font-bold text-[11px]">
                    <td colSpan={8} className="px-4 py-2 uppercase tracking-wide">
                      {group.projectName}
                    </td>
                    <td className="px-4 py-2 text-right uppercase tracking-wide">
                      {group.departmentName}
                    </td>
                  </tr>

                  {/* TASK ROWS */}
                  {group.tasks.map((task, taskIdx) => (
                    <tr key={taskIdx} className="hover:bg-slate-50/80 transition-colors">
                      {/* Công việc */}
                      <td className="px-3 py-2.5 font-bold text-slate-800 text-[11px] uppercase">
                        {task.taskName}
                      </td>

                      {/* Bắt đầu */}
                      <td className="px-3 py-2.5 text-center text-slate-500 font-medium text-[11px]">
                        {task.startDate}
                      </td>

                      {/* Kết thúc (Red/Blue font) */}
                      <td className={`px-3 py-2.5 text-center font-semibold text-[11px] ${
                        task.progressStatus === 'Quá hạn' ? 'text-rose-600' : 'text-slate-600'
                      }`}>
                        {task.endDate}
                      </td>

                      {/* KH */}
                      <td className="px-3 py-2.5 text-center text-slate-600 font-medium text-[11px]">
                        {task.planHours}
                      </td>

                      {/* Thực hiện */}
                      <td className="px-3 py-2.5 text-center text-slate-400 font-medium text-[11px]">
                        {task.actualHours}
                      </td>

                      {/* %HT */}
                      <td className="px-3 py-2.5 text-center text-[#3b82f6] font-semibold text-[11px]">
                        {task.htPct}
                      </td>

                      {/* %DK */}
                      <td className="px-3 py-2.5 text-center text-slate-600 font-medium text-[11px]">
                        {task.dkPct}
                      </td>

                      {/* Tiến độ (Pill badge) */}
                      <td className="px-3 py-2.5 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                            task.progressStatus === 'Quá hạn'
                              ? 'bg-[#fef2f2] text-[#dc2626] border-[#fca5a5]'
                              : 'bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]'
                          }`}
                        >
                          {task.progressStatus}
                        </span>
                      </td>

                      {/* Báo cáo (Red box button + Edit icon) */}
                      <td className="px-3 py-2.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Nút Chưa báo */}
                          <div className="flex items-center gap-1 bg-[#fef2f2] text-[#dc2626] border border-[#fca5a5] rounded px-2 py-0.5 text-[10px] font-bold shrink-0">
                            <IconX size={11} className="stroke-[3]" />
                            <div className="leading-tight text-center">
                              <div>Chưa</div>
                              <div>báo</div>
                            </div>
                          </div>

                          {/* Nút Sửa (IconPencil) */}
                          <button
                            type="button"
                            className="p-1.5 bg-[#fefce8] text-[#ca8a04] border border-[#fde047] rounded hover:bg-[#fef9c3] transition-colors shrink-0 cursor-pointer"
                            title="Chỉnh sửa báo cáo"
                          >
                            <IconPencil size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
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
