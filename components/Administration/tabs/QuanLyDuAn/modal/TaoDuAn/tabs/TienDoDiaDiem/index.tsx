"use client";

import React from 'react';

interface TienDoDiaDiemProps {
  diaDiemLapDat: string;
  setDiaDiemLapDat: (val: string) => void;
  duKienNtLan1: string;
  setDuKienNtLan1: (val: string) => void;
  duKienNtCuoi: string;
  setDuKienNtCuoi: (val: string) => void;
  duKienVanChuyen: string;
  setDuKienVanChuyen: (val: string) => void;
  duKienLapDat: string;
  setDuKienLapDat: (val: string) => void;
  soNvLapDat: string;
  setSoNvLapDat: (val: string) => void;
  khoiLuongNtLan1: string;
  setKhoiLuongNtLan1: (val: string) => void;
}

export default function TienDoDiaDiem({
  diaDiemLapDat,
  setDiaDiemLapDat,
  duKienNtLan1,
  setDuKienNtLan1,
  duKienNtCuoi,
  setDuKienNtCuoi,
  duKienVanChuyen,
  setDuKienVanChuyen,
  duKienLapDat,
  setDuKienLapDat,
  soNvLapDat,
  setSoNvLapDat,
  khoiLuongNtLan1,
  setKhoiLuongNtLan1
}: TienDoDiaDiemProps) {
  return (
    <div className="space-y-4 animate-fade-in text-xs text-left">
      {/* Địa điểm lắp đặt */}
      <div className="space-y-1">
        <label className="font-semibold text-slate-700">Địa điểm lắp đặt</label>
        <input 
          type="text"
          placeholder="Nhập địa điểm..."
          value={diaDiemLapDat}
          onChange={(e) => setDiaDiemLapDat(e.target.value)}
          className="w-full bg-[#f8fafc]/50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 placeholder-slate-400 focus:bg-white focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] focus:outline-none transition-all"
        />
      </div>

      {/* Dự kiến NT lần 1 & Dự kiến NT cuối */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Dự kiến NT lần 1</label>
          <input 
            type="date"
            value={duKienNtLan1}
            onChange={(e) => setDuKienNtLan1(e.target.value)}
            className="w-full bg-[#f8fafc]/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:bg-white focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] focus:outline-none transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Dự kiến NT cuối</label>
          <input 
            type="date"
            value={duKienNtCuoi}
            onChange={(e) => setDuKienNtCuoi(e.target.value)}
            className="w-full bg-[#f8fafc]/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:bg-white focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Dự kiến vận chuyển & Dự kiến lắp đặt */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Dự kiến vận chuyển</label>
          <input 
            type="date"
            value={duKienVanChuyen}
            onChange={(e) => setDuKienVanChuyen(e.target.value)}
            className="w-full bg-[#f8fafc]/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:bg-white focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] focus:outline-none transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Dự kiến lắp đặt</label>
          <input 
            type="date"
            value={duKienLapDat}
            onChange={(e) => setDuKienLapDat(e.target.value)}
            className="w-full bg-[#f8fafc]/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:bg-white focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Số NV lắp đặt & Khối lượng nghi/thu lần 1 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Số NV lắp đặt</label>
          <input 
            type="text"
            placeholder="VD: 5 người"
            value={soNvLapDat}
            onChange={(e) => setSoNvLapDat(e.target.value)}
            className="w-full bg-[#f8fafc]/50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 placeholder-slate-400 focus:bg-white focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] focus:outline-none transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Khối lượng nghi/thu lần 1</label>
          <input 
            type="text"
            placeholder="VD: 50%"
            value={khoiLuongNtLan1}
            onChange={(e) => setKhoiLuongNtLan1(e.target.value)}
            className="w-full bg-[#f8fafc]/50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 placeholder-slate-400 focus:bg-white focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] focus:outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
}
