"use client";

import React, { useRef, useState } from 'react';
import {
  IconChartBar,
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconEdit,
  IconPlus,
  IconSearch,
  IconSelector,
  IconTrash,
  IconUpload,
  IconUsers,
} from '@tabler/icons-react';

const mockNhapKho = [
  { phieu: 'NCC-001', nhom_nvl: 'VẬT LIỆU SƠN - KEO (15)', phan_loai: 'I', tan_suat: 'A', chat_luong: 5, gia_nvl: 'Tốt', tg_giao_dat: 'Đúng hạn', on_dinh: 'Tốt', uu_dai: 'Có', tt_toan: 'Đúng hạn', ma_ncc: 'NCC-TMN', ncc: 'Công ty Thép Miền Nam', dia_chi: 'TP. Hồ Chí Minh', sdt: '0901 234 567', nvl_cung_cap: 'Thép hộp, thép tấm', ghi_chu: 'Đối tác lâu năm', tong: 18_750_000, trang_thai: 'Đã duyệt' },
  { phieu: 'NCC-003', nhom_nvl: 'VẬT LIỆU SƠN - KEO (15)', phan_loai: 'II', tan_suat: 'B', chat_luong: 4, gia_nvl: 'Tốt', tg_giao_dat: 'Khá', on_dinh: 'Tốt', uu_dai: 'Có', tt_toan: 'Tốt', ma_ncc: 'NCC-SBT', ncc: 'Sơn Bạch Tuyết', dia_chi: 'Bình Dương', sdt: '0933 456 789', nvl_cung_cap: 'Sơn nước, sơn công nghiệp', ghi_chu: 'Đủ chứng từ', tong: 8_160_000, trang_thai: 'Đã duyệt' },
  { phieu: 'NCC-002', nhom_nvl: 'KÍNH LD VIỆT NHẬT + TEMPER + PHỤ KIỆN KÍNH (5)', phan_loai: 'II', tan_suat: 'A', chat_luong: 4, gia_nvl: 'Khá', tg_giao_dat: 'Đúng hạn', on_dinh: 'Khá', uu_dai: 'Có', tt_toan: 'Đúng hạn', ma_ncc: 'NCC-NVP', ncc: 'Nhôm Việt Pháp', dia_chi: 'Hà Nội', sdt: '0912 345 678', nvl_cung_cap: 'Nhôm tấm, nhôm định hình', ghi_chu: 'Giao hàng nhanh', tong: 35_280_000, trang_thai: 'Chờ duyệt' },
  { phieu: 'NCC-004', nhom_nvl: 'ĐINH - VÍT - GHIM - ĐÁ CẮT SẮT - BÁNH XE (10)', phan_loai: 'III', tan_suat: 'B', chat_luong: 3, gia_nvl: 'Khá', tg_giao_dat: 'Trung bình', on_dinh: 'Khá', uu_dai: 'Không', tt_toan: 'Đúng hạn', ma_ncc: 'NCC-THP', ncc: 'Thiết bị Hùng Phát', dia_chi: 'Đà Nẵng', sdt: '0988 765 432', nvl_cung_cap: 'Thiết bị điện, phụ kiện', ghi_chu: 'Cần đánh giá lại', tong: 12_400_000, trang_thai: 'Nháp' },
];

const extraSuppliers = Array.from({ length: 29 }, (_, index) => {
  const rowNumber = index + 5;
  const nhom_nvl = index < 13
    ? 'VẬT LIỆU SƠN - KEO (15)'
    : index < 17
      ? 'KÍNH LD VIỆT NHẬT + TEMPER + PHỤ KIỆN KÍNH (5)'
      : index < 27
        ? 'ĐINH - VÍT - GHIM - ĐÁ CẮT SẮT - BÁNH XE (10)'
        : 'GIẤY BÌA (3)';

  return {
    ...mockNhapKho[index % mockNhapKho.length],
    phieu: `NCC-${String(rowNumber).padStart(3, '0')}`,
    nhom_nvl,
    phan_loai: rowNumber % 4 === 0 ? 'II' : 'I',
    tan_suat: rowNumber % 3 === 0 ? 'B' : 'A',
    ma_ncc: `NCC_VN_MB_${String(rowNumber + 1).padStart(3, '0')}`,
    ncc: `Nhà cung cấp vật liệu ${rowNumber}`,
    dia_chi: `${rowNumber * 5} Nguyễn Trãi, Hà Nội`,
    sdt: `09${String(10000000 + rowNumber * 12345).slice(0, 8)}`,
    ghi_chu: rowNumber % 3 === 0 ? 'Đang cập nhật' : 'Đã đánh giá',
  };
});

const groupOrder = [
  'VẬT LIỆU SƠN - KEO (15)',
  'KÍNH LD VIỆT NHẬT + TEMPER + PHỤ KIỆN KÍNH (5)',
  'ĐINH - VÍT - GHIM - ĐÁ CẮT SẮT - BÁNH XE (10)',
  'GIẤY BÌA (3)',
];

const supplierRows = [...mockNhapKho, ...extraSuppliers].sort(
  (a, b) => groupOrder.indexOf(a.nhom_nvl) - groupOrder.indexOf(b.nhom_nvl)
);

export default function NhapKhoTab() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tất cả nhóm hàng');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 20;
  const tableScrollRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef({ isDown: false, startX: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !tableScrollRef.current) return;
    const target = event.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('select')) return;

    dragInfo.current = {
      isDown: true,
      startX: event.pageX - tableScrollRef.current.offsetLeft,
      scrollLeft: tableScrollRef.current.scrollLeft,
    };
    setIsDragging(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragInfo.current.isDown || !tableScrollRef.current) return;
    event.preventDefault();
    const x = event.pageX - tableScrollRef.current.offsetLeft;
    const walk = (x - dragInfo.current.startX) * 1.5;
    tableScrollRef.current.scrollLeft = dragInfo.current.scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    dragInfo.current.isDown = false;
    setIsDragging(false);
  };

  const filtered = supplierRows.filter(
    (p) =>
      p.phieu.toLowerCase().includes(search.toLowerCase()) ||
      p.ncc.toLowerCase().includes(search.toLowerCase()) ||
      p.nhom_nvl.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedData = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex-1 flex flex-col gap-3 overflow-auto">
      <div className="shrink-0 rounded-xl bg-[#406c89] px-4 py-2.5 text-white shadow-sm">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 font-bold text-sm">
            <IconUsers size={18} />
            <span>DANH SÁCH NHÀ CUNG CẤP</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button type="button" className="flex items-center gap-1 rounded-md border border-white/80 px-2.5 py-1 text-[11px] font-semibold hover:bg-white/10 transition-colors">
              <IconUpload size={13} /> Import Excel
            </button>
            <button type="button" className="flex items-center gap-1 rounded-md border border-white/80 px-2.5 py-1 text-[11px] font-semibold hover:bg-white/10 transition-colors">
              <IconDownload size={13} /> Xuất Excel
            </button>
            <button type="button" className="flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-[#406c89] hover:bg-slate-50 transition-colors">
              <IconChartBar size={13} /> Báo cáo
            </button>
            <button type="button" className="flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-[#406c89] hover:bg-slate-50 transition-colors">
              <IconPlus size={13} /> Thêm NCC
            </button>
          </div>
        </div>
      </div>

      <div className="shrink-0 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2">
        <div className="flex items-start gap-6 flex-wrap text-[11px] text-slate-700">
          <div>
            <div className="mb-1 font-semibold">Phân loại NCC</div>
            <div className="flex items-center gap-1">
              {['I', 'II', 'III'].map((type, index) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(selectedType === type ? '' : type)}
                  className={`min-w-[36px] rounded px-2.5 py-0.5 font-semibold transition-colors ${
                    selectedType === type
                      ? 'bg-[#406c89] text-white'
                      : index === 2
                        ? 'bg-amber-200 text-slate-800 hover:bg-amber-300'
                        : index === 1
                          ? 'bg-orange-200 text-slate-800 hover:bg-orange-300'
                          : 'bg-blue-200 text-slate-800 hover:bg-blue-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1 font-semibold">Tần suất giao dịch</div>
            <div className="flex items-center gap-1">
              {['A', 'B'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(selectedType === type ? '' : type)}
                  className={`min-w-[36px] rounded px-2.5 py-0.5 font-semibold transition-colors ${selectedType === type ? 'bg-[#406c89] text-white' : 'bg-blue-200 text-slate-800 hover:bg-blue-300'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1 font-semibold">Thang điểm đánh giá (1-6)</div>
            <div className="flex items-start gap-1">
              {[1, 2, 3, 4, 5, 6].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setSelectedRating(selectedRating === String(rating) ? '' : String(rating))}
                  className={`flex min-w-[36px] flex-col items-center rounded px-2.5 py-0.5 font-semibold transition-colors ${
                    selectedRating === String(rating)
                      ? 'bg-[#406c89] text-white'
                      : rating <= 2
                        ? 'bg-orange-200 text-slate-800 hover:bg-orange-300'
                        : rating === 3
                          ? 'bg-yellow-200 text-slate-800 hover:bg-yellow-300'
                          : rating === 4
                            ? 'bg-lime-200 text-slate-800 hover:bg-lime-300'
                            : rating === 5
                              ? 'bg-blue-200 text-slate-800 hover:bg-blue-300'
                              : 'bg-yellow-100 text-slate-800 hover:bg-yellow-200'
                  }`}
                >
                  {rating}
                  <span className="mt-0.5 text-[8px] font-normal text-slate-500">
                    {['Kém', 'Trung bình', 'Khá', 'Tốt', 'Rất tốt', 'Xuất sắc'][rating - 1]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="relative flex-1">
          <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Tìm theo tên, mã, phân loại, NVL, địa chỉ, SĐT..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
          />
        </div>
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-[32%] rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
        >
          <option>Tất cả nhóm hàng</option>
          <option>Thép</option>
          <option>Nhôm</option>
          <option>Sơn</option>
          <option>Thiết bị</option>
        </select>
      </div>

      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-h-0">
        <div
          ref={tableScrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`overflow-auto flex-1 cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${isDragging ? 'select-none' : ''}`}
          title="Nhấn giữ chuột để trượt ngang bảng"
        >
          <table className="w-full min-w-[1500px] text-xs border-collapse">
            <thead className="sticky top-0 z-50 bg-[#e8edf5] text-[#172b4d]">
              <tr>
                <th rowSpan={2} className="w-12 border border-slate-300 px-2 py-2 text-center font-bold whitespace-nowrap">STT</th>
                <th rowSpan={2} className="min-w-[250px] border border-slate-300 px-2 py-2 text-left font-bold whitespace-nowrap">Vật liệu</th>
                <th rowSpan={2} className="w-20 border border-slate-300 px-2 py-2 text-center font-bold whitespace-nowrap">Phân loại NCC</th>
                <th rowSpan={2} className="w-24 border border-slate-300 px-2 py-2 text-center font-bold whitespace-nowrap">Tần suất giao dịch</th>
                <th colSpan={6} className="border border-slate-300 bg-yellow-300 px-2 py-2 text-center font-bold whitespace-nowrap">ĐÁNH GIÁ NCC</th>
                <th colSpan={6} className="border border-slate-300 px-2 py-2 text-center font-bold whitespace-nowrap">THÔNG TIN NCC</th>
                <th rowSpan={2} className="sticky top-0 right-0 z-50 w-20 min-w-[80px] border border-slate-300 !bg-[#e8edf5] px-3.5 py-2.5 text-center font-bold whitespace-nowrap shadow-[-3px_0_6px_rgba(0,0,0,0.15)]">Thao tác</th>
              </tr>
              <tr>
                {['Chất lượng', 'Giá NVL', 'TG giao đặt', 'Ổn định', 'Ưu đãi & BH', 'TT toán', 'Mã nhà CC', 'NCC', 'ĐC', 'SĐT', 'NVL cung cấp', 'Ghi chú'].map((heading) => (
                  <th key={heading} className={`border border-slate-300 px-2 py-2 text-center font-bold whitespace-nowrap ${['Chất lượng', 'Giá NVL', 'TG giao đặt', 'Ổn định', 'Ưu đãi & BH', 'TT toán'].includes(heading) ? 'bg-yellow-200' : ''}`}>
                    <span className="inline-flex items-center gap-1">{heading}<IconSelector size={11} className="text-slate-400" /></span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((p, i) => (
                    <tr key={p.phieu} className={`group border-b border-slate-200 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                      <td className="border border-slate-200 px-2 py-2 text-center font-medium text-slate-500">{(safePage - 1) * PAGE_SIZE + i + 1}</td>
                      <td className="border border-slate-200 px-2 py-2 font-semibold text-slate-700 whitespace-nowrap">{p.nhom_nvl}</td>
                      <td className={`border border-slate-200 px-2 py-2 text-center font-bold ${p.phan_loai === 'II' ? 'bg-orange-200' : 'bg-blue-200'}`}>{p.phan_loai}</td>
                      <td className={`border border-slate-200 px-2 py-2 text-center font-bold ${p.tan_suat === 'A' ? 'bg-yellow-200' : 'bg-blue-200'}`}>{p.tan_suat}</td>
                      <td className="border border-slate-200 bg-sky-400 px-2 py-2 text-center font-semibold">{p.chat_luong}.1</td>
                      <td className="border border-slate-200 bg-slate-200 px-2 py-2 whitespace-nowrap text-center">{p.gia_nvl}</td>
                      <td className="border border-slate-200 bg-green-200 px-2 py-2 whitespace-nowrap text-center">{p.tg_giao_dat}</td>
                      <td className="border border-slate-200 bg-orange-200 px-2 py-2 whitespace-nowrap text-center">{p.on_dinh}</td>
                      <td className="border border-slate-200 bg-blue-200 px-2 py-2 whitespace-nowrap text-center">{p.uu_dai}</td>
                      <td className="border border-slate-200 bg-yellow-200 px-2 py-2 whitespace-nowrap text-center">{p.tt_toan}</td>
                      <td className="border border-slate-200 px-2 py-2 font-mono text-[#406c89] whitespace-nowrap">{p.ma_ncc}</td>
                      <td className="border border-slate-200 px-2 py-2 font-medium text-slate-700 whitespace-nowrap">{p.ncc}</td>
                      <td className="border border-slate-200 px-2 py-2 whitespace-nowrap">{p.dia_chi}</td>
                      <td className="border border-slate-200 px-2 py-2 whitespace-nowrap">{p.sdt}</td>
                      <td className="border border-slate-200 px-2 py-2 whitespace-nowrap">{p.nvl_cung_cap}</td>
                      <td className="border border-slate-200 px-2 py-2 whitespace-nowrap">{p.ghi_chu}</td>
                      <td className={`sticky right-0 z-20 min-w-[80px] overflow-hidden border-l border-slate-100 !bg-white px-3 py-2 text-center whitespace-nowrap shadow-[-3px_0_6px_rgba(0,0,0,0.06)] ${i % 2 === 0 ? '' : '!bg-slate-50/30'} group-hover:!bg-slate-50`}>
                        <div className="flex items-center justify-center gap-1">
                          <button type="button" title="Sửa" className="text-slate-700 hover:text-[#406c89]"><IconEdit size={13} /></button>
                          <button type="button" title="Xóa" className="text-red-400 hover:text-red-600"><IconTrash size={13} /></button>
                        </div>
                      </td>
                    </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div>
            Hiển thị{' '}
            <span className="font-bold text-slate-700">{filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}</span>
            {' '}-{' '}
            <span className="font-bold text-slate-700">{Math.min(safePage * PAGE_SIZE, filtered.length)}</span>
            {' '}trên tổng số{' '}
            <span className="font-bold text-slate-700">{filtered.length}</span> nhà cung cấp
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <IconChevronLeft size={13} />
              <span>Trước</span>
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                style={safePage === page ? { backgroundColor: '#406c89' } : {}}
                className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                  safePage === page
                    ? 'text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Sau</span>
              <IconChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
