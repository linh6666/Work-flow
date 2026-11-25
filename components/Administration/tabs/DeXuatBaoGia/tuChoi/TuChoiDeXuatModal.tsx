"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconCircleX } from '@tabler/icons-react';
import { DeXuat } from '../index';

interface TuChoiDeXuatModalProps {
  isOpen: boolean;
  proposal: DeXuat | null;
  onClose: () => void;
  onConfirm: (id: string, reason: string) => Promise<void> | void;
}

export default function TuChoiDeXuatModal({
  isOpen,
  proposal,
  onClose,
  onConfirm,
}: TuChoiDeXuatModalProps) {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) setReason('');
  }, [isOpen]);

  if (!isOpen || !proposal) return null;

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onConfirm(proposal.id, reason.trim() || 'Từ chối phê duyệt');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <form
        onSubmit={handleConfirm}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-4 border border-slate-100 flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-600">
            <IconCircleX size={20} />
            <h3 className="text-lg font-bold text-slate-800">Từ chối đề xuất</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        <p className="text-sm text-slate-600">
          Nhập lý do từ chối đề xuất{' '}
          <span className="font-bold text-slate-800">{proposal.soDX}</span>:
        </p>

        <textarea
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Nhập lý do từ chối (tùy chọn)..."
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-200 resize-none"
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg text-white text-xs font-semibold shadow-sm cursor-pointer disabled:opacity-50 bg-rose-600 hover:bg-rose-700"
          >
            {isSubmitting ? 'Đang xử lý...' : 'Xác nhận từ chối'}
          </button>
        </div>
      </form>
    </div>
  );
}
