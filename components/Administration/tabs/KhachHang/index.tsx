"use client";

import React, { useState } from 'react';
import ThemKhachHangModal from './modal/ThemKhachHangModal';
import SuaKhachHangModal from './modal-sua/SuaKhachHangModal';
import XoaKhachHangModal from './modal-xoa/XoaKhachHangModal';
import LapDxbgModal from './modal-dxbg/LapDxbgModal';
import LapBgModal from './modal-bg/LapBgModal';
import LapHdModal from './modal-hd/LapHdModal';
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconPhone,
  IconFileText,
  IconSignature,
  IconReceipt,
  IconChevronUp,
  IconChevronDown,
  IconUsers,
} from '@tabler/icons-react';

// --- DATA TYPES ---
export type LoaiKhachHang = 'Tiềm năng' | 'Thân thiết';

export interface KhachHangItem {
  id: string;
  ma: string;
  ten: string;
  nguoiLienHe: string;
  dienThoai: string;
  email: string;
  loai: LoaiKhachHang;
  ghiChu: string;
  daiDienHoTen?: string;
  daiDienChucDanh?: string;
  diaChi?: string;
  maSoThue?: string;
  nguonKhachHang?: string;
  soTaiKhoan?: string;
  nganHang?: string;
}

// --- STATIC DATA ---
const DATA_KHACH_HANG: KhachHangItem[] = [
  {
    id: '4',
    ma: 'KH004',
    ten: 'Công ty CP Flamingo',
    nguoiLienHe: 'B',
    dienThoai: '09090290',
    email: '',
    loai: 'Tiềm năng',
    ghiChu: '',
  },
  {
    id: '3',
    ma: 'KH003',
    ten: 'CÔNG TY CỔ PHẦN ĐẦU TƯ KINH DOANH BĐS NHSLAND',
    nguoiLienHe: 'Phạm An',
    dienThoai: '09033399339',
    email: 'Phaman@gmail.com',
    loai: 'Tiềm năng',
    ghiChu: 'ITheo giấy ủy ...',
  },
  {
    id: '2',
    ma: 'KH002',
    ten: 'CÔNG TY TNHH BẤT ĐỘNG SẢN HỒ AN',
    nguoiLienHe: 'Trịnh An',
    dienThoai: '0912333333',
    email: 'an@ecopark.com.vn',
    loai: 'Thân thiết',
    ghiChu: '',
  },
  {
    id: '1',
    ma: 'KH001',
    ten: 'Tập đoàn T&T',
    nguoiLienHe: 'Nguyễn Đức Việt',
    dienThoai: '09130000030',
    email: '',
    loai: 'Thân thiết',
    ghiChu: '',
  },
];

type SortKey = 'ten' | null;
type SortDir = 'asc' | 'desc';

function LoaiBadge({ loai }: { loai: LoaiKhachHang }) {
  if (loai === 'Tiềm năng') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-500 border border-orange-200 whitespace-nowrap">
        Tiềm năng
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 whitespace-nowrap">
      Thân thiết
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  const letter = name.charAt(0).toUpperCase();
  return (
    <div className="w-7 h-7 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-[11px] font-bold text-indigo-600 shrink-0">
      {letter}
    </div>
  );
}

function ActionButtons({ 
  onLapDxbg, 
  onLapBg, 
  onLapHd 
}: { 
  onLapDxbg: () => void; 
  onLapBg: () => void; 
  onLapHd: () => void; 
}) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-1.5">
      <button
        onClick={onLapDxbg}
        className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-all whitespace-nowrap cursor-pointer"
        title="Lập Đề xuất Báo giá"
      >
        <IconReceipt size={11} />
        Lập ĐXBG
      </button>
      <button
        onClick={onLapBg}
        className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-all whitespace-nowrap cursor-pointer"
        title="Lập Báo giá"
      >
        <IconFileText size={11} />
        Lập BG
      </button>
      <button
        onClick={onLapHd}
        className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all whitespace-nowrap cursor-pointer"
        title="Lập Hợp đồng"
      >
        <IconSignature size={11} />
        Lập HĐ
      </button>
    </div>
  );
}

export default function KhachHang() {
  const [customers, setCustomers] = useState<KhachHangItem[]>(DATA_KHACH_HANG);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<KhachHangItem | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<KhachHangItem | null>(null);
  const [selectedDxbgCustomer, setSelectedDxbgCustomer] = useState<KhachHangItem | null>(null);
  const [selectedBgCustomer, setSelectedBgCustomer] = useState<KhachHangItem | null>(null);
  const [selectedHdCustomer, setSelectedHdCustomer] = useState<KhachHangItem | null>(null);

  const total = customers.length;
  const dangGiaoDich = 0;
  const thanThiet = customers.filter(k => k.loai === 'Thân thiết').length;

  const filtered = customers.filter(k => {
    const q = search.toLowerCase();
    return (
      k.ten.toLowerCase().includes(q) ||
      k.nguoiLienHe.toLowerCase().includes(q) ||
      k.dienThoai.includes(q)
    );
  });

  const handleSaveCustomer = (newKh: Omit<KhachHangItem, 'id'>) => {
    const nextId = (Math.max(...customers.map(c => parseInt(c.id) || 0), 0) + 1).toString();
    setCustomers(prev => [{ id: nextId, ...newKh }, ...prev]);
  };

  const handleUpdateCustomer = (updatedKh: KhachHangItem) => {
    setCustomers(prev => prev.map(c => c.id === updatedKh.id ? updatedKh : c));
  };

  const handleDeleteCustomer = () => {
    if (deletingCustomer) {
      setCustomers(prev => prev.filter(c => c.id !== deletingCustomer.id));
    }
  };

  const getSuggestedMa = () => {
    const numericCodes = customers
      .map(c => {
        const match = c.ma.match(/^KH(\d+)$/i);
        return match ? parseInt(match[1]) : 0;
      });
    const maxNum = Math.max(...numericCodes, 0);
    return `KH${(maxNum + 1).toString().padStart(3, '0')}`;
  };

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const va = a[sortKey].toLowerCase();
    const vb = b[sortKey].toLowerCase();
    return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) {
      return (
        <span className="inline-flex flex-col ml-0.5 opacity-30">
          <IconChevronUp size={9} />
          <IconChevronDown size={9} className="-mt-1" />
        </span>
      );
    }
    return sortDir === 'asc'
      ? <IconChevronUp size={11} className="ml-0.5 text-indigo-500" />
      : <IconChevronDown size={11} className="ml-0.5 text-indigo-500" />;
  }

  return (
    <div className="flex-1 flex flex-col bg-[#fafbfc] overflow-hidden select-none">
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-10 bg-[#fafbfc] px-8 pt-6 pb-4 border-b border-slate-100 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Quản lý Khách hàng (CRM)</h1>
            <p className="text-sm text-slate-500 mt-0.5">Danh sách và thông tin khách hàng</p>
          </div>
          <button
            id="btn-them-khach-hang"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-bold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <IconPlus size={16} />
            Thêm khách hàng
          </button>
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-5">

        {/* STAT CARDS */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-slate-400 font-semibold mb-1">Tổng khách hàng</p>
            <p className="text-2xl font-black text-slate-800">{total}</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-slate-400 font-semibold mb-1">Đang giao dịch</p>
            <p className="text-2xl font-black text-orange-500">{dangGiaoDich}</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-slate-400 font-semibold mb-1">Khách thân thiết</p>
            <p className="text-2xl font-black text-slate-800">{thanThiet}</p>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative">
          <IconSearch size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="search-khach-hang"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm theo tên, người liên hệ, SĐT..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all text-slate-700 placeholder:text-slate-400"
          />
        </div>

        {/* TABLE */}
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  <th className="text-left px-4 py-3 font-bold text-slate-500 uppercase tracking-wide">
                    <button
                      className="flex items-center gap-0.5 hover:text-indigo-600 transition-colors cursor-pointer"
                      onClick={() => handleSort('ten')}
                    >
                      Tên công ty
                      <SortIcon k="ten" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3 font-bold text-slate-500 uppercase tracking-wide">
                    Người liên hệ
                  </th>
                  <th className="text-left px-4 py-3 font-bold text-slate-500 uppercase tracking-wide">
                    Điện thoại
                  </th>
                  <th className="text-left px-4 py-3 font-bold text-slate-500 uppercase tracking-wide">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 font-bold text-slate-500 uppercase tracking-wide">
                    Loại
                  </th>
                  <th className="text-left px-4 py-3 font-bold text-slate-500 uppercase tracking-wide">
                    Ghi chú
                  </th>
                  <th className="text-right px-4 py-3 font-bold text-slate-500 uppercase tracking-wide">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {sorted.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <IconUsers size={32} className="opacity-30" />
                        <p className="font-semibold">Không tìm thấy khách hàng</p>
                      </div>
                    </td>
                  </tr>
                )}
                {sorted.map(kh => (
                  <tr
                    key={kh.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* Tên công ty */}
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-2.5">
                        <Avatar name={kh.ten} />
                        <div>
                          <p className="font-semibold text-indigo-700 hover:text-indigo-900 cursor-pointer leading-snug">
                            {kh.ten}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{kh.ma}</p>
                        </div>
                      </div>
                    </td>

                    {/* Người liên hệ */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-700 font-medium">{kh.nguoiLienHe || '—'}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingCustomer(kh)}
                            className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                            title="Chỉnh sửa"
                          >
                            <IconEdit stroke={2} size={16} />
                          </button>
                           <button
                            onClick={() => setDeletingCustomer(kh)}
                            className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                            title="Xóa"
                          >
                            <IconTrash size={16} />
                          </button>
                        </div>
                      </div>
                    </td>


                    {/* Điện thoại */}
                    <td className="px-4 py-3">
                      {kh.dienThoai ? (
                        <span className="flex items-center gap-1 text-slate-600 font-medium">
                          <IconPhone size={16} className="text-slate-400" />
                          {kh.dienThoai}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3">
                      {kh.email ? (
                        <span className="text-slate-600 font-medium">{kh.email}</span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>

                    {/* Loại */}
                    <td className="px-4 py-3">
                      <LoaiBadge loai={kh.loai} />
                    </td>

                    {/* Ghi chú */}
                    <td className="px-4 py-3">
                      {kh.ghiChu ? (
                        <span className="text-slate-500 italic truncate max-w-[120px] block" title={kh.ghiChu}>
                          {kh.ghiChu}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>

                    {/* Thao tác */}
                    <td className="px-4 py-3">
                      <ActionButtons 
                        onLapDxbg={() => setSelectedDxbgCustomer(kh)} 
                        onLapBg={() => setSelectedBgCustomer(kh)} 
                        onLapHd={() => setSelectedHdCustomer(kh)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER COUNT */}
        {sorted.length > 0 && (
          <p className="text-[11px] text-slate-400 font-medium text-center pb-2">
            Hiển thị {sorted.length} / {total} khách hàng
          </p>
        )}
        </div> {/* end space-y-5 */}
      </div> {/* end scrollable */}

      <ThemKhachHangModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCustomer}
        suggestedMa={getSuggestedMa()}
      />

      <SuaKhachHangModal
        isOpen={editingCustomer !== null}
        onClose={() => setEditingCustomer(null)}
        onSave={handleUpdateCustomer}
        customer={editingCustomer}
      />

      <XoaKhachHangModal
        isOpen={deletingCustomer !== null}
        onClose={() => setDeletingCustomer(null)}
        onConfirm={handleDeleteCustomer}
        customerName={deletingCustomer?.ten || ''}
      />

      <LapDxbgModal
        isOpen={selectedDxbgCustomer !== null}
        onClose={() => setSelectedDxbgCustomer(null)}
        onSave={(data) => {
          console.log("Saved proposal:", data);
        }}
        customer={selectedDxbgCustomer}
        customers={customers}
      />

      <LapBgModal
        isOpen={selectedBgCustomer !== null}
        onClose={() => setSelectedBgCustomer(null)}
        onSave={(data) => {
          console.log("Saved quotation:", data);
        }}
        customer={selectedBgCustomer}
        customers={customers}
      />

      <LapHdModal
        isOpen={selectedHdCustomer !== null}
        onClose={() => setSelectedHdCustomer(null)}
        onSave={(data) => {
          console.log("Saved contract:", data);
        }}
        customer={selectedHdCustomer}
        customers={customers}
      />
    </div>
  );
}
