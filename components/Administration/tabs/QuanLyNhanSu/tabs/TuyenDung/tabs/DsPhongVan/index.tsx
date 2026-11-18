"use client";

import React, { useState, useRef } from 'react';
import {
  IconSearch,
  IconFilter,
  IconDownload,
  IconArrowsSort,
  IconArrowUp,
  IconArrowDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCalendarTime,
} from '@tabler/icons-react';
import PhieuDanhGiaModal from './modal/PhieuDanhGiaModal';
import HoSoUngVienModal from './modal/HoSoUngVienModal';

export interface PhongVanItem {
  id: string;
  stt: number;
  phieuDg: 'Lập phiếu' | 'Đã lập phiếu';
  hoTenUv: string;
  uvColor: 'green' | 'red';
  chucVu: string;
  phongBan: string;
  dienThoai: string;
  lichPv1Ngay: string;
  gioPv: string;
  uvDuocHenPv: number | string;
  uvThamGiaPv: number | string;
  uvDatYeuCau: 'PASS' | 'FAIL' | '—';
  uvNhanViec: 'PASS' | 'FAIL' | '—';
  ketQua: 'PASS' | 'FAIL' | '—';
  ngayBatDauDiLam: string;
  ghiChu: string;
}

const INITIAL_PHONG_VAN_DATA: PhongVanItem[] = [
  {
    id: 'pv-1',
    stt: 1,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Nguyễn Việt Long',
    uvColor: 'green',
    chucVu: 'NV Marketing',
    phongBan: 'Phòng Công nghệ và Thiết kế',
    dienThoai: '0859802360',
    lichPv1Ngay: '19/11/2026',
    gioPv: '10:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: '—',
    uvDatYeuCau: '—',
    uvNhanViec: '—',
    ketQua: '—',
    ngayBatDauDiLam: '—',
    ghiChu: '—',
  },
  {
    id: 'pv-2',
    stt: 2,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Trịnh Lâm Tường',
    uvColor: 'green',
    chucVu: 'NV Marketing',
    phongBan: 'Phòng Công nghệ và Thiết kế',
    dienThoai: '0961524796',
    lichPv1Ngay: '19/11/2026',
    gioPv: '10:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: '—',
    uvDatYeuCau: '—',
    uvNhanViec: '—',
    ketQua: '—',
    ngayBatDauDiLam: '—',
    ghiChu: '—',
  },
  {
    id: 'pv-3',
    stt: 3,
    phieuDg: 'Đã lập phiếu',
    hoTenUv: 'Lê Minh Quyền',
    uvColor: 'green',
    chucVu: 'NV Cảnh quan',
    phongBan: 'Phòng Cảnh Quan',
    dienThoai: '0925967212',
    lichPv1Ngay: '17/11/2026',
    gioPv: '15:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: 'PASS',
    uvNhanViec: '—',
    ketQua: 'PASS',
    ngayBatDauDiLam: '23/11/2026',
    ghiChu: '—',
  },
  {
    id: 'pv-4',
    stt: 4,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Trần Thu Hằng',
    uvColor: 'red',
    chucVu: 'NV Kinh doanh',
    phongBan: 'Phòng Công nghệ và Thiết kế',
    dienThoai: '0964 560 292',
    lichPv1Ngay: '17/11/2026',
    gioPv: '15:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 0,
    uvDatYeuCau: '—',
    uvNhanViec: '—',
    ketQua: 'FAIL',
    ngayBatDauDiLam: '—',
    ghiChu: 'TOEIC 850 (Listening & Reading)',
  },
  {
    id: 'pv-5',
    stt: 5,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Trần Quỳnh Anh',
    uvColor: 'red',
    chucVu: 'NV Kinh doanh',
    phongBan: 'Khối Văn phòng',
    dienThoai: '0934595330',
    lichPv1Ngay: '17/11/2026',
    gioPv: '15:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 0,
    uvDatYeuCau: '—',
    uvNhanViec: '—',
    ketQua: 'FAIL',
    ngayBatDauDiLam: '—',
    ghiChu: 'Tiếng anh giao tiếp',
  },
  {
    id: 'pv-6',
    stt: 6,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Phạm Nhật Duy',
    uvColor: 'red',
    chucVu: 'NV Marketing',
    phongBan: 'Phòng Công nghệ và Thiết kế',
    dienThoai: '0914792086',
    lichPv1Ngay: '16/11/2026',
    gioPv: '15:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 0,
    uvDatYeuCau: '—',
    uvNhanViec: '—',
    ketQua: 'FAIL',
    ngayBatDauDiLam: '—',
    ghiChu: 'Chưa tốt nghiệp-kt lại thời gian tốt nghiệp',
  },
  {
    id: 'pv-7',
    stt: 7,
    phieuDg: 'Đã lập phiếu',
    hoTenUv: 'Nguyễn Thị Kim Phượng',
    uvColor: 'green',
    chucVu: 'NV Ghép',
    phongBan: 'Phòng Ghép',
    dienThoai: '0394199209',
    lichPv1Ngay: '12/11/2026',
    gioPv: '16:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: 'PASS',
    uvNhanViec: 'PASS',
    ketQua: 'PASS',
    ngayBatDauDiLam: '20/11/2026',
    ghiChu: '—',
  },
  {
    id: 'pv-8',
    stt: 8,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Nguyễn Quý Hoàng',
    uvColor: 'green',
    chucVu: 'NV Marketing',
    phongBan: 'Phòng Công nghệ và Thiết kế',
    dienThoai: '0562952656',
    lichPv1Ngay: '12/11/2026',
    gioPv: '15:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: '—',
    uvNhanViec: '—',
    ketQua: '—',
    ngayBatDauDiLam: '—',
    ghiChu: '—',
  },
  {
    id: 'pv-9',
    stt: 9,
    phieuDg: 'Đã lập phiếu',
    hoTenUv: 'Nguyễn Thị Ly',
    uvColor: 'green',
    chucVu: 'NV Cảnh quan',
    phongBan: 'Phòng Cảnh Quan',
    dienThoai: '0346207296',
    lichPv1Ngay: '12/11/2026',
    gioPv: '15:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: 'PASS',
    uvNhanViec: 'FAIL',
    ketQua: 'PASS',
    ngayBatDauDiLam: '16/11/2026',
    ghiChu: '—',
  },
  {
    id: 'pv-10',
    stt: 10,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Lê Văn Thái',
    uvColor: 'red',
    chucVu: 'NV Marketing',
    phongBan: 'Phòng Công nghệ và Thiết kế',
    dienThoai: '—',
    lichPv1Ngay: '12/11/2026',
    gioPv: '15:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 0,
    uvDatYeuCau: '—',
    uvNhanViec: '—',
    ketQua: 'FAIL',
    ngayBatDauDiLam: '—',
    ghiChu: '—',
  },
  {
    id: 'pv-11',
    stt: 11,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Lữ Ngọc Thắng',
    uvColor: 'red',
    chucVu: 'NV Marketing',
    phongBan: 'Phòng Công nghệ và Thiết kế',
    dienThoai: '0912576147',
    lichPv1Ngay: '12/11/2026',
    gioPv: '15:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: 'FAIL',
    uvNhanViec: '—',
    ketQua: 'FAIL',
    ngayBatDauDiLam: '—',
    ghiChu: '—',
  },
  {
    id: 'pv-12',
    stt: 12,
    phieuDg: 'Đã lập phiếu',
    hoTenUv: 'Nguyễn Chí Đạt',
    uvColor: 'green',
    chucVu: 'NV Ghép',
    phongBan: 'Phòng Ghép',
    dienThoai: '0332753955',
    lichPv1Ngay: '12/11/2026',
    gioPv: '10:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: 'PASS',
    uvNhanViec: 'PASS',
    ketQua: 'PASS',
    ngayBatDauDiLam: '13/11/2026',
    ghiChu: '—',
  },
  {
    id: 'pv-13',
    stt: 13,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Phạm Quỳnh Trang',
    uvColor: 'green',
    chucVu: 'NV Kinh doanh',
    phongBan: 'Khối Văn phòng',
    dienThoai: '0974129970',
    lichPv1Ngay: '11/11/2026',
    gioPv: '15:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: '—',
    uvNhanViec: '—',
    ketQua: '—',
    ngayBatDauDiLam: '—',
    ghiChu: '—',
  },
  {
    id: 'pv-14',
    stt: 14,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Phạm Thị Hoa',
    uvColor: 'red',
    chucVu: 'NV Kinh doanh',
    phongBan: 'Khối Văn phòng',
    dienThoai: '—',
    lichPv1Ngay: '11/11/2026',
    gioPv: '15:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 0,
    uvDatYeuCau: '—',
    uvNhanViec: '—',
    ketQua: 'FAIL',
    ngayBatDauDiLam: '—',
    ghiChu: 'Tiếng Nhật: C1 Tiếng Anh: Toeic 700',
  },
  {
    id: 'pv-15',
    stt: 15,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Phạm Phương Thảo',
    uvColor: 'red',
    chucVu: 'NV Ghép',
    phongBan: 'Phòng Ghép',
    dienThoai: '0338313007',
    lichPv1Ngay: '10/11/2026',
    gioPv: '14:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 0,
    uvDatYeuCau: '—',
    uvNhanViec: '—',
    ketQua: 'FAIL',
    ngayBatDauDiLam: '—',
    ghiChu: 'Chờ đợt tuyển',
  },
  {
    id: 'pv-16',
    stt: 16,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Khất Thị Hương',
    uvColor: 'red',
    chucVu: 'NV Cảnh quan',
    phongBan: 'Phòng Cảnh Quan',
    dienThoai: '—',
    lichPv1Ngay: '10/11/2026',
    gioPv: '14:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 0,
    uvDatYeuCau: '—',
    uvNhanViec: '—',
    ketQua: 'FAIL',
    ngayBatDauDiLam: '—',
    ghiChu: 'Khi nào tuyển QL Kho thì liên hệ lại',
  },
  {
    id: 'pv-17',
    stt: 17,
    phieuDg: 'Đã lập phiếu',
    hoTenUv: 'Vũ Khánh Hưng',
    uvColor: 'green',
    chucVu: 'NV Ghép',
    phongBan: 'Phòng Ghép',
    dienThoai: '0343696550',
    lichPv1Ngay: '10/11/2026',
    gioPv: '13:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: 'PASS',
    uvNhanViec: 'PASS',
    ketQua: 'PASS',
    ngayBatDauDiLam: '11/11/2026',
    ghiChu: '—',
  },
  {
    id: 'pv-18',
    stt: 18,
    phieuDg: 'Đã lập phiếu',
    hoTenUv: 'Đỗ Thanh Tâm',
    uvColor: 'green',
    chucVu: 'NV Ghép',
    phongBan: 'Phòng Ghép',
    dienThoai: '0344570228',
    lichPv1Ngay: '10/11/2026',
    gioPv: '13:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: 'PASS',
    uvNhanViec: 'PASS',
    ketQua: 'PASS',
    ngayBatDauDiLam: '11/11/2026',
    ghiChu: '—',
  },
  {
    id: 'pv-19',
    stt: 19,
    phieuDg: 'Đã lập phiếu',
    hoTenUv: 'Lưu Thị Thu Thảo',
    uvColor: 'green',
    chucVu: 'NV Ghép',
    phongBan: 'Phòng Ghép',
    dienThoai: '0987902476',
    lichPv1Ngay: '09/11/2026',
    gioPv: '17:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: 'PASS',
    uvNhanViec: 'PASS',
    ketQua: 'PASS',
    ngayBatDauDiLam: '12/11/2026',
    ghiChu: '—',
  },
  {
    id: 'pv-20',
    stt: 20,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Đào Thị Bảo Ngọc',
    uvColor: 'red',
    chucVu: 'NV Ghép',
    phongBan: 'Phòng Ghép',
    dienThoai: '0942046026',
    lichPv1Ngay: '09/11/2026',
    gioPv: '14:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 0,
    uvDatYeuCau: '—',
    uvNhanViec: '—',
    ketQua: 'FAIL',
    ngayBatDauDiLam: '—',
    ghiChu: '—',
  },
  {
    id: 'pv-21',
    stt: 21,
    phieuDg: 'Đã lập phiếu',
    hoTenUv: 'Trịnh Hải Nam',
    uvColor: 'green',
    chucVu: 'NV Ghép',
    phongBan: 'Phòng Ghép',
    dienThoai: '0865991031',
    lichPv1Ngay: '09/11/2026',
    gioPv: '14:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: 'PASS',
    uvNhanViec: 'PASS',
    ketQua: 'PASS',
    ngayBatDauDiLam: '16/11/2026',
    ghiChu: '—',
  },
  {
    id: 'pv-22',
    stt: 22,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Nguyễn Bích Diệp',
    uvColor: 'red',
    chucVu: 'NV Ghép',
    phongBan: 'Phòng Ghép',
    dienThoai: '0392491120',
    lichPv1Ngay: '09/11/2026',
    gioPv: '10:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: 'FAIL',
    uvNhanViec: '—',
    ketQua: 'FAIL',
    ngayBatDauDiLam: '—',
    ghiChu: '—',
  },
  {
    id: 'pv-23',
    stt: 23,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Đỗ Ngọc Anh',
    uvColor: 'red',
    chucVu: 'NV Kinh doanh',
    phongBan: 'Khối Văn phòng',
    dienThoai: '0389252837',
    lichPv1Ngay: '09/11/2026',
    gioPv: '10:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: 'FAIL',
    uvNhanViec: '—',
    ketQua: 'FAIL',
    ngayBatDauDiLam: '—',
    ghiChu: '—',
  },
  {
    id: 'pv-24',
    stt: 24,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Nguyễn Thị Mai Anh',
    uvColor: 'red',
    chucVu: 'NV Ghép',
    phongBan: 'Phòng Ghép',
    dienThoai: '0988266984',
    lichPv1Ngay: '09/11/2026',
    gioPv: '10:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: 'FAIL',
    uvNhanViec: '—',
    ketQua: 'FAIL',
    ngayBatDauDiLam: '—',
    ghiChu: 'Chờ có đợt tuyển',
  },
  {
    id: 'pv-25',
    stt: 25,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Phan Thị Hồng Vân',
    uvColor: 'red',
    chucVu: 'NV Ghép',
    phongBan: 'Phòng Ghép',
    dienThoai: '0376634148',
    lichPv1Ngay: '07/11/2026',
    gioPv: '13:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: 'FAIL',
    uvNhanViec: '—',
    ketQua: 'FAIL',
    ngayBatDauDiLam: '—',
    ghiChu: '—',
  },
  {
    id: 'pv-26',
    stt: 26,
    phieuDg: 'Lập phiếu',
    hoTenUv: 'Nguyễn Thị Huyền Trang',
    uvColor: 'red',
    chucVu: 'NV Ghép',
    phongBan: 'Phòng Ghép',
    dienThoai: '0896012434',
    lichPv1Ngay: '07/11/2026',
    gioPv: '13:00',
    uvDuocHenPv: 1,
    uvThamGiaPv: 1,
    uvDatYeuCau: 'FAIL',
    uvNhanViec: '—',
    ketQua: 'FAIL',
    ngayBatDauDiLam: '—',
    ghiChu: '—',
  },
];

export default function DsPhongVan() {
  const [data, setData] = useState<PhongVanItem[]>(INITIAL_PHONG_VAN_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedResult, setSelectedResult] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('all');

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // Modal phiếu đánh giá & hồ sơ ứng viên
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<PhongVanItem | null>(null);
  const [isHoSoModalOpen, setIsHoSoModalOpen] = useState(false);
  const [selectedHoSoCandidate, setSelectedHoSoCandidate] = useState<PhongVanItem | null>(null);

  // Kéo chuột trượt bảng ngang (Drag-to-scroll)
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, select')) return;

    const container = tableContainerRef.current;
    if (!container) return;

    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = tableContainerRef.current;
    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleOpenPhieu = (item: PhongVanItem) => {
    setSelectedCandidate(item);
    setIsModalOpen(true);
  };

  const handleOpenHoSo = (item: PhongVanItem) => {
    setSelectedHoSoCandidate(item);
    setIsHoSoModalOpen(true);
  };

  const handleSavePhieu = (updated: PhongVanItem) => {
    setData((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const toggleSortDate = () => {
    if (!sortOrder) setSortOrder('desc');
    else if (sortOrder === 'desc') setSortOrder('asc');
    else setSortOrder(null);
  };

  // Lọc dữ liệu
  const filteredData = data.filter((item) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      item.hoTenUv.toLowerCase().includes(q) ||
      item.chucVu.toLowerCase().includes(q) ||
      item.phongBan.toLowerCase().includes(q) ||
      item.dienThoai.includes(q) ||
      item.ghiChu.toLowerCase().includes(q);

    const matchDept = selectedDept === 'all' || item.phongBan === selectedDept;
    const matchResult = selectedResult === 'all' || item.ketQua === selectedResult;
    const matchYear = selectedYear === 'all' || item.lichPv1Ngay.endsWith(selectedYear);
    const matchMonth =
      selectedMonth === 'all' || item.lichPv1Ngay.includes(`/${selectedMonth}/`);

    return matchSearch && matchDept && matchResult && matchYear && matchMonth;
  });

  // Sắp xếp
  const displayData = [...filteredData].sort((a, b) => {
    if (!sortOrder) return a.stt - b.stt;
    // Format ngày: DD/MM/YYYY
    const parseDate = (dStr: string) => {
      const parts = dStr.split('/');
      if (parts.length === 3) {
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
      }
      return 0;
    };
    const tA = parseDate(a.lichPv1Ngay);
    const tB = parseDate(b.lichPv1Ngay);
    return sortOrder === 'asc' ? tA - tB : tB - tA;
  });

  // Tính toán phân trang
  const totalItems = displayData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedData = displayData.slice(startIndex, endIndex);

  // Mảng hiển thị số trang
  const getPaginationRange = () => {
    const range: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= safeCurrentPage - 1 && i <= safeCurrentPage + 1)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }
    return range;
  };

  return (
    <div className="flex flex-col h-full space-y-3 p-1">
      {/* ── Dropdowns: Năm & Tháng ── */}
      <div className="flex items-center gap-2.5 px-1 pt-0.5 flex-wrap">
        <select
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs cursor-pointer min-w-[110px]"
        >
          <option value="2026">Năm 2026</option>
          <option value="2025">Năm 2025</option>
          <option value="all">Tất cả các năm</option>
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs cursor-pointer min-w-[180px]"
        >
          <option value="all">Cả năm (tất cả tháng)</option>
          <option value="11">Tháng 11</option>
          <option value="10">Tháng 10</option>
          <option value="09">Tháng 09</option>
          <option value="08">Tháng 08</option>
          <option value="07">Tháng 07</option>
          <option value="06">Tháng 06</option>
          <option value="05">Tháng 05</option>
          <option value="04">Tháng 04</option>
          <option value="03">Tháng 03</option>
          <option value="02">Tháng 02</option>
          <option value="01">Tháng 01</option>
        </select>
      </div>

      {/* ── Stats Badges & Result Filter Row (khớp chính xác hình ảnh) ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-1 py-1 flex-wrap">
        {/* Left: Stats Badges */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap text-xs">
          <div className="px-3.5 py-1.5 bg-white border border-slate-200/90 rounded-full shadow-2xs">
            <span className="text-slate-500 font-medium">Tổng lịch PV: </span>
            <strong className="text-slate-800 font-bold font-mono">191</strong>
          </div>
          <div className="px-3.5 py-1.5 bg-white border border-slate-200/90 rounded-full shadow-2xs">
            <span className="text-slate-500 font-medium">Đã tham gia PV: </span>
            <strong className="text-slate-800 font-bold font-mono">63</strong>
          </div>
          <div className="px-3.5 py-1.5 bg-white border border-slate-200/90 rounded-full shadow-2xs">
            <span className="text-slate-500 font-medium">Đạt yêu cầu: </span>
            <strong className="text-slate-800 font-bold font-mono">34</strong>
          </div>
          <div className="px-3.5 py-1.5 bg-white border border-slate-200/90 rounded-full shadow-2xs">
            <span className="text-slate-500 font-medium">Nhận việc: </span>
            <strong className="text-slate-800 font-bold font-mono">24</strong>
          </div>
        </div>

        {/* Right: Result Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500 font-medium">Lọc Kết quả:</span>
          <button
            type="button"
            onClick={() => {
              setSelectedResult('all');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedResult === 'all'
                ? 'bg-[#244b62] text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedResult('PASS');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
              selectedResult === 'PASS'
                ? 'bg-[#15803d] text-white border-[#15803d] shadow-2xs'
                : 'border-emerald-500 text-emerald-700 bg-emerald-50/60 hover:bg-emerald-100/60'
            }`}
          >
            Pass (31)
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedResult('FAIL');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
              selectedResult === 'FAIL'
                ? 'bg-[#c82333] text-white border-[#c82333] shadow-2xs'
                : 'border-rose-300 text-rose-700 bg-rose-50/60 hover:bg-rose-100/60'
            }`}
          >
            Fail (160)
          </button>
        </div>
      </div>

      {/* Top Filter & Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2 flex-1 w-full sm:w-auto">
          {/* Ô tìm kiếm */}
          <div className="relative flex-1 sm:max-w-xs min-w-[200px]">
            <input
              type="text"
              placeholder="Tìm họ tên, SĐT, vị trí, ghi chú..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] bg-slate-50/50 focus:bg-white"
            />
            <IconSearch className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          {/* Lọc theo Phòng ban */}
          <select
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1.5 text-xs text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          >
            <option value="all">Phòng ban: Tất cả</option>
            <option value="Phòng Công nghệ và Thiết kế">Phòng Công nghệ và Thiết kế</option>
            <option value="Phòng Cảnh Quan">Phòng Cảnh Quan</option>
            <option value="Khối Văn phòng">Khối Văn phòng</option>
            <option value="Phòng Ghép">Phòng Ghép</option>
          </select>

          {/* Lọc theo Kết quả */}
          <select
            value={selectedResult}
            onChange={(e) => {
              setSelectedResult(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1.5 text-xs text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          >
            <option value="all">Kết quả: Tất cả</option>
            <option value="PASS">PASS (Đạt)</option>
            <option value="FAIL">FAIL (Không đạt)</option>
            <option value="—">— (Chưa có kết quả)</option>
          </select>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-slate-500 font-medium hidden md:inline">
            Tổng cộng: <strong className="text-slate-800">{displayData.length}</strong> ứng viên
          </span>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 font-medium shadow-2xs transition-colors cursor-pointer"
          >
            <IconDownload className="w-3.5 h-3.5 text-slate-500" />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-slate-200/90 rounded-xl shadow-xs flex flex-col flex-1 overflow-hidden">
        <div
          ref={tableContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`overflow-auto flex-1 select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
            {/* Header matches screenshot: Dark blue navy header with white uppercase labels */}
            <thead className="sticky top-0 bg-[#244b62] text-white font-bold text-[11px] tracking-wide uppercase border-b border-slate-600 z-10 select-none shadow-sm">
              <tr>
                <th className="py-2.5 px-3 border-r border-slate-600/50 w-12 text-center">STT</th>
                <th className="py-2.5 px-3 border-r border-slate-600/50">PHIẾU ĐG</th>
                <th className="py-2.5 px-3 border-r border-slate-600/50">HỌ TÊN UV</th>
                <th className="py-2.5 px-3 border-r border-slate-600/50">CHỨC VỤ</th>
                <th className="py-2.5 px-3 border-r border-slate-600/50">PHÒNG BAN</th>
                <th className="py-2.5 px-3 border-r border-slate-600/50">ĐIỆN THOẠI</th>
                <th
                  onClick={toggleSortDate}
                  className="py-2.5 px-3 border-r border-slate-600/50 cursor-pointer hover:bg-[#1e3e52] transition-colors"
                  title="Nhấp để sắp xếp theo ngày"
                >
                  <div className="flex items-center gap-1">
                    <span>LỊCH PV 1 (NGÀY)</span>
                    {sortOrder === 'asc' ? (
                      <IconArrowUp size={13} className="text-emerald-300" />
                    ) : sortOrder === 'desc' ? (
                      <IconArrowDown size={13} className="text-emerald-300" />
                    ) : (
                      <IconArrowsSort size={13} className="text-slate-300 opacity-60" />
                    )}
                  </div>
                </th>
                <th className="py-2.5 px-3 border-r border-slate-600/50">GIỜ PV</th>
                <th className="py-2.5 px-3 border-r border-slate-600/50 text-center">UV ĐƯỢC HẸN PV</th>
                <th className="py-2.5 px-3 border-r border-slate-600/50 text-center">UV THAM GIA PV</th>
                <th className="py-2.5 px-3 border-r border-slate-600/50 text-center">UV ĐẠT YÊU CẦU</th>
                <th className="py-2.5 px-3 border-r border-slate-600/50 text-center">UV NHẬN VIỆC</th>
                <th className="py-2.5 px-3 border-r border-slate-600/50 text-center">KẾT QUẢ</th>
                <th className="py-2.5 px-3 border-r border-slate-600/50">NGÀY BẮT ĐẦU ĐI LÀM</th>
                <th className="py-2.5 px-3">GHI CHÚ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white font-normal text-slate-700">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={15} className="py-8 text-center text-slate-400 font-medium text-xs">
                    Không tìm thấy ứng viên phỏng vấn nào phù hợp.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors h-10"
                  >
                    {/* 1. STT */}
                    <td className="py-1.5 px-3 text-center border-r border-slate-100 font-medium text-slate-500">
                      {item.stt}
                    </td>

                    {/* 2. PHIẾU ĐG */}
                    <td className="py-1.5 px-3 border-r border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleOpenPhieu(item)}
                        className="text-[#2b6cb0] hover:text-[#1a4971] underline cursor-pointer font-medium transition-colors"
                      >
                        {item.phieuDg}
                      </button>
                    </td>

                    {/* 3. HỌ TÊN UV - Colored Badge (Green or Red) */}
                    <td className="py-1.5 px-3 border-r border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleOpenHoSo(item)}
                        className={`inline-block px-2.5 py-1 rounded text-white font-bold text-[11px] sm:text-xs tracking-tight shadow-2xs hover:opacity-90 active:scale-95 cursor-pointer text-left transition-all ${
                          item.uvColor === 'green'
                            ? 'bg-[#15803d]'
                            : 'bg-[#c82333]'
                        }`}
                        title="Bấm để mở hồ sơ ứng viên"
                      >
                        {item.hoTenUv}
                      </button>
                    </td>

                    {/* 4. CHỨC VỤ */}
                    <td className="py-1.5 px-3 border-r border-slate-100 text-slate-700 font-medium">
                      {item.chucVu}
                    </td>

                    {/* 5. PHÒNG BAN */}
                    <td className="py-1.5 px-3 border-r border-slate-100 text-slate-700">
                      {item.phongBan}
                    </td>

                    {/* 6. ĐIỆN THOẠI */}
                    <td className="py-1.5 px-3 border-r border-slate-100 font-mono text-[11px] text-slate-700">
                      {item.dienThoai}
                    </td>

                    {/* 7. LỊCH PV 1 (NGÀY) */}
                    <td className="py-1.5 px-3 border-r border-slate-100 font-mono text-[11px] text-slate-700">
                      {item.lichPv1Ngay}
                    </td>

                    {/* 8. GIỜ PV */}
                    <td className="py-1.5 px-3 border-r border-slate-100 font-mono text-[11px] text-slate-700">
                      {item.gioPv}
                    </td>

                    {/* 9. UV ĐƯỢC HẸN PV */}
                    <td className="py-1.5 px-3 border-r border-slate-100 text-center font-mono text-[11px] text-slate-700">
                      {item.uvDuocHenPv}
                    </td>

                    {/* 10. UV THAM GIA PV */}
                    <td className="py-1.5 px-3 border-r border-slate-100 text-center font-mono text-[11px] text-slate-700">
                      {item.uvThamGiaPv === '—' ? (
                        <span className="text-slate-400">—</span>
                      ) : (
                        item.uvThamGiaPv
                      )}
                    </td>

                    {/* 11. UV ĐẠT YÊU CẦU */}
                    <td className="py-1.5 px-3 border-r border-slate-100 text-center">
                      {item.uvDatYeuCau === 'PASS' ? (
                        <span className="inline-block px-2 py-0.5 rounded bg-[#15803d] text-white font-bold text-[10px] sm:text-[11px] tracking-wide shadow-2xs">
                          PASS
                        </span>
                      ) : item.uvDatYeuCau === 'FAIL' ? (
                        <span className="inline-block px-2 py-0.5 rounded bg-[#c82333] text-white font-bold text-[10px] sm:text-[11px] tracking-wide shadow-2xs">
                          FAIL
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-xs">—</span>
                      )}
                    </td>

                    {/* 12. UV NHẬN VIỆC */}
                    <td className="py-1.5 px-3 border-r border-slate-100 text-center">
                      {item.uvNhanViec === 'PASS' ? (
                        <span className="inline-block px-2 py-0.5 rounded bg-[#15803d] text-white font-bold text-[10px] sm:text-[11px] tracking-wide shadow-2xs">
                          PASS
                        </span>
                      ) : item.uvNhanViec === 'FAIL' ? (
                        <span className="inline-block px-2 py-0.5 rounded bg-[#c82333] text-white font-bold text-[10px] sm:text-[11px] tracking-wide shadow-2xs">
                          FAIL
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-xs">—</span>
                      )}
                    </td>

                    {/* 13. KẾT QUẢ */}
                    <td className="py-1.5 px-3 border-r border-slate-100 text-center">
                      {item.ketQua === 'PASS' ? (
                        <span className="inline-block px-2 py-0.5 rounded bg-[#15803d] text-white font-bold text-[10px] sm:text-[11px] tracking-wide shadow-2xs">
                          PASS
                        </span>
                      ) : item.ketQua === 'FAIL' ? (
                        <span className="inline-block px-2 py-0.5 rounded bg-[#c82333] text-white font-bold text-[10px] sm:text-[11px] tracking-wide shadow-2xs">
                          FAIL
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-xs">—</span>
                      )}
                    </td>

                    {/* 14. NGÀY BẮT ĐẦU ĐI LÀM */}
                    <td className="py-1.5 px-3 border-r border-slate-100 font-mono text-[11px] text-slate-700">
                      {item.ngayBatDauDiLam === '—' ? (
                        <span className="text-slate-400">—</span>
                      ) : (
                        item.ngayBatDauDiLam
                      )}
                    </td>

                    {/* 15. GHI CHÚ */}
                    <td className="py-1.5 px-3 text-slate-600 text-[11px] max-w-xs truncate" title={item.ghiChu !== '—' ? item.ghiChu : ''}>
                      {item.ghiChu === '—' ? (
                        <span className="text-slate-400">—</span>
                      ) : (
                        item.ghiChu
                      )}
                    </td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200/90 shadow-2xs text-xs text-slate-600">
        <div className="flex items-center gap-2 flex-wrap">
          <span>Hiển thị</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={26}>26 (Tất cả)</option>
          </select>
          <span>bản ghi / trang</span>
          <span className="text-slate-300 mx-1 hidden sm:inline">|</span>
          <span className="text-slate-500">
            {totalItems === 0 ? '0' : `${startIndex + 1} - ${endIndex}`} trong tổng số <strong className="text-slate-800">{totalItems}</strong> ứng viên
          </span>
        </div>

        <div className="flex items-center gap-1 select-none">
          {/* Nút về trang đầu */}
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            disabled={safeCurrentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Trang đầu"
          >
            <IconChevronsLeft size={14} />
          </button>

          {/* Nút lùi 1 trang */}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safeCurrentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Trang trước"
          >
            <IconChevronLeft size={14} />
          </button>

          {/* Danh sách các trang */}
          {getPaginationRange().map((page, idx) => {
            if (page === '...') {
              return (
                <span key={`dots-${idx}`} className="px-2 text-slate-400 select-none">
                  ...
                </span>
              );
            }
            const isCurrent = page === safeCurrentPage;
            return (
              <button
                key={`page-${page}`}
                type="button"
                onClick={() => setCurrentPage(Number(page))}
                className={`min-w-[28px] h-7 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#406c89] text-white shadow-2xs'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Nút tiến 1 trang */}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safeCurrentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Trang sau"
          >
            <IconChevronRight size={14} />
          </button>

          {/* Nút đến trang cuối */}
          <button
            type="button"
            onClick={() => setCurrentPage(totalPages)}
            disabled={safeCurrentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Trang cuối"
          >
            <IconChevronsRight size={14} />
          </button>
        </div>
      </div>

      {/* Modal Phiếu Đánh Giá */}
      <PhieuDanhGiaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        candidate={selectedCandidate}
        onSave={handleSavePhieu}
      />

      {/* Modal Hồ Sơ Ứng Viên */}
      <HoSoUngVienModal
        isOpen={isHoSoModalOpen}
        onClose={() => setIsHoSoModalOpen(false)}
        candidate={selectedHoSoCandidate}
      />
    </div>
  );
}
