"use client";

import React, { useMemo } from 'react';
import {
  IconX,
  IconMessage2,
  IconCalendar,
  IconPrinter,
} from '@tabler/icons-react';
import { ProjectItem, WeeklyRemarkItem } from '../../types';

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

export default function ChiTietDuAnModal({
  isOpen,
  onClose,
  project,
}: ChiTietDuAnModalProps) {
  if (!isOpen || !project) return null;

  // Extract display name matching user screenshot (stripping project code if present)
  const displayName = project.name.includes('—')
    ? project.name.split('—').slice(1).join('—').trim()
    : project.name;

  const customerName =
    project.customer ||
    (project.subName && project.subName !== '-'
      ? project.subName
      : 'CÔNG TY CỔ PHẦN ĐẦU TƯ & XÂY DỰNG');

  const getEvaluationBadgeStyle = (evalType: ProjectItem['evaluation']) => {
    switch (evalType) {
      case 'Đúng tiến độ':
        return 'bg-[#78b368] text-white';
      case 'Vượt tiến độ':
        return 'bg-[#1b5e20] text-white';
      case 'Chưa đánh giá':
        return 'bg-slate-100 text-slate-600 border border-slate-300';
      case 'Chậm tiến độ':
        return 'bg-rose-600 text-white';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  // Resolve weekly remarks: project's custom weeklyRemarks if provided,
  // or realistic fallback remarks modeled directly after the user's screenshot
  const weeklyRemarks: WeeklyRemarkItem[] = useMemo(() => {
    if (project.weeklyRemarks && project.weeklyRemarks.length > 0) {
      return project.weeklyRemarks;
    }

    // Default 3-week remarks matching the structure in the user's screenshot
    return [
      {
        id: 'w45',
        week: 'Tuần 45/2026',
        dateRange: '30/10/2026 — 06/11/2026',
        evaluation: project.evaluation || 'Đúng tiến độ',
        author: 'Trần Diễm My',
        date: '06/11/2026',
        content: `1- Đánh giá tiến độ, tình trạng tổng thể của dự án: ${
          project.latestRemark
            ? project.latestRemark
            : 'tạm đánh giá là đảm bảo tiến độ'
        }
2- Những vấn đề cần lưu ý:
- Phần khai triển công trình của dự án triển khai đúng theo tiến độ kế hoạch
- Ngày 07/11/2026 Phòng Khai triển sẽ chuyển cắt mẫu tiếp theo

3- Các mốc nghiệm thu dự kiến
- Nghiệm thu 80%: 22/11/2026
- Nghiệm thu 100%: 07/12/2026
- Vận chuyển, lắp đặt & Bàn giao mô hình: 08/12/2026`,
      },
      {
        id: 'w44',
        week: 'Tuần 44/2026',
        dateRange: '24/10/2026 — 31/10/2026',
        evaluation: project.evaluation || 'Đúng tiến độ',
        author: 'Trần Diễm My',
        date: '31/10/2026',
        content: `1- Đánh giá tiến độ, tình trạng tổng thể của dự án: tạm đánh giá là đảm bảo tiến độ
2- Những vấn đề cần lưu ý:
- Phần Khung bảng: sớm hơn dự kiến 04 ngày làm việc
- Phần nền: chuyển cắt chậm hơn dự kiến 04 ngày làm việc. Bàn cắt đầu tiên sẽ được chuyển cắt vào ngày 02/11/2026
- Phần công trình: chuyển cắt chậm hơn dự kiến 4 ngày làm việc do thời gian ghép các LOT kéo dài hơn dự kiến

3- Các mốc nghiệm thu dự kiến
- Nghiệm thu 80%: 22/11/2026
- Nghiệm thu 100%: 07/12/2026
- Vận chuyển, lắp đặt & Bàn giao mô hình: 08/12/2026`,
      },
      {
        id: 'w43',
        week: 'Tuần 43/2026',
        dateRange: '17/10/2026 — 23/10/2026',
        evaluation: project.evaluation || 'Đúng tiến độ',
        author: 'Trần Diễm My',
        date: '23/10/2026',
        content: `1- Đánh giá tiến độ, tình trạng tổng thể của dự án: tạm đánh giá là đảm bảo tiến độ
2- Những vấn đề cần lưu ý:
- Dự án bắt đầu triển khai từ ngày 23/10/2026`,
      },
    ];
  }, [project]);

  const handlePrintOrExcel = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150 select-none"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── MODAL HEADER MATCHING USER SCREENSHOT EXACTLY ── */}
        <div className="px-6 pt-5 pb-3 border-b border-slate-100 flex items-start justify-between gap-4 shrink-0 bg-white">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-800">
              <IconMessage2 size={17} className="text-blue-600 shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">
                Nhận xét hàng tuần của Chủ nhiệm dự án
              </h2>
            </div>

            <div className="space-y-0.5 pl-6">
              <h3 className="text-xs sm:text-[13px] font-black text-slate-900 uppercase tracking-tight leading-snug">
                {displayName}
              </h3>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                {customerName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrintOrExcel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200/90 hover:border-slate-300 rounded-md shadow-2xs text-xs font-semibold transition-all cursor-pointer select-none"
              title="In / Xuất Excel"
            >
              <IconPrinter size={15} className="text-slate-800 shrink-0" stroke={1.8} />
              <span>In / Excel</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              title="Đóng"
            >
              <IconX size={18} />
            </button>
          </div>
        </div>

        {/* ── MODAL BODY: LIST OF WEEKLY REMARKS CARDS ── */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1 min-h-0 text-xs no-scrollbar bg-slate-50/20">
          {weeklyRemarks.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs font-medium">
              Chưa có nhận xét nào cho dự án này.
            </div>
          ) : (
            weeklyRemarks.map((remark) => (
              <div
                key={remark.id}
                className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-2xs hover:border-slate-300 transition-colors space-y-3"
              >
                {/* Card Top Row: Week + Badge + DateRange (Left) & Author · Date (Right) */}
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <IconCalendar size={15} className="text-blue-600 shrink-0" />
                      <span className="font-bold text-blue-600 text-xs">
                        {remark.week}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${getEvaluationBadgeStyle(
                          remark.evaluation
                        )}`}
                      >
                        {remark.evaluation}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium pl-[23px]">
                      {remark.dateRange}
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                    <span>{remark.author}</span>
                    <span className="mx-1">·</span>
                    <span>{remark.date}</span>
                  </div>
                </div>

                {/* Card Content: Formatted text */}
                <div className="text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                  {remark.content}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
