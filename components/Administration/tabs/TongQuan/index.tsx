"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  IconUsers, 
  IconFileText, 
  IconSignature, 
  IconTrendingUp, 
  IconChartBar, 
  IconFolder, 
  IconArrowRight, 
  IconPlus,
  IconBriefcase,
  IconReportMoney,
  IconCompass
} from '@tabler/icons-react';

export default function TongQuan() {
  const router = useRouter();

  // Navigation handlers for quick actions & cards
  const navigateTo = (path: string) => {
    router.push(`/Administration/${path}`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fafbfc] overflow-hidden select-none">
      {/* STICKY HEADER SECTION */}
      <div className="sticky top-0 z-10 bg-[#fafbfc] px-8 pt-6 pb-4 border-b border-slate-100 shrink-0">
  <h1 className="text-3xl font-bold text-slate-800">Tổng quan</h1>
  <p className="text-base text-slate-500 mt-2 font-medium">
    Chào mừng đến Mô Hình Việt — Hệ thống quản lý kinh doanh
  </p>
</div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto px-8 py-6">

      <div className="space-y-8 max-w-6xl">
        {/* CATEGORY 1: KINH DOANH */}
        <div>
         <div className="flex items-center gap-3 mb-4">
  <IconBriefcase size={24} className="text-[#BB8D38]" />
  <h2 className="text-lg font-black tracking-wider uppercase text-[#BB8D38]">
    KINH DOANH
  </h2>
</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card: Khách hàng */}
            <div 
              onClick={() => navigateTo('khach-hang')}
              className="bg-white border border-slate-100 hover:border-slate-200 shadow-sm rounded-xl p-5 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-50/80 flex items-center justify-center text-indigo-500">
                  <IconUsers size={18} />
                </div>
                <IconArrowRight size={14} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-1">Khách hàng</span>
                <span className="text-2xl font-black text-indigo-600">4</span>
              </div>
            </div>

            {/* Card: Báo giá */}
            <div 
              onClick={() => navigateTo('bao-gia')}
              className="bg-white border border-slate-100 hover:border-slate-200 shadow-sm rounded-xl p-5 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-50/80 flex items-center justify-center text-amber-500">
                  <IconFileText size={18} />
                </div>
                <IconArrowRight size={14} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-1">Báo giá</span>
                <span className="text-2xl font-black text-amber-500">1</span>
              </div>
            </div>

            {/* Card: Hợp đồng */}
            <div 
              onClick={() => navigateTo('hop-dong')}
              className="bg-white border border-slate-100 hover:border-slate-200 shadow-sm rounded-xl p-5 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-50/80 flex items-center justify-center text-emerald-500">
                  <IconSignature size={18} />
                </div>
                <IconArrowRight size={14} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-1">Hợp đồng</span>
                <span className="text-2xl font-black text-emerald-600">2</span>
              </div>
            </div>

            {/* Card: Tổng giá trị HĐ */}
            <div 
              className="bg-white border border-slate-100 shadow-sm rounded-xl p-5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-50/80 flex items-center justify-center text-blue-500">
                  <IconTrendingUp size={18} />
                </div>
                <IconArrowRight size={14} className="text-slate-300/40" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-1">Tổng giá trị HĐ</span>
                <span className="text-2xl font-black text-[#453AD4]">2.32 Tỷ</span>
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY 2: HÀNH CHÍNH */}
        <div>
         <div className="flex items-center gap-3 mb-4">
  <IconReportMoney size={24} className="text-indigo-600" />
  <h2 className="text-lg font-black tracking-wider uppercase text-indigo-600">
    HÀNH CHÍNH
  </h2>
</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card: Quản lý Tài chính */}
            <div 
              className="bg-white border border-slate-100 shadow-sm rounded-xl p-5 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-50/80 flex items-center justify-center text-emerald-500">
                  <IconChartBar size={18} />
                </div>
                <IconArrowRight size={14} className="text-slate-300/40" />
              </div>
              <div className="mb-2">
                <span className="text-xs font-semibold text-slate-400 block mb-1">Quản lý Tài chính</span>
                {/* <span className="text-2xl font-black text-emerald-500">-</span> */}
                <span className="text-2xl font-black text-emerald-500">──</span>
              </div>
{/* <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-emerald-500 rounded-t-full" /> */}
            </div>
          </div>
        </div>

        {/* CATEGORY 3: QUẢN LÝ DỰ ÁN */}
        <div>
        <div className="flex items-center gap-3 mb-4">
  <IconCompass size={24} className="text-fuchsia-600" />
  <h2 className="text-lg font-black tracking-wider uppercase text-fuchsia-600">
    QUẢN LÝ DỰ ÁN
  </h2>
</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card: Dự án */}
            <div 
              onClick={() => navigateTo('quan-ly-du-an')}
              className="bg-white border border-slate-100 hover:border-slate-200 shadow-sm rounded-xl p-5 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-fuchsia-50/80 flex items-center justify-center text-fuchsia-500">
                  <IconFolder size={18} />
                </div>
                <IconArrowRight size={14} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-1">Dự án</span>
                <span className="text-2xl font-black text-fuchsia-600">3</span>
              </div>
            </div>

            {/* Card: Nhân sự Dự án */}
            <div 
              onClick={() => navigateTo('nhan-su-du-an')}
              className="bg-white border border-slate-100 hover:border-slate-200 shadow-sm rounded-xl p-5 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-50/80 flex items-center justify-center text-indigo-500">
                  <IconUsers size={18} />
                </div>
                <IconArrowRight size={14} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="mb-2">
                <span className="text-xs font-semibold text-slate-400 block mb-1">Nhân sự Dự án</span>
  <span className="text-2xl font-black text-indigo-500">──</span>
              </div>
              {/* <div className="absolute bottom-0 left-5 right-5 h-1 bg-indigo-500 rounded-t-full" /> */}
            </div>
          </div>
        </div>
         <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
          <button 
            onClick={() => navigateTo('khach-hang')}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 hover:text-slate-900 hover:border-slate-300 shadow-sm transition-all cursor-pointer"
          >
            <IconPlus size={13} className="text-slate-400" />
            Thêm khách hàng
          </button>
          
          <button 
            onClick={() => navigateTo('bao-gia')}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 hover:text-slate-900 hover:border-slate-300 shadow-sm transition-all cursor-pointer"
          >
            <IconPlus size={13} className="text-slate-400" />
            Tạo báo giá
          </button>
          
          <button 
            onClick={() => navigateTo('hop-dong')}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 hover:text-slate-900 hover:border-slate-300 shadow-sm transition-all cursor-pointer"
          >
            <IconPlus size={13} className="text-slate-400" />
            Tạo hợp đồng
          </button>
          
          <button 
            onClick={() => navigateTo('quan-ly-du-an')}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 hover:text-slate-900 hover:border-slate-300 shadow-sm transition-all cursor-pointer"
          >
            <IconFolder size={13} className="text-slate-400" />
            Xem dự án
          </button>
        </div>

        {/* SECTION: DỰ ÁN GẦN ĐÂY */}
        <div className="bg-white border border-slate-100 shadow-sm rounded-xl p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <IconFolder size={16} className="text-fuchsia-600" />
              <span className="text-xs font-bold text-slate-700">Dự án gần đây</span>
            </div>
            <button 
              onClick={() => navigateTo('quan-ly-du-an')} 
              className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
            >
              Xem tất cả
            </button>
          </div>
          
          <div className="divide-y divide-slate-100">
            {/* Project 1 */}
            <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <h4 className="text-xs font-bold text-slate-800">VSIP Lạng Sơn</h4>
                <span className="text-[10px] text-slate-400 font-medium">VSIP Lạng Sơn</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 text-slate-500 border border-slate-100 rounded-md">
                Chưa bắt đầu
              </span>
            </div>
            
            {/* Project 2 */}
            <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <h4 className="text-xs font-bold text-slate-800">22 LIỄU GIAI</h4>
                <span className="text-[10px] text-slate-400 font-medium">CĐT 22 LIỄU GIAI</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 text-slate-500 border border-slate-100 rounded-md">
                Chưa bắt đầu
              </span>
            </div>

            {/* Project 3 */}
            <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <h4 className="text-xs font-bold text-slate-800">FLAMINGO ĐÔNG ANH</h4>
                <span className="text-[10px] text-slate-400 font-medium">Công ty CP Flamingo</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 text-slate-500 border border-slate-100 rounded-md">
                Chưa bắt đầu
              </span>
            </div>
          </div>
        </div>

        {/* SECTION: BÁO GIÁ GẦN ĐÂY & HỢP ĐỒNG GẦN ĐÂY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Báo giá gần đây */}
          <div className="bg-white border border-slate-100 shadow-sm rounded-xl p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <span className="text-xs font-bold text-slate-700">Báo giá gần đây</span>
              <button 
                onClick={() => navigateTo('bao-gia')} 
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
              >
                Xem tất cả
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">05-2026/BG-MHV</h4>
                  <span className="text-[10px] text-slate-400 font-medium">Công ty CP Flamingo</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 text-slate-500 border border-slate-100 rounded-md">
                    Bản nháp
                  </span>
                  <span className="text-xs font-bold text-indigo-600">1050.5M</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hợp đồng gần đây */}
          <div className="bg-white border border-slate-100 shadow-sm rounded-xl p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <span className="text-xs font-bold text-slate-700">Hợp đồng gần đây</span>
              <button 
                onClick={() => navigateTo('hop-dong')} 
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
              >
                Xem tất cả
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {/* Contract 1 */}
              <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">04-2026/HĐ-MHV</h4>
                  <span className="text-[10px] text-slate-400 font-medium">Công ty CP Flamingo</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 text-slate-500 border border-slate-100 rounded-md">
                    Bản nháp
                  </span>
                  <span className="text-xs font-bold text-indigo-600">1089.4M</span>
                </div>
              </div>

              {/* Contract 2 */}
              <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="max-w-[70%]">
                  <h4 className="text-xs font-bold text-slate-800 truncate">03-2026/HĐ-MHV</h4>
                  <span className="text-[10px] text-slate-400 font-medium block truncate" title="CÔNG TY CỔ PHẦN ĐẦU TƯ KINH DOANH BĐS NHSLAND">
                    CÔNG TY CỔ PHẦN ĐẦU TƯ KINH DOANH BĐS NHSLAND
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 text-slate-500 border border-slate-100 rounded-md">
                    Bản nháp
                  </span>
                  <span className="text-xs font-bold text-indigo-600">1234.8M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  {/* end space-y-8 max-w-6xl */}
      </div>  {/* end scrollable content */}
    </div>
  );
}
