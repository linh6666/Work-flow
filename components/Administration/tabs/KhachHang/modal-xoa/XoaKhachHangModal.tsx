"use client";

import React from 'react';

interface XoaKhachHangModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customerName: string;
}

export default function XoaKhachHangModal({
  isOpen,
  onClose,
  onConfirm,
  customerName,
}: XoaKhachHangModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 p-6 transform transition-all scale-100 animate-scale-up text-left">
        
        {/* Title */}
        <h3 className="text-lg font-bold text-slate-800 mb-3">Xác nhận xóa</h3>
        
        {/* Content */}
        <p className="text-sm text-slate-500 leading-relaxed">
          Bạn có chắc muốn xóa mục <strong className="text-slate-800 font-bold">"{customerName}"</strong>? Hành động này không thể hoàn tác.
        </p>

        {/* Footer Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-2xs"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 bg-[#ef4444] hover:bg-red-600 active:scale-95 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-sm"
          >
            Xóa
          </button>
        </div>

      </div>
    </div>
  );
}
