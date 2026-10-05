"use client";

import React, { useState } from 'react';
import {
  IconPlus,
  IconRefresh,
  IconDeviceFloppy,
  IconPrinter,
  IconMaximize,
  IconSettings,
  IconWand,
  IconSelector,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react';

interface TaskItem {
  id: string;
  stt: number;
  assignee: string;
  code: string;
  title: string;
  kichThuoc?: string;
  tyLe?: string;
  tgSx?: number;
  startDate?: string;
  dueDate?: string;
  t1?: string[];
  t2?: string[];
  t3?: string[];
  t4?: string[];
  t5?: string[];
}

interface GroupSection {
  id: string;
  title: string;
  bgColor: string;
  tasks: TaskItem[];
}

const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  'ĐTK': { bg: 'bg-[#4caf50]', text: 'text-white' },
  'NT L1': { bg: 'bg-[#7c8ce6]', text: 'text-white' },
  'NTCC': { bg: 'bg-[#204a87]', text: 'text-white' },
  'HTCS': { bg: 'bg-[#38b6ff]', text: 'text-white' },
  'LĐ-BG': { bg: 'bg-[#a66a1e]', text: 'text-white' },
  'NTTT L1': { bg: 'bg-[#ffd230]', text: 'text-slate-900' },
  'TT L1': { bg: 'bg-[#f58220]', text: 'text-white' },
  'HT KHS': { bg: 'bg-[#e2ef34]', text: 'text-slate-900' },
  'HT TTCC': { bg: 'bg-[#cc1f1a]', text: 'text-white' },
  'TDSX': { bg: 'bg-[#e014d0]', text: 'text-white' },
};

const INITIAL_GROUPS: GroupSection[] = [
  {
    id: 'g1',
    title: 'I - DỰ ÁN ĐÃ BÀN GIAO, CHỜ BÀN GIAO',
    bgColor: 'bg-[#cc8e00]',
    tasks: [
      {
        id: '1-1',
        stt: 1,
        assignee: 'Nguyễn Phú Quang',
        code: '02-2025/DA-MHV',
        title: 'LUMIO PHUKET THAILAND',
        kichThuoc: '2000×1000',
        tyLe: '1/200',
        tgSx: 40,
        startDate: '03/02/2025',
        dueDate: '15/03/2025',
      },
      {
        id: '1-2',
        stt: 2,
        assignee: 'Nguyễn Phú Quang',
        code: '23-2026/DA-MHV',
        title: 'QH TỈNH HƯNG YÊN',
        kichThuoc: '5500X2900',
        tyLe: '1/25000',
        tgSx: 45,
        startDate: '25/07/2026',
        dueDate: '16/09/2026',
        t3: ['LĐ-BG', 'HT KHS', 'HT TTCC'],
      },
      {
        id: '1-3',
        stt: 3,
        assignee: 'Nguyễn Phú Quang',
        code: '04-2026/DA-MHV',
        title: 'VIET TRI LEGACY LAKESIDE (CMC)',
        kichThuoc: 'D3360mm',
        tyLe: '1/250',
        tgSx: 45,
        startDate: '12/03/2026',
        dueDate: '28/08/2026',
        t2: ['HT KHS', 'HT TTCC'],
      },
      {
        id: '1-4',
        stt: 4,
        assignee: 'Bùi Phương Uyên',
        code: '14.01-2026/DA-MHV',
        title: 'DỰ ÁN TÂY NINH - AHA- HÀ NỘI',
        kichThuoc: '2000X4400',
        tyLe: '1/400',
        tgSx: 40,
        startDate: '28/05/2026',
        dueDate: '22/07/2026',
        t2: ['HTCS', 'LĐ-BG', 'HT KHS', 'HT TTCC'],
      },
      {
        id: '1-5',
        stt: 5,
        assignee: 'Bùi Phương Uyên',
        code: '14.02-2026/DA-MHV',
        title: 'DỰ ÁN TÂY NINH - AHA- NINH THUẬN',
        kichThuoc: '2000X4400',
        tyLe: '1/400',
        tgSx: 55,
        startDate: '28/05/2026',
        dueDate: '06/08/2026',
        t2: ['HTCS', 'LĐ-BG', 'HT KHS', 'HT TTCC'],
      },
      {
        id: '1-6',
        stt: 6,
        assignee: 'Bùi Thị Duyên',
        code: '17-2026/DA-MHV',
        title: 'HERIAGE VILLAGE MOC CHAU',
        kichThuoc: '1600×1200',
        tyLe: '1/500',
        tgSx: 35,
        startDate: '18/05/2026',
        dueDate: '20/07/2026',
      },
      {
        id: '1-7',
        stt: 7,
        assignee: 'Nguyễn Phú Quang',
        code: '32-2026/DA-MHV',
        title: 'DỰ ÁN KDC PHƯỚC THỌ - T&T',
        kichThuoc: '2698X4118',
        tyLe: '1/200',
        tgSx: 30,
        startDate: '15/08/2026',
        dueDate: '15/09/2026',
        t2: ['HT KHS', 'HT TTCC'],
      },
    ],
  },
  {
    id: 'g2',
    title: 'II - DỰ ÁN ĐANG TRIỂN KHAI',
    bgColor: 'bg-[#1b4e1f]',
    tasks: [
      {
        id: '2-1',
        stt: 1,
        assignee: 'Bùi Phương Uyên',
        code: '29-2026/DA-MHV',
        title: 'CHỈNH SỬA MH VINUNI',
        kichThuoc: '5.3 m2',
        tyLe: '1/300',
        tgSx: 30,
        startDate: '15/09/2026',
        dueDate: '19/10/2026',
        t1: ['ĐTK'],
        t2: ['HTCS', 'NTCC', 'LĐ-BG', 'HT KHS', 'HT TTCC'],
      },
      {
        id: '2-2',
        stt: 2,
        assignee: 'Nguyễn Phú Quang',
        code: '26-2026/DA-MHV',
        title: 'KIEN GIANG MASTERPLAN',
        kichThuoc: '2600X1800',
        tyLe: '1/600',
        tgSx: 45,
        startDate: '01/08/2026',
        dueDate: '15/09/2026',
        t1: ['TDSX'],
        t2: ['TDSX'],
        t3: ['TDSX'],
      },
      {
        id: '2-3',
        stt: 3,
        assignee: 'Bùi Phương Uyên',
        code: '129-2026/DA-MHV',
        title: 'DỰ ÁN VIETTEL THĂNG LONG 1 & 2',
        kichThuoc: '1460X1180 MM',
        tyLe: '1/300',
        tgSx: 26,
        startDate: '19/09/2026',
        dueDate: '14/10/2026',
        t1: ['ĐTK'],
        t2: ['NT L1', 'NTTT L1', 'TT L1', 'NTCC', 'LĐ-BG', 'HT KHS', 'HT TTCC'],
      },
      {
        id: '2-4',
        stt: 4,
        assignee: 'Nguyễn Phú Quang',
        code: '16-2026/DA-MHV',
        title: 'MÔ HÌNH DỰ ÁN IA25 – CIPUTRA',
        kichThuoc: '3400×2400',
        tyLe: '1/100',
        tgSx: 45,
        startDate: '15/06/2026',
        dueDate: '03/08/2026',
        t1: ['TDSX'],
        t2: ['TDSX'],
        t3: ['TDSX'],
        t4: ['TDSX'],
      },
      {
        id: '2-5',
        stt: 5,
        assignee: 'Bùi Thị Duyên',
        code: 'MHV20 NAM',
        title: 'CÁC MH MẪU TRƯNG BÀY TRONG PHÒNG HỌP',
        kichThuoc: '',
        tyLe: '',
        tgSx: 0,
        startDate: '',
        dueDate: '',
      },
      {
        id: '2-6',
        stt: 6,
        assignee: 'Bùi Thị Duyên',
        code: '27-2026/DA-MHV',
        title: 'MÔ HÌNH GIÁM TUYẾN ART VIETNAM GALLERY',
        kichThuoc: '720X420',
        tyLe: '1/25',
        tgSx: 45,
        startDate: '19/08/2026',
        dueDate: '03/10/2026',
        t1: ['ĐTK'],
        t2: ['NT L1', 'NTTT L1', 'TT L1', 'NTCC', 'LĐ-BG', 'HT KHS', 'HT TTCC'],
      },
      {
        id: '2-7',
        stt: 7,
        assignee: 'Bùi Thị Duyên',
        code: '30-2026/DA.01-MHV',
        title: 'MÔ HÌNH SLRQ3 - DỰ ÁN ECOPARK VINH',
        kichThuoc: '1300X1100',
        tyLe: '1/30',
        tgSx: 50,
        startDate: '17/08/2026',
        dueDate: '06/10/2026',
        t1: ['ĐTK'],
        t3: ['NT L1', 'NTTT L1', 'TT L1', 'NTCC', 'LĐ-BG', 'HT KHS', 'HT TTCC'],
      },
      {
        id: '2-8',
        stt: 8,
        assignee: 'Bùi Thị Duyên',
        code: '30-2026/DA.01-MHV',
        title: 'MÔ HÌNH DLRQ1 - DỰ ÁN ECOPARK VINH',
        kichThuoc: '1300X1100',
        tyLe: '1/30',
        tgSx: 50,
        startDate: '17/08/2026',
        dueDate: '06/10/2026',
        t1: ['ĐTK'],
        t3: ['NT L1', 'NTTT L1', 'TT L1', 'NTCC', 'LĐ-BG', 'HT KHS', 'HT TTCC'],
      },
      {
        id: '2-9',
        stt: 9,
        assignee: 'Bùi Thị Duyên',
        code: '30-2026/DA.01-MHV',
        title: 'MÔ HÌNH CLUBHOUSE - DỰ ÁN ECOPARK VINH',
        kichThuoc: '1400X1600',
        tyLe: '1/90',
        tgSx: 50,
        startDate: '17/08/2026',
        dueDate: '06/10/2026',
        t1: ['ĐTK'],
        t3: ['NT L1', 'NTTT L1', 'TT L1', 'NTCC', 'LĐ-BG', 'HT KHS', 'HT TTCC'],
      },
      {
        id: '2-10',
        stt: 10,
        assignee: 'Bùi Thị Duyên',
        code: '31-2026/DA.01-MHV',
        title: 'CHỈNH SỬA MÔ HÌNH QUY HOẠCH ECOPARK VINH',
        kichThuoc: '3800X3800',
        tyLe: '1/500',
        tgSx: 35,
        startDate: '24/08/2026',
        dueDate: '28/09/2026',
        t1: ['ĐTK'],
        t2: ['NTCC', 'LĐ-BG', 'HT KHS', 'HT TTCC'],
      },
      {
        id: '2-11',
        stt: 11,
        assignee: 'Nguyễn Phú Quang',
        code: '19-2025/DA-MHV',
        title: 'DỰ ÁN BATUMI ISLAND',
        kichThuoc: '3800X2500MM',
        tyLe: '1/550',
        tgSx: 90,
        t1: ['TDSX'],
        t2: ['TDSX'],
        t3: ['TDSX'],
        t4: ['TDSX'],
        t5: ['TDSX'],
      },
      {
        id: '2-12',
        stt: 12,
        assignee: 'Bùi Thị Duyên',
        code: '31-2026/DA.01-MHV',
        title: 'CHỈNH SỬA MÔ HÌNH QUY HOẠCH ECOPARK VINH',
        kichThuoc: '1000X1000',
        tyLe: '1/2000',
        tgSx: 35,
        startDate: '24/08/2026',
        dueDate: '28/09/2026',
        t1: ['ĐTK'],
        t2: ['NTCC', 'LĐ-BG', 'HT KHS', 'HT TTCC'],
      },
      {
        id: '2-13',
        stt: 13,
        assignee: 'Nguyễn Phú Quang',
        code: '02-2026/DA-MHV',
        title: 'DỰ ÁN TARA TOWER',
        kichThuoc: '',
        tyLe: '1/100',
        tgSx: 50,
      },
    ],
  },
  {
    id: 'g3',
    title: 'III - DỰ ÁN DỰ KIẾN TRIỂN KHAI',
    bgColor: 'bg-[#1b4e1f]',
    tasks: [
      {
        id: '3-1',
        stt: 1,
        assignee: 'Bùi Phương Uyên',
        code: '122-2026/BG-MHV',
        title: 'MÔ HÌNH NHÓM NHÀ Ở ĐÔNG NAM',
        kichThuoc: '1290X1750MM',
        tyLe: '1/100',
        tgSx: 40,
        startDate: '15/10/2026',
        dueDate: '30/11/2026',
      },
      {
        id: '3-2',
        stt: 2,
        assignee: 'Bùi Phương Uyên',
        code: '',
        title: 'MH VINUNI MỚI',
        kichThuoc: '5.3 M2',
        tyLe: '1/300',
        tgSx: 45,
        startDate: '24/09/2026',
        dueDate: '14/11/2026',
      },
      {
        id: '3-3',
        stt: 3,
        assignee: 'Nguyễn Phú Quang',
        code: '85-2026/HĐ-MHV',
        title: 'KHU NHÀ Ở THƯƠNG MẠI 319',
        kichThuoc: '2600X2500MM',
        tyLe: '1/200',
        tgSx: 45,
        startDate: '01/11/2026',
        dueDate: '20/12/2026',
      },
      {
        id: '3-4',
        stt: 4,
        assignee: 'Bùi Phương Uyên',
        code: '122-2026/BG-MHV',
        title: 'MÔ HÌNH NHÓM NHÀ Ở ĐÔNG NAM',
        kichThuoc: '750×1290MM',
        tyLe: '1/500',
        tgSx: 40,
        startDate: '15/10/2026',
        dueDate: '30/11/2026',
      },
    ],
  },
  {
    id: 'g4',
    title: 'IV - DỰ ÁN ĐANG ĐÀM PHÁN HỢP ĐỒNG',
    bgColor: 'bg-[#2b5288]',
    tasks: [
      {
        id: '4-1',
        stt: 1,
        assignee: 'Bùi Phương Uyên',
        code: '104-2026/HĐ-MHV-DPT',
        title: 'TIỆN ÍCH TẦNG 1 DỰ ÁN HANOI PARKCENTRIC',
        kichThuoc: '2300X1900 MM',
        tyLe: '1/65',
        tgSx: 50,
      },
    ],
  },
  {
    id: 'g5',
    title: 'V - DỰ ÁN ĐÃ BÁO GIÁ VÀ ĐANG THEO DÕI',
    bgColor: 'bg-[#996e00]',
    tasks: [
      {
        id: '5-1',
        stt: 1,
        assignee: 'Nguyễn Phú Quang',
        code: '123-2026/BG-MHV',
        title: 'MÔ HÌNH DỰ ÁN BLUE STAR',
        kichThuoc: '5900X4500MM',
        tyLe: '1/100',
        tgSx: 50,
        startDate: '01/11/2026',
        dueDate: '25/12/2026',
      },
      {
        id: '5-2',
        stt: 2,
        assignee: 'Bùi Phương Uyên',
        code: '133-2026/BG-MHV',
        title: 'DỰ ÁN KCN QUẾ VÕ III - PHÂN KHU 2',
        kichThuoc: '3000X1350MM',
        tyLe: '1/1200',
        tgSx: 40,
        startDate: '01/11/2026',
        dueDate: '15/12/2026',
      },
      {
        id: '5-3',
        stt: 3,
        assignee: 'Bùi Thị Duyên',
        code: '118.1-2026/BG-MHV',
        title: "DỰ ÁN L'AURORA",
        kichThuoc: '2400X1800MM',
        tyLe: '1/200',
        tgSx: 50,
        startDate: '25/09/2026',
      },
      {
        id: '5-4',
        stt: 4,
        assignee: 'Bùi Phương Uyên',
        code: '119-2026/BG-MHV',
        title: 'DỰ ÁN CHITTA FOREST',
        kichThuoc: '3500X2500MM',
        tyLe: '1/500',
        tgSx: 50,
        startDate: '01/11/2026',
        dueDate: '25/12/2026',
      },
      {
        id: '5-5',
        stt: 5,
        assignee: 'Nguyễn Phú Quang',
        code: '121.1-2026/BG-MHV',
        title: 'DỰ ÁN KIRRA BEACH',
        kichThuoc: '1500×1500MM',
        tyLe: '1/100',
        tgSx: 50,
        startDate: '01/11/2026',
        dueDate: '25/12/2026',
      },
      {
        id: '5-6',
        stt: 6,
        assignee: 'Nguyễn Phú Quang',
        code: '123-2026/BG-MHV',
        title: 'MÔ HÌNH DỰ ÁN BLUE STAR',
        kichThuoc: '4000X4000MM',
        tyLe: '1/100',
        tgSx: 50,
        startDate: '01/11/2026',
        dueDate: '25/12/2026',
      },
      {
        id: '5-7',
        stt: 7,
        assignee: 'Nguyễn Phú Quang',
        code: '121.2-2026/BG-MHV',
        title: 'DỰ ÁN KIRRA BEACH',
        kichThuoc: '1700X2000MM',
        tyLe: '1/100',
        tgSx: 50,
        startDate: '01/11/2026',
        dueDate: '25/12/2026',
      },
      {
        id: '5-8',
        stt: 8,
        assignee: 'Nguyễn Phú Quang',
        code: '132.3-2026/BG-MHV',
        title: "DỰ ÁN L'EXQUISE HÀ NỘI",
        kichThuoc: '2500X1800MM',
        tyLe: '1/87',
        tgSx: 50,
        startDate: '01/11/2026',
        dueDate: '25/12/2026',
      },
      {
        id: '5-9',
        stt: 9,
        assignee: 'Bùi Phương Uyên',
        code: '125-2026/BG-MHV',
        title: 'DỰ ÁN CỤM CÔNG NGHIỆP NAM PHÚC THỌ',
        kichThuoc: '2600X1700 MM',
        tyLe: '1/500',
        tgSx: 40,
        startDate: '25/10/2026',
        dueDate: '10/12/2026',
      },
      {
        id: '5-10',
        stt: 10,
        assignee: 'Bùi Phương Uyên',
        code: '137-2026/BG-MHV',
        title: 'INDUSTRIAL HOSE REEL MODEL',
        kichThuoc: '1100X630 MM',
        tyLe: '1/50',
        tgSx: 25,
        startDate: '01/11/2026',
        dueDate: '30/11/2026',
      },
      {
        id: '5-11',
        stt: 11,
        assignee: 'Bùi Phương Uyên',
        code: '134-2026/BG-MHV',
        title: 'SUMQAYIT MODEL',
        kichThuoc: '4200X1600 MM',
        tyLe: '1/100',
        tgSx: 45,
        startDate: '25/10/2026',
        dueDate: '15/12/2026',
      },
      {
        id: '5-12',
        stt: 12,
        assignee: 'Nguyễn Phú Quang',
        code: '135-2026/BG-MHV',
        title: 'QUY HOẠCH THÀNH PHỐ ĐÀ NẴNG',
        kichThuoc: '38.5M2 (D=7M)',
        tyLe: '1/25000',
        tgSx: 60,
        startDate: '05/10/2026',
        dueDate: '05/12/2026',
      },
      {
        id: '5-13',
        stt: 13,
        assignee: 'Bùi Thị Duyên',
        code: '138.1-2026/BG-MHV',
        title: 'FOREST ONSEN (THÁP TẦNG CHI TIẾT)',
        kichThuoc: '4200×3400mm',
        tyLe: '1/100',
        tgSx: 60,
        startDate: '10/10/2026',
        dueDate: '05/12/2026',
      },
      {
        id: '5-14',
        stt: 14,
        assignee: 'Bùi Thị Duyên',
        code: '138.2-2026/BG-MHV',
        title: 'FOREST ONSEN (THÁP TẦNG LÀM KHỐI)',
        kichThuoc: '4200×3400mm',
        tyLe: '1/100',
        tgSx: 55,
        startDate: '10/10/2026',
        dueDate: '05/12/2026',
      },
    ],
  },
  {
    id: 'g6',
    title: 'VI - DỰ ÁN MỚI LIÊN HỆ VÀ ĐANG BÁO GIÁ',
    bgColor: 'bg-[#6b7280]',
    tasks: [],
  },
];

export default function BangKhCongViecKdTab() {
  const [groups, setGroups] = useState<GroupSection[]>(INITIAL_GROUPS);

  const handleAddRow = (groupId: string) => {
    setGroups((prevGroups) =>
      prevGroups.map((g) => {
        if (g.id !== groupId) return g;
        const newStt = g.tasks.length + 1;
        const newTask: TaskItem = {
          id: `${groupId}-${Date.now()}`,
          stt: newStt,
          assignee: 'Nguyễn Phú Quang',
          code: `0${newStt}-2026/DA-MHV`,
          title: 'DỰ ÁN MỚI CẬP NHẬT',
          kichThuoc: '2000X1000',
          tyLe: '1/200',
          tgSx: 30,
          startDate: '01/10/2026',
          dueDate: '30/10/2026',
        };
        return {
          ...g,
          tasks: [...g.tasks, newTask],
        };
      })
    );
  };

  const renderTimelineCell = (tags?: string[]) => {
    if (!tags || tags.length === 0) return null;
    return (
      <div className="flex flex-wrap items-center justify-center gap-0.5 w-full">
        {tags.map((tag, i) => {
          const style = TAG_STYLES[tag] || { bg: 'bg-slate-500', text: 'text-white' };
          return (
            <span
              key={i}
              className={`inline-block ${style.bg} ${style.text} text-[8px] font-black px-1 py-0.5 rounded-xs leading-none uppercase tracking-tighter truncate max-w-full`}
              title={tag}
            >
              {tag}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white space-y-2.5 p-1 overflow-y-auto">
      {/* ── 1. HEADER INFO BAR ── */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 font-medium">
        <h2 className="text-sm font-bold text-slate-900">
          Bảng KH công việc KD
        </h2>
        <span className="text-slate-400">— T7-T8/2026</span>
        <span className="text-slate-300">|</span>
        <span>Người cập nhật: <strong className="text-slate-700 font-bold">Bùi Phương Uyên</strong></span>
        <span className="text-slate-300">|</span>
        <span>Ngày: <strong>07/09/2026</strong></span>
        <span className="text-slate-300">|</span>
        <span className="text-emerald-600 font-semibold">Tự làm mới lúc: 14:17:29</span>
      </div>

      {/* ── 2. CONTROL TOOLBAR ROW 1 ── */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <select className="px-3 py-1.5 bg-white border border-indigo-400/80 rounded-lg font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer shadow-2xs">
          <option value="T7-T8-T9/2026">T7-T8-T9/2026</option>
          <option value="T4-T5-T6/2026">T4-T5-T6/2026</option>
          <option value="T1-T2-T3/2026">T1-T2-T3/2026</option>
        </select>

        <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 focus:outline-none focus:border-slate-400 cursor-pointer shadow-2xs">
          <option value="2 tháng">2 tháng</option>
          <option value="1 tháng">1 tháng</option>
          <option value="3 tháng">3 tháng</option>
        </select>

        <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-medium text-slate-500 focus:outline-none focus:border-slate-400 cursor-pointer shadow-2xs">
          <option value="">Xem quý đã lưu</option>
          <option value="Q3-2026">Quý 3/2026</option>
          <option value="Q2-2026">Quý 2/2026</option>
        </select>

        <button
          type="button"
          onClick={() => alert('Thêm kỳ mới')}
          className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <IconPlus size={14} className="text-slate-500" />
          <span>Thêm kỳ mới</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Đồng bộ từ kỳ trước')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <IconRefresh size={14} className="text-slate-500" />
          <span>Đồng bộ từ kỳ trước</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Đã lưu quý')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <IconDeviceFloppy size={14} className="text-slate-500" />
          <span>Lưu quý</span>
        </button>

        <button
          type="button"
          onClick={() => alert('In PDF')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <IconPrinter size={14} className="text-slate-500" />
          <span>In PDF</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Toàn màn hình')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <IconMaximize size={14} className="text-slate-500" />
          <span>Toàn màn hình</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Quản lý nhóm')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <IconSettings size={14} className="text-slate-500" />
          <span>Quản lý nhóm</span>
        </button>
      </div>

      {/* ── 3. ROW 2 BUTTONS ── */}
      <div className="flex items-center gap-2 pt-0.5">
        <button
          type="button"
          onClick={() => handleAddRow('g1')}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#453AD4] hover:bg-[#372eb0] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <IconPlus size={16} />
          <span>Thêm dòng</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Chọn nhiều ô')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <IconWand size={15} className="text-slate-500" />
          <span>Chọn nhiều ô</span>
        </button>
      </div>

      {/* ── 4. STATUS PILLS LEGEND ── */}
      <div className="flex flex-wrap gap-2 pt-1 pb-1">
        <span className="px-2.5 py-1.5 bg-[#4caf50] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          ĐTK = DỰ ÁN ĐANG TRIỂN KHAI
        </span>
        <span className="px-2.5 py-1.5 bg-[#7c8ce6] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          NT L1 = NGHIỆM THU LẦN 1
        </span>
        <span className="px-2.5 py-1.5 bg-[#204a87] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          NTCC = NGHIỆM THU CUỐI CÙNG
        </span>
        <span className="px-2.5 py-1.5 bg-[#38b6ff] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          HTCS = HOÀN THÀNH CHỈNH SỬA
        </span>
        <span className="px-2.5 py-1.5 bg-[#a66a1e] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          LĐ-BG = LẮP ĐẶT, BÀN GIAO
        </span>
        <span className="px-2.5 py-1.5 bg-[#ffd230] text-slate-900 text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          NTTT L1 = KÍ NTTT LẦN 1 VỚI KH
        </span>
        <span className="px-2.5 py-1.5 bg-[#f58220] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          TT L1 = NHẬN TT LẦN 1
        </span>
        <span className="px-2.5 py-1.5 bg-[#e2ef34] text-slate-900 text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          HT KHS = HOÀN THÀNH KÍ HỒ SƠ
        </span>
        <span className="px-2.5 py-1.5 bg-[#cc1f1a] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          HT TTCC = HOÀN THÀNH TTCC
        </span>
        <span className="px-2.5 py-1.5 bg-[#e014d0] text-white text-[10px] font-black rounded uppercase shadow-2xs tracking-wider">
          TDSX = TẠM DỪNG SX
        </span>
      </div>

      {/* ── 5. MAIN TABLE MATCHING FULL SCREENSHOTS ── */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-300 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[1100px]">
            <thead className="sticky top-0 z-10 bg-white border-b border-slate-300">
              <tr>
                <th rowSpan={2} className="px-2 py-2 border border-slate-300 bg-white font-bold text-[#406c89] text-center w-16 text-xs">
                  STT
                </th>
                <th rowSpan={2} className="px-3 py-2 border border-slate-300 bg-white font-bold text-[#406c89] text-left text-xs whitespace-nowrap">
                  PHỤ TRÁCH KD <IconSelector size={12} className="inline ml-0.5 text-slate-400" />
                </th>
                <th rowSpan={2} className="px-3 py-2 border border-slate-300 bg-white font-bold text-[#406c89] text-left text-xs whitespace-nowrap">
                  MÃ DỰ ÁN <IconSelector size={12} className="inline ml-0.5 text-slate-400" />
                </th>
                <th rowSpan={2} className="px-3 py-2 border border-slate-300 bg-white font-bold text-[#406c89] text-left text-xs whitespace-nowrap min-w-[220px]">
                  TÊN DỰ ÁN <IconSelector size={12} className="inline ml-0.5 text-slate-400" />
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-slate-300 bg-white font-bold text-[#406c89] text-center text-xs whitespace-nowrap">
                  KÍCH THƯỚC <IconSelector size={12} className="inline ml-0.5 text-slate-400" />
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-slate-300 bg-white font-bold text-[#406c89] text-center text-xs whitespace-nowrap">
                  TỶ LỆ <IconSelector size={12} className="inline ml-0.5 text-slate-400" />
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-slate-300 bg-white font-bold text-[#406c89] text-center text-xs leading-tight whitespace-nowrap">
                  TG SX<br /><span className="text-[10px] text-slate-500 font-semibold">(NGÀY)</span>
                </th>
                <th rowSpan={2} className="px-3 py-2 border border-slate-300 bg-white font-bold text-[#406c89] text-center text-xs whitespace-nowrap">
                  NGÀY BĐ <IconSelector size={12} className="inline ml-0.5 text-slate-400" />
                </th>
                <th rowSpan={2} className="px-3 py-2 border border-slate-300 bg-white font-bold text-[#406c89] text-center text-xs whitespace-nowrap">
                  NGÀY KT <IconSelector size={12} className="inline ml-0.5 text-slate-400" />
                </th>
                <th colSpan={5} className="px-2 py-1.5 border border-slate-300 bg-[#fde047] text-slate-900 font-bold text-center text-xs tracking-wider uppercase">
                  THÁNG 10/2026
                </th>
              </tr>
              <tr>
                <th className="px-2 py-1.5 border border-slate-300 bg-[#fef08a] text-slate-900 font-bold text-center text-xs min-w-[70px]">T1</th>
                <th className="px-2 py-1.5 border border-slate-300 bg-[#fef08a] text-slate-900 font-bold text-center text-xs min-w-[70px]">T2</th>
                <th className="px-2 py-1.5 border border-slate-300 bg-[#fef08a] text-slate-900 font-bold text-center text-xs min-w-[70px]">T3</th>
                <th className="px-2 py-1.5 border border-slate-300 bg-[#fef08a] text-slate-900 font-bold text-center text-xs min-w-[70px]">T4</th>
                <th className="px-2 py-1.5 border border-slate-300 bg-[#fef08a] text-slate-900 font-bold text-center text-xs min-w-[70px]">T5</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
              {groups.map((group) => (
                <React.Fragment key={group.id}>
                  {/* GROUP BANNER HEADER ROW */}
                  <tr className={`${group.bgColor} text-white`}>
                    <td colSpan={14} className="px-3 py-1.5 font-extrabold text-xs uppercase tracking-wide border border-slate-300">
                      {group.title}
                    </td>
                  </tr>

                  {/* GROUP TASKS */}
                  {group.tasks.length > 0 &&
                    group.tasks.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                        {/* STT with action icons */}
                        <td className="px-2 py-1.5 border border-slate-300 text-center align-middle">
                          <div className="flex items-center justify-between gap-1 text-xs">
                            <span className="font-semibold text-slate-600">{t.stt}</span>
                            <div className="flex items-center gap-0.5">
                              <button
                                type="button"
                                title="Chỉnh sửa"
                                onClick={() => alert(`Sửa: ${t.title}`)}
                                className="p-0.5 hover:bg-slate-200 rounded transition-colors"
                              >
                                <IconEdit size={11} className="text-slate-400 hover:text-blue-600" />
                              </button>
                              <button
                                type="button"
                                title="Xóa"
                                onClick={() => alert(`Xóa: ${t.title}`)}
                                className="p-0.5 hover:bg-slate-200 rounded transition-colors"
                              >
                                <IconTrash size={11} className="text-slate-400 hover:text-rose-600" />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* PHỤ TRÁCH KD */}
                        <td className="px-2.5 py-1.5 border border-slate-300 text-slate-800 text-xs whitespace-nowrap align-middle">
                          <span
                            className={`inline-block px-1.5 py-0.5 text-xs font-semibold rounded-xs ${
                              t.assignee === 'Bùi Thị Duyên'
                                ? 'bg-[#fef08a] text-slate-900'
                                : 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {t.assignee}
                          </span>
                        </td>

                        {/* MÃ DỰ ÁN */}
                        <td className="px-2.5 py-1.5 border border-slate-300 font-mono font-medium text-slate-700 text-xs whitespace-nowrap align-middle">
                          {t.code}
                        </td>

                        {/* TÊN DỰ ÁN */}
                        <td className="px-3 py-1.5 border border-slate-300 text-slate-900 font-bold text-xs uppercase align-middle">
                          <span className="hover:text-blue-700 cursor-pointer">{t.title}</span>
                        </td>

                        {/* KÍCH THƯỚC */}
                        <td className="px-2 py-1.5 border border-slate-300 text-center font-mono text-slate-700 text-xs whitespace-nowrap align-middle">
                          {t.kichThuoc}
                        </td>

                        {/* TỶ LỆ */}
                        <td className="px-2 py-1.5 border border-slate-300 text-center font-mono text-slate-700 text-xs whitespace-nowrap align-middle">
                          {t.tyLe}
                        </td>

                        {/* TG SX */}
                        <td className="px-2 py-1.5 border border-slate-300 text-center font-semibold text-slate-800 text-xs whitespace-nowrap align-middle">
                          {t.tgSx ?? 0}
                        </td>

                        {/* NGÀY BĐ */}
                        <td className="px-2.5 py-1.5 border border-slate-300 text-center text-slate-700 text-xs whitespace-nowrap align-middle">
                          {t.startDate}
                        </td>

                        {/* NGÀY KT */}
                        <td className="px-2.5 py-1.5 border border-slate-300 text-center text-slate-700 text-xs whitespace-nowrap align-middle">
                          {t.dueDate}
                        </td>

                        {/* TIMELINE CELLS T1 - T5 */}
                        <td className="px-1 py-1 border border-slate-300 text-center align-middle h-8 min-w-[70px]">
                          {renderTimelineCell(t.t1)}
                        </td>
                        <td className="px-1 py-1 border border-slate-300 text-center align-middle h-8 min-w-[70px]">
                          {renderTimelineCell(t.t2)}
                        </td>
                        <td className="px-1 py-1 border border-slate-300 text-center align-middle h-8 min-w-[70px]">
                          {renderTimelineCell(t.t3)}
                        </td>
                        <td className="px-1 py-1 border border-slate-300 text-center align-middle h-8 min-w-[70px]">
                          {renderTimelineCell(t.t4)}
                        </td>
                        <td className="px-1 py-1 border border-slate-300 text-center align-middle h-8 min-w-[70px]">
                          {renderTimelineCell(t.t5)}
                        </td>
                      </tr>
                    ))}

                  {/* + THÊM DÒNG BUTTON FOR THIS GROUP */}
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td colSpan={14} className="px-3 py-1 border border-slate-300">
                      <button
                        type="button"
                        onClick={() => handleAddRow(group.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <IconPlus size={13} />
                        <span>Thêm dòng</span>
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
