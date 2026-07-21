"use client";

import React from 'react';

interface YeuCauKyThuatTabProps {
  loaiMoHinh: string;
  setLoaiMoHinh: (v: string) => void;
  kichThuocSaBan: string;
  setKichThuocSaBan: (v: string) => void;
  heThongDen: string;
  setHeThongDen: (v: string) => void;
  vatLieuChinh: string;
  setVatLieuChinh: (v: string) => void;
}

export default function YeuCauKyThuatTab({
  loaiMoHinh,
  setLoaiMoHinh,
  kichThuocSaBan,
  setKichThuocSaBan,
  heThongDen,
  setHeThongDen,
  vatLieuChinh,
  setVatLieuChinh,
}: YeuCauKyThuatTabProps) {
  return (
    <div className="space-y-4 animate-fade-in text-xs text-slate-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">Loại mô hình</label>
          <select
            value={loaiMoHinh}
            onChange={(e) => setLoaiMoHinh(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          >
            <option value="Quy hoạch tổng thể">Quy hoạch tổng thể</option>
            <option value="Sa bàn kiến trúc công trình">Sa bàn kiến trúc công trình</option>
            <option value="Mô hình nội thất căn hộ">Mô hình nội thất căn hộ</option>
            <option value="Mô hình hạ tầng cảnh quan">Mô hình hạ tầng cảnh quan</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">Kích thước sa bàn</label>
          <input
            type="text"
            value={kichThuocSaBan}
            onChange={(e) => setKichThuocSaBan(e.target.value)}
            placeholder="Dài x Rộng x Cao (mm)..."
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block font-bold text-slate-800">Hệ thống đèn & Hiệu ứng</label>
        <input
          type="text"
          value={heThongDen}
          onChange={(e) => setHeThongDen(e.target.value)}
          placeholder="Loại đèn LED, nút bấm điều khiển..."
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block font-bold text-slate-800">Vật liệu chính cấu thành</label>
        <textarea
          rows={3}
          value={vatLieuChinh}
          onChange={(e) => setVatLieuChinh(e.target.value)}
          placeholder="Danh sách các loại vật liệu sử dụng chế tác..."
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
        />
      </div>
    </div>
  );
}
