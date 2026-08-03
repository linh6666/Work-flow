"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconPlus, IconTrash } from '@tabler/icons-react';
import { LoaiKhachHang, KhachHangItem } from '../../../../KhachHang';

interface NguoiLienHeItem {
  id: string;
  hoTen: string;
  dienThoai: string;
  chucDanh: string;
}

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

  // Danh sách người liên hệ
  const [danhSachLienHe, setDanhSachLienHe] = useState<NguoiLienHeItem[]>([
    { id: '1', hoTen: '', dienThoai: '', chucDanh: '' },
  ]);

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
      setDanhSachLienHe([{ id: Date.now().toString(), hoTen: '', dienThoai: '', chucDanh: '' }]);
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

  const handleAddContact = () => {
    setDanhSachLienHe([
      ...danhSachLienHe,
      { id: Date.now().toString(), hoTen: '', dienThoai: '', chucDanh: '' },
    ]);
  };

  const handleRemoveContact = (id: string) => {
    if (danhSachLienHe.length === 1) {
      setDanhSachLienHe([{ id: Date.now().toString(), hoTen: '', dienThoai: '', chucDanh: '' }]);
    } else {
      setDanhSachLienHe(danhSachLienHe.filter(c => c.id !== id));
    }
  };

  const handleContactChange = (id: string, field: keyof NguoiLienHeItem, value: string) => {
    setDanhSachLienHe(
      danhSachLienHe.map(c => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ten.trim()) return;

    const mainContact = danhSachLienHe[0] || { hoTen: '', dienThoai: '' };

    onSave({
      ma: ma.trim() || suggestedMa,
      ten: ten.trim(),
      loai,
      daiDienHoTen: daiDienHoTen.trim(),
      daiDienChucDanh: daiDienChucDanh.trim(),
      nguoiLienHe: mainContact.hoTen.trim(),
      dienThoai: mainContact.dienThoai.trim(),
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
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-3">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl border border-slate-100 overflow-hidden flex flex-col max-h-[88vh] transform transition-all scale-100">
        {/* Modal Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100 shrink-0">
          <h3 className="text-sm font-bold text-slate-900">Thêm khách hàng mới</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-50 transition-all cursor-pointer"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          {/* Scrollable Form Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-2.5 text-left">
            {/* Row 1: Mã KH & Loại khách hàng */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Mã KH (tự động)
                </label>
                <input
                  type="text"
                  value={ma}
                  onChange={e => setMa(e.target.value)}
                  className="w-full text-[11px] bg-[#f8fafc] border border-slate-200/80 rounded-md px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#406c89] transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Loại khách hàng
                </label>
                <div className="relative">
                  <select
                    value={loai}
                    onChange={e => setLoai(e.target.value as LoaiKhachHang)}
                    className="w-full text-[11px] bg-[#f8fafc] border border-slate-200/80 rounded-md px-2.5 py-1.5 text-slate-800 font-medium appearance-none focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#406c89] cursor-pointer pr-7"
                  >
                    <option value="Tiềm năng">Tiềm năng</option>
                    <option value="Thân thiết">Thân thiết</option>
                    <option value="Đang giao dịch">Đang giao dịch</option>
                    <option value="Không hoạt động">Không hoạt động</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                    <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Tên công ty / Khách hàng */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Tên công ty / Khách hàng *
              </label>
              <input
                type="text"
                required
                placeholder="CÔNG TY CỔ PHẦN..."
                value={ten}
                onChange={e => setTen(e.target.value)}
                className="w-full text-[11px] bg-[#f8fafc] border border-slate-200/80 rounded-md px-2.5 py-1.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#406c89] transition-all font-medium"
              />
            </div>

            {/* Section 1: NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT */}
            <div className="border border-slate-200/70 bg-[#f8fafc]/50 p-2.5 rounded-lg space-y-2">
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    placeholder="Ông/Bà Nguyễn Văn A"
                    value={daiDienHoTen}
                    onChange={e => setDaiDienHoTen(e.target.value)}
                    className="w-full text-[11px] bg-[#f8fafc] border border-slate-200/80 rounded-md px-2.5 py-1.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#406c89] transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    Chức danh ký hợp đồng
                  </label>
                  <input
                    type="text"
                    placeholder="Giám đốc / Chủ tịch HĐQT"
                    value={daiDienChucDanh}
                    onChange={e => setDaiDienChucDanh(e.target.value)}
                    className="w-full text-[11px] bg-[#f8fafc] border border-slate-200/80 rounded-md px-2.5 py-1.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#406c89] transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: DANH SÁCH NGƯỜI LIÊN HỆ */}
            <div className="border border-slate-200/70 bg-[#f8fafc]/50 p-2.5 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  DANH SÁCH NGƯỜI LIÊN HỆ
                </span>
                <button
                  type="button"
                  onClick={handleAddContact}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[10px] font-semibold rounded-md shadow-2xs transition-colors cursor-pointer"
                >
                  <IconPlus size={12} className="text-slate-500" />
                  <span>Thêm người liên hệ</span>
                </button>
              </div>

              {/* Dynamic Contact Rows */}
              <div className="space-y-1.5">
                {danhSachLienHe.map((contact, idx) => (
                  <div key={contact.id} className="grid grid-cols-12 gap-1.5 items-center">
                    <div className="col-span-4">
                      {idx === 0 && (
                        <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                          Họ tên
                        </label>
                      )}
                      <input
                        type="text"
                        placeholder="Người liên hệ"
                        value={contact.hoTen}
                        onChange={e => handleContactChange(contact.id, 'hoTen', e.target.value)}
                        className="w-full text-[11px] bg-[#f8fafc] border border-slate-200/80 rounded-md px-2.5 py-1.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#406c89] transition-all font-medium"
                      />
                    </div>

                    <div className="col-span-3">
                      {idx === 0 && (
                        <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                          Điện thoại
                        </label>
                      )}
                      <input
                        type="text"
                        placeholder="SĐT"
                        value={contact.dienThoai}
                        onChange={e => handleContactChange(contact.id, 'dienThoai', e.target.value)}
                        className="w-full text-[11px] bg-[#f8fafc] border border-slate-200/80 rounded-md px-2.5 py-1.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#406c89] transition-all font-medium"
                      />
                    </div>

                    <div className="col-span-4">
                      {idx === 0 && (
                        <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                          Chức danh
                        </label>
                      )}
                      <input
                        type="text"
                        placeholder="Trưởng phòng"
                        value={contact.chucDanh}
                        onChange={e => handleContactChange(contact.id, 'chucDanh', e.target.value)}
                        className="w-full text-[11px] bg-[#f8fafc] border border-slate-200/80 rounded-md px-2.5 py-1.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#406c89] transition-all font-medium"
                      />
                    </div>

                    <div className={`col-span-1 flex justify-center ${idx === 0 ? 'mt-4' : ''}`}>
                      <button
                        type="button"
                        onClick={() => handleRemoveContact(contact.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Xoá người liên hệ"
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-slate-400 leading-tight">
                Người liên hệ đầu tiên được dùng làm liên hệ chính hiển thị ở bảng khách hàng.
              </p>
            </div>

            {/* Row: Email */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full text-[11px] bg-[#f8fafc] border border-slate-200/80 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#406c89] transition-all font-medium"
              />
            </div>

            {/* Row: Địa chỉ */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Địa chỉ
              </label>
              <input
                type="text"
                value={diaChi}
                onChange={e => setDiaChi(e.target.value)}
                className="w-full text-[11px] bg-[#f8fafc] border border-slate-200/80 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#406c89] transition-all font-medium"
              />
            </div>

            {/* Row: Mã số thuế & Nguồn khách hàng */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Mã số thuế
                </label>
                <input
                  type="text"
                  value={maSoThue}
                  onChange={e => setMaSoThue(e.target.value)}
                  className="w-full text-[11px] bg-[#f8fafc] border border-slate-200/80 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#406c89] transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Nguồn khách hàng
                </label>
                <input
                  type="text"
                  placeholder="Giới thiệu, website..."
                  value={nguonKhachHang}
                  onChange={e => setNguonKhachHang(e.target.value)}
                  className="w-full text-[11px] bg-[#f8fafc] border border-slate-200/80 rounded-md px-2.5 py-1.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#406c89] transition-all font-medium"
                />
              </div>
            </div>

            {/* Row: Số tài khoản & Ngân hàng */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Số tài khoản
                </label>
                <input
                  type="text"
                  value={soTaiKhoan}
                  onChange={e => setSoTaiKhoan(e.target.value)}
                  className="w-full text-[11px] bg-[#f8fafc] border border-slate-200/80 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#406c89] transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Ngân hàng
                </label>
                <input
                  type="text"
                  value={nganHang}
                  onChange={e => setNganHang(e.target.value)}
                  className="w-full text-[11px] bg-[#f8fafc] border border-slate-200/80 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#406c89] transition-all font-medium"
                />
              </div>
            </div>

            {/* Row: Ghi chú */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Ghi chú
              </label>
              <textarea
                value={ghiChu}
                onChange={e => setGhiChu(e.target.value)}
                rows={2}
                className="w-full text-[11px] bg-[#f8fafc] border border-slate-200/80 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#406c89] transition-all font-medium resize-none"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-md text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#406c89] hover:bg-[#345972] active:scale-95 text-white rounded-md text-[11px] font-bold transition-all cursor-pointer shadow-sm shadow-[#406c89]/20"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
