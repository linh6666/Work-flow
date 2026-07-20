"use client";

import React, { useState } from 'react';
import {
  IconSignature,
  IconPlus,
  IconSearch,
  IconArrowRight,
  IconAdjustmentsHorizontal
} from '@tabler/icons-react';
import TemplateModal from './modal/QuanLyTemplate';

export default function HopDong() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  return (
    <div className="p-5 md:p-6 space-y-5 animate-fade-in text-slate-700 w-full">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <IconSignature size={30} className="text-slate-800 stroke-[2]" />
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Hợp đồng</h2>
          </div>
          <div className="mt-3">
            <h3 className="font-bold text-slate-800 text-base">Danh sách Hợp đồng</h3>
            <p className="text-sm text-slate-400 mt-0.5">Quản lý hợp đồng sản xuất mô hình</p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsTemplateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#BB8D38] hover:bg-[#a77c2f] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <IconAdjustmentsHorizontal size={16} />
            <span>Quản lý Template HĐ</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <IconPlus size={16} />
            <span>Tạo hợp đồng</span>
          </button>
        </div>
      </div>

      {/* 2. Process Workflow Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 flex items-center gap-2 overflow-x-auto shadow-xs">
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs">
            NV Kinh doanh <span className="font-normal text-slate-400">soạn hợp đồng</span>
          </span>
          <IconArrowRight size={14} className="text-slate-400" />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs">
            Quản lý Kinh doanh <span className="font-normal text-slate-400">duyệt</span>
          </span>
          <IconArrowRight size={14} className="text-slate-400" />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs">
            Phó GĐ KD-HC <span className="font-normal text-slate-400">phê duyệt cuối</span>
          </span>
          <IconArrowRight size={14} className="text-slate-400" />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs">
            Triển khai HĐ <span className="font-normal text-slate-400">(0 đang TK)</span>
          </span>
        </div>
      </div>

      {/* 3. Metrics / Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Tổng HĐ */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between h-24 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Tổng HĐ</span>
          <span className="text-2xl font-bold text-[#2C4159]">0</span>
        </div>

        {/* Card 2: Đang thực hiện */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between h-24 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Đang thực hiện</span>
          <span className="text-2xl font-bold text-amber-600">0</span>
        </div>

        {/* Card 3: Hoàn thành */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between h-24 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Hoàn thành</span>
          <span className="text-2xl font-bold text-emerald-600">0</span>
        </div>

        {/* Card 4: Tổng giá trị */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between h-24 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Tổng giá trị</span>
          <span className="text-2xl font-bold text-indigo-900">—</span>
        </div>
      </div>

      {/* 4. Search Filter Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl px-3.5 py-2.5 flex items-center gap-2 shadow-xs">
        <IconSearch size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm theo số HĐ, khách hàng, tên dự án..."
          className="w-full bg-transparent text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      {/* 5. Main Content / Empty State Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl py-20 px-4 flex flex-col items-center justify-center min-h-[300px] text-center shadow-xs">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-slate-300 mb-2">
          <IconSignature size={48} className="stroke-[1.25]" />
        </div>
        <p className="text-xs text-slate-400 font-medium">Chưa có hợp đồng nào.</p>
      </div>

      {/* Modal Quản lý Template */}
      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
      />
    </div>
  );
}

