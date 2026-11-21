"use client";

import React, { useState, useMemo, useRef } from 'react';
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
  IconShieldCheck,
  IconFileText,
} from '@tabler/icons-react';
import { PHONG_BAN_LIST, TRANG_THAI_LIST } from '../DanhSachTongQuat';

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
}

export const INITIAL_HO_SO_DATA: HoSoPhapLyItem[] = [
  { id: '1', maNV: 'NV001', hoTen: 'Bùi Thị Duyên', phongBan: 'Phòng Kinh doanh', chucVu: 'Trưởng phòng Kinh doanh', soCCCD: '037190001234', ngayCapCCCD: '15/05/2021', noiCapCCCD: 'Cục Cảnh sát QLHC', mstCaNhan: '8392019283', soBHXH: '7912345678', nganHang: 'Vietcombank', soTaiKhoan: '1012398472', tinhTrangHoSo: 'Đầy đủ', ghiChu: 'Đã xác minh đầy đủ' },
  { id: '2', maNV: 'NV002', hoTen: 'Nguyễn Phú Quang', phongBan: 'Phòng Khai triển', chucVu: 'Trưởng phòng Khai triển', soCCCD: '037088002345', ngayCapCCCD: '20/10/2022', noiCapCCCD: 'Cục Cảnh sát QLHC', mstCaNhan: '8401928374', soBHXH: '7923456789', nganHang: 'Techcombank', soTaiKhoan: '19034827192', tinhTrangHoSo: 'Đầy đủ', ghiChu: '' },
  { id: '3', maNV: 'NV003', hoTen: 'Kỳ Anh', phongBan: 'Phòng Cảnh Quan', chucVu: 'Chuyên viên Cảnh quan', soCCCD: '038095003456', ngayCapCCCD: '12/03/2023', noiCapCCCD: 'Cục Cảnh sát QLHC', mstCaNhan: '8512938475', soBHXH: '7934567890', nganHang: 'MB Bank', soTaiKhoan: '0812938471', tinhTrangHoSo: 'Đầy đủ', ghiChu: '' },
  { id: '4', maNV: 'NV004', hoTen: 'Bùi Phương Uyên', phongBan: 'Phòng Điện', chucVu: 'Kỹ sư Điện & Chiếu sáng', soCCCD: '037196004567', ngayCapCCCD: '05/08/2022', noiCapCCCD: 'Cục Cảnh sát QLHC', mstCaNhan: '8623049586', soBHXH: '7945678901', nganHang: 'VietinBank', soTaiKhoan: '1088273645', tinhTrangHoSo: 'Thiếu BHXH', ghiChu: 'Chờ chốt sổ công ty cũ' },
  { id: '5', maNV: 'NV005', hoTen: 'Thao Phung', phongBan: 'Phòng Mộc Sơn', chucVu: 'KTV Sơn hoàn thiện', soCCCD: '037198005678', ngayCapCCCD: '18/11/2023', noiCapCCCD: 'Cục Cảnh sát QLHC', mstCaNhan: '—', soBHXH: '—', nganHang: 'VPBank', soTaiKhoan: '9827364512', tinhTrangHoSo: 'Chưa nộp', ghiChu: 'Đang thử việc, hẹn nộp tuần tới' },
  { id: '6', maNV: 'NV006', hoTen: 'Lê Hoàng Long', phongBan: 'Phòng Cắt', chucVu: 'KTV Laser & CNC', soCCCD: '037092006789', ngayCapCCCD: '22/01/2022', noiCapCCCD: 'Cục Cảnh sát QLHC', mstCaNhan: '8734150697', soBHXH: '7956789012', nganHang: 'Vietcombank', soTaiKhoan: '1029384756', tinhTrangHoSo: 'Đầy đủ', ghiChu: '' },
  { id: '7', maNV: 'NV007', hoTen: 'Trần Văn Mạnh', phongBan: 'Lắp đặt', chucVu: 'Đội trưởng Lắp đặt', soCCCD: '037089007890', ngayCapCCCD: '09/09/2021', noiCapCCCD: 'Cục Cảnh sát QLHC', mstCaNhan: '8845261708', soBHXH: '7967890123', nganHang: 'Agribank', soTaiKhoan: '2200384756', tinhTrangHoSo: 'Đầy đủ', ghiChu: '' },
  { id: '8', maNV: 'NV008', hoTen: 'Phạm Minh Trang', phongBan: 'Phòng Công nghệ và Thiết kế', chucVu: 'Kiến trúc sư 3D', soCCCD: '037197008901', ngayCapCCCD: '14/02/2024', noiCapCCCD: 'Cục Cảnh sát QLHC', mstCaNhan: '—', soBHXH: '—', nganHang: 'Techcombank', soTaiKhoan: '1902837465', tinhTrangHoSo: 'Thiếu MST', ghiChu: 'Đang đăng ký mã số thuế' },
];

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
  const [data, setData] = useState<HoSoPhapLyItem[]>(INITIAL_HO_SO_DATA);
  const [internalSearch, setInternalSearch] = useState('');
  const [internalPhongBan, setInternalPhongBan] = useState('ALL');
  const [internalTinhTrang, setInternalTinhTrang] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
        item.mstCaNhan.toLowerCase().includes(q);

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
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Số CCCD / CMND</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Ngày cấp</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Nơi cấp</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Mã số thuế</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Số sổ BHXH</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Ngân hàng</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Số tài khoản</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Tình trạng hồ sơ</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Ghi chú</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs text-right whitespace-nowrap">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="text-center py-12 text-slate-400">
                      <IconShieldCheck size={36} className="mx-auto mb-2 text-slate-300 stroke-1" />
                      <p className="font-semibold text-xs text-slate-600">Không tìm thấy hồ sơ pháp lý phù hợp</p>
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
                          <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-[10px] shrink-0 border border-blue-100">
                            {item.hoTen.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-800 text-xs">{item.hoTen}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">{item.phongBan}</td>
                      <td className="px-4 py-3.5 align-middle font-mono font-semibold text-slate-700 whitespace-nowrap">{item.soCCCD}</td>
                      <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">{item.ngayCapCCCD}</td>
                      <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">{item.noiCapCCCD}</td>
                      <td className="px-4 py-3.5 align-middle font-mono text-slate-700 whitespace-nowrap">{item.mstCaNhan}</td>
                      <td className="px-4 py-3.5 align-middle font-mono text-slate-700 whitespace-nowrap">{item.soBHXH}</td>
                      <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">{item.nganHang}</td>
                      <td className="px-4 py-3.5 align-middle font-mono font-bold text-slate-800 whitespace-nowrap">{item.soTaiKhoan}</td>
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
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
                      <td className="px-4 py-3.5 align-middle text-slate-400 whitespace-nowrap">{item.ghiChu || '—'}</td>
                      <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            title="Chỉnh sửa"
                            onClick={() => alert(`Chỉnh sửa hồ sơ: ${item.hoTen}`)}
                            className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                          >
                            <IconPencil size={13} />
                          </button>
                          <button
                            type="button"
                            title="Xóa"
                            onClick={() => alert(`Xóa hồ sơ: ${item.hoTen}`)}
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
    </div>
  );
}
