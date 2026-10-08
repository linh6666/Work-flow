"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  IconSearch,
  IconFileDescription,
  IconArrowUp,
  IconTrash,
  IconChevronRight,
  IconFlag,
} from '@tabler/icons-react';

import TaoBaoGiaModal from './modals/TaoBaoGiaModal';
import TaoHopDongModal from './modals/TaoHopDongModal';
import TaoQuanLyDuAnModal from './modals/TaoQuanLyDuAnModal';
import TaoBaoCaoThangModal from './modals/TaoBaoCaoThangModal';
import KhoiTaoBaoCaoModal from './modals/KhoiTaoBaoCaoModal';
import ChiTietHoSoView from './views/ChiTietHoSoView';

interface TongQuanKinhDoanhProps {
  onNavigateTab?: (tabId: any) => void;
}

interface CardMilestone {
  label: string;
  date: string;
  color: 'blue' | 'rose';
}

interface ProjectCardItem {
  id: string;
  typeTag: string; // 'BC CV KD' | 'Khối VP'
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
  milestones?: CardMilestone[];
  borderColor: string;
}

const DEMO_CARDS: ProjectCardItem[] = [
  {
    id: '1',
    typeTag: 'BC CV KD',
    code: '129.02-2026/BG-MHV',
    status: 'Đang triển khai',
    evaluation: 'Chưa đánh giá',
    num: 0,
    title: 'BC CV KD - MODEL VIETTEL THANG LONG 1&2',
    desc: 'MODEL VIETTEL THANG LONG 1&2',
    startDate: '09-09-2026',
    dueDate: '15-09-2026',
    client: 'NIKKEN SEKKEI LTD',
    progress: 0,
    borderColor: 'border-slate-200/80',
  },
  {
    id: '2',
    typeTag: 'BC CV KD',
    code: '122-2026/BGG-MHV',
    status: 'Đang triển khai',
    evaluation: 'Chưa đánh giá',
    num: 0,
    title: 'BC CV KD - 122-2026/BGG-MHV',
    desc: 'DỰ ÁN NHÓM NHÀ Ở ĐÔNG NAM',
    progress: 0,
    borderColor: 'border-slate-200/80',
  },
  {
    id: '3',
    typeTag: 'BC CV KD',
    code: '132-2026/BG-MHV',
    status: 'Đang triển khai',
    evaluation: 'Chưa đánh giá',
    num: 0,
    title: 'BC CV KD - 132-2026/BG-MHV',
    desc: "DỰ ÁN L'EXQUISE HÀ NỘI",
    startDate: '11-09-2026',
    dueDate: '30-09-2026',
    progress: 0,
    borderColor: 'border-slate-200/80',
  },
  {
    id: '4',
    typeTag: 'BC CV KD',
    code: '104.01-2026/BGG-MHV',
    status: 'Đang triển khai',
    evaluation: 'Chưa đánh giá',
    num: 0,
    title: 'BC CV KD - TIỆN ÍCH TẦNG 1 DỰ ÁN HANOI PARKCENTRIC',
    startDate: '09-07-2026',
    dueDate: '04-09-2026',
    progress: 0,
    borderColor: 'border-slate-200/80',
  },
  {
    id: '5',
    typeTag: 'Khối VP',
    code: '23-2026/DA-MHV',
    status: 'Đang thực hiện',
    evaluation: 'Đúng tiến độ',
    num: 1,
    title: 'QUY HOẠCH TỈNH HƯNG YÊN',
    startDate: '25-07-2026',
    dueDate: '16-09-2026',
    client: 'DATVIETGROUP',
    progress: 92,
    milestones: [
      { label: 'NT lần 1', date: '10-09-2026', color: 'blue' },
      { label: 'NT cuối', date: '15-09-2026', color: 'rose' },
    ],
    borderColor: 'border-emerald-400/80',
  },
  {
    id: '6',
    typeTag: 'Khối VP',
    code: '14.01-2026/DA-MHV',
    status: 'Đang thực hiện',
    evaluation: 'Đúng tiến độ',
    num: 2,
    title: 'THE HERITAGE TÂY NINH - Lắp đặt tại Hà Nội',
    desc: 'Mô hình QH Khu đô thị lớn. Phong cách kiến trúc đa dạng. Tổng thể chia thành 03 phân khu. Điểm nhấn cảnh quan là công viên trải nghiệm với nhiều hoạt động vui...',
    startDate: '18-04-2026',
    dueDate: '20-09-2026',
    client: 'The Heritage Tây Ninh',
    progress: 85,
    milestones: [
      { label: 'NT lần 1', date: '17-07-2026', color: 'blue' },
      { label: 'NT cuối', date: '21-09-2026', color: 'rose' },
    ],
    borderColor: 'border-emerald-400/80',
  },
  {
    id: '7',
    typeTag: 'Khối VP',
    code: '14.02-2026/DA-MHV',
    status: 'Đang thực hiện',
    evaluation: 'Đúng tiến độ',
    num: 3,
    title: 'THE HERITAGE TÂY NINH - Lắp đặt tại Tây Ninh',
    desc: 'Mô hình QH Khu đô thị lớn. Phong cách kiến trúc đa dạng. Tổng thể chia thành 03 phân khu. Điểm nhấn cảnh quan là công viên trải nghiệm với nhiều hoạt động vui...',
    startDate: '18-04-2026',
    dueDate: '20-09-2026',
    client: 'The Heritage Tây Ninh',
    progress: 91,
    milestones: [
      { label: 'NT lần 1', date: '03-08-2026', color: 'blue' },
      { label: 'NT cuối', date: '21-09-2026', color: 'rose' },
    ],
    borderColor: 'border-emerald-400/80',
  },
  {
    id: '8',
    typeTag: 'Khối VP',
    code: 'CT00-2026/DA-MHV',
    status: 'Đang thực hiện',
    evaluation: 'Đúng tiến độ',
    num: 0,
    title: 'BÁO CÁO NGOÀI DỰ ÁN',
    desc: 'Báo cáo các công việc không thuộc các dự án đã có mã mã dự án triển khai sản xuất',
    startDate: '01-07-2026',
    dueDate: '31-12-2026',
    progress: 86,
    borderColor: 'border-emerald-400/80',
  },
  {
    id: '9',
    typeTag: 'Khối VP',
    code: '17-2026/DA-MHV',
    status: 'Hoàn thành',
    evaluation: 'Đúng tiến độ',
    num: 0,
    title: 'HERITAGE VILLAGE MOC CHAU',
    desc: 'Mô hình QH KĐT nghỉ dưỡng trên núi',
    startDate: '18-05-2026',
    dueDate: '22-06-2026',
    client: 'HERIAGE VILLAGE MOC CHAU',
    progress: 100,
    milestones: [
      { label: 'NT lần 1', date: '17-07-2026', color: 'blue' },
      { label: 'NT cuối', date: '20-07-2026', color: 'rose' },
    ],
    borderColor: 'border-emerald-400/80',
  },
  {
    id: '10',
    typeTag: 'Khối VP',
    code: '20-2026/DA-MHV',
    status: 'Đang thực hiện',
    evaluation: 'Đúng tiến độ',
    num: 0,
    title: 'VSIP LẠNG SƠN',
    desc: 'Mô hình QH KCN',
    startDate: '15-06-2026',
    dueDate: '22-07-2026',
    client: 'VSIP Lạng Sơn',
    progress: 100,
    milestones: [
      { label: 'NT lần 1', date: '03-07-2026', color: 'blue' },
      { label: 'NT cuối', date: '13-07-2026', color: 'rose' },
    ],
    borderColor: 'border-emerald-400/80',
  },
  {
    id: '11',
    typeTag: 'Khối VP',
    code: '03-2026/DA-MHV',
    status: 'Hoàn thành',
    evaluation: 'Đúng tiến độ',
    num: 0,
    title: '22 LIỄU GIAI',
    desc: 'Mô hình công trình cao tầng. Tỷ lệ 1/75. Thể hiện nội thất dạng hình khối đơn giản của 40 căn hộ/ không gian bên trong công trình. Nội thất sơn 1 màu',
    startDate: '13-03-2026',
    dueDate: '22-07-2026',
    client: 'CĐT 22 LIỄU GIAI',
    progress: 100,
    milestones: [
      { label: 'NT lần 1', date: '10-06-2026', color: 'blue' },
      { label: 'NT cuối', date: '13-07-2026', color: 'rose' },
    ],
    borderColor: 'border-emerald-400/80',
  },
  {
    id: '12',
    typeTag: 'Khối VP',
    code: 'CT001-2026/MHV-20 NAM',
    status: 'Tạm dừng',
    evaluation: 'Chậm tiến độ, lỗi khách quan',
    num: 11,
    title: 'PHÒNG HỌP MHV',
    desc: 'Thiết kế lại không gian phòng họp & bổ sung thêm các mô hình trưng bày mới',
    startDate: '13-03-2026',
    dueDate: '31-12-2026',
    client: 'MHV',
    progress: 84,
    milestones: [
      { label: 'NT lần 1', date: '31-12-2026', color: 'blue' },
      { label: 'NT cuối', date: '31-12-2026', color: 'rose' },
    ],
    borderColor: 'border-rose-300',
  },
  {
    id: '13',
    typeTag: 'Khối VP',
    code: '32-2026/DA-MHV',
    status: 'Đang thực hiện',
    evaluation: 'Đúng tiến độ',
    num: 0,
    title: 'DỰ ÁN KHU DÂN CƯ PHƯỚC THỌ',
    startDate: '15-08-2026',
    dueDate: '16-09-2026',
    client: 'CÔNG TY CỔ PHẦN BẤT ĐỘNG SẢN T&T HOMES',
    progress: 97,
    milestones: [
      { label: 'NT lần 1', date: '10-09-2026', color: 'blue' },
      { label: 'NT cuối', date: '15-09-2026', color: 'rose' },
    ],
    borderColor: 'border-emerald-400/80',
  },
  {
    id: '14',
    typeTag: 'Khối VP',
    code: '22-2026/DA-MHV',
    status: 'Đang thực hiện',
    evaluation: 'Đúng tiến độ',
    num: 0,
    title: 'CHỈNH SỬA MÔ HÌNH NEWEB',
    startDate: '28-07-2026',
    dueDate: '09-08-2026',
    client: 'LICOGI13FC',
    progress: 88,
    milestones: [
      { label: 'NT lần 1', date: '09-08-2026', color: 'blue' },
      { label: 'NT cuối', date: '09-08-2026', color: 'rose' },
    ],
    borderColor: 'border-emerald-400/80',
  },
  {
    id: '15',
    typeTag: 'Khối VP',
    code: '20-2026/DA-MHV',
    status: 'Đang thực hiện',
    evaluation: 'Đúng tiến độ',
    num: 0,
    title: "CHỈNH SỬA MÔ HÌNH L'AURORA",
    desc: 'Thay mới 05 công trình cao tầng 1/150',
    startDate: '09-06-2026',
    dueDate: '22-07-2026',
    client: "CĐT L'AURORA",
    progress: 92,
    milestones: [
      { label: 'NT lần 1', date: '20-07-2026', color: 'blue' },
      { label: 'NT cuối', date: '20-07-2026', color: 'rose' },
    ],
    borderColor: 'border-emerald-400/80',
  },
];

export default function TongQuanKinhDoanhTab({ onNavigateTab }: TongQuanKinhDoanhProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('Tất cả');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('Loại');
  const [cards, setCards] = useState<ProjectCardItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quan_ly_kinh_doanh_cards');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return DEMO_CARDS;
  });

  // Save cards to localStorage whenever cards change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quan_ly_kinh_doanh_cards', JSON.stringify(cards));
    }
  }, [cards]);

  // Modal States
  const [isBaoGiaModalOpen, setIsBaoGiaModalOpen] = useState<boolean>(false);
  const [isHopDongModalOpen, setIsHopDongModalOpen] = useState<boolean>(false);
  const [isQuanLyDuAnModalOpen, setIsQuanLyDuAnModalOpen] = useState<boolean>(false);
  const [isBaoCaoThangModalOpen, setIsBaoCaoThangModalOpen] = useState<boolean>(false);
  const [isKhoiTaoBaoCaoModalOpen, setIsKhoiTaoBaoCaoModalOpen] = useState<boolean>(false);
  const [selectedDetailCard, setSelectedDetailCard] = useState<ProjectCardItem | null>(null);

  // Sync selectedDetailCard with searchParams 'detailId'
  useEffect(() => {
    const detailId = searchParams.get('detailId');
    if (detailId) {
      const found = cards.find((c) => c.id === detailId) || DEMO_CARDS.find((c) => c.id === detailId);
      if (found) {
        setSelectedDetailCard(found);
      }
    } else {
      setSelectedDetailCard(null);
    }
  }, [searchParams, cards]);

  const handleOpenDetail = (card: ProjectCardItem) => {
    setSelectedDetailCard(card);
    const params = new URLSearchParams(window.location.search);
    params.set('tab', 'tong-quan');
    params.set('subTab', 'tong-quan-kd');
    params.set('detailId', card.id);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleCloseDetail = () => {
    setSelectedDetailCard(null);
    const params = new URLSearchParams(window.location.search);
    params.delete('detailId');
    const newSearch = params.toString();
    router.replace(newSearch ? `${pathname}?${newSearch}` : pathname);
  };

  const handleDeleteCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddNewProjectCard = (data: any) => {
    const newCard: ProjectCardItem = {
      id: String(Date.now()),
      typeTag: data.typeTag || 'BC CV KD',
      code: data.code || '',
      status: data.status || 'Đang triển khai',
      evaluation: data.evaluation || 'Chưa đánh giá',
      num: 0,
      title: data.title,
      desc: data.description || data.desc,
      startDate: data.startDate,
      dueDate: data.dueDate,
      client: data.client,
      progress: data.progress || 0,
      milestones: data.milestones,
      borderColor: data.typeTag === 'Khối VP' ? 'border-emerald-400/80' : 'border-slate-200/80',
    };
    setCards((prev) => [newCard, ...prev]);
  };

  const filteredCards = cards.filter((c) => {
    const matchType =
      selectedTypeFilter === 'Tất cả' ||
      (selectedTypeFilter === 'Báo giá' && c.typeTag === 'BC CV KD') ||
      (selectedTypeFilter === 'Hợp đồng' && c.typeTag === 'Khối VP') ||
      (selectedTypeFilter === 'QL Dự án' && c.status === 'Đang thực hiện');
    const matchSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.client && c.client.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchType && matchSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: any) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    if (selectedDetailCard && selectedDetailCard.id === id) {
      setSelectedDetailCard((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleUpdateEvaluation = (id: string, newEvaluation: any) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, evaluation: newEvaluation } : c))
    );
    if (selectedDetailCard && selectedDetailCard.id === id) {
      setSelectedDetailCard((prev) => (prev ? { ...prev, evaluation: newEvaluation } : null));
    }
  };

  // If a project is selected for detail view, display the full detail page
  if (selectedDetailCard) {
    return (
      <div className="flex-1 flex flex-col space-y-2 p-0 bg-slate-50/50 min-h-0 overflow-y-auto">
        <ChiTietHoSoView
          key={selectedDetailCard.id}
          card={selectedDetailCard}
          onBack={handleCloseDetail}
          onUpdateStatus={handleUpdateStatus}
          onUpdateEvaluation={handleUpdateEvaluation}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 p-0 bg-slate-50/50">
      {/* ── STICKY TOP HEADER & FILTERS BLOCK (STAYS PINNED WHEN SCROLLING) ── */}
      <div className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur-xs space-y-2 pb-2 pt-0.5 px-1 border-b border-slate-200/60 shadow-2xs">
        {/* ── 1. HEADER ROW WITH TITLE & QUICK ACTION BUTTONS ── */}
        <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-base font-bold text-slate-900">Tổng quan Kinh doanh</h1>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Báo giá · Hợp đồng · Thực hiện Hợp đồng — BC CV KD & Hồ sơ Khối Văn phòng
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-500 font-medium">Tạo nhanh:</span>

          <button
            type="button"
            onClick={() => setIsBaoGiaModalOpen(true)}
            className="px-2.5 py-1 bg-[#eef4f7] text-[#406c89] border border-[#b9d3e3] text-[11px] font-semibold rounded-full hover:bg-[#deebf1] transition-colors cursor-pointer h-7"
          >
            + Báo giá
          </button>

          <button
            type="button"
            onClick={() => setIsHopDongModalOpen(true)}
            className="px-2.5 py-1 bg-[#dcfce7] text-[#16a34a] border border-[#86efac] text-[11px] font-semibold rounded-full hover:bg-[#bbf7d0] transition-colors cursor-pointer h-7"
          >
            + Hợp đồng
          </button>

          <button
            type="button"
            onClick={() => setIsQuanLyDuAnModalOpen(true)}
            className="px-2.5 py-1 bg-[#dbeafe] text-[#2563eb] border border-[#93c5fd] text-[11px] font-semibold rounded-full hover:bg-[#bfdbfe] transition-colors cursor-pointer h-7"
          >
            + Quản lý dự án
          </button>

          <button
            type="button"
            onClick={() => setIsBaoCaoThangModalOpen(true)}
            className="px-2.5 py-1 bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-semibold rounded-full hover:bg-slate-200 transition-colors cursor-pointer h-7"
          >
            + Báo cáo tháng
          </button>

          <button
            type="button"
            onClick={() => setIsKhoiTaoBaoCaoModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1 bg-[#406c89] hover:bg-[#32566d] text-white text-[11px] font-bold rounded-full shadow-2xs transition-colors cursor-pointer ml-0.5 h-7"
          >
            <IconFileDescription size={13} />
            <span>Khởi tạo Báo cáo</span>
          </button>
        </div>
      </div>

      {/* ── 2. STATUS STATS CARDS (ROW 1) ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
        <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] font-semibold text-slate-400">Tổng hồ sơ</p>
          <p className="text-base font-bold text-[#406c89]">42</p>
        </div>

        <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] font-semibold text-slate-400">Chưa bắt đầu</p>
          <p className="text-base font-bold text-slate-700">0</p>
        </div>

        <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] font-semibold text-slate-400">Đang thực hiện</p>
          <p className="text-base font-bold text-[#ea580c]">36</p>
        </div>

        <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] font-semibold text-slate-400">Hoàn thành</p>
          <p className="text-base font-bold text-[#16a34a]">2</p>
        </div>
      </div>

      {/* ── 3. CATEGORY PROGRESS CARDS (ROW 2) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5">
        <div
          onClick={() => setSelectedTypeFilter('Hợp đồng')}
          className="bg-white px-2 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs cursor-pointer hover:border-emerald-300 transition-colors"
        >
          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Hợp đồng</span>
          </div>
          <p className="text-sm font-bold text-emerald-600">0</p>
          <p className="text-[8.5px] text-slate-400">TB tiến độ: 0%</p>
        </div>

        <div
          onClick={() => setSelectedTypeFilter('Báo giá')}
          className="bg-white px-2 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs cursor-pointer hover:border-sky-300 transition-colors"
        >
          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-[#406c89]"></span>
            <span>Báo giá</span>
          </div>
          <p className="text-sm font-bold text-[#406c89]">16</p>
          <p className="text-[8.5px] text-slate-400">TB tiến độ: 1%</p>
        </div>

        <div
          onClick={() => setSelectedTypeFilter('QL Dự án')}
          className="bg-white px-2 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs cursor-pointer hover:border-blue-300 transition-colors"
        >
          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>QL Dự án</span>
          </div>
          <p className="text-sm font-bold text-blue-600">19</p>
          <p className="text-[8.5px] text-slate-400">TB tiến độ: 78%</p>
        </div>

        <div
          onClick={() => setSelectedTypeFilter('Khách hàng')}
          className="bg-white px-2 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs cursor-pointer hover:border-orange-300 transition-colors"
        >
          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            <span>Khách hàng</span>
          </div>
          <p className="text-sm font-bold text-orange-600">4</p>
          <p className="text-[8.5px] text-slate-400">TB tiến độ: 1%</p>
        </div>

        <div
          onClick={() => setSelectedTypeFilter('Theo tháng')}
          className="bg-white px-2 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs cursor-pointer hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            <span>Theo tháng</span>
          </div>
          <p className="text-sm font-bold text-slate-600">3</p>
          <p className="text-[8.5px] text-slate-400">TB tiến độ: 1%</p>
        </div>
      </div>

      {/* ── 4. FILTER PILLS (Loại:) ── */}
      <div className="flex flex-wrap items-center gap-1 text-[11px] pt-0.5">
        <span className="text-slate-500 font-medium mr-1">Loại:</span>

        {['Tất cả', 'Hợp đồng', 'Báo giá', 'QL Dự án', 'Khách hàng', 'Theo tháng'].map((type) => {
          const counts: Record<string, string> = {
            'Báo giá': '16',
            'QL Dự án': '19',
            'Khách hàng': '4',
            'Theo tháng': '3',
          };
          const isSelected = selectedTypeFilter === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedTypeFilter(type)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#406c89] text-white font-bold shadow-2xs'
                  : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <span>{type}</span>
              {counts[type] && <span className="ml-1 text-[10px] opacity-70">{counts[type]}</span>}
            </button>
          );
        })}
      </div>

      {/* ── 5. SEARCH BAR ── */}
      <div className="relative">
        <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm theo tên hoặc mã dự án..."
          className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#406c89] shadow-2xs h-8"
        />
      </div>

      {/* ── 6. SORT BAR (Sắp xếp:) ── */}
      <div className="flex flex-wrap items-center gap-1 text-[11px]">
        <span className="text-slate-500 font-medium mr-1">Sắp xếp:</span>

        {[
          'Loại',
          'Ưu tiên',
          'Mã',
          'Tên',
          'KL hoàn thành',
          'Trạng thái',
          'Khách hàng',
          'Ngày bắt đầu',
          'Ngày kết thúc',
          'Đánh giá',
        ].map((sortKey) => {
          const isSelected = selectedSort === sortKey;
          return (
            <button
              key={sortKey}
              type="button"
              onClick={() => setSelectedSort(sortKey)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#406c89] text-white font-bold shadow-2xs'
                  : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <span>{sortKey}</span>
              {isSelected && <IconArrowUp size={11} />}
            </button>
          );
        })}
      </div>
      </div>
      {/* ── END STICKY TOP HEADER & FILTERS BLOCK ── */}

      {/* ── 7. MAIN CARDS LIST ── */}
      <div className="space-y-2.5 pt-1 pb-4">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div
              key={card.id}
              className={`bg-white rounded-xl ${card.borderColor} border shadow-2xs p-3.5 space-y-2 hover:shadow-xs transition-all`}
            >
              {/* Top Tag Row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {/* Type Tag */}
                  <span className="px-2 py-0.5 bg-sky-100 text-[#406c89] font-bold text-[10px] rounded-full">
                    {card.typeTag}
                  </span>

                  {/* Code Tag */}
                  {card.code && (
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 font-mono text-[10px] rounded-md">
                      {card.code}
                    </span>
                  )}

                  {/* Status Select */}
                  <select
                    value={card.status}
                    onChange={() => {}}
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-lg border focus:outline-none cursor-pointer ${
                      card.status === 'Hoàn thành'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : card.status === 'Tạm dừng'
                        ? 'bg-sky-100 text-[#406c89] border-sky-200'
                        : 'bg-amber-100 text-amber-800 border-amber-200'
                    }`}
                  >
                    <option value="Đang triển khai">Đang triển khai</option>
                    <option value="Đang thực hiện">Đang thực hiện</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Tạm dừng">Tạm dừng</option>
                  </select>

                  {/* Evaluation Select */}
                  <select
                    value={card.evaluation}
                    onChange={() => {}}
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-lg border focus:outline-none cursor-pointer ${
                      card.evaluation === 'Đúng tiến độ'
                        ? 'bg-lime-300 text-slate-900 border-lime-400 font-bold'
                        : card.evaluation === 'Chậm tiến độ, lỗi khách quan'
                        ? 'bg-rose-100 text-rose-800 border-rose-200'
                        : 'bg-white text-slate-500 border-slate-200'
                    }`}
                  >
                    <option value="Chưa đánh giá">Chưa đánh giá</option>
                    <option value="Đúng tiến độ">Đúng tiến độ</option>
                    <option value="Chậm tiến độ, lỗi khách quan">Chậm tiến độ, lỗi khách quan</option>
                  </select>
                </div>

                {/* Right actions: Delete & Detail Button */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDeleteCard(card.id)}
                    title="Xóa hồ sơ"
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <IconTrash size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenDetail(card)}
                    className="flex items-center gap-1 px-3 py-1 bg-[#406c89] hover:bg-[#32566d] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Chi tiết</span>
                    <IconChevronRight size={13} />
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center border border-amber-400 bg-amber-50 text-slate-800 font-bold text-xs px-2 py-0.5 rounded shrink-0">
                    {card.num}
                  </span>
                  <h3
                    onClick={() => handleOpenDetail(card)}
                    className="font-bold text-sm text-[#406c89] hover:underline cursor-pointer leading-snug"
                  >
                    {card.title}
                  </h3>
                </div>

                {card.desc && (
                  <p className="text-xs text-slate-500 pl-7 leading-relaxed">{card.desc}</p>
                )}
              </div>

              {/* Dates & Client Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-0.5">
                <div className="flex flex-wrap items-center gap-3">
                  {card.startDate && <span>Bắt đầu: <strong className="text-slate-700">{card.startDate}</strong></span>}
                  {card.dueDate && <span>Kết thúc: <strong className="text-slate-700">{card.dueDate}</strong></span>}
                  {card.client && <span>· KH: <strong className="text-slate-700">{card.client}</strong></span>}
                </div>

                {/* Milestone Flag Date Indicators */}
                {card.milestones && card.milestones.length > 0 && (
                  <div className="flex items-center gap-3">
                    {card.milestones.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className={`inline-flex items-center gap-1 font-bold ${
                          m.color === 'rose' ? 'text-rose-600' : 'text-blue-600'
                        }`}
                      >
                        <IconFlag size={12} />
                        <span>{m.date}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Progress Bar Row */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        card.progress === 100
                          ? 'bg-emerald-500'
                          : card.status === 'Tạm dừng'
                          ? 'bg-blue-600'
                          : 'bg-[#4f46e5]'
                      }`}
                      style={{ width: `${card.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-500 w-8 text-right">
                    {card.progress}%
                  </span>
                </div>

                {/* Milestone Bottom Labels */}
                {card.milestones && card.milestones.length > 0 && (
                  <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium">
                    {card.milestones.map((m, mIdx) => (
                      <span key={mIdx} className="flex items-center gap-1">
                        <span className={m.color === 'rose' ? 'text-rose-600 font-bold' : 'text-blue-600 font-bold'}>
                          | {m.label}
                        </span>
                        <span>({m.date})</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-400 text-xs font-medium">
            Không có hồ sơ dự án nào phù hợp với bộ lọc.
          </div>
        )}
      </div>

      {/* Modals cho các nút thao tác */}
      <TaoBaoGiaModal
        isOpen={isBaoGiaModalOpen}
        onClose={() => setIsBaoGiaModalOpen(false)}
        onSubmitSuccess={handleAddNewProjectCard}
      />

      <TaoHopDongModal
        isOpen={isHopDongModalOpen}
        onClose={() => setIsHopDongModalOpen(false)}
        onSubmitSuccess={handleAddNewProjectCard}
      />

      <TaoQuanLyDuAnModal
        isOpen={isQuanLyDuAnModalOpen}
        onClose={() => setIsQuanLyDuAnModalOpen(false)}
        onSubmitSuccess={handleAddNewProjectCard}
      />

      <TaoBaoCaoThangModal
        isOpen={isBaoCaoThangModalOpen}
        onClose={() => setIsBaoCaoThangModalOpen(false)}
      />

      <KhoiTaoBaoCaoModal
        isOpen={isKhoiTaoBaoCaoModalOpen}
        onClose={() => setIsKhoiTaoBaoCaoModalOpen(false)}
      />
    </div>
  );
}
