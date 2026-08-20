"use client";

import React, { useState } from 'react';

interface TaoLienHeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (newContact: any) => void;
}

export default function TaoLienHeModal({
  isOpen,
  onClose,
  onSubmitSuccess,
}: TaoLienHeModalProps) {
  const [phuongThuc, setPhuongThuc] = useState('');
  const [donVi, setDonVi] = useState('');
  const [nguoiLienHe, setNguoiLienHe] = useState('');
  const [sdt, setSdt] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donVi.trim()) return;

    const newContact = {
      id: `lh-${Date.now()}`,
      stt: Date.now(),
      donVi: donVi.trim(),
      phuongThuc: phuongThuc.trim() || 'Chưa cập nhật',
      nguoiLienHe: nguoiLienHe.trim() || 'Chưa cập nhật',
      sdt: sdt.trim() ? [sdt.trim()] : ['Chưa có SĐT'],
      email: email.trim() ? `${nguoiLienHe.trim() || donVi.trim()} <${email.trim()}>` : '',
    };

    if (onSubmitSuccess) {
      onSubmitSuccess(newContact);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in select-none">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-[620px] w-full flex flex-col overflow-hidden p-6 sm:p-7 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Title Header */}
        <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight mb-5">
          Tạo mới liên hệ vận chuyển
        </h2>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Field 1: Phương thức chuyển hàng */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Phương thức chuyển hàng
            </label>
            <input
              type="text"
              value={phuongThuc}
              onChange={(e) => setPhuongThuc(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] transition-colors"
            />
          </div>

          {/* Field 2: Đơn vị vận chuyển * */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Đơn vị vận chuyển <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={donVi}
              onChange={(e) => setDonVi(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] transition-colors"
            />
          </div>

          {/* Field 3 & 4 (2 Columns): Người liên hệ & SĐT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Người liên hệ
              </label>
              <input
                type="text"
                value={nguoiLienHe}
                onChange={(e) => setNguoiLienHe(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] transition-colors"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                SĐT
              </label>
              <input
                type="text"
                value={sdt}
                onChange={(e) => setSdt(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] transition-colors"
              />
            </div>
          </div>

          {/* Field 5: Email (Aligned under Người liên hệ, half width) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] transition-colors"
              />
            </div>
          </div>

          {/* Divider Line & Footer Buttons */}
          <div className="pt-4 mt-6 border-t border-slate-200/80 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-1.5 border border-slate-200/90 text-slate-700 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-1.5 bg-[#406c89] hover:bg-[#345870] text-white text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              Lưu
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
