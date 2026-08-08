"use client";

import React, { useState } from 'react';
import { IconMessageDots, IconX } from '@tabler/icons-react';
import { ViolationDetailItem } from '../../index';

interface GiaiTrinhViPhamModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ViolationDetailItem | null;
  onSubmitSuccess?: (explanation: string) => void;
}

export default function GiaiTrinhViPhamModal({
  isOpen,
  onClose,
  item,
  onSubmitSuccess,
}: GiaiTrinhViPhamModalProps) {
  const [explanation, setExplanation] = useState('');

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!explanation.trim()) return;
    if (onSubmitSuccess) {
      onSubmitSuccess(explanation);
    }
    setExplanation('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs font-sans overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-left my-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#406c89]/10 text-[#406c89]">
              <IconMessageDots size={20} />
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight">
              Giải trình lý do vi phạm
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* BODY FORM */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* INFO CARD BOX */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 text-xs space-y-2.5">
            <div className="flex items-start">
              <span className="text-slate-400 font-medium w-24 shrink-0">Nhân sự:</span>
              <span className="text-slate-800 font-bold">{item.reporter}</span>
            </div>

            <div className="flex items-start">
              <span className="text-slate-400 font-medium w-24 shrink-0">Phòng ban:</span>
              <span className="text-slate-800 font-semibold">{item.department}</span>
            </div>

            <div className="flex items-start">
              <span className="text-slate-400 font-medium w-24 shrink-0">Ngày:</span>
              <span className="text-slate-800 font-semibold">{item.date}</span>
            </div>

            <div className="flex items-start">
              <span className="text-slate-400 font-medium w-24 shrink-0">Dự án:</span>
              <span className="text-slate-800 font-bold uppercase">{item.project}</span>
            </div>

            <div className="flex items-start leading-relaxed">
              <span className="text-slate-400 font-medium w-24 shrink-0">Chi tiết:</span>
              <span className="text-slate-700 font-medium">{item.content}</span>
            </div>
          </div>

          {/* INPUT EXPLANATION */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Nội dung giải trình <span className="text-slate-400 font-normal">(bắt buộc)</span>
            </label>
            <textarea
              rows={4}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="VD: Nhân sự báo cáo vượt giờ do phát sinh công việc gấp chưa kịp điều phối, đã xác minh với trưởng nhóm..."
              className="w-full px-3.5 py-3 border-2 border-[#406c89] rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#406c89]/20 shadow-2xs resize-none transition-all"
              required
            />
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-xs transition-colors shadow-2xs cursor-pointer"
            >
              Hủy
            </button>

            <button
              type="submit"
              disabled={!explanation.trim()}
              className="px-4 py-2 bg-[#406c89] hover:bg-[#33566e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <IconMessageDots size={15} />
              <span>Lưu giải trình</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
