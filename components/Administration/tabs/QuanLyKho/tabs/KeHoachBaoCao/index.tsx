"use client";

import React, { useState } from 'react';
import {
  IconPlus,
  IconSearch,
  IconChartBar,
  IconCalendar,
  IconFileAnalytics,
} from '@tabler/icons-react';

const mockKeHoach = [
  { ma: 'KH-2406-01', ten: 'Kế hoạch mua NVL Q3/2026',     loai: 'Kế hoạch mua',  ngay: '2026-07-01', trang_thai: 'Đang thực hiện' },
  { ma: 'KH-2406-02', ten: 'Báo cáo tồn kho tháng 7',      loai: 'Báo cáo',        ngay: '2026-07-31', trang_thai: 'Hoàn thành'     },
  { ma: 'KH-2406-03', ten: 'Kế hoạch nhập máy móc Q4',     loai: 'Kế hoạch mua',  ngay: '2026-08-10', trang_thai: 'Chờ duyệt'      },
  { ma: 'KH-2406-04', ten: 'Báo cáo xuất kho tháng 8',     loai: 'Báo cáo',        ngay: '2026-08-31', trang_thai: 'Chưa thực hiện' },
  { ma: 'KH-2406-05', ten: 'Kế hoạch kiểm kê cuối năm',    loai: 'Kiểm kê',        ngay: '2026-12-15', trang_thai: 'Chưa thực hiện' },
];

const STATUS_COLOR: Record<string, string> = {
  'Đang thực hiện': 'bg-blue-50 text-blue-600',
  'Hoàn thành':     'bg-emerald-50 text-emerald-600',
  'Chờ duyệt':      'bg-amber-50 text-amber-600',
  'Chưa thực hiện': 'bg-slate-100 text-slate-500',
};

const months = ['T3', 'T4', 'T5', 'T6', 'T7', 'T8'];
const keHoachData = [3, 5, 4, 6, 5, 4];
const baoCaoData  = [2, 3, 3, 4, 4, 3];
const maxVal = 8;

export default function KeHoachBaoCaoTab() {
  const [search, setSearch] = useState('');

  const filtered = mockKeHoach.filter(
    (k) =>
      k.ma.toLowerCase().includes(search.toLowerCase()) ||
      k.ten.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col gap-4 overflow-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 shrink-0">
        {[
          { label: 'Tổng kế hoạch',    value: mockKeHoach.length,                                           color: 'text-sky-600',    bg: 'bg-sky-50',    icon: IconCalendar      },
          { label: 'Hoàn thành',        value: mockKeHoach.filter(k => k.trang_thai === 'Hoàn thành').length, color: 'text-emerald-600',bg: 'bg-emerald-50', icon: IconFileAnalytics },
          { label: 'Chờ duyệt / Đang', value: mockKeHoach.filter(k => k.trang_thai !== 'Hoàn thành' && k.trang_thai !== 'Chưa thực hiện').length, color: 'text-amber-600', bg: 'bg-amber-50', icon: IconChartBar },
        ].map((c) => (
          <div key={c.label} className={`${c.bg} rounded-xl p-4 flex flex-col gap-1 border border-white shadow-sm`}>
            <span className="text-[11px] font-medium text-slate-500">{c.label}</span>
            <span className={`text-2xl font-extrabold ${c.color}`}>{c.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        {/* Table */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 p-3 border-b border-slate-100">
            <div className="relative flex-1 max-w-sm">
              <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kế hoạch hoặc báo cáo..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
              />
            </div>
            <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-semibold">
              <IconPlus size={13} />
              Tạo kế hoạch
            </button>
          </div>
          <div className="overflow-auto flex-1">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  {['Mã', 'Tên kế hoạch / Báo cáo', 'Loại', 'Ngày', 'Trạng thái'].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500 whitespace-nowrap border-b border-slate-100">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((k, i) => (
                  <tr key={k.ma} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                    <td className="px-4 py-2.5 font-mono text-[#406c89] font-semibold">{k.ma}</td>
                    <td className="px-4 py-2.5 font-medium text-slate-700">{k.ten}</td>
                    <td className="px-4 py-2.5 text-slate-500">{k.loai}</td>
                    <td className="px-4 py-2.5 text-slate-500">{k.ngay}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_COLOR[k.trang_thai]}`}>
                        {k.trang_thai}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mini Chart */}
        <div className="w-full lg:w-64 bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col gap-3 shrink-0">
          <div>
            <h3 className="text-xs font-bold text-slate-700">KH & BC theo tháng</h3>
            <div className="flex items-center gap-3 mt-1 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#406c89] inline-block"/>Kế hoạch</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-violet-400 inline-block"/>Báo cáo</span>
            </div>
          </div>
          <div className="flex-1 flex items-end gap-1.5">
            {months.map((m, i) => (
              <div key={m} className="flex flex-col items-center gap-1 flex-1">
                <div className="flex items-end gap-0.5 w-full" style={{ height: 80 }}>
                  <div className="flex-1 bg-[#406c89] rounded-t-sm" style={{ height: `${(keHoachData[i] / maxVal) * 100}%` }} />
                  <div className="flex-1 bg-violet-400 rounded-t-sm"  style={{ height: `${(baoCaoData[i]  / maxVal) * 100}%` }} />
                </div>
                <span className="text-[9px] text-slate-400">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
