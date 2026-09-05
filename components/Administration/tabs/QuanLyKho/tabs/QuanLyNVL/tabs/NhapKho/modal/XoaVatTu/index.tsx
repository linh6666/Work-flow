"use client";

import React from 'react';
import { IconAlertTriangle, IconX } from '@tabler/icons-react';
import { NhapKhoItem } from '../../index';

interface XoaVatTuModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: NhapKhoItem | null;
  onConfirm: (maHang: string) => void;
}

export default function XoaVatTuModal({
  isOpen,
  onClose,
  item,
  onConfirm,
}: XoaVatTuModalProps) {
  if (!isOpen || !item) return null;

  const handleConfirm = () => {
    onConfirm(item.ma_hang);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md p-6 space-y-4 text-slate-700 animate-scale-up">
        {/* Top bar with icon & close button */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
            <IconAlertTriangle size={22} />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Title & Warning message */}
        <div>
          <h3 className="text-base font-bold text-slate-800 tracking-tight">
            Xác nhận xóa vật tư nhập kho
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Bạn có chắc chắn muốn xóa bản ghi nhập kho của vật tư{' '}
            <span className="font-bold text-slate-800">"{item.ten_hang}"</span> (Mã:{' '}
            <span className="font-mono font-bold text-red-600">{item.ma_hang}</span>)?
          </p>
        </div>

        {/* Item summary card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-400">Nhóm hàng:</span>
            <span className="font-medium text-slate-700">{item.nhom_hang}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Số lượng:</span>
            <span className="font-medium text-slate-700">
              {item.so_luong.toLocaleString()} {item.dvt}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Thành tiền:</span>
            <span className="font-bold text-[#406c89]">{item.thanh_tien.toLocaleString()}đ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Nhà cung cấp:</span>
            <span className="font-medium text-slate-700">{item.ncc}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Ngày nhập:</span>
            <span className="font-medium text-slate-700">{item.ngay_nhap}</span>
          </div>
        </div>

        <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-200/60 rounded-lg p-2 leading-relaxed">
          ⚠️ Lưu ý: Hành động này sẽ xóa hoàn toàn bản ghi khỏi danh sách nhập kho và không thể hoàn tác.
        </p>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  );
}
