"use client";

import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
  IconShieldCheck,
  IconFileText,
  IconRefresh,
  IconLoader2,
} from '@tabler/icons-react';
import { PHONG_BAN_LIST, TRANG_THAI_LIST, NhanSuItem } from '../DanhSachTongQuat';
import { getHoSoPhapLyList } from '@/api/apiGetHoSoPhapLy';
import ModalXemChiTietHoSo from './modal/XemChiTietHoSo';
import ModalChinhSuaHoSo from './modal/ChinhSuaHoSo';
import ModalXoaHoSo from './modal/XoaHoSo';
import ModalThemHoSo from './modal/ThemHoSo';

export interface HoSoPhapLyItem {
  id: string;
  maNV: string;
  hoTen: string;
  phongBan: string;
  chucVu: string;
  soCCCD: string;
  ngayCapCCCD: string;
  noiCapCCCD: string;
  mstCaNhan: string;
  soBHXH: string;
  nganHang: string;
  soTaiKhoan: string;
  tinhTrangHoSo: 'Đầy đủ' | 'Thiếu CCCD' | 'Thiếu BHXH' | 'Thiếu MST' | 'Chưa nộp';
  ghiChu: string;
  rawItem?: NhanSuItem;
}

export const INITIAL_HO_SO_DATA: HoSoPhapLyItem[] = [];

interface HoSoPhapLyTabProps {
  searchQuery?: string;
  selectedPhongBan?: string;
  selectedTinhTrang?: string;
}

export default function HoSoPhapLyTab({
  searchQuery,
  selectedPhongBan,
  selectedTinhTrang,
}: HoSoPhapLyTabProps) {
  const [data, setData] = useState<HoSoPhapLyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const [internalSearch, setInternalSearch] = useState('');
  const [internalPhongBan, setInternalPhongBan] = useState('ALL');
  const [internalTinhTrang, setInternalTinhTrang] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Modal States
  const [selectedHoSo, setSelectedHoSo] = useState<HoSoPhapLyItem | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Lắng nghe sự kiện click nút "+ Thêm" từ Toolbar ngoài
  useEffect(() => {
    const handleAddClick = (e: any) => {
      if (e.detail?.tab === 'ho-so-phap-ly') {
        setIsAddOpen(true);
      }
    };
    window.addEventListener('nhan-su-add-click', handleAddClick);
    return () => window.removeEventListener('nhan-su-add-click', handleAddClick);
  }, []);

  // Fetch API dữ liệu nhân sự thực tế qua apiGetHoSoPhapLy
  const fetchHoSoData = useCallback(async () => {
    try {
      setLoading(true);
      setApiError(null);
      const res = await getHoSoPhapLyList();
      if (res && res.length > 0) {
        setData(res);
      } else {
        setData([]);
      }
    } catch (err: any) {
      console.warn('Lỗi khi tải dữ liệu hồ sơ pháp lý:', err);
      setApiError(err?.message || 'Không thể kết nối đến máy chủ');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHoSoData();
  }, [fetchHoSoData]);

  const search = searchQuery !== undefined ? searchQuery : internalSearch;
  const filterPhongBan = selectedPhongBan !== undefined ? selectedPhongBan : internalPhongBan;
  const filterTinhTrang = selectedTinhTrang !== undefined ? selectedTinhTrang : internalTinhTrang;

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.hoTen.toLowerCase().includes(q) ||
        item.maNV.toLowerCase().includes(q) ||
        item.soCCCD.toLowerCase().includes(q) ||
        item.phongBan.toLowerCase().includes(q) ||
        item.mstCaNhan.toLowerCase().includes(q) ||
        item.soBHXH.toLowerCase().includes(q);

      const matchPB = filterPhongBan === 'ALL' || item.phongBan === filterPhongBan;
      const matchTT = filterTinhTrang === 'ALL' || item.tinhTrangHoSo === filterTinhTrang;

      return matchSearch && matchPB && matchTT;
    });
  }, [data, search, filterPhongBan, filterTinhTrang]);

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRecords);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleOpenView = (item: HoSoPhapLyItem) => {
    setSelectedHoSo(item);
    setIsViewOpen(true);
  };

  const handleOpenEdit = (item: HoSoPhapLyItem) => {
    setSelectedHoSo(item);
    setIsEditOpen(true);
  };

  const handleOpenDelete = (item: HoSoPhapLyItem) => {
    setSelectedHoSo(item);
    setIsDeleteOpen(true);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      {/* ── Table Container ── */}
      <div className="flex-1 min-h-0 px-5 py-3 flex flex-col">
        <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
          <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
            <table className="min-w-max w-full text-xs text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-[#406c89] text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold text-xs whitespace-nowrap">Nhân sự</th>
                  <th className="px-4 py-3 font-semibold text-xs whitespace-nowrap">Phòng ban</th>
                  <th className="px-4 py-3 font-semibold text-xs whitespace-nowrap">Số CCCD</th>
                  <th className="px-4 py-3 font-semibold text-xs whitespace-nowrap">Ngày cấp</th>
                  <th className="px-4 py-3 font-semibold text-xs whitespace-nowrap">Số sổ BHXH</th>
                  <th className="px-4 py-3 font-semibold text-xs whitespace-nowrap">Mã số thuế</th>
                  <th className="px-4 py-3 font-semibold text-xs whitespace-nowrap">Hồ sơ</th>
                  <th className="px-4 py-3 font-semibold text-xs whitespace-nowrap">Còn thiếu</th>
                  <th className="px-4 py-3 font-semibold text-xs text-center whitespace-nowrap">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="text-center py-16 text-slate-400">
                      <IconLoader2 size={32} className="mx-auto mb-2 text-[#406c89] animate-spin" />
                      <p className="font-semibold text-xs text-slate-600">Đang tải dữ liệu hồ sơ pháp lý từ hệ thống...</p>
                    </td>
                  </tr>
                ) : paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-12 text-slate-400">
                      <IconShieldCheck size={36} className="mx-auto mb-2 text-slate-300 stroke-1" />
                      <p className="font-semibold text-xs text-slate-600">Không tìm thấy hồ sơ pháp lý phù hợp</p>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item) => {
                    // Xác định danh sách giấy tờ còn thiếu
                    const missingList: string[] = [];
                    if (item.soCCCD === '—' || !item.soCCCD) missingList.push('CCCD');
                    if (item.soBHXH === '—' || !item.soBHXH) missingList.push('Sổ BHXH');
                    if (item.mstCaNhan === '—' || !item.mstCaNhan) missingList.push('MST');
                    if (item.tinhTrangHoSo === 'Thiếu CCCD' && !missingList.includes('CCCD')) missingList.push('CCCD');
                    if (item.tinhTrangHoSo === 'Thiếu BHXH' && !missingList.includes('Sổ BHXH')) missingList.push('Sổ BHXH');
                    if (item.tinhTrangHoSo === 'Thiếu MST' && !missingList.includes('MST')) missingList.push('MST');

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                        {/* Nhân sự (Avatar + Tên + Mã NV) */}
                        <td className="px-4 py-3 align-middle whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-slate-100 text-[#406c89] font-bold flex items-center justify-center text-xs shrink-0 border border-slate-200">
                              {item.hoTen.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-slate-800 text-xs">{item.hoTen}</span>
                              <span className="text-[11px] text-slate-400">{item.maNV}</span>
                            </div>
                          </div>
                        </td>

                        {/* Phòng ban */}
                        <td className="px-4 py-3 align-middle text-slate-600 whitespace-nowrap">
                          {item.phongBan}
                        </td>

                        {/* Số CCCD */}
                        <td className="px-4 py-3 align-middle font-mono font-medium text-slate-700 whitespace-nowrap">
                          {item.soCCCD}
                        </td>

                        {/* Ngày cấp */}
                        <td className="px-4 py-3 align-middle text-slate-600 whitespace-nowrap">
                          {item.ngayCapCCCD}
                        </td>

                        {/* Số sổ BHXH */}
                        <td className="px-4 py-3 align-middle font-mono text-slate-700 whitespace-nowrap">
                          {item.soBHXH}
                        </td>

                        {/* Mã số thuế */}
                        <td className="px-4 py-3 align-middle font-mono text-slate-700 whitespace-nowrap">
                          {item.mstCaNhan}
                        </td>

                        {/* Hồ sơ (Status Badge) */}
                        <td className="px-4 py-3 align-middle whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${
                              item.tinhTrangHoSo === 'Đầy đủ'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : item.tinhTrangHoSo === 'Chưa nộp'
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            {item.tinhTrangHoSo}
                          </span>
                        </td>

                        {/* Còn thiếu */}
                        <td className="px-4 py-3 align-middle whitespace-nowrap">
                          {missingList.length === 0 ? (
                            <span className="text-slate-400 text-xs">—</span>
                          ) : (
                            <div className="flex items-center gap-1 flex-wrap">
                              {missingList.map((m, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-rose-50 text-rose-600 border border-rose-100"
                                >
                                  {m}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>

                        {/* Hành động (Xem + Sửa + Xóa) */}
                        <td className="px-4 py-3 align-middle text-center whitespace-nowrap">
                          <div className="inline-flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              title="Xem chi tiết"
                              onClick={() => handleOpenView(item)}
                              className="p-1.5 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            >
                              <IconEye size={15} />
                            </button>
                            <button
                              type="button"
                              title="Chỉnh sửa"
                              onClick={() => handleOpenEdit(item)}
                              className="p-1.5 rounded text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                            >
                              <IconPencil size={15} />
                            </button>
                            <button
                              type="button"
                              title="Xóa"
                              onClick={() => handleOpenDelete(item)}
                              className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            >
                              <IconTrash size={15} />
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
              Hiển thị <span className="font-bold text-slate-700">{totalRecords > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalRecords}</span> hồ sơ
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

      {/* ── Modal Xem chi tiết hồ sơ ── */}
      {selectedHoSo && (
        <ModalXemChiTietHoSo
          isOpen={isViewOpen}
          item={selectedHoSo}
          onClose={() => {
            setIsViewOpen(false);
            setSelectedHoSo(null);
          }}
        />
      )}

      {/* ── Modal Chỉnh sửa hồ sơ ── */}
      {selectedHoSo && (
        <ModalChinhSuaHoSo
          isOpen={isEditOpen}
          item={selectedHoSo}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedHoSo(null);
          }}
          onSuccess={() => {
            fetchHoSoData();
            setIsEditOpen(false);
            setSelectedHoSo(null);
          }}
        />
      )}

      {/* ── Modal Xác nhận xóa hồ sơ ── */}
      {selectedHoSo && (
        <ModalXoaHoSo
          isOpen={isDeleteOpen}
          item={selectedHoSo}
          onClose={() => {
            setIsDeleteOpen(false);
            setSelectedHoSo(null);
          }}
          onSuccess={() => {
            fetchHoSoData();
            setIsDeleteOpen(false);
            setSelectedHoSo(null);
          }}
        />
      )}

      {/* ── Modal Thêm mới hồ sơ ── */}
      <ModalThemHoSo
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={() => {
          fetchHoSoData();
          setIsAddOpen(false);
        }}
      />
    </div>
  );
}
