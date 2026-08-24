"use client";

import React, { useState } from 'react';
import {
  IconSearch,
  IconFilter,
  IconFileText,
  IconEye,
  IconDownload,
  IconCheck,
  IconClock,
  IconAlertCircle,
  IconX,
  IconCash,
} from '@tabler/icons-react';
import { formatCurrency, formatDate } from '../../../../types';

interface HopDongItem {
  maHD: string;
  tenHD: string;
  duAn: string;
  khachHang: string;
  tongGiaTri: number;
  daThu: number;
  conLai: number;
  ngayKy: string;
  hanThanhToan: string;
  trangThai: 'Hoàn thành' | 'Đang thu' | 'Quá hạn';
  cacDotThanhToan: {
    dot: string;
    soTien: number;
    ngay: string;
    trangThai: 'Đã thanh toán' | 'Chờ thanh toán' | 'Quá hạn';
  }[];
}

const SAMPLE_HOP_DONG: HopDongItem[] = [
  {
    maHD: 'HĐ-2026/01-VSIP',
    tenHD: 'Hợp đồng thi công mô hình VSIP Lạng Sơn',
    duAn: 'VSIP LẠNG SƠN',
    khachHang: 'Công ty CP Đầu tư VSIP Lạng Sơn',
    tongGiaTri: 850_000_000,
    daThu: 320_000_000,
    conLai: 530_000_000,
    ngayKy: '2026-05-10',
    hanThanhToan: '2026-08-30',
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Tạm ứng 38%)', soTien: 320_000_000, ngay: '2026-07-10', trangThai: 'Đã thanh toán' },
      { dot: 'Đợt 2 (Nghiệm thu phần thô)', soTien: 300_000_000, ngay: '2026-08-30', trangThai: 'Chờ thanh toán' },
      { dot: 'Đợt 3 (Bàn giao & quyết toán)', soTien: 230_000_000, ngay: '2026-09-30', trangThai: 'Chờ thanh toán' },
    ],
  },
  {
    maHD: 'HĐ-2026/02-LG',
    tenHD: 'Hợp đồng thi công mô hình 22 Liễu Giai',
    duAn: '22 LIỄU GIAI',
    khachHang: 'Công ty Tập đoàn Liễu Giai',
    tongGiaTri: 1_200_000_000,
    daThu: 450_000_000,
    conLai: 750_000_000,
    ngayKy: '2026-04-15',
    hanThanhToan: '2026-09-15',
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Tạm ứng 37.5%)', soTien: 450_000_000, ngay: '2026-06-20', trangThai: 'Đã thanh toán' },
      { dot: 'Đợt 2 (Cắt mô hình & hoàn thiện)', soTien: 450_000_000, ngay: '2026-08-15', trangThai: 'Chờ thanh toán' },
      { dot: 'Đợt 3 (Bàn giao 100%)', soTien: 300_000_000, ngay: '2026-09-15', trangThai: 'Chờ thanh toán' },
    ],
  },
  {
    maHD: 'HĐ-2026/03-TH',
    tenHD: 'Hợp đồng mô hình quy hoạch The Heritage Tây Ninh',
    duAn: 'THE HERITAGE TÂY NINH',
    khachHang: 'Tập đoàn Heritage Tây Ninh',
    tongGiaTri: 1_500_000_000,
    daThu: 580_000_000,
    conLai: 920_000_000,
    ngayKy: '2026-03-20',
    hanThanhToan: '2026-10-10',
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Ký HĐ & Khảo sát)', soTien: 580_000_000, ngay: '2026-07-15', trangThai: 'Đã thanh toán' },
      { dot: 'Đợt 2 (Lắp dựng mô hình)', soTien: 520_000_000, ngay: '2026-09-10', trangThai: 'Chờ thanh toán' },
      { dot: 'Đợt 3 (Bàn giao & Nghiệm thu)', soTien: 400_000_000, ngay: '2026-10-10', trangThai: 'Chờ thanh toán' },
    ],
  },
  {
    maHD: 'HĐ-2026/04-FL',
    tenHD: 'Hợp đồng thiết kế & thi công mô hình Flamingo Đông Anh',
    duAn: 'FLAMINGO ĐÔNG ANH',
    khachHang: 'Công ty Cổ phần BĐS Flamingo',
    tongGiaTri: 680_000_000,
    daThu: 210_000_000,
    conLai: 470_000_000,
    ngayKy: '2026-06-01',
    hanThanhToan: '2026-08-01',
    trangThai: 'Quá hạn',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Đặt cọc thi công)', soTien: 210_000_000, ngay: '2026-07-01', trangThai: 'Đã thanh toán' },
      { dot: 'Đợt 2 (Nghiệm thu giai đoạn 1)', soTien: 270_000_000, ngay: '2026-08-01', trangThai: 'Quá hạn' },
      { dot: 'Đợt 3 (Thanh lý hợp đồng)', soTien: 200_000_000, ngay: '2026-09-01', trangThai: 'Chờ thanh toán' },
    ],
  },
];

export default function DanhSachHopDongTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Tất cả' | 'Hoàn thành' | 'Đang thu' | 'Quá hạn'>('Tất cả');
  const [selectedHD, setSelectedHD] = useState<HopDongItem | null>(null);

  // Computed metrics
  const tongGiaTri = SAMPLE_HOP_DONG.reduce((acc, curr) => acc + curr.tongGiaTri, 0);
  const tongDaThu = SAMPLE_HOP_DONG.reduce((acc, curr) => acc + curr.daThu, 0);
  const tongConLai = SAMPLE_HOP_DONG.reduce((acc, curr) => acc + curr.conLai, 0);
  const tyLeThu = ((tongDaThu / tongGiaTri) * 100).toFixed(1);

  // Filtered List
  const filteredData = SAMPLE_HOP_DONG.filter((item) => {
    const matchSearch =
      item.maHD.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tenHD.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.duAn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.khachHang.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'Tất cả' || item.trangThai === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-4">
      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Tổng số Hợp đồng</p>
          <p className="text-xl font-extrabold text-slate-800 mt-1">{SAMPLE_HOP_DONG.length} HĐ</p>
          <span className="text-[10px] text-slate-500 font-medium">Giá trị: {formatCurrency(tongGiaTri)}</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Doanh thu đã thu</p>
          <p className="text-xl font-extrabold text-emerald-600 mt-1">{formatCurrency(tongDaThu)}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">{tyLeThu}% tổng hợp đồng</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Doanh thu còn phải thu</p>
          <p className="text-xl font-extrabold text-amber-500 mt-1">{formatCurrency(tongConLai)}</p>
          <span className="text-[10px] text-amber-600 font-medium">Đang tiến hành thu hồi</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase">Hợp đồng có đợt quá hạn</p>
          <p className="text-xl font-extrabold text-rose-500 mt-1">1 HĐ</p>
          <span className="text-[10px] text-rose-600 font-medium">Cần đôn đốc thanh toán</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative flex-1">
            <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo Mã HĐ, Tên HĐ, Dự án, Khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89] transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <IconFilter size={14} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
            >
              <option value="Tất cả">Tất cả trạng thái</option>
              <option value="Đang thu">Đang thu</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Quá hạn">Có đợt quá hạn</option>
            </select>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 bg-[#406c89] hover:bg-[#345870] text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
          >
            <IconDownload size={14} />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/90 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200/80">
              <tr>
                <th className="p-3">Mã & Tên Hợp đồng</th>
                <th className="p-3">Dự án & Khách hàng</th>
                <th className="p-3 text-right">Giá trị HĐ</th>
                <th className="p-3 text-right">Đã thu</th>
                <th className="p-3 text-right">Còn lại</th>
                <th className="p-3">Tiến độ thu</th>
                <th className="p-3 text-center">Trạng thái</th>
                <th className="p-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-slate-400 text-xs">
                    Không tìm thấy hợp đồng nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => {
                  const percent = Math.round((item.daThu / item.tongGiaTri) * 100);
                  return (
                    <tr key={item.maHD} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3">
                        <div className="font-extrabold text-[#406c89]">{item.maHD}</div>
                        <div className="text-[11px] text-slate-600 font-medium line-clamp-1 max-w-[220px]" title={item.tenHD}>
                          {item.tenHD}
                        </div>
                        <div className="text-[10px] text-slate-400">Ký ngày: {formatDate(item.ngayKy)}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-slate-800">{item.duAn}</div>
                        <div className="text-[11px] text-slate-500">{item.khachHang}</div>
                      </td>
                      <td className="p-3 text-right font-extrabold text-slate-800">
                        {formatCurrency(item.tongGiaTri)}
                      </td>
                      <td className="p-3 text-right font-extrabold text-emerald-600">
                        {formatCurrency(item.daThu)}
                      </td>
                      <td className="p-3 text-right font-extrabold text-amber-500">
                        {formatCurrency(item.conLai)}
                      </td>
                      <td className="p-3 w-32">
                        <div className="flex justify-between items-center text-[10px] mb-1 font-bold text-slate-600">
                          <span>{percent}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                          <div
                            className="bg-[#406c89] h-full rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        {item.trangThai === 'Hoàn thành' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <IconCheck size={12} /> Hoàn thành
                          </span>
                        ) : item.trangThai === 'Quá hạn' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                            <IconAlertCircle size={12} /> Có đợt quá hạn
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200">
                            <IconClock size={12} /> Đang thu
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedHD(item)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-[#406c89] transition-all cursor-pointer"
                          title="Xem chi tiết đợt thanh toán"
                        >
                          <IconEye size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal View Detail Payments */}
      {selectedHD && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#ebf4f8] text-[#406c89] rounded-lg">
                  <IconFileText size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800">{selectedHD.maHD}</h4>
                  <p className="text-xs text-slate-500 font-medium">{selectedHD.tenHD}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedHD(null)}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Tổng hợp đồng</span>
                  <span className="font-extrabold text-slate-800">{formatCurrency(selectedHD.tongGiaTri)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Đã thu</span>
                  <span className="font-extrabold text-emerald-600">{formatCurrency(selectedHD.daThu)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Còn lại</span>
                  <span className="font-extrabold text-amber-500">{formatCurrency(selectedHD.conLai)}</span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-extrabold text-slate-800 mb-2.5 flex items-center gap-1.5">
                  <IconCash size={15} className="text-[#406c89]" />
                  Danh sách các đợt thanh toán theo hợp đồng
                </h5>
                <div className="space-y-2">
                  {selectedHD.cacDotThanhToan.map((dot, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white border border-slate-200/80 rounded-lg text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-700">{dot.dot}</div>
                        <div className="text-[10px] text-slate-400">Hạn/Ngày thu: {formatDate(dot.ngay)}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-slate-800">{formatCurrency(dot.soTien)}</div>
                        <div>
                          {dot.trangThai === 'Đã thanh toán' ? (
                            <span className="text-[10px] font-bold text-emerald-600">✓ Đã thanh toán</span>
                          ) : dot.trangThai === 'Quá hạn' ? (
                            <span className="text-[10px] font-bold text-rose-600">⚠ Đã quá hạn</span>
                          ) : (
                            <span className="text-[10px] font-medium text-amber-600">⌛ Chờ thanh toán</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-right">
              <button
                type="button"
                onClick={() => setSelectedHD(null)}
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
