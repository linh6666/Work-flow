"use client";

import React, { useMemo, useState, useRef } from 'react';
import {
  IconChevronUp,
  IconChevronDown,
  IconSelector,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';

export interface ThamNienNhanSuItem {
  id: string;
  maNV: string;
  hoTen: string;
  phongBan: string;
  chucVu: string;
  ngayVao: string;
  trangThai: string;
  thamNien: string;
}

export const THAM_NIEN_DATA: ThamNienNhanSuItem[] = [
  { id: '1',  maNV: 'NV130', hoTen: 'Phạm Văn Trọng (BTG)',       phongBan: 'Phòng Điện',                   chucVu: 'BTG Điện',            ngayVao: '22/09/2025', trangThai: 'Đang làm việc', thamNien: '0 năm 10 tháng' },
  { id: '2',  maNV: 'NV173', hoTen: 'Vũ Minh Ngọc (BTG)',         phongBan: 'Phòng Cảnh Quan',              chucVu: 'BTG Cảnh quan',       ngayVao: '11/08/2025', trangThai: 'Đang làm việc', thamNien: '1 năm' },
  { id: '3',  maNV: 'NV017', hoTen: 'Trần Quốc Tuấn',             phongBan: 'Khối Văn phòng',               chucVu: 'Lái xe',              ngayVao: '06/07/2026', trangThai: 'Đang làm việc', thamNien: '0 năm 1 tháng' },
  { id: '4',  maNV: 'NV011', hoTen: 'Tạ Hiền Trang',              phongBan: 'Phòng Công nghệ và Thiết kế',  chucVu: 'Marketing',           ngayVao: '23/12/2025', trangThai: 'Đang làm việc', thamNien: '0 năm 7 tháng' },
  { id: '5',  maNV: 'NV018', hoTen: 'Nguyễn Quang Linh',          phongBan: 'Phòng Công nghệ và Thiết kế',  chucVu: 'KTV Lập trình Web',    ngayVao: '23/06/2025', trangThai: 'Đang làm việc', thamNien: '1 năm 1 tháng' },
  { id: '6',  maNV: 'NV006', hoTen: 'Nguyễn Mai Lâm',             phongBan: 'Khối Văn phòng',               chucVu: 'Thu mua & QL NVL',    ngayVao: '23/12/2025', trangThai: 'Đang làm việc', thamNien: '0 năm 7 tháng' },
  { id: '7',  maNV: 'NV058', hoTen: 'Lương Ngọc Thành',           phongBan: 'Phòng Ghép',                   chucVu: 'Phụ ghép',            ngayVao: '23/03/2026', trangThai: 'Đang làm việc', thamNien: '0 năm 4 tháng' },
  { id: '8',  maNV: 'NV140', hoTen: 'Nguyễn Thị Hồng Ngọc',       phongBan: 'Phòng Cảnh Quan',              chucVu: 'Nhân viên',           ngayVao: '30/11/2024', trangThai: 'Đang làm việc', thamNien: '1 năm 8 tháng' },
  { id: '9',  maNV: 'NV134', hoTen: 'Nguyễn Ngọc Lan Anh',        phongBan: 'Phòng Cảnh Quan',              chucVu: 'Nhân viên',           ngayVao: '23/01/2026', trangThai: 'Đã nghỉ',        thamNien: '0 năm 6 tháng' },
  { id: '10', maNV: 'NV167', hoTen: 'Bùi Quang Nhật (BTG)',       phongBan: 'Phòng Cắt',                    chucVu: 'BTG Cắt',             ngayVao: '13/11/2025', trangThai: 'Đang làm việc', thamNien: '0 năm 9 tháng' },
  { id: '11', maNV: 'NV152', hoTen: 'Nguyễn Quang Lợi (BTG)',     phongBan: 'Phòng Ghép',                   chucVu: 'BTG Ghép',            ngayVao: '22/09/2025', trangThai: 'Đang làm việc', thamNien: '0 năm 10 tháng' },
  { id: '12', maNV: 'NV153', hoTen: 'Đặng Văn Điệp (BTG)',        phongBan: 'Phòng Ghép',                   chucVu: 'BTG Ghép',            ngayVao: '15/08/2022', trangThai: 'Đang làm việc', thamNien: '4 năm' },
  { id: '13', maNV: 'NV154', hoTen: 'Ninh Quang Vĩnh (BTG)',      phongBan: 'Phòng Ghép',                   chucVu: 'BTG Ghép',            ngayVao: '22/09/2025', trangThai: 'Đang làm việc', thamNien: '0 năm 10 tháng' },
  { id: '14', maNV: 'NV160', hoTen: 'Vũ Thị Hà Ly (BTG)',         phongBan: 'Phòng Ghép',                   chucVu: 'BTG Ghép',            ngayVao: '03/11/2025', trangThai: 'Đang làm việc', thamNien: '0 năm 9 tháng' },
  { id: '15', maNV: 'NV071', hoTen: 'Nguyễn Đăng Chính (BTG)',     phongBan: 'Phòng Ghép',                   chucVu: 'BTG Ghép',            ngayVao: '16/10/2025', trangThai: 'Đang làm việc', thamNien: '0 năm 10 tháng' },
  { id: '16', maNV: 'NV076', hoTen: 'Nguyễn Thị Thúy Kiều (BTG)',  phongBan: 'Phòng Ghép',                   chucVu: 'BTG Ghép',            ngayVao: '29/09/2025', trangThai: 'Đang làm việc', thamNien: '0 năm 10 tháng' },
  { id: '17', maNV: 'NV077', hoTen: 'Nguyễn Thị Quỳnh Châu (BTG)', phongBan: 'Phòng Ghép',                   chucVu: 'BTG Ghép',            ngayVao: '29/09/2025', trangThai: 'Đang làm việc', thamNien: '0 năm 10 tháng' },
  { id: '18', maNV: 'NV126', hoTen: 'Nguyễn Anh Đức (BTG)',       phongBan: 'Phòng Điện',                   chucVu: 'BTG Điện',            ngayVao: '22/09/2025', trangThai: 'Đang làm việc', thamNien: '0 năm 10 tháng' },
  { id: '19', maNV: 'NV150', hoTen: 'Nguyễn Thị Huyền (BTG)',     phongBan: 'Phòng Ghép',                   chucVu: 'BTG Ghép',            ngayVao: '31/12/2025', trangThai: 'Đang làm việc', thamNien: '0 năm 7 tháng' },
  { id: '20', maNV: 'NV001', hoTen: 'Nguyễn Đức Việt',            phongBan: 'Ban Giám đốc',                 chucVu: 'Giám đốc',            ngayVao: '01/02/2001', trangThai: 'Đang làm việc', thamNien: '25 năm 6 tháng' },
  { id: '21', maNV: 'NV002', hoTen: 'Phùng Bích Thảo',            phongBan: 'Ban Giám đốc',                 chucVu: 'Phó Giám đốc',        ngayVao: '01/02/2001', trangThai: 'Đang làm việc', thamNien: '25 năm 6 tháng' },
  { id: '22', maNV: 'NV003', hoTen: 'Nguyễn Thanh Tuấn',          phongBan: 'Ban Giám đốc',                 chucVu: 'Phó Giám đốc',        ngayVao: '01/02/2004', trangThai: 'Đang làm việc', thamNien: '22 năm 6 tháng' },
  { id: '23', maNV: 'NV004', hoTen: 'Vũ Thanh Thuỷ',              phongBan: 'Khối Văn phòng',               chucVu: 'QL Nhân sự',          ngayVao: '01/05/2010', trangThai: 'Đang làm việc', thamNien: '16 năm 3 tháng' },
  { id: '24', maNV: 'NV005', hoTen: 'Bùi Thị Duyên',              phongBan: 'Khối Văn phòng',               chucVu: 'Trưởng phòng',        ngayVao: '02/08/2007', trangThai: 'Đang làm việc', thamNien: '19 năm' },
  { id: '25', maNV: 'NV008', hoTen: 'Nguyễn Phú Quang',          phongBan: 'Khối Văn phòng',               chucVu: 'Kinh doanh',          ngayVao: '23/05/2026', trangThai: 'Đang làm việc', thamNien: '0 năm 2 tháng' },
  { id: '26', maNV: 'NV009', hoTen: 'Bùi Phương Uyên',           phongBan: 'Khối Văn phòng',               chucVu: 'Kinh doanh',          ngayVao: '—',          trangThai: 'Đang làm việc', thamNien: '—' },
  { id: '27', maNV: 'NV007', hoTen: 'Trần Thị Quỳnh Xuân',        phongBan: 'Khối Văn phòng',               chucVu: 'Hành chính',          ngayVao: '23/06/2026', trangThai: 'Đang làm việc', thamNien: '0 năm 1 tháng' },
  { id: '28', maNV: 'NV013', hoTen: 'Trần Thị Loan',              phongBan: 'Khối Văn phòng',               chucVu: 'Tạp vụ',              ngayVao: '03/06/2024', trangThai: 'Đang làm việc', thamNien: '2 năm 2 tháng' },
  { id: '29', maNV: 'NV010', hoTen: 'Nguyễn Quang Triệu',         phongBan: 'Phòng Công nghệ và Thiết kế',  chucVu: 'Trưởng phòng',        ngayVao: '23/10/2019', trangThai: 'Đang làm việc', thamNien: '6 năm 9 tháng' },
  { id: '30', maNV: 'NV015', hoTen: 'Lưu Quốc Nhật',              phongBan: 'Phòng Công nghệ và Thiết kế',  chucVu: 'KTV Lập trình nhúng', ngayVao: '30/09/2024', trangThai: 'Đang làm việc', thamNien: '1 năm 10 tháng' },
  { id: '31', maNV: 'NV016', hoTen: 'Cao Trường Thiên',           phongBan: 'Phòng Công nghệ và Thiết kế',  chucVu: 'Chụp ảnh, quay phim', ngayVao: '23/11/2024', trangThai: 'Đang làm việc', thamNien: '1 năm 8 tháng' },
  { id: '32', maNV: 'NV020', hoTen: 'Lê Quốc Long',              phongBan: 'Phòng Khai triển',             chucVu: 'Trưởng phòng',        ngayVao: '01/02/2006', trangThai: 'Đang làm việc', thamNien: '20 năm 6 tháng' },
  { id: '33', maNV: 'NV021', hoTen: 'Trần Diễm My',              phongBan: 'Phòng Khai triển',             chucVu: 'Phó phòng',           ngayVao: '09/10/2011', trangThai: 'Đang làm việc', thamNien: '14 năm 10 tháng' },
  { id: '34', maNV: 'NV023', hoTen: 'Phạm Tiến Thành',            phongBan: 'Phòng Khai triển',             chucVu: 'Kỹ thuật viên',       ngayVao: '23/11/2022', trangThai: 'Đang làm việc', thamNien: '3 năm 8 tháng' },
  { id: '35', maNV: 'NV027', hoTen: 'Nguyễn Thiên Hương',          phongBan: 'Phòng Khai triển',             chucVu: 'Kỹ thuật viên',       ngayVao: '23/02/2025', trangThai: 'Đang làm việc', thamNien: '1 năm 5 tháng' },
  { id: '36', maNV: 'NV025', hoTen: 'Dương Việt Anh',             phongBan: 'Phòng Khai triển',             chucVu: 'Kỹ thuật viên',       ngayVao: '08/12/2025', trangThai: 'Đang làm việc', thamNien: '0 năm 8 tháng' },
  { id: '37', maNV: 'NV028', hoTen: 'Đào Văn Thọ',               phongBan: 'Phòng Khai triển',             chucVu: 'Kỹ thuật viên',       ngayVao: '17/11/2025', trangThai: 'Đang làm việc', thamNien: '0 năm 9 tháng' },
  { id: '38', maNV: 'NV040', hoTen: 'Hoàng Hữu Vinh',             phongBan: 'Phòng Cắt',                    chucVu: 'Phó phòng',           ngayVao: '23/01/2024', trangThai: 'Đang làm việc', thamNien: '2 năm 6 tháng' },
  { id: '39', maNV: 'NV043', hoTen: 'Lê Trung Hiếu',              phongBan: 'Phòng Cắt',                    chucVu: 'Kỹ thuật viên',       ngayVao: '23/09/2025', trangThai: 'Đang làm việc', thamNien: '0 năm 10 tháng' },
  { id: '40', maNV: 'NV042', hoTen: 'Nguyễn Tuấn Việt',           phongBan: 'Phòng Cắt',                    chucVu: 'Kỹ thuật viên',       ngayVao: '23/01/2026', trangThai: 'Đang làm việc', thamNien: '0 năm 6 tháng' },
  { id: '41', maNV: 'NV050', hoTen: 'Bùi Ngọc Sỹ',               phongBan: 'Phòng Ghép',                   chucVu: 'Trưởng phòng',        ngayVao: '01/10/2004', trangThai: 'Đang làm việc', thamNien: '21 năm 10 tháng' },
  { id: '42', maNV: 'NV052', hoTen: 'Đinh Đức Lợi',              phongBan: 'Phòng Ghép',                   chucVu: 'Phó phòng',           ngayVao: '28/11/2016', trangThai: 'Đang làm việc', thamNien: '9 năm 8 tháng' },
  { id: '43', maNV: 'NV055', hoTen: 'Đỗ Thị Luyên',              phongBan: 'Phòng Ghép',                   chucVu: 'Kỹ thuật viên',       ngayVao: '15/07/2016', trangThai: 'Đang làm việc', thamNien: '10 năm 1 tháng' },
  { id: '44', maNV: 'NV056', hoTen: 'Nguyễn Thị Lanh',            phongBan: 'Phòng Ghép',                   chucVu: 'Kỹ thuật viên',       ngayVao: '15/07/2016', trangThai: 'Đang làm việc', thamNien: '10 năm 1 tháng' },
  { id: '45', maNV: 'NV053', hoTen: 'Nguyễn Tuân',                phongBan: 'Phòng Ghép',                   chucVu: 'Kỹ thuật viên',       ngayVao: '28/08/2023', trangThai: 'Đang làm việc', thamNien: '2 năm 11 tháng' },
  { id: '46', maNV: 'NV057', hoTen: 'Nguyễn Hoàng Phi Hùng',      phongBan: 'Phòng Ghép',                   chucVu: 'Phụ ghép',            ngayVao: '23/10/2023', trangThai: 'Đang làm việc', thamNien: '2 năm 9 tháng' },
  { id: '47', maNV: 'NV062', hoTen: 'Nguyễn Chi Hiếu',           phongBan: 'Phòng Ghép',                   chucVu: 'Phụ ghép',            ngayVao: '01/06/2025', trangThai: 'Đang làm việc', thamNien: '1 năm 2 tháng' },
  { id: '48', maNV: 'NV080', hoTen: 'Đinh Hữu Sử',               phongBan: 'Phòng Mộc Sơn',                chucVu: 'Phó phòng',           ngayVao: '13/01/2016', trangThai: 'Đang làm việc', thamNien: '10 năm 7 tháng' },
  { id: '49', maNV: 'NV082', hoTen: 'Hoàng Quyết Thắng',          phongBan: 'Phòng Mộc Sơn',                chucVu: 'Kỹ thuật viên',       ngayVao: '24/07/2023', trangThai: 'Đang làm việc', thamNien: '3 năm' },
  { id: '50', maNV: 'NV089', hoTen: 'Nguyễn Minh Hiếu',          phongBan: 'Phòng Mộc Sơn',                chucVu: 'Phụ mộc',             ngayVao: '23/05/2026', trangThai: 'Đang làm việc', thamNien: '0 năm 2 tháng' },
  { id: '51', maNV: 'NV083', hoTen: 'Quan Minh Hoàng',           phongBan: 'Phòng Mộc Sơn',                chucVu: 'Phụ sơn',             ngayVao: '23/05/2026', trangThai: 'Đang làm việc', thamNien: '0 năm 2 tháng' },
  { id: '52', maNV: 'NV120', hoTen: 'Bùi Văn Lộc',               phongBan: 'Phòng Điện',                   chucVu: 'Trưởng phòng',        ngayVao: '01/10/2007', trangThai: 'Đang làm việc', thamNien: '18 năm 10 tháng' },
  { id: '53', maNV: 'NV121', hoTen: 'Lâm Vĩnh Hưng',              phongBan: 'Phòng Điện',                   chucVu: 'Phó phòng',           ngayVao: '08/09/2011', trangThai: 'Đang làm việc', thamNien: '14 năm 11 tháng' },
  { id: '54', maNV: 'NV123', hoTen: 'Hà Tùng Lâm',               phongBan: 'Phòng Điện',                   chucVu: 'Kỹ thuật viên',       ngayVao: '22/04/2024', trangThai: 'Đang làm việc', thamNien: '2 năm 3 tháng' },
  { id: '55', maNV: 'NV131', hoTen: 'Phạm Thị Thu Trang',         phongBan: 'Phòng Cảnh Quan',              chucVu: 'Trưởng phòng',        ngayVao: '24/04/2017', trangThai: 'Đang làm việc', thamNien: '9 năm 3 tháng' },
  { id: '56', maNV: 'NV132', hoTen: 'Vũ Minh Hằng',              phongBan: 'Phòng Cảnh Quan',              chucVu: 'Nhân viên',           ngayVao: '23/10/2024', trangThai: 'Đang làm việc', thamNien: '1 năm 9 tháng' },
  { id: '57', maNV: 'NV136', hoTen: 'Sầm Thị Thủy',              phongBan: 'Phòng Cảnh Quan',              chucVu: 'Nhân viên',           ngayVao: '01/11/2023', trangThai: 'Đang làm việc', thamNien: '2 năm 9 tháng' },
  { id: '58', maNV: 'NV137', hoTen: 'Nguyễn Thị Hướng',           phongBan: 'Phòng Cảnh Quan',              chucVu: 'Nhân viên',           ngayVao: '23/12/2023', trangThai: 'Đang làm việc', thamNien: '2 năm 7 tháng' },
  { id: '59', maNV: 'NV138', hoTen: 'Tống Thị Thu',               phongBan: 'Phòng Cảnh Quan',              chucVu: 'Nhân viên',           ngayVao: '23/10/2024', trangThai: 'Đang làm việc', thamNien: '1 năm 9 tháng' },
];

type SortKey = keyof ThamNienNhanSuItem;
type SortDir = 'asc' | 'desc';

const TRANG_THAI_STYLE: Record<string, string> = {
  'Đang làm việc': 'bg-emerald-50 text-emerald-600 border-emerald-200/70',
  'Thử việc':      'bg-amber-50  text-amber-600  border-amber-200/70',
  'Nghỉ phép':     'bg-sky-50    text-sky-600    border-sky-200/70',
  'Đã nghỉ':       'bg-rose-50   text-rose-500   border-rose-200/70',
  'Nghỉ việc':     'bg-rose-50   text-rose-500   border-rose-200/70',
};

// Chuyển string thâm niên thành số tháng để sort chính xác
function parseThamNienMonths(s: string): number {
  if (!s || s === '—' || s === '< 1 tháng') return -1;
  const ym = s.match(/(\d+)\s*năm/);
  const mm = s.match(/(\d+)\s*tháng/);
  return (ym ? parseInt(ym[1], 10) * 12 : 0) + (mm ? parseInt(mm[1], 10) : 0);
}

// Chuyển DD/MM/YYYY thành Date timestamp để sort ngày
function parseDateString(d: string): number {
  if (!d || d === '—') return 0;
  const parts = d.split('/');
  if (parts.length === 3) {
    return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10)).getTime();
  }
  return 0;
}

export default function BaoCaoThamNienTab() {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = tableContainerRef.current?.scrollLeft ?? 0;
    if (tableContainerRef.current) tableContainerRef.current.style.cursor = 'grabbing';
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    if (tableContainerRef.current)
      tableContainerRef.current.scrollLeft = scrollStart.current - (e.clientX - startX.current);
  };
  const stopDrag = () => {
    isDragging.current = false;
    if (tableContainerRef.current) tableContainerRef.current.style.cursor = 'default';
  };

  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleSort = (key: SortKey) => {
    setCurrentPage(1);
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const stats = useMemo(() => {
    const total = THAM_NIEN_DATA.length;
    const dangLamViec = THAM_NIEN_DATA.filter((nv) => nv.trangThai === 'Đang làm việc').length;
    const thuViec = THAM_NIEN_DATA.filter((nv) => nv.trangThai === 'Thử việc').length;
    const daNghi = THAM_NIEN_DATA.filter((nv) => nv.trangThai === 'Đã nghỉ' || nv.trangThai === 'Nghỉ việc').length;
    return { total, dangLamViec, thuViec, daNghi };
  }, []);

  const sortedData = useMemo(() => {
    if (!sortKey) return THAM_NIEN_DATA;

    return [...THAM_NIEN_DATA].sort((a, b) => {
      let av: string | number = '';
      let bv: string | number = '';

      if (sortKey === 'thamNien') {
        av = parseThamNienMonths(a.thamNien);
        bv = parseThamNienMonths(b.thamNien);
      } else if (sortKey === 'ngayVao') {
        av = parseDateString(a.ngayVao);
        bv = parseDateString(b.ngayVao);
      } else {
        av = (a[sortKey] ?? '').toLowerCase();
        bv = (b[sortKey] ?? '').toLowerCase();
      }

      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortKey, sortDir]);

  const totalRecords = sortedData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRecords);
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const cards = [
    { label: 'Tổng nhân sự',  value: stats.total,       color: 'text-indigo-600' },
    { label: 'Đang làm việc', value: stats.dangLamViec,  color: 'text-emerald-600' },
    { label: 'Thử việc',      value: stats.thuViec,      color: 'text-amber-600' },
    { label: 'Đã nghỉ',       value: stats.daNghi,       color: 'text-rose-600' },
  ];

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <IconSelector size={12} className="text-slate-300 group-hover:text-slate-400 shrink-0" />;
    return sortDir === 'asc'
      ? <IconChevronUp size={12} className="text-indigo-600 shrink-0" />
      : <IconChevronDown size={12} className="text-indigo-600 shrink-0" />;
  };

  const thCls = 'px-4 py-2.5 font-bold text-slate-500 text-[11px] whitespace-nowrap cursor-pointer select-none hover:text-slate-700 transition-colors uppercase tracking-wider group';

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white px-5 pt-4 pb-4">
      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-4 shrink-0">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white border border-slate-200/80 rounded-xl px-4 py-3 shadow-2xs flex flex-col gap-0.5"
          >
            <span className="text-[11.5px] text-slate-500 font-medium">{card.label}</span>
            <span className={`text-2xl font-bold leading-tight ${card.color}`}>{card.value}</span>
          </div>
        ))}
      </div>

      {/* ── Table Container ── */}
      <div className="flex-1 min-h-0 flex flex-col bg-white border border-slate-200/90 rounded-xl shadow-2xs overflow-hidden">
        <div
          ref={tableContainerRef}
          className="flex-1 overflow-auto min-h-0 no-scrollbar"
          style={{ cursor: 'default', userSelect: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          <table className="min-w-max w-full text-xs text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 shadow-2xs">
              <tr>
                <th className={thCls} onClick={() => handleSort('maNV')}>
                  <div className="flex items-center gap-1">MÃ NV <SortIcon k="maNV" /></div>
                </th>
                <th className={thCls} onClick={() => handleSort('hoTen')}>
                  <div className="flex items-center gap-1">HỌ TÊN <SortIcon k="hoTen" /></div>
                </th>
                <th className={thCls} onClick={() => handleSort('phongBan')}>
                  <div className="flex items-center gap-1">PHÒNG BAN <SortIcon k="phongBan" /></div>
                </th>
                <th className={thCls} onClick={() => handleSort('chucVu')}>
                  <div className="flex items-center gap-1">CHỨC DANH <SortIcon k="chucVu" /></div>
                </th>
                <th className={thCls} onClick={() => handleSort('ngayVao')}>
                  <div className="flex items-center gap-1">NGÀY VÀO <SortIcon k="ngayVao" /></div>
                </th>
                <th className={thCls} onClick={() => handleSort('trangThai')}>
                  <div className="flex items-center gap-1">TRẠNG THÁI <SortIcon k="trangThai" /></div>
                </th>
                <th className={thCls} onClick={() => handleSort('thamNien')}>
                  <div className="flex items-center gap-1">THÂM NIÊN <SortIcon k="thamNien" /></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/90">
              {paginatedData.map((nv) => (
                <tr key={nv.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Mã NV */}
                  <td className="px-4 py-2.5 whitespace-nowrap font-medium text-slate-500 text-[11.5px]">
                    {nv.maNV}
                  </td>

                  {/* Họ tên */}
                  <td className="px-4 py-2.5 whitespace-nowrap font-semibold text-slate-800 text-xs">
                    {nv.hoTen}
                  </td>

                  {/* Phòng ban */}
                  <td className="px-4 py-2.5 whitespace-nowrap text-slate-600 text-xs">
                    {nv.phongBan}
                  </td>

                  {/* Chức danh */}
                  <td className="px-4 py-2.5 whitespace-nowrap text-slate-600 text-xs">
                    {nv.chucVu || '—'}
                  </td>

                  {/* Ngày vào */}
                  <td className="px-4 py-2.5 whitespace-nowrap text-slate-600 text-xs">
                    {nv.ngayVao || '—'}
                  </td>

                  {/* Trạng thái */}
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-medium border ${
                        TRANG_THAI_STYLE[nv.trangThai] ?? 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {nv.trangThai}
                    </span>
                  </td>

                  {/* Thâm niên */}
                  <td className="px-4 py-2.5 whitespace-nowrap font-medium text-indigo-900 text-xs">
                    {nv.thamNien || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Pagination Footer ── */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11.5px] text-slate-500 bg-slate-50/60">
          <div>
            Hiển thị <span className="font-bold text-slate-700">{totalRecords > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalRecords}</span> nhân sự
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <IconChevronLeft size={13} />
              <span>Trước</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                style={currentPage === page ? { backgroundColor: '#406c89' } : {}}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentPage === page
                    ? 'text-white shadow-2xs'
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
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Sau</span>
              <IconChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
