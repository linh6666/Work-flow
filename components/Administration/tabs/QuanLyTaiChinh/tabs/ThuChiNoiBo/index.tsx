"use client";

import React, { useState } from 'react';
import {
  IconPlus,
  IconTrendingUp,
  IconTrendingDown,
  IconScale,
  IconTrash,
  IconArrowUpRight,
  IconArrowDownRight,
  IconFileText,
  IconX,
  IconCheck,
  IconUpload,
  IconDownload,
  IconRefresh,
} from '@tabler/icons-react';
import {
  GiaoDichItem,
  LoaiGiaoDich,
  DanhMuc,
  TrangThaiThanhToan,
  DEFAULT_DATA,
  formatCurrency,
  formatDate,
} from '../../types';

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
      loai,
      danhMuc,
      tenGiaoDich,
      soTien: parseFloat(soTien.replace(/,/g, '')),
      ngay,
      trangThai,
      duAn: duAn || undefined,
      ghiChu: ghiChu || undefined,
    });
    setTenGiaoDich('');
    setSoTien('');
    setDuAn('');
    setGhiChu('');
    setNgay(new Date().toISOString().split('T')[0]);
    setLoai('Thu');
    setDanhMuc('Thu hợp đồng');
    setTrangThai('Đã thanh toán');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200/80">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-extrabold text-slate-800">Thêm Giao dịch</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
          >
            <IconX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex gap-2">
            {(['Thu', 'Chi'] as LoaiGiaoDich[]).map((l) => (
              <button
                key={l}
                type="button"
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

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Danh mục</label>
            <select
              value={danhMuc}
              onChange={(e) => setDanhMuc(e.target.value as DanhMuc)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] bg-white cursor-pointer"
            >
              {(loai === 'Thu' ? thuDanhMuc : chiDanhMuc).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Tên giao dịch <span className="text-rose-400">*</span>
            </label>
            <input
              required
              value={tenGiaoDich}
              onChange={(e) => setTenGiaoDich(e.target.value)}
              placeholder="VD: Đợt 1 - VSIP Lạng Sơn"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Số tiền (VNĐ) <span className="text-rose-400">*</span>
              </label>
              <input
                required
                type="number"
                value={soTien}
                onChange={(e) => setSoTien(e.target.value)}
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
                onChange={(e) => setNgay(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Dự án liên quan</label>
              <input
                value={duAn}
                onChange={(e) => setDuAn(e.target.value)}
                placeholder="Tên dự án (nếu có)"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Trạng thái</label>
              <select
                value={trangThai}
                onChange={(e) => setTrangThai(e.target.value as TrangThaiThanhToan)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] bg-white cursor-pointer"
              >
                <option>Đã thanh toán</option>
                <option>Chờ thanh toán</option>
                <option>Quá hạn</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Ghi chú</label>
            <input
              value={ghiChu}
              onChange={(e) => setGhiChu(e.target.value)}
              placeholder="Ghi chú thêm..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg bg-[#406c89] hover:bg-[#345972] text-white text-sm font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <IconCheck size={15} /> Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ThuChiNoiBoTab() {
  const [data, setData] = useState<GiaoDichItem[]>(DEFAULT_DATA);
  const [filterLoai, setFilterLoai] = useState<'Tất cả' | 'Thu' | 'Chi'>('Tất cả');
  const [filterTrangThai, setFilterTrangThai] = useState<'Tất cả' | TrangThaiThanhToan>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterLoaiSo, setFilterLoaiSo] = useState('Thực tế');
  const [filterNam, setFilterNam] = useState('Năm 2021');
  const [filterKy, setFilterKy] = useState('Cả năm');
  const [filterNguoi, setFilterNguoi] = useState('Tất cả người mua');

  const tongThu = data.filter((g) => g.loai === 'Thu' && g.trangThai === 'Đã thanh toán').reduce((s, g) => s + g.soTien, 0);
  const tongChi = data.filter((g) => g.loai === 'Chi' && g.trangThai === 'Đã thanh toán').reduce((s, g) => s + g.soTien, 0);
  const soDu = tongThu - tongChi;
  const choThanhToan = data.filter((g) => g.trangThai === 'Chờ thanh toán').reduce((s, g) => s + g.soTien, 0);
  const quaHan = data.filter((g) => g.trangThai === 'Quá hạn').reduce((s, g) => s + g.soTien, 0);

  const filtered = data.filter((g) => {
    const matchLoai = filterLoai === 'Tất cả' || g.loai === filterLoai;
    const matchTrang = filterTrangThai === 'Tất cả' || g.trangThai === filterTrangThai;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || g.tenGiaoDich.toLowerCase().includes(q) || (g.duAn ?? '').toLowerCase().includes(q);
    return matchLoai && matchTrang && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => b.ngay.localeCompare(a.ngay));

  const handleAdd = (gd: Omit<GiaoDichItem, 'id'>) => {
    setData((prev) => [{ id: `gd-${Date.now()}`, ...gd }, ...prev]);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Xoá giao dịch này?')) setData((prev) => prev.filter((g) => g.id !== id));
  };

  const handleDeleteAll = () => {
    if (confirm('Xoá tất cả giao dịch?')) setData([]);
  };

  const trangThaiConfig = {
    'Đã thanh toán': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    'Chờ thanh toán': 'bg-amber-50 text-amber-600 border-amber-200',
    'Quá hạn': 'bg-rose-50 text-rose-600 border-rose-200',
  };

  const selectCls = "border border-slate-200 rounded-md px-2 py-1 text-[11px] text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer appearance-none pr-6 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%2210%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22%3E%3Cpath d=%22M6 9l6 6 6-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_6px_center]";

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-4 overflow-hidden">
      {/* Toolbar */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs shrink-0">
        {/* Row 1: Filters */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-slate-100 flex-wrap">
          <select value={filterLoaiSo} onChange={(e) => setFilterLoaiSo(e.target.value)} className={selectCls}>
            <option>Thực tế</option>
            <option>Kế hoạch</option>
          </select>
          <select value={filterNam} onChange={(e) => setFilterNam(e.target.value)} className={selectCls}>
            {[2021, 2022, 2023, 2024, 2025, 2026].map((y) => (
              <option key={y}>Năm {y}</option>
            ))}
          </select>
          <select value={filterKy} onChange={(e) => setFilterKy(e.target.value)} className={selectCls}>
            <option>Cả năm</option>
            <option>Quý 1</option>
            <option>Quý 2</option>
            <option>Quý 3</option>
            <option>Quý 4</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1}>Tháng {i + 1}</option>
            ))}
          </select>
          <select value={filterNguoi} onChange={(e) => setFilterNguoi(e.target.value)} className={selectCls}>
            <option>Tất cả người mua</option>
            <option>Khách hàng A</option>
            <option>Khách hàng B</option>
          </select>
        </div>

        {/* Row 2: Action Buttons */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 flex-wrap">
          {/* Import Thu Chi */}
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1 rounded-md border border-[#406c89] text-[#406c89] text-[11px] font-semibold hover:bg-[#406c89]/5 cursor-pointer transition-colors"
          >
            <IconUpload size={13} />
            Import Thu Chi
          </button>

          {/* Import Cân Đối */}
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1 rounded-md border border-amber-400 text-amber-500 text-[11px] font-semibold hover:bg-amber-50 cursor-pointer transition-colors"
          >
            <IconUpload size={13} />
            Import Cân Đối
          </button>

          {/* Export */}
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1 rounded-md border border-slate-200 text-slate-600 text-[11px] font-semibold hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <IconDownload size={13} />
            Export
          </button>

          {/* Import */}
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1 rounded-md border border-slate-200 text-slate-600 text-[11px] font-semibold hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <IconUpload size={13} />
            Import
          </button>

          {/* Làm mới */}
          <button
            type="button"
            onClick={() => { setFilterLoai('Tất cả'); setFilterTrangThai('Tất cả'); setSearchQuery(''); }}
            className="flex items-center gap-1 px-2 py-1 rounded-md border border-slate-200 text-slate-600 text-[11px] font-semibold hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <IconRefresh size={13} />
            Làm mới
          </button>

          {/* Xóa tất cả */}
          <button
            type="button"
            onClick={handleDeleteAll}
            className="flex items-center gap-1 px-2 py-1 rounded-md border border-rose-200 text-rose-500 text-[11px] font-semibold hover:bg-rose-50 cursor-pointer transition-colors"
          >
            <IconTrash size={13} />
            Xóa tất cả
          </button>

          {/* Thêm khoản */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#2d4a63] text-white text-[11px] font-bold hover:bg-[#1e3448] cursor-pointer transition-colors ml-auto"
          >
            <IconPlus size={13} />
            Thêm khoản
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 shrink-0">
        {/* Tổng Thu */}
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs px-4 py-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <IconTrendingUp size={14} className="text-emerald-500" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tổng thu</p>
          </div>
          <p className="text-lg font-extrabold text-emerald-500">{formatCurrency(tongThu)}</p>
        </div>

        {/* Tổng Chi */}
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs px-4 py-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <IconTrendingDown size={14} className="text-rose-500" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tổng chi</p>
          </div>
          <p className="text-lg font-extrabold text-rose-500">{formatCurrency(tongChi)}</p>
        </div>

        {/* Cân Đối */}
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs px-4 py-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <IconScale size={14} className="text-amber-500" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Cân đối</p>
          </div>
          <p className={`text-lg font-extrabold ${soDu >= 0 ? 'text-amber-500' : 'text-rose-500'}`}>
            {formatCurrency(Math.abs(soDu))}
          </p>
        </div>
      </div>

      {/* Filter Loại / Trạng thái */}
      <div className="bg-white border border-slate-200/80 rounded-xl px-3 py-2 shadow-xs flex items-center gap-2 flex-wrap shrink-0">
        <div className="flex gap-1 text-[11px]">
          {(['Tất cả', 'Thu', 'Chi'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setFilterLoai(l)}
              className={`px-2 py-0.5 rounded-md border font-medium cursor-pointer transition-all ${
                filterLoai === l
                  ? 'bg-[#406c89] text-white border-transparent'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="w-px h-4 bg-slate-200" />
        <div className="flex gap-1 text-[11px] flex-wrap">
          {(['Tất cả', 'Đã thanh toán', 'Chờ thanh toán', 'Quá hạn'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterTrangThai(t)}
              className={`px-2 py-0.5 rounded-md border font-medium cursor-pointer transition-all whitespace-nowrap ${
                filterTrangThai === t
                  ? 'bg-[#406c89] text-white border-transparent'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t === 'Tất cả' ? 'Tất cả TT' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden bg-white border border-slate-200/80 rounded-xl shadow-xs flex flex-col min-h-0">
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

        <div className="flex-1 overflow-y-auto overflow-x-auto divide-y divide-slate-100 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 min-w-[600px]">
              <IconFileText size={40} className="stroke-[1.25] mb-2" />
              <p className="text-xs font-medium">Không có giao dịch nào</p>
            </div>
          ) : (
            sorted.map((gd) => (
              <div
                key={gd.id}
                className="grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_40px] gap-3 px-4 py-3 items-center hover:bg-slate-50/60 transition-colors group min-w-[600px]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                      gd.loai === 'Thu' ? 'bg-emerald-50' : 'bg-rose-50'
                    }`}
                  >
                    {gd.loai === 'Thu' ? (
                      <IconArrowUpRight size={12} className="text-emerald-500" />
                    ) : (
                      <IconArrowDownRight size={12} className="text-rose-500" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">{gd.tenGiaoDich}</p>
                    {gd.ghiChu && <p className="text-[10px] text-slate-400 truncate">{gd.ghiChu}</p>}
                  </div>
                </div>

                <span className="text-[10px] font-medium text-slate-500 truncate">{gd.danhMuc}</span>
                <span className="text-[10px] font-medium text-[#406c89] truncate">{gd.duAn ?? '—'}</span>
                <span className="text-[10px] font-medium text-slate-400">{formatDate(gd.ngay)}</span>

                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-bold ${gd.loai === 'Thu' ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {gd.loai === 'Thu' ? '+' : '-'}
                    {formatCurrency(gd.soTien)}
                  </span>
                  <span
                    className={`hidden sm:inline text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${
                      trangThaiConfig[gd.trangThai]
                    }`}
                  >
                    {gd.trangThai === 'Đã thanh toán' ? 'TT' : gd.trangThai === 'Chờ thanh toán' ? 'Chờ' : 'Hạn'}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(gd.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded text-slate-300 hover:text-rose-400 hover:bg-rose-50 transition-all cursor-pointer"
                  title="Xoá"
                >
                  <IconTrash size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-slate-100 px-4 py-2.5 flex items-center justify-between text-[11px] text-slate-400 bg-slate-50/50 rounded-b-xl shrink-0">
          <span>{sorted.length} giao dịch</span>
          <div className="flex items-center gap-4">
            <span>
              Thu:{' '}
              <span className="font-bold text-emerald-600">
                +{formatCurrency(sorted.filter((g) => g.loai === 'Thu').reduce((s, g) => s + g.soTien, 0))}
              </span>
            </span>
            <span>
              Chi:{' '}
              <span className="font-bold text-rose-500">
                -{formatCurrency(sorted.filter((g) => g.loai === 'Chi').reduce((s, g) => s + g.soTien, 0))}
              </span>
            </span>
          </div>
        </div>
      </div>

      <ThemGiaoDichModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAdd} />
    </div>
  );
}
