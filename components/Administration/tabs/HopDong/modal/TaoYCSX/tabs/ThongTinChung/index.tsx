"use client";

import React, { useState } from 'react';
import { IconLink, IconChevronDown } from '@tabler/icons-react';

const CAP_DO_OPTIONS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

const HOP_DONG_OPTIONS = [
  { value: '', label: '-- Chọn hợp đồng --' },
  { value: 'hd-1', label: '26-2026/HĐ-MHV — Daewoo Engineering' },
  { value: 'hd-2', label: '24-2026/HĐ-MHV — Tập đoàn Đất Việt' },
  { value: 'hd-3', label: '23-2026/HĐ-MHV — LICOGI13FC' },
];

const DEFAULT_BO_HO_SO = `- Khung Tổng mặt bằng của mô hình.
- Bản vẽ thiết kế Khung của mô hình.
- Bản vẽ mặt bằng, mặt đứng của Công trình (Đối với các hạng mục mô hình công trình)`;

const DEFAULT_KHOI_LUONG_NT1 = `- Hoàn thành 80% phần nền: khai triển xong nền, sơn đường, đường đi bộ, via hè; đã dán đường.
- Hoàn thành 80% khối lượng công trình: Sơn, ghép lên khối bao gồm cốt, tường, đế, kinh và đang dán các chi tiết công trình như đố kinh, lan can, ban công.
- Hoàn thành 80% phần trang trí cảnh quan: bao gồm chuẩn bị đầy đủ nguyên, phụ liệu trang trí cảnh quan đã lên kế hoạch.`;

export default function ThongTinChungTab() {
  const [hopDong, setHopDong] = useState('');
  const [soYeuCau, setSoYeuCau] = useState('');
  const [maDuAn, setMaDuAn] = useState('');
  const [tenDuAn, setTenDuAn] = useState('');
  const [khachHang, setKhachHang] = useState('');
  const [capDo, setCapDo] = useState('V');
  const [tyLe, setTyLe] = useState('1/1000');
  const [kichThuoc, setKichThuoc] = useState('1300×2400mm');
  const [diaDiem, setDiaDiem] = useState('');
  const [dinhHuong, setDinhHuong] = useState('');
  const [boHoSo, setBoHoSo] = useState(DEFAULT_BO_HO_SO);
  const [khoiLuongNT1, setKhoiLuongNT1] = useState(DEFAULT_KHOI_LUONG_NT1);
  const [ghiChu, setGhiChu] = useState('');

  return (
    <div className="space-y-4 text-xs text-slate-700 px-1 no-scrollbar">

      {/* Liên kết Báo giá & Hợp đồng */}
      <div className="grid grid-cols-2 gap-3 bg-[#eef4f7] border border-[#b8d0dc] rounded-xl p-3.5">
        {/* Liên kết Báo giá */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[#406c89] font-semibold text-xs">
            <IconLink size={13} />
            <span>Liên kết Báo giá</span>
          </div>
          <p className="text-[11px] text-slate-500 italic">Tự động liên kết từ hợp đồng</p>
        </div>

        {/* Liên kết Hợp đồng */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[#406c89] font-semibold text-xs">
            <IconLink size={13} />
            <span>Liên kết Hợp đồng</span>
          </div>
          <div className="relative">
            <select
              value={hopDong}
              onChange={(e) => setHopDong(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] appearance-none cursor-pointer pr-8"
            >
              {HOP_DONG_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <IconChevronDown size={13} />
            </div>
          </div>
        </div>
      </div>

      {/* Số yêu cầu & Mã dự án */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Số yêu cầu</label>
          <input
            type="text"
            value={soYeuCau}
            onChange={(e) => setSoYeuCau(e.target.value)}
            className="w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Mã dự án</label>
          <input
            type="text"
            value={maDuAn}
            onChange={(e) => setMaDuAn(e.target.value)}
            className="w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>
      </div>

      {/* Tên dự án / mô hình */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700">
          Tên dự án / mô hình <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={tenDuAn}
          onChange={(e) => setTenDuAn(e.target.value)}
          placeholder="VD: MÔ HÌNH DỰ ÁN HAUS COASTAL..."
          className="w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
        />
      </div>

      {/* Khách hàng & Cấp độ dự án */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Khách hàng <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={khachHang}
            onChange={(e) => setKhachHang(e.target.value)}
            className="w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Cấp độ dự án</label>
          <div className="relative">
            <select
              value={capDo}
              onChange={(e) => setCapDo(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] appearance-none cursor-pointer pr-8"
            >
              {CAP_DO_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <IconChevronDown size={13} />
            </div>
          </div>
        </div>
      </div>

      {/* Tỷ lệ & Kích thước */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Tỷ lệ</label>
          <input
            type="text"
            value={tyLe}
            onChange={(e) => setTyLe(e.target.value)}
            placeholder="1/1000"
            className="w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Kích thước</label>
          <input
            type="text"
            value={kichThuoc}
            onChange={(e) => setKichThuoc(e.target.value)}
            placeholder="1300×2400mm"
            className="w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>
      </div>

      {/* Địa điểm lắp đặt */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700">Địa điểm lắp đặt</label>
        <input
          type="text"
          value={diaDiem}
          onChange={(e) => setDiaDiem(e.target.value)}
          placeholder="Nhập địa điểm lắp đặt..."
          className="w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
        />
      </div>

      {/* Định hướng theo hợp đồng */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700">Định hướng theo hợp đồng</label>
        <textarea
          value={dinhHuong}
          onChange={(e) => setDinhHuong(e.target.value)}
          rows={3}
          placeholder="Nhập định hướng, yêu cầu từ hợp đồng..."
          className="w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all resize-y"
        />
      </div>

      {/* Bộ hồ sơ xác nhận khai triển */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#406c89]">Bộ hồ sơ xác nhận khai triển</label>
        <textarea
          value={boHoSo}
          onChange={(e) => setBoHoSo(e.target.value)}
          rows={4}
          className="w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2.5 text-slate-700 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all resize-y"
        />
      </div>

      {/* Khối lượng nghiệm thu lần 1 */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#406c89]">Khối lượng nghiệm thu lần 1</label>
        <textarea
          value={khoiLuongNT1}
          onChange={(e) => setKhoiLuongNT1(e.target.value)}
          rows={5}
          className="w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2.5 text-slate-700 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all resize-y"
        />
      </div>

      {/* Ghi chú */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700">Ghi chú</label>
        <textarea
          value={ghiChu}
          onChange={(e) => setGhiChu(e.target.value)}
          rows={3}
          placeholder="Nhập ghi chú..."
          className="w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all resize-y"
        />
      </div>

    </div>
  );
}
