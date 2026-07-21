"use client";

import React from 'react';
import {
  IconChevronDown,
  IconClock,
  IconShieldCheck
} from '@tabler/icons-react';
import { SavedTemplateItem } from '../../../index';

interface CaiDatMauTabProps {
  formData: SavedTemplateItem;
  setFormData: React.Dispatch<React.SetStateAction<SavedTemplateItem | null>>;
}

export default function CaiDatMauTab({
  formData,
  setFormData,
}: CaiDatMauTabProps) {
  return (
    <div className="space-y-4 text-xs text-slate-700 animate-fade-in">
      
      {/* 1. TOP CARD CONTAINER (LIGHT BLUE BACKGROUND) */}
      <div className="p-4 bg-[#f4f7ff]/70 border border-[#dbe0fe] rounded-2xl space-y-4 select-none">
        
        {/* Ngôn ngữ * */}
        <div>
          <label className="block text-xs font-bold text-[#406c89] mb-1.5">Ngôn ngữ *</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, langCode: 'VN' })}
              className={`py-2.5 px-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-center font-semibold ${
                formData.langCode === 'VN'
                  ? 'bg-[#406c89] border-[#406c89] text-white shadow-xs font-bold'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <span className={`text-[10px] uppercase mr-1.5 font-bold ${formData.langCode === 'VN' ? 'text-white/80' : 'text-slate-400'}`}>
                VN
              </span>
              <span>Tiếng Việt</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, langCode: 'GB' })}
              className={`py-2.5 px-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-center font-semibold ${
                formData.langCode === 'GB'
                  ? 'bg-[#406c89] border-[#406c89] text-white shadow-xs font-bold'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <span className={`text-[10px] uppercase mr-1.5 font-bold ${formData.langCode === 'GB' ? 'text-white/80' : 'text-slate-400'}`}>
                GB
              </span>
              <span>Tiếng Anh</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, langCode: 'VNGB' })}
              className={`py-2.5 px-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-center font-semibold ${
                formData.langCode === 'VNGB'
                  ? 'bg-[#406c89] border-[#406c89] text-white shadow-xs font-bold'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <span className={`text-[10px] uppercase mr-1.5 font-bold ${formData.langCode === 'VNGB' ? 'text-white/80' : 'text-slate-400'}`}>
                VNGB
              </span>
              <span>Việt - Anh</span>
            </button>
          </div>
        </div>

        {/* Loại báo giá * */}
        <div>
          <label className="block text-xs font-bold text-[#406c89] mb-1.5">Loại báo giá *</label>
          <div className="relative">
            <select
              value={formData.loaiBaoGia || 'Masterplan Model Quotation'}
              onChange={(e) => setFormData({ ...formData, loaiBaoGia: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-[#406c89] appearance-none cursor-pointer pr-10 shadow-2xs"
            >
              <option value="Masterplan Model Quotation">Masterplan Model Quotation</option>
              <option value="Building Model Quotation">Building Model Quotation</option>
              <option value="Lighting Control System Quotation">Lighting Control System Quotation</option>
              <option value="Galaxy Tab Control Quotation">Galaxy Tab Control Quotation</option>
              <option value="Advanced Lighting System Quotation">Advanced Lighting System Quotation</option>
              <option value="Báo giá Mô hình Quy hoạch">Báo giá Mô hình Quy hoạch</option>
              <option value="Báo giá Mô hình Công trình">Báo giá Mô hình Công trình</option>
              <option value="Báo giá Mô hình Biệt thự - Nội thất">Báo giá Mô hình Biệt thự - Nội thất</option>
            </select>
            <IconChevronDown size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* 2. TÊN DỰ ÁN & TỶ LỆ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">Tên dự án (tùy chọn)</label>
          <input
            type="text"
            value={formData.duAnMau || 'CÔNG TY TNHH BẤT ĐỘNG SẢN HỒ AN'}
            onChange={(e) => setFormData({ ...formData, duAnMau: e.target.value })}
            placeholder="Nhập tên công ty / dự án..."
            className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">Tỷ lệ (tùy chọn)</label>
          <input
            type="text"
            value={formData.tyLe || '1/20'}
            onChange={(e) => setFormData({ ...formData, tyLe: e.target.value })}
            placeholder="Ví dụ: 1/20"
            className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* 3. KÍCH THƯỚC */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700">Kích thước (tùy chọn)</label>
        <input
          type="text"
          value={formData.kichThuoc || '200×300mm'}
          onChange={(e) => setFormData({ ...formData, kichThuoc: e.target.value })}
          placeholder="Ví dụ: 200×300mm"
          className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
        />
      </div>

      {/* 4. TÊN TEMPLATE & BADGE TITLE */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">
            Tên Template Báo Giá <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Nhập tên template báo giá..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">
            Tên hiển thị (Badge) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.badgeTitle}
            onChange={(e) => setFormData({ ...formData, badgeTitle: e.target.value })}
            placeholder="Tên ngắn gọn hiển thị trên thẻ..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>
      </div>

      {/* 5. THỜI GIAN SẢN XUẤT & BẢO HÀNH */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800 flex items-center gap-1.5">
            <IconClock size={15} className="text-slate-400" />
            <span>Thời gian sản xuất</span>
          </label>
          <input
            type="text"
            value={formData.productionTime}
            onChange={(e) => setFormData({ ...formData, productionTime: e.target.value })}
            placeholder="Ví dụ: 60 ngày sản xuất"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800 flex items-center gap-1.5">
            <IconShieldCheck size={15} className="text-slate-400" />
            <span>Thời gian bảo hành</span>
          </label>
          <input
            type="text"
            value={formData.warrantyPeriod}
            onChange={(e) => setFormData({ ...formData, warrantyPeriod: e.target.value })}
            placeholder="Ví dụ: 18 tháng bảo hành"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>
      </div>

      {/* 6. TÁC GIẢ & NGÀY LƯU */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">Người tạo / Lưu</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="Tên tác giả..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">Ngày lưu</label>
          <input
            type="text"
            value={formData.savedDate}
            onChange={(e) => setFormData({ ...formData, savedDate: e.target.value })}
            placeholder="Định dạng: DD/MM/YYYY"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>
      </div>

    </div>
  );
}
