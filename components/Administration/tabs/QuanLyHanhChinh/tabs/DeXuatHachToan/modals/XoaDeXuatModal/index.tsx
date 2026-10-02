"use client";

import React from 'react';
import { IconX, IconAlertTriangle } from '@tabler/icons-react';
import { MonthRecord } from '../SuaDeXuatModal';

interface XoaDeXuatModalProps {
  isOpen: boolean;
  record: MonthRecord | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export default function XoaDeXuatModal({
  isOpen,
  record,
  onClose,
  onConfirm,
}: XoaDeXuatModalProps) {
  if (!isOpen || !record) return null;

  const handleConfirm = () => {
    onConfirm(record.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <IconAlertTriangle size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Xác nhận xóa bản ghi</h2>
              <p className="text-xs text-slate-400">Hành động này không thể hoàn tác</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 text-xs text-slate-600 space-y-3">
          <p>
            Bạn có chắc chắn muốn xóa bản ghi đợt hạch toán{' '}
            <span className="font-bold text-slate-800">{record.thang} - {record.nam}</span> với tổng tiền{' '}
            <span className="font-bold text-rose-600">{record.tongTien}</span> không?
          </p>
          <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl text-[11.5px] text-rose-700">
            ⚠️ Lưu ý: Các đề xuất chi tiết liên quan trong tháng này có thể bị loại khỏi danh sách tổng hợp.
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Xóa dữ liệu
          </button>
        </div>
      </div>
    </div>
  );
}
