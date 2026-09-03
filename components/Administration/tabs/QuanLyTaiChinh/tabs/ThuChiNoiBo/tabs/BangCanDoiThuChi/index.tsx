"use client";

import React, { useState } from 'react';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconScale,
  IconRefresh,
  IconDownload,
  IconChartBar,
  IconCheck,
} from '@tabler/icons-react';
import { formatCurrency } from '../../../../types';

export interface ItemCanDoi {
  id: string;
  loai: 'Thu' | 'Chi';
  danhMuc: string;
  keHoach: number;
  thucTe: number;
  ghiChu?: string;
}

const INITIAL_CAN_DOI: ItemCanDoi[] = [
  // CÁC KHOẢN THU
  { id: 'cd-1', loai: 'Thu', danhMuc: 'Thu hợp đồng thi công & lắp đặt mô hình', keHoach: 1_800_000_000, thucTe: 1_560_000_000, ghiChu: 'Thu theo tiến độ hợp đồng' },
  { id: 'cd-2', loai: 'Thu', danhMuc: 'Thu báo giá dịch vụ bảo trì mô hình', keHoach: 150_000_000, thucTe: 120_000_000, ghiChu: 'Các gói bảo trì định kỳ' },
  { id: 'cd-3', loai: 'Thu', danhMuc: 'Thu khác (Tư vấn, bổ sung vật liệu)', keHoach: 50_000_000, thucTe: 45_000_000, ghiChu: 'Phát sinh tư vấn lẻ' },

  // CÁC KHOẢN CHI
  { id: 'cd-4', loai: 'Chi', danhMuc: 'Chi vật liệu mô hình (Gỗ, Mica, Đèn LED...)', keHoach: 420_000_000, thucTe: 385_000_000, ghiChu: 'NCC Minh Đức, Kim Phát' },
  { id: 'cd-5', loai: 'Chi', danhMuc: 'Chi nhân công & Lương xưởng mộc sơn', keHoach: 550_000_000, thucTe: 512_000_000, ghiChu: 'Lương khối sản xuất' },
  { id: 'cd-6', loai: 'Chi', danhMuc: 'Chi vận chuyển mô hình tận nơi', keHoach: 60_000_000, thucTe: 54_500_000, ghiChu: 'Xe tải chuyên dụng' },
  { id: 'cd-7', loai: 'Chi', danhMuc: 'Chi lắp đặt & hoàn thiện công trình', keHoach: 90_000_000, thucTe: 82_000_000, ghiChu: 'Đội lắp đặt công trình' },
  { id: 'cd-8', loai: 'Chi', danhMuc: 'Chi văn phòng & Điện nước quản lý', keHoach: 40_000_000, thucTe: 36_000_000, ghiChu: 'Chi phí vận hành VP' },
];

export default function BangCanDoiThuChiTab() {
  const [namFilter, setNamFilter] = useState('2026');
  const [kyFilter, setKyFilter] = useState('Cả năm');
  const [data] = useState<ItemCanDoi[]>(INITIAL_CAN_DOI);

  const listThu = data.filter((item) => item.loai === 'Thu');
  const listChi = data.filter((item) => item.loai === 'Chi');

  const tongThuKeHoach = listThu.reduce((acc, cur) => acc + cur.keHoach, 0);
  const tongThuThucTe = listThu.reduce((acc, cur) => acc + cur.thucTe, 0);
  const percentThu = tongThuKeHoach > 0 ? (tongThuThucTe / tongThuKeHoach) * 100 : 0;

  const tongChiKeHoach = listChi.reduce((acc, cur) => acc + cur.keHoach, 0);
  const tongChiThucTe = listChi.reduce((acc, cur) => acc + cur.thucTe, 0);
  const percentChi = tongChiKeHoach > 0 ? (tongChiThucTe / tongChiKeHoach) * 100 : 0;

  const canDoiKeHoach = tongThuKeHoach - tongChiKeHoach;
  const canDoiThucTe = tongThuThucTe - tongChiThucTe;

  const selectCls =
    "border border-slate-200 rounded-md px-2 py-0.5 text-[11px] text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer appearance-none pr-5 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%2210%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22%3E%3Cpath d=%22M6 9l6 6 6-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_5px_center] h-6.5";

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-3 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-0.5">
      {/* Top Filter Toolbar */}
      <div className="bg-white border border-slate-200/80 rounded-xl px-3 py-2 shadow-xs shrink-0 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500">Năm báo cáo:</span>
          <select value={namFilter} onChange={(e) => setNamFilter(e.target.value)} className={selectCls}>
            {['2026', '2025', '2024', '2023'].map((y) => (
              <option key={y} value={y}>
                Năm {y}
              </option>
            ))}
          </select>

          <span className="text-[11px] font-semibold text-slate-500 ml-2">Kỳ cân đối:</span>
          <select value={kyFilter} onChange={(e) => setKyFilter(e.target.value)} className={selectCls}>
            <option value="Cả năm">Cả năm</option>
            <option value="Quý 1">Quý 1</option>
            <option value="Quý 2">Quý 2</option>
            <option value="Quý 3">Quý 3</option>
            <option value="Quý 4">Quý 4</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1 rounded-md border border-slate-200 text-slate-600 text-[11px] font-semibold hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <IconRefresh size={12} /> Làm mới
          </button>
          <button
            type="button"
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#2d4a63] text-white text-[11px] font-bold hover:bg-[#1e3448] cursor-pointer transition-colors"
          >
            <IconDownload size={12} /> Xuất Báo Cáo
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-3 gap-2.5 shrink-0">
        {/* Thu Card */}
        <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <IconTrendingUp size={15} className="text-emerald-500" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Cân đối Thu</p>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200">
              {percentThu.toFixed(1)}% Đạt KH
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-base font-extrabold text-emerald-600">{formatCurrency(tongThuThucTe)}</p>
            <span className="text-[10px] text-slate-400">KH: {formatCurrency(tongThuKeHoach)}</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(percentThu, 100)}%` }}
            />
          </div>
        </div>

        {/* Chi Card */}
        <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <IconTrendingDown size={15} className="text-rose-500" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Cân đối Chi</p>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200">
              {percentChi.toFixed(1)}% Ngân sách
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-base font-extrabold text-rose-500">{formatCurrency(tongChiThucTe)}</p>
            <span className="text-[10px] text-slate-400">KH: {formatCurrency(tongChiKeHoach)}</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-rose-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(percentChi, 100)}%` }}
            />
          </div>
        </div>

        {/* Thặng dư / Cân đối Card */}
        <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <IconScale size={15} className="text-amber-500" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Cân đối Ròng (Thu - Chi)</p>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">
              Thặng dư
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className={`text-base font-extrabold ${canDoiThucTe >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
              {canDoiThucTe >= 0 ? '+' : ''}{formatCurrency(canDoiThucTe)}
            </p>
            <span className="text-[10px] text-slate-400">KH: {formatCurrency(canDoiKeHoach)}</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-[10px] text-emerald-600 font-semibold">
            <IconCheck size={12} /> Tài chính hoạt động tích cực
          </div>
        </div>
      </div>

      {/* Main Table: Bảng Cân Đối Chi Tiết */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs overflow-hidden">
        <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <IconChartBar size={16} className="text-[#406c89]" />
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Bảng Tổng Hợp Cân Đối Chi Tiết ({namFilter} - {kyFilter})
            </h4>
          </div>
          <span className="text-[10px] text-slate-400 italic">Đơn vị tính: VNĐ</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/40 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                <th className="py-2.5 px-4">STT & Danh Mục Hạch Toán</th>
                <th className="py-2.5 px-3 text-right">Kế Hoạch</th>
                <th className="py-2.5 px-3 text-right">Thực Tế</th>
                <th className="py-2.5 px-3 text-right">Chênh Lệch (+/-)</th>
                <th className="py-2.5 px-3 text-center">Tỷ Lệ (%)</th>
                <th className="py-2.5 px-4">Tiến Độ / Đánh Giá</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {/* SECTION I: CÁC KHOẢN THU */}
              <tr className="bg-emerald-50/40 font-bold text-emerald-900 text-[11px]">
                <td colSpan={6} className="py-2 px-4 uppercase tracking-wide text-emerald-800">
                  I. CÁC KHOẢN THU (REVENUE)
                </td>
              </tr>
              {listThu.map((item, idx) => {
                const diff = item.thucTe - item.keHoach;
                const pct = item.keHoach > 0 ? (item.thucTe / item.keHoach) * 100 : 0;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[9px] flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-slate-700 text-[11px]">{item.danhMuc}</p>
                          {item.ghiChu && <p className="text-[9.5px] text-slate-400">{item.ghiChu}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-medium text-slate-500 text-[11px]">
                      {formatCurrency(item.keHoach)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-600 text-[11px]">
                      {formatCurrency(item.thucTe)}
                    </td>
                    <td className={`py-2.5 px-3 text-right font-bold text-[11px] ${diff >= 0 ? 'text-emerald-600' : 'text-amber-500'}`}>
                      {diff >= 0 ? '+' : ''}{formatCurrency(diff)}
                    </td>
                    <td className="py-2.5 px-3 text-center font-semibold text-slate-600 text-[11px]">
                      {pct.toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-4 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          />
                        </div>
                        <span className="text-[9.5px] font-semibold text-emerald-600">Đạt</span>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* Subtotal Thu */}
              <tr className="bg-emerald-50/20 font-bold text-slate-800 text-[11px]">
                <td className="py-2 px-4 text-emerald-800">TỔNG CỘNG THU (I)</td>
                <td className="py-2 px-3 text-right text-slate-600">{formatCurrency(tongThuKeHoach)}</td>
                <td className="py-2 px-3 text-right text-emerald-600">{formatCurrency(tongThuThucTe)}</td>
                <td className="py-2 px-3 text-right text-emerald-600">
                  +{formatCurrency(tongThuThucTe - tongThuKeHoach)}
                </td>
                <td className="py-2 px-3 text-center text-emerald-700">{percentThu.toFixed(1)}%</td>
                <td className="py-2 px-4"></td>
              </tr>

              {/* SECTION II: CÁC KHOẢN CHI */}
              <tr className="bg-rose-50/40 font-bold text-rose-900 text-[11px]">
                <td colSpan={6} className="py-2 px-4 uppercase tracking-wide text-rose-800">
                  II. CÁC KHOẢN CHI (EXPENSES)
                </td>
              </tr>
              {listChi.map((item, idx) => {
                const diff = item.thucTe - item.keHoach;
                const pct = item.keHoach > 0 ? (item.thucTe / item.keHoach) * 100 : 0;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 font-bold text-[9px] flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-slate-700 text-[11px]">{item.danhMuc}</p>
                          {item.ghiChu && <p className="text-[9.5px] text-slate-400">{item.ghiChu}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-medium text-slate-500 text-[11px]">
                      {formatCurrency(item.keHoach)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-rose-500 text-[11px]">
                      {formatCurrency(item.thucTe)}
                    </td>
                    <td className={`py-2.5 px-3 text-right font-bold text-[11px] ${diff <= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {diff >= 0 ? '+' : ''}{formatCurrency(diff)}
                    </td>
                    <td className="py-2.5 px-3 text-center font-semibold text-slate-600 text-[11px]">
                      {pct.toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-4 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-rose-500 h-full rounded-full"
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          />
                        </div>
                        <span className="text-[9.5px] font-semibold text-emerald-600">Trong NS</span>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* Subtotal Chi */}
              <tr className="bg-rose-50/20 font-bold text-slate-800 text-[11px]">
                <td className="py-2 px-4 text-rose-800">TỔNG CỘNG CHI (II)</td>
                <td className="py-2 px-3 text-right text-slate-600">{formatCurrency(tongChiKeHoach)}</td>
                <td className="py-2 px-3 text-right text-rose-500">{formatCurrency(tongChiThucTe)}</td>
                <td className="py-2 px-3 text-right text-emerald-600">
                  {formatCurrency(tongChiThucTe - tongChiKeHoach)}
                </td>
                <td className="py-2 px-3 text-center text-rose-700">{percentChi.toFixed(1)}%</td>
                <td className="py-2 px-4"></td>
              </tr>

              {/* SECTION III: CHÊNH LỆCH CÂN ĐỐI RÒNG */}
              <tr className="bg-slate-900 text-white font-extrabold text-xs">
                <td className="py-3 px-4 uppercase tracking-wider text-amber-400">
                  III. CHÊNH LỆCH CÂN ĐỐI (THU - CHI)
                </td>
                <td className="py-3 px-3 text-right text-slate-300">{formatCurrency(canDoiKeHoach)}</td>
                <td className="py-3 px-3 text-right text-emerald-400">{formatCurrency(canDoiThucTe)}</td>
                <td className="py-3 px-3 text-right text-amber-300">
                  +{formatCurrency(canDoiThucTe - canDoiKeHoach)}
                </td>
                <td className="py-3 px-3 text-center text-emerald-300">
                  {((canDoiThucTe / (canDoiKeHoach || 1)) * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-4 text-[10px] font-normal text-slate-300">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <IconCheck size={13} /> Thặng dư an toàn
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
