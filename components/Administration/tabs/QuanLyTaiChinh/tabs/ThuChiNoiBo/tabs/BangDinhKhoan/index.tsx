"use client";

import React, { useState } from 'react';
import {
  IconPlus,
  IconSearch,
  IconDownload,
  IconRefresh,
  IconCheck,
  IconX,
  IconScale,
  IconFileText,
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons-react';
import { formatCurrency, formatDate } from '../../../../types';

export interface ButToanItem {
  id: string;
  ngay: string;
  soChungTu: string;
  dienGiai: string;
  tkNo: string;
  tenTkNo: string;
  tkCo: string;
  tenTkCo: string;
  soTien: number;
  doiTuong?: string;
  trangThai: 'Đã hạch toán' | 'Chờ duyệt';
}

const INITIAL_BUT_TOAN: ButToanItem[] = [
  {
    id: 'bt-1',
    ngay: '2026-07-10',
    soChungTu: 'PT07-001',
    dienGiai: 'Thu tiền tạm ứng Đợt 1 - VSIP Lạng Sơn',
    tkNo: '1121',
    tenTkNo: 'Tiền gửi Ngân hàng VCB',
    tkCo: '131',
    tenTkCo: 'Phải thu KH (VSIP Lạng Sơn)',
    soTien: 320_000_000,
    doiTuong: 'VSIP LẠNG SƠN',
    trangThai: 'Đã hạch toán',
  },
  {
    id: 'bt-2',
    ngay: '2026-07-05',
    soChungTu: 'PC07-001',
    dienGiai: 'Chi thanh toán tiền vật liệu mô hình NCC Minh Đức',
    tkNo: '6422',
    tenTkNo: 'Chi phí vật liệu quản lý',
    tkCo: '1111',
    tenTkCo: 'Tiền mặt tại quỹ',
    soTien: 85_000_000,
    doiTuong: 'NCC Minh Đức',
    trangThai: 'Đã hạch toán',
  },
  {
    id: 'bt-3',
    ngay: '2026-07-12',
    soChungTu: 'PC07-002',
    dienGiai: 'Chi phí vận chuyển mô hình VSIP Lạng Sơn',
    tkNo: '6427',
    tenTkNo: 'Chi phí dịch vụ mua ngoài',
    tkCo: '1121',
    tenTkCo: 'Tiền gửi Ngân hàng VCB',
    soTien: 18_500_000,
    doiTuong: 'VSIP LẠNG SƠN',
    trangThai: 'Đã hạch toán',
  },
  {
    id: 'bt-4',
    ngay: '2026-07-15',
    soChungTu: 'PT07-002',
    dienGiai: 'Thu tiền thanh toán Đợt 2 - Heritage Tây Ninh',
    tkNo: '1121',
    tenTkNo: 'Tiền gửi Ngân hàng VCB',
    tkCo: '131',
    tenTkCo: 'Phải thu KH (Heritage Tây Ninh)',
    soTien: 580_000_000,
    doiTuong: 'Heritage Tây Ninh',
    trangThai: 'Chờ duyệt',
  },
  {
    id: 'bt-5',
    ngay: '2026-07-20',
    soChungTu: 'PC07-003',
    dienGiai: 'Chi phí lắp đặt hoàn thiện mô hình 22 Liễu Giai',
    tkNo: '6428',
    tenTkNo: 'Chi phí bằng tiền khác',
    tkCo: '1111',
    tenTkCo: 'Tiền mặt tại quỹ',
    soTien: 35_000_000,
    doiTuong: '22 Liễu Giai',
    trangThai: 'Đã hạch toán',
  },
  {
    id: 'bt-6',
    ngay: '2026-07-31',
    soChungTu: 'PC07-004',
    dienGiai: 'Hạch toán chi phí lương tháng 7 - Khối Sản xuất',
    tkNo: '6421',
    tenTkNo: 'Chi phí nhân viên',
    tkCo: '3341',
    tenTkCo: 'Phải trả người lao động',
    soTien: 120_000_000,
    doiTuong: 'Phòng Mộc Sơn',
    trangThai: 'Chờ duyệt',
  },
];

interface ThemButToanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<ButToanItem, 'id'>) => void;
}

function ThemButToanModal({ isOpen, onClose, onSubmit }: ThemButToanModalProps) {
  const [ngay, setNgay] = useState(new Date().toISOString().split('T')[0]);
  const [soChungTu, setSoChungTu] = useState('');
  const [dienGiai, setDienGiai] = useState('');
  const [tkNo, setTkNo] = useState('1111');
  const [tkCo, setTkCo] = useState('131');
  const [soTien, setSoTien] = useState('');
  const [doiTuong, setDoiTuong] = useState('');
  const [trangThai, setTrangThai] = useState<'Đã hạch toán' | 'Chờ duyệt'>('Đã hạch toán');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dienGiai || !soTien) return;

    const tkMap: Record<string, string> = {
      '1111': 'Tiền mặt tại quỹ',
      '1121': 'Tiền gửi Ngân hàng VCB',
      '131': 'Phải thu khách hàng',
      '331': 'Phải trả người bán',
      '3341': 'Phải trả người lao động',
      '511': 'Doanh thu bán hàng & dịch vụ',
      '6421': 'Chi phí nhân viên',
      '6422': 'Chi phí vật liệu',
      '6427': 'Chi phí dịch vụ mua ngoài',
      '6428': 'Chi phí bằng tiền khác',
    };

    onSubmit({
      ngay,
      soChungTu: soChungTu || `PKT-${Date.now().toString().slice(-4)}`,
      dienGiai,
      tkNo,
      tenTkNo: tkMap[tkNo] || 'Tài khoản Nợ',
      tkCo,
      tenTkCo: tkMap[tkCo] || 'Tài khoản Có',
      soTien: parseFloat(soTien.replace(/,/g, '')),
      doiTuong: doiTuong || undefined,
      trangThai,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200/80">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-extrabold text-slate-800">Thêm Bút toán Định khoản</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <IconX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Số chứng từ</label>
              <input
                value={soChungTu}
                onChange={(e) => setSoChungTu(e.target.value)}
                placeholder="VD: PT07-005"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Ngày hạch toán</label>
              <input
                type="date"
                value={ngay}
                onChange={(e) => setNgay(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Diễn giải nội dung <span className="text-rose-400">*</span>
            </label>
            <input
              required
              value={dienGiai}
              onChange={(e) => setDienGiai(e.target.value)}
              placeholder="VD: Thu tiền tạm ứng hợp đồng..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Tài khoản Nợ (Debit)</label>
              <select
                value={tkNo}
                onChange={(e) => setTkNo(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] bg-white cursor-pointer"
              >
                <option value="1111">1111 - Tiền mặt tại quỹ</option>
                <option value="1121">1121 - Tiền gửi VCB</option>
                <option value="131">131 - Phải thu khách hàng</option>
                <option value="6421">6421 - Chi phí nhân viên</option>
                <option value="6422">6422 - Chi phí vật liệu</option>
                <option value="6427">6427 - Dịch vụ mua ngoài</option>
                <option value="6428">6428 - Chi phí bằng tiền khác</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Tài khoản Có (Credit)</label>
              <select
                value={tkCo}
                onChange={(e) => setTkCo(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] bg-white cursor-pointer"
              >
                <option value="131">131 - Phải thu khách hàng</option>
                <option value="1111">1111 - Tiền mặt tại quỹ</option>
                <option value="1121">1121 - Tiền gửi VCB</option>
                <option value="331">331 - Phải trả người bán</option>
                <option value="3341">3341 - Phải trả lao động</option>
                <option value="511">511 - Doanh thu bán hàng</option>
              </select>
            </div>
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
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Đối tượng / Dự án</label>
              <input
                value={doiTuong}
                onChange={(e) => setDoiTuong(e.target.value)}
                placeholder="Tên đối tượng hoặc dự án"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Trạng thái hạch toán</label>
            <select
              value={trangThai}
              onChange={(e) => setTrangThai(e.target.value as any)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] bg-white cursor-pointer"
            >
              <option value="Đã hạch toán">Đã hạch toán</option>
              <option value="Chờ duyệt">Chờ duyệt</option>
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg bg-[#406c89] hover:bg-[#345972] text-white text-sm font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <IconCheck size={15} /> Lưu Bút Toán
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BangDinhKhoanTab() {
  const [list, setList] = useState<ButToanItem[]>(INITIAL_BUT_TOAN);
  const [search, setSearch] = useState('');
  const [filterTk, setFilterTk] = useState('Tất cả');
  const [filterTrangThai, setFilterTrangThai] = useState('Tất cả');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = (item: Omit<ButToanItem, 'id'>) => {
    setList((prev) => [{ id: `bt-${Date.now()}`, ...item }, ...prev]);
  };

  const filtered = list.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      item.dienGiai.toLowerCase().includes(q) ||
      item.soChungTu.toLowerCase().includes(q) ||
      (item.doiTuong ?? '').toLowerCase().includes(q);
    const matchTk =
      filterTk === 'Tất cả' || item.tkNo === filterTk || item.tkCo === filterTk;
    const matchTrangThai =
      filterTrangThai === 'Tất cả' || item.trangThai === filterTrangThai;
    return matchSearch && matchTk && matchTrangThai;
  });

  const tongPhatSinhNo = filtered.reduce((acc, cur) => acc + cur.soTien, 0);
  const tongPhatSinhCo = tongPhatSinhNo;

  const selectCls =
    "border border-slate-200 rounded-md px-2 py-0.5 text-[11px] text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer appearance-none pr-5 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%2210%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22%3E%3Cpath d=%22M6 9l6 6 6-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_5px_center] h-6.5";

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-3 overflow-hidden">
      {/* Top Toolbar */}
      <div className="bg-white border border-slate-200/80 rounded-xl px-3 py-2 shadow-xs shrink-0 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <IconSearch size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo số CT, nội dung, đối tượng..."
              className="pl-8 pr-3 py-1 border border-slate-200 rounded-md text-[11px] text-slate-700 w-56 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-slate-500">Lọc TK:</span>
            <select value={filterTk} onChange={(e) => setFilterTk(e.target.value)} className={selectCls}>
              <option value="Tất cả">Tất cả tài khoản</option>
              <option value="1111">1111 - Tiền mặt</option>
              <option value="1121">1121 - Tiền gửi VCB</option>
              <option value="131">131 - Phải thu KH</option>
              <option value="331">331 - Phải trả người bán</option>
              <option value="642">Chi phí 642</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-slate-500">Trạng thái:</span>
            <select
              value={filterTrangThai}
              onChange={(e) => setFilterTrangThai(e.target.value)}
              className={selectCls}
            >
              <option value="Tất cả">Tất cả trạng thái</option>
              <option value="Đã hạch toán">Đã hạch toán</option>
              <option value="Chờ duyệt">Chờ duyệt</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => { setSearch(''); setFilterTk('Tất cả'); setFilterTrangThai('Tất cả'); }}
            className="flex items-center gap-1 px-2 py-1 rounded-md border border-slate-200 text-slate-600 text-[11px] font-semibold hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <IconRefresh size={12} /> Làm mới
          </button>
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1 rounded-md border border-slate-200 text-slate-600 text-[11px] font-semibold hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <IconDownload size={12} /> Export Excel
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#2d4a63] text-white text-[11px] font-bold hover:bg-[#1e3448] cursor-pointer transition-colors"
          >
            <IconPlus size={12} /> Thêm bút toán
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-2.5 shrink-0">
        <div className="bg-white border border-slate-200/80 rounded-xl px-3.5 py-2.5 shadow-xs">
          <div className="flex items-center gap-1.5 mb-1">
            <IconArrowUpRight size={14} className="text-emerald-500" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tổng phát sinh Nợ</p>
          </div>
          <p className="text-base font-extrabold text-emerald-600">{formatCurrency(tongPhatSinhNo)}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl px-3.5 py-2.5 shadow-xs">
          <div className="flex items-center gap-1.5 mb-1">
            <IconArrowDownRight size={14} className="text-indigo-500" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tổng phát sinh Có</p>
          </div>
          <p className="text-base font-extrabold text-indigo-600">{formatCurrency(tongPhatSinhCo)}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl px-3.5 py-2.5 shadow-xs">
          <div className="flex items-center gap-1.5 mb-1">
            <IconScale size={14} className="text-amber-500" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Cân đối Nợ - Có</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-base font-extrabold text-emerald-600">0đ</p>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200 font-semibold">
              Đã cân bằng
            </span>
          </div>
        </div>
      </div>

      {/* Main Journal Table */}
      <div className="flex-1 overflow-hidden bg-white border border-slate-200/80 rounded-xl shadow-xs flex flex-col min-h-0">
        <div className="overflow-x-auto shrink-0">
          <div className="grid grid-cols-[100px_90px_2.5fr_1fr_1fr_1.2fr_1.2fr_90px] gap-2 px-4 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wide bg-slate-50/80 rounded-t-xl min-w-[850px]">
            <span>Ngày HT</span>
            <span>Số CT</span>
            <span>Diễn giải nội dung</span>
            <span>TK Nợ</span>
            <span>TK Có</span>
            <span className="text-right">Số tiền (VNĐ)</span>
            <span>Đối tượng / DA</span>
            <span className="text-center">Trạng thái</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-auto divide-y divide-slate-100 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 min-w-[850px]">
              <IconFileText size={36} className="stroke-[1.25] mb-2" />
              <p className="text-xs font-medium">Không tìm thấy bút toán định khoản nào</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[100px_90px_2.5fr_1fr_1fr_1.2fr_1.2fr_90px] gap-2 px-4 py-2.5 items-center hover:bg-slate-50/60 transition-colors min-w-[850px] text-xs"
              >
                <span className="font-medium text-slate-500 text-[11px]">{formatDate(item.ngay)}</span>
                <span className="font-bold text-[#406c89] text-[11px]">{item.soChungTu}</span>
                <div className="min-w-0 pr-2">
                  <p className="font-semibold text-slate-700 truncate text-[11px]">{item.dienGiai}</p>
                </div>
                <div className="min-w-0">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-bold">
                    {item.tkNo}
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-[10px] font-bold">
                    {item.tkCo}
                  </span>
                </div>
                <span className="font-bold text-slate-800 text-right text-[11px]">
                  {formatCurrency(item.soTien)}
                </span>
                <span className="text-[10px] text-slate-500 truncate">{item.doiTuong || '—'}</span>
                <div className="flex justify-center">
                  <span
                    className={`text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full border ${
                      item.trangThai === 'Đã hạch toán'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        : 'bg-amber-50 text-amber-600 border-amber-200'
                    }`}
                  >
                    {item.trangThai}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        <div className="border-t border-slate-100 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 bg-slate-50/60 rounded-b-xl shrink-0">
          <span>Tổng số {filtered.length} bút toán</span>
          <div className="flex items-center gap-4 font-semibold">
            <span>
              Tổng Nợ: <span className="text-emerald-600 font-bold">{formatCurrency(tongPhatSinhNo)}</span>
            </span>
            <span>
              Tổng Có: <span className="text-indigo-600 font-bold">{formatCurrency(tongPhatSinhCo)}</span>
            </span>
          </div>
        </div>
      </div>

      <ThemButToanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAdd} />
    </div>
  );
}
