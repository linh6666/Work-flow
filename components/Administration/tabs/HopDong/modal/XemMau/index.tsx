"use client";

import React, { useState } from 'react';
import { IconX, IconCopy, IconPencil, IconTrash, IconCheck } from '@tabler/icons-react';
import { ContractTemplateItem } from '../QuanLyTemplate';

interface XemMauModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: ContractTemplateItem | null;
  onDelete?: (id: string) => void;
  onEdit?: (template: ContractTemplateItem) => void;
}

export default function XemMauModal({ isOpen, onClose, template, onDelete, onEdit }: XemMauModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !template) return null;

  const contentText = '[Trống]';

  const handleCopy = () => {
    navigator.clipboard.writeText(contentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-2xl border border-slate-100 w-full max-w-xl overflow-hidden animate-scale-up p-6 space-y-5">
        
        {/* Header Title & Close Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 tracking-tight uppercase">
            {template.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* SECTION 1: THÔNG TIN MẪU */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
            THÔNG TIN MẪU
          </h3>

          <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs">
            {/* Column 1: Ngôn ngữ */}
            <div className="space-y-0.5">
              <span className="text-slate-400 font-normal">Ngôn ngữ</span>
              <div className="font-semibold text-slate-800 text-sm">
                {template.lang === 'vi' ? 'Tiếng Việt' : template.lang === 'en' ? 'Tiếng Anh' : template.lang}
              </div>
            </div>

            {/* Column 2: Tạo bởi */}
            <div className="space-y-0.5">
              <span className="text-slate-400 font-normal">Tạo bởi</span>
              <div className="font-semibold text-slate-800 text-sm">
                {template.author}
              </div>
            </div>

            {/* Column 3: Lần sử dụng */}
            <div className="space-y-0.5">
              <span className="text-slate-400 font-normal">Lần sử dụng</span>
              <div className="font-semibold text-slate-800 text-sm">
                {template.usedCount}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: NỘI DUNG */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
            NỘI DUNG
          </h3>

          <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-4 text-xs text-slate-500 font-normal select-text">
            {contentText}
          </div>
        </div>

        {/* Divider & Footer Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5 flex-wrap">
          {/* Nút Đóng */}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200/90 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            Đóng
          </button>

          {/* Nút Sao chép */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            {copied ? <IconCheck size={15} className="text-emerald-600" /> : <IconCopy size={15} />}
            <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
          </button>

          {/* Nút Chỉnh sửa */}
          <button
            type="button"
            onClick={() => {
              if (onEdit) onEdit(template);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <IconPencil size={15} />
            <span>Chỉnh sửa</span>
          </button>

          {/* Nút Xóa */}
          <button
            type="button"
            onClick={() => {
              if (onDelete) onDelete(template.id);
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200/90 hover:bg-red-50 text-red-500 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <IconTrash size={15} className="text-red-500" />
            <span>Xóa</span>
          </button>
        </div>

      </div>
    </div>
  );
}
