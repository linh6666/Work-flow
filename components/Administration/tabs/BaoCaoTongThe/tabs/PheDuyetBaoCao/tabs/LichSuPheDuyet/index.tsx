"use client";

import React, { useState, useMemo } from 'react';
import { IconSelector, IconRotate, IconCheck, IconX, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import XacNhanPheDuyetModal, { ReportItemForApproval } from './modal/XacNhanPheDuyetModal';
import TuChoiBaoCaoModal, { ReportItemForRejection } from './modal/TuChoiBaoCaoModal';

interface HistoryReportItem {
  id: string;
  project: string;
  department: string;
  taskName: string;
  status: 'Đã duyệt' | 'Chờ duyệt' | 'Từ chối';
  reporter: string;
  time: string;
  workHours: string;
  dailyProgressPct: string;
  cumulativeProgressPct: string;
}

const INITIAL_HISTORY_REPORTS: HistoryReportItem[] = [
  // VSIP LẠNG SƠN
  { id: '1', project: 'VSIP LẠNG SƠN', department: 'Khối Văn phòng', taskName: 'IN BIÊN BẢN NGHIỆM THU 80% ĐÃ THỐNG NHẤT VỚI KH', status: 'Đã duyệt', reporter: 'Nguyễn Phú Quang', time: '02/07/2027 17:30', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '2', project: 'VSIP LẠNG SƠN', department: 'Khối Văn phòng', taskName: 'THEO DÕI THANH TOÁN 100%', status: 'Đã duyệt', reporter: 'Nguyễn Phú Quang', time: '06/08/2026 16:27', workHours: '0.25h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '3', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CẮT TIT MÔ HÌNH', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:15', workHours: '8h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '4', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CẮT HÀNG RÀO PHỤ TRỢ', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:15', workHours: '8h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '5', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'TIT MÔ HÌNH.', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:15', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '6', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'XẾP CẮT TIT MÔ HÌNH', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:14', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '7', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'HÀNG RÀO PHỤ TRỢ.', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:14', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '8', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'XẾP CẮT HÀNG RÀO PHỤ TRỢ', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:12', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '9', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CẮT CÔNG TRÌNH KHUNG 6', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:12', workHours: '8h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '10', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CẮT CÔNG TRÌNH KHUNG 5', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:11', workHours: '8h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '11', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CẮT CÔNG TRÌNH PHỤ TRỢ', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:10', workHours: '8h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '12', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CÔNG TRÌNH KHUNG 6.', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:10', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '13', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'XẾP CẮT CÔNG TRÌNH KHUNG 6', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:09', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '14', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CÔNG TRÌNH KHUNG 5.', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:09', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '15', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CÔNG TRÌNH PHỤ TRỢ.', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:08', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '16', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'XẾP CÔNG TRÌNH KHUNG 5', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:07', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '17', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'XẾP CẮT CÔNG TRÌNH PHỤ TRỢ', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:07', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '18', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CẮT CÔNG TRÌNH KHUNG 2', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:07', workHours: '8h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '19', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CÔNG TRÌNH KHUNG 2.', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:06', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '20', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'XẾP CẮT CÔNG TRÌNH KHUNG 2', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:06', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '21', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CẮT CÔNG TRÌNH KHUNG 1', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:06', workHours: '8h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '22', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'XẾP CẮT CÔNG TRÌNH KHUNG 1', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:05', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '23', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CÔNG TRÌNH KHUNG 1.', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:05', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '24', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CẮT GIAO THÔNG- VÍA HÈ', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:04', workHours: '8h', dailyProgressPct: '50%', cumulativeProgressPct: '50%' },
  { id: '25', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CẮT GIAO THÔNG- VÍA HÈ', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:04', workHours: '8h', dailyProgressPct: '50%', cumulativeProgressPct: '100%' },
  { id: '26', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'GIAO THÔNG- VÍA HÈ.', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:04', workHours: '8h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '27', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'XẾP CẮT GIAO THÔNG- VÍA HÈ', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:03', workHours: '8h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '28', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CẮT CÔNG TRÌNH KHUNG 4', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:03', workHours: '8h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '29', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', taskName: 'CÔNG TRÌNH KHUNG 4.', status: 'Đã duyệt', reporter: 'Hoàng Hữu Vinh', time: '06/08/2026 11:03', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '30', project: 'VSIP LẠNG SƠN', department: 'Phòng Cảnh Quan', taskName: 'CÂY CRM35 - UỐN THÂN 4.', status: 'Chờ duyệt', reporter: 'Đỗ Ngọc Duyên', time: '04/08/2026 08:47', workHours: '9h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },

  // 22 LIỄU GIAI (PHÒNG CẮT)
  { id: '60', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'XẾP CẮT TUM', status: 'Chờ duyệt', reporter: 'Nguyễn Tuấn Việt', time: '05/08/2026 20:22', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '61', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'TUM', status: 'Chờ duyệt', reporter: 'Nguyễn Tuấn Việt', time: '05/08/2026 20:22', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '62', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'XẾP CẮT CHÚ THÍCH + TÍT MÔ HÌNH', status: 'Chờ duyệt', reporter: 'Nguyễn Tuấn Việt', time: '05/08/2026 20:22', workHours: '2h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '63', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'CHÚ THÍCH + TÍT MÔ HÌNH', status: 'Chờ duyệt', reporter: 'Nguyễn Tuấn Việt', time: '05/08/2026 20:22', workHours: '2h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '64', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'CẮT TƯỜNG TRONG', status: 'Chờ duyệt', reporter: 'Máy 2 (CMH 1390-B-A)', time: '05/08/2026 20:22', workHours: '8h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '65', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'CẮT NỘI THẤT ĐỢT 1', status: 'Chờ duyệt', reporter: 'Máy 2 (CMH 1390-B-A)', time: '05/08/2026 20:22', workHours: '8h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '66', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'CẮT BỂ BƠI', status: 'Chờ duyệt', reporter: 'Máy 2 (CMH 1390-B-A)', time: '05/08/2026 20:22', workHours: '8h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '67', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'CẮT NGOẠI THẤT', status: 'Chờ duyệt', reporter: 'Máy 2 (CMH 1390-B-A)', time: '05/08/2026 20:22', workHours: '8h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '68', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'CẮT TUM', status: 'Chờ duyệt', reporter: 'Máy 2 (CMH 1390-B-A)', time: '05/08/2026 20:22', workHours: '2h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '69', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'CẮT CHÚ THÍCH + TÍT MÔ HÌNH', status: 'Chờ duyệt', reporter: 'Máy 2 (CMH 1390-B-A)', time: '05/08/2026 20:22', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '70', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'XẾP CẮT SÀN+TRẦN ĐIỆN + ĐỆM KỸ THUẬT', status: 'Chờ duyệt', reporter: 'Lê Trung Hiếu', time: '05/08/2026 20:22', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '71', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'XẾP CẮT BỒN CÂY', status: 'Chờ duyệt', reporter: 'Hoàng Hữu Vinh', time: '05/08/2026 20:22', workHours: '2h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '72', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'BỒN CÂY', status: 'Chờ duyệt', reporter: 'Hoàng Hữu Vinh', time: '05/08/2026 20:22', workHours: '2h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '73', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'XẾP CẮT NAN CHỚP', status: 'Chờ duyệt', reporter: 'Hoàng Hữu Vinh', time: '05/08/2026 20:22', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '74', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'NAN CHỚP', status: 'Chờ duyệt', reporter: 'Hoàng Hữu Vinh', time: '05/08/2026 20:22', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '75', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'XẾP CẮT THANG BỘ', status: 'Chờ duyệt', reporter: 'Hoàng Hữu Vinh', time: '05/08/2026 20:22', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '76', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'KÍNH + ĐỐ KÍNH', status: 'Chờ duyệt', reporter: 'Lê Trung Hiếu', time: '05/08/2026 20:22', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '77', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'XẾP CẮT TƯỜNG VỎ', status: 'Chờ duyệt', reporter: 'Lê Trung Hiếu', time: '05/08/2026 20:22', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '78', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'LÕI ĐIỆN', status: 'Chờ duyệt', reporter: 'Hoàng Hữu Vinh', time: '05/08/2026 20:22', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '79', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'XẾP CẮT TÁP ĐẤY', status: 'Chờ duyệt', reporter: 'Hoàng Hữu Vinh', time: '05/08/2026 20:22', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '80', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'TÁP ĐẤY', status: 'Chờ duyệt', reporter: 'Hoàng Hữu Vinh', time: '05/08/2026 20:22', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '81', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'XẾP CẮT BAN CÔNG + LAN CAN', status: 'Chờ duyệt', reporter: 'Hoàng Hữu Vinh', time: '05/08/2026 20:22', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '82', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'XẾP CẮT MÁI SẢNH', status: 'Chờ duyệt', reporter: 'Nguyễn Tuấn Việt', time: '05/08/2026 20:22', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '83', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'MÁI SẢNH', status: 'Chờ duyệt', reporter: 'Nguyễn Tuấn Việt', time: '05/08/2026 20:22', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '84', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'XẾP CẮT HỘP KỸ THUẬT', status: 'Chờ duyệt', reporter: 'Nguyễn Tuấn Việt', time: '05/08/2026 20:22', workHours: '2h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '85', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'XẾP CẮT PHỤ TRỢ KHỐI ĐẾ', status: 'Chờ duyệt', reporter: 'Nguyễn Tuấn Việt', time: '05/08/2026 20:22', workHours: '2h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '86', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'TƯỜNG VỎ', status: 'Chờ duyệt', reporter: 'Lê Trung Hiếu', time: '05/08/2026 20:22', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '87', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'LẬP BẢNG TIẾN ĐỘ + HỘP TRIỂN KHAI DỰ ÁN', status: 'Chờ duyệt', reporter: 'Hoàng Hữu Vinh', time: '05/08/2026 20:22', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '88', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'LẬP BẢNG PHÂN CÔNG NHÂN SỰ', status: 'Chờ duyệt', reporter: 'Hoàng Hữu Vinh', time: '05/08/2026 20:22', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '89', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'CẮT GIAO THÔNG - VÍA HÈ', status: 'Chờ duyệt', reporter: 'Máy 4 (CMH 1390-B-A)', time: '05/08/2026 20:22', workHours: '8h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '90', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'XẾP CẮT PHỤ TRỢ', status: 'Chờ duyệt', reporter: 'Nguyễn Tuấn Việt', time: '05/08/2026 20:22', workHours: '2h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '91', project: '22 LIỄU GIAI', department: 'Phòng Cắt', taskName: 'PHỤ TRỢ', status: 'Chờ duyệt', reporter: 'Nguyễn Tuấn Việt', time: '05/08/2026 20:22', workHours: '2h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },

  // 22 LIỄU GIAI (KHỐI VĂN PHÒNG)
  { id: '92', project: '22 LIỄU GIAI', department: 'Khối Văn phòng', taskName: 'LẬP BIÊN BẢN NGHIỆM THU VÀ PHÊ DUYỆT NỘI BỘ (LẦN 2)', status: 'Chờ duyệt', reporter: 'Kỳ Anh', time: '30/07/2026 15:41', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '93', project: '22 LIỄU GIAI', department: 'Khối Văn phòng', taskName: 'GỬI MẪU BIÊN BẢN BÀN GIAO MÔ HÌNH, BIÊN BẢN NGHIỆM THU, PHIẾU BẢO HÀNH CHO KH', status: 'Chờ duyệt', reporter: 'Kỳ Anh', time: '30/07/2026 15:39', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '94', project: '22 LIỄU GIAI', department: 'Khối Văn phòng', taskName: 'IN BIÊN BẢN NGHIỆM THU 100% ĐÃ THỐNG NHẤT VỚI KH', status: 'Chờ duyệt', reporter: 'Kỳ Anh', time: '30/07/2026 15:39', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '95', project: '22 LIỄU GIAI', department: 'Khối Văn phòng', taskName: 'THEO DÕI TIẾN ĐỘ DỰ ÁN MỨC NGHIỆM THU 100%', status: 'Chờ duyệt', reporter: 'Kỳ Anh', time: '30/07/2026 15:38', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '96', project: '22 LIỄU GIAI', department: 'Khối Văn phòng', taskName: 'THEO DÕI TIẾN ĐỘ DỰ ÁN TUẦN 7', status: 'Chờ duyệt', reporter: 'Kỳ Anh', time: '30/07/2026 15:33', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '97', project: '22 LIỄU GIAI', department: 'Khối Văn phòng', taskName: 'THEO DÕI TIẾN ĐỘ DỰ ÁN TUẦN 6', status: 'Chờ duyệt', reporter: 'Kỳ Anh', time: '30/07/2026 15:27', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '98', project: '22 LIỄU GIAI', department: 'Khối Văn phòng', taskName: 'THEO DÕI TIẾN ĐỘ DỰ ÁN TUẦN 5', status: 'Chờ duyệt', reporter: 'Kỳ Anh', time: '30/07/2026 15:19', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '99', project: '22 LIỄU GIAI', department: 'Khối Văn phòng', taskName: 'THEO DÕI TIẾN ĐỘ DỰ ÁN TUẦN 4', status: 'Chờ duyệt', reporter: 'Kỳ Anh', time: '30/07/2026 15:07', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '100', project: '22 LIỄU GIAI', department: 'Khối Văn phòng', taskName: 'THEO DÕI TIẾN ĐỘ DỰ ÁN TUẦN 3', status: 'Chờ duyệt', reporter: 'Kỳ Anh', time: '30/07/2026 15:07', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '101', project: '22 LIỄU GIAI', department: 'Khối Văn phòng', taskName: 'THEO DÕI THANH TOÁN 80%', status: 'Chờ duyệt', reporter: 'Kỳ Anh', time: '30/07/2026 14:58', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '102', project: '22 LIỄU GIAI', department: 'Khối Văn phòng', taskName: 'GỬI BIÊN BẢN NGHIỆM THU 80% TỚI KH VÀ CÁC BỘ PHẬN', status: 'Chờ duyệt', reporter: 'Kỳ Anh', time: '30/07/2026 14:57', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '103', project: '22 LIỄU GIAI', department: 'Khối Văn phòng', taskName: 'LẬP BIÊN BẢN NGHIỆM THU VÀ PHÊ DUYỆT NỘI BỘ', status: 'Chờ duyệt', reporter: 'Kỳ Anh', time: '30/07/2026 14:56', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '104', project: '22 LIỄU GIAI', department: 'Khối Văn phòng', taskName: 'IN BIÊN BẢN NGHIỆM THU 80% ĐÃ THỐNG NHẤT VỚI KH', status: 'Chờ duyệt', reporter: 'Kỳ Anh', time: '30/07/2026 14:56', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '105', project: '22 LIỄU GIAI', department: 'Khối Văn phòng', taskName: 'TỔ CHỨC NGHIỆM THU 80%', status: 'Chờ duyệt', reporter: 'Kỳ Anh', time: '30/07/2026 14:55', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },

  // HERITAGE VILLAGE MOC CHAU
  { id: '106', project: 'HERITAGE VILLAGE MOC CHAU', department: 'Khối Văn phòng', taskName: 'GỬI ĐỀ NGHỊ THANH TOÁN HỢP ĐỒNG', status: 'Chờ duyệt', reporter: 'Bùi Phương Uyên', time: '07/08/2026 01:37', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },

  // PHÒNG HỌP MHV
  { id: '31', project: 'PHÒNG HỌP MHV', department: 'Phòng Mộc Sơn', taskName: 'SƠN TƯỜNG SUNSHINE CITY', status: 'Chờ duyệt', reporter: 'Hoàng Quyết Thắng', time: '07/08/2026 10:48', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '32', project: 'PHÒNG HỌP MHV', department: 'Phòng Mộc Sơn', taskName: 'SƠN KÍNH SUNSHINE EMPIRE- TM13', status: 'Chờ duyệt', reporter: 'Hoàng Quyết Thắng', time: '07/08/2026 10:47', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '33', project: 'PHÒNG HỌP MHV', department: 'Phòng Mộc Sơn', taskName: 'SƠN TƯỜNG SUNSHINE EMPIRE- TM13', status: 'Chờ duyệt', reporter: 'Hoàng Quyết Thắng', time: '07/08/2026 10:47', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '34', project: 'PHÒNG HỌP MHV', department: 'Phòng Mộc Sơn', taskName: 'SƠN SÀN, VÍA HÈ', status: 'Chờ duyệt', reporter: 'Hoàng Quyết Thắng', time: '07/08/2026 10:46', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '35', project: 'PHÒNG HỌP MHV', department: 'Phòng Mộc Sơn', taskName: 'SƠN GIAO THÔNG', status: 'Chờ duyệt', reporter: 'Hoàng Quyết Thắng', time: '07/08/2026 10:45', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '36', project: 'PHÒNG HỌP MHV', department: 'Phòng Khai triển', taskName: 'TỔNG HỢP HỒ SƠ CÔNG TRÌNH 102 TRƯỜNG CHINH - GĐ 1', status: 'Đã duyệt', reporter: 'Trần Diễm My', time: '05/08/2026 21:02', workHours: '2h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '37', project: 'PHÒNG HỌP MHV', department: 'Phòng Khai triển', taskName: 'TỔNG HỢP HỒ SƠ CÔNG TRÌNH DUBAI', status: 'Đã duyệt', reporter: 'Trần Diễm My', time: '05/08/2026 21:01', workHours: '2h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '38', project: 'PHÒNG HỌP MHV', department: 'Phòng Khai triển', taskName: 'TỔNG HỢP CHUYỂN CẮT CÔNG TRÌNH MH BITEXCO-KUME', status: 'Đã duyệt', reporter: 'Trần Diễm My', time: '05/08/2026 21:01', workHours: '2h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '39', project: 'PHÒNG HỌP MHV', department: 'Phòng Khai triển', taskName: 'TỔNG HỢP CHUYỂN CẮT NỀN MH BITEXCO-KUME', status: 'Đã duyệt', reporter: 'Trần Diễm My', time: '05/08/2026 21:00', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '40', project: 'PHÒNG HỌP MHV', department: 'Phòng Khai triển', taskName: 'TỔNG HỢP CHUYỂN CẮT MH EXIM BANK, VNTA', status: 'Đã duyệt', reporter: 'Trần Diễm My', time: '05/08/2026 21:00', workHours: '6h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '41', project: 'PHÒNG HỌP MHV', department: 'Phòng Khai triển', taskName: 'DỰNG LOGO MHV CÓ ÁNH SÁNG TRÊN BỨC TƯỜNG LỊCH SỬ', status: 'Đã duyệt', reporter: 'Trần Diễm My', time: '05/08/2026 20:59', workHours: '2h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '42', project: 'PHÒNG HỌP MHV', department: 'Phòng Khai triển', taskName: 'DỰNG PHỐI CẢNH CHÂN BỤC ĐỠ ĐOÀN TÀU', status: 'Đã duyệt', reporter: 'Trần Diễm My', time: '05/08/2026 20:58', workHours: '3h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '43', project: 'PHÒNG HỌP MHV', department: 'Phòng Khai triển', taskName: 'DỰNG HÌNH BỐ TRÍ THIẾT BỊ ĐIỆN LẦN 3', status: 'Đã duyệt', reporter: 'Trần Diễm My', time: '05/08/2026 20:56', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },

  // QUÀ TẶNG KHÁCH HÀNG
  { id: '44', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Mộc Sơn', taskName: 'SƠN TƯỜNG', status: 'Chờ duyệt', reporter: 'Hoàng Quyết Thắng', time: '07/08/2026 10:33', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '45', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Mộc Sơn', taskName: 'SƠN SÀN, VÍA HÈ', status: 'Chờ duyệt', reporter: 'Hoàng Quyết Thắng', time: '07/08/2026 10:32', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '46', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Mộc Sơn', taskName: 'SƠN GIAO THÔNG', status: 'Chờ duyệt', reporter: 'Hoàng Quyết Thắng', time: '07/08/2026 10:32', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '47', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Mộc Sơn', taskName: 'SƠN GIÁP BẢ VẾT GHÉP', status: 'Chờ duyệt', reporter: 'Nguyễn Minh Hiếu', time: '07/08/2026 10:30', workHours: '4h', dailyProgressPct: '20%', cumulativeProgressPct: '100%' },
  { id: '48', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Mộc Sơn', taskName: 'DÁN LAMINATE KHUNG BẢNG', status: 'Chờ duyệt', reporter: 'Nguyễn Minh Hiếu', time: '07/08/2026 10:26', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '49', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Mộc Sơn', taskName: 'SƠN GIÁP BẢ VẾT GHÉP', status: 'Chờ duyệt', reporter: 'Nguyễn Minh Hiếu', time: '07/08/2026 10:26', workHours: '8h', dailyProgressPct: '80%', cumulativeProgressPct: '80%' },
  { id: '50', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Mộc Sơn', taskName: 'ĐÓNG THÔ KHUNG BẢNG', status: 'Chờ duyệt', reporter: 'Đình Hữu Sử', time: '07/08/2026 10:24', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '51', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Mộc Sơn', taskName: 'XẺ GỖ KHUNG BẢNG', status: 'Chờ duyệt', reporter: 'Đình Hữu Sử', time: '07/08/2026 10:23', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '52', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Mộc Sơn', taskName: 'CHỦ TRÌ DỰ ÁN', status: 'Chờ duyệt', reporter: 'Đình Hữu Sử', time: '07/08/2026 10:21', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '53', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Mộc Sơn', taskName: 'THỐNG KÊ', status: 'Chờ duyệt', reporter: 'Đình Hữu Sử', time: '07/08/2026 10:20', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '54', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Mộc Sơn', taskName: 'LẬP BẢNG TIẾN ĐỘ + HỘP TRIỂN KHAI DỰ ÁN', status: 'Chờ duyệt', reporter: 'Đình Hữu Sử', time: '07/08/2026 10:20', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '55', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Mộc Sơn', taskName: 'LẬP BẢNG PHÂN CÔNG NHÂN SỰ', status: 'Chờ duyệt', reporter: 'Đình Hữu Sử', time: '07/08/2026 10:20', workHours: '1h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '56', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Ghép', taskName: 'DÁN SÀN NỀN', status: 'Đã duyệt', reporter: 'Định Đức Lợi', time: '06/08/2026 15:32', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '57', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Ghép', taskName: 'HOÀN THIỆN TƯỜNG SÀN NHÀ BIỆT THỰ', status: 'Đã duyệt', reporter: 'Định Đức Lợi', time: '06/08/2026 15:23', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '58', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Ghép', taskName: 'CHUYỂN SƠN SÀN, TƯỜNG, CHI TIẾT TRÊN NHÀ, BÓC ĐỔ KÍNH, ĐẤY Ô KÍNH', status: 'Đã duyệt', reporter: 'Định Đức Lợi', time: '06/08/2026 15:22', workHours: '4h', dailyProgressPct: '100%', cumulativeProgressPct: '100%' },
  { id: '59', project: 'QUÀ TẶNG KHÁCH HÀNG', department: 'Phòng Ghép', taskName: 'LẮP RÁP MÔ HÌNH BIỆT THỰ MẪU', status: 'Từ chối', reporter: 'Lê Hoàng Nam', time: '04/08/2026 14:10', workHours: '2h', dailyProgressPct: '0%', cumulativeProgressPct: '0%' },
];

export default function LichSuPheDuyet() {
  const [reports, setReports] = useState<HistoryReportItem[]>(INITIAL_HISTORY_REPORTS);
  const [activeTab, setActiveTab] = useState<'tat-ca' | 'cho-duyet' | 'da-duyet' | 'tu-choi'>('tat-ca');
  const [selectedProject, setSelectedProject] = useState('tat-ca');
  const [selectedDepartment, setSelectedDepartment] = useState('tat-ca');
  const [selectedStaff, setSelectedStaff] = useState('tat-ca');

  // Approve Modal state ("V" button)
  const [selectedReportForApprove, setSelectedReportForApprove] = useState<ReportItemForApproval | null>(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

  // Reject Modal state ("X" button)
  const [selectedReportForReject, setSelectedReportForReject] = useState<ReportItemForRejection | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 13;

  // Compute counts for tabs
  const choDuyetCount = useMemo(() => reports.filter(r => r.status === 'Chờ duyệt').length, [reports]);
  const daDuyetCount = useMemo(() => reports.filter(r => r.status === 'Đã duyệt').length, [reports]);
  const tuChoiCount = useMemo(() => reports.filter(r => r.status === 'Từ chối').length, [reports]);

  // Compute unique dropdown options
  const projectOptions = useMemo(() => Array.from(new Set(reports.map(r => r.project))), [reports]);
  const departmentOptions = useMemo(() => Array.from(new Set(reports.map(r => r.department))), [reports]);
  const staffOptions = useMemo(() => Array.from(new Set(reports.map(r => r.reporter))), [reports]);

  // Approve Modal Handlers ("V" button)
  const handleOpenApproveModal = (report: HistoryReportItem) => {
    setSelectedReportForApprove({
      id: report.id,
      project: report.project,
      department: report.department,
      taskName: report.taskName,
      status: report.status,
      reporter: report.reporter,
      time: report.time,
      workHours: report.workHours,
      quantity: 1,
    });
    setIsApproveModalOpen(true);
  };

  const handleCloseApproveModal = () => {
    setIsApproveModalOpen(false);
    setSelectedReportForApprove(null);
  };

  const handleConfirmApproveModal = (id: string, newStatus: 'Đã duyệt' | 'Từ chối') => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  // Reject Modal Handlers ("X" button)
  const handleOpenRejectModal = (report: HistoryReportItem) => {
    setSelectedReportForReject({
      id: report.id,
      project: report.project,
      department: report.department,
      taskName: report.taskName,
      status: report.status,
      reporter: report.reporter,
      time: report.time,
      workHours: report.workHours,
      quantity: 1,
    });
    setIsRejectModalOpen(true);
  };

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
    setSelectedReportForReject(null);
  };

  const handleConfirmRejectModal = (id: string, reason: string) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'Từ chối' } : r)));
  };

  const handleApprove = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'Đã duyệt' } : r));
  };

  const handleReject = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'Từ chối' } : r));
  };

  const handleUndo = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'Chờ duyệt' } : r));
  };

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      // Filter by Tab status
      if (activeTab === 'cho-duyet' && r.status !== 'Chờ duyệt') return false;
      if (activeTab === 'da-duyet' && r.status !== 'Đã duyệt') return false;
      if (activeTab === 'tu-choi' && r.status !== 'Từ chối') return false;

      // Filter by Project
      if (selectedProject !== 'tat-ca' && r.project !== selectedProject) return false;

      // Filter by Department
      if (selectedDepartment !== 'tat-ca' && r.department !== selectedDepartment) return false;

      // Filter by Staff
      if (selectedStaff !== 'tat-ca' && r.reporter !== selectedStaff) return false;

      return true;
    });
  }, [reports, activeTab, selectedProject, selectedDepartment, selectedStaff]);

  const totalFiltered = filtered.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFiltered);
  const paginated = filtered.slice(startIndex, endIndex);

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2 overflow-hidden select-none text-left">
      {/* TOP FILTERS & TABS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 shrink-0 py-1">
        {/* Left Status Tabs */}
        <div className="flex items-center gap-1 bg-slate-100/60 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setActiveTab('tat-ca');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'tat-ca'
                ? 'bg-[#1e293b] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 font-medium'
            }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('cho-duyet');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              activeTab === 'cho-duyet'
                ? 'bg-[#1e293b] text-white shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 font-medium'
            }`}
          >
            Chờ duyệt ({choDuyetCount})
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('da-duyet');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              activeTab === 'da-duyet'
                ? 'bg-[#1e293b] text-white shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 font-medium'
            }`}
          >
            Đã duyệt ({daDuyetCount})
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('tu-choi');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              activeTab === 'tu-choi'
                ? 'bg-[#1e293b] text-white shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 font-medium'
            }`}
          >
            Từ chối ({tuChoiCount})
          </button>
        </div>

        {/* Right Select Dropdowns */}
        <div className="flex items-center gap-2.5">
          <select
            value={selectedProject}
            onChange={(e) => {
              setSelectedProject(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-slate-400 shadow-2xs cursor-pointer min-w-[130px]"
          >
            <option value="tat-ca">Tất cả dự án</option>
            {projectOptions.map((proj) => (
              <option key={proj} value={proj}>{proj}</option>
            ))}
          </select>

          <select
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-slate-400 shadow-2xs cursor-pointer min-w-[140px]"
          >
            <option value="tat-ca">Tất cả phòng ban</option>
            {departmentOptions.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={selectedStaff}
            onChange={(e) => {
              setSelectedStaff(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-slate-400 shadow-2xs cursor-pointer min-w-[130px]"
          >
            <option value="tat-ca">Tất cả nhân sự</option>
            {staffOptions.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* TABLE DATA CONTAINER */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[1000px]">
            <thead className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-xs border-b border-slate-200">
              <tr className="text-slate-600 font-bold text-[11px]">
                <th className="px-4 py-3 border-b border-slate-200">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>Dự án</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>
                <th className="px-4 py-3 border-b border-slate-200">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>Phòng ban</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>
                <th className="px-4 py-3 border-b border-slate-200">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>Công việc</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>
                <th className="px-4 py-3 border-b border-slate-200">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>Trạng thái</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>
                <th className="px-4 py-3 border-b border-slate-200">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>Người báo cáo</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>
                <th className="px-4 py-3 border-b border-slate-200">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>Thời gian</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>
                <th className="px-4 py-3 border-b border-slate-200 text-center">
                  <div className="flex items-center justify-center gap-1 cursor-pointer select-none">
                    <span>Giờ TH</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>
                <th className="px-4 py-3 border-b border-slate-200 text-center">
                  <div className="flex items-center justify-center gap-1 cursor-pointer select-none">
                    <span>%HT trong ngày</span>
                    <IconSelector size={13} className="text-slate-400" />
                  </div>
                </th>
                <th className="px-4 py-3 border-b border-slate-200 text-center">
                  <div className="flex items-center justify-center gap-1 cursor-pointer select-none">
                    <span>% HT Lũy tiến</span>
                  </div>
                </th>
                <th className="px-4 py-3 border-b border-slate-200 text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-slate-400 text-xs">
                    Không tìm thấy dữ liệu báo cáo phù hợp.
                  </td>
                </tr>
              ) : (
                paginated.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Dự án */}
                    <td className="px-4 py-3.5 font-bold text-slate-800 text-[11px] leading-tight max-w-[130px]">
                      {r.project}
                    </td>

                    {/* Phòng ban */}
                    <td className="px-4 py-3.5 text-slate-500 text-[11px]">
                      {r.department}
                    </td>

                    {/* Công việc */}
                    <td className="px-4 py-3.5 font-bold text-slate-700 text-[11px] uppercase max-w-[320px]">
                      {r.taskName}
                    </td>

                    {/* Trạng thái */}
                    <td className="px-4 py-3.5">
                      {r.status === 'Đã duyệt' && (
                        <span className="inline-flex items-center justify-center px-3 py-0.5 rounded-full text-[11px] font-semibold bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
                          Đã duyệt
                        </span>
                      )}
                      {r.status === 'Chờ duyệt' && (
                        <span className="inline-flex items-center justify-center px-3 py-0.5 rounded-full text-[11px] font-semibold bg-[#fef3c7] text-[#d97706] border border-[#fde68a]">
                          Chờ duyệt
                        </span>
                      )}
                      {r.status === 'Từ chối' && (
                        <span className="inline-flex items-center justify-center px-3 py-0.5 rounded-full text-[11px] font-semibold bg-[#fee2e2] text-[#dc2626] border border-[#fca5a5]">
                          Từ chối
                        </span>
                      )}
                    </td>

                    {/* Người báo cáo */}
                    <td className="px-4 py-3.5 text-slate-600 text-[11px] font-medium whitespace-nowrap">
                      {r.reporter}
                    </td>

                    {/* Thời gian */}
                    <td className="px-4 py-3.5 text-[#b45309] text-[11px] font-medium whitespace-nowrap">
                      {r.time}
                    </td>

                    {/* Giờ TH */}
                    <td className="px-4 py-3.5 text-center text-[#d97706] font-bold text-[11px]">
                      {r.workHours}
                    </td>

                    {/* %HT trong ngày */}
                    <td className="px-4 py-3.5 text-center text-[#7c3aed] font-bold text-[11px]">
                      {r.dailyProgressPct}
                    </td>

                    {/* % HT Lũy tiến */}
                    <td className="px-4 py-3.5 text-center text-[#7c3aed] font-bold text-[11px]">
                      {r.cumulativeProgressPct}
                    </td>

                    {/* Hành động */}
                    <td className="px-4 py-3.5 text-center">
                      {r.status === 'Chờ duyệt' ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenApproveModal(r)}
                            className="w-7 h-7 rounded-full border border-emerald-400 bg-emerald-50/50 text-emerald-600 hover:bg-emerald-100 inline-flex items-center justify-center transition-colors cursor-pointer"
                            title="Duyệt báo cáo"
                          >
                            <IconCheck size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenRejectModal(r)}
                            className="w-7 h-7 rounded-full border border-rose-400 bg-rose-50/50 text-rose-600 hover:bg-rose-100 inline-flex items-center justify-center transition-colors cursor-pointer"
                            title="Từ chối báo cáo"
                          >
                            <IconX size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleUndo(r.id)}
                          className="w-7 h-7 rounded-full border border-[#7c3aed]/50 text-[#7c3aed] hover:bg-[#7c3aed]/10 inline-flex items-center justify-center transition-colors cursor-pointer"
                          title="Hoàn tác (Chuyển lại Chờ duyệt)"
                        >
                          <IconRotate size={14} />
                        </button>
                      )}
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
            Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalFiltered}</span> báo cáo
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
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
                    ? 'bg-[#1e293b] text-white shadow-2xs'
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
              className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Sau</span>
              <IconChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DUYỆT BÁO CÁO (NÚT "V") */}
      <XacNhanPheDuyetModal
        isOpen={isApproveModalOpen}
        onClose={handleCloseApproveModal}
        report={selectedReportForApprove}
        onConfirm={handleConfirmApproveModal}
      />

      {/* MODAL TỪ CHỐI BÁO CÁO (NÚT "X") */}
      <TuChoiBaoCaoModal
        isOpen={isRejectModalOpen}
        onClose={handleCloseRejectModal}
        report={selectedReportForReject}
        onConfirm={handleConfirmRejectModal}
      />
    </div>
  );
}



