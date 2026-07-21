"use client";

import React from 'react';

interface TienDoTabProps {
  ngayBietTienDo?: string;
  setNgayBietTienDo?: (v: string) => void;
  ngayGiaoHang?: string;
  setNgayGiaoHang?: (v: string) => void;
}

export default function TienDoTab({
  ngayBietTienDo = '2026-07-25',
  setNgayBietTienDo,
  ngayGiaoHang = '2026-08-15',
  setNgayGiaoHang,
}: TienDoTabProps) {
  return (
    <div className="space-y-4 animate-fade-in text-xs text-slate-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">Ngày biết tiến độ</label>
          <input
            type="date"
            value={ngayBietTienDo}
            onChange={(e) => setNgayBietTienDo && setNgayBietTienDo(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">Hạn bàn giao mô hình</label>
          <input
            type="date"
            value={ngayGiaoHang}
            onChange={(e) => setNgayGiaoHang && setNgayGiaoHang(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block font-bold text-slate-800">Ghi chú mốc tiến độ quan trọng</label>
        <textarea
          rows={3}
          placeholder="Mốc kiểm tra 3D, mốc sơn màu sa bàn, mốc chạy thử hệ thống đèn..."
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
        />
      </div>
    </div>
  );
}
