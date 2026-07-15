"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconFileText } from '@tabler/icons-react';
import { KhachHangItem } from '../index';

interface LapDxbgModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  customer: KhachHangItem | null;
  customers: KhachHangItem[];
}

const ANH_SANG_OPTIONS = [
  'Ánh sáng lõi công trình',
  'Ánh sáng công trình ngẫu nhiên',
  'Ánh sáng Cảnh quan',
];

const CONG_NGHE_OPTIONS = [
  'Hệ thống ánh sáng điều khiển Galaxy Tab',
  'Hệ thống điều khiển màn hình cảm ứng',
  'Hệ thống điều khiển nền tảng Web',
  'Hệ thống âm thanh',
  'Hệ thống Projection Mapping',
  'Công nghệ AR',
  'Hệ thống quản lý bán hàng',
  'Hệ thống quản lý dự án',
];

const LOAI_CHAN_OPTIONS = [
  'Chọn loại chân...',
  'Chân gỗ',
  'Chân sắt',
  'Chân mica',
  'Khác',
];

const KINH_OPTIONS = [
  'Chọn loại kính...',
  'Kính cường lực',
  'Kính thường',
  'Kính acrylic',
  'Không kính',
];

export default function LapDxbgModal({
  isOpen,
  onClose,
  onSave,
  customer,
  customers = [],
}: LapDxbgModalProps) {
  const [ngay, setNgay] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [donViLienHe, setDonViLienHe] = useState('');
  const [nguoiLienHe, setNguoiLienHe] = useState('');
  const [noiDung, setNoiDung] = useState('');
  const [tenDuAn, setTenDuAn] = useState('');

  // Thông tin mô hình
  const [tyLe, setTyLe] = useState('');
  const [kichThuoc, setKichThuoc] = useState('');
  const [diaDiem, setDiaDiem] = useState('');
  const [loaiChan, setLoaiChan] = useState('');
  const [kinh, setKinh] = useState('');
  const [anhSang, setAnhSang] = useState<string[]>([]);
  const [congNghe, setCongNghe] = useState<string[]>([]);
  
  // Các thông tin bổ sung cuối form
  const [tinhTrangHoSo, setTinhTrangHoSo] = useState('');
  const [tgBaoGia, setTgBaoGia] = useState('');
  const [tgMoHinh, setTgMoHinh] = useState('');
  const [linkHoSo, setLinkHoSo] = useState('');
  const [ghiChuThem, setGhiChuThem] = useState('');

  // Reset and pre-fill fields when modal opens
  useEffect(() => {
    if (isOpen && customer) {
      const today = new Date().toISOString().split('T')[0];
      setNgay(today);
      setSelectedCustomerId(customer.id);
      setDonViLienHe(customer.ten);
      setNguoiLienHe(customer.nguoiLienHe);
      setNoiDung('');
      setTenDuAn('');

      setTyLe('');
      setKichThuoc('');
      setDiaDiem('');
      setLoaiChan('');
      setKinh('');
      setAnhSang([]);
      setCongNghe([]);

      setTinhTrangHoSo('');
      setTgBaoGia('');
      setTgMoHinh('');
      setLinkHoSo('');
      setGhiChuThem('');
    }
  }, [isOpen, customer]);

  if (!isOpen || !customer) return null;

  const handleCustomerChange = (id: string) => {
    setSelectedCustomerId(id);
    const found = customers.find(c => c.id === id);
    if (found) {
      setDonViLienHe(found.ten);
      setNguoiLienHe(found.nguoiLienHe);
    }
  };

  const toggleAnhSang = (val: string) => {
    setAnhSang(prev => 
      prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]
    );
  };

  const toggleCongNghe = (val: string) => {
    setCongNghe(prev => 
      prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !ngay || 
      !donViLienHe.trim() || 
      !nguoiLienHe.trim() || 
      !noiDung.trim() || 
      !tenDuAn.trim() ||
      !tyLe.trim() ||
      !kichThuoc.trim() ||
      !diaDiem.trim() ||
      !loaiChan ||
      !kinh ||
      !tinhTrangHoSo.trim() ||
      !tgBaoGia.trim() ||
      !tgMoHinh.trim() ||
      !linkHoSo.trim()
    ) {
      return;
    }

    onSave({
      ngay,
      khachHangId: selectedCustomerId,
      donViLienHe: donViLienHe.trim(),
      nguoiLienHe: nguoiLienHe.trim(),
      noiDung: noiDung.trim(),
      tenDuAn: tenDuAn.trim(),
      tyLe: tyLe.trim(),
      kichThuoc: kichThuoc.trim(),
      diaDiem: diaDiem.trim(),
      loaiChan,
      kinh,
      anhSang,
      congNghe,
      tinhTrangHoSo: tinhTrangHoSo.trim(),
      tgBaoGia: tgBaoGia.trim(),
      tgMoHinh: tgMoHinh.trim(),
      linkHoSo: linkHoSo.trim(),
      ghiChuThem: ghiChuThem.trim(),
    });

    alert('Lập đề xuất báo giá thành công!');
    onClose();
  };

  const currentSelectedCustomer = customers.find(c => c.id === selectedCustomerId) || customer;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-4">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] transform transition-all scale-100 animate-scale-up">
        
        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <IconFileText size={22} className="text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-800">Chỉnh sửa hợp đồng</h3>
          </div>
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
            className="flex-1 overflow-y-auto no-scrollbar px-6 py-5 space-y-5 text-left"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            
            {/* Banner Section */}
            <div className="bg-indigo-600 text-white rounded-xl py-4.5 px-6 text-center select-none shadow-sm">
              <h4 className="text-base font-extrabold tracking-wider">ĐỀ XUẤT BÁO GIÁ</h4>
              <p className="text-[10px] text-indigo-200 font-bold tracking-widest mt-0.5 uppercase">Model Quotation Request</p>
            </div>

            {/* Date Picker */}
            <div className="w-1/2">
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Ngày / Date *
              </label>
              <input 
                type="date" 
                required
                value={ngay}
                onChange={(e) => setNgay(e.target.value)}
                className="w-full text-sm bg-white border border-indigo-500 rounded-lg px-3.5 py-2 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              />
            </div>

            {/* CRM Customer Box */}
            <div className="border border-indigo-100 bg-[#f8fafc] p-4 rounded-xl space-y-2">
              <label className="block text-[12px] font-bold text-indigo-600">
                Khách hàng (từ CRM)
              </label>
              <div className="relative">
                <select
                  value={selectedCustomerId}
                  onChange={(e) => handleCustomerChange(e.target.value)}
                  className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.ten}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              <div className="text-xs text-indigo-500 font-semibold pt-1 flex items-center gap-1 select-none">
                <span>✓</span> {currentSelectedCustomer?.ten}
              </div>
            </div>

            {/* Contact Company */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Đơn vị liên hệ / Contact Company *
              </label>
              <input 
                type="text" 
                required
                value={donViLienHe}
                onChange={(e) => setDonViLienHe(e.target.value)}
                className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Contact Person */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Người liên hệ / Contact Person *
              </label>
              <input 
                type="text" 
                required
                value={nguoiLienHe}
                onChange={(e) => setNguoiLienHe(e.target.value)}
                className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Quoting Content */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Nội dung yêu cầu KH gửi / Quoting content *
              </label>
              <textarea 
                required
                placeholder="Mô tả chi tiết nội dung yêu cầu báo giá của khách hàng..."
                value={noiDung}
                onChange={(e) => setNoiDung(e.target.value)}
                rows={3.5}
                className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none font-medium"
              />
            </div>

            {/* Project / Model Name */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Tên mô hình / dự án *
              </label>
              <input 
                type="text" 
                required
                placeholder="VD: Dự án Tòa nhà A, Mô hình Quy hoạch..."
                value={tenDuAn}
                onChange={(e) => setTenDuAn(e.target.value)}
                className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
              />
            </div>

            {/* SECTION: THÔNG TIN MÔ HÌNH */}
            <div className="border border-slate-200 bg-slate-50/50 p-5 rounded-2xl space-y-4">
              <span className="block text-xs font-bold text-slate-500 tracking-wide select-none">
                THÔNG TIN MÔ HÌNH
              </span>
              
              {/* Tỷ lệ & Kích thước */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Tỷ lệ mô hình *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="VD: 1/500, 1/1000..."
                    value={tyLe}
                    onChange={(e) => setTyLe(e.target.value)}
                    className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Kích thước dự kiến *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="VD: 2.4m x 1.8m..."
                    value={kichThuoc}
                    onChange={(e) => setKichThuoc(e.target.value)}
                    className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                  />
                </div>
              </div>

              {/* Địa điểm lắp đặt */}
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Địa điểm lắp đặt mô hình *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Địa chỉ lắp đặt..."
                  value={diaDiem}
                  onChange={(e) => setDiaDiem(e.target.value)}
                  className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                />
              </div>

              {/* Loại chân & Kính */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Loại chân *
                  </label>
                  <div className="relative">
                    <select
                      value={loaiChan}
                      onChange={(e) => setLoaiChan(e.target.value)}
                      className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                    >
                      {LOAI_CHAN_OPTIONS.map((opt) => (
                        <option key={opt} value={opt === 'Chọn loại chân...' ? '' : opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Kính *
                  </label>
                  <div className="relative">
                    <select
                      value={kinh}
                      onChange={(e) => setKinh(e.target.value)}
                      className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                    >
                      {KINH_OPTIONS.map((opt) => (
                        <option key={opt} value={opt === 'Chọn loại kính...' ? '' : opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ánh sáng */}
              <div className="space-y-1.5">
                <label className="block text-[13px] font-semibold text-slate-700">
                  Ánh sáng (chọn một hoặc nhiều)
                </label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {ANH_SANG_OPTIONS.map((opt) => {
                    const isSelected = anhSang.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleAnhSang(opt)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none ${
                          isSelected
                            ? 'bg-[#2b3bb3] text-white border-transparent shadow-2xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Công nghệ */}
              <div className="space-y-1.5">
                <label className="block text-[13px] font-semibold text-slate-700">
                  Công nghệ (chọn một hoặc nhiều)
                </label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {CONG_NGHE_OPTIONS.map((opt) => {
                    const isSelected = congNghe.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleCongNghe(opt)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none ${
                          isSelected
                            ? 'bg-[#2b3bb3] text-white border-transparent shadow-2xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Tình trạng hồ sơ */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Tình trạng hồ sơ / Drawing Status *
              </label>
              <input 
                type="text" 
                required
                placeholder="VD: Có đầy đủ bản vẽ CAD / Chỉ có bản vẽ PDF..."
                value={tinhTrangHoSo}
                onChange={(e) => setTinhTrangHoSo(e.target.value)}
                className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
              />
            </div>

            {/* Thời gian cần Báo giá & Thời gian cần Mô hình */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Thời gian cần Báo giá / Quotation time *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="VD: 3 ngày làm việc..."
                  value={tgBaoGia}
                  onChange={(e) => setTgBaoGia(e.target.value)}
                  className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Thời gian cần Mô hình / Model needing time *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="VD: 60 ngày..."
                  value={tgMoHinh}
                  onChange={(e) => setTgMoHinh(e.target.value)}
                  className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                />
              </div>
            </div>

            {/* Đường dẫn lưu hồ sơ */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Đường dẫn lưu hồ sơ / Document Shortcut *
              </label>
              <input 
                type="text" 
                required
                placeholder="Link Google Drive, SharePoint..."
                value={linkHoSo}
                onChange={(e) => setLinkHoSo(e.target.value)}
                className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
              />
            </div>

            {/* Ghi chú thêm */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Ghi chú thêm
              </label>
              <textarea 
                placeholder="Ghi chú khác..."
                value={ghiChuThem}
                onChange={(e) => setGhiChuThem(e.target.value)}
                rows={3}
                className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium resize-none"
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
              className="px-5 py-2.5 bg-[#3f51b5] hover:bg-indigo-700 active:scale-95 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-sm shadow-indigo-600/10"
            >
              Gửi đề xuất
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
