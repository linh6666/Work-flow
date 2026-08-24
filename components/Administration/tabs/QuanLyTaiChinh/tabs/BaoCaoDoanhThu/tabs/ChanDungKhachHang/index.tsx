"use client";

import React, { useState, useEffect } from 'react';
import {
  IconDownload,
  IconUpload,
  IconFileText,
  IconPlus,
  IconPencil,
  IconTrash,
  IconX,
  IconUser,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';

interface ChanDungKhachHangProps {
  selectedNam?: string;
}

interface KhachHangChanDungItem {
  id: string;
  maKH: string;
  tenKH: string;
  congTyHopTac: string;
  ckApDung: string;
  ckCapNhat: string;
  baoHanh: string;
  damPhanGia: string;
  loaiKH: 'Tiềm năng' | 'Thân thiết' | 'Đang giao dịch' | 'Không hoạt động';
}

const SAMPLE_DATA: KhachHangChanDungItem[] = [
  { id: '1', maKH: 'KH039', tenKH: 'CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ XÂY DỰNG S...', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '2', maKH: 'KH038', tenKH: 'CÔNG TY CP ĐẦU TƯ BĐS HƯNG LỘC PHÁT', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '3', maKH: 'KH258', tenKH: 'MAYD Group', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '4', maKH: 'KH036', tenKH: 'TẬP ĐOÀN BOLT HODINGS', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '5', maKH: 'KH035', tenKH: 'CÔNG TY CỔ PHẦN PHÁT TRIỂN BẤT ĐỘNG S...', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '6', maKH: 'KH257', tenKH: 'CÔNG TY TNHH PHÁT TRIỂN PHÚ MỸ HƯNG', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '7', maKH: 'KH256', tenKH: 'CÔNG TY CỔ PHẦN UNIK XANH', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '8', maKH: 'KH255', tenKH: 'CÔNG TY TNHH INDOCHINA KAJIMA DEVELO...', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Thân thiết' },
  { id: '9', maKH: 'KH231', tenKH: 'LAYAN BEST VIEW COMPANY LIMITED', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Thân thiết' },
  { id: '10', maKH: 'KH030', tenKH: 'CÔNG TY CỔ PHẦN PHÁT TRIỂN HẠ TẦNG VĨ...', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '11', maKH: 'KH029', tenKH: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN MIK GROUP VI...', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '12', maKH: 'KH254', tenKH: 'CHI NHÁNH CÔNG TY TNHH GIA LẠC - TORI I...', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '13', maKH: 'KH027', tenKH: 'CSM Design Build Inc.', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '14', maKH: 'KH253', tenKH: 'CÔNG TY CỔ PHẦN THƯƠNG MẠI DƯƠNG PH...', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Đang giao dịch' },
  { id: '15', maKH: 'KH251', tenKH: 'CÔNG TY CỔ PHẦN THÁI NAM LAND', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Đang giao dịch' },
  { id: '16', maKH: 'KH024', tenKH: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN ECOPARK', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Thân thiết' },
  { id: '17', maKH: 'KH250', tenKH: 'CÔNG TY CỔ PHẦN ĐẦU TƯ PHÁT TRIỂN ĐÔ ...', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Đang giao dịch' },
  { id: '18', maKH: 'KH021', tenKH: 'CÔNG TY TNHH BIM KIÊN GIANG', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Thân thiết' },
  { id: '19', maKH: 'KH240', tenKH: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN T&T', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '20', maKH: 'KH238', tenKH: 'CÔNG TY TNHH DAEWOO ENGINEERING & CO...', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '21', maKH: 'KH002', tenKH: 'BAN QUẢN LÝ DỰ ÁN ĐẦU TƯ XÂY DỰNG NHÀ...', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Không hoạt động' },
  { id: '22', maKH: 'KH001', tenKH: 'AAVA ISLE LIMITED', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Không hoạt động' },
  { id: '23', maKH: 'KH005', tenKH: 'CÔNG TY CP MỸ THUẬT VÀ XÂY DỰNG VIỆT ...', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '24', maKH: 'KH004', tenKH: 'BAN QUẢN LÝ KHU KINH TẾ NGHI SƠN', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '25', maKH: 'KH003', tenKH: 'BAN QUẢN LÝ SỞ QUY HOẠCH KIẾN TRÚC HÀ...', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '26', maKH: 'KH253', tenKH: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN ĐẤT VIỆT', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '27', maKH: 'KH223', tenKH: 'CÔNG TY TNHH VSIP LẠNG SƠN', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Đang giao dịch' },
  { id: '28', maKH: 'KH245', tenKH: 'CÔNG TY TNHH ĐẦU TƯ VÀ KINH DOANH BẤ...', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Đang giao dịch' },
  { id: '29', maKH: 'KH249', tenKH: 'CÔNG TY CỔ PHẦN ĐẦU TƯ KINH DOANH BĐ...', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Thân thiết' },
  { id: '30', maKH: 'KH251', tenKH: 'CÔNG TY CỔ PHẦN THÁI NAM LAND', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Đang giao dịch' },
  { id: '31', maKH: 'KH191', tenKH: 'CÔNG TY CỔ PHẦN CLOUD PROPERTY', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Thân thiết' },
  { id: '32', maKH: 'KH216', tenKH: 'CÔNG TY CỔ PHẦN LICOGI13FC', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '33', maKH: 'KH007', tenKH: 'CÔNG TY CỔ PHẦN SUNSHINE HOMES', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Thân thiết' },
  { id: '34', maKH: 'KH006', tenKH: 'CÔNG TY CỔ PHẦN LIÊN TINH', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '35', maKH: 'KH005', tenKH: 'CÔNG TY TNHH MTV THOÁT NƯỚC HÀ NỘI', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '36', maKH: 'KH004', tenKH: 'WORLDBRIDGE GROUP', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '37', maKH: 'KH006', tenKH: 'CÔNG TY CP - TỔNG CÔNG TY HỢP TÁC KIN...', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Thân thiết' },
  { id: '38', maKH: 'KH097', tenKH: 'CÔNG TY TNHH VIETDUTCH THĂNG LONG', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
  { id: '39', maKH: 'KH096', tenKH: 'TỔNG CÔNG TY MBLAND', congTyHopTac: '—', ckApDung: '—', ckCapNhat: '—', baoHanh: '—', damPhanGia: '—', loaiKH: 'Tiềm năng' },
];

export default function ChanDungKhachHang({ selectedNam = '2026' }: ChanDungKhachHangProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dataList, setDataList] = useState<KhachHangChanDungItem[]>(SAMPLE_DATA);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<KhachHangChanDungItem | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // New KH form state
  const [newKH, setNewKH] = useState({
    maKH: '',
    tenKH: '',
    congTyHopTac: '—',
    ckApDung: '—',
    ckCapNhat: '—',
    baoHanh: '—',
    damPhanGia: '—',
    loaiKH: 'Tiềm năng' as KhachHangChanDungItem['loaiKH'],
  });

  const handleAddKH = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKH.tenKH) return;

    const item: KhachHangChanDungItem = {
      id: `kh-${Date.now()}`,
      maKH: newKH.maKH || `KH${(dataList.length + 1).toString().padStart(3, '0')}`,
      tenKH: newKH.tenKH,
      congTyHopTac: newKH.congTyHopTac || '—',
      ckApDung: newKH.ckApDung || '—',
      ckCapNhat: newKH.ckCapNhat || '—',
      baoHanh: newKH.baoHanh || '—',
      damPhanGia: newKH.damPhanGia || '—',
      loaiKH: newKH.loaiKH,
    };

    setDataList([item, ...dataList]);
    setNewKH({
      maKH: '',
      tenKH: '',
      congTyHopTac: '—',
      ckApDung: '—',
      ckCapNhat: '—',
      baoHanh: '—',
      damPhanGia: '—',
      loaiKH: 'Tiềm năng',
    });
    setShowAddModal(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setDataList(dataList.map((item) => (item.id === editingItem.id ? editingItem : item)));
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    setDataList(dataList.filter((item) => item.id !== id));
  };

  const filteredData = dataList.filter(
    (item) =>
      item.maKH.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tenKH.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.loaiKH.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalFiltered = filteredData.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFiltered);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2.5 text-slate-700">
      {/* ── Toolbar: Search on left & Actions on right ── */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 shrink-0">
        {/* Left Search Input */}
        <div className="w-72 sm:w-80">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm theo mã/tên/công ty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200/90 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#406c89] shadow-2xs transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <IconX size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
          >
            <IconDownload size={13} className="text-slate-500" />
            <span>Export</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
          >
            <IconUpload size={13} className="text-slate-500" />
            <span>Import</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
          >
            <IconFileText size={13} className="text-slate-500" />
            <span>Mẫu</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 px-3 py-1 bg-[#3e566d] hover:bg-[#324557] text-white text-[11px] font-bold rounded-lg shadow-2xs transition-all cursor-pointer"
          >
            <IconPlus size={13} />
            <span>Thêm KH</span>
          </button>
        </div>
      </div>

      {/* ── Table Container ── */}
      <div className="flex-1 bg-white border border-slate-200/90 rounded-xl shadow-2xs overflow-hidden flex flex-col min-h-0">
        {/* Table Title */}
        <div className="p-3.5 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
          <h3 className="text-xs font-bold text-slate-800">
            Chân dung khách hàng (CHAN DUNG KHACH HANG) — {totalFiltered} KH
          </h3>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-xs text-slate-500 font-semibold border-b border-slate-200/80 select-none">
              <tr>
                <th className="py-2.5 px-3 font-semibold text-slate-500">Mã KH</th>
                <th className="py-2.5 px-3 font-semibold text-slate-500">Tên khách hàng</th>
                <th className="py-2.5 px-3 font-semibold text-slate-500">Công ty hợp tác</th>
                <th className="py-2.5 px-3 font-semibold text-slate-500">CK áp dụng</th>
                <th className="py-2.5 px-3 font-semibold text-slate-500">CK cập nhật</th>
                <th className="py-2.5 px-3 font-semibold text-slate-500">Bảo hành</th>
                <th className="py-2.5 px-3 font-semibold text-slate-500">Đàm phán giá</th>
                <th className="py-2.5 px-3 font-semibold text-slate-500">Loại KH</th>
                <th className="py-2.5 px-3 text-right font-semibold text-slate-500 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="py-2 px-3 font-medium text-slate-700">{row.maKH}</td>
                  <td className="py-2 px-3 font-medium text-slate-800" title={row.tenKH}>
                    <span className="truncate block max-w-xs">{row.tenKH}</span>
                  </td>
                  <td className="py-2 px-3 text-slate-400 font-medium">{row.congTyHopTac}</td>
                  <td className="py-2 px-3 text-slate-400 font-medium">{row.ckApDung}</td>
                  <td className="py-2 px-3 text-slate-400 font-medium">{row.ckCapNhat}</td>
                  <td className="py-2 px-3 text-slate-400 font-medium">{row.baoHanh}</td>
                  <td className="py-2 px-3 text-slate-400 font-medium">{row.damPhanGia}</td>
                  <td className="py-2 px-3">
                    <span className="text-slate-700 font-medium">{row.loaiKH}</span>
                  </td>
                  <td className="py-2 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEditingItem(row)}
                        className="text-[#6366f1] hover:text-[#4f46e5] p-0.5 rounded transition-colors cursor-pointer"
                        title="Chỉnh sửa"
                      >
                        <IconPencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(row.id)}
                        className="text-rose-400 hover:text-rose-600 p-0.5 rounded transition-colors cursor-pointer"
                        title="Xóa"
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Pagination Footer ── */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div>
            Hiển thị <span className="font-bold text-slate-700">{totalFiltered > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalFiltered}</span> bản ghi
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
                className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#3e566d] text-white shadow-2xs'
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

      {/* ── Modal Thêm KH ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <IconUser size={16} className="text-[#3e566d]" />
                <span>Thêm chân dung khách hàng mới</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <IconX size={16} />
              </button>
            </div>

            <form onSubmit={handleAddKH} className="p-4 space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600 block">Mã KH</label>
                  <input
                    type="text"
                    placeholder="KH039"
                    value={newKH.maKH}
                    onChange={(e) => setNewKH({ ...newKH, maKH: e.target.value })}
                    className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600 block">Tên khách hàng *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập tên khách hàng"
                    value={newKH.tenKH}
                    onChange={(e) => setNewKH({ ...newKH, tenKH: e.target.value })}
                    className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 block">Loại KH</label>
                <select
                  value={newKH.loaiKH}
                  onChange={(e) => setNewKH({ ...newKH, loaiKH: e.target.value as KhachHangChanDungItem['loaiKH'] })}
                  className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89] cursor-pointer"
                >
                  <option value="Tiềm năng">Tiềm năng</option>
                  <option value="Thân thiết">Thân thiết</option>
                  <option value="Đang giao dịch">Đang giao dịch</option>
                  <option value="Không hoạt động">Không hoạt động</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#3e566d] hover:bg-[#324557] rounded-lg transition-colors cursor-pointer"
                >
                  Lưu khách hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal Sửa KH ── */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <IconPencil size={16} className="text-[#3e566d]" />
                <span>Chỉnh sửa chân dung khách hàng</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <IconX size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-4 space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600 block">Mã KH</label>
                  <input
                    type="text"
                    value={editingItem.maKH}
                    onChange={(e) => setEditingItem({ ...editingItem, maKH: e.target.value })}
                    className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600 block">Tên khách hàng *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.tenKH}
                    onChange={(e) => setEditingItem({ ...editingItem, tenKH: e.target.value })}
                    className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 block">Loại KH</label>
                <select
                  value={editingItem.loaiKH}
                  onChange={(e) => setEditingItem({ ...editingItem, loaiKH: e.target.value as KhachHangChanDungItem['loaiKH'] })}
                  className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#406c89] cursor-pointer"
                >
                  <option value="Tiềm năng">Tiềm năng</option>
                  <option value="Thân thiết">Thân thiết</option>
                  <option value="Đang giao dịch">Đang giao dịch</option>
                  <option value="Không hoạt động">Không hoạt động</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#3e566d] hover:bg-[#324557] rounded-lg transition-colors cursor-pointer"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
