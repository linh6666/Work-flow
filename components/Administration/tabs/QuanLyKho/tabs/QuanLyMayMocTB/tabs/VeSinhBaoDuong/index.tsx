"use client";

import React, { useState } from 'react';
import { IconSearch, IconChartBar, IconUpload, IconDownload, IconPlus, IconEdit, IconTrash, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import ModalSua from './modals/ModalSua';
import ModalXoa from './modals/ModalXoa';
import ModalThem from './modals/ModalThem';

export interface PhieuVeSinhBaoDuongItem {
  id: string; phong_ban: string; ma_may: string; ten_may: string; nam: string; ngay_bao_loi: string;
  tinh_trang_bao_loi: string; nguoi_bao_loi: string; phuong_an_xu_ly: string; ngay_thay_linh_kien: string;
  noi_dung: string; don_vi_tinh: string; so_luong: number; don_gia: number; thue_vat: number; thanh_tien: number; ghi_chu: string;
}

const mockData: PhieuVeSinhBaoDuongItem[] = [
  { id: '1', phong_ban: 'Phòng Cát', ma_may: 'MN-001', ten_may: 'Máy nén khí trục vít Puma 20HP', nam: '2021', ngay_bao_loi: '05/08/2026', tinh_trang_bao_loi: 'Hỏng rơ le áp suất', nguoi_bao_loi: 'Nguyễn Văn A', phuong_an_xu_ly: 'Thay rơ le mới', ngay_thay_linh_kien: '08/08/2026', noi_dung: 'Rơ le áp suất 20A', don_vi_tinh: 'Cái', so_luong: 1, don_gia: 4500000, thue_vat: 10, thanh_tien: 4950000, ghi_chu: '' },
  { id: '2', phong_ban: 'Phòng Cảnh Quan', ma_may: 'MK-006', ten_may: 'Máy khoan liên kết 6 giàn', nam: '2020', ngay_bao_loi: '28/07/2026', tinh_trang_bao_loi: 'Kẹt mũi khoan cụm 3', nguoi_bao_loi: 'Trần Thị B', phuong_an_xu_ly: 'Tháo, vệ sinh và tra dầu', ngay_thay_linh_kien: '', noi_dung: 'Mũi khoan trục ngang', don_vi_tinh: 'Cái', so_luong: 3, don_gia: 850000, thue_vat: 10, thanh_tien: 2805000, ghi_chu: 'Chờ linh kiện' },
  { id: '3', phong_ban: 'Phòng ban quản lý', ma_may: 'MC-045', ten_may: 'Máy cưa bàn trượt Altendorf F45', nam: '2019', ngay_bao_loi: '12/07/2026', tinh_trang_bao_loi: 'Ray trượt mòn', nguoi_bao_loi: 'Lê Văn C', phuong_an_xu_ly: 'Thay ray trượt', ngay_thay_linh_kien: '15/07/2026', noi_dung: 'Ray trượt dẫn hướng', don_vi_tinh: 'Bộ', so_luong: 1, don_gia: 6200000, thue_vat: 10, thanh_tien: 6820000, ghi_chu: 'Hoàn thành' },
  { id: '4', phong_ban: 'Phòng sơn', ma_may: 'PS-012', ten_may: 'Máy phun sơn áp lực cao', nam: '2022', ngay_bao_loi: '08/08/2026', tinh_trang_bao_loi: 'Đầu phun tắc', nguoi_bao_loi: 'Phạm Thị D', phuong_an_xu_ly: 'Vệ sinh đầu phun', ngay_thay_linh_kien: '09/08/2026', noi_dung: 'Đầu phun sơn', don_vi_tinh: 'Cái', so_luong: 1, don_gia: 880000, thue_vat: 10, thanh_tien: 968000, ghi_chu: '' },
  { id: '5', phong_ban: 'Phòng sơn', ma_may: 'DN-021', ten_may: 'Máy đánh nhám băng chạy', nam: '2020', ngay_bao_loi: '10/08/2026', tinh_trang_bao_loi: 'Đứt băng nhám', nguoi_bao_loi: 'Nguyễn Văn E', phuong_an_xu_ly: 'Thay băng nhám', ngay_thay_linh_kien: '11/08/2026', noi_dung: 'Băng nhám 120 grit', don_vi_tinh: 'Cuộn', so_luong: 2, don_gia: 180000, thue_vat: 10, thanh_tien: 396000, ghi_chu: '' },
];

export default function VeSinhBaoDuong() {
  const [items, setItems] = useState(mockData);
  const [search, setSearch] = useState('');
  const [selectedPhong, setSelectedPhong] = useState('all');
  const [page, setPage] = useState(1);
  const [editingItem, setEditingItem] = useState<PhieuVeSinhBaoDuongItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<PhieuVeSinhBaoDuongItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = React.useRef({ isDown: false, startX: 0, scrollLeft: 0 });
  const pageSize = 15;
  const groups = [...new Set(items.map((item) => item.phong_ban))].sort().map((phong_ban) => ({ phong_ban, count: items.filter((item) => item.phong_ban === phong_ban).length, total: items.filter((item) => item.phong_ban === phong_ban).reduce((sum, item) => sum + item.thanh_tien, 0) }));
  const filtered = items.filter((item) => (item.ma_may + item.ten_may + item.tinh_trang_bao_loi + item.phong_ban).toLowerCase().includes(search.toLowerCase()) && (selectedPhong === 'all' || item.phong_ban === selectedPhong));
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize)); const safePage = Math.min(page, totalPages); const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const saveEdit = (item: PhieuVeSinhBaoDuongItem) => setItems((current) => current.map((row) => row.id === item.id ? item : row));
  const confirmDelete = (id: string) => setItems((current) => current.filter((row) => row.id !== id));
  const saveCreate = (item: PhieuVeSinhBaoDuongItem) => {
    setItems((current) => [...current, item]);
    setIsCreateModalOpen(false);
  };
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !scrollContainerRef.current) return;
    const target = event.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('select')) return;
    dragInfo.current = { isDown: true, startX: event.pageX - scrollContainerRef.current.offsetLeft, scrollLeft: scrollContainerRef.current.scrollLeft };
    setIsDragging(true);
  };
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragInfo.current.isDown || !scrollContainerRef.current) return;
    event.preventDefault();
    const x = event.pageX - scrollContainerRef.current.offsetLeft;
    scrollContainerRef.current.scrollLeft = dragInfo.current.scrollLeft - (x - dragInfo.current.startX) * 1.5;
  };
  const handleMouseUpOrLeave = () => { dragInfo.current.isDown = false; setIsDragging(false); };
  const headers = ['STT', 'Phòng ban quản lý', 'Mã máy', 'Tên máy', 'Năm', 'Ngày tháng báo lỗi', 'Tình trạng báo lỗi', 'Người báo lỗi', 'Phương án xử lý', 'Ngày thay linh kiện', 'Nội dung', 'Đơn vị tính', 'Số lượng', 'Đơn giá', 'Thuế VAT', 'Thành tiền', 'Ghi chú', 'Thao tác'];
  return <div className="flex-1 flex flex-col gap-2.5 overflow-hidden">
    <div className="flex items-center justify-between gap-3 shrink-0 flex-wrap"><div className="flex items-center gap-2 flex-1 max-w-md"><div className="relative flex-1"><IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Tìm sửa chữa..." className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 text-slate-700 placeholder:text-slate-400" /></div><select value={selectedPhong} onChange={(event) => { setSelectedPhong(event.target.value); setPage(1); }} className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700"><option value="all">Tất cả phòng ban</option>{groups.map((group) => <option key={group.phong_ban}>{group.phong_ban}</option>)}</select></div><div className="flex items-center gap-2"><button type="button" className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-lg shadow-xs"><IconChartBar size={14} />Báo cáo</button><button type="button" className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-lg shadow-xs"><IconUpload size={14} />Import Excel</button><button type="button" className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-lg shadow-xs"><IconDownload size={14} />Xuất Excel</button><button type="button" onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs bg-[#406c89] text-white rounded-lg shadow-xs"><IconPlus size={14} />Thêm</button></div></div>
    <div className="shrink-0 overflow-auto no-scrollbar"><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">{groups.map((group) => <div key={group.phong_ban} onClick={() => setSelectedPhong(selectedPhong === group.phong_ban ? 'all' : group.phong_ban)} className="rounded-lg border px-3 py-1.5 bg-white border-slate-200/90 cursor-pointer"><h4 className="text-xs font-semibold text-slate-800 truncate">{group.phong_ban}</h4><div className="flex justify-between"><span className="text-[11px] text-slate-400">{group.count} bản ghi</span><span className="text-xs font-bold text-[#406c89]">{group.total.toLocaleString('vi-VN')} đ</span></div></div>)}</div></div>
    <div className="flex-1 bg-white rounded-xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden min-h-0"><div ref={scrollContainerRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave} className={`overflow-auto flex-1 no-scrollbar cursor-grab active:cursor-grabbing ${isDragging ? 'select-none cursor-grabbing' : ''}`} title="Nhấn giữ chuột để trượt ngang bảng"><table className="w-full text-xs border-collapse"><thead className="bg-[#406c89] text-white sticky top-0 z-20"><tr>{headers.map((header) => <th key={header} className="text-center px-3 py-2.5 font-bold border-r border-white/20 whitespace-nowrap">{header}</th>)}</tr></thead><tbody>{paged.map((row, index) => <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/80"><td className="px-2 py-2 text-center">{(safePage - 1) * pageSize + index + 1}</td><td className="px-3 py-2 whitespace-nowrap">{row.phong_ban}</td><td className="px-3 py-2 font-mono font-semibold text-[#406c89] whitespace-nowrap">{row.ma_may}</td><td className="px-3 py-2 whitespace-nowrap">{row.ten_may}</td><td className="px-2 py-2 text-center">{row.nam}</td><td className="px-3 py-2 whitespace-nowrap">{row.ngay_bao_loi}</td><td className="px-3 py-2 whitespace-nowrap">{row.tinh_trang_bao_loi}</td><td className="px-3 py-2 whitespace-nowrap">{row.nguoi_bao_loi || '—'}</td><td className="px-3 py-2 whitespace-nowrap">{row.phuong_an_xu_ly}</td><td className="px-3 py-2 whitespace-nowrap">{row.ngay_thay_linh_kien || '—'}</td><td className="px-3 py-2 whitespace-nowrap">{row.noi_dung || '—'}</td><td className="px-3 py-2 text-center">{row.don_vi_tinh || '—'}</td><td className="px-3 py-2 text-center">{row.so_luong || '—'}</td><td className="px-3 py-2 text-right">{row.don_gia.toLocaleString('vi-VN')}</td><td className="px-3 py-2 text-center">{row.thue_vat}%</td><td className="px-3 py-2 text-right font-bold text-[#406c89]">{row.thanh_tien.toLocaleString('vi-VN')}</td><td className="px-3 py-2">{row.ghi_chu || '—'}</td><td className="px-3 py-2 text-center whitespace-nowrap"><button type="button" title="Sửa" onClick={() => setEditingItem(row)} className="p-1.5 text-slate-500 hover:text-amber-600"><IconEdit size={14} /></button><button type="button" title="Xóa" onClick={() => setDeletingItem(row)} className="p-1.5 text-slate-500 hover:text-rose-600"><IconTrash size={14} /></button></td></tr>)}</tbody></table></div><div className="flex items-center justify-between border-t border-slate-100 px-4 py-2 text-[11px] text-slate-500"><span>Hiển thị {filtered.length ? (safePage - 1) * pageSize + 1 : 0} - {Math.min(safePage * pageSize, filtered.length)} trên tổng số {filtered.length} bản ghi sửa chữa</span><div className="flex items-center gap-1"><button type="button" disabled={safePage === 1} onClick={() => setPage((value) => Math.max(value - 1, 1))}><IconChevronLeft size={13} /></button><span>{safePage}</span><button type="button" disabled={safePage === totalPages} onClick={() => setPage((value) => Math.min(value + 1, totalPages))}><IconChevronRight size={13} /></button></div></div></div>
    <ModalThem key={isCreateModalOpen ? 'create-open' : 'create-closed'} isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSave={saveCreate} /><ModalSua key={editingItem?.id ?? 'edit'} isOpen={!!editingItem} item={editingItem} onClose={() => setEditingItem(null)} onSave={saveEdit} /><ModalXoa isOpen={!!deletingItem} item={deletingItem} onClose={() => setDeletingItem(null)} onConfirm={confirmDelete} />
  </div>;
}
