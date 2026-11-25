"use client";

import React, { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';
import { DeXuat } from '../index';

interface DuyetDeXuatModalProps {
  isOpen: boolean;
  proposal: DeXuat | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void> | void;
}

export default function DuyetDeXuatModal({
  isOpen,
  proposal,
  onClose,
  onConfirm,
}: DuyetDeXuatModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !proposal) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm(proposal.id);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-4 border border-slate-100 flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-700">
            <IconCheck size={20} stroke={2.4} />
            <h3 className="text-base font-bold">Phê duyệt đề xuất</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        <div className="space-y-1 text-xs text-slate-600 leading-relaxed">
          <p>
            Đề xuất <span className="font-bold text-slate-800">{proposal.soDX}</span> từ{' '}
            <span className="font-bold text-slate-800">{proposal.nguoiLap || '—'}</span>
          </p>
          <p>
            Đơn vị: <span className="font-bold text-slate-800">{proposal.donViLienHe || '—'}</span>
          </p>
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 px-3.5 py-2.5 text-xs text-emerald-700">
          Sau khi duyệt, NV KD có thể lập báo giá từ đề xuất này.
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 cursor-pointer bg-white"
          >
            Hủy
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirm}
            className="px-5 py-2 rounded-lg text-white text-xs font-semibold shadow-sm cursor-pointer disabled:opacity-50 bg-emerald-600 hover:bg-emerald-700"
          >
            {isSubmitting ? 'Đang duyệt...' : 'Xác nhận duyệt'}
          </button>
        </div>
      </div>
    </div>
  );
}
