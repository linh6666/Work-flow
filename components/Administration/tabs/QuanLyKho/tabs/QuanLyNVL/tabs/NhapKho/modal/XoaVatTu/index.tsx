"use client";

import React from 'react';
import { NhapKhoItem } from '../../index';

interface XoaVatTuModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: NhapKhoItem | null;
  onConfirm: (maHang: string) => void;
}

export default function XoaVatTuModal({
  isOpen,
  onClose,
  item,
  onConfirm,
}: XoaVatTuModalProps) {
  if (!isOpen || !item) return null;

  const handleConfirm = () => {
    onConfirm(item.ma_hang);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-[460px] p-6 sm:p-7 text-slate-700 animate-scale-up">
        {/* Title */}
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">
          Xác nhận xóa
        </h3>

        {/* Message */}
        <p className="text-sm text-slate-500 mt-3 leading-relaxed">
          Bạn có chắc muốn xóa mục{' '}
          <span className="font-bold text-slate-800">"{item.ten_hang}"</span>? Hành động này không thể hoàn tác.
        </p>

        {/* Action Buttons */}
        <div className="mt-7 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4.5 py-2 border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 bg-[#406c89] hover:bg-[#345870] active:bg-[#2a475b] text-white text-sm font-medium rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
