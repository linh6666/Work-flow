"use client";

import React from 'react';
import { IconAlertTriangle, IconX } from '@tabler/icons-react';

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
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-3">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-xl border border-slate-100 p-4 transform transition-all scale-100 text-left">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#406c89]/10 text-[#406c89] flex items-center justify-center shrink-0">
              <IconAlertTriangle size={16} />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Xác nhận xóa khách hàng</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-50 transition-all cursor-pointer"
          >
            <IconX size={15} />
          </button>
        </div>

        {/* Content */}
        <p className="text-[11px] text-slate-600 leading-relaxed mb-4">
          Bạn có chắc chắn muốn xóa khách hàng{' '}
          <strong className="text-slate-900 font-bold">"{customerName}"</strong>? Hành động này không thể hoàn tác.
        </p>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-md text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-1.5 bg-[#406c89] hover:bg-[#345972] active:scale-95 text-white rounded-md text-[11px] font-bold transition-all cursor-pointer shadow-sm shadow-[#406c89]/20"
          >
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  );
}
