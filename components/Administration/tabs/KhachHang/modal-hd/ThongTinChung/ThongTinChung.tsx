"use client";

import React from 'react';
import { KhachHangItem } from '../../index';

const inputClass =
  'h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-xs outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100';
const labelClass = 'mb-1.5 block text-xs font-medium text-slate-600';
const sectionLabelClass = 'text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3';

interface ThongTinChungProps {
  soHopDong: string;
  setSoHopDong: (v: string) => void;
  ngayHopDong: string;
  setNgayHopDong: (v: string) => void;
  selectedCustomerId: string;
  handleCustomerChange: (id: string) => void;
  customers: KhachHangItem[];
  donViLienHe: string;
  setDonViLienHe: (v: string) => void;
  daiDienHoTen: string;
  setDaiDienHoTen: (v: string) => void;
  daiDienChucDanh: string;
  setDaiDienChucDanh: (v: string) => void;
  tenDuAn: string;
  setTenDuAn: (v: string) => void;
  dienThoai: string;
  setDienThoai: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  diaChi: string;
  setDiaChi: (v: string) => void;
  maSoThue: string;
  setMaSoThue: (v: string) => void;
  soTaiKhoan: string;
  setSoTaiKhoan: (v: string) => void;
  nganHang: string;
  setNganHang: (v: string) => void;
}

export default function ThongTinChung({
  soHopDong, setSoHopDong,
  ngayHopDong, setNgayHopDong,
  selectedCustomerId, handleCustomerChange,
  customers,
  donViLienHe, setDonViLienHe,
  daiDienHoTen, setDaiDienHoTen,
  daiDienChucDanh, setDaiDienChucDanh,
  tenDuAn, setTenDuAn,
  dienThoai, setDienThoai,
  email, setEmail,
  diaChi, setDiaChi,
  maSoThue, setMaSoThue,
  soTaiKhoan, setSoTaiKhoan,
  nganHang, setNganHang,
}: ThongTinChungProps) {
  return (
    <div className="tab-content-active space-y-4">

      {/* Số hợp đồng & Ngày ký */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Số hợp đồng *</label>
          <input
            type="text"
            required
            value={soHopDong}
            onChange={(e) => setSoHopDong(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Ngày ký</label>
          <input
            type="date"
            required
            value={ngayHopDong}
            onChange={(e) => setNgayHopDong(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* BÊN A */}
      <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-3">
        <p className={sectionLabelClass}>Bên A (Khách hàng)</p>

        <div>
          <label className={labelClass}>Chọn từ danh sách KH</label>
          <div className="relative">
            <select
              value={selectedCustomerId}
              onChange={(e) => handleCustomerChange(e.target.value)}
              className={`${inputClass} appearance-none pr-9`}
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>{c.ten}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">⌄</span>
          </div>
        </div>

        <div>
          <label className={labelClass}>Tên công ty Bên A *</label>
          <input
            type="text"
            required
            value={donViLienHe}
            onChange={(e) => setDonViLienHe(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Địa chỉ</label>
          <input
            type="text"
            value={diaChi}
            onChange={(e) => setDiaChi(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Đại diện theo Pháp luật</label>
            <input
              type="text"
              value={daiDienHoTen}
              onChange={(e) => setDaiDienHoTen(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Chức danh ký HĐ</label>
            <input
              type="text"
              value={daiDienChucDanh}
              onChange={(e) => setDaiDienChucDanh(e.target.value)}
              placeholder="Giám đốc"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Điện thoại</label>
            <input
              type="text"
              value={dienThoai}
              onChange={(e) => setDienThoai(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Mã số thuế</label>
            <input
              type="text"
              value={maSoThue}
              onChange={(e) => setMaSoThue(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Số tài khoản</label>
            <input
              type="text"
              value={soTaiKhoan}
              onChange={(e) => setSoTaiKhoan(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Ngân hàng</label>
            <input
              type="text"
              value={nganHang}
              onChange={(e) => setNganHang(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* BÊN B — static info */}
      <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-1">
        <p className={sectionLabelClass}>Bên B (Mô hình Việt)</p>
        <p className="text-xs font-bold text-slate-700">CÔNG TY TNHH MÔ HÌNH VIỆT</p>
        <p className="text-xs text-slate-500">Trụ sở: Số 3 Ngõ 156 phố Lạc Trung, Phường Vĩnh Tuy, Hà Nội</p>
        <p className="text-xs text-slate-500">Đại diện: Ông Nguyễn Đức Việt — Giám đốc | Tel: 024.3633 6688</p>
        <p className="text-xs text-slate-500">
          TK1: 116636638866 — Vietinbank CN Hoàng Mai &nbsp;|&nbsp;
          TK2: 700020633696 (VND) — Shinhan Bank VN
        </p>
      </div>

    </div>
  );
}
