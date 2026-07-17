"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconChevronDown } from '@tabler/icons-react';

interface CreateNhanSuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    duAn: string;
    maKH: string;
    khachHang: string;
    nvLap: string;
    ngayLap: string;
    trangThai: 'dang-dien' | 'da-tong-hop';
    lienKetDeXuat?: string;
    tyLeMoHinh?: string;
    kichThuocDuKien?: string;
    diaDiemLapDat?: string;
    duongDanHoSo?: string;
    loaiChan?: string;
    kinh?: string;
    anhSang?: string[];
    congNghe?: string[];
    ghiChu?: string;
  }) => void;
}

const APPROVED_PROPOSALS = [
  { id: 'ĐXBG-002-2026', label: 'ĐXBG-002-2026 - Công ty CP Flamingo', company: 'Công ty CP Flamingo' },
  { id: 'ĐXBG-001-2026', label: 'ĐXBG-001-2026 - CÔNG TY CỔ PHẦN ĐẦU TƯ KINH DOANH BĐS NHSLAND', company: 'CÔNG TY CỔ PHẦN ĐẦU TƯ KINH DOANH BĐS NHSLAND' },
];

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

export default function CreateNhanSuModal({ isOpen, onClose, onSubmit }: CreateNhanSuModalProps) {
  const [soDX, setSoDX] = useState('');
  const [duAn, setDuAn] = useState('');
  const [khachHang, setKhachHang] = useState('');
  const [tyLeMoHinh, setTyLeMoHinh] = useState('');
  const [kichThuocDuKien, setKichThuocDuKien] = useState('');
  const [diaDiemLapDat, setDiaDiemLapDat] = useState('');
  const [duongDanHoSo, setDuongDanHoSo] = useState('');
  const [ngayLap, setNgayLap] = useState('');
  const [loaiChan, setLoaiChan] = useState('');
  const [kinh, setKinh] = useState('');
  const [anhSang, setAnhSang] = useState<string[]>([]);
  const [congNghe, setCongNghe] = useState<string[]>([]);
  const [ghiChu, setGhiChu] = useState('');

  // Static pre-filled info
  const [maKH, setMaKH] = useState('');
  const nvLap = 'Thao Phung';
  const trangThai = 'dang-dien';

  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split('T')[0];
      setNgayLap(today);
      
      const randomNum = Math.floor(100 + Math.random() * 900);
      setMaKH(`DKNS-${randomNum}-2026`);
      
      setSoDX('');
      setDuAn('');
      setKhachHang('');
      setTyLeMoHinh('');
      setKichThuocDuKien('');
      setDiaDiemLapDat('');
      setDuongDanHoSo('');
      setLoaiChan('');
      setKinh('');
      setAnhSang([]);
      setCongNghe([]);
      setGhiChu('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProposalChange = (proposalId: string) => {
    setSoDX(proposalId);
    const selected = APPROVED_PROPOSALS.find(p => p.id === proposalId);
    if (selected) {
      setDuAn(selected.company);
      setKhachHang(selected.company);
    } else {
      setDuAn('');
      setKhachHang('');
    }
  };

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
    if (!soDX) {
      alert("Vui lòng liên kết với Đề xuất báo giá đã duyệt!");
      return;
    }
    if (!duAn.trim()) {
      alert("Vui lòng điền tên dự án / mô hình!");
      return;
    }
    onSubmit({
      duAn,
      maKH,
      khachHang,
      nvLap,
      ngayLap,
      trangThai,
      lienKetDeXuat: soDX,
      tyLeMoHinh,
      kichThuocDuKien,
      diaDiemLapDat,
      duongDanHoSo,
      loaiChan,
      kinh,
      anhSang,
      congNghe,
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
          <h3 className="text-base font-bold text-slate-800">Tạo mẫu Bản dự kiến Nhân sự</h3>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
            
            {/* THÔNG TIN DỰ ÁN Header */}
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">THÔNG TIN DỰ ÁN</h5>

            {/* Liên kết Đề xuất */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Liên kết Đề xuất báo giá đã duyệt <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select 
                  value={soDX}
                  onChange={(e) => handleProposalChange(e.target.value)}
                  className="w-full h-10 px-3 pr-8 rounded-lg border border-indigo-200 bg-white text-sm text-slate-855 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition appearance-none"
                  required
                >
                  <option value="">Chọn đề xuất báo giá...</option>
                  {APPROVED_PROPOSALS.map(p => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                  <IconChevronDown size={16} />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Chi hiển thị các đề xuất đã được duyệt bởi Trưởng phòng hoặc Phó Giám đốc
              </p>
            </div>

            {/* Tên dự án & Khách hàng */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Tên dự án / mô hình <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={duAn}
                  onChange={(e) => setDuAn(e.target.value)}
                  placeholder="Tên dự án..."
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Khách hàng
                </label>
                <input 
                  type="text" 
                  value={khachHang}
                  onChange={(e) => setKhachHang(e.target.value)}
                  placeholder="Tên khách hàng..."
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                />
              </div>
            </div>

            {/* Tỷ lệ & Kích thước */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Tỷ lệ mô hình
                </label>
                <input 
                  type="text" 
                  value={tyLeMoHinh}
                  onChange={(e) => setTyLeMoHinh(e.target.value)}
                  placeholder="VD: 1/500, 1/200..."
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Kích thước dự kiến
                </label>
                <input 
                  type="text" 
                  value={kichThuocDuKien}
                  onChange={(e) => setKichThuocDuKien(e.target.value)}
                  placeholder="VD: 2m x 1.5m..."
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                />
              </div>
            </div>

            {/* Địa điểm lắp đặt */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Địa điểm lắp đặt mô hình
              </label>
              <input 
                type="text" 
                value={diaDiemLapDat}
                onChange={(e) => setDiaDiemLapDat(e.target.value)}
                placeholder="Địa chỉ lắp đặt..."
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
              />
            </div>

            {/* Đường dẫn hồ sơ */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Đường dẫn hồ sơ dự án
              </label>
              <input 
                type="text" 
                value={duongDanHoSo}
                onChange={(e) => setDuongDanHoSo(e.target.value)}
                placeholder="https://drive.google.com/... hoặc đường dẫn nội bộ"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Link Google Drive, SharePoint, hoặc đường dẫn hồ sơ lưu trữ
              </p>
            </div>

            {/* Ngày lập */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Ngày lập <span className="text-red-500">*</span>
              </label>
              <input 
                type="date" 
                value={ngayLap}
                onChange={(e) => setNgayLap(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition bg-white"
                required
              />
            </div>

            <hr className="border-slate-100 border-t my-4" />

            {/* THÔNG SỐ KỸ THUẬT Header */}
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">THÔNG SỐ KỸ THUẬT MÔ HÌNH</h5>

            {/* Loại chân & Kính */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Loại chân
                </label>
                <div className="relative">
                  <select 
                    value={loaiChan}
                    onChange={(e) => setLoaiChan(e.target.value)}
                    className="w-full h-10 px-3 pr-8 rounded-lg border border-slate-200 bg-white text-sm text-slate-850 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition appearance-none"
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

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Kính
                </label>
                <div className="relative">
                  <select 
                    value={kinh}
                    onChange={(e) => setKinh(e.target.value)}
                    className="w-full h-10 px-3 pr-8 rounded-lg border border-slate-200 bg-white text-sm text-slate-850 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition appearance-none"
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
                          : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-650'
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
                          : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-655'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="border-slate-100 border-t my-4" />

            {/* Ghi chú */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Ghi chú
              </label>
              <input 
                type="text" 
                value={ghiChu}
                onChange={(e) => setGhiChu(e.target.value)}
                placeholder="Ghi chú thêm..."
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
              />
            </div>

            {/* Light blue alert box */}
            <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl flex items-start gap-2 text-indigo-900 text-xs">
              <span className="text-[14px]">💡</span>
              <p className="leading-relaxed">
                Sau khi tạo, toàn bộ phòng ban Kỹ thuật sẽ nhìn thấy mẫu này và tự vào điền thông tin nhân sự của phòng mình.
              </p>
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
              Tạo mẫu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
