"use client";

import React, { useState } from 'react';
import {
  IconSearch,
  IconChartBar,
  IconUpload,
  IconDownload,
  IconPlus,
  IconEye,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';

export interface PhieuSuaChuaItem {
  id: string;
  ma_phieu: string;
  thiet_bi: string;
  mo_ta_su_co: string;
  ngay_yeu_cau: string;
  muc_do: 'Khẩn cấp' | 'Cao' | 'Bình thường';
  chi_phi: number;
  don_vi_sua: string;
  trang_thai: 'Đang sửa chữa' | 'Chờ linh kiện' | 'Hoàn thành';
  phong_ban: string;
}

const mockSuaChua: PhieuSuaChuaItem[] = [
  { id: '1',  ma_phieu: 'SC-2026-08-01', thiet_bi: 'Máy nén khí trục vít Puma 20HP',  mo_ta_su_co: 'Hỏng rơ le áp suất, áp lực không đạt chuẩn',   ngay_yeu_cau: '05/08/2026', muc_do: 'Khẩn cấp',   chi_phi: 4_500_000, don_vi_sua: 'Cty Cơ điện Tân Á',       trang_thai: 'Đang sửa chữa', phong_ban: 'Phòng Cát' },
  { id: '2',  ma_phieu: 'SC-2026-07-02', thiet_bi: 'Máy khoan liên kết 6 giàn',        mo_ta_su_co: 'Kẹt mũi khoan trục ngang cụm số 3',             ngay_yeu_cau: '28/07/2026', muc_do: 'Cao',         chi_phi: 2_800_000, don_vi_sua: 'Đội kỹ thuật nội bộ',    trang_thai: 'Chờ linh kiện', phong_ban: 'Phòng Cảnh Quan' },
  { id: '3',  ma_phieu: 'SC-2026-07-01', thiet_bi: 'Máy cưa bàn trượt Altendorf F45', mo_ta_su_co: 'Thay ray trượt dẫn hướng và căn chỉnh thước',   ngay_yeu_cau: '12/07/2026', muc_do: 'Bình thường', chi_phi: 6_200_000, don_vi_sua: 'Đại diện Hãng Altendorf', trang_thai: 'Hoàn thành',    phong_ban: 'Phòng ban quản lý' },
  { id: '4',  ma_phieu: 'SC-2026-08-02', thiet_bi: 'Máy phun sơn áp lực cao',          mo_ta_su_co: 'Đầu phun bị tắc, áp lực phun yếu',              ngay_yeu_cau: '08/08/2026', muc_do: 'Cao',         chi_phi:   880_000, don_vi_sua: 'Đội kỹ thuật nội bộ',    trang_thai: 'Hoàn thành',    phong_ban: 'Phòng sơn' },
  { id: '5',  ma_phieu: 'SC-2026-08-03', thiet_bi: 'Máy đánh nhám băng chạy',          mo_ta_su_co: 'Đứt băng nhám, hư trục căng',                    ngay_yeu_cau: '10/08/2026', muc_do: 'Bình thường', chi_phi:   360_000, don_vi_sua: 'Cty Cơ điện Tân Á',       trang_thai: 'Hoàn thành',    phong_ban: 'Phòng sơn' },
  { id: '6',  ma_phieu: 'SC-2026-08-04', thiet_bi: 'Máy đục CNC 4 đầu',                mo_ta_su_co: 'Lỗi encoder trục Z, mất tọa độ',                 ngay_yeu_cau: '11/08/2026', muc_do: 'Khẩn cấp',   chi_phi: 1_290_000, don_vi_sua: 'Nhà sản xuất CNC',       trang_thai: 'Chờ linh kiện', phong_ban: 'Phòng mộc' },
  { id: '7',  ma_phieu: 'SC-2026-08-05', thiet_bi: 'Xe nâng điện 2 tấn',               mo_ta_su_co: 'Pin chai, không đủ công suất nâng',               ngay_yeu_cau: '12/08/2026', muc_do: 'Cao',         chi_phi:   950_000, don_vi_sua: 'Cty Thiết bị nâng hạ',   trang_thai: 'Đang sửa chữa', phong_ban: 'Phòng khai triển' },
  { id: '8',  ma_phieu: 'SC-2026-08-06', thiet_bi: 'Máy bào 4 mặt Weinig',             mo_ta_su_co: 'Trục dao bị lệch, bề mặt gỗ không đều',          ngay_yeu_cau: '13/08/2026', muc_do: 'Cao',         chi_phi:   382_500, don_vi_sua: 'Đại diện Weinig VN',      trang_thai: 'Chờ linh kiện', phong_ban: 'Phòng Mộc' },
  { id: '9',  ma_phieu: 'SC-2026-08-07', thiet_bi: 'Máy dán cạnh tự động SCM',         mo_ta_su_co: 'Hỏng bộ phận làm nóng keo EVA',                  ngay_yeu_cau: '14/08/2026', muc_do: 'Bình thường', chi_phi:    35_000, don_vi_sua: 'Đội kỹ thuật nội bộ',    trang_thai: 'Hoàn thành',    phong_ban: 'Phòng Mộc Sơn' },
  { id: '10', ma_phieu: 'SC-2026-08-08', thiet_bi: 'Máy cắt panel saw',                 mo_ta_su_co: 'Lưỡi cưa bị mẻ, đường cắt không thẳng',          ngay_yeu_cau: '15/08/2026', muc_do: 'Bình thường', chi_phi:    77_000, don_vi_sua: 'Đội kỹ thuật nội bộ',    trang_thai: 'Hoàn thành',    phong_ban: 'Phòng cắt' },
  { id: '11', ma_phieu: 'SC-2026-08-09', thiet_bi: 'Băng tải con lăn',                  mo_ta_su_co: 'Con lăn số 7 bị kẹt, ảnh hưởng dây chuyền',      ngay_yeu_cau: '15/08/2026', muc_do: 'Cao',         chi_phi:   880_000, don_vi_sua: 'Đội kỹ thuật nội bộ',    trang_thai: 'Đang sửa chữa', phong_ban: 'Phòng Cát' },
  { id: '12', ma_phieu: 'SC-2026-08-10', thiet_bi: 'Máy nén khí Bitzer',                mo_ta_su_co: 'Rò rỉ dầu bôi trơn ở mặt bích',                 ngay_yeu_cau: '16/08/2026', muc_do: 'Bình thường', chi_phi:     0,     don_vi_sua: 'Chưa xác định',           trang_thai: 'Chờ linh kiện', phong_ban: '(Chưa phân phòng)' },
  { id: '13', ma_phieu: 'SC-2026-08-11', thiet_bi: 'Máy chà nhám thùng',                mo_ta_su_co: 'Động cơ chính phát ra tiếng ồn bất thường',       ngay_yeu_cau: '16/08/2026', muc_do: 'Bình thường', chi_phi:     0,     don_vi_sua: 'Chưa xác định',           trang_thai: 'Chờ linh kiện', phong_ban: '(Chưa phân phòng)' },
  { id: '14', ma_phieu: 'SC-2026-08-12', thiet_bi: 'Máy phun UV tự động',               mo_ta_su_co: 'Đèn UV số 2 bị hỏng, năng suất giảm 50%',        ngay_yeu_cau: '17/08/2026', muc_do: 'Cao',         chi_phi:     0,     don_vi_sua: 'Chưa xác định',           trang_thai: 'Đang sửa chữa', phong_ban: 'Phòng ban quản lý' },
];

const MUC_DO_STYLE: Record<PhieuSuaChuaItem['muc_do'], string> = {
  'Khẩn cấp':   'bg-rose-50 text-rose-700 border-rose-300 font-bold',
  'Cao':         'bg-amber-50 text-amber-700 border-amber-300 font-semibold',
  'Bình thường': 'bg-slate-100 text-slate-700 border-slate-200',
};

const TRANG_THAI_STYLE: Record<PhieuSuaChuaItem['trang_thai'], string> = {
  'Đang sửa chữa': 'bg-blue-50 text-blue-700 border-blue-300',
  'Chờ linh kiện': 'bg-amber-50 text-amber-700 border-amber-300',
  'Hoàn thành':    'bg-emerald-50 text-emerald-700 border-emerald-300',
};

export default function SuaChua() {
  const [search, setSearch]               = useState('');
  const [selectedPhong, setSelectedPhong] = useState('all');
  const [currentPage, setCurrentPage]     = useState(1);
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

  // ── Card summary groups ─────────────────────────────────────────────────
  const phongGroups = [...new Set(mockSuaChua.map(p => p.phong_ban))].sort().map(pb => ({
    phong_ban:    pb,
    so_ban_ghi:   mockSuaChua.filter(p => p.phong_ban === pb).length,
    tong_chi_phi: mockSuaChua.filter(p => p.phong_ban === pb).reduce((s, p) => s + p.chi_phi, 0),
  }));

  const filteredPhong = phongGroups.filter(g =>
    g.phong_ban.toLowerCase().includes(search.toLowerCase())
  );

  // ── Table data ──────────────────────────────────────────────────────────
  const filtered = mockSuaChua.filter(p => {
    const matchSearch =
      p.ma_phieu.toLowerCase().includes(search.toLowerCase())   ||
      p.thiet_bi.toLowerCase().includes(search.toLowerCase())   ||
      p.mo_ta_su_co.toLowerCase().includes(search.toLowerCase()) ||
      p.phong_ban.toLowerCase().includes(search.toLowerCase());
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
            {[...new Set(mockSuaChua.map(p => p.phong_ban))].sort().map(pb => (
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
          <button type="button" className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-medium cursor-pointer shadow-xs">
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
                <span className="text-xs font-bold text-[#406c89]">{g.tong_chi_phi.toLocaleString('vi-VN')} đ</span>
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
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap w-12 min-w-[48px]">STT</th>
                <th className="text-left px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[130px] sticky left-0 z-30 bg-[#406c89] shadow-[3px_0_6px_rgba(0,0,0,0.15)]">Mã phiếu</th>
                <th className="text-left px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[150px]">Phòng ban</th>
                <th className="text-left px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[180px]">Thiết bị sự cố</th>
                <th className="text-left px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[220px]">Mô tả hư hỏng</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[90px]">Mức độ</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[105px]">Ngày yêu cầu</th>
                <th className="text-right px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[120px]">Chi phí ước tính</th>
                <th className="text-left px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[170px]">Đơn vị thực hiện</th>
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap min-w-[130px]">Trạng thái</th>
                <th className="text-center px-3.5 py-2.5 font-bold text-xs text-white whitespace-nowrap sticky right-0 z-30 bg-[#406c89] shadow-[-3px_0_6px_rgba(0,0,0,0.15)] min-w-[90px] w-24">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-10 text-slate-400 italic">
                    Không tìm thấy phiếu sửa chữa phù hợp với bộ lọc
                  </td>
                </tr>
              ) : (
                paged.map((row, idx) => (
                  <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors group">
                    <td className="px-3 py-2.5 text-center text-slate-500 font-medium border-r border-slate-100 whitespace-nowrap">
                      {(safePage - 1) * PAGE_SIZE + idx + 1}
                    </td>
                    <td className="px-3.5 py-2.5 font-mono font-semibold text-[#406c89] border-r border-slate-200 whitespace-nowrap sticky left-0 z-10 bg-white group-hover:bg-slate-50 shadow-[3px_0_6px_rgba(0,0,0,0.06)]">
                      {row.ma_phieu}
                    </td>
                    <td className="px-3.5 py-2.5 text-slate-700 font-medium border-r border-slate-100 whitespace-nowrap">{row.phong_ban}</td>
                    <td className="px-3.5 py-2.5 text-slate-800 font-medium border-r border-slate-100 whitespace-nowrap">{row.thiet_bi}</td>
                    <td className="px-3.5 py-2.5 text-slate-600 text-[11px] border-r border-slate-100 max-w-xs truncate" title={row.mo_ta_su_co}>{row.mo_ta_su_co}</td>
                    <td className="px-3 py-2.5 text-center border-r border-slate-100 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] border ${MUC_DO_STYLE[row.muc_do]}`}>{row.muc_do}</span>
                    </td>
                    <td className="px-3 py-2.5 text-center text-slate-600 border-r border-slate-100 whitespace-nowrap">{row.ngay_yeu_cau}</td>
                    <td className="px-3 py-2.5 text-right font-bold text-[#406c89] border-r border-slate-100 whitespace-nowrap">{row.chi_phi.toLocaleString('vi-VN')} đ</td>
                    <td className="px-3.5 py-2.5 text-slate-700 text-[11px] border-r border-slate-100 whitespace-nowrap truncate max-w-xs" title={row.don_vi_sua}>{row.don_vi_sua}</td>
                    <td className="px-3 py-2.5 text-center border-r border-slate-100 whitespace-nowrap">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${TRANG_THAI_STYLE[row.trang_thai]}`}>{row.trang_thai}</span>
                    </td>
                    <td className="px-3 py-2.5 text-center whitespace-nowrap sticky right-0 z-10 bg-white group-hover:bg-slate-50 shadow-[-3px_0_6px_rgba(0,0,0,0.06)] border-l border-slate-100">
                      <div className="flex items-center justify-center gap-1.5">
                        <button type="button" title="Xem chi tiết" className="p-1.5 rounded text-slate-500 hover:text-[#406c89] hover:bg-[#406c89]/10 transition-colors cursor-pointer">
                          <IconEye size={14} />
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
            <span className="font-bold text-slate-700">{filtered.length}</span> phiếu sửa chữa
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
    </div>
  );
}
