"use client";

import React from 'react';
import { IconTrash } from '@tabler/icons-react';
import { YearlyPlanRow } from '../../types';

interface XoaKeHoachModalProps {
  isOpen: boolean;
  item: YearlyPlanRow | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function XoaKeHoachModal({
  isOpen,
  item,
  onClose,
  onConfirm,
}: XoaKeHoachModalProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden p-5 text-center animate-in fade-in zoom-in-95 duration-150">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
          <IconTrash size={24} />
        </div>
        <h4 className="text-sm font-bold text-slate-800 mb-1">Xác nhận xóa kế hoạch</h4>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Bạn có chắc chắn muốn xóa bản kế hoạch{' '}
          <span className="font-bold text-slate-800">{item.nam}</span> của{' '}
          <span className="font-semibold text-slate-700">{item.nguoiLap}</span> không? Thao tác này không thể hoàn tác.
        </p>
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer transition"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm cursor-pointer transition"
          >
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  );
}
