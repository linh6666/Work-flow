"use client";

import React from 'react';

interface ThongTinChungTabProps {
  ngonNgu: string;
  setNgonNgu: (v: string) => void;
  loai: string;
  setLoai: (v: string) => void;
  lienKetDeXuat: string;
  setLienKetDeXuat: (v: string) => void;
  soBg: string;
  setSoBg: (v: string) => void;
  ngay: string;
  setNgay: (v: string) => void;
  hieuLucNgay: number;
  setHieuLucNgay: (v: number) => void;
  khachHangSelect: string;
  setKhachHangSelect: (v: string) => void;
  tenKhachHangManual: string;
  setTenKhachHangManual: (v: string) => void;
  tenDuAn: string;
  setTenDuAn: (v: string) => void;
  tyLe: string;
  setTyLe: (v: string) => void;
  kichThuoc: string;
  setKichThuoc: (v: string) => void;
  trangThai: string;
  setTrangThai: (v: string) => void;
  onAutoFill: (proposalId: string) => void;
}

const LIST_KHACH_HANG = [
  { ma: 'KH001', ten: 'Tập đoàn T&T' },
  { ma: 'KH002', ten: 'CÔNG TY TNHH BẤT ĐỘNG SẢN HỒ AN' },
  { ma: 'KH003', ten: 'CÔNG TY CỔ PHẦN ĐẦU TƯ KINH DOANH BĐS NHSLAND' },
  { ma: 'KH004', ten: 'Công ty CP Flamingo' },
];

const STATUSES = [
  'Bản nháp',
  'Đã gửi',
  'Đang theo dõi',
  'Đang bổ sung thông tin',
  'Đang đàm phán',
  'Tạm dừng',
  'Đã chốt',
  'Từ chối báo giá',
  'Không thực hiện',
];

export default function ThongTinChungTab({
  ngonNgu,
  setNgonNgu,
  loai,
  setLoai,
  lienKetDeXuat,
  setLienKetDeXuat,
  soBg,
  setSoBg,
  ngay,
  setNgay,
  hieuLucNgay,
  setHieuLucNgay,
  khachHangSelect,
  setKhachHangSelect,
  tenKhachHangManual,
  setTenKhachHangManual,
  tenDuAn,
  setTyLe,
  tyLe,
  setTenDuAn,
  kichThuoc,
  setKichThuoc,
  trangThai,
  setTrangThai,
  onAutoFill,
}: ThongTinChungTabProps) {
  const handleKhachHangChange = (ma: string) => {
    setKhachHangSelect(ma);
    if (ma) {
      const found = LIST_KHACH_HANG.find(k => k.ma === ma);
      if (found) setTenKhachHangManual(found.ten);
    }
  };

  return (
    <div className="space-y-4">
      {/* ── LOẠI BÁO GIÁ & NGÔN NGỮ ── */}
      <div className="p-4 rounded-xl border border-slate-200/80 bg-[#f8fafc]/60 space-y-4">
        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Phân loại báo giá & Ngôn ngữ
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Loại mô hình <span className="text-rose-500">*</span>
            </label>
            <select
              value={loai}
              onChange={(e) => setLoai(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
            >
              <option value="Mô hình Quy hoạch">Mô hình Quy hoạch</option>
              <option value="Mô hình Kiến trúc">Mô hình Kiến trúc</option>
              <option value="Mô hình Nội thất">Mô hình Nội thất</option>
              <option value="Lựa chọn Projection Mapping">Lựa chọn Projection Mapping</option>
              <option value="Masterplan Model Quotation (ENG)">Masterplan Model Quotation (ENG)</option>
              <option value="Building Model Quotation (ENG)">Building Model Quotation (ENG)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Ngôn ngữ báo giá
            </label>
            <div className="flex items-center gap-4 h-9">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="radio"
                  name="ngonNguEdit"
                  value="vi"
                  checked={ngonNgu === 'vi'}
                  onChange={() => setNgonNgu('vi')}
                  className="w-4 h-4 text-[#406c89] focus:ring-[#406c89]"
                />
                Tiếng Việt (VND)
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="radio"
                  name="ngonNguEdit"
                  value="en"
                  checked={ngonNgu === 'en'}
                  onChange={() => setNgonNgu('en')}
                  className="w-4 h-4 text-[#406c89] focus:ring-[#406c89]"
                />
                Tiếng Anh (USD / EUR)
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* ── THÔNG TIN CHUNG BÁO GIÁ ── */}
      <div className="p-4 rounded-xl border border-slate-200/80 bg-[#f8fafc]/60 space-y-4">
        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Thông tin chi tiết Báo giá
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Số BG <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={soBg}
              onChange={(e) => setSoBg(e.target.value)}
              placeholder="VD: 112-2026 BG-MHV"
              className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold text-[#406c89] focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Ngày lập <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={ngay}
              onChange={(e) => setNgay(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Hiệu lực (Ngày)
            </label>
            <input
              type="number"
              value={hieuLucNgay}
              onChange={(e) => setHieuLucNgay(parseInt(e.target.value) || 0)}
              className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Khách hàng & Tên dự án */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Khách hàng CRM (Chọn để điền nhanh)
            </label>
            <select
              value={khachHangSelect}
              onChange={(e) => handleKhachHangChange(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs mb-2"
            >
              <option value="">-- Chọn khách hàng từ danh sách CRM --</option>
              {LIST_KHACH_HANG.map(kh => (
                <option key={kh.ma} value={kh.ma}>{kh.ten} ({kh.ma})</option>
              ))}
            </select>

            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tên Khách hàng chính thức <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={tenKhachHangManual}
              onChange={(e) => setTenKhachHangManual(e.target.value)}
              placeholder="Nhập tên công ty / khách hàng..."
              className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Tên Dự án / Tiêu đề báo giá
            </label>
            <textarea
              rows={3}
              value={tenDuAn}
              onChange={(e) => setTenDuAn(e.target.value)}
              placeholder="Nhập tên dự án hoặc mô tả ngắn..."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs resize-none"
            />
          </div>
        </div>

        {/* Tỷ lệ & Kích thước & Trạng thái */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Tỷ lệ mô hình
            </label>
            <input
              type="text"
              value={tyLe}
              onChange={(e) => setTyLe(e.target.value)}
              placeholder="VD: 1/500, 1/200"
              className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Kích thước sa bàn
            </label>
            <input
              type="text"
              value={kichThuoc}
              onChange={(e) => setKichThuoc(e.target.value)}
              placeholder="VD: 2000X1500MM"
              className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Trạng thái báo giá
            </label>
            <select
              value={trangThai}
              onChange={(e) => setTrangThai(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold text-[#406c89] focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
            >
              {STATUSES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
