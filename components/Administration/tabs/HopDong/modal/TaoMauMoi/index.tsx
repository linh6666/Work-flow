"use client";

import React, { useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { ContractTemplateItem } from '../QuanLyTemplate';

interface TaoMauMoiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newTemplate: ContractTemplateItem) => void;
}

export default function TaoMauMoiModal({ isOpen, onClose, onSave }: TaoMauMoiModalProps) {
  const [tenMau, setTenMau] = useState('');
  const [ngonNgu, setNgonNgu] = useState('vi');
  const [moTa, setMoTa] = useState('');
  const [noiDung, setNoiDung] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenMau.trim()) return;

    const newTpl: ContractTemplateItem = {
      id: `tpl-${Date.now()}`,
      title: tenMau.trim().toUpperCase(),
      lang: ngonNgu === 'vi' ? 'vi' : 'en',
      author: 'Thao Phung',
      usedCount: 0,
    };

    onSave(newTpl);
    setTenMau('');
    setMoTa('');
    setNoiDung('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
      {/* Modal Card */}
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-xl overflow-hidden animate-scale-up p-6 flex flex-col space-y-5">
        
        {/* Header Title & Close Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Tạo mẫu mới
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Field 1: Tên mẫu * */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Tên mẫu <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={tenMau}
              onChange={(e) => setTenMau(e.target.value)}
              className="w-full text-xs bg-white border border-[#406c89] focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none transition-all shadow-2xs"
            />
          </div>

          {/* Field 2: Ngôn ngữ */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Ngôn ngữ
            </label>
            <select
              value={ngonNgu}
              onChange={(e) => setNgonNgu(e.target.value)}
              className="w-full text-xs bg-[#f8fafc] border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all cursor-pointer"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">Tiếng Anh</option>
              <option value="vi-en">Song ngữ (Việt - Anh)</option>
            </select>
          </div>

          {/* Field 3: Mô tả */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Mô tả
            </label>
            <input
              type="text"
              value={moTa}
              onChange={(e) => setMoTa(e.target.value)}
              className="w-full text-xs bg-[#f8fafc] border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
            />
          </div>

          {/* Field 4: Nội dung tiếng Việt */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Nội dung tiếng Việt
            </label>
            <div className="space-y-1">
              <textarea
                rows={9}
                value={noiDung}
                onChange={(e) => setNoiDung(e.target.value)}
                placeholder="Nhập nội dung hợp đồng tiếng Việt..."
                className="w-full text-xs bg-[#f8fafc] border border-slate-200/80 rounded-xl p-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] resize-y font-mono leading-relaxed"
              />
              <div className="text-[11px] text-slate-400 font-normal">
                {noiDung.length} ký tự
              </div>
            </div>
          </div>

          {/* Divider & Footer Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
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
