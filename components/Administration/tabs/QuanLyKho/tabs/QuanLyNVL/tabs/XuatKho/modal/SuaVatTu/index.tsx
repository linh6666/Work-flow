"use client";

import React, { useState, useEffect } from 'react';
import { XuatKhoItem } from '../../index';

interface SuaVatTuModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: XuatKhoItem | null;
  onSave: (updatedItem: XuatKhoItem) => void;
}

export default function SuaVatTuModal({
  isOpen,
  onClose,
  item,
  onSave,
}: SuaVatTuModalProps) {
  const [month, setMonth] = useState('1');
  const [year, setYear] = useState('2026');
  const [formData, setFormData] = useState({
    export_date: '',
    project_ref: '',
    category: '',
    item_code: '',
    item_name: '',
    specs: '',
    unit: '',
    quantity: 0,
    unit_price: 0,
    total_amount: 0,
    department: '',
    person: '',
    notes: '',
  });

  useEffect(() => {
    if (isOpen && item) {
      // Extract month and year from ngay_xuat (e.g. 21/01/2026)
      let m = '1';
      let y = '2026';
      if (item.ngay_xuat) {
        const parts = item.ngay_xuat.split(/[-/]/);
        if (parts.length >= 2) {
          m = String(parseInt(parts[1], 10) || 1);
        }
        if (parts.length >= 3) {
          const yr = parts[2].trim();
          y = yr.length === 2 ? `20${yr}` : yr;
        }
      }

      setMonth(m);
      setYear(y || '2026');
      setFormData({
        export_date: item.ngay_xuat || '',
        project_ref: item.du_an || '',
        category: item.nhom_hang || '',
        item_code: item.ma_hang || '',
        item_name: item.ten_hang || '',
        specs: item.thong_so || '',
        unit: item.dvt || '',
        quantity: item.so_luong ?? 0,
        unit_price: item.don_gia_xuat_kho ?? 0,
        total_amount: item.thanh_tien || ((item.so_luong ?? 0) * (item.don_gia_xuat_kho ?? 0)),
        department: item.phong_ban || '',
        person: item.nhan_su || '',
        notes: item.ghi_chu || '',
      });
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'quantity' || field === 'unit_price') {
        const qty = field === 'quantity' ? Number(value) : Number(updated.quantity);
        const price = field === 'unit_price' ? Number(value) : Number(updated.unit_price);
        updated.total_amount = (qty || 0) * (price || 0);
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    onSave({
      ...item,
      ngay_xuat: formData.export_date,
      du_an: formData.project_ref,
      nhom_hang: formData.category,
      ma_hang: formData.item_code,
      ten_hang: formData.item_name,
      thong_so: formData.specs,
      dvt: formData.unit,
      so_luong: Number(formData.quantity) || 0,
      don_gia_xuat_kho: Number(formData.unit_price) || 0,
      thanh_tien: Number(formData.total_amount) || 0,
      phong_ban: formData.department,
      nhan_su: formData.person,
      ghi_chu: formData.notes,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-[700px] p-7 text-slate-800 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-base font-bold text-slate-900 mb-5">
          Sửa bản ghi — Năm {year}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3.5">
            {/* Row 1: month & export_date */}
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                month
              </label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                export_date
              </label>
              <input
                type="text"
                value={formData.export_date}
                onChange={(e) => handleChange('export_date', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>

            {/* Row 2: project_ref & category */}
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                project_ref
              </label>
              <input
                type="text"
                value={formData.project_ref}
                onChange={(e) => handleChange('project_ref', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>

            {/* Row 3: item_code & item_name */}
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                item_code
              </label>
              <input
                type="text"
                value={formData.item_code}
                onChange={(e) => handleChange('item_code', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                item_name
              </label>
              <input
                type="text"
                value={formData.item_name}
                onChange={(e) => handleChange('item_name', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>

            {/* Row 4: specs & unit */}
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                specs
              </label>
              <input
                type="text"
                value={formData.specs}
                onChange={(e) => handleChange('specs', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                unit
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => handleChange('unit', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>

            {/* Row 5: quantity & unit_price */}
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                quantity
              </label>
              <input
                type="number"
                value={formData.quantity === 0 ? '' : formData.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                unit_price
              </label>
              <input
                type="number"
                value={formData.unit_price === 0 ? '' : formData.unit_price}
                onChange={(e) => handleChange('unit_price', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>

            {/* Row 6: total_amount & department */}
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                total_amount
              </label>
              <input
                type="number"
                value={formData.total_amount === 0 ? '' : formData.total_amount}
                onChange={(e) => handleChange('total_amount', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>

            {/* Row 7: person & notes */}
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                person
              </label>
              <input
                type="text"
                value={formData.person}
                onChange={(e) => handleChange('person', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-normal mb-1">
                notes
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-colors"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-7 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#406c89] hover:bg-[#345870] active:bg-[#2a475b] text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
