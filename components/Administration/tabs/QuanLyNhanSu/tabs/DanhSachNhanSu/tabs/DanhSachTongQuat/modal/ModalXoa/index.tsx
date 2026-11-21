"use client";

import React from 'react';
import { IconTrash } from '@tabler/icons-react';
import { NhanSuItem } from '../../index';

interface ModalXoaProps {
  isOpen: boolean;
  item: NhanSuItem | null;
  onConfirm: (item: NhanSuItem) => void;
  onClose: () => void;
}

export default function ModalXoa({
  isOpen,
  item,
  onConfirm,
  onClose,
}: ModalXoaProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-150 p-5 text-center">
        <div className="w-11 h-11 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
          <IconTrash size={22} />
        </div>
        <h4 className="text-sm font-bold text-slate-800 mb-1">Xác nhận xóa nhân sự</h4>
        <p className="text-xs text-slate-500 mb-4">
          Bạn có chắc chắn muốn xóa nhân sự{' '}
          <span className="font-bold text-slate-700">{item.hoTen}</span>{' '}
          ({item.maNV}) khỏi danh sách không?
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
            onClick={() => {
              onConfirm(item);
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm cursor-pointer transition"
          >
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  );
}
