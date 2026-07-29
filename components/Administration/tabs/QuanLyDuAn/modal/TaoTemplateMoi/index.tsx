"use client";

import React, { useState } from 'react';
import {
  IconX,
  IconPlus,
  IconTrash,
  IconDeviceFloppy,
} from '@tabler/icons-react';

export interface TaskRow {
  id: string;
  nhom: string;
  tenCongViec: string;
  sl: number;
  slDuPhong: number;
  donVi: string;
  nguoiLam: string;
  gioDk: number;
  ngayBatDau: string;
  ngayKetThuc: string;
  ptHoanThanh: number;
  trangThai: 'Chưa bắt đầu' | 'Đang thực hiện' | 'Hoàn thành';
  ghiChu: string;
}

interface TaoTemplateMoiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (templateData: {
    tenTemplate: string;
    phamVi: string;
    phongBan: string;
    moTa: string;
    tasks: TaskRow[];
  }) => void;
}

const DEFAULT_ROW: Omit<TaskRow, 'id'> = {
  nhom: '',
  tenCongViec: '',
  sl: 0,
  slDuPhong: 0,
  donVi: '',
  nguoiLam: '',
  gioDk: 0,
  ngayBatDau: '',
  ngayKetThuc: '',
  ptHoanThanh: 0,
  trangThai: 'Chưa bắt đầu',
  ghiChu: '',
};

export default function TaoTemplateMoiModal({ isOpen, onClose, onSubmit }: TaoTemplateMoiModalProps) {
  const [tenTemplate, setTenTemplate] = useState('');
  const [phamVi, setPhamVi] = useState('Từng phòng');
  const [phongBan, setPhongBan] = useState('');
  const [moTa, setMoTa] = useState('');

  const [rows, setRows] = useState<TaskRow[]>([
    { id: 'row-1', ...DEFAULT_ROW },
  ]);

  if (!isOpen) return null;

  const handleAddRow = () => {
    setRows([
      ...rows,
      { id: `row-${Date.now()}-${rows.length}`, ...DEFAULT_ROW },
    ]);
  };

  const handleDeleteRow = (id: string) => {
    if (rows.length === 1) return;
    setRows(rows.filter(r => r.id !== id));
  };

  const handleRowChange = (id: string, field: keyof TaskRow, value: any) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenTemplate.trim()) return;

    onSubmit({
      tenTemplate,
      phamVi,
      phongBan: phongBan || '— Chưa chọn —',
      moTa,
      tasks: rows,
    });

    // Reset & close
    setTenTemplate('');
    setMoTa('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-2 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-6xl max-h-[95vh] sm:max-h-[92vh] flex flex-col overflow-hidden text-slate-700">

        {/* ══ HEADER ══ */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h3 className="text-base sm:text-lg font-extrabold text-[#406c89] tracking-tight truncate">Tạo template mới</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* ══ FORM BODY ══ */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 [scrollbar-width:thin]">

          {/* Row 1: Tên template & Phạm vi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tên template *</label>
              <input
                type="text"
                required
                value={tenTemplate}
                onChange={e => setTenTemplate(e.target.value)}
                placeholder="VD: Hồ sơ Nhà phố 2 tầng"
                className="w-full bg-white border border-slate-300 focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] rounded-xl px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none shadow-2xs transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phạm vi *</label>
              <select
                value={phamVi}
                onChange={e => setPhamVi(e.target.value)}
                className="w-full bg-white border border-slate-300 focus:border-[#406c89] rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none shadow-2xs cursor-pointer"
              >
                <option value="Từng phòng">Từng phòng</option>
                <option value="Tổng thể dự án">Tổng thể dự án</option>
                <option value="Ban Giám đốc">Ban Giám đốc</option>
              </select>
            </div>
          </div>

          {/* Row 2: Phòng ban & Mô tả */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phòng ban *</label>
              <select
                value={phongBan}
                onChange={e => setPhongBan(e.target.value)}
                className="w-full bg-white border border-slate-300 focus:border-[#406c89] rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none shadow-2xs cursor-pointer"
              >
                <option value="">— Chọn phòng —</option>
                <option value="Ban Giám đốc">Ban Giám đốc</option>
                <option value="Phòng CN&amp;TK">Phòng CN&amp;TK</option>
                <option value="Phòng Mộc Sơn">Phòng Mộc Sơn</option>
                <option value="Phòng Khai triển">Phòng Khai triển</option>
                <option value="Phòng Cảnh quan">Phòng Cảnh quan</option>
                <option value="Phòng Điện">Phòng Điện</option>
                <option value="Phòng Ghép">Phòng Ghép</option>
                <option value="Phòng Cắt">Phòng Cắt</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mô tả</label>
              <input
                type="text"
                value={moTa}
                onChange={e => setMoTa(e.target.value)}
                placeholder="Mô tả ngắn về loại dự án phù hợp..."
                className="w-full bg-white border border-slate-300 focus:border-[#406c89] rounded-xl px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* ══ DATA TABLE CONTAINER (SCROLLABLE ON MOBILE) ══ */}
          <div className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-2 sm:p-3 overflow-x-auto space-y-2 max-w-full">
            <table className="w-full text-[11px] text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="text-[10px] font-semibold text-slate-500 border-b border-slate-200/60 pb-1.5">
                  <th className="py-1 px-1 font-semibold">Nhóm</th>
                  <th className="py-1 px-1 font-semibold">Tên công việc</th>
                  <th className="py-1 px-1 font-semibold w-12 text-center">SL</th>
                  <th className="py-1 px-1 font-semibold w-16 text-center">SL dự phòng</th>
                  <th className="py-1 px-1 font-semibold w-14">Đơn vị</th>
                  <th className="py-1 px-1 font-semibold w-20">Người làm</th>
                  <th className="py-1 px-1 font-semibold w-14 text-center">Giờ ĐK</th>
                  <th className="py-1 px-1 font-semibold w-24">Ngày bắt đầu</th>
                  <th className="py-1 px-1 font-semibold w-24">Ngày kết thúc</th>
                  <th className="py-1 px-1 font-semibold w-12 text-center">% HT</th>
                  <th className="py-1 px-1 font-semibold w-24">Trạng thái</th>
                  <th className="py-1 px-1 font-semibold">Ghi chú</th>
                  <th className="py-1 px-1 w-12 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <tr key={row.id} className="group">
                    {/* Nhóm */}
                    <td className="p-0.5">
                      <input
                        type="text"
                        value={row.nhom}
                        onChange={e => handleRowChange(row.id, 'nhom', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded px-1.5 py-1 text-[11px] focus:outline-none focus:border-[#406c89]"
                      />
                    </td>

                    {/* Tên công việc */}
                    <td className="p-0.5">
                      <input
                        type="text"
                        value={row.tenCongViec}
                        onChange={e => handleRowChange(row.id, 'tenCongViec', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded px-1.5 py-1 text-[11px] focus:outline-none focus:border-[#406c89]"
                      />
                    </td>

                    {/* SL */}
                    <td className="p-0.5">
                      <input
                        type="number"
                        value={row.sl}
                        onChange={e => handleRowChange(row.id, 'sl', Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded px-1 py-1 text-[11px] text-center focus:outline-none focus:border-[#406c89]"
                      />
                    </td>

                    {/* SL dự phòng */}
                    <td className="p-0.5">
                      <input
                        type="number"
                        value={row.slDuPhong}
                        onChange={e => handleRowChange(row.id, 'slDuPhong', Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded px-1 py-1 text-[11px] text-center focus:outline-none focus:border-[#406c89]"
                      />
                    </td>

                    {/* Đơn vị */}
                    <td className="p-0.5">
                      <input
                        type="text"
                        value={row.donVi}
                        onChange={e => handleRowChange(row.id, 'donVi', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded px-1.5 py-1 text-[11px] focus:outline-none focus:border-[#406c89]"
                      />
                    </td>

                    {/* Người làm */}
                    <td className="p-0.5">
                      <input
                        type="text"
                        value={row.nguoiLam}
                        onChange={e => handleRowChange(row.id, 'nguoiLam', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded px-1.5 py-1 text-[11px] focus:outline-none focus:border-[#406c89]"
                      />
                    </td>

                    {/* Giờ ĐK */}
                    <td className="p-0.5">
                      <input
                        type="number"
                        value={row.gioDk}
                        onChange={e => handleRowChange(row.id, 'gioDk', Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded px-1 py-1 text-[11px] text-center focus:outline-none focus:border-[#406c89]"
                      />
                    </td>

                    {/* Ngày bắt đầu */}
                    <td className="p-0.5">
                      <input
                        type="date"
                        value={row.ngayBatDau}
                        onChange={e => handleRowChange(row.id, 'ngayBatDau', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded px-1 py-1 text-[10px] focus:outline-none focus:border-[#406c89] text-slate-600"
                      />
                    </td>

                    {/* Ngày kết thúc */}
                    <td className="p-0.5">
                      <input
                        type="date"
                        value={row.ngayKetThuc}
                        onChange={e => handleRowChange(row.id, 'ngayKetThuc', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded px-1 py-1 text-[10px] focus:outline-none focus:border-[#406c89] text-slate-600"
                      />
                    </td>

                    {/* % HT */}
                    <td className="p-0.5">
                      <input
                        type="number"
                        value={row.ptHoanThanh}
                        onChange={e => handleRowChange(row.id, 'ptHoanThanh', Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded px-1 py-1 text-[11px] text-center focus:outline-none focus:border-[#406c89]"
                      />
                    </td>

                    {/* Trạng thái */}
                    <td className="p-0.5">
                      <select
                        value={row.trangThai}
                        onChange={e => handleRowChange(row.id, 'trangThai', e.target.value as any)}
                        className="w-full bg-white border border-slate-200 rounded px-1 py-1 text-[10px] focus:outline-none text-slate-700"
                      >
                        <option value="Chưa bắt đầu">Chưa bắt đầu</option>
                        <option value="Đang thực hiện">Đang thực hiện</option>
                        <option value="Hoàn thành">Hoàn thành</option>
                      </select>
                    </td>

                    {/* Ghi chú */}
                    <td className="p-0.5">
                      <input
                        type="text"
                        value={row.ghiChu}
                        onChange={e => handleRowChange(row.id, 'ghiChu', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded px-1.5 py-1 text-[11px] focus:outline-none focus:border-[#406c89]"
                      />
                    </td>

                    {/* Action buttons */}
                    <td className="p-0.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={handleAddRow}
                          className="p-1 rounded text-slate-400 hover:text-[#406c89] hover:bg-[#406c89]/10 transition-colors"
                          title="Thêm dòng mới"
                        >
                          <IconPlus size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteRow(row.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Xóa dòng"
                        >
                          <IconTrash size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add row button centered below table */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleAddRow}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#406c89] hover:text-[#345972] transition-colors cursor-pointer py-1 px-3 rounded-lg hover:bg-[#406c89]/10"
              >
                <IconPlus size={14} />
                <span>Thêm dòng</span>
              </button>
            </div>
          </div>

          {/* ══ FOOTER BUTTONS (RESPONSIVE) ══ */}
          <div className="pt-3 sm:pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-2xs text-center"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 px-5 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <IconDeviceFloppy size={15} />
              <span>Lưu template</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
