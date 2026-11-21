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
  IconUserCheck,
  IconFileText,
} from '@tabler/icons-react';
import { PHONG_BAN_LIST } from '../DanhSachTongQuat';

export interface ThanNhanItem {
  id: string;
  maNV: string;
  hoTenNV: string;
  phongBan: string;
  hoTenThanNhan: string;
  moiQuanHe: 'Bố' | 'Mẹ' | 'Vợ' | 'Chồng' | 'Con' | 'Anh/Chị/Em';
  ngaySinh: string;
  soDienThoai: string;
  laNguoiPhuThuoc: boolean;
  maSoThueNPT: string;
  tuThang: string;
  denThang: string;
  ghiChu: string;
}

export const INITIAL_THAN_NHAN_DATA: ThanNhanItem[] = [
  { id: '1', maNV: 'NV001', hoTenNV: 'Bùi Thị Duyên', phongBan: 'Phòng Kinh doanh', hoTenThanNhan: 'Nguyễn Văn Hải', moiQuanHe: 'Chồng', ngaySinh: '10/04/1988', soDienThoai: '0912345678', laNguoiPhuThuoc: false, maSoThueNPT: '—', tuThang: '—', denThang: '—', ghiChu: '' },
  { id: '2', maNV: 'NV001', hoTenNV: 'Bùi Thị Duyên', phongBan: 'Phòng Kinh doanh', hoTenThanNhan: 'Nguyễn Bùi Minh Khang', moiQuanHe: 'Con', ngaySinh: '15/08/2018', soDienThoai: '—', laNguoiPhuThuoc: true, maSoThueNPT: '8912304918', tuThang: '09/2018', denThang: 'Hiện tại', ghiChu: 'Giảm trừ gia cảnh' },
  { id: '3', maNV: 'NV002', hoTenNV: 'Nguyễn Phú Quang', phongBan: 'Phòng Khai triển', hoTenThanNhan: 'Trần Thị Mai', moiQuanHe: 'Vợ', ngaySinh: '22/11/1992', soDienThoai: '0987654321', laNguoiPhuThuoc: false, maSoThueNPT: '—', tuThang: '—', denThang: '—', ghiChu: '' },
  { id: '4', maNV: 'NV002', hoTenNV: 'Nguyễn Phú Quang', phongBan: 'Phòng Khai triển', hoTenThanNhan: 'Nguyễn Quang Minh', moiQuanHe: 'Con', ngaySinh: '05/01/2021', soDienThoai: '—', laNguoiPhuThuoc: true, maSoThueNPT: '8923415029', tuThang: '02/2021', denThang: 'Hiện tại', ghiChu: 'Giảm trừ gia cảnh' },
  { id: '5', maNV: 'NV004', hoTenNV: 'Bùi Phương Uyên', phongBan: 'Phòng Điện', hoTenThanNhan: 'Bùi Văn Hùng', moiQuanHe: 'Bố', ngaySinh: '18/09/1960', soDienThoai: '0903847561', laNguoiPhuThuoc: true, maSoThueNPT: '8712398451', tuThang: '01/2023', denThang: 'Hiện tại', ghiChu: 'Hết tuổi lao động' },
  { id: '6', maNV: 'NV006', hoTenNV: 'Lê Hoàng Long', phongBan: 'Phòng Cắt', hoTenThanNhan: 'Lê Hoàng Anh', moiQuanHe: 'Anh/Chị/Em', ngaySinh: '14/06/1996', soDienThoai: '0934857291', laNguoiPhuThuoc: false, maSoThueNPT: '—', tuThang: '—', denThang: '—', ghiChu: '' },
  { id: '7', maNV: 'NV007', hoTenNV: 'Trần Văn Mạnh', phongBan: 'Lắp đặt', hoTenThanNhan: 'Phạm Thị Thoa', moiQuanHe: 'Vợ', ngaySinh: '08/03/1991', soDienThoai: '0918273645', laNguoiPhuThuoc: false, maSoThueNPT: '—', tuThang: '—', denThang: '—', ghiChu: '' },
  { id: '8', maNV: 'NV007', hoTenNV: 'Trần Văn Mạnh', phongBan: 'Lắp đặt', hoTenThanNhan: 'Trần Bảo Nam', moiQuanHe: 'Con', ngaySinh: '12/12/2019', soDienThoai: '—', laNguoiPhuThuoc: true, maSoThueNPT: '8934516273', tuThang: '01/2020', denThang: 'Hiện tại', ghiChu: 'Giảm trừ gia cảnh' },
];

interface ThanNhanPhuThuocTabProps {
  searchQuery?: string;
  selectedPhongBan?: string;
  selectedPhuThuoc?: string;
}

export default function ThanNhanPhuThuocTab({
  searchQuery,
  selectedPhongBan,
  selectedPhuThuoc,
}: ThanNhanPhuThuocTabProps) {
  const [data, setData] = useState<ThanNhanItem[]>(INITIAL_THAN_NHAN_DATA);
  const [internalSearch, setInternalSearch] = useState('');
  const [internalPhongBan, setInternalPhongBan] = useState('ALL');
  const [internalPhuThuoc, setInternalPhuThuoc] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const search = searchQuery !== undefined ? searchQuery : internalSearch;
  const filterPhongBan = selectedPhongBan !== undefined ? selectedPhongBan : internalPhongBan;
  const filterPhuThuoc = selectedPhuThuoc !== undefined ? selectedPhuThuoc : internalPhuThuoc;

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.hoTenNV.toLowerCase().includes(q) ||
        item.maNV.toLowerCase().includes(q) ||
        item.hoTenThanNhan.toLowerCase().includes(q) ||
        item.phongBan.toLowerCase().includes(q) ||
        item.moiQuanHe.toLowerCase().includes(q);

      const matchPB = filterPhongBan === 'ALL' || item.phongBan === filterPhongBan;
      const matchPT =
        filterPhuThuoc === 'ALL' ||
        (filterPhuThuoc === 'YES' && item.laNguoiPhuThuoc) ||
        (filterPhuThuoc === 'NO' && !item.laNguoiPhuThuoc);

      return matchSearch && matchPB && matchPT;
    });
  }, [data, search, filterPhongBan, filterPhuThuoc]);

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
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Nhân viên</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Phòng ban</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Họ tên thân nhân</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Mối quan hệ</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Ngày sinh</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Số điện thoại</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Người phụ thuộc?</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">MST người phụ thuộc</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Từ tháng</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Đến tháng</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Ghi chú</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs text-right whitespace-nowrap">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="text-center py-12 text-slate-400">
                      <IconUserCheck size={36} className="mx-auto mb-2 text-slate-300 stroke-1" />
                      <p className="font-semibold text-xs text-slate-600">Không tìm thấy thông tin thân nhân</p>
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
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap font-bold text-slate-800 text-xs">
                        {item.hoTenNV}
                      </td>
                      <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">{item.phongBan}</td>
                      <td className="px-4 py-3.5 align-middle font-bold text-indigo-900 whitespace-nowrap">
                        {item.hoTenThanNhan}
                      </td>
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {item.moiQuanHe}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">{item.ngaySinh}</td>
                      <td className="px-4 py-3.5 align-middle font-mono text-slate-600 whitespace-nowrap">{item.soDienThoai}</td>
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        {item.laNguoiPhuThuoc ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Có (NPT)
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 text-slate-500 border border-slate-200">
                            Không
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 align-middle font-mono font-semibold text-slate-700 whitespace-nowrap">
                        {item.maSoThueNPT}
                      </td>
                      <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">{item.tuThang}</td>
                      <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">{item.denThang}</td>
                      <td className="px-4 py-3.5 align-middle text-slate-400 whitespace-nowrap">{item.ghiChu || '—'}</td>
                      <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            title="Chỉnh sửa"
                            onClick={() => alert(`Chỉnh sửa thân nhân: ${item.hoTenThanNhan}`)}
                            className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                          >
                            <IconPencil size={13} />
                          </button>
                          <button
                            type="button"
                            title="Xóa"
                            onClick={() => alert(`Xóa thân nhân: ${item.hoTenThanNhan}`)}
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
              Hiển thị <span className="font-bold text-slate-700">{totalRecords > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalRecords}</span> thân nhân
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
