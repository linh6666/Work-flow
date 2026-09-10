"use client";

import React, { useState } from 'react';
import {
  IconPlus,
  IconTrash,
  IconChevronDown,
} from '@tabler/icons-react';
import ModalKhoiTao from './modals/ModalKhoiTao';

export interface KeHoachBaoCaoItem {
  ma: string;
  ten: string;
  loai: string;
  ngay: string;
  trang_thai: string;
  ky_bao_cao?: string;
  ghi_chu?: string;
}

const mockKeHoach: KeHoachBaoCaoItem[] = [
  { ma: 'KH-2406-01', ten: 'Kế hoạch mua NVL Q3/2026',     loai: 'Kế hoạch mua',  ngay: '2026-07-01', trang_thai: 'Đang thực hiện' },
  { ma: 'KH-2406-02', ten: 'Báo cáo tồn kho tháng 7',      loai: 'Báo cáo',        ngay: '2026-07-31', trang_thai: 'Hoàn thành'     },
  { ma: 'KH-2406-03', ten: 'Kế hoạch nhập máy móc Q4',     loai: 'Kế hoạch mua',  ngay: '2026-08-10', trang_thai: 'Chờ duyệt'      },
  { ma: 'KH-2406-04', ten: 'Báo cáo xuất kho tháng 8',     loai: 'Báo cáo',        ngay: '2026-08-31', trang_thai: 'Chưa thực hiện' },
  { ma: 'KH-2406-05', ten: 'Kế hoạch kiểm kê cuối năm',    loai: 'Kiểm kê',        ngay: '2026-12-15', trang_thai: 'Chưa thực hiện' },
];

const TYPE_COLOR: Record<string, string> = {
  'Kế hoạch mua': 'border-emerald-300 bg-emerald-50 text-emerald-600',
  'Báo cáo': 'border-indigo-300 bg-indigo-50 text-indigo-600',
  'Kiểm kê': 'border-fuchsia-300 bg-fuchsia-50 text-fuchsia-600',
};

const STATUS_COLOR: Record<string, string> = {
  'Đang thực hiện': 'border-amber-300 bg-amber-50 text-amber-700',
  'Hoàn thành': 'border-emerald-300 bg-emerald-50 text-emerald-700',
  'Chờ duyệt': 'border-orange-300 bg-orange-50 text-orange-600',
  'Chưa thực hiện': 'border-slate-300 bg-slate-50 text-slate-600',
  'Bản nháp': 'border-slate-300 bg-slate-50 text-slate-600',
};

export default function KeHoachBaoCaoTab() {
  const [reports, setReports] = useState(mockKeHoach);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filtered = reports.filter((item) =>
    (selectedType === 'all' || item.loai === selectedType) &&
    (selectedStatus === 'all' || item.trang_thai === selectedStatus)
  );

  const handleCreate = (item: KeHoachBaoCaoItem) => {
    setReports((current) => [item, ...current]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="flex-1 overflow-auto bg-slate-50/60 px-5 py-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Kế hoạch &amp; Báo cáo</h1>
            <p className="mt-1 text-sm text-slate-500">NV Kho lập báo cáo → Quản lý KD duyệt → Phó GĐ KD-HC duyệt</p>
          </div>
          <button type="button" onClick={() => setIsCreateModalOpen(true)} className="flex shrink-0 items-center gap-2 rounded-lg bg-[#406c89] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#355a75]">
            <IconPlus size={16} /> Khởi tạo báo cáo
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="relative">
            <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)} className="w-44 appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-xs text-slate-600 shadow-sm focus:border-[#406c89] focus:outline-none">
              <option value="all">Tất cả loại báo cáo</option>
              {[...new Set(reports.map((item) => item.loai))].map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
            <IconChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </label>
          <label className="relative">
            <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)} className="w-48 appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-xs text-slate-600 shadow-sm focus:border-[#406c89] focus:outline-none">
              <option value="all">Tất cả trạng thái</option>
              {[...new Set(reports.map((item) => item.trang_thai))].map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
            <IconChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {filtered.map((item) => (
            <article key={item.ma} className={`min-h-[126px] rounded-xl border border-slate-200 border-l-4 bg-white px-3.5 py-3 shadow-sm ${item.loai === 'Kế hoạch mua' ? 'border-l-emerald-500' : item.loai === 'Kiểm kê' ? 'border-l-fuchsia-600' : 'border-l-indigo-500'}`}>
              <div className="flex items-start justify-between gap-3">
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${TYPE_COLOR[item.loai] || 'border-slate-300 bg-slate-50 text-slate-600'}`}>{item.loai}</span>
                <button type="button" title="Xóa" className="rounded p-1 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"><IconTrash size={15} /></button>
              </div>
              <h2 className="mt-2 text-sm font-bold text-slate-900">{item.ten}</h2>
              <p className="mt-1 text-xs text-slate-500">{item.ma}</p>
              <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
                <span>{item.ngay}</span>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${STATUS_COLOR[item.trang_thai] || 'border-slate-300 bg-slate-50 text-slate-600'}`}>{item.trang_thai}</span>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center text-sm text-slate-500">Không có kế hoạch hoặc báo cáo phù hợp.</div>}
      </div>
      <ModalKhoiTao key={isCreateModalOpen ? 'open' : 'closed'} isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSave={handleCreate} />
    </div>
  );
}
