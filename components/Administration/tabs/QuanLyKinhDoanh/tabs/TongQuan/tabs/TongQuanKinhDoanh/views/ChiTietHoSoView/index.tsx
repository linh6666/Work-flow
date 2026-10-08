"use client";

import React, { useState, useEffect } from 'react';
import {
  IconArrowLeft,
  IconArrowsExchange,
  IconFileSpreadsheet,
  IconDeviceFloppy,
  IconTrash,
  IconPlus,
  IconChevronDown,
  IconChevronRight,
  IconGripVertical,
  IconCalendar,
  IconHistory,
} from '@tabler/icons-react';

interface ProjectCardItem {
  id: string;
  typeTag: string;
  code: string;
  status: 'Đang triển khai' | 'Đang thực hiện' | 'Hoàn thành' | 'Tạm dừng';
  evaluation: 'Đúng tiến độ' | 'Chậm tiến độ, lỗi khách quan' | 'Chưa đánh giá';
  num: number;
  title: string;
  desc?: string;
  startDate?: string;
  dueDate?: string;
  client?: string;
  progress: number;
  borderColor: string;
}

interface FullTaskItem {
  stt: number;
  group: 'BÁO GIÁ' | 'HỢP ĐỒNG' | 'QL DỰ ÁN';
  bcBadge: string; // e.g. '0.5h 📄1BC' or '📄BC'
  status: string;
  title: string;
  klDk: number;
  klDp: number;
  assignee: string; // 'Bùi Phương Uyên' | 'Bùi Thị Duyên' | ''
  gioDk: string;
  gioTt: string;
  startDate: string;
  endDate: string;
  rowBgColor?: 'blue' | 'yellow' | 'white';
}

const ALL_61_TASKS: FullTaskItem[] = [
  // ── GROUP 1: BÁO GIÁ (1-11) ──
  {
    stt: 1,
    group: 'BÁO GIÁ',
    bcBadge: '0.5h 📄1BC',
    status: 'Chưa bắt đầu',
    title: 'LẬP YÊU CẦU ĐỀ XUẤT BÁO GIÁ',
    klDk: 1,
    klDp: 0,
    assignee: 'Bùi Phương Uyên',
    gioDk: '1h',
    gioTt: '—',
    startDate: '09/09/2026',
    endDate: '09/09/2026',
    rowBgColor: 'blue',
  },
  {
    stt: 2,
    group: 'BÁO GIÁ',
    bcBadge: '0.5h 📄1BC',
    status: 'Chưa bắt đầu',
    title: 'DUYỆT BGĐ YÊU CẦU ĐỀ XUẤT BÁO GIÁ',
    klDk: 1,
    klDp: 0,
    assignee: 'Bùi Phương Uyên',
    gioDk: '1h',
    gioTt: '—',
    startDate: '09/09/2026',
    endDate: '09/09/2026',
    rowBgColor: 'blue',
  },
  {
    stt: 3,
    group: 'BÁO GIÁ',
    bcBadge: '0.5h 📄1BC',
    status: 'Chưa bắt đầu',
    title: 'CHUYỂN THÔNG TIN HỒ SƠ BẢN VẼ & ĐỀ XUẤT BÁO GIÁ CHO GĐ HOẶC PHÒNG KHAI TRIỂN KIỂM TRA VÀ LÊN KHUNG TMB BÁO GIÁ, TỶ LỆ, KÍCH THƯỚC MÔ HÌNH',
    klDk: 1,
    klDp: 0,
    assignee: 'Bùi Phương Uyên',
    gioDk: '1h',
    gioTt: '—',
    startDate: '09/10/2026',
    endDate: '09/10/2026',
    rowBgColor: 'blue',
  },
  {
    stt: 4,
    group: 'BÁO GIÁ',
    bcBadge: '📄BC',
    status: 'Chưa bắt đầu',
    title: 'GỬI PHIẾU TÍNH BÁO GIÁ TỚI CÁC PHÒNG',
    klDk: 1,
    klDp: 0,
    assignee: 'Bùi Thị Duyên',
    gioDk: '1h',
    gioTt: '—',
    startDate: '09/10/2026',
    endDate: '09/10/2026',
    rowBgColor: 'yellow',
  },
  {
    stt: 5,
    group: 'BÁO GIÁ',
    bcBadge: '📄BC',
    status: 'Chưa bắt đầu',
    title: 'LÊN BÁO GIÁ SƠ BỘ',
    klDk: 1,
    klDp: 0,
    assignee: 'Bùi Thị Duyên',
    gioDk: '1h',
    gioTt: '—',
    startDate: '09/10/2026',
    endDate: '09/10/2026',
    rowBgColor: 'yellow',
  },
  {
    stt: 6,
    group: 'BÁO GIÁ',
    bcBadge: '📄BC',
    status: 'Chưa bắt đầu',
    title: 'ĐỐI CHIẾU BÁO GIÁ VỚI BẢNG TÍNH VÀ RA BÁO GIÁ CHÍNH THỨC',
    klDk: 1,
    klDp: 0,
    assignee: 'Bùi Thị Duyên',
    gioDk: '1h',
    gioTt: '—',
    startDate: '09/10/2026',
    endDate: '09/10/2026',
    rowBgColor: 'yellow',
  },
  {
    stt: 7,
    group: 'BÁO GIÁ',
    bcBadge: '1h 📄1BC',
    status: 'Chưa bắt đầu',
    title: 'DUYỆT BÁO GIÁ VỚI BGĐ',
    klDk: 1,
    klDp: 0,
    assignee: 'Bùi Phương Uyên',
    gioDk: '1h',
    gioTt: '—',
    startDate: '09/14/2026',
    endDate: '09/14/2026',
    rowBgColor: 'blue',
  },
  {
    stt: 8,
    group: 'BÁO GIÁ',
    bcBadge: '📄BC',
    status: 'Chưa bắt đầu',
    title: 'GỬI BÁO GIÁ TỚI KHÁCH HÀNG',
    klDk: 1,
    klDp: 0,
    assignee: 'Bùi Phương Uyên',
    gioDk: '1h',
    gioTt: '—',
    startDate: '09/14/2026',
    endDate: '09/14/2026',
    rowBgColor: 'blue',
  },
  {
    stt: 9,
    group: 'BÁO GIÁ',
    bcBadge: '📄BC',
    status: 'Chưa bắt đầu',
    title: 'THÔNG BÁO TỚI KH ĐÃ GỬI BÁO GIÁ & THEO DÕI XEM KH ĐÃ NHẬN ĐƯỢC CHƯA?',
    klDk: 1,
    klDp: 0,
    assignee: 'Bùi Phương Uyên',
    gioDk: '1h',
    gioTt: '—',
    startDate: '09/14/2026',
    endDate: '09/14/2026',
    rowBgColor: 'blue',
  },
  {
    stt: 10,
    group: 'BÁO GIÁ',
    bcBadge: '📄BC',
    status: 'Chưa bắt đầu',
    title: 'BÁO CÁO TÌNH TRẠNG BÁO GIÁ VỚI BGĐ',
    klDk: 1,
    klDp: 0,
    assignee: 'Bùi Phương Uyên',
    gioDk: '1h',
    gioTt: '—',
    startDate: '09/15/2026',
    endDate: '09/15/2026',
    rowBgColor: 'blue',
  },
  {
    stt: 11,
    group: 'BÁO GIÁ',
    bcBadge: '📄BC',
    status: 'Chưa bắt đầu',
    title: 'KHÁCH HÀNG XÁC NHẬN TRIỂN KHAI MÔ HÌNH',
    klDk: 1,
    klDp: 0,
    assignee: 'Bùi Phương Uyên',
    gioDk: '1h',
    gioTt: '—',
    startDate: '09/15/2026',
    endDate: '09/15/2026',
    rowBgColor: 'blue',
  },

  // ── GROUP 2: HỢP ĐỒNG (12-35) ──
  { stt: 12, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'LẬP DỰ THẢO HỢP ĐỒNG VÀ THEO DÕI PHÊ DUYỆT', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '09/16/2026', endDate: '09/16/2026', rowBgColor: 'white' },
  { stt: 13, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'ĐÀM PHÁN HỢP ĐỒNG', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '09/17/2026', endDate: '09/18/2026', rowBgColor: 'white' },
  { stt: 14, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'IN VÀ KÝ HỢP ĐỒNG GỬI KHÁCH HÀNG SAU ĐÀM PHÁN', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '09/18/2026', endDate: '09/19/2026', rowBgColor: 'white' },
  { stt: 15, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI KÝ HỢP ĐỒNG', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '09/19/2026', endDate: '09/20/2026', rowBgColor: 'white' },
  { stt: 16, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI EMAIL YÊU CẦU HỒ SƠ BẢN VẼ DỰ ÁN', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '09/20/2026', endDate: '09/20/2026', rowBgColor: 'white' },
  { stt: 17, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'LƯU HỒ SƠ DỰ ÁN VỀ BÊN KỸ THUẬT VÀ THÔNG BÁO NHÓM DỰ ÁN', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '09/21/2026', endDate: '09/21/2026', rowBgColor: 'white' },
  { stt: 18, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI TẠM ỨNG', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '09/22/2026', endDate: '09/22/2026', rowBgColor: 'white' },
  { stt: 19, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'NHẬN TẠM ỨNG TỪ KHÁCH HÀNG', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '09/23/2026', endDate: '09/23/2026', rowBgColor: 'white' },
  { stt: 20, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI HỌP TRIỂN KHAI DỰ ÁN', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '09/24/2026', endDate: '09/24/2026', rowBgColor: 'white' },
  { stt: 21, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI TIẾN ĐỘ DỰ ÁN TUẦN 1', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '09/25/2026', endDate: '09/25/2026', rowBgColor: 'white' },
  { stt: 22, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI TIẾN ĐỘ DỰ ÁN TUẦN 2', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '09/26/2026', endDate: '09/26/2026', rowBgColor: 'white' },
  { stt: 23, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI TIẾN ĐỘ DỰ ÁN TUẦN 3', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '09/27/2026', endDate: '09/27/2026', rowBgColor: 'white' },
  { stt: 24, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI TIẾN ĐỘ DỰ ÁN MỨC NGHIỆM THU 80%', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '09/28/2026', endDate: '09/28/2026', rowBgColor: 'white' },
  { stt: 25, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI MẪU BIÊN BẢN NGHIỆM THU 80% VÀ 100% TỚI KHÁCH HÀNG', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '09/29/2026', endDate: '09/29/2026', rowBgColor: 'white' },
  { stt: 26, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'IN BIÊN BẢN NGHIỆM THU 80% ĐÃ THỐNG NHẤT VỚI KH', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '09/30/2026', endDate: '09/30/2026', rowBgColor: 'white' },
  { stt: 27, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'TỔ CHỨC NGHIỆM THU 80%', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/01/2026', endDate: '10/01/2026', rowBgColor: 'white' },
  { stt: 28, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'LẬP BIÊN BẢN NGHIỆM THU VÀ PHÊ DUYỆT NỘI BỘ', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '10/02/2026', endDate: '10/02/2026', rowBgColor: 'white' },
  { stt: 29, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI BIÊN BẢN NGHIỆM THU 80% TỚI KH VÀ CÁC BỘ PHẬN', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/03/2026', endDate: '10/03/2026', rowBgColor: 'white' },
  { stt: 30, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI THANH TOÁN 80%', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '10/04/2026', endDate: '10/04/2026', rowBgColor: 'white' },
  { stt: 31, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI TIẾN ĐỘ DỰ ÁN MỨC NGHIỆM THU 100%', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/05/2026', endDate: '10/05/2026', rowBgColor: 'white' },
  { stt: 32, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'IN BIÊN BẢN NGHIỆM THU 100% ĐÃ THỐNG NHẤT VỚI KH', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '10/06/2026', endDate: '10/06/2026', rowBgColor: 'white' },
  { stt: 33, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI MẪU BIÊN BẢN BÀN GIAO MÔ HÌNH, BIÊN BẢN NGHIỆM THU, PHIẾU BẢO HÀNH CHO KH', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/07/2026', endDate: '10/07/2026', rowBgColor: 'white' },
  { stt: 34, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'TỔ CHỨC NGHIỆM THU 100%', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '10/08/2026', endDate: '10/08/2026', rowBgColor: 'white' },
  { stt: 35, group: 'HỢP ĐỒNG', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'LẬP BIÊN BẢN NGHIỆM THU VÀ PHÊ DUYỆT NỘI BỘ (LẦN 2)', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/09/2026', endDate: '10/09/2026', rowBgColor: 'white' },

  // ── GROUP 3: QL DỰ ÁN (36-61) ──
  { stt: 36, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'LẬP YCSX DỰ ÁN', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '10/10/2026', endDate: '10/10/2026', rowBgColor: 'white' },
  { stt: 37, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'LẬP HỒ SƠ QUẢN LÝ DỰ ÁN', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/11/2026', endDate: '10/11/2026', rowBgColor: 'white' },
  { stt: 38, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI CHECK LIST HỒ SƠ DỰ ÁN TỪ PHÒNG KHAI TRIỂN', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '10/12/2026', endDate: '10/12/2026', rowBgColor: 'white' },
  { stt: 39, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI CHECK LIST HỒ SƠ DỰ ÁN CHO KHÁCH HÀNG', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/13/2026', endDate: '10/13/2026', rowBgColor: 'white' },
  { stt: 40, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI HỒ SƠ BỔ SUNG TỪ KHÁCH HÀNG (NẾU CẦN)', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '10/14/2026', endDate: '10/14/2026', rowBgColor: 'white' },
  { stt: 41, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI CHECK LIST HỒ SƠ LẦN 2 TỪ PHÒNG KHAI TRIỂN', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/15/2026', endDate: '10/15/2026', rowBgColor: 'white' },
  { stt: 42, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI EMAIL XÁC NHẬN TIẾN ĐỘ VỚI KHÁCH HÀNG', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '10/16/2026', endDate: '10/16/2026', rowBgColor: 'white' },
  { stt: 43, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI BỘ HỒ SƠ XÁC NHẬN TRIỂN KHAI DỰ ÁN CHO KH', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/17/2026', endDate: '10/17/2026', rowBgColor: 'white' },
  { stt: 44, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI BỘ HỒ SƠ XÁC NHẬN KHUNG, CHÂN MÔ HÌNH CHO KH', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '10/18/2026', endDate: '10/18/2026', rowBgColor: 'white' },
  { stt: 45, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI BỘ MẪU MÀU SẮC CHO KHÁCH HÀNG', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/19/2026', endDate: '10/19/2026', rowBgColor: 'white' },
  { stt: 46, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI BỘ MẪU CÂY CẢNH QUAN VÀ ÁNH SÁNG CHO KH', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '10/20/2026', endDate: '10/20/2026', rowBgColor: 'white' },
  { stt: 47, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI XÁC NHẬN CỦA KH ĐÚNG TIẾN ĐỘ', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/21/2026', endDate: '10/21/2026', rowBgColor: 'white' },
  { stt: 48, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI THÔNG BÁO TỚI KHÁCH HÀNG VỀ VIỆC XÁC NHẬN ĐÚNG TIẾN ĐỘ', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '10/22/2026', endDate: '10/22/2026', rowBgColor: 'white' },
  { stt: 49, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI THÔNG BÁO TẠM DỪNG CHỜ XÁC NHẬN (NẾU CẦN)', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/23/2026', endDate: '10/23/2026', rowBgColor: 'white' },
  { stt: 50, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI THÔNG TIN XÁC NHẬN CỦA KH TỚI CÁC BỘ PHẬN', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '10/24/2026', endDate: '10/24/2026', rowBgColor: 'white' },
  { stt: 51, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI CHỈNH SỬA NỘI BỘ VÀ GỬI THÔNG TIN CHO KH', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/25/2026', endDate: '10/25/2026', rowBgColor: 'white' },
  { stt: 52, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THÔNG BÁO LỊCH VẬN CHUYỂN TỚI KH', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '10/26/2026', endDate: '10/26/2026', rowBgColor: 'white' },
  { stt: 53, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'CHUẨN BỊ HỒ SƠ BÀN GIAO, BIÊN BẢN NGHIỆM THU', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/27/2026', endDate: '10/27/2026', rowBgColor: 'white' },
  { stt: 54, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'TỔ CHỨC VẬN CHUYỂN MÔ HÌNH', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '10/28/2026', endDate: '10/28/2026', rowBgColor: 'white' },
  { stt: 55, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI VẬN CHUYỂN', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/29/2026', endDate: '10/29/2026', rowBgColor: 'white' },
  { stt: 56, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI LẮP ĐẶT BÀN GIAO MÔ HÌNH', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '10/30/2026', endDate: '10/30/2026', rowBgColor: 'white' },
  { stt: 57, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI BIÊN BẢN NGHIỆM THU VÀ THANH LÝ HỢP ĐỒNG', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '10/31/2026', endDate: '10/31/2026', rowBgColor: 'white' },
  { stt: 58, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI ĐỀ NGHỊ THANH TOÁN HỢP ĐỒNG', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '11/01/2026', endDate: '11/01/2026', rowBgColor: 'white' },
  { stt: 59, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI THANH TOÁN 100%', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '11/02/2026', endDate: '11/02/2026', rowBgColor: 'white' },
  { stt: 60, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'GỬI THƯ CẢM ƠN KH KHI NHẬN ĐỦ THANH TOÁN 100%', klDk: 1, klDp: 0, assignee: 'Bùi Phương Uyên', gioDk: '1h', gioTt: '—', startDate: '11/03/2026', endDate: '11/03/2026', rowBgColor: 'white' },
  { stt: 61, group: 'QL DỰ ÁN', bcBadge: '📄BC', status: 'Chưa bắt đầu', title: 'THEO DÕI BẢO HÀNH MÔ HÌNH VÀ HỖ TRỢ TRONG QUÁ TRÌNH SỬ DỤNG', klDk: 1, klDp: 0, assignee: 'Bùi Thị Duyên', gioDk: '1h', gioTt: '—', startDate: '11/04/2026', endDate: '11/04/2026', rowBgColor: 'white' },
];

interface ChiTietHoSoViewProps {
  card: ProjectCardItem;
  onBack: () => void;
  onUpdateStatus?: (id: string, status: any) => void;
  onUpdateEvaluation?: (id: string, evaluation: any) => void;
}

export default function ChiTietHoSoView({
  card,
  onBack,
  onUpdateStatus,
  onUpdateEvaluation,
}: ChiTietHoSoViewProps) {
  const [selectedStaffFilter, setSelectedStaffFilter] = useState<string>('Tất cả nhân sự');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('Tất cả trạng thái');
  const [tasks, setTasks] = useState<FullTaskItem[]>(() => {
    if (typeof window !== 'undefined' && card?.id) {
      const saved = localStorage.getItem(`quan_ly_kinh_doanh_tasks_${card.id}`);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return ALL_61_TASKS;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && card?.id) {
      const saved = localStorage.getItem(`quan_ly_kinh_doanh_tasks_${card.id}`);
      if (saved) {
        try {
          setTasks(JSON.parse(saved));
          return;
        } catch (e) {
          console.error(e);
        }
      }
      setTasks(ALL_61_TASKS);
    }
  }, [card?.id]);

  useEffect(() => {
    if (typeof window !== 'undefined' && card?.id) {
      localStorage.setItem(`quan_ly_kinh_doanh_tasks_${card.id}`, JSON.stringify(tasks));
    }
  }, [tasks, card?.id]);

  // Accordion Group Collapsed States
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    'BÁO GIÁ': false,
    'HỢP ĐỒNG': false,
    'QL DỰ ÁN': false,
  });

  const toggleGroupCollapse = (groupName: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  const deleteTask = (stt: number) => {
    setTasks((prev) => prev.filter((t) => t.stt !== stt));
  };

  const handleAddNewRow = () => {
    const title = prompt('Nhập tên công việc mới:');
    if (!title) return;
    const newTask: FullTaskItem = {
      stt: tasks.length + 1,
      group: 'QL DỰ ÁN',
      bcBadge: '📄BC',
      status: 'Chưa bắt đầu',
      title: title.toUpperCase(),
      klDk: 1,
      klDp: 0,
      assignee: 'Bùi Phương Uyên',
      gioDk: '1h',
      gioTt: '—',
      startDate: 'mm/dd/yyyy',
      endDate: 'mm/dd/yyyy',
      rowBgColor: 'white',
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleAddNewGroup = () => {
    const name = prompt('Nhập tên nhóm mới:');
    if (name) {
      alert(`Đã khởi tạo nhóm công việc: ${name}`);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchStaff =
      selectedStaffFilter === 'Tất cả nhân sự' || t.assignee === selectedStaffFilter;
    const matchStatus =
      selectedStatusFilter === 'Tất cả trạng thái' || t.status === selectedStatusFilter;
    return matchStaff && matchStatus;
  });

  const groups: ('BÁO GIÁ' | 'HỢP ĐỒNG' | 'QL DỰ ÁN')[] = ['BÁO GIÁ', 'HỢP ĐỒNG', 'QL DỰ ÁN'];

  return (
    <div className="flex-1 flex flex-col space-y-2.5 p-1 bg-slate-50/60 min-h-0 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden animate-in fade-in duration-150">
      {/* ── 1. HEADER CONTENT ── */}
      <div className="space-y-2 px-0 py-0">
        {/* TOP NAV ROW */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              title="Quay lại Tổng quan"
              className="p-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-md transition-colors cursor-pointer shadow-2xs"
            >
              <IconArrowLeft size={15} />
            </button>

            <span className="px-2.5 py-0.5 bg-[#eef4f7] text-[#406c89] font-semibold text-[11px] rounded-full">
              {card?.typeTag === 'Khối VP' ? 'Hợp đồng' : 'Báo giá'}
            </span>

            <button
              type="button"
              onClick={() => alert('Chuyển loại hồ sơ')}
              className="inline-flex items-center gap-1 text-[#406c89] hover:underline font-semibold text-[11px] cursor-pointer ml-0.5"
            >
              <IconArrowsExchange size={13} />
              <span>Chuyển loại</span>
            </button>
          </div>

          <span className="px-2.5 py-0.5 bg-[#f1f5f9] text-[#64748b] border border-[#e2e8f0] font-semibold text-[11px] rounded-full">
            Bản nháp
          </span>
        </div>

        {/* MAIN TITLE & SUBTITLE */}
        <div className="space-y-0.5 pt-0">
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {card?.title || 'Chi tiết hồ sơ'}
          </h1>

          <p className="text-[11px] text-slate-500 font-medium flex flex-wrap items-center gap-1">
            <span>Báo giá:</span>
            <strong className="font-bold text-slate-700">{card?.code || '129.02-2026/BG-MHV'}</strong>
            <span>·</span>
            <span>{card?.client || 'MODEL VIETTEL'}</span>
            <span>·</span>
            <span>{card?.desc || card?.title}</span>
            <span>·</span>
            <span>Lập bởi: <strong className="text-slate-700 font-medium">Bùi Phương Uyên</strong></span>
          </p>
        </div>

        {/* TASK COUNT & ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
          <div className="text-[11px] text-slate-600 font-medium">
            <span>Số công việc: </span>
            <strong className="font-bold text-slate-800">{filteredTasks.length}</strong>
            <span className="mx-1">·</span>
            <span>{card?.status || 'Đang triển khai'}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => alert('Import Excel')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <IconFileSpreadsheet size={14} className="text-slate-600" />
              <span>Import Excel</span>
            </button>

            <button
              type="button"
              onClick={() => alert('Export Excel')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <IconFileSpreadsheet size={14} className="text-slate-600" />
              <span>Export Excel</span>
            </button>

            <button
              type="button"
              onClick={() => alert('Đã lưu thông tin hồ sơ!')}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#406c89] hover:bg-[#32566d] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <IconDeviceFloppy size={14} />
              <span>Lưu</span>
            </button>
          </div>
        </div>

        {/* DROPDOWN FILTERS & PERSONNEL PILLS */}
        <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="relative">
              <select
                value={selectedStaffFilter}
                onChange={(e) => setSelectedStaffFilter(e.target.value)}
                className="appearance-none pl-2.5 pr-6 py-1 bg-white border border-slate-200/90 rounded-lg text-[11px] font-semibold text-slate-700 focus:outline-none focus:border-[#406c89] shadow-2xs cursor-pointer"
              >
                <option value="Tất cả nhân sự">Tất cả nhân sự</option>
                <option value="Bùi Phương Uyên">Bùi Phương Uyên</option>
                <option value="Bùi Thị Duyên">Bùi Thị Duyên</option>
              </select>
              <IconChevronDown size={13} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="appearance-none pl-2.5 pr-6 py-1 bg-white border border-slate-200/90 rounded-lg text-[11px] font-semibold text-slate-700 focus:outline-none focus:border-[#406c89] shadow-2xs cursor-pointer"
              >
                <option value="Tất cả trạng thái">Tất cả trạng thái</option>
                <option value="Chưa bắt đầu">Chưa bắt đầu</option>
                <option value="Đang thực hiện">Đang thực hiện</option>
                <option value="Hoàn thành">Hoàn thành</option>
              </select>
              <IconChevronDown size={13} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-0.5">
            <span className="text-slate-500 font-medium">Nhân sự:</span>
            <span
              onClick={() => setSelectedStaffFilter(selectedStaffFilter === 'Bùi Phương Uyên' ? 'Tất cả nhân sự' : 'Bùi Phương Uyên')}
              className={`px-2.5 py-0.5 text-white font-bold rounded-full text-[11px] shadow-2xs cursor-pointer transition-all ${
                selectedStaffFilter === 'Bùi Phương Uyên' ? 'bg-[#39637c] ring-2 ring-sky-300' : 'bg-[#39637c] opacity-90'
              }`}
            >
              Bùi Phương Uyên
            </span>
            <span
              onClick={() => setSelectedStaffFilter(selectedStaffFilter === 'Bùi Thị Duyên' ? 'Tất cả nhân sự' : 'Bùi Thị Duyên')}
              className={`px-2.5 py-0.5 text-white font-bold rounded-full text-[11px] shadow-2xs cursor-pointer transition-all ${
                selectedStaffFilter === 'Bùi Thị Duyên' ? 'bg-[#b88c3a] ring-2 ring-amber-300' : 'bg-[#b88c3a] opacity-90'
              }`}
            >
              Bùi Thị Duyên
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. FULL 61-TASKS DATA TABLE WITH STICKY HEADER & SCROLL ── */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto max-h-[550px] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full text-left border-collapse min-w-[1150px]">
            <thead className="sticky top-0 z-20 bg-[#f8fafc] shadow-2xs">
              <tr className="bg-[#f8fafc] border-b border-slate-200/80 text-[10px] font-bold text-[#406c89] tracking-wider uppercase select-none">
                <th className="py-2.5 px-1.5 w-6 text-center border-r border-slate-100 bg-[#f8fafc]"></th>
                <th className="py-2.5 px-2 w-8 text-center border-r border-slate-100 bg-[#f8fafc]">#</th>
                <th className="py-2.5 px-2 w-20 text-center border-r border-slate-100 bg-[#f8fafc]">BC TH</th>
                <th className="py-2.5 px-2 w-16 text-center border-r border-slate-100 bg-[#f8fafc]">THAO TÁC</th>
                <th className="py-2.5 px-2.5 w-32 border-r border-slate-100 bg-[#f8fafc]">TRẠNG THÁI</th>
                <th className="py-2.5 px-3 min-w-[320px] border-r border-slate-100 bg-[#f8fafc]">TÊN CÔNG VIỆC</th>
                <th className="py-2.5 px-2 w-14 text-center border-r border-slate-100 bg-[#f8fafc]">KL DK</th>
                <th className="py-2.5 px-2 w-14 text-center border-r border-slate-100 bg-[#f8fafc]">KL DP</th>
                <th className="py-2.5 px-2.5 w-40 border-r border-slate-100 bg-[#f8fafc]">NHÂN SỰ</th>
                <th className="py-2.5 px-2 w-16 text-center border-r border-slate-100 bg-[#f8fafc]">GIỜ DK</th>
                <th className="py-2.5 px-2 w-16 text-center border-r border-slate-100 bg-[#f8fafc]">GIỜ TT</th>
                <th className="py-2.5 px-2.5 w-28 text-center border-r border-slate-100 bg-[#f8fafc]">BẮT ĐẦU</th>
                <th className="py-2.5 px-2.5 w-28 text-center bg-[#f8fafc]">KẾT THÚC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[11px]">
              {groups.map((groupName) => {
                const groupTasks = filteredTasks.filter((t) => t.group === groupName);
                const isCollapsed = collapsedGroups[groupName];

                return (
                  <React.Fragment key={groupName}>
                    {/* GROUP ACCORDION HEADER ROW (STICKY UNDER TABLE HEADER) */}
                    <tr className="sticky top-[33px] z-10 bg-slate-100 border-y border-slate-200/80 text-slate-800 font-bold text-xs select-none">
                      <td className="py-2 px-1 text-center text-slate-400">
                        <IconGripVertical size={13} className="mx-auto" />
                      </td>
                      <td colSpan={12} className="py-2 px-2">
                        <button
                          type="button"
                          onClick={() => toggleGroupCollapse(groupName)}
                          className="flex items-center gap-1.5 font-extrabold text-slate-800 hover:text-[#406c89] transition-colors cursor-pointer"
                        >
                          <span className="p-0.5 bg-slate-200/80 rounded">
                            {isCollapsed ? <IconChevronRight size={14} /> : <IconChevronDown size={14} />}
                          </span>
                          <span>{groupName}</span>
                          <span className="text-[10px] text-slate-500 font-semibold ml-1">({groupTasks.length})</span>
                        </button>
                      </td>
                    </tr>

                    {/* GROUP TASK ROWS */}
                    {!isCollapsed &&
                      groupTasks.map((task) => {
                        const isBlueRow = task.rowBgColor === 'blue';
                        const isYellowRow = task.rowBgColor === 'yellow';

                        return (
                          <tr
                            key={task.stt}
                            className={`transition-colors border-b border-slate-100/80 ${
                              isBlueRow
                                ? 'bg-[#5281a0] text-white hover:bg-[#48738f]'
                                : isYellowRow
                                ? 'bg-[#cb9935] text-white hover:bg-[#b8892d]'
                                : 'bg-white hover:bg-slate-50/80 text-slate-700'
                            }`}
                          >
                            {/* Drag Grip Handle */}
                            <td className={`py-1.5 px-1 text-center ${isBlueRow || isYellowRow ? 'text-white/60' : 'text-slate-300'}`}>
                              <IconGripVertical size={13} className="mx-auto cursor-grab" />
                            </td>

                            {/* STT */}
                            <td className={`py-1.5 px-2 text-center font-bold border-r ${
                              isBlueRow || isYellowRow ? 'border-white/20 text-white' : 'border-slate-100 text-slate-500'
                            }`}>
                              {task.stt}
                            </td>

                            {/* BC TH */}
                            <td className={`py-1.5 px-2 text-center border-r ${
                              isBlueRow || isYellowRow ? 'border-white/20' : 'border-slate-100'
                            }`}>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                isBlueRow
                                  ? 'bg-[#3d6580] text-amber-300 border border-amber-300/40'
                                  : isYellowRow
                                  ? 'bg-white text-indigo-700 shadow-2xs'
                                  : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                              }`}>
                                {task.bcBadge}
                              </span>
                            </td>

                            {/* THAO TÁC */}
                            <td className={`py-1.5 px-2 text-center border-r ${
                              isBlueRow || isYellowRow ? 'border-white/20' : 'border-slate-100'
                            }`}>
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  type="button"
                                  onClick={handleAddNewRow}
                                  className={`p-0.5 rounded transition-colors cursor-pointer ${
                                    isBlueRow || isYellowRow ? 'text-white/80 hover:text-white hover:bg-white/20' : 'text-slate-400 hover:text-[#406c89]'
                                  }`}
                                  title="Thêm hàng mới"
                                >
                                  <IconPlus size={13} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteTask(task.stt)}
                                  className={`p-0.5 rounded transition-colors cursor-pointer ${
                                    isBlueRow || isYellowRow ? 'text-white/80 hover:text-rose-200 hover:bg-white/20' : 'text-slate-400 hover:text-rose-600'
                                  }`}
                                  title="Xóa hàng"
                                >
                                  <IconTrash size={13} />
                                </button>
                              </div>
                            </td>

                            {/* TRẠNG THÁI */}
                            <td className={`py-1.5 px-2.5 border-r ${
                              isBlueRow || isYellowRow ? 'border-white/20' : 'border-slate-100'
                            }`}>
                              <select
                                value={task.status}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setTasks((prev) =>
                                    prev.map((t) => (t.stt === task.stt ? { ...t, status: val } : t))
                                  );
                                }}
                                className={`appearance-none px-2 py-0.5 text-[10px] font-bold rounded-md border focus:outline-none cursor-pointer ${
                                  isBlueRow || isYellowRow
                                    ? 'bg-white/20 text-white border-white/30 font-bold'
                                    : task.status === 'Hoàn thành'
                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                    : task.status === 'Đang thực hiện'
                                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                                    : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                }`}
                              >
                                <option value="Chưa bắt đầu" className="text-slate-800">Chưa bắt đầu</option>
                                <option value="Đang thực hiện" className="text-slate-800">Đang thực hiện</option>
                                <option value="Hoàn thành" className="text-slate-800">Hoàn thành</option>
                                <option value="Tạm dừng" className="text-slate-800">Tạm dừng</option>
                              </select>
                            </td>

                            {/* TÊN CÔNG VIỆC */}
                            <td className={`py-1.5 px-3 font-semibold text-[11px] leading-snug border-r ${
                              isBlueRow || isYellowRow ? 'border-white/20 text-white' : 'border-slate-100 text-slate-800'
                            }`}>
                              {task.title}
                            </td>

                            {/* KL DK */}
                            <td className={`py-1.5 px-2 text-center font-bold border-r ${
                              isBlueRow || isYellowRow ? 'border-white/20 text-white' : 'border-slate-100 text-slate-600'
                            }`}>
                              {task.klDk}
                            </td>

                            {/* KL DP */}
                            <td className={`py-1.5 px-2 text-center font-bold border-r ${
                              isBlueRow || isYellowRow ? 'border-white/20 text-white' : 'border-slate-100 text-slate-600'
                            }`}>
                              {task.klDp}
                            </td>

                            {/* NHÂN SỰ */}
                            <td className={`py-1.5 px-2.5 border-r ${
                              isBlueRow || isYellowRow ? 'border-white/20' : 'border-slate-100'
                            }`}>
                              <div className="relative">
                                <select
                                  value={task.assignee}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setTasks((prev) =>
                                      prev.map((t) => (t.stt === task.stt ? { ...t, assignee: val } : t))
                                    );
                                  }}
                                  className={`w-full appearance-none pl-2 pr-5 py-0.5 text-[10.5px] font-semibold rounded border focus:outline-none cursor-pointer ${
                                    isBlueRow || isYellowRow
                                      ? 'bg-white/20 text-white border-white/30 font-bold'
                                      : 'bg-slate-50 text-slate-700 border-slate-200'
                                  }`}
                                >
                                  <option value="" className="text-slate-800">— Chọn —</option>
                                  <option value="Bùi Phương Uyên" className="text-slate-800">Bùi Phương Uyên</option>
                                  <option value="Bùi Thị Duyên" className="text-slate-800">Bùi Thị Duyên</option>
                                </select>
                                <IconChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-70" />
                              </div>
                            </td>

                            {/* GIỜ DK */}
                            <td className={`py-1.5 px-2 text-center font-bold border-r ${
                              isBlueRow || isYellowRow ? 'border-white/20 text-white' : 'border-slate-100 text-slate-700'
                            }`}>
                              {task.gioDk}
                            </td>

                            {/* GIỜ TT */}
                            <td className={`py-1.5 px-2 text-center font-bold border-r ${
                              isBlueRow || isYellowRow ? 'border-white/20 text-red-200' : 'border-slate-100 text-slate-400'
                            }`}>
                              {task.gioTt}
                            </td>

                            {/* BẮT ĐẦU */}
                            <td className={`py-1.5 px-2 text-center font-mono text-[10.5px] border-r ${
                              isBlueRow || isYellowRow ? 'border-white/20 text-white' : 'border-slate-100 text-slate-600'
                            }`}>
                              <div className="flex items-center justify-center gap-1">
                                <span className="font-semibold">{task.startDate || 'mm/dd/yyyy'}</span>
                                <IconCalendar size={12} className="opacity-70 text-slate-500 shrink-0 cursor-pointer" />
                              </div>
                            </td>

                            {/* KẾT THÚC */}
                            <td className={`py-1.5 px-2 text-center font-mono text-[10.5px] ${
                              isBlueRow || isYellowRow ? 'text-white' : 'text-slate-600'
                            }`}>
                              <div className="flex items-center justify-center gap-1">
                                <span className="font-semibold">{task.endDate || 'mm/dd/yyyy'}</span>
                                <IconCalendar size={12} className="opacity-70 text-slate-500 shrink-0 cursor-pointer" />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 3. BOTTOM ACTION BAR & CHANGE HISTORY FOOTER ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddNewRow}
            className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <IconPlus size={14} className="text-[#406c89]" />
            <span>Thêm hàng</span>
          </button>

          <button
            type="button"
            onClick={handleAddNewGroup}
            className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <IconPlus size={14} className="text-[#406c89]" />
            <span>Thêm nhóm mới</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => alert('Xem lịch sử thay đổi dự án')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-600 text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-2xs"
        >
          <IconHistory size={14} className="text-slate-400" />
          <span>Lịch sử thay đổi</span>
          <span className="px-1.5 py-0.2 bg-indigo-100 text-indigo-700 font-bold text-[10px] rounded-full ml-1">
            2 lần
          </span>
          <IconChevronRight size={13} className="text-slate-400 ml-1" />
        </button>
      </div>
    </div>
  );
}
