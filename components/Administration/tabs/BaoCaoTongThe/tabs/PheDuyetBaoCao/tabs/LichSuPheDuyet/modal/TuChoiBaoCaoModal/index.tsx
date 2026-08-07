"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconCircleCheck, IconCircleX, IconInfoCircle } from '@tabler/icons-react';

export interface ReportItemForRejection {
  id: string;
  project: string;
  department: string;
  taskName: string;
  status: 'Đã duyệt' | 'Chờ duyệt' | 'Từ chối';
  reporter: string;
  time: string;
  workHours: string;
  quantity?: string | number;
}

interface TuChoiBaoCaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ReportItemForRejection | null;
  onConfirm: (id: string, reason: string) => void;
}

export default function TuChoiBaoCaoModal({
  isOpen,
  onClose,
  report,
  onConfirm,
}: TuChoiBaoCaoModalProps) {
  const [selectedAction, setSelectedAction] = useState<'Đã duyệt' | 'Từ chối'>('Từ chối');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedAction('Từ chối');
      setReason('');
    }
  }, [isOpen]);

  if (!isOpen || !report) return null;

  const handleConfirm = () => {
    onConfirm(report.id, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 select-none animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden text-left transform transition-all">
        {/* HEADER */}
        <div className="p-5 pb-3 flex items-start justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-800 leading-snug">
            Từ chối báo cáo — <span className="font-extrabold text-slate-900">{report.taskName}</span>
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* BODY CONTENT */}
        <div className="px-5 py-3 space-y-4">
          {/* INFO GRID */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            <div>
              <p className="text-[11px] font-semibold text-slate-400">Dự án</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{report.project}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400">Phòng</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{report.department}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400">Người báo cáo</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{report.reporter}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400">Thời gian</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{report.time}</p>
            </div>
          </div>

          {/* HIGHLIGHT CARDS (GIỜ TT & KHỐI LƯỢNG) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#fffbeb]/70 border border-[#fef3c7] p-3 rounded-xl">
              <p className="text-[11px] font-semibold text-slate-500">Giờ TT</p>
              <p className="text-sm font-bold text-[#d97706] mt-0.5">{report.workHours}</p>
            </div>
            <div className="bg-[#ecfdf5]/70 border border-[#d1fae5] p-3 rounded-xl">
              <p className="text-[11px] font-semibold text-slate-500">Khối lượng</p>
              <p className="text-sm font-bold text-[#059669] mt-0.5">{report.quantity || 1}</p>
            </div>
          </div>

          {/* TOGGLE SELECTION BUTTONS: DUYỆT / TỪ CHỐI */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => setSelectedAction('Đã duyệt')}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                selectedAction === 'Đã duyệt'
                  ? 'bg-[#e6f4ea] border-[#a8edc1] text-[#0f9f59] shadow-2xs'
                  : 'bg-slate-50/80 border-slate-200 text-slate-600 hover:bg-emerald-50/50 hover:border-emerald-200 hover:text-emerald-700'
              }`}
            >
              <IconCircleCheck size={16} className={selectedAction === 'Đã duyệt' ? 'text-[#0f9f59]' : 'text-slate-400'} />
              <span>Duyệt</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedAction('Từ chối')}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                selectedAction === 'Từ chối'
                  ? 'bg-[#fde8e8] border-[#fca5a5] text-[#e11d48] shadow-2xs'
                  : 'bg-slate-50/80 border-slate-200 text-slate-600 hover:bg-rose-50/50 hover:border-rose-200 hover:text-rose-700'
              }`}
            >
              <IconCircleX size={16} className={selectedAction === 'Từ chối' ? 'text-[#e11d48]' : 'text-slate-400'} />
              <span>Từ chối</span>
            </button>
          </div>

          {/* REJECTION REASON AREA */}
          {selectedAction === 'Từ chối' && (
            <div className="space-y-1.5 animate-in fade-in duration-200 pt-1">
              <label className="flex items-center gap-1 text-xs font-bold text-slate-700">
                <IconInfoCircle size={15} className="text-slate-600" />
                <span>Lý do từ chối <span className="text-rose-500">*</span></span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Nhập lý do..."
                className="w-full border border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-xl p-3 text-xs text-slate-700 placeholder:text-slate-400 min-h-[90px] resize-none shadow-2xs"
              />
            </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200/90 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg text-xs font-bold text-white shadow-md transition-all cursor-pointer ${
              selectedAction === 'Đã duyệt'
                ? 'bg-[#059669] hover:bg-[#047857] shadow-emerald-700/20'
                : 'bg-[#f87171] hover:bg-[#ef4444] shadow-rose-700/20'
            }`}
          >
            {selectedAction === 'Đã duyệt' ? 'Xác nhận duyệt' : 'Từ chối'}
          </button>
        </div>
      </div>
    </div>
  );
}
