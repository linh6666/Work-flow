"use client";

import React, { useState, useMemo } from 'react';
import { IconSearch, IconEye, IconClock, IconAlertTriangle, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import ChiTietBaoCaoModal, { StaffReportModalData } from './modal/ChiTietBaoCaoModal';

interface StaffWarningRow {
  stt: number;
  staffName: string;
  department: string;
  projectCount: number;
  scheduledTasks: number;
  unimplemented: number; // Chưa triển khai
  reported: number;      // Đã báo cáo
  unreported: number;    // Chưa báo cáo
  lateReport: number;    // Báo cáo trễ
  lateTasks: number;     // CV trễ
}

interface DepartmentGroup {
  deptName: string;
  rows: StaffWarningRow[];
}

const MOCK_WARNING_GROUPS: DepartmentGroup[] = [
  {
    deptName: 'BAN GIÁM ĐỐC',
    rows: [
      { stt: 1, staffName: 'Nguyễn Thanh Tuấn', department: 'Ban Giám đốc', projectCount: 9, scheduledTasks: 0, unimplemented: 54, reported: 0, unreported: 54, lateReport: 0, lateTasks: 46 },
      { stt: 2, staffName: 'Phùng Bích Thảo', department: 'Ban Giám đốc', projectCount: 9, scheduledTasks: 0, unimplemented: 53, reported: 0, unreported: 53, lateReport: 0, lateTasks: 45 },
      { stt: 3, staffName: 'Nguyễn Đức Việt', department: 'Ban Giám đốc', projectCount: 9, scheduledTasks: 0, unimplemented: 18, reported: 0, unreported: 18, lateReport: 0, lateTasks: 18 },
      { stt: 4, staffName: 'Nguyễn Thanh Tuấn, Phùng Bích Thảo, Nguyễn Đức Việt', department: 'Ban Giám đốc', projectCount: 9, scheduledTasks: 0, unimplemented: 18, reported: 0, unreported: 18, lateReport: 0, lateTasks: 2 },
    ],
  },
  {
    deptName: 'KHỐI VĂN PHÒNG',
    rows: [
      { stt: 5, staffName: 'Nguyễn Phú Quang', department: 'Khối Văn phòng', projectCount: 4, scheduledTasks: 0, unimplemented: 149, reported: 3, unreported: 146, lateReport: 2, lateTasks: 52 },
      { stt: 6, staffName: 'Bùi Thị Duyên', department: 'Khối Văn phòng', projectCount: 7, scheduledTasks: 0, unimplemented: 69, reported: 7, unreported: 65, lateReport: 5, lateTasks: 53 },
      { stt: 7, staffName: 'Bùi Phương Uyên', department: 'Khối Văn phòng', projectCount: 2, scheduledTasks: 0, unimplemented: 57, reported: 0, unreported: 57, lateReport: 0, lateTasks: 57 },
      { stt: 8, staffName: 'Nhân viên Kinh doanh 1', department: 'Khối Văn phòng', projectCount: 2, scheduledTasks: 0, unimplemented: 47, reported: 0, unreported: 47, lateReport: 0, lateTasks: 16 },
      { stt: 9, staffName: '(Chưa gán)', department: 'Khối Văn phòng', projectCount: 1, scheduledTasks: 0, unimplemented: 22, reported: 0, unreported: 22, lateReport: 0, lateTasks: 22 },
      { stt: 10, staffName: 'Nguyễn Thế Kỳ Anh', department: 'Khối Văn phòng', projectCount: 1, scheduledTasks: 0, unimplemented: 20, reported: 19, unreported: 1, lateReport: 19, lateTasks: 20 },
      { stt: 11, staffName: 'Nhân viên Kinh doanh 2', department: 'Khối Văn phòng', projectCount: 2, scheduledTasks: 0, unimplemented: 12, reported: 2, unreported: 11, lateReport: 2, lateTasks: 2 },
      { stt: 12, staffName: 'Quản lý Kinh doanh', department: 'Khối Văn phòng', projectCount: 1, scheduledTasks: 0, unimplemented: 8, reported: 0, unreported: 8, lateReport: 0, lateTasks: 0 },
      { stt: 13, staffName: 'Nguyễn Thế Kỳ Anh, Bùi Thị Duyên', department: 'Khối Văn phòng', projectCount: 1, scheduledTasks: 0, unimplemented: 2, reported: 2, unreported: 0, lateReport: 2, lateTasks: 2 },
    ],
  },
  {
    deptName: 'PHÒNG KHAI TRIỂN',
    rows: [
      { stt: 14, staffName: '(Chưa gán)', department: 'Phòng Khai triển', projectCount: 1, scheduledTasks: 0, unimplemented: 49, reported: 0, unreported: 49, lateReport: 0, lateTasks: 0 },
      { stt: 15, staffName: 'Trần Diễm My', department: 'Phòng Khai triển', projectCount: 4, scheduledTasks: 0, unimplemented: 17, reported: 0, unreported: 17, lateReport: 0, lateTasks: 0 },
      { stt: 16, staffName: 'Nguyễn Thiên Hương', department: 'Phòng Khai triển', projectCount: 4, scheduledTasks: 0, unimplemented: 14, reported: 1, unreported: 15, lateReport: 0, lateTasks: 3 },
      { stt: 17, staffName: 'Dương Việt Anh', department: 'Phòng Khai triển', projectCount: 3, scheduledTasks: 1, unimplemented: 8, reported: 1, unreported: 14, lateReport: 0, lateTasks: 6 },
      { stt: 18, staffName: 'Lê Quốc Long', department: 'Phòng Khai triển', projectCount: 3, scheduledTasks: 0, unimplemented: 4, reported: 2, unreported: 6, lateReport: 0, lateTasks: 3 },
      { stt: 19, staffName: 'Đào Văn Thọ', department: 'Phòng Khai triển', projectCount: 2, scheduledTasks: 0, unimplemented: 6, reported: 0, unreported: 6, lateReport: 0, lateTasks: 0 },
      { stt: 20, staffName: 'Phạm Tiến Thành', department: 'Phòng Khai triển', projectCount: 1, scheduledTasks: 1, unimplemented: 3, reported: 1, unreported: 3, lateReport: 0, lateTasks: 0 },
      { stt: 21, staffName: 'Nguyễn Thanh Tuấn', department: 'Phòng Khai triển', projectCount: 1, scheduledTasks: 0, unimplemented: 1, reported: 0, unreported: 1, lateReport: 0, lateTasks: 0 },
    ],
  },
  {
    deptName: 'PHÒNG CẮT',
    rows: [
      { stt: 22, staffName: 'Hoàng Hữu Vinh', department: 'Phòng Cắt', projectCount: 3, scheduledTasks: 0, unimplemented: 52, reported: 0, unreported: 52, lateReport: 0, lateTasks: 2 },
      { stt: 23, staffName: '(Chưa gán)', department: 'Phòng Cắt', projectCount: 1, scheduledTasks: 0, unimplemented: 45, reported: 0, unreported: 45, lateReport: 0, lateTasks: 0 },
      { stt: 24, staffName: 'Nguyễn Tuấn Việt', department: 'Phòng Cắt', projectCount: 3, scheduledTasks: 0, unimplemented: 40, reported: 0, unreported: 40, lateReport: 0, lateTasks: 2 },
      { stt: 25, staffName: 'Lê Trung Hiếu', department: 'Phòng Cắt', projectCount: 5, scheduledTasks: 0, unimplemented: 22, reported: 0, unreported: 22, lateReport: 0, lateTasks: 6 },
      { stt: 26, staffName: 'MÁY CẮT 5 - CMH1610-B-A-2025', department: 'Phòng Cắt', projectCount: 2, scheduledTasks: 0, unimplemented: 5, reported: 0, unreported: 5, lateReport: 0, lateTasks: 4 },
      { stt: 27, staffName: 'MÁY CẮT 2 - CMH1309-B-A-2025', department: 'Phòng Cắt', projectCount: 2, scheduledTasks: 0, unimplemented: 4, reported: 0, unreported: 4, lateReport: 0, lateTasks: 4 },
      { stt: 28, staffName: 'MÁY CẮT 4- CMH1309-B-A-2022', department: 'Phòng Cắt', projectCount: 1, scheduledTasks: 0, unimplemented: 2, reported: 0, unreported: 2, lateReport: 0, lateTasks: 2 },
      { stt: 29, staffName: 'MÁY CẮT 1 - CMH1309-B-A-2025', department: 'Phòng Cắt', projectCount: 1, scheduledTasks: 0, unimplemented: 1, reported: 0, unreported: 1, lateReport: 0, lateTasks: 1 },
    ],
  },
  {
    deptName: 'PHÒNG GHÉP',
    rows: [
      { stt: 30, staffName: 'Đỗ Thị Luyên', department: 'Phòng Ghép', projectCount: 5, scheduledTasks: 0, unimplemented: 61, reported: 1, unreported: 60, lateReport: 1, lateTasks: 7 },
      { stt: 31, staffName: 'Đinh Đức Lợi', department: 'Phòng Ghép', projectCount: 4, scheduledTasks: 0, unimplemented: 58, reported: 0, unreported: 58, lateReport: 0, lateTasks: 8 },
      { stt: 32, staffName: 'Nguyễn Hoàng Phi Hùng', department: 'Phòng Ghép', projectCount: 5, scheduledTasks: 0, unimplemented: 38, reported: 1, unreported: 37, lateReport: 1, lateTasks: 8 },
      { stt: 33, staffName: 'Đặng Văn Điệp', department: 'Phòng Ghép', projectCount: 1, scheduledTasks: 0, unimplemented: 17, reported: 0, unreported: 17, lateReport: 0, lateTasks: 0 },
      { stt: 34, staffName: 'Lường Ngọc Thành', department: 'Phòng Ghép', projectCount: 2, scheduledTasks: 2, unimplemented: 8, reported: 2, unreported: 8, lateReport: 1, lateTasks: 0 },
      { stt: 35, staffName: 'Nguyễn Tuân', department: 'Phòng Ghép', projectCount: 3, scheduledTasks: 0, unimplemented: 5, reported: 0, unreported: 5, lateReport: 0, lateTasks: 0 },
      { stt: 36, staffName: 'Bùi Ngọc Sỹ', department: 'Phòng Ghép', projectCount: 3, scheduledTasks: 0, unimplemented: 3, reported: 2, unreported: 2, lateReport: 1, lateTasks: 2 },
      { stt: 37, staffName: 'Đặng Văn Điệp (BTG)', department: 'Phòng Ghép', projectCount: 1, scheduledTasks: 0, unimplemented: 3, reported: 0, unreported: 3, lateReport: 0, lateTasks: 3 },
      { stt: 38, staffName: 'Nguyễn Quang Lợi (BTG)', department: 'Phòng Ghép', projectCount: 1, scheduledTasks: 0, unimplemented: 3, reported: 0, unreported: 3, lateReport: 0, lateTasks: 3 },
      { stt: 39, staffName: 'Nguyễn Thị Quỳnh Châu (BTG)', department: 'Phòng Ghép', projectCount: 1, scheduledTasks: 0, unimplemented: 3, reported: 0, unreported: 3, lateReport: 0, lateTasks: 3 },
      { stt: 40, staffName: 'Nguyễn Thị Lanh', department: 'Phòng Ghép', projectCount: 2, scheduledTasks: 0, unimplemented: 3, reported: 1, unreported: 2, lateReport: 0, lateTasks: 1 },
      { stt: 41, staffName: 'Thân Thị Nguyệt (BTG)', department: 'Phòng Ghép', projectCount: 1, scheduledTasks: 0, unimplemented: 2, reported: 0, unreported: 2, lateReport: 0, lateTasks: 2 },
      { stt: 42, staffName: 'Đinh Đức Lợi, Nguyễn Hoàng Phi Hùng', department: 'Phòng Ghép', projectCount: 1, scheduledTasks: 0, unimplemented: 2, reported: 0, unreported: 2, lateReport: 0, lateTasks: 0 },
      { stt: 43, staffName: 'Vũ Thị Hà Ly (BTG)', department: 'Phòng Ghép', projectCount: 1, scheduledTasks: 0, unimplemented: 1, reported: 0, unreported: 1, lateReport: 0, lateTasks: 1 },
      { stt: 44, staffName: 'Nguyễn Chí Hiếu', department: 'Phòng Ghép', projectCount: 1, scheduledTasks: 1, unimplemented: 0, reported: 2, unreported: 0, lateReport: 1, lateTasks: 1 },
    ],
  },
  {
    deptName: 'PHÒNG MỘC SƠN',
    rows: [
      { stt: 45, staffName: 'Hoàng Quyết Thắng', department: 'Phòng Mộc Sơn', projectCount: 5, scheduledTasks: 0, unimplemented: 93, reported: 4, unreported: 89, lateReport: 0, lateTasks: 0 },
      { stt: 46, staffName: 'Đinh Hữu Sử', department: 'Phòng Mộc Sơn', projectCount: 6, scheduledTasks: 0, unimplemented: 48, reported: 2, unreported: 47, lateReport: 0, lateTasks: 2 },
      { stt: 47, staffName: 'Quan Minh Hoàng', department: 'Phòng Mộc Sơn', projectCount: 6, scheduledTasks: 0, unimplemented: 44, reported: 1, unreported: 43, lateReport: 0, lateTasks: 1 },
      { stt: 48, staffName: 'Nguyễn Minh Hiếu', department: 'Phòng Mộc Sơn', projectCount: 8, scheduledTasks: 0, unimplemented: 30, reported: 4, unreported: 30, lateReport: 1, lateTasks: 5 },
      { stt: 49, staffName: 'Đinh Hữu Sử, Nguyễn Minh Hiếu', department: 'Phòng Mộc Sơn', projectCount: 1, scheduledTasks: 0, unimplemented: 8, reported: 0, unreported: 8, lateReport: 0, lateTasks: 0 },
      { stt: 50, staffName: 'Nguyễn Minh Hiếu, Đinh Hữu Sử', department: 'Phòng Mộc Sơn', projectCount: 1, scheduledTasks: 0, unimplemented: 1, reported: 0, unreported: 1, lateReport: 0, lateTasks: 0 },
    ],
  },
  {
    deptName: 'PHÒNG ĐIỆN',
    rows: [
      { stt: 51, staffName: 'Hà Tùng Lâm', department: 'Phòng Điện', projectCount: 5, scheduledTasks: 0, unimplemented: 58, reported: 0, unreported: 58, lateReport: 0, lateTasks: 0 },
      { stt: 52, staffName: 'Lâm Vĩnh Hưng', department: 'Phòng Điện', projectCount: 4, scheduledTasks: 0, unimplemented: 29, reported: 1, unreported: 28, lateReport: 1, lateTasks: 1 },
      { stt: 53, staffName: 'Bùi Văn Lộc', department: 'Phòng Điện', projectCount: 2, scheduledTasks: 1, unimplemented: 16, reported: 1, unreported: 16, lateReport: 0, lateTasks: 0 },
      { stt: 54, staffName: 'Phạm Văn Trọng', department: 'Phòng Điện', projectCount: 2, scheduledTasks: 0, unimplemented: 16, reported: 0, unreported: 16, lateReport: 0, lateTasks: 0 },
      { stt: 55, staffName: '(Chưa gán)', department: 'Phòng Điện', projectCount: 2, scheduledTasks: 0, unimplemented: 8, reported: 0, unreported: 8, lateReport: 0, lateTasks: 0 },
      { stt: 56, staffName: 'Nguyễn Anh Đức, Hà Tùng Lâm', department: 'Phòng Điện', projectCount: 2, scheduledTasks: 0, unimplemented: 2, reported: 0, unreported: 2, lateReport: 0, lateTasks: 0 },
      { stt: 57, staffName: 'Đinh Quang Huy, Nguyễn Đức Huy', department: 'Phòng Điện', projectCount: 2, scheduledTasks: 0, unimplemented: 2, reported: 0, unreported: 2, lateReport: 0, lateTasks: 0 },
    ],
  },
  {
    deptName: 'PHÒNG CẢNH QUAN',
    rows: [
      { stt: 58, staffName: 'Phạm Thị Thu Trang', department: 'Phòng Cảnh Quan', projectCount: 6, scheduledTasks: 0, unimplemented: 56, reported: 0, unreported: 56, lateReport: 0, lateTasks: 0 },
      { stt: 59, staffName: 'Vũ Minh Hằng', department: 'Phòng Cảnh Quan', projectCount: 5, scheduledTasks: 0, unimplemented: 41, reported: 0, unreported: 41, lateReport: 0, lateTasks: 5 },
      { stt: 60, staffName: 'Đỗ Ngọc Duyên', department: 'Phòng Cảnh Quan', projectCount: 3, scheduledTasks: 0, unimplemented: 40, reported: 0, unreported: 40, lateReport: 0, lateTasks: 0 },
      { stt: 61, staffName: 'Sầm Thị Thúy', department: 'Phòng Cảnh Quan', projectCount: 3, scheduledTasks: 0, unimplemented: 39, reported: 1, unreported: 38, lateReport: 1, lateTasks: 1 },
      { stt: 62, staffName: 'Nguyễn Thị Hồng Ngọc', department: 'Phòng Cảnh Quan', projectCount: 4, scheduledTasks: 0, unimplemented: 30, reported: 0, unreported: 30, lateReport: 0, lateTasks: 10 },
      { stt: 63, staffName: 'Nguyễn Thị Hương', department: 'Phòng Cảnh Quan', projectCount: 4, scheduledTasks: 0, unimplemented: 26, reported: 0, unreported: 26, lateReport: 0, lateTasks: 0 },
      { stt: 64, staffName: 'Tống Thị Thu', department: 'Phòng Cảnh Quan', projectCount: 3, scheduledTasks: 0, unimplemented: 12, reported: 0, unreported: 12, lateReport: 0, lateTasks: 0 },
      { stt: 65, staffName: 'Nguyễn Thị Hồng Ngọc', department: 'Phòng Cảnh Quan', projectCount: 1, scheduledTasks: 0, unimplemented: 10, reported: 0, unreported: 10, lateReport: 0, lateTasks: 0 },
      { stt: 66, staffName: '(Chưa gán)', department: 'Phòng Cảnh Quan', projectCount: 2, scheduledTasks: 0, unimplemented: 8, reported: 0, unreported: 8, lateReport: 0, lateTasks: 0 },
      { stt: 67, staffName: 'Nguyễn Ngọc Lan Anh', department: 'Phòng Cảnh Quan', projectCount: 4, scheduledTasks: 0, unimplemented: 6, reported: 1, unreported: 5, lateReport: 1, lateTasks: 4 },
      { stt: 68, staffName: 'Phan Thị Hồng Ngọc', department: 'Phòng Cảnh Quan', projectCount: 2, scheduledTasks: 0, unimplemented: 6, reported: 0, unreported: 6, lateReport: 0, lateTasks: 0 },
      { stt: 69, staffName: 'Hoàng Quyết Thắng', department: 'Phòng Cảnh Quan', projectCount: 3, scheduledTasks: 0, unimplemented: 5, reported: 0, unreported: 5, lateReport: 0, lateTasks: 1 },
      { stt: 70, staffName: 'Phạm Thu Trà', department: 'Phòng Cảnh Quan', projectCount: 2, scheduledTasks: 0, unimplemented: 4, reported: 0, unreported: 4, lateReport: 0, lateTasks: 0 },
      { stt: 71, staffName: 'Bùi Thị Thu An', department: 'Phòng Cảnh Quan', projectCount: 2, scheduledTasks: 0, unimplemented: 4, reported: 0, unreported: 4, lateReport: 0, lateTasks: 0 },
    ],
  },
  {
    deptName: 'PHÒNG CÔNG NGHỆ VÀ THIẾT KẾ',
    rows: [
      { stt: 72, staffName: 'Cao Trường Thiên', department: 'Phòng Công nghệ và Thiết kế', projectCount: 8, scheduledTasks: 0, unimplemented: 25, reported: 1, unreported: 25, lateReport: 0, lateTasks: 3 },
      { stt: 73, staffName: 'Hà Tùng Lâm', department: 'Phòng Công nghệ và Thiết kế', projectCount: 1, scheduledTasks: 0, unimplemented: 18, reported: 0, unreported: 18, lateReport: 0, lateTasks: 0 },
      { stt: 74, staffName: 'Nguyễn Quang Triệu', department: 'Phòng Công nghệ và Thiết kế', projectCount: 6, scheduledTasks: 0, unimplemented: 13, reported: 2, unreported: 13, lateReport: 2, lateTasks: 3 },
      { stt: 75, staffName: 'Nguyễn Quang Linh', department: 'Phòng Công nghệ và Thiết kế', projectCount: 8, scheduledTasks: 0, unimplemented: 12, reported: 0, unreported: 13, lateReport: 0, lateTasks: 2 },
      { stt: 76, staffName: 'Lưu Quốc Nhật', department: 'Phòng Công nghệ và Thiết kế', projectCount: 7, scheduledTasks: 0, unimplemented: 12, reported: 0, unreported: 12, lateReport: 0, lateTasks: 0 },
      { stt: 77, staffName: 'Tạ Hiển Trang', department: 'Phòng Công nghệ và Thiết kế', projectCount: 8, scheduledTasks: 1, unimplemented: 6, reported: 2, unreported: 8, lateReport: 1, lateTasks: 1 },
      { stt: 78, staffName: 'Phạm Văn Trọng', department: 'Phòng Công nghệ và Thiết kế', projectCount: 1, scheduledTasks: 0, unimplemented: 8, reported: 0, unreported: 8, lateReport: 0, lateTasks: 0 },
      { stt: 79, staffName: '(Chưa gán)', department: 'Phòng Công nghệ và Thiết kế', projectCount: 1, scheduledTasks: 0, unimplemented: 4, reported: 0, unreported: 4, lateReport: 0, lateTasks: 0 },
      { stt: 80, staffName: 'Lâm Vĩnh Hưng', department: 'Phòng Công nghệ và Thiết kế', projectCount: 1, scheduledTasks: 0, unimplemented: 3, reported: 0, unreported: 3, lateReport: 0, lateTasks: 0 },
      { stt: 81, staffName: 'Lưu Quốc Nhất', department: 'Phòng Công nghệ và Thiết kế', projectCount: 1, scheduledTasks: 0, unimplemented: 2, reported: 0, unreported: 2, lateReport: 0, lateTasks: 0 },
      { stt: 82, staffName: 'Nguyễn Anh Đức, Hà Tùng Lâm', department: 'Phòng Công nghệ và Thiết kế', projectCount: 1, scheduledTasks: 0, unimplemented: 1, reported: 0, unreported: 1, lateReport: 0, lateTasks: 0 },
      { stt: 83, staffName: 'Đinh Quang Huy, Nguyễn Đức Huy', department: 'Phòng Công nghệ và Thiết kế', projectCount: 1, scheduledTasks: 0, unimplemented: 1, reported: 0, unreported: 1, lateReport: 0, lateTasks: 0 },
    ],
  },
];

export default function BaoCaoChoDuyet() {
  const [search, setSearch] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<StaffReportModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleOpenModal = (staff: StaffReportModalData) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  // Flatten all rows
  const allFlattenedRows = useMemo(() => {
    const list: StaffWarningRow[] = [];
    MOCK_WARNING_GROUPS.forEach((g) => {
      g.rows.forEach((r) => {
        list.push(r);
      });
    });
    return list;
  }, []);

  const filteredRows = useMemo(() => {
    if (!search.trim()) return allFlattenedRows;
    const term = search.toLowerCase();
    return allFlattenedRows.filter(
      (r) =>
        r.staffName.toLowerCase().includes(term) ||
        r.department.toLowerCase().includes(term)
    );
  }, [allFlattenedRows, search]);

  const totalFiltered = filteredRows.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFiltered);
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2 overflow-hidden select-none text-left">
      {/* SEARCH BAR */}
      <div className="relative shrink-0">
        <IconSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Tìm theo nhân sự, phòng ban..."
          className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200/80 rounded-lg text-[11px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
        />
      </div>

      {/* TABLE WITH ACTION EYE ICON AND MODAL */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[980px]">
            <thead className="sticky top-0 z-10 bg-[#f8fafc] shadow-2xs border-b border-slate-200">
              <tr className="text-slate-600 font-bold text-[11px]">
                <th className="px-3 py-2.5 border-b border-slate-200 w-20 text-center">Hành động</th>
                <th className="px-3 py-2.5 border-b border-slate-200 w-12 text-center">STT</th>
                <th className="px-3 py-2.5 border-b border-slate-200">Nhân sự</th>
                <th className="px-3 py-2.5 border-b border-slate-200">Phòng ban</th>
                <th className="px-3 py-2.5 border-b border-slate-200 text-right w-20">Số dự án</th>
                <th className="px-3 py-2.5 border-b border-slate-200 text-right w-24 text-[#059669]">CV theo lịch</th>
                <th className="px-3 py-2.5 border-b border-slate-200 text-right w-28 text-[#d97706]">Chưa triển khai</th>
                <th className="px-3 py-2.5 border-b border-slate-200 text-right w-24 text-[#059669]">Đã báo cáo</th>
                <th className="px-3 py-2.5 border-b border-slate-200 text-right w-28 text-[#dc2626]">Chưa báo cáo</th>
                <th className="px-3 py-2.5 border-b border-slate-200 text-right w-24 text-[#d97706]">Báo cáo trễ</th>
                <th className="px-3 py-2.5 border-b border-slate-200 text-right w-20 text-[#b91c1c]">CV trễ</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-8 text-slate-400 text-xs">
                    Không tìm thấy nhân sự phù hợp.
                  </td>
                </tr>
              ) : (
                paginatedRows.map((row) => (
                  <tr 
                    key={row.stt} 
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    onClick={() => handleOpenModal(row)}
                  >
                    {/* Cột Hành động: Icon Mắt (IconEye) */}
                    <td className="px-3 py-2.5 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(row);
                        }}
                        className="p-1 rounded-md text-[#406c89] hover:bg-sky-100/70 transition-colors shrink-0 cursor-pointer inline-flex items-center justify-center"
                        title="Xem chi tiết báo cáo"
                      >
                        <IconEye size={15} />
                      </button>
                    </td>

                    {/* STT */}
                    <td className="px-3 py-2.5 text-center text-slate-500 font-medium text-[11px]">
                      {row.stt}
                    </td>

                    {/* Nhân sự */}
                    <td className="px-3 py-2.5 font-bold text-slate-800 text-[11px] group-hover:text-[#406c89] transition-colors">
                      {row.staffName}
                    </td>

                    {/* Phòng ban (Italic font) */}
                    <td className="px-3 py-2.5 text-slate-500 italic text-[11px]">
                      {row.department}
                    </td>

                    {/* Số dự án */}
                    <td className="px-3 py-2.5 text-right font-semibold text-slate-800 text-[11px]">
                      {row.projectCount}
                    </td>

                    {/* CV theo lịch (Green) */}
                    <td className="px-3 py-2.5 text-right font-medium text-[#059669] text-[11px]">
                      {row.scheduledTasks}
                    </td>

                    {/* Chưa triển khai (Clock icon + Amber text) */}
                    <td className="px-3 py-2.5 text-right font-medium text-[#d97706] text-[11px]">
                      {row.unimplemented > 0 ? (
                        <span className="inline-flex items-center justify-end gap-1">
                          <IconClock size={12} className="text-[#d97706] shrink-0" />
                          <span>{row.unimplemented}</span>
                        </span>
                      ) : (
                        '0'
                      )}
                    </td>

                    {/* Đã báo cáo (Green) */}
                    <td className="px-3 py-2.5 text-right font-medium text-[#059669] text-[11px]">
                      {row.reported}
                    </td>

                    {/* Chưa báo cáo (Triangle Warning icon + Rose text) */}
                    <td className="px-3 py-2.5 text-right font-medium text-[#dc2626] text-[11px]">
                      {row.unreported > 0 ? (
                        <span className="inline-flex items-center justify-end gap-1">
                          <IconAlertTriangle size={12} className="text-[#dc2626] shrink-0" />
                          <span>{row.unreported}</span>
                        </span>
                      ) : (
                        '0'
                      )}
                    </td>

                    {/* Báo cáo trễ (Amber) */}
                    <td className="px-3 py-2.5 text-right font-medium text-[#d97706] text-[11px]">
                      {row.lateReport}
                    </td>

                    {/* CV trễ (Bold Rose/Red) */}
                    <td className="px-3 py-2.5 text-right font-bold text-[#b91c1c] text-[11px]">
                      {row.lateTasks}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div>
            Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalFiltered}</span> nhân sự
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

      {/* MODAL COMPONENT */}
      <ChiTietBaoCaoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        staff={selectedStaff}
      />
    </div>
  );
}
