import React, { useState } from 'react';
import {
  IconCheck,
  IconX,
  IconPencil,
  IconTrash,
  IconClock,
  IconPhoto,
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconRefresh
} from '@tabler/icons-react';
import { DuAnItem } from '../../../index';

interface TongHopBaoCaoTabProps {
  project?: DuAnItem;
}

export default function TongHopBaoCaoTab({ project }: TongHopBaoCaoTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter States matching reference image
  const [approvalFilter, setApprovalFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');
  const [selectedStaffFilter, setSelectedStaffFilter] = useState('all');

  const handleRefresh = () => {
    setSearchQuery('');
    setApprovalFilter('all');
    setSelectedDeptFilter('all');
    setSelectedStaffFilter('all');
    setCurrentPage(1);
  };

  // Attached image paths generated for realistic rendering
  const attachedImages = [
    '/brain/ab38e360-4be8-41f4-86cf-1b37511dc4c4/architectural_landscape_1_1785484440040.png',
    '/brain/ab38e360-4be8-41f4-86cf-1b37511dc4c4/architectural_landscape_2_1785484453363.png',
    '/brain/ab38e360-4be8-41f4-86cf-1b37511dc4c4/architectural_landscape_3_1785484464781.png'
  ];

  // 22 Sample reports matching user reference data exactly
  const reportList = [
    {
      id: 1,
      timeIndex: 'Lần 1',
      creator: 'Phạm Thị Thu Trang',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Cảnh Quan',
      taskTag: 'CV (dòng 27): DÁN PT+ TRANG TRÍ DÀN HOA TRÊN KHỐI ...',
      status: 'Hoàn thành',
      staffName: 'Sắm Thị Thúy',
      slDkDp: 1,
      slTt: 1,
      gioDk: '6h',
      gioTt: '6h',
      startTime: '25/07/2026',
      endTime: '25/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '17:18:00 25/7/2026',
      evaluation: '—',
      note: '—',
      images: attachedImages
    },
    {
      id: 2,
      timeIndex: 'Lần 1',
      creator: 'Phùng Bích Thảo',
      approvalStatus: 'Chờ duyệt',
      projectName: "QUẢN LÝ THIẾT KẾ CẢNH QUAN L'AURORA",
      deptTag: 'Ban Giám đốc',
      taskTag: 'CV (dòng 12): RÀ SOÁT BẢN VẼ MỘC SƠN & CẮT ...',
      status: 'Đang triển khai',
      staffName: 'Nguyễn Thanh Tuấn',
      slDkDp: 2,
      slTt: 2,
      gioDk: '8h',
      gioTt: '8h',
      startTime: '25/07/2026',
      endTime: '25/07/2026',
      htInDay: '80%',
      htLuyTien: '80%',
      reportSystemTime: '18:05:00 25/7/2026',
      evaluation: 'Đạt tiến độ đề ra',
      note: 'Bổ sung nhân sự phòng Điện',
      images: [attachedImages[0], attachedImages[1]]
    },
    {
      id: 3,
      timeIndex: 'Lần 2',
      creator: 'Bùi Thị Duyên',
      approvalStatus: 'Đã duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Khối Văn phòng',
      taskTag: 'CV (dòng 5): TỔNG HỢP BÁO CÁO CHI PHÍ PHÒNG BAN ...',
      status: 'Hoàn thành',
      staffName: 'Trần Minh Anh',
      slDkDp: 1,
      slTt: 1,
      gioDk: '4h',
      gioTt: '4h',
      startTime: '24/07/2026',
      endTime: '24/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '12:15:00 24/7/2026',
      evaluation: 'Tốt',
      note: 'Đã gửi mail tổng hợp',
      images: [attachedImages[2]]
    },
    {
      id: 4,
      timeIndex: 'Lần 1',
      creator: 'Lê Trung Hiếu',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Cắt',
      taskTag: 'CV (dòng 8): CẮT LASER GỖ MÔ HÌNH KIẾN TRÚC ...',
      status: 'Hoàn thành',
      staffName: 'Lê Trung Hiếu',
      slDkDp: 1,
      slTt: 1,
      gioDk: '5h',
      gioTt: '5h',
      startTime: '24/07/2026',
      endTime: '24/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '16:40:00 24/7/2026',
      evaluation: 'Đạt',
      note: '—',
      images: [attachedImages[0]]
    },
    {
      id: 5,
      timeIndex: 'Lần 1',
      creator: 'Đinh Đức Lợi',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Ghép',
      taskTag: 'CV (dòng 15): GHÉP LẮP RÁP KHỐI ĐẾ TẦNG 1-3 ...',
      status: 'Hoàn thành',
      staffName: 'Đinh Đức Lợi',
      slDkDp: 1,
      slTt: 1,
      gioDk: '7h',
      gioTt: '7h',
      startTime: '25/07/2026',
      endTime: '25/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '17:50:00 25/7/2026',
      evaluation: '—',
      note: '—',
      images: [attachedImages[1]]
    },
    {
      id: 6,
      timeIndex: 'Lần 1',
      creator: 'Lâm Vĩnh Hưng',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Điện',
      taskTag: 'CV (dòng 20): ĐI ĐÈN LED ĐIỆN NHẸ MÔ HÌNH CẢNH QUAN ...',
      status: 'Chưa hoàn thành',
      staffName: 'Lâm Vĩnh Hưng',
      slDkDp: 1,
      slTt: 0,
      gioDk: '6h',
      gioTt: '4h',
      startTime: '25/07/2026',
      endTime: '26/07/2026',
      htInDay: '66%',
      htLuyTien: '66%',
      reportSystemTime: '18:10:00 25/7/2026',
      evaluation: 'Chậm',
      note: 'Thiếu nguồn điện 12V',
      images: []
    },
    {
      id: 7,
      timeIndex: 'Lần 2',
      creator: 'Đào Văn Thọ',
      approvalStatus: 'Đã duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Khai triển',
      taskTag: 'CV (dòng 3): KHAI TRIỂN CHẮT LỌC HỒ SƠ BẢN VẼ MỘC ...',
      status: 'Hoàn thành',
      staffName: 'Đào Văn Thọ',
      slDkDp: 1,
      slTt: 1,
      gioDk: '8h',
      gioTt: '8h',
      startTime: '23/07/2026',
      endTime: '23/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '17:00:00 23/7/2026',
      evaluation: 'Xuất sắc',
      note: '—',
      images: [attachedImages[2]]
    },
    {
      id: 8,
      timeIndex: 'Lần 1',
      creator: 'Hoàng Quyết Thắng',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Mộc Sơn',
      taskTag: 'CV (dòng 19): CHÀ NHÁM SƠN PHỦ BÓNG KHỐI NHÀ MẪU ...',
      status: 'Hoàn thành',
      staffName: 'Hoàng Quyết Thắng',
      slDkDp: 1,
      slTt: 1,
      gioDk: '6h',
      gioTt: '6h',
      startTime: '25/07/2026',
      endTime: '25/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '17:30:00 25/7/2026',
      evaluation: 'Đạt',
      note: '—',
      images: [attachedImages[0]]
    },
    {
      id: 9,
      timeIndex: 'Lần 1',
      creator: 'Đặng Quốc Nam',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Công nghệ và Thiết kế',
      taskTag: 'CV (dòng 30): THIẾT KẾ MÔ PHỎNG 3D ÁNH SÁNG ĐÊM ...',
      status: 'Hoàn thành',
      staffName: 'Đặng Quốc Nam',
      slDkDp: 1,
      slTt: 1,
      gioDk: '7h',
      gioTt: '7h',
      startTime: '25/07/2026',
      endTime: '25/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '17:45:00 25/7/2026',
      evaluation: 'Tốt',
      note: '—',
      images: [attachedImages[1]]
    },
    {
      id: 10,
      timeIndex: 'Lần 2',
      creator: 'Phạm Văn Thành',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Cảnh Quan',
      taskTag: 'CV (dòng 28): LẮP ĐẶT CÂY XANH & HỒ BỔI TẦNG THƯỢNG ...',
      status: 'Hoàn thành',
      staffName: 'Vũ Thị Lan',
      slDkDp: 1,
      slTt: 1,
      gioDk: '5h',
      gioTt: '5h',
      startTime: '25/07/2026',
      endTime: '25/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '18:00:00 25/7/2026',
      evaluation: 'Đạt',
      note: '—',
      images: [attachedImages[2]]
    },
    // Items for Page 2
    {
      id: 11,
      timeIndex: 'Lần 3',
      creator: 'Phạm Thị Thu Trang',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Cảnh Quan',
      taskTag: 'CV (dòng 29): SẮP XẾP ĐÈN TRANG TRÍ ĐẢO ĐÈN ...',
      status: 'Đang triển khai',
      staffName: 'Sắm Thị Thúy',
      slDkDp: 1,
      slTt: 1,
      gioDk: '4h',
      gioTt: '4h',
      startTime: '26/07/2026',
      endTime: '26/07/2026',
      htInDay: '50%',
      htLuyTien: '50%',
      reportSystemTime: '11:30:00 26/7/2026',
      evaluation: '—',
      note: 'Đang hoàn thiện phần chân đèn',
      images: []
    },
    {
      id: 12,
      timeIndex: 'Lần 1',
      creator: 'Nguyễn Đức Việt',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Ban Giám đốc',
      taskTag: 'CV (dòng 1): PHÊ DUYỆT PHƯƠNG ÁN BIỆN PHÁP THI CÔNG ...',
      status: 'Hoàn thành',
      staffName: 'Nguyễn Đức Việt',
      slDkDp: 1,
      slTt: 1,
      gioDk: '3h',
      gioTt: '3h',
      startTime: '26/07/2026',
      endTime: '26/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '14:20:00 26/7/2026',
      evaluation: 'Xuất sắc',
      note: 'Duyệt phương án 2',
      images: [attachedImages[0]]
    },
    {
      id: 13,
      timeIndex: 'Lần 2',
      creator: 'Phạm Thu Trang',
      approvalStatus: 'Đã duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Khối Văn phòng',
      taskTag: 'CV (dòng 6): LẬP KẾ HOẠCH MUA SẮM VẬT TƯ ĐÈN ...',
      status: 'Hoàn thành',
      staffName: 'Phạm Thu Trang',
      slDkDp: 1,
      slTt: 1,
      gioDk: '5h',
      gioTt: '5h',
      startTime: '26/07/2026',
      endTime: '26/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '16:00:00 26/7/2026',
      evaluation: 'Đạt',
      note: '—',
      images: []
    },
    {
      id: 14,
      timeIndex: 'Lần 1',
      creator: 'Vũ Quốc Huy',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Cắt',
      taskTag: 'CV (dòng 9): CẮT KHUÔN ĐẾ ALUMIUM BẢO VỆ MÔ HÌNH ...',
      status: 'Hoàn thành',
      staffName: 'Vũ Quốc Huy',
      slDkDp: 1,
      slTt: 1,
      gioDk: '6h',
      gioTt: '6h',
      startTime: '26/07/2026',
      endTime: '26/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '17:10:00 26/7/2026',
      evaluation: 'Tốt',
      note: '—',
      images: [attachedImages[1]]
    },
    {
      id: 15,
      timeIndex: 'Lần 1',
      creator: 'Nguyễn Văn Hoàng',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Ghép',
      taskTag: 'CV (dòng 16): GHÉP MÁI KÍNH CẢNH QUAN TẦNG THƯỢNG ...',
      status: 'Đang triển khai',
      staffName: 'Nguyễn Văn Hoàng',
      slDkDp: 1,
      slTt: 1,
      gioDk: '8h',
      gioTt: '6h',
      startTime: '26/07/2026',
      endTime: '27/07/2026',
      htInDay: '75%',
      htLuyTien: '75%',
      reportSystemTime: '17:40:00 26/7/2026',
      evaluation: 'Đang làm',
      note: 'Cần keo dán chuyên dụng',
      images: []
    },
    {
      id: 16,
      timeIndex: 'Lần 2',
      creator: 'Trịnh Hoàng Nam',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Điện',
      taskTag: 'CV (dòng 21): KIỂM TRA HỆ THỐNG ĐIỆN ĐIỀU KHIỂN TỪ XA ...',
      status: 'Hoàn thành',
      staffName: 'Trịnh Hoàng Nam',
      slDkDp: 1,
      slTt: 1,
      gioDk: '5h',
      gioTt: '5h',
      startTime: '26/07/2026',
      endTime: '26/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '18:15:00 26/7/2026',
      evaluation: 'Tốt',
      note: 'Hệ thống hoạt động ổn định',
      images: [attachedImages[2]]
    },
    {
      id: 17,
      timeIndex: 'Lần 1',
      creator: 'Ngô Tấn Phát',
      approvalStatus: 'Đã duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Khai triển',
      taskTag: 'CV (dòng 4): KHAI TRIỂN CHI TIẾT CẢNH QUAN SÂN VƯỜN ...',
      status: 'Hoàn thành',
      staffName: 'Ngô Tấn Phát',
      slDkDp: 1,
      slTt: 1,
      gioDk: '7h',
      gioTt: '7h',
      startTime: '26/07/2026',
      endTime: '26/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '17:05:00 26/7/2026',
      evaluation: 'Tốt',
      note: '—',
      images: []
    },
    {
      id: 18,
      timeIndex: 'Lần 1',
      creator: 'Bùi Văn Tiến',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Mộc Sơn',
      taskTag: 'CV (dòng 20): SƠN LÓT KHỐI ĐẾ CỐNG CHÍNH ...',
      status: 'Hoàn thành',
      staffName: 'Bùi Văn Tiến',
      slDkDp: 1,
      slTt: 1,
      gioDk: '4h',
      gioTt: '4h',
      startTime: '26/07/2026',
      endTime: '26/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '16:50:00 26/7/2026',
      evaluation: 'Đạt',
      note: '—',
      images: [attachedImages[0]]
    },
    {
      id: 19,
      timeIndex: 'Lần 1',
      creator: 'Lê Thanh Tùng',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Công nghệ và Thiết kế',
      taskTag: 'CV (dòng 31): IN 3D CÁC CHI TIẾT TRANG TRÍ TÍ HON ...',
      status: 'Hoàn thành',
      staffName: 'Lê Thanh Tùng',
      slDkDp: 2,
      slTt: 2,
      gioDk: '8h',
      gioTt: '8h',
      startTime: '26/07/2026',
      endTime: '26/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '18:30:00 26/7/2026',
      evaluation: 'Xuất sắc',
      note: 'In hoàn thành 100%',
      images: [attachedImages[1]]
    },
    {
      id: 20,
      timeIndex: 'Lần 1',
      creator: 'Vũ Thị Lan',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Cảnh Quan',
      taskTag: 'CV (dòng 32): TRỒNG CỎ VÀ TRANG TRÍ THẢM THỰC VẬT ...',
      status: 'Hoàn thành',
      staffName: 'Vũ Thị Lan',
      slDkDp: 1,
      slTt: 1,
      gioDk: '6h',
      gioTt: '6h',
      startTime: '26/07/2026',
      endTime: '26/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '17:55:00 26/7/2026',
      evaluation: 'Đạt',
      note: '—',
      images: [attachedImages[2]]
    },
    // Items for Page 3
    {
      id: 21,
      timeIndex: 'Lần 1',
      creator: 'Nguyễn Thị Hoa',
      approvalStatus: 'Đã duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Phòng Công nghệ và Thiết kế',
      taskTag: 'CV (dòng 33): RÀ SOÁT KIỂM TRA CHẤT LƯỢNG MÔ HÌNH ...',
      status: 'Hoàn thành',
      staffName: 'Nguyễn Thị Hoa',
      slDkDp: 1,
      slTt: 1,
      gioDk: '5h',
      gioTt: '5h',
      startTime: '27/07/2026',
      endTime: '27/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '15:10:00 27/7/2026',
      evaluation: 'Tốt',
      note: 'Mô hình đủ điều kiện bàn giao',
      images: []
    },
    {
      id: 22,
      timeIndex: 'Lần 2',
      creator: 'Phùng Bích Thảo',
      approvalStatus: 'Chờ duyệt',
      projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
      deptTag: 'Ban Giám đốc',
      taskTag: 'CV (dòng 2): KÝ NGHIỆM THU BÀN GIAO MÔ HÌNH ...',
      status: 'Hoàn thành',
      staffName: 'Phùng Bích Thảo',
      slDkDp: 1,
      slTt: 1,
      gioDk: '2h',
      gioTt: '2h',
      startTime: '27/07/2026',
      endTime: '27/07/2026',
      htInDay: '100%',
      htLuyTien: '100%',
      reportSystemTime: '16:30:00 27/7/2026',
      evaluation: 'Hoàn hảo',
      note: 'Khách hàng hài lòng',
      images: [attachedImages[0]]
    }
  ];

  // Comprehensive multi-criteria search & dropdown filtering logic
  const filteredReports = reportList.filter((r) => {
    const matchesSearch =
      r.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.deptTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.taskTag.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesApproval = true;
    if (approvalFilter === 'pending') matchesApproval = r.approvalStatus === 'Chờ duyệt';
    else if (approvalFilter === 'approved') matchesApproval = r.approvalStatus === 'Đã duyệt';
    else if (approvalFilter === 'rejected') matchesApproval = r.approvalStatus === 'Từ chối';

    let matchesDept = true;
    if (selectedDeptFilter !== 'all') {
      matchesDept = r.deptTag.toLowerCase().includes(selectedDeptFilter.toLowerCase());
    }

    let matchesStaff = true;
    if (selectedStaffFilter !== 'all') {
      matchesStaff = r.creator === selectedStaffFilter || r.staffName === selectedStaffFilter;
    }

    return matchesSearch && matchesApproval && matchesDept && matchesStaff;
  });

  // Dynamic Pagination calculations
  const totalItems = filteredReports.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedReports = filteredReports.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-3 animate-fade-in font-sans text-slate-800 select-none">
      {/* TITLE & REFRESH BUTTON MATCHING SCREENSHOT REFERENCE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
            Tổng hợp báo cáo công việc
          </h2>
          <span className="bg-[#f59e0b] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-2xs">
            {reportList.filter(r => r.approvalStatus === 'Chờ duyệt').length} chờ duyệt
          </span>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200/90 rounded-lg hover:bg-slate-50 transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          <IconRefresh size={15} className="text-slate-600" />
          <span>Làm mới</span>
        </button>
      </div>

      {/* FILTER CONTROL STRIP MATCHING SCREENSHOT REFERENCE */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
        
        {/* SEGMENTED STATUS BUTTONS & DROPDOWNS */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Segmented Status Pill Group */}
          <div className="inline-flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/90 text-xs font-medium">
            <button
              type="button"
              onClick={() => { setApprovalFilter('all'); setCurrentPage(1); }}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                approvalFilter === 'all'
                  ? 'bg-[#3b49df] text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => { setApprovalFilter('pending'); setCurrentPage(1); }}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                approvalFilter === 'pending'
                  ? 'bg-[#3b49df] text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              Chờ duyệt ({reportList.filter(r => r.approvalStatus === 'Chờ duyệt').length})
            </button>
            <button
              type="button"
              onClick={() => { setApprovalFilter('approved'); setCurrentPage(1); }}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                approvalFilter === 'approved'
                  ? 'bg-[#3b49df] text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              Đã duyệt ({reportList.filter(r => r.approvalStatus === 'Đã duyệt').length})
            </button>
            <button
              type="button"
              onClick={() => { setApprovalFilter('rejected'); setCurrentPage(1); }}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                approvalFilter === 'rejected'
                  ? 'bg-[#3b49df] text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              Từ chối (0)
            </button>
          </div>

          {/* Department Select Dropdown */}
          <select
            value={selectedDeptFilter}
            onChange={(e) => { setSelectedDeptFilter(e.target.value); setCurrentPage(1); }}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl outline-none cursor-pointer hover:border-slate-300 transition-all"
          >
            <option value="all">Tất cả phòng ban</option>
            <option value="Ban Giám đốc">Ban Giám đốc</option>
            <option value="Khối Văn phòng">Khối Văn phòng</option>
            <option value="Phòng Khai triển">Phòng Khai triển</option>
            <option value="Phòng Cắt">Phòng Cắt</option>
            <option value="Phòng Ghép">Phòng Ghép</option>
            <option value="Phòng Mộc Sơn">Phòng Mộc Sơn</option>
            <option value="Phòng Điện">Phòng Điện</option>
            <option value="Phòng Cảnh Quan">Phòng Cảnh Quan</option>
            <option value="Phòng Công nghệ và Thiết kế">Phòng Công nghệ và Thiết kế</option>
          </select>

          {/* Staff Select Dropdown */}
          <select
            value={selectedStaffFilter}
            onChange={(e) => { setSelectedStaffFilter(e.target.value); setCurrentPage(1); }}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl outline-none cursor-pointer hover:border-slate-300 transition-all"
          >
            <option value="all">Tất cả nhân sự</option>
            <option value="Phạm Thị Thu Trang">Phạm Thị Thu Trang</option>
            <option value="Phùng Bích Thảo">Phùng Bích Thảo</option>
            <option value="Bùi Thị Duyên">Bùi Thị Duyên</option>
            <option value="Lê Trung Hiếu">Lê Trung Hiếu</option>
            <option value="Đinh Đức Lợi">Đinh Đức Lợi</option>
            <option value="Lâm Vĩnh Hưng">Lâm Vĩnh Hưng</option>
            <option value="Đào Văn Thọ">Đào Văn Thọ</option>
            <option value="Hoàng Quyết Thắng">Hoàng Quyết Thắng</option>
            <option value="Đặng Quốc Nam">Đặng Quốc Nam</option>
            <option value="Vũ Thị Lan">Vũ Thị Lan</option>
          </select>

        </div>

        {/* SEARCH INPUT */}
        <div className="relative flex-1 w-full lg:max-w-xs">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Tìm kiếm báo cáo..."
            className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#3b49df] outline-none transition-all"
          />
        </div>

      </div>

      {/* UNIFIED CONTAINER FOR TABLE & PERMANENTLY PINNED PAGINATION */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col max-h-[480px] relative">
        {/* TABLE SCROLL CONTAINER */}
        <div className="flex-1 overflow-auto relative">
          <table className="w-full text-left text-xs border-collapse min-w-[920px]">
            {/* HEADER ROW STICKY TOP */}
            <thead className="sticky top-0 z-20 shadow-2xs">
              <tr className="bg-[#f8fafc] text-slate-600 font-bold border-b border-slate-200/90 text-[11px]">
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-3 text-center min-w-[65px] z-20">Lần</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-3.5 min-w-[160px] z-20">Nhân sự</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-3.5 min-w-[140px] z-20">Phòng ban</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-3.5 min-w-[210px] z-20">Công việc</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-3 text-center min-w-[105px] z-20">Trạng thái</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-2.5 text-center min-w-[75px] z-20">SL (DK/TT)</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-2.5 text-center min-w-[75px] z-20">Giờ (DK/TT)</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-3 text-center min-w-[95px] z-20">Bắt đầu - Kết thúc</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-2.5 text-center min-w-[85px] z-20">%HT / Lũy tiến</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-3 text-center min-w-[115px] z-20">Thời gian lập BC</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-2.5 text-center min-w-[65px] z-20">Hình ảnh</th>
                <th className="sticky top-0 bg-[#f8fafc] py-2.5 px-3 text-center min-w-[105px] z-20">Hành động</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y divide-slate-100">
              {paginatedReports.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* LẦN */}
                  <td className="py-2.5 px-3 text-center font-bold text-[#2b5278]">
                    <span className="bg-[#edf4f9] px-2 py-0.5 rounded text-[11px]">
                      {r.timeIndex}
                    </span>
                  </td>

                  {/* NHÂN SỰ */}
                  <td className="py-2.5 px-3.5">
                    <div className="font-bold text-slate-800 text-xs">{r.creator}</div>
                    <div className="text-[10px] text-purple-600 font-medium mt-0.5">
                      Thực hiện: {r.staffName}
                    </div>
                  </td>

                  {/* PHÒNG BAN */}
                  <td className="py-2.5 px-3.5 text-slate-600 font-medium">
                    <span className="bg-purple-50 text-purple-700 border border-purple-200/80 px-2 py-0.5 rounded text-[11px] font-bold inline-block">
                      {r.deptTag}
                    </span>
                  </td>

                  {/* CÔNG VIỆC */}
                  <td className="py-2.5 px-3.5">
                    <div className="font-semibold text-emerald-700 text-[11px] leading-tight max-w-[250px] truncate" title={r.taskTag}>
                      {r.taskTag}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                      {r.projectName}
                    </div>
                  </td>

                  {/* TRẠNG THÁI */}
                  <td className="py-2.5 px-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                        {r.status}
                      </span>
                      <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                        {r.approvalStatus}
                      </span>
                    </div>
                  </td>

                  {/* SL (DK/TT) */}
                  <td className="py-2.5 px-2.5 text-center font-bold text-slate-700 text-xs">
                    <span>{r.slDkDp}</span> / <span className="text-emerald-600">{r.slTt}</span>
                  </td>

                  {/* GIỜ (DK/TT) */}
                  <td className="py-2.5 px-2.5 text-center font-bold text-slate-700 text-xs">
                    <span>{r.gioDk}</span> / <span className="text-amber-600">{r.gioTt}</span>
                  </td>

                  {/* BẮT ĐẦU - KẾT THÚC */}
                  <td className="py-2.5 px-3 text-center text-slate-500 font-medium text-[11px]">
                    <div>{r.startTime}</div>
                    <div className="text-indigo-600 font-semibold">{r.endTime}</div>
                  </td>

                  {/* %HT / LŨY TIẾN */}
                  <td className="py-2.5 px-2.5 text-center font-extrabold text-indigo-600 text-xs">
                    <div>{r.htInDay}</div>
                    <div className="text-[10px] text-purple-500 font-bold">{r.htLuyTien} LT</div>
                  </td>

                  {/* THỜI GIAN LẬP BC */}
                  <td className="py-2.5 px-3 text-center text-amber-800 font-semibold text-[11px]">
                    <div className="flex items-center justify-center gap-1">
                      <IconClock size={13} className="text-amber-600 shrink-0" />
                      <span>{r.reportSystemTime}</span>
                    </div>
                  </td>

                  {/* HÌNH ÁNH */}
                  <td className="py-2.5 px-2.5 text-center">
                    {r.images && r.images.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setSelectedImage(r.images[0])}
                        className="inline-flex items-center justify-center gap-1 bg-slate-100 hover:bg-[#2b5278] hover:text-white text-slate-600 border border-slate-200 px-2 py-0.5 rounded text-xs font-bold transition-all cursor-pointer"
                        title="Xem hình ảnh"
                      >
                        <IconPhoto size={13} />
                        <span>{r.images.length}</span>
                      </button>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>

                  {/* HÀNH ĐỘNG BALANCED */}
                  <td className="py-2.5 px-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 flex items-center justify-center transition-all cursor-pointer"
                        title="Duyệt"
                      >
                        <IconCheck size={13} />
                      </button>
                      <button
                        type="button"
                        className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 hover:bg-rose-200 flex items-center justify-center transition-all cursor-pointer"
                        title="Từ chối"
                      >
                        <IconX size={13} />
                      </button>
                      <button
                        type="button"
                        className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 flex items-center justify-center transition-all cursor-pointer"
                        title="Sửa"
                      >
                        <IconPencil size={12} />
                      </button>
                      <button
                        type="button"
                        className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 hover:bg-rose-200 flex items-center justify-center transition-all cursor-pointer"
                        title="Xóa"
                      >
                        <IconTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PERMANENTLY PINNED BOTTOM PAGINATION BAR BALANCED */}
        <div className="shrink-0 z-30 bg-white border-t border-slate-200/90 shadow-md px-4 py-2 sm:py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs select-none">
          {/* SUMMARY INFO & PAGE SIZE SELECTOR */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-slate-500 font-medium text-center sm:text-left">
            <div>
              Hiển thị <span className="font-bold text-slate-800">{totalItems > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + pageSize, totalItems)}</span> trên <span className="font-bold text-slate-800">{totalItems}</span> báo cáo
            </div>

            <div className="flex items-center gap-1 text-slate-600 bg-slate-50 border border-slate-200/90 px-2 py-0.5 rounded-lg text-xs">
              <span>Hiển thị</span>
              <select
                value={pageSize}
                onChange={handlePageSizeChange}
                className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer text-xs"
              >
                <option value={5}>5 / trang</option>
                <option value={10}>10 / trang</option>
                <option value={20}>20 / trang</option>
              </select>
            </div>
          </div>

          {/* CLICKABLE PAGE NUMBERS AND CHEVRONS */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-lg border transition-all ${
                currentPage === 1
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
              }`}
              title="Trang trước"
            >
              <IconChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => handlePageChange(pageNum)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  currentPage === pageNum
                    ? 'bg-[#2b5278] text-white shadow-2xs font-black'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-lg border transition-all ${
                currentPage === totalPages
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
              }`}
              title="Trang tiếp"
            >
              <IconChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* FULLSCREEN IMAGE PREVIEW MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl max-h-[85vh] bg-white p-2 rounded-2xl overflow-hidden shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-900/60 hover:bg-slate-900 text-white rounded-full transition-all cursor-pointer"
            >
              <IconX size={20} />
            </button>
            <img
              src={selectedImage}
              alt="Expanded Preview"
              className="w-full h-full object-contain rounded-xl max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
