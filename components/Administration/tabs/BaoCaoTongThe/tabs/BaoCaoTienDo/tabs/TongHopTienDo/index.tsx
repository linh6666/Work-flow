"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
  IconChevronLeft,
  IconChevronRight,
  IconEye,
  IconChartBar,
  IconCircleCheck,
  IconClock,
  IconClockPlay,
  IconAlertTriangle,
  IconFileText,
  IconAdjustmentsHorizontal,
  IconSearch,
  IconX,
  IconClipboardList,
} from '@tabler/icons-react';
import { ProjectItem } from '../../types';
import ChiTietDuAnModal from '../../modal/ChiTietDuAnModal';
import TienDoTheoYCSXModal from '../../modal/TienDoTheoYCSXModal';

interface TongHopTienDoProps {
  projects: ProjectItem[];
  searchQuery?: string;
  evaluationFilter?: string;
}

function Avatar({ name }: { name: string }) {
  const words = name.trim().split(/\s+/);
  const letter = words[words.length - 1]?.[0]?.toUpperCase() || 'P';

  return (
    <div className="w-8 h-8 rounded-full bg-sky-50 text-[#406c89] font-bold text-xs flex items-center justify-center shrink-0 border border-sky-100 shadow-2xs">
      {letter}
    </div>
  );
}

export default function TongHopTienDo({
  projects,
  searchQuery = '',
  evaluationFilter = 'ALL',
}: TongHopTienDoProps) {
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectItem | null>(null);
  const [selectedYcsxProject, setSelectedYcsxProject] = useState<ProjectItem | null>(null);
  const [sortKey, setSortKey] = useState<keyof ProjectItem | null>('priority');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Local Filter States matching the user's uploaded image
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [evalFilter, setEvalFilter] = useState<string | null>(null);
  const [ycsxFilter, setYcsxFilter] = useState<string | null>(null);

  // Sync with prop changes if any
  useEffect(() => {
    if (searchQuery !== undefined) {
      setLocalSearch(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (evaluationFilter && evaluationFilter !== 'ALL') {
      setEvalFilter(evaluationFilter);
    }
  }, [evaluationFilter]);

  // Dynamic counts for pills matching user image
  const statusCounts = useMemo(() => {
    return {
      dangThucHien: projects.filter(p => p.status === 'Đang thực hiện').length,
      hoanThanh: projects.filter(p => p.status === 'Hoàn thành' || p.status === 'Đã hoàn thành').length,
      tamDung: projects.filter(p => p.status === 'Tạm dừng').length,
    };
  }, [projects]);

  const evalCounts = useMemo(() => {
    return {
      chuaDanhGia: projects.filter(p => p.evaluation === 'Chưa đánh giá').length,
      vuotTienDo: projects.filter(p => p.evaluation === 'Vượt tiến độ').length,
      dungTienDo: projects.filter(p => p.evaluation === 'Đúng tiến độ').length,
    };
  }, [projects]);

  const ycsxCounts = useMemo(() => {
    return {
      chamTienDo: projects.filter(p => p.tienDoYcsx === 'Chậm tiến độ').length,
      conCongViec: projects.filter(p => p.tienDoYcsx === 'Còn công việc').length,
      dat100: projects.filter(p => p.tienDoYcsx === 'Đạt 100%').length,
      chuaDuDuLieu: projects.filter(p => p.tienDoYcsx === 'Chưa đủ dữ liệu').length,
    };
  }, [projects]);

  // Check if any quick filter pill is currently active
  const hasAnyFilter = Boolean(statusFilter || evalFilter || ycsxFilter);

  // Return opacity styling: dim unselected pills (opacity-40) when a filter is active, keep 100% when neutral
  const getPillOpacity = (isSelected: boolean) => {
    if (!hasAnyFilter) return 'opacity-100';
    return isSelected
      ? 'opacity-100 scale-[1.02]'
      : 'opacity-40 hover:opacity-85';
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Reset page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [localSearch, statusFilter, evalFilter, ycsxFilter, sortKey, sortDir, itemsPerPage]);

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        const query = localSearch.trim().toLowerCase();
        const matchesQuery =
          !query ||
          p.name.toLowerCase().includes(query) ||
          p.subName.toLowerCase().includes(query) ||
          p.id.toLowerCase().includes(query);

        const matchesStatus =
          !statusFilter ||
          (statusFilter === 'Hoàn thành'
            ? p.status === 'Hoàn thành' || p.status === 'Đã hoàn thành'
            : p.status === statusFilter);

        const matchesEval =
          !evalFilter || p.evaluation === evalFilter;

        const matchesYcsx =
          !ycsxFilter || p.tienDoYcsx === ycsxFilter;

        return matchesQuery && matchesStatus && matchesEval && matchesYcsx;
      })
      .sort((a, b) => {
        if (!sortKey) return 0;
        let va = a[sortKey];
        let vb = b[sortKey];

        if (va === null || va === undefined) va = sortDir === 'asc' ? 999 : -999;
        if (vb === null || vb === undefined) vb = sortDir === 'asc' ? 999 : -999;

        if (typeof va === 'number' && typeof vb === 'number') {
          return sortDir === 'asc' ? va - vb : vb - va;
        }

        const strA = String(va).toLowerCase();
        const strB = String(vb).toLowerCase();
        return sortDir === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
      });
  }, [projects, localSearch, statusFilter, evalFilter, ycsxFilter, sortKey, sortDir]);

  // Paginated Projects
  const totalFiltered = filteredProjects.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFiltered);
  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProjects, startIndex, itemsPerPage]);

  const handleSort = (key: keyof ProjectItem) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const getStatusBadgeStyle = (status: ProjectItem['status'] | string) => {
    switch (status) {
      case 'Đang thực hiện':
        return 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';
      case 'Hoàn thành':
      case 'Đã hoàn thành':
        return 'bg-[#d1fae5] text-[#065f46] border-[#a7f3d0]';
      case 'Tạm dừng':
        return 'bg-[#ede9fe] text-[#6b21a8] border-[#ddd6fe]';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getEvaluationBadgeStyle = (evalType: ProjectItem['evaluation']) => {
    switch (evalType) {
      case 'Đúng tiến độ':
        return 'bg-[#78b368] text-white border-[#6ba45b] shadow-2xs';
      case 'Vượt tiến độ':
        return 'bg-[#1b5e20] text-white border-[#144718] shadow-2xs';
      case 'Chưa đánh giá':
        return 'bg-white text-slate-600 border-slate-300';
      case 'Chậm tiến độ':
        return 'bg-rose-600 text-white border-rose-700';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getYcsxBadgeStyle = (ycsx?: ProjectItem['tienDoYcsx']) => {
    switch (ycsx) {
      case 'Đạt 100%':
        return 'bg-[#ccfbf1] text-[#115e59] border-[#99f6e4]';
      case 'Còn công việc':
        return 'bg-[#e0e7ff] text-[#3730a3] border-[#c7d2fe]';
      case 'Chậm tiến độ':
        return 'bg-[#fee2e2] text-[#991b1b] border-[#fecaca]';
      case 'Chưa đủ dữ liệu':
        return 'bg-[#f1f5f9] text-[#475569] border-[#e2e8f0]';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2.5 text-left font-sans select-none overflow-hidden">

      {/* ── 1. KPI TOP METRICS ROW (6 Cards) - COMPACT SIZE ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 shrink-0">
        {/* Card 1: Tổng dự án */}
        <div className="bg-white border border-slate-200/90 rounded-lg px-2.5 py-1.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-slate-600">
            <IconChartBar size={14} className="text-[#406c89] shrink-0" />
            <span className="text-[10px] font-semibold text-slate-500 truncate">Tổng dự án</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-base font-black text-[#2f2b7c] tracking-tight">{projects.length || 22}</span>
          </div>
        </div>

        {/* Card 2: CV hoàn thành */}
        <div className="bg-white border border-slate-200/90 rounded-lg px-2.5 py-1.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-emerald-600">
            <IconCircleCheck size={14} className="text-emerald-500 shrink-0" />
            <span className="text-[10px] font-semibold text-slate-500 truncate">CV hoàn thành</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-sm font-black text-emerald-600 tracking-tight">7353/8679</span>
          </div>
        </div>

        {/* Card 3: Giờ KH tổng */}
        <div className="bg-white border border-slate-200/90 rounded-lg px-2.5 py-1.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-blue-600">
            <IconClock size={14} className="text-blue-500 shrink-0" />
            <span className="text-[10px] font-semibold text-slate-500 truncate">Giờ KH tổng</span>
          </div>
          <div className="mt-1">
            <span className="text-sm font-black text-blue-700 tracking-tight">48537h</span>
          </div>
        </div>

        {/* Card 4: Giờ TH tổng */}
        <div className="bg-white border border-slate-200/90 rounded-lg px-2.5 py-1.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-amber-600">
            <IconClockPlay size={14} className="text-amber-500 shrink-0" />
            <span className="text-[10px] font-semibold text-slate-500 truncate">Giờ TH tổng</span>
          </div>
          <div className="mt-1">
            <span className="text-sm font-black text-amber-600 tracking-tight">41289.7h</span>
          </div>
        </div>

        {/* Card 5: CV quá hạn */}
        <div className="bg-white border border-slate-200/90 rounded-lg px-2.5 py-1.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-rose-600">
            <IconAlertTriangle size={14} className="text-rose-500 shrink-0" />
            <span className="text-[10px] font-semibold text-slate-500 truncate">CV quá hạn</span>
          </div>
          <div className="mt-1">
            <span className="text-base font-black text-rose-600 tracking-tight">258</span>
          </div>
        </div>

        {/* Card 6: CV chưa BC */}
        <div className="bg-white border border-slate-200/90 rounded-lg px-2.5 py-1.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-amber-600">
            <IconFileText size={14} className="text-amber-500 shrink-0" />
            <span className="text-[10px] font-semibold text-slate-500 truncate">CV chưa BC</span>
          </div>
          <div className="mt-1">
            <span className="text-base font-black text-amber-600 tracking-tight">1406</span>
          </div>
        </div>
      </div>

      {/* ── 2. QUICK FILTER CARD (LỌC NHANH DỰ ÁN) - COMPACT & CÙNG 1 HÀNG ── */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs space-y-2 shrink-0">
        {/* Header row: Title + Search input + Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <IconAdjustmentsHorizontal size={15} className="text-slate-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 whitespace-nowrap">
              LỌC NHANH DỰ ÁN
            </span>
          </div>

          <div className="relative flex-1 max-w-xs sm:mx-2">
            <IconSearch size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Tìm dự án theo mã, tên hoặc khách hàng..."
              className="w-full pl-7 pr-6 py-1 bg-white border border-slate-200 rounded-md text-[11px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => setLocalSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <IconX size={11} />
              </button>
            )}
          </div>

          <div className="text-[11px] text-slate-500 font-medium shrink-0 ml-auto flex items-center gap-2">
            <span>
              Hiển thị <strong className="text-slate-800 font-bold">{filteredProjects.length}/{projects.length}</strong> dự án
            </span>
            {(statusFilter || evalFilter || ycsxFilter || localSearch) && (
              <button
                type="button"
                onClick={() => {
                  setStatusFilter(null);
                  setEvalFilter(null);
                  setYcsxFilter(null);
                  setLocalSearch('');
                }}
                className="text-[10px] text-rose-500 hover:underline font-semibold ml-1 cursor-pointer"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* ── CÁC NHÓM LỌC ĐƯA LÊN CÙNG 1 HÀNG VÀ GIẢM KÍCH THƯỚC ── */}
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[10px]">
          {/* Nhóm 1: Tình trạng */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-bold text-slate-600 whitespace-nowrap">Tình trạng:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setStatusFilter(statusFilter === 'Đang thực hiện' ? null : 'Đang thực hiện')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  statusFilter === 'Đang thực hiện'
                    ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-sm ring-2 ring-amber-300'
                    : 'bg-[#fef3c7] text-[#92400e] border-[#fde68a] hover:bg-[#fde68a]'
                } ${getPillOpacity(statusFilter === 'Đang thực hiện')}`}
              >
                Đang thực hiện <span className="font-extrabold ml-0.5">{statusCounts.dangThucHien}</span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter(statusFilter === 'Hoàn thành' ? null : 'Hoàn thành')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  statusFilter === 'Hoàn thành'
                    ? 'bg-emerald-400 text-emerald-950 border-emerald-500 shadow-sm ring-2 ring-emerald-300'
                    : 'bg-[#d1fae5] text-[#065f46] border-[#a7f3d0] hover:bg-[#a7f3d0]'
                } ${getPillOpacity(statusFilter === 'Hoàn thành')}`}
              >
                Hoàn thành <span className="font-extrabold ml-0.5">{statusCounts.hoanThanh}</span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter(statusFilter === 'Tạm dừng' ? null : 'Tạm dừng')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  statusFilter === 'Tạm dừng'
                    ? 'bg-purple-400 text-purple-950 border-purple-500 shadow-sm ring-2 ring-purple-300'
                    : 'bg-[#ede9fe] text-[#6b21a8] border-[#ddd6fe] hover:bg-[#ddd6fe]'
                } ${getPillOpacity(statusFilter === 'Tạm dừng')}`}
              >
                Tạm dừng <span className="font-extrabold ml-0.5">{statusCounts.tamDung}</span>
              </button>
            </div>
          </div>

          <span className="h-3 w-px bg-slate-200 hidden lg:inline-block" />

          {/* Nhóm 2: Đánh giá TĐ */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-bold text-slate-600 whitespace-nowrap">Đánh giá TĐ:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setEvalFilter(evalFilter === 'Chưa đánh giá' ? null : 'Chưa đánh giá')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  evalFilter === 'Chưa đánh giá'
                    ? 'bg-slate-200 text-slate-900 border-slate-400 shadow-sm ring-2 ring-slate-300'
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                } ${getPillOpacity(evalFilter === 'Chưa đánh giá')}`}
              >
                Chưa đánh giá <span className="font-extrabold ml-0.5">{evalCounts.chuaDanhGia}</span>
              </button>

              <button
                type="button"
                onClick={() => setEvalFilter(evalFilter === 'Vượt tiến độ' ? null : 'Vượt tiến độ')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  evalFilter === 'Vượt tiến độ'
                    ? 'bg-[#144718] text-white border-[#0e3011] shadow-sm ring-2 ring-emerald-400'
                    : 'bg-[#1b5e20] text-white border-[#144718] hover:bg-[#144718] shadow-2xs'
                } ${getPillOpacity(evalFilter === 'Vượt tiến độ')}`}
              >
                Vượt tiến độ <span className="font-extrabold ml-0.5">{evalCounts.vuotTienDo}</span>
              </button>

              <button
                type="button"
                onClick={() => setEvalFilter(evalFilter === 'Đúng tiến độ' ? null : 'Đúng tiến độ')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  evalFilter === 'Đúng tiến độ'
                    ? 'bg-[#629753] text-white border-[#4f7c42] shadow-sm ring-2 ring-emerald-300'
                    : 'bg-[#78b368] text-white border-[#6ba45b] hover:bg-[#6ba45b] shadow-2xs'
                } ${getPillOpacity(evalFilter === 'Đúng tiến độ')}`}
              >
                Đúng tiến độ <span className="font-extrabold ml-0.5">{evalCounts.dungTienDo}</span>
              </button>
            </div>
          </div>

          <span className="h-3 w-px bg-slate-200 hidden lg:inline-block" />

          {/* Nhóm 3: Tiến độ YCSX */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-bold text-slate-600 whitespace-nowrap">Tiến độ YCSX:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setYcsxFilter(ycsxFilter === 'Chậm tiến độ' ? null : 'Chậm tiến độ')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  ycsxFilter === 'Chậm tiến độ'
                    ? 'bg-rose-300 text-rose-950 border-rose-400 shadow-sm ring-2 ring-rose-200'
                    : 'bg-[#fee2e2] text-[#991b1b] border-[#fecaca] hover:bg-[#fecaca]'
                } ${getPillOpacity(ycsxFilter === 'Chậm tiến độ')}`}
              >
                Chậm tiến độ <span className="font-extrabold ml-0.5">{ycsxCounts.chamTienDo}</span>
              </button>

              <button
                type="button"
                onClick={() => setYcsxFilter(ycsxFilter === 'Còn công việc' ? null : 'Còn công việc')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  ycsxFilter === 'Còn công việc'
                    ? 'bg-indigo-300 text-indigo-950 border-indigo-400 shadow-sm ring-2 ring-indigo-200'
                    : 'bg-[#e0e7ff] text-[#3730a3] border-[#c7d2fe] hover:bg-[#c7d2fe]'
                } ${getPillOpacity(ycsxFilter === 'Còn công việc')}`}
              >
                Còn công việc <span className="font-extrabold ml-0.5">{ycsxCounts.conCongViec}</span>
              </button>

              <button
                type="button"
                onClick={() => setYcsxFilter(ycsxFilter === 'Đạt 100%' ? null : 'Đạt 100%')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  ycsxFilter === 'Đạt 100%'
                    ? 'bg-teal-300 text-teal-950 border-teal-400 shadow-sm ring-2 ring-teal-200'
                    : 'bg-[#ccfbf1] text-[#115e59] border-[#99f6e4] hover:bg-[#99f6e4]'
                } ${getPillOpacity(ycsxFilter === 'Đạt 100%')}`}
              >
                Đạt 100% <span className="font-extrabold ml-0.5">{ycsxCounts.dat100}</span>
              </button>

              <button
                type="button"
                onClick={() => setYcsxFilter(ycsxFilter === 'Chưa đủ dữ liệu' ? null : 'Chưa đủ dữ liệu')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  ycsxFilter === 'Chưa đủ dữ liệu'
                    ? 'bg-slate-300 text-slate-900 border-slate-400 shadow-sm ring-2 ring-slate-200'
                    : 'bg-[#f1f5f9] text-[#475569] border-[#e2e8f0] hover:bg-[#e2e8f0]'
                } ${getPillOpacity(ycsxFilter === 'Chưa đủ dữ liệu')}`}
              >
                Chưa đủ dữ liệu <span className="font-extrabold ml-0.5">{ycsxCounts.chuaDuDuLieu}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. PROJECTS TABLE CARD ── */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

      {/* TABLE MATCHING KHACH HANG TAB EXACTLY */}
      <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
        <table className="w-full text-xs text-left border-collapse min-w-[1200px]">
          <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-slate-200">
            <tr className="bg-slate-50 whitespace-nowrap">
              <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap min-w-[280px]">
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold whitespace-nowrap"
                  onClick={() => handleSort('name')}
                >
                  <span>Dự án</span>
                  <span className="text-slate-400 text-[10px]">↕</span>
                </button>
              </th>
              <th className="px-3 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center whitespace-nowrap min-w-[85px]">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold w-full whitespace-nowrap"
                  onClick={() => handleSort('priority')}
                >
                  <span>Ưu tiên</span>
                  <span className="text-slate-400 text-[10px]">↕</span>
                </button>
              </th>
              <th className="px-3 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center whitespace-nowrap min-w-[110px]">
                Tình trạng
              </th>
              <th className="px-3 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center whitespace-nowrap min-w-[125px]">
                Đánh giá TĐ
              </th>
              <th className="px-3 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center whitespace-nowrap min-w-[90px]">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold w-full whitespace-nowrap"
                  onClick={() => handleSort('progressPct')}
                >
                  <span>Tiến độ</span>
                  <span className="text-slate-400 text-[10px]">↕</span>
                </button>
              </th>
              <th className="px-3 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center whitespace-nowrap min-w-[125px]">
                Tiến độ YCSX
              </th>
              <th className="px-3 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center whitespace-nowrap min-w-[105px]">
                Hoàn thành
              </th>
              <th className="px-3 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-center whitespace-nowrap min-w-[120px]">
                Giờ TH/KH
              </th>
              <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200 text-right whitespace-nowrap min-w-[230px]">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedProjects.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-10 text-slate-400">
                  <p className="font-semibold text-xs">Không tìm thấy dự án nào</p>
                </td>
              </tr>
            ) : (
              paginatedProjects.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-slate-50/70 transition-colors group cursor-pointer whitespace-nowrap"
                  onClick={() => setSelectedModalProject(p)}
                >
                  {/* Tên dự án + Avatar */}
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar name={p.name} />
                      <div className="min-w-0 max-w-[340px]">
                        <p
                          className="font-bold text-[#406c89] hover:underline cursor-pointer leading-snug text-xs uppercase truncate"
                          title={p.name}
                        >
                          {p.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5 uppercase truncate" title={p.subName}>
                          {p.subName}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Ưu tiên */}
                  <td className="px-3 py-3.5 align-middle text-center whitespace-nowrap">
                    {p.priority !== null ? (
                      <span className="font-bold text-[#2f2b7c] text-xs">
                        {p.priority}
                      </span>
                    ) : (
                      <span className="text-slate-300 font-medium">—</span>
                    )}
                  </td>

                  {/* Tình trạng */}
                  <td className="px-3 py-3.5 align-middle text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${getStatusBadgeStyle(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>

                  {/* Đánh giá TĐ */}
                  <td className="px-3 py-3.5 align-middle text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${getEvaluationBadgeStyle(
                        p.evaluation
                      )}`}
                    >
                      {p.evaluation}
                    </span>
                  </td>

                  {/* Tiến độ (%) */}
                  <td className="px-3 py-3.5 align-middle text-center font-bold text-[#2f2b7c] text-xs whitespace-nowrap">
                    {p.progressPct}%
                  </td>

                  {/* Tiến độ YCSX */}
                  <td className="px-3 py-3.5 align-middle text-center whitespace-nowrap">
                    {p.tienDoYcsx && p.tienDoYcsxText !== '—' ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedYcsxProject(p);
                        }}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap hover:scale-105 transition-transform cursor-pointer ${getYcsxBadgeStyle(
                          p.tienDoYcsx
                        )}`}
                        title="Xem chi tiết tiến độ theo YCSX"
                      >
                        {p.tienDoYcsxText || p.tienDoYcsx}
                      </button>
                    ) : (
                      <span className="text-slate-400 font-medium">—</span>
                    )}
                  </td>

                  {/* Hoàn thành */}
                  <td className="px-3 py-3.5 align-middle text-center font-bold text-teal-600 text-xs whitespace-nowrap">
                    {p.completedTasks}
                  </td>

                  {/* Giờ TH/KH */}
                  <td className="px-3 py-3.5 align-middle text-center font-bold text-amber-600 text-xs whitespace-nowrap">
                    {p.actualHours}
                  </td>

                  {/* THAO TÁC (Clicking button opens Modal) */}
                  <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                    <div className="flex flex-row items-center justify-end gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedModalProject(p);
                        }}
                        className="py-1 px-2.5 rounded-md border border-sky-200 text-[#406c89] hover:bg-sky-50 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors bg-white cursor-pointer shadow-2xs whitespace-nowrap"
                        title="Xem nhận xét"
                      >
                        <IconEye size={12} />
                        <span>Xem nhận xét</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedYcsxProject(p);
                        }}
                        className="py-1 px-2.5 rounded-md border border-teal-200 text-teal-700 hover:bg-teal-50 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors bg-white cursor-pointer shadow-2xs whitespace-nowrap"
                        title="Tiến độ theo YCSX"
                      >
                        <IconClipboardList size={12} />
                        <span>Tiến độ theo YCSX</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION FOOTER MATCHING KHACH HANG TAB EXACTLY */}
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
            className="px-2 py-1 rounded border border-slate-200 bg-[#406c89]/10 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Sau</span>
            <IconChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>

      {/* PROJECT DETAILS MODAL */}
      {selectedModalProject && (
        <ChiTietDuAnModal
          isOpen={!!selectedModalProject}
          onClose={() => setSelectedModalProject(null)}
          project={selectedModalProject}
        />
      )}

      {/* TIEN DO THEO YCSX MODAL */}
      {selectedYcsxProject && (
        <TienDoTheoYCSXModal
          isOpen={!!selectedYcsxProject}
          onClose={() => setSelectedYcsxProject(null)}
          project={selectedYcsxProject}
        />
      )}
    </div>
  );
}
