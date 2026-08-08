"use client";

import React, { useState, useMemo } from 'react';
import {
  IconRotate,
  IconChevronLeft,
  IconChevronRight,
  IconSelector,
  IconAlertOctagon,
  IconMessageDots,
  IconCheck,
  IconAlertTriangle,
} from '@tabler/icons-react';
import GiaiTrinhViPhamModal from './modal/GiaiTrinhViPham';
import ChapNhanViPhamModal from './modal/ChapNhanViPham';
import BoQuaViPhamModal from './modal/BoQuaViPham';

export interface ViolationDetailItem {
  id: string;
  severity: 'CAO' | 'TB' | 'THẤP' | 'TÍCH CỰC';
  violationType: string;
  reporter: string;
  department: string;
  date: string;
  project: string;
  content: string;
  status: 'Chờ xử lý' | 'Đã chấp nhận';
}

const FULL_VIOLATION_DATASET: ViolationDetailItem[] = [
  // SCREENSHOT 1 ITEMS
  { id: 'VP-001', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Hà Tùng Lâm', department: 'Phòng Cảnh Quan', date: '06/08/2026', project: 'THE HERITAGE TÂY NINH - Lắp đặt tại Tây Ninh', content: 'Báo cáo "Hoàn thành" ngày 06/08/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-002', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Đỗ Ngọc Duyên', department: 'Phòng Cảnh Quan', date: '06/08/2026', project: 'CHỈNH SỬA MÔ HÌNH L\'AURORA', content: 'Báo cáo "Hoàn thành" ngày 06/08/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-003', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Quan Minh Hoàng', department: 'Phòng Cảnh Quan', date: '06/08/2026', project: 'CHỈNH SỬA MÔ HÌNH L\'AURORA', content: 'Báo cáo "Hoàn thành" ngày 06/08/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-004', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Hoàng Quyết Thắng', department: 'Phòng Mộc Sơn', date: '06/08/2026', project: 'CHỈNH SỬA MÔ HÌNH L\'AURORA', content: 'Báo cáo "Hoàn thành" ngày 06/08/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-005', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Bùi Thị Duyên', department: 'Khối Văn phòng', date: '05/08/2026', project: 'CHỈNH SỬA MÔ HÌNH L\'AURORA', content: 'Báo cáo "Hoàn thành" ngày 05/08/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-006', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Bùi Thị Duyên', department: 'Khối Văn phòng', date: '05/08/2026', project: 'CHỈNH SỬA MÔ HÌNH L\'AURORA', content: 'Báo cáo "Hoàn thành" ngày 05/08/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-007', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Hoàng Quyết Thắng', department: 'Phòng Mộc Sơn', date: '05/08/2026', project: 'CHỈNH SỬA MÔ HÌNH L\'AURORA', content: 'Báo cáo "Hoàn thành" ngày 05/08/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-008', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Hoàng Quyết Thắng', department: 'Phòng Mộc Sơn', date: '05/08/2026', project: 'CHỈNH SỬA MÔ HÌNH L\'AURORA', content: 'Báo cáo "Hoàn thành" ngày 05/08/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-009', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Hoàng Quyết Thắng', department: 'Phòng Mộc Sơn', date: '05/08/2026', project: 'CHỈNH SỬA MÔ HÌNH L\'AURORA', content: 'Báo cáo "Hoàn thành" ngày 05/08/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-010', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Lương Ngọc Thành', department: 'Phòng Ghép', date: '05/08/2026', project: 'THE HERITAGE TÂY NINH - Lắp đặt tại Hà Nội', content: 'Báo cáo "Hoàn thành" ngày 05/08/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-011', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Hoàng Quyết Thắng', department: 'Phòng Mộc Sơn', date: '05/08/2026', project: 'PHÒNG HỌP MHV', content: 'Báo cáo "Hoàn thành" ngày 05/08/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-012', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Bùi Thị Duyên', department: 'Khối Văn phòng', date: '04/08/2026', project: 'CHỈNH SỬA MÔ HÌNH L\'AURORA', content: 'Báo cáo "Hoàn thành" ngày 04/08/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-013', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Bùi Thị Duyên', department: 'Khối Văn phòng', date: '04/08/2026', project: 'CHỈNH SỬA MÔ HÌNH L\'AURORA', content: 'Báo cáo "Hoàn thành" ngày 04/08/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-014', severity: 'CAO', violationType: 'Tổng giờ/ngày vượt giới hạn', reporter: 'Bùi Thị Duyên', department: 'Khối Văn phòng', date: '05/08/2026', project: 'CHỈNH SỬA MÔ HÌNH L\'AURORA', content: 'Tổng giờ trong ngày 05/08/2026 (vượt giới hạn 12h/ngày)', status: 'Chờ xử lý' },
  { id: 'VP-015', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Đỗ Ngọc Duyên', department: 'Phòng Cảnh Quan', date: '29/07/2026', project: 'PHÒNG HỌP MHV', content: 'Báo cáo "Hoàn thành" ngày 29/07/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-016', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Bùi Thị Duyên', department: 'Khối Văn phòng', date: '29/07/2026', project: 'CHỈNH SỬA MÔ HÌNH L\'AURORA', content: 'Báo cáo "Hoàn thành" ngày 29/07/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-017', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Bùi Thị Duyên', department: 'Khối Văn phòng', date: '27/07/2026', project: 'CHỈNH SỬA MÔ HÌNH L\'AURORA', content: 'Báo cáo "Hoàn thành" ngày 27/07/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-018', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Bùi Phương Uyên', department: 'Khối Văn phòng', date: '27/07/2026', project: 'THE HERITAGE TÂY NINH - Lắp đặt tại Hà Nội', content: 'Báo cáo "Hoàn thành" ngày 27/07/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-019', severity: 'CAO', violationType: 'Tổng giờ/ngày vượt giới hạn', reporter: 'Sẩm Thị Thủy', department: 'Phòng Cảnh Quan', date: '29/07/2026', project: '22 LIỄU GIAI', content: 'Tổng giờ trong ngày 29/07/2026 (vượt giới hạn 12h/ngày)', status: 'Chờ xử lý' },
  { id: 'VP-020', severity: 'CAO', violationType: 'Tổng giờ/ngày vượt giới hạn', reporter: 'Sẩm Thị Thủy', department: 'Phòng Cảnh Quan', date: '25/07/2026', project: '22 LIỄU GIAI', content: 'Tổng giờ trong ngày 25/07/2026 (vượt giới hạn 12h/ngày)', status: 'Chờ xử lý' },
  { id: 'VP-021', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Bùi Thị Duyên', department: 'Khối Văn phòng', date: '25/07/2026', project: 'THE HERITAGE TÂY NINH - Lắp đặt tại Hà Nội', content: 'Báo cáo "Hoàn thành" ngày 25/07/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-022', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'Bùi Thị Duyên', department: 'Khối Văn phòng', date: '25/07/2026', project: 'THE HERITAGE TÂY NINH - Lắp đặt tại Hà Nội', content: 'Báo cáo "Hoàn thành" ngày 25/07/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-023', severity: 'TÍCH CỰC', violationType: 'Báo cáo trước ngày bắt đầu...', reporter: 'MÁY CẮT 1 - CMH1309-B-A-2025', department: 'Phòng Cắt', date: '19/07/2026', project: '22 LIỄU GIAI', content: 'Báo cáo "Hoàn thành" ngày 19/07/2026 nhưng song song có số hoàn thành từ 07/08/2026 (chưa tới ngày thực hiện)', status: 'Chờ xử lý' },
  { id: 'VP-024', severity: 'THẤP', violationType: 'KL thực hiện thiếu nhưng báo Hoàn thành', reporter: 'Nhân viên Kinh doanh 2', department: 'Khối Văn phòng', date: '21/07/2026', project: '22 LIỄU GIAI', content: 'Báo cáo "Hoàn thành" nhưng thiếu 5m2 lượng đợt 2', status: 'Đã chấp nhận' },
  { id: 'VP-025', severity: 'THẤP', violationType: 'KL thực hiện thiếu nhưng báo Hoàn thành', reporter: 'Nhân viên Kinh doanh 2', department: 'Khối Văn phòng', date: '21/07/2026', project: '22 LIỄU GIAI', content: 'Báo cáo "Hoàn thành" nhưng thiếu 3m2 lượng đợt 1', status: 'Đã chấp nhận' },

  // SCREENSHOT 2 ITEMS
  { id: 'VP-026', severity: 'TB', violationType: 'Quá hạn triển khai Quy trình DA', reporter: 'Nguyễn Phú Quang', department: 'Khối Văn phòng', date: '04/08/2026', project: 'DUBAI - Giai đoạn 1', content: 'Bảng dự kiến nhân sự chưa điền trong mục "Dự kiến" sau 1 ngày (yêu cầu hoàn thành trong 1 ngày kể từ khi tạo đợt/báo cáo)', status: 'Chờ xử lý' },
  { id: 'VP-027', severity: 'TB', violationType: 'Quá hạn triển khai Quy trình DA', reporter: 'Nguyễn Phú Quang', department: 'Khối Văn phòng', date: '04/08/2026', project: 'EXIM BANK VNTA', content: 'Bảng dự kiến nhân sự chưa điền trong mục "Dự kiến" sau 1 ngày (yêu cầu hoàn thành trong 1 ngày kể từ khi tạo đợt/báo cáo)', status: 'Chờ xử lý' },
  { id: 'VP-028', severity: 'TB', violationType: 'Quá hạn triển khai Quy trình DA', reporter: 'Bùi Thị Duyên', department: 'Khối Văn phòng', date: '29/07/2026', project: 'CHỈNH SỬA MÔ HÌNH L\'AURORA', content: 'Bảng dự kiến nhân sự chưa điền trong mục "Dự kiến" sau 1 ngày (yêu cầu hoàn thành trong 1 ngày kể từ khi tạo đợt/báo cáo)', status: 'Chờ xử lý' },
  { id: 'VP-029', severity: 'TB', violationType: 'Quá hạn triển khai Quy trình DA', reporter: 'kd', department: 'Khối Văn phòng', date: '24/07/2026', project: 'MÔ HÌNH DÂN CƯ GREEN CITY', content: 'Bảng dự kiến nhân sự chưa điền trong mục "Dự kiến" sau 1 ngày', status: 'Chờ xử lý' },
  { id: 'VP-030', severity: 'TB', violationType: 'Quá hạn triển khai Quy trình DA', reporter: 'Phú Quang', department: 'Khối Văn phòng', date: '24/07/2026', project: '22 LIỄU GIAI', content: 'Bảng dự kiến nhân sự chưa điền trong mục "Dự kiến" sau 1 ngày', status: 'Chờ xử lý' },
  { id: 'VP-031', severity: 'TB', violationType: 'Quá hạn triển khai Quy trình DA', reporter: 'Phú Quang', department: 'Khối Văn phòng', date: '24/07/2026', project: 'TÒA NHÀ TRƯỜNG CHINH', content: 'Bảng dự kiến nhân sự chưa điền trong mục "Dự kiến" sau 1 ngày', status: 'Chờ xử lý' },
  { id: 'VP-032', severity: 'TB', violationType: 'Quá hạn triển khai Quy trình DA', reporter: 'Phương Uyên', department: 'Khối Văn phòng', date: '22/07/2026', project: 'FLAMINGO ĐÔNG ANH', content: 'Bảng dự kiến nhân sự chưa điền trong mục "Dự kiến" sau 1 ngày', status: 'Chờ xử lý' },
  { id: 'VP-033', severity: 'CAO', violationType: 'Báo cáo quá hạn', reporter: 'Quan Minh Hoàng', department: 'Phòng Cảnh Quan', date: '04/08/2026', project: '22 LIỄU GIAI', content: 'Công việc "CÂY CRM35 - UỐN THÂN 4" từ ngày bắt đầu 04/08/2026 đã trễ 3 ngày nhưng chưa có báo cáo công việc', status: 'Chờ xử lý' },
  { id: 'VP-034', severity: 'CAO', violationType: 'Báo cáo quá hạn', reporter: 'Quan Minh Hoàng', department: 'Phòng Cảnh Quan', date: '04/08/2026', project: '22 LIỄU GIAI', content: 'Công việc "CÂY CRM35 - UỐN THÂN 3" từ ngày bắt đầu 04/08/2026 đã trễ 3 ngày nhưng chưa có báo cáo công việc', status: 'Chờ xử lý' },
  { id: 'VP-035', severity: 'CAO', violationType: 'Báo cáo quá hạn', reporter: 'Quan Minh Hoàng', department: 'Phòng Cảnh Quan', date: '04/08/2026', project: '22 LIỄU GIAI', content: 'Công việc "CÂY CRM35 - UỐN THÂN 2" từ ngày bắt đầu 04/08/2026 đã trễ 3 ngày nhưng chưa có báo cáo công việc', status: 'Chờ xử lý' },
  { id: 'VP-036', severity: 'CAO', violationType: 'Báo cáo quá hạn', reporter: 'Nguyễn Quang Triệu', department: 'Khối Công nghệ & Khai triển', date: '04/08/2026', project: '22 LIỄU GIAI', content: 'Công việc "DỰNG HÌNH BỐ TRÍ THIẾT BỊ ĐIỆN LẦN 3" từ ngày bắt đầu 04/08/2026 đã trễ 3 ngày nhưng chưa có báo cáo công việc', status: 'Chờ xử lý' },

  // SCREENSHOT 3 ITEMS
  { id: 'VP-037', severity: 'CAO', violationType: 'Báo cáo quá hạn', reporter: 'Vũ Minh Hằng', department: 'Phòng Cảnh Quan', date: '01/08/2026', project: 'PHÒNG HỌP MHV', content: 'Công việc "CẮT CÂY CRM35" từ ngày bắt đầu 01/08/2026 đã trễ 6 ngày nhưng chưa có báo cáo công việc', status: 'Chờ xử lý' },
  { id: 'VP-038', severity: 'CAO', violationType: 'Báo cáo quá hạn', reporter: 'Nguyễn Ngọc Lan Anh', department: 'Phòng Cảnh Quan', date: '01/08/2026', project: 'PHÒNG HỌP MHV', content: 'Công việc "LẮP RÁP CẢNH QUAN MÔ HÌNH" từ ngày bắt đầu 01/08/2026 đã trễ 6 ngày nhưng chưa có báo cáo công việc', status: 'Chờ xử lý' },
  { id: 'VP-039', severity: 'CAO', violationType: 'Báo cáo quá hạn', reporter: 'Nguyễn Thị Hồng Ngọc', department: 'Phòng Cảnh Quan', date: '01/08/2026', project: 'PHÒNG HỌP MHV', content: 'Công việc "SƠN CÂY CẢNH QUAN" từ ngày bắt đầu 01/08/2026 đã trễ 6 ngày nhưng chưa có báo cáo công việc', status: 'Chờ xử lý' },
  { id: 'VP-040', severity: 'CAO', violationType: 'Báo cáo quá hạn', reporter: 'Hoàng Quyết Thắng', department: 'Phòng Mộc Sơn', date: '05/08/2026', project: 'PHÒNG HỌP MHV', content: 'Công việc "SƠN CÂY CRM35" từ ngày bắt đầu 05/08/2026 đã trễ 2 ngày nhưng chưa có báo cáo công việc', status: 'Chờ xử lý' },
  { id: 'VP-041', severity: 'CAO', violationType: 'Báo cáo quá hạn', reporter: 'Cao Trường Thiên', department: 'Khối Công nghệ & Khai triển', date: '05/08/2026', project: 'CHỈNH SỬA MÔ HÌNH NEWEB', content: 'Công việc "DỰNG CẮT MÔ HÌNH DÂN CƯ" từ ngày bắt đầu 05/08/2026 đã trễ 2 ngày nhưng chưa có báo cáo công việc', status: 'Chờ xử lý' },
  { id: 'VP-042', severity: 'CAO', violationType: 'Báo cáo quá hạn', reporter: 'Nguyễn Quang Linh', department: 'Khối Công nghệ & Khai triển', date: '27/07/2026', project: 'THE HERITAGE TÂY NINH - Lắp đặt tại Hà Nội', content: 'Công việc "XẾP CẮT PHỤ TRỢ KHỐI ĐẾ" từ ngày bắt đầu 27/07/2026 đã trễ 10 ngày nhưng chưa có báo cáo công việc', status: 'Chờ xử lý' },
];

export default function RaSoatViPham() {
  const [activeTab, setActiveTab] = useState<'cho-xu-ly' | 'da-chap-nhan'>('cho-xu-ly');
  const [selectedType, setSelectedType] = useState('tat-ca');
  const [selectedStaff, setSelectedStaff] = useState('tat-ca');
  const [selectedDept, setSelectedDept] = useState('tat-ca');
  const [selectedSeverity, setSelectedSeverity] = useState('tat-ca');
  const [items, setItems] = useState<ViolationDetailItem[]>(FULL_VIOLATION_DATASET);

  // Modal State
  const [selectedItemForModal, setSelectedItemForModal] = useState<ViolationDetailItem | null>(null);
  const [isGiaiTrinhModalOpen, setIsGiaiTrinhModalOpen] = useState(false);
  const [isChapNhanModalOpen, setIsChapNhanModalOpen] = useState(false);
  const [isBoQuaModalOpen, setIsBoQuaModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Rescan simulation state
  const [lastScanTime, setLastScanTime] = useState('07/08/2026 10:19');
  const [isScanning, setIsScanning] = useState(false);

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const now = new Date();
      const timeStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setLastScanTime(timeStr);
      setIsScanning(false);
    }, 600);
  };

  const handleAccept = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'Đã chấp nhận' } : i)));
  };

  const filtered = useMemo(() => {
    return items.filter((i) => {
      // Tab filter
      if (activeTab === 'cho-xu-ly' && i.status !== 'Chờ xử lý') return false;
      if (activeTab === 'da-chap-nhan' && i.status !== 'Đã chấp nhận') return false;

      // Dropdown filters
      if (selectedType !== 'tat-ca' && !i.violationType.toLowerCase().includes(selectedType.toLowerCase())) return false;
      if (selectedStaff !== 'tat-ca' && i.reporter !== selectedStaff) return false;
      if (selectedDept !== 'tat-ca' && i.department !== selectedDept) return false;
      if (selectedSeverity !== 'tat-ca' && i.severity !== selectedSeverity) return false;

      return true;
    });
  }, [items, activeTab, selectedType, selectedStaff, selectedDept, selectedSeverity]);

  const totalFiltered = filtered.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFiltered);
  const paginated = filtered.slice(startIndex, endIndex);

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-3 text-left font-sans select-none overflow-y-auto md:overflow-hidden pr-0.5">
      {/* TOP HEADER ROW */}
      <div className="flex flex-wrap items-center justify-between gap-3 shrink-0 py-0.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <IconAlertOctagon size={20} className="text-rose-500 shrink-0" />
            <h2 className="text-sm font-extrabold text-slate-800 tracking-tight">Rà soát vi phạm báo cáo</h2>
          </div>
          <span className="text-xs text-slate-400 font-medium ml-1">Quét {lastScanTime}</span>
        </div>
        <button
          type="button"
          onClick={handleRescan}
          disabled={isScanning}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-2xs cursor-pointer active:scale-95 disabled:opacity-50"
        >
          <IconRotate size={14} className={`text-slate-600 ${isScanning ? 'animate-spin' : ''}`} />
          <span>Quét lại</span>
        </button>
      </div>

      {/* STATUS FILTER TABS */}
      <div className="flex items-center gap-1 bg-slate-100/60 p-1 rounded-xl w-full sm:w-fit shrink-0 overflow-x-auto">
        <button
          type="button"
          onClick={() => { setActiveTab('cho-xu-ly'); setCurrentPage(1); }}
          className={`px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap ${activeTab === 'cho-xu-ly' ? 'bg-white text-slate-800 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900 font-medium'}`}
        >
          Chờ xử lý ({items.filter(i => i.status === 'Chờ xử lý').length})
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('da-chap-nhan'); setCurrentPage(1); }}
          className={`px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap ${activeTab === 'da-chap-nhan' ? 'bg-white text-slate-800 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900 font-medium'}`}
        >
          Đã chấp nhận ({items.filter(i => i.status === 'Đã chấp nhận').length})
        </button>
      </div>

      {/* DROPDOWN FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap items-center gap-2.5 sm:gap-3 shrink-0 py-1">
        <div className="flex items-center justify-between sm:justify-start gap-1.5 bg-white border border-slate-200/90 rounded-lg px-2.5 py-1.5 shadow-2xs w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Theo loại vi phạm:</span>
          <select value={selectedType} onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }} className="bg-transparent text-xs text-slate-800 font-bold focus:outline-none cursor-pointer max-w-[220px]">
            <option value="tat-ca">Tất cả</option>
            <option value="Báo cáo quá hạn">Báo cáo quá hạn</option>
            <option value="Báo cáo trước ngày bắt đầu">Báo cáo trước ngày bắt đầu thực hiện</option>
            <option value="Quá hạn triển khai Quy trình DA">Quá hạn triển khai Quy trình DA</option>
            <option value="KL thực hiện thiếu">KL thực hiện thiếu nhưng báo Hoàn thành</option>
            <option value="Tổng giờ/ngày">Tổng giờ/ngày vượt giới hạn</option>
          </select>
        </div>

        {/* Select: Theo nhân sự */}
        <div className="flex items-center justify-between sm:justify-start gap-1.5 bg-white border border-slate-200/90 rounded-lg px-2.5 py-1.5 shadow-2xs w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Theo nhân sự:</span>
          <select value={selectedStaff} onChange={(e) => { setSelectedStaff(e.target.value); setCurrentPage(1); }} className="bg-transparent text-xs text-slate-800 font-bold focus:outline-none cursor-pointer max-w-[200px]">
            <option value="tat-ca">Tất cả nhân sự</option>
            <option value="Hoàng Quyết Thắng">Hoàng Quyết Thắng</option>
            <option value="Bùi Thị Duyên">Bùi Thị Duyên</option>
            <option value="Quan Minh Hoàng">Quan Minh Hoàng</option>
            <option value="Nguyễn Thị Hồng Ngọc">Nguyễn Thị Hồng Ngọc</option>
            <option value="Bùi Văn Lộc">Bùi Văn Lộc</option>
            <option value="Đình Hữu Sử">Đình Hữu Sử</option>
            <option value="Vũ Minh Hằng">Vũ Minh Hằng</option>
            <option value="Nhân viên Kinh doanh 2">Nhân viên Kinh doanh 2</option>
            <option value="Hà Tùng Lâm">Hà Tùng Lâm</option>
            <option value="Nguyễn Quang Triệu">Nguyễn Quang Triệu</option>
            <option value="Nguyễn Ngọc Lan Anh">Nguyễn Ngọc Lan Anh</option>
            <option value="Đỗ Ngọc Duyên">Đỗ Ngọc Duyên</option>
            <option value="Bùi Phương Uyên">Bùi Phương Uyên</option>
            <option value="Sẩm Thị Thùy">Sẩm Thị Thùy</option>
            <option value="Nguyễn Phú Quang">Nguyễn Phú Quang</option>
            <option value="Phú Quang">Phú Quang</option>
            <option value="Cao Trường Thiên">Cao Trường Thiên</option>
            <option value="Nguyễn Quang Linh">Nguyễn Quang Linh</option>
            <option value="Lương Ngọc Thành">Lương Ngọc Thành</option>
            <option value="MÁY CẮT 1 - CMH1309-B-A-2025">MÁY CẮT 1 - CMH1309-B-A-2025</option>
            <option value="kd">kd</option>
            <option value="Phương Uyên">Phương Uyên</option>
            <option value="Nguyễn Thế Kỳ Anh">Nguyễn Thế Kỳ Anh</option>
            <option value="Nguyễn Minh Hiếu">Nguyễn Minh Hiếu</option>
          </select>
        </div>
        <div className="flex items-center justify-between sm:justify-start gap-1.5 bg-white border border-slate-200/90 rounded-lg px-2.5 py-1.5 shadow-2xs w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Theo mức độ:</span>
          <select value={selectedSeverity} onChange={(e) => { setSelectedSeverity(e.target.value); setCurrentPage(1); }} className="bg-transparent text-xs text-slate-800 font-bold focus:outline-none cursor-pointer">
            <option value="tat-ca">Tất cả</option>
            <option value="CAO">CAO</option>
            <option value="TB">TB</option>
            <option value="THẤP">THẤP</option>
            <option value="TÍCH CỰC">TÍCH CỰC</option>
          </select>
        </div>
        <div className="flex items-center justify-between sm:justify-start gap-1.5 bg-white border border-slate-200/90 rounded-lg px-2.5 py-1.5 shadow-2xs w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Theo phòng ban:</span>
          <select value={selectedDept} onChange={(e) => { setSelectedDept(e.target.value); setCurrentPage(1); }} className="bg-transparent text-xs text-slate-800 font-bold focus:outline-none cursor-pointer">
            <option value="tat-ca">Tất cả phòng ban</option>
            <option value="Phòng Cắt">Phòng Cắt</option>
            <option value="Phòng Ghép">Phòng Ghép</option>
            <option value="Phòng Điện">Phòng Điện</option>
            <option value="Phòng Khai triển">Phòng Khai triển</option>
            <option value="Phòng Cảnh Quan">Phòng Cảnh Quan</option>
            <option value="Khối Văn phòng">Khối Văn phòng</option>
            <option value="Khối Công nghệ & Khai triển">Khối Công nghệ & Khai triển</option>
            <option value="Phòng Mộc Sơn">Phòng Mộc Sơn</option>
          </select>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="flex-1 flex flex-col min-h-[350px] md:min-h-0 bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0">
          <table className="w-full text-xs text-left border-collapse min-w-[1050px]">
            <thead className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-xs border-b border-slate-200">
              <tr className="text-slate-600 font-bold text-[11px]">
                <th className="px-3.5 py-3 border-b border-slate-200 text-center">Mức độ</th>
                <th className="px-3.5 py-3 border-b border-slate-200">Loại vi phạm</th>
                <th className="px-3.5 py-3 border-b border-slate-200">Nhân sự</th>
                <th className="px-3.5 py-3 border-b border-slate-200">Phòng ban</th>
                <th className="px-3.5 py-3 border-b border-slate-200">Ngày</th>
                <th className="px-3.5 py-3 border-b border-slate-200">Dự án</th>
                <th className="px-3.5 py-3 border-b border-slate-200">Nội dung chi tiết</th>
                <th className="px-3.5 py-3 border-b border-slate-200 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400 text-xs">Không tìm thấy vi phạm phù hợp.</td>
                </tr>
              ) : (
                paginated.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-3.5 py-3.5 text-center whitespace-nowrap">
                      {item.severity === 'TÍCH CỰC' && <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">TÍCH CỰC</span>}
                      {item.severity === 'CAO' && <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#fee2e2] text-[#dc2626] border border-[#fca5a5]">CAO</span>}
                      {item.severity === 'TB' && <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#fef3c7] text-[#d97706] border border-[#fde68a]">TB</span>}
                      {item.severity === 'THẤP' && <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#e0f2fe] text-[#0284c7] border border-[#bae6fd]">THẤP</span>}
                    </td>
                    <td className="px-3.5 py-3.5 font-bold text-rose-700 text-[11px] max-w-[170px]">{item.violationType}</td>
                    <td className="px-3.5 py-3.5 text-slate-700 font-bold text-[11px] whitespace-nowrap">{item.reporter}</td>
                    <td className="px-3.5 py-3.5 text-slate-500 text-[11px]">{item.department}</td>
                    <td className="px-3.5 py-3.5 text-slate-500 text-[11px] whitespace-nowrap">{item.date}</td>
                    <td className="px-3.5 py-3.5 font-bold text-slate-800 text-[11px] uppercase max-w-[190px]">{item.project}</td>
                    <td className="px-3.5 py-3.5 text-slate-600 text-[11px] max-w-[320px] leading-relaxed font-normal">{item.content}</td>
                    <td className="px-3.5 py-3.5 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Icon 1: Giải trình */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedItemForModal(item);
                            setIsGiaiTrinhModalOpen(true);
                          }}
                          className="px-2 py-1 rounded border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 text-[10px] font-bold transition-all cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                          title="Giải trình lý do vi phạm"
                        >
                          <IconMessageDots size={12} />
                        </button>

                        {/* Icon 2: Chấp nhận */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedItemForModal(item);
                            setIsChapNhanModalOpen(true);
                          }}
                          className="w-6 h-6 rounded border border-emerald-400 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 inline-flex items-center justify-center transition-colors cursor-pointer"
                          title="Xác nhận chấp nhận vi phạm"
                        >
                          <IconCheck size={13} />
                        </button>

                        {/* Icon 3: Bỏ qua / Khóa */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedItemForModal(item);
                            setIsBoQuaModalOpen(true);
                          }}
                          className="w-6 h-6 rounded border border-amber-400 bg-amber-50 text-amber-600 hover:bg-amber-100 inline-flex items-center justify-center transition-colors cursor-pointer"
                          title="Bỏ qua / Khóa vi phạm"
                        >
                          <IconAlertTriangle size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div>Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> / {totalFiltered} vi phạm</div>
          <div className="flex items-center gap-1">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold cursor-pointer">Trước</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`w-7 h-7 rounded text-xs font-bold ${currentPage === page ? 'bg-slate-800 text-white' : 'bg-white border'}`}>{page}</button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold cursor-pointer">Sau</button>
          </div>
        </div>
      </div>

      {/* MODAL 1: GIẢI TRÌNH VI PHẠM */}
      <GiaiTrinhViPhamModal
        isOpen={isGiaiTrinhModalOpen}
        onClose={() => setIsGiaiTrinhModalOpen(false)}
        item={selectedItemForModal}
        onSubmitSuccess={() => {
          if (selectedItemForModal) {
            handleAccept(selectedItemForModal.id);
          }
        }}
      />

      {/* MODAL 2: CHẤP NHẬN VI PHẠM */}
      <ChapNhanViPhamModal
        isOpen={isChapNhanModalOpen}
        onClose={() => setIsChapNhanModalOpen(false)}
        item={selectedItemForModal}
        onConfirm={(id) => handleAccept(id)}
      />

      {/* MODAL 3: BỎ QUA / KHÓA VI PHẠM */}
      <BoQuaViPhamModal
        isOpen={isBoQuaModalOpen}
        onClose={() => setIsBoQuaModalOpen(false)}
        item={selectedItemForModal}
        onConfirm={(id) => handleAccept(id)}
      />
    </div>
  );
}
