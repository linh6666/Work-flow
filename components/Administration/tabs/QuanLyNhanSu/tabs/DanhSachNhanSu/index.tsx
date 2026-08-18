"use client";

import React, { useState, useMemo, useRef } from 'react';
import XoaNhanSuModal, { XoaNhanSuRef } from './modal/XoaNhanSu';
import {
  IconSearch,
  IconDownload,
  IconUpload,
  IconPlus,
  IconPencil,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconX,
  IconUser,
} from '@tabler/icons-react';

// ─── Data Types ───────────────────────────────────────────────────────
export interface NhanSuItem {
  id: string;
  maNV: string;
  hoTen: string;
  avatar?: string;
  phongBan: string;
  chucVu: string;
  bacLuong: string;
  mucLuongCung: number;
  mucLuongMem: number;
  tongTroCap: number;
  thoiDiemTangLuong: string;
  thoiDiemTangBacBacLuongDuKien: string;
  ghiChu: string;
}

export const formatVND = (n: number) =>
  n === 0 ? '0' : n.toLocaleString('vi-VN');

// ─── Mock Data ────────────────────────────────────────────────────────
const INITIAL_DATA: NhanSuItem[] = [
  { id: '1', maNV: 'NV001', hoTen: 'Bùi Thị Duyên',        phongBan: 'Phòng Kinh doanh',             chucVu: 'Trưởng phòng Kinh doanh',        bacLuong: 'Bậc 5',    mucLuongCung: 6500000, mucLuongMem: 5000000, tongTroCap: 500000,  thoiDiemTangLuong: '03/2024', thoiDiemTangBacBacLuongDuKien: '03/2025 — Bậc 6', ghiChu: '' },
  { id: '2', maNV: 'NV002', hoTen: 'Nguyễn Phú Quang',    phongBan: 'Phòng Khai triển',             chucVu: 'Trưởng phòng Khai triển',        bacLuong: 'Bậc 6',    mucLuongCung: 7000000, mucLuongMem: 5500000, tongTroCap: 800000,  thoiDiemTangLuong: '08/2024', thoiDiemTangBacBacLuongDuKien: '08/2025 — Bậc 7', ghiChu: '' },
  { id: '3', maNV: 'NV003', hoTen: 'Kỳ Anh',               phongBan: 'Phòng Cảnh Quan',              chucVu: 'Chuyên viên Cảnh quan',          bacLuong: 'Bậc 3',    mucLuongCung: 4500000, mucLuongMem: 3000000, tongTroCap: 0,       thoiDiemTangLuong: '01/2025', thoiDiemTangBacBacLuongDuKien: '01/2026 — Bậc 4', ghiChu: '' },
  { id: '4', maNV: 'NV004', hoTen: 'Bùi Phương Uyên',     phongBan: 'Phòng Điện',                   chucVu: 'Kỹ sư Điện & Chiếu sáng',       bacLuong: 'Bậc 4',    mucLuongCung: 5000000, mucLuongMem: 4000000, tongTroCap: 300000,  thoiDiemTangLuong: '11/2024', thoiDiemTangBacBacLuongDuKien: '11/2025 — Bậc 5', ghiChu: '' },
  { id: '5', maNV: 'NV005', hoTen: 'Thao Phung',           phongBan: 'Phòng Mộc Sơn',                chucVu: 'KTV Sơn hoàn thiện',             bacLuong: 'Thử việc', mucLuongCung: 3120000, mucLuongMem: 3120000, tongTroCap: 0,       thoiDiemTangLuong: '—',       thoiDiemTangBacBacLuongDuKien: '05/2025 — Bậc 1', ghiChu: 'Đang thử việc' },
  { id: '6', maNV: 'NV006', hoTen: 'Lê Hoàng Long',        phongBan: 'Phòng Cắt',                    chucVu: 'KTV Laser & CNC',                bacLuong: 'Bậc 2',    mucLuongCung: 4000000, mucLuongMem: 3000000, tongTroCap: 0,       thoiDiemTangLuong: '06/2024', thoiDiemTangBacBacLuongDuKien: '06/2025 — Bậc 3', ghiChu: '' },
  { id: '7', maNV: 'NV007', hoTen: 'Trần Văn Mạnh',        phongBan: 'Lắp đặt',                      chucVu: 'Đội trưởng Lắp đặt',             bacLuong: 'Bậc 5',    mucLuongCung: 6000000, mucLuongMem: 4500000, tongTroCap: 1000000, thoiDiemTangLuong: '10/2024', thoiDiemTangBacBacLuongDuKien: '10/2025 — Bậc 6', ghiChu: '' },
  { id: '8', maNV: 'NV008', hoTen: 'Phạm Minh Trang',      phongBan: 'Phòng Công nghệ và Thiết kế',  chucVu: 'Kiến trúc sư 3D',                bacLuong: 'Thử việc', mucLuongCung: 3120000, mucLuongMem: 3120000, tongTroCap: 0,       thoiDiemTangLuong: '—',       thoiDiemTangBacBacLuongDuKien: '06/2025 — Bậc 1', ghiChu: 'Đang thử việc' },
];

export const PHONG_BAN_LIST = [
  'Phòng Kinh doanh',
  'Phòng Khai triển',
  'Phòng Cắt',
  'Phòng Ghép',
  'Phòng Mộc Sơn',
  'Phòng Điện',
  'Phòng Cảnh Quan',
  'Phòng Công nghệ và Thiết kế',
  'Lắp đặt',
  'Kế toán & Hành chính',
];

export const BAC_LUONG_LIST = ['Thử việc', 'Bậc 1', 'Bậc 2', 'Bậc 3', 'Bậc 4', 'Bậc 5', 'Bậc 6', 'Bậc 7'];

export default function DanhSachNhanSuTab() {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const xoaRef = useRef<XoaNhanSuRef>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = tableContainerRef.current?.scrollLeft ?? 0;
    if (tableContainerRef.current) tableContainerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft = scrollStart.current - delta;
    }
  };

  const stopDrag = () => {
    isDragging.current = false;
    if (tableContainerRef.current) tableContainerRef.current.style.cursor = 'default';
  };

  const [data, setData] = useState<NhanSuItem[]>(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [filterPhongBan, setFilterPhongBan] = useState('ALL');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NhanSuItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<NhanSuItem>>({
    maNV: '',
    hoTen: '',
    phongBan: PHONG_BAN_LIST[0],
    chucVu: '',
    bacLuong: BAC_LUONG_LIST[0],
    mucLuongCung: 0,
    mucLuongMem: 0,
    tongTroCap: 0,
    thoiDiemTangLuong: '',
    thoiDiemTangBacBacLuongDuKien: '',
    ghiChu: '',
  });

  // Filtered data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.hoTen.toLowerCase().includes(q) ||
        item.maNV.toLowerCase().includes(q) ||
        item.phongBan.toLowerCase().includes(q) ||
        item.chucVu.toLowerCase().includes(q) ||
        item.bacLuong.toLowerCase().includes(q);

      const matchPB = filterPhongBan === 'ALL' || item.phongBan === filterPhongBan;

      return matchSearch && matchPB;
    });
  }, [data, search, filterPhongBan]);

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRecords);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset page when filtering
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  // Add / Edit Handlers
  const handleOpenAdd = () => {
    const nextNum = (data.length + 1).toString().padStart(3, '0');
    setFormData({
      maNV: `NV${nextNum}`,
      hoTen: '',
      phongBan: PHONG_BAN_LIST[0],
      chucVu: '',
      bacLuong: BAC_LUONG_LIST[0],
      mucLuongCung: 0,
      mucLuongMem: 0,
      tongTroCap: 0,
      thoiDiemTangLuong: '',
      thoiDiemTangBacBacLuongDuKien: '',
      ghiChu: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item: NhanSuItem) => {
    setEditingItem(item);
    setFormData({ ...item });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hoTen || !formData.maNV) {
      alert('Vui lòng nhập đầy đủ Mã NV và Họ tên!');
      return;
    }

    if (editingItem) {
      setData((prev) =>
        prev.map((item) => (item.id === editingItem.id ? ({ ...item, ...formData } as NhanSuItem) : item))
      );
      setEditingItem(null);
    } else {
      const newItem: NhanSuItem = {
        ...(formData as NhanSuItem),
        id: Date.now().toString(),
      };
      setData((prev) => [newItem, ...prev]);
      setIsAddModalOpen(false);
    }
  };



  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      {/* ── Top Toolbar (Matched to design image) ── */}
      <div className="px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 shrink-0">
        {/* Search Input */}
        <div className="relative w-full sm:w-[360px] md:w-[420px]">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên, mã NV, phòng ban, chức vụ..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all shadow-2xs"
          />
        </div>

        {/* Action Buttons: Export, Import, + Thêm */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => alert('Xuất danh sách nhân sự sang Excel thành công!')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <IconDownload size={14} className="text-slate-600" />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Chức năng Import danh sách nhân sự')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <IconUpload size={14} className="text-slate-600" />
            <span>Import</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            style={{ backgroundColor: '#406c89' }}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold text-white rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#30536b')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#406c89')}
          >
            <IconPlus size={15} />
            <span>Thêm</span>
          </button>
        </div>
      </div>

      {/* ── Table Container ── */}
      <div className="flex-1 min-h-0 px-5 py-3 flex flex-col">
        <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
          {/* Table */}
          <div
            ref={tableContainerRef}
            className="flex-1 overflow-auto min-h-0 no-scrollbar"
            style={{ cursor: 'default', userSelect: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          >
            <table className="min-w-max w-full text-xs text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 shadow-2xs">
                <tr>
                  <th className="px-4 py-3 font-bold text-slate-500 text-xs whitespace-nowrap">STT</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Họ và tên</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Bậc lương</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Mã nhân viên</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Chức vụ</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Phòng ban</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Mức lương cứng</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Mức lương mềm</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Tổng mức lương cơ bản</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Tổng trợ cấp</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Tổng thu nhập</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Thời điểm tăng lương</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Thời điểm tăng bậc & bậc lương dự kiến</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Ghi chú</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs text-right whitespace-nowrap">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={15} className="text-center py-12 text-slate-400">
                      <IconUser size={36} className="mx-auto mb-2 text-slate-300 stroke-1" />
                      <p className="font-semibold text-xs text-slate-600">Không tìm thấy nhân sự phù hợp</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Thử thay đổi từ khóa tìm kiếm</p>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, idx) => {
                    const tongCoBan = item.mucLuongCung + item.mucLuongMem;
                    const tongThuNhap = tongCoBan + item.tongTroCap;
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                        {/* STT */}
                        <td className="px-4 py-3.5 align-middle text-slate-400 font-medium whitespace-nowrap">
                          {startIndex + idx + 1}
                        </td>

                        {/* Họ và tên */}
                        <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0 border border-indigo-100">
                              {item.hoTen.charAt(0)}
                            </div>
                            <span className="font-bold text-slate-800 text-xs">{item.hoTen}</span>
                          </div>
                        </td>

                        {/* Bậc lương */}
                        <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                            {item.bacLuong}
                          </span>
                        </td>

                        {/* Mã NV */}
                        <td className="px-4 py-3.5 align-middle whitespace-nowrap font-bold text-slate-700">
                          {item.maNV}
                        </td>

                        {/* Chức vụ */}
                        <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">
                          {item.chucVu}
                        </td>

                        {/* Phòng ban */}
                        <td className="px-4 py-3.5 align-middle text-slate-600 font-medium whitespace-nowrap">
                          {item.phongBan}
                        </td>

                        {/* Mức lương cứng */}
                        <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap font-semibold text-slate-700">
                          {formatVND(item.mucLuongCung)}
                        </td>

                        {/* Mức lương mềm */}
                        <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap font-semibold text-slate-700">
                          {formatVND(item.mucLuongMem)}
                        </td>

                        {/* Tổng mức lương cơ bản (computed) */}
                        <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap font-semibold text-slate-700">
                          {formatVND(tongCoBan)}
                        </td>

                        {/* Tổng trợ cấp */}
                        <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap text-slate-600">
                          {formatVND(item.tongTroCap)}
                        </td>

                        {/* Tổng thu nhập (computed) */}
                        <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap font-bold text-emerald-700">
                          {formatVND(tongThuNhap)}
                        </td>

                        {/* Thời điểm tăng lương */}
                        <td className="px-4 py-3.5 align-middle whitespace-nowrap text-slate-500">
                          {item.thoiDiemTangLuong || '—'}
                        </td>

                        {/* Thời điểm tăng bậc & bậc lương dự kiến */}
                        <td className="px-4 py-3.5 align-middle whitespace-nowrap text-slate-500">
                          {item.thoiDiemTangBacBacLuongDuKien || '—'}
                        </td>

                        {/* Ghi chú */}
                        <td className="px-4 py-3.5 align-middle text-slate-400 whitespace-nowrap">
                          {item.ghiChu || '—'}
                        </td>

                        {/* Thao tác */}
                        <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              title="Chỉnh sửa"
                              onClick={() => handleOpenEdit(item)}
                              className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                            >
                              <IconPencil size={13} />
                            </button>
                            <button
                              type="button"
                              title="Xóa"
                              onClick={() => xoaRef.current?.open(item)}
                              className="p-1.5 rounded border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                            >
                              <IconTrash size={13} />
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

          {/* Pagination Footer */}
          <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
            <div>
              Hiển thị <span className="font-bold text-slate-700">{totalRecords > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalRecords}</span> nhân sự
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <IconChevronLeft size={13} />
                <span>Trước</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  style={currentPage === page ? { backgroundColor: '#406c89' } : {}}
                  className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                    currentPage === page
                      ? 'text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Sau</span>
                <IconChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal Thêm / Chỉnh sửa Nhân sự ── */}
      {(isAddModalOpen || editingItem) && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-800">
                {editingItem ? 'Chỉnh sửa thông tin Nhân sự' : 'Thêm Nhân sự mới'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingItem(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <IconX size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveModal} className="p-5 space-y-3.5 text-xs max-h-[75vh] overflow-y-auto">
              {/* Row 1: Mã NV + Họ và tên */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mã NV <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.maNV || ''}
                    onChange={(e) => setFormData({ ...formData, maNV: e.target.value })}
                    className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                    placeholder="VD: NV009"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.hoTen || ''}
                    onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
                    className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                    placeholder="VD: Nguyễn Văn A"
                  />
                </div>
              </div>

              {/* Row 2: Phòng ban + Chức vụ */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phòng ban</label>
                  <select
                    value={formData.phongBan}
                    onChange={(e) => setFormData({ ...formData, phongBan: e.target.value })}
                    className="w-full h-8 px-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 bg-white"
                  >
                    {PHONG_BAN_LIST.map((pb) => (
                      <option key={pb} value={pb}>{pb}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Chức vụ</label>
                  <input
                    type="text"
                    value={formData.chucVu || ''}
                    onChange={(e) => setFormData({ ...formData, chucVu: e.target.value })}
                    className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                    placeholder="VD: Kỹ thuật viên"
                  />
                </div>
              </div>

              {/* Row 3: Bậc lương */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bậc lương</label>
                <select
                  value={formData.bacLuong}
                  onChange={(e) => setFormData({ ...formData, bacLuong: e.target.value })}
                  className="w-full h-8 px-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 bg-white"
                >
                  {BAC_LUONG_LIST.map((bl) => (
                    <option key={bl} value={bl}>{bl}</option>
                  ))}
                </select>
              </div>

              {/* Row 4: Mức lương cứng + Mức lương mềm */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mức lương cứng (VNĐ)</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.mucLuongCung ?? 0}
                    onChange={(e) => setFormData({ ...formData, mucLuongCung: Number(e.target.value) })}
                    className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mức lương mềm (VNĐ)</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.mucLuongMem ?? 0}
                    onChange={(e) => setFormData({ ...formData, mucLuongMem: Number(e.target.value) })}
                    className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              {/* Row 5: Tổng mức lương cơ bản (computed, readonly) + Tổng trợ cấp */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tổng mức lương cơ bản</label>
                  <div className="h-8 px-2.5 border border-slate-100 bg-slate-50 rounded-lg flex items-center font-semibold text-slate-600">
                    {formatVND((formData.mucLuongCung ?? 0) + (formData.mucLuongMem ?? 0))}
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tổng trợ cấp (VNĐ)</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.tongTroCap ?? 0}
                    onChange={(e) => setFormData({ ...formData, tongTroCap: Number(e.target.value) })}
                    className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              {/* Row 6: Tổng thu nhập (computed, readonly) */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tổng thu nhập</label>
                <div className="h-8 px-2.5 border border-emerald-100 bg-emerald-50 rounded-lg flex items-center font-bold text-emerald-700">
                  {formatVND((formData.mucLuongCung ?? 0) + (formData.mucLuongMem ?? 0) + (formData.tongTroCap ?? 0))}
                </div>
              </div>

              {/* Row 7: Thời điểm tăng lương + Thời điểm tăng bậc */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Thời điểm tăng lương</label>
                  <input
                    type="text"
                    value={formData.thoiDiemTangLuong || ''}
                    onChange={(e) => setFormData({ ...formData, thoiDiemTangLuong: e.target.value })}
                    className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                    placeholder="VD: 03/2025"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tăng bậc & bậc lương dự kiến</label>
                  <input
                    type="text"
                    value={formData.thoiDiemTangBacBacLuongDuKien || ''}
                    onChange={(e) => setFormData({ ...formData, thoiDiemTangBacBacLuongDuKien: e.target.value })}
                    className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                    placeholder="VD: 03/2026 — Bậc 6"
                  />
                </div>
              </div>

              {/* Row 8: Ghi chú */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ghi chú</label>
                <input
                  type="text"
                  value={formData.ghiChu || ''}
                  onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
                  className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                  placeholder="Ghi chú thêm..."
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: '#406c89' }}
                  className="px-4 py-1.5 rounded-lg text-white font-bold shadow-sm cursor-pointer transition"
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#30536b')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#406c89')}
                >
                  {editingItem ? 'Lưu thay đổi' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal Xóa Nhân sự ── */}
      <XoaNhanSuModal ref={xoaRef} setData={setData} />
    </div>
  );
}
