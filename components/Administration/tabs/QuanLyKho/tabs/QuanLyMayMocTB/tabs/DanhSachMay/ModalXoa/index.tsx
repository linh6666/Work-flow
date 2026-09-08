"use client";

import React from 'react';
import { IconAlertTriangle, IconTrash, IconX } from '@tabler/icons-react';
import { MayMocChiTietItem } from '../index';

interface ModalXoaProps {
  isOpen: boolean;
  onClose: () => void;
  item: MayMocChiTietItem | null;
  onConfirm: (id: string) => void;
}

export default function ModalXoa({
  isOpen,
  onClose,
  item,
  onConfirm,
}: ModalXoaProps) {
  if (!isOpen || !item) return null;

  const handleConfirm = () => {
    onConfirm(item.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-2xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-[460px] p-6 text-slate-700 animate-scale-up">
        {/* Top Icon & Close */}
        <div className="flex items-start justify-between">
          <div className="w-11 h-11 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <IconAlertTriangle size={22} />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Title & Content */}
        <div className="mt-4">
          <h3 className="text-base font-bold text-slate-800 tracking-tight">
            Xác nhận xóa máy móc
          </h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Bạn có chắc chắn muốn xóa máy móc{' '}
            <span className="font-bold text-slate-800">"{item.ten_may}"</span>{' '}
            (Mã:{' '}
            <span className="font-semibold text-slate-700">{item.ma_may}</span>) thuộc{' '}
            <span className="font-medium text-slate-700">{item.phong_ban}</span> không?
          </p>
          <div className="mt-3 p-3 bg-amber-50/80 border border-amber-200/60 rounded-xl text-[11px] text-amber-800">
            Hành động này sẽ xóa máy móc khỏi danh sách và không thể hoàn tác.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex items-center gap-1.5 px-4.5 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <IconTrash size={14} />
            <span>Xác nhận xóa</span>
          </button>
        </div>
      </div>
    </div>
  );
}
