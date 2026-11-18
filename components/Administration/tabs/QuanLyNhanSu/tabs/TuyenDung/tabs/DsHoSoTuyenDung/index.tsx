"use client";

import React, { useState, useRef } from 'react';
import {
  IconPlus,
  IconSearch,
  IconDownload,
  IconUpload,
  IconFileSpreadsheet,
  IconFilter,
  IconPencil,
  IconTrash,
  IconHierarchy,
} from '@tabler/icons-react';
import ThemUngVienModal from './modal/ThemUngVienModal';
import SuaUngVienModal from './modal/SuaUngVienModal';
import XoaUngVienModal from './modal/XoaUngVienModal';
import SoDoModal from './modal/SoDoModal';

export interface HoSoTuyenDungItem {
  id: string;
  stt: number;
  nam: number | string;
  thang: string;
  hoTen: string;
  ngaySinh: string;
  gioiTinh: string;
  tinhTrangHonNhan: string;
  chieuCao: string;
  canNang: string;
  diaChiHoKhau: string;
  diaChiDangO: string;
  dienThoai: string;
  email: string;
  sdtNguoiThan: string;
  nguoiThan: string; // (Họ tên, quan hệ)
  caTinhVaDiemManh: string;
  soThich: string;
  truongHoc: string;
  chuyenNganh: string;
  ketQuaTotNghiep: string;
  trinhDoHocVan: string;
  thoiGianDaLam: string;
  congTyDonViDaLam?: string;
  gioPv?: string;

  // Nhóm 2: Thông tin tuyển dụng & quy trình đánh giá (24 trường tiếp theo)
  viTriDaDamNhiem: string;
  chucVu: string;
  phongBan: string;
  ngayGuiCv: string;
  nguonTuyenDung: string;
  linkFb: string;
  locCv: string;
  slHsNop: number | string;
  hsUvDat: string;
  uvDuocYeuCauLamBai: string;
  ngayGuiDeKiemTra: string;
  ngayNopBaiLam: string;
  ketQuaPhanHoiBaiTest: string;
  uvBaiLamDat: string;
  lichPv1: string;
  canBoPv: string;
  uvDuocHenPv: string;
  uvThamGiaPv: string;
  tongKetKetQuaKtVaLyDo: string;
  uvDatYeuCau: string;
  uvNhanViec: string;
  ngayBatDauDiLamThuViec: string;
  ketQua: string;
  ghiChu: string;
}

const mockCandidates: HoSoTuyenDungItem[] = [
  {
    id: '1',
    stt: 1,
    nam: 2026,
    thang: 'Tháng 02',
    hoTen: 'Trần Văn Hoàng',
    ngaySinh: '15/08/1998',
    gioiTinh: 'Nam',
    tinhTrangHonNhan: 'Độc thân',
    chieuCao: '1m72',
    canNang: '65kg',
    diaChiHoKhau: 'Hà Nội',
    diaChiDangO: 'Cầu Giấy, Hà Nội',
    dienThoai: '0912 345 678',
    email: 'hoang.tran@gmail.com',
    sdtNguoiThan: '0988 123 456',
    nguoiThan: 'Trần Văn Nam (Bố)',
    caTinhVaDiemManh: 'Cẩn thận, chịu áp lực tốt',
    soThich: 'Đọc sách, đá bóng',
    truongHoc: 'ĐH Kiến Trúc Hà Nội',
    chuyenNganh: 'Kiến trúc công trình',
    ketQuaTotNghiep: 'Khá',
    trinhDoHocVan: 'Đại học',
    thoiGianDaLam: '3 năm',
    // 24 trường tiếp theo
    viTriDaDamNhiem: 'Kiến trúc sư triển khai',
    chucVu: 'Nhân viên',
    phongBan: 'Phòng Khai triển bản vẽ',
    ngayGuiCv: '10/02/2026',
    nguonTuyenDung: 'Top CV',
    linkFb: 'fb.com/hoang.tran98',
    locCv: 'Đạt',
    slHsNop: 1,
    hsUvDat: 'Đạt',
    uvDuocYeuCauLamBai: 'Có',
    ngayGuiDeKiemTra: '12/02/2026',
    ngayNopBaiLam: '14/02/2026',
    ketQuaPhanHoiBaiTest: '8.5/10 - Đạt tiêu chuẩn kỹ thuật',
    uvBaiLamDat: 'Đạt',
    lichPv1: '09:00 18/02/2026',
    canBoPv: 'Trần Hữu Nam',
    uvDuocHenPv: 'Đã hẹn',
    uvThamGiaPv: 'Có tham gia',
    tongKetKetQuaKtVaLyDo: 'Chuyên môn vững, tác phong tốt',
    uvDatYeuCau: 'Đạt',
    uvNhanViec: 'Đồng ý',
    ngayBatDauDiLamThuViec: '01/03/2026',
    ketQua: 'Trúng tuyển',
    ghiChu: 'Hoàn thiện hồ sơ gốc',
  },
  {
    id: '2',
    stt: 2,
    nam: 2026,
    thang: 'Tháng 02',
    hoTen: 'Lê Thị Thu Thảo',
    ngaySinh: '22/04/2000',
    gioiTinh: 'Nữ',
    tinhTrangHonNhan: 'Độc thân',
    chieuCao: '1m60',
    canNang: '48kg',
    diaChiHoKhau: 'Nam Định',
    diaChiDangO: 'Nam Từ Liêm, Hà Nội',
    dienThoai: '0988 777 666',
    email: 'thao.le@gmail.com',
    sdtNguoiThan: '0913 222 333',
    nguoiThan: 'Nguyễn Thị Mai (Mẹ)',
    caTinhVaDiemManh: 'Năng động, giao tiếp tốt',
    soThich: 'Du lịch, hội họa',
    truongHoc: 'ĐH Mỹ Thuật Công Nghiệp',
    chuyenNganh: 'Thiết kế cảnh quan',
    ketQuaTotNghiep: 'Giỏi',
    trinhDoHocVan: 'Đại học',
    thoiGianDaLam: '2 năm',
    // 24 trường tiếp theo
    viTriDaDamNhiem: 'Thiết kế 3D cảnh quan',
    chucVu: 'Nhân viên',
    phongBan: 'Phòng Cảnh quan',
    ngayGuiCv: '15/02/2026',
    nguonTuyenDung: 'Facebook',
    linkFb: 'fb.com/thao.thu.le',
    locCv: 'Đạt',
    slHsNop: 1,
    hsUvDat: 'Đạt',
    uvDuocYeuCauLamBai: 'Có',
    ngayGuiDeKiemTra: '17/02/2026',
    ngayNopBaiLam: '19/02/2026',
    ketQuaPhanHoiBaiTest: '9.0/10 - Ý tưởng sáng tạo',
    uvBaiLamDat: 'Đạt',
    lichPv1: '14:30 22/02/2026',
    canBoPv: 'Phạm Thị Lan',
    uvDuocHenPv: 'Đã hẹn',
    uvThamGiaPv: 'Có tham gia',
    tongKetKetQuaKtVaLyDo: 'Thẩm mỹ tốt, phù hợp văn hóa',
    uvDatYeuCau: 'Đạt',
    uvNhanViec: 'Đồng ý',
    ngayBatDauDiLamThuViec: '05/03/2026',
    ketQua: 'Trúng tuyển',
    ghiChu: 'Thử việc 2 tháng',
  },
  {
    id: '3',
    stt: 3,
    nam: 2026,
    thang: 'Tháng 02',
    hoTen: 'Nguyễn Đình Phúc',
    ngaySinh: '10/11/1995',
    gioiTinh: 'Nam',
    tinhTrangHonNhan: 'Đã kết hôn',
    chieuCao: '1m68',
    canNang: '62kg',
    diaChiHoKhau: 'Bắc Ninh',
    diaChiDangO: 'Đông Anh, Hà Nội',
    dienThoai: '0903 111 222',
    email: 'phuc.dinh@gmail.com',
    sdtNguoiThan: '0977 444 555',
    nguoiThan: 'Lê Thị Lan (Vợ)',
    caTinhVaDiemManh: 'Chăm chỉ, kỹ thuật cao',
    soThich: 'Mộc mỹ nghệ',
    truongHoc: 'CĐ Nghề Công nghệ Cao',
    chuyenNganh: 'Gia công & Sơn hoàn thiện',
    ketQuaTotNghiep: 'Khá',
    trinhDoHocVan: 'Cao đẳng',
    thoiGianDaLam: '5 năm',
    // 24 trường tiếp theo
    viTriDaDamNhiem: 'Thợ trưởng xưởng mộc',
    chucVu: 'Kỹ thuật viên',
    phongBan: 'Phòng Mộc-Sơn',
    ngayGuiCv: '08/02/2026',
    nguonTuyenDung: 'Chợ tốt',
    linkFb: 'fb.com/phuc.dinh.wood',
    locCv: 'Đạt',
    slHsNop: 1,
    hsUvDat: 'Đạt',
    uvDuocYeuCauLamBai: 'Không',
    ngayGuiDeKiemTra: '-',
    ngayNopBaiLam: '-',
    ketQuaPhanHoiBaiTest: 'Miễn test - Đã kiểm tra tay nghề tại xưởng',
    uvBaiLamDat: 'Đạt',
    lichPv1: '10:00 15/02/2026',
    canBoPv: 'Vũ Văn Tuấn',
    uvDuocHenPv: 'Đã hẹn',
    uvThamGiaPv: 'Có tham gia',
    tongKetKetQuaKtVaLyDo: 'Tay nghề cứng, có kinh nghiệm xưởng lớn',
    uvDatYeuCau: 'Đạt',
    uvNhanViec: 'Đồng ý',
    ngayBatDauDiLamThuViec: '20/02/2026',
    ketQua: 'Trúng tuyển',
    ghiChu: 'Cấp đồ bảo hộ lao động',
  },
  {
    id: '4',
    stt: 4,
    nam: 2026,
    thang: 'Tháng 03',
    hoTen: 'Hoàng Trọng Nghĩa',
    ngaySinh: '05/02/1997',
    gioiTinh: 'Nam',
    tinhTrangHonNhan: 'Độc thân',
    chieuCao: '1m70',
    canNang: '64kg',
    diaChiHoKhau: 'Thanh Hóa',
    diaChiDangO: 'Hoàng Mai, Hà Nội',
    dienThoai: '0977 888 999',
    email: 'nghia.hoang@gmail.com',
    sdtNguoiThan: '0966 555 444',
    nguoiThan: 'Hoàng Trọng Hiếu (Anh trai)',
    caTinhVaDiemManh: 'Trách nhiệm, tỉ mỉ',
    soThich: 'Điện tử, công nghệ',
    truongHoc: 'ĐH Bách Khoa Hà Nội',
    chuyenNganh: 'Kỹ thuật Điện - Tự động hóa',
    ketQuaTotNghiep: 'Giỏi',
    trinhDoHocVan: 'Đại học',
    thoiGianDaLam: '4 năm',
    // 24 trường tiếp theo
    viTriDaDamNhiem: 'Kỹ sư cơ điện',
    chucVu: 'Nhân viên kỹ thuật',
    phongBan: 'Phòng Hệ thống Điện',
    ngayGuiCv: '18/02/2026',
    nguonTuyenDung: 'Top CV',
    linkFb: 'fb.com/nghia.hoang.bk',
    locCv: 'Đạt',
    slHsNop: 1,
    hsUvDat: 'Đạt',
    uvDuocYeuCauLamBai: 'Có',
    ngayGuiDeKiemTra: '20/02/2026',
    ngayNopBaiLam: '22/02/2026',
    ketQuaPhanHoiBaiTest: '9.2/10 - Am hiểu sơ đồ điện phức tạp',
    uvBaiLamDat: 'Đạt',
    lichPv1: '15:00 25/02/2026',
    canBoPv: 'Đặng Quốc Huy',
    uvDuocHenPv: 'Đã hẹn',
    uvThamGiaPv: 'Có tham gia',
    tongKetKetQuaKtVaLyDo: 'Tư duy logic cao, sẵn sàng đi dự án xa',
    uvDatYeuCau: 'Đạt',
    uvNhanViec: 'Đang cân nhắc',
    ngayBatDauDiLamThuViec: '10/03/2026',
    ketQua: 'Chờ phản hồi',
    ghiChu: 'Theo dõi deal lương',
  },
];

export default function DsHoSoTuyenDung() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [candidates, setCandidates] = useState<HoSoTuyenDungItem[]>(mockCandidates);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSoDoModalOpen, setIsSoDoModalOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<HoSoTuyenDungItem | null>(null);
  const [deletingCandidate, setDeletingCandidate] = useState<HoSoTuyenDungItem | null>(null);

  const handleSaveCandidate = (newCandidate: HoSoTuyenDungItem) => {
    setCandidates((prev) => [newCandidate, ...prev]);
  };

  const handleUpdateCandidate = (updated: HoSoTuyenDungItem) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const handleDeleteCandidate = (candidateId: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== candidateId));
  };

  // Kéo giữ chuột để trượt ngang (Drag-to-scroll)
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

  const filtered = candidates.filter((item) => {
    const matchesSearch =
      item.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dienThoai.includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.chuyenNganh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phongBan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.viTriDaDamNhiem.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = selectedYear === 'all' || item.nam.toString() === selectedYear;
    const matchesMonth = selectedMonth === 'all' || item.thang === selectedMonth;

    return matchesSearch && matchesYear && matchesMonth;
  });

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 flex-1 w-full sm:w-auto">
          {/* Tìm kiếm */}
          <div className="relative flex-1 sm:max-w-xs min-w-[200px]">
            <input
              type="text"
              placeholder="Tìm kiếm ứng viên, SĐT, chuyên ngành..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89]"
            />
            <IconSearch className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
          </div>

          {/* Lọc Năm */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-2.5 py-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-300 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          >
            <option value="all">Năm: Tất cả</option>
            <option value="2026">Năm 2026</option>
            <option value="2025">Năm 2025</option>
          </select>

          {/* Lọc Tháng */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-2.5 py-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-300 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          >
            <option value="all">Tháng: Tất cả</option>
            <option value="Tháng 01">Tháng 01</option>
            <option value="Tháng 02">Tháng 02</option>
            <option value="Tháng 03">Tháng 03</option>
            <option value="Tháng 04">Tháng 04</option>
            <option value="Tháng 05">Tháng 05</option>
            <option value="Tháng 06">Tháng 06</option>
            <option value="Tháng 07">Tháng 07</option>
            <option value="Tháng 08">Tháng 08</option>
            <option value="Tháng 09">Tháng 09</option>
            <option value="Tháng 10">Tháng 10</option>
            <option value="Tháng 11">Tháng 11</option>
            <option value="Tháng 12">Tháng 12</option>
          </select>

          <button className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-300 rounded-md hover:bg-slate-100 font-medium">
            <IconFilter className="w-3.5 h-3.5" />
            <span>Lọc nâng cao</span>
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
          {/* Nút Sơ đồ */}
          <button
            type="button"
            onClick={() => setIsSoDoModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 font-medium shadow-xs transition-colors cursor-pointer"
          >
            <IconHierarchy className="w-4 h-4 text-[#406c89]" />
            <span>Sơ đồ</span>
          </button>

          {/* Nút Export */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 font-medium shadow-xs transition-colors">
            <IconDownload className="w-4 h-4 text-slate-600" />
            <span>Export</span>
          </button>

          {/* Nút Mẫu */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 font-medium shadow-xs transition-colors">
            <IconFileSpreadsheet className="w-4 h-4 text-slate-600" />
            <span>Mẫu</span>
          </button>

          {/* Nút Import */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 font-medium shadow-xs transition-colors">
            <IconUpload className="w-4 h-4 text-slate-600" />
            <span>Import</span>
          </button>

          {/* Nút Thêm hồ sơ ứng viên */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-[#406c89] rounded-lg hover:bg-[#345870] font-medium shadow-xs transition-colors cursor-pointer"
          >
            <IconPlus className="w-3.5 h-3.5" />
            <span>Thêm hồ sơ ứng viên</span>
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden">
        <div
          ref={tableContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`overflow-auto flex-1 ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead className="sticky top-0 bg-[#244b62] text-white font-bold text-[11px] tracking-wider uppercase border-b border-slate-600 z-10">
              <tr>
                {/* 1. STT */}
                <th className="py-2.5 px-3 text-center border-r border-slate-600/60 w-12">
                  STT ↕
                </th>

                {/* 2. NĂM */}
                <th className="py-2.5 px-3 text-center border-r border-slate-600/60 min-w-[75px]">
                  NĂM ↕
                </th>

                {/* 3. THÁNG */}
                <th className="py-2.5 px-3 text-center border-r border-slate-600/60 min-w-[85px]">
                  THÁNG ↕
                </th>

                {/* 4. HỌ VÀ TÊN */}
                <th className="py-2.5 px-3.5 border-r border-slate-600/60 min-w-[150px]">
                  HỌ VÀ TÊN ↕
                </th>

                {/* 5. NGÀY SINH */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[100px]">
                  NGÀY SINH ↕
                </th>

                {/* 6. GIỚI TÍNH */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[90px]">
                  GIỚI TÍNH ↕
                </th>

                {/* 7. TÌNH TRẠNG HÔN NHÂN */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[120px] leading-tight">
                  <div>TÌNH TRẠNG</div>
                  <div className="text-[10px] opacity-90">HÔN NHÂN ↕</div>
                </th>

                {/* 8. CHIỀU CAO */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[95px]">
                  CHIỀU CAO ↕
                </th>

                {/* 9. CÂN NẶNG */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[95px]">
                  CÂN NẶNG ↕
                </th>

                {/* 10. ĐỊA CHỈ HỘ KHẨU */}
                <th className="py-2.5 px-3.5 border-r border-slate-600/60 min-w-[140px]">
                  ĐỊA CHỈ HỘ KHẨU ↕
                </th>

                {/* 11. ĐỊA CHỈ ĐANG Ở */}
                <th className="py-2.5 px-3.5 border-r border-slate-600/60 min-w-[150px]">
                  ĐỊA CHỈ ĐANG Ở ↕
                </th>

                {/* 12. ĐIỆN THOẠI */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 min-w-[110px]">
                  ĐIỆN THOẠI ↕
                </th>

                {/* 13. EMAIL */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 min-w-[140px]">
                  EMAIL ↕
                </th>

                {/* 14. SĐT NGƯỜI THÂN */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 min-w-[120px] leading-tight">
                  <div>SĐT NGƯỜI</div>
                  <div className="text-[10px] opacity-90">THÂN ↕</div>
                </th>

                {/* 15. NGƯỜI THÂN (HỌ TÊN, QUAN HỆ) */}
                <th className="py-2.5 px-3.5 border-r border-slate-600/60 min-w-[150px] leading-tight">
                  <div>NGƯỜI THÂN</div>
                  <div className="text-[9.5px] opacity-90 lowercase font-normal">(họ tên, quan hệ)</div>
                </th>

                {/* 16. CÁ TÍNH VÀ ĐIỂM MẠNH */}
                <th className="py-2.5 px-3.5 border-r border-slate-600/60 min-w-[160px]">
                  CÁ TÍNH VÀ ĐIỂM MẠNH ↕
                </th>

                {/* 17. SỞ THÍCH */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 min-w-[120px]">
                  SỞ THÍCH ↕
                </th>

                {/* 18. TRƯỜNG HỌC */}
                <th className="py-2.5 px-3.5 border-r border-slate-600/60 min-w-[160px]">
                  TRƯỜNG HỌC ↕
                </th>

                {/* 19. CHUYÊN NGÀNH */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 min-w-[140px] leading-tight">
                  <div>CHUYÊN</div>
                  <div className="text-[10px] opacity-90">NGÀNH ↕</div>
                </th>

                {/* 20. KẾT QUẢ TỐT NGHIỆP */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[110px] leading-tight">
                  <div>KẾT QUẢ TỐT</div>
                  <div className="text-[10px] opacity-90">NGHIỆP ↕</div>
                </th>

                {/* 21. TRÌNH ĐỘ HỌC VẤN */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[110px] leading-tight">
                  <div>TRÌNH ĐỘ HỌC</div>
                  <div className="text-[10px] opacity-90">VẤN ↕</div>
                </th>

                {/* 22. THỜI GIAN ĐÃ LÀM */}
                <th className="py-2.5 px-3 text-center border-r border-slate-600/60 min-w-[120px]">
                  THỜI GIAN ĐÃ LÀM ↕
                </th>

                {/* 23. VỊ TRÍ ĐÃ ĐẢM NHIỆM */}
                <th className="py-2.5 px-3.5 border-r border-slate-600/60 min-w-[160px]">
                  VỊ TRÍ ĐÃ ĐẢM NHIỆM ↕
                </th>

                {/* 24. CHỨC VỤ */}
                <th className="py-2.5 px-3.5 border-r border-slate-600/60 min-w-[120px]">
                  CHỨC VỤ ↕
                </th>

                {/* 25. PHÒNG BAN */}
                <th className="py-2.5 px-3.5 border-r border-slate-600/60 min-w-[140px]">
                  PHÒNG BAN ↕
                </th>

                {/* 26. NGÀY GỬI CV */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[110px] leading-tight">
                  <div>NGÀY GỬI</div>
                  <div className="text-[10px] opacity-90">CV ↕</div>
                </th>

                {/* 27. NGUỒN TUYỂN DỤNG */}
                <th className="py-2.5 px-3.5 border-r border-slate-600/60 min-w-[140px] leading-tight">
                  <div>NGUỒN TUYỂN</div>
                  <div className="text-[10px] opacity-90">DỤNG ↕</div>
                </th>

                {/* 28. LINK FB */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 min-w-[110px]">
                  LINK FB ↕
                </th>

                {/* 29. LỌC CV */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[90px] leading-tight">
                  <div>LỌC</div>
                  <div className="text-[10px] opacity-90">CV ↕</div>
                </th>

                {/* 30. SL HS NỘP */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[95px] leading-tight">
                  <div>SL HS</div>
                  <div className="text-[10px] opacity-90">NỘP ↕</div>
                </th>

                {/* 31. HS UV ĐẠT */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[95px] leading-tight">
                  <div>HS UV</div>
                  <div className="text-[10px] opacity-90">ĐẠT ↕</div>
                </th>

                {/* 32. UV ĐƯỢC YÊU CẦU LÀM BÀI */}
                <th className="py-2.5 px-3.5 border-r border-slate-600/60 text-center min-w-[150px] leading-tight">
                  <div>UV ĐƯỢC YÊU</div>
                  <div className="text-[10px] opacity-90">CẦU LÀM BÀI ↕</div>
                </th>

                {/* 33. NGÀY GỬI ĐỀ KIỂM TRA */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[130px] leading-tight">
                  <div>NGÀY GỬI ĐỀ</div>
                  <div className="text-[10px] opacity-90">KIỂM TRA ↕</div>
                </th>

                {/* 34. NGÀY NỘP BÀI LÀM */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[120px] leading-tight">
                  <div>NGÀY NỘP</div>
                  <div className="text-[10px] opacity-90">BÀI LÀM ↕</div>
                </th>

                {/* 35. KẾT QUẢ/PHẢN HỒI BÀI TEST */}
                <th className="py-2.5 px-3.5 border-r border-slate-600/60 min-w-[170px] leading-tight">
                  <div>KẾT QUẢ/PHẢN HỒI</div>
                  <div className="text-[10px] opacity-90">BÀI TEST ↕</div>
                </th>

                {/* 36. UV BÀI LÀM ĐẠT */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[110px] leading-tight">
                  <div>UV BÀI</div>
                  <div className="text-[10px] opacity-90">LÀM ĐẠT ↕</div>
                </th>

                {/* 37. LỊCH PV 1 (NGÀY-GIỜ) */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[140px] leading-tight">
                  <div>LỊCH PV 1</div>
                  <div className="text-[10px] opacity-90">(NGÀY-GIỜ) ↕</div>
                </th>

                {/* 38. CÁN BỘ PV */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[110px] leading-tight">
                  <div>CÁN BỘ</div>
                  <div className="text-[10px] opacity-90">PV ↕</div>
                </th>

                {/* 39. UV ĐƯỢC HẸN PV */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[110px] leading-tight">
                  <div>UV ĐƯỢC</div>
                  <div className="text-[10px] opacity-90">HẸN PV ↕</div>
                </th>

                {/* 40. UV THAM GIA PV */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[110px] leading-tight">
                  <div>UV THAM</div>
                  <div className="text-[10px] opacity-90">GIA PV ↕</div>
                </th>

                {/* 41. TỔNG KẾT KẾT QUẢ KT VÀ LÝ DO */}
                <th className="py-2.5 px-3.5 border-r border-slate-600/60 min-w-[180px] leading-tight">
                  <div>TỔNG KẾT KẾT QUẢ</div>
                  <div className="text-[10px] opacity-90">KT VÀ LÝ DO ↕</div>
                </th>

                {/* 42. UV ĐẠT YÊU CẦU */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[110px] leading-tight">
                  <div>UV ĐẠT</div>
                  <div className="text-[10px] opacity-90">YÊU CẦU ↕</div>
                </th>

                {/* 43. UV NHẬN VIỆC */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[110px] leading-tight">
                  <div>UV NHẬN</div>
                  <div className="text-[10px] opacity-90">VIỆC ↕</div>
                </th>

                {/* 44. NGÀY BẮT ĐẦU ĐI LÀM/THỬ VIỆC */}
                <th className="py-2.5 px-3.5 border-r border-slate-600/60 text-center min-w-[160px] leading-tight">
                  <div>NGÀY BẮT ĐẦU</div>
                  <div className="text-[10px] opacity-90">ĐI LÀM/THỬ VIỆC ↕</div>
                </th>

                {/* 45. KẾT QUẢ */}
                <th className="py-2.5 px-3 border-r border-slate-600/60 text-center min-w-[110px] leading-tight">
                  <div>KẾT QUẢ ↕</div>
                </th>

                {/* 46. GHI CHÚ */}
                <th className="py-2.5 px-3.5 border-r border-slate-600/60 min-w-[150px]">
                  GHI CHÚ ↕
                </th>

                {/* 47. THAO TÁC */}
                <th className="py-2.5 px-3 text-center min-w-[110px] sticky right-0 bg-[#244b62] shadow-[-2px_0_5px_rgba(0,0,0,0.2)] z-20">
                  THAO TÁC
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filtered.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                  {/* 1. STT */}
                  <td className="py-2.5 px-3 text-center text-slate-400 font-medium border-r border-slate-100">
                    {index + 1}
                  </td>

                  {/* 2. NĂM */}
                  <td className="py-2.5 px-3 text-center font-semibold text-slate-700 border-r border-slate-100">
                    {item.nam}
                  </td>

                  {/* 3. THÁNG */}
                  <td className="py-2.5 px-3 text-center text-slate-600 border-r border-slate-100">
                    {item.thang}
                  </td>

                  {/* 4. HỌ VÀ TÊN */}
                  <td className="py-2.5 px-3.5 font-bold text-slate-800 border-r border-slate-100">
                    <span className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer">
                      {item.hoTen}
                    </span>
                  </td>

                  {/* 5. NGÀY SINH */}
                  <td className="py-2.5 px-3 text-center text-slate-600 border-r border-slate-100">
                    {item.ngaySinh}
                  </td>

                  {/* 6. GIỚI TÍNH */}
                  <td className="py-2.5 px-3 text-center text-slate-700 font-medium border-r border-slate-100">
                    {item.gioiTinh}
                  </td>

                  {/* 7. TÌNH TRẠNG HÔN NHÂN */}
                  <td className="py-2.5 px-3 text-center text-slate-600 border-r border-slate-100">
                    {item.tinhTrangHonNhan}
                  </td>

                  {/* 8. CHIỀU CAO */}
                  <td className="py-2.5 px-3 text-center text-slate-600 border-r border-slate-100">
                    {item.chieuCao}
                  </td>

                  {/* 9. CÂN NẶNG */}
                  <td className="py-2.5 px-3 text-center text-slate-600 border-r border-slate-100">
                    {item.canNang}
                  </td>

                  {/* 10. ĐỊA CHỈ HỘ KHẨU */}
                  <td className="py-2.5 px-3.5 text-slate-600 border-r border-slate-100">
                    {item.diaChiHoKhau}
                  </td>

                  {/* 11. ĐỊA CHỈ ĐANG Ở */}
                  <td className="py-2.5 px-3.5 text-slate-600 border-r border-slate-100">
                    {item.diaChiDangO}
                  </td>

                  {/* 12. ĐIỆN THOẠI */}
                  <td className="py-2.5 px-3 font-medium text-slate-700 border-r border-slate-100">
                    {item.dienThoai}
                  </td>

                  {/* 13. EMAIL */}
                  <td className="py-2.5 px-3 text-slate-600 border-r border-slate-100">
                    {item.email}
                  </td>

                  {/* 14. SĐT NGƯỜI THÂN */}
                  <td className="py-2.5 px-3 text-slate-600 border-r border-slate-100">
                    {item.sdtNguoiThan}
                  </td>

                  {/* 15. NGƯỜI THÂN (HỌ TÊN, QUAN HỆ) */}
                  <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-100">
                    {item.nguoiThan}
                  </td>

                  {/* 16. CÁ TÍNH VÀ ĐIỂM MẠNH */}
                  <td className="py-2.5 px-3.5 text-slate-600 border-r border-slate-100">
                    {item.caTinhVaDiemManh}
                  </td>

                  {/* 17. SỞ THÍCH */}
                  <td className="py-2.5 px-3 text-slate-600 border-r border-slate-100">
                    {item.soThich}
                  </td>

                  {/* 18. TRƯỜNG HỌC */}
                  <td className="py-2.5 px-3.5 text-slate-700 font-medium border-r border-slate-100">
                    {item.truongHoc}
                  </td>

                  {/* 19. CHUYÊN NGÀNH */}
                  <td className="py-2.5 px-3 text-slate-600 border-r border-slate-100">
                    {item.chuyenNganh}
                  </td>

                  {/* 20. KẾT QUẢ TỐT NGHIỆP */}
                  <td className="py-2.5 px-3 text-center border-r border-slate-100">
                    <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {item.ketQuaTotNghiep}
                    </span>
                  </td>

                  {/* 21. TRÌNH ĐỘ HỌC VẤN */}
                  <td className="py-2.5 px-3 text-center text-slate-700 font-medium border-r border-slate-100">
                    {item.trinhDoHocVan}
                  </td>

                  {/* 22. THỜI GIAN ĐÃ LÀM */}
                  <td className="py-2.5 px-3 text-center font-bold text-[#406c89] border-r border-slate-100">
                    {item.thoiGianDaLam}
                  </td>

                  {/* 23. VỊ TRÍ ĐÃ ĐẢM NHIỆM */}
                  <td className="py-2.5 px-3.5 text-slate-700 font-medium border-r border-slate-100">
                    {item.viTriDaDamNhiem}
                  </td>

                  {/* 24. CHỨC VỤ */}
                  <td className="py-2.5 px-3.5 text-slate-600 border-r border-slate-100">
                    {item.chucVu}
                  </td>

                  {/* 25. PHÒNG BAN */}
                  <td className="py-2.5 px-3.5 text-slate-700 font-medium border-r border-slate-100">
                    {item.phongBan}
                  </td>

                  {/* 26. NGÀY GỬI CV */}
                  <td className="py-2.5 px-3 text-center text-slate-600 border-r border-slate-100">
                    {item.ngayGuiCv}
                  </td>

                  {/* 27. NGUỒN TUYỂN DỤNG */}
                  <td className="py-2.5 px-3.5 border-r border-slate-100">
                    <span className="px-2 py-0.5 rounded text-[10.5px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {item.nguonTuyenDung}
                    </span>
                  </td>

                  {/* 28. LINK FB */}
                  <td className="py-2.5 px-3 border-r border-slate-100">
                    <a
                      href={`https://${item.linkFb}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline text-[11px]"
                    >
                      {item.linkFb}
                    </a>
                  </td>

                  {/* 29. LỌC CV */}
                  <td className="py-2.5 px-3 text-center border-r border-slate-100">
                    <span className="px-1.5 py-0.5 rounded text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {item.locCv}
                    </span>
                  </td>

                  {/* 30. SL HS NỘP */}
                  <td className="py-2.5 px-3 text-center text-slate-700 font-medium border-r border-slate-100">
                    {item.slHsNop}
                  </td>

                  {/* 31. HS UV ĐẠT */}
                  <td className="py-2.5 px-3 text-center border-r border-slate-100">
                    <span className="px-1.5 py-0.5 rounded text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {item.hsUvDat}
                    </span>
                  </td>

                  {/* 32. UV ĐƯỢC YÊU CẦU LÀM BÀI */}
                  <td className="py-2.5 px-3.5 text-center text-slate-700 border-r border-slate-100">
                    {item.uvDuocYeuCauLamBai}
                  </td>

                  {/* 33. NGÀY GỬI ĐỀ KIỂM TRA */}
                  <td className="py-2.5 px-3 text-center text-slate-600 border-r border-slate-100">
                    {item.ngayGuiDeKiemTra}
                  </td>

                  {/* 34. NGÀY NỘP BÀI LÀM */}
                  <td className="py-2.5 px-3 text-center text-slate-600 border-r border-slate-100">
                    {item.ngayNopBaiLam}
                  </td>

                  {/* 35. KẾT QUẢ/PHẢN HỒI BÀI TEST */}
                  <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-100">
                    {item.ketQuaPhanHoiBaiTest}
                  </td>

                  {/* 36. UV BÀI LÀM ĐẠT */}
                  <td className="py-2.5 px-3 text-center border-r border-slate-100">
                    <span className="px-1.5 py-0.5 rounded text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {item.uvBaiLamDat}
                    </span>
                  </td>

                  {/* 37. LỊCH PV 1 (NGÀY-GIỜ) */}
                  <td className="py-2.5 px-3 text-center font-medium text-slate-700 border-r border-slate-100">
                    {item.lichPv1}
                  </td>

                  {/* 38. CÁN BỘ PV */}
                  <td className="py-2.5 px-3 text-center text-slate-700 font-medium border-r border-slate-100">
                    {item.canBoPv}
                  </td>

                  {/* 39. UV ĐƯỢC HẸN PV */}
                  <td className="py-2.5 px-3 text-center border-r border-slate-100">
                    <span className="px-1.5 py-0.5 rounded text-[10.5px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {item.uvDuocHenPv}
                    </span>
                  </td>

                  {/* 40. UV THAM GIA PV */}
                  <td className="py-2.5 px-3 text-center text-slate-700 border-r border-slate-100">
                    {item.uvThamGiaPv}
                  </td>

                  {/* 41. TỔNG KẾT KẾT QUẢ KT VÀ LÝ DO */}
                  <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-100">
                    {item.tongKetKetQuaKtVaLyDo}
                  </td>

                  {/* 42. UV ĐẠT YÊU CẦU */}
                  <td className="py-2.5 px-3 text-center border-r border-slate-100">
                    <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {item.uvDatYeuCau}
                    </span>
                  </td>

                  {/* 43. UV NHẬN VIỆC */}
                  <td className="py-2.5 px-3 text-center border-r border-slate-100">
                    <span className={`px-2 py-0.5 rounded text-[10.5px] font-semibold ${
                      item.uvNhanViec === 'Đồng ý'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {item.uvNhanViec}
                    </span>
                  </td>

                  {/* 44. NGÀY BẮT ĐẦU ĐI LÀM/THỬ VIỆC */}
                  <td className="py-2.5 px-3.5 text-center font-medium text-slate-700 border-r border-slate-100">
                    {item.ngayBatDauDiLamThuViec}
                  </td>

                  {/* 45. KẾT QUẢ */}
                  <td className="py-2.5 px-3 text-center border-r border-slate-100">
                    <span className={`px-2 py-0.5 rounded text-[10.5px] font-bold ${
                      item.ketQua === 'Trúng tuyển'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {item.ketQua}
                    </span>
                  </td>

                  {/* 46. GHI CHÚ */}
                  <td className="py-2.5 px-3.5 text-slate-500 italic border-r border-slate-100">
                    {item.ghiChu}
                  </td>

                  {/* 47. THAO TÁC */}
                  <td className="py-2.5 px-3 text-center sticky right-0 bg-white group-hover:bg-slate-50 border-l border-slate-200 shadow-[-3px_0_6px_rgba(0,0,0,0.04)] z-10">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        title="Chỉnh sửa"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCandidate(item);
                        }}
                        className="p-1.5 text-slate-500 hover:text-[#406c89] hover:bg-slate-100 rounded transition-colors cursor-pointer"
                      >
                        <IconPencil className="w-4 h-4" />
                      </button>
                      <button
                        title="Xóa"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeletingCandidate(item);
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                      >
                        <IconTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Thêm hồ sơ ứng viên */}
      <ThemUngVienModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCandidate}
        nextStt={candidates.length + 1}
      />

      {/* Modal Sửa hồ sơ ứng viên */}
      <SuaUngVienModal
        isOpen={!!editingCandidate}
        candidate={editingCandidate}
        onClose={() => setEditingCandidate(null)}
        onSave={handleUpdateCandidate}
      />

      {/* Modal Xác nhận xóa hồ sơ ứng viên */}
      <XoaUngVienModal
        isOpen={!!deletingCandidate}
        candidate={deletingCandidate}
        onClose={() => setDeletingCandidate(null)}
        onConfirm={handleDeleteCandidate}
      />

      {/* Modal Sơ đồ quy trình tuyển dụng */}
      <SoDoModal
        isOpen={isSoDoModalOpen}
        onClose={() => setIsSoDoModalOpen(false)}
      />
    </div>
  );
}
