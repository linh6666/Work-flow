"use client";

import React, { useState } from 'react';
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconCircleCheck,
  IconCircleX,
} from '@tabler/icons-react';

const mockPheDuyet = [
  { id: 1, loai: 'Mua NVL tháng', ky: '9/2026', noi_dung: 'Bánh xe SUPO50', so_tien: '17.536.000 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: 2, loai: 'Mua NVL tháng', ky: '9/2026', noi_dung: 'Củ sạc samsung 25W', so_tien: '290.000 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: 3, loai: 'Mua NVL tháng', ky: '9/2026', noi_dung: 'Chân bục mô hình', so_tien: '69.458.004 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: 4, loai: 'Mua NVL tháng', ky: '9/2026', noi_dung: 'Dây điện 1×0.3mm', so_tien: '15.010 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: 5, loai: 'Mua NVL tháng', ky: '9/2026', noi_dung: 'Mica trong 3mm', so_tien: '3.010.000 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: 6, loai: 'Mua NVL tháng', ky: '9/2026', noi_dung: 'Mica trong 4mm', so_tien: '3.181.734 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: 7, loai: 'Mua NVL tháng', ky: '9/2026', noi_dung: 'Mica trong 2mm', so_tien: '7.400.000 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: 8, loai: 'Mua NVL tháng', ky: '9/2026', noi_dung: 'Keo 502', so_tien: '700.000 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: 9, loai: 'Mua NVL tháng', ky: '9/2026', noi_dung: 'Mica trắng sữa 2mm', so_tien: '15.140.000 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: 10, loai: 'Mua NVL tháng', ky: '9/2026', noi_dung: 'Tấm laminate khổ 1220×2440×0.7mm mã Không xác định', so_tien: '4.800.000 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: 11, loai: 'Mua NVL tháng', ky: '9/2026', noi_dung: 'Tấm laminate AICA khổ 1220×2440×0.7mm mã TAS14093CT98', so_tien: '840.000 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: 12, loai: 'Mua NVL tháng', ky: '9/2026', noi_dung: 'Jack 2 chân - Jack xe máy 1×2P 28050', so_tien: '200.000 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: 13, loai: 'Mua NVL tháng', ky: '9/2026', noi_dung: 'Phủ mờ 100', so_tien: '180.000 đ', trang_thai: 'Chờ QL KD duyệt' },
  { id: 14, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Sim Viettel', so_tien: '450.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 15, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Dây led 2835 các màu', so_tien: '3.553.920 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 16, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Mica trong 5mm', so_tien: '3.200.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 17, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Mica trắng sữa 2mm', so_tien: '18.000.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 18, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Mica trong 4mm', so_tien: '1.590.907 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 19, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Mica trong 3mm', so_tien: '2.100.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 20, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Mica trong 2mm', so_tien: '11.100.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 21, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Dây đồng 0.14', so_tien: '480.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 22, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Sợi cáp quang 1.5mm', so_tien: '4.387.428 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 23, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Laminate (chưa xác định mã)', so_tien: '8.600.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 24, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Tấm laminate MBB-477-AL5018', so_tien: '14.950.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 25, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Keo Bugio', so_tien: '1.296.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 26, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Gỗ MDF 12mm xanh chống ẩm', so_tien: '16.632.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 27, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Nguồn Adapter 12V5A', so_tien: '990.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 28, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Quạt tản nhiệt Brushless 8025 12V 0.22A', so_tien: '1.728.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 29, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Nút nhấn 2 chân 6×6×19mm DIP', so_tien: '5.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 30, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Tủ điện 30×40×15mm', so_tien: '1.650.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 31, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Bánh xe SUPO50', so_tien: '13.147.200 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 32, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Bulong M8×8', so_tien: '84.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 33, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Lót 612-Oseven', so_tien: '900.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 34, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Xăng butin', so_tien: '5.040.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 35, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Keo dán gỗ 2 thành phần AB', so_tien: '560.000 đ', trang_thai: 'PGĐ đã duyệt' },
  { id: 36, loai: 'Mua NVL tháng', ky: '8/2026', noi_dung: 'Dây USB A-Mini 150CM AM-MM 150', so_tien: '25.000 đ', trang_thai: 'PGĐ đã duyệt' },
];

export default function PheDuyetDanhGiaTab() {
  const [activeStatus, setActiveStatus] = useState('Tất cả');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 15;
  const statuses = ['Chờ duyệt', 'Đã duyệt', 'Từ chối', 'Tất cả'];

  const filtered = activeStatus === 'Tất cả'
    ? mockPheDuyet
    : mockPheDuyet.filter((p) => activeStatus === 'Đã duyệt'
      ? p.trang_thai === 'PGĐ đã duyệt'
      : activeStatus === 'Chờ duyệt'
        ? p.trang_thai === 'Chờ QL KD duyệt'
        : false);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedData = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
    setCurrentPage(1);
  };

  return (
    <div className="flex-1 flex flex-col gap-2.5 overflow-hidden">
      <div className="flex items-center gap-1.5 shrink-0">
        {statuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => handleStatusChange(status)}
            className={`px-3.5 py-1.5 rounded-lg text-xs transition-colors ${
              activeStatus === status
                ? 'bg-[#406c89] text-white font-semibold shadow-sm'
                : 'text-slate-500 hover:text-slate-700 hover:bg-white/70'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-white rounded-xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden min-h-0">
        <div className="overflow-auto flex-1">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr>
                {['Loại', 'Kỳ', 'Chi tiết', 'Số tiền', 'Trạng thái', 'Phê duyệt'].map((h, index) => (
                  <th key={h} className={`text-left px-2 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-200/80 ${index === 0 ? 'pl-2' : ''}`}>
                    <span className="inline-flex items-center gap-1">{h}<span className="text-slate-300"><IconChevronUp size={10} /><IconChevronDown size={10} className="-mt-1" /></span></span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((p, i) => {
                const canApprove = p.trang_thai === 'Chờ QL KD duyệt';
                return (
                  <tr key={p.id} className={`border-b border-slate-100 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                    <td className="px-2 py-2.5 text-slate-600">{p.loai}</td>
                    <td className="px-2 py-2.5 font-medium text-slate-700 whitespace-nowrap">{p.ky}</td>
                    <td className="px-2 py-2.5 text-slate-700 max-w-[420px] truncate" title={p.noi_dung}>{p.noi_dung}</td>
                    <td className="px-2 py-2.5 text-slate-700 whitespace-nowrap text-right">{p.so_tien}</td>
                    <td className="px-2 py-2.5 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-1.5 py-0.5 ${canApprove ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                        {p.trang_thai}
                      </span>
                    </td>
                    <td className="px-2 py-2.5">
                      {canApprove ? (
                        <div className="flex items-center gap-1">
                          <button type="button" className="inline-flex items-center gap-1 rounded border border-emerald-400 px-2 py-1 text-emerald-600 hover:bg-emerald-50">
                            <IconCircleCheck size={12} /> Duyệt
                          </button>
                          <button type="button" className="inline-flex items-center gap-1 rounded border border-red-300 px-2 py-1 text-red-500 hover:bg-red-50">
                            <IconCircleX size={12} /> Từ chối
                          </button>
                        </div>
                      ) : <span className="text-slate-300">—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div>
            Hiển thị{' '}
            <span className="font-bold text-slate-700">{filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}</span>
            {' '}-{' '}
            <span className="font-bold text-slate-700">{Math.min(safePage * PAGE_SIZE, filtered.length)}</span>
            {' '}trên tổng số{' '}
            <span className="font-bold text-slate-700">{filtered.length}</span> bản ghi
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <IconChevronLeft size={13} />
              <span>Trước</span>
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                style={safePage === page ? { backgroundColor: '#406c89' } : {}}
                className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                  safePage === page
                    ? 'text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
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
