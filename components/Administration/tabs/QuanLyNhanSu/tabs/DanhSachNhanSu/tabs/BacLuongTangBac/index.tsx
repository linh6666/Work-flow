"use client";

import React, { useState, useMemo } from 'react';
import {
  IconSearch,
  IconDownload,
  IconUpload,
  IconPlus,
  IconPencil,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
  IconWallet,
  IconFileText,
} from '@tabler/icons-react';
import { PHONG_BAN_LIST } from '../DanhSachTongQuat';

export interface BacLuongTangBacItem {
  id: string;
  maNV: string;
  hoTen: string;
  phongBan: string;
  chucVu: string;
  bacLuongHienTai: string;
  mucLuongHienTai: number;
  thoiDiemTangLuongGanNhat: string;
  bacLuongDuKien: string;
  mucLuongDuKien: number;
  thoiDiemTangBacDuKien: string;
  dieuKienXetDuyet: string;
  trangThaiDuyet: 'Đủ điều kiện' | 'Đang theo dõi' | 'Chưa xét duyệt';
  ghiChu: string;
}

export const INITIAL_BAC_LUONG_DATA: BacLuongTangBacItem[] = [
  { id: '1', maNV: 'NV001', hoTen: 'Bùi Thị Duyên', phongBan: 'Phòng Kinh doanh', chucVu: 'Trưởng phòng Kinh doanh', bacLuongHienTai: 'Bậc 5', mucLuongHienTai: 11500000, thoiDiemTangLuongGanNhat: '03/2024', bacLuongDuKien: 'Bậc 6', mucLuongDuKien: 12500000, thoiDiemTangBacDuKien: '03/2025', dieuKienXetDuyet: 'Đạt KPI năm & thâm niên >= 1 năm', trangThaiDuyet: 'Đủ điều kiện', ghiChu: 'Đã hoàn thành đánh giá' },
  { id: '2', maNV: 'NV002', hoTen: 'Nguyễn Phú Quang', phongBan: 'Phòng Khai triển', chucVu: 'Trưởng phòng Khai triển', bacLuongHienTai: 'Bậc 6', mucLuongHienTai: 12500000, thoiDiemTangLuongGanNhat: '08/2024', bacLuongDuKien: 'Bậc 7', mucLuongDuKien: 14000000, thoiDiemTangBacDuKien: '08/2025', dieuKienXetDuyet: 'Đạt KPI năm & thâm niên >= 1 năm', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '3', maNV: 'NV003', hoTen: 'Kỳ Anh', phongBan: 'Phòng Cảnh Quan', chucVu: 'Chuyên viên Cảnh quan', bacLuongHienTai: 'Bậc 3', mucLuongHienTai: 7500000, thoiDiemTangLuongGanNhat: '01/2025', bacLuongDuKien: 'Bậc 4', mucLuongDuKien: 9000000, thoiDiemTangBacDuKien: '01/2026', dieuKienXetDuyet: 'Hoàn thành đề án cảnh quan', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '4', maNV: 'NV004', hoTen: 'Bùi Phương Uyên', phongBan: 'Phòng Điện', chucVu: 'Kỹ sư Điện & Chiếu sáng', bacLuongHienTai: 'Bậc 4', mucLuongHienTai: 9000000, thoiDiemTangLuongGanNhat: '11/2024', bacLuongDuKien: 'Bậc 5', mucLuongDuKien: 10500000, thoiDiemTangBacDuKien: '11/2025', dieuKienXetDuyet: 'Chứng chỉ vận hành hệ thống', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '5', maNV: 'NV005', hoTen: 'Thao Phung', phongBan: 'Phòng Mộc Sơn', chucVu: 'KTV Sơn hoàn thiện', bacLuongHienTai: 'Thử việc', mucLuongHienTai: 6240000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: 'Bậc 1', mucLuongDuKien: 7000000, thoiDiemTangBacDuKien: '05/2025', dieuKienXetDuyet: 'Đạt đánh giá hết thử việc', trangThaiDuyet: 'Chưa xét duyệt', ghiChu: 'Đang thử việc 2 tháng' },
  { id: '6', maNV: 'NV006', hoTen: 'Lê Hoàng Long', phongBan: 'Phòng Cắt', chucVu: 'KTV Laser & CNC', bacLuongHienTai: 'Bậc 2', mucLuongHienTai: 7000000, thoiDiemTangLuongGanNhat: '06/2024', bacLuongDuKien: 'Bậc 3', mucLuongDuKien: 8000000, thoiDiemTangBacDuKien: '06/2025', dieuKienXetDuyet: 'Không vi phạm an toàn máy móc', trangThaiDuyet: 'Đủ điều kiện', ghiChu: '' },
  { id: '7', maNV: 'NV007', hoTen: 'Trần Văn Mạnh', phongBan: 'Lắp đặt', chucVu: 'Đội trưởng Lắp đặt', bacLuongHienTai: 'Bậc 5', mucLuongHienTai: 10500000, thoiDiemTangLuongGanNhat: '10/2024', bacLuongDuKien: 'Bậc 6', mucLuongDuKien: 12000000, thoiDiemTangBacDuKien: '10/2025', dieuKienXetDuyet: 'Tiến độ nghiệm thu công trình', trangThaiDuyet: 'Đang theo dõi', ghiChu: '' },
  { id: '8', maNV: 'NV008', hoTen: 'Phạm Minh Trang', phongBan: 'Phòng Công nghệ và Thiết kế', chucVu: 'Kiến trúc sư 3D', bacLuongHienTai: 'Thử việc', mucLuongHienTai: 6240000, thoiDiemTangLuongGanNhat: '—', bacLuongDuKien: 'Bậc 1', mucLuongDuKien: 7000000, thoiDiemTangBacDuKien: '06/2025', dieuKienXetDuyet: 'Đạt đánh giá hết thử việc', trangThaiDuyet: 'Chưa xét duyệt', ghiChu: 'Đang thử việc' },
];

interface BacLuongTangBacTabProps {
  searchQuery?: string;
  selectedPhongBan?: string;
  selectedTrangThai?: string;
}

export default function BacLuongTangBacTab({
  searchQuery,
  selectedPhongBan,
  selectedTrangThai,
}: BacLuongTangBacTabProps) {
  const [data, setData] = useState<BacLuongTangBacItem[]>(INITIAL_BAC_LUONG_DATA);
  const [internalSearch, setInternalSearch] = useState('');
  const [internalPhongBan, setInternalPhongBan] = useState('ALL');
  const [internalTrangThai, setInternalTrangThai] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const search = searchQuery !== undefined ? searchQuery : internalSearch;
  const filterPhongBan = selectedPhongBan !== undefined ? selectedPhongBan : internalPhongBan;
  const filterTrangThai = selectedTrangThai !== undefined ? selectedTrangThai : internalTrangThai;

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.hoTen.toLowerCase().includes(q) ||
        item.maNV.toLowerCase().includes(q) ||
        item.phongBan.toLowerCase().includes(q) ||
        item.chucVu.toLowerCase().includes(q) ||
        item.bacLuongHienTai.toLowerCase().includes(q) ||
        item.bacLuongDuKien.toLowerCase().includes(q);

      const matchPB = filterPhongBan === 'ALL' || item.phongBan === filterPhongBan;
      const matchTT = filterTrangThai === 'ALL' || item.trangThaiDuyet === filterTrangThai;

      return matchSearch && matchPB && matchTT;
    });
  }, [data, search, filterPhongBan, filterTrangThai]);

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRecords);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      {/* ── Table Container ── */}
      <div className="flex-1 min-h-0 px-5 py-3 flex flex-col">
        <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
          <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
            <table className="min-w-max w-full text-xs text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 shadow-2xs">
                <tr>
                  <th className="px-4 py-3 font-bold text-slate-500 text-xs whitespace-nowrap">STT</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Mã NV</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Họ và tên</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Phòng ban</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Bậc hiện tại</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Mức lương hiện tại</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Tăng gần nhất</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Bậc dự kiến</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Mức lương dự kiến</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Thời điểm dự kiến</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Điều kiện xét duyệt</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Trạng thái xét duyệt</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Ghi chú</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs text-right whitespace-nowrap">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="text-center py-12 text-slate-400">
                      <IconWallet size={36} className="mx-auto mb-2 text-slate-300 stroke-1" />
                      <p className="font-semibold text-xs text-slate-600">Không tìm thấy thông tin bậc lương</p>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-4 py-3.5 align-middle text-slate-400 font-medium whitespace-nowrap">
                        {startIndex + idx + 1}
                      </td>
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap font-bold text-slate-700">
                        {item.maNV}
                      </td>
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-700 font-bold flex items-center justify-center text-[10px] shrink-0 border border-amber-100">
                            {item.hoTen.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-800 text-xs">{item.hoTen}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">{item.phongBan}</td>
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {item.bacLuongHienTai}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 align-middle text-right font-semibold text-slate-700 whitespace-nowrap">
                        {item.mucLuongHienTai.toLocaleString('vi-VN')}
                      </td>
                      <td className="px-4 py-3.5 align-middle text-slate-500 whitespace-nowrap">{item.thoiDiemTangLuongGanNhat}</td>
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          {item.bacLuongDuKien}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 align-middle text-right font-bold text-emerald-700 whitespace-nowrap">
                        {item.mucLuongDuKien.toLocaleString('vi-VN')}
                      </td>
                      <td className="px-4 py-3.5 align-middle text-slate-700 font-semibold whitespace-nowrap">
                        {item.thoiDiemTangBacDuKien}
                      </td>
                      <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">{item.dieuKienXetDuyet}</td>
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            item.trangThaiDuyet === 'Đủ điều kiện'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : item.trangThaiDuyet === 'Đang theo dõi'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {item.trangThaiDuyet}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 align-middle text-slate-400 whitespace-nowrap">{item.ghiChu || '—'}</td>
                      <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            title="Chỉnh sửa"
                            onClick={() => alert(`Chỉnh sửa bậc lương: ${item.hoTen}`)}
                            className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                          >
                            <IconPencil size={13} />
                          </button>
                          <button
                            type="button"
                            title="Xóa"
                            onClick={() => alert(`Xóa bản ghi: ${item.hoTen}`)}
                            className="p-1.5 rounded border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                          >
                            <IconTrash size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
            <div>
              Hiển thị <span className="font-bold text-slate-700">{totalRecords > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalRecords}</span> bản ghi
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
    </div>
  );
}
