"use client";

import React, { useState, useMemo } from 'react';
import {
  IconSearch,
  IconFilter,
  IconFlag,
  IconRotate,
  IconFolder,
  IconEye,
} from '@tabler/icons-react';
import { ProjectReportGroup, ReportItem } from './types';
import DanhSachBaoCaoModal from './modal/DanhSachBaoCaoModal';
import ChiTietBaoCaoModal from './modal/ChiTietBaoCaoModal';

// Dữ liệu 14 dự án theo đúng hình ảnh (Tổng 115 báo cáo · Mốc nghiệm thu 80%)
const PROJECTS_DATA: ProjectReportGroup[] = [
  {
    id: 'p1',
    name: 'VSIP LẠNG SƠN',
    reportCount: 8,
    totalHours: '4692.2h',
    reports: [
      {
        id: 'p1-1',
        department: 'Ban Giám đốc',
        date: '28/07/2026',
        reporter: 'Thảo Phùng',
        quantity: '17',
        hours: '19h',
        progressPct: '100%',
        status: 'BGĐ đã duyệt',
        approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)',
      },
      {
        id: 'p1-2',
        department: 'Phòng Khai triển',
        date: '03/08/2026',
        reporter: 'Trần Diễm My',
        quantity: '35',
        hours: '168.5h',
        progressPct: '100%',
        status: 'BGĐ đã duyệt',
        approvedBy: 'Duyệt bởi: Thảo Phùng (03/08/2026)',
      },
      {
        id: 'p1-3',
        department: 'Phòng Cắt',
        date: '06/08/2026',
        reporter: 'Hoàng Hữu Vinh',
        quantity: '39',
        hours: '216h',
        progressPct: '100%',
        status: 'BGĐ đã duyệt',
        approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)',
      },
      {
        id: 'p1-4',
        department: 'Phòng Ghép',
        date: '04/08/2026',
        reporter: 'Định Đức Lợi',
        quantity: '1542',
        hours: '848.5h',
        progressPct: '100%',
        photoCount: 3,
        status: 'BGĐ đã duyệt',
        approvedBy: 'Duyệt bởi: Thao B Phung (05/08/2026)',
      },
      {
        id: 'p1-5',
        department: 'Phòng Điện',
        date: '04/08/2026',
        reporter: 'Bùi Văn Lộc',
        quantity: '11177',
        hours: '253h',
        progressPct: '100%',
        status: 'BGĐ đã duyệt',
        approvedBy: 'Duyệt bởi: Thao B Phung (05/08/2026)',
      },
      {
        id: 'p1-6',
        department: 'Phòng Cảnh Quan',
        date: '05/08/2026',
        reporter: 'Phạm Thị Thu Trang',
        quantity: '34553.5',
        hours: '790.1h',
        progressPct: '100%',
        photoCount: 2,
        status: 'BGĐ đã duyệt',
        approvedBy: 'Duyệt bởi: Thao B Phung (05/08/2026)',
      },
      {
        id: 'p1-7',
        department: 'Phòng Công nghệ và Thiết kế',
        date: '31/10/2026',
        reporter: 'congnghevathietke.mhv',
        quantity: '10',
        hours: '51h',
        progressPct: '100%',
        status: 'BGĐ đã duyệt',
        approvedBy: 'Duyệt bởi: Trần Diễm My (31/10/2026)',
      },
      {
        id: 'p1-8',
        department: 'Toàn dự án',
        date: '31/10/2026',
        reporter: 'Hệ thống (tổng hợp tự động)',
        quantity: '47373.5',
        hours: '2346.1h',
        progressPct: '100%',
        status: 'BGĐ đã duyệt',
        approvedBy: 'Duyệt bởi: Hệ thống (31/10/2026)',
      },
    ],
  },
  {
    id: 'p2',
    name: 'THE HERITAGE TÂY NINH - Lắp đặt tại Tây Ninh',
    reportCount: 9,
    totalHours: '4898.0h',
    reports: [
      { id: 'p2-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 22900, hours: '1885h', progressPct: '93%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p2-2', department: 'Phòng Cắt', date: '06/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 736, hours: '256h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)' },
      { id: 'p2-3', department: 'Phòng Cảnh Quan', date: '06/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 17622, hours: '642.5h', progressPct: '94%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)', photoCount: 4 },
      { id: 'p2-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Bùi Ngọc Sỹ', quantity: 767, hours: '744.5h', progressPct: '95%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)', photoCount: 2 },
      { id: 'p2-5', department: 'Phòng Điện', date: '04/08/2026', reporter: 'Bùi Văn Lộc', quantity: 3755, hours: '209h', progressPct: '89%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p2-6', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 20, hours: '33h', progressPct: '92%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p2-7', department: 'Phòng Mộc Sơn', date: '02/08/2026', reporter: 'Nguyễn Văn Đạt', quantity: 412, hours: '520h', progressPct: '91%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (03/08/2026)' },
      { id: 'p2-8', department: 'Phòng Thiết Kế', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 65, hours: '348h', progressPct: '94%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)' },
      { id: 'p2-9', department: 'Khối Văn phòng', date: '30/07/2026', reporter: 'Trần Diễm My', quantity: 15, hours: '260h', progressPct: '95%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Ban Giám Đốc (01/08/2026)' },
    ],
  },
  {
    id: 'p3',
    name: 'THE HERITAGE TÂY NINH - Lắp đặt tại Hà Nội',
    reportCount: 9,
    totalHours: '6308.9h',
    reports: [
      { id: 'p3-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 33923, hours: '2785.1h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p3-2', department: 'Phòng Cắt', date: '06/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 687, hours: '282h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)' },
      { id: 'p3-3', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Bùi Ngọc Sỹ', quantity: 647, hours: '747.5h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)', photoCount: 3 },
      { id: 'p3-4', department: 'Phòng Điện', date: '04/08/2026', reporter: 'Bùi Văn Lộc', quantity: 18311, hours: '682h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p3-5', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 115, hours: '579.1h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p3-6', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 14163, hours: '494.5h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)', photoCount: 5 },
      { id: 'p3-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Phạm Đức Huy', quantity: 350, hours: '412h', progressPct: '95%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)' },
      { id: 'p3-8', department: 'Khối Quản Lý Dự Án', date: '31/07/2026', reporter: 'Vũ Minh Tuấn', quantity: 45, hours: '186.7h', progressPct: '92%', status: 'Trả lại điều chỉnh', approvedBy: 'Cần bổ sung hình ảnh nghiệm thu thực tế' },
      { id: 'p3-9', department: 'Ban Giám đốc', date: '30/07/2026', reporter: 'Thảo Phùng', quantity: 12, hours: '140h', progressPct: '98%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (31/07/2026)' },
    ],
  },
  {
    id: 'p4',
    name: 'HERITAGE VILLAGE MOC CHAU',
    reportCount: 7,
    totalHours: '3847.0h',
    reports: [
      { id: 'p4-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 15250, hours: '1878.5h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p4-2', department: 'Phòng Cắt', date: '06/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 557, hours: '428h', progressPct: '95%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)' },
      { id: 'p4-3', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Định Đức Lợi', quantity: 667, hours: '474h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)', photoCount: 2 },
      { id: 'p4-4', department: 'Phòng Điện', date: '04/08/2026', reporter: 'Bùi Văn Lộc', quantity: 3936, hours: '169h', progressPct: '94%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p4-5', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 58, hours: '440.5h', progressPct: '98%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (03/08/2026)' },
      { id: 'p4-6', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 10032, hours: '367h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)', photoCount: 3 },
      { id: 'p4-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Phạm Đức Huy', quantity: 120, hours: '90h', progressPct: '92%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (02/08/2026)' },
    ],
  },
  {
    id: 'p5',
    name: 'CHỈNH SỬA MÔ HÌNH L\'AURORA',
    reportCount: 8,
    totalHours: '3115.0h',
    reports: [
      { id: 'p5-1', department: 'Toàn dự án', date: '05/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 2970, hours: '1461.5h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (05/08/2026)' },
      { id: 'p5-2', department: 'Phòng Điện', date: '04/08/2026', reporter: 'Lâm Vĩnh Hưng', quantity: 296, hours: '88h', progressPct: '94%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p5-3', department: 'Phòng Cắt', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 65, hours: '284h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p5-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Định Đức Lợi', quantity: 129, hours: '544h', progressPct: '99%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p5-5', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 2408, hours: '199h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)', photoCount: 2 },
      { id: 'p5-6', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 72, hours: '346.5h', progressPct: '98%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p5-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 95, hours: '112h', progressPct: '91%', status: 'Trả lại điều chỉnh', approvedBy: 'Yêu cầu phối màu lại theo mã vật liệu mới' },
      { id: 'p5-8', department: 'Ban Giám đốc', date: '30/07/2026', reporter: 'Thảo Phùng', quantity: 14, hours: '80h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (31/07/2026)' },
    ],
  },
  {
    id: 'p6',
    name: '22 LIỄU GIAI',
    reportCount: 8,
    totalHours: '6096.0h',
    reports: [
      { id: 'p6-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 7337, hours: '2857.5h', progressPct: '99%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p6-2', department: 'Phòng Điện', date: '04/08/2026', reporter: 'Lâm Vĩnh Hưng', quantity: 1513, hours: '260h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p6-3', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Bùi Ngọc Sỹ', quantity: 500.5, hours: '1255h', progressPct: '99%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)', photoCount: 4 },
      { id: 'p6-4', department: 'Phòng Cắt', date: '06/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 989, hours: '304h', progressPct: '98%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)' },
      { id: 'p6-5', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 84, hours: '630.5h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p6-6', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 4250.5, hours: '408h', progressPct: '98%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p6-7', department: 'Phòng Mộc Sơn', date: '02/08/2026', reporter: 'Nguyễn Văn Đạt', quantity: 210, hours: '261h', progressPct: '95%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (03/08/2026)' },
      { id: 'p6-8', department: 'Khối Văn phòng', date: '31/07/2026', reporter: 'Trần Diễm My', quantity: 28, hours: '120h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: BGĐ (01/08/2026)' },
    ],
  },
  {
    id: 'p7',
    name: 'CHỈNH SỬA MÔ HÌNH NEWEB',
    reportCount: 8,
    totalHours: '453.0h',
    reports: [
      { id: 'p7-1', department: 'Phòng Khai triển', date: '05/08/2026', reporter: 'Trần Diễm My', quantity: 22.5, hours: '40h', progressPct: '83%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p7-2', department: 'Toàn dự án', date: '05/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 22.5, hours: '40h', progressPct: '83%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (05/08/2026)' },
      { id: 'p7-3', department: 'Phòng Cắt', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 18, hours: '55h', progressPct: '88%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p7-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Định Đức Lợi', quantity: 34, hours: '125h', progressPct: '86%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p7-5', department: 'Phòng Điện', date: '03/08/2026', reporter: 'Lâm Vĩnh Hưng', quantity: 45, hours: '62h', progressPct: '85%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (04/08/2026)' },
      { id: 'p7-6', department: 'Phòng Cảnh Quan', date: '02/08/2026', reporter: 'Đỗ Thùy Linh', quantity: 80, hours: '75h', progressPct: '89%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (03/08/2026)' },
      { id: 'p7-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 15, hours: '36h', progressPct: '82%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)' },
      { id: 'p7-8', department: 'Khối Văn phòng', date: '30/07/2026', reporter: 'Trần Diễm My', quantity: 10, hours: '20h', progressPct: '90%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: BGĐ (31/07/2026)' },
    ],
  },
  {
    id: 'p8',
    name: 'CHỈNH SỬA 02 MÔ HÌNH QUY HOẠCH ECOPARK VINH TỶ LỆ 1-500 & 1-2000',
    reportCount: 7,
    totalHours: '2785.0h',
    reports: [
      { id: 'p8-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 1420, hours: '1280h', progressPct: '94%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p8-2', department: 'Phòng Khai triển', date: '05/08/2026', reporter: 'Trần Diễm My', quantity: 65, hours: '320h', progressPct: '95%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (05/08/2026)' },
      { id: 'p8-3', department: 'Phòng Cắt CNC', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 110, hours: '215h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p8-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Phạm Đức Huy', quantity: 240, hours: '480h', progressPct: '92%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)', photoCount: 3 },
      { id: 'p8-5', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Đỗ Thùy Linh', quantity: 450, hours: '290h', progressPct: '91%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (04/08/2026)' },
      { id: 'p8-6', department: 'Phòng Điện', date: '02/08/2026', reporter: 'Lâm Vĩnh Hưng', quantity: 85, hours: '120h', progressPct: '93%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (03/08/2026)' },
      { id: 'p8-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 45, hours: '80h', progressPct: '87%', status: 'Trả lại điều chỉnh', approvedBy: 'Màu nền hồ nước cần nhạt hơn theo thiết kế' },
    ],
  },
  {
    id: 'p9',
    name: '03 MÔ HÌNH ĐẢO CHÂU ÂU THUỘC DỰ ÁN ECO CENTRAL PARK VINH',
    reportCount: 7,
    totalHours: '6142.0h',
    reports: [
      { id: 'p9-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 8900, hours: '2950h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p9-2', department: 'Phòng Ghép', date: '05/08/2026', reporter: 'Bùi Ngọc Sỹ', quantity: 680, hours: '1350h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)', photoCount: 4 },
      { id: 'p9-3', department: 'Phòng Cảnh Quan', date: '05/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 4520, hours: '820h', progressPct: '98%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)', photoCount: 3 },
      { id: 'p9-4', department: 'Phòng Cắt CNC', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 430, hours: '380h', progressPct: '98%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p9-5', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 82, hours: '392h', progressPct: '95%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (04/08/2026)' },
      { id: 'p9-6', department: 'Phòng Điện', date: '02/08/2026', reporter: 'Bùi Văn Lộc', quantity: 820, hours: '170h', progressPct: '94%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (03/08/2026)' },
      { id: 'p9-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 120, hours: '80h', progressPct: '93%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Ban Giám Đốc (02/08/2026)' },
    ],
  },
  {
    id: 'p10',
    name: 'MÔ HÌNH GIÁM TUYỂN ART VIETNAM GALLERY',
    reportCount: 9,
    totalHours: '1595.0h',
    reports: [
      { id: 'p10-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 650, hours: '720h', progressPct: '95%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p10-2', department: 'Phòng Khai triển', date: '05/08/2026', reporter: 'Trần Diễm My', quantity: 24, hours: '185h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (05/08/2026)' },
      { id: 'p10-3', department: 'Phòng Cắt', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 45, hours: '110h', progressPct: '98%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p10-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Định Đức Lợi', quantity: 85, hours: '260h', progressPct: '94%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p10-5', department: 'Phòng Điện', date: '03/08/2026', reporter: 'Lâm Vĩnh Hưng', quantity: 60, hours: '95h', progressPct: '92%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (04/08/2026)' },
      { id: 'p10-6', department: 'Phòng Cảnh Quan', date: '02/08/2026', reporter: 'Đỗ Thùy Linh', quantity: 120, hours: '115h', progressPct: '95%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (03/08/2026)' },
      { id: 'p10-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 30, hours: '50h', progressPct: '90%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)' },
      { id: 'p10-8', department: 'Thiết Kế Đồ Họa', date: '31/07/2026', reporter: 'Vũ Minh Tuấn', quantity: 18, hours: '35h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (01/08/2026)' },
      { id: 'p10-9', department: 'Khối Văn phòng', date: '30/07/2026', reporter: 'Trần Diễm My', quantity: 8, hours: '25h', progressPct: '95%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: BGĐ (31/07/2026)' },
    ],
  },
  {
    id: 'p11',
    name: 'QUY HOẠCH TỈNH HƯNG YÊN',
    reportCount: 7,
    totalHours: '2774.0h',
    reports: [
      { id: 'p11-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 2150, hours: '1350h', progressPct: '98%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p11-2', department: 'Phòng Khai triển', date: '05/08/2026', reporter: 'Trần Diễm My', quantity: 45, hours: '290h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (05/08/2026)' },
      { id: 'p11-3', department: 'Phòng Cắt', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 95, hours: '220h', progressPct: '99%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p11-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Bùi Ngọc Sỹ', quantity: 180, hours: '514h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p11-5', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 820, hours: '240h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (04/08/2026)' },
      { id: 'p11-6', department: 'Phòng Điện', date: '02/08/2026', reporter: 'Lâm Vĩnh Hưng', quantity: 65, hours: '90h', progressPct: '94%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (03/08/2026)' },
      { id: 'p11-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 35, hours: '70h', progressPct: '89%', status: 'Trả lại điều chỉnh', approvedBy: 'Chỉnh độ bóng của mica phủ bề mặt' },
    ],
  },
  {
    id: 'p12',
    name: 'MODEL VIETTEL THANG LONG 1&2',
    reportCount: 8,
    totalHours: '2803.0h',
    reports: [
      { id: 'p12-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 1850, hours: '1380h', progressPct: '98%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p12-2', department: 'Phòng Khai triển', date: '05/08/2026', reporter: 'Trần Diễm My', quantity: 50, hours: '245h', progressPct: '98%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (05/08/2026)' },
      { id: 'p12-3', department: 'Phòng Cắt Laser', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 120, hours: '230h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p12-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Phạm Đức Huy', quantity: 210, hours: '490h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p12-5', department: 'Phòng Điện Tử LED', date: '03/08/2026', reporter: 'Bùi Văn Lộc', quantity: 380, hours: '190h', progressPct: '95%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (04/08/2026)' },
      { id: 'p12-6', department: 'Phòng Cảnh Quan', date: '02/08/2026', reporter: 'Đỗ Thùy Linh', quantity: 450, hours: '148h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (03/08/2026)' },
      { id: 'p12-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 40, hours: '75h', progressPct: '92%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)' },
      { id: 'p12-8', department: 'Khối Văn phòng', date: '30/07/2026', reporter: 'Trần Diễm My', quantity: 15, hours: '45h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: BGĐ (31/07/2026)' },
    ],
  },
  {
    id: 'p13',
    name: 'DỰ ÁN KHU DÂN CƯ PHƯỚC THỌ',
    reportCount: 11,
    totalHours: '6230.7h',
    reports: [
      { id: 'p13-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 28400, hours: '2890.7h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p13-2', department: 'Phòng Khai triển', date: '05/08/2026', reporter: 'Trần Diễm My', quantity: 95, hours: '520h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (05/08/2026)' },
      { id: 'p13-3', department: 'Phòng Cắt CNC', date: '05/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 512, hours: '390h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p13-4', department: 'Phòng Ghép Phân Khu 1', date: '04/08/2026', reporter: 'Bùi Ngọc Sỹ', quantity: 410, hours: '680h', progressPct: '95%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p13-5', department: 'Phòng Ghép Phân Khu 2', date: '04/08/2026', reporter: 'Định Đức Lợi', quantity: 380, hours: '610h', progressPct: '94%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p13-6', department: 'Phòng Cảnh Quan Ven Sông', date: '03/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 8400, hours: '450h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (04/08/2026)', photoCount: 4 },
      { id: 'p13-7', department: 'Phòng Cảnh Quan Nội Khu', date: '03/08/2026', reporter: 'Đỗ Thùy Linh', quantity: 6200, hours: '310h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (04/08/2026)', photoCount: 2 },
      { id: 'p13-8', department: 'Phòng Điện Chiếu Sáng', date: '02/08/2026', reporter: 'Bùi Văn Lộc', quantity: 1850, hours: '160h', progressPct: '93%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (03/08/2026)' },
      { id: 'p13-9', department: 'Phòng Mộc Sơn Khung Bệ', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 140, hours: '120h', progressPct: '88%', status: 'Trả lại điều chỉnh', approvedBy: 'Kiểm tra gia cố chân đế chịu lực' },
      { id: 'p13-10', department: 'Khối Quản Lý Dự Án', date: '31/07/2026', reporter: 'Vũ Minh Tuấn', quantity: 35, hours: '60h', progressPct: '95%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: BGĐ (01/08/2026)' },
      { id: 'p13-11', department: 'Ban Giám Đốc', date: '30/07/2026', reporter: 'Thảo Phùng', quantity: 15, hours: '40h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (31/07/2026)' },
    ],
  },
  {
    id: 'p14',
    name: 'CHỈNH SỬA MÔ HÌNH VIN UNIVERSITY',
    reportCount: 9,
    totalHours: '1496.7h',
    reports: [
      { id: 'p14-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 740, hours: '680h', progressPct: '98%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p14-2', department: 'Phòng Khai triển', date: '05/08/2026', reporter: 'Trần Diễm My', quantity: 28, hours: '165h', progressPct: '98%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (05/08/2026)' },
      { id: 'p14-3', department: 'Phòng Cắt CNC', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 56, hours: '120h', progressPct: '99%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p14-4', department: 'Phòng Ghép Chi Tiết', date: '04/08/2026', reporter: 'Phạm Đức Huy', quantity: 94, hours: '240h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p14-5', department: 'Phòng Cảnh Quan Sân Trường', date: '03/08/2026', reporter: 'Đỗ Thùy Linh', quantity: 280, hours: '110h', progressPct: '97%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (04/08/2026)' },
      { id: 'p14-6', department: 'Phòng Điện Hệ Thống', date: '02/08/2026', reporter: 'Lâm Vĩnh Hưng', quantity: 62, hours: '75h', progressPct: '95%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (03/08/2026)' },
      { id: 'p14-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 25, hours: '45h', progressPct: '92%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)' },
      { id: 'p14-8', department: 'Tạo Hình Điêu Khắc', date: '31/07/2026', reporter: 'Vũ Minh Tuấn', quantity: 14, hours: '36.7h', progressPct: '96%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (01/08/2026)' },
      { id: 'p14-9', department: 'Khối Văn phòng', date: '30/07/2026', reporter: 'Trần Diễm My', quantity: 10, hours: '25h', progressPct: '95%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: BGĐ (31/07/2026)' },
    ],
  },
];

export default function NghiemThu80() {
  const [filterTab, setFilterTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [search, setSearch] = useState('');
  
  // State quản lý Modal 1: Danh sách báo cáo của dự án
  const [modalProject, setModalProject] = useState<ProjectReportGroup | null>(null);

  // State quản lý Modal 2: Chi tiết 1 báo cáo đơn lẻ khi nhấn nút "Xem"
  const [activeReportItem, setActiveReportItem] = useState<{
    projectName: string;
    report: ReportItem;
  } | null>(null);

  // Filter dự án theo tìm kiếm và tab lọc
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      const term = search.toLowerCase().trim();
      const matchesSearch = !term || p.name.toLowerCase().includes(term);

      if (filterTab === 'pending') {
        return matchesSearch && p.reports.some((r) => r.status === 'Chờ phê duyệt');
      }
      if (filterTab === 'approved') {
        return matchesSearch && p.reports.some((r) => r.status === 'BGĐ đã duyệt');
      }
      if (filterTab === 'rejected') {
        return matchesSearch && p.reports.some((r) => r.status === 'Trả lại điều chỉnh');
      }

      return matchesSearch;
    });
  }, [search, filterTab]);

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-3 text-left font-sans select-none overflow-hidden">
      
      {/* ── 1. THANH BỘ LỌC TRẠNG THÁI ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 shrink-0 pt-0.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold mr-1">
            <IconFilter size={15} />
            <span>Lọc:</span>
          </div>

          {/* Tất cả (221) */}
          <button
            type="button"
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
              filterTab === 'all'
                ? 'bg-[#1e293b] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Tất cả (221)
          </button>

          {/* Chờ phê duyệt (0) */}
          <button
            type="button"
            onClick={() => setFilterTab('pending')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              filterTab === 'pending'
                ? 'bg-[#1e293b] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Chờ phê duyệt (0)
          </button>

          {/* Đã phê duyệt (213) */}
          <button
            type="button"
            onClick={() => setFilterTab('approved')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              filterTab === 'approved'
                ? 'bg-[#1e293b] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đã phê duyệt (213)
          </button>

          {/* Trả lại điều chỉnh (8) */}
          <button
            type="button"
            onClick={() => setFilterTab('rejected')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              filterTab === 'rejected'
                ? 'bg-[#1e293b] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Trả lại điều chỉnh (8)
          </button>
        </div>

        {/* Ô tìm kiếm nhanh */}
        <div className="relative w-64">
          <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm dự án..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 shadow-2xs"
          />
        </div>
      </div>

      {/* ── 2. BOX CARD BẢNG DANH SÁCH 14 DỰ ÁN ── */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-hidden">
        
        {/* Header Card: Mốc nghiệm thu 80% */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <IconFlag size={16} className="text-[#6366f1] shrink-0" stroke={2} />
            <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
              Mốc nghiệm thu 80%
            </h3>
            <span className="text-xs text-slate-400 font-normal ml-0.5">
              (115 báo cáo · 0 chờ duyệt)
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[#ea580c] font-semibold ml-2">
              <IconRotate size={13} stroke={2.5} />
              <span>6 trả lại</span>
            </span>
          </div>
        </div>

        {/* Danh sách các dòng dự án */}
        <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar divide-y divide-slate-100">
          {filteredProjects.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs font-medium">
              Không tìm thấy dự án hoặc báo cáo nào phù hợp.
            </div>
          ) : (
            filteredProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => setModalProject(p)}
                className="px-4 py-3 flex items-center justify-between hover:bg-slate-50/80 transition-colors cursor-pointer group select-none"
              >
                {/* Left: Folder Icon + Project Name */}
                <div className="flex items-center gap-2.5 min-w-0 pr-3">
                  <IconFolder
                    size={17}
                    className="text-[#3b82f6] shrink-0 group-hover:scale-105 transition-transform"
                    stroke={1.8}
                  />

                  <span className="font-bold text-slate-800 text-xs uppercase tracking-tight truncate group-hover:text-indigo-600 transition-colors">
                    {p.name}
                  </span>
                </div>

                {/* Right: Số lượng báo cáo, tổng giờ + ICON MẮT XEM BÁO CÁO */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-400 font-normal">
                    {p.reportCount} báo cáo · {p.totalHours}
                  </span>

                  {/* Nút icon mắt mở modal */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalProject(p);
                    }}
                    title={`Xem chi tiết ${p.reportCount} báo cáo của ${p.name}`}
                    className="inline-flex items-center justify-center p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all cursor-pointer"
                  >
                    <IconEye size={16} stroke={2} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── 3. MODAL 1: FOLDER modal/DanhSachBaoCaoModal ── */}
      <DanhSachBaoCaoModal
        project={modalProject}
        onClose={() => setModalProject(null)}
        onViewReport={(report, projectName) => setActiveReportItem({ projectName, report })}
      />

      {/* ── 4. MODAL 2: FOLDER modal/ChiTietBaoCaoModal ── */}
      <ChiTietBaoCaoModal
        item={activeReportItem}
        onClose={() => setActiveReportItem(null)}
      />
    </div>
  );
}
