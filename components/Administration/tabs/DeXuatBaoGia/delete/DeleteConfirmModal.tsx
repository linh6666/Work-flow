"use client";

import React from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  proposalCode: string;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, proposalCode }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 transition-all">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-4 border border-slate-100 flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Title */}
        <h3 className="text-xl font-bold text-slate-800">Xác nhận xóa</h3>

        {/* Content */}
        <p className="text-[14px] text-slate-500 leading-relaxed">
          Bạn có chắc muốn xóa mục <span className="font-bold text-slate-800">"{proposalCode}"</span>? Hành động này không thể hoàn tác.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer transition-all active:scale-95 bg-white"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 rounded-lg text-white text-sm font-semibold shadow-sm transition-all cursor-pointer bg-[#e54a4a] hover:bg-red-600 active:scale-95"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
