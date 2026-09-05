"use client";

import React, { useState, useEffect } from 'react';
import { NhapKhoItem } from '../../index';

interface SuaVatTuModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: NhapKhoItem | null;
  onSave: (updatedItem: NhapKhoItem) => void;
}

export default function SuaVatTuModal({
  isOpen,
  onClose,
  item,
  onSave,
}: SuaVatTuModalProps) {
  const [formData, setFormData] = useState({
    month: '1',
    export_date: '2026-01-20',
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
      const parts = item.ngay_nhap ? item.ngay_nhap.split('/') : [];
      const m = parts.length >= 2 ? String(parseInt(parts[1], 10)) : '1';
      const formattedDate = parts.length === 3 
        ? `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`
        : item.ngay_nhap;

      const qty = item.so_luong || 0;
      const price = item.don_gia_nhap || 0;
      const total = item.thanh_tien || qty * price;

      setFormData({
        month: (item as any).month || m,
        export_date: formattedDate,
        project_ref: item.du_an || '',
        category: item.nhom_hang || '',
        item_code: item.ma_hang || '',
        item_name: item.ten_hang || '',
        specs: item.thong_so || '0',
        unit: item.dvt || '',
        quantity: qty,
        unit_price: price,
        total_amount: total,
        department: (item as any).department || item.ncc || '',
        person: (item as any).person || item.lien_he_ncc || '',
        notes: (item as any).notes || '',
      });
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'quantity' || field === 'unit_price') {
        const q = field === 'quantity' ? Number(value) : Number(updated.quantity);
        const p = field === 'unit_price' ? Number(value) : Number(updated.unit_price);
        updated.total_amount = (q || 0) * (p || 0);
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    // Chuyển export_date (YYYY-MM-DD) về lại DD/MM/YYYY nếu cần
    let displayDate = formData.export_date;
    if (formData.export_date && formData.export_date.includes('-')) {
      const [y, m, d] = formData.export_date.split('-');
      displayDate = `${d}/${m}/${y}`;
    }

    const updatedItem: NhapKhoItem = {
      ...item,
      ma_hang: formData.item_code,
      ten_hang: formData.item_name,
      nhom_hang: formData.category,
      thong_so: formData.specs,
      dvt: formData.unit,
      so_luong: Number(formData.quantity) || 0,
      don_gia_nhap: Number(formData.unit_price) || 0,
      don_gia_nhap_kho: Number(formData.unit_price) || 0,
      thanh_tien: Number(formData.total_amount) || 0,
      ngay_nhap: displayDate,
      du_an: formData.project_ref,
      ncc: formData.department || item.ncc,
      lien_he_ncc: formData.person || item.lien_he_ncc,
      ...(formData as any),
    };

    onSave(updatedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-2xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-xl p-6 text-slate-700 animate-scale-up">
        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight mb-4">
          Sửa bản ghi — Năm 2026
        </h3>

        {/* Form Body - 2 Columns */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-xs">
            {/* Row 1: month / export_date */}
            <div>
              <label className="block text-[11px] text-slate-400 font-normal mb-1">
                month
              </label>
              <input
                type="text"
                value={formData.month}
                onChange={(e) => handleChange('month', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 font-normal mb-1">
                export_date
              </label>
              <input
                type="text"
                value={formData.export_date}
                onChange={(e) => handleChange('export_date', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all"
              />
            </div>

            {/* Row 2: project_ref / category */}
            <div>
              <label className="block text-[11px] text-slate-400 font-normal mb-1">
                project_ref
              </label>
              <input
                type="text"
                value={formData.project_ref}
                onChange={(e) => handleChange('project_ref', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 font-normal mb-1">
                category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all"
              />
            </div>

            {/* Row 3: item_code / item_name */}
            <div>
              <label className="block text-[11px] text-slate-400 font-normal mb-1">
                item_code
              </label>
              <input
                type="text"
                value={formData.item_code}
                onChange={(e) => handleChange('item_code', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 font-normal mb-1">
                item_name
              </label>
              <input
                type="text"
                value={formData.item_name}
                onChange={(e) => handleChange('item_name', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all"
              />
            </div>

            {/* Row 4: specs / unit */}
            <div>
              <label className="block text-[11px] text-slate-400 font-normal mb-1">
                specs
              </label>
              <input
                type="text"
                value={formData.specs}
                onChange={(e) => handleChange('specs', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 font-normal mb-1">
                unit
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => handleChange('unit', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all"
              />
            </div>

            {/* Row 5: quantity / unit_price */}
            <div>
              <label className="block text-[11px] text-slate-400 font-normal mb-1">
                quantity
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 font-normal mb-1">
                unit_price
              </label>
              <input
                type="number"
                value={formData.unit_price}
                onChange={(e) => handleChange('unit_price', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all"
              />
            </div>

            {/* Row 6: total_amount / department */}
            <div>
              <label className="block text-[11px] text-slate-400 font-normal mb-1">
                total_amount
              </label>
              <input
                type="number"
                value={formData.total_amount}
                onChange={(e) => handleChange('total_amount', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 font-normal mb-1">
                department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all"
              />
            </div>

            {/* Row 7: person / notes */}
            <div>
              <label className="block text-[11px] text-slate-400 font-normal mb-1">
                person
              </label>
              <input
                type="text"
                value={formData.person}
                onChange={(e) => handleChange('person', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 font-normal mb-1">
                notes
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 bg-[#406c89] hover:bg-[#345870] text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
