"use client";

import React, { useState } from 'react';
import {
  IconFileText,
  IconSearch,
  IconDownload,
  IconUpload,
  IconPlus,
  IconChevronDown,
} from '@tabler/icons-react';

/* ─── Mock data ─────────────────────────────────────────────── */
const LOAI_VAN_BAN = ['Tất cả loại', 'Văn bản đến', 'Văn bản đi', 'Công văn', 'Thông báo', 'Quyết định', 'Báo cáo'];

const mockVanBan = [
  { so: 'CV-2026-001', ten: 'Công văn về kế hoạch sản xuất Q3/2026', loai: 'Công văn',    nguon: 'Ban giám đốc',      nguoi_nhan: 'P.Kinh doanh',   ngay: '2026-08-01', trang_thai: 'Đã xử lý' },
  { so: 'TB-2026-012', ten: 'Thông báo nghỉ lễ Quốc khánh 2/9',      loai: 'Thông báo',  nguon: 'P.Hành chính',      nguoi_nhan: 'Toàn công ty',   ngay: '2026-08-05', trang_thai: 'Đã ban hành' },
  { so: 'QD-2026-007', ten: 'Quyết định bổ nhiệm Trưởng phòng',       loai: 'Quyết định', nguon: 'Ban giám đốc',      nguoi_nhan: 'P.Nhân sự',      ngay: '2026-08-08', trang_thai: 'Đã ban hành' },
  { so: 'BC-2026-033', ten: 'Báo cáo tình hình kinh doanh T7/2026',   loai: 'Báo cáo',    nguon: 'P.Kinh doanh',      nguoi_nhan: 'Ban giám đốc',   ngay: '2026-08-10', trang_thai: 'Chờ duyệt'  },
  { so: 'VBD-2026-018',ten: 'Văn bản đến từ Sở Lao động',             loai: 'Văn bản đến',nguon: 'Sở LĐTB&XH',        nguoi_nhan: 'P.Nhân sự',      ngay: '2026-08-12', trang_thai: 'Đang xử lý' },
  { so: 'VBĐ-2026-009',ten: 'Công văn phản hồi khách hàng HN',        loai: 'Văn bản đi', nguon: 'P.Kinh doanh',      nguoi_nhan: 'KH Hà Nội',      ngay: '2026-08-14', trang_thai: 'Đã gửi'     },
  { so: 'TB-2026-013', ten: 'Thông báo lịch họp tháng 8',             loai: 'Thông báo',  nguon: 'P.Hành chính',      nguoi_nhan: 'Toàn công ty',   ngay: '2026-08-15', trang_thai: 'Đã ban hành' },
  { so: 'CV-2026-002', ten: 'Công văn về chính sách phúc lợi mới',    loai: 'Công văn',   nguon: 'P.Nhân sự',         nguoi_nhan: 'Toàn công ty',   ngay: '2026-08-17', trang_thai: 'Chờ duyệt'  },
];

const STATUS_STYLE: Record<string, string> = {
  'Đã xử lý':    'bg-emerald-50 text-emerald-600',
  'Đã ban hành': 'bg-blue-50 text-blue-600',
  'Chờ duyệt':   'bg-amber-50 text-amber-600',
  'Đang xử lý':  'bg-purple-50 text-purple-600',
  'Đã gửi':      'bg-sky-50 text-sky-600',
};

/* ─── Component ─────────────────────────────────────────────── */
export default function VanBan() {
  const [search, setSearch] = useState('');
  const [loai, setLoai]     = useState('Tất cả loại');

  const filtered = mockVanBan.filter((v) =>
    (loai === 'Tất cả loại' || v.loai === loai) &&
    (v.so.toLowerCase().includes(search.toLowerCase()) ||
     v.ten.toLowerCase().includes(search.toLowerCase()) ||
     v.nguon.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden gap-3">

      {/* ── Header bar ── */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <div className="flex items-center gap-2 mr-auto">
          <IconFileText size={18} className="text-[#406c89] shrink-0" />
          <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
            Quản lý Văn bản — Văn bản đến &amp; đi
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconUpload size={13} />
            Import
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconDownload size={13} />
            Xuất Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold">
            <IconPlus size={13} />
            Thêm văn bản
          </button>
        </div>
      </div>

      {/* ── Search + Filter row ── */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="relative flex-1">
          <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo số văn bản, tên, nguồn..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>
        <div className="relative shrink-0">
          <select
            value={loai}
            onChange={(e) => setLoai(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer"
          >
            {LOAI_VAN_BAN.map((n) => <option key={n}>{n}</option>)}
          </select>
          <IconChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="overflow-auto flex-1">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr>
                {['Số VB', 'Tên văn bản', 'Loại', 'Nguồn / Người gửi', 'Người nhận', 'Ngày', 'Trạng thái'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={v.so} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                  <td className="px-4 py-2.5 font-mono text-slate-500">{v.so}</td>
                  <td className="px-4 py-2.5 font-semibold text-slate-700 max-w-[240px] truncate">{v.ten}</td>
                  <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{v.loai}</td>
                  <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{v.nguon}</td>
                  <td className="px-4 py-2.5 text-[#406c89] font-medium whitespace-nowrap">{v.nguoi_nhan}</td>
                  <td className="px-4 py-2.5 text-slate-400">{v.ngay}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_STYLE[v.trang_thai] ?? 'bg-slate-100 text-slate-500'}`}>
                      {v.trang_thai}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
