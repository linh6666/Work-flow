"use client";

import React, { useState, useEffect } from 'react';
import {
  IconClipboardList,
  IconDownload,
  IconSettings,
  IconPlus,
  IconArrowRight,
  IconSearch,
  IconPencil,
  IconTrash,
  IconRefresh,
  IconChevronLeft,
  IconChevronRight,
  IconUsers,
  IconFileText,
  IconStarFilled,
  IconArrowsLeftRight,
  IconUserPlus,
  IconCurrencyDollar,
  IconChartBar,
} from '@tabler/icons-react';
import CreateNhanSuModal from './modal/CreateNhanSuModal';
import NhanSuConfig from './config/NhanSuConfig';
import EditNhanSuModal from './editNhanSuModal/EditNhanSuModal';
import DeleteNhanSuModal from './deleteNhanSuModal/DeleteNhanSuModal';
import XemNhanSu from './xemNhanSu/XemNhanSu';

// ─── Types ────────────────────────────────────────────────────────────
type TrangThai = 'dang-dien' | 'da-tong-hop';

interface NhanSu {
  id: string;
  duAn: string;
  maKH: string;
  khachHang: string;
  nvLap: string;
  ngayLap: string;
  trangThai: TrangThai;
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

// ─── Mock Data ────────────────────────────────────────────────────────
const MOCK: NhanSu[] = [
  {
    id: '1',
    duAn: "D\u1ef0 \u00c1N L\u2019AURORA",
    maKH: '017-2026\nNS-MHV',
    khachHang: 'L\'Aurora',
    nvLap: 'Bùi Thị Duyên',
    ngayLap: '2026-08-17',
    trangThai: 'dang-dien',
    tyLeMoHinh: '1/200 & 1/87',
    kichThuocDuKien: '2400X1800MM & 1379 X 2069MM',
  },
  {
    id: '2',
    duAn: '1047–1055 DEARNESS DRIVE PROJECT',
    maKH: '016-2026\nNS-MHV',
    khachHang: 'Dearness Drive',
    nvLap: 'Kỳ Anh',
    ngayLap: '2026-08-09',
    trangThai: 'dang-dien',
    tyLeMoHinh: '1/50(1);1/25(2)',
    kichThuocDuKien: '1180×1010mm(1);2360×2020mm(2)',
  },
  {
    id: '3',
    duAn: 'DỰ ÁN KCN SÔNG LÔ',
    maKH: '015-2026\nNS-MHV',
    khachHang: 'KCN Sông Lô',
    nvLap: 'Kỳ Anh',
    ngayLap: '2026-08-09',
    trangThai: 'da-tong-hop',
    tyLeMoHinh: '1/1000',
    kichThuocDuKien: '2400×1800mm',
  },
  {
    id: '4',
    duAn: 'DỰ ÁN 7 - OLYMPIC',
    maKH: '014-2026\nNS-MHV',
    khachHang: 'Olympic',
    nvLap: 'Kỳ Anh',
    ngayLap: '2026-08-09',
    trangThai: 'da-tong-hop',
    tyLeMoHinh: '1/300',
    kichThuocDuKien: '5400×3400mm',
  },
  {
    id: '5',
    duAn: 'TAINA PROJECT',
    maKH: '001-2026\nNS-MHV',
    khachHang: 'Taina',
    nvLap: 'Bùi Phương Uyên',
    ngayLap: '2026-08-09',
    trangThai: 'dang-dien',
    tyLeMoHinh: 'Mô hình Việt tư vấn tỷ lệ',
    kichThuocDuKien: '1457X1380MM',
  },
  {
    id: '6',
    duAn: 'DỰ ÁN IA25 - CIPUTRA',
    maKH: '012-2026\nNS-MHV',
    khachHang: 'Ciputra',
    nvLap: 'Nguyễn Phú Quang',
    ngayLap: '2026-08-04',
    trangThai: 'dang-dien',
    tyLeMoHinh: '1/100',
    kichThuocDuKien: '3400×2400',
  },
  {
    id: '9',
    duAn: 'KHU NH\u00c0 \u1ede TH\u01af\u01a0NG M\u1ea0I 319, Y\u00caN M\u1ef8, H\u01afNG Y\u00caN',
    maKH: '011-2026\nNS-MHV',
    khachHang: 'TM 319 H\u01b0ng Y\u00ean',
    nvLap: 'Nguy\u1ec5n Ph\u00fa Quang',
    ngayLap: '2026-08-04',
    trangThai: 'dang-dien',
    tyLeMoHinh: '1/150 v\u00e0 1/200',
    kichThuocDuKien: '3400\u00d72600 v\u00e0 2600\u00d72000',
  },
  {
    id: '10',
    duAn: 'CH\u1ec2NH S\u1eeca M\u00d4 H\u00ccNH MARINA PH\u00da QU\u1ed0C',
    maKH: '010-2026\nNS-MHV',
    khachHang: 'Marina Ph\u00fa Qu\u1ed1c',
    nvLap: 'B\u00f9i Th\u1ecb Duy\u00ean',
    ngayLap: '2026-07-29',
    trangThai: 'da-tong-hop',
    tyLeMoHinh: '1/400',
    kichThuocDuKien: '4500\u00d74250 MM',
  },
  {
    id: '11',
    duAn: 'M\u00d4 H\u00ccNH QUY HO\u1ea0CH T\u1ec8NH H\u01afNG Y\u00caN',
    maKH: '009-2026\nNS-MHV',
    khachHang: 'T\u1ec9nh H\u01b0ng Y\u00ean',
    nvLap: 'kd',
    ngayLap: '2026-07-24',
    trangThai: 'dang-dien',
    tyLeMoHinh: '1/25000',
    kichThuocDuKien: '5.5m x 2.9m',
  },
  {
    id: '12',
    duAn: 'KHU CHUNG C\u01af TH\u00c0NH C\u00d4NG HARBOR VIEW',
    maKH: '005-2026\nNS-MHV',
    khachHang: 'Harbor View',
    nvLap: 'Ph\u00fa Quang',
    ngayLap: '2026-07-23',
    trangThai: 'dang-dien',
    tyLeMoHinh: '1/100',
    kichThuocDuKien: 'Ch\u01b0a c\u00f3',
  },
  {
    id: '13',
    duAn: 'H\u1ec6 TH\u1ed0NG THO\u00c1T N\u01af\u1edaC TP H\u00c0 N\u1ed8I',
    maKH: '004-2026\nNS-MHV',
    khachHang: 'Tho\u00e1t n\u01b0\u1edbc HN',
    nvLap: 'Ph\u00fa Quang',
    ngayLap: '2026-07-23',
    trangThai: 'dang-dien',
    tyLeMoHinh: 'Theo t\u1ec9 l\u1ec7 thi\u1ebft k\u1ebf',
    kichThuocDuKien: '3200\u00d72500mm',
  },
  {
    id: '14',
    duAn: 'M\u1eacu BI\u1ec6T TH\u1ef0 SLQR3_1/30; \u0110\u01a0N L\u1eacP DLRQ1_1/30; CLUBHOUSE 1/100',
    maKH: '003.01-2026\nNS-MHV',
    khachHang: 'Ecopark',
    nvLap: 'Duy\u00ean B\u00f9i',
    ngayLap: '2026-07-22',
    trangThai: 'da-tong-hop',
    tyLeMoHinh: '1/30, 1/100',
    kichThuocDuKien: '1400\u00d71250mm, 1600\u00d71250mm',
  },
  {
    id: '15',
    duAn: 'CH\u1ec2NH S\u1eeca M\u00d4 H\u00ccNH ECOPARK-VINH',
    maKH: '003.02-2026\nNS-MHV',
    khachHang: 'Ecopark Vinh',
    nvLap: 'B\u00f9i Th\u1ecb Duy\u00ean',
    ngayLap: '2026-07-22',
    trangThai: 'da-tong-hop',
    tyLeMoHinh: '1/500 & 1/2000',
    kichThuocDuKien: '3800\u00d73800mm, 1000\u00d71000mm',
  },
  {
    id: '16',
    duAn: 'INDUSTRIAL ZONE PHNOM PENH',
    maKH: '002-2026\nNS-MHV',
    khachHang: 'Phnom Penh',
    nvLap: 'Ph\u01b0\u01a1ng Uy\u00ean',
    ngayLap: '2026-07-22',
    trangThai: 'dang-dien',
    tyLeMoHinh: '1/1000',
    kichThuocDuKien: '3200X2400',
  },
  {
    id: '17',
    duAn: 'C\u00d4NG TY TNHH MTV THO\u00c1T N\u01af\u1edaC H\u00c0 N\u1ed8I',
    maKH: 'DKNS-004-2026',
    khachHang: 'Tho\u00e1t n\u01b0\u1edbc HN',
    nvLap: 'Thao Phung',
    ngayLap: '2026-07-22',
    trangThai: 'dang-dien',
    tyLeMoHinh: 'Theo t\u1ec9 l\u1ec7 thi\u1ebft k\u1ebf',
    kichThuocDuKien: '2.5mx3.2m',
  },
  {
    id: '18',
    duAn: 'C\u00d4NG TY TNHH VIETDUTCH TH\u0102NG LONG',
    maKH: 'DKNS-002-2026',
    khachHang: 'Vietdutch',
    nvLap: 'Thao Phung',
    ngayLap: '2026-07-21',
    trangThai: 'dang-dien',
    tyLeMoHinh: '1/500',
    kichThuocDuKien: '1500X1500MM',
  },
  {
    id: '19',
    duAn: 'T\u1ed4NG C\u00d4NG TY MBLAND',
    maKH: 'DKNS-004-2026',
    khachHang: 'MBLand',
    nvLap: 'Thao Phung',
    ngayLap: '2026-07-17',
    trangThai: 'dang-dien',
    tyLeMoHinh: '1/500',
    kichThuocDuKien: '3600X3600',
  },
];



// ─── Phòng ban data ──────────────────────────────────────────────────
interface PhongBan {
  ten: string;
  soHoSo: number;
  isActive?: boolean;
}

const PHONG_BAN: PhongBan[] = [
  { ten: 'Phòng Khai triển', soHoSo: 3 },
  { ten: 'Phòng Cắt', soHoSo: 2 },
  { ten: 'Phòng Ghép', soHoSo: 1 },
  { ten: 'Phòng Mộc Sơn', soHoSo: 0 },
  { ten: 'Phòng Điện', soHoSo: 6 },
  { ten: 'Phòng Cảnh Quan', soHoSo: 1, isActive: true },
  { ten: 'Phòng Công nghệ và Thiết kế', soHoSo: 0 },
  { ten: 'Lắp đặt', soHoSo: 9 },
];

// ─── Tab definitions ──────────────────────────────────────────────────
type TabKey =
  | 'nhan-su-du-an'
  | 'danh-sach-nhan-su'
  | 'hop-dong-ld'
  | 'danh-gia-thu-viec'
  | 'nv-vao-ra'
  | 'tuyen-dung'
  | 'bac-luong'
  | 'bao-cao-tham-nien';

interface Tab {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { key: 'nhan-su-du-an', label: 'Nhân sự Dự án', icon: <IconClipboardList size={14} /> },
  { key: 'danh-sach-nhan-su', label: 'Danh sách Nhân sự', icon: <IconUsers size={14} /> },
  { key: 'hop-dong-ld', label: 'Hợp đồng LĐ', icon: <IconFileText size={14} /> },
  { key: 'danh-gia-thu-viec', label: 'Đánh giá thử việc', icon: <IconStarFilled size={14} /> },
  { key: 'nv-vao-ra', label: 'NV vào/ra', icon: <IconArrowsLeftRight size={14} /> },
  { key: 'tuyen-dung', label: 'Tuyển dụng', icon: <IconUserPlus size={14} /> },
  { key: 'bac-luong', label: 'Bậc lương', icon: <IconCurrencyDollar size={14} /> },
  { key: 'bao-cao-tham-nien', label: 'Báo cáo thâm niên', icon: <IconChartBar size={14} /> },
];

export default function QuanLyNhanSu() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<NhanSu[]>(MOCK);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfigView, setIsConfigView] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<NhanSu | null>(null);
  const [isDeleteModalOpen, setIsDeletePlanModalOpen] = useState(false);
  const [deletingPlan, setDeletingPlan] = useState<NhanSu | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingPlan, setViewingPlan] = useState<NhanSu | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('nhan-su-du-an');

  const handleCreateNhanSu = (newNhanSu: Omit<NhanSu, 'id'>) => {
    const newId = (data.length + 1).toString();
    setData([{ ...newNhanSu, id: newId }, ...data]);
  };

  const handleSaveEdit = (updatedPlan: NhanSu) => {
    setData(prev => prev.map(item => item.id === updatedPlan.id ? updatedPlan : item));
    alert(`Đã cập nhật kế hoạch dự án: ${updatedPlan.duAn}`);
  };

  const handleConfirmDelete = (planId: string) => {
    setData(prev => prev.filter(item => item.id !== planId));
    alert('Đã xóa thành công kế hoạch nhân sự!');
  };

  // Filter logic
  const filtered = data.filter(item =>
    item.duAn.toLowerCase().includes(search.toLowerCase()) ||
    item.khachHang.toLowerCase().includes(search.toLowerCase()) ||
    item.maKH.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => { setCurrentPage(1); }, [search]);

  const totalFiltered = filtered.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFiltered);
  const paginatedData = filtered.slice(startIndex, endIndex);

  // Stats calculation
  const total = data.length;
  const dangDien = data.filter(item => item.trangThai === 'dang-dien').length;
  const hoanThanh = data.filter(item => item.trangThai === 'da-tong-hop').length;

  const tongChuaDien = PHONG_BAN.reduce((sum, pb) => sum + pb.soHoSo, 0);

  if (isConfigView) {
    return <NhanSuConfig onClose={() => setIsConfigView(false)} />;
  }

  if (isViewModalOpen && viewingPlan) {
    return (
      <XemNhanSu
        plan={viewingPlan}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingPlan(null);
        }}
        onPlanUpdate={handleSaveEdit}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">

      {/* ── Top-level Module Header ── */}
      <div className="px-5 pt-2.5 pb-2 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-1.5">
          <IconUsers size={16} className="text-indigo-600" />
          <h1 className="text-sm font-bold text-slate-800">Quản lý Nhân sự</h1>
          <span className="text-[11px] text-slate-400 ml-1 hidden sm:inline">Nhân sự dự án · Danh sách · Hợp đồng · Đánh giá · Tuyển dụng · Bậc lương</span>
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div className="px-5 pt-2 border-b border-slate-100 shrink-0">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {TABS.map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              style={
                activeTab === tab.key
                  ? { color: '#406c89', borderBottomColor: '#406c89', backgroundColor: '#eef4f7' }
                  : {}
              }
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-t-lg text-[11.5px] font-semibold transition-all cursor-pointer border-b-2 whitespace-nowrap shrink-0 ${
                activeTab === tab.key
                  ? 'border-b-2'
                  : 'text-slate-600 bg-slate-50 border-transparent hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Content ── */}
      {activeTab === 'nhan-su-du-an' ? (
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* ── Sub-header: title + action buttons ── */}
          <div className="px-5 pt-2.5 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-indigo-50 text-indigo-600">
                <IconClipboardList size={14} />
              </div>
              <h2 className="text-sm font-bold text-slate-800">Nhân sự Dự án</h2>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-[11.5px] font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer shadow-xs transition-all active:scale-95"
                onClick={() => setIsConfigView(true)}
              >
                <IconSettings size={12} />
                Cấu hình mẫu nhân sự
              </button>

              <button
                type="button"
                style={{ backgroundColor: '#406c89' }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white text-[11.5px] font-bold shadow-sm cursor-pointer transition-all active:scale-95"
                onClick={() => setIsModalOpen(true)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#222a68')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#406c89')}
              >
                <IconPlus size={12} />
                Tạo mẫu Bảng dự kiến Nhân sự
              </button>
            </div>
          </div>

          {/* ── Top widgets (shrink-0, cuộn nội bộ nếu cần) ── */}
          <div className="shrink-0 overflow-y-auto max-h-[45%] px-4 sm:px-5 pt-2.5 pb-0 space-y-3 no-scrollbar">

            {/* Workflow steps bar */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-100 bg-slate-50/60 flex-wrap text-[11.5px]">
              {/* Step 1 */}
              <div className="flex items-center gap-1 text-slate-400 font-medium">
                <span className="font-bold text-slate-600">NV Kinh doanh</span>
                <span>tạo mẫu nhân sự</span>
              </div>

              <IconArrowRight size={12} className="text-slate-300 shrink-0" />

              {/* Step 2 (Active) */}
              <div className="flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-0.5 font-semibold">
                <span>Trưởng phòng ban</span>
                <span className="text-slate-500 font-medium">điền thông tin NV &amp; ngày công</span>
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">9</span>
              </div>

              <IconArrowRight size={12} className="text-slate-300 shrink-0" />

              {/* Step 3 */}
              <div className="flex items-center gap-1 text-slate-400 font-medium">
                <span className="font-bold text-slate-600">Tổng hợp chi phí</span>
                <span className="text-slate-400">(0 hoàn thành)</span>
              </div>
            </div>

            {/* ── Chờ điền nhân sự theo Phòng ban ── */}
            <div className="rounded-lg border border-slate-100 bg-white p-3 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700">Chờ điền nhân sự theo Phòng ban</span>
                <span className="text-[11px] text-slate-400">
                  Tổng: <span className="font-bold text-slate-600">{tongChuaDien}</span> hồ sơ chưa điền
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
                {PHONG_BAN.map((pb) => {
                  const isEmpty = pb.soHoSo === 0;
                  return (
                    <button
                      key={pb.ten}
                      type="button"
                      className={`rounded-md border p-2 text-left transition-all cursor-pointer hover:shadow-sm active:scale-95 ${
                        pb.isActive
                          ? 'border-indigo-400 bg-indigo-50/60'
                          : isEmpty
                          ? 'border-slate-100 bg-slate-50/40'
                          : 'border-orange-200 bg-orange-50/50 hover:bg-orange-50'
                      }`}
                    >
                      <p className="text-[10px] text-slate-500 leading-tight mb-0.5">{pb.ten}</p>
                      <p className={`text-base font-extrabold ${
                        pb.isActive
                          ? 'text-indigo-600'
                          : pb.soHoSo === 0
                          ? 'text-slate-400'
                          : pb.soHoSo >= 6
                          ? 'text-red-500'
                          : 'text-orange-500'
                      }`}>
                        {pb.soHoSo}
                      </p>
                    </button>
                  );
                })}
              </div>

              <p className="text-[10px] text-slate-400 mt-1.5">
                * Số dự án mà phòng ban chưa điền thông tin nhân sự. Bấm vào ô phòng của bạn (nổi bật màu cam) để xem &amp; điền.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="rounded-lg border border-slate-100 bg-white px-3 py-2 shadow-xs flex items-center gap-3">
                <div>
                  <p className="text-[11px] font-semibold text-slate-500">Tổng kế hoạch</p>
                  <p className="text-xl font-extrabold text-indigo-700">{total}</p>
                </div>
              </div>
              <div className="rounded-lg border border-slate-100 bg-white px-3 py-2 shadow-xs flex items-center gap-3">
                <div>
                  <p className="text-[11px] font-semibold text-slate-500">Đang điền</p>
                  <p className="text-xl font-extrabold text-amber-600">{dangDien}</p>
                </div>
              </div>
              <div className="rounded-lg border border-slate-100 bg-white px-3 py-2 shadow-xs flex items-center gap-3">
                <div>
                  <p className="text-[11px] font-semibold text-slate-500">Hoàn thành</p>
                  <p className="text-xl font-extrabold text-emerald-600">{hoanThanh}</p>
                </div>
              </div>
            </div>

            {/* Search row */}
            <div className="relative pb-2.5">
              <IconSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm theo tên dự án, khách hàng..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 text-xs text-slate-700 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>
          </div>

          {/* ── Table zone (flex-1 min-h-0, giống KhachHang) ── */}
          <div className="flex-1 min-h-0 px-4 sm:px-5 pb-2.5 flex flex-col">
            {/* Table */}

            <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
              <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-slate-200">
                    <tr className="bg-slate-50">
                      <th className="px-4 py-3 font-bold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">Số DKNS</th>
                      <th className="px-4 py-3 font-bold text-slate-500 text-xs bg-slate-50 border-b border-slate-200">Tên dự án</th>
                      <th className="px-4 py-3 font-bold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">Tỷ lệ</th>
                      <th className="px-4 py-3 font-bold text-slate-500 text-xs bg-slate-50 border-b border-slate-200">Kích thước</th>
                      <th className="px-4 py-3 font-bold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">NV Lập</th>
                      <th className="px-4 py-3 font-bold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">Ngày lập</th>
                      <th className="px-4 py-3 font-bold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-10 text-slate-400">
                          <p className="font-semibold text-xs">Kh\u00f4ng t\u00ecm th\u1ea5y b\u1ea3n d\u1ef1 ki\u1ebfn nh\u00e2n s\u1ef1 n\u00e0o</p>
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((item) => {
                        const [maLine1, maLine2] = item.maKH.split('\n');
                        return (
                          <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">

                            {/* S\u1ed1 DKNS */}
                            <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                              <p className="font-bold text-slate-700 text-xs leading-tight">{maLine1 ?? item.maKH}</p>
                              {maLine2 && <p className="text-[10px] text-slate-400 font-medium mt-0.5">{maLine2}</p>}
                            </td>

                            {/* T\u00ean d\u1ef1 \u00e1n + action buttons */}
                            <td className="px-4 py-3.5 align-middle">
                              <div className="flex items-center gap-3">
                                <div className="min-w-0 max-w-[260px]">
                                  <button
                                    type="button"
                                    className="font-bold text-[#406c89] hover:underline cursor-pointer leading-snug text-xs text-left"
                                    onClick={() => { setViewingPlan(item); setIsViewModalOpen(true); }}
                                  >
                                    {item.duAn}
                                  </button>
                                </div>
                                {/* Inline action buttons */}
                                <div className="flex items-center gap-1 ml-1 shrink-0">
                                  <button
                                    type="button"
                                    title="Ch\u1ec9nh s\u1eeda"
                                    onClick={() => { setEditingPlan(item); setIsEditModalOpen(true); }}
                                    className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                                  >
                                    <IconPencil size={13} />
                                  </button>
                                  <button
                                    type="button"
                                    title="L\u00e0m m\u1edbi"
                                    className="p-1.5 rounded border border-slate-200 hover:bg-sky-50 text-slate-500 hover:text-sky-600 transition-colors cursor-pointer"
                                  >
                                    <IconRefresh size={13} />
                                  </button>
                                  <button
                                    type="button"
                                    title="X\u00f3a"
                                    onClick={() => { setDeletingPlan(item); setIsDeletePlanModalOpen(true); }}
                                    className="p-1.5 rounded border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                                  >
                                    <IconTrash size={13} />
                                  </button>
                                </div>
                              </div>
                            </td>

                            {/* T\u1ef7 l\u1ec7 */}
                            <td className="px-4 py-3.5 align-middle font-medium text-slate-600 text-xs whitespace-nowrap">
                              {item.tyLeMoHinh ?? '\u2014'}
                            </td>

                            {/* K\u00edch th\u01b0\u1edbc */}
                            <td className="px-4 py-3.5 align-middle text-slate-500 text-xs min-w-[150px]">
                              {item.kichThuocDuKien ?? '\u2014'}
                            </td>

                            {/* NV L\u1eadp */}
                            <td className="px-4 py-3.5 align-middle font-medium text-slate-600 text-xs whitespace-nowrap">
                              {item.nvLap}
                            </td>

                            {/* Ng\u00e0y l\u1eadp */}
                            <td className="px-4 py-3.5 align-middle text-slate-500 text-xs whitespace-nowrap">
                              {item.ngayLap}
                            </td>

                            {/* Trạng thái */}
                            <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                              {item.trangThai === 'dang-dien' ? (
                                <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-md text-amber-800 bg-amber-100">
                                  Đang điền
                                </span>
                              ) : (
                                <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-md text-green-800 bg-green-100">
                                  Đã tổng hợp
                                </span>
                              )}
                            </td>

                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION FOOTER — inside table box, like KhachHang */}
              <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
                <div>
                  Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalFiltered}</span> bản ghi
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <IconChevronLeft size={13} />
                    <span>Trước</span>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                        currentPage === page
                          ? 'bg-[#406c89] text-white shadow-2xs'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Sau</span>
                    <IconChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* Placeholder for other tabs */
        <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
          <div className="text-center">
            <p className="font-semibold text-slate-500 mb-1">
              {TABS.find(t => t.key === activeTab)?.label}
            </p>
            <p className="text-xs">Tính năng đang được phát triển.</p>
          </div>
        </div>
      )}

      <CreateNhanSuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateNhanSu}
      />

      <EditNhanSuModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingPlan(null);
        }}
        plan={editingPlan}
        onSave={handleSaveEdit}
      />

      <DeleteNhanSuModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeletePlanModalOpen(false);
          setDeletingPlan(null);
        }}
        plan={deletingPlan}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
}
