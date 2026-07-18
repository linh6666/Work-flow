"use client";

import React, { useState } from 'react';
import {
  IconClipboardList,
  IconDownload,
  IconSettings,
  IconPlus,
  IconArrowRight,
  IconSearch,
  IconPencil,
  IconTrash,
  IconChevronRight,
} from '@tabler/icons-react';
import CreateNhanSuModal from './modal/CreateNhanSuModal';
import NhanSuConfig from './config/NhanSuConfig';
import EditNhanSuModal from './editNhanSuModal/EditNhanSuModal';
import DeleteNhanSuModal from './deleteNhanSuModal/DeleteNhanSuModal';
import XemNhanSu from './xemNhanSu/XemNhanSu';

// ─── Types ────────────────────────────────────────────────────────────
type TrangThai = 'dang-dien' | 'da-tong-hop';

interface NhanSu {
  id: string;
  duAn: string;
  maKH: string;
  khachHang: string;
  nvLap: string;
  ngayLap: string;
  trangThai: TrangThai;
  lienKetDeXuat?: string;
  tyLeMoHinh?: string;
  kichThuocDuKien?: string;
  diaDiemLapDat?: string;
  duongDanHoSo?: string;
  loaiChan?: string;
  kinh?: string;
  anhSang?: string[];
  congNghe?: string[];
  ghiChu?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────
const MOCK: NhanSu[] = [
  {
    id: '1',
    duAn: 'Công ty CP Flamingo',
    maKH: 'DKNS-004-2026',
    khachHang: 'Công ty CP Flamingo',
    nvLap: 'Thao Phung',
    ngayLap: '2026-06-27',
    trangThai: 'dang-dien',
  },
  {
    id: '2',
    duAn: 'Tập đoàn T&T',
    maKH: 'KH-003-2026',
    khachHang: 'Tập đoàn T&T',
    nvLap: 'Thao Phung',
    ngayLap: '2026-06-27',
    trangThai: 'dang-dien',
  },
  {
    id: '3',
    duAn: 'CÔNG TY TNHH BẤT ĐỘNG SẢN HỒ AN',
    maKH: 'KH-NS-2026-003',
    khachHang: 'CÔNG TY TNHH BẤT ĐỘNG SẢN HỒ AN',
    nvLap: 'Thao Phung',
    ngayLap: '2026-06-26',
    trangThai: 'da-tong-hop',
  },
];

export default function NhanSuDuAn() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<NhanSu[]>(MOCK);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfigView, setIsConfigView] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<NhanSu | null>(null);
  const [isDeleteModalOpen, setIsDeletePlanModalOpen] = useState(false);
  const [deletingPlan, setDeletingPlan] = useState<NhanSu | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingPlan, setViewingPlan] = useState<NhanSu | null>(null);

  const handleCreateNhanSu = (newNhanSu: Omit<NhanSu, 'id'>) => {
    const newId = (data.length + 1).toString();
    setData([{ ...newNhanSu, id: newId }, ...data]);
  };

  const handleSaveEdit = (updatedPlan: NhanSu) => {
    setData(prev => prev.map(item => item.id === updatedPlan.id ? updatedPlan : item));
    alert(`Đã cập nhật kế hoạch dự án: ${updatedPlan.duAn}`);
  };

  const handleConfirmDelete = (planId: string) => {
    setData(prev => prev.filter(item => item.id !== planId));
    alert('Đã xóa thành công kế hoạch nhân sự!');
  };

  // Filter logic
  const filtered = data.filter(item => 
    item.duAn.toLowerCase().includes(search.toLowerCase()) ||
    item.khachHang.toLowerCase().includes(search.toLowerCase()) ||
    item.maKH.toLowerCase().includes(search.toLowerCase())
  );

  // Stats calculation
  const total = data.length;
  const dangDien = data.filter(item => item.trangThai === 'dang-dien').length;
  const hoanThanh = data.filter(item => item.trangThai === 'da-tong-hop').length;

  if (isConfigView) {
    return <NhanSuConfig onClose={() => setIsConfigView(false)} />;
  }

  if (isViewModalOpen && viewingPlan) {
    return (
      <XemNhanSu 
        plan={viewingPlan} 
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingPlan(null);
        }} 
        onPlanUpdate={handleSaveEdit}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* ── Header ── */}
      <div className="px-6 pt-5 pb-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 gap-4 shrink-0">
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 text-[#3341c2] mt-0.5">
            <IconClipboardList size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Nhân sự Dự án</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              NV Kinh doanh tạo mẫu → Trưởng phòng điền → Tổng hợp chi phí
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            type="button" 
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer shadow-xs transition-all active:scale-95"
            onClick={() => alert("Đang xuất file Excel...")}
          >
            <IconDownload size={14} />
            Xuất Excel
          </button>
          
          <button 
            type="button" 
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer shadow-xs transition-all active:scale-95"
            onClick={() => setIsConfigView(true)}
          >
            <IconSettings size={14} />
            Cấu hình mẫu nhân sự
          </button>

          <button 
            type="button" 
            style={{ backgroundColor: '#406c89' }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-bold shadow-sm cursor-pointer transition-all active:scale-95"
            onClick={() => setIsModalOpen(true)}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#222a68')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#406c89')}
          >
            <IconPlus size={14} />
            Tạo mẫu Bảng dự kiến Nhân sự
          </button>
        </div>
      </div>

      {/* ── Scrollable Body ── */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
        
        {/* Workflow steps bar */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/60 flex-wrap text-[13px]">
          {/* Step 1 */}
          <div className="flex items-center gap-1 text-slate-400 font-medium">
            <span className="font-bold">NV Kinh doanh</span>
            <span>tạo mẫu nhân sự</span>
          </div>

          <IconArrowRight size={14} className="text-slate-300 shrink-0" />

          {/* Step 2 (Active) */}
          <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-3.5 py-1 font-semibold">
            <span>Trưởng phòng ban</span>
            <span className="text-slate-500 font-medium">điền thông tin NV & ngày công</span>
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[11px] font-bold">2</span>
          </div>

          <IconArrowRight size={14} className="text-slate-300 shrink-0" />

          {/* Step 3 */}
          <div className="flex items-center gap-1 text-slate-400 font-medium">
            <span className="font-bold">Tổng hợp chi phí</span>
            <span className="text-slate-400">(1 hoàn thành)</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 mb-1">Tổng kế hoạch</p>
            <p className="text-2xl font-extrabold text-indigo-700">{total}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 mb-1">Đang điền</p>
            <p className="text-2xl font-extrabold text-amber-600">{dangDien}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 mb-1">Hoàn thành</p>
            <p className="text-2xl font-extrabold text-emerald-600">{hoanThanh}</p>
          </div>
        </div>

        {/* Search row */}
        <div className="relative">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên dự án, khách hàng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-slate-100 overflow-hidden shadow-xs">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Số KH / Dự án</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Khách hàng</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">NV Lập</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Ngày lập</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Trạng thái</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-xs text-slate-400 bg-white">
                    Không tìm thấy bản dự kiến nhân sự nào.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/40 transition-colors bg-white">
                    {/* Số KH / Dự án */}
                    <td className="px-5 py-3.5">
                      <div className="flex flex-col">
                        <span className="font-bold text-indigo-950 text-sm">{item.duAn}</span>
                        <span className="text-xs text-slate-400 mt-0.5">{item.maKH}</span>
                      </div>
                    </td>
                    
                    {/* Khách hàng */}
                    <td className="px-5 py-3.5 text-sm text-slate-655 font-medium">
                      {item.khachHang}
                    </td>

                    {/* NV Lập */}
                    <td className="px-5 py-3.5 text-sm text-slate-500">
                      {item.nvLap}
                    </td>

                    {/* Ngày lập */}
                    <td className="px-5 py-3.5 text-sm text-slate-500">
                      {item.ngayLap}
                    </td>

                    {/* Trạng thái */}
                    <td className="px-5 py-3.5">
                      {item.trangThai === 'dang-dien' ? (
                        <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full text-amber-700 bg-amber-50 border border-amber-200">
                          Đang điền
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-200">
                          Đã tổng hợp
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-3 justify-end">
                        <button 
                          type="button" 
                          className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                          onClick={() => {
                            setEditingPlan(item);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <IconPencil size={18} />
                        </button>
                        <button 
                          type="button" 
                          className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          onClick={() => {
                            setDeletingPlan(item);
                            setIsDeletePlanModalOpen(true);
                          }}
                        >
                          <IconTrash size={18} />
                        </button>
                        <button 
                          type="button" 
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer shadow-2xs transition-all active:scale-95"
                          onClick={() => {
                            setViewingPlan(item);
                            setIsViewModalOpen(true);
                          }}
                        >
                          Xem
                          <IconChevronRight size={12} className="text-slate-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      <CreateNhanSuModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateNhanSu}
      />

      <EditNhanSuModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingPlan(null);
        }}
        plan={editingPlan}
        onSave={handleSaveEdit}
      />

      <DeleteNhanSuModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeletePlanModalOpen(false);
          setDeletingPlan(null);
        }}
        plan={deletingPlan}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
}
