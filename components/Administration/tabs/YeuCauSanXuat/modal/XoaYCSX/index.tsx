"use client";

import React from 'react';
import { IconX } from '@tabler/icons-react';
import { YcsxItem } from '../../index';

interface XoaYCSXModalProps {
  isOpen: boolean;
  itemData: YcsxItem | null;
  onClose: () => void;
  onConfirmDelete: (id: string) => void;
}

export default function XoaYCSXModal({
  isOpen,
  itemData,
  onClose,
  onConfirmDelete,
}: XoaYCSXModalProps) {
  if (!isOpen || !itemData) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in select-none">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-sm w-full p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150 relative">
        
        {/* Header Title & Close Button */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Xác nhận xóa
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Message Content */}
        <p className="text-xs text-slate-500 leading-relaxed font-normal">
          Xóa YCSX <span className="font-bold text-slate-800 uppercase">{itemData.tenDuAn}</span>? Hành động này không thể hoàn tác.
        </p>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirmDelete(itemData.id);
              onClose();
            }}
            className="px-5 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            Xóa
          </button>
        </div>

      </div>
    </div>
  );
}
