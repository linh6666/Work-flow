"use client";

import React from 'react';
import { IconX } from '@tabler/icons-react';

interface NhanSuData {
  id: string;
  duAn: string;
  maKH: string;
  khachHang: string;
  nvLap: string;
  ngayLap: string;
  trangThai: 'dang-dien' | 'da-tong-hop';
}

interface DeleteNhanSuModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: NhanSuData | null;
  onConfirm: (planId: string) => void;
}

export default function DeleteNhanSuModal({ isOpen, onClose, plan, onConfirm }: DeleteNhanSuModalProps) {
  if (!isOpen || !plan) return null;

  const handleConfirm = () => {
    onConfirm(plan.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content Card */}
      <div className="relative bg-white w-full max-w-[430px] rounded-2xl shadow-lg border border-slate-100/50 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-base font-bold text-slate-800">Xác nhận xóa</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-655 transition-colors cursor-pointer bg-transparent border-0"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mb-6">
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Bạn có chắc muốn xóa mục <strong className="text-slate-800 font-extrabold">"{plan.duAn}"</strong>? Hành động này không thể hoàn tác.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-650 hover:bg-slate-50 rounded-xl transition-all cursor-pointer bg-white border border-slate-200"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer border-0"
          >
            Xóa
          </button>
        </div>

      </div>
    </div>
  );
}
