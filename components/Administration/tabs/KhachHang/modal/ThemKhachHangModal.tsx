"use client";

import React, { useState, useEffect } from 'react';
import { IconX } from '@tabler/icons-react';
import { LoaiKhachHang, KhachHangItem } from '../index';

interface ThemKhachHangModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (khachHang: Omit<KhachHangItem, 'id'>) => void;
  suggestedMa: string;
}

export default function ThemKhachHangModal({
  isOpen,
  onClose,
  onSave,
  suggestedMa,
}: ThemKhachHangModalProps) {
  const [ma, setMa] = useState('');
  const [loai, setLoai] = useState<LoaiKhachHang>('Tiềm năng');
  const [ten, setTen] = useState('');
  
  // Người đại diện pháp luật
  const [daiDienHoTen, setDaiDienHoTen] = useState('');
  const [daiDienChucDanh, setDaiDienChucDanh] = useState('');
  
  const [nguoiLienHe, setNguoiLienHe] = useState('');
  const [dienThoai, setDienThoai] = useState('');
  const [email, setEmail] = useState('');
  const [diaChi, setDiaChi] = useState('');
  
  const [maSoThue, setMaSoThue] = useState('');
  const [nguonKhachHang, setNguonKhachHang] = useState('');
  const [soTaiKhoan, setSoTaiKhoan] = useState('');
  const [nganHang, setNganHang] = useState('');
  const [ghiChu, setGhiChu] = useState('');

  // Reset form values when modal opens
  useEffect(() => {
    if (isOpen) {
      setMa(suggestedMa);
      setLoai('Tiềm năng');
      setTen('');
      setDaiDienHoTen('');
      setDaiDienChucDanh('');
      setNguoiLienHe('');
      setDienThoai('');
      setEmail('');
      setDiaChi('');
      setMaSoThue('');
      setNguonKhachHang('');
      setSoTaiKhoan('');
      setNganHang('');
      setGhiChu('');
    }
  }, [isOpen, suggestedMa]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ten.trim()) return;

    onSave({
      ma: ma.trim() || suggestedMa,
      ten: ten.trim(),
      loai,
      daiDienHoTen: daiDienHoTen.trim(),
      daiDienChucDanh: daiDienChucDanh.trim(),
      nguoiLienHe: nguoiLienHe.trim(),
      dienThoai: dienThoai.trim(),
      email: email.trim(),
      diaChi: diaChi.trim(),
      maSoThue: maSoThue.trim(),
      nguonKhachHang: nguonKhachHang.trim(),
      soTaiKhoan: soTaiKhoan.trim(),
      nganHang: nganHang.trim(),
      ghiChu: ghiChu.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-4">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] transform transition-all scale-100 animate-scale-up">
        
        {/* Modal Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100 shrink-0">
          <h3 className="text-xl font-bold text-slate-800">Thêm khách hàng mới</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          
          {/* Scrollable Form Body */}
          <div 
            className="flex-1 overflow-y-auto no-scrollbar px-6 py-5 space-y-4 text-left"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            
            {/* Row 1: Mã KH & Loại khách hàng */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Mã KH (tự động)
                </label>
                <input 
                  type="text" 
                  value={ma}
                  onChange={(e) => setMa(e.target.value)}
                  className="w-full text-sm bg-white border border-indigo-500 rounded-lg px-3.5 py-2.5 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Loại khách hàng
                </label>
                <div className="relative">
                  <select
                    value={loai}
                    onChange={(e) => setLoai(e.target.value as LoaiKhachHang)}
                    className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Tiềm năng">Tiềm năng</option>
                    <option value="Thân thiết">Thân thiết</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Tên công ty / Khách hàng */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Tên công ty / Khách hàng *
              </label>
              <input 
                type="text" 
                required
                placeholder="CÔNG TY CỔ PHẦN..."
                value={ten}
                onChange={(e) => setTen(e.target.value)}
                className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
              />
            </div>

            {/* Section: Người đại diện theo pháp luật */}
            <div className="border border-slate-100 bg-slate-50/50 p-4 rounded-xl space-y-3.5">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                Người đại diện theo pháp luật
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Họ và tên
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ông/Bà Nguyễn Văn A"
                    value={daiDienHoTen}
                    onChange={(e) => setDaiDienHoTen(e.target.value)}
                    className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Chức danh ký hợp đồng
                  </label>
                  <input 
                    type="text" 
                    placeholder="Giám đốc / Chủ tịch HĐQT"
                    value={daiDienChucDanh}
                    onChange={(e) => setDaiDienChucDanh(e.target.value)}
                    className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Người liên hệ & Điện thoại */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Người liên hệ
                </label>
                <input 
                  type="text" 
                  value={nguoiLienHe}
                  onChange={(e) => setNguoiLienHe(e.target.value)}
                  className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Điện thoại
                </label>
                <input 
                  type="tel" 
                  value={dienThoai}
                  onChange={(e) => setDienThoai(e.target.value)}
                  className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Row 5: Email */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Email
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
              />
            </div>

            {/* Row 6: Địa chỉ */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Địa chỉ
              </label>
              <input 
                type="text" 
                value={diaChi}
                onChange={(e) => setDiaChi(e.target.value)}
                className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
              />
            </div>

            {/* Row 7: Mã số thuế & Nguồn khách hàng */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Mã số thuế
                </label>
                <input 
                  type="text" 
                  value={maSoThue}
                  onChange={(e) => setMaSoThue(e.target.value)}
                  className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Nguồn khách hàng
                </label>
                <input 
                  type="text" 
                  placeholder="Giới thiệu, website..."
                  value={nguonKhachHang}
                  onChange={(e) => setNguonKhachHang(e.target.value)}
                  className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Row 8: Số tài khoản & Ngân hàng */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Số tài khoản
                </label>
                <input 
                  type="text" 
                  value={soTaiKhoan}
                  onChange={(e) => setSoTaiKhoan(e.target.value)}
                  className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Ngân hàng
                </label>
                <input 
                  type="text" 
                  value={nganHang}
                  onChange={(e) => setNganHang(e.target.value)}
                  className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Row 9: Ghi chú */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Ghi chú
              </label>
              <textarea 
                value={ghiChu}
                onChange={(e) => setGhiChu(e.target.value)}
                rows={3}
                className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium resize-none"
              />
            </div>

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-2xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-sm shadow-indigo-600/10"
            >
              Lưu
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
