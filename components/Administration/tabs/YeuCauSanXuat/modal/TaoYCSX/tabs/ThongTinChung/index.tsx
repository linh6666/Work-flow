"use client";

import React from 'react';

interface ThongTinChungTabProps {
  soYcsx: string;
  setSoYcsx: (v: string) => void;
  maDuAn: string;
  setMaDuAn: (v: string) => void;
  tenDuAn: string;
  setTenDuAn: (v: string) => void;
  khachHang: string;
  setKhachHang: (v: string) => void;
  tyLe: string;
  setTyLe: (v: string) => void;
  ngayBietTienDo: string;
  setNgayBietTienDo: (v: string) => void;
  ngayGiaoHang: string;
  setNgayGiaoHang: (v: string) => void;
  moTaChiTiet: string;
  setMoTaChiTiet: (v: string) => void;
}

export default function ThongTinChungTab({
  soYcsx,
  setSoYcsx,
  maDuAn,
  setMaDuAn,
  tenDuAn,
  setTenDuAn,
  khachHang,
  setKhachHang,
  tyLe,
  setTyLe,
  ngayBietTienDo,
  setNgayBietTienDo,
  ngayGiaoHang,
  setNgayGiaoHang,
  moTaChiTiet,
  setMoTaChiTiet,
}: ThongTinChungTabProps) {
  return (
    <div className="space-y-4 animate-fade-in text-xs text-slate-700">
      
      {/* Row 1: Số YCSX & Mã dự án */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">
            Số YCSX <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={soYcsx}
            onChange={(e) => setSoYcsx(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">
            Mã dự án liên kết <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Ví dụ: 09-2026/DA-MHV"
            value={maDuAn}
            onChange={(e) => setMaDuAn(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
      </div>

      {/* Row 2: Tên dự án & Khách hàng */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">
            Tên dự án mô hình <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Nhập tên dự án mô hình..."
            value={tenDuAn}
            onChange={(e) => setTenDuAn(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">
            Chủ đầu tư / Khách hàng <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Nhập tên Chủ đầu tư hoặc Khách hàng..."
            value={khachHang}
            onChange={(e) => setKhachHang(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
      </div>

      {/* Row 3: Tỷ lệ & Ngày giao hàng */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">Tỷ lệ mô hình</label>
          <select
            value={tyLe}
            onChange={(e) => setTyLe(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          >
            <option value="1/50">1/50</option>
            <option value="1/75">1/75</option>
            <option value="1/100">1/100</option>
            <option value="1/150">1/150</option>
            <option value="1/200">1/200</option>
            <option value="1/400">1/400</option>
            <option value="1/500">1/500</option>
            <option value="1/1000">1/1000</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">Ngày biết tiến độ</label>
          <input
            type="date"
            value={ngayBietTienDo}
            onChange={(e) => setNgayBietTienDo(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">Hạn bàn giao mô hình</label>
          <input
            type="date"
            value={ngayGiaoHang}
            onChange={(e) => setNgayGiaoHang(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
      </div>

      {/* Row 4: Mô tả yêu cầu */}
      <div className="space-y-1.5">
        <label className="block font-bold text-slate-800">Nội dung / Mô tả yêu cầu sản xuất</label>
        <textarea
          rows={4}
          value={moTaChiTiet}
          onChange={(e) => setMoTaChiTiet(e.target.value)}
          placeholder="Ghi chú các yêu cầu đặc biệt về kỹ thuật, tiến độ hoặc đóng gói vận chuyển..."
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] leading-relaxed resize-y min-h-[90px]"
        />
      </div>

    </div>
  );
}
