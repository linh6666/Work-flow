"use client";

import React, { useState } from 'react';
import { IconCheck, IconX, IconCircleCheck } from '@tabler/icons-react';
import { ViolationDetailItem } from '../../index';

interface ChapNhanViPhamModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ViolationDetailItem | null;
  onConfirm: (id: string, note?: string) => void;
}

export default function ChapNhanViPhamModal({
  isOpen,
  onClose,
  item,
  onConfirm,
}: ChapNhanViPhamModalProps) {
  const [note, setNote] = useState('');

  if (!isOpen || !item) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(item.id, note);
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs font-sans overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-left my-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <IconCircleCheck size={20} />
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight">
              Xác nhận Chấp nhận vi phạm
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
        <form onSubmit={handleConfirm} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
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

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Hệ thống sẽ cập nhật trạng thái vi phạm này sang <strong className="text-emerald-700">&quot;Đã chấp nhận&quot;</strong> và gửi thông báo tới quản lý bộ phận liên quan.
          </p>

          {/* INPUT NOTE */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Ghi chú xử lý <span className="text-slate-400 font-normal">(không bắt buộc)</span>
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập ghi chú hoặc lý do phê duyệt chấp nhận..."
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs resize-none transition-all"
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
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <IconCheck size={15} />
              <span>Xác nhận chấp nhận</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
