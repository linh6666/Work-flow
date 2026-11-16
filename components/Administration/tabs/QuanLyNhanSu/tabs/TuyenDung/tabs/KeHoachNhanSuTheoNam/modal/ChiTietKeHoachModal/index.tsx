"use client";

import React, { useState } from 'react';
import {
  IconX,
  IconEdit,
  IconTrash,
  IconArrowsSort,
  IconArrowDown,
  IconMaximize,
  IconUsers,
  IconChartBar,
} from '@tabler/icons-react';
import { YearlyPlanRow } from '../../types';

interface ChiTietKeHoachModalProps {
  isOpen: boolean;
  item: YearlyPlanRow | null;
  onClose: () => void;
  onEdit?: (item: YearlyPlanRow) => void;
  onDelete?: (item: YearlyPlanRow) => void;
}

// Bảng 1: Kế hoạch nhân sự năm 2026 tổng hợp theo phòng
interface TongHopPhongItem {
  stt: number;
  phong: string;
  nv2025_tong: number;
  nv2025_full: number;
  nv2025_part?: number;
  tuyen_tong: number;
  tuyen_full: number;
  tuyen_part?: number;
  kehoach_tong: number;
  kehoach_full: number;
  kehoach_part?: number;
}

const mockTongHopPhong: TongHopPhongItem[] = [
  { stt: 1, phong: 'Ban Giám đốc', nv2025_tong: 3, nv2025_full: 3, tuyen_tong: 0, tuyen_full: 0, kehoach_tong: 3, kehoach_full: 3 },
  { stt: 2, phong: 'Khối Văn phòng', nv2025_tong: 5, nv2025_full: 5, tuyen_tong: 2, tuyen_full: 2, kehoach_tong: 7, kehoach_full: 7 },
  { stt: 3, phong: 'Phòng Công nghệ & Thiết kế', nv2025_tong: 5, nv2025_full: 5, tuyen_tong: 1, tuyen_full: 0, tuyen_part: 1, kehoach_tong: 6, kehoach_full: 5, kehoach_part: 1 },
  { stt: 4, phong: 'Phòng Khai triển bản vẽ', nv2025_tong: 6, nv2025_full: 6, tuyen_tong: 4, tuyen_full: 2, tuyen_part: 2, kehoach_tong: 10, kehoach_full: 8, kehoach_part: 2 },
  { stt: 5, phong: 'Phòng Cắt Laser', nv2025_tong: 5, nv2025_full: 3, nv2025_part: 2, tuyen_tong: 0, tuyen_full: 0, kehoach_tong: 5, kehoach_full: 3, kehoach_part: 2 },
  { stt: 6, phong: 'Phòng Ghép kỹ thuật', nv2025_tong: 24, nv2025_full: 9, nv2025_part: 15, tuyen_tong: -3, tuyen_full: 3, tuyen_part: -6, kehoach_tong: 21, kehoach_full: 12, kehoach_part: 9 },
  { stt: 7, phong: 'Phòng Mộc-Sơn', nv2025_tong: 3, nv2025_full: 3, tuyen_tong: 1, tuyen_full: 1, kehoach_tong: 4, kehoach_full: 4 },
  { stt: 8, phong: 'Phòng Hệ thống Điện', nv2025_tong: 10, nv2025_full: 4, nv2025_part: 6, tuyen_tong: -1, tuyen_full: 1, tuyen_part: -2, kehoach_tong: 9, kehoach_full: 5, kehoach_part: 4 },
  { stt: 9, phong: 'Phòng Cảnh quan', nv2025_tong: 15, nv2025_full: 8, nv2025_part: 7, tuyen_tong: 1, tuyen_full: 0, tuyen_part: 1, kehoach_tong: 16, kehoach_full: 8, kehoach_part: 8 },
];

// Bảng 2: Kế hoạch tuyển dụng chi tiết năm 2026
interface ChiTietTuyenDungItem {
  stt: number;
  phongBan: string;
  viTri: string;
  soLuongDangLam?: number;
  canTuyenFull?: number;
  canTuyenPart?: number;
  lyDo?: string;
  thoiDiem?: string;
  nguon?: string;
  duTruKinhPhi?: string;
  tongChiPhi?: string;
}

const mockChiTietTuyenDung: ChiTietTuyenDungItem[] = [
  { stt: 1, phongBan: 'Ban Giám đốc', viTri: 'Giám đốc', soLuongDangLam: 1 },
  { stt: 2, phongBan: 'Ban Giám đốc', viTri: 'PGĐ HC-NS', soLuongDangLam: 1 },
  { stt: 3, phongBan: 'Ban Giám đốc', viTri: 'PGĐ Kỹ Thuật', soLuongDangLam: 1 },
  { stt: 4, phongBan: 'Khối Văn phòng', viTri: 'Trưởng phòng', soLuongDangLam: 1 },
  { stt: 5, phongBan: 'Khối Văn phòng', viTri: 'Phó phòng', soLuongDangLam: 1 },
  { stt: 6, phongBan: 'Khối Văn phòng', viTri: 'Kinh doanh', soLuongDangLam: 1, canTuyenFull: 1, lyDo: 'Theo kế hoạch nhân sự', thoiDiem: 'Quý II', nguon: 'Jobgo+Joboko', duTruKinhPhi: '5.500.000', tongChiPhi: '5.500.000' },
  { stt: 7, phongBan: 'Khối Văn phòng', viTri: 'Quản lý Kho', soLuongDangLam: 1 },
  { stt: 8, phongBan: 'Khối Văn phòng', viTri: 'Hành chính tổng hợp', canTuyenFull: 1, lyDo: 'Theo kế hoạch nhân sự', thoiDiem: 'Quý II', nguon: 'Jobgo+Joboko', duTruKinhPhi: '5.500.000', tongChiPhi: '5.500.000' },
  { stt: 9, phongBan: 'Khối Văn phòng', viTri: 'Tạp vụ', soLuongDangLam: 1 },
  { stt: 10, phongBan: 'Khối Văn phòng', viTri: 'Lái xe', soLuongDangLam: 1 },
  { stt: 11, phongBan: 'Phòng Công nghệ & Thiết kế', viTri: 'Trưởng phòng', soLuongDangLam: 1 },
  { stt: 12, phongBan: 'Phòng Công nghệ & Thiết kế', viTri: 'Marketing', soLuongDangLam: 1 },
  { stt: 13, phongBan: 'Phòng Công nghệ & Thiết kế', viTri: 'Chụp, quay dựng phim', soLuongDangLam: 1 },
  { stt: 14, phongBan: 'Phòng Công nghệ & Thiết kế', viTri: 'Lập trình nhúng', soLuongDangLam: 1 },
  { stt: 15, phongBan: 'Phòng Công nghệ & Thiết kế', viTri: 'Lập trình web', soLuongDangLam: 1 },
  { stt: 16, phongBan: 'Phòng Công nghệ & Thiết kế', viTri: 'BTG-Design', canTuyenPart: 1, lyDo: 'Bổ sung', thoiDiem: 'Quý II', nguon: 'Facebook' },
  { stt: 17, phongBan: 'Phòng Khai triển bản vẽ', viTri: 'Trưởng phòng', soLuongDangLam: 1 },
  { stt: 18, phongBan: 'Phòng Khai triển bản vẽ', viTri: 'Phó phòng', soLuongDangLam: 1 },
  { stt: 19, phongBan: 'Phòng Khai triển bản vẽ', viTri: 'KTV 3D', soLuongDangLam: 1 },
  { stt: 20, phongBan: 'Phòng Khai triển bản vẽ', viTri: 'KTV Khai triển', soLuongDangLam: 3, canTuyenFull: 2, lyDo: 'Theo kế hoạch nhân sự', thoiDiem: 'Quý III', nguon: 'Top CV', duTruKinhPhi: '8.100.000', tongChiPhi: '16.200.000' },
  { stt: 21, phongBan: 'Phòng Khai triển bản vẽ', viTri: 'BTG-Khai triển', canTuyenPart: 2, lyDo: 'Bổ sung', thoiDiem: 'Quý II', nguon: 'Facebook' },
  { stt: 22, phongBan: 'Phòng Cắt Laser', viTri: 'Phó phòng', soLuongDangLam: 1 },
  { stt: 23, phongBan: 'Phòng Cắt Laser', viTri: 'KTV Cắt', soLuongDangLam: 2 },
  { stt: 24, phongBan: 'Phòng Cắt Laser', viTri: 'BTG-Cắt', soLuongDangLam: 2 },
  { stt: 25, phongBan: 'Phòng Ghép kỹ thuật', viTri: 'Trưởng phòng', soLuongDangLam: 1 },
  { stt: 26, phongBan: 'Phòng Ghép kỹ thuật', viTri: 'Phó phòng', soLuongDangLam: 1 },
  { stt: 27, phongBan: 'Phòng Ghép kỹ thuật', viTri: 'KTV Ghép', soLuongDangLam: 4 },
  { stt: 28, phongBan: 'Phòng Ghép kỹ thuật', viTri: 'Phụ ghép', soLuongDangLam: 3, canTuyenFull: 3, lyDo: 'Theo kế hoạch nhân sự', thoiDiem: 'Quý III', nguon: 'Facebook', duTruKinhPhi: '1.000.000', tongChiPhi: '3.000.000' },
  { stt: 29, phongBan: 'Phòng Ghép kỹ thuật', viTri: 'BTG-Ghép', soLuongDangLam: 15 },
  { stt: 30, phongBan: 'Phòng Mộc-Sơn', viTri: 'Trưởng phòng', soLuongDangLam: 1 },
  { stt: 31, phongBan: 'Phòng Mộc-Sơn', viTri: 'KTV Sơn', soLuongDangLam: 1 },
  { stt: 32, phongBan: 'Phòng Mộc-Sơn', viTri: 'Phụ sơn', soLuongDangLam: 1 },
  { stt: 33, phongBan: 'Phòng Mộc-Sơn', viTri: 'Phụ mộc', canTuyenFull: 1, lyDo: 'Theo kế hoạch nhân sự', thoiDiem: 'Quý II', nguon: 'Chợ tốt', duTruKinhPhi: '4.000.000', tongChiPhi: '4.000.000' },
  { stt: 34, phongBan: 'Phòng Hệ thống Điện', viTri: 'Trưởng phòng', soLuongDangLam: 1 },
  { stt: 35, phongBan: 'Phòng Hệ thống Điện', viTri: 'Phó phòng', soLuongDangLam: 1 },
  { stt: 36, phongBan: 'Phòng Hệ thống Điện', viTri: 'KTV Điện', soLuongDangLam: 1 },
  { stt: 37, phongBan: 'Phòng Hệ thống Điện', viTri: 'Phụ Điện', soLuongDangLam: 1, canTuyenFull: 1, lyDo: 'Theo kế hoạch nhân sự', thoiDiem: 'Quý II', nguon: 'Facebook', duTruKinhPhi: '2.000.000', tongChiPhi: '2.000.000' },
  { stt: 38, phongBan: 'Phòng Hệ thống Điện', viTri: 'BTG-Điện', soLuongDangLam: 6 },
  { stt: 39, phongBan: 'Phòng Cảnh quan', viTri: 'Trưởng phòng', soLuongDangLam: 1 },
  { stt: 40, phongBan: 'Phòng Cảnh quan', viTri: 'NV Cảnh quan', soLuongDangLam: 7 },
  { stt: 41, phongBan: 'Phòng Cảnh quan', viTri: 'BTG-Cảnh quan', soLuongDangLam: 7, canTuyenPart: 1, lyDo: 'Bổ sung', thoiDiem: 'Quý II', nguon: 'Facebook' },
];

export default function ChiTietKeHoachModal({
  isOpen,
  item,
  onClose,
  onEdit,
  onDelete,
}: ChiTietKeHoachModalProps) {
  const [sortOption1, setSortOption1] = useState('Thứ tự gốc');
  const [sortOption2, setSortOption2] = useState('Thứ tự gốc');

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 select-none overflow-hidden">
      <div className="bg-[#f8fafc] rounded-2xl shadow-2xl border border-slate-200/90 w-full max-w-[96vw] xl:max-w-[1360px] h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* ── Top Bar: Trạng thái & Thao tác (Đã bỏ nút < Kế hoạch của năm theo yêu cầu) ── */}
        <div className="px-5 py-3 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-800 tracking-tight">
              KẾ HOẠCH NHÂN SỰ {item.nam.toUpperCase()}
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Badge Trạng thái */}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#fef9c3] text-[#a16207] border border-[#fef08a]">
              {item.trangThai || 'Chờ QL KD duyệt'}
            </span>

            {/* Nút Sửa kế hoạch */}
            <button
              type="button"
              onClick={() => onEdit?.(item)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
            >
              <IconEdit size={14} className="text-slate-600" />
              <span>Sửa kế hoạch</span>
            </button>

            {/* Nút Xóa */}
            <button
              type="button"
              onClick={() => onDelete?.(item)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-white hover:bg-red-50 text-xs font-semibold text-red-600 shadow-2xs transition-all cursor-pointer"
            >
              <IconTrash size={14} />
              <span>Xóa</span>
            </button>

            {/* Nút Đóng Modal */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer ml-1"
              title="Đóng modal"
            >
              <IconX size={18} />
            </button>
          </div>
        </div>

        {/* ── Scrollable Body Content ── */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#f8fafc]">
          
          {/* SECTION 1: PHÊ DUYỆT KẾ HOẠCH NHÂN SỰ NĂM 2026 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
              PHÊ DUYỆT KẾ HOẠCH NHÂN SỰ NĂM 2026
            </h3>

            {/* 3 Sign-off approval cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: NGƯỜI LẬP */}
              <div className="p-4 rounded-xl bg-[#fffdf0] border border-[#fef08a] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#a16207] uppercase tracking-wider">
                    NGƯỜI LẬP
                  </span>
                  <div className="text-sm font-bold text-slate-800 mt-1">
                    {item.nguoiLap || 'Thao Phung'}
                  </div>
                </div>
                <div className="text-xs text-slate-500 mt-3 font-medium">
                  {item.ngayLap || '24/10/2026'}
                </div>
              </div>

              {/* Card 2: QL KINH DOANH */}
              <div className="p-4 rounded-xl bg-[#f5f8ff] border border-[#dbeafe] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#1e40af] uppercase tracking-wider">
                    QL KINH DOANH
                  </span>
                  <div className="text-sm font-semibold text-slate-600 mt-1">
                    Chờ duyệt
                  </div>
                </div>
              </div>

              {/* Card 3: PHÓ GIÁM ĐỐC */}
              <div className="p-4 rounded-xl bg-[#f0fdf4] border border-[#dcfce7] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#166534] uppercase tracking-wider">
                    PHÓ GIÁM ĐỐC
                  </span>
                  <div className="text-sm font-semibold text-slate-400 mt-1">
                    —
                  </div>
                </div>
              </div>
            </div>

            {/* Note bar */}
            <div className="px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
              Người lập: <strong className="text-slate-800">{item.nguoiLap || 'Thao Phung'}</strong> — Ngày lập: {item.ngayLap || '24/10/2026'} — Ghi chú: Số liệu theo file Kế hoạch nhân sự & tuyển dụng năm 2026.
            </div>
          </div>

          {/* SECTION 2: BẢNG KẾ HOẠCH NHÂN SỰ NĂM 2026 (TỔNG HỢP) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            {/* Header + Filter controls */}
            <div className="flex items-center justify-end gap-2 text-xs">
              <span className="text-slate-500 flex items-center gap-1 font-medium">
                <IconArrowsSort size={14} /> Sắp xếp theo:
              </span>
              <select
                value={sortOption1}
                onChange={(e) => setSortOption1(e.target.value)}
                className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium text-xs outline-none cursor-pointer"
              >
                <option value="Thứ tự gốc">Thứ tự gốc</option>
                <option value="Theo phòng ban">Theo phòng ban</option>
                <option value="Theo số lượng">Theo số lượng</option>
              </select>
              <button
                type="button"
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-xs cursor-pointer"
              >
                <IconArrowDown size={13} /> Giảm dần
              </button>
            </div>

            {/* Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  {/* Table Big Title */}
                  <thead>
                    <tr className="bg-[#1c384c] text-white">
                      <th colSpan={11} className="py-2.5 px-4 text-center font-bold text-xs uppercase tracking-wider">
                        KẾ HOẠCH NHÂN SỰ NĂM 2026
                      </th>
                    </tr>
                    {/* Multi-level Headers */}
                    <tr className="bg-[#244b62] text-white text-[11px] font-bold border-t border-slate-600">
                      <th rowSpan={2} className="py-2.5 px-3 w-12 text-center border-r border-slate-600/60">STT</th>
                      <th rowSpan={2} className="py-2.5 px-4 min-w-[200px] border-r border-slate-600/60">Phòng</th>
                      <th colSpan={3} className="py-2 px-3 text-center border-r border-slate-600/60">Số lượng nhân sự cuối năm 2025</th>
                      <th colSpan={3} className="py-2 px-3 text-center border-r border-slate-600/60">Số lượng nhân sự cần tuyển dụng</th>
                      <th colSpan={3} className="py-2 px-3 text-center">Kế hoạch dự kiến nhân sự 2026</th>
                    </tr>
                    <tr className="bg-[#2a5670] text-white text-[10.5px] font-semibold border-t border-slate-600/60">
                      {/* 2025 */}
                      <th className="py-1.5 px-2.5 text-center w-14 border-r border-slate-600/40">Tổng</th>
                      <th className="py-1.5 px-2.5 text-center w-14 border-r border-slate-600/40">Fulltime</th>
                      <th className="py-1.5 px-2.5 text-center w-14 border-r border-slate-600/60">Part time</th>
                      {/* Tuyển dụng */}
                      <th className="py-1.5 px-2.5 text-center w-14 border-r border-slate-600/40">Tổng</th>
                      <th className="py-1.5 px-2.5 text-center w-14 border-r border-slate-600/40">Fulltime</th>
                      <th className="py-1.5 px-2.5 text-center w-14 border-r border-slate-600/60">Part time</th>
                      {/* 2026 */}
                      <th className="py-1.5 px-2.5 text-center w-14 border-r border-slate-600/40">Tổng</th>
                      <th className="py-1.5 px-2.5 text-center w-14 border-r border-slate-600/40">Fulltime</th>
                      <th className="py-1.5 px-2.5 text-center w-14">Part time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {mockTongHopPhong.map((row) => (
                      <tr key={row.stt} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2 px-3 text-center text-slate-400 font-medium">{row.stt}</td>
                        <td className="py-2 px-4 font-medium text-slate-800">{row.phong}</td>
                        {/* 2025 */}
                        <td className="py-2 px-2.5 text-center font-semibold text-slate-700 bg-slate-50/30">{row.nv2025_tong}</td>
                        <td className="py-2 px-2.5 text-center text-slate-600">{row.nv2025_full}</td>
                        <td className="py-2 px-2.5 text-center text-slate-600">{row.nv2025_part || ''}</td>
                        {/* Tuyển dụng */}
                        <td className={`py-2 px-2.5 text-center font-bold ${row.tuyen_tong > 0 ? 'text-amber-600 bg-amber-50/30' : row.tuyen_tong < 0 ? 'text-rose-600 bg-rose-50/30' : 'text-slate-600'}`}>
                          {row.tuyen_tong}
                        </td>
                        <td className="py-2 px-2.5 text-center text-slate-600">{row.tuyen_full}</td>
                        <td className="py-2 px-2.5 text-center text-slate-600">{row.tuyen_part || ''}</td>
                        {/* 2026 */}
                        <td className="py-2 px-2.5 text-center font-bold text-[#406c89] bg-blue-50/30">{row.kehoach_tong}</td>
                        <td className="py-2 px-2.5 text-center text-slate-600">{row.kehoach_full}</td>
                        <td className="py-2 px-2.5 text-center text-slate-600">{row.kehoach_part || ''}</td>
                      </tr>
                    ))}
                    {/* TỔNG HÀNG CUỐI */}
                    <tr className="bg-[#8b6f4e] text-white font-bold">
                      <td colSpan={2} className="py-2.5 px-4 text-center tracking-wider">TỔNG</td>
                      <td className="py-2.5 px-2.5 text-center">76</td>
                      <td className="py-2.5 px-2.5 text-center">46</td>
                      <td className="py-2.5 px-2.5 text-center">30</td>
                      <td className="py-2.5 px-2.5 text-center">5</td>
                      <td className="py-2.5 px-2.5 text-center">9</td>
                      <td className="py-2.5 px-2.5 text-center">-4</td>
                      <td className="py-2.5 px-2.5 text-center">81</td>
                      <td className="py-2.5 px-2.5 text-center">55</td>
                      <td className="py-2.5 px-2.5 text-center">26</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SECTION 3: CHARTS / ĐỒ THỊ TRỰC QUAN */}
          <div className="space-y-4">
            {/* Chart 1: So sánh nhân sự theo phòng ban (Cột) */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconUsers size={16} className="text-indigo-600" />
                  <h4 className="text-xs font-bold text-slate-800">
                    So sánh nhân sự theo phòng ban <span className="font-normal text-slate-400 text-[11px]">(hiện tại / cần tuyển / kế hoạch)</span>
                  </h4>
                </div>
                <button type="button" className="text-slate-400 hover:text-slate-600 p-1">
                  <IconMaximize size={14} />
                </button>
              </div>

              {/* SVG Grouped Bar Chart */}
              <div className="w-full h-56 pt-2 pb-6 px-2">
                <svg viewBox="0 0 900 200" className="w-full h-full text-xs overflow-visible">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="880" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="40" y1="60" x2="880" y2="60" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="40" y1="100" x2="880" y2="100" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="40" y1="140" x2="880" y2="140" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="40" y1="180" x2="880" y2="180" stroke="#f1f5f9" strokeDasharray="3 3" />

                  {/* Y-axis labels */}
                  <text x="25" y="24" fill="#94a3b8" textAnchor="end" fontSize="10">24</text>
                  <text x="25" y="64" fill="#94a3b8" textAnchor="end" fontSize="10">16</text>
                  <text x="25" y="104" fill="#94a3b8" textAnchor="end" fontSize="10">8</text>
                  <text x="25" y="144" fill="#64748b" textAnchor="end" fontSize="10">0</text>
                  <text x="25" y="184" fill="#94a3b8" textAnchor="end" fontSize="10">-8</text>

                  {/* Bars for 9 departments */}
                  {/* Baseline: y = 140 (0), scale: 5px per unit */}
                  {/* 1. Ban Giám đốc: Hiện tại 3, Cần tuyển 0, Kế hoạch 3 */}
                  <g transform="translate(60, 0)">
                    <rect x="0" y="125" width="16" height="15" fill="#1e3a4b" rx="1" />
                    <rect x="36" y="125" width="16" height="15" fill="#0d9488" rx="1" />
                    <text x="25" y="160" fill="#64748b" fontSize="8.5" textAnchor="middle" transform="rotate(25, 25, 160)">Ban Giám đốc</text>
                  </g>

                  {/* 2. Khối Văn phòng: Hiện tại 5, Cần tuyển 2, Kế hoạch 7 */}
                  <g transform="translate(150, 0)">
                    <rect x="0" y="115" width="16" height="25" fill="#1e3a4b" rx="1" />
                    <rect x="18" y="130" width="16" height="10" fill="#f59e0b" rx="1" />
                    <rect x="36" y="105" width="16" height="35" fill="#0d9488" rx="1" />
                    <text x="25" y="160" fill="#64748b" fontSize="8.5" textAnchor="middle" transform="rotate(25, 25, 160)">Khối Văn phòng</text>
                  </g>

                  {/* 3. Phòng Công nghệ & Thiết kế: Hiện tại 5, Cần tuyển 1, Kế hoạch 6 */}
                  <g transform="translate(240, 0)">
                    <rect x="0" y="115" width="16" height="25" fill="#1e3a4b" rx="1" />
                    <rect x="18" y="135" width="16" height="5" fill="#f59e0b" rx="1" />
                    <rect x="36" y="110" width="16" height="30" fill="#0d9488" rx="1" />
                    <text x="25" y="160" fill="#64748b" fontSize="8.5" textAnchor="middle" transform="rotate(25, 25, 160)">Phòng Công nghệ & Thiết kế</text>
                  </g>

                  {/* 4. Phòng Khai triển bản vẽ: Hiện tại 6, Cần tuyển 4, Kế hoạch 10 */}
                  <g transform="translate(330, 0)">
                    <rect x="0" y="110" width="16" height="30" fill="#1e3a4b" rx="1" />
                    <rect x="18" y="120" width="16" height="20" fill="#f59e0b" rx="1" />
                    <rect x="36" y="90" width="16" height="50" fill="#0d9488" rx="1" />
                    <text x="25" y="160" fill="#64748b" fontSize="8.5" textAnchor="middle" transform="rotate(25, 25, 160)">Phòng Khai triển bản vẽ</text>
                  </g>

                  {/* 5. Phòng Cắt Laser: Hiện tại 5, Cần tuyển 0, Kế hoạch 5 */}
                  <g transform="translate(420, 0)">
                    <rect x="0" y="115" width="16" height="25" fill="#1e3a4b" rx="1" />
                    <rect x="36" y="115" width="16" height="25" fill="#0d9488" rx="1" />
                    <text x="25" y="160" fill="#64748b" fontSize="8.5" textAnchor="middle" transform="rotate(25, 25, 160)">Phòng Cắt Laser</text>
                  </g>

                  {/* 6. Phòng Ghép kỹ thuật: Hiện tại 24, Cần tuyển -3, Kế hoạch 21 */}
                  <g transform="translate(510, 0)">
                    <rect x="0" y="20" width="16" height="120" fill="#1e3a4b" rx="1" />
                    <rect x="18" y="140" width="16" height="15" fill="#f59e0b" rx="1" />
                    <rect x="36" y="35" width="16" height="105" fill="#0d9488" rx="1" />
                    <text x="25" y="160" fill="#64748b" fontSize="8.5" textAnchor="middle" transform="rotate(25, 25, 160)">Phòng Ghép kỹ thuật</text>
                  </g>

                  {/* 7. Phòng Mộc-Sơn: Hiện tại 3, Cần tuyển 1, Kế hoạch 4 */}
                  <g transform="translate(600, 0)">
                    <rect x="0" y="125" width="16" height="15" fill="#1e3a4b" rx="1" />
                    <rect x="18" y="135" width="16" height="5" fill="#f59e0b" rx="1" />
                    <rect x="36" y="120" width="16" height="20" fill="#0d9488" rx="1" />
                    <text x="25" y="160" fill="#64748b" fontSize="8.5" textAnchor="middle" transform="rotate(25, 25, 160)">Phòng Mộc-Sơn</text>
                  </g>

                  {/* 8. Phòng Hệ thống Điện: Hiện tại 10, Cần tuyển -1, Kế hoạch 9 */}
                  <g transform="translate(690, 0)">
                    <rect x="0" y="90" width="16" height="50" fill="#1e3a4b" rx="1" />
                    <rect x="18" y="140" width="16" height="5" fill="#f59e0b" rx="1" />
                    <rect x="36" y="95" width="16" height="45" fill="#0d9488" rx="1" />
                    <text x="25" y="160" fill="#64748b" fontSize="8.5" textAnchor="middle" transform="rotate(25, 25, 160)">Phòng Hệ thống Điện</text>
                  </g>

                  {/* 9. Phòng Cảnh quan: Hiện tại 15, Cần tuyển 1, Kế hoạch 16 */}
                  <g transform="translate(780, 0)">
                    <rect x="0" y="65" width="16" height="75" fill="#1e3a4b" rx="1" />
                    <rect x="18" y="135" width="16" height="5" fill="#f59e0b" rx="1" />
                    <rect x="36" y="60" width="16" height="80" fill="#0d9488" rx="1" />
                    <text x="25" y="160" fill="#64748b" fontSize="8.5" textAnchor="middle" transform="rotate(25, 25, 160)">Phòng Cảnh quan</text>
                  </g>
                </svg>
              </div>

              {/* Legends */}
              <div className="flex items-center justify-center gap-6 pt-1 text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 bg-[#1e3a4b] rounded-xs inline-block"></span>
                  <span className="text-slate-600 font-medium">Hiện tại</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 bg-[#f59e0b] rounded-xs inline-block"></span>
                  <span className="text-slate-600 font-medium">Cần tuyển</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 bg-[#0d9488] rounded-xs inline-block"></span>
                  <span className="text-slate-600 font-medium">Kế hoạch</span>
                </span>
              </div>
            </div>

            {/* Chart 2: So sánh chi phí tuyển dụng theo phòng ban (Thanh ngang) */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconChartBar size={16} className="text-purple-600" />
                  <h4 className="text-xs font-bold text-slate-800">
                    So sánh chi phí tuyển dụng theo phòng ban <span className="font-normal text-slate-400 text-[11px]">(dự trù kinh phí × số lượng cần tuyển)</span>
                  </h4>
                </div>
                <button type="button" className="text-slate-400 hover:text-slate-600 p-1">
                  <IconMaximize size={14} />
                </button>
              </div>

              {/* Horizontal Bars */}
              <div className="space-y-3.5 pt-1">
                {/* 1. Phòng Khai triển bản vẽ: 16.200.000 (Max: 18.000.000 -> 90%) */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-40 text-right font-medium text-slate-600 shrink-0 leading-tight">
                    Phòng Khai triển<br />bản vẽ
                  </div>
                  <div className="flex-1 bg-slate-100 h-6 rounded-md overflow-hidden relative">
                    <div className="bg-[#8b5cf6] h-full rounded-md transition-all duration-500" style={{ width: '90%' }}></div>
                  </div>
                </div>

                {/* 2. Khối Văn phòng: 11.000.000 -> 61% */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-40 text-right font-medium text-slate-600 shrink-0">
                    Khối Văn phòng
                  </div>
                  <div className="flex-1 bg-slate-100 h-6 rounded-md overflow-hidden relative">
                    <div className="bg-[#8b5cf6] h-full rounded-md transition-all duration-500" style={{ width: '61%' }}></div>
                  </div>
                </div>

                {/* 3. Phòng Mộc-Sơn: 4.000.000 -> 22.2% */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-40 text-right font-medium text-slate-600 shrink-0">
                    Phòng Mộc-Sơn
                  </div>
                  <div className="flex-1 bg-slate-100 h-6 rounded-md overflow-hidden relative">
                    <div className="bg-[#8b5cf6] h-full rounded-md transition-all duration-500" style={{ width: '22.2%' }}></div>
                  </div>
                </div>

                {/* 4. Phòng Ghép kỹ thuật: 3.000.000 -> 16.6% */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-40 text-right font-medium text-slate-600 shrink-0 leading-tight">
                    Phòng Ghép kỹ<br />thuật
                  </div>
                  <div className="flex-1 bg-slate-100 h-6 rounded-md overflow-hidden relative">
                    <div className="bg-[#8b5cf6] h-full rounded-md transition-all duration-500" style={{ width: '16.6%' }}></div>
                  </div>
                </div>

                {/* 5. Phòng Hệ thống Điện: 2.000.000 -> 11.1% */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-40 text-right font-medium text-slate-600 shrink-0 leading-tight">
                    Phòng Hệ thống<br />Điện
                  </div>
                  <div className="flex-1 bg-slate-100 h-6 rounded-md overflow-hidden relative">
                    <div className="bg-[#8b5cf6] h-full rounded-md transition-all duration-500" style={{ width: '11.1%' }}></div>
                  </div>
                </div>

                {/* X-axis scale numbers */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pl-43 pr-1 pt-1 border-t border-slate-200">
                  <span>0</span>
                  <span>4.500.000</span>
                  <span>9.000.000</span>
                  <span>13.500.000</span>
                  <span>18.000.000</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: BẢNG KẾ HOẠCH TUYỂN DỤNG CHI TIẾT NĂM 2026 (41 DÒNG) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            {/* Header + Filter controls */}
            <div className="flex items-center justify-end gap-2 text-xs">
              <span className="text-slate-500 flex items-center gap-1 font-medium">
                <IconArrowsSort size={14} /> Sắp xếp theo:
              </span>
              <select
                value={sortOption2}
                onChange={(e) => setSortOption2(e.target.value)}
                className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium text-xs outline-none cursor-pointer"
              >
                <option value="Thứ tự gốc">Thứ tự gốc</option>
                <option value="Theo phòng ban">Theo phòng ban</option>
                <option value="Theo vị trí">Theo vị trí</option>
              </select>
              <button
                type="button"
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-xs cursor-pointer"
              >
                <IconArrowDown size={13} /> Giảm dần
              </button>
            </div>

            {/* Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#1c384c] text-white">
                      <th colSpan={11} className="py-2.5 px-4 text-center font-bold text-xs uppercase tracking-wider">
                        KẾ HOẠCH TUYỂN DỤNG CHI TIẾT NĂM 2026
                      </th>
                    </tr>
                    <tr className="bg-[#244b62] text-white text-[11px] font-bold border-t border-slate-600">
                      <th className="py-2.5 px-2.5 w-10 text-center border-r border-slate-600/60">STT</th>
                      <th className="py-2.5 px-3 min-w-[140px] border-r border-slate-600/60">Phòng/Ban</th>
                      <th className="py-2.5 px-3 min-w-[130px] border-r border-slate-600/60">Vị trí tuyển dụng</th>
                      <th className="py-2.5 px-2 text-center w-16 border-r border-slate-600/60">Số lượng đang làm</th>
                      <th className="py-2.5 px-2 text-center w-16 border-r border-slate-600/60">Số lượng cần tuyển Full time</th>
                      <th className="py-2.5 px-2 text-center w-16 border-r border-slate-600/60">Số lượng cần tuyển Part time</th>
                      <th className="py-2.5 px-3 min-w-[120px] border-r border-slate-600/60">Lý do tuyển</th>
                      <th className="py-2.5 px-2.5 text-center w-20 border-r border-slate-600/60">Thời điểm tuyển dụng</th>
                      <th className="py-2.5 px-2.5 text-center w-24 border-r border-slate-600/60">Nguồn tuyển dụng</th>
                      <th className="py-2.5 px-3 text-right min-w-[100px] border-r border-slate-600/60">Dự trù kinh phí tuyển dụng</th>
                      <th className="py-2.5 px-3 text-right min-w-[100px]">Tổng chi phí</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {mockChiTietTuyenDung.map((row) => (
                      <tr key={row.stt} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2 px-2.5 text-center text-slate-400 font-medium">{row.stt}</td>
                        <td className="py-2 px-3 font-medium text-slate-800">{row.phongBan}</td>
                        <td className="py-2 px-3 text-slate-700">{row.viTri}</td>
                        <td className="py-2 px-2 text-center font-medium text-slate-600">{row.soLuongDangLam ?? ''}</td>
                        <td className={`py-2 px-2 text-center font-bold ${row.canTuyenFull ? 'text-amber-600 bg-amber-50/40' : 'text-slate-600'}`}>
                          {row.canTuyenFull ?? ''}
                        </td>
                        <td className={`py-2 px-2 text-center font-bold ${row.canTuyenPart ? 'text-purple-600 bg-purple-50/40' : 'text-slate-600'}`}>
                          {row.canTuyenPart ?? ''}
                        </td>
                        <td className="py-2 px-3 text-slate-500 text-[11px]">{row.lyDo ?? ''}</td>
                        <td className="py-2 px-2.5 text-center text-slate-600">{row.thoiDiem ?? ''}</td>
                        <td className="py-2 px-2.5 text-center text-slate-600">{row.nguon ?? ''}</td>
                        <td className="py-2 px-3 text-right font-medium text-slate-700">{row.duTruKinhPhi ?? ''}</td>
                        <td className="py-2 px-3 text-right font-bold text-slate-800">{row.tongChiPhi ?? ''}</td>
                      </tr>
                    ))}
                    {/* TỔNG HÀNG CUỐI */}
                    <tr className="bg-[#8b6f4e] text-white font-bold">
                      <td colSpan={3} className="py-2.5 px-4 text-center tracking-wider">TỔNG</td>
                      <td className="py-2.5 px-2 text-center">76</td>
                      <td className="py-2.5 px-2 text-center">9</td>
                      <td className="py-2.5 px-2 text-center">4</td>
                      <td colSpan={3} className="py-2.5 px-3"></td>
                      <td className="py-2.5 px-3 text-right">26.100.000</td>
                      <td className="py-2.5 px-3 text-right">36.200.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        {/* ── Footer ── */}
        <div className="px-5 py-3 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-400">
            Dữ liệu kế hoạch & tuyển dụng nhân sự năm 2026
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer transition shadow-2xs"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
