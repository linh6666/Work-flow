"use client";

import React from 'react';
import { TonKhoItem } from '../../index';

interface XoaVatTuModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: TonKhoItem | null;
  onConfirm: (item: TonKhoItem) => void;
}

export default function XoaVatTuModal({
  isOpen,
  onClose,
  item,
  onConfirm,
}: XoaVatTuModalProps) {
  if (!isOpen || !item) return null;

  const handleConfirm = () => {
    onConfirm(item);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl border border-slate-100 w-full max-w-[450px] p-6 text-slate-700 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h3 className="text-base font-bold text-slate-900">
          Xác nhận xóa
        </h3>

        {/* Message */}
        <p className="text-sm text-slate-500 mt-2.5 leading-relaxed">
          Bạn có chắc muốn xóa mục{' '}
          <span className="font-bold text-slate-800">"{item.ten_hang}"</span>? Hành động này không thể hoàn tác.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 bg-[#ea4e47] hover:bg-[#d93f38] active:bg-[#c2332c] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
