"use client";

import React from 'react';

interface ThongTinChungProps {
  khachHang: string;
  setKhachHang: (val: string) => void;
  tyLe: string;
  setTyLe: (val: string) => void;
  kichThuoc: string;
  setKichThuoc: (val: string) => void;
  capDoDuAn: string;
  setCapDoDuAn: (val: string) => void;
}

export default function ThongTinChung({
  khachHang,
  setKhachHang,
  tyLe,
  setTyLe,
  kichThuoc,
  setKichThuoc,
  capDoDuAn,
  setCapDoDuAn
}: ThongTinChungProps) {
  return (
    <div className="space-y-4 animate-fade-in text-xs text-left">
      {/* Khách hàng */}
      <div className="space-y-1">
        <label className="font-semibold text-slate-700">Khách hàng</label>
        <input 
          type="text" 
          placeholder="Tên khách hàng..."
          value={khachHang}
          onChange={(e) => setKhachHang(e.target.value)}
          className="w-full bg-[#f8fafc]/50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 placeholder-slate-400 focus:bg-white focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] focus:outline-none transition-all"
        />
      </div>

      {/* Tỷ lệ & Kích thước */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Tỷ lệ</label>
          <input 
            type="text" 
            placeholder="VD: 1:100"
            value={tyLe}
            onChange={(e) => setTyLe(e.target.value)}
            className="w-full bg-[#f8fafc]/50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 placeholder-slate-400 focus:bg-white focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] focus:outline-none transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Kích thước</label>
          <input 
            type="text" 
            placeholder="VD: 2m x 3m"
            value={kichThuoc}
            onChange={(e) => setKichThuoc(e.target.value)}
            className="w-full bg-[#f8fafc]/50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 placeholder-slate-400 focus:bg-white focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Cấp độ dự án */}
      <div className="space-y-1">
        <label className="font-semibold text-slate-700">Cấp độ dự án</label>
        <select
          value={capDoDuAn}
          onChange={(e) => setCapDoDuAn(e.target.value)}
          className="w-full bg-[#f8fafc]/50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 focus:bg-white focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] focus:outline-none transition-all"
        >
          <option value="V">V</option>
          <option value="I">I</option>
          <option value="II">II</option>
          <option value="III">III</option>
          <option value="IV">IV</option>
        </select>
      </div>
    </div>
  );
}
