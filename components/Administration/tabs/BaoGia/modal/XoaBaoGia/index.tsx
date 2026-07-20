"use client";

import React from 'react';
import { IconTrashX } from '@tabler/icons-react';
import { BaoGiaItem } from '../../index';

interface XoaBaoGiaModalProps {
  isOpen: boolean;
  onClose: () => void;
  deletingItem: BaoGiaItem | null;
  onConfirm: () => void;
}

export default function XoaBaoGiaModal({
  isOpen,
  onClose,
  deletingItem,
  onConfirm,
}: XoaBaoGiaModalProps) {
  if (!isOpen || !deletingItem) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col transform transition-all animate-scale-up">
        
        {/* Body content */}
        <div className="p-6 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#406c89]/10 border border-[#406c89]/20 flex items-center justify-center text-[#406c89] shrink-0">
            <IconTrashX size={22} />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Xóa báo giá</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              Bạn có chắc chắn muốn xóa báo giá <strong className="font-bold text-slate-800">{deletingItem.soBg}</strong>? 
              Hành động này không thể hoàn tác.
            </p>
          </div>
        </div>
        
        {/* Footer buttons - Increased size & color #406c89 */}
        <div className="bg-slate-50/60 px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-slate-200/90 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 bg-[#406c89] hover:bg-[#345972] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Đồng ý xóa
          </button>
        </div>

      </div>
    </div>
  );
}
