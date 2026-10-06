"use client";

import React, { useEffect } from 'react';
import {
  IconX,
  IconFolder,
  IconCalendar,
  IconBuilding,
  IconFlag,
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

interface ChiTietHoSoModalProps {
  isOpen: boolean;
  card: ProjectCardItem | null;
  onClose: () => void;
}

export default function ChiTietHoSoModal({
  isOpen,
  card,
  onClose,
}: ChiTietHoSoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#406c89] to-[#2d4e64] text-white px-5 py-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-xs">
              <IconFolder size={22} className="text-sky-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-sky-400/20 text-sky-100 font-bold text-[10px] rounded-full border border-sky-300/30">
                  {card.typeTag}
                </span>
                {card.code && (
                  <span className="font-mono text-xs text-sky-100 font-bold bg-white/10 px-2 py-0.5 rounded">
                    {card.code}
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold leading-tight mt-1">{card.title}</h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
          {/* Status & Evaluation Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-slate-500 font-medium block text-[11px]">Trạng thái hồ sơ:</span>
              <span
                className={`inline-block mt-1 px-2.5 py-1 text-xs font-bold rounded-lg ${
                  card.status === 'Hoàn thành'
                    ? 'bg-emerald-100 text-emerald-800'
                    : card.status === 'Tạm dừng'
                    ? 'bg-sky-100 text-[#406c89]'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {card.status}
              </span>
            </div>

            <div>
              <span className="text-slate-500 font-medium block text-[11px]">Đánh giá tiến độ:</span>
              <span
                className={`inline-block mt-1 px-2.5 py-1 text-xs font-bold rounded-lg ${
                  card.evaluation === 'Đúng tiến độ'
                    ? 'bg-lime-200 text-slate-900'
                    : card.evaluation === 'Chậm tiến độ, lỗi khách quan'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {card.evaluation}
              </span>
            </div>
          </div>

          {/* Description */}
          {card.desc && (
            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block">Mô tả dự án:</span>
              <p className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/60 text-slate-700 leading-relaxed">
                {card.desc}
              </p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <IconBuilding size={14} className="text-slate-400" />
                <span>Khách hàng / Chủ đầu tư:</span>
              </span>
              <p className="font-bold text-slate-800 text-sm">{card.client || 'Chưa cập nhật'}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <IconCalendar size={14} className="text-slate-400" />
                <span>Thời gian thực hiện:</span>
              </span>
              <p className="font-semibold text-slate-800">
                {card.startDate || 'N/A'} ➔ {card.dueDate || 'N/A'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Tiến độ hoàn thành dự án</span>
              <span className="text-[#406c89]">{card.progress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  card.progress === 100 ? 'bg-emerald-500' : 'bg-[#406c89]'
                }`}
                style={{ width: `${card.progress}%` }}
              />
            </div>
          </div>

          {/* Milestones list */}
          {card.milestones && card.milestones.length > 0 && (
            <div className="space-y-2">
              <span className="text-slate-700 font-bold block flex items-center gap-1">
                <IconFlag size={15} className="text-blue-600" />
                <span>Các mốc Nghiệm thu chính:</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {card.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
                  >
                    <span className="font-bold text-slate-700">{m.label}</span>
                    <span
                      className={`font-mono font-bold text-xs ${
                        m.color === 'rose' ? 'text-rose-600' : 'text-blue-600'
                      }`}
                    >
                      {m.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#406c89] hover:bg-[#32566d] text-white text-xs font-bold rounded-lg cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
