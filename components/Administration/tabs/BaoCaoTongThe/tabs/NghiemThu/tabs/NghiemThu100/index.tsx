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

// Dữ liệu 14 dự án theo đúng hình ảnh (Mốc nghiệm thu 100% · 104/106 báo cáo · 2 trả lại)
const PROJECTS_DATA_100: ProjectReportGroup[] = [
  {
    id: 'p1',
    name: 'VSIP LẠNG SƠN',
    reportCount: 7,
    totalHours: '4654.2h',
    reports: [
      { id: 'p1-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 47363.5, hours: '2295.1h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p1-2', department: 'Phòng Cắt', date: '06/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 39, hours: '216h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)' },
      { id: 'p1-3', department: 'Phòng Cảnh Quan', date: '05/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 34553.5, hours: '790.1h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thao B Phung (05/08/2026)', photoCount: 2 },
      { id: 'p1-4', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 35, hours: '168.5h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (03/08/2026)' },
      { id: 'p1-5', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Định Đức Lợi', quantity: 1542, hours: '848.5h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thao B Phung (05/08/2026)', photoCount: 3 },
      { id: 'p1-6', department: 'Phòng Điện', date: '04/08/2026', reporter: 'Bùi Văn Lộc', quantity: 11177, hours: '253h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thao B Phung (05/08/2026)' },
      { id: 'p1-7', department: 'Ban Giám đốc', date: '28/07/2026', reporter: 'Thảo Phùng', quantity: 17, hours: '83h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)' },
    ],
  },
  {
    id: 'p2',
    name: 'HERITAGE VILLAGE MOC CHAU',
    reportCount: 7,
    totalHours: '3847.0h',
    reports: [
      { id: 'p2-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 15250, hours: '1878.5h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p2-2', department: 'Phòng Cắt', date: '06/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 557, hours: '428h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)' },
      { id: 'p2-3', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Định Đức Lợi', quantity: 667, hours: '474h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)', photoCount: 2 },
      { id: 'p2-4', department: 'Phòng Điện', date: '04/08/2026', reporter: 'Bùi Văn Lộc', quantity: 3936, hours: '169h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p2-5', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 58, hours: '440.5h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (03/08/2026)' },
      { id: 'p2-6', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 10032, hours: '367h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)', photoCount: 3 },
      { id: 'p2-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Phạm Đức Huy', quantity: 120, hours: '90h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (02/08/2026)' },
    ],
  },
  {
    id: 'p3',
    name: 'CHỈNH SỬA MÔ HÌNH L\'AURORA',
    reportCount: 8,
    totalHours: '3211.0h',
    reports: [
      { id: 'p3-1', department: 'Toàn dự án', date: '05/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 2970, hours: '1461.5h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (05/08/2026)' },
      { id: 'p3-2', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 72, hours: '346.5h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p3-3', department: 'Phòng Cắt', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 65, hours: '284h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p3-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Định Đức Lợi', quantity: 129, hours: '544h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p3-5', department: 'Phòng Điện', date: '04/08/2026', reporter: 'Lâm Vĩnh Hưng', quantity: 296, hours: '88h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p3-6', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 2408, hours: '199h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)', photoCount: 2 },
      { id: 'p3-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 95, hours: '192h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)' },
      { id: 'p3-8', department: 'Ban Giám đốc', date: '30/07/2026', reporter: 'Thảo Phùng', quantity: 14, hours: '96h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (31/07/2026)' },
    ],
  },
  {
    id: 'p4',
    name: '22 LIỄU GIAI',
    reportCount: 7,
    totalHours: '3618.0h',
    reports: [
      { id: 'p4-1', department: 'Phòng Cắt', date: '06/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 989, hours: '304h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)' },
      { id: 'p4-2', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 84, hours: '630.5h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p4-3', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 4250.5, hours: '408h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p4-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Bùi Ngọc Sỹ', quantity: 500.5, hours: '1255h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)', photoCount: 4 },
      { id: 'p4-5', department: 'Phòng Điện', date: '04/08/2026', reporter: 'Lâm Vĩnh Hưng', quantity: 1513, hours: '260h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p4-6', department: 'Phòng Mộc Sơn', date: '02/08/2026', reporter: 'Nguyễn Văn Đạt', quantity: 210, hours: '480h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (03/08/2026)' },
      { id: 'p4-7', department: 'Khối Văn phòng', date: '31/07/2026', reporter: 'Trần Diễm My', quantity: 28, hours: '280.5h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: BGĐ (01/08/2026)' },
    ],
  },
  {
    id: 'p5',
    name: 'QUY HOẠCH TỈNH HƯNG YÊN',
    reportCount: 7,
    totalHours: '5151.0h',
    reports: [
      { id: 'p5-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 2150, hours: '2450h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p5-2', department: 'Phòng Khai triển', date: '05/08/2026', reporter: 'Trần Diễm My', quantity: 45, hours: '480h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (05/08/2026)' },
      { id: 'p5-3', department: 'Phòng Cắt', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 95, hours: '420h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p5-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Bùi Ngọc Sỹ', quantity: 180, hours: '980h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p5-5', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 820, hours: '460h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (04/08/2026)' },
      { id: 'p5-6', department: 'Phòng Điện', date: '02/08/2026', reporter: 'Lâm Vĩnh Hưng', quantity: 65, hours: '190h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (03/08/2026)' },
      { id: 'p5-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 35, hours: '171h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Ban Giám Đốc (02/08/2026)' },
    ],
  },
  {
    id: 'p6',
    name: 'CHỈNH SỬA 02 MÔ HÌNH QUY HOẠCH ECOPARK VINH TỶ LỆ 1-500 & 1-2000',
    reportCount: 6,
    totalHours: '3023.0h',
    reports: [
      { id: 'p6-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 1420, hours: '1450h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p6-2', department: 'Phòng Khai triển', date: '05/08/2026', reporter: 'Trần Diễm My', quantity: 65, hours: '380h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (05/08/2026)' },
      { id: 'p6-3', department: 'Phòng Cắt CNC', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 110, hours: '290h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p6-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Phạm Đức Huy', quantity: 240, hours: '540h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p6-5', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Đỗ Thùy Linh', quantity: 450, hours: '243h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (04/08/2026)' },
      { id: 'p6-6', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 45, hours: '120h', progressPct: '90%', status: 'Trả lại điều chỉnh', approvedBy: 'Chỉnh độ mịn bề mặt sơn khung viền' },
    ],
  },
  {
    id: 'p7',
    name: 'THE HERITAGE TÂY NINH - Lắp đặt tại Tây Ninh',
    reportCount: 8,
    totalHours: '5238.0h',
    reports: [
      { id: 'p7-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 22900, hours: '2100h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p7-2', department: 'Phòng Cắt', date: '06/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 736, hours: '290h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)' },
      { id: 'p7-3', department: 'Phòng Cảnh Quan', date: '06/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 17622, hours: '710h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)' },
      { id: 'p7-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Bùi Ngọc Sỹ', quantity: 767, hours: '820h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p7-5', department: 'Phòng Điện', date: '04/08/2026', reporter: 'Bùi Văn Lộc', quantity: 3755, hours: '240h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p7-6', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 20, hours: '110h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p7-7', department: 'Phòng Mộc Sơn', date: '02/08/2026', reporter: 'Nguyễn Văn Đạt', quantity: 412, hours: '580h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (03/08/2026)' },
      { id: 'p7-8', department: 'Phòng Thiết Kế', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 65, hours: '388h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)' },
    ],
  },
  {
    id: 'p8',
    name: 'DỰ ÁN KHU DÂN CƯ PHƯỚC THỌ',
    reportCount: 8,
    totalHours: '6681.2h',
    reports: [
      { id: 'p8-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 28400, hours: '3120.2h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p8-2', department: 'Phòng Khai triển', date: '05/08/2026', reporter: 'Trần Diễm My', quantity: 95, hours: '580h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (05/08/2026)' },
      { id: 'p8-3', department: 'Phòng Cắt CNC', date: '05/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 512, hours: '440h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p8-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Bùi Ngọc Sỹ', quantity: 790, hours: '1290h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p8-5', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 14600, hours: '760h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (04/08/2026)' },
      { id: 'p8-6', department: 'Phòng Điện Chiếu Sáng', date: '02/08/2026', reporter: 'Bùi Văn Lộc', quantity: 1850, hours: '210h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (03/08/2026)' },
      { id: 'p8-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 140, hours: '181h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)' },
      { id: 'p8-8', department: 'Ban Giám Đốc', date: '30/07/2026', reporter: 'Thảo Phùng', quantity: 15, hours: '100h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (31/07/2026)' },
    ],
  },
  {
    id: 'p9',
    name: '03 MÔ HÌNH ĐẢO CHÂU ÂU THUỘC DỰ ÁN ECO CENTRAL PARK VINH',
    reportCount: 7,
    totalHours: '7152.0h',
    reports: [
      { id: 'p9-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 8900, hours: '3450h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p9-2', department: 'Phòng Ghép', date: '05/08/2026', reporter: 'Bùi Ngọc Sỹ', quantity: 680, hours: '1580h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)' },
      { id: 'p9-3', department: 'Phòng Cảnh Quan', date: '05/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 4520, hours: '940h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)' },
      { id: 'p9-4', department: 'Phòng Cắt CNC', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 430, hours: '450h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p9-5', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 82, hours: '442h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (04/08/2026)' },
      { id: 'p9-6', department: 'Phòng Điện', date: '02/08/2026', reporter: 'Bùi Văn Lộc', quantity: 820, hours: '200h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (03/08/2026)' },
      { id: 'p9-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 120, hours: '90h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Ban Giám Đốc (02/08/2026)' },
    ],
  },
  {
    id: 'p10',
    name: 'CHỈNH SỬA MÔ HÌNH VIN UNIVERSITY',
    reportCount: 8,
    totalHours: '2204.2h',
    reports: [
      { id: 'p10-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 740, hours: '980h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p10-2', department: 'Phòng Khai triển', date: '05/08/2026', reporter: 'Trần Diễm My', quantity: 28, hours: '240h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (05/08/2026)' },
      { id: 'p10-3', department: 'Phòng Cắt CNC', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 56, hours: '180h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p10-4', department: 'Phòng Ghép Chi Tiết', date: '04/08/2026', reporter: 'Phạm Đức Huy', quantity: 94, hours: '350h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p10-5', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Đỗ Thùy Linh', quantity: 280, hours: '170h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (04/08/2026)' },
      { id: 'p10-6', department: 'Phòng Điện Hệ Thống', date: '02/08/2026', reporter: 'Lâm Vĩnh Hưng', quantity: 62, hours: '110h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (03/08/2026)' },
      { id: 'p10-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 25, hours: '94.2h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)' },
      { id: 'p10-8', department: 'Khối Văn phòng', date: '30/07/2026', reporter: 'Trần Diễm My', quantity: 10, hours: '80h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: BGĐ (31/07/2026)' },
    ],
  },
  {
    id: 'p11',
    name: 'MODEL VIETTEL THANG LONG 1&2',
    reportCount: 8,
    totalHours: '2991.0h',
    reports: [
      { id: 'p11-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 1850, hours: '1480h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p11-2', department: 'Phòng Khai triển', date: '05/08/2026', reporter: 'Trần Diễm My', quantity: 50, hours: '260h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (05/08/2026)' },
      { id: 'p11-3', department: 'Phòng Cắt Laser', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 120, hours: '240h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p11-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Phạm Đức Huy', quantity: 210, hours: '520h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p11-5', department: 'Phòng Điện Tử LED', date: '03/08/2026', reporter: 'Bùi Văn Lộc', quantity: 380, hours: '210h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (04/08/2026)' },
      { id: 'p11-6', department: 'Phòng Cảnh Quan', date: '02/08/2026', reporter: 'Đỗ Thùy Linh', quantity: 450, hours: '151h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (03/08/2026)' },
      { id: 'p11-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 40, hours: '80h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)' },
      { id: 'p11-8', department: 'Khối Văn phòng', date: '30/07/2026', reporter: 'Trần Diễm My', quantity: 15, hours: '50h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: BGĐ (31/07/2026)' },
    ],
  },
  {
    id: 'p12',
    name: 'MÔ HÌNH GIÁM TUYỂN ART VIETNAM GALLERY',
    reportCount: 8,
    totalHours: '1369.5h',
    reports: [
      { id: 'p12-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 650, hours: '610h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p12-2', department: 'Phòng Khai triển', date: '05/08/2026', reporter: 'Trần Diễm My', quantity: 24, hours: '155h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (05/08/2026)' },
      { id: 'p12-3', department: 'Phòng Cắt', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 45, hours: '95h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p12-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Định Đức Lợi', quantity: 85, hours: '220h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p12-5', department: 'Phòng Điện', date: '03/08/2026', reporter: 'Lâm Vĩnh Hưng', quantity: 60, hours: '85h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (04/08/2026)' },
      { id: 'p12-6', department: 'Phòng Cảnh Quan', date: '02/08/2026', reporter: 'Đỗ Thùy Linh', quantity: 120, hours: '105h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (03/08/2026)' },
      { id: 'p12-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 30, hours: '49.5h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)' },
      { id: 'p12-8', department: 'Khối Văn phòng', date: '30/07/2026', reporter: 'Trần Diễm My', quantity: 8, hours: '50h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: BGĐ (31/07/2026)' },
    ],
  },
  {
    id: 'p13',
    name: 'CHỈNH SỬA MÔ HÌNH NEWEB',
    reportCount: 8,
    totalHours: '463.0h',
    reports: [
      { id: 'p13-1', department: 'Phòng Khai triển', date: '05/08/2026', reporter: 'Trần Diễm My', quantity: 22.5, hours: '42h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p13-2', department: 'Toàn dự án', date: '05/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 22.5, hours: '42h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (05/08/2026)' },
      { id: 'p13-3', department: 'Phòng Cắt', date: '04/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 18, hours: '56h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p13-4', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Định Đức Lợi', quantity: 34, hours: '128h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p13-5', department: 'Phòng Điện', date: '03/08/2026', reporter: 'Lâm Vĩnh Hưng', quantity: 45, hours: '64h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (04/08/2026)' },
      { id: 'p13-6', department: 'Phòng Cảnh Quan', date: '02/08/2026', reporter: 'Đỗ Thùy Linh', quantity: 80, hours: '76h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (03/08/2026)' },
      { id: 'p13-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Lê Hoàng Anh', quantity: 15, hours: '35h', progressPct: '90%', status: 'Trả lại điều chỉnh', approvedBy: 'Kiểm tra độ cân đối viền khung bảo vệ' },
      { id: 'p13-8', department: 'Khối Văn phòng', date: '30/07/2026', reporter: 'Trần Diễm My', quantity: 10, hours: '20h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: BGĐ (31/07/2026)' },
    ],
  },
  {
    id: 'p14',
    name: 'THE HERITAGE TÂY NINH - Lắp đặt tại Hà Nội',
    reportCount: 7,
    totalHours: '3596.3h',
    reports: [
      { id: 'p14-1', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 33923, hours: '1680.3h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
      { id: 'p14-2', department: 'Phòng Cắt', date: '06/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 687, hours: '240h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)' },
      { id: 'p14-3', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Bùi Ngọc Sỹ', quantity: 647, hours: '580h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p14-4', department: 'Phòng Điện', date: '04/08/2026', reporter: 'Bùi Văn Lộc', quantity: 18311, hours: '490h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p14-5', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 115, hours: '350h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p14-6', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 14163, hours: '180h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
      { id: 'p14-7', department: 'Phòng Mộc Sơn', date: '01/08/2026', reporter: 'Phạm Đức Huy', quantity: 350, hours: '76h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)' },
    ],
  },
];

export default function NghiemThu100() {
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
    return PROJECTS_DATA_100.filter((p) => {
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

          {/* Tất cả */}
          <button
            type="button"
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
              filterTab === 'all'
                ? 'bg-[#1e293b] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Tất cả (106)
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

          {/* Đã phê duyệt (104) */}
          <button
            type="button"
            onClick={() => setFilterTab('approved')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              filterTab === 'approved'
                ? 'bg-[#1e293b] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đã phê duyệt (104)
          </button>

          {/* Trả lại điều chỉnh (2) */}
          <button
            type="button"
            onClick={() => setFilterTab('rejected')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              filterTab === 'rejected'
                ? 'bg-[#1e293b] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Trả lại điều chỉnh (2)
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

      {/* ── 2. BOX CARD BẢNG DANH SÁCH 14 DỰ ÁN MỐC NGHIỆM THU 100% ── */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-hidden">
        
        {/* Header Card: Mốc nghiệm thu 100% */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <IconFlag size={16} className="text-[#137333] shrink-0" stroke={2} />
            <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
              Mốc nghiệm thu 100%
            </h3>
            <span className="text-xs text-slate-400 font-normal ml-0.5">
              (104/106 báo cáo · 0 chờ duyệt)
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[#ea580c] font-semibold ml-2">
              <IconRotate size={13} stroke={2.5} />
              <span>2 trả lại</span>
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
                    className="text-[#10b981] shrink-0 group-hover:scale-105 transition-transform"
                    stroke={1.8}
                  />

                  <span className="font-bold text-slate-800 text-xs uppercase tracking-tight truncate group-hover:text-emerald-700 transition-colors">
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
                    className="inline-flex items-center justify-center p-1.5 rounded-md text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all cursor-pointer"
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
