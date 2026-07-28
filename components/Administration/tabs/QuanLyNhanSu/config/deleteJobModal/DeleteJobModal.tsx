"use client";

import React from 'react';
import { IconX, IconTrash, IconAlertTriangle } from '@tabler/icons-react';

interface JobData {
  code: string;
  name: string;
}

interface DeleteJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobData | null;
  deptName: string;
  onConfirm: (jobCode: string) => void;
}

export default function DeleteJobModal({ isOpen, onClose, job, deptName, onConfirm }: DeleteJobModalProps) {
  if (!isOpen || !job) return null;

  const handleConfirm = () => {
    onConfirm(job.code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content Card */}
      <div className="relative bg-white w-full max-w-[390px] rounded-2xl shadow-lg border border-slate-100/50 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-650 flex items-center justify-center">
              <IconAlertTriangle size={18} />
            </div>
            <h3 className="text-base font-bold text-slate-800">Xác nhận xóa hạng mục</h3>
          </div>
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
          <p className="text-xs text-slate-500 leading-relaxed">
            Bạn có chắc chắn muốn xóa hạng mục công việc <strong className="text-slate-800 font-bold">{job.name}</strong> ({job.code}) khỏi danh sách mặc định của <strong className="text-slate-800 font-bold">{deptName}</strong> không?
          </p>
          <p className="text-[11px] text-red-500 mt-2 font-semibold bg-red-50/50 px-2.5 py-1.5 rounded-lg border border-red-100/40">
            Hành động này sẽ xóa hạng mục công việc ra khỏi danh sách cấu hình và không thể hoàn tác.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-slate-655 hover:bg-slate-50 rounded-xl transition-all cursor-pointer bg-white border border-slate-200"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer border-0"
          >
            <IconTrash size={16} />
            Xóa
          </button>
        </div>

      </div>
    </div>
  );
}
