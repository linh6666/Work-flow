"use client";

import React, { useState, useMemo } from 'react';
import { IconSearch, IconCircleCheck, IconChevronLeft, IconChevronRight, IconCircleX } from '@tabler/icons-react';

interface HistoryReportItem {
  id: string;
  title: string;
  sender: string;
  department: string;
  approver: string;
  approvedDate: string;
  status: 'Đã duyệt' | 'Đã từ chối';
}

const MOCK_HISTORY_REPORTS: HistoryReportItem[] = [
  { id: '1', title: 'Báo cáo Quyết toán Chi phí Q3/2026', sender: 'Nguyễn Văn An', department: 'Phòng Khai triển', approver: 'Ban Giám Đốc', approvedDate: '30/07/2026', status: 'Đã duyệt' },
  { id: '2', title: 'Báo cáo Đề xuất Thêm Nhân sự Khối Kỹ thuật', sender: 'Trần Thị Thảo', department: 'Khối Văn phòng', approver: 'Ban Giám Đốc', approvedDate: '28/07/2026', status: 'Đã duyệt' },
  { id: '3', title: 'Báo cáo Dự trù Chi phí Đột xuất Dự án Ecopark', sender: 'Lê Hoàng Nam', department: 'Phòng Ghép', approver: 'Ban Giám Đốc', approvedDate: '25/07/2026', status: 'Đã từ chối' },
  { id: '4', title: 'Báo cáo Nghiệm thu Giai đoạn 1 VSIP Lạng Sơn', sender: 'Phạm Minh Đức', department: 'Phòng Cắt', approver: 'Ban Giám Đốc', approvedDate: '22/07/2026', status: 'Đã duyệt' },
  { id: '5', title: 'Báo cáo Đề xuất Nâng cấp Máy cắt CNC CMH-2025', sender: 'Vũ Quốc Huy', department: 'Phòng Mộc Sơn', approver: 'Ban Giám Đốc', approvedDate: '18/07/2026', status: 'Đã từ chối' },
];

export default function LichSuPheDuyet() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = useMemo(() => {
    return MOCK_HISTORY_REPORTS.filter(
      (r) =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.sender.toLowerCase().includes(search.toLowerCase()) ||
        r.department.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalFiltered = filtered.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFiltered);
  const paginated = filtered.slice(startIndex, endIndex);

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2 overflow-hidden select-none">
      {/* SEARCH BAR */}
      <div className="relative shrink-0">
        <IconSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm lịch sử phê duyệt..."
          className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200/80 rounded-lg text-[11px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
        />
      </div>

      {/* TABLE */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[760px]">
            <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-slate-200">
              <tr className="bg-slate-50 text-slate-600 font-bold">
                <th className="px-4 py-3 border-b border-slate-200">Tên Báo Cáo</th>
                <th className="px-4 py-3 border-b border-slate-200">Người trình & Phòng ban</th>
                <th className="px-4 py-3 border-b border-slate-200">Người phê duyệt</th>
                <th className="px-4 py-3 border-b border-slate-200 text-center">Ngày xử lý</th>
                <th className="px-4 py-3 border-b border-slate-200 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400 text-xs">
                    Không tìm thấy lịch sử phê duyệt.
                  </td>
                </tr>
              ) : (
                paginated.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-800">
                      {r.title}
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-slate-700">{r.sender}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{r.department}</p>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-slate-700">
                      {r.approver}
                    </td>
                    <td className="px-4 py-3.5 text-center font-medium text-slate-500">
                      {r.approvedDate}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          r.status === 'Đã duyệt'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {r.status === 'Đã duyệt' ? (
                          <IconCircleCheck size={13} className="text-emerald-600" />
                        ) : (
                          <IconCircleX size={13} className="text-rose-600" />
                        )}
                        <span>{r.status}</span>
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
    </div>
  );
}
