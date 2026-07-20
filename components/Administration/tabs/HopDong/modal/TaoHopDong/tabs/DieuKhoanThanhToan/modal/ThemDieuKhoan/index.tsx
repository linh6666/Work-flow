"use client";

import React, { useState } from 'react';
import { IconX } from '@tabler/icons-react';

interface ThemDieuKhoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, content: string) => void;
}

export default function ThemDieuKhoanModal({ isOpen, onClose, onAdd }: ThemDieuKhoanModalProps) {
  const [tieuDe, setTieuDe] = useState('');
  const [noiDung, setNoiDung] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tieuDe.trim()) return;

    onAdd(tieuDe.trim(), noiDung.trim());
    setTieuDe('');
    setNoiDung('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
      {/* Modal Card */}
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden animate-scale-up p-6 space-y-4">
        
        {/* Header Title & Close Button */}
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Thêm điều khoản mới
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Field 1: Tiêu đề điều khoản * */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Tiêu đề điều khoản <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={tieuDe}
              onChange={(e) => setTieuDe(e.target.value)}
              placeholder="VD: Thời gian sản xuất"
              className="w-full text-xs bg-white border border-[#406c89] focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs font-sans"
            />
          </div>

          {/* Field 2: Nội dung * */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Nội dung <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              required
              value={noiDung}
              onChange={(e) => setNoiDung(e.target.value)}
              placeholder="Nhập nội dung đầy đủ cho điều khoản này..."
              className="w-full text-xs bg-[#f8fafc]/90 border border-slate-200/90 rounded-xl p-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] resize-y leading-relaxed font-sans"
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Lưu
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
