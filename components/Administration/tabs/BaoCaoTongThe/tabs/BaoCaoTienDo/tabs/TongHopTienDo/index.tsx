"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
  IconArrowsSort,
  IconEye,
} from '@tabler/icons-react';
import { ProjectItem } from '../../types';

interface TongHopTienDoProps {
  projects: ProjectItem[];
  searchQuery: string;
  evaluationFilter: string;
}

export default function TongHopTienDo({
  projects,
  searchQuery,
  evaluationFilter,
}: TongHopTienDoProps) {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<keyof ProjectItem | null>('priority');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Reset page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, evaluationFilter, sortKey, sortDir, itemsPerPage]);

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        const matchesQuery =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesEval =
          evaluationFilter === 'ALL' || p.evaluation === evaluationFilter;
        return matchesQuery && matchesEval;
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
  }, [projects, searchQuery, evaluationFilter, sortKey, sortDir]);

  // Paginated Projects
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredProjects.length);
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

  const toggleExpand = (id: string) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  const getEvaluationBadgeStyle = (evalType: ProjectItem['evaluation']) => {
    switch (evalType) {
      case 'Đúng tiến độ':
        return 'bg-[#4da052] text-white font-bold border-[#438f47]';
      case 'Vượt tiến độ':
        return 'bg-[#1b5e20] text-white font-bold border-[#144718]';
      case 'Chưa đánh giá':
        return 'bg-white text-slate-500 font-semibold border-slate-300 hover:bg-slate-50';
      case 'Chậm tiến độ':
        return 'bg-rose-600 text-white font-bold border-rose-700';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl shadow-2xs overflow-hidden flex flex-col">
      <div className="px-4 py-3 border-b border-slate-100 bg-white flex items-center justify-between">
        <h2 className="text-xs font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <span>Tổng hợp Tiến độ các dự án đang triển khai</span>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-semibold rounded-full">
            {filteredProjects.length} dự án
          </span>
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[980px]">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200/80 text-slate-500 font-semibold select-none">
              <th
                className="py-2.5 px-3 cursor-pointer hover:bg-slate-100/60 transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  <span>Dự án</span>
                  <IconArrowsSort size={12} className="text-slate-400" />
                </div>
              </th>
              <th
                className="py-2.5 px-2 text-center cursor-pointer hover:bg-slate-100/60 transition-colors w-16"
                onClick={() => handleSort('priority')}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Ưu tiên</span>
                  <IconArrowsSort size={12} className="text-slate-400" />
                </div>
              </th>
              <th className="py-2.5 px-3 text-center w-28">Tình trạng</th>
              <th className="py-2.5 px-3 text-center w-32">Đánh giá TĐ</th>
              <th
                className="py-2.5 px-3 text-center cursor-pointer hover:bg-slate-100/60 transition-colors w-20"
                onClick={() => handleSort('progressPct')}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Tiến độ</span>
                  <IconArrowsSort size={12} className="text-slate-400" />
                </div>
              </th>
              <th className="py-2.5 px-3 text-center w-24">Hoàn thành</th>
              <th className="py-2.5 px-3 text-center w-32">Giờ TH/KH</th>
              <th className="py-2.5 px-3 text-center w-28">TB Tuần</th>
              <th className="py-2.5 px-3 text-center w-24">Biểu đồ</th>
              <th className="py-2.5 px-3 text-center w-24">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedProjects.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-400 text-xs">
                  Không tìm thấy dự án phù hợp với bộ lọc.
                </td>
              </tr>
            ) : (
              paginatedProjects.map((p) => {
                const isExpanded = expandedRowId === p.id;
                return (
                  <React.Fragment key={p.id}>
                    <tr
                      className={`hover:bg-slate-50/80 transition-colors group cursor-pointer ${
                        isExpanded ? 'bg-indigo-50/30' : ''
                      }`}
                      onClick={() => toggleExpand(p.id)}
                    >
                      {/* Project Name */}
                      <td className="py-3 px-3">
                        <div>
                          <span className="font-bold text-slate-800 text-[12px] uppercase leading-snug tracking-tight block hover:text-[#406c89] transition-colors">
                            {p.name}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block mt-0.5">
                            {p.subName}
                          </span>
                        </div>
                      </td>

                      {/* Ưu tiên */}
                      <td className="py-3 px-2 text-center">
                        {p.priority !== null ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-bold text-[11px] border border-slate-200">
                            {p.priority}
                          </span>
                        ) : (
                          <span className="text-slate-300 font-medium">—</span>
                        )}
                      </td>

                      {/* Tình trạng */}
                      <td className="py-3 px-3 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#fff8e1] text-[#b78103] border border-[#ffe082]">
                          {p.status}
                        </span>
                      </td>

                      {/* Đánh giá TĐ */}
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded text-[10px] border shadow-2xs ${getEvaluationBadgeStyle(
                            p.evaluation
                          )}`}
                        >
                          {p.evaluation}
                        </span>
                      </td>

                      {/* Tiến độ (%) */}
                      <td className="py-3 px-3 text-center font-bold text-blue-700 text-xs">
                        {p.progressPct}%
                      </td>

                      {/* Hoàn thành */}
                      <td className="py-3 px-3 text-center font-bold text-emerald-600 text-xs">
                        {p.completedTasks}
                      </td>

                      {/* Giờ TH/KH */}
                      <td className="py-3 px-3 text-center font-bold text-amber-600 text-xs">
                        {p.actualHours}
                      </td>

                      {/* TB Tuần */}
                      <td className="py-3 px-3 text-center text-xs">
                        {p.weekReport ? (
                          <div className="inline-flex items-center gap-1.5 text-slate-600 font-medium text-[11px]">
                            <span>{p.weekReport}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                          </div>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>

                      {/* Biểu đồ bar graph */}
                      <td className="py-3 px-3 text-center">
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                          <div
                            className="h-full rounded-full bg-indigo-700 transition-all duration-500 shadow-2xs"
                            style={{ width: `${p.progressPct}%` }}
                          />
                        </div>
                      </td>

                      {/* Hành động (Eye Icon Button) */}
                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(p.id);
                          }}
                          title="Xem chi tiết dự án"
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer inline-flex items-center justify-center ${
                            isExpanded
                              ? 'bg-indigo-50 border-indigo-200 text-[#406c89]'
                              : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-[#406c89] hover:bg-slate-100'
                          }`}
                        >
                          <IconEye size={15} />
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Detail Row */}
                    {isExpanded && (
                      <tr className="bg-slate-50/90 border-b border-slate-200">
                        <td colSpan={10} className="p-4">
                          <div className="bg-white border border-slate-200/80 rounded-lg p-3.5 shadow-2xs space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900">
                                  Chi tiết dự án: {p.name}
                                </span>
                                <span className="text-[11px] text-slate-500">
                                  ({p.subName})
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-[11px]">
                                <span className="text-slate-500">Người phụ trách:</span>
                                <span className="font-semibold text-slate-700">Chủ nhiệm dự án</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                              <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200/60">
                                <span className="text-slate-500 font-semibold block mb-1">Thống kê công việc</span>
                                <div className="flex justify-between items-center py-1 border-b border-slate-200/40">
                                  <span className="text-slate-600">Đã hoàn thành:</span>
                                  <span className="font-bold text-emerald-600">{p.completedTasks}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                  <span className="text-slate-600">Tỷ lệ tiến độ:</span>
                                  <span className="font-bold text-indigo-600">{p.progressPct}%</span>
                                </div>
                              </div>

                              <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200/60">
                                <span className="text-slate-500 font-semibold block mb-1">Thời gian thực hiện</span>
                                <div className="flex justify-between items-center py-1 border-b border-slate-200/40">
                                  <span className="text-slate-600">Giờ TH / Kế hoạch:</span>
                                  <span className="font-bold text-amber-600">{p.actualHours}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                  <span className="text-slate-600">Báo cáo tuần:</span>
                                  <span className="font-semibold text-slate-700">{p.weekReport || 'Chưa cập nhật'}</span>
                                </div>
                              </div>

                              <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200/60">
                                <span className="text-slate-500 font-semibold block mb-1">Đánh giá chung</span>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className={`px-2 py-0.5 rounded text-[11px] ${getEvaluationBadgeStyle(p.evaluation)}`}>
                                    {p.evaluation}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {p.latestRemark && (
                              <div className="mt-2 bg-amber-50/50 border border-amber-200/80 rounded-md p-2.5 text-xs">
                                <span className="font-bold text-amber-900 block mb-1">
                                  Nhận xét gần nhất:
                                </span>
                                <p className="text-slate-700 leading-relaxed text-[11px]">
                                  {p.latestRemark}
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="shrink-0 border-t border-slate-100 px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 bg-slate-50/60">
        <div className="flex items-center gap-2">
          <span>
            Hiển thị <span className="font-bold text-slate-700">{filteredProjects.length > 0 ? startIndex + 1 : 0}</span> -{' '}
            <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số{' '}
            <span className="font-bold text-slate-700">{filteredProjects.length}</span> dự án
          </span>
          <span className="text-slate-300">|</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer"
          >
            <option value={5}>5 / trang</option>
            <option value={10}>10 / trang</option>
            <option value={20}>20 / trang</option>
          </select>
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
            className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Sau</span>
            <IconChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
