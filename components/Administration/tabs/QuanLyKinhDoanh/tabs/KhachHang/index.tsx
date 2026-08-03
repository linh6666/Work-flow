"use client";

import React, { useState, useEffect } from 'react';
import {
  IconSearch,
  IconDownload,
  IconUpload,
  IconPlus,
  IconEdit,
  IconTrash,
  IconPhone,
  IconChevronUp,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconFileDescription,
  IconFileText,
  IconSignature,
} from '@tabler/icons-react';

import ThemKhachHangModal from './modal/ThemKhachHangModal';
import SuaKhachHangModal from './modal-sua/SuaKhachHangModal';
import XoaKhachHangModal from './modal-xoa/XoaKhachHangModal';

import LapDxbgModal from './modal-dxbg/LapDxbgModal';
import LapBgModal from './modal-bg/LapBgModal';
import LapHdModal from './modal-hd/LapHdModal';

import { LoaiKhachHang, KhachHangItem } from '../../../KhachHang';

// --- EXACT MOCK DATA FROM SCREENSHOT ---
const INITIAL_KHACH_HANG: KhachHangItem[] = [
  {
    id: '1',
    ma: 'KH253',
    ten: 'CÔNG TY CỔ PHẦN THƯƠNG MẠI DƯƠNG PHÚC THẮNG',
    nguoiLienHe: 'Bà Nguyễn Phương Mi',
    dienThoai: '0983324492',
    email: 'minp@osi.com.vn',
    loai: 'Đang giao dịch',
    ghiChu: '',
  },
  {
    id: '2',
    ma: 'KH251',
    ten: 'CÔNG TY CỔ PHẦN THÁI NAM LAND',
    nguoiLienHe: 'Chị Dương',
    dienThoai: '0376943469',
    email: '',
    loai: 'Tiềm năng',
    ghiChu: '',
  },
  {
    id: '3',
    ma: 'KH024',
    ten: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN ECOPARK',
    nguoiLienHe: 'Thùy',
    dienThoai: '',
    email: 'thuynt@teamkinhdoanh.com',
    loai: 'Thân thiết',
    ghiChu: '',
  },
  {
    id: '4',
    ma: 'KH250',
    ten: 'CÔNG TY CỔ PHẦN ĐẦU TƯ PHÁT TRIỂN ĐÔ THỊ AHA VIỆT NAM',
    nguoiLienHe: 'Bà Nguyễn Hồng Điệp',
    dienThoai: '0966925029',
    email: '',
    loai: 'Đang giao dịch',
    ghiChu: '',
  },
  {
    id: '5',
    ma: 'KH021',
    ten: 'CÔNG TY TNHH BIM KIÊN GIANG',
    nguoiLienHe: 'Phạm Thanh Hằng',
    dienThoai: '0913393935',
    email: 'hang.pt@bimgroup.com',
    loai: 'Thân thiết',
    ghiChu: '',
  },
  {
    id: '6',
    ma: 'KH240',
    ten: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN T&T',
    nguoiLienHe: 'Chị Thảo Bùi',
    dienThoai: '',
    email: '',
    loai: 'Tiềm năng',
    ghiChu: '',
  },
  {
    id: '7',
    ma: 'KH238',
    ten: 'CÔNG TY TNHH DAEWOO ENGINEERING & CONSTRUCTION VIỆT NAM',
    nguoiLienHe: 'Anh Nguyễn Văn Thắng',
    dienThoai: '0359067129',
    email: '',
    loai: 'Tiềm năng',
    ghiChu: '',
  },
  {
    id: '8',
    ma: 'KH002',
    ten: 'BAN QUẢN LÝ DỰ ÁN ĐẦU TƯ XÂY DỰNG NHÀ QUỐC HỘI VÀ HỘI TRƯỜNG BA ĐÌNH (MỚI)',
    nguoiLienHe: '',
    dienThoai: '',
    email: '',
    loai: 'Không hoạt động',
    ghiChu: '',
  },
  {
    id: '9',
    ma: 'KH001',
    ten: 'AAVA ISLE LIMITED',
    nguoiLienHe: '',
    dienThoai: '',
    email: '',
    loai: 'Không hoạt động',
    ghiChu: '',
  },
  {
    id: '10',
    ma: 'KH005',
    ten: 'CÔNG TY CP MỸ THUẬT VÀ XÂY DỰNG VIỆT NAM',
    nguoiLienHe: '',
    dienThoai: '',
    email: '',
    loai: 'Tiềm năng',
    ghiChu: '',
  },
  {
    id: '11',
    ma: 'KH004',
    ten: 'BAN QUẢN LÝ KHU KINH TẾ NGHI SƠN',
    nguoiLienHe: '',
    dienThoai: '',
    email: '',
    loai: 'Tiềm năng',
    ghiChu: '',
  },
  {
    id: '12',
    ma: 'KH003',
    ten: 'BAN QUẢN LÝ SỞ QUY HOẠCH KIẾN TRÚC HÀ NỘI',
    nguoiLienHe: '',
    dienThoai: '',
    email: 'vanthu_soqhkt@hanoi.gov.vn',
    loai: 'Tiềm năng',
    ghiChu: '',
  },
  {
    id: '13',
    ma: 'KH254',
    ten: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN ĐẤT VIỆT',
    nguoiLienHe: 'Chị Vân',
    dienThoai: '0973139830',
    email: '',
    loai: 'Tiềm năng',
    ghiChu: '',
  },
  {
    id: '14',
    ma: 'KH223',
    ten: 'CÔNG TY TNHH VSIP LẠNG SƠN',
    nguoiLienHe: 'Anh Tùng',
    dienThoai: '',
    email: '',
    loai: 'Đang giao dịch',
    ghiChu: '',
  },
  {
    id: '15',
    ma: 'KH245',
    ten: 'CÔNG TY TNHH ĐẦU TƯ VÀ KINH DOANH BẤT ĐỘNG SẢN VIỆT – ÚC',
    nguoiLienHe: 'Anh Nam (+1)',
    dienThoai: '',
    email: '',
    loai: 'Đang giao dịch',
    ghiChu: 'vp công ty NH...',
  },
  {
    id: '16',
    ma: 'KH249',
    ten: 'CÔNG TY CỔ PHẦN ĐẦU TƯ KINH DOANH BĐS NHSLAND',
    nguoiLienHe: 'Phạm Đỗ An (+1)',
    dienThoai: '0934596880',
    email: 'an@nhspartner.com',
    loai: 'Thân thiết',
    ghiChu: '(Theo giấy ủy ...',
  },
  {
    id: '17',
    ma: 'KH251',
    ten: 'CÔNG TY CỔ PHẦN THÁI NAM LAND',
    nguoiLienHe: 'TRẦN THÙY DƯƠNG',
    dienThoai: '0376943469',
    email: 'duong.tranthuy@newpacificjsc.com',
    loai: 'Đang giao dịch',
    ghiChu: '',
  },
  {
    id: '18',
    ma: 'KH191',
    ten: 'CÔNG TY CỔ PHẦN CLOUD PROPERTY',
    nguoiLienHe: 'Dương Thế Anh',
    dienThoai: '0915866868',
    email: 'anhdt@cggroup.com.vn',
    loai: 'Thân thiết',
    ghiChu: '',
  },
  {
    id: '19',
    ma: 'KH216',
    ten: 'CÔNG TY CỔ PHẦN LICOGI13FC',
    nguoiLienHe: '',
    dienThoai: '',
    email: 'ktdt@licogi13fc.vn',
    loai: 'Tiềm năng',
    ghiChu: '',
  },
  {
    id: '20',
    ma: 'KH007',
    ten: 'CÔNG TY CỔ PHẦN SUNSHINE HOMES',
    nguoiLienHe: 'Nguyễn Phương Thảo (+1)',
    dienThoai: '0989288368',
    email: '',
    loai: 'Thân thiết',
    ghiChu: '',
  },
  {
    id: '21',
    ma: 'KH006B',
    ten: 'CÔNG TY CỔ PHẦN LIÊN TINH',
    nguoiLienHe: 'Đào Minh Thư (+1)',
    dienThoai: '0986918703',
    email: '',
    loai: 'Tiềm năng',
    ghiChu: '',
  },
  {
    id: '22',
    ma: 'KH005B',
    ten: 'CÔNG TY TNHH MTV THOÁT NƯỚC HÀ NỘI',
    nguoiLienHe: 'LẠI VĂN HIẾU',
    dienThoai: '0946645668',
    email: 'hieuhsdc@gmail.com',
    loai: 'Tiềm năng',
    ghiChu: '',
  },
  {
    id: '23',
    ma: 'KH004B',
    ten: 'WORLDBRIDGE GROUP',
    nguoiLienHe: 'Mr. Jonathan Lee',
    dienThoai: '+855 86 350 772',
    email: 'Jonathan_Lee@worldbridge.com.kh',
    loai: 'Tiềm năng',
    ghiChu: '',
  },
  {
    id: '24',
    ma: 'KH006C',
    ten: 'CÔNG TY CP - TỔNG CÔNG TY HỢP TÁC KINH TẾ VIỆT LÀO',
    nguoiLienHe: 'Thùy',
    dienThoai: '0989488114',
    email: 'thuynt@teamkinhdoanh.com',
    loai: 'Thân thiết',
    ghiChu: '',
  },
  {
    id: '25',
    ma: 'KH097',
    ten: 'CÔNG TY TNHH VIETDUTCH THẮNG LONG',
    nguoiLienHe: 'Anh Đức',
    dienThoai: '',
    email: '',
    loai: 'Tiềm năng',
    ghiChu: '',
  },
  {
    id: '26',
    ma: 'KH096',
    ten: 'TỔNG CÔNG TY MBLAND',
    nguoiLienHe: 'anh Bắc – Đại diện chủ đầu tư MBLAND',
    dienThoai: '',
    email: '',
    loai: 'Tiềm năng',
    ghiChu: '',
  },
];

type SortKey = 'ten' | 'nguoiLienHe' | 'dienThoai' | 'email' | 'loai' | 'ghiChu' | null;
type SortDir = 'asc' | 'desc';

function LoaiBadge({ loai }: { loai: LoaiKhachHang }) {
  if (loai === 'Đang giao dịch') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200 whitespace-nowrap">
        Đang giao dịch
      </span>
    );
  }
  if (loai === 'Tiềm năng') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-[#406c89] border border-sky-200 whitespace-nowrap">
        Tiềm năng
      </span>
    );
  }
  if (loai === 'Thân thiết') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 whitespace-nowrap">
        Thân thiết
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 whitespace-nowrap">
      Không hoạt động
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  const words = name.trim().split(/\s+/);
  const letter = words[words.length - 1]?.[0]?.toUpperCase() || 'C';

  return (
    <div className="w-8 h-8 rounded-full bg-sky-50 text-[#406c89] font-bold text-xs flex items-center justify-center shrink-0 border border-sky-100 shadow-2xs">
      {letter}
    </div>
  );
}

export default function KhachHangTab() {
  const [customers, setCustomers] = useState<KhachHangItem[]>(INITIAL_KHACH_HANG);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<KhachHangItem | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<KhachHangItem | null>(null);

  // Proposal / Quote / Contract Modals
  const [dxbgCustomer, setDxbgCustomer] = useState<KhachHangItem | null>(null);
  const [bgCustomer, setBgCustomer] = useState<KhachHangItem | null>(null);
  const [hdCustomer, setHdCustomer] = useState<KhachHangItem | null>(null);

  // Stats calculation
  const totalCustomers = 26;
  const dangGiaoDich = 5;
  const thanThiet = 6;

  const filtered = customers.filter(
    kh =>
      kh.ten.toLowerCase().includes(search.toLowerCase()) ||
      kh.nguoiLienHe.toLowerCase().includes(search.toLowerCase()) ||
      kh.dienThoai.includes(search) ||
      kh.ma.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const va = (a[sortKey] || '').toLowerCase();
    const vb = (b[sortKey] || '').toLowerCase();
    return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortKey, sortDir]);

  const totalFiltered = sorted.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFiltered);
  const paginatedSorted = sorted.slice(startIndex, endIndex);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const generateNextMa = () => {
    const numericCodes = customers
      .map(k => parseInt(k.ma.replace(/\D/g, ''), 10))
      .filter(n => !isNaN(n));
    const maxNum = Math.max(...numericCodes, customers.length);
    return `KH${(maxNum + 1).toString().padStart(3, '0')}`;
  };

  const handleAddSave = (newKh: Omit<KhachHangItem, 'id'>) => {
    const item: KhachHangItem = {
      ...newKh,
      id: Date.now().toString(),
    };
    setCustomers([item, ...customers]);
    setIsAddModalOpen(false);
  };

  const handleEditSave = (updated: KhachHangItem) => {
    setCustomers(customers.map(c => (c.id === updated.id ? updated : c)));
    setEditingCustomer(null);
  };

  const handleDeleteConfirm = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
    setDeletingCustomer(null);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2.5 overflow-hidden">
      {/* SUB-HEADER ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Khách hàng</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">Danh sách và thông tin khách hàng</p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => alert('Xuất danh sách khách hàng thành công (Excel)')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-md shadow-2xs transition-colors cursor-pointer"
          >
            <IconDownload size={13} className="text-slate-500" />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Vui lòng chọn file Excel để Import')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-md shadow-2xs transition-colors cursor-pointer"
          >
            <IconUpload size={13} className="text-slate-500" />
            <span>Import</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-md shadow-2xs transition-all cursor-pointer"
          >
            <IconPlus size={14} />
            <span>Thêm khách hàng</span>
          </button>
        </div>
      </div>

      {/* COMPACT STAT CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
        <div className="bg-white border border-slate-200/80 rounded-lg p-3 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Tổng khách hàng</p>
          <p className="text-xl font-black text-[#406c89] tracking-tight">{totalCustomers}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-lg p-3 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Đang giao dịch</p>
          <p className="text-xl font-black text-[#ea580c] tracking-tight">{dangGiaoDich}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-lg p-3 shadow-2xs flex flex-col justify-center min-h-[64px]">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Khách thân thiết</p>
          <p className="text-xl font-black text-[#059669] tracking-tight">{thanThiet}</p>
        </div>
      </div>

      {/* COMPACT SEARCH BAR */}
      <div className="relative shrink-0">
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Tìm theo tên, người liên hệ, SĐT..."
          className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200/80 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
        />
      </div>

      {/* CUSTOMER TABLE MATCHING SCREENSHOT EXACTLY */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[880px]">
            <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-slate-200">
              <tr className="bg-slate-50">
                <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200">
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    onClick={() => handleSort('ten')}
                  >
                    <span>Tên công ty</span>
                    <span className="text-slate-400 text-[10px]">↕</span>
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200">
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    onClick={() => handleSort('nguoiLienHe')}
                  >
                    <span>Người liên hệ</span>
                    <span className="text-slate-400 text-[10px]">↕</span>
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200">
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    onClick={() => handleSort('dienThoai')}
                  >
                    <span>Điện thoại</span>
                    <span className="text-slate-400 text-[10px]">↕</span>
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200">
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    onClick={() => handleSort('email')}
                  >
                    <span>Email</span>
                    <span className="text-slate-400 text-[10px]">↕</span>
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200">
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    onClick={() => handleSort('loai')}
                  >
                    <span>Loại</span>
                    <span className="text-slate-400 text-[10px]">↕</span>
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-xs bg-slate-50 border-b border-slate-200">
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer font-bold"
                    onClick={() => handleSort('ghiChu')}
                  >
                    <span>Ghi chú</span>
                    <span className="text-slate-400 text-[10px]">↕</span>
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-xs text-right bg-slate-50 border-b border-slate-200">
                  Loại và thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedSorted.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    <p className="font-semibold text-xs">Không tìm thấy khách hàng nào</p>
                  </td>
                </tr>
              ) : (
                paginatedSorted.map(kh => (
                  <tr key={kh.id} className="hover:bg-slate-50/70 transition-colors group">
                    {/* Tên công ty + Edit/Delete inline buttons */}
                    <td className="px-4 py-3.5 align-middle">
                      <div className="flex items-center gap-3">
                        <Avatar name={kh.ten} />
                        <div className="min-w-0 max-w-[220px]">
                          <p className="font-bold text-[#406c89] hover:underline cursor-pointer leading-snug text-xs">
                            {kh.ten}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{kh.ma}</p>
                        </div>
                        {/* Edit & Delete Buttons inline next to Company Name */}
                        <div className="flex items-center gap-1 ml-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => setEditingCustomer(kh)}
                            className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                            title="Chỉnh sửa"
                          >
                            <IconEdit size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingCustomer(kh)}
                            className="p-1.5 rounded border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Xoá"
                          >
                            <IconTrash size={13} />
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Người liên hệ */}
                    <td className="px-4 py-3.5 align-middle font-medium text-slate-600 text-xs">
                      {kh.nguoiLienHe || '—'}
                    </td>

                    {/* Điện thoại */}
                    <td className="px-4 py-3.5 align-middle font-semibold text-slate-600 text-xs">
                      {kh.dienThoai ? (
                        <span className="flex items-center gap-1">
                          <IconPhone size={13} className="text-slate-400 shrink-0" />
                          <span>{kh.dienThoai}</span>
                        </span>
                      ) : (
                        <span className="text-slate-300 font-normal">—</span>
                      )}
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3.5 align-middle font-medium text-slate-500 text-xs">
                      {kh.email || <span className="text-slate-300 font-normal">—</span>}
                    </td>

                    {/* Loại Badge */}
                    <td className="px-4 py-3.5 align-middle">
                      <LoaiBadge loai={kh.loai} />
                    </td>

                    {/* Ghi chú */}
                    <td className="px-4 py-3.5 align-middle text-slate-400 text-xs truncate max-w-[120px]">
                      {kh.ghiChu || '—'}
                    </td>

                    {/* THAO TÁC (3 Action Buttons Row) */}
                    <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                      <div className="flex flex-row items-center justify-end gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setDxbgCustomer(kh)}
                          className="py-1 px-2.5 rounded-md border border-sky-200 text-[#406c89] hover:bg-sky-50 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors bg-white cursor-pointer shadow-2xs whitespace-nowrap"
                        >
                          <IconFileDescription size={12} />
                          <span>Lập ĐXBG</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setBgCustomer(kh)}
                          className="py-1 px-2.5 rounded-md border border-sky-200 text-[#406c89] hover:bg-sky-50 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors bg-white cursor-pointer shadow-2xs whitespace-nowrap"
                        >
                          <IconFileText size={12} />
                          <span>Lập BG</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setHdCustomer(kh)}
                          className="py-1 px-2.5 rounded-md border border-emerald-200 text-emerald-600 hover:bg-emerald-50 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors bg-white cursor-pointer shadow-2xs whitespace-nowrap"
                        >
                          <IconSignature size={12} />
                          <span>Lập HĐ</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div>
            Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalFiltered}</span> khách hàng
          </div>

          {/* Page Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <IconChevronLeft size={13} />
              <span>Trước</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#406c89] text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Sau</span>
              <IconChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {isAddModalOpen && (
        <ThemKhachHangModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddSave}
          suggestedMa={generateNextMa()}
        />
      )}

      {editingCustomer && (
        <SuaKhachHangModal
          isOpen={!!editingCustomer}
          onClose={() => setEditingCustomer(null)}
          onSave={handleEditSave}
          customer={editingCustomer}
        />
      )}

      {deletingCustomer && (
        <XoaKhachHangModal
          isOpen={!!deletingCustomer}
          onClose={() => setDeletingCustomer(null)}
          onConfirm={() => handleDeleteConfirm(deletingCustomer.id)}
          customerName={deletingCustomer.ten}
        />
      )}

      {/* LẬP ĐXBG MODAL */}
      {dxbgCustomer && (
        <LapDxbgModal
          isOpen={!!dxbgCustomer}
          onClose={() => setDxbgCustomer(null)}
          onSave={(data) => {
            alert(`Lập ĐXBG thành công cho ${dxbgCustomer.ten}`);
            setDxbgCustomer(null);
          }}
          customer={dxbgCustomer}
          customers={customers}
        />
      )}

      {/* LẬP BG MODAL */}
      {bgCustomer && (
        <LapBgModal
          isOpen={!!bgCustomer}
          onClose={() => setBgCustomer(null)}
          onSave={(data) => {
            alert(`Lập Báo giá thành công cho ${bgCustomer.ten}`);
            setBgCustomer(null);
          }}
          customer={bgCustomer}
          customers={customers}
        />
      )}

      {/* LẬP HĐ MODAL */}
      {hdCustomer && (
        <LapHdModal
          isOpen={!!hdCustomer}
          onClose={() => setHdCustomer(null)}
          onSave={(data) => {
            alert(`Lập Hợp đồng thành công cho ${hdCustomer.ten}`);
            setHdCustomer(null);
          }}
          customer={hdCustomer}
          customers={customers}
        />
      )}
    </div>
  );
}
