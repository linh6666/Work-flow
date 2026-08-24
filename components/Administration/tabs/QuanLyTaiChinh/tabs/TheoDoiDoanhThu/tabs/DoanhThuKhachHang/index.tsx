"use client";

import React, { useState } from 'react';
import {
  IconSearch,
  IconUser,
  IconBuilding,
  IconPhone,
  IconMail,
  IconEye,
  IconCheck,
  IconClock,
  IconAlertCircle,
  IconX,
  IconArrowUpRight,
  IconReceipt,
} from '@tabler/icons-react';
import { formatCurrency, formatDate } from '../../../../types';

interface GiaoDichKhachHang {
  id: string;
  ngay: string;
  maHD: string;
  noiDung: string;
  soTien: number;
  hinhThuc: 'Chuyển khoản' | 'Tiền mặt';
  trangThai: 'Đã thanh toán' | 'Chờ xác nhận' | 'Quá hạn';
}

interface KhachHangDoanhThu {
  id: string;
  tenKhachHang: string;
  maSoThue: string;
  nguoiDaiDien: string;
  soDienThoai: string;
  email: string;
  phuyLoai: 'Doanh nghiệp' | 'Tập đoàn' | 'Khách lẻ';
  soLuongHopDong: number;
  tongGiaTriHD: number;
  daThucNhan: number;
  conPhaiThu: number;
  lichSuGiaoDich: GiaoDichKhachHang[];
}

const SAMPLE_KHACH_HANG: KhachHangDoanhThu[] = [
  {
    id: 'kh-1',
    tenKhachHang: 'Công ty CP Đầu tư VSIP Lạng Sơn',
    maSoThue: '0101234567',
    nguoiDaiDien: 'Ông Nguyễn Văn An',
    soDienThoai: '0901.234.567',
    email: 'an.nguyen@vsip.com.vn',
    phuyLoai: 'Doanh nghiệp',
    soLuongHopDong: 1,
    tongGiaTriHD: 850_000_000,
    daThucNhan: 320_000_000,
    conPhaiThu: 530_000_000,
    lichSuGiaoDich: [
      {
        id: 'gd-kh-1',
        ngay: '2026-07-10',
        maHD: 'HĐ-2026/01-VSIP',
        noiDung: 'Thanh toán đợt 1 - Tạm ứng 38% hợp đồng mô hình VSIP Lạng Sơn',
        soTien: 320_000_000,
        hinhThuc: 'Chuyển khoản',
        trangThai: 'Đã thanh toán',
      },
    ],
  },
  {
    id: 'kh-2',
    tenKhachHang: 'Công ty Tập đoàn Liễu Giai',
    maSoThue: '0108765432',
    nguoiDaiDien: 'Bà Trần Thị Bình',
    soDienThoai: '0912.345.678',
    email: 'binh.tran@lieugiai.com',
    phuyLoai: 'Tập đoàn',
    soLuongHopDong: 1,
    tongGiaTriHD: 1_200_000_000,
    daThucNhan: 450_000_000,
    conPhaiThu: 750_000_000,
    lichSuGiaoDich: [
      {
        id: 'gd-kh-2',
        ngay: '2026-06-20',
        maHD: 'HĐ-2026/02-LG',
        noiDung: 'Thanh toán đợt 1 - Tạm ứng thi công mô hình 22 Liễu Giai',
        soTien: 450_000_000,
        hinhThuc: 'Chuyển khoản',
        trangThai: 'Đã thanh toán',
      },
    ],
  },
  {
    id: 'kh-3',
    tenKhachHang: 'Tập đoàn Heritage Tây Ninh',
    maSoThue: '0309998887',
    nguoiDaiDien: 'Ông Lê Văn Cường',
    soDienThoai: '0988.777.666',
    email: 'cuong.le@heritage.vn',
    phuyLoai: 'Tập đoàn',
    soLuongHopDong: 1,
    tongGiaTriHD: 1_500_000_000,
    daThucNhan: 580_000_000,
    conPhaiThu: 920_000_000,
    lichSuGiaoDich: [
      {
        id: 'gd-kh-3',
        ngay: '2026-07-15',
        maHD: 'HĐ-2026/03-TH',
        noiDung: 'Thanh toán đợt 1 - Khảo sát & Đặt cọc thi công',
        soTien: 580_000_000,
        hinhThuc: 'Chuyển khoản',
        trangThai: 'Đã thanh toán',
      },
    ],
  },
  {
    id: 'kh-4',
    tenKhachHang: 'Công ty Cổ phần BĐS Flamingo',
    maSoThue: '0104445556',
    nguoiDaiDien: 'Ông Phạm Hoàng Dũng',
    soDienThoai: '0933.222.111',
    email: 'dung.ph@flamingo.com',
    phuyLoai: 'Doanh nghiệp',
    soLuongHopDong: 1,
    tongGiaTriHD: 680_000_000,
    daThucNhan: 210_000_000,
    conPhaiThu: 470_000_000,
    lichSuGiaoDich: [
      {
        id: 'gd-kh-4',
        ngay: '2026-07-01',
        maHD: 'HĐ-2026/04-FL',
        noiDung: 'Đặt cọc thi công mô hình Flamingo Đông Anh',
        soTien: 210_000_000,
        hinhThuc: 'Chuyển khoản',
        trangThai: 'Đã thanh toán',
      },
      {
        id: 'gd-kh-5',
        ngay: '2026-08-01',
        maHD: 'HĐ-2026/04-FL',
        noiDung: 'Đợt 2 - Nghiệm thu giai đoạn 1 (Chờ thanh toán)',
        soTien: 270_000_000,
        hinhThuc: 'Chuyển khoản',
        trangThai: 'Quá hạn',
      },
    ],
  },
];

export default function DoanhThuKhachHangTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKhachHang, setSelectedKhachHang] = useState<KhachHangDoanhThu | null>(null);

  // Summary Metrics
  const tongSoKhachHang = SAMPLE_KHACH_HANG.length;
  const tongDoanhThuThu = SAMPLE_KHACH_HANG.reduce((acc, curr) => acc + curr.daThucNhan, 0);
  const tongConThu = SAMPLE_KHACH_HANG.reduce((acc, curr) => acc + curr.conPhaiThu, 0);
  const khachHangTop = [...SAMPLE_KHACH_HANG].sort((a, b) => b.daThucNhan - a.daThucNhan)[0];

  // Filtered
  const filteredKhachHang = SAMPLE_KHACH_HANG.filter(
    (kh) =>
      kh.tenKhachHang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kh.nguoiDaiDien.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kh.maSoThue.includes(searchTerm)
  );

  return (
    <div className="space-y-4">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Đối tác / Khách hàng</p>
          <p className="text-xl font-extrabold text-slate-800 mt-1">{tongSoKhachHang} Khách hàng</p>
          <span className="text-[10px] text-slate-500 font-medium">Đang phát sinh hợp đồng</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Tổng đã thu từ Khách hàng</p>
          <p className="text-xl font-extrabold text-emerald-600 mt-1">{formatCurrency(tongDoanhThuThu)}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">100% qua chuyển khoản</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Khách hàng đóng góp lớn nhất</p>
          <p className="text-sm font-extrabold text-[#406c89] mt-1 truncate" title={khachHangTop?.tenKhachHang}>
            {khachHangTop?.tenKhachHang}
          </p>
          <span className="text-[10px] text-emerald-600 font-bold">
            {formatCurrency(khachHangTop?.daThucNhan || 0)}
          </span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Tổng nợ chưa thu</p>
          <p className="text-xl font-extrabold text-amber-500 mt-1">{formatCurrency(tongConThu)}</p>
          <span className="text-[10px] text-amber-600 font-medium">Theo tiến độ đợt thanh toán</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên Khách hàng, Người đại diện, Mã số thuế..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89] transition-all"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Hiển thị <strong>{filteredKhachHang.length}</strong> / <strong>{tongSoKhachHang}</strong> khách hàng
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredKhachHang.map((kh) => {
          const tienDo = Math.round((kh.daThucNhan / kh.tongGiaTriHD) * 100);
          return (
            <div
              key={kh.id}
              className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs hover:border-[#406c89]/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#ebf4f8] text-[#406c89] font-extrabold text-sm flex items-center justify-center border border-[#406c89]/20 shrink-0">
                      {kh.tenKhachHang.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-800 line-clamp-1" title={kh.tenKhachHang}>
                        {kh.tenKhachHang}
                      </h4>
                      <p className="text-[10px] text-slate-400">MST: {kh.maSoThue}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 shrink-0">
                    {kh.phuyLoai}
                  </span>
                </div>

                {/* Contact info */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100 mb-3">
                  <div className="flex items-center gap-1.5 truncate">
                    <IconUser size={13} className="text-slate-400 shrink-0" />
                    <span className="truncate">{kh.nguoiDaiDien}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <IconPhone size={13} className="text-slate-400 shrink-0" />
                    <span>{kh.soDienThoai}</span>
                  </div>
                </div>

                {/* Financial metrics for this customer */}
                <div className="grid grid-cols-3 gap-2 text-xs mb-3 text-center">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Tổng hợp đồng</span>
                    <span className="font-extrabold text-slate-800">{formatCurrency(kh.tongGiaTriHD)}</span>
                  </div>
                  <div className="bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                    <span className="text-[10px] text-emerald-600 block uppercase font-bold">Đã thu</span>
                    <span className="font-extrabold text-emerald-600">{formatCurrency(kh.daThucNhan)}</span>
                  </div>
                  <div className="bg-amber-50/60 p-2 rounded-lg border border-amber-100">
                    <span className="text-[10px] text-amber-600 block uppercase font-bold">Còn nợ</span>
                    <span className="font-extrabold text-amber-600">{formatCurrency(kh.conPhaiThu)}</span>
                  </div>
                </div>

                {/* Collection progress bar */}
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-semibold text-slate-500">Tỷ lệ thanh toán</span>
                    <span className="font-bold text-[#406c89]">{tienDo}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                    <div
                      className="bg-[#406c89] h-full rounded-full transition-all duration-500"
                      style={{ width: `${tienDo}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">
                  {kh.lichSuGiaoDich.length} giao dịch đợt thu
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedKhachHang(kh)}
                  className="flex items-center gap-1 text-xs font-extrabold text-[#406c89] hover:text-[#345870] transition-colors cursor-pointer"
                >
                  <span>Lịch sử đợt thu</span>
                  <IconArrowUpRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal View Detail Transaction History */}
      {selectedKhachHang && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#ebf4f8] text-[#406c89] font-extrabold text-xs flex items-center justify-center shrink-0">
                  {selectedKhachHang.tenKhachHang.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800">{selectedKhachHang.tenKhachHang}</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Đại diện: {selectedKhachHang.nguoiDaiDien} · SĐT: {selectedKhachHang.soDienThoai}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedKhachHang(null)}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Tổng hợp đồng</span>
                  <span className="font-extrabold text-slate-800">{formatCurrency(selectedKhachHang.tongGiaTriHD)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Đã thu thực tế</span>
                  <span className="font-extrabold text-emerald-600">{formatCurrency(selectedKhachHang.daThucNhan)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Còn nợ</span>
                  <span className="font-extrabold text-amber-500">{formatCurrency(selectedKhachHang.conPhaiThu)}</span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-extrabold text-slate-800 mb-2.5 flex items-center gap-1.5">
                  <IconReceipt size={15} className="text-[#406c89]" />
                  Chi tiết các đợt thanh toán từ khách hàng
                </h5>
                <div className="space-y-2">
                  {selectedKhachHang.lichSuGiaoDich.map((gd) => (
                    <div
                      key={gd.id}
                      className="p-3 bg-white border border-slate-200/80 rounded-lg text-xs space-y-1"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-extrabold text-[#406c89]">{gd.maHD}</span>
                          <span className="text-[10px] text-slate-400 ml-2">Ngày: {formatDate(gd.ngay)}</span>
                        </div>
                        <span className="font-extrabold text-slate-800 text-sm">{formatCurrency(gd.soTien)}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] font-medium">{gd.noiDung}</p>
                      <div className="flex justify-between items-center pt-1 text-[10px]">
                        <span className="text-slate-400">Hình thức: {gd.hinhThuc}</span>
                        {gd.trangThai === 'Đã thanh toán' ? (
                          <span className="font-bold text-emerald-600">✓ Đã nhận tiền</span>
                        ) : gd.trangThai === 'Quá hạn' ? (
                          <span className="font-bold text-rose-600">⚠ Đã quá hạn</span>
                        ) : (
                          <span className="font-medium text-amber-600">⌛ Chờ xác nhận</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-right">
              <button
                type="button"
                onClick={() => setSelectedKhachHang(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
