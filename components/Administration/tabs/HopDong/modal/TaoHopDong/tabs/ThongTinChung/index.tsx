"use client";

import React, { useState } from 'react';
import { IconCalendar, IconChevronDown } from '@tabler/icons-react';

export interface ThongTinChungTabProps {
  soHopDong?: string;
  setSoHopDong?: (v: string) => void;
  ngayKy?: string;
  setNgayKy?: (v: string) => void;
  khachHang?: string;
  setKhachHang?: (v: string) => void;
  [key: string]: any;
}

export default function ThongTinChungTab({
  soHopDong: propSoHopDong,
  setSoHopDong: propSetSoHopDong,
  ngayKy: propNgayKy,
  setNgayKy: propSetNgayKy,
  khachHang: propKhachHang,
  setKhachHang: propSetKhachHang,
}: ThongTinChungTabProps) {
  // State for Top Row
  const [soHopDong, setSoHopDong] = useState(propSoHopDong || '01-2026/HĐ-MHV');
  const [ngayKy, setNgayKy] = useState(propNgayKy || '2026-07-20');

  // State for Bên A (Khách hàng)
  const [chonKH, setChonKH] = useState('');
  const [tenCongTyBenA, setTenCongTyBenA] = useState(propKhachHang || '');
  const [diaChiBenA, setDiaChiBenA] = useState('');
  const [daiDienBenA, setDaiDienBenA] = useState('');
  const [chucDanhBenA, setChucDanhBenA] = useState('Giám đốc');
  const [dienThoaiBenA, setDienThoaiBenA] = useState('');
  const [maSoThueBenA, setMaSoThueBenA] = useState('');
  const [soTaiKhoanBenA, setSoTaiKhoanBenA] = useState('');
  const [nganHangBenA, setNganHangBenA] = useState('');

  const handleSoHopDongChange = (val: string) => {
    setSoHopDong(val);
    if (propSetSoHopDong) propSetSoHopDong(val);
  };

  const handleNgayKyChange = (val: string) => {
    setNgayKy(val);
    if (propSetNgayKy) propSetNgayKy(val);
  };

  const handleTenCongTyChange = (val: string) => {
    setTenCongTyBenA(val);
    if (propSetKhachHang) propSetKhachHang(val);
  };

  return (
    <div className="space-y-4 animate-fade-in text-xs text-slate-700">
      
      {/* Top Row: Số hợp đồng * & Ngày ký */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Số hợp đồng * */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Số hợp đồng <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={soHopDong}
            onChange={(e) => handleSoHopDongChange(e.target.value)}
            placeholder="01-2026/HĐ-MHV"
            className="w-full text-xs bg-[#f8fafc]/90 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all font-mono"
          />
        </div>

        {/* Ngày ký */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Ngày ký
          </label>
          <div className="relative">
            <input
              type="date"
              value={ngayKy}
              onChange={(e) => handleNgayKyChange(e.target.value)}
              className="w-full text-xs bg-[#f8fafc]/90 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all cursor-pointer pr-9"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <IconCalendar size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION BÊN A (KHÁCH HÀNG) */}
      <div className="bg-[#f8fafc]/80 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3.5">
        
        {/* Section Header */}
        <h4 className="text-xs font-bold text-[#406c89] tracking-wider uppercase">
          BÊN A (KHÁCH HÀNG)
        </h4>

        {/* Field 1: Chọn từ danh sách KH */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Chọn từ danh sách KH
          </label>
          <div className="relative">
            <select
              value={chonKH}
              onChange={(e) => {
                setChonKH(e.target.value);
                if (e.target.value === 'kh-1') handleTenCongTyChange('Công ty Tập đoàn Vingroup');
                if (e.target.value === 'kh-2') handleTenCongTyChange('Công ty Cổ phần Tập đoàn Sunshine');
                if (e.target.value === 'kh-3') handleTenCongTyChange('Công ty Cổ phần Masterise Homes');
              }}
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] appearance-none cursor-pointer pr-9"
            >
              <option value="" disabled hidden>
                Chọn khách hàng...
              </option>
              <option value="kh-1">Công ty Tập đoàn Vingroup</option>
              <option value="kh-2">Công ty Cổ phần Tập đoàn Sunshine</option>
              <option value="kh-3">Công ty Cổ phần Masterise Homes</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <IconChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Field 2: Tên công ty Bên A * */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Tên công ty Bên A <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={tenCongTyBenA}
            onChange={(e) => handleTenCongTyChange(e.target.value)}
            className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>

        {/* Field 3: Địa chỉ */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Địa chỉ
          </label>
          <input
            type="text"
            value={diaChiBenA}
            onChange={(e) => setDiaChiBenA(e.target.value)}
            className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>

        {/* Field 4: Đại diện theo Pháp luật & Chức danh ký HĐ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Đại diện theo Pháp luật
            </label>
            <input
              type="text"
              value={daiDienBenA}
              onChange={(e) => setDaiDienBenA(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Chức danh ký HĐ
            </label>
            <input
              type="text"
              value={chucDanhBenA}
              onChange={(e) => setChucDanhBenA(e.target.value)}
              placeholder="Giám đốc"
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
            />
          </div>
        </div>

        {/* Field 5: Điện thoại & Mã số thuế */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Điện thoại
            </label>
            <input
              type="text"
              value={dienThoaiBenA}
              onChange={(e) => setDienThoaiBenA(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Mã số thuế
            </label>
            <input
              type="text"
              value={maSoThueBenA}
              onChange={(e) => setMaSoThueBenA(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all font-mono"
            />
          </div>
        </div>

        {/* Field 6: Số tài khoản & Ngân hàng */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Số tài khoản
            </label>
            <input
              type="text"
              value={soTaiKhoanBenA}
              onChange={(e) => setSoTaiKhoanBenA(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Ngân hàng
            </label>
            <input
              type="text"
              value={nganHangBenA}
              onChange={(e) => setNganHangBenA(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
            />
          </div>
        </div>

      </div>

      {/* SECTION BÊN B (MÔ HÌNH VIỆT) */}
      <div className="bg-[#f4f6ff]/40 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3.5">
        <h4 className="text-xs font-bold text-[#406c89] tracking-wider uppercase">
          BÊN B (MÔ HÌNH VIỆT)
        </h4>

        {/* Tên công ty Bên B */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Tên công ty Bên B</label>
          <input
            type="text"
            defaultValue="CÔNG TY TNHH MÔ HÌNH VIỆT"
            className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>

        {/* Địa chỉ trụ sở chính */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Địa chỉ trụ sở chính</label>
          <input
            type="text"
            defaultValue="Số 3 Ngõ 156 phố Lạc Trung, Phường Vĩnh Tuy, Thành phố Hà Nội"
            className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>

        {/* Địa chỉ xưởng SX */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Địa chỉ xưởng SX</label>
          <input
            type="text"
            defaultValue="Số 751 đường Nguyễn Khoái, Phường Linh Nam, Thành phố Hà Nội, Việt Nam"
            className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
          />
        </div>

        {/* Đại diện theo Pháp luật & Chức danh HB */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Đại diện theo Pháp luật</label>
            <input
              type="text"
              defaultValue="Nguyễn Đức Việt"
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Chức danh HB</label>
            <input
              type="text"
              defaultValue="Giám đốc"
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
            />
          </div>
        </div>

        {/* Điện thoại & Fax */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Điện thoại</label>
            <input
              type="text"
              defaultValue="024.3633 6688"
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Fax</label>
            <input
              type="text"
              defaultValue="024.3987 4486"
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all font-mono"
            />
          </div>
        </div>

        {/* Mã số doanh nghiệp & Mã SWIFT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Mã số doanh nghiệp</label>
            <input
              type="text"
              defaultValue="0101880079"
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Mã SWIFT</label>
            <input
              type="text"
              defaultValue="SHEKVNVX"
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all font-mono"
            />
          </div>
        </div>

        {/* Số tài khoản 1 & Ngân hàng TK1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Số tài khoản 1</label>
            <input
              type="text"
              defaultValue="116636638866"
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Ngân hàng TK1</label>
            <input
              type="text"
              defaultValue="Ngân hàng TMCP Công thương Việt Nam CN Hoàng Mai - PGD Gamuda"
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
            />
          </div>
        </div>

        {/* Số tài khoản 2 & Ngân hàng TK2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Số tài khoản 2</label>
            <input
              type="text"
              defaultValue="700020633696 (VND) - 700027177940 (USD)"
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Ngân hàng TK2</label>
            <input
              type="text"
              defaultValue="Ngân hàng TNHH MTV Shinhan Việt Nam – Chi nhánh Hoàn Kiếm"
              className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
