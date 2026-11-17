"use client";

import React from 'react';
import { IconHelp } from '@tabler/icons-react';
import { HoSoTuyenDungItem } from '../../index';

interface XoaUngVienModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: HoSoTuyenDungItem | null;
  onConfirm: (candidateId: string) => void;
}

export default function XoaUngVienModal({
  isOpen,
  onClose,
  candidate,
  onConfirm,
}: XoaUngVienModalProps) {
  if (!isOpen || !candidate) return null;

  const handleConfirm = () => {
    onConfirm(candidate.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 w-full max-w-[480px] p-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Nội dung câu hỏi xác nhận */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 border-[#d97706] text-[#d97706] flex items-center justify-center font-bold text-xs flex-shrink-0">
            ?
          </div>
          <h3 className="font-bold text-[15px] sm:text-base text-slate-900 leading-snug">
            Xóa hồ sơ ứng viên &quot;{candidate.hoTen}&quot;?
          </h3>
        </div>

        {/* Nút Hủy và Đồng ý */}
        <div className="flex items-center justify-end gap-3 mt-7">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition shadow-2xs cursor-pointer min-w-[72px]"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#ed4e47] hover:bg-[#db3f38] rounded-lg transition shadow-2xs cursor-pointer min-w-[78px]"
          >
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
}
