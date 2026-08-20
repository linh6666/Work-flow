"use client";

import React, { useState } from 'react';
import {
  IconPhone,
  IconSearch,
  IconDownload,
  IconPlus,
  IconChevronDown,
  IconMapPin,
  IconMail,
} from '@tabler/icons-react';

/* ─── Mock data ─────────────────────────────────────────────── */
const KHU_VUC = ['Tất cả khu vực', 'Miền Bắc', 'Miền Trung', 'Miền Nam', 'Quốc tế'];

const mockLienHe = [
  { ma: 'LH-001', ten_nha_xe: 'Công ty Vận tải Viettel Post',  khu_vuc: 'Miền Bắc', nguoi_lien_he: 'Nguyễn Văn Minh', sdt: '0988.123.456', email: 'minh.nv@viettelpost.vn', dia_chi: 'Hà Nội', trang_thai: 'Đối tác chiến lược' },
  { ma: 'LH-002', ten_nha_xe: 'Chuyển phát nhanh Giao Hàng Nhanh', khu_vuc: 'Miền Nam', nguoi_lien_he: 'Trần Thị Thu',   sdt: '0903.987.654', email: 'thu.tt@ghn.vn',        dia_chi: 'TP.HCM', trang_thai: 'Đang hợp tác' },
  { ma: 'LH-003', ten_nha_xe: 'Đội xe đường dài Bắc Nam Đạt Phát', khu_vuc: 'Miền Trung',nguoi_lien_he: 'Lê Hoàng Nam',  sdt: '0912.555.777', email: 'nam@datphatlogistics.com', dia_chi: 'Đà Nẵng', trang_thai: 'Đang hợp tác' },
  { ma: 'LH-004', ten_nha_xe: 'Dịch vụ Vận tải Container Hải Phòng', khu_vuc: 'Miền Bắc', nguoi_lien_he: 'Phạm Đức Anh', sdt: '0936.444.888', email: 'anh.pd@hpcontainer.vn', dia_chi: 'Hải Phòng', trang_thai: 'Dự phòng' },
];

const STATUS_STYLE: Record<string, string> = {
  'Đối tác chiến lược': 'bg-emerald-50 text-emerald-600',
  'Đang hợp tác':        'bg-blue-50 text-blue-600',
  'Dự phòng':            'bg-amber-50 text-amber-600',
};

/* ─── Component ─────────────────────────────────────────────── */
export default function LienHeVanChuyenTab() {
  const [search, setSearch] = useState('');
  const [khuVuc, setKhuVuc] = useState('Tất cả khu vực');

  const filtered = mockLienHe.filter((v) =>
    (khuVuc === 'Tất cả khu vực' || v.khu_vuc === khuVuc) &&
    (v.ten_nha_xe.toLowerCase().includes(search.toLowerCase()) ||
     v.nguoi_lien_he.toLowerCase().includes(search.toLowerCase()) ||
     v.sdt.includes(search))
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden gap-3">
      {/* ── Header bar ── */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <div className="flex items-center gap-2 mr-auto">
          <IconPhone size={18} className="text-[#406c89] shrink-0" />
          <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
            Danh bạ Liên hệ Vận chuyển — Đối tác &amp; Nhà xe
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors font-medium">
            <IconDownload size={13} />
            Xuất Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold">
            <IconPlus size={13} />
            Thêm liên hệ
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
            placeholder="Tìm theo tên đơn vị vận chuyển, đầu mối liên hệ, SĐT..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>
        <div className="relative shrink-0">
          <select
            value={khuVuc}
            onChange={(e) => setKhuVuc(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer"
          >
            {KHU_VUC.map((n) => <option key={n}>{n}</option>)}
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
                {['Mã LH', 'Tên đơn vị / Nhà xe', 'Khu vực', 'Người liên hệ', 'Số điện thoại', 'Email', 'Địa bàn', 'Trạng thái'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={v.ma} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                  <td className="px-4 py-2.5 font-mono text-slate-500">{v.ma}</td>
                  <td className="px-4 py-2.5 font-semibold text-slate-700">{v.ten_nha_xe}</td>
                  <td className="px-4 py-2.5 text-slate-500">{v.khu_vuc}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-700">{v.nguoi_lien_he}</td>
                  <td className="px-4 py-2.5 font-bold text-[#406c89]">{v.sdt}</td>
                  <td className="px-4 py-2.5 text-slate-500">
                    <span className="flex items-center gap-1 text-slate-500">
                      <IconMail size={11} className="text-slate-400" />
                      {v.email}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-slate-600">
                    <span className="flex items-center gap-1 text-slate-600">
                      <IconMapPin size={11} className="text-slate-400" />
                      {v.dia_chi}
                    </span>
                  </td>
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
