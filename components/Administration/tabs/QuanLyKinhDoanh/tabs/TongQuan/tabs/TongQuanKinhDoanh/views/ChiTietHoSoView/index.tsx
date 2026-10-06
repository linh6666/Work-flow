"use client";

import React from 'react';
import {
  IconArrowLeft,
  IconBuilding,
  IconCalendar,
  IconFlag,
  IconFileText,
  IconPrinter,
  IconEdit,
  IconTag,
  IconCircleCheckFilled,
} from '@tabler/icons-react';

interface CardMilestone {
  label: string;
  date: string;
  color: 'blue' | 'rose';
}

interface ProjectCardItem {
  id: string;
  typeTag: string;
  code: string;
  status: 'Đang triển khai' | 'Đang thực hiện' | 'Hoàn thành' | 'Tạm dừng';
  evaluation: 'Đúng tiến độ' | 'Chậm tiến độ, lỗi khách quan' | 'Chưa đánh giá';
  num: number;
  title: string;
  desc?: string;
  startDate?: string;
  dueDate?: string;
  client?: string;
  progress: number;
  milestones?: CardMilestone[];
  borderColor: string;
}

interface ChiTietHoSoViewProps {
  card: ProjectCardItem;
  onBack: () => void;
  onUpdateStatus?: (id: string, status: any) => void;
  onUpdateEvaluation?: (id: string, evaluation: any) => void;
}

export default function ChiTietHoSoView({
  card,
  onBack,
  onUpdateStatus,
  onUpdateEvaluation,
}: ChiTietHoSoViewProps) {
  return (
    <div className="flex flex-col space-y-4 p-1 animate-in fade-in duration-150">
      {/* ── 1. TOP NAVIGATION & BREADCRUMB BAR ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            <IconArrowLeft size={16} />
            <span>Quay lại Tổng quan</span>
          </button>

          <div className="h-4 w-px bg-slate-200" />

          <div className="text-xs text-slate-500">
            <span>Tổng quan Kinh doanh</span>
            <span className="mx-1.5">/</span>
            <span className="font-semibold text-[#406c89]">{card.code || card.typeTag}</span>
            <span className="mx-1.5">/</span>
            <span className="font-bold text-slate-800 truncate max-w-[250px] inline-block align-bottom">
              {card.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <IconPrinter size={14} />
            <span>In hồ sơ</span>
          </button>

          <button
            type="button"
            onClick={() => alert(`Chỉnh sửa hồ sơ: ${card.title}`)}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#406c89] hover:bg-[#32566d] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <IconEdit size={14} />
            <span>Chỉnh sửa</span>
          </button>
        </div>
      </div>

      {/* ── 2. PROJECT HEADER CARD ── */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-sky-100 text-[#406c89] font-bold text-xs rounded-full">
                {card.typeTag}
              </span>

              {card.code && (
                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 font-mono text-xs rounded-md font-bold">
                  {card.code}
                </span>
              )}

              {/* Status Badge Select */}
              <select
                value={card.status}
                onChange={(e) => onUpdateStatus && onUpdateStatus(card.id, e.target.value)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg border focus:outline-none cursor-pointer ${
                  card.status === 'Hoàn thành'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    : card.status === 'Tạm dừng'
                    ? 'bg-sky-100 text-[#406c89] border-sky-200'
                    : 'bg-amber-100 text-amber-800 border-amber-200'
                }`}
              >
                <option value="Đang triển khai">Đang triển khai</option>
                <option value="Đang thực hiện">Đang thực hiện</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Tạm dừng">Tạm dừng</option>
              </select>

              {/* Evaluation Select */}
              <select
                value={card.evaluation}
                onChange={(e) => onUpdateEvaluation && onUpdateEvaluation(card.id, e.target.value)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg border focus:outline-none cursor-pointer ${
                  card.evaluation === 'Đúng tiến độ'
                    ? 'bg-lime-300 text-slate-900 border-lime-400 font-bold'
                    : card.evaluation === 'Chậm tiến độ, lỗi khách quan'
                    ? 'bg-rose-100 text-rose-800 border-rose-200'
                    : 'bg-white text-slate-500 border-slate-200'
                }`}
              >
                <option value="Chưa đánh giá">Chưa đánh giá</option>
                <option value="Đúng tiến độ">Đúng tiến độ</option>
                <option value="Chậm tiến độ, lỗi khách quan">Chậm tiến độ, lỗi khách quan</option>
              </select>
            </div>

            <h1 className="text-xl font-bold text-slate-900 leading-snug">{card.title}</h1>

            {card.desc && (
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {card.desc}
              </p>
            )}
          </div>

          {/* Progress Circular / Summary Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 min-w-[200px] text-center space-y-2">
            <span className="text-xs font-semibold text-slate-500 block">Tiến độ thực hiện</span>
            <div className="text-3xl font-black text-[#406c89]">{card.progress}%</div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  card.progress === 100 ? 'bg-emerald-500' : 'bg-[#406c89]'
                }`}
                style={{ width: `${card.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. MAIN DETAILS GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT 2 COLUMNS: THÔNG TIN CHI TIẾT */}
        <div className="lg:col-span-2 space-y-4">
          {/* Card: Thông tin dự án */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <IconFileText size={16} className="text-[#406c89]" />
              <span>Thông tin chung hồ sơ</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-medium block">Khách hàng / Chủ đầu tư:</span>
                <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <IconBuilding size={15} className="text-slate-400 shrink-0" />
                  <span>{card.client || 'Chưa cập nhật'}</span>
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-medium block">Phân loại hồ sơ:</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <IconTag size={15} className="text-slate-400 shrink-0" />
                  <span>{card.typeTag === 'BC CV KD' ? 'Báo giá kinh doanh (BC CV KD)' : 'Hồ sơ Hợp đồng (Khối VP)'}</span>
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-medium block">Ngày bắt đầu:</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <IconCalendar size={15} className="text-slate-400 shrink-0" />
                  <span>{card.startDate || 'Chưa thiết lập'}</span>
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-medium block">Hạn hoàn thành / Dự kiến:</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <IconCalendar size={15} className="text-slate-400 shrink-0" />
                  <span>{card.dueDate || 'Chưa thiết lập'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Card: Các mốc nghiệm thu & Tiến độ chi tiết */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <IconFlag size={16} className="text-[#406c89]" />
              <span>Các mốc Nghiệm thu & Lịch trình</span>
            </h3>

            {card.milestones && card.milestones.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {card.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <IconCircleCheckFilled
                        size={18}
                        className={m.color === 'rose' ? 'text-rose-500' : 'text-blue-500'}
                      />
                      <span className="font-bold text-xs text-slate-800">{m.label}</span>
                    </div>
                    <span
                      className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                        m.color === 'rose' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {m.date}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Chưa có mốc nghiệm thu nào được thiết lập.</p>
            )}
          </div>
        </div>

        {/* RIGHT 1 COLUMN: NHẬT KÝ & THAO TÁC NHANH */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Thao tác nhanh</h3>

            <button
              type="button"
              onClick={() => alert(`Cập nhật tiến độ dự án: ${card.title}`)}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer text-left px-3"
            >
              + Cập nhật tiến độ (% hoàn thành)
            </button>

            <button
              type="button"
              onClick={() => alert(`Tải tài liệu đính kèm: ${card.title}`)}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer text-left px-3"
            >
              + Đính kèm tệp tin / Biên bản
            </button>

            <button
              type="button"
              onClick={() => alert(`Tạo thông báo tiến độ`)}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer text-left px-3"
            >
              + Gửi thông báo cho khách hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
