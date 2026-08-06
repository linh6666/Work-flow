"use client";

import React, { useState, useMemo } from 'react';
import { IconSearch, IconEye } from '@tabler/icons-react';
import ChiTietDuAnModal, { ProjectModalData } from './modal/ChiTietDuAnModal';

const MOCK_PROJECT_ACCORDIONS: ProjectModalData[] = [
  {
    id: '1',
    name: 'QUÀ TẶNG KHÁCH HÀNG',
    plannedHours: 366,
    actualHours: 140,
    deptCount: 3,
    departments: [
      { deptName: 'Phòng Cảnh Quan', staffCount: 4, plannedHours: 80, actualHours: 80 },
      { deptName: 'Phòng Khai triển', staffCount: 3, plannedHours: 66, actualHours: 60 },
      { deptName: 'Phòng Ghép', staffCount: 8, plannedHours: 220, actualHours: 0 },
    ],
  },
  {
    id: '2',
    name: 'PHÒNG HỌP MHV',
    plannedHours: 307,
    actualHours: 66,
    deptCount: 2,
    departments: [
      { deptName: 'Phòng Điện', staffCount: 5, plannedHours: 180, actualHours: 40 },
      { deptName: 'Phòng Khai triển', staffCount: 4, plannedHours: 127, actualHours: 26 },
    ],
  },
  {
    id: '3',
    name: 'VSIP LẠNG SƠN',
    plannedHours: 2638,
    actualHours: 2630,
    deptCount: 9,
    departments: [
      { deptName: 'Phòng Ghép', staffCount: 12, plannedHours: 800, actualHours: 790 },
      { deptName: 'Phòng Khai triển', staffCount: 9, plannedHours: 600, actualHours: 595 },
      { deptName: 'Phòng Cắt', staffCount: 8, plannedHours: 500, actualHours: 500 },
      { deptName: 'Phòng Điện', staffCount: 6, plannedHours: 400, actualHours: 395 },
      { deptName: 'Phòng Cảnh Quan', staffCount: 5, plannedHours: 338, actualHours: 350 },
    ],
  },
  {
    id: '4',
    name: 'THE HERITAGE TÂY NINH - Lắp đặt tại Hà Nội',
    plannedHours: 3454,
    actualHours: 3277,
    deptCount: 9,
    departments: [
      { deptName: 'Phòng Ghép', staffCount: 15, plannedHours: 1100, actualHours: 1050 },
      { deptName: 'Phòng Mộc Sơn', staffCount: 10, plannedHours: 950, actualHours: 920 },
      { deptName: 'Phòng Cắt', staffCount: 9, plannedHours: 800, actualHours: 780 },
      { deptName: 'Phòng Khai triển', staffCount: 8, plannedHours: 604, actualHours: 527 },
    ],
  },
  {
    id: '5',
    name: 'CHỈNH SỬA MÔ HÌNH NEWEB',
    plannedHours: 380,
    actualHours: 197,
    deptCount: 9,
    departments: [
      { deptName: 'Phòng Khai triển', staffCount: 4, plannedHours: 150, actualHours: 80 },
      { deptName: 'Phòng Cắt', staffCount: 3, plannedHours: 130, actualHours: 70 },
      { deptName: 'Phòng Điện', staffCount: 2, plannedHours: 100, actualHours: 47 },
    ],
  },
  {
    id: '6',
    name: 'KIEN GIANG MASTER PLAN PROJECT MODEL',
    plannedHours: 2222,
    actualHours: 31,
    deptCount: 8,
    departments: [
      { deptName: 'Phòng Khai triển', staffCount: 7, plannedHours: 800, actualHours: 15 },
      { deptName: 'Phòng Ghép', staffCount: 6, plannedHours: 722, actualHours: 10 },
      { deptName: 'Phòng Cảnh Quan', staffCount: 5, plannedHours: 700, actualHours: 6 },
    ],
  },
  {
    id: '7',
    name: '22 LIỄU GIAI',
    plannedHours: 2944,
    actualHours: 3076,
    deptCount: 9,
    departments: [
      { deptName: 'Phòng Ghép', staffCount: 11, plannedHours: 1000, actualHours: 1050 },
      { deptName: 'Phòng Cắt', staffCount: 9, plannedHours: 900, actualHours: 950 },
      { deptName: 'Phòng Cảnh Quan', staffCount: 8, plannedHours: 1044, actualHours: 1076 },
    ],
  },
  {
    id: '8',
    name: 'QUY HOẠCH TỈNH HƯNG YÊN',
    plannedHours: 2225,
    actualHours: 377,
    deptCount: 9,
    departments: [
      { deptName: 'Phòng Khai triển', staffCount: 8, plannedHours: 800, actualHours: 150 },
      { deptName: 'Phòng Cảnh Quan', staffCount: 6, plannedHours: 725, actualHours: 120 },
      { deptName: 'Phòng Ghép', staffCount: 5, plannedHours: 700, actualHours: 107 },
    ],
  },
  {
    id: '9',
    name: 'CHỈNH SỬA MÔ HÌNH L\'AURORA',
    plannedHours: 1704,
    actualHours: 1647,
    deptCount: 9,
    departments: [
      { deptName: 'Phòng Mộc Sơn', staffCount: 7, plannedHours: 600, actualHours: 580 },
      { deptName: 'Phòng Ghép', staffCount: 6, plannedHours: 604, actualHours: 587 },
      { deptName: 'Phòng Cắt', staffCount: 5, plannedHours: 500, actualHours: 480 },
    ],
  },
  {
    id: '10',
    name: 'HERITAGE VILLAGE MOC CHAU',
    plannedHours: 2260,
    actualHours: 2157,
    deptCount: 9,
    departments: [
      { deptName: 'Phòng Ghép', staffCount: 9, plannedHours: 800, actualHours: 760 },
      { deptName: 'Phòng Cảnh Quan', staffCount: 8, plannedHours: 760, actualHours: 720 },
      { deptName: 'Phòng Khai triển', staffCount: 7, plannedHours: 700, actualHours: 677 },
    ],
  },
  {
    id: '11',
    name: 'BÁO CÁO NGOÀI DỰ ÁN',
    plannedHours: 859,
    actualHours: 746,
    deptCount: 9,
    departments: [
      { deptName: 'Khối Văn phòng', staffCount: 5, plannedHours: 450, actualHours: 400 },
      { deptName: 'Ban Giám đốc', staffCount: 4, plannedHours: 409, actualHours: 346 },
    ],
  },
  {
    id: '12',
    name: 'THE HERITAGE TÂY NINH - Lắp đặt tại Tây Ninh',
    plannedHours: 2609,
    actualHours: 2294,
    deptCount: 9,
    departments: [
      { deptName: 'Phòng Ghép', staffCount: 10, plannedHours: 900, actualHours: 800 },
      { deptName: 'Phòng Mộc Sơn', staffCount: 9, plannedHours: 909, actualHours: 800 },
      { deptName: 'Phòng Điện', staffCount: 8, plannedHours: 800, actualHours: 694 },
    ],
  },
  {
    id: '13',
    name: 'Dự án IA25 -CIPUTRA',
    plannedHours: 3495,
    actualHours: 2036,
    deptCount: 9,
    departments: [
      { deptName: 'Phòng Khai triển', staffCount: 12, plannedHours: 1200, actualHours: 700 },
      { deptName: 'Phòng Ghép', staffCount: 11, plannedHours: 1295, actualHours: 736 },
      { deptName: 'Phòng Cắt', staffCount: 9, plannedHours: 1000, actualHours: 600 },
    ],
  },
];

export default function TheoTungDuAn() {
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project: ProjectModalData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECT_ACCORDIONS.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2 overflow-hidden select-none">
      {/* SEARCH BAR */}
      <div className="relative shrink-0">
        <IconSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm dự án..."
          className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200/80 rounded-lg text-[11px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
        />
      </div>

      {/* PROJECT LIST WITH EYE ICON */}
      <div className="flex-1 overflow-auto min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs no-scrollbar">
        <div className="divide-y divide-slate-100">
          {filteredProjects.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              Không tìm thấy dự án phù hợp.
            </div>
          ) : (
            filteredProjects.map((p) => (
              <div 
                key={p.id}
                onClick={() => handleOpenModal(p)}
                className="w-full px-4 py-3 flex items-center gap-2 hover:bg-slate-50/80 text-left transition-colors cursor-pointer group"
              >
                {/* EYE ICON */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(p);
                  }}
                  className="p-1 rounded-md text-[#406c89] hover:bg-sky-100/70 transition-colors shrink-0 cursor-pointer"
                  title="Xem chi tiết"
                >
                  <IconEye size={16} />
                </button>

                {/* PROJECT NAME */}
                <span className="font-bold text-slate-800 text-xs tracking-tight group-hover:text-[#406c89] transition-colors">
                  {p.name}
                </span>

                {/* HOURS & DEPT SUMMARY */}
                <span className="text-slate-400 text-xs font-normal ml-1">
                  ({p.plannedHours}h KH · {p.actualHours}h TT · {p.deptCount} phòng)
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SEPARATE MODAL FOLDER COMPONENT */}
      <ChiTietDuAnModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  );
}
