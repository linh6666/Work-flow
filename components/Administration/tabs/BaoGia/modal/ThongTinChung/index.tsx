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
    const kh = LIST_KHACH_HANG.find(k => k.ma === ma);
    if (kh) {
      setTenKhachHangManual(kh.ten);
    } else {
      setTenKhachHangManual('');
    }
  };

  return (
    <div className="space-y-4 animate-fade-in text-xs text-slate-700">
      
      {/* SECTION 1: NGÔN NGỮ & LOẠI BÁO GIÁ (BLUE WRAPPER) */}
      <div className="p-4 bg-blue-50/20 border border-blue-100 rounded-xl space-y-3.5">
        <div>
          <label className="block text-slate-600 font-bold mb-1.5">Ngôn ngữ báo giá *</label>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setNgonNgu('vi')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                ngonNgu === 'vi'
                  ? 'bg-[#3b2c9c] border-[#3b2c9c] text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="opacity-70 mr-1 text-[10px]">VN</span> Tiếng Việt
            </button>
            <button
              type="button"
              onClick={() => setNgonNgu('en')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                ngonNgu === 'en'
                  ? 'bg-[#3b2c9c] border-[#3b2c9c] text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="opacity-70 mr-1 text-[10px]">GB</span> Tiếng Anh
            </button>
            <button
              type="button"
              onClick={() => setNgonNgu('vi-en')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                ngonNgu === 'vi-en'
                  ? 'bg-[#3b2c9c] border-[#3b2c9c] text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="opacity-70 mr-1 text-[10px]">VNGB</span> Việt - Anh
            </button>
          </div>
        </div>

        <div>
          <label className="block text-slate-600 font-bold mb-1">Loại báo giá *</label>
          <select
            value={loai}
            onChange={(e) => setLoai(e.target.value)}
            className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          >
            <option value="Mô hình Quy hoạch">Báo giá Mô hình Quy hoạch</option>
            <option value="Mô hình Kiến trúc">Báo giá Mô hình Kiến trúc</option>
            <option value="Mô hình Nội thất">Báo giá Mô hình Nội thất</option>
            <option value="Khác">Báo giá Khác</option>
          </select>
          <span className="text-[10px] text-blue-500 font-medium mt-1 block">
            Chi hiển thị mẫu hỗ trợ ngôn ngữ Tiếng Việt
          </span>
        </div>
      </div>

      {/* SECTION 2: LIÊN KẾT ĐỀ XUẤT (AMBER WRAPPER) */}
      <div className="p-4 bg-amber-50/10 border border-amber-100 rounded-xl">
        <label className="block text-amber-700 font-bold mb-1">Liên kết Đề xuất Báo giá (tùy chọn)</label>
        <select
          value={lienKetDeXuat}
          onChange={(e) => onAutoFill(e.target.value)}
          className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
        >
          <option value="">Chọn đề xuất để tự điền thông tin...</option>
          <option value="dx01">ĐXBG-001-2026 (Tập đoàn T&T)</option>
          <option value="dx02">ĐXBG-002-2026 (Công ty CP Flamingo)</option>
        </select>
      </div>

      {/* SECTION 3: CORE FORM FIELDS */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-slate-600 font-bold mb-1">Số báo giá * (tự động)</label>
          <input
            type="text"
            required
            value={soBg}
            onChange={(e) => setSoBg(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
        <div>
          <label className="block text-slate-600 font-bold mb-1">Ngày báo giá</label>
          <input
            type="date"
            required
            value={ngay}
            onChange={(e) => setNgay(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
        <div>
          <label className="block text-slate-600 font-bold mb-1">Hiệu lực (ngày)</label>
          <input
            type="number"
            min="1"
            required
            value={hieuLucNgay}
            onChange={(e) => setHieuLucNgay(parseInt(e.target.value) || 10)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-600 font-bold mb-1">Khách hàng</label>
          <select
            value={khachHangSelect}
            onChange={(e) => handleKhachHangChange(e.target.value)}
            className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          >
            <option value="">Chọn từ danh sách...</option>
            {LIST_KHACH_HANG.map(kh => (
              <option key={kh.ma} value={kh.ma}>{kh.ten}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-slate-600 font-bold mb-1">Tên khách hàng (nhập tay nếu chưa có) *</label>
          <input
            type="text"
            required
            value={tenKhachHangManual}
            onChange={(e) => setTenKhachHangManual(e.target.value)}
            placeholder="CÔNG TY CỔ PHẦN..."
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
      </div>

      <div>
        <label className="block text-slate-600 font-bold mb-1">Tên mô hình / dự án *</label>
        <input
          type="text"
          required
          value={tenDuAn}
          onChange={(e) => setTenDuAn(e.target.value)}
          placeholder="MÔ HÌNH DỰ ÁN..."
          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-600 font-bold mb-1">Tỷ lệ</label>
          <input
            type="text"
            value={tyLe}
            onChange={(e) => setTyLe(e.target.value)}
            placeholder="1/800"
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
        <div>
          <label className="block text-slate-600 font-bold mb-1">Kích thước</label>
          <input
            type="text"
            value={kichThuoc}
            onChange={(e) => setKichThuoc(e.target.value)}
            placeholder="2650X1900MM"
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
      </div>

      {/* SECTION 4: TRẠNG THÁI THEO DÕI */}
      <div className="border-t border-slate-100 pt-3">
        <label className="block text-slate-600 font-bold mb-2">Trạng thái theo dõi</label>
        <div className="grid grid-cols-3 gap-2.5">
          {STATUSES.map(status => {
            const isActive = trangThai === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setTrangThai(status)}
                className={`py-2 px-3 border rounded-lg text-[11px] font-bold text-center transition-all cursor-pointer ${
                  isActive
                    ? 'border-slate-800 text-slate-800 bg-slate-50 border-2 shadow-xs'
                    : 'border-slate-200 text-slate-500 bg-white hover:bg-slate-50'
                }`}
              >
                {isActive ? `✓ ${status}` : status}
              </button>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}
