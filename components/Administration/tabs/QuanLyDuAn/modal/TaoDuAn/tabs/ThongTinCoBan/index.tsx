"use client";

import React from 'react';

interface ThongTinCoBanProps {
  maDuAn: string;
  setMaDuAn: (val: string) => void;
  trangThai: 'Đang thực hiện' | 'Hoàn thành' | 'Tạm dừng' | 'Chưa bắt đầu';
  setTrangThai: (val: 'Đang thực hiện' | 'Hoàn thành' | 'Tạm dừng' | 'Chưa bắt đầu') => void;
  tenDuAn: string;
  setTenDuAn: (val: string) => void;
  ngayBatDau: string;
  setNgayBatDau: (val: string) => void;
  ngayKetThuc: string;
  setNgayKetThuc: (val: string) => void;
  baselineBatDau: string;
  setBaselineBatDau: (val: string) => void;
  baselineKetThuc: string;
  setBaselineKetThuc: (val: string) => void;
  tienDo: number;
  setTienDo: (val: number) => void;
  moTa: string;
  setMoTa: (val: string) => void;
}

export default function ThongTinCoBan({
  maDuAn,
  setMaDuAn,
  trangThai,
  setTrangThai,
  tenDuAn,
  setTenDuAn,
  ngayBatDau,
  setNgayBatDau,
  ngayKetThuc,
  setNgayKetThuc,
  baselineBatDau,
  setBaselineBatDau,
  baselineKetThuc,
  setBaselineKetThuc,
  tienDo,
  setTienDo,
  moTa,
  setMoTa
}: ThongTinCoBanProps) {
  return (
    <div className="space-y-4 animate-fade-in text-xs text-left">
      {/* Row 1: Mã dự án & Trạng thái */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-semibold text-slate-600">Mã dự án</label>
          <input 
            type="text" 
            placeholder="VD: CT07-HD052026"
            value={maDuAn}
            onChange={(e) => setMaDuAn(e.target.value)}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-slate-600">Trạng thái</label>
          <select
            value={trangThai}
            onChange={(e) => setTrangThai(e.target.value as any)}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          >
            <option value="Chưa bắt đầu">Chưa bắt đầu</option>
            <option value="Đang thực hiện">Đang thực hiện</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Tạm dừng">Tạm dừng</option>
          </select>
        </div>
      </div>

      {/* Row 2: Tên dự án */}
      <div className="space-y-1">
        <label className="font-semibold text-slate-600">Tên dự án *</label>
        <input 
          type="text" 
          required
          placeholder="Nhập tên dự án..."
          value={tenDuAn}
          onChange={(e) => setTenDuAn(e.target.value)}
          className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
        />
      </div>

      {/* Row 3: Ngày bắt đầu & Ngày kết thúc */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-semibold text-slate-600">Ngày bắt đầu</label>
          <input 
            type="date"
            value={ngayBatDau}
            onChange={(e) => setNgayBatDau(e.target.value)}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-slate-600">Ngày kết thúc</label>
          <input 
            type="date"
            value={ngayKetThuc}
            onChange={(e) => setNgayKetThuc(e.target.value)}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
      </div>

      {/* Row 4: Baseline bắt đầu & Baseline kết thúc */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-semibold text-slate-600">Baseline bắt đầu</label>
          <input 
            type="date"
            value={baselineBatDau}
            onChange={(e) => setBaselineBatDau(e.target.value)}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-slate-600">Baseline kết thúc</label>
          <input 
            type="date"
            value={baselineKetThuc}
            onChange={(e) => setBaselineKetThuc(e.target.value)}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
      </div>

      {/* Row 5: % Tiến độ slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="font-semibold text-slate-600">% Tiến độ: <span className="text-[#406c89] font-bold">{tienDo}%</span></label>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={tienDo} 
          onChange={(e) => setTienDo(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#406c89]"
        />
      </div>

      {/* Row 6: Mô tả */}
      <div className="space-y-1">
        <label className="font-semibold text-slate-600">Mô tả</label>
        <textarea 
          rows={3}
          placeholder="Mô tả dự án..."
          value={moTa}
          onChange={(e) => setMoTa(e.target.value)}
          className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] resize-none"
        />
      </div>
    </div>
  );
}
