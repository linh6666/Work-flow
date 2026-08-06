"use client";

import React, { useState, useMemo } from 'react';
import { IconSearch, IconArrowsSort, IconChevronDown, IconEye, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import ChiTietChiPhiModal, { ProjectCostModalData } from './modal/ChiTietChiPhiModal';

const MOCK_PROJECT_COSTS: ProjectCostModalData[] = [
  {
    id: '1',
    projectName: 'QUÀ TẶNG KHÁCH HÀNG',
    deptCount: 2,
    staffCount: 7,
    totalCost: '11.385.341đ',
    groups: [
      {
        deptName: 'Phòng Khai triển',
        staffList: [
          { deptName: 'Phòng Khai triển', staffName: 'Trần Diễm My', actualHours: 2, dailyRate: '1.408.665đ', totalAmount: '352.166đ' },
          { deptName: 'Phòng Khai triển', staffName: 'Dương Việt Anh', actualHours: 4, dailyRate: '598.662đ', totalAmount: '299.331đ' },
          { deptName: 'Phòng Khai triển', staffName: 'Phạm Tiến Thành', actualHours: 54, dailyRate: '724.944đ', totalAmount: '4.893.372đ' },
        ],
      },
      {
        deptName: 'Phòng Cảnh Quan',
        staffList: [
          { deptName: 'Phòng Cảnh Quan', staffName: 'Phạm Thị Thu Trang', actualHours: 24, dailyRate: '768.024đ', totalAmount: '2.304.072đ' },
          { deptName: 'Phòng Cảnh Quan', staffName: 'Sầm Thị Thúy', actualHours: 16, dailyRate: '505.200đ', totalAmount: '1.010.400đ' },
          { deptName: 'Phòng Cảnh Quan', staffName: 'Tống Thị Thu', actualHours: 16, dailyRate: '505.200đ', totalAmount: '1.010.400đ' },
          { deptName: 'Phòng Cảnh Quan', staffName: 'Nguyễn Thị Hương', actualHours: 24, dailyRate: '505.200đ', totalAmount: '1.515.600đ' },
        ],
      },
    ],
  },
  {
    id: '2',
    projectName: 'PHÒNG HỌP MHV',
    deptCount: 1,
    staffCount: 5,
    totalCost: '7.314.039đ',
    groups: [
      {
        deptName: 'Phòng Điện',
        staffList: [
          { deptName: 'Phòng Điện', staffName: 'Nguyễn Văn A', actualHours: 40, dailyRate: '600.000đ', totalAmount: '7.314.039đ' },
        ],
      },
    ],
  },
  {
    id: '3',
    projectName: 'VSIP LẠNG SƠN',
    deptCount: 9,
    staffCount: 53,
    totalCost: '177.633.856đ',
    groups: [
      {
        deptName: 'Phòng Ghép',
        staffList: [
          { deptName: 'Phòng Ghép', staffName: 'Lê Hoàng Nam', actualHours: 120, dailyRate: '750.000đ', totalAmount: '70.000.000đ' },
        ],
      },
      {
        deptName: 'Phòng Khai triển',
        staffList: [
          { deptName: 'Phòng Khai triển', staffName: 'Nguyễn Văn An', actualHours: 90, dailyRate: '800.000đ', totalAmount: '50.000.000đ' },
        ],
      },
      {
        deptName: 'Phòng Cắt',
        staffList: [
          { deptName: 'Phòng Cắt', staffName: 'Phạm Minh Đức', actualHours: 100, dailyRate: '700.000đ', totalAmount: '57.633.856đ' },
        ],
      },
    ],
  },
  {
    id: '4',
    projectName: 'THE HERITAGE TÂY NINH - Lắp đặt tại Hà Nội',
    deptCount: 8,
    staffCount: 45,
    totalCost: '214.191.157đ',
    groups: [
      {
        deptName: 'Phòng Ghép',
        staffList: [
          { deptName: 'Phòng Ghép', staffName: 'Đinh Đức Lợi', actualHours: 150, dailyRate: '850.000đ', totalAmount: '90.000.000đ' },
        ],
      },
    ],
  },
  {
    id: '5',
    projectName: 'CHỈNH SỬA MÔ HÌNH NEWEB',
    deptCount: 8,
    staffCount: 20,
    totalCost: '14.984.944đ',
    groups: [],
  },
  {
    id: '6',
    projectName: 'KIEN GIANG MASTER PLAN PROJECT MODEL',
    deptCount: 2,
    staffCount: 2,
    totalCost: '2.905.502đ',
    groups: [],
  },
  {
    id: '7',
    projectName: '22 LIỄU GIAI',
    deptCount: 8,
    staffCount: 43,
    totalCost: '227.584.172đ',
    groups: [],
  },
  {
    id: '8',
    projectName: 'QUY HOẠCH TỈNH HƯNG YÊN',
    deptCount: 5,
    staffCount: 10,
    totalCost: '40.969.448đ',
    groups: [],
  },
  {
    id: '9',
    projectName: "CHỈNH SỬA MÔ HÌNH L'AURORA",
    deptCount: 8,
    staffCount: 38,
    totalCost: '128.184.585đ',
    groups: [],
  },
  {
    id: '10',
    projectName: 'HERITAGE VILLAGE MOC CHAU',
    deptCount: 8,
    staffCount: 39,
    totalCost: '166.875.522đ',
    groups: [],
  },
  {
    id: '11',
    projectName: 'BÁO CÁO NGOÀI DỰ ÁN',
    deptCount: 6,
    staffCount: 24,
    totalCost: '55.847.403đ',
    groups: [],
  },
  {
    id: '12',
    projectName: 'THE HERITAGE TÂY NINH - Lắp đặt tại Tây Ninh',
    deptCount: 8,
    staffCount: 42,
    totalCost: '155.485.690đ',
    groups: [],
  },
  {
    id: '13',
    projectName: 'Dự án IA25 -CIPUTRA',
    deptCount: 7,
    staffCount: 37,
    totalCost: '152.782.412đ',
    groups: [],
  },
];

export default function ChiPhiPhongBan() {
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectCostModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sortKey, setSortKey] = useState<keyof ProjectCostModalData | null>('projectName');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleOpenModal = (project: ProjectCostModalData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleSort = (key: keyof ProjectCostModalData) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filteredAndSorted = useMemo(() => {
    return MOCK_PROJECT_COSTS.filter((p) =>
      p.projectName.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => {
      if (!sortKey) return 0;
      const va = a[sortKey];
      const vb = b[sortKey];
      if (typeof va === 'number' && typeof vb === 'number') {
        return sortDir === 'asc' ? va - vb : vb - va;
      }
      return sortDir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
  }, [search, sortKey, sortDir]);

  const totalFiltered = filteredAndSorted.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFiltered);
  const paginated = filteredAndSorted.slice(startIndex, endIndex);

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

      {/* TABLE MATCHING USER SCREENSHOT WITH ACTION EYE ICON */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[760px]">
            <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-slate-200">
              <tr className="bg-slate-50 text-slate-600 font-bold">
                {/* Cột 1: Hành động */}
                <th className="px-4 py-3 border-b border-slate-200 text-center w-24">
                  <span>Hành động</span>
                </th>

                {/* Cột 2: Dự án */}
                <th className="px-4 py-3 border-b border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleSort('projectName')}
                    className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold"
                  >
                    <span>Dự án</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>

                {/* Cột 3: Số phòng */}
                <th className="px-4 py-3 border-b border-slate-200 text-right w-28">
                  <button
                    type="button"
                    onClick={() => handleSort('deptCount')}
                    className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold w-full"
                  >
                    <span>Số phòng</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>

                {/* Cột 4: Số nhân sự */}
                <th className="px-4 py-3 border-b border-slate-200 text-right w-28">
                  <button
                    type="button"
                    onClick={() => handleSort('staffCount')}
                    className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold w-full"
                  >
                    <span>Số nhân sự</span>
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </button>
                </th>

                {/* Cột 5: Tổng chi phí */}
                <th className="px-4 py-3 border-b border-slate-200 text-right w-44">
                  <button
                    type="button"
                    onClick={() => handleSort('totalCost')}
                    className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors cursor-pointer font-bold w-full"
                  >
                    <span>Tổng chi phí</span>
                    <IconChevronDown size={12} className="text-slate-600" />
                  </button>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400 text-xs">
                    Không tìm thấy dự án phù hợp.
                  </td>
                </tr>
              ) : (
                paginated.map((p) => (
                  <tr 
                    key={p.id} 
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    onClick={() => handleOpenModal(p)}
                  >
                    {/* Cột 1: Hành động (Eye icon) */}
                    <td className="px-4 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(p);
                        }}
                        className="p-1 rounded-md text-[#406c89] hover:bg-sky-100/70 transition-colors shrink-0 cursor-pointer inline-flex items-center justify-center"
                        title="Xem chi tiết chi phí"
                      >
                        <IconEye size={16} />
                      </button>
                    </td>

                    {/* Cột 2: Dự án */}
                    <td className="px-4 py-3.5 font-bold text-slate-800 uppercase leading-snug group-hover:text-[#406c89] transition-colors">
                      {p.projectName}
                    </td>

                    {/* Cột 3: Số phòng */}
                    <td className="px-4 py-3.5 text-right font-semibold text-slate-600">
                      {p.deptCount}
                    </td>

                    {/* Cột 4: Số nhân sự */}
                    <td className="px-4 py-3.5 text-right font-semibold text-slate-600">
                      {p.staffCount}
                    </td>

                    {/* Cột 5: Tổng chi phí (Green bold text) */}
                    <td className="px-4 py-3.5 text-right font-bold text-emerald-600">
                      {p.totalCost}
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
            Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalFiltered}</span> dự án
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

      {/* MODAL COMPONENT FROM SEPARATE FOLDER */}
      <ChiTietChiPhiModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  );
}
