"use client";

import React, { useState } from 'react';
import { IconTrash, IconLoader2, IconAlertTriangle } from '@tabler/icons-react';
import { HoSoPhapLyItem } from '../index';
import { deleteHoSoPhapLy } from '@/api/apiGetHoSoPhapLy';

interface ModalXoaHoSoProps {
  isOpen: boolean;
  item: HoSoPhapLyItem | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ModalXoaHoSo({
  isOpen,
  item,
  onClose,
  onSuccess,
}: ModalXoaHoSoProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !item) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteHoSoPhapLy(item.id);
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Lỗi khi xóa hồ sơ:', err);
      alert(err?.message || 'Không thể xóa hồ sơ');
      onSuccess();
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-150 p-6 text-center">
        {/* Warning Icon */}
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3.5 ring-8 ring-rose-50/50">
          <IconAlertTriangle size={24} />
        </div>

        <h3 className="text-sm font-bold text-slate-800 mb-1">Xác nhận xóa hồ sơ</h3>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Bạn có chắc chắn muốn xóa hồ sơ pháp lý của nhân sự{' '}
          <strong className="text-slate-700 font-semibold">{item.hoTen}</strong> (Mã:{' '}
          <span className="font-mono">{item.maNV}</span>)? Thao tác này không thể hoàn tác.
        </p>

        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <IconLoader2 size={14} className="animate-spin" />
                <span>Đang xóa...</span>
              </>
            ) : (
              <>
                <IconTrash size={14} />
                <span>Xóa hồ sơ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
