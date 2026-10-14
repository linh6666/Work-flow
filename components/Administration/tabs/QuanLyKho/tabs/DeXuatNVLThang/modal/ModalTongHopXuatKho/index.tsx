"use client";

import React, { useState } from 'react';
import {
  IconX,
  IconBox,
  IconPrinter,
  IconDownload,
  IconRefresh,
  IconUpload,
  IconReceipt,
} from '@tabler/icons-react';

interface RowPhongCat {
  stt: number;
  maNVL: string;
  tenHang: string;
  dvt: string;
  ngayXuatKho: string;
  da129?: number;
  da27?: number;
  da29?: number;
  slXuat: number;
  slSuDung: string;
  donGia: number;
  thanhTien: number;
}

interface RowPhongKhaiTrien {
  stt: number;
  maNVL: string;
  tenHang: string;
  dvt: string;
  ngayXuatKho: string;
  da31?: number;
  slXuat: number;
  slSuDung: string;
  donGia: number;
  thanhTien: number;
}

interface ModalTongHopXuatKhoProps {
  isOpen: boolean;
  onClose: () => void;
  thangDefault?: number;
  namDefault?: number;
}

const DATA_PHONG_CAT: RowPhongCat[] = [
  {
    stt: 1,
    maNVL: 'BD-GIAY 2',
    tenHang: 'Băng dính giấy 2cm',
    dvt: 'Cuộn',
    ngayXuatKho: '10/10/2026',
    da129: 7,
    da29: 8,
    slXuat: 15,
    slSuDung: '—',
    donGia: 3000,
    thanhTien: 45000,
  },
  {
    stt: 2,
    maNVL: 'MC_000-0.5',
    tenHang: 'Mica trong 0.5mm',
    dvt: 'Tấm',
    ngayXuatKho: '10/10/2026',
    da129: 1,
    da27: 1,
    da29: 2,
    slXuat: 4,
    slSuDung: '—',
    donGia: 920000,
    thanhTien: 3680000,
  },
  {
    stt: 3,
    maNVL: 'MC_000-1',
    tenHang: 'Mica trong 1mm',
    dvt: 'Tấm',
    ngayXuatKho: '10/10/2026',
    da129: 2,
    da27: 1,
    da29: 1,
    slXuat: 4,
    slSuDung: '—',
    donGia: 680000,
    thanhTien: 2720000,
  },
  {
    stt: 4,
    maNVL: 'MC_000-3',
    tenHang: 'Mica trong 3mm',
    dvt: 'Tấm',
    ngayXuatKho: '10/10/2026',
    da129: 1,
    slXuat: 1,
    slSuDung: '—',
    donGia: 1050000,
    thanhTien: 1050000,
  },
  {
    stt: 5,
    maNVL: 'MC_000-5',
    tenHang: 'Mica trong 5mm',
    dvt: 'Tấm',
    ngayXuatKho: '10/10/2026',
    da29: 1,
    slXuat: 1,
    slSuDung: '—',
    donGia: 1600000,
    thanhTien: 1600000,
  },
  {
    stt: 6,
    maNVL: 'MC_402-2',
    tenHang: 'Mica trắng sứ 2mm',
    dvt: 'Tấm',
    ngayXuatKho: '10/10/2026',
    da129: 2,
    da29: 2,
    slXuat: 4,
    slSuDung: '—',
    donGia: 757000,
    thanhTien: 3028000,
  },
  {
    stt: 7,
    maNVL: 'MC_425-2',
    tenHang: 'Mica trắng sữa 2mm',
    dvt: 'Tấm',
    ngayXuatKho: '10/10/2026',
    da129: 1,
    da29: 1,
    slXuat: 2,
    slSuDung: '—',
    donGia: 720000,
    thanhTien: 1440000,
  },
  {
    stt: 8,
    maNVL: 'PVC-0.5',
    tenHang: 'Tấm nhựa trắng PVC 0.5mm',
    dvt: 'Tấm',
    ngayXuatKho: '10/10/2026',
    da129: 2,
    da29: 2,
    slXuat: 4,
    slSuDung: '—',
    donGia: 125000,
    thanhTien: 500000,
  },
];

const DATA_PHONG_KHAI_TRIEN: RowPhongKhaiTrien[] = [
  {
    stt: 1,
    maNVL: 'CON 90',
    tenHang: 'Cồn 90 độ vệ sinh resin',
    dvt: 'Lit',
    ngayXuatKho: '12/10/2026',
    da31: 30,
    slXuat: 30,
    slSuDung: '—',
    donGia: 30240,
    thanhTien: 907200,
  },
];

export default function ModalTongHopXuatKho({
  isOpen,
  onClose,
  thangDefault = 10,
  namDefault = 2026,
}: ModalTongHopXuatKhoProps) {
  const [selectedThang, setSelectedThang] = useState<number>(thangDefault);
  const [selectedNam, setSelectedNam] = useState<number>(namDefault);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-3 sm:p-5 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 w-full max-w-[1320px] max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* ── Modal Header ── */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <IconBox size={18} className="stroke-[2.2]" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
              Tổng hợp NVL Xuất kho
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Đóng modal"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* ── Scrollable Body Content ── */}
        <div className="overflow-y-auto flex-1 px-6 pb-6 space-y-4">
          
          {/* ── Filters & Action Buttons ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 pb-1">
            {/* Filter Tháng / Năm & Note */}
            <div className="flex items-center gap-2.5 flex-wrap text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-slate-500">Tháng</span>
                <select
                  value={selectedThang}
                  onChange={(e) => setSelectedThang(Number(e.target.value))}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>
                      Tháng {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-medium text-slate-500">Năm</span>
                <input
                  type="number"
                  value={selectedNam}
                  onChange={(e) => setSelectedNam(Number(e.target.value))}
                  className="w-16 px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-center"
                />
              </div>

              <span className="text-slate-500 ml-2">
                Chỉ tổng hợp các bảng đã{' '}
                <span className="font-semibold text-indigo-600">xác nhận nhận</span>.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs transition-colors cursor-pointer"
              >
                <IconPrinter size={15} className="text-slate-600" />
                <span>In</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Xuất file Excel tổng hợp NVL thành công!')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs transition-colors cursor-pointer"
              >
                <IconDownload size={15} className="text-slate-600" />
                <span>Xuất Excel</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Đang thực hiện hạch toán NVL xuất kho...')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-purple-50 text-[#8b5cf6] border border-purple-200 shadow-2xs transition-colors cursor-pointer"
              >
                <IconRefresh size={15} className="text-[#8b5cf6]" />
                <span>Hạch toán NVL</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Đã nạp thành công vào bảng Xuất NVL!')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-[#406c89] hover:bg-[#345973] text-white shadow-xs transition-colors cursor-pointer"
              >
                <IconUpload size={15} />
                <span>Nạp vào bảng Xuất NVL</span>
              </button>
            </div>
          </div>

          {/* ── Summary Line ── */}
          <div className="text-xs sm:text-sm font-semibold text-slate-700">
            Tổng cộng: SL 65 — Thành tiền 14.970.200 đ
          </div>

          {/* ── PHÒNG CẮT CARD ── */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            {/* Header phòng ban */}
            <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-slate-800 text-[13px] sm:text-sm">
                  Phòng Cắt
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-50 text-[#8b5cf6] border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer"
                >
                  <IconReceipt size={12} />
                  <span>Hạch toán</span>
                </button>
              </div>

              <div className="text-xs font-semibold text-slate-500">
                SL: 35 — Thành tiền: <span className="font-bold text-slate-700">14.063.000</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-[#f8fafc] text-slate-600 border-b border-slate-200/80 font-bold text-[11px]">
                  <tr>
                    <th className="px-3 py-2.5 w-10 text-center whitespace-nowrap">STT</th>
                    <th className="px-3 py-2.5 whitespace-nowrap">Mã NVL</th>
                    <th className="px-3 py-2.5 whitespace-nowrap">Tên hàng</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">ĐVT</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">
                      <div>Ngày xuất</div>
                      <div>kho</div>
                    </th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">129-2026/DA-MHV</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">27-2026/DA-MHV</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">29-2026/DA-MHV</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap font-bold">SL xuất</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">
                      <div>SL sử</div>
                      <div>dụng</div>
                    </th>
                    <th className="px-3 py-2.5 text-right whitespace-nowrap">Đơn giá</th>
                    <th className="px-3 py-2.5 text-right whitespace-nowrap">Thành tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {DATA_PHONG_CAT.map((row) => (
                    <tr key={row.stt} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-3 py-2 text-center text-slate-500 whitespace-nowrap">{row.stt}</td>
                      <td className="px-3 py-2 font-mono text-[11px] text-slate-600 whitespace-nowrap font-medium">
                        {row.maNVL}
                      </td>
                      <td className="px-3 py-2 font-medium text-slate-800 whitespace-nowrap">
                        {row.tenHang}
                      </td>
                      <td className="px-3 py-2 text-center text-slate-600 whitespace-nowrap">{row.dvt}</td>
                      <td className="px-3 py-2 text-center text-slate-500 whitespace-nowrap">{row.ngayXuatKho}</td>
                      <td className="px-3 py-2 text-center text-slate-700 whitespace-nowrap">
                        {row.da129 ?? ''}
                      </td>
                      <td className="px-3 py-2 text-center text-slate-700 whitespace-nowrap">
                        {row.da27 ?? ''}
                      </td>
                      <td className="px-3 py-2 text-center text-slate-700 whitespace-nowrap">
                        {row.da29 ?? ''}
                      </td>
                      <td className="px-3 py-2 text-center font-bold text-slate-800 whitespace-nowrap">
                        {row.slXuat}
                      </td>
                      <td className="px-3 py-2 text-center text-slate-400 whitespace-nowrap">
                        {row.slSuDung}
                      </td>
                      <td className="px-3 py-2 text-right text-slate-700 whitespace-nowrap">
                        {formatNumber(row.donGia)}
                      </td>
                      <td className="px-3 py-2 text-right font-medium text-slate-800 whitespace-nowrap">
                        {formatNumber(row.thanhTien)}
                      </td>
                    </tr>
                  ))}

                  {/* Footer Tổng Phòng Cắt */}
                  <tr className="bg-[#fffdf0] border-t border-amber-200/60 font-bold text-slate-800">
                    <td colSpan={8} className="px-3 py-2.5 text-right font-bold text-[11px] tracking-tight">
                      TỔNG Phòng Cắt
                    </td>
                    <td className="px-3 py-2.5 text-center font-bold text-slate-900">
                      35
                    </td>
                    <td className="px-3 py-2.5 text-center text-slate-400">
                      —
                    </td>
                    <td className="px-3 py-2.5"></td>
                    <td className="px-3 py-2.5 text-right font-bold text-slate-900">
                      14.063.000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── PHÒNG KHAI TRIỂN CARD ── */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            {/* Header phòng ban */}
            <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-slate-800 text-[13px] sm:text-sm">
                  Phòng Khai triển
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-50 text-[#8b5cf6] border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer"
                >
                  <IconReceipt size={12} />
                  <span>Hạch toán</span>
                </button>
              </div>

              <div className="text-xs font-semibold text-slate-500">
                SL: 30 — Thành tiền: <span className="font-bold text-slate-700">907.200</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-[#f8fafc] text-slate-600 border-b border-slate-200/80 font-bold text-[11px]">
                  <tr>
                    <th className="px-3 py-2.5 w-10 text-center whitespace-nowrap">STT</th>
                    <th className="px-3 py-2.5 whitespace-nowrap">Mã NVL</th>
                    <th className="px-3 py-2.5 whitespace-nowrap">Tên hàng</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">ĐVT</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">
                      <div>Ngày xuất</div>
                      <div>kho</div>
                    </th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">
                      <div>31-2026/DA.01-MHV</div>
                      <div className="text-[10px] font-normal text-slate-400">CHỈNH SỬA</div>
                    </th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap font-bold">SL xuất</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">
                      <div>SL sử</div>
                      <div>dụng</div>
                    </th>
                    <th className="px-3 py-2.5 text-right whitespace-nowrap">Đơn giá</th>
                    <th className="px-3 py-2.5 text-right whitespace-nowrap">Thành tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {DATA_PHONG_KHAI_TRIEN.map((row) => (
                    <tr key={row.stt} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-3 py-2 text-center text-slate-500 whitespace-nowrap">{row.stt}</td>
                      <td className="px-3 py-2 font-mono text-[11px] text-slate-600 whitespace-nowrap font-medium">
                        {row.maNVL}
                      </td>
                      <td className="px-3 py-2 font-medium text-slate-800 whitespace-nowrap">
                        {row.tenHang}
                      </td>
                      <td className="px-3 py-2 text-center text-slate-600 whitespace-nowrap">{row.dvt}</td>
                      <td className="px-3 py-2 text-center text-slate-500 whitespace-nowrap">{row.ngayXuatKho}</td>
                      <td className="px-3 py-2 text-center text-slate-700 whitespace-nowrap">
                        {row.da31 ?? ''}
                      </td>
                      <td className="px-3 py-2 text-center font-bold text-slate-800 whitespace-nowrap">
                        {row.slXuat}
                      </td>
                      <td className="px-3 py-2 text-center text-slate-400 whitespace-nowrap">
                        {row.slSuDung}
                      </td>
                      <td className="px-3 py-2 text-right text-slate-700 whitespace-nowrap">
                        {formatNumber(row.donGia)}
                      </td>
                      <td className="px-3 py-2 text-right font-medium text-slate-800 whitespace-nowrap">
                        {formatNumber(row.thanhTien)}
                      </td>
                    </tr>
                  ))}

                  {/* Footer Tổng Phòng Khai triển */}
                  <tr className="bg-[#fffdf0] border-t border-amber-200/60 font-bold text-slate-800">
                    <td colSpan={6} className="px-3 py-2.5 text-right font-bold text-[11px] tracking-tight">
                      TỔNG Phòng Khai triển
                    </td>
                    <td className="px-3 py-2.5 text-center font-bold text-slate-900">
                      30
                    </td>
                    <td className="px-3 py-2.5 text-center text-slate-400">
                      —
                    </td>
                    <td className="px-3 py-2.5"></td>
                    <td className="px-3 py-2.5 text-right font-bold text-slate-900">
                      907.200
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
