"use client";

import React from 'react';
import { ContractTemplateItem } from '../QuanLyTemplate';

interface XoaMauModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: ContractTemplateItem | null;
  onConfirm: (id: string) => void;
}

export default function XoaMauModal({ isOpen, onClose, template, onConfirm }: XoaMauModalProps) {
  if (!isOpen || !template) return null;

  const handleConfirmDelete = () => {
    onConfirm(template.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
      {/* Modal Card */}
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden animate-scale-up p-6 space-y-4">
        
        {/* Header */}
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Xác nhận xóa
        </h3>

        {/* Message Body */}
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
          Bạn có chắc muốn xóa mục <strong className="font-bold text-slate-900">"{template.title}"</strong>? Hành động này không thể hoàn tác.
        </p>

        {/* Footer Buttons - Increased size & color #406c89 */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            className="px-5 py-2.5 bg-[#406c89] hover:bg-[#345972] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Xóa
          </button>
        </div>

      </div>
    </div>
  );
}
