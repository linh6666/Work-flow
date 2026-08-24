"use client";

import React, { useState, useEffect } from 'react';
import {
  IconSearch,
  IconDownload,
  IconUpload,
  IconRefresh,
  IconPlus,
  IconNotebook,
  IconTrendingUp,
  IconEye,
  IconPencil,
  IconTrash,
  IconCheck,
  IconClock,
  IconAlertCircle,
  IconX,
  IconCash,
  IconSelector,
  IconArrowDown,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import { formatDate } from '../../../../types';
import ThemHopDongModal from './modals/ThemHopDong';
import { NewHopDongForm } from './modals/types';

interface HopDongItem {
  id: string;
  stt: number;
  soHD: string;
  subHD?: string;
  tenCongTrinh: string;
  tenKH: string;
  maKH: string;
  kichThuoc: string;
  tyLe: string;
  tongGTHD: number;
  gtPhatSinh: number;
  dtNamCu: number;
  tongDaThu: number;
  conPhaiThu: number;
  ngayKy: string;
  nam: number;
  thang: number;
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
    id: 'hd-1',
    stt: 1,
    soHD: '08-2019',
    subHD: 'HĐ-MHV',
    tenCongTrinh: 'DỰ ÁN SUNSHINE CRYSTAL RIVER',
    tenKH: 'CÔNG TY CỔ PHẦN XÂY LẮP SUNSHINE E&C',
    maKH: '—',
    kichThuoc: '4800 x 2400',
    tyLe: '1/100',
    tongGTHD: 1_440_493_560,
    gtPhatSinh: 0,
    dtNamCu: 0,
    tongDaThu: 900_000_000,
    conPhaiThu: 540_493_560,
    ngayKy: '2019-08-15',
    nam: 2019,
    thang: 8,
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Tạm ứng)', soTien: 900_000_000, ngay: '2019-08-20', trangThai: 'Đã thanh toán' },
      { dot: 'Đợt 2 (Bàn giao)', soTien: 540_493_560, ngay: '2019-10-15', trangThai: 'Chờ thanh toán' },
    ],
  },
  {
    id: 'hd-2',
    stt: 2,
    soHD: '41-2018',
    subHD: 'HĐ-MHV',
    tenCongTrinh: 'Dự án PARK HYATT',
    tenKH: 'Cty CP Thực phẩm Bim',
    maKH: 'VN00021',
    kichThuoc: '—',
    tyLe: '—',
    tongGTHD: 1_760_453_629,
    gtPhatSinh: 324_500_000,
    dtNamCu: 730_122_906,
    tongDaThu: 1_200_000_000,
    conPhaiThu: 884_953_629,
    ngayKy: '2018-11-10',
    nam: 2018,
    thang: 11,
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Tạm ứng)', soTien: 1_200_000_000, ngay: '2018-11-15', trangThai: 'Đã thanh toán' },
      { dot: 'Đợt 2 (Phát sinh)', soTien: 884_953_629, ngay: '2019-02-20', trangThai: 'Chờ thanh toán' },
    ],
  },
  {
    id: 'hd-3',
    stt: 3,
    soHD: '39-2018',
    subHD: 'HĐ-MHV',
    tenCongTrinh: 'DỰ ÁN SUNSHINE MARINA NHA TRANG',
    tenKH: 'CÔNG TY CỔ PHẦN ADG HOLDING',
    maKH: 'VN00092',
    kichThuoc: '4700 x 2500',
    tyLe: '1/100',
    tongGTHD: 2_275_522_500,
    gtPhatSinh: 0,
    dtNamCu: 910_209_000,
    tongDaThu: 1_500_000_000,
    conPhaiThu: 775_522_500,
    ngayKy: '2018-10-05',
    nam: 2018,
    thang: 10,
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Ký HĐ)', soTien: 1_500_000_000, ngay: '2018-10-10', trangThai: 'Đã thanh toán' },
      { dot: 'Đợt 2 (Nghiệm thu)', soTien: 775_522_500, ngay: '2019-01-15', trangThai: 'Chờ thanh toán' },
    ],
  },
  {
    id: 'hd-4',
    stt: 4,
    soHD: '02-2019',
    subHD: 'HĐ-MHV',
    tenCongTrinh: 'Vinhomes star City',
    tenKH: 'TẬP ĐOÀN VINGROUP - CÔNG TY CP',
    maKH: '—',
    kichThuoc: '5500x4300',
    tyLe: '1/350',
    tongGTHD: 971_109_700,
    gtPhatSinh: 28_160_000,
    dtNamCu: 0,
    tongDaThu: 600_000_000,
    conPhaiThu: 399_269_700,
    ngayKy: '2019-02-12',
    nam: 2019,
    thang: 2,
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Tạm ứng)', soTien: 600_000_000, ngay: '2019-02-18', trangThai: 'Đã thanh toán' },
    ],
  },
  {
    id: 'hd-5',
    stt: 5,
    soHD: '01-2019',
    subHD: 'HĐ-MHV',
    tenCongTrinh: 'VSIP Bắc Ninh',
    tenKH: 'CÔNG TY TNHH VSIP BẮC NINH',
    maKH: '—',
    kichThuoc: '23,5 m2',
    tyLe: '1/750',
    tongGTHD: 955_735_000,
    gtPhatSinh: 0,
    dtNamCu: 0,
    tongDaThu: 500_000_000,
    conPhaiThu: 455_735_000,
    ngayKy: '2019-01-20',
    nam: 2019,
    thang: 1,
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Tạm ứng)', soTien: 500_000_000, ngay: '2019-01-25', trangThai: 'Đã thanh toán' },
    ],
  },
  {
    id: 'hd-6',
    stt: 6,
    soHD: '180919-2019',
    subHD: 'HĐ-MHV',
    tenCongTrinh: 'MÔ HÌNH DỰ ÁN GOLDEN PALACE A',
    tenKH: 'CÔNG TY TNHH KINH DOANH BẤT ĐỘNG SẢN MIK HOME',
    maKH: '—',
    kichThuoc: '4000x4000',
    tyLe: '1/200',
    tongGTHD: 996_211_700,
    gtPhatSinh: 0,
    dtNamCu: 896_590_530,
    tongDaThu: 600_000_000,
    conPhaiThu: 396_211_700,
    ngayKy: '2019-09-18',
    nam: 2019,
    thang: 9,
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Tạm ứng)', soTien: 600_000_000, ngay: '2019-09-20', trangThai: 'Đã thanh toán' },
    ],
  },
  {
    id: 'hd-7',
    stt: 7,
    soHD: '03-2019',
    subHD: 'HĐ-MHV',
    tenCongTrinh: 'Quy hoạch khu đô thị FPT Đà Nẵng',
    tenKH: 'FPT CITY',
    maKH: '—',
    kichThuoc: '4800x3200',
    tyLe: '1/500',
    tongGTHD: 799_871_600,
    gtPhatSinh: 0,
    dtNamCu: 0,
    tongDaThu: 400_000_000,
    conPhaiThu: 399_871_600,
    ngayKy: '2019-03-10',
    nam: 2019,
    thang: 3,
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Ký HĐ)', soTien: 400_000_000, ngay: '2019-03-15', trangThai: 'Đã thanh toán' },
    ],
  },
  {
    id: 'hd-8',
    stt: 8,
    soHD: '—',
    subHD: '',
    tenCongTrinh: 'Dự án Sunshine Golden River',
    tenKH: 'CÔNG TY CỔ PHẦN XÂY LẮP SUNSHINE E&C',
    maKH: '—',
    kichThuoc: '2100x1500MM',
    tyLe: '1/100',
    tongGTHD: 699_483_015,
    gtPhatSinh: 0,
    dtNamCu: 0,
    tongDaThu: 300_000_000,
    conPhaiThu: 399_483_015,
    ngayKy: '2019-05-14',
    nam: 2019,
    thang: 5,
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Tạm ứng)', soTien: 300_000_000, ngay: '2019-05-20', trangThai: 'Đã thanh toán' },
    ],
  },
  {
    id: 'hd-9',
    stt: 9,
    soHD: '11-2019',
    subHD: 'HĐ-MHV',
    tenCongTrinh:
      '- 01 Shop Villas Phú Quốc - Chỉnh sửa khu Shop Villas Phú Quốc QHTT Marina Phú Quốc, đặt tại Hà Nội.- CS Shop Villas Phú Quốc trên MH QHTT Marina Phú Quốc, đặt tại Phú Quốc.- CS Shop Villas Phú Quốc trên MH QHTT Marina Phú Quốc, đặt tại Hồ Chí Minh.',
    tenKH: 'CÔNG TY TNHH BIM KIÊN GIANG',
    maKH: '—',
    kichThuoc: '—',
    tyLe: '—',
    tongGTHD: 682_936_100,
    gtPhatSinh: 0,
    dtNamCu: 0,
    tongDaThu: 400_000_000,
    conPhaiThu: 282_936_100,
    ngayKy: '2019-11-01',
    nam: 2019,
    thang: 11,
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Tạm ứng)', soTien: 400_000_000, ngay: '2019-11-05', trangThai: 'Đã thanh toán' },
    ],
  },
  {
    id: 'hd-10',
    stt: 10,
    soHD: '48-2018',
    subHD: 'HĐ-MHV',
    tenCongTrinh:
      '01 MH QHTT - Dự án Wonder Villa - 01 Mô hình Mẫu Shophouse , - 01 Mô hình mẫu biệt thự đơn lập',
    tenKH: 'CÔNG TY CỔ PHẦN XÂY LẮP SUNSHINE E&C',
    maKH: 'VN00092',
    kichThuoc: '3900x2700 2200x1400 1500 x 1150',
    tyLe: '1/150 1/25',
    tongGTHD: 1_073_620_295,
    gtPhatSinh: 0,
    dtNamCu: 429_448_118,
    tongDaThu: 600_000_000,
    conPhaiThu: 473_620_295,
    ngayKy: '2018-12-15',
    nam: 2018,
    thang: 12,
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Tạm ứng)', soTien: 600_000_000, ngay: '2018-12-20', trangThai: 'Đã thanh toán' },
    ],
  },
  {
    id: 'hd-11',
    stt: 11,
    soHD: '—',
    subHD: '',
    tenCongTrinh: 'MÔ HÌNH DỰ ÁN VINHOMES MARINA',
    tenKH: 'MÔ HÌNH DỰ ÁN VINHOMES MARINA',
    maKH: '—',
    kichThuoc: '—',
    tyLe: '1/150',
    tongGTHD: 609_503_400,
    gtPhatSinh: 0,
    dtNamCu: 0,
    tongDaThu: 300_000_000,
    conPhaiThu: 309_503_400,
    ngayKy: '2019-04-10',
    nam: 2019,
    thang: 4,
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Tạm ứng)', soTien: 300_000_000, ngay: '2019-04-15', trangThai: 'Đã thanh toán' },
    ],
  },
  {
    id: 'hd-12',
    stt: 12,
    soHD: '49-2018',
    subHD: 'HĐ-MHV',
    tenCongTrinh: 'Dự án Sunshine Marina Nha Trang thứ ba - Lắp đặt tại Nha Trang',
    tenKH: 'CÔNG TY CỔ PHẦN ADG HOLDING',
    maKH: 'VN00092',
    kichThuoc: '4700x2500',
    tyLe: '1/100',
    tongGTHD: 1_130_690_358,
    gtPhatSinh: 0,
    dtNamCu: 452_276_143,
    tongDaThu: 600_000_000,
    conPhaiThu: 530_690_358,
    ngayKy: '2018-12-25',
    nam: 2018,
    thang: 12,
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Tạm ứng)', soTien: 600_000_000, ngay: '2018-12-30', trangThai: 'Đã thanh toán' },
    ],
  },
  {
    id: 'hd-13',
    stt: 13,
    soHD: '36-2019',
    subHD: 'HĐ-MHV',
    tenCongTrinh: 'DỰ ÁN THE LOTUS CENTER',
    tenKH: 'CÔNG TY CỔ PHẦN BẤT ĐỘNG SẢN BELLEVILLE HÀ NỘI',
    maKH: '—',
    kichThuoc: '3500x2700 MM',
    tyLe: '1/500',
    tongGTHD: 586_374_580,
    gtPhatSinh: 0,
    dtNamCu: 175_912_374,
    tongDaThu: 350_000_000,
    conPhaiThu: 236_374_580,
    ngayKy: '2019-07-15',
    nam: 2019,
    thang: 7,
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Tạm ứng)', soTien: 350_000_000, ngay: '2019-07-20', trangThai: 'Đã thanh toán' },
    ],
  },
  {
    id: 'hd-14',
    stt: 14,
    soHD: '34-2019',
    subHD: 'HĐ-MHV',
    tenCongTrinh: 'MÔ HÌNH LE MERIDIEN',
    tenKH: 'CÔNG TY CỔ PHẦN MBLAND TONKIN',
    maKH: '—',
    kichThuoc: '2100X2100 MM',
    tyLe: '1/200',
    tongGTHD: 431_041_600,
    gtPhatSinh: 22_000_000,
    dtNamCu: 0,
    tongDaThu: 250_000_000,
    conPhaiThu: 181_041_600,
    ngayKy: '2019-06-25',
    nam: 2019,
    thang: 6,
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Tạm ứng)', soTien: 250_000_000, ngay: '2019-06-30', trangThai: 'Đã thanh toán' },
    ],
  },
  {
    id: 'hd-15',
    stt: 15,
    soHD: '12-2019',
    subHD: 'HĐ-MHV',
    tenCongTrinh:
      '- 01 mô hình dự án Windham Hạ Long - Lắp đặt tại Quảng Ninh, tỷ lệ 1/300, kích thước 1900x3400 mm. - Chỉnh sửa khu Windham Hạ Long trên mô hình dự án Quy',
    tenKH: 'CÔNG TY CỔ PHẦN ĐẦU TƯ PHÁT TRIỂN SYRENA VIỆT NAM',
    maKH: '—',
    kichThuoc: '—',
    tyLe: '—',
    tongGTHD: 435_767_200,
    gtPhatSinh: 0,
    dtNamCu: 0,
    tongDaThu: 200_000_000,
    conPhaiThu: 235_767_200,
    ngayKy: '2019-12-05',
    nam: 2019,
    thang: 12,
    trangThai: 'Đang thu',
    cacDotThanhToan: [
      { dot: 'Đợt 1 (Tạm ứng)', soTien: 200_000_000, ngay: '2019-12-10', trangThai: 'Đã thanh toán' },
    ],
  },
];

// Helper to format VND like 1.440.493.560 đ or —
const formatVNDDisplay = (val: number, showDashIfZero = false) => {
  if (showDashIfZero && val === 0) return '—';
  return new Intl.NumberFormat('vi-VN').format(val) + ' đ';
};

export default function DanhSachHopDongTab() {
  const [dataList, setDataList] = useState<HopDongItem[]>(SAMPLE_HOP_DONG);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNam, setSelectedNam] = useState<string>('2019');
  const [selectedThang, setSelectedThang] = useState<string>('Tất cả');

  // Modals state
  const [selectedHD, setSelectedHD] = useState<HopDongItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHD, setEditingHD] = useState<HopDongItem | null>(null);
  const [deletingHD, setDeletingHD] = useState<HopDongItem | null>(null);

  // Sorting state
  const [sortColumn, setSortColumn] = useState<keyof HopDongItem | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedNam, selectedThang]);



  const handleSort = (column: keyof HopDongItem) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Filtered & Sorted List
  const filteredData = dataList
    .filter((item) => {
      const matchSearch =
        item.soHD.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tenCongTrinh.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tenKH.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.maKH.toLowerCase().includes(searchTerm.toLowerCase());

      const matchNam = selectedNam === 'Tất cả' || item.nam.toString() === selectedNam;
      const matchThang = selectedThang === 'Tất cả' || item.thang.toString() === selectedThang;

      return matchSearch && matchNam && matchThang;
    })
    .sort((a, b) => {
      if (!sortColumn) return 0;
      const valA = a[sortColumn];
      const valB = b[sortColumn];

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return 0;
    });

  // Pagination Calculations
  const totalFiltered = filteredData.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFiltered);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Computed metrics for 5 KPI cards
  const tongGTHD = filteredData.reduce((acc, curr) => acc + curr.tongGTHD, 0);
  const tongGTPhatSinh = filteredData.reduce((acc, curr) => acc + curr.gtPhatSinh, 0);
  const tongDTNamCu = filteredData.reduce((acc, curr) => acc + curr.dtNamCu, 0);
  const tongDaThu = filteredData.reduce((acc, curr) => acc + curr.tongDaThu, 0);
  const tongConPhaiThu = filteredData.reduce((acc, curr) => acc + curr.conPhaiThu, 0);

  const handleAddNewRow = (form: NewHopDongForm) => {
    const valTong = parseFloat(form.tongGTHD) || 0;
    const valPS = parseFloat(form.gtPhatSinh) || 0;
    const valNC = parseFloat(form.dtNamCu) || 0;

    const created: HopDongItem = {
      id: `hd-${Date.now()}`,
      stt: dataList.length + 1,
      soHD: form.soHD || '—',
      subHD: form.subHD || 'HĐ-MHV',
      tenCongTrinh: form.tenCongTrinh,
      tenKH: form.tenKH || '—',
      maKH: form.maKH || '—',
      kichThuoc: form.kichThuoc || '—',
      tyLe: form.tyLe || '—',
      tongGTHD: valTong,
      gtPhatSinh: valPS,
      dtNamCu: valNC,
      tongDaThu: 0,
      conPhaiThu: valTong,
      ngayKy: new Date().toISOString().split('T')[0],
      nam: new Date().getFullYear(),
      thang: new Date().getMonth() + 1,
      trangThai: 'Đang thu',
      cacDotThanhToan: [
        { dot: 'Đợt 1 (Tạm ứng)', soTien: valTong * 0.3, ngay: new Date().toISOString().split('T')[0], trangThai: 'Chờ thanh toán' },
      ],
    };

    setDataList([...dataList, created]);
    setShowAddModal(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHD) return;

    setDataList(
      dataList.map((item) => (item.id === editingHD.id ? editingHD : item))
    );
    setEditingHD(null);
  };

  const handleDeleteRow = () => {
    if (!deletingHD) return;
    const updated = dataList
      .filter((item) => item.id !== deletingHD.id)
      .map((item, idx) => ({ ...item, stt: idx + 1 }));
    setDataList(updated);
    setDeletingHD(null);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden space-y-2.5 text-slate-700">
      {/* Top Filter & Actions Row matching the original design image */}
      <div className="shrink-0 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Left Filters: Năm & Tháng */}
          <div className="flex items-center gap-1.5">
            <select
              value={selectedNam}
              onChange={(e) => setSelectedNam(e.target.value)}
              className="bg-white border border-slate-200/90 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="2019">Năm 2019</option>
              <option value="2018">Năm 2018</option>
              <option value="2026">Năm 2026</option>
              <option value="Tất cả">Tất cả năm</option>
            </select>

            <select
              value={selectedThang}
              onChange={(e) => setSelectedThang(e.target.value)}
              className="bg-white border border-slate-200/90 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="Tất cả">Tất cả tháng</option>
              <option value="1">Tháng 1</option>
              <option value="2">Tháng 2</option>
              <option value="3">Tháng 3</option>
              <option value="4">Tháng 4</option>
              <option value="5">Tháng 5</option>
              <option value="6">Tháng 6</option>
              <option value="7">Tháng 7</option>
              <option value="8">Tháng 8</option>
              <option value="9">Tháng 9</option>
              <option value="10">Tháng 10</option>
              <option value="11">Tháng 11</option>
              <option value="12">Tháng 12</option>
            </select>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
            >
              <IconDownload size={13} className="text-slate-500" />
              <span>Export</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
            >
              <IconUpload size={13} className="text-slate-500" />
              <span>Import</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedNam('2019');
                setSelectedThang('Tất cả');
                setSortColumn(null);
              }}
              className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
            >
              <IconRefresh size={13} className="text-slate-500" />
              <span>Làm mới</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1 px-3 py-1 bg-[#406c89] hover:bg-[#33566e] text-white text-[11px] font-bold rounded-lg shadow-2xs transition-all cursor-pointer"
            >
              <IconPlus size={13} />
              <span>Thêm dòng</span>
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="max-w-md sm:max-w-lg">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm theo số HĐ, công trình, khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-3 pr-8 py-1.5 bg-white border border-slate-200/90 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#406c89] shadow-2xs transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <IconX size={14} />
              </button>
            )}
          </div>
        </div>

        {/* 5 KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {/* Card 1: TỔNG GT HĐ */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
            <div className="flex items-center gap-1 mb-1">
              <IconNotebook size={14} className="text-[#3b82f6]" />
              <span className="text-[10px] font-extrabold text-[#3b82f6] uppercase tracking-wide">
                TỔNG GT HĐ
              </span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-[#3730a3]">
              {formatVNDDisplay(tongGTHD)} <u className="underline decoration-[#3730a3]">đ</u>
            </p>
          </div>

          {/* Card 2: GT PHÁT SINH */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
            <div className="flex items-center gap-1 mb-1">
              <IconTrendingUp size={14} className="text-[#8b5cf6]" />
              <span className="text-[10px] font-extrabold text-[#8b5cf6] uppercase tracking-wide">
                GT PHÁT SINH
              </span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-[#7c3aed]">
              {formatVNDDisplay(tongGTPhatSinh)} <u className="underline decoration-[#7c3aed]">đ</u>
            </p>
          </div>

          {/* Card 3: DT NĂM CŨ */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
            <div className="flex items-center gap-1 mb-1">
              <IconTrendingUp size={14} className="text-[#d97706]" />
              <span className="text-[10px] font-extrabold text-[#d97706] uppercase tracking-wide">
                DT NĂM CŨ
              </span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-[#b45309]">
              {formatVNDDisplay(tongDTNamCu)} <u className="underline decoration-[#b45309]">đ</u>
            </p>
          </div>

          {/* Card 4: TỔNG ĐÃ THU */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
            <div className="flex items-center gap-1 mb-1">
              <IconTrendingUp size={14} className="text-[#059669]" />
              <span className="text-[10px] font-extrabold text-[#059669] uppercase tracking-wide">
                TỔNG ĐÃ THU
              </span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-[#047857]">
              {formatVNDDisplay(tongDaThu)} <u className="underline decoration-[#047857]">đ</u>
            </p>
          </div>

          {/* Card 5: CÒN PHẢI THU */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
            <div className="flex items-center gap-1 mb-1">
              <IconTrendingUp size={14} className="text-[#dc2626]" />
              <span className="text-[10px] font-extrabold text-[#dc2626] uppercase tracking-wide">
                CÒN PHẢI THU
              </span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-[#b91c1c]">
              {formatVNDDisplay(tongConPhaiThu)} <u className="underline decoration-[#b91c1c]">đ</u>
            </p>
          </div>
        </div>
      </div>

      {/* ── Original Table Layout Preserved Exactly as in Image ── */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
          <div className="flex-1 overflow-auto min-h-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-slate-50/90 text-slate-500 uppercase text-[9.5px] font-bold border-b border-slate-200/80 select-none">
                <tr>
                  <th className="py-2.5 px-2 text-center w-8">STT</th>

                  <th
                    onClick={() => handleSort('soHD')}
                    className="py-2.5 px-2.5 cursor-pointer hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Số HĐ</span>
                      <IconSelector size={12} className="text-slate-400 shrink-0" />
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('tenCongTrinh')}
                    className="py-2.5 px-2.5 cursor-pointer hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Tên công trình</span>
                      <IconSelector size={12} className="text-slate-400 shrink-0" />
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('tenKH')}
                    className="py-2.5 px-2.5 cursor-pointer hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Tên KH</span>
                      <IconSelector size={12} className="text-slate-400 shrink-0" />
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('maKH')}
                    className="py-2.5 px-2.5 cursor-pointer hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Mã KH</span>
                      <IconSelector size={12} className="text-slate-400 shrink-0" />
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('kichThuoc')}
                    className="py-2.5 px-2.5 cursor-pointer hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Kích thước</span>
                      <IconSelector size={12} className="text-slate-400 shrink-0" />
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('tyLe')}
                    className="py-2.5 px-2.5 cursor-pointer hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Tỷ lệ</span>
                      <IconSelector size={12} className="text-slate-400 shrink-0" />
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('tongGTHD')}
                    className="py-2.5 px-2.5 text-right cursor-pointer hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Tổng GT HĐ</span>
                      <IconSelector size={12} className="text-slate-400 shrink-0" />
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('gtPhatSinh')}
                    className="py-2.5 px-2.5 text-right cursor-pointer hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>GT Phát sinh</span>
                      <IconSelector size={12} className="text-slate-400 shrink-0" />
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('dtNamCu')}
                    className="py-2.5 px-2.5 text-right text-amber-600 cursor-pointer hover:bg-amber-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>DT năm cũ</span>
                      <IconSelector size={12} className="text-amber-500 shrink-0" />
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('tongDaThu')}
                    className="py-2.5 px-2.5 text-right text-emerald-600 cursor-pointer hover:bg-emerald-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Tổng đã thu</span>
                      <IconArrowDown size={12} className="text-emerald-600 shrink-0" />
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('conPhaiThu')}
                    className="py-2.5 px-2.5 text-right text-rose-600 cursor-pointer hover:bg-rose-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Còn phải thu</span>
                      <IconSelector size={12} className="text-rose-500 shrink-0" />
                    </div>
                  </th>

                  <th className="py-2.5 px-2.5 text-center w-24">Thao tác</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="p-4 text-center text-slate-400 text-xs">
                      Không tìm thấy dữ liệu hợp đồng nào phù hợp.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, index) => {
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* STT */}
                        <td className="py-2 px-2 text-center font-semibold text-slate-500">
                          {startIndex + index + 1}
                        </td>

                        {/* Số HĐ */}
                        <td className="py-2 px-2.5 whitespace-nowrap">
                          <span
                            onClick={() => setSelectedHD(item)}
                            className="font-extrabold text-[#406c89] hover:underline cursor-pointer"
                            title="Xem chi tiết đợt thanh toán"
                          >
                            {item.soHD}
                          </span>
                          {item.subHD && (
                            <div className="text-[9.5px] text-slate-400 font-normal">{item.subHD}</div>
                          )}
                        </td>

                        {/* Tên công trình */}
                        <td className="py-2 px-2.5">
                          <div
                            onClick={() => setSelectedHD(item)}
                            className="font-bold text-slate-800 line-clamp-2 max-w-[280px] cursor-pointer hover:text-[#406c89]"
                            title={item.tenCongTrinh}
                          >
                            {item.tenCongTrinh}
                          </div>
                        </td>

                        {/* Tên KH */}
                        <td className="py-2 px-2.5 text-slate-700 max-w-[200px]" title={item.tenKH}>
                          <div className="line-clamp-2 text-[10.5px] font-semibold">{item.tenKH}</div>
                        </td>

                        {/* Mã KH */}
                        <td className="py-2 px-2.5 text-slate-500 whitespace-nowrap font-mono text-[10px]">
                          {item.maKH || '—'}
                        </td>

                        {/* Kích thước */}
                        <td className="py-2 px-2.5 text-slate-600 whitespace-nowrap">
                          {item.kichThuoc || '—'}
                        </td>

                        {/* Tỷ lệ */}
                        <td className="py-2 px-2.5 text-slate-600 whitespace-nowrap font-semibold">
                          {item.tyLe || '—'}
                        </td>

                        {/* Tổng GT HĐ */}
                        <td className="py-2 px-2.5 text-right font-extrabold text-[#3730a3] whitespace-nowrap">
                          {formatVNDDisplay(item.tongGTHD, true)}
                        </td>

                        {/* GT Phát sinh */}
                        <td className="py-2 px-2.5 text-right font-bold text-[#7c3aed] whitespace-nowrap">
                          {formatVNDDisplay(item.gtPhatSinh, true)}
                        </td>

                        {/* DT năm cũ */}
                        <td className="py-2 px-2.5 text-right font-bold text-amber-600 whitespace-nowrap">
                          {formatVNDDisplay(item.dtNamCu, true)}
                        </td>

                        {/* Tổng đã thu */}
                        <td className="py-2 px-2.5 text-right font-extrabold text-emerald-600 whitespace-nowrap">
                          {formatVNDDisplay(item.tongDaThu, true)}
                        </td>

                        {/* Còn phải thu */}
                        <td className="py-2 px-2.5 text-right font-extrabold text-rose-600 whitespace-nowrap">
                          {formatVNDDisplay(item.conPhaiThu, true)}
                        </td>

                        {/* Thao tác */}
                        <td className="py-2 px-2.5">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => setSelectedHD(item)}
                              className="p-1 hover:bg-sky-50 rounded-md text-slate-400 hover:text-sky-600 transition-all cursor-pointer"
                              title="Xem chi tiết"
                            >
                              <IconEye size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingHD(item)}
                              className="p-1 hover:bg-amber-50 rounded-md text-slate-400 hover:text-amber-600 transition-all cursor-pointer"
                              title="Sửa hợp đồng"
                            >
                              <IconPencil size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingHD(item)}
                              className="p-1 hover:bg-rose-50 rounded-md text-slate-400 hover:text-rose-600 transition-all cursor-pointer"
                              title="Xóa hợp đồng"
                            >
                              <IconTrash size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER */}
          <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
            <div>
              Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalFiltered}</span> bản ghi
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <IconChevronLeft size={13} />
                <span>Trước</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Sau</span>
                <IconChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal View Detail Payments */}
      {selectedHD && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h4 className="text-sm font-extrabold text-slate-800">{selectedHD.soHD} - {selectedHD.tenCongTrinh}</h4>
                <p className="text-xs text-slate-500 font-medium">Khách hàng: {selectedHD.tenKH} ({selectedHD.maKH})</p>
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
              <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Tổng hợp đồng</span>
                  <span className="font-extrabold text-[#3730a3]">{formatVNDDisplay(selectedHD.tongGTHD)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">GT Phát sinh</span>
                  <span className="font-extrabold text-[#7c3aed]">{formatVNDDisplay(selectedHD.gtPhatSinh)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Đã thu</span>
                  <span className="font-extrabold text-emerald-600">{formatVNDDisplay(selectedHD.tongDaThu)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Còn phải thu</span>
                  <span className="font-extrabold text-rose-600">{formatVNDDisplay(selectedHD.conPhaiThu)}</span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-extrabold text-slate-800 mb-2.5 flex items-center gap-1.5">
                  <IconCash size={15} className="text-[#406c89]" />
                  Danh sách các đợt thanh toán
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
                        <div className="font-extrabold text-slate-800">{formatVNDDisplay(dot.soTien)}</div>
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

      {/* Modal Add New Row – extracted to modals/ThemHopDongModal.tsx */}
      <ThemHopDongModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddNewRow}
      />

      {/* Modal Edit Row */}
      {editingHD && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
              <h4 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                <IconPencil size={18} className="text-amber-600" />
                Chỉnh sửa hợp đồng: {editingHD.soHD}
              </h4>
              <button
                type="button"
                onClick={() => setEditingHD(null)}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số hợp đồng (*)</label>
                  <input
                    type="text"
                    required
                    value={editingHD.soHD}
                    onChange={(e) => setEditingHD({ ...editingHD, soHD: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mã phụ HĐ</label>
                  <input
                    type="text"
                    value={editingHD.subHD || ''}
                    onChange={(e) => setEditingHD({ ...editingHD, subHD: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên công trình (*)</label>
                <input
                  type="text"
                  required
                  value={editingHD.tenCongTrinh}
                  onChange={(e) => setEditingHD({ ...editingHD, tenCongTrinh: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tên khách hàng</label>
                  <input
                    type="text"
                    value={editingHD.tenKH}
                    onChange={(e) => setEditingHD({ ...editingHD, tenKH: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mã khách hàng</label>
                  <input
                    type="text"
                    value={editingHD.maKH}
                    onChange={(e) => setEditingHD({ ...editingHD, maKH: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kích thước</label>
                  <input
                    type="text"
                    value={editingHD.kichThuoc}
                    onChange={(e) => setEditingHD({ ...editingHD, kichThuoc: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tỷ lệ</label>
                  <input
                    type="text"
                    value={editingHD.tyLe}
                    onChange={(e) => setEditingHD({ ...editingHD, tyLe: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tổng GT HĐ (VNĐ)</label>
                  <input
                    type="number"
                    value={editingHD.tongGTHD}
                    onChange={(e) =>
                      setEditingHD({
                        ...editingHD,
                        tongGTHD: parseFloat(e.target.value) || 0,
                        conPhaiThu: (parseFloat(e.target.value) || 0) - editingHD.tongDaThu,
                      })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">GT Phát sinh</label>
                  <input
                    type="number"
                    value={editingHD.gtPhatSinh}
                    onChange={(e) => setEditingHD({ ...editingHD, gtPhatSinh: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">DT Năm cũ</label>
                  <input
                    type="number"
                    value={editingHD.dtNamCu}
                    onChange={(e) => setEditingHD({ ...editingHD, dtNamCu: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingHD(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  Cập nhật hợp đồng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Delete Confirmation */}
      {deletingHD && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-rose-50/60">
              <h4 className="text-sm font-extrabold text-rose-700 flex items-center gap-2">
                <IconTrash size={18} />
                Xác nhận xóa hợp đồng
              </h4>
              <button
                type="button"
                onClick={() => setDeletingHD(null)}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            <div className="p-5 text-xs space-y-3">
              <p className="text-slate-700 font-medium">
                Bạn có chắc chắn muốn xóa hợp đồng{' '}
                <strong className="text-rose-600">{deletingHD.soHD}</strong> ({deletingHD.tenCongTrinh}) không?
              </p>
              <p className="text-[11px] text-slate-400 italic">
                Thao tác này không thể hoàn tác sau khi thực hiện.
              </p>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setDeletingHD(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleDeleteRow}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg shadow-2xs transition-colors cursor-pointer"
              >
                Xóa vĩnh viễn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
