"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
  IconSearch,
  IconDownload,
  IconUpload,
  IconPlus,
  IconEye,
  IconPencil,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
  IconWallet,
  IconFileText,
} from '@tabler/icons-react';
import { PHONG_BAN_LIST } from '../DanhSachTongQuat';
import Pagination from '@/common/pagination';
import ThemBacLuongModal from './modal/ThemBacLuong';
import XemBacLuongModal from './modal/XemBacLuong';
import SuaBacLuongModal from './modal/SuaBacLuong';
import XoaBacLuongModal from './modal/XoaBacLuong';

export interface BacLuongTangBacItem {
  id: string;
  maNV: string;
  hoTen: string;
  phongBan: string;
  chucVu: string;
  bacLuongHienTai: string;
  mucLuongHienTai: number;
  thoiDiemTangLuongGanNhat: string;
  bacLuongDuKien: string;
  mucLuongDuKien: number;
  thoiDiemTangBacDuKien: string;
  dieuKienXetDuyet: string;
  trangThaiDuyet: 'Đủ điều kiện' | 'Đang theo dõi' | 'Chưa xét duyệt';
  ghiChu: string;
}

export const INITIAL_BAC_LUONG_DATA: BacLuongTangBacItem[] = [
  { id: '1', maNV: 'NV001', hoTen: 'Bùi Thị Duyên', phongBan: 'Phòng Kinh doanh', chucVu: 'Trưởng phòng Kinh doanh', bacLuongHienTai: 'Bậc 5', mucLuongHienTai: 11500000, thoiDiemTangLuongGanNhat: '03/2024', bacLuongDuKien: 'Bậc 6', mucLuongDuKien: 12500000, thoiDiemTangBacDuKien: '03/2025', dieuKienXetDuyet: 'Đạt KPI năm & thâm niên >= 1 năm', trangThaiDuyet: 'Đủ điều kiện', ghiChu: 'Đã hoàn thành đánh giá' },
  { id: '2', maNV: 'NV002', hoTen: 'Nguyễn Phú Quang', phongBan: 'Phòng Khai triển', chucVu: 'Trưởng phòng Khai triển', bacLuongHienTai: 'Bậc 6', mucLuongHienTai: 12500000, thoiDiemTangLuongGanNhat: '08/2024', bacLuongDuKien: 'Bậc 7', mucLuongDuKien: 14000000, thoiDiemTangBacDuKien: '08/2025', dieuKienXetDuyet: 'Đạt KPI năm & thâm niên >= 1 năm', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '3', maNV: 'NV003', hoTen: 'Kỳ Anh', phongBan: 'Phòng Cảnh Quan', chucVu: 'Chuyên viên Cảnh quan', bacLuongHienTai: 'Bậc 3', mucLuongHienTai: 7500000, thoiDiemTangLuongGanNhat: '01/2025', bacLuongDuKien: 'Bậc 4', mucLuongDuKien: 9000000, thoiDiemTangBacDuKien: '01/2026', dieuKienXetDuyet: 'Hoàn thành đề án cảnh quan', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '4', maNV: 'NV004', hoTen: 'Bùi Phương Uyên', phongBan: 'Phòng Điện', chucVu: 'Kỹ sư Điện & Chiếu sáng', bacLuongHienTai: 'Bậc 4', mucLuongHienTai: 9000000, thoiDiemTangLuongGanNhat: '11/2024', bacLuongDuKien: 'Bậc 5', mucLuongDuKien: 10500000, thoiDiemTangBacDuKien: '11/2025', dieuKienXetDuyet: 'Chứng chỉ vận hành hệ thống', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '5', maNV: 'NV005', hoTen: 'Thao Phung', phongBan: 'Phòng Mộc Sơn', chucVu: 'KTV Sơn hoàn thiện', bacLuongHienTai: 'Thử việc', mucLuongHienTai: 6240000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: 'Bậc 1', mucLuongDuKien: 7000000, thoiDiemTangBacDuKien: '05/2025', dieuKienXetDuyet: 'Đạt đánh giá hết thử việc', trangThaiDuyet: 'Chưa xét duyệt', ghiChu: 'Đang thử việc 2 tháng' },
  { id: '6', maNV: 'NV006', hoTen: 'Lê Hoàng Long', phongBan: 'Phòng Cắt', chucVu: 'KTV Laser & CNC', bacLuongHienTai: 'Bậc 2', mucLuongHienTai: 7000000, thoiDiemTangLuongGanNhat: '06/2024', bacLuongDuKien: 'Bậc 3', mucLuongDuKien: 8000000, thoiDiemTangBacDuKien: '06/2025', dieuKienXetDuyet: 'Không vi phạm an toàn máy móc', trangThaiDuyet: 'Đủ điều kiện', ghiChu: '' },
  { id: '7', maNV: 'NV007', hoTen: 'Trần Văn Mạnh', phongBan: 'Lắp đặt', chucVu: 'Đội trưởng Lắp đặt', bacLuongHienTai: 'Bậc 5', mucLuongHienTai: 10500000, thoiDiemTangLuongGanNhat: '10/2024', bacLuongDuKien: 'Bậc 6', mucLuongDuKien: 12000000, thoiDiemTangBacDuKien: '10/2025', dieuKienXetDuyet: 'Tiến độ nghiệm thu công trình', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '8', maNV: 'NV008', hoTen: 'Phạm Minh Trang', phongBan: 'Phòng Công nghệ và Thiết kế', chucVu: 'Kiến trúc sư 3D', bacLuongHienTai: 'Thử việc', mucLuongHienTai: 6240000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: 'Bậc 1', mucLuongDuKien: 7000000, thoiDiemTangBacDuKien: '06/2025', dieuKienXetDuyet: 'Đạt đánh giá hết thử việc', trangThaiDuyet: 'Chưa xét duyệt', ghiChu: 'Đang thử việc' },
  { id: '9', maNV: 'NV009', hoTen: 'Quan Minh Hoàng', phongBan: 'Phòng Mộc Sơn', chucVu: '', bacLuongHienTai: 'C.03.1', mucLuongHienTai: 10152000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 10152000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '10', maNV: 'NV010', hoTen: 'Nguyễn Bá Ngọc', phongBan: 'Phòng Mộc Sơn', chucVu: '', bacLuongHienTai: 'C.03.1', mucLuongHienTai: 9652000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 9652000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '11', maNV: 'NV011', hoTen: 'Bùi Văn Lộc', phongBan: 'Phòng Điện', chucVu: '', bacLuongHienTai: 'B.02.2', mucLuongHienTai: 16010000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 16010000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '12', maNV: 'NV012', hoTen: 'Lâm Vĩnh Hưng', phongBan: 'Phòng Điện', chucVu: '', bacLuongHienTai: 'B.03.3', mucLuongHienTai: 14120000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 14120000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '13', maNV: 'NV013', hoTen: 'Bùi Thanh Xuân', phongBan: 'Phòng Điện', chucVu: '', bacLuongHienTai: 'C.03.1', mucLuongHienTai: 9152000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 9152000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '14', maNV: 'NV014', hoTen: 'Hà Tùng Lâm', phongBan: 'Phòng Điện', chucVu: '', bacLuongHienTai: 'C.02.2', mucLuongHienTai: 10502000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 10502000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '15', maNV: 'NV015', hoTen: 'Hà Anh Tuấn', phongBan: 'Phòng Điện', chucVu: '', bacLuongHienTai: 'C.03.1', mucLuongHienTai: 9152000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 9152000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '16', maNV: 'NV016', hoTen: 'Nguyễn Đức Huy (BTG)', phongBan: 'Phòng Điện', chucVu: '', bacLuongHienTai: 'C.05.1', mucLuongHienTai: 6240000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 6240000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '17', maNV: 'NV017', hoTen: 'Mai Ngọc Quyết (BTG)', phongBan: 'Phòng Điện', chucVu: '', bacLuongHienTai: 'C.05.1', mucLuongHienTai: 6240000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 6240000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '18', maNV: 'NV018', hoTen: 'Nguyễn Anh Đức (BTG)', phongBan: 'Phòng Điện', chucVu: '', bacLuongHienTai: 'C.05.1', mucLuongHienTai: 6240000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 6240000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '19', maNV: 'NV019', hoTen: 'Đinh Quang Huy (BTG)', phongBan: 'Phòng Điện', chucVu: '', bacLuongHienTai: 'C.05.1', mucLuongHienTai: 6240000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 6240000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '20', maNV: 'NV020', hoTen: 'Nguyễn Thành Vinh (BTG)', phongBan: 'Phòng Điện', chucVu: '', bacLuongHienTai: 'C.05.1', mucLuongHienTai: 6240000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 6240000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '21', maNV: 'NV021', hoTen: 'Thái Anh Tú (BTG)', phongBan: 'Phòng Điện', chucVu: '', bacLuongHienTai: 'C.05.1', mucLuongHienTai: 6240000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 6240000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '22', maNV: 'NV022', hoTen: 'Nguyễn Hùng Thái (BTG)', phongBan: 'Phòng Điện', chucVu: '', bacLuongHienTai: 'C.05.1', mucLuongHienTai: 6240000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 6240000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '23', maNV: 'NV023', hoTen: 'Phạm Văn Trọng (BTG)', phongBan: 'Phòng Điện', chucVu: '', bacLuongHienTai: 'C.05.1', mucLuongHienTai: 6240000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 6240000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '24', maNV: 'NV024', hoTen: 'Phạm Thị Thu Trang', phongBan: 'Phòng Cảnh quan', chucVu: '', bacLuongHienTai: 'B.02.1', mucLuongHienTai: 15200000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 15200000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '25', maNV: 'NV025', hoTen: 'Vũ Minh Hằng', phongBan: 'Phòng Cảnh quan', chucVu: '', bacLuongHienTai: 'C.03.1', mucLuongHienTai: 9152000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: '—', mucLuongDuKien: 9152000, thoiDiemTangBacDuKien: '—', dieuKienXetDuyet: '', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
];

interface BacLuongTangBacTabProps {
  searchQuery?: string;
  selectedPhongBan?: string;
  selectedTrangThai?: string;
}

export default function BacLuongTangBacTab({
  searchQuery,
  selectedPhongBan,
  selectedTrangThai,
}: BacLuongTangBacTabProps) {
  const [data, setData] = useState<BacLuongTangBacItem[]>(INITIAL_BAC_LUONG_DATA);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingItem, setViewingItem] = useState<BacLuongTangBacItem | null>(null);
  const [editingItem, setEditingItem] = useState<BacLuongTangBacItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<BacLuongTangBacItem | null>(null);

  useEffect(() => {
    const handleAddClick = (event: Event) => {
      const customEvent = event as CustomEvent<{ tab?: string }>;
      if (customEvent.detail?.tab === 'bac-luong-tang-bac') {
        setIsAddModalOpen(true);
      }
    };
    window.addEventListener('nhan-su-add-click', handleAddClick);
    return () => window.removeEventListener('nhan-su-add-click', handleAddClick);
  }, []);
  const [internalSearch, setInternalSearch] = useState('');
  const [internalPhongBan, setInternalPhongBan] = useState('ALL');
  const [internalTrangThai, setInternalTrangThai] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const search = searchQuery !== undefined ? searchQuery : internalSearch;
  const filterPhongBan = selectedPhongBan !== undefined ? selectedPhongBan : internalPhongBan;
  const filterTrangThai = selectedTrangThai !== undefined ? selectedTrangThai : internalTrangThai;

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.hoTen.toLowerCase().includes(q) ||
        item.maNV.toLowerCase().includes(q) ||
        item.phongBan.toLowerCase().includes(q) ||
        item.chucVu.toLowerCase().includes(q) ||
        item.bacLuongHienTai.toLowerCase().includes(q) ||
        item.bacLuongDuKien.toLowerCase().includes(q);

      const matchPB = filterPhongBan === 'ALL' || item.phongBan === filterPhongBan;
      const matchTT = filterTrangThai === 'ALL' || item.trangThaiDuyet === filterTrangThai;

      return matchSearch && matchPB && matchTT;
    });
  }, [data, search, filterPhongBan, filterTrangThai]);

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRecords);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      {/* ── Table Container ── */}
      <div className="flex-1 min-h-0 px-5 py-3 flex flex-col">
        <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
          <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
            <table className="min-w-max w-full text-xs text-left border-collapse">
              <thead className='sticky top-0 z-10 bg-[#456b89] border-b border-slate-200 shadow-2xs'>
                <tr>
                  <th className='px-4 py-3 font-bold text-white text-xs whitespace-nowrap'>Nhân sự</th>
                  <th className='px-4 py-3 font-bold text-white text-xs whitespace-nowrap'>Phòng ban</th>
                  <th className='px-4 py-3 font-bold text-white text-xs whitespace-nowrap'>Bậc lương</th>
                  <th className='px-4 py-3 font-bold text-white text-xs text-right whitespace-nowrap'>Lương cứng</th>
                  <th className='px-4 py-3 font-bold text-white text-xs text-right whitespace-nowrap'>Lương mềm</th>
                  <th className='px-4 py-3 font-bold text-white text-xs text-right whitespace-nowrap'>Trợ cấp</th>
                  <th className='px-4 py-3 font-bold text-white text-xs text-right whitespace-nowrap'>Tổng thu nhập</th>
                  <th className='px-4 py-3 font-bold text-white text-xs whitespace-nowrap'>Điều chỉnh gần nhất</th>
                  <th className='px-4 py-3 font-bold text-white text-xs whitespace-nowrap'>Tăng bậc dự kiến</th>
                  <th className='px-4 py-3 font-bold text-white text-xs whitespace-nowrap'>Còn lại</th>
                  <th className='px-4 py-3 font-bold text-white text-xs text-right whitespace-nowrap'>Hành động</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={11} className='text-center py-12 text-slate-400'>
                      <IconWallet size={36} className='mx-auto mb-2 text-slate-300 stroke-1' />
                      <p className='font-semibold text-xs text-slate-600'>Không tìm thấy thông tin bậc lương</p>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item) => (
                    <tr key={item.id} className='hover:bg-slate-50/80 transition-colors group'>
                      <td className='px-4 py-3.5 align-middle whitespace-nowrap'>
                        <div className='flex items-center gap-2.5'>
                          <div className='w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-[10px] shrink-0 border border-slate-200'>
                            {item.hoTen.charAt(0)}
                          </div>
                          <span className='font-semibold text-slate-800 text-xs'>{item.hoTen}</span>
                        </div>
                      </td>
                      <td className='px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap'>{item.phongBan}</td>
                      <td className='px-4 py-3.5 align-middle font-semibold text-slate-700 whitespace-nowrap'>
                        {item.bacLuongHienTai}
                      </td>
                      <td className='px-4 py-3.5 align-middle text-right text-slate-600 whitespace-nowrap'>0</td>
                      <td className='px-4 py-3.5 align-middle text-right text-slate-600 whitespace-nowrap'>0</td>
                      <td className='px-4 py-3.5 align-middle text-right text-slate-600 whitespace-nowrap'>0</td>
                      <td className='px-4 py-3.5 align-middle text-right font-bold text-[#406c89] whitespace-nowrap'>
                        {item.mucLuongHienTai.toLocaleString('vi-VN')}
                      </td>
                      <td className='px-4 py-3.5 align-middle text-slate-500 whitespace-nowrap'>
                        {item.thoiDiemTangLuongGanNhat || '—'}
                      </td>
                      <td className='px-4 py-3.5 align-middle text-slate-500 whitespace-nowrap'>
                        {item.thoiDiemTangBacDuKien || '—'}
                      </td>
                      <td className='px-4 py-3.5 align-middle text-slate-500 whitespace-nowrap'>—</td>
                      <td className='px-4 py-3.5 align-middle text-right whitespace-nowrap'>
                        <div className='inline-flex items-center gap-1'>
                          <button
                            type='button'
                            title='Xem'
                            aria-label='Xem bậc lương'
                            onClick={() => setViewingItem(item)}
                            className='p-1.5 rounded hover:bg-sky-50 text-slate-500 hover:text-sky-700 transition-colors cursor-pointer'
                          >
                            <IconEye size={14} />
                          </button>
                          <button
                            type='button'
                            title='Sửa'
                            aria-label='Sửa bậc lương'
                            onClick={() => setEditingItem(item)}
                            className='p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer'
                          >
                            <IconPencil size={14} />
                          </button>
                          <button
                            type='button'
                            title='Xóa'
                            aria-label='Xóa bậc lương'
                            onClick={() => setDeletingItem(item)}
                            className='p-1.5 rounded hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer'
                          >
                            <IconTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalRecords}
            itemsPerPage={itemsPerPage}
            itemName="bản ghi"
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <ThemBacLuongModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(newItem) => {
          setData((current) => [{ ...newItem, id: Date.now().toString() }, ...current]);
          setCurrentPage(1);
        }}
      />
      <XemBacLuongModal
        isOpen={!!viewingItem}
        item={viewingItem}
        onClose={() => setViewingItem(null)}
      />
      <SuaBacLuongModal
        isOpen={!!editingItem}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onSubmit={(updated) => {
          setData((current) => current.map((row) => (row.id === updated.id ? updated : row)));
        }}
      />
      <XoaBacLuongModal
        isOpen={!!deletingItem}
        item={deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={(id) => {
          setData((current) => current.filter((row) => row.id !== id));
        }}
      />
    </div>
  );
}
