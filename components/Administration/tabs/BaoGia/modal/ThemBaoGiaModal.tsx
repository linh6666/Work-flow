"use client";

import React, { useState, useEffect } from 'react';
import { IconX } from '@tabler/icons-react';
import { BaoGiaItem } from '../index';

interface ThemBaoGiaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newItem: Omit<BaoGiaItem, 'id'>) => void;
  suggestedSoBg: string;
}

export default function ThemBaoGiaModal({
  isOpen,
  onClose,
  onSave,
  suggestedSoBg,
}: ThemBaoGiaModalProps) {
  const [soBg, setSoBg] = useState('');
  const [loai, setLoai] = useState('Mô hình Quy hoạch');
  const [khachHang, setKhachHang] = useState('');
  const [ngay, setNgay] = useState('');
  const [tongSauThue, setTongSauThue] = useState('1250000000');
  const [trangThai, setTrangThai] = useState<BaoGiaItem['trangThai']>('Đang soạn');

  // Reset form states when modal opens
  useEffect(() => {
    if (isOpen) {
      setSoBg(suggestedSoBg);
      setLoai('Mô hình Quy hoạch');
      setKhachHang('');
      const today = new Date().toISOString().split('T')[0];
      setNgay(today);
      setTongSauThue('1250000000');
      setTrangThai('Đang soạn');
    }
  }, [isOpen, suggestedSoBg]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!soBg.trim() || !khachHang.trim() || !tongSauThue.trim()) return;

    onSave({
      soBg: soBg.trim(),
      loai: loai.trim(),
      khachHang: khachHang.trim(),
      ngay: ngay || new Date().toISOString().split('T')[0],
      tongSauThue: parseFloat(tongSauThue) || 0,
      trangThai,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col transform transition-all animate-scale-up">
        
        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800">Tạo báo giá mới</h3>
          <button 
            type="button"
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            <IconX size={16} />
          </button>
        </div>
        
        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Số BG</label>
            <input
              type="text"
              required
              value={soBg}
              onChange={(e) => setSoBg(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Loại mô hình</label>
            <select
              value={loai}
              onChange={(e) => setLoai(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            >
              <option value="Mô hình Quy hoạch">Mô hình Quy hoạch</option>
              <option value="Mô hình Kiến trúc">Mô hình Kiến trúc</option>
              <option value="Mô hình Nội thất">Mô hình Nội thất</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Khách hàng</label>
            <input
              type="text"
              required
              value={khachHang}
              onChange={(e) => setKhachHang(e.target.value)}
              placeholder="Ví dụ: TỔNG CÔNG TY MBLAND"
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ngày lập</label>
              <input
                type="date"
                required
                value={ngay}
                onChange={(e) => setNgay(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Trạng thái</label>
              <select
                value={trangThai}
                onChange={(e) => setTrangThai(e.target.value as BaoGiaItem['trangThai'])}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              >
                <option value="Đang soạn">Đang soạn</option>
                <option value="Chờ duyệt">Chờ duyệt</option>
                <option value="Đã gửi">Đã gửi</option>
                <option value="Đã chốt">Đã chốt</option>
                <option value="Đã từ chối">Đã từ chối</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tổng sau thuế (VND)</label>
            <input
              type="number"
              required
              value={tongSauThue}
              onChange={(e) => setTongSauThue(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#406c89] hover:bg-[#406c89]/90 text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
