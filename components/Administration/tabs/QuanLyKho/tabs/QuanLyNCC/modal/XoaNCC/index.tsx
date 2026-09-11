"use client";

import React from 'react';
import { IconTrash, IconX } from '@tabler/icons-react';

interface XoaNCCProps {
  isOpen: boolean;
  item: { ma_ncc: string; ncc: string } | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function XoaNCC({ isOpen, item, onClose, onConfirm }: XoaNCCProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="w-full max-w-[460px] rounded-xl border border-slate-200 bg-white p-6 text-slate-700 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between">
          <h2 className="text-base font-bold text-slate-800">Xóa nhà cung cấp</h2>
          <button type="button" onClick={onClose} aria-label="Đóng" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><IconX size={17} /></button>
        </div>
        <p className="mt-3 text-sm leading-5 text-slate-500">
          Bạn có chắc muốn xóa nhà cung cấp <strong className="text-slate-800">{item.ncc}</strong> ({item.ma_ncc}) không?
        </p>
        <div className="mt-6 flex justify-end gap-2.5">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Hủy</button>
          <button type="button" onClick={onConfirm} className="flex items-center gap-1.5 rounded-lg bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600"><IconTrash size={14} /> Xóa</button>
        </div>
      </div>
    </div>
  );
}
