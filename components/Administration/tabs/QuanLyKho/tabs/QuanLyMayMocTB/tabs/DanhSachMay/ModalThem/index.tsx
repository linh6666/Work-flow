"use client";

import React, { useState } from 'react';
import type { MayMocChiTietItem } from '../index';

interface ModalThemProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: MayMocChiTietItem) => void;
}

type NewMachineForm = Omit<MayMocChiTietItem, 'id' | 'stt' | 'thanh_tien_nhap'>;

const initialForm: NewMachineForm = {
  phong_ban: '',
  phong_ban_quan_ly: '',
  nam_nhap: new Date().getFullYear(),
  ngay_nhap: '',
  ma_may: '',
  ten_may: '',
  thong_so_ky_thuat: '',
  don_vi_tinh: '',
  sl_nhap: 0,
  don_gia: 0,
  tinh_trang_khi_nhap: '',
  thong_tin_ncc: '',
};

export default function ModalThem({ isOpen, onClose, onSave }: ModalThemProps) {
  const [formData, setFormData] = useState<NewMachineForm>(initialForm);

  if (!isOpen) return null;

  const handleChange = <K extends keyof NewMachineForm>(field: K, value: NewMachineForm[K]) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({
      ...formData,
      id: `machine-${Date.now()}`,
      stt: 0,
      thanh_tien_nhap: formData.sl_nhap * formData.don_gia,
    });
    setFormData(initialForm);
  };

  const inputClass = 'mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all bg-white placeholder:text-slate-400';
  const labelClass = 'block text-xs font-medium text-slate-500';
  const calculatedTotal = formData.sl_nhap * formData.don_gia;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200/80 w-full max-w-[680px] max-h-[calc(100vh-2rem)] overflow-y-auto">
        <div className="px-6 pt-6 pb-2">
          <h3 className="text-sm font-bold text-slate-800">Thêm máy</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-6 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-3">
            <div><label className={labelClass}>Phòng ban</label><input required value={formData.phong_ban} onChange={(event) => handleChange('phong_ban', event.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Mã máy</label><input required value={formData.ma_may} onChange={(event) => handleChange('ma_may', event.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Tên máy</label><input required value={formData.ten_may} onChange={(event) => handleChange('ten_may', event.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Thông số KT</label><input value={formData.thong_so_ky_thuat} onChange={(event) => handleChange('thong_so_ky_thuat', event.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Đơn vị</label><input value={formData.don_vi_tinh} onChange={(event) => handleChange('don_vi_tinh', event.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Số lượng</label><input type="number" min="0" value={formData.sl_nhap} onChange={(event) => handleChange('sl_nhap', Number(event.target.value) || 0)} className={inputClass} /></div>
            <div><label className={labelClass}>Đơn giá</label><input type="number" min="0" value={formData.don_gia} onChange={(event) => handleChange('don_gia', Number(event.target.value) || 0)} className={inputClass} /></div>
            <div><label className={labelClass}>Thành tiền</label><input readOnly value={calculatedTotal} className={`${inputClass} bg-slate-50`} /></div>
            <div><label className={labelClass}>Năm nhập</label><input type="number" min="1900" value={formData.nam_nhap} onChange={(event) => handleChange('nam_nhap', Number(event.target.value) || 0)} className={inputClass} /></div>
            <div><label className={labelClass}>Ngày nhập</label><input type="date" value={formData.ngay_nhap} onChange={(event) => handleChange('ngay_nhap', event.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Tình trạng</label><input value={formData.tinh_trang_khi_nhap} onChange={(event) => handleChange('tinh_trang_khi_nhap', event.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Thông tin NCC</label><input value={formData.thong_tin_ncc} onChange={(event) => handleChange('thong_tin_ncc', event.target.value)} className={inputClass} /></div>
          </div>
          <div className="px-6 py-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-5 py-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors cursor-pointer">Hủy</button>
            <button type="submit" className="px-6 py-2 bg-[#406c89] hover:bg-[#345870] text-white text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}
