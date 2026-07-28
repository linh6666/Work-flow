"use client";

import React, { useState } from 'react';
import {
  IconPlus,
  IconSearch,
  IconTrendingUp,
  IconTrendingDown,
  IconWallet,
  IconClock,
  IconTrash,
  IconChevronDown,
  IconFilter,
  IconArrowUpRight,
  IconArrowDownRight,
  IconFileText,
  IconX,
  IconCheck,
} from '@tabler/icons-react';

// ─── Types ───────────────────────────────────────────────────────────────────
type LoaiGiaoDich = 'Thu' | 'Chi';
type DanhMuc =
  | 'Thu hợp đồng'
  | 'Thu báo giá'
  | 'Thu khác'
  | 'Chi vật liệu'
  | 'Chi nhân công'
  | 'Chi vận chuyển'
  | 'Chi lắp đặt'
  | 'Chi khác';

type TrangThaiThanhToan = 'Đã thanh toán' | 'Chờ thanh toán' | 'Quá hạn';

export interface GiaoDichItem {
  id: string;
  loai: LoaiGiaoDich;
  danhMuc: DanhMuc;
  tenGiaoDich: string;
  soTien: number; // VNĐ
  ngay: string; // YYYY-MM-DD
  duAn?: string;
  trangThai: TrangThaiThanhToan;
  ghiChu?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const DEFAULT_DATA: GiaoDichItem[] = [
  {
    id: 'gd-1',
    loai: 'Thu',
    danhMuc: 'Thu hợp đồng',
    tenGiaoDich: 'Đợt 1 - VSIP LẠNG SƠN',
    soTien: 320_000_000,
    ngay: '2026-07-10',
    duAn: 'VSIP LẠNG SƠN',
    trangThai: 'Đã thanh toán',
  },
  {
    id: 'gd-2',
    loai: 'Thu',
    danhMuc: 'Thu hợp đồng',
    tenGiaoDich: 'Đợt 1 - 22 LIỄU GIAI',
    soTien: 450_000_000,
    ngay: '2026-06-20',
    duAn: '22 LIỄU GIAI',
    trangThai: 'Đã thanh toán',
  },
  {
    id: 'gd-3',
    loai: 'Thu',
    danhMuc: 'Thu hợp đồng',
    tenGiaoDich: 'Đợt 2 - THE HERITAGE TÂY NINH',
    soTien: 580_000_000,
    ngay: '2026-07-15',
    duAn: 'THE HERITAGE TÂY NINH',
    trangThai: 'Chờ thanh toán',
  },
  {
    id: 'gd-4',
    loai: 'Thu',
    danhMuc: 'Thu hợp đồng',
    tenGiaoDich: 'Đợt 1 - FLAMINGO ĐÔNG ANH',
    soTien: 210_000_000,
    ngay: '2026-07-01',
    duAn: 'FLAMINGO ĐÔNG ANH',
    trangThai: 'Quá hạn',
  },
  {
    id: 'gd-5',
    loai: 'Thu',
    danhMuc: 'Thu khác',
    tenGiaoDich: 'Phí tư vấn thiết kế',
    soTien: 15_000_000,
    ngay: '2026-07-18',
    trangThai: 'Đã thanh toán',
    ghiChu: 'Khách lẻ',
  },
  {
    id: 'gd-6',
    loai: 'Chi',
    danhMuc: 'Chi vật liệu',
    tenGiaoDich: 'Mua vật liệu mô hình tháng 7',
    soTien: 85_000_000,
    ngay: '2026-07-05',
    trangThai: 'Đã thanh toán',
    ghiChu: 'NCC Minh Đức',
  },
  {
    id: 'gd-7',
    loai: 'Chi',
    danhMuc: 'Chi nhân công',
    tenGiaoDich: 'Lương tháng 7 - Phòng Mộc Sơn',
    soTien: 120_000_000,
    ngay: '2026-07-31',
    trangThai: 'Chờ thanh toán',
  },
  {
    id: 'gd-8',
    loai: 'Chi',
    danhMuc: 'Chi vận chuyển',
    tenGiaoDich: 'Vận chuyển mô hình VSIP Lạng Sơn',
    soTien: 18_500_000,
    ngay: '2026-07-12',
    duAn: 'VSIP LẠNG SƠN',
    trangThai: 'Đã thanh toán',
  },
  {
    id: 'gd-9',
    loai: 'Chi',
    danhMuc: 'Chi lắp đặt',
    tenGiaoDich: 'Chi phí lắp đặt - 22 LIỄU GIAI',
    soTien: 35_000_000,
    ngay: '2026-07-20',
    duAn: '22 LIỄU GIAI',
    trangThai: 'Đã thanh toán',
  },
  {
    id: 'gd-10',
    loai: 'Chi',
    danhMuc: 'Chi khác',
    tenGiaoDich: 'Chi phí văn phòng tháng 7',
    soTien: 12_000_000,
    ngay: '2026-07-03',
    trangThai: 'Đã thanh toán',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatCurrency = (amount: number) => {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(2)} Tỷ`;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
  return amount.toLocaleString('vi-VN') + 'đ';
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  return dateStr;
};

const DANH_MUC_OPTIONS: DanhMuc[] = [
  'Thu hợp đồng', 'Thu báo giá', 'Thu khác',
  'Chi vật liệu', 'Chi nhân công', 'Chi vận chuyển', 'Chi lắp đặt', 'Chi khác',
];

// ─── Modal Thêm Giao Dịch ─────────────────────────────────────────────────────
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<GiaoDichItem, 'id'>) => void;
}

function ThemGiaoDichModal({ isOpen, onClose, onSubmit }: ModalProps) {
  const [loai, setLoai] = useState<LoaiGiaoDich>('Thu');
  const [danhMuc, setDanhMuc] = useState<DanhMuc>('Thu hợp đồng');
  const [tenGiaoDich, setTenGiaoDich] = useState('');
  const [soTien, setSoTien] = useState('');
  const [ngay, setNgay] = useState(new Date().toISOString().split('T')[0]);
  const [duAn, setDuAn] = useState('');
  const [trangThai, setTrangThai] = useState<TrangThaiThanhToan>('Đã thanh toán');
  const [ghiChu, setGhiChu] = useState('');

  if (!isOpen) return null;

  const thuDanhMuc: DanhMuc[] = ['Thu hợp đồng', 'Thu báo giá', 'Thu khác'];
  const chiDanhMuc: DanhMuc[] = ['Chi vật liệu', 'Chi nhân công', 'Chi vận chuyển', 'Chi lắp đặt', 'Chi khác'];

  const handleLoaiChange = (val: LoaiGiaoDich) => {
    setLoai(val);
    setDanhMuc(val === 'Thu' ? 'Thu hợp đồng' : 'Chi vật liệu');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenGiaoDich || !soTien) return;
    onSubmit({
      loai, danhMuc, tenGiaoDich,
      soTien: parseFloat(soTien.replace(/,/g, '')),
      ngay, trangThai,
      duAn: duAn || undefined,
      ghiChu: ghiChu || undefined,
    });
    // Reset
    setTenGiaoDich(''); setSoTien(''); setDuAn(''); setGhiChu('');
    setNgay(new Date().toISOString().split('T')[0]);
    setLoai('Thu'); setDanhMuc('Thu hợp đồng'); setTrangThai('Đã thanh toán');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200/80">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-extrabold text-slate-800">Thêm Giao dịch</h3>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
            <IconX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Loại giao dịch */}
          <div className="flex gap-2">
            {(['Thu', 'Chi'] as LoaiGiaoDich[]).map(l => (
              <button
                key={l} type="button"
                onClick={() => handleLoaiChange(l)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all cursor-pointer ${
                  loai === l
                    ? l === 'Thu'
                      ? 'bg-emerald-500 text-white border-transparent'
                      : 'bg-rose-500 text-white border-transparent'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {l === 'Thu' ? '↑ Thu' : '↓ Chi'}
              </button>
            ))}
          </div>

          {/* Danh mục */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Danh mục</label>
            <select
              value={danhMuc}
              onChange={e => setDanhMuc(e.target.value as DanhMuc)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] bg-white cursor-pointer"
            >
              {(loai === 'Thu' ? thuDanhMuc : chiDanhMuc).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Tên giao dịch */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Tên giao dịch <span className="text-rose-400">*</span></label>
            <input
              required
              value={tenGiaoDich}
              onChange={e => setTenGiaoDich(e.target.value)}
              placeholder="VD: Đợt 1 - VSIP Lạng Sơn"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            />
          </div>

          {/* Số tiền + Ngày */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Số tiền (VNĐ) <span className="text-rose-400">*</span></label>
              <input
                required
                type="number"
                value={soTien}
                onChange={e => setSoTien(e.target.value)}
                placeholder="0"
                min={0}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Ngày</label>
              <input
                type="date"
                value={ngay}
                onChange={e => setNgay(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
            </div>
          </div>

          {/* Dự án + Trạng thái */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Dự án liên quan</label>
              <input
                value={duAn}
                onChange={e => setDuAn(e.target.value)}
                placeholder="Tên dự án (nếu có)"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Trạng thái</label>
              <select
                value={trangThai}
                onChange={e => setTrangThai(e.target.value as TrangThaiThanhToan)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] bg-white cursor-pointer"
              >
                <option>Đã thanh toán</option>
                <option>Chờ thanh toán</option>
                <option>Quá hạn</option>
              </select>
            </div>
          </div>

          {/* Ghi chú */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Ghi chú</label>
            <input
              value={ghiChu}
              onChange={e => setGhiChu(e.target.value)}
              placeholder="Ghi chú thêm..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors">
              Huỷ
            </button>
            <button type="submit" className="flex-1 py-2 rounded-lg bg-[#406c89] hover:bg-[#345972] text-white text-sm font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5">
              <IconCheck size={15} /> Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function QuanLyTaiChinh() {
  const [data, setData] = useState<GiaoDichItem[]>(DEFAULT_DATA);
  const [filterLoai, setFilterLoai] = useState<'Tất cả' | 'Thu' | 'Chi'>('Tất cả');
  const [filterTrangThai, setFilterTrangThai] = useState<'Tất cả' | TrangThaiThanhToan>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stats
  const tongThu = data.filter(g => g.loai === 'Thu' && g.trangThai === 'Đã thanh toán').reduce((s, g) => s + g.soTien, 0);
  const tongChi = data.filter(g => g.loai === 'Chi' && g.trangThai === 'Đã thanh toán').reduce((s, g) => s + g.soTien, 0);
  const soDu = tongThu - tongChi;
  const choThanhToan = data.filter(g => g.trangThai === 'Chờ thanh toán').reduce((s, g) => s + g.soTien, 0);
  const quaHan = data.filter(g => g.trangThai === 'Quá hạn').reduce((s, g) => s + g.soTien, 0);

  // Filter
  const filtered = data.filter(g => {
    const matchLoai = filterLoai === 'Tất cả' || g.loai === filterLoai;
    const matchTrang = filterTrangThai === 'Tất cả' || g.trangThai === filterTrangThai;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || g.tenGiaoDich.toLowerCase().includes(q) || (g.duAn ?? '').toLowerCase().includes(q);
    return matchLoai && matchTrang && matchSearch;
  });

  // Sort by date desc
  const sorted = [...filtered].sort((a, b) => b.ngay.localeCompare(a.ngay));

  const handleAdd = (gd: Omit<GiaoDichItem, 'id'>) => {
    setData(prev => [{ id: `gd-${Date.now()}`, ...gd }, ...prev]);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Xoá giao dịch này?')) setData(prev => prev.filter(g => g.id !== id));
  };

  const trangThaiConfig = {
    'Đã thanh toán': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    'Chờ thanh toán': 'bg-amber-50 text-amber-600 border-amber-200',
    'Quá hạn': 'bg-rose-50 text-rose-600 border-rose-200',
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden p-5 md:p-6 space-y-4 text-slate-700 w-full bg-slate-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Quản lý Tài chính</h2>
          <p className="text-xs text-slate-400 mt-0.5">Theo dõi thu chi & dòng tiền dự án</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer self-start"
        >
          <IconPlus size={16} />
          <span>Thêm giao dịch</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
              <IconTrendingUp size={15} className="text-emerald-500" />
            </div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Tổng thu</p>
          </div>
          <p className="text-xl font-extrabold text-emerald-600">{formatCurrency(tongThu)}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Đã nhận thanh toán</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center">
              <IconTrendingDown size={15} className="text-rose-500" />
            </div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Tổng chi</p>
          </div>
          <p className="text-xl font-extrabold text-rose-500">{formatCurrency(tongChi)}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Đã thanh toán</p>
        </div>

        <div className="bg-white border border-emerald-200/50 rounded-xl p-4 shadow-xs bg-gradient-to-br from-white to-emerald-50/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
              <IconWallet size={15} className="text-blue-500" />
            </div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Số dư</p>
          </div>
          <p className={`text-xl font-extrabold ${soDu >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>{formatCurrency(Math.abs(soDu))}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{soDu >= 0 ? 'Dương' : 'Âm'}</p>
        </div>

        <div className="bg-white border border-amber-200/50 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
              <IconClock size={15} className="text-amber-500" />
            </div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Chờ & Quá hạn</p>
          </div>
          <p className="text-xl font-extrabold text-amber-500">{formatCurrency(choThanhToan + quaHan)}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            <span className="text-amber-500">{formatCurrency(choThanhToan)}</span> chờ · <span className="text-rose-500">{formatCurrency(quaHan)}</span> quá hạn
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-3 shadow-xs flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <div className="flex items-center gap-2 flex-1 min-w-0 w-full sm:w-auto">
            <IconSearch size={15} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm giao dịch hoặc dự án..."
              className="w-full bg-transparent text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
            {/* Filter Loại */}
            <div className="flex gap-1 text-xs">
              {(['Tất cả', 'Thu', 'Chi'] as const).map(l => (
                <button key={l} onClick={() => setFilterLoai(l)} className={`px-2.5 py-1 rounded-lg border font-medium cursor-pointer transition-all ${
                  filterLoai === l ? 'bg-[#406c89] text-white border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}>{l}</button>
              ))}
            </div>

            {/* Filter Trạng thái */}
            <div className="flex gap-1 text-xs flex-wrap">
              {(['Tất cả', 'Đã thanh toán', 'Chờ thanh toán', 'Quá hạn'] as const).map(t => (
                <button key={t} onClick={() => setFilterTrangThai(t)} className={`px-2.5 py-1 rounded-lg border font-medium cursor-pointer transition-all whitespace-nowrap ${
                  filterTrangThai === t ? 'bg-[#406c89] text-white border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}>
                  {t === 'Tất cả' ? 'Tất cả TT' : t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden bg-white border border-slate-200/80 rounded-xl shadow-xs flex flex-col">
        {/* Table Header */}
        <div className="overflow-x-auto shrink-0">
          <div className="grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_40px] gap-3 px-4 py-2.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wide bg-slate-50/80 rounded-t-xl min-w-[600px]">
            <span>Tên giao dịch</span>
            <span>Danh mục</span>
            <span className="hidden sm:block">Dự án</span>
            <span>Ngày</span>
            <span>Số tiền</span>
            <span></span>
          </div>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-y-auto overflow-x-auto divide-y divide-slate-100 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 min-w-[600px]">
              <IconFileText size={40} className="stroke-[1.25] mb-2" />
              <p className="text-xs font-medium">Không có giao dịch nào</p>
            </div>
          ) : sorted.map(gd => (
            <div key={gd.id} className="grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_40px] gap-3 px-4 py-3 items-center hover:bg-slate-50/60 transition-colors group min-w-[600px]">
              {/* Tên */}
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${gd.loai === 'Thu' ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                  {gd.loai === 'Thu'
                    ? <IconArrowUpRight size={12} className="text-emerald-500" />
                    : <IconArrowDownRight size={12} className="text-rose-500" />
                  }
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{gd.tenGiaoDich}</p>
                  {gd.ghiChu && <p className="text-[10px] text-slate-400 truncate">{gd.ghiChu}</p>}
                </div>
              </div>

              {/* Danh mục */}
              <span className="text-[10px] font-medium text-slate-500 truncate">{gd.danhMuc}</span>

              {/* Dự án */}
              <span className="text-[10px] font-medium text-[#406c89] truncate">{gd.duAn ?? '—'}</span>

              {/* Ngày */}
              <span className="text-[10px] font-medium text-slate-400">{formatDate(gd.ngay)}</span>

              {/* Số tiền */}
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold ${gd.loai === 'Thu' ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {gd.loai === 'Thu' ? '+' : '-'}{formatCurrency(gd.soTien)}
                </span>
                <span className={`hidden sm:inline text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${trangThaiConfig[gd.trangThai]}`}>
                  {gd.trangThai === 'Đã thanh toán' ? 'TT' : gd.trangThai === 'Chờ thanh toán' ? 'Chờ' : 'Hạn'}
                </span>
              </div>

              {/* Actions */}
              <button
                onClick={() => handleDelete(gd.id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded text-slate-300 hover:text-rose-400 hover:bg-rose-50 transition-all cursor-pointer"
                title="Xoá"
              >
                <IconTrash size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer summary */}
        <div className="border-t border-slate-100 px-4 py-2.5 flex items-center justify-between text-[11px] text-slate-400 bg-slate-50/50 rounded-b-xl shrink-0">
          <span>{sorted.length} giao dịch</span>
          <div className="flex items-center gap-4">
            <span>Thu: <span className="font-bold text-emerald-600">+{formatCurrency(sorted.filter(g => g.loai === 'Thu').reduce((s, g) => s + g.soTien, 0))}</span></span>
            <span>Chi: <span className="font-bold text-rose-500">-{formatCurrency(sorted.filter(g => g.loai === 'Chi').reduce((s, g) => s + g.soTien, 0))}</span></span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ThemGiaoDichModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAdd} />
    </div>
  );
}
