"use client";

import React, { useState, useEffect } from 'react';
import { MayMocChiTietItem } from '../index';

interface ModalSuaProps {
  isOpen: boolean;
  onClose: () => void;
  item: MayMocChiTietItem | null;
  onSave: (updatedItem: MayMocChiTietItem) => void;
}

export default function ModalSua({
  isOpen,
  onClose,
  item,
  onSave,
}: ModalSuaProps) {
  const [formData, setFormData] = useState<Partial<MayMocChiTietItem>>({});

  useEffect(() => {
    if (item && isOpen) {
      setFormData({ ...item });
    }
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const handleChange = (field: keyof MayMocChiTietItem, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'sl_nhap' || field === 'don_gia') {
        const sl = field === 'sl_nhap' ? Number(value) || 0 : Number(updated.sl_nhap) || 0;
        const dg = field === 'don_gia' ? Number(value) || 0 : Number(updated.don_gia) || 0;
        updated.thanh_tien_nhap = sl * dg;
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;
    const updatedItem: MayMocChiTietItem = {
      ...item,
      ...formData,
      nam_nhap: Number(formData.nam_nhap) || item.nam_nhap,
      sl_nhap: Number(formData.sl_nhap) || 0,
      don_gia: Number(formData.don_gia) || 0,
      thanh_tien_nhap: Number(formData.thanh_tien_nhap) || 0,
    } as MayMocChiTietItem;
    onSave(updatedItem);
    onClose();
  };

  const inputClass =
    'w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all bg-white placeholder:text-slate-400';
  const labelClass = 'block text-xs text-slate-500 mb-1';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-5 pb-4">
          <h3 className="text-base font-bold text-slate-800">Sửa máy</h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 pb-4 grid grid-cols-2 gap-x-6 gap-y-4">
            {/* Phòng ban */}
            <div>
              <label className={labelClass}>Phòng ban</label>
              <input
                type="text"
                value={formData.phong_ban || ''}
                onChange={(e) => handleChange('phong_ban', e.target.value)}
                placeholder="Phòng ban quản lý"
                className={inputClass}
              />
            </div>

            {/* Mã máy */}
            <div>
              <label className={labelClass}>Mã máy</label>
              <input
                type="text"
                value={formData.ma_may || ''}
                onChange={(e) => handleChange('ma_may', e.target.value)}
                placeholder="Mã máy"
                className={inputClass}
              />
            </div>

            {/* Tên máy */}
            <div>
              <label className={labelClass}>Tên máy</label>
              <input
                type="text"
                value={formData.ten_may || ''}
                onChange={(e) => handleChange('ten_may', e.target.value)}
                placeholder="Tên máy"
                className={inputClass}
              />
            </div>

            {/* Thông số KT */}
            <div>
              <label className={labelClass}>Thông số KT</label>
              <input
                type="text"
                value={formData.thong_so_ky_thuat || ''}
                onChange={(e) => handleChange('thong_so_ky_thuat', e.target.value)}
                placeholder="Thông số kĩ thuật"
                className={inputClass}
              />
            </div>

            {/* Đơn vị */}
            <div>
              <label className={labelClass}>Đơn vị</label>
              <input
                type="text"
                value={formData.don_vi_tinh || ''}
                onChange={(e) => handleChange('don_vi_tinh', e.target.value)}
                placeholder="Đơn vị tính"
                className={inputClass}
              />
            </div>

            {/* Số lượng */}
            <div>
              <label className={labelClass}>Số lượng</label>
              <input
                type="number"
                min="0"
                value={formData.sl_nhap ?? 0}
                onChange={(e) => handleChange('sl_nhap', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Đơn giá */}
            <div>
              <label className={labelClass}>Đơn giá</label>
              <input
                type="number"
                min="0"
                value={formData.don_gia ?? 0}
                onChange={(e) => handleChange('don_gia', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Thành tiền */}
            <div>
              <label className={labelClass}>Thành tiền</label>
              <input
                type="number"
                min="0"
                value={formData.thanh_tien_nhap ?? 0}
                onChange={(e) => handleChange('thanh_tien_nhap', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Năm nhập */}
            <div>
              <label className={labelClass}>Năm nhập</label>
              <input
                type="number"
                value={formData.nam_nhap ?? 0}
                onChange={(e) => handleChange('nam_nhap', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Ngày nhập */}
            <div>
              <label className={labelClass}>Ngày nhập</label>
              <input
                type="date"
                value={formData.ngay_nhap || ''}
                onChange={(e) => handleChange('ngay_nhap', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Tình trạng */}
            <div>
              <label className={labelClass}>Tình trạng</label>
              <input
                type="text"
                value={formData.tinh_trang_khi_nhap || ''}
                onChange={(e) => handleChange('tinh_trang_khi_nhap', e.target.value)}
                placeholder="Tình trạng khi nhập"
                className={inputClass}
              />
            </div>

            {/* Thông tin NCC */}
            <div>
              <label className={labelClass}>Thông tin NCC</label>
              <input
                type="text"
                value={formData.thong_tin_ncc || ''}
                onChange={(e) => handleChange('thong_tin_ncc', e.target.value)}
                placeholder="Thông tin NCC"
                className={inputClass}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#406c89] hover:bg-[#345870] text-white text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
