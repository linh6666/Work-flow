"use client";

import React from 'react';
import { KhachHangItem } from '../../index';

const inputClass =
  'h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-xs outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100';
const labelClass = 'mb-1.5 block text-xs font-medium text-slate-900';

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
}: ThongTinChungProps) {
  return (
    <div className="tab-content-active space-y-4">
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
          <label className={labelClass}>Ngày ký hợp đồng *</label>
          <input
            type="date"
            required
            value={ngayHopDong}
            onChange={(e) => setNgayHopDong(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Khách hàng</label>
          <div className="relative">
            <select
              value={selectedCustomerId}
              onChange={(e) => handleCustomerChange(e.target.value)}
              className={`${inputClass} appearance-none pr-9`}
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.ten}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
              ⌄
            </span>
          </div>
        </div>
        <div>
          <label className={labelClass}>Đơn vị liên hệ *</label>
          <input
            type="text"
            required
            value={donViLienHe}
            onChange={(e) => setDonViLienHe(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Người đại diện ký</label>
          <input
            type="text"
            value={daiDienHoTen}
            onChange={(e) => setDaiDienHoTen(e.target.value)}
            placeholder="Họ và tên..."
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Chức vụ đại diện</label>
          <input
            type="text"
            value={daiDienChucDanh}
            onChange={(e) => setDaiDienChucDanh(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Tên dự án / Mô hình *</label>
        <input
          type="text"
          required
          placeholder="MÔ HÌNH DỰ ÁN..."
          value={tenDuAn}
          onChange={(e) => setTenDuAn(e.target.value)}
          className={`${inputClass} uppercase`}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={labelClass}>Điện thoại</label>
          <input
            type="text"
            value={dienThoai}
            onChange={(e) => setDienThoai(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="col-span-2">
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
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
    </div>
  );
}
