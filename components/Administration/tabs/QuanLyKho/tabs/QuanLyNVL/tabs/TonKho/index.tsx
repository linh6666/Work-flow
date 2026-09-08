"use client";

import React, { useRef, useState, useEffect } from 'react';
import { IconChevronLeft, IconChevronRight, IconPencil, IconTrash } from '@tabler/icons-react';
import SuaVatTuModal from './modal/SuaVatTu';
import XoaVatTuModal from './modal/XoaVatTu';

export interface TonKhoItem {
  stt?: number;
  ngay_nhap?: string;
  nhom_hang_chinh: string;
  ma_hang: string;
  ten_hang: string;
  thong_so: string;
  dvt: string;
  ton_dau_ky: number;
  sl_nhap: number;
  sl_xuat: number;
  ton_cuoi_ky: number;
  don_gia_nhap_kho: number;
  tt_nhap: number;
  tt_xuat: number;
  tt_ton_kho: number;
  tinh_trang_hh: string;
  ma_ncc: string;
  ten_ncc: string;
}

export const getNhomHangBadgeClass = (nhom: string) => {
  switch (nhom) {
    case 'Chất kết dính':
      return 'bg-[#fce7f3] text-[#db2777] border-[#fbcfe8]';
    case 'Hệ thống ánh sáng':
      return 'bg-[#fae8ff] text-[#a21caf] border-[#f5d0fe]';
    case 'Công cụ dụng cụ':
      return 'bg-[#ccfbf1] text-[#0f766e] border-[#99f6e4]';
    case 'Linh kiện điện':
      return 'bg-[#fef9c3] text-[#a16207] border-[#fef08a]';
    case 'Chất phụ gia':
      return 'bg-[#ffedd5] text-[#b45309] border-[#fed7aa]';
    case 'Phụ liệu ngành mộc':
      return 'bg-[#ede9fe] text-[#6d28d9] border-[#ddd6fe]';
    case 'Phụ liệu cảnh quan':
      return 'bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]';
    case 'Đóng gói hàng':
      return 'bg-[#fef9c3] text-[#854d0e] border-[#fde047]';
    case 'Sơn':
      return 'bg-[#ffedd5] text-[#c2410c] border-[#fed7aa]';
    case 'NVL khác':
      return 'bg-[#e2e8f0] text-[#334155] border-[#cbd5e1]';
    case 'ACRYLICOS VALLEJO':
      return 'bg-[#f1f5f9] text-[#1e293b] border-[#e2e8f0]';
    case 'Mica':
      return 'bg-[#f1f5f9] text-[#475569] border-[#e2e8f0]';
    case 'Giấy':
      return 'bg-[#f5f5f4] text-[#44403c] border-[#e7e5e4]';
    case 'Gỗ công nghiệp':
      return 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';
    case 'Kim loại':
      return 'bg-[#e0e7ff] text-[#3730a3] border-[#c7d2fe]';
    default:
      return 'bg-[#406c89]/10 text-[#406c89] border-[#406c89]/20';
  }
};

export const getTinhTrangBadgeClass = (status: string) => {
  switch (status) {
    case 'Đủ hàng':
    case 'Đạt chuẩn':
    case 'Tồn kho tốt':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Sắp hết':
    case 'Cần bổ sung':
      return 'bg-rose-50 text-rose-600 border-rose-200 font-semibold';
    case 'Hàng mới':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const mockTonKho: TonKhoItem[] = [
  {
    nhom_hang_chinh: 'NVL khác',
    ma_hang: 'CN_GIA_TAP',
    ten_hang: 'Giấy lót chuồng tấm',
    thong_so: 'Xám',
    dvt: 'Gói/chiếc',
    ton_dau_ky: 5,
    sl_nhap: 0,
    sl_xuat: 0,
    ton_cuoi_ky: 5,
    don_gia_nhap_kho: 45_000,
    tt_nhap: 0,
    tt_xuat: 0,
    tt_ton_kho: 225_000,
    tinh_trang_hh: 'Đủ hàng',
    ma_ncc: 'NCC_TAP',
    ten_ncc: 'Công ty TNHH Tập',
  },
  {
    nhom_hang_chinh: 'Công cụ dụng cụ',
    ma_hang: 'CC_LUOI DAO SDI',
    ten_hang: 'Lưỡi dao trổ nhỏ SDI',
    thong_so: '0',
    dvt: 'Vỉ',
    ton_dau_ky: 25,
    sl_nhap: 10,
    sl_xuat: 1,
    ton_cuoi_ky: 34,
    don_gia_nhap_kho: 26_000,
    tt_nhap: 260_000,
    tt_xuat: 26_000,
    tt_ton_kho: 884_000,
    tinh_trang_hh: 'Tồn kho tốt',
    ma_ncc: 'NCC_SDI',
    ten_ncc: 'Công ty CP Thiết bị SDI',
  },
  {
    nhom_hang_chinh: 'Chất kết dính',
    ma_hang: 'BD-GIAY 2',
    ten_hang: 'Băng dính giấy 2cm',
    thong_so: '2cm',
    dvt: 'Cuộn',
    ton_dau_ky: 15,
    sl_nhap: 50,
    sl_xuat: 2,
    ton_cuoi_ky: 63,
    don_gia_nhap_kho: 3_000,
    tt_nhap: 150_000,
    tt_xuat: 6_000,
    tt_ton_kho: 189_000,
    tinh_trang_hh: 'Đủ hàng',
    ma_ncc: 'NCC_BAOBI',
    ten_ncc: 'Công ty CP Bao bì Hà Nội',
  },
  {
    nhom_hang_chinh: 'Chất kết dính',
    ma_hang: 'KEO_SILICOL500',
    ten_hang: 'Keo silicol A500 trong',
    thong_so: '300 mL/chai',
    dvt: 'lọ',
    ton_dau_ky: 8,
    sl_nhap: 20,
    sl_xuat: 1,
    ton_cuoi_ky: 27,
    don_gia_nhap_kho: 65_000,
    tt_nhap: 1_300_000,
    tt_xuat: 65_000,
    tt_ton_kho: 1_755_000,
    tinh_trang_hh: 'Tồn kho tốt',
    ma_ncc: 'NCC_APOLLO',
    ten_ncc: 'Công ty Quốc Huy Apollo',
  },
  {
    nhom_hang_chinh: 'Hệ thống ánh sáng',
    ma_hang: 'LED_0603T',
    ten_hang: 'LED dán 0603 trắng',
    thong_so: '0603',
    dvt: 'Cuộn',
    ton_dau_ky: 10,
    sl_nhap: 5,
    sl_xuat: 1,
    ton_cuoi_ky: 14,
    don_gia_nhap_kho: 85_000,
    tt_nhap: 425_000,
    tt_xuat: 85_000,
    tt_ton_kho: 1_190_000,
    tinh_trang_hh: 'Đủ hàng',
    ma_ncc: 'NCC_RD',
    ten_ncc: 'Bóng đèn Rạng Đông',
  },
  {
    nhom_hang_chinh: 'Công cụ dụng cụ',
    ma_hang: 'CC_MK_6MM',
    ten_hang: 'Mũi khoan 6mm',
    thong_so: '6mm',
    dvt: 'cái',
    ton_dau_ky: 50,
    sl_nhap: 0,
    sl_xuat: 3,
    ton_cuoi_ky: 47,
    don_gia_nhap_kho: 7_000,
    tt_nhap: 0,
    tt_xuat: 21_000,
    tt_ton_kho: 329_000,
    tinh_trang_hh: 'Đủ hàng',
    ma_ncc: 'NCC_BOSCH',
    ten_ncc: 'Bosch Việt Nam',
  },
  {
    nhom_hang_chinh: 'Gỗ công nghiệp',
    ma_hang: 'GG-MF-1.5MM',
    ten_hang: 'MDF thường 1.5mm',
    thong_so: '1.5mm',
    dvt: 'tấm',
    ton_dau_ky: 120,
    sl_nhap: 150,
    sl_xuat: 45,
    ton_cuoi_ky: 225,
    don_gia_nhap_kho: 199_667,
    tt_nhap: 29_950_050,
    tt_xuat: 8_985_015,
    tt_ton_kho: 44_925_075,
    tinh_trang_hh: 'Tồn kho tốt',
    ma_ncc: 'NCC_ANCUONG',
    ten_ncc: 'Gỗ An Cường',
  },
  {
    nhom_hang_chinh: 'Gỗ công nghiệp',
    ma_hang: 'GG-MF-2.0MM',
    ten_hang: 'MDF chống ẩm 2.0mm',
    thong_so: '2.0mm',
    dvt: 'tấm',
    ton_dau_ky: 80,
    sl_nhap: 100,
    sl_xuat: 25,
    ton_cuoi_ky: 155,
    don_gia_nhap_kho: 245_000,
    tt_nhap: 24_500_000,
    tt_xuat: 6_125_000,
    tt_ton_kho: 37_975_000,
    tinh_trang_hh: 'Tồn kho tốt',
    ma_ncc: 'NCC_ANCUONG',
    ten_ncc: 'Gỗ An Cường',
  },
  {
    nhom_hang_chinh: 'Sơn',
    ma_hang: 'SN-KOVA-K260',
    ten_hang: 'Sơn lót kháng kiềm Kova K-260',
    thong_so: 'Thùng 20L',
    dvt: 'thùng',
    ton_dau_ky: 4,
    sl_nhap: 10,
    sl_xuat: 2,
    ton_cuoi_ky: 12,
    don_gia_nhap_kho: 780_000,
    tt_nhap: 7_800_000,
    tt_xuat: 1_560_000,
    tt_ton_kho: 9_360_000,
    tinh_trang_hh: 'Đủ hàng',
    ma_ncc: 'NCC_KOVA',
    ten_ncc: 'Sơn Kova Việt Nam',
  },
  {
    nhom_hang_chinh: 'Mica',
    ma_hang: 'MC-TRG-2MM',
    ten_hang: 'Mica Đài Loan trong suốt 2mm',
    thong_so: '1220x2440mm',
    dvt: 'tấm',
    ton_dau_ky: 18,
    sl_nhap: 30,
    sl_xuat: 8,
    ton_cuoi_ky: 40,
    don_gia_nhap_kho: 340_000,
    tt_nhap: 10_200_000,
    tt_xuat: 2_720_000,
    tt_ton_kho: 13_600_000,
    tinh_trang_hh: 'Tồn kho tốt',
    ma_ncc: 'NCC_MICA',
    ten_ncc: 'Mica Phú Thịnh',
  },
  {
    nhom_hang_chinh: 'ACRYLICOS VALLEJO',
    ma_hang: 'VJ-70950',
    ten_hang: 'Màu Vallejo Model Color Black 70.950',
    thong_so: '17ml/lọ',
    dvt: 'lọ',
    ton_dau_ky: 3,
    sl_nhap: 12,
    sl_xuat: 13,
    ton_cuoi_ky: 2,
    don_gia_nhap_kho: 82_000,
    tt_nhap: 984_000,
    tt_xuat: 1_066_000,
    tt_ton_kho: 164_000,
    tinh_trang_hh: 'Sắp hết',
    ma_ncc: 'NCC_VJ',
    ten_ncc: 'Vallejo Paints VN',
  },
  {
    nhom_hang_chinh: 'Kim loại',
    ma_hang: 'KL-TH-4040',
    ten_hang: 'Thép hộp mạ kẽm 40x40x1.4mm',
    thong_so: 'Cây 6m',
    dvt: 'cây',
    ton_dau_ky: 15,
    sl_nhap: 40,
    sl_xuat: 50,
    ton_cuoi_ky: 5,
    don_gia_nhap_kho: 165_000,
    tt_nhap: 6_600_000,
    tt_xuat: 8_250_000,
    tt_ton_kho: 825_000,
    tinh_trang_hh: 'Sắp hết',
    ma_ncc: 'NCC_HOAPHAT',
    ten_ncc: 'Thép Hòa Phát',
  },
  {
    nhom_hang_chinh: 'Linh kiện điện',
    ma_hang: 'LK-CB-2P-32A',
    ten_hang: 'Aptomat 2P 32A Panasonic',
    thong_so: '2P 32A 6kA',
    dvt: 'cái',
    ton_dau_ky: 22,
    sl_nhap: 15,
    sl_xuat: 6,
    ton_cuoi_ky: 31,
    don_gia_nhap_kho: 115_000,
    tt_nhap: 1_725_000,
    tt_xuat: 690_000,
    tt_ton_kho: 3_565_000,
    tinh_trang_hh: 'Đủ hàng',
    ma_ncc: 'NCC_PANA',
    ten_ncc: 'Thiết bị điện Panasonic',
  },
  {
    nhom_hang_chinh: 'Giấy',
    ma_hang: 'GIAY-DECAL-A4',
    ten_hang: 'Giấy decal Tomy A4 đế vàng',
    thong_so: '100 tờ/tập',
    dvt: 'tập',
    ton_dau_ky: 30,
    sl_nhap: 20,
    sl_xuat: 15,
    ton_cuoi_ky: 35,
    don_gia_nhap_kho: 68_000,
    tt_nhap: 1_360_000,
    tt_xuat: 1_020_000,
    tt_ton_kho: 2_380_000,
    tinh_trang_hh: 'Đủ hàng',
    ma_ncc: 'NCC_TOMY',
    ten_ncc: 'Văn phòng phẩm Tomy',
  },
];

interface TonKhoProps {
  search?: string;
  nhom?: string;
}

export default function TonKho({ search = '', nhom = 'Tất cả nhóm hàng' }: TonKhoProps) {
  const [items, setItems] = useState<TonKhoItem[]>(mockTonKho);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(25);

  const [selectedItemForEdit, setSelectedItemForEdit] = useState<TonKhoItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItemForDelete, setSelectedItemForDelete] = useState<TonKhoItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, nhom]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !scrollContainerRef.current) return;
    dragInfo.current = {
      isDown: true,
      startX: e.pageX - scrollContainerRef.current.offsetLeft,
      scrollLeft: scrollContainerRef.current.scrollLeft,
    };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragInfo.current.isDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - dragInfo.current.startX) * 1.5;
    scrollContainerRef.current.scrollLeft = dragInfo.current.scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    dragInfo.current.isDown = false;
    setIsDragging(false);
  };

  const handleOpenEdit = (item: TonKhoItem) => {
    setSelectedItemForEdit(item);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedItem: TonKhoItem) => {
    setItems((prev) =>
      prev.map((x) => (x.ma_hang === selectedItemForEdit?.ma_hang ? updatedItem : x))
    );
    setIsEditModalOpen(false);
    setSelectedItemForEdit(null);
  };

  const handleOpenDelete = (item: TonKhoItem) => {
    setSelectedItemForDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItemForDelete) {
      setItems((prev) => prev.filter((x) => x.ma_hang !== selectedItemForDelete.ma_hang));
      setIsDeleteModalOpen(false);
      setSelectedItemForDelete(null);
    }
  };

  const filtered = items.filter((row) => {
    const matchNhom = nhom === 'Tất cả nhóm hàng' || row.nhom_hang_chinh === nhom;
    const s = search.toLowerCase();
    const matchSearch =
      (row.ngay_nhap ? row.ngay_nhap.toLowerCase().includes(s) : false) ||
      row.ma_hang.toLowerCase().includes(s) ||
      row.ten_hang.toLowerCase().includes(s) ||
      row.nhom_hang_chinh.toLowerCase().includes(s) ||
      row.thong_so.toLowerCase().includes(s) ||
      row.ma_ncc.toLowerCase().includes(s) ||
      row.ten_ncc.toLowerCase().includes(s) ||
      row.tinh_trang_hh.toLowerCase().includes(s);
    return matchNhom && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

  const totalTonDauKy = filtered.reduce((acc, cur) => acc + cur.ton_dau_ky, 0);
  const totalSlNhap = filtered.reduce((acc, cur) => acc + cur.sl_nhap, 0);
  const totalSlXuat = filtered.reduce((acc, cur) => acc + cur.sl_xuat, 0);
  const totalTonCuoiKy = filtered.reduce((acc, cur) => acc + cur.ton_cuoi_ky, 0);
  const totalTtTonKho = filtered.reduce((acc, cur) => acc + cur.tt_ton_kho, 0);

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
      {/* ── Table scrollable container ── */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`overflow-auto flex-1 cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? 'select-none' : ''
        }`}
        title="Nhấn giữ chuột để trượt ngang bảng"
      >
        <table className="w-full text-xs">
          <thead className="bg-[#406c89] text-white sticky top-0 z-20 shadow-sm">
            <tr>
              <th className="text-center px-3 py-2.5 font-bold whitespace-nowrap border-r border-white/20 w-12 sticky top-0 bg-[#406c89]">
                STT
              </th>
              <th className="text-center px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Ngày nhập
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Nhóm hàng chính
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Mã hàng
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Tên hàng
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Thông số
              </th>
              <th className="text-center px-3 py-2.5 font-bold whitespace-nowrap border-r border-white/20 w-16 sticky top-0 bg-[#406c89]">
                ĐVT
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Tồn đầu kỳ
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                SL nhập
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                SL xuất
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Tồn cuối kỳ
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Đơn giá nhập kho
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                TT nhập
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                TT xuất
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                TT tồn kho
              </th>
              <th className="text-center px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Tình trạng HH
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Mã NCC
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Tên NCC
              </th>
              <th className="text-center px-3.5 py-2.5 font-bold whitespace-nowrap sticky top-0 right-0 z-30 bg-[#406c89] shadow-[-3px_0_6px_rgba(0,0,0,0.15)] min-w-[80px] w-20">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={19} className="text-center py-10 text-slate-400">
                  Không tìm thấy dữ liệu tồn kho phù hợp
                </td>
              </tr>
            ) : (
              paginatedData.map((v, i) => (
                <tr
                  key={`${v.ma_hang}-${i}`}
                  className={`border-b border-slate-100 hover:bg-[#406c89]/5 transition-colors ${
                    i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                  }`}
                >
                  {/* STT */}
                  <td className="px-3 py-2.5 text-center text-slate-500 whitespace-nowrap border-r border-slate-100 font-medium">
                    {startIndex + i + 1}
                  </td>

                  {/* Ngày nhập */}
                  <td className="px-3.5 py-2.5 text-center text-slate-700 whitespace-nowrap border-r border-slate-100">
                    {v.ngay_nhap || '20/01/2026'}
                  </td>

                  {/* Nhóm hàng chính */}
                  <td className="px-3.5 py-2.5 whitespace-nowrap border-r border-slate-100">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getNhomHangBadgeClass(
                        v.nhom_hang_chinh
                      )}`}
                    >
                      {v.nhom_hang_chinh}
                    </span>
                  </td>

                  {/* Mã hàng */}
                  <td className="px-3.5 py-2.5 font-mono font-bold text-slate-800 whitespace-nowrap border-r border-slate-100">
                    {v.ma_hang}
                  </td>

                  {/* Tên hàng */}
                  <td className="px-3.5 py-2.5 font-semibold text-slate-800 whitespace-nowrap border-r border-slate-100">
                    {v.ten_hang}
                  </td>

                  {/* Thông số */}
                  <td className="px-3.5 py-2.5 text-slate-600 whitespace-nowrap border-r border-slate-100">
                    {v.thong_so || '—'}
                  </td>

                  {/* ĐVT */}
                  <td className="px-3 py-2.5 text-center text-slate-700 whitespace-nowrap border-r border-slate-100">
                    {v.dvt}
                  </td>

                  {/* Tồn đầu kỳ */}
                  <td className="px-3.5 py-2.5 text-right font-medium text-slate-700 whitespace-nowrap border-r border-slate-100">
                    {v.ton_dau_ky.toLocaleString()}
                  </td>

                  {/* SL nhập */}
                  <td className="px-3.5 py-2.5 text-right font-medium text-slate-700 whitespace-nowrap border-r border-slate-100">
                    {v.sl_nhap.toLocaleString()}
                  </td>

                  {/* SL xuất */}
                  <td className="px-3.5 py-2.5 text-right font-medium text-slate-700 whitespace-nowrap border-r border-slate-100">
                    {v.sl_xuat.toLocaleString()}
                  </td>

                  {/* Tồn cuối kỳ */}
                  <td className="px-3.5 py-2.5 text-right font-bold text-slate-900 whitespace-nowrap border-r border-slate-100">
                    {v.ton_cuoi_ky.toLocaleString()}
                  </td>

                  {/* Đơn giá nhập kho */}
                  <td className="px-3.5 py-2.5 text-right text-slate-700 whitespace-nowrap border-r border-slate-100">
                    {v.don_gia_nhap_kho.toLocaleString()}đ
                  </td>

                  {/* TT nhập */}
                  <td className="px-3.5 py-2.5 text-right text-slate-700 whitespace-nowrap border-r border-slate-100">
                    {v.tt_nhap.toLocaleString()}đ
                  </td>

                  {/* TT xuất */}
                  <td className="px-3.5 py-2.5 text-right text-slate-700 whitespace-nowrap border-r border-slate-100">
                    {v.tt_xuat.toLocaleString()}đ
                  </td>

                  {/* TT tồn kho */}
                  <td className="px-3.5 py-2.5 text-right font-bold text-[#406c89] whitespace-nowrap border-r border-slate-100">
                    {v.tt_ton_kho.toLocaleString()}đ
                  </td>

                  {/* Tình trạng HH */}
                  <td className="px-3.5 py-2.5 text-center whitespace-nowrap border-r border-slate-100">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${getTinhTrangBadgeClass(
                        v.tinh_trang_hh
                      )}`}
                    >
                      {v.tinh_trang_hh}
                    </span>
                  </td>

                  {/* Mã NCC */}
                  <td className="px-3.5 py-2.5 font-mono text-slate-600 whitespace-nowrap border-r border-slate-100">
                    {v.ma_ncc}
                  </td>

                  {/* Tên NCC */}
                  <td className="px-3.5 py-2.5 text-slate-700 whitespace-nowrap border-r border-slate-100">
                    {v.ten_ncc}
                  </td>

                  {/* Hành động */}
                  <td
                    className={`px-3 py-2 text-center whitespace-nowrap sticky right-0 z-10 shadow-[-3px_0_6px_rgba(0,0,0,0.06)] ${
                      i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEdit(v);
                        }}
                        className="p-1 text-[#406c89] hover:bg-[#406c89]/10 rounded transition-colors cursor-pointer"
                        title="Sửa"
                      >
                        <IconPencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDelete(v);
                        }}
                        className="p-1 text-[#406c89] hover:bg-[#406c89]/10 rounded transition-colors cursor-pointer"
                        title="Xóa"
                      >
                        <IconTrash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Table Footer & Pagination ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-200 bg-slate-50/80 text-xs text-slate-600 gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <span>
            Hiển thị{' '}
            <strong className="text-slate-800">
              {filtered.length === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + pageSize, filtered.length)}
            </strong>{' '}
            trên <strong className="text-slate-800">{filtered.length}</strong> bản ghi
          </span>
          {filtered.length > 0 && (
            <>
              <span className="text-slate-300">|</span>
              <span>
                Tồn đầu kỳ: <strong className="text-slate-800 font-bold">{totalTonDauKy.toLocaleString()}</strong>
              </span>
              <span className="text-slate-300">|</span>
              <span>
                SL nhập: <strong className="text-slate-800 font-bold">{totalSlNhap.toLocaleString()}</strong>
              </span>
              <span className="text-slate-300">|</span>
              <span>
                SL xuất: <strong className="text-slate-800 font-bold">{totalSlXuat.toLocaleString()}</strong>
              </span>
              <span className="text-slate-300">|</span>
              <span>
                Tồn cuối kỳ: <strong className="text-slate-800 font-bold">{totalTonCuoiKy.toLocaleString()}</strong>
              </span>
              <span className="text-slate-300">|</span>
              <span>
                Tổng TT tồn kho:{' '}
                <strong className="text-[#406c89] font-bold">{totalTtTonKho.toLocaleString()}đ</strong>
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage <= 1}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            title="Trang trước"
          >
            <IconChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
            .reduce((acc: (number | string)[], p, i, arr) => {
              if (i > 0 && p - (arr[i - 1] as number) > 1) {
                acc.push('...');
              }
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === '...' ? (
                <span key={`dots-${i}`} className="px-1.5 text-xs text-slate-400 select-none">
                  ...
                </span>
              ) : (
                <button
                  key={`page-${p}`}
                  type="button"
                  onClick={() => setCurrentPage(p as number)}
                  className={`min-w-[26px] h-6 px-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    currentPage === p
                      ? 'bg-[#406c89] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {p}
                </button>
              )
            )}

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage >= totalPages}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            title="Trang sau"
          >
            <IconChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Modal Sửa Vật Tư ── */}
      <SuaVatTuModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedItemForEdit(null);
        }}
        item={selectedItemForEdit}
        onSave={handleSaveEdit}
      />

      {/* ── Modal Xóa Vật Tư ── */}
      <XoaVatTuModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedItemForDelete(null);
        }}
        item={selectedItemForDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
