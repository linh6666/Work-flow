"use client";

import React, { useState } from 'react';
import {
  IconClock,
  IconChevronLeft,
  IconChevronRight,
  IconFileSpreadsheet,
  IconPrinter,
  IconEye,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import Pagination from '@/common/pagination';
import ChiTietGioTTModal from './modal/ChiTietGioTTModal';
import SuaGioTTModal from './modal/SuaGioTTModal';
import XoaGioTTModal from './modal/XoaGioTTModal';

type PeriodKey = 'ngay' | 'tuan' | 'thang' | 'nam';

export interface GioTTStaffRow {
  id: string;
  hoTen: string;
  phongBan: string;
  ngayBC: number;
  gioTT: string;
  tbNgay: string;
  chuan8h: string;
  chenh: string;
  isNegative?: boolean;
  thieuNgay?: number;
  vuotNgay?: number;
}

const SAMPLE_GIO_TT_DATA: GioTTStaffRow[] = [
  { id: '1', hoTen: 'Trần Diễm My', phongBan: 'Phòng Khai triển', ngayBC: 22, gioTT: '255h', tbNgay: '11,6h', chuan8h: '176h', chenh: '+79h', thieuNgay: 1, vuotNgay: 20 },
  { id: '2', hoTen: 'Nguyễn Quang Linh', phongBan: 'Phòng Công nghệ và Thiết kế', ngayBC: 18, gioTT: '249h', tbNgay: '13,8h', chuan8h: '144h', chenh: '+105h', thieuNgay: 1, vuotNgay: 3 },
  { id: '3', hoTen: 'Nguyễn Thị Lanh', phongBan: 'Phòng Ghép', ngayBC: 21, gioTT: '199h', tbNgay: '9,5h', chuan8h: '168h', chenh: '+31h', vuotNgay: 14 },
  { id: '4', hoTen: 'Nguyễn Tuân', phongBan: 'Phòng Ghép', ngayBC: 21, gioTT: '193h', tbNgay: '9,2h', chuan8h: '168h', chenh: '+25h', thieuNgay: 1, vuotNgay: 12 },
  { id: '5', hoTen: 'Đinh Đức Lợi', phongBan: 'Phòng Ghép', ngayBC: 21, gioTT: '188,5h', tbNgay: '9h', chuan8h: '168h', chenh: '+20,5h', thieuNgay: 1, vuotNgay: 16 },
  { id: '6', hoTen: 'Lưu Quốc Nhật', phongBan: 'Phòng Công nghệ và Thiết kế', ngayBC: 20, gioTT: '188h', tbNgay: '9,4h', chuan8h: '160h', chenh: '+28h', thieuNgay: 1, vuotNgay: 6 },
  { id: '7', hoTen: 'Lê Quốc Long', phongBan: 'Phòng Khai triển', ngayBC: 15, gioTT: '185,5h', tbNgay: '12,4h', chuan8h: '120h', chenh: '+65,5h', thieuNgay: 1, vuotNgay: 10 },
  { id: '8', hoTen: 'Sầm Thị Thủy', phongBan: 'Phòng Cảnh Quan', ngayBC: 21, gioTT: '185,5h', tbNgay: '8,8h', chuan8h: '168h', chenh: '+17,5h', thieuNgay: 1, vuotNgay: 7 },
  { id: '9', hoTen: 'Bùi Ngọc Sỹ', phongBan: 'Phòng Ghép', ngayBC: 20, gioTT: '176,5h', tbNgay: '8,8h', chuan8h: '160h', chenh: '+16,5h', thieuNgay: 2, vuotNgay: 7 },
  { id: '10', hoTen: 'Cao Trường Thiên', phongBan: 'Phòng Công nghệ và Thiết kế', ngayBC: 20, gioTT: '176h', tbNgay: '8,8h', chuan8h: '160h', chenh: '+16h', thieuNgay: 2, vuotNgay: 3 },
  { id: '11', hoTen: 'Vũ Minh Hằng', phongBan: 'Phòng Cảnh Quan', ngayBC: 21, gioTT: '175h', tbNgay: '8,3h', chuan8h: '168h', chenh: '+7h', thieuNgay: 1, vuotNgay: 2 },
  { id: '12', hoTen: 'Nguyễn Thị Hương', phongBan: 'Phòng Cảnh Quan', ngayBC: 22, gioTT: '173,5h', tbNgay: '7,9h', chuan8h: '176h', chenh: '-2,5h', isNegative: true, thieuNgay: 2 },
  { id: '13', hoTen: 'Nguyễn Hoàng Phi Hùng', phongBan: 'Phòng Ghép', ngayBC: 21, gioTT: '167,6h', tbNgay: '8h', chuan8h: '168h', chenh: '-0,4h', isNegative: true, thieuNgay: 1, vuotNgay: 10 },
  { id: '14', hoTen: 'Bùi Thanh Xuân', phongBan: 'Phòng Điện', ngayBC: 20, gioTT: '161h', tbNgay: '8,1h', chuan8h: '160h', chenh: '+1h', vuotNgay: 1 },
  { id: '15', hoTen: 'Nguyễn Chí Hiếu', phongBan: 'Phòng Ghép', ngayBC: 19, gioTT: '161h', tbNgay: '8,5h', chuan8h: '152h', chenh: '+9h', thieuNgay: 4, vuotNgay: 6 },
  { id: '16', hoTen: 'Hoàng Hữu Vinh', phongBan: 'Phòng Cắt', ngayBC: 19, gioTT: '160h', tbNgay: '8,4h', chuan8h: '152h', chenh: '+8h', thieuNgay: 2, vuotNgay: 3 },
  { id: '17', hoTen: 'Lương Ngọc Thành', phongBan: 'Phòng Ghép', ngayBC: 19, gioTT: '156,5h', tbNgay: '8,2h', chuan8h: '152h', chenh: '+4,5h', thieuNgay: 1, vuotNgay: 8 },
  { id: '18', hoTen: 'Hà Tùng Lâm', phongBan: 'Phòng Điện', ngayBC: 18, gioTT: '151h', tbNgay: '8,4h', chuan8h: '144h', chenh: '+7h', thieuNgay: 1, vuotNgay: 2 },
  { id: '19', hoTen: 'Dương Việt Anh', phongBan: 'Phòng Khai triển', ngayBC: 19, gioTT: '150h', tbNgay: '7,9h', chuan8h: '152h', chenh: '-2h', isNegative: true, thieuNgay: 1 },
  { id: '20', hoTen: 'Đinh Hữu Sử', phongBan: 'Phòng Mộc Sơn', ngayBC: 18, gioTT: '149h', tbNgay: '8,3h', chuan8h: '144h', chenh: '+5h', thieuNgay: 1, vuotNgay: 7 },
  { id: '21', hoTen: 'Quan Minh Hoàng', phongBan: 'Phòng Mộc Sơn', ngayBC: 19, gioTT: '147h', tbNgay: '7,7h', chuan8h: '152h', chenh: '-5h', isNegative: true, thieuNgay: 3 },
  { id: '22', hoTen: 'Đào Văn Thọ', phongBan: 'Phòng Khai triển', ngayBC: 19, gioTT: '145h', tbNgay: '7,6h', chuan8h: '152h', chenh: '-7h', isNegative: true, thieuNgay: 1 },
  { id: '23', hoTen: 'Phạm Tiến Thành', phongBan: 'Phòng Khai triển', ngayBC: 20, gioTT: '144h', tbNgay: '7,2h', chuan8h: '160h', chenh: '-16h', isNegative: true, thieuNgay: 5 },
  { id: '24', hoTen: 'Trần Ngọc Hiếu', phongBan: 'Phòng Cắt', ngayBC: 19, gioTT: '142h', tbNgay: '7,5h', chuan8h: '152h', chenh: '-10h', isNegative: true, thieuNgay: 3, vuotNgay: 1 },
  { id: '25', hoTen: 'MÁY CẮT 2 - CMH1309-B-A-2025', phongBan: 'Phòng Cắt', ngayBC: 17, gioTT: '139h', tbNgay: '8,2h', chuan8h: '136h', chenh: '+3h', thieuNgay: 2, vuotNgay: 3 },
  { id: '26', hoTen: 'Nguyễn Thiên Hương', phongBan: 'Phòng Khai triển', ngayBC: 17, gioTT: '137,5h', tbNgay: '8,1h', chuan8h: '136h', chenh: '+1,5h', thieuNgay: 2, vuotNgay: 3 },
  { id: '27', hoTen: 'MÁY CẮT 1 - CMH1309-B-A-2025', phongBan: 'Phòng Cắt', ngayBC: 17, gioTT: '127h', tbNgay: '7,5h', chuan8h: '136h', chenh: '-9h', isNegative: true, thieuNgay: 2 },
  { id: '28', hoTen: 'Nguyễn Thanh Tuấn', phongBan: 'Phòng Khai triển', ngayBC: 3, gioTT: '105h', tbNgay: '35h', chuan8h: '24h', chenh: '+81h', thieuNgay: 1 },
  { id: '29', hoTen: 'MÁY CẮT 5 - CMH1610-B-A-2025', phongBan: 'Phòng Cắt', ngayBC: 10, gioTT: '56h', tbNgay: '5,6h', chuan8h: '80h', chenh: '-24h', isNegative: true, thieuNgay: 9 },
  { id: '30', hoTen: 'Bùi Phương Uyên', phongBan: 'Kinh doanh', ngayBC: 9, gioTT: '53h', tbNgay: '5,9h', chuan8h: '72h', chenh: '-19h', isNegative: true, thieuNgay: 7, vuotNgay: 2 },
  { id: '31', hoTen: 'Nguyễn Thị Thúy Kiều (BTG)', phongBan: 'Phòng Ghép', ngayBC: 8, gioTT: '53h', tbNgay: '6,6h', chuan8h: '64h', chenh: '-11h', isNegative: true, thieuNgay: 4, vuotNgay: 2 },
  { id: '32', hoTen: 'Lương Duy Khánh (BTG)', phongBan: 'Phòng Ghép', ngayBC: 9, gioTT: '51h', tbNgay: '5,7h', chuan8h: '72h', chenh: '-21h', isNegative: true, thieuNgay: 9 },
  { id: '33', hoTen: 'Bùi Phương Uyên', phongBan: 'Khối Văn phòng', ngayBC: 9, gioTT: '45,5h', tbNgay: '5,1h', chuan8h: '72h', chenh: '-26,5h', isNegative: true, thieuNgay: 7, vuotNgay: 2 },
  { id: '34', hoTen: 'Nguyễn Thị Quỳnh Châu (BTG)', phongBan: 'Phòng Ghép', ngayBC: 7, gioTT: '41h', tbNgay: '5,9h', chuan8h: '56h', chenh: '-15h', isNegative: true, thieuNgay: 4 },
  { id: '35', hoTen: 'Lê Minh Quyên', phongBan: 'Phòng Cảnh Quan', ngayBC: 2, gioTT: '32h', tbNgay: '16h', chuan8h: '16h', chenh: '+16h', vuotNgay: 1 },
  { id: '36', hoTen: 'Vũ Thị Hà Ly (BTG)', phongBan: 'Phòng Ghép', ngayBC: 6, gioTT: '23,5h', tbNgay: '3,9h', chuan8h: '48h', chenh: '-24,5h', isNegative: true, thieuNgay: 6 },
  { id: '37', hoTen: 'Ngô Hồng Hạnh', phongBan: 'Phòng Ghép', ngayBC: 1, gioTT: '22h', tbNgay: '22h', chuan8h: '8h', chenh: '+14h', vuotNgay: 1 },
  { id: '38', hoTen: 'Vũ Minh Ngọc (BTG)', phongBan: 'Phòng Cảnh Quan', ngayBC: 6, gioTT: '21,5h', tbNgay: '3,6h', chuan8h: '48h', chenh: '-26,5h', isNegative: true, thieuNgay: 6 },
  { id: '39', hoTen: 'MÁY CẮT 4 - CMH1309-B-A-2022', phongBan: 'Phòng Cắt', ngayBC: 4, gioTT: '18h', tbNgay: '4,5h', chuan8h: '32h', chenh: '-14h', isNegative: true, thieuNgay: 4 },
  { id: '40', hoTen: 'Nguyễn Chí Đạt', phongBan: 'Phòng Ghép', ngayBC: 1, gioTT: '16,5h', tbNgay: '16,5h', chuan8h: '8h', chenh: '+8,5h', vuotNgay: 1 },
  { id: '41', hoTen: 'Bùi Thị Duyên', phongBan: 'Khối Văn phòng', ngayBC: 2, gioTT: '10,6h', tbNgay: '5,3h', chuan8h: '16h', chenh: '-5,4h', isNegative: true, thieuNgay: 2 },
  { id: '42', hoTen: 'Trịnh Hải Nam', phongBan: 'Phòng Ghép', ngayBC: 1, gioTT: '10h', tbNgay: '10h', chuan8h: '8h', chenh: '+2h', vuotNgay: 1 },
  { id: '43', hoTen: 'Bùi Phương Minh', phongBan: 'Phòng Ghép', ngayBC: 1, gioTT: '9h', tbNgay: '9h', chuan8h: '8h', chenh: '+1h', vuotNgay: 1 },
  { id: '44', hoTen: 'Trần Thị Quỳnh Xuân', phongBan: 'Khối Văn phòng', ngayBC: 3, gioTT: '9h', tbNgay: '3h', chuan8h: '24h', chenh: '-15h', isNegative: true, thieuNgay: 3 },
  { id: '45', hoTen: 'Nguyễn Hoàng Phi Hùng, Lương Ngọc Thành', phongBan: 'Phòng Ghép', ngayBC: 1, gioTT: '6h', tbNgay: '6h', chuan8h: '8h', chenh: '-2h', isNegative: true, thieuNgay: 1 },
  { id: '46', hoTen: 'Vũ Khánh Hưng', phongBan: 'Phòng Ghép', ngayBC: 1, gioTT: '3,5h', tbNgay: '3,5h', chuan8h: '8h', chenh: '-4,5h', isNegative: true, thieuNgay: 1 },
  { id: '47', hoTen: 'Nguyễn Phú Quang', phongBan: 'Khối Văn phòng', ngayBC: 2, gioTT: '1h', tbNgay: '0,5h', chuan8h: '16h', chenh: '-15h', isNegative: true, thieuNgay: 2 },
];

export default function TheoDoiGioTTTab() {
  const [data, setData] = useState<GioTTStaffRow[]>(SAMPLE_GIO_TT_DATA);
  const [viewingRow, setViewingRow] = useState<GioTTStaffRow | null>(null);
  const [editingRow, setEditingRow] = useState<GioTTStaffRow | null>(null);
  const [deletingRow, setDeletingRow] = useState<GioTTStaffRow | null>(null);
  const [period, setPeriod] = useState<PeriodKey>('thang');
  const [selectedDate, setSelectedDate] = useState('2026-11-28');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const periodOptions: { key: PeriodKey; label: string }[] = [
    { key: 'ngay', label: 'Ngày' },
    { key: 'tuan', label: 'Tuần' },
    { key: 'thang', label: 'Tháng' },
    { key: 'nam', label: 'Năm' },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50 p-4 space-y-3 overflow-y-auto">
      {/* 1. 4 Stat Cards (đảo lên trên) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-3 shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500">Tổng Giờ TT</div>
          <div className="text-xl font-extrabold text-indigo-700 mt-0.5">6.286,2h</div>
          <div className="text-[11px] text-slate-400 mt-1">56 nhân sự · 754 ngày công</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-3 shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500">TB giờ / ngày công</div>
          <div className="text-xl font-extrabold text-slate-800 mt-0.5">8,3h</div>
          <div className="text-[11px] text-slate-400 mt-1">Chuẩn: 8h/ngày</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-3 shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500">Làm thiếu giờ</div>
          <div className="text-xl font-extrabold text-rose-600 mt-0.5">25 nhân sự</div>
          <div className="text-[11px] text-slate-400 mt-1">Thiếu 374,3h</div>
          <button
            type="button"
            className="text-[11px] font-semibold text-indigo-600 hover:underline mt-1 cursor-pointer"
          >
            Lọc danh sách ↓
          </button>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-3 shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500">Làm quá giờ</div>
          <div className="text-xl font-extrabold text-amber-600 mt-0.5">30 nhân sự</div>
          <div className="text-[11px] text-slate-400 mt-1">Vượt 628,5h · 213 BC lệch KH</div>
          <button
            type="button"
            className="text-[11px] font-semibold text-indigo-600 hover:underline mt-1 cursor-pointer"
          >
            Lọc danh sách ↓
          </button>
        </div>
      </div>

      {/* 2. Toolbar Header Card (đảo xuống dưới) */}
      <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-3 shadow-2xs shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <IconClock size={16} className="text-indigo-600" />
                <span>Theo dõi Giờ TT</span>
              </div>
              <div className="flex items-center gap-1 ml-1">
                {periodOptions.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setPeriod(opt.key)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-colors cursor-pointer ${
                      period === opt.key
                        ? 'bg-[#406c89] text-white border-[#406c89]'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Tháng 11/2026 · Chỉ tính báo cáo đã duyệt · Chuẩn 8 giờ/ngày công
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer"
              title="Kỳ trước"
            >
              <IconChevronLeft size={14} />
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 outline-none focus:border-[#406c89]"
            />
            <button
              type="button"
              className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer"
              title="Kỳ sau"
            >
              <IconChevronRight size={14} />
            </button>
            <button
              type="button"
              className="h-8 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <IconFileSpreadsheet size={14} className="text-emerald-600" />
              <span>Excel</span>
            </button>
            <button
              type="button"
              className="h-8 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <IconPrinter size={14} className="text-slate-600" />
              <span>In báo cáo</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Data Table */}
      <div className="flex-1 min-h-0 flex flex-col bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0">
          <table className="min-w-max w-full text-xs text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500">
              <tr>
                <th className="px-3 py-2.5 whitespace-nowrap">Nhân sự</th>
                <th className="px-3 py-2.5 whitespace-nowrap">Phòng ban</th>
                <th className="px-3 py-2.5 text-center whitespace-nowrap">Ngày BC</th>
                <th className="px-3 py-2.5 text-center whitespace-nowrap">Giờ TT</th>
                <th className="px-3 py-2.5 text-center whitespace-nowrap">TB/ngày</th>
                <th className="px-3 py-2.5 text-center whitespace-nowrap">Chuẩn 8h</th>
                <th className="px-3 py-2.5 text-center whitespace-nowrap">Chênh</th>
                <th className="px-3 py-2.5 text-center whitespace-nowrap">Cảnh báo</th>
                <th className="px-3 py-2.5 text-right whitespace-nowrap">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-3 py-2.5 font-semibold text-slate-800 whitespace-nowrap">
                    {row.hoTen}
                  </td>
                  <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap">
                    {row.phongBan}
                  </td>
                  <td className="px-3 py-2.5 text-center text-slate-700 font-medium whitespace-nowrap">
                    {row.ngayBC}
                  </td>
                  <td className="px-3 py-2.5 text-center font-bold text-indigo-700 whitespace-nowrap">
                    {row.gioTT}
                  </td>
                  <td className="px-3 py-2.5 text-center text-slate-700 font-medium whitespace-nowrap">
                    {row.tbNgay}
                  </td>
                  <td className="px-3 py-2.5 text-center text-slate-400 whitespace-nowrap">
                    {row.chuan8h}
                  </td>
                  <td
                    className={`px-3 py-2.5 text-center font-bold whitespace-nowrap ${
                      row.isNegative ? 'text-rose-600' : 'text-amber-600'
                    }`}
                  >
                    {row.chenh}
                  </td>
                  <td className="px-3 py-2 text-center whitespace-nowrap">
                    <div className="inline-flex flex-col items-center gap-1">
                      {row.thieuNgay !== undefined && (
                        <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200/70 text-[10px] font-semibold">
                          Thiếu {row.thieuNgay} ngày
                        </span>
                      )}
                      {row.vuotNgay !== undefined && (
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/70 text-[10px] font-semibold">
                          Vượt {row.vuotNgay} ngày
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        title="Xem chi tiết"
                        onClick={() => setViewingRow(row)}
                        className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-sky-600 transition-colors cursor-pointer"
                      >
                        <IconEye size={13} />
                      </button>
                      <button
                        type="button"
                        title="Chỉnh sửa"
                        onClick={() => setEditingRow(row)}
                        className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        <IconPencil size={13} />
                      </button>
                      <button
                        type="button"
                        title="Xóa"
                        onClick={() => setDeletingRow(row)}
                        className="p-1.5 rounded border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                      >
                        <IconTrash size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalRecords}
          itemsPerPage={itemsPerPage}
          itemName="nhân sự"
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modals */}
      <ChiTietGioTTModal item={viewingRow} onClose={() => setViewingRow(null)} />
      <SuaGioTTModal
        item={editingRow}
        onClose={() => setEditingRow(null)}
        onSave={(updated) => {
          setData((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
        }}
      />
      <XoaGioTTModal
        item={deletingRow}
        onClose={() => setDeletingRow(null)}
        onConfirm={(id) => {
          setData((prev) => prev.filter((r) => r.id !== id));
        }}
      />
    </div>
  );
}
