"use client";

import React from 'react';
import { IconAlertTriangle, IconX } from '@tabler/icons-react';

interface XoaNhomModalProps {
  isOpen: boolean;
  groupTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function XoaNhomModal({
  isOpen,
  groupTitle,
  onClose,
  onConfirm,
}: XoaNhomModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-slate-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-600">
            <IconAlertTriangle size={18} />
            <h3 className="text-base font-bold text-slate-800">Xác nhận xóa nhóm</h3>
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

        <div className="p-6 text-sm text-slate-600">
          Bạn có chắc chắn muốn xóa toàn bộ nhóm{' '}
          <span className="font-bold text-slate-800">{groupTitle}</span> không?
        </div>

        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 cursor-pointer"
          >
            Xóa nhóm
          </button>
        </div>
      </div>
    </div>
  );
}
