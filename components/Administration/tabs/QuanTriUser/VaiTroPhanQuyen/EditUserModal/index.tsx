"use client";

import React, { useState, useEffect } from 'react';
import { IconX } from '@tabler/icons-react';
import { UserItem, StatusType } from '../../types';

interface EditUserModalProps {
  user: UserItem | null;
  onClose: () => void;
  onSave: (updatedFields: {
    id: string;
    fullName: string;
    username: string;
    email: string;
    roles: string[];
    status: StatusType;
  }) => void;
  roleOptions?: string[];
}

interface RoleItem {
  name: string;
  description: string;
}

interface GroupItem {
  title: string;
  subGroups?: {
    title: string;
    roles: RoleItem[];
  }[];
  roles?: RoleItem[];
}

const ROLE_GROUPS: GroupItem[] = [
  {
    title: 'LÃNH ĐẠO',
    roles: [
      { name: 'Giám đốc', description: 'Truy cập toàn bộ tính năng, phê duyệt toàn bộ quy trình công việc...' },
      { name: 'Phó GĐ Kinh doanh – Hành chính', description: 'Toàn quyền dự án, tạo Báo giá & Hợp đồng, phê duyệt cấp cao...' },
      { name: 'Phó GĐ Kỹ thuật', description: 'Toàn quyền quản lý dự án kỹ thuật, khởi tạo & phê duyệt toàn bộ...' }
    ]
  },
  {
    title: 'HỆ THỐNG',
    roles: [
      { name: 'Quản trị viên hệ thống', description: 'Khởi tạo, thêm, bớt người dùng hệ thống. Quản lý phân quyền...' }
    ]
  },
  {
    title: 'KHỐI VĂN PHÒNG',
    roles: [
      { name: 'Quản lý Kinh doanh', description: 'Tạo Đề xuất BG, Báo giá, Hợp đồng, Dự án. Phê duyệt đề xuất...' },
      { name: 'Nhân viên Kinh doanh', description: 'Tạo Đề xuất BG, Báo giá, Hợp đồng, Dự án. Giao tiếp thông tin...' }
    ]
  },
  {
    title: 'QUẢN LÝ DỰ ÁN',
    roles: [
      { name: 'Chủ nhiệm Dự án', description: 'Toàn quyền khởi tạo/tạm dừng dự án, phê duyệt báo cáo, chỉ định...' }
    ]
  },
  {
    title: 'KHỐI KỸ THUẬT',
    subGroups: [
      {
        title: 'Quản lý Phòng',
        roles: [
          { name: 'Quản lý Phòng Khai triển', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng Khai triển...' },
          { name: 'Quản lý Phòng Công nghệ & Thiết kế', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng Công nghệ & Thiết kế...' },
          { name: 'Quản lý Phòng Cắt', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng Cắt...' },
          { name: 'Quản lý Phòng Ghép', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng Ghép...' },
          { name: 'Quản lý Phòng Mộc Sơn', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng Mộc Sơn...' },
          { name: 'Quản lý Phòng Điện', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng Điện...' },
          { name: 'Quản lý Phòng Cảnh Quan', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng Cảnh Quan...' },
          { name: 'Quản lý Khối Văn phòng (KT)', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Khối Văn phòng (kỹ thuật)...' }
        ]
      },
      {
        title: 'Quản lý Dự án Phòng',
        roles: [
          { name: 'QLDA Phòng Khai triển', description: 'Quản lý tiến độ và báo cáo từng dự án của Phòng Khai triển...' },
          { name: 'QLDA Phòng Công nghệ & Thiết kế', description: 'Quản lý tiến độ và báo cáo từng dự án của Phòng Công nghệ và Thiết kế...' },
          { name: 'QLDA Phòng Cắt', description: 'Quản lý tiến độ và báo cáo từng dự án của Phòng Cắt...' },
          { name: 'QLDA Phòng Ghép', description: 'Quản lý tiến độ và báo cáo từng dự án của Phòng Ghép...' },
          { name: 'QLDA Phòng Mộc Sơn', description: 'Quản lý tiến độ và báo cáo từng dự án của Phòng Mộc Sơn...' },
          { name: 'QLDA Phòng Điện', description: 'Quản lý tiến độ và báo cáo từng dự án của Phòng Điện...' },
          { name: 'QLDA Phòng Cảnh Quan', description: 'Quản lý tiến độ và báo cáo từng dự án của Phòng Cảnh Quan...' },
          { name: 'QLDA Khối Văn phòng (KT)', description: 'Quản lý tiến độ và báo cáo từng dự án của Khối Văn phòng (kỹ thuật)...' }
        ]
      },
      {
        title: 'Kỹ thuật viên',
        roles: [
          { name: 'KTV Phòng Khai triển', description: 'Nhân viên kỹ thuật Phòng Khai triển. Báo cáo công việc hàng ngày...' },
          { name: 'KTV Phòng Công nghệ & Thiết kế', description: 'Nhân viên kỹ thuật Phòng Công nghệ và Thiết kế. Báo cáo công việc...' },
          { name: 'KTV Phòng Cắt', description: 'Nhân viên kỹ thuật Phòng Cắt. Báo cáo công việc hàng ngày...' },
          { name: 'KTV Phòng Ghép', description: 'Nhân viên kỹ thuật Phòng Ghép. Báo cáo công việc hàng ngày...' },
          { name: 'KTV Phòng Mộc Sơn', description: 'Nhân viên kỹ thuật Phòng Mộc Sơn. Báo cáo công việc hàng ngày...' },
          { name: 'KTV Phòng Điện', description: 'Nhân viên kỹ thuật Phòng Điện. Báo cáo công việc hàng ngày...' },
          { name: 'KTV Phòng Cảnh Quan', description: 'Nhân viên kỹ thuật Phòng Cảnh Quan. Báo cáo công việc hàng ngày...' },
          { name: 'KTV Khối Văn phòng (KT)', description: 'Nhân viên kỹ thuật Khối Văn phòng. Báo cáo công việc hàng ngày...' }
        ]
      }
    ]
  }
];

function getRoleBadgeClass(role: string) {
  if (role.includes('Giám đốc') || role.includes('Phó GĐ Kinh doanh')) {
    return 'bg-rose-100/80 text-rose-700 border-rose-200/80';
  } else if (role.includes('Phó GĐ Kỹ thuật') || role.includes('Chủ nhiệm')) {
    return 'bg-amber-100/80 text-amber-800 border-amber-200/80';
  } else if (role.includes('Quản trị viên')) {
    return 'bg-slate-100 text-slate-700 border-slate-200';
  } else if (role.includes('Quản lý Kinh doanh')) {
    return 'bg-purple-100/80 text-purple-700 border-purple-200/80';
  } else if (role.includes('Nhân viên Kinh doanh')) {
    return 'bg-blue-100/80 text-blue-700 border-blue-200/80';
  } else if (role.includes('QLDA')) {
    return 'bg-emerald-100/80 text-emerald-700 border-emerald-200/80';
  } else if (role.includes('KTV')) {
    return 'bg-sky-100/80 text-sky-700 border-sky-200/80';
  } else if (role.includes('Quản lý Phòng')) {
    return 'bg-teal-100/80 text-teal-700 border-teal-200/80';
  }
  return 'bg-slate-100 text-slate-700 border-slate-200';
}

export default function EditUserModal({
  user,
  onClose,
  onSave
}: EditUserModalProps) {
  const [formRoles, setFormRoles] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      setFormRoles(user.roles || []);
    }
  }, [user]);

  if (!user) return null;

  const toggleRole = (roleName: string) => {
    setFormRoles(prev =>
      prev.includes(roleName)
        ? prev.filter(r => r !== roleName)
        : [...prev, roleName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      roles: formRoles.length > 0 ? formRoles : ['Quản trị viên hệ thống'],
      status: user.status,
    });
  };

  const renderRoleItem = (role: RoleItem) => {
    const isChecked = formRoles.includes(role.name);
    return (
      <label
        key={role.name}
        className="flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer select-none group"
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => toggleRole(role.name)}
          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer shrink-0"
        />
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border whitespace-nowrap shrink-0 ${getRoleBadgeClass(role.name)}`}>
          {role.name}
        </span>
        <span className="text-xs text-slate-400 truncate flex-1 group-hover:text-slate-600 transition-colors font-normal">
          {role.description}
        </span>
      </label>
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-slate-100 p-6 flex flex-col gap-4 text-left relative animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between shrink-0 pb-1">
          <h3 className="font-bold text-slate-900 text-base tracking-tight">
            Phân quyền — <span className="font-bold">{user.username || user.fullName}</span>
          </h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1 rounded-full hover:bg-slate-100"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Selected Roles Bar */}
        <div className="bg-sky-50/40 border border-sky-100/80 rounded-xl p-3 flex flex-wrap gap-2 items-center min-h-[52px]">
          {formRoles.map((role) => (
            <span
              key={role}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100/70 text-sky-800 border border-sky-200/80 select-none shadow-3xs"
            >
              <span>{role}</span>
              <button
                type="button"
                onClick={() => toggleRole(role)}
                className="hover:bg-sky-200/80 text-sky-700 hover:text-sky-900 rounded-full p-0.5 transition-colors cursor-pointer"
              >
                <IconX size={12} strokeWidth={2.5} />
              </button>
            </span>
          ))}
          {formRoles.length === 0 && (
            <span className="text-xs text-slate-400 italic">Chưa chọn vai trò nào</span>
          )}
        </div>

        {/* Prompt */}
        <p className="text-xs text-slate-500 font-medium">
          Chọn một hoặc nhiều vai trò cho người dùng này:
        </p>

        {/* Scrollable Role List */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 min-h-0 text-left">
          <div className="overflow-y-auto max-h-[340px] pr-1 space-y-4 text-left custom-scrollbar">
            {ROLE_GROUPS.map((group) => (
              <div key={group.title} className="space-y-1">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider px-1">
                  {group.title}
                </h4>
                {group.roles && (
                  <div className="space-y-0.5">
                    {group.roles.map(renderRoleItem)}
                  </div>
                )}
                {group.subGroups && (
                  <div className="space-y-3 pt-1">
                    {group.subGroups.map((sub) => (
                      <div key={sub.title} className="space-y-1">
                        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wide px-1">
                          {sub.title}
                        </h5>
                        <div className="space-y-0.5">
                          {sub.roles.map(renderRoleItem)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3.5 border-t border-slate-100 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#3b44b6] hover:bg-[#2f379b] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all active:scale-98"
            >
              Lưu {formRoles.length} vai trò
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
