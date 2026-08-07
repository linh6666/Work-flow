"use client";

import React, { useState, useMemo } from 'react';
import { IconSearch, IconCircleCheck, IconBox, IconClock, IconUserCheck, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export interface NghiemThuCardItem {
  id: string;
  project: string;
  department: string;
  date: string;
  reporter: string;
  quantity: string | number;
  hours: string;
  progressPct: string;
  status: string;
  approvedBy: string;
}

const ITEMS_100: NghiemThuCardItem[] = [
  { id: '1', project: 'HERITAGE VILLAGE MOC CHAU', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 15250, hours: '1878.5h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
  { id: '2', project: 'HERITAGE VILLAGE MOC CHAU', department: 'Phòng Cắt', date: '06/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 557, hours: '428h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)' },
  { id: '3', project: 'HERITAGE VILLAGE MOC CHAU', department: 'Phòng Ghép', date: '04/08/2026', reporter: 'Định Đức Lợi', quantity: 667, hours: '474h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
  { id: '4', project: 'HERITAGE VILLAGE MOC CHAU', department: 'Phòng Điện', date: '04/08/2026', reporter: 'Bùi Văn Lộc', quantity: 3936, hours: '169h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
  { id: '5', project: 'HERITAGE VILLAGE MOC CHAU', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 58, hours: '440.5h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (03/08/2026)' },
  { id: '6', project: 'HERITAGE VILLAGE MOC CHAU', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 10032, hours: '367h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },

  { id: '7', project: 'VSIP LẠNG SƠN', department: 'Toàn dự án', date: '06/08/2026', reporter: 'Hệ thống (tổng hợp tự động)', quantity: 47363.5, hours: '2295.1h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Hệ thống (06/08/2026)' },
  { id: '8', project: 'VSIP LẠNG SƠN', department: 'Phòng Cắt', date: '06/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 39, hours: '216h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)' },
  { id: '9', project: 'VSIP LẠNG SƠN', department: 'Phòng Cảnh Quan', date: '05/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 34553.5, hours: '790.1h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thao B Phung (05/08/2026)' },
  { id: '10', project: 'VSIP LẠNG SƠN', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 35, hours: '168.5h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (03/08/2026)' },
  { id: '11', project: 'VSIP LẠNG SƠN', department: 'Ban Giám đốc', date: '28/07/2026', reporter: 'Thảo Phùng', quantity: 17, hours: '19h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Thảo Phùng (02/08/2026)' },

  { id: '12', project: 'CHỈNH SỬA MÔ HÌNH L\'AURORA', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 72, hours: '346.5h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },

  { id: '13', project: '22 LIỄU GIAI', department: 'Phòng Cắt', date: '06/08/2026', reporter: 'Hoàng Hữu Vinh', quantity: 989, hours: '304h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (06/08/2026)' },
  { id: '14', project: '22 LIỄU GIAI', department: 'Phòng Khai triển', date: '03/08/2026', reporter: 'Trần Diễm My', quantity: 84, hours: '630.5h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
  { id: '15', project: '22 LIỄU GIAI', department: 'Phòng Cảnh Quan', date: '03/08/2026', reporter: 'Phạm Thị Thu Trang', quantity: 4250.5, hours: '408h', progressPct: '100%', status: 'BGĐ đã duyệt', approvedBy: 'Duyệt bởi: Trần Diễm My (05/08/2026)' },
];

export default function NghiemThu100() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = useMemo(() => {
    if (!search.trim()) return ITEMS_100;
    const term = search.toLowerCase();
    return ITEMS_100.filter(
      (i) =>
        i.project.toLowerCase().includes(term) ||
        i.department.toLowerCase().includes(term) ||
        i.reporter.toLowerCase().includes(term)
    );
  }, [search]);

  const totalFiltered = filtered.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFiltered);
  const paginated = filtered.slice(startIndex, endIndex);

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-3 text-left font-sans select-none overflow-hidden">
      {/* SEARCH BAR */}
      <div className="relative shrink-0">
        <IconSearch size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Tìm kiếm theo dự án, phòng ban hoặc người báo cáo..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#137333] shadow-2xs transition-all"
        />
      </div>

      {/* DATA TABLE CONTAINER */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[900px]">
            <thead className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-xs border-b border-slate-200">
              <tr className="text-slate-600 font-bold text-[11px]">
                <th className="py-3 px-4 border-b border-slate-200">Dự án</th>
                <th className="py-3 px-4 border-b border-slate-200">Phòng ban</th>
                <th className="py-3 px-4 border-b border-slate-200">Trạng thái</th>
                <th className="py-3 px-4 border-b border-slate-200">Thời gian</th>
                <th className="py-3 px-4 border-b border-slate-200">Người báo cáo</th>
                <th className="py-3 px-4 border-b border-slate-200 text-center">Khối lượng</th>
                <th className="py-3 px-4 border-b border-slate-200 text-center">Số giờ</th>
                <th className="py-3 px-4 border-b border-slate-200 text-center">%HT TB</th>
                <th className="py-3 px-4 border-b border-slate-200">Phê duyệt bởi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-slate-400 text-xs">
                    Không tìm thấy dữ liệu báo cáo nghiệm thu phù hợp.
                  </td>
                </tr>
              ) : (
                paginated.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Dự án */}
                    <td className="py-3.5 px-4 font-bold text-slate-800 text-xs max-w-[220px]">
                      {item.project}
                    </td>

                    {/* Phòng ban */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium text-xs">
                      {item.department}
                    </td>

                    {/* Trạng thái */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
                        <IconCircleCheck size={13} />
                        <span>{item.status}</span>
                      </span>
                    </td>

                    {/* Thời gian */}
                    <td className="py-3.5 px-4 text-slate-500 font-medium text-xs whitespace-nowrap">
                      {item.date}
                    </td>

                    {/* Người báo cáo */}
                    <td className="py-3.5 px-4 text-slate-700 font-semibold text-xs whitespace-nowrap">
                      {item.reporter}
                    </td>

                    {/* Khối lượng */}
                    <td className="py-3.5 px-4 text-center font-bold text-[#b45309] text-xs">
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200/60">
                        <IconBox size={13} />
                        <span>{item.quantity}</span>
                      </span>
                    </td>

                    {/* Số giờ */}
                    <td className="py-3.5 px-4 text-center font-bold text-[#d97706] text-xs">
                      <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 px-2 py-0.5 rounded border border-orange-200/60">
                        <IconClock size={13} />
                        <span>{item.hours}</span>
                      </span>
                    </td>

                    {/* %HT TB */}
                    <td className="py-3.5 px-4 text-center font-extrabold text-[#137333] text-xs">
                      {item.progressPct}
                    </td>

                    {/* Phê duyệt bởi */}
                    <td className="py-3.5 px-4 text-emerald-700 font-medium text-[11px]">
                      <span className="inline-flex items-center gap-1">
                        <IconUserCheck size={13} className="text-emerald-600 shrink-0" />
                        <span>{item.approvedBy}</span>
                      </span>
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
    </div>
  );
}

