"use client";

import React, { useState } from 'react';
import {
  IconFileText,
  IconPlus,
  IconSearch,
  IconDownload,
  IconFilter,
  IconEye,
  IconMail,
  IconPhone,
  IconCalendar,
} from '@tabler/icons-react';

const mockCandidates = [
  { id: 'UV-001', hoTen: 'Trần Văn Hoàng', viTri: 'Kỹ sư Khai triển 3D', kinhNghiem: '3 năm', phongBan: 'Phòng Khai triển', ngayNop: '12/11/2026', email: 'hoang.tran@gmail.com', sdt: '0912 345 678', nguon: 'TopCV', trangThai: 'Chờ phỏng vấn' },
  { id: 'UV-002', hoTen: 'Lê Thị Thu Thảo', viTri: 'Chuyên viên Cảnh quan', kinhNghiem: '2 năm', phongBan: 'Phòng Cảnh Quan', ngayNop: '14/11/2026', email: 'thao.le@gmail.com', sdt: '0988 777 666', nguon: 'VietnamWorks', trangThai: 'Đã duyệt hồ sơ' },
  { id: 'UV-003', hoTen: 'Nguyễn Đình Phúc', viTri: 'Thợ sơn hoàn thiện', kinhNghiem: '5 năm', phongBan: 'Phòng Mộc Sơn', ngayNop: '10/11/2026', email: 'phuc.dinh@gmail.com', sdt: '0903 111 222', nguon: 'Giới thiệu', trangThai: 'Đã phỏng vấn' },
  { id: 'UV-004', hoTen: 'Hoàng Trọng Nghĩa', viTri: 'Kỹ sư Chiếu sáng LED', kinhNghiem: '4 năm', phongBan: 'Phòng Điện', ngayNop: '08/11/2026', email: 'nghia.hoang@gmail.com', sdt: '0977 888 999', nguon: 'TopCV', trangThai: 'Đề xuất tuyển' },
  { id: 'UV-005', hoTen: 'Phạm Thuỳ Linh', viTri: 'Nhân viên Kinh doanh', kinhNghiem: '1 năm', phongBan: 'Phòng Kinh doanh', ngayNop: '15/11/2026', email: 'linh.pham@gmail.com', sdt: '0933 222 111', nguon: 'Facebook', trangThai: 'Mới nhận' },
];

export default function DsHoSoTuyenDung() {
  const [search, setSearch] = useState('');

  const filtered = mockCandidates.filter(
    (c) =>
      c.hoTen.toLowerCase().includes(search.toLowerCase()) ||
      c.viTri.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 p-5 space-y-4">
      {/* ── Top Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative">
            <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo mã, tên ứng viên, vị trí..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72 pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-[#406c89] focus:outline-none transition-colors"
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <IconFilter size={14} />
            <span>Bộ lọc</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <IconDownload size={14} />
            <span>Xuất DS</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#406c89] hover:bg-[#345970] rounded-lg transition-colors shadow-2xs"
          >
            <IconPlus size={14} />
            <span>Tiếp nhận hồ sơ mới</span>
          </button>
        </div>
      </div>

      {/* ── Table Container ── */}
      <div className="flex-1 min-h-0 border border-slate-200 rounded-xl overflow-hidden flex flex-col bg-white">
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 bg-[#f8fafc] text-slate-600 font-bold border-b border-slate-200 z-10">
              <tr>
                <th className="py-2.5 px-4 w-12 text-center">STT</th>
                <th className="py-2.5 px-4">MÃ ỨNG VIÊN</th>
                <th className="py-2.5 px-4">HỌ VÀ TÊN</th>
                <th className="py-2.5 px-4">VỊ TRÍ ỨNG TUYỂN</th>
                <th className="py-2.5 px-4">KINH NGHIỆM</th>
                <th className="py-2.5 px-4">LIÊN HỆ</th>
                <th className="py-2.5 px-4">NGÀY NỘP</th>
                <th className="py-2.5 px-4 text-center">NGUỒN</th>
                <th className="py-2.5 px-4 text-center">TRẠNG THÁI</th>
                <th className="py-2.5 px-4 text-center w-16">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-4 text-center text-slate-400 font-medium">{index + 1}</td>
                  <td className="py-2.5 px-4 font-bold text-[#406c89]">{item.id}</td>
                  <td className="py-2.5 px-4 font-bold text-slate-800">{item.hoTen}</td>
                  <td className="py-2.5 px-4 text-slate-700 font-medium">{item.viTri}</td>
                  <td className="py-2.5 px-4 text-slate-600">{item.kinhNghiem}</td>
                  <td className="py-2.5 px-4 text-slate-500">
                    <div className="flex flex-col gap-0.5 text-[11px]">
                      <span className="flex items-center gap-1"><IconPhone size={11} className="text-slate-400" />{item.sdt}</span>
                      <span className="flex items-center gap-1"><IconMail size={11} className="text-slate-400" />{item.email}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">{item.ngayNop}</td>
                  <td className="py-2.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                      {item.nguon}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.trangThai === 'Đề xuất tuyển'
                          ? 'bg-emerald-100 text-emerald-700'
                          : item.trangThai === 'Chờ phỏng vấn'
                          ? 'bg-amber-100 text-amber-700'
                          : item.trangThai === 'Đã duyệt hồ sơ'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.trangThai}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <button
                      type="button"
                      className="p-1 text-slate-400 hover:text-[#406c89] hover:bg-slate-100 rounded transition-colors"
                      title="Xem chi tiết hồ sơ"
                    >
                      <IconEye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
