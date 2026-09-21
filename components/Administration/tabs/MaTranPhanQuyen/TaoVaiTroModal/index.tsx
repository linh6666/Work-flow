"use client";

import React from 'react';
import { IconUserPlus, IconX } from '@tabler/icons-react';

export interface TaoVaiTroModalProps {
  isOpen: boolean;
  roles: string[];
  onClose: () => void;
  onSubmit: (params: {
    roleName: string;
    roleDesc: string;
    cloneFromRole: string;
  }) => void;
}

export default function TaoVaiTroModal({
  isOpen,
  roles,
  onClose,
  onSubmit
}: TaoVaiTroModalProps) {
  const [newRoleName, setNewRoleName] = React.useState('');
  const [newRoleDesc, setNewRoleDesc] = React.useState('');
  const [cloneFromRole, setCloneFromRole] = React.useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newRoleName.trim();
    if (!trimmed) return;
    if (roles.includes(trimmed)) {
      alert('Tên vai trò này đã tồn tại!');
      return;
    }
    onSubmit({ roleName: trimmed, roleDesc: newRoleDesc, cloneFromRole });
    setNewRoleName('');
    setNewRoleDesc('');
    setCloneFromRole('');
  };

  const handleClose = () => {
    setNewRoleName('');
    setNewRoleDesc('');
    setCloneFromRole('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#406c89]/10 text-[#406c89] flex items-center justify-center">
              <IconUserPlus size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Tạo vai trò mới</h2>
              <p className="text-[11px] text-slate-400">Thêm vai trò và phân quyền vào ma trận</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Tên vai trò */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Tên vai trò <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              placeholder="Ví dụ: Kế toán trưởng, Quản lý QC..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:bg-white"
            />
          </div>

          {/* Mô tả vai trò */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Mô tả vai trò</label>
            <textarea
              rows={2}
              value={newRoleDesc}
              onChange={(e) => setNewRoleDesc(e.target.value)}
              placeholder="Mô tả trách nhiệm hoặc quyền hạn chính..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:bg-white resize-none"
            />
          </div>

          {/* Sao chép quyền */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Sao chép quyền từ vai trò có sẵn (tùy chọn)
            </label>
            <select
              value={cloneFromRole}
              onChange={(e) => setCloneFromRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:bg-white"
            >
              <option value="">-- Mặc định (Tất cả đều tắt) --</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-medium text-white bg-[#406c89] hover:bg-[#335870] rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              Tạo vai trò
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
