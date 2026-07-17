"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';

interface StaffData {
  id: string;
  name: string;
  role: string;
  price: string;
  notes?: string;
}

interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: StaffData | null;
  deptName: string;
  onSave: (updatedStaff: StaffData & { dept: string }) => void;
}

const DEPARTMENTS_LIST = [
  { name: 'Ban Giám đốc', display: 'Ban Giám đốc' },
  { name: 'Văn phòng', display: 'Khối Văn phòng' },
  { name: 'Lắp đặt', display: 'Phòng Lắp đặt' },
  { name: 'Công nghệ và Thiết kế', display: 'Phòng Công nghệ và Thiết kế' },
  { name: 'Cảnh Quan', display: 'Phòng Cảnh Quan' },
  { name: 'Cắt', display: 'Phòng Cắt' },
  { name: 'Ghép', display: 'Phòng Ghép' },
  { name: 'Khai triển', display: 'Phòng Khai triển' },
  { name: 'Mộc Sơn', display: 'Phòng Mộc Sơn' },
  { name: 'Điện', display: 'Phòng Điện' },
];

const ROLES_LIST = ['KTV chính', 'KTV phụ', 'Trưởng phòng', 'Giám đốc', 'Phó Giám đốc'];

export default function EditStaffModal({ isOpen, onClose, staff, deptName, onSave }: EditStaffModalProps) {
  const [dept, setDept] = useState(deptName);
  const [staffId, setStaffId] = useState('');
  const [role, setRole] = useState('KTV chính');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');

  // Sync state with staff data when modal opens
  useEffect(() => {
    if (isOpen && staff) {
      setDept(deptName);
      setStaffId(staff.id.split('_')[0]); // Strip uniqueness suffix if present
      setRole(staff.role);
      setName(staff.name);
      
      // Strip currency text to show clean number for editing
      const cleanPrice = staff.price.replace(/[^\d]/g, '');
      setPrice(cleanPrice);
      setNotes(staff.notes || '');
    }
  }, [isOpen, staff, deptName]);

  if (!isOpen || !staff) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffId.trim() || !name.trim() || !price.trim()) {
      alert('Vui lòng điền đầy đủ thông tin nhân viên!');
      return;
    }

    let formattedPrice = price.trim();
    if (!formattedPrice.endsWith('đ') && !formattedPrice.endsWith('USD')) {
      const numeric = Number(formattedPrice.replace(/\D/g, ''));
      formattedPrice = (numeric || 0).toLocaleString('vi-VN') + ' đ';
    }

    onSave({
      id: staff.id, // Preserve original unique ID to find and replace correctly
      name: name.trim(),
      role,
      price: formattedPrice,
      dept,
      notes: notes.trim(),
    });
    onClose();
  };

  // Helper to format numeric display text
  const getHelperPriceText = () => {
    const rawNumber = price.replace(/\D/g, '');
    if (!rawNumber) return '0 đ/ngày';
    return Number(rawNumber).toLocaleString('vi-VN') + ' đ/ngày';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content Card */}
      <div className="relative bg-white w-full max-w-[430px] rounded-2xl shadow-lg border border-slate-100/50 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-slate-800">Chỉnh sửa nhân viên</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-655 transition-colors cursor-pointer bg-transparent border-0"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          
          {/* Phòng ban */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-slate-700">Phòng ban</label>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full px-3 py-2.5 font-semibold rounded-xl border border-indigo-500 bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              {DEPARTMENTS_LIST.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.display}
                </option>
              ))}
            </select>
          </div>

          {/* Row: Mã nhân viên & Vai trò */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Mã nhân viên */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-700">Mã nhân viên</label>
              <input
                type="text"
                required
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                placeholder="NV001"
                className="w-full px-4 py-2.5 font-semibold rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400/80 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Vai trò */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-700">Vai trò</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2.5 font-semibold rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
              >
                {ROLES_LIST.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Họ tên nhân viên */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-slate-700">
              Họ tên nhân viên <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full px-4 py-2.5 font-semibold rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400/80 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Đơn giá/ngày (VNĐ) */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-slate-700">Đơn giá/ngày (VNĐ)</label>
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="350000"
              className="w-full px-4 py-2.5 font-semibold rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400/80 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            {/* Helper Text formatted like image */}
            <span className="text-[10px] text-slate-400 mt-0.5 ml-1 block font-semibold">
              {getHelperPriceText()}
            </span>
          </div>

          {/* Ghi chú */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-slate-700">Ghi chú</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="..."
              className="w-full px-4 py-2.5 font-semibold rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400/80 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-slate-650 hover:bg-slate-50 rounded-xl transition-all cursor-pointer bg-white border border-slate-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-[#2b2c7c] hover:bg-[#1e1f57] rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer border-0"
            >
              <IconDeviceFloppy size={16} />
              Lưu
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
