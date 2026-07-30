"use client";

import React, { useState } from 'react';
import {
  IconBulb,
  IconDeviceFloppy,
  IconClipboardText
} from '@tabler/icons-react';
import { DuAnItem } from '../../index';

interface LuuTemplateMoiProps {
  project?: DuAnItem;
  onSaveSuccess?: (templateName: string) => void;
  onClose: () => void;
}

export default function LuuTemplateMoi({ project, onSaveSuccess, onClose }: LuuTemplateMoiProps) {
  const [tenTemplate, setTenTemplate] = useState('');
  const [moTa, setMoTa] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSaveSuccess) {
      onSaveSuccess(tenTemplate || 'Template Hồ sơ Quản lý Dự án');
    }
    onClose();
  };

  // List of 9 departments matching reference image exactly
  const deptList = [
    { name: 'Phòng Công nghệ và Thiết kế', count: 10 },
    { name: 'Khối Văn phòng', count: 0 },
    { name: 'Phòng Ghép', count: 0 },
    { name: 'Phòng Mộc Sơn', count: 0 },
    { name: 'Phòng Cắt', count: 0 },
    { name: 'Ban Giám đốc', count: 16 },
    { name: 'Phòng Cảnh Quan', count: 0 },
    { name: 'Phòng Điện', count: 0 },
    { name: 'Phòng Khai triển', count: 0 }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      
      {/* BANNER NOTE BOX */}
      <div className="bg-[#406c89]/10 border border-[#406c89]/20 rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-[#406c89] font-semibold leading-relaxed">
        <IconBulb size={18} className="text-[#eab308] shrink-0" />
        <span>Lưu toàn bộ hồ sơ tất cả phòng ban của dự án này thành 1 template để dùng lại.</span>
      </div>

      {/* INPUT 1: TÊN TEMPLATE */}
      <div className="space-y-1.5">
        <label className="font-bold text-slate-800 block">
          Tên template <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          required
          value={tenTemplate}
          onChange={(e) => setTenTemplate(e.target.value)}
          placeholder="VD: Hồ sơ Nhà phố 2 tầng - Phòng Cắt"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#406c89] focus:ring-2 focus:ring-[#406c89]/20 outline-none text-slate-800 text-xs placeholder:text-slate-400 font-medium transition-all bg-white"
        />
      </div>

      {/* INPUT 2: MÔ TẢ */}
      <div className="space-y-1.5">
        <label className="font-bold text-slate-800 block">
          Mô tả (tùy chọn)
        </label>
        <textarea
          rows={3}
          value={moTa}
          onChange={(e) => setMoTa(e.target.value)}
          placeholder="Mô tả ngắn về loại dự án phù hợp với template này..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#406c89] focus:ring-2 focus:ring-[#406c89]/20 outline-none text-slate-800 text-xs placeholder:text-slate-400 font-medium transition-all resize-none bg-white"
        />
      </div>

      {/* DEPARTMENT WORKFLOW SUMMARY LIST */}
      <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-4 space-y-2 text-xs font-medium text-slate-600">
        {deptList.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <IconClipboardText size={16} className="text-slate-500 shrink-0" />
            <span>
              {item.name}: <strong className="font-bold text-slate-900">{item.count}</strong> công việc
            </span>
          </div>
        ))}
      </div>

      {/* SUBMIT BUTTON AT BOTTOM */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-2"
        >
          <IconDeviceFloppy size={18} />
          <span>Lưu Template</span>
        </button>
      </div>

    </form>
  );
}
