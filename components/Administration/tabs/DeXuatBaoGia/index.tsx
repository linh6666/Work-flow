"use client";

import React, { useState } from 'react';
import {
  IconPlus,
  IconSearch,
  IconArrowRight,
  IconPencil,
  IconTrash,
  IconChevronDown,
  IconArrowsSort,
  IconCheck,
} from '@tabler/icons-react';
import CreateProposalModal from './modal/CreateProposalModal';
import EditProposalModal from './edit/EditProposalModal';
import DeleteConfirmModal from './delete/DeleteConfirmModal';

// ─── Types ────────────────────────────────────────────────────────────
export type TrangThai =
  | 'cho-tp'
  | 'tp-duyet'
  | 'tp-tu-choi'
  | 'cho-pgd'
  | 'pgd-duyet'
  | 'pgd-tu-choi';

export interface DeXuat {
  id: string;
  soDX: string;
  donViLienHe: string;
  nguoiLienHe: string;
  nguoiLap: string;
  ngay: string;
  trangThai: TrangThai;
  buocHoanTat: number;
  tongBuoc: number;
  khachHangCrm?: string;
  noiDungYeuCau?: string;
  tenDuAn?: string;
  tyLeMoHinh?: string;
  kichThuocDuKien?: string;
  diaDiemLapDat?: string;
  loaiChan?: string;
  kinh?: string;
  anhSang?: string[];
  congNghe?: string[];
  tinhTrangHoSo?: string;
  thoiGianBaoGia?: string;
  thoiGianMoHinh?: string;
  duongDanHoSo?: string;
  ghiChu?: string;
}

// ─── Mock data ────────────────────────────────────────────────────────
const MOCK: DeXuat[] = [
  {
    id: '2',
    soDX: 'ĐXBG-002-2026',
    donViLienHe: 'Công ty CP Flamingo',
    nguoiLienHe: 'B',
    nguoiLap: 'Thao Phung',
    ngay: '2026-06-27',
    trangThai: 'pgd-duyet',
    buocHoanTat: 2,
    tongBuoc: 2,
  },
  {
    id: '1',
    soDX: 'ĐXBG-001-2026',
    donViLienHe: 'CÔNG TY CỔ PHẦN ĐẦU TƯ KINH DOANH BĐS NHSLAND',
    nguoiLienHe: 'Phạm An',
    nguoiLap: 'Thao Phung',
    ngay: '2026-06-27',
    trangThai: 'pgd-duyet',
    buocHoanTat: 0,
    tongBuoc: 2,
  },
];

// ─── Status config ────────────────────────────────────────────────────
const STATUS_CONFIG: Record<TrangThai, { label: string; color: string }> = {
  'cho-tp':      { label: 'Chờ TP duyệt',       color: 'text-amber-600 bg-amber-50 border-amber-200' },
  'tp-duyet':    { label: 'TP đã duyệt',          color: 'text-blue-600 bg-blue-50 border-blue-200' },
  'tp-tu-choi':  { label: 'TP từ chối',           color: 'text-red-600 bg-red-50 border-red-200' },
  'cho-pgd':     { label: 'Chờ PGĐ duyệt',       color: 'text-violet-600 bg-violet-50 border-violet-200' },
  'pgd-duyet':   { label: 'PGĐ KD-HC đã duyệt',  color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  'pgd-tu-choi': { label: 'PGĐ từ chối',          color: 'text-red-600 bg-red-50 border-red-200' },
};

const FILTER_TABS: { key: TrangThai | 'all'; label: string }[] = [
  { key: 'all',        label: 'Tất cả' },
  { key: 'cho-tp',     label: 'Chờ TP duyệt' },
  { key: 'tp-duyet',   label: 'TP đã duyệt' },
  { key: 'tp-tu-choi', label: 'TP từ chối' },
  { key: 'cho-pgd',    label: 'Chờ PGĐ duyệt' },
  { key: 'pgd-duyet',  label: 'PGĐ đã duyệt' },
  { key: 'pgd-tu-choi',label: 'PGĐ từ chối' },
];

// ─── Component ────────────────────────────────────────────────────────
export default function DeXuatBaoGia() {
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState<TrangThai | 'all'>('all');
  const [data, setData]       = useState<DeXuat[]>(MOCK);
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProposalForEdit, setSelectedProposalForEdit] = useState<DeXuat | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProposalForDelete, setSelectedProposalForDelete] = useState<DeXuat | null>(null);

  const handleCreateProposal = (newDX: Omit<DeXuat, 'id' | 'buocHoanTat' | 'tongBuoc'>) => {
    const newId = (data.length + 1).toString();
    const fullNewDX: DeXuat = {
      ...newDX,
      id: newId,
      buocHoanTat: newDX.trangThai === 'pgd-duyet' ? 2 : (newDX.trangThai === 'tp-duyet' ? 1 : 0),
      tongBuoc: 2,
    };
    setData([fullNewDX, ...data]);
  };

  const handleEditProposal = (updatedDX: DeXuat) => {
    setData(prev => prev.map(item => item.id === updatedDX.id ? updatedDX : item));
  };

  const handleDeleteConfirm = () => {
    if (selectedProposalForDelete) {
      setData(prev => prev.filter(item => item.id !== selectedProposalForDelete.id));
      setSelectedProposalForDelete(null);
    }
  };

  const filtered = data.filter((d) => {
    const matchSearch =
      d.soDX.toLowerCase().includes(search.toLowerCase()) ||
      d.donViLienHe.toLowerCase().includes(search.toLowerCase()) ||
      d.nguoiLienHe.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || d.trangThai === filter;
    return matchSearch && matchFilter;
  });

  // Stats
  const total     = data.length;
  const choTP     = data.filter((d) => d.trangThai === 'cho-tp').length;
  const choPGD    = data.filter((d) => d.trangThai === 'cho-pgd').length;
  const daHoanTat = data.filter((d) => d.trangThai === 'pgd-duyet').length;

  return (
    <div className="flex flex-col h-full bg-white">

      {/* ── Header ── */}
      <div className="px-6 pt-5 pb-4 flex items-start justify-between border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Đề xuất Báo giá</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            NV KD lập đề xuất → Quản lý KD duyệt → Phó GĐ KD-Hành chính duyệt
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-semibold shadow-sm transition-all cursor-pointer active:scale-95"
          style={{ backgroundColor: '#406c89' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#345a74')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#406c89')}
        >
          <IconPlus size={16} />
          Lập đề xuất
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

        {/* ── Workflow steps ── */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/60 flex-wrap">
          {[
            { label: 'NV Kinh doanh', sub: 'lập đề xuất', active: false },
            { label: 'Quản lý Kinh doanh', sub: '', active: false },
            { label: 'Phó GĐ KD-Hành chính', sub: '', active: false },
            { label: 'Lập Báo giá', sub: `(${daHoanTat} đề xuất)`, active: true },
          ].map((step, i, arr) => (
            <React.Fragment key={i}>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                step.active
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}>
                <span>{step.label}</span>
                {step.sub && <span className={step.active ? 'opacity-80' : 'text-slate-400'}>{step.sub}</span>}
              </div>
              {i < arr.length - 1 && <IconArrowRight size={14} className="text-slate-300 shrink-0" />}
            </React.Fragment>
          ))}
        </div>

        {/* ── Stats cards ── */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Tổng đề xuất',      value: total,     color: 'text-indigo-600' },
            { label: 'Chờ TP duyệt',      value: choTP,     color: 'text-amber-500'  },
            { label: 'Chờ PGĐ duyệt',     value: choPGD,    color: 'text-violet-600' },
            { label: 'Đã duyệt hoàn tất', value: daHoanTat, color: 'text-emerald-600' },
          ].map((card) => (
            <div key={card.label} className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-xs">
              <p className="text-xs text-slate-500 mb-1">{card.label}</p>
              <p className={`text-2xl font-extrabold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* ── Search + Filter tabs ── */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[220px]">
            <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo công ty, người liên hệ, số đề xuất..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>
          {/* Tabs */}
          <div className="flex items-center gap-1 flex-wrap">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key as TrangThai | 'all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  filter === tab.key
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="rounded-xl border border-slate-100 overflow-hidden shadow-xs">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {[
                  { label: 'Số ĐX', sort: true },
                  { label: 'Đơn vị liên hệ', sort: true },
                  { label: 'NGƯỜI LIÊN HỆ', sort: false },
                  { label: 'NGƯỜI LẬP', sort: false },
                  { label: 'NGÀY', sort: false },
                  { label: 'TRẠNG THÁI', sort: false },
                ].map((col) => (
                  <th
                    key={col.label}
                    className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap"
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {col.sort && <IconArrowsSort size={12} className="text-slate-300" />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
           <tbody className="divide-y divide-slate-200">

              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-xs text-slate-400">
                    Không tìm thấy đề xuất nào.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => {
                  const st = STATUS_CONFIG[row.trangThai];
                  return (
                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Số ĐX */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-600 font-semibold text-xs">{row.soDX}</span>
                          <button 
                            type="button" 
                            onClick={() => {
                              setSelectedProposalForEdit(row);
                              setIsEditModalOpen(true);
                            }}
                            className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                          >
                            <IconPencil size={18} />
                          </button>
                          <button 
                            type="button" 
                            onClick={() => {
                              setSelectedProposalForDelete(row);
                              setIsDeleteModalOpen(true);
                            }}
                            className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <IconTrash size={18} />
                          </button>
                        </div>
                      </td>
                      {/* Đơn vị */}
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-slate-800">{row.donViLienHe}</span>
                      </td>
                      {/* Người LH */}
                      <td className="px-4 py-3 text-sm text-slate-600">{row.nguoiLienHe}</td>
                      {/* Người lập */}
                      <td className="px-4 py-3 text-sm text-slate-600">{row.nguoiLap}</td>
                      {/* Ngày */}
                      <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">{row.ngay}</td>
                      {/* Trạng thái */}
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1.5 items-start">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-bold border rounded-full px-2 py-0.5 ${st.color}`}>
                            <IconCheck size={10} strokeWidth={3} />
                            {st.label}
                          </span>
                          {row.trangThai === 'pgd-duyet' && (
                            <span className="text-[11px] text-slate-500">
                              {row.buocHoanTat === row.tongBuoc
                                ? <span className="text-emerald-600 font-medium">✓ Hoàn tất {row.tongBuoc} bước</span>
                                : <span>{row.buocHoanTat}/{row.tongBuoc} bước</span>
                              }
                            </span>
                          )}
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                          >
                            Triển khai
                            <IconChevronDown size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProposal}
      />

      <EditProposalModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProposalForEdit(null);
        }}
        onSubmit={handleEditProposal}
        proposal={selectedProposalForEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProposalForDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        proposalCode={selectedProposalForDelete?.soDX || ''}
      />
    </div>
  );
}
