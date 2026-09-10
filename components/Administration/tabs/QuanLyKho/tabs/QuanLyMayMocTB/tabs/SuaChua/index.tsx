"use client";

import React, { useState } from 'react';
import {
  IconSearch,
  IconChartBar,
  IconUpload,
  IconDownload,
  IconPlus,
  IconEdit,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import SuaChuaDeleteModal from './modals/ModalXoa';
import SuaChuaEditModal from './modals/ModalSua';
import SuaChuaCreateModal from './modals/ModalThem';

export interface PhieuSuaChuaItem {
  id: string;
  phong_ban:           string;
  ma_may:              string;
  ten_may:             string;
  nam:                 string;
  ngay_bao_loi:        string;
  tinh_trang_bao_loi:  string;
  nguoi_bao_loi:       string;
  phuong_an_xu_ly:     string;
  ngay_thay_linh_kien: string;
  noi_dung:            string;
  don_vi_tinh:         string;
  so_luong:            number;
  don_gia:             number;
  thue_vat:            number;
  thanh_tien:          number;
  ghi_chu:             string;
}


const mockSuaChua: PhieuSuaChuaItem[] = [
  { id: '1',  phong_ban: 'Phòng Cát',          ma_may: 'MN-001', ten_may: 'Máy nén khí trục vít Puma 20HP',  nam: '2021', ngay_bao_loi: '05/08/2026', tinh_trang_bao_loi: 'Hỏng rơ le áp suất',         nguoi_bao_loi: 'Nguyễn Văn A', phuong_an_xu_ly: 'Thay rơ le mới',                    ngay_thay_linh_kien: '08/08/2026', noi_dung: 'Rơ le áp suất 20A',         don_vi_tinh: 'Cái',  so_luong: 1, don_gia: 4_500_000, thue_vat: 10, thanh_tien: 4_950_000, ghi_chu: '' },
  { id: '2',  phong_ban: 'Phòng Cảnh Quan',    ma_may: 'MK-006', ten_may: 'Máy khoan liên kết 6 giàn',       nam: '2020', ngay_bao_loi: '28/07/2026', tinh_trang_bao_loi: 'Kẹt mũi khoan cụm 3',         nguoi_bao_loi: 'Trần Thị B',   phuong_an_xu_ly: 'Tháo, vệ sinh và tra dầu',         ngay_thay_linh_kien: '',              noi_dung: 'Mũi khoan trục ngang',      don_vi_tinh: 'Cái',  so_luong: 3, don_gia:   850_000, thue_vat: 10, thanh_tien: 2_805_000, ghi_chu: 'Chờ linh kiện' },
  { id: '3',  phong_ban: 'Phòng ban quản lý',  ma_may: 'MC-045', ten_may: 'Máy cưa bàn trượt Altendorf F45', nam: '2019', ngay_bao_loi: '12/07/2026', tinh_trang_bao_loi: 'Ray trượt mòn',               nguoi_bao_loi: 'Lê Văn C',     phuong_an_xu_ly: 'Thay ray trượt và căn chỉnh thước', ngay_thay_linh_kien: '15/07/2026',    noi_dung: 'Ray trượt dẫn hướng',      don_vi_tinh: 'Bộ',   so_luong: 1, don_gia: 6_200_000, thue_vat: 10, thanh_tien: 6_820_000, ghi_chu: 'Hoàn thành' },
  { id: '4',  phong_ban: 'Phòng sơn',          ma_may: 'PS-012', ten_may: 'Máy phun sơn áp lực cao',         nam: '2022', ngay_bao_loi: '08/08/2026', tinh_trang_bao_loi: 'Đầu phun tắc',               nguoi_bao_loi: 'Phạm Thị D',   phuong_an_xu_ly: 'Vệ sinh đầu phun',                 ngay_thay_linh_kien: '09/08/2026',    noi_dung: 'Đầu phun sơn',             don_vi_tinh: 'Cái',  so_luong: 1, don_gia:   880_000, thue_vat: 10, thanh_tien:   968_000, ghi_chu: '' },
  { id: '5',  phong_ban: 'Phòng sơn',          ma_may: 'DN-021', ten_may: 'Máy đánh nhám băng chạy',         nam: '2020', ngay_bao_loi: '10/08/2026', tinh_trang_bao_loi: 'Đứt băng nhám',              nguoi_bao_loi: 'Nguyễn Văn E', phuong_an_xu_ly: 'Thay băng nhám, sửa trục căng',    ngay_thay_linh_kien: '11/08/2026',    noi_dung: 'Băng nhám 120 grit',       don_vi_tinh: 'Cuộn', so_luong: 2, don_gia:   180_000, thue_vat: 10, thanh_tien:   396_000, ghi_chu: '' },
  { id: '6',  phong_ban: 'Phòng mộc',          ma_may: 'CNC-04', ten_may: 'Máy đục CNC 4 đầu',               nam: '2023', ngay_bao_loi: '11/08/2026', tinh_trang_bao_loi: 'Lỗi encoder trục Z',          nguoi_bao_loi: 'Trần Văn F',   phuong_an_xu_ly: 'Liên hệ nhà sản xuất',             ngay_thay_linh_kien: '',              noi_dung: 'Encoder trục Z',            don_vi_tinh: 'Cái',  so_luong: 1, don_gia: 1_290_000, thue_vat: 10, thanh_tien: 1_419_000, ghi_chu: 'Chờ linh kiện' },
  { id: '7',  phong_ban: 'Phòng khai triển',   ma_may: 'XN-002', ten_may: 'Xe nâng điện 2 tấn',              nam: '2021', ngay_bao_loi: '12/08/2026', tinh_trang_bao_loi: 'Pin chai',                    nguoi_bao_loi: 'Lê Thị G',     phuong_an_xu_ly: 'Thay bộ pin mới',                  ngay_thay_linh_kien: '',              noi_dung: 'Bộ pin lithium 48V',        don_vi_tinh: 'Bộ',   so_luong: 1, don_gia:   950_000, thue_vat: 10, thanh_tien: 1_045_000, ghi_chu: 'Đang sửa' },
  { id: '8',  phong_ban: 'Phòng Mộc',          ma_may: 'MB-008', ten_may: 'Máy bào 4 mặt Weinig',            nam: '2018', ngay_bao_loi: '13/08/2026', tinh_trang_bao_loi: 'Trục dao lệch',               nguoi_bao_loi: 'Phạm Văn H',   phuong_an_xu_ly: 'Cân chỉnh lại trục dao',           ngay_thay_linh_kien: '',              noi_dung: 'Vòng bi trục dao',          don_vi_tinh: 'Cái',  so_luong: 2, don_gia:   191_250, thue_vat: 10, thanh_tien:   420_750, ghi_chu: 'Chờ linh kiện' },
  { id: '9',  phong_ban: 'Phòng Mộc Sơn',      ma_may: 'DC-009', ten_may: 'Máy dán cạnh tự động SCM',        nam: '2022', ngay_bao_loi: '14/08/2026', tinh_trang_bao_loi: 'Hỏng bộ làm nóng keo',        nguoi_bao_loi: 'Nguyễn Thị I', phuong_an_xu_ly: 'Thay điện trở nhiệt',              ngay_thay_linh_kien: '15/08/2026',    noi_dung: 'Điện trở nhiệt keo EVA',   don_vi_tinh: 'Cái',  so_luong: 1, don_gia:    35_000, thue_vat: 10, thanh_tien:    38_500, ghi_chu: 'Hoàn thành' },
  { id: '10', phong_ban: 'Phòng cắt',          ma_may: 'CP-010', ten_may: 'Máy cắt panel saw',               nam: '2020', ngay_bao_loi: '15/08/2026', tinh_trang_bao_loi: 'Lưỡi cưa mẻ',                nguoi_bao_loi: 'Trần Văn J',   phuong_an_xu_ly: 'Thay lưỡi cưa mới',                ngay_thay_linh_kien: '15/08/2026',    noi_dung: 'Lưỡi cưa TCT 315mm',      don_vi_tinh: 'Cái',  so_luong: 1, don_gia:    77_000, thue_vat: 10, thanh_tien:    84_700, ghi_chu: 'Hoàn thành' },
  { id: '11', phong_ban: 'Phòng Cát',          ma_may: 'BT-011', ten_may: 'Băng tải con lăn',                nam: '2019', ngay_bao_loi: '15/08/2026', tinh_trang_bao_loi: 'Con lăn số 7 kẹt',            nguoi_bao_loi: 'Lê Văn K',     phuong_an_xu_ly: 'Thay con lăn bị kẹt',              ngay_thay_linh_kien: '',              noi_dung: 'Con lăn thép mạ kẽm',      don_vi_tinh: 'Cái',  so_luong: 4, don_gia:   220_000, thue_vat: 10, thanh_tien:   968_000, ghi_chu: 'Đang sửa' },
  { id: '12', phong_ban: '(Chưa phân phòng)',  ma_may: 'MN-012', ten_may: 'Máy nén khí Bitzer',              nam: '2017', ngay_bao_loi: '16/08/2026', tinh_trang_bao_loi: 'Rò rỉ dầu bôi trơn',          nguoi_bao_loi: '',             phuong_an_xu_ly: 'Chưa xác định',                    ngay_thay_linh_kien: '',              noi_dung: '',                          don_vi_tinh: '',     so_luong: 0, don_gia:         0, thue_vat: 10, thanh_tien:         0, ghi_chu: 'Chờ linh kiện' },
  { id: '13', phong_ban: '(Chưa phân phòng)',  ma_may: 'CN-013', ten_may: 'Máy chà nhám thùng',              nam: '2018', ngay_bao_loi: '16/08/2026', tinh_trang_bao_loi: 'Động cơ tiếng ồn bất thường', nguoi_bao_loi: '',             phuong_an_xu_ly: 'Chưa xác định',                    ngay_thay_linh_kien: '',              noi_dung: '',                          don_vi_tinh: '',     so_luong: 0, don_gia:         0, thue_vat: 10, thanh_tien:         0, ghi_chu: 'Chờ linh kiện' },
  { id: '14', phong_ban: 'Phòng ban quản lý',  ma_may: 'UV-014', ten_may: 'Máy phun UV tự động',             nam: '2023', ngay_bao_loi: '17/08/2026', tinh_trang_bao_loi: 'Đèn UV số 2 hỏng',            nguoi_bao_loi: 'Phạm Thị L',   phuong_an_xu_ly: 'Thay đèn UV mới',                  ngay_thay_linh_kien: '',              noi_dung: 'Đèn UV 400W',              don_vi_tinh: 'Cái',  so_luong: 1, don_gia:         0, thue_vat: 10, thanh_tien:         0, ghi_chu: 'Đang sửa' },
];




export default function SuaChua() {
  const [suaChuaData, setSuaChuaData] = useState(mockSuaChua);
  const [search, setSearch]               = useState('');
  const [selectedPhong, setSelectedPhong] = useState('all');
  const [currentPage, setCurrentPage]     = useState(1);
  const [editingItem, setEditingItem]     = useState<PhieuSuaChuaItem | null>(null);
  const [deletingItem, setDeletingItem]   = useState<PhieuSuaChuaItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const PAGE_SIZE = 15;

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = React.useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !scrollContainerRef.current) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('select')) return;
    dragInfo.current = {
      isDown: true,
      startX: e.pageX - scrollContainerRef.current.offsetLeft,
      scrollLeft: scrollContainerRef.current.scrollLeft,
    };
    setIsDragging(true);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragInfo.current.isDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x    = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - dragInfo.current.startX) * 1.5;
    scrollContainerRef.current.scrollLeft = dragInfo.current.scrollLeft - walk;
  };
  const handleMouseUpOrLeave = () => { dragInfo.current.isDown = false; setIsDragging(false); };

  const handleSearch = (val: string) => { setSearch(val); setCurrentPage(1); };
  const handlePhong  = (val: string) => { setSelectedPhong(val); setCurrentPage(1); };
  const handleSaveEdit = (updatedItem: PhieuSuaChuaItem) => {
    setSuaChuaData((items) => items.map((item) => item.id === updatedItem.id ? updatedItem : item));
  };
  const handleDeleteConfirm = (id: string) => {
    setSuaChuaData((items) => items.filter((item) => item.id !== id));
  };
  const handleCreate = (newItem: PhieuSuaChuaItem) => {
    setSuaChuaData((items) => [...items, newItem]);
    setIsCreateModalOpen(false);
  };

  // ── Card summary groups ─────────────────────────────────────────────────
  const phongGroups = [...new Set(suaChuaData.map(p => p.phong_ban))].sort().map(pb => ({
    phong_ban:       pb,
    so_ban_ghi:      suaChuaData.filter(p => p.phong_ban === pb).length,
    tong_thanh_tien: suaChuaData.filter(p => p.phong_ban === pb).reduce((s, p) => s + p.thanh_tien, 0),
  }));

  const filteredPhong = phongGroups.filter(g =>
    g.phong_ban.toLowerCase().includes(search.toLowerCase())
  );

  // ── Table data ──────────────────────────────────────────────────────────
  const filtered = suaChuaData.filter(p => {
    const matchSearch =
      p.ma_may.toLowerCase().includes(search.toLowerCase())              ||
      p.ten_may.toLowerCase().includes(search.toLowerCase())             ||
      p.tinh_trang_bao_loi.toLowerCase().includes(search.toLowerCase())  ||
      p.phong_ban.toLowerCase().includes(search.toLowerCase())           ||
      p.nguoi_bao_loi.toLowerCase().includes(search.toLowerCase());
    const matchPhong = selectedPhong === 'all' || p.phong_ban === selectedPhong;
    return matchSearch && matchPhong;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage   = Math.min(currentPage, totalPages);
  const paged      = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="flex-1 flex flex-col gap-2.5 overflow-hidden">

      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 shrink-0 flex-wrap">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Tìm sửa chữa..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 text-slate-700 placeholder:text-slate-400"
            />
          </div>
          <select
            value={selectedPhong}
            onChange={(e) => handlePhong(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer font-medium"
          >
            <option value="all">Tất cả phòng ban</option>
            {[...new Set(suaChuaData.map(p => p.phong_ban))].sort().map(pb => (
              <option key={pb} value={pb}>{pb}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium cursor-pointer shadow-xs">
            <IconChartBar size={14} className="text-slate-600" /><span>Báo cáo</span>
          </button>
          <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium cursor-pointer shadow-xs">
            <IconUpload size={14} className="text-slate-600" /><span>Import Excel</span>
          </button>
          <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium cursor-pointer shadow-xs">
            <IconDownload size={14} className="text-slate-600" /><span>Xuất Excel</span>
          </button>
          <button type="button" onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-medium cursor-pointer shadow-xs">
            <IconPlus size={14} /><span>Thêm</span>
          </button>
        </div>
      </div>

      {/* ── Cards phòng ban ───────────────────────────────────────────────── */}
      <div className="shrink-0 overflow-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {filteredPhong.map((g) => (
            <div
              key={g.phong_ban}
              onClick={() => handlePhong(selectedPhong === g.phong_ban ? 'all' : g.phong_ban)}
              className={`rounded-lg border px-3 py-1.5 flex flex-col justify-between transition-all cursor-pointer select-none ${
                selectedPhong === g.phong_ban
                  ? 'bg-[#406c89]/10 border-[#406c89] shadow-xs ring-1 ring-[#406c89]/20'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <h4 className="text-xs font-semibold text-slate-800 truncate" title={g.phong_ban}>
                {g.phong_ban}
              </h4>
              <div className="flex items-center justify-between gap-1 mt-0.5">
                <span className="text-[11px] text-slate-400">{g.so_ban_ghi} bản ghi</span>
                <span className="text-xs font-bold text-[#406c89]">{g.tong_thanh_tien.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bảng chi tiết ────────────────────────────────────────────────── */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden min-h-0">
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`overflow-auto flex-1 cursor-grab active:cursor-grabbing no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${isDragging ? 'select-none cursor-grabbing' : ''}`}
          title="Nhấn giữ chuột để trượt ngang bảng"
        >
          <table className="w-full text-xs border-collapse">
            <thead className="bg-[#406c89] text-white sticky top-0 z-20 shadow-sm">
              <tr>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap w-10 min-w-[40px]">STT</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[140px]">Phòng ban quản lý</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[90px]">Mã máy</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[180px]">Tên máy</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[60px]">Năm</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[110px]">Ngày tháng báo lỗi</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[160px]">Tình trạng báo lỗi</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[120px]">Người báo lỗi</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[160px]">Phương án xử lý</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[115px]">Ngày thay linh kiện</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[160px]">Nội dung</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[85px]">Đơn vị tính</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[70px]">Số lượng</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[110px]">Đơn giá</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[80px]">Thuế VAT</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[110px]">Thành tiền</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[120px]">Ghi chú</th>
                <th className="text-center px-3.5 py-2.5 font-bold text-xs text-white whitespace-nowrap sticky right-0 z-30 bg-[#406c89] shadow-[-3px_0_6px_rgba(0,0,0,0.15)] min-w-[80px] w-20">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={18} className="text-center py-10 text-slate-400 italic">
                    Không tìm thấy bản ghi phù hợp với bộ lọc
                  </td>
                </tr>
              ) : (
                paged.map((row, idx) => (
                  <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors group">
                    {/* STT */}
                    <td className="px-2 py-2 text-center text-slate-500 font-medium border-r border-slate-100 whitespace-nowrap">
                      {(safePage - 1) * PAGE_SIZE + idx + 1}
                    </td>
                    {/* Phòng ban quản lý */}
                    <td className="px-3 py-2 text-slate-700 font-medium border-r border-slate-100 whitespace-nowrap">{row.phong_ban}</td>
                    {/* Mã máy */}
                    <td className="px-3 py-2 font-mono font-semibold text-[#406c89] border-r border-slate-100 whitespace-nowrap">{row.ma_may}</td>
                    {/* Tên máy */}
                    <td className="px-3 py-2 text-slate-800 font-medium border-r border-slate-100 whitespace-nowrap max-w-[200px] truncate" title={row.ten_may}>{row.ten_may}</td>
                    {/* Năm */}
                    <td className="px-2 py-2 text-center text-slate-600 border-r border-slate-100 whitespace-nowrap">{row.nam}</td>
                    {/* Ngày báo lỗi */}
                    <td className="px-3 py-2 text-center text-slate-600 border-r border-slate-100 whitespace-nowrap">{row.ngay_bao_loi}</td>
                    {/* Tình trạng báo lỗi */}
                    <td className="px-3 py-2 text-slate-600 text-[11px] border-r border-slate-100 whitespace-nowrap max-w-[180px] truncate" title={row.tinh_trang_bao_loi}>{row.tinh_trang_bao_loi}</td>
                    {/* Người báo lỗi */}
                    <td className="px-3 py-2 text-slate-700 border-r border-slate-100 whitespace-nowrap">{row.nguoi_bao_loi || <span className="text-slate-300 italic">—</span>}</td>
                    {/* Phương án xử lý */}
                    <td className="px-3 py-2 text-slate-600 text-[11px] border-r border-slate-100 whitespace-nowrap max-w-[180px] truncate" title={row.phuong_an_xu_ly}>{row.phuong_an_xu_ly}</td>
                    {/* Ngày thay linh kiện */}
                    <td className="px-3 py-2 text-center text-slate-600 border-r border-slate-100 whitespace-nowrap">{row.ngay_thay_linh_kien || <span className="text-slate-300 italic">—</span>}</td>
                    {/* Nội dung */}
                    <td className="px-3 py-2 text-slate-600 text-[11px] border-r border-slate-100 whitespace-nowrap max-w-[180px] truncate" title={row.noi_dung}>{row.noi_dung || <span className="text-slate-300 italic">—</span>}</td>
                    {/* Đơn vị tính */}
                    <td className="px-3 py-2 text-center text-slate-600 border-r border-slate-100 whitespace-nowrap">{row.don_vi_tinh || <span className="text-slate-300 italic">—</span>}</td>
                    {/* Số lượng */}
                    <td className="px-3 py-2 text-center text-slate-700 font-medium border-r border-slate-100 whitespace-nowrap">{row.so_luong > 0 ? row.so_luong : <span className="text-slate-300 italic">—</span>}</td>
                    {/* Đơn giá */}
                    <td className="px-3 py-2 text-right text-slate-700 font-medium border-r border-slate-100 whitespace-nowrap">{row.don_gia > 0 ? row.don_gia.toLocaleString('vi-VN') : <span className="text-slate-300 italic">—</span>}</td>
                    {/* Thuế VAT */}
                    <td className="px-3 py-2 text-center text-slate-600 border-r border-slate-100 whitespace-nowrap">{row.thue_vat}%</td>
                    {/* Thành tiền */}
                    <td className="px-3 py-2 text-right font-bold text-[#406c89] border-r border-slate-100 whitespace-nowrap">{row.thanh_tien > 0 ? row.thanh_tien.toLocaleString('vi-VN') : <span className="text-slate-300 italic font-normal">—</span>}</td>
                    {/* Ghi chú */}
                    <td className="px-3 py-2 text-slate-500 text-[11px] border-r border-slate-100 whitespace-nowrap">{row.ghi_chu || <span className="text-slate-300 italic">—</span>}</td>
                    {/* Thao tác */}
                    <td className="px-3 py-2 text-center whitespace-nowrap sticky right-0 z-10 bg-white group-hover:bg-slate-50 shadow-[-3px_0_6px_rgba(0,0,0,0.06)] border-l border-slate-100">
                      <div className="flex items-center justify-center gap-1">
                        <button type="button" title="Sửa" onClick={() => setEditingItem(row)} className="p-1.5 rounded text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer">
                          <IconEdit size={14} />
                        </button>
                        <button type="button" title="Xóa" onClick={() => setDeletingItem(row)} className="p-1.5 rounded text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer">
                          <IconTrash size={14} />
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
            Hiển thị{' '}
            <span className="font-bold text-slate-700">{filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}</span>
            {' '}-{' '}
            <span className="font-bold text-slate-700">{Math.min(safePage * PAGE_SIZE, filtered.length)}</span>
            {' '}trên tổng số{' '}
            <span className="font-bold text-slate-700">{filtered.length}</span> bản ghi sửa chữa
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <IconChevronLeft size={13} /><span>Trước</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                style={safePage === page ? { backgroundColor: '#406c89' } : {}}
                className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                  safePage === page ? 'text-white shadow-2xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Sau</span><IconChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      <SuaChuaCreateModal
        key={isCreateModalOpen ? 'create-open' : 'create-closed'}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreate}
      />

      <SuaChuaEditModal
        key={editingItem?.id ?? 'edit'}
        isOpen={!!editingItem}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onSave={handleSaveEdit}
      />

      <SuaChuaDeleteModal
        isOpen={!!deletingItem}
        item={deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
