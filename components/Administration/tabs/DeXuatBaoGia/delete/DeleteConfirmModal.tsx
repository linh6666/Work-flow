"use client";

import React, { useState } from 'react';
import { NotificationExtension } from '@/common/extension/NotificationExtension';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  proposalCode: string;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, proposalCode }: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } catch {
      NotificationExtension.Fails('Có lỗi xảy ra khi xóa đề xuất!');
    } finally {
      setIsDeleting(false);
    }
  };

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
            disabled={isDeleting}
            onClick={onClose}
            className="px-5 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 cursor-pointer transition-all active:scale-95 bg-white"
          >
            Hủy
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={handleConfirm}
            className="px-5 py-2 rounded-lg text-white text-sm font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-50 bg-[#406c89] hover:bg-[#345972] active:scale-95"
          >
            {isDeleting ? 'Đang xóa...' : 'Xóa'}
          </button>
        </div>
      </div>
    </div>
  );
}
