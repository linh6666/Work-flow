"use client";

import React, { useState, useRef } from 'react';
import {
  IconUpload,
  IconFileText,
  IconPlus,
  IconRefresh,
  IconPencil,
  IconTrash,
  IconX,
  IconCheck,
  IconGripVertical,
  IconWand,
} from '@tabler/icons-react';

// ─── Types ──────────────────────────────────────────────────────────
interface DieuKhoan {
  id: number;
  tieu_de: string;
  noi_dung: string;
}

interface DieuKhoanTabProps {
  dieuKhoanThanhToan: string;
  setDieuKhoanThanhToan: (v: string) => void;
}

// ─── Default clauses ────────────────────────────────────────────────
const DEFAULT_DIEU_KHOAN: DieuKhoan[] = [
  { id: 1,  tieu_de: 'ĐIỀU 1 - NỘI DUNG CÔNG VIỆC - Tên sản phẩm',   noi_dung: 'MÔ HÌNH "{project_name}" (Dưới đây gọi tắt là "mô hình")' },
  { id: 2,  tieu_de: 'ĐIỀU 1 - NỘI DUNG CÔNG VIỆC - Số lượng',       noi_dung: '01' },
  { id: 3,  tieu_de: 'ĐIỀU 1 - NỘI DUNG CÔNG VIỆC - Tỉ lệ',         noi_dung: '{scale}' },
  { id: 4,  tieu_de: 'ĐIỀU 1 - NỘI DUNG CÔNG VIỆC - Kích thước',    noi_dung: '{size}' },
  { id: 5,  tieu_de: 'ĐIỀU 2 - GIÁ TRỊ HỢP ĐỒNG',                   noi_dung: 'Giá trị hợp đồng: {contract_value} (đã bao gồm VAT {vat}%)' },
  { id: 6,  tieu_de: 'ĐIỀU 3 - PHƯƠNG THỨC THANH TOÁN',              noi_dung: 'Tạm ứng 40% sau khi ký hợp đồng.\nThanh toán 50% khi đạt 90% khối lượng.\nThanh toán 10% còn lại sau khi bàn giao nghiệm thu.' },
  { id: 7,  tieu_de: 'ĐIỀU 4 - THỜI GIAN THỰC HIỆN',                 noi_dung: '{production_days} ngày kể từ ngày ký hợp đồng và nhận tạm ứng.' },
  { id: 8,  tieu_de: 'ĐIỀU 5 - BẢO HÀNH',                            noi_dung: '{warranty_months} tháng kể từ ngày nghiệm thu bàn giao.' },
];

const inputClass =
  'h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-xs outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100';

// ─── Component ──────────────────────────────────────────────────────
export default function DieuKhoanTab({ dieuKhoanThanhToan, setDieuKhoanThanhToan }: DieuKhoanTabProps) {
  const [danhSach, setDanhSach] = useState<DieuKhoan[]>(DEFAULT_DIEU_KHOAN);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<{ tieu_de: string; noi_dung: string }>({ tieu_de: '', noi_dung: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ tieu_de: '', noi_dung: '' });
  const [thoiGianSanXuat, setThoiGianSanXuat] = useState('60');
  const [baoHanh, setBaoHanh] = useState('18');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nextId = () => Math.max(0, ...danhSach.map((d) => d.id)) + 1;

  const startEdit = (item: DieuKhoan) => {
    setEditingId(item.id);
    setEditValue({ tieu_de: item.tieu_de, noi_dung: item.noi_dung });
  };

  const saveEdit = () => {
    setDanhSach((prev) =>
      prev.map((d) =>
        d.id === editingId ? { ...d, tieu_de: editValue.tieu_de, noi_dung: editValue.noi_dung } : d
      )
    );
    setEditingId(null);
  };

  const deleteItem = (id: number) => {
    setDanhSach((prev) => prev.filter((d) => d.id !== id));
  };

  const addItem = () => {
    if (!newItem.tieu_de.trim()) return;
    setDanhSach((prev) => [...prev, { id: nextId(), ...newItem }]);
    setNewItem({ tieu_de: '', noi_dung: '' });
    setIsAdding(false);
  };

  return (
    <div className="tab-content-active space-y-4">

      {/* ── Upload mẫu KH ── */}
      <div className="rounded-lg border border-indigo-200 bg-indigo-50/60 p-4 space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wide">
          <IconUpload size={14} />
          <IconFileText size={14} />
          <span>Lập hợp đồng theo mẫu khách hàng gửi</span>
        </div>
        <p className="text-xs text-indigo-600 leading-relaxed">
          Tải lên file hợp đồng mà Khách hàng gửi, AI sẽ trích xuất điều khoản và thông tin để bạn chỉnh sửa cho phù hợp hai bên.
        </p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-indigo-300 bg-white text-xs font-semibold text-indigo-700 hover:bg-indigo-50 transition-all cursor-pointer"
        >
          <IconUpload size={13} />
          Chọn file hợp đồng của Khách hàng
        </button>
        <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" />
      </div>

      {/* ── Danh sách điều khoản ── */}
      <div className="space-y-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Danh sách điều khoản&nbsp;
            <span className="text-slate-400 font-normal normal-case">({danhSach.length} mục)</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDanhSach(DEFAULT_DIEU_KHOAN)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <IconRefresh size={13} />
              Nạp mặc định
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white transition-all cursor-pointer shadow-sm"
            >
              <IconPlus size={13} />
              Thêm mới
            </button>
          </div>
        </div>

        {/* Add form */}
        {isAdding && (
          <div className="rounded-lg border border-indigo-200 bg-indigo-50/40 p-3 space-y-2">
            <input
              autoFocus
              type="text"
              value={newItem.tieu_de}
              onChange={(e) => setNewItem((p) => ({ ...p, tieu_de: e.target.value }))}
              placeholder="Tiêu đề điều khoản..."
              className={inputClass}
            />
            <textarea
              rows={2}
              value={newItem.noi_dung}
              onChange={(e) => setNewItem((p) => ({ ...p, noi_dung: e.target.value }))}
              placeholder="Nội dung điều khoản..."
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 resize-none"
            />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setIsAdding(false)} className="px-3 py-1.5 rounded-md border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer">Hủy</button>
              <button type="button" onClick={addItem} className="px-3 py-1.5 rounded-md bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-700 cursor-pointer">Thêm</button>
            </div>
          </div>
        )}

        {/* Clause list */}
        <div className="space-y-1.5">
          {danhSach.map((item) => (
            <div key={item.id} className="rounded-lg border border-slate-100 bg-white shadow-xs">
              {editingId === item.id ? (
                /* Edit mode */
                <div className="p-3 space-y-2">
                  <input
                    autoFocus
                    type="text"
                    value={editValue.tieu_de}
                    onChange={(e) => setEditValue((p) => ({ ...p, tieu_de: e.target.value }))}
                    className={inputClass}
                  />
                  <textarea
                    rows={2}
                    value={editValue.noi_dung}
                    onChange={(e) => setEditValue((p) => ({ ...p, noi_dung: e.target.value }))}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 resize-none"
                  />
                  <div className="flex gap-2 justify-end">
                    <button type="button" onClick={() => setEditingId(null)} className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 cursor-pointer"><IconX size={14} /></button>
                    <button type="button" onClick={saveEdit} className="p-1.5 rounded-md text-emerald-600 hover:bg-emerald-50 cursor-pointer"><IconCheck size={14} /></button>
                  </div>
                </div>
              ) : (
                /* View mode */
                <div className="flex items-start gap-2 px-3 py-2.5">
                  <IconGripVertical size={14} className="text-slate-300 mt-0.5 shrink-0 cursor-grab" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-700 leading-snug">{item.tieu_de}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed whitespace-pre-line">{item.noi_dung}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button type="button" className="p-1.5 rounded text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-all cursor-pointer" title="AI viết lại"><IconWand size={16} /></button>
                    <button type="button" onClick={() => startEdit(item)} className="p-1.5 rounded text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer" title="Sửa"><IconPencil size={16} /></button>
                    <button type="button" onClick={() => deleteItem(item.id)} className="p-1.5 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer" title="Xóa"><IconTrash size={16} /></button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Tham số tham khảo ── */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tham số tham khảo</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs text-slate-600">Thời gian sản xuất (ngày)</label>
            <input
              type="number"
              value={thoiGianSanXuat}
              onChange={(e) => setThoiGianSanXuat(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-slate-600">Bảo hành (tháng)</label>
            <input
              type="number"
              value={baoHanh}
              onChange={(e) => setBaoHanh(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
