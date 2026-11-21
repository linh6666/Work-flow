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
  IconCertificate,
  IconFileText,
} from '@tabler/icons-react';
import { PHONG_BAN_LIST } from '../DanhSachTongQuat';

export interface ThamNienItem {
  id: string;
  maNV: string;
  hoTen: string;
  phongBan: string;
  chucVu: string;
  ngayVao: string;
  soNam: number;
  soThang: number;
  thamNienText: string;
  mocKhenThuong: string;
  troCapThamNien: number;
  trangThai: string;
  ghiChu: string;
}

export const INITIAL_THAM_NIEN_DATA: ThamNienItem[] = [
  { id: '1', maNV: 'NV001', hoTen: 'Bùi Thị Duyên', phongBan: 'Phòng Kinh doanh', chucVu: 'Trưởng phòng Kinh doanh', ngayVao: '02/08/2007', soNam: 19, soThang: 0, thamNienText: '19 năm', mocKhenThuong: 'Huy chương Cống hiến 15 năm', troCapThamNien: 2000000, trangThai: 'Đang làm việc', ghiChu: 'Cán bộ nòng cốt' },
  { id: '2', maNV: 'NV002', hoTen: 'Nguyễn Phú Quang', phongBan: 'Phòng Khai triển', chucVu: 'Trưởng phòng Khai triển', ngayVao: '23/05/2026', soNam: 0, soThang: 2, thamNienText: '0 năm 2 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '3', maNV: 'NV003', hoTen: 'Kỳ Anh', phongBan: 'Phòng Cảnh Quan', chucVu: 'Chuyên viên Cảnh quan', ngayVao: '11/08/2025', soNam: 1, soThang: 0, thamNienText: '1 năm', mocKhenThuong: '—', troCapThamNien: 200000, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '4', maNV: 'NV004', hoTen: 'Bùi Phương Uyên', phongBan: 'Phòng Điện', chucVu: 'Kỹ sư Điện & Chiếu sáng', ngayVao: '22/09/2025', soNam: 0, soThang: 10, thamNienText: '0 năm 10 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '5', maNV: 'NV005', hoTen: 'Thao Phung', phongBan: 'Phòng Mộc Sơn', chucVu: 'KTV Sơn hoàn thiện', ngayVao: '01/05/2026', soNam: 0, soThang: 3, thamNienText: '0 năm 3 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Thử việc', ghiChu: 'Đang thử việc' },
  { id: '6', maNV: 'NV006', hoTen: 'Lê Hoàng Long', phongBan: 'Phòng Cắt', chucVu: 'KTV Laser & CNC', ngayVao: '13/11/2025', soNam: 0, soThang: 9, thamNienText: '0 năm 9 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '7', maNV: 'NV007', hoTen: 'Trần Văn Mạnh', phongBan: 'Lắp đặt', chucVu: 'Đội trưởng Lắp đặt', ngayVao: '15/08/2022', soNam: 4, soThang: 0, thamNienText: '4 năm', mocKhenThuong: 'Khen thưởng 3 năm', troCapThamNien: 800000, trangThai: 'Đang làm việc', ghiChu: '' },
  { id: '8', maNV: 'NV008', hoTen: 'Phạm Minh Trang', phongBan: 'Phòng Công nghệ và Thiết kế', chucVu: 'Kiến trúc sư 3D', ngayVao: '23/12/2025', soNam: 0, soThang: 7, thamNienText: '0 năm 7 tháng', mocKhenThuong: '—', troCapThamNien: 0, trangThai: 'Thử việc', ghiChu: 'Đang thử việc' },
];

interface ThamNienTabProps {
  searchQuery?: string;
  selectedPhongBan?: string;
}

export default function ThamNienTab({
  searchQuery,
  selectedPhongBan,
}: ThamNienTabProps) {
  const [data, setData] = useState<ThamNienItem[]>(INITIAL_THAM_NIEN_DATA);
  const [internalSearch, setInternalSearch] = useState('');
  const [internalPhongBan, setInternalPhongBan] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const search = searchQuery !== undefined ? searchQuery : internalSearch;
  const filterPhongBan = selectedPhongBan !== undefined ? selectedPhongBan : internalPhongBan;

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.hoTen.toLowerCase().includes(q) ||
        item.maNV.toLowerCase().includes(q) ||
        item.phongBan.toLowerCase().includes(q) ||
        item.chucVu.toLowerCase().includes(q) ||
        item.thamNienText.toLowerCase().includes(q);

      const matchPB = filterPhongBan === 'ALL' || item.phongBan === filterPhongBan;

      return matchSearch && matchPB;
    });
  }, [data, search, filterPhongBan]);

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
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Chức vụ</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Ngày vào công ty</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Thâm niên công tác</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Mốc khen thưởng</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Phụ cấp thâm niên (VNĐ)</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Trạng thái</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Ghi chú</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs text-right whitespace-nowrap">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="text-center py-12 text-slate-400">
                      <IconCertificate size={36} className="mx-auto mb-2 text-slate-300 stroke-1" />
                      <p className="font-semibold text-xs text-slate-600">Không tìm thấy dữ liệu thâm niên</p>
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
                          <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0 border border-emerald-100">
                            {item.hoTen.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-800 text-xs">{item.hoTen}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">{item.phongBan}</td>
                      <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">{item.chucVu}</td>
                      <td className="px-4 py-3.5 align-middle font-mono text-slate-600 whitespace-nowrap">{item.ngayVao}</td>
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {item.thamNienText}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 align-middle text-slate-700 font-semibold whitespace-nowrap">
                        {item.mocKhenThuong}
                      </td>
                      <td className="px-4 py-3.5 align-middle text-right font-bold text-emerald-700 whitespace-nowrap">
                        {item.troCapThamNien === 0 ? '0' : item.troCapThamNien.toLocaleString('vi-VN')}
                      </td>
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            item.trangThai === 'Đang làm việc'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {item.trangThai}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 align-middle text-slate-400 whitespace-nowrap">{item.ghiChu || '—'}</td>
                      <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            title="Chỉnh sửa"
                            onClick={() => alert(`Chỉnh sửa mốc thâm niên: ${item.hoTen}`)}
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
