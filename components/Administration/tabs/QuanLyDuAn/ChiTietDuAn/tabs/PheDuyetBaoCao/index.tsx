"use client";

import React, { useState } from 'react';
import { IconChevronUp, IconChevronDown, IconX } from '@tabler/icons-react';
import { DuAnItem } from '../../../index';

interface PheDuyetBaoCaoTabProps {
  project: DuAnItem;
}

export default function PheDuyetBaoCaoTab({ project }: PheDuyetBaoCaoTabProps) {
  const [isSectionOpen, setIsSectionOpen] = useState(true);
  const [selectedDeptIndex, setSelectedDeptIndex] = useState(0);

  // Department filter list matching image reference exactly
  const deptPills = [
    { name: 'Ban Giám đốc', hours: '18h' },
    { name: 'Khối Văn phòng', hours: '48h' },
    { name: 'Khai triển', hours: '150.5h' },
    { name: 'Cắt', hours: '216h' },
    { name: 'Ghép', hours: '854.5h' },
    { name: 'Mộc Sơn', hours: '271h' },
    { name: 'Điện', hours: '253h' },
    { name: 'Cảnh Quan', hours: '796.1h' },
    { name: 'Công nghệ và Thiết kế', hours: '57h' }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen p-3 sm:p-5 space-y-5 text-slate-800 font-sans animate-fade-in">
      
      {/* 1. ACCORDION HEADER */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs flex items-center justify-between">
        <h2 className="text-sm font-bold text-[#2b5278] tracking-tight">
          Báo cáo Khối lượng công việc
        </h2>
        <button
          type="button"
          onClick={() => setIsSectionOpen(!isSectionOpen)}
          className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
        >
          {isSectionOpen ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
        </button>
      </div>

      {isSectionOpen && (
        <div className="space-y-6">

          {/* 2. SECTION: TỔNG QUAN TOÀN DỰ ÁN — 2664.1H */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              TỔNG QUAN TOÀN DỰ ÁN — <span className="text-[#2b5278]">2664.1H</span>
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              
              {/* CHART 1: Phân bổ giờ theo Phòng ban (Solid Pie Chart) */}
              <div className="border border-slate-200/80 rounded-xl p-4 bg-white flex flex-col items-center relative min-h-[300px]">
                <h4 className="font-bold text-xs text-slate-700 self-center mb-2">
                  Phân bổ giờ theo Phòng ban
                </h4>

                <div className="relative w-full h-64 flex items-center justify-center">
                  <svg viewBox="0 0 240 240" className="w-64 h-64 overflow-visible">
                    {/* Pie Slices */}
                    {/* S1: Ghép 32% (Purple) */}
                    <path d="M 120 120 L 120 20 A 100 100 0 0 1 205.1 172.5 Z" fill="#7c3aed" />
                    {/* S2: Cắt 8% (Red) */}
                    <path d="M 120 120 L 205.1 172.5 A 100 100 0 0 1 167 208 Z" fill="#dc2626" />
                    {/* S3: Khai triển 6% (Green) */}
                    <path d="M 120 120 L 167 208 A 100 100 0 0 1 133 219 Z" fill="#16a34a" />
                    {/* S4: Khối Văn phòng 2% (Brown) */}
                    <path d="M 120 120 L 133 219 A 100 100 0 0 1 120 220 Z" fill="#b45309" />
                    {/* S5: Ban Giám đốc 1% (Slate) */}
                    <path d="M 120 120 L 120 220 A 100 100 0 0 1 113.7 219.8 Z" fill="#334155" />
                    {/* S6: Công nghệ và Thiết kế 2% (Lime) */}
                    <path d="M 120 120 L 113.7 219.8 A 100 100 0 0 1 101 218 Z" fill="#65a30d" />
                    {/* S7: Mộc Sơn 10% (Teal) */}
                    <path d="M 120 120 L 101 218 A 100 100 0 0 1 40 180 Z" fill="#0891b2" />
                    {/* S8: Điện 9% (Orange) */}
                    <path d="M 120 120 L 40 180 A 100 100 0 0 1 24.9 146.9 Z" fill="#ea580c" />
                    {/* S9: Cảnh Quan 30% (Blue) */}
                    <path d="M 120 120 L 24.9 146.9 A 100 100 0 0 1 120 20 Z" fill="#2563eb" />

                    {/* Labels Around Pie */}
                    <text x="180" y="30" fill="#7c3aed" fontSize="10" fontWeight="bold">Ghép: 32%</text>
                    <text x="210" y="110" fill="#dc2626" fontSize="10" fontWeight="bold">Cắt: 8%</text>
                    <text x="205" y="160" fill="#16a34a" fontSize="10" fontWeight="bold">Khai triển: 6%</text>
                    <text x="200" y="190" fill="#b45309" fontSize="9" fontWeight="bold">Khối Văn phòng: 2%</text>
                    <text x="195" y="205" fill="#334155" fontSize="8" fontWeight="bold">Ban Giám đốc: 1%</text>
                    <text x="190" y="220" fill="#65a30d" fontSize="9" fontWeight="bold">Công nghệ và Thiết kế: 2%</text>
                    <text x="20" y="200" fill="#0891b2" fontSize="10" fontWeight="bold">Mộc Sơn: 10%</text>
                    <text x="15" y="150" fill="#ea580c" fontSize="10" fontWeight="bold">Điện: 9%</text>
                    <text x="175" y="240" fill="#2563eb" fontSize="10" fontWeight="bold">Cảnh Quan: 30%</text>
                  </svg>

                  {/* Tooltip Box Overlay */}
                  <div className="absolute bottom-6 right-16 bg-white border border-slate-200 shadow-md rounded-md px-3 py-1.5 text-xs font-bold text-slate-800 pointer-events-none z-10">
                    Giờ KH : 253h
                  </div>
                </div>
              </div>

              {/* CHART 2: So sánh khối lượng giữa Phòng ban (Bar Chart) */}
              <div className="border border-slate-200/80 rounded-xl p-4 bg-white flex flex-col justify-between min-h-[300px]">
                <h4 className="font-bold text-xs text-slate-700 self-center mb-2">
                  So sánh khối lượng giữa Phòng ban
                </h4>

                <div className="relative flex-1 flex items-end pt-6 pb-8">
                  {/* Y-Axis Ticks & Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 text-[9px] font-medium text-slate-400">
                    {['1000h', '750h', '500h', '250h', '0h'].map((tick, i) => (
                      <div key={i} className="flex items-center gap-2 w-full">
                        <span className="w-8 text-right shrink-0">{tick}</span>
                        <div className="flex-1 border-b border-dashed border-slate-200" />
                      </div>
                    ))}
                  </div>

                  {/* Bars Container */}
                  <div className="w-full h-full flex items-end justify-around pl-10 pr-2 z-10">
                    {[
                      { name: 'Ban Giám đốc', h: 18, color: '#334155', heightPct: 4 },
                      { name: 'Khối Văn phòng', h: 48, color: '#b45309', heightPct: 7 },
                      { name: 'Khai triển', h: 150.5, color: '#16a34a', heightPct: 18 },
                      { name: 'Cắt', h: 216, color: '#dc2626', heightPct: 24 },
                      { name: 'Ghép', h: 854.5, color: '#7c3aed', heightPct: 86 },
                      { name: 'Mộc Sơn', h: 271, color: '#0891b2', heightPct: 28 },
                      { name: 'Điện', h: 253, color: '#ea580c', heightPct: 26 },
                      { name: 'Cảnh Quan', h: 796.1, color: '#2563eb', heightPct: 80 },
                      { name: 'Công nghệ và Thiết kế', h: 57, color: '#65a30d', heightPct: 8 }
                    ].map((bar, idx) => (
                      <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group">
                        <div
                          className="w-full max-w-[22px] rounded-t-xs transition-all cursor-pointer hover:brightness-110"
                          style={{ height: `${bar.heightPct}%`, backgroundColor: bar.color }}
                          title={`${bar.name}: ${bar.h}h`}
                        />
                        <div className="absolute bottom-0 text-[8px] font-bold text-slate-500 whitespace-nowrap -rotate-[35deg] origin-top-left translate-y-3">
                          {bar.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 3. SECTION: CHI TIẾT THEO PHÒNG BAN */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              CHI TIẾT THEO PHÒNG BAN
            </h3>

            {/* Department Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {deptPills.map((dept, idx) => {
                const isActive = idx === selectedDeptIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDeptIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#2b5278] text-white shadow-xs'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {dept.name} · {dept.hours}
                  </button>
                );
              })}
            </div>

            {/* Charts for Selected Department */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
              
              {/* CHART 3: Phân bổ giờ — Ban Giám đốc */}
              <div className="border border-slate-200/80 rounded-xl p-4 bg-white flex flex-col items-center relative min-h-[280px]">
                <h4 className="font-bold text-xs text-slate-700 self-center">
                  Phân bổ giờ — Ban Giám đốc
                </h4>
                <span className="text-[11px] text-slate-400 font-medium mb-2">Tổng: 18h</span>

                <div className="relative w-full h-56 flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-56 h-56 overflow-visible">
                    {/* Slices for Ban Giám đốc */}
                    {/* S1: Phùng Bích Thảo 39% (Slate) */}
                    <path d="M 100 100 L 100 20 A 80 80 0 0 1 176 124 Z" fill="#456585" />
                    {/* S2: Nguyễn Thanh Tuấn, Phùng Bích T... (Red) */}
                    <path d="M 100 100 L 176 124 A 80 80 0 0 1 147 164 Z" fill="#c93b2b" />
                    {/* S3: Nguyễn Đức Việt 11% (Green) */}
                    <path d="M 100 100 L 147 164 A 80 80 0 0 1 100 180 Z" fill="#2b8538" />
                    {/* S4: Nguyễn Thanh Tuấn 39% (Gold) */}
                    <path d="M 100 100 L 100 180 A 80 80 0 0 1 100 20 Z" fill="#c29035" />

                    {/* Labels */}
                    <text x="135" y="18" fill="#456585" fontSize="8" fontWeight="bold">Phùng Bích Thảo: 39%</text>
                    <text x="145" y="160" fill="#c93b2b" fontSize="7" fontWeight="bold">Nguyễn Thanh Tuấn, Phùng Bích T...</text>
                    <text x="105" y="192" fill="#2b8538" fontSize="8" fontWeight="bold">Nguyễn Đức Việt: 11%</text>
                    <text x="15" y="160" fill="#c29035" fontSize="8" fontWeight="bold">Nguyễn Thanh Tuấn: 39%</text>
                  </svg>
                </div>
              </div>

              {/* CHART 4: So sánh khối lượng nhân sự — Ban Giám đốc */}
              <div className="border border-slate-200/80 rounded-xl p-4 bg-white flex flex-col justify-between min-h-[280px]">
                <h4 className="font-bold text-xs text-slate-700 self-center mb-4">
                  So sánh khối lượng nhân sự — Ban Giám đốc
                </h4>

                <div className="relative flex-1 flex items-end pt-4 pb-12">
                  {/* Y-Axis Ticks */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-12 text-[9px] font-medium text-slate-400">
                    {['8h', '6h', '4h', '2h', '0h'].map((tick, i) => (
                      <div key={i} className="flex items-center gap-2 w-full">
                        <span className="w-5 text-right shrink-0">{tick}</span>
                        <div className="flex-1 border-b border-dashed border-slate-200" />
                      </div>
                    ))}
                  </div>

                  {/* Bars Container */}
                  <div className="w-full h-full flex items-end justify-around pl-8 pr-2 z-10">
                    {[
                      { name: 'Phùng Bích Thảo', color: '#456585', heightPct: 88 },
                      { name: 'Nguyễn Thanh Tuấn', color: '#c29035', heightPct: 88 },
                      { name: 'Nguyễn Đức Việt', color: '#2b8538', heightPct: 25 },
                      { name: 'Phùng Bích Thảo, Nguyễn Đức Việt', color: '#c93b2b', heightPct: 25 }
                    ].map((bar, idx) => (
                      <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group">
                        <div
                          className="w-full max-w-[32px] rounded-t-xs transition-all cursor-pointer hover:brightness-110"
                          style={{ height: `${bar.heightPct}%`, backgroundColor: bar.color }}
                          title={bar.name}
                        />
                        <div className="absolute bottom-0 text-[8px] font-bold text-slate-500 whitespace-nowrap -rotate-[25deg] origin-top-left translate-y-4">
                          {bar.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
