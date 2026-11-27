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
  IconCertificate,
  IconFileText,
} from '@tabler/icons-react';
import { PHONG_BAN_LIST } from '../DanhSachTongQuat';
import Pagination from '@/common/pagination';
import ThemThamNienModal from './modal/ThemThamNienModal';
import SuaThamNienModal from './modal/SuaThamNienModal';
import ChiTietThamNienModal from './modal/ChiTietThamNienModal';
import XoaThamNienModal from './modal/XoaThamNienModal';

export interface ThamNienItem {
  id: string;
  maNV: string;
  hoTen: string;
  phongBan: string;
  chucVu: string;
  ngayVao: string;
  ngayChinhThuc?: string;
  soNam: number;
  soThang: number;
  thamNienText: string;
  mocKhenThuong: string;
  troCapThamNien: number;
  trangThai: string;
  ghiChu: string;
}

export const INITIAL_THAM_NIEN_DATA: ThamNienItem[] = [
  { id: '1', maNV: 'NV001', hoTen: 'Bùi Thị Duyên', phongBan: 'Phòng Kinh doanh', chucVu: 'Trưởng phòng Kinh doanh', ngayVao: '02/08/2007', soNam: 19, soThang: 0, thamNienText: '19 năm', mocKhenThuong: 'Huy chương Cống hiến 15 năm', troCapThamNien: 2000000, trangThai: 'Đang làm việc', ghiChu: 'Cán bộ nòng cốt' },
  { id: '2', maNV: 'NV002', hoTen: 'Nguyễn Phú Quang', phongBan: 'Phòng Khai triển', chucVu: 'Trưởng phòng Khai triển', ngayVao: '23/05/2026', soNam: 0, soThang: 2, thamNienText: '0 năm 2 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '3', maNV: 'NV003', hoTen: 'Kỳ Anh', phongBan: 'Phòng Cảnh Quan', chucVu: 'Chuyên viên Cảnh quan', ngayVao: '11/08/2025', soNam: 1, soThang: 0, thamNienText: '1 năm', mocKhenThuong: '—', troCapThamNien: 200000, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '4', maNV: 'NV004', hoTen: 'Bùi Phương Uyên', phongBan: 'Phòng Điện', chucVu: 'Kỹ sư Điện & Chiếu sáng', ngayVao: '22/09/2025', soNam: 0, soThang: 10, thamNienText: '0 năm 10 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '5', maNV: 'NV005', hoTen: 'Thao Phung', phongBan: 'Phòng Mộc Sơn', chucVu: 'KTV Sơn hoàn thiện', ngayVao: '01/05/2026', soNam: 0, soThang: 3, thamNienText: '0 năm 3 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Thử việc', ghiChu: 'Đang thử việc' },
  { id: '6', maNV: 'NV006', hoTen: 'Lê Hoàng Long', phongBan: 'Phòng Cắt', chucVu: 'KTV Laser & CNC', ngayVao: '13/11/2025', soNam: 0, soThang: 9, thamNienText: '0 năm 9 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '7', maNV: 'NV007', hoTen: 'Trần Văn Mạnh', phongBan: 'Lắp đặt', chucVu: 'Đội trưởng Lắp đặt', ngayVao: '15/08/2022', soNam: 4, soThang: 0, thamNienText: '4 năm', mocKhenThuong: 'Khen thưởng 3 năm', troCapThamNien: 800000, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '8', maNV: 'NV008', hoTen: 'Phạm Minh Trang', phongBan: 'Phòng Công nghệ và Thiết kế', chucVu: 'Kiến trúc sư 3D', ngayVao: '23/12/2025', soNam: 0, soThang: 7, thamNienText: '0 năm 7 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Thử việc', ghiChu: 'Đang thử việc' },
  { id: '9', maNV: 'NV009', hoTen: 'Nguyễn Đức Việt', phongBan: 'Ban Giám đốc', chucVu: 'Giám đốc', ngayVao: '01/02/2001', ngayChinhThuc: '01/02/2001', soNam: 25, soThang: 9, thamNienText: '25 năm 9 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '10', maNV: 'NV010', hoTen: 'Phùng Bích Thảo', phongBan: 'Ban Giám đốc', chucVu: 'Phó Giám đốc HC-NS', ngayVao: '01/02/2001', ngayChinhThuc: '01/02/2001', soNam: 25, soThang: 9, thamNienText: '25 năm 9 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '11', maNV: 'NV011', hoTen: 'Nguyễn Thanh Tuấn', phongBan: 'Ban Giám đốc', chucVu: 'Phó Giám đốc Kỹ thuật', ngayVao: '01/02/2004', ngayChinhThuc: '01/02/2004', soNam: 22, soThang: 9, thamNienText: '22 năm 9 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '12', maNV: 'NV012', hoTen: 'Bùi Ngọc Sỹ', phongBan: 'Phòng Ghép', chucVu: 'Trưởng phòng Ghép', ngayVao: '01/10/2004', ngayChinhThuc: '01/10/2004', soNam: 22, soThang: 1, thamNienText: '22 năm 1 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '13', maNV: 'NV013', hoTen: 'Lê Quốc Long', phongBan: 'Phòng Khai triển', chucVu: 'Trưởng phòng Khai triển', ngayVao: '01/02/2006', ngayChinhThuc: '01/02/2006', soNam: 20, soThang: 9, thamNienText: '20 năm 9 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '14', maNV: 'NV014', hoTen: 'Bùi Văn Lộc', phongBan: 'Phòng Điện', chucVu: 'Trưởng phòng Điện', ngayVao: '01/10/2007', ngayChinhThuc: '01/10/2007', soNam: 19, soThang: 1, thamNienText: '19 năm 1 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '15', maNV: 'NV015', hoTen: 'Vũ Thanh Thuỷ', phongBan: 'Khối Văn phòng', chucVu: 'Phó Khối văn phòng', ngayVao: '15/03/2010', ngayChinhThuc: '23/04/2010', soNam: 16, soThang: 8, thamNienText: '16 năm 8 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '16', maNV: 'NV016', hoTen: 'Lâm Vĩnh Hưng', phongBan: 'Phòng Điện', chucVu: 'Phó phòng Điện', ngayVao: '18/07/2011', ngayChinhThuc: '08/09/2011', soNam: 15, soThang: 4, thamNienText: '15 năm 4 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '17', maNV: 'NV017', hoTen: 'Trần Diễm My', phongBan: 'Phòng Khai triển', chucVu: 'Phó phòng Khai triển', ngayVao: '09/08/2011', ngayChinhThuc: '09/10/2011', soNam: 15, soThang: 3, thamNienText: '15 năm 3 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '18', maNV: 'NV018', hoTen: 'Đinh Hữu Sử', phongBan: 'Phòng Mộc Sơn', chucVu: 'Trưởng phòng Mộc Sơn', ngayVao: '14/12/2015', ngayChinhThuc: '13/01/2016', soNam: 10, soThang: 11, thamNienText: '10 năm 11 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '19', maNV: 'NV019', hoTen: 'Đỗ Thị Luyên', phongBan: 'Phòng Ghép', chucVu: 'NV KTV Ghép', ngayVao: '25/05/2016', ngayChinhThuc: '15/07/2016', soNam: 10, soThang: 6, thamNienText: '10 năm 6 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '20', maNV: 'NV020', hoTen: 'Nguyễn Thị Lanh', phongBan: 'Phòng Ghép', chucVu: 'NV KTV Ghép', ngayVao: '09/05/2016', ngayChinhThuc: '15/07/2016', soNam: 10, soThang: 6, thamNienText: '10 năm 6 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '21', maNV: 'NV021', hoTen: 'Đinh Đức Lợi', phongBan: 'Phòng Ghép', chucVu: 'Phó phòng Ghép', ngayVao: '19/09/2016', ngayChinhThuc: '28/11/2016', soNam: 10, soThang: 2, thamNienText: '10 năm 2 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '22', maNV: 'NV022', hoTen: 'Phạm Thị Thu Trang', phongBan: 'Phòng Cảnh quan', chucVu: 'Trưởng phòng cảnh quan', ngayVao: '23/02/2017', ngayChinhThuc: '24/04/2017', soNam: 9, soThang: 9, thamNienText: '9 năm 9 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '23', maNV: 'NV023', hoTen: 'Nguyễn Quang Triệu', phongBan: 'Phòng Công nghệ và Thiết kế', chucVu: 'Trưởng phòng CN&TK', ngayVao: '26/08/2019', ngayChinhThuc: '25/10/2019', soNam: 7, soThang: 3, thamNienText: '7 năm 3 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '24', maNV: 'NV024', hoTen: 'Phạm Tiến Thành', phongBan: 'Phòng Khai triển', chucVu: 'NV Khai triển', ngayVao: '20/10/2022', ngayChinhThuc: '23/11/2022', soNam: 4, soThang: 1, thamNienText: '4 năm 1 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '25', maNV: 'NV025', hoTen: 'Nguyễn Phương Anh (BTG)', phongBan: 'Phòng Cảnh quan', chucVu: 'BTG Cảnh quan', ngayVao: '04/09/2023', ngayChinhThuc: '04/09/2023', soNam: 2, soThang: 6, thamNienText: '2 năm 6 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đã nghỉ', ghiChu: '' },
  { id: '26', maNV: 'NV026', hoTen: 'Vũ Minh Hằng', phongBan: 'Phòng Cảnh quan', chucVu: 'NV Cảnh quan', ngayVao: '27/07/2024', ngayChinhThuc: '23/10/2024', soNam: 2, soThang: 4, thamNienText: '2 năm 4 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '27', maNV: 'NV027', hoTen: 'Tống Thị Thu', phongBan: 'Phòng Cảnh quan', chucVu: 'NV Cảnh quan', ngayVao: '23/07/2024', ngayChinhThuc: '23/10/2024', soNam: 2, soThang: 4, thamNienText: '2 năm 4 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '28', maNV: 'NV028', hoTen: 'Lưu Quốc Nhật', phongBan: 'Phòng Công nghệ và Thiết kế', chucVu: 'Lập trình nhúng', ngayVao: '06/08/2024', ngayChinhThuc: '30/10/2024', soNam: 2, soThang: 3, thamNienText: '2 năm 3 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '29', maNV: 'NV029', hoTen: 'Cao Trường Thiên', phongBan: 'Phòng Công nghệ và Thiết kế', chucVu: 'Chụp, Quay, dựng ảnh & video', ngayVao: '07/10/2024', ngayChinhThuc: '23/11/2024', soNam: 2, soThang: 1, thamNienText: '2 năm 1 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '30', maNV: 'NV030', hoTen: 'Nguyễn Quang Linh', phongBan: 'Phòng Công nghệ và Thiết kế', chucVu: 'Lập trình web', ngayVao: '08/04/2025', ngayChinhThuc: '23/06/2025', soNam: 1, soThang: 7, thamNienText: '1 năm 7 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
];

function getInitial(name: string): string {
  const parts = name.trim().split(/\s+/);
  const last = parts[parts.length - 1] || name;
  return last.charAt(0).toUpperCase();
}

function getNextAnniversary(ngayVao: string): { dateStr: string; label: string } | null {
  if (!ngayVao || ngayVao === '—') return null;
  const m = ngayVao.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const day = parseInt(m[1], 10);
  const month = parseInt(m[2], 10);
  const startYear = parseInt(m[3], 10);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let nextYear = today.getFullYear();
  let nextDate = new Date(nextYear, month - 1, day);
  if (nextDate <= today) {
    nextYear += 1;
    nextDate = new Date(nextYear, month - 1, day);
  }
  const diffDays = Math.round((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const years = nextYear - startYear;
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  return {
    dateStr: `${dd}/${mm}/${nextYear}`,
    label: `${years} năm · ${diffDays} ngày`,
  };
}

interface ThamNienTabProps {
  searchQuery?: string;
  selectedPhongBan?: string;
}

export default function ThamNienTab({
  searchQuery,
  selectedPhongBan,
}: ThamNienTabProps) {
  const [data, setData] = useState<ThamNienItem[]>(INITIAL_THAM_NIEN_DATA);
  const [internalSearch, setInternalSearch] = useState('');
  const [internalPhongBan, setInternalPhongBan] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [viewingItem, setViewingItem] = useState<ThamNienItem | null>(null);
  const [editingItem, setEditingItem] = useState<ThamNienItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<ThamNienItem | null>(null);
  const itemsPerPage = 15;

  useEffect(() => {
    const handleAddClick = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      if (detail?.tab === 'tham-nien') {
        setIsAddOpen(true);
      }
    };
    window.addEventListener('nhan-su-add-click', handleAddClick);
    return () => window.removeEventListener('nhan-su-add-click', handleAddClick);
  }, []);

  const search = searchQuery !== undefined ? searchQuery : internalSearch;
  const filterPhongBan = selectedPhongBan !== undefined ? selectedPhongBan : internalPhongBan;

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.hoTen.toLowerCase().includes(q) ||
        item.maNV.toLowerCase().includes(q) ||
        item.phongBan.toLowerCase().includes(q) ||
        item.chucVu.toLowerCase().includes(q) ||
        item.thamNienText.toLowerCase().includes(q);

      const matchPB = filterPhongBan === 'ALL' || item.phongBan === filterPhongBan;

      return matchSearch && matchPB;
    });
  }, [data, search, filterPhongBan]);

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
              <thead className="sticky top-0 z-10 bg-[#406c89] text-white shadow-2xs">
                <tr>
                  <th className="px-4 py-2.5 font-semibold text-white text-[11.5px] whitespace-nowrap">Nhân sự</th>
                  <th className="px-4 py-2.5 font-semibold text-white text-[11.5px] whitespace-nowrap">Phòng ban</th>
                  <th className="px-4 py-2.5 font-semibold text-white text-[11.5px] whitespace-nowrap">Chức vụ</th>
                  <th className="px-4 py-2.5 font-semibold text-white text-[11.5px] whitespace-nowrap">Ngày vào</th>
                  <th className="px-4 py-2.5 font-semibold text-white text-[11.5px] whitespace-nowrap">Ngày chính thức</th>
                  <th className="px-4 py-2.5 font-semibold text-white text-[11.5px] whitespace-nowrap">Thâm niên</th>
                  <th className="px-4 py-2.5 font-semibold text-white text-[11.5px] whitespace-nowrap">Kỷ niệm kế tiếp</th>
                  <th className="px-4 py-2.5 font-semibold text-white text-[11.5px] whitespace-nowrap">Trạng thái</th>
                  <th className="px-4 py-2.5 font-semibold text-white text-[11.5px] text-right whitespace-nowrap">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-12 text-slate-400">
                      <IconCertificate size={36} className="mx-auto mb-2 text-slate-300 stroke-1" />
                      <p className="font-semibold text-xs text-slate-600">Không tìm thấy dữ liệu thâm niên</p>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item) => {
                    const anniv = item.trangThai === 'Đã nghỉ' ? null : getNextAnniversary(item.ngayVao);
                    return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-4 py-2.5 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200/80 text-slate-500 text-[10px] font-bold inline-flex items-center justify-center shrink-0">
                            {getInitial(item.hoTen)}
                          </span>
                          <span className="font-semibold text-slate-800 text-xs">{item.hoTen}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 align-middle text-slate-600 whitespace-nowrap">{item.phongBan}</td>
                      <td className="px-4 py-2.5 align-middle text-slate-600 whitespace-nowrap">{item.chucVu}</td>
                      <td className="px-4 py-2.5 align-middle text-slate-600 whitespace-nowrap">{item.ngayVao}</td>
                      <td className="px-4 py-2.5 align-middle text-slate-600 whitespace-nowrap">{item.ngayChinhThuc || item.ngayVao}</td>
                      <td className="px-4 py-2.5 align-middle font-medium text-indigo-900 whitespace-nowrap">
                        {item.thamNienText}
                      </td>
                      <td className="px-4 py-2.5 align-middle whitespace-nowrap">
                        {anniv ? (
                          <div className="flex items-center gap-2">
                            <span className="text-slate-600">{anniv.dateStr}</span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-amber-50 text-amber-700 border border-amber-200/70">
                              {anniv.label}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 align-middle whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-medium border ${
                            item.trangThai === 'Đang làm việc'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200/70'
                              : item.trangThai === 'Đã nghỉ'
                              ? 'bg-rose-50 text-rose-500 border-rose-200/70'
                              : 'bg-amber-50 text-amber-600 border-amber-200/70'
                          }`}
                        >
                          {item.trangThai}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 align-middle text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            title="Xem chi tiết"
                            onClick={() => setViewingItem(item)}
                            className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-sky-600 transition-colors cursor-pointer"
                          >
                            <IconEye size={13} />
                          </button>
                          <button
                            type="button"
                            title="Chỉnh sửa"
                            onClick={() => setEditingItem(item)}
                            className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                          >
                            <IconPencil size={13} />
                          </button>
                          <button
                            type="button"
                            title="Xóa"
                            onClick={() => setDeletingItem(item)}
                            className="p-1.5 rounded border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                          >
                            <IconTrash size={13} />
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

          {/* Pagination Footer */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalRecords}
            itemsPerPage={itemsPerPage}
            itemName="nhân sự"
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Modals */}
      <ThemThamNienModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={(added) => {
          setData((prev) => [added, ...prev]);
          setCurrentPage(1);
        }}
      />

      <SuaThamNienModal
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onSave={(saved) => {
          setData((prev) => prev.map((x) => (x.id === saved.id ? saved : x)));
        }}
      />

      <ChiTietThamNienModal
        item={viewingItem}
        anniversary={
          viewingItem && viewingItem.trangThai !== 'Đã nghỉ'
            ? getNextAnniversary(viewingItem.ngayVao)
            : null
        }
        onClose={() => setViewingItem(null)}
      />

      <XoaThamNienModal
        item={deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={(id) => {
          setData((prev) => prev.filter((x) => x.id !== id));
        }}
      />
    </div>
  );
}
