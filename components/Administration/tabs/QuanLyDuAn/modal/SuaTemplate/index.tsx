"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconPlus, IconTrash, IconDeviceFloppy } from '@tabler/icons-react';
import { TemplateItem } from '../QuanLyTemplate';
import { updateProjectFormTemplate, getProjectFormTemplateById } from '@/api/apiGetProjectFormTemplate';
import { NotificationExtension } from '@/common/extension/NotificationExtension';

interface SuaTemplateModalProps {
  item: TemplateItem | null;
  onClose: () => void;
  onSave: (updated: TemplateItem) => void;
}

interface TemplateTaskRow {
  id: string;
  department: string;
  group: string;
  name: string;
  qty: string;
  qtyBackup: string;
  unit: string;
  assignee: string;
  plannedHours: string;
  startDate: string;
  endDate: string;
  progress: string;
  status: string;
  notes: string;
}

const DEPT_TABS = [
  'Ban Giám đốc',
  'Khối Văn phòng',
  'Phòng Khai triển',
  'Phòng Cắt',
  'Phòng Ghép',
  'Phòng Mộc Sơn',
  'Phòng Điện',
  'Phòng Cảnh Quan',
  'Phòng Công nghệ và Thiết kế',
];

function createEmptyRow(dept: string): TemplateTaskRow {
  return {
    id: `row-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    department: dept,
    group: '',
    name: '',
    qty: '1',
    qtyBackup: '0',
    unit: '',
    assignee: '',
    plannedHours: '1',
    startDate: '',
    endDate: '',
    progress: '0',
    status: 'Chưa bắt đầu',
    notes: '',
  };
}

export default function SuaTemplateModal({ item, onClose, onSave }: SuaTemplateModalProps) {
  const [tenTemplate, setTenTemplate] = useState('');
  const [phamVi, setPhamVi] = useState('Tổng thể dự án (tất cả phòng)');
  const [moTa, setMoTa] = useState('');
  const [activeDept, setActiveDept] = useState('Khối Văn phòng');
  const [rows, setRows] = useState<TemplateTaskRow[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!item) return;
    setTenTemplate(item.tenTemplate);
    setPhamVi(
      item.phongBan && item.phongBan !== 'Tất cả phòng'
        ? item.phongBan
        : 'Tổng thể dự án (tất cả phòng)'
    );
    setMoTa(item.moTa || '');
    if (item.phongBan && DEPT_TABS.includes(item.phongBan)) {
      setActiveDept(item.phongBan);
    }

    let cancelled = false;
    getProjectFormTemplateById(item.id).then((detail) => {
      if (cancelled || !detail) return;
      if (detail.template_name) setTenTemplate(detail.template_name);
      setPhamVi(detail.department ? detail.department : 'Tổng thể dự án (tất cả phòng)');
      setMoTa(detail.description || '');
    });

    setRows([createEmptyRow('Khối Văn phòng')]);

    return () => {
      cancelled = true;
    };
  }, [item]);

  if (!item) return null;

  const deptRows = rows.filter((r) => r.department === activeDept);
  const displayRows = deptRows.length > 0 ? deptRows : [createEmptyRow(activeDept)];

  const handleRowChange = (id: string, field: keyof TemplateTaskRow, val: string) => {
    setRows((prev) => {
      const exists = prev.some((r) => r.id === id);
      if (!exists) {
        return [...prev, { ...createEmptyRow(activeDept), id, [field]: val }];
      }
      return prev.map((r) => (r.id === id ? { ...r, [field]: val } : r));
    });
  };

  const handleAddRowAfter = (afterId: string) => {
    const newRow = createEmptyRow(activeDept);
    setRows((prev) => {
      const idx = prev.findIndex((r) => r.id === afterId);
      if (idx === -1) return [...prev, newRow];
      const next = [...prev];
      next.splice(idx + 1, 0, newRow);
      return next;
    });
  };

  const handleDeleteRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenTemplate.trim() || isSaving) return;
    setIsSaving(true);
    const deptValue = phamVi === 'Tổng thể dự án (tất cả phòng)' ? '' : phamVi;
    try {
      await updateProjectFormTemplate(item.id, {
        template_name: tenTemplate.trim(),
        department: deptValue,
        description: moTa.trim(),
      });
      onSave({
        ...item,
        tenTemplate: tenTemplate.trim(),
        phongBan: deptValue || 'Tất cả phòng',
        phamVi: deptValue ? 'Theo phòng ban' : 'Tổng thể dự án',
        moTa: moTa.trim(),
        isPurpleIcon: !deptValue,
      });
      NotificationExtension.Success('Cập nhật template thành công!');
      onClose();
    } catch (err: any) {
      NotificationExtension.Fails(err?.message || 'Cập nhật template thất bại!');
    } finally {
      setIsSaving(false);
    }
  };

  const cellInput =
    'w-full h-7 px-1.5 border border-slate-200 rounded bg-white text-[11px] text-slate-700 outline-none focus:border-[#406c89]';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 backdrop-blur-[1px] p-3">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Chỉnh sửa template</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Tên template <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={tenTemplate}
                onChange={(e) => setTenTemplate(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Phạm vi <span className="text-rose-500">*</span>
              </label>
              <select
                value={phamVi}
                onChange={(e) => setPhamVi(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs text-slate-800 bg-white outline-none focus:border-indigo-500"
              >
                <option value="Tổng thể dự án (tất cả phòng)">Tổng thể dự án (tất cả phòng)</option>
                {DEPT_TABS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Mô tả</label>
            <input
              type="text"
              value={moTa}
              onChange={(e) => setMoTa(e.target.value)}
              placeholder="Mô tả ngắn về loại dự án phù hợp..."
              className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs text-slate-700 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Department Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {DEPT_TABS.map((dept) => {
              const count = rows.filter((r) => r.department === dept && r.name.trim()).length;
              const isActive = activeDept === dept;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setActiveDept(dept)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#406c89] text-white border-[#406c89]'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {dept}
                  {count > 0 ? ` (${count})` : ''}
                </button>
              );
            })}
          </div>

          {/* Task Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-max w-full text-[11px] text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="px-2 py-2 w-24">Nhóm</th>
                    <th className="px-2 py-2 w-36">Tên công việc</th>
                    <th className="px-2 py-2 w-12">SL</th>
                    <th className="px-2 py-2 w-16">SL dự phòng</th>
                    <th className="px-2 py-2 w-14">Đơn vị</th>
                    <th className="px-2 py-2 w-24">Người làm</th>
                    <th className="px-2 py-2 w-14">Giờ DK</th>
                    <th className="px-2 py-2 w-32">Ngày bắt đầu</th>
                    <th className="px-2 py-2 w-32">Ngày kết thúc</th>
                    <th className="px-2 py-2 w-14">% HT</th>
                    <th className="px-2 py-2 w-28">Trạng thái</th>
                    <th className="px-2 py-2 w-24">Ghi chú</th>
                    <th className="px-2 py-2 w-14" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50">
                      <td className="px-1.5 py-1.5">
                        <input
                          value={row.group}
                          onChange={(e) => handleRowChange(row.id, 'group', e.target.value)}
                          placeholder="Nhóm..."
                          className={cellInput}
                        />
                      </td>
                      <td className="px-1.5 py-1.5">
                        <input
                          value={row.name}
                          onChange={(e) => handleRowChange(row.id, 'name', e.target.value)}
                          placeholder="Tên công việc..."
                          className={cellInput}
                        />
                      </td>
                      <td className="px-1.5 py-1.5">
                        <input
                          value={row.qty}
                          onChange={(e) => handleRowChange(row.id, 'qty', e.target.value)}
                          className={`${cellInput} text-center`}
                        />
                      </td>
                      <td className="px-1.5 py-1.5">
                        <input
                          value={row.qtyBackup}
                          onChange={(e) => handleRowChange(row.id, 'qtyBackup', e.target.value)}
                          className={`${cellInput} text-center`}
                        />
                      </td>
                      <td className="px-1.5 py-1.5">
                        <input
                          value={row.unit}
                          onChange={(e) => handleRowChange(row.id, 'unit', e.target.value)}
                          className={cellInput}
                        />
                      </td>
                      <td className="px-1.5 py-1.5">
                        <input
                          value={row.assignee}
                          onChange={(e) => handleRowChange(row.id, 'assignee', e.target.value)}
                          placeholder="Người làm"
                          className={cellInput}
                        />
                      </td>
                      <td className="px-1.5 py-1.5">
                        <input
                          value={row.plannedHours}
                          onChange={(e) => handleRowChange(row.id, 'plannedHours', e.target.value)}
                          className={`${cellInput} text-center`}
                        />
                      </td>
                      <td className="px-1.5 py-1.5">
                        <input
                          type="date"
                          value={row.startDate}
                          onChange={(e) => handleRowChange(row.id, 'startDate', e.target.value)}
                          className={cellInput}
                        />
                      </td>
                      <td className="px-1.5 py-1.5">
                        <input
                          type="date"
                          value={row.endDate}
                          onChange={(e) => handleRowChange(row.id, 'endDate', e.target.value)}
                          className={cellInput}
                        />
                      </td>
                      <td className="px-1.5 py-1.5">
                        <input
                          value={row.progress}
                          onChange={(e) => handleRowChange(row.id, 'progress', e.target.value)}
                          className={`${cellInput} text-center`}
                        />
                      </td>
                      <td className="px-1.5 py-1.5">
                        <select
                          value={row.status}
                          onChange={(e) => handleRowChange(row.id, 'status', e.target.value)}
                          className={cellInput}
                        >
                          <option value="Chưa bắt đầu">Chưa bắt đầu</option>
                          <option value="Đang thực hiện">Đang thực hiện</option>
                          <option value="Hoàn thành">Hoàn thành</option>
                        </select>
                      </td>
                      <td className="px-1.5 py-1.5">
                        <input
                          value={row.notes}
                          onChange={(e) => handleRowChange(row.id, 'notes', e.target.value)}
                          className={cellInput}
                        />
                      </td>
                      <td className="px-1.5 py-1.5 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleAddRowAfter(row.id)}
                            title="Thêm dòng"
                            className="p-1 rounded text-slate-400 hover:text-indigo-600 hover:bg-slate-100 cursor-pointer"
                          >
                            <IconPlus size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteRow(row.id)}
                            title="Xóa dòng"
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                          >
                            <IconTrash size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 flex items-center justify-end gap-2 px-5 py-3 bg-white border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-1.5 rounded-lg bg-[#406c89] hover:bg-[#345972] disabled:opacity-50 text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <IconDeviceFloppy size={14} />
            <span>{isSaving ? 'Đang lưu...' : 'Lưu template'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
