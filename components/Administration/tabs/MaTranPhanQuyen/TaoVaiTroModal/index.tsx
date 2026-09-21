"use client";

import React, { useState } from 'react';
import { IconX } from '@tabler/icons-react';

interface ActionDef {
  id: string;
  name: string;
}

interface GroupDef {
  id: string;
  name: string;
  actions: ActionDef[];
}

const PERMISSION_GROUPS: GroupDef[] = [
  {
    id: 'crm',
    name: 'Khách hàng (CRM)',
    actions: [
      { id: 'crm-view', name: 'Xem' },
      { id: 'crm-create-edit', name: 'Thêm / Sửa' },
      { id: 'crm-delete', name: 'Xoá' }
    ]
  },
  {
    id: 'prop',
    name: 'Đề xuất Báo giá',
    actions: [
      { id: 'prop-view', name: 'Xem' },
      { id: 'prop-create-edit', name: 'Thêm / Sửa' },
      { id: 'prop-delete', name: 'Xoá' }
    ]
  },
  {
    id: 'quote',
    name: 'Báo giá',
    actions: [
      { id: 'quote-view', name: 'Xem' },
      { id: 'quote-create-edit', name: 'Thêm / Sửa' },
      { id: 'quote-delete', name: 'Xoá' }
    ]
  },
  {
    id: 'contract',
    name: 'Hợp đồng',
    actions: [
      { id: 'contract-view', name: 'Xem' },
      { id: 'contract-create-edit', name: 'Thêm / Sửa' },
      { id: 'contract-delete', name: 'Xoá' }
    ]
  },
  {
    id: 'project',
    name: 'Dự án',
    actions: [
      { id: 'project-view', name: 'Xem' },
      { id: 'project-create', name: 'Tạo dự án' },
      { id: 'project-edit', name: 'Sửa' },
      { id: 'project-delete', name: 'Xoá' }
    ]
  },
  {
    id: 'hr',
    name: 'Nhân sự',
    actions: [
      { id: 'hr-view', name: 'Xem' },
      { id: 'hr-create-edit', name: 'Thêm / Sửa' },
      { id: 'hr-delete', name: 'Xoá' },
      { id: 'hr-salary-cost', name: 'Xem chi phí / lương' }
    ]
  },
  {
    id: 'prod',
    name: 'Yêu cầu Sản xuất',
    actions: [
      { id: 'prod-view', name: 'Xem' },
      { id: 'prod-create-edit', name: 'Thêm / Sửa' },
      { id: 'prod-delete', name: 'Xoá' },
      { id: 'prod-approve', name: 'Phê duyệt' }
    ]
  },
  {
    id: 'user',
    name: 'Quản trị User',
    actions: [
      { id: 'user-view', name: 'Xem' },
      { id: 'user-edit-perm', name: 'Sửa quyền' },
      { id: 'user-delete', name: 'Xoá user' }
    ]
  },
  {
    id: 'report',
    name: 'Báo cáo Tổng thể',
    actions: [
      { id: 'report-view', name: 'Xem' },
      { id: 'report-generate', name: 'Phát sinh báo cáo' }
    ]
  }
];

export interface TaoVaiTroModalProps {
  isOpen: boolean;
  roles: string[];
  onClose: () => void;
  onSubmit: (params: {
    roleName: string;
    roleCode?: string;
    roleGroup?: string;
    roleDesc?: string;
    cloneFromRole?: string;
    selectedPermissions?: string[];
  }) => void;
}

export default function TaoVaiTroModal({
  isOpen,
  roles,
  onClose,
  onSubmit
}: TaoVaiTroModalProps) {
  const [roleName, setRoleName] = useState('');
  const [roleCode, setRoleCode] = useState('');
  const [roleGroup, setRoleGroup] = useState('Tùy chỉnh');
  const [roleDesc, setRoleDesc] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  if (!isOpen) return null;

  const togglePermission = (actionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(actionId) ? prev.filter((id) => id !== actionId) : [...prev, actionId]
    );
  };

  const toggleGroup = (group: GroupDef) => {
    const groupActionIds = group.actions.map((a) => a.id);
    const allSelected = groupActionIds.every((id) => selectedPermissions.includes(id));

    if (allSelected) {
      setSelectedPermissions((prev) => prev.filter((id) => !groupActionIds.includes(id)));
    } else {
      setSelectedPermissions((prev) => Array.from(new Set([...prev, ...groupActionIds])));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = roleName.trim();
    if (!trimmed) return;
    if (roles.includes(trimmed)) {
      alert('Tên vai trò này đã tồn tại!');
      return;
    }
    onSubmit({
      roleName: trimmed,
      roleCode: roleCode.trim(),
      roleGroup: roleGroup.trim(),
      roleDesc: roleDesc.trim(),
      cloneFromRole: '',
      selectedPermissions
    });
    handleClose();
  };

  const handleClose = () => {
    setRoleName('');
    setRoleCode('');
    setRoleGroup('Tùy chỉnh');
    setRoleDesc('');
    setSelectedPermissions([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Tạo vai trò người dùng mới</h2>
          <button
            onClick={handleClose}
            type="button"
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-7 py-5 space-y-4 text-xs overflow-y-auto flex-1">
          {/* Row 1: Tên vai trò & Mã vai trò */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5 text-xs">
                Tên vai trò *
              </label>
              <input
                type="text"
                required
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="VD: Kiểm toán"
                className="w-full bg-[#f8fafc]/50 border border-[#406c89] rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5 text-xs">
                Mã vai trò *
              </label>
              <input
                type="text"
                required
                value={roleCode}
                onChange={(e) => setRoleCode(e.target.value)}
                placeholder="VD: auditor"
                className="w-full bg-[#f8fafc]/50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Nhóm */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5 text-xs">
              Nhóm
            </label>
            <input
              type="text"
              value={roleGroup}
              onChange={(e) => setRoleGroup(e.target.value)}
              placeholder="Tùy chỉnh"
              className="w-full bg-[#f8fafc]/50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:bg-white transition-colors"
            />
          </div>

          {/* Row 3: Mô tả */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5 text-xs">Mô tả</label>
            <textarea
              rows={2}
              value={roleDesc}
              onChange={(e) => setRoleDesc(e.target.value)}
              placeholder="Mô tả vai trò (tùy chọn)..."
              className="w-full bg-[#f8fafc]/50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:bg-white resize-y min-h-[64px] transition-colors"
            />
          </div>

          {/* Row 4: Bộ quyền tác nghiệp */}
          <div>
            <label className="block font-semibold text-slate-700 mb-2 text-xs">
              Bộ quyền tác nghiệp
            </label>
            <div className="border border-slate-200 rounded-xl bg-[#f8fafc]/60 max-h-[290px] overflow-y-auto divide-y divide-slate-100 shadow-2xs">
              {PERMISSION_GROUPS.map((group) => {
                return (
                  <div key={group.id} className="p-3.5">
                    <div className="mb-2.5">
                      <button
                        type="button"
                        onClick={() => toggleGroup(group)}
                        className="text-xs font-semibold text-[#406c89] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>{group.name}</span>
                        <span className="font-normal">(chọn tất cả)</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.actions.map((action) => {
                        const isSelected = selectedPermissions.includes(action.id);
                        return (
                          <button
                            key={action.id}
                            type="button"
                            onClick={() => togglePermission(action.id)}
                            className={`px-3.5 py-1.5 text-xs rounded-full border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#406c89] text-white border-[#406c89] shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {action.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 pb-1 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-medium text-white bg-[#406c89] hover:bg-[#335870] rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Tạo vai trò
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
