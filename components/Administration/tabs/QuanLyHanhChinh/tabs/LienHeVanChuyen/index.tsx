"use client";

import React, { useState } from 'react';
import {
  IconSearch,
  IconPlus,
  IconPencil,
  IconTrash,
  IconSelector,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';

import TaoLienHeModal from './modal/TaoLienHeModal';

/* ─── Data Interface ────────────────────────────────────────────── */
interface TransportContact {
  id: string;
  stt: number;
  phuongThuc: string;
  donVi: string;
  nguoiLienHe: string;
  sdt: string[];
  email: string;
}

/* ─── Mock Data matching design ────────────────────────────────── */
const mockData: TransportContact[] = [
  {
    id: 'lh-1',
    stt: 1,
    phuongThuc: 'Chuyến hàng không/đường bộ',
    donVi: 'Nasco',
    nguoiLienHe: 'Anh Võ Tá Nam',
    sdt: ['0904 998845', '0838355333'],
    email: 'Võ Tá Nam <namvt@nascoexpress.com>',
  },
  {
    id: 'lh-2',
    stt: 2,
    phuongThuc: 'Chuyến hàng không/đường bộ',
    donVi: 'Nasco',
    nguoiLienHe: 'Anh Bùi Minh Thiện',
    sdt: ['0986 118 447'],
    email: 'Bùi Minh Thiện <thienbm@nascoexpress.com>',
  },
  {
    id: 'lh-3',
    stt: 3,
    phuongThuc: 'Chuyến hàng đường bộ (đi ghép hàng hoặc nguyên chuyến)',
    donVi: 'Vận tải Toàn Nhất',
    nguoiLienHe: 'Em Nhân',
    sdt: ['0901.325.696'],
    email: 'Nhan Phan <nhan.toannhat@gmail.com>',
  },
  {
    id: 'lh-4',
    stt: 4,
    phuongThuc: 'Chuyến hàng nội thành',
    donVi: 'Vận tải 24h',
    nguoiLienHe: 'Anh Ngọ',
    sdt: ['0962242424'],
    email: '',
  },
  {
    id: 'lh-5',
    stt: 5,
    phuongThuc: '',
    donVi: 'Vận tải 24h',
    nguoiLienHe: 'Kế toán',
    sdt: ['0934500713'],
    email: '',
  },
  {
    id: 'lh-6',
    stt: 6,
    phuongThuc: 'Chuyến hàng đường bộ (đi nguyên chuyến)',
    donVi: 'Tư nhân',
    nguoiLienHe: 'Anh Chí',
    sdt: ['0912064796'],
    email: '',
  },
];

/* ─── Component ───────────────────────────────────────────────── */
export default function LienHeVanChuyenTab() {
  const [dataList, setDataList] = useState<TransportContact[]>(mockData);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter logic
  const filteredData = dataList.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.donVi.toLowerCase().includes(query) ||
      item.nguoiLienHe.toLowerCase().includes(query) ||
      item.phuongThuc.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.sdt.some((phone) => phone.includes(query))
    );
  });

  // Pagination logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleAddSubmit = (newContact: TransportContact) => {
    setDataList((prev) => [
      { ...newContact, stt: prev.length + 1 },
      ...prev,
    ]);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden gap-3 bg-slate-50 p-1">
      {/* ── Top Bar Controls ── */}
      <div className="flex items-center justify-between gap-3 shrink-0">
        {/* Left: Search Box */}
        <div className="relative flex-1 max-w-xl">
          <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Tìm theo đơn vị, người liên hệ, SĐT..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>

        {/* Right: Create Button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 px-3.5 py-1.5 bg-[#406c89] text-white text-xs font-semibold rounded-lg hover:bg-[#345870] transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
        >
          <IconPlus size={14} />
          <span>Tạo mới</span>
        </button>
      </div>

      {/* ── Table Container Card ── */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col overflow-hidden">
        
        {/* Banner Section Header */}
        <div className="bg-[#ebf4f8] px-4 py-2.5 border-b border-slate-200/80 shrink-0">
          <h3 className="text-[12px] font-extrabold text-slate-800 uppercase tracking-tight">
            BẢNG THÔNG TIN LIÊN HỆ CỦA MỘT SỐ ĐƠN VỊ VẬN CHUYỂN HÀNG HÓA
          </h3>
        </div>

        {/* Table Content */}
        <div className="overflow-auto flex-1">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-[#406c89] text-white sticky top-0 z-10">
              <tr>
                <th className="py-2.5 px-4 font-semibold text-center w-12 border-r border-[#406c89]/40">
                  STT
                </th>
                <th className="py-2.5 px-4 font-semibold text-center whitespace-nowrap w-24 border-r border-[#406c89]/40">
                  Thao tác
                </th>
                <th className="py-2.5 px-4 font-semibold whitespace-nowrap border-r border-[#406c89]/40">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>Phương thức chuyển hàng</span>
                    <IconSelector size={13} className="text-white/70" />
                  </div>
                </th>
                <th className="py-2.5 px-4 font-semibold whitespace-nowrap border-r border-[#406c89]/40">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>Đơn vị vận chuyển</span>
                    <IconSelector size={13} className="text-white/70" />
                  </div>
                </th>
                <th className="py-2.5 px-4 font-semibold whitespace-nowrap border-r border-[#406c89]/40">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>Người liên hệ</span>
                    <IconSelector size={13} className="text-white/70" />
                  </div>
                </th>
                <th className="py-2.5 px-4 font-semibold whitespace-nowrap border-r border-[#406c89]/40">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>SĐT</span>
                    <IconSelector size={13} className="text-white/70" />
                  </div>
                </th>
                <th className="py-2.5 px-4 font-semibold whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>Email</span>
                    <IconSelector size={13} className="text-white/70" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  {/* STT */}
                  <td className="py-3 px-4 text-center text-slate-500 font-medium whitespace-nowrap">
                    {row.stt}
                  </td>

                  {/* Thao tác */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="text-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer"
                        title="Thêm"
                      >
                        <IconPlus size={15} className="stroke-[2.5]" />
                      </button>
                      <button
                        type="button"
                        className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        title="Sửa"
                      >
                        <IconPencil size={15} />
                      </button>
                      <button
                        type="button"
                        className="text-rose-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Xóa"
                      >
                        <IconTrash size={15} />
                      </button>
                    </div>
                  </td>

                  {/* Phương thức chuyển hàng */}
                  <td className="py-3 px-4 text-slate-700">
                    {row.phuongThuc}
                  </td>

                  {/* Đơn vị vận chuyển */}
                  <td className="py-3 px-4 font-bold text-slate-800 whitespace-nowrap">
                    {row.donVi}
                  </td>

                  {/* Người liên hệ */}
                  <td className="py-3 px-4 text-slate-700 font-medium whitespace-nowrap">
                    {row.nguoiLienHe}
                  </td>

                  {/* SĐT */}
                  <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                    <div className="flex flex-col">
                      {row.sdt.map((phone, idx) => (
                        <span key={idx}>{phone}</span>
                      ))}
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                    {row.email}
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Không tìm thấy dữ liệu liên hệ phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Bottom Pagination Bar ── */}
        <div className="shrink-0 z-10 bg-white border-t border-slate-200/90 px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs select-none">
          <div className="flex items-center gap-3 text-slate-500 font-medium text-xs">
            <div>
              Hiển thị{' '}
              <span className="font-bold text-slate-800">
                {totalItems > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + pageSize, totalItems)}
              </span>{' '}
              trên <span className="font-bold text-slate-800">{totalItems}</span> bản ghi
            </div>
            <div className="flex items-center gap-1.5 ml-2 border-l border-slate-200 pl-3">
              <span>Hiển thị:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value={5}>5 bản ghi</option>
                <option value={10}>10 bản ghi</option>
                <option value={20}>20 bản ghi</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-lg border transition-all ${
                currentPage === 1
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
              }`}
              title="Trang trước"
            >
              <IconChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                  currentPage === pageNum
                    ? 'bg-[#406c89] text-white shadow-2xs font-bold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-lg border transition-all ${
                currentPage === totalPages
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
              }`}
              title="Trang sau"
            >
              <IconChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Modal thêm liên hệ mới ── */}
      <TaoLienHeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={handleAddSubmit}
      />
    </div>
  );
}

