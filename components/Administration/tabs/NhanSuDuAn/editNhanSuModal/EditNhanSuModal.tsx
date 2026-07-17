"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconChevronDown, IconDeviceFloppy } from '@tabler/icons-react';

interface NhanSuData {
  id: string;
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
}

interface EditNhanSuModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: NhanSuData | null;
  onSave: (data: NhanSuData) => void;
}

const APPROVED_PROPOSALS = [
  { id: 'ĐXBG-002-2026', label: 'ĐXBG-002-2026 – Tôi cần báo giá trong 02 ngày và mô hình cần trong tháng 8/2026', company: 'Công ty CP Flamingo' },
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

const FOOT_OPTIONS = ['Chân mô hình vát', 'Chân khung thép bọc gỗ laminate', 'Chân inox', 'Chân đế mica'];
const GLASS_OPTIONS = ['Lồng kính', 'Kính cường lực 10mm', 'Mica bảo vệ', 'Không có kính'];

export default function EditNhanSuModal({ isOpen, onClose, plan, onSave }: EditNhanSuModalProps) {
  const [soDX, setSoDX] = useState('');
  const [duAn, setDuAn] = useState('');
  const [khachHang, setKhachHang] = useState('');
  const [tyLeMoHinh, setTyLeMoHinh] = useState('');
  const [kichThuocDuKien, setKichThuocDuKien] = useState('');
  const [diaDiemLapDat, setDiaDiemLapDat] = useState('');
  const [duongDanHoSo, setDuongDanHoSo] = useState('');
  const [ngayLap, setNgayLap] = useState('');
  const [loaiChan, setLoaiChan] = useState('Chân mô hình vát');
  const [kinh, setKinh] = useState('Lồng kính');
  const [anhSang, setAnhSang] = useState<string[]>([]);
  const [congNghe, setCongNghe] = useState<string[]>([]);
  const [ghiChu, setGhiChu] = useState('');
  const [trangThai, setTrangThai] = useState<'dang-dien' | 'da-tong-hop'>('dang-dien');

  // Sync state with selected plan
  useEffect(() => {
    if (isOpen && plan) {
      setSoDX(plan.lienKetDeXuat || 'ĐXBG-002-2026');
      setDuAn(plan.duAn);
      setKhachHang(plan.khachHang);
      setTyLeMoHinh(plan.tyLeMoHinh || '1/500');
      setKichThuocDuKien(plan.kichThuocDuKien || '3000×4000mm');
      setDiaDiemLapDat(plan.diaDiemLapDat || 'Đông Anh, Hà Nội');
      setDuongDanHoSo(plan.duongDanHoSo || 'HO S O BAO GIA');
      setNgayLap(plan.ngayLap);
      setLoaiChan(plan.loaiChan || 'Chân mô hình vát');
      setKinh(plan.kinh || 'Lồng kính');
      setAnhSang(plan.anhSang || ['Ánh sáng công trình ngẫu nhiên', 'Ánh sáng Cảnh quan']);
      setCongNghe(plan.congNghe || []);
      setGhiChu(plan.ghiChu || '');
      setTrangThai(plan.trangThai);
    }
  }, [isOpen, plan]);

  if (!isOpen || !plan) return null;

  const handleProposalChange = (proposalId: string) => {
    setSoDX(proposalId);
    const selected = APPROVED_PROPOSALS.find(p => p.id === proposalId);
    if (selected) {
      setDuAn(selected.company);
      setKhachHang(selected.company);
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
    if (!duAn.trim()) {
      alert("Vui lòng điền tên dự án / mô hình!");
      return;
    }
    onSave({
      ...plan,
      duAn,
      khachHang,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto no-scrollbar animate-in fade-in duration-200">
      
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content Card */}
      <div className="relative bg-white w-full max-w-[650px] my-8 rounded-2xl shadow-lg border border-slate-100/50 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white">
          <h3 className="text-[17px] font-bold text-slate-800 tracking-tight">Chỉnh sửa Bản dự kiến Nhân sự</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-655 transition-colors cursor-pointer bg-transparent border-0"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs no-scrollbar">
          
          {/* Section 1: Thông tin chung */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
              THÔNG TIN DỰ ÁN
            </h4>

            {/* Liên kết đề xuất */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-700">Liên kết Đề xuất báo giá đã duyệt <span className="text-red-500 font-bold">*</span></label>
              <div className="relative">
                <select
                  value={soDX}
                  onChange={(e) => handleProposalChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-indigo-500 bg-white text-slate-800 appearance-none focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer font-semibold pr-10"
                >
                  <option value="">-- Chọn Đề xuất báo giá --</option>
                  {APPROVED_PROPOSALS.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
                <IconChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
              <span className="text-[10px] text-slate-450 font-medium mt-0.5 ml-0.5 block">
                Chi hiển thị các đề xuất đã được duyệt bởi Trưởng phòng hoặc Phó Giám đốc
              </span>
            </div>

            {/* Row 2: Tên dự án & Khách hàng */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700">Tên dự án / mô hình <span className="text-red-500 font-bold">*</span></label>
                <input
                  type="text"
                  required
                  value={duAn}
                  onChange={(e) => setDuAn(e.target.value)}
                  placeholder="Nhập tên dự án / mô hình"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700">Khách hàng</label>
                <input
                  type="text"
                  value={khachHang}
                  onChange={(e) => setKhachHang(e.target.value)}
                  placeholder="Nhập tên khách hàng"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-semibold"
                />
              </div>
            </div>

            {/* Row 3: Tỷ lệ mô hình & Kích thước */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700">Tỷ lệ mô hình</label>
                <input
                  type="text"
                  value={tyLeMoHinh}
                  onChange={(e) => setTyLeMoHinh(e.target.value)}
                  placeholder="VD: 1/100, 1/200..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700">Kích thước dự kiến</label>
                <input
                  type="text"
                  value={kichThuocDuKien}
                  onChange={(e) => setKichThuocDuKien(e.target.value)}
                  placeholder="VD: 2.4m x 3.6m..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-semibold"
                />
              </div>
            </div>

            {/* Row 4: Địa điểm lắp đặt */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-700">Địa điểm lắp đặt mô hình</label>
              <input
                type="text"
                value={diaDiemLapDat}
                onChange={(e) => setDiaDiemLapDat(e.target.value)}
                placeholder="Nhập địa điểm lắp đặt"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-semibold"
              />
            </div>

            {/* Row 5: Đường dẫn hồ sơ */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-700">Đường dẫn hồ sơ dự án</label>
              <input
                type="text"
                value={duongDanHoSo}
                onChange={(e) => setDuongDanHoSo(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-semibold"
              />
              <span className="text-[10px] text-slate-450 font-medium mt-0.5 ml-0.5 block">
                Link Google Drive, SharePoint, hoặc đường dẫn hồ sơ lưu trữ
              </span>
            </div>

            {/* Row 6: Ngày lập */}
            <div className="flex flex-col gap-1.5 w-[220px]">
              <label className="font-bold text-slate-700">Ngày lập</label>
              <input
                type="date"
                required
                value={ngayLap}
                onChange={(e) => setNgayLap(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-semibold"
              />
            </div>

          </div>

          <div className="border-t border-slate-100/80 pt-3" />

          {/* Section 2: Thông số kỹ thuật mô hình */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
              THÔNG SỐ KỸ THUẬT MÔ HÌNH
            </h4>

            {/* Row 1: Loại chân & Kính */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700">Loại chân</label>
                <div className="relative">
                  <select
                    value={loaiChan}
                    onChange={(e) => setLoaiChan(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 appearance-none focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer font-semibold pr-10"
                  >
                    {FOOT_OPTIONS.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                  <IconChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700">Kính</label>
                <div className="relative">
                  <select
                    value={kinh}
                    onChange={(e) => setKinh(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 appearance-none focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer font-semibold pr-10"
                  >
                    {GLASS_OPTIONS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <IconChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 2: Ánh sáng */}
            <div className="flex flex-col gap-2">
              <label className="font-bold text-slate-700">Ánh sáng (chọn một hoặc nhiều)</label>
              <div className="flex flex-wrap gap-2.5">
                {LIGHT_OPTIONS.map((opt) => {
                  const isChecked = anhSang.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleLight(opt)}
                      className={`px-4.5 py-2 text-xs font-bold rounded-full transition-all cursor-pointer border active:scale-95 ${
                        isChecked 
                          ? 'bg-[#2b2c7c] text-white border-transparent' 
                          : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Công nghệ */}
            <div className="flex flex-col gap-2 pt-1">
              <label className="font-bold text-slate-700">Công nghệ tích hợp (chọn một hoặc nhiều)</label>
              <div className="flex flex-wrap gap-2.5">
                {TECH_OPTIONS.map((opt) => {
                  const isChecked = congNghe.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleTech(opt)}
                      className={`px-4.5 py-2 text-xs font-bold rounded-full transition-all cursor-pointer border active:scale-95 ${
                        isChecked 
                          ? 'bg-[#2b2c7c] text-white border-transparent' 
                          : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ghi chú thêm */}
            <div className="flex flex-col gap-2.5 pt-1">
              <label className="font-bold text-slate-700">Ghi chú thêm</label>
              <textarea
                rows={3}
                value={ghiChu}
                onChange={(e) => setGhiChu(e.target.value)}
                placeholder="Nhập các ghi chú, lưu ý đặc biệt cho kế hoạch..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-semibold resize-none"
              />
            </div>

          </div>

        </form>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4.5 border-t border-slate-100 bg-slate-50/30">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-slate-655 hover:bg-slate-50 rounded-xl transition-all cursor-pointer bg-white border border-slate-200"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-[#2b2c7c] hover:bg-[#1e1f57] rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer border-0"
          >
            <IconDeviceFloppy size={16} />
            Lưu thay đổi
          </button>
        </div>

      </div>
    </div>
  );
}
