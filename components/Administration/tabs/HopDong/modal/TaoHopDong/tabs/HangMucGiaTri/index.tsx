"use client";

import React, { useState } from 'react';
import { IconReceipt, IconChevronDown } from '@tabler/icons-react';

export interface HangMucItem {
  id: string;
  tenHangMuc: string;
  soLuong: number;
  donVi: string;
  donGia: number;
}

interface HangMucGiaTriTabProps {
  tenDuAn?: string;
  setTenDuAn?: (v: string) => void;
  tyLe?: string;
  setTyLe?: (v: string) => void;
  kichThuoc?: string;
  setKichThuoc?: (v: string) => void;
  subtotal?: number;
  vatPercent?: number;
  setVatPercent?: (v: number) => void;
  [key: string]: any;
}

export default function HangMucGiaTriTab({
  tenDuAn: propTenDuAn,
  setTenDuAn: propSetTenDuAn,
  tyLe: propTyLe,
  setTyLe: propSetTyLe,
  kichThuoc: propKichThuoc,
  setKichThuoc: propSetKichThuoc,
  subtotal: propSubtotal,
  vatPercent: propVatPercent,
  setVatPercent: propSetVatPercent,
}: HangMucGiaTriTabProps) {
  const [baoGiaDuyet, setBaoGiaDuyet] = useState('');
  const [tenMoHinhDuAn, setTenMoHinhDuAn] = useState(propTenDuAn || '');
  const [tyLe, setTyLe] = useState(propTyLe || '1/800');
  const [kichThuoc, setKichThuoc] = useState(propKichThuoc || '2650X1900MM');
  const [diaChiGiaoHang, setDiaChiGiaoHang] = useState('');
  const [giaTriTruocThue, setGiaTriTruocThue] = useState<number>(propSubtotal || 0);
  const [vatPercent, setVatPercent] = useState<number>(propVatPercent || 8);
  const [trangThai, setTrangThai] = useState('Bản nháp');

  // Helper calculations
  const tienVat = (giaTriTruocThue * vatPercent) / 100;
  const tongSauThue = giaTriTruocThue + tienVat;

  const handleTenMoHinhChange = (val: string) => {
    setTenMoHinhDuAn(val);
    if (propSetTenDuAn) propSetTenDuAn(val);
  };

  const handleTyLeChange = (val: string) => {
    setTyLe(val);
    if (propSetTyLe) propSetTyLe(val);
  };

  const handleKichThuocChange = (val: string) => {
    setKichThuoc(val);
    if (propSetKichThuoc) propSetKichThuoc(val);
  };

  const handleVatChange = (val: number) => {
    setVatPercent(val);
    if (propSetVatPercent) propSetVatPercent(val);
  };

  return (
    <div className="space-y-4 animate-fade-in text-xs text-slate-700">
      
      {/* SECTION 1: NẠP TỪ BÁO GIÁ ĐÃ ĐƯỢC PGĐ DUYỆT */}
      <div className="bg-[#f4f6ff]/60 border border-[#dbe0fe] rounded-2xl p-4 space-y-2.5 select-none">
        <div className="flex items-center gap-2 text-[#406c89] font-bold text-xs tracking-wide uppercase">
          <IconReceipt size={18} className="text-[#406c89]" />
          <span>NẠP TỪ BÁO GIÁ ĐÃ ĐƯỢC PGĐ DUYỆT</span>
        </div>

        <div className="relative">
          <select
            value={baoGiaDuyet}
            onChange={(e) => setBaoGiaDuyet(e.target.value)}
            className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] appearance-none cursor-pointer pr-9"
          >
            <option value="" disabled hidden>
              Chọn báo giá đã duyệt để tự điền dữ liệu...
            </option>
            <option value="bg-01">BG-2026/001 - Quy hoạch Sunshine City (150.000.000đ)</option>
            <option value="bg-02">BG-2026/002 - Sa bàn Masterise Grand Park (280.000.000đ)</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <IconChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* FIELD 2: Tên mô hình / dự án */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700">
          Tên mô hình / dự án
        </label>
        <input
          type="text"
          value={tenMoHinhDuAn}
          onChange={(e) => handleTenMoHinhChange(e.target.value)}
          className="w-full text-xs bg-[#f8fafc]/90 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
        />
      </div>

      {/* FIELD 3: Tỷ lệ & Kích thước (2 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Tỷ lệ
          </label>
          <input
            type="text"
            value={tyLe}
            onChange={(e) => handleTyLeChange(e.target.value)}
            placeholder="1/800"
            className="w-full text-xs bg-[#f8fafc]/90 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all font-mono"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Kích thước
          </label>
          <input
            type="text"
            value={kichThuoc}
            onChange={(e) => handleKichThuocChange(e.target.value)}
            placeholder="2650X1900MM"
            className="w-full text-xs bg-[#f8fafc]/90 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all font-mono"
          />
        </div>
      </div>

      {/* FIELD 4: Địa chỉ giao hàng / lắp đặt */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700">
          Địa chỉ giao hàng / lắp đặt
        </label>
        <input
          type="text"
          value={diaChiGiaoHang}
          onChange={(e) => setDiaChiGiaoHang(e.target.value)}
          className="w-full text-xs bg-[#f8fafc]/90 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
        />
      </div>

      {/* FIELD 5: SECTION BẢNG TÍNH GIÁ TRỊ */}
      <div className="bg-[#f8fafc]/80 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
        
        {/* Row 2 Columns: Giá trị HĐ (trước thuế) & VAT (%) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              Giá trị HĐ (trước thuế)
            </label>
            <input
              type="number"
              min="0"
              value={giaTriTruocThue}
              onChange={(e) => setGiaTriTruocThue(parseFloat(e.target.value) || 0)}
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all font-mono"
            />
            <div className="text-[11px] text-slate-400 font-normal pt-0.5">
              Tiền VAT: {tienVat.toLocaleString('vi-VN')}đ
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              VAT (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={vatPercent}
              onChange={(e) => handleVatChange(parseFloat(e.target.value) || 0)}
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all font-mono"
            />
          </div>
        </div>

        {/* Total Summary Row */}
        <div className="border-t border-slate-200/70 pt-3 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">
            Tổng giá trị HĐ (sau thuế)
          </span>
          <span className="text-sm sm:text-base font-extrabold text-[#406c89]">
            {tongSauThue.toLocaleString('vi-VN')}đ
          </span>
        </div>

      </div>

      {/* FIELD 6: Trạng thái */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700">
          Trạng thái
        </label>
        <div className="relative">
          <select
            value={trangThai}
            onChange={(e) => setTrangThai(e.target.value)}
            className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] appearance-none cursor-pointer pr-9"
          >
            <option value="Bản nháp">Bản nháp</option>
            <option value="Chờ duyệt">Chờ duyệt</option>
            <option value="Đã duyệt">Đã duyệt</option>
            <option value="Đang thực hiện">Đang thực hiện</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <IconChevronDown size={16} />
          </div>
        </div>
      </div>

    </div>
  );
}
