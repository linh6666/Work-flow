"use client";

import React from 'react';
import { IconX, IconAlertTriangle } from '@tabler/icons-react';
import type { ThanNhanItem } from '../../index';

interface XoaThanNhanModalProps {
  isOpen: boolean;
  item: ThanNhanItem | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export default function XoaThanNhanModal({ isOpen, item, onClose, onConfirm }: XoaThanNhanModalProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2 text-rose-600">
            <IconAlertTriangle size={18} />
            <h2 className="text-base font-bold">Xác nhận xóa thân nhân</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        <div className="p-6 text-sm text-slate-600">
          Bạn có chắc chắn muốn xóa thông tin thân nhân{' '}
          <span className="font-bold text-slate-800">{item.hoTenThanNhan}</span> (nhân viên{' '}
          <span className="font-semibold text-slate-800">{item.hoTenNV}</span>) không?
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(item.id);
              onClose();
            }}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 cursor-pointer"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
