"use client";

import React from 'react';
import { DuAnItem } from '../../index';

interface XoaDuAnModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: DuAnItem | null;
  onConfirmDelete: (projectId: string) => void;
}

export default function XoaDuAnModal({
  isOpen,
  onClose,
  project,
  onConfirmDelete,
}: XoaDuAnModalProps) {
  if (!isOpen || !project) return null;

  const handleConfirm = () => {
    onConfirmDelete(project.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md p-6 space-y-4 text-slate-700 animate-scale-up">
        
        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
          Xác nhận xóa
        </h3>

        {/* Message Content */}
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Bạn có chắc muốn xóa mục <span className="font-bold text-slate-800">"{project.tenDuAn.toUpperCase()}"</span>? Hành động này không thể hoàn tác.
        </p>

        {/* Right-aligned Buttons */}
        <div className="pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-1.5 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            Xóa
          </button>
        </div>

      </div>
    </div>
  );
}
