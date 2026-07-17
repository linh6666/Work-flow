"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconChevronDown, IconClipboardList } from '@tabler/icons-react';
import { DeXuat, TrangThai } from '../index';

interface EditProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DeXuat) => void;
  proposal: DeXuat | null;
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

export default function EditProposalModal({ isOpen, onClose, onSubmit, proposal }: EditProposalModalProps) {
  const [soDX, setSoDX] = useState('');
  const [donViLienHe, setDonViLienHe] = useState('');
  const [nguoiLienHe, setNguoiLienHe] = useState('');
  const [nguoiLap, setNguoiLap] = useState('');
  const [ngay, setNgay] = useState('');
  const [trangThai, setTrangThai] = useState<TrangThai>('cho-tp');
  
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

  // Prefill form fields when proposal updates
  useEffect(() => {
    if (isOpen && proposal) {
      setSoDX(proposal.soDX || '');
      setDonViLienHe(proposal.donViLienHe || '');
      setNguoiLienHe(proposal.nguoiLienHe || '');
      setNguoiLap(proposal.nguoiLap || 'Thao Phung');
      setNgay(proposal.ngay || '');
      setTrangThai(proposal.trangThai || 'cho-tp');
      setKhachHangCrm(proposal.khachHangCrm || '');
      setNoiDungYeuCau(proposal.noiDungYeuCau || '');
      setTenDuAn(proposal.tenDuAn || '');
      setTyLeMoHinh(proposal.tyLeMoHinh || '');
      setKichThuocDuKien(proposal.kichThuocDuKien || '');
      setDiaDiemLapDat(proposal.diaDiemLapDat || '');
      setLoaiChan(proposal.loaiChan || '');
      setKinh(proposal.kinh || '');
      setAnhSang(proposal.anhSang || []);
      setCongNghe(proposal.congNghe || []);
      setTinhTrangHoSo(proposal.tinhTrangHoSo || '');
      setThoiGianBaoGia(proposal.thoiGianBaoGia || '');
      setThoiGianMoHinh(proposal.thoiGianMoHinh || '');
      setDuongDanHoSo(proposal.duongDanHoSo || '');
      setGhiChu(proposal.ghiChu || '');
    }
  }, [isOpen, proposal]);

  if (!isOpen || !proposal) return null;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !donViLienHe.trim() || 
      !nguoiLienHe.trim() || 
      !noiDungYeuCau.trim() || 
      !tenDuAn.trim() || 
      !tyLeMoHinh.trim() || 
      !kichThuocDuKien.trim() ||
      !diaDiemLapDat.trim() ||
      !loaiChan.trim() ||
      !kinh.trim() ||
      !tinhTrangHoSo.trim() ||
      !thoiGianBaoGia.trim() ||
      !thoiGianMoHinh.trim() ||
      !duongDanHoSo.trim()
    ) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc!");
      return;
    }

    onSubmit({
      ...proposal,
      soDX,
      donViLienHe,
      nguoiLienHe,
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
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 transition-all">
      <div 
        className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col max-h-[95vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <IconClipboardList className="text-[#3b4cb8]" size={20} />
            <h3 className="text-base font-bold text-slate-800">Chỉnh sửa đề xuất báo giá</h3>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-655 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
            
            {/* Blue Headline Banner */}
            <div className="py-3 rounded-lg bg-[#3b4cb8] text-white text-center shadow-sm">
              <h4 className="text-sm font-bold tracking-wider">CẬP NHẬT ĐỀ XUẤT BÁO GIÁ</h4>
              <p className="text-[10px] tracking-wider text-indigo-100/90 mt-0.5 uppercase font-medium">UPDATE QUOTATION REQUEST</p>
            </div>

            {/* Số đề xuất */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Số đề xuất <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={soDX}
                onChange={(e) => setSoDX(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-855 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                required
              />
            </div>

            {/* Ngày / Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Ngày / Date <span className="text-red-500">*</span>
              </label>
              <input 
                type="date" 
                value={ngay}
                onChange={(e) => setNgay(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                required
              />
            </div>

            {/* Khách hàng (từ CRM) */}
            <div className="p-4 rounded-xl border border-indigo-100 bg-[#f5f8ff]">
              <label className="block text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">
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
                  className="w-full h-10 px-3 pr-8 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition appearance-none"
                >
                  <option value="">Chọn khách hàng từ CRM...</option>
                  <option value="Công ty CP Flamingo">Công ty CP Flamingo</option>
                  <option value="CÔNG TY CỔ PHẦN ĐẦU TƯ KINH DOANH BĐS NHSLAND">CÔNG TY CỔ PHẦN ĐẦU TƯ KINH DOANH BĐS NHSLAND</option>
                  <option value="Công ty TNHH Phát triển Đô thị">Công ty TNHH Phát triển Đô thị</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                  <IconChevronDown size={16} />
                </div>
              </div>
            </div>

            {/* Đơn vị liên hệ / Contact Company */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Đơn vị liên hệ / Contact Company <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={donViLienHe}
                onChange={(e) => setDonViLienHe(e.target.value)}
                placeholder="Tên công ty khách hàng..."
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                required
              />
            </div>

            {/* Người liên hệ / Contact Person */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Người liên hệ / Contact Person <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={nguoiLienHe}
                onChange={(e) => setNguoiLienHe(e.target.value)}
                placeholder="Họ tên người liên hệ..."
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                required
              />
            </div>

            {/* Nội dung yêu cầu KH gửi / Quoting content */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Nội dung yêu cầu KH gửi / Quoting content <span className="text-red-500">*</span>
              </label>
              <textarea 
                value={noiDungYeuCau}
                onChange={(e) => setNoiDungYeuCau(e.target.value)}
                placeholder="Mô tả chi tiết nội dung yêu cầu báo giá của khách hàng..."
                className="w-full p-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition resize-y min-h-[80px]"
                rows={3}
                required
              />
            </div>

            {/* Tên mô hình / dự án */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Tên mô hình / dự án <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={tenDuAn}
                onChange={(e) => setTenDuAn(e.target.value)}
                placeholder="VD: Dự án Tòa nhà A, Mô hình Quy hoạch..."
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                required
              />
            </div>

            {/* THÔNG TIN MÔ HÌNH Container */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-4">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">THÔNG TIN MÔ HÌNH</h5>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tỷ lệ mô hình */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Tỷ lệ mô hình <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={tyLeMoHinh}
                    onChange={(e) => setTyLeMoHinh(e.target.value)}
                    placeholder="VD: 1/500, 1/1000..."
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                    required
                  />
                </div>

                {/* Kích thước dự kiến */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Kích thước dự kiến <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={kichThuocDuKien}
                    onChange={(e) => setKichThuocDuKien(e.target.value)}
                    placeholder="VD: 2.4m x 1.8m..."
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                    required
                  />
                </div>
              </div>

              {/* Địa điểm lắp đặt mô hình */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Địa điểm lắp đặt mô hình <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={diaDiemLapDat}
                  onChange={(e) => setDiaDiemLapDat(e.target.value)}
                  placeholder="Địa chỉ lắp đặt..."
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Loại chân */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Loại chân <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={loaiChan}
                      onChange={(e) => setLoaiChan(e.target.value)}
                      className="w-full h-10 px-3 pr-8 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition appearance-none"
                      required
                    >
                      <option value="">Chọn loại chân...</option>
                      <option value="Chân gỗ">Chân gỗ</option>
                      <option value="Chân sắt">Chân sắt</option>
                      <option value="Chân inox">Chân inox</option>
                      <option value="Chân mica">Chân mica</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                      <IconChevronDown size={16} />
                    </div>
                  </div>
                </div>

                {/* Kính */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Kính <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={kinh}
                      onChange={(e) => setKinh(e.target.value)}
                      className="w-full h-10 px-3 pr-8 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition appearance-none"
                      required
                    >
                      <option value="">Chọn loại kính...</option>
                      <option value="Kính cường lực 5mm">Kính cường lực 5mm</option>
                      <option value="Kính cường lực 8mm">Kính cường lực 8mm</option>
                      <option value="Kính cường lực 10mm">Kính cường lực 10mm</option>
                      <option value="Mica trong suốt">Mica trong suốt</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                      <IconChevronDown size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Ánh sáng */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-800">
                  Ánh sáng (chọn một hoặc nhiều)
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {LIGHT_OPTIONS.map((option) => {
                    const isSelected = anhSang.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleLight(option)}
                        className={`px-3 py-1.5 rounded-full text-xs border cursor-pointer select-none transition-all active:scale-95 ${
                          isSelected 
                            ? 'bg-[#3b4cb8] border-[#3b4cb8] text-white font-medium'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Công nghệ */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-800">
                  Công nghệ (chọn một hoặc nhiều)
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {TECH_OPTIONS.map((option) => {
                    const isSelected = congNghe.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleTech(option)}
                        className={`px-3 py-1.5 rounded-full text-xs border cursor-pointer select-none transition-all active:scale-95 ${
                          isSelected 
                            ? 'bg-[#3b4cb8] border-[#3b4cb8] text-white font-medium'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
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
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Tình trạng hồ sơ / Drawing Status <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={tinhTrangHoSo}
                onChange={(e) => setTinhTrangHoSo(e.target.value)}
                placeholder="VD: Có đầy đủ bản vẽ CAD / Chỉ có bản vẽ PDF..."
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Thời gian cần Báo giá / Quotation time */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Thời gian cần Báo giá / Quotation time <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={thoiGianBaoGia}
                  onChange={(e) => setThoiGianBaoGia(e.target.value)}
                  placeholder="VD: 3 ngày làm việc..."
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                  required
                />
              </div>

              {/* Thời gian cần Mô hình / Model needing time */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Thời gian cần Mô hình / Model needing time <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={thoiGianMoHinh}
                  onChange={(e) => setThoiGianMoHinh(e.target.value)}
                  placeholder="VD: 60 ngày..."
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Đường dẫn lưu hồ sơ / Document Shortcut */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Đường dẫn lưu hồ sơ / Document Shortcut <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={duongDanHoSo}
                onChange={(e) => setDuongDanHoSo(e.target.value)}
                placeholder="Link Google Drive, SharePoint..."
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                required
              />
            </div>

            {/* Ghi chú thêm */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Ghi chú thêm
              </label>
              <textarea 
                value={ghiChu}
                onChange={(e) => setGhiChu(e.target.value)}
                placeholder="Ghi chú khác..."
                className="w-full p-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition resize-y min-h-[80px]"
                rows={3}
              />
            </div>

          </div>

          {/* Sticky Footer */}
          <div className="px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-100 bg-[#f8fafc] shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer transition-all active:scale-95 bg-white"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-white text-sm font-semibold shadow-sm cursor-pointer transition-all active:scale-95 bg-[#3b4cb8] hover:bg-[#2f3d9d]"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
