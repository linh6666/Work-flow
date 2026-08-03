"use client";

import React, { useState, useEffect } from 'react';
import {
  IconClipboardList,
  IconX,
  IconChevronDown,
  IconCalendar,
  IconUpload,
  IconTrash,
} from '@tabler/icons-react';

export interface CreateProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    soDX: string;
    donViLienHe: string;
    nguoiLienHe: string;
    dienThoai?: string;
    nguoiLap: string;
    ngay: string;
    trangThai: 'cho-tp' | 'tp-duyet' | 'tp-tu-choi' | 'cho-pgd' | 'pgd-duyet' | 'pgd-tu-choi';
    khachHangCrm?: string;
    noiDungYeuCau?: string;
    tenDuAn?: string;
    tyLeMoHinh?: string;
    kichThuocDuKien?: string;
    diaDiemLapDat?: string;
    loaiChan?: string;
    kinh?: string;
    anhSang?: string[];
    congNghe?: string[];
    tinhTrangHoSo?: string;
    thoiGianBaoGia?: string;
    thoiGianMoHinh?: string;
    duongDanHoSo?: string;
    ghiChu?: string;
    danhSachFile?: File[];
  }) => void;
}

const LIGHT_OPTIONS = [
  'Ánh sáng lõi công trình',
  'Ánh sáng công trình ngẫu nhiên',
  'Ánh sáng Cảnh quan'
];

const TECH_OPTIONS = [
  'Hệ thống ánh sáng điều khiển Galaxy Tab',
  'Hệ thống điều khiển màn hình cảm ứng',
  'Hệ thống điều khiển nền tảng Web',
  'Hệ thống âm thanh',
  'Hệ thống Projection Mapping',
  'Công nghệ AR',
  'Hệ thống quản lý bán hàng',
  'Hệ thống quản lý dự án'
];

export default function CreateProposalModal({ isOpen, onClose, onSubmit }: CreateProposalModalProps) {
  const [soDX, setSoDX] = useState('010-2026/ĐXBG-MHV');
  const [donViLienHe, setDonViLienHe] = useState('');
  const [nguoiLienHe, setNguoiLienHe] = useState('');
  const [dienThoai, setDienThoai] = useState('');
  const [nguoiLap, setNguoiLap] = useState('Thao Phung');
  const [ngay, setNgay] = useState('2026-03-08');
  const [trangThai] = useState<'cho-tp' | 'tp-duyet' | 'tp-tu-choi' | 'cho-pgd' | 'pgd-duyet' | 'pgd-tu-choi'>('cho-tp');
  
  // Form fields
  const [khachHangCrm, setKhachHangCrm] = useState('');
  const [noiDungYeuCau, setNoiDungYeuCau] = useState('');
  const [tenDuAn, setTenDuAn] = useState('');
  const [tyLeMoHinh, setTyLeMoHinh] = useState('');
  const [kichThuocDuKien, setKichThuocDuKien] = useState('');
  const [diaDiemLapDat, setDiaDiemLapDat] = useState('');
  const [loaiChan, setLoaiChan] = useState('');
  const [kinh, setKinh] = useState('');
  const [anhSang, setAnhSang] = useState<string[]>([]);
  const [congNghe, setCongNghe] = useState<string[]>([]);
  const [tinhTrangHoSo, setTinhTrangHoSo] = useState('');
  const [thoiGianBaoGia, setThoiGianBaoGia] = useState('');
  const [thoiGianMoHinh, setThoiGianMoHinh] = useState('');
  const [duongDanHoSo, setDuongDanHoSo] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const [danhSachFile, setDanhSachFile] = useState<File[]>([]);

  // Reset or pre-fill form fields when modal opens
  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split('T')[0];
      setNgay(today);
      setSoDX('010-2026/ĐXBG-MHV');
      
      setDonViLienHe('');
      setNguoiLienHe('');
      setDienThoai('');
      setNguoiLap('Thao Phung');
      setKhachHangCrm('');
      setNoiDungYeuCau('');
      setTenDuAn('');
      setTyLeMoHinh('');
      setKichThuocDuKien('');
      setDiaDiemLapDat('');
      setLoaiChan('');
      setKinh('');
      setAnhSang([]);
      setCongNghe([]);
      setTinhTrangHoSo('');
      setThoiGianBaoGia('');
      setThoiGianMoHinh('');
      setDuongDanHoSo('');
      setGhiChu('');
      setDanhSachFile([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleLight = (option: string) => {
    setAnhSang(prev => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  const toggleTech = (option: string) => {
    setCongNghe(prev => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setDanhSachFile(prev => [...prev, ...filesArray]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setDanhSachFile(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !donViLienHe.trim() || 
      !nguoiLienHe.trim() || 
      !noiDungYeuCau.trim() || 
      !tenDuAn.trim()
    ) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc!");
      return;
    }

    onSubmit({
      soDX,
      donViLienHe,
      nguoiLienHe,
      dienThoai,
      nguoiLap,
      ngay,
      trangThai,
      khachHangCrm,
      noiDungYeuCau,
      tenDuAn,
      tyLeMoHinh,
      kichThuocDuKien,
      diaDiemLapDat,
      loaiChan,
      kinh,
      anhSang,
      congNghe,
      tinhTrangHoSo,
      thoiGianBaoGia,
      thoiGianMoHinh,
      duongDanHoSo,
      ghiChu,
      danhSachFile,
    });
    onClose();
  };

  const inputClass = "w-full h-9 px-3 rounded-lg border border-slate-200 bg-slate-50/60 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] focus:bg-white outline-none transition";
  const labelClass = "block text-xs font-semibold text-slate-800 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 transition-all">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col max-h-[95vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <IconClipboardList className="text-[#406c89]" size={20} />
            <h3 className="text-sm font-bold text-slate-800">Lập đề xuất báo giá</h3>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Form wrapping body and footer */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          
          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-3.5 text-left">
          
            {/* Header Banner matching screenshot */}
            <div className="py-2.5 rounded-lg bg-[#406c89] text-white text-center shadow-xs">
              <h4 className="text-xs font-bold tracking-wider uppercase">ĐỀ XUẤT BÁO GIÁ</h4>
              <p className="text-[10px] tracking-wider text-sky-100/90 mt-0.5 uppercase font-medium">
                MODEL QUOTATION REQUEST
              </p>
            </div>

            {/* Row 1: Số Đề xuất & Ngày / Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Số Đề xuất / Request No.</label>
                <input 
                  type="text" 
                  value={soDX}
                  onChange={(e) => setSoDX(e.target.value)}
                  className={`${inputClass} border-[#406c89] focus:ring-[#406c89] font-medium`}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  Ngày / Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={ngay}
                    onChange={(e) => setNgay(e.target.value)}
                    className={`${inputClass} pr-9`}
                    required
                  />
                  <IconCalendar size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Row 2: Khách hàng (từ CRM) */}
            <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-1">
              <label className="block text-xs font-semibold text-[#406c89]">
                Khách hàng (từ CRM)
              </label>
              <div className="relative">
                <select 
                  value={khachHangCrm}
                  onChange={(e) => {
                    const val = e.target.value;
                    setKhachHangCrm(val);
                    if (val) {
                      setDonViLienHe(val);
                    }
                  }}
                  className="w-full h-9 px-3 pr-8 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] transition appearance-none cursor-pointer"
                >
                  <option value="">Chọn khách hàng từ CRM...</option>
                  <option value="CÔNG TY CỔ PHẦN THÁI NAM LAND">CÔNG TY CỔ PHẦN THÁI NAM LAND</option>
                  <option value="CÔNG TY CỔ PHẦN THƯƠNG MẠI DƯƠNG PHÚC THẮNG">CÔNG TY CỔ PHẦN THƯƠNG MẠI DƯƠNG PHÚC THẮNG</option>
                  <option value="CÔNG TY TNHH BIM KIÊN GIANG">CÔNG TY TNHH BIM KIÊN GIANG</option>
                  <option value="CÔNG TY CỔ PHẦN TẬP ĐOÀN ĐẤT VIỆT">CÔNG TY CỔ PHẦN TẬP ĐOÀN ĐẤT VIỆT</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                  <IconChevronDown size={14} />
                </div>
              </div>
            </div>

            {/* Row 3: Đơn vị liên hệ / Contact Company */}
            <div>
              <label className={labelClass}>
                Đơn vị liên hệ / Contact Company <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={donViLienHe}
                onChange={(e) => setDonViLienHe(e.target.value)}
                placeholder="Tên công ty khách hàng..."
                className={inputClass}
                required
              />
            </div>

            {/* Row 4: Người liên hệ & Điện thoại */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>
                  Người liên hệ / Contact Person <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={nguoiLienHe}
                  onChange={(e) => setNguoiLienHe(e.target.value)}
                  placeholder="Họ tên người liên hệ..."
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  Điện thoại liên hệ / Contact Phone
                </label>
                <input 
                  type="text" 
                  value={dienThoai}
                  onChange={(e) => setDienThoai(e.target.value)}
                  placeholder="SĐT người liên hệ..."
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 5: Nội dung yêu cầu KH gửi / Quoting content */}
            <div>
              <label className={labelClass}>
                Nội dung yêu cầu KH gửi / Quoting content <span className="text-red-500">*</span>
              </label>
              <textarea 
                value={noiDungYeuCau}
                onChange={(e) => setNoiDungYeuCau(e.target.value)}
                placeholder="Mô tả chi tiết nội dung yêu cầu báo giá của khách hàng..."
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50/60 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] focus:bg-white outline-none transition resize-y min-h-[70px]"
                rows={3}
                required
              />
            </div>

            {/* Row 6: Tên mô hình / dự án */}
            <div>
              <label className={labelClass}>
                Tên mô hình / dự án <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={tenDuAn}
                onChange={(e) => setTenDuAn(e.target.value)}
                placeholder="VD: Dự án Tòa nhà A, Mô hình Quy hoạch..."
                className={inputClass}
                required
              />
            </div>

            {/* THÔNG TIN MÔ HÌNH Container */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 bg-[#f8fafc]/50 space-y-3 shadow-2xs">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">THÔNG TIN MÔ HÌNH</h5>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Tỷ lệ mô hình */}
                <div>
                  <label className={labelClass}>
                    Tỷ lệ mô hình <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={tyLeMoHinh}
                    onChange={(e) => setTyLeMoHinh(e.target.value)}
                    placeholder="VD: 1/500, 1/1000..."
                    className={inputClass}
                  />
                </div>

                {/* Kích thước dự kiến */}
                <div>
                  <label className={labelClass}>
                    Kích thước dự kiến <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={kichThuocDuKien}
                    onChange={(e) => setKichThuocDuKien(e.target.value)}
                    placeholder="VD: 2.4m x 1.8m..."
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Địa điểm lắp đặt mô hình */}
              <div>
                <label className={labelClass}>
                  Địa điểm lắp đặt mô hình <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={diaDiemLapDat}
                  onChange={(e) => setDiaDiemLapDat(e.target.value)}
                  placeholder="Địa chỉ lắp đặt..."
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Loại chân */}
                <div>
                  <label className={labelClass}>
                    Loại chân <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={loaiChan}
                      onChange={(e) => setLoaiChan(e.target.value)}
                      className="w-full h-9 px-3 pr-8 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] outline-none transition appearance-none cursor-pointer"
                    >
                      <option value="">Chọn loại chân...</option>
                      <option value="Chân gỗ">Chân gỗ</option>
                      <option value="Chân sắt">Chân sắt</option>
                      <option value="Chân inox">Chân inox</option>
                      <option value="Chân mica">Chân mica</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                      <IconChevronDown size={14} />
                    </div>
                  </div>
                </div>

                {/* Kính */}
                <div>
                  <label className={labelClass}>
                    Kính <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={kinh}
                      onChange={(e) => setKinh(e.target.value)}
                      className="w-full h-9 px-3 pr-8 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] outline-none transition appearance-none cursor-pointer"
                    >
                      <option value="">Chọn loại kính...</option>
                      <option value="Kính cường lực 5mm">Kính cường lực 5mm</option>
                      <option value="Kính cường lực 8mm">Kính cường lực 8mm</option>
                      <option value="Kính cường lực 10mm">Kính cường lực 10mm</option>
                      <option value="Mica trong suốt">Mica trong suốt</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                      <IconChevronDown size={14} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Ánh sáng (chọn một hoặc nhiều) */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-800">
                  Ánh sáng (chọn một hoặc nhiều)
                </label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {LIGHT_OPTIONS.map((option) => {
                    const isSelected = anhSang.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleLight(option)}
                        className={`px-3 py-1 rounded-full text-[11px] border cursor-pointer select-none transition-all active:scale-95 ${
                          isSelected 
                            ? 'bg-[#406c89] border-[#406c89] text-white font-bold'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-[#406c89] hover:text-[#406c89]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Công nghệ (chọn một hoặc nhiều) */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-800">
                  Công nghệ (chọn một hoặc nhiều)
                </label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {TECH_OPTIONS.map((option) => {
                    const isSelected = congNghe.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleTech(option)}
                        className={`px-3 py-1 rounded-full text-[11px] border cursor-pointer select-none transition-all active:scale-95 ${
                          isSelected 
                            ? 'bg-[#406c89] border-[#406c89] text-white font-bold'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-[#406c89] hover:text-[#406c89]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Tình trạng hồ sơ / Drawing Status */}
            <div>
              <label className={labelClass}>
                Tình trạng hồ sơ / Drawing Status <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={tinhTrangHoSo}
                onChange={(e) => setTinhTrangHoSo(e.target.value)}
                placeholder="VD: Có đầy đủ bản vẽ CAD / Chỉ có bản vẽ PDF..."
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Thời gian cần Báo giá / Quotation time */}
              <div>
                <label className={labelClass}>
                  Thời gian cần Báo giá / Quotation time <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={thoiGianBaoGia}
                  onChange={(e) => setThoiGianBaoGia(e.target.value)}
                  placeholder="VD: 3 ngày làm việc..."
                  className={inputClass}
                />
              </div>

              {/* Thời gian cần Mô hình / Model needing time */}
              <div>
                <label className={labelClass}>
                  Thời gian cần Mô hình / Model needing time <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={thoiGianMoHinh}
                  onChange={(e) => setThoiGianMoHinh(e.target.value)}
                  placeholder="VD: 60 ngày..."
                  className={inputClass}
                />
              </div>
            </div>

            {/* Đường dẫn lưu hồ sơ / Document Shortcut */}
            <div>
              <label className={labelClass}>
                Đường dẫn lưu hồ sơ / Document Shortcut <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={duongDanHoSo}
                onChange={(e) => setDuongDanHoSo(e.target.value)}
                placeholder="Link Google Drive, SharePoint..."
                className={inputClass}
              />
            </div>

            {/* NEW FIELD: Tài liệu / Hình ảnh đính kèm (phục vụ phê duyệt) */}
            <div className="p-3.5 rounded-xl border border-sky-200/80 bg-sky-50/40 space-y-2">
              <div>
                <h5 className="text-xs font-bold text-slate-800">
                  Tài liệu / Hình ảnh đính kèm (phục vụ phê duyệt)
                </h5>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Tải lên bản vẽ, hồ sơ, hình ảnh tham khảo... để phục vụ phê duyệt đề xuất.
                </p>
              </div>

              <div className="pt-1">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer">
                  <IconUpload size={14} className="text-[#406c89]" />
                  <span>Chọn tệp để tải lên</span>
                  <input type="file" multiple className="hidden" onChange={handleFileUpload} />
                </label>
              </div>

              {/* List preview of uploaded files */}
              {danhSachFile.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {danhSachFile.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-white border border-slate-200 rounded-lg text-xs">
                      <span className="font-medium text-slate-700 truncate max-w-[400px]">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(idx)}
                        className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                        title="Xóa tệp"
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ghi chú thêm */}
            <div>
              <label className={labelClass}>
                Ghi chú thêm
              </label>
              <textarea 
                value={ghiChu}
                onChange={(e) => setGhiChu(e.target.value)}
                placeholder="Ghi chú khác..."
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50/60 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] focus:bg-white outline-none transition resize-y min-h-[70px]"
                rows={3}
              />
            </div>

          </div>

          {/* Sticky Footer */}
          <div className="px-5 py-3 flex items-center justify-end gap-2.5 border-t border-slate-100 bg-[#f8fafc] shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-all active:scale-95 bg-white shadow-2xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-white text-xs font-bold shadow-sm cursor-pointer transition-all active:scale-95 bg-[#406c89] hover:bg-[#345972]"
            >
              Gửi đề xuất
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
