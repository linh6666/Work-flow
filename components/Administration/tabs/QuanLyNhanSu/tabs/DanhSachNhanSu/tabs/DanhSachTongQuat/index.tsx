"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import ModalThemMoi from './modal/ModalThemMoi';
import ModalXemChiTiet from './modal/ModalXemChiTiet';
import ModalChinhSua from './modal/ModalChinhSua';
import ModalXoa from './modal/ModalXoa';
import { getStaffList } from '@/api/apiGetStaffList';
import {
  IconSearch,
  IconDownload,
  IconUpload,
  IconPlus,
  IconPencil,
  IconTrash,
  IconEye,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
  IconX,
  IconUser,
  IconFileSpreadsheet,
  IconFileText,
  IconSelector,
  IconRefresh,
} from '@tabler/icons-react';

// ─── Data Types ───────────────────────────────────────────────────────
export interface NhanSuItem {
  id: string;
  maNV: string;
  hoTen: string;
  avatar?: string;
  phongBan: string;
  chucVu: string;
  trangThai: string;
  ngaySinh: string;
  gioiTinh: string;
  dienThoai: string;
  ngayVao: string;
  thamNien: string;
  bacLuong: string;
  mucLuongHienTai: number;
  mucLuongCung: number;
  mucLuongMem: number;
  tongTroCap: number;
  thoiDiemTangLuong: string;
  thoiDiemTangBacBacLuongDuKien: string;
  email: string;
  ghiChuLuong: string;
  ghiChu: string;
  // Chi tiết mở rộng theo hồ sơ
  tinhTrangHonNhan?: string;
  chieuCaoCanNang?: string;
  tenThuongDung?: string;
  facebook?: string;
  diaChiHienTai?: string;
  diaChiHoKhau?: string;
  ngayChinhThuc?: string;
  ngayBatDauNghi?: string;
  truongHoc?: string;
  chuyenNganh?: string;
  bangCapTrinhDo?: string;
  nguonTuyenDung?: string;
  sttBoSung?: string | number;
  [key: string]: any;
}

export const formatVND = (n: number) =>
  n === 0 ? '0' : n.toLocaleString('vi-VN');

// ─── Initial Data (đã ẩn) ──────────────────────────────────────────
export const INITIAL_DATA: NhanSuItem[] = [];

// Fallback danh mục khi chưa có dữ liệu từ backend
export const PHONG_BAN_LIST: string[] = [
  'Ban Giám đốc',
  'Khối Văn phòng',
  'Phòng Khai triển',
  'Phòng Công nghệ và Thiết kế',
  'Phòng Cắt',
  'Phòng Ghép',
  'Phòng Mộc Sơn',
  'Phòng Điện',
  'Phòng Cảnh Quan',
  'Lắp đặt',
];
export const BAC_LUONG_LIST: string[] = [];
export const TRANG_THAI_LIST: string[] = [];
export const GIOI_TINH_LIST: string[] = ['Nam', 'Nữ', 'Khác'];

interface DanhSachTongQuatTabProps {
  searchQuery?: string;
  selectedPhongBan?: string;
  selectedTrangThai?: string;
}

export default function DanhSachTongQuatTab({
  searchQuery,
  selectedPhongBan,
  selectedTrangThai,
}: DanhSachTongQuatTabProps) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

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

  const [data, setData] = useState<NhanSuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [internalSearch, setInternalSearch] = useState('');
  const [internalPhongBan, setInternalPhongBan] = useState('ALL');
  const [internalTrangThai, setInternalTrangThai] = useState('ALL');

  const fetchStaffData = useCallback(async () => {
    try {
      setLoading(true);
      setApiError(null);
      const res = await getStaffList();
      if (res && res.length > 0) {
        setData(res);
      } else {
        setData([]);
      }
    } catch (err: any) {
      console.warn("Lỗi khi gọi API nhân sự:", err);
      setApiError(err?.message || "Không thể tải dữ liệu từ API");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStaffData();
  }, [fetchStaffData]);

  const search = searchQuery !== undefined ? searchQuery : internalSearch;
  const filterPhongBan = selectedPhongBan !== undefined ? selectedPhongBan : internalPhongBan;
  const filterTrangThai = selectedTrangThai !== undefined ? selectedTrangThai : internalTrangThai;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Modals for Actions
  const [viewingItem, setViewingItem] = useState<NhanSuItem | null>(null);
  const [editingItem, setEditingItem] = useState<NhanSuItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<NhanSuItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
      const matchTT = filterTrangThai === 'ALL' || item.trangThai === filterTrangThai;

      return matchSearch && matchPB && matchTT;
    });
  }, [data, search, filterPhongBan, filterTrangThai]);

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRecords);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset page when filtering
  const handleSearchChange = (val: string) => {
    setInternalSearch(val);
    setCurrentPage(1);
  };

  // Add / Edit Handlers
  const handleOpenAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item: NhanSuItem) => {
    setEditingItem(item);
  };



  useEffect(() => {
    const handleAddClick = (e: any) => {
      if (e?.detail?.tab === 'danh-sach-tong-quat') {
        handleOpenAdd();
      }
    };
    window.addEventListener('nhan-su-add-click', handleAddClick);
    return () => window.removeEventListener('nhan-su-add-click', handleAddClick);
  }, [data]);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
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
              <thead className="sticky top-0 z-30 bg-[#406c89] text-white border-b border-[#345870] shadow-2xs">
                <tr>
                  <th className="px-4 py-3 font-bold text-white text-xs whitespace-nowrap">STT</th>
                  <th className="px-4 py-3 font-bold text-white text-xs whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 cursor-pointer select-none hover:text-white/80">
                      <span>Họ và tên</span>
                      <IconSelector size={13} className="text-white/60" />
                    </div>
                  </th>
                  <th className="px-4 py-3 font-bold text-white text-xs whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 cursor-pointer select-none hover:text-white/80">
                      <span>Mã NV</span>
                      <IconSelector size={13} className="text-white/60" />
                    </div>
                  </th>
                  <th className="px-4 py-3 font-bold text-white text-xs whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 cursor-pointer select-none hover:text-white/80">
                      <span>Chức vụ</span>
                      <IconSelector size={13} className="text-white/60" />
                    </div>
                  </th>
                  <th className="px-4 py-3 font-bold text-white text-xs whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 cursor-pointer select-none hover:text-white/80">
                      <span>Phòng ban</span>
                      <IconSelector size={13} className="text-white/60" />
                    </div>
                  </th>
                  <th className="px-4 py-3 font-bold text-white text-xs whitespace-nowrap">Trạng thái</th>
                  <th className="px-4 py-3 font-bold text-white text-xs whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 cursor-pointer select-none hover:text-white/80">
                      <span>Ngày sinh</span>
                      <IconSelector size={13} className="text-white/60" />
                    </div>
                  </th>
                  <th className="px-4 py-3 font-bold text-white text-xs whitespace-nowrap">Giới tính</th>
                  <th className="px-4 py-3 font-bold text-white text-xs whitespace-nowrap">Điện thoại</th>
                  <th className="px-4 py-3 font-bold text-white text-xs whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 cursor-pointer select-none hover:text-white/80">
                      <span>Ngày vào</span>
                      <IconSelector size={13} className="text-white/60" />
                    </div>
                  </th>
                  <th className="px-4 py-3 font-bold text-white text-xs whitespace-nowrap">Thâm niên</th>
                  <th className="px-4 py-3 font-bold text-white text-xs whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 cursor-pointer select-none hover:text-white/80">
                      <span>Bậc lương</span>
                      <IconSelector size={13} className="text-white/60" />
                    </div>
                  </th>
                  <th className="px-4 py-3 font-bold text-white text-xs whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 cursor-pointer select-none hover:text-white/80">
                      <span>Mức lương hiện tại</span>
                      <IconSelector size={13} className="text-white/60" />
                    </div>
                  </th>
                  <th className="sticky right-0 top-0 z-40 bg-[#406c89] px-4 py-3 font-bold text-white text-xs text-center whitespace-nowrap shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.1)]">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={14} className="text-center py-16 text-slate-500">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-[#ba8e3a] border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-semibold text-slate-600">Đang tải dữ liệu nhân sự từ hệ thống...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="text-center py-12 text-slate-400">
                      <IconUser size={36} className="mx-auto mb-2 text-slate-300 stroke-1" />
                      <p className="font-semibold text-xs text-slate-600">Không tìm thấy nhân sự phù hợp</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Thử thay đổi từ khóa tìm kiếm</p>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, idx) => {
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                        {/* STT */}
                        <td className="px-4 py-3.5 align-middle text-slate-400 font-medium whitespace-nowrap">
                          {startIndex + idx + 1}
                        </td>

                        {/* Họ và tên */}
                        <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0 border border-slate-200">
                              {item.hoTen.charAt(0)}
                            </div>
                            <span
                              className={`font-bold text-xs ${
                                item.trangThai === 'Đã nghỉ' ? 'text-rose-600' : 'text-slate-800'
                              }`}
                            >
                              {item.hoTen}
                            </span>
                          </div>
                        </td>

                        {/* Mã NV */}
                        <td className="px-4 py-3.5 align-middle whitespace-nowrap font-mono text-slate-500 font-semibold text-xs">
                          {item.maNV}
                        </td>

                        {/* Chức vụ */}
                        <td className="px-4 py-3.5 align-middle text-slate-700 whitespace-nowrap font-medium">
                          {item.chucVu}
                        </td>

                        {/* Phòng ban */}
                        <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/80">
                            {item.phongBan}
                          </span>
                        </td>

                        {/* Trạng thái */}
                        <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                              item.trangThai === 'Đang làm việc'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : item.trangThai === 'Đã nghỉ'
                                ? 'bg-rose-50 text-rose-600 border-rose-300'
                                : 'bg-amber-50 text-amber-700 border-amber-300'
                            }`}
                          >
                            {item.trangThai}
                          </span>
                        </td>

                        {/* Ngày sinh */}
                        <td className="px-4 py-3.5 align-middle font-mono text-slate-700 font-medium whitespace-nowrap">
                          {item.ngaySinh || '—'}
                        </td>

                        {/* Giới tính */}
                        <td className="px-4 py-3.5 align-middle text-slate-700 whitespace-nowrap font-medium">
                          {item.gioiTinh || '—'}
                        </td>

                        {/* Điện thoại */}
                        <td className="px-4 py-3.5 align-middle font-mono text-slate-800 font-medium whitespace-nowrap">
                          {item.dienThoai || '—'}
                        </td>

                        {/* Ngày vào */}
                        <td className="px-4 py-3.5 align-middle font-mono text-slate-700 whitespace-nowrap font-medium">
                          {item.ngayVao || '—'}
                        </td>

                        {/* Thâm niên */}
                        <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {item.thamNien || '—'}
                          </span>
                        </td>

                        {/* Bậc lương */}
                        <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            {item.bacLuong}
                          </span>
                        </td>

                        {/* Mức lương hiện tại */}
                        <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap font-bold text-emerald-700 font-mono">
                          {formatVND(item.mucLuongHienTai || (item.mucLuongCung + item.mucLuongMem + item.tongTroCap))}
                        </td>

                        {/* Thao tác (sticky cố định ở cuối bảng luôn nhìn thấy) */}
                        <td className="sticky right-0 z-10 bg-white group-hover:bg-slate-50/80 px-4 py-3.5 align-middle text-center whitespace-nowrap shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)]">
                          <div className="inline-flex items-center gap-2 justify-center">
                            <button
                              type="button"
                              title="Xem chi tiết"
                              onClick={() => setViewingItem(item)}
                              className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                            >
                              <IconEye size={16} />
                            </button>
                            <button
                              type="button"
                              title="Chỉnh sửa"
                              onClick={() => setEditingItem(item)}
                              className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-sky-600 transition-colors cursor-pointer"
                            >
                              <IconPencil size={16} />
                            </button>
                            <button
                              type="button"
                              title="Xóa"
                              onClick={() => setDeletingItem(item)}
                              className="p-1 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            >
                              <IconTrash size={16} />
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

      {/* ── Modal Thêm Mới Nhân Sự ── */}
      <ModalThemMoi
        isOpen={isAddModalOpen}
        defaultMaNV={`NV${(data.length + 1).toString().padStart(3, '0')}`}
        onSave={(newItem) => {
          setData((prev) => [newItem, ...prev]);
          fetchStaffData();
        }}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* ── Modal Xem Chi Tiết ── */}
      <ModalXemChiTiet
        isOpen={!!viewingItem}
        item={viewingItem}
        onClose={() => setViewingItem(null)}
      />

      {/* ── Modal Chỉnh Sửa Nhân Sự ── */}
      <ModalChinhSua
        isOpen={!!editingItem}
        item={editingItem}
        onSave={(updated) => {
          setData((prev) =>
            prev.map((it) => (it.id === updated.id ? updated : it))
          );
        }}
        onClose={() => setEditingItem(null)}
      />

      {/* ── Modal Xóa Nhân Sự ── */}
      <ModalXoa
        isOpen={!!deletingItem}
        item={deletingItem}
        onConfirm={(itemToDelete) => {
          setData((prev) => prev.filter((it) => it.id !== itemToDelete.id));
        }}
        onClose={() => setDeletingItem(null)}
      />
    </div>
  );
}
