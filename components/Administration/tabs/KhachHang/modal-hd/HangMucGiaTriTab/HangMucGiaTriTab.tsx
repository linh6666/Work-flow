"use client";

import React from 'react';
import { IconFileDescription } from '@tabler/icons-react';

const inputClass =
  'h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-xs outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100';
const labelClass = 'mb-1.5 block text-xs font-medium text-slate-600';

interface HangMucGiaTriTabProps {
  // giá trị
  giaTriHopDong: number;
  setGiaTriHopDong: (v: number) => void;
  vatPercent: number;
  setVatPercent: (v: number) => void;
  vatAmount: number;
  tongThanhToan: number;
  formatCurrency: (amount: number) => string;
  // thông tin mô hình
  tenMoHinh: string;
  setTenMoHinh: (v: string) => void;
  tyLe: string;
  setTyLe: (v: string) => void;
  kichThuoc: string;
  setKichThuoc: (v: string) => void;
  diaChiGiaoHang: string;
  setDiaChiGiaoHang: (v: string) => void;
  // trạng thái
  trangThai: string;
  setTrangThai: (v: string) => void;
  // báo giá
  baoGiaDuyet: string;
  setBaoGiaDuyet: (v: string) => void;
}

export default function HangMucGiaTriTab({
  giaTriHopDong, setGiaTriHopDong,
  vatPercent, setVatPercent,
  vatAmount, tongThanhToan, formatCurrency,
  tenMoHinh, setTenMoHinh,
  tyLe, setTyLe,
  kichThuoc, setKichThuoc,
  diaChiGiaoHang, setDiaChiGiaoHang,
  trangThai, setTrangThai,
  baoGiaDuyet, setBaoGiaDuyet,
}: HangMucGiaTriTabProps) {
  return (
    <div className="tab-content-active space-y-4">

      {/* Nạp từ báo giá đã duyệt */}
      <div className="rounded-lg border border-indigo-200 bg-indigo-50/50 p-3 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wide">
          <IconFileDescription size={14} />
          <span>Nạp từ báo giá đã được PGĐ duyệt</span>
        </div>
        <div className="relative">
          <select
            value={baoGiaDuyet}
            onChange={(e) => setBaoGiaDuyet(e.target.value)}
            className="h-9 w-full rounded-md border border-slate-200 bg-white pl-3 pr-8 text-sm text-slate-500 shadow-xs outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 appearance-none cursor-pointer"
          >
            <option value="">Chọn báo giá đã duyệt để tự điền dữ liệu...</option>
            <option value="bg-001">BG-001 — Công ty Flamingo (12/2025)</option>
            <option value="bg-002">BG-002 — Công ty ABC (01/2026)</option>
            <option value="bg-003">BG-003 — Tập đoàn XYZ (02/2026)</option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-slate-400">⌄</span>
        </div>
      </div>

      {/* Tên mô hình / dự án */}
      <div>
        <label className={labelClass}>Tên mô hình / dự án</label>
        <input
          type="text"
          value={tenMoHinh}
          onChange={(e) => setTenMoHinh(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Tỷ lệ + Kích thước */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Tỷ lệ</label>
          <input
            type="text"
            value={tyLe}
            onChange={(e) => setTyLe(e.target.value)}
            placeholder="1/800"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Kích thước</label>
          <input
            type="text"
            value={kichThuoc}
            onChange={(e) => setKichThuoc(e.target.value)}
            placeholder="2650X1900MM"
            className={inputClass}
          />
        </div>
      </div>

      {/* Địa chỉ giao hàng / lắp đặt */}
      <div>
        <label className={labelClass}>Địa chỉ giao hàng / lắp đặt</label>
        <input
          type="text"
          value={diaChiGiaoHang}
          onChange={(e) => setDiaChiGiaoHang(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Giá trị HĐ + VAT */}
      <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Giá trị HĐ (trước thuế)</label>
            <input
              type="number"
              required
              min="0"
              value={giaTriHopDong || ''}
              onChange={(e) => setGiaTriHopDong(parseFloat(e.target.value) || 0)}
              placeholder="0"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>VAT (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={vatPercent}
              onChange={(e) => setVatPercent(parseFloat(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Tiền VAT: <span className="font-medium">{formatCurrency(vatAmount)}</span>
        </p>
        <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
          <span className="text-base font-extrabold text-slate-800">Tổng giá trị HĐ (sau thuế)</span>
          <strong className="text-base font-extrabold text-indigo-600">{formatCurrency(tongThanhToan)}</strong>
        </div>
      </div>

      {/* Trạng thái */}
      <div>
        <label className={labelClass}>Trạng thái</label>
        <div className="relative">
          <select
            value={trangThai}
            onChange={(e) => setTrangThai(e.target.value)}
            className={`${inputClass} appearance-none pr-9`}
          >
            <option value="ban-nhap">Bản nháp</option>
            <option value="cho-duyet">Chờ duyệt</option>
            <option value="da-duyet">Đã duyệt</option>
            <option value="dang-thuc-hien">Đang thực hiện</option>
            <option value="hoan-thanh">Hoàn thành</option>
            <option value="huy">Hủy</option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">⌄</span>
        </div>
      </div>

    </div>
  );
}
