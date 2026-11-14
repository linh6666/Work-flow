"use client";

import React from 'react';
import {
  IconFolder,
  IconClock,
  IconUser,
  IconBox,
  IconSquareCheckFilled,
  IconFileText,
  IconPhoto,
  IconX,
} from '@tabler/icons-react';
import { ProjectReportGroup, ReportItem } from '../../types';

interface DanhSachBaoCaoModalProps {
  project: ProjectReportGroup | null;
  onClose: () => void;
  onViewReport: (report: ReportItem, projectName: string) => void;
}

export default function DanhSachBaoCaoModal({
  project,
  onClose,
  onViewReport,
}: DanhSachBaoCaoModalProps) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-slate-50/95 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[88vh] flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-white shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-3">
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
              <IconFolder size={18} stroke={2} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase truncate">
                  {project.name}
                </h4>
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                  {project.reportCount} báo cáo
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Mốc nghiệm thu 80% · Tổng số giờ thi công: <strong className="text-slate-700 font-semibold">{project.totalHours}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Modal Body: Danh sách các ô card báo cáo chuẩn theo thiết kế */}
        <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar p-3.5 sm:p-4 space-y-2.5">
          {project.reports.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/90 rounded-xl p-3 sm:p-3.5 shadow-2xs hover:border-slate-300 transition-all space-y-1.5"
            >
              {/* Hàng 1: Tên phòng ban + Badge trạng thái + Nút Xem */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#3b3a74] text-xs sm:text-[13px] tracking-tight">
                    {item.department}
                  </span>
                  
                  {item.status === 'BGĐ đã duyệt' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]">
                      {item.status}
                    </span>
                  )}
                  {item.status === 'Trả lại điều chỉnh' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-50 text-orange-700 border border-orange-200">
                      {item.status}
                    </span>
                  )}
                  {item.status === 'Chờ phê duyệt' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      {item.status}
                    </span>
                  )}
                </div>

                {/* Nút Xem góc phải */}
                <button
                  type="button"
                  onClick={() => onViewReport(item, project.name)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-medium cursor-pointer transition-colors shadow-2xs"
                >
                  <IconFileText size={13} className="text-slate-600" />
                  <span>Xem</span>
                </button>
              </div>

              {/* Hàng 2: Metadata ngày, người báo cáo, khối lượng, số giờ, %HT TB, ảnh đính kèm */}
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-slate-600">
                {/* Ngày báo cáo */}
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <IconClock size={13} className="text-slate-400" />
                  <span>{item.date}</span>
                </span>

                {/* Người báo cáo */}
                <span className="inline-flex items-center gap-1 text-slate-700 font-semibold">
                  <IconUser size={13} className="text-slate-600" />
                  <span>{item.reporter}</span>
                </span>

                {/* Khối lượng */}
                <span className="inline-flex items-center gap-1 font-bold text-[#15803d]">
                  <IconBox size={13} className="text-amber-700" />
                  <span>{item.quantity}</span>
                </span>

                {/* Số giờ */}
                <span className="inline-flex items-center gap-1 font-bold text-[#ea580c]">
                  <IconClock size={13} className="text-[#ea580c]" />
                  <span>{item.hours}</span>
                </span>

                {/* %HT TB */}
                <span className="font-extrabold text-[#4f46e5]">
                  %HT TB {item.progressPct}
                </span>

                {/* Ảnh đính kèm (nếu có) */}
                {item.photoCount && (
                  <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                    <IconPhoto size={13} className="text-slate-400" />
                    <span>{item.photoCount}</span>
                  </span>
                )}
              </div>

              {/* Hàng 3: Người duyệt & Ngày phê duyệt */}
              <div className="flex items-center gap-1.5 text-xs text-[#16a34a] font-medium pt-0.5">
                <IconSquareCheckFilled size={15} className="text-[#16a34a] shrink-0" />
                <span>{item.approvedBy}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 bg-white shrink-0 text-xs text-slate-500">
          <span>
            Hiển thị đầy đủ <strong className="text-slate-700">{project.reports.length}</strong> báo cáo nghiệm thu 80% của dự án.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-white rounded-md text-xs font-semibold transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
