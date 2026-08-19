"use client";

import React, { useState } from 'react';
import {
  IconCalendarEvent,
  IconSearch,
  IconDownload,
  IconPlus,
  IconChevronDown,
  IconMapPin,
} from '@tabler/icons-react';

/* ─── Mock data ─────────────────────────────────────────────── */
const PHONG_BAN = ['Tất cả phòng ban', 'Ban giám đốc', 'P.Kinh doanh', 'P.Kỹ thuật', 'P.Nhân sự', 'P.Tài chính', 'P.Hành chính'];

const mockCongTac = [
  { ma: 'CT-001', nhan_vien: 'Nguyễn Văn An',   phong_ban: 'P.Kinh doanh', dia_diem: 'Hà Nội',        muc_dich: 'Gặp khách hàng DA-HN-01',       tu_ngay: '2026-08-10', den_ngay: '2026-08-12', so_ngay: 3, chi_phi: 4_500_000,  trang_thai: 'Đã hoàn thành' },
  { ma: 'CT-002', nhan_vien: 'Trần Thị Bích',    phong_ban: 'P.Kỹ thuật',  dia_diem: 'Đà Nẵng',       muc_dich: 'Nghiệm thu công trình DA-DN-03',  tu_ngay: '2026-08-15', den_ngay: '2026-08-17', so_ngay: 3, chi_phi: 5_200_000,  trang_thai: 'Đang thực hiện' },
  { ma: 'CT-003', nhan_vien: 'Lê Công Chiến',    phong_ban: 'Ban giám đốc', dia_diem: 'TP.HCM',        muc_dich: 'Họp đối tác chiến lược',          tu_ngay: '2026-08-18', den_ngay: '2026-08-19', so_ngay: 2, chi_phi: 3_800_000,  trang_thai: 'Đang thực hiện' },
  { ma: 'CT-004', nhan_vien: 'Phạm Thị Dung',    phong_ban: 'P.Tài chính', dia_diem: 'Hà Nội',        muc_dich: 'Quyết toán dự án Q2',             tu_ngay: '2026-08-20', den_ngay: '2026-08-21', so_ngay: 2, chi_phi: 2_600_000,  trang_thai: 'Chờ duyệt'     },
  { ma: 'CT-005', nhan_vien: 'Hoàng Minh Tuấn',  phong_ban: 'P.Kỹ thuật',  dia_diem: 'Hải Phòng',     muc_dich: 'Khảo sát dự án mới',              tu_ngay: '2026-08-22', den_ngay: '2026-08-23', so_ngay: 2, chi_phi: 3_100_000,  trang_thai: 'Chờ duyệt'     },
  { ma: 'CT-006', nhan_vien: 'Võ Thị Lan',       phong_ban: 'P.Nhân sự',   dia_diem: 'Cần Thơ',       muc_dich: 'Tuyển dụng tại địa phương',       tu_ngay: '2026-08-25', den_ngay: '2026-08-26', so_ngay: 2, chi_phi: 2_900_000,  trang_thai: 'Đã duyệt'      },
  { ma: 'CT-007', nhan_vien: 'Nguyễn Đức Hùng',  phong_ban: 'P.Kinh doanh',dia_diem: 'Đà Nẵng',       muc_dich: 'Ký hợp đồng khách hàng mới',     tu_ngay: '2026-08-28', den_ngay: '2026-08-29', so_ngay: 2, chi_phi: 4_200_000,  trang_thai: 'Đã duyệt'      },
];

const STATUS_STYLE: Record<string, string> = {
  'Đã hoàn thành':  'bg-emerald-50 text-emerald-600',
  'Đang thực hiện': 'bg-blue-50 text-blue-600',
  'Chờ duyệt':      'bg-amber-50 text-amber-600',
  'Đã duyệt':       'bg-purple-50 text-purple-600',
};

/* ─── Component ─────────────────────────────────────────────── */
export default function CongTac() {
  const [search, setSearch]     = useState('');
  const [phongBan, setPhongBan] = useState('Tất cả phòng ban');

  const filtered = mockCongTac.filter((v) =>
    (phongBan === 'Tất cả phòng ban' || v.phong_ban === phongBan) &&
    (v.nhan_vien.toLowerCase().includes(search.toLowerCase()) ||
     v.dia_diem.toLowerCase().includes(search.toLowerCase()) ||
     v.muc_dich.toLowerCase().includes(search.toLowerCase()))
  );

  const tongChiPhi = filtered.reduce((s, v) => s + v.chi_phi, 0);

  return (
    <div className="flex-1 flex flex-col overflow-hidden gap-3">

      {/* ── Header bar ── */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <div className="flex items-center gap-2 mr-auto">
          <IconCalendarEvent size={18} className="text-[#406c89] shrink-0" />
          <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
            Quản lý Công tác — Lịch đi công tác nhân viên
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-xs font-semibold text-slate-500 px-3 py-1.5 bg-slate-100 rounded-lg">
            Tổng chi phí: <span className="text-[#406c89]">{tongChiPhi.toLocaleString()}đ</span>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconDownload size={13} />
            Xuất Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold">
            <IconPlus size={13} />
            Tạo lịch công tác
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
            placeholder="Tìm theo tên nhân viên, địa điểm, mục đích..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>
        <div className="relative shrink-0">
          <select
            value={phongBan}
            onChange={(e) => setPhongBan(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer"
          >
            {PHONG_BAN.map((n) => <option key={n}>{n}</option>)}
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
                {['Mã CT', 'Nhân viên', 'Phòng ban', 'Địa điểm', 'Mục đích', 'Từ ngày', 'Đến ngày', 'Số ngày', 'Chi phí', 'Trạng thái'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={v.ma} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                  <td className="px-4 py-2.5 font-mono text-slate-500">{v.ma}</td>
                  <td className="px-4 py-2.5 font-semibold text-slate-700 whitespace-nowrap">{v.nhan_vien}</td>
                  <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{v.phong_ban}</td>
                  <td className="px-4 py-2.5">
                    <span className="flex items-center gap-1 text-slate-600 whitespace-nowrap">
                      <IconMapPin size={11} className="text-slate-400" />
                      {v.dia_diem}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-slate-600 max-w-[200px] truncate">{v.muc_dich}</td>
                  <td className="px-4 py-2.5 text-slate-400 whitespace-nowrap">{v.tu_ngay}</td>
                  <td className="px-4 py-2.5 text-slate-400 whitespace-nowrap">{v.den_ngay}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-700 text-center">{v.so_ngay}</td>
                  <td className="px-4 py-2.5 font-bold text-slate-700 text-right whitespace-nowrap">{v.chi_phi.toLocaleString()}đ</td>
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
