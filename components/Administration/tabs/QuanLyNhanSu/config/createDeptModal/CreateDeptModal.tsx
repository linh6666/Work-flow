"use client";

import React, { useState } from 'react';
import { IconX, IconFolderPlus } from '@tabler/icons-react';

interface CreateDeptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (deptName: string, deptCode: string) => void;
}

export default function CreateDeptModal({ isOpen, onClose, onSave }: CreateDeptModalProps) {
  const [deptName, setDeptName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deptName.trim()) {
      alert('Vui lòng nhập tên phòng ban!');
      return;
    }
    onSave(deptName.trim(), '');
    setDeptName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content Card */}
      <div className="relative bg-white w-full max-w-[390px] rounded-2xl shadow-lg border border-slate-100/50 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-slate-800">Thêm phòng ban mới</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer bg-transparent border-0"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Tên phòng ban */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700">
              Tên phòng ban <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              required
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
              placeholder="VD: Phòng Kỹ thuật..."
              className="w-full px-4 py-3 text-xs font-semibold rounded-xl border border-indigo-500 bg-white text-slate-800 placeholder-slate-400/80 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-slate-650 hover:bg-slate-50 rounded-xl transition-all cursor-pointer bg-white border border-slate-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#9699e3] hover:bg-[#8588d4] rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer border-0"
            >
              <IconFolderPlus size={16} />
              Thêm
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
