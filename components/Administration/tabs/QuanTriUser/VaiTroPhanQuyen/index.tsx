"use client";

import React, { useState } from 'react';
import { IconChevronDown, IconUser } from '@tabler/icons-react';
import { UserItem } from '../types';

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
      { name: 'Giám đốc', description: 'Truy cập toàn bộ tính năng, phê duyệt toàn bộ quy trình công...' },
      { name: 'Phó GĐ Kinh doanh – Hành chính', description: 'Toàn quyền dự án, tạo Báo giá & Hợp đồng, phê duyệt cấp cao ...' },
      { name: 'Phó GĐ Kỹ thuật', description: 'Toàn quyền quản lý dự án kỹ thuật, khởi tạo & phê duyệt toàn...' }
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
      { name: 'Quản lý Kinh doanh', description: 'Tạo Đề xuất BG, Báo giá, Hợp đồng, Dự án. Phê duyệt đề xuất ...' },
      { name: 'Nhân viên Kinh doanh', description: 'Tạo Đề xuất BG, Báo giá, Hợp đồng, Dự án. Giao tiếp thông tin...' }
    ]
  },
  {
    title: 'QUẢN LÝ DỰ ÁN',
    roles: [
      { name: 'Chủ nhiệm Dự án', description: 'Toàn quyền khởi tạo/tạm dừng dự án, phê duyệt báo cáo, chỉ đ...' }
    ]
  },
  {
    title: 'KHỐI KỸ THUẬT',
    subGroups: [
      {
        title: 'Quản lý Phòng',
        roles: [
          { name: 'Quản lý Phòng Khai triển', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng...' },
          { name: 'Quản lý Phòng Công nghệ & Thiết kế', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng...' },
          { name: 'Quản lý Phòng Cắt', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng...' },
          { name: 'Quản lý Phòng Ghép', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng...' },
          { name: 'Quản lý Phòng Mộc Sơn', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng...' },
          { name: 'Quản lý Phòng Điện', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng...' },
          { name: 'Quản lý Phòng Cảnh Quan', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng...' },
          { name: 'Quản lý Khối Văn phòng (KT)', description: 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Khối ...' }
        ]
      },
      {
        title: 'Quản lý Dự án Phòng',
        roles: [
          { name: 'QLDA Phòng Khai triển', description: 'Quản lý tiến độ và báo cáo từng dự án của Phòng Khai triển...' },
          { name: 'QLDA Phòng Công nghệ & Thiết kế', description: 'Quản lý tiến độ và báo cáo từng dự án của Phòng Công nghệ và...' },
          { name: 'QLDA Phòng Cắt', description: 'Quản lý tiến độ và báo cáo từng dự án của Phòng Cắt...' },
          { name: 'QLDA Phòng Ghép', description: 'Quản lý tiến độ và báo cáo từng dự án của Phòng Ghép...' },
          { name: 'QLDA Phòng Mộc Sơn', description: 'Quản lý tiến độ và báo cáo từng dự án của Phòng Mộc Sơn...' },
          { name: 'QLDA Phòng Điện', description: 'Quản lý tiến độ và báo cáo từng dự án của Phòng Điện...' },
          { name: 'QLDA Phòng Cảnh Quan', description: 'Quản lý tiến độ và báo cáo từng dự án của Phòng Cảnh Quan...' },
          { name: 'QLDA Khối Văn phòng (KT)', description: 'Quản lý tiến độ và báo cáo từng dự án của Khối Văn phòng (kỷ...' }
        ]
      },
      {
        title: 'Kỹ thuật viên',
        roles: [
          { name: 'KTV Phòng Khai triển', description: 'Nhân viên kỹ thuật Phòng Khai triển. Báo cáo công việc hàng ...' },
          { name: 'KTV Phòng Công nghệ & Thiết kế', description: 'Nhân viên kỹ thuật Phòng Công nghệ và Thiết kế. Báo cáo công...' },
          { name: 'KTV Phòng Cắt', description: 'Nhân viên kỹ thuật Phòng Cắt. Báo cáo công việc hàng ngày ch...' },
          { name: 'KTV Phòng Ghép', description: 'Nhân viên kỹ thuật Phòng Ghép. Báo cáo công việc hàng ngày c...' },
          { name: 'KTV Phòng Mộc Sơn', description: 'Nhân viên kỹ thuật Phòng Mộc Sơn. Báo cáo công việc hàng ngà...' },
          { name: 'KTV Phòng Điện', description: 'Nhân viên kỹ thuật Phòng Điện. Báo cáo công việc hàng ngày c...' },
          { name: 'KTV Phòng Cảnh Quan', description: 'Nhân viên kỹ thuật Phòng Cảnh Quan. Báo cáo công việc hàng n...' },
          { name: 'KTV Khối Văn phòng (KT)', description: 'Nhân viên kỹ thuật Khối Văn phòng. Báo cáo công việc hàng ng...' }
        ]
      }
    ]
  }
];

function RoleBadge({ role }: { role: string }) {
  let color = 'bg-slate-50 text-slate-600 border-slate-200';
  
  if (role.includes('Quản trị viên') || role.includes('Admin')) {
    color = 'bg-slate-50 text-slate-650 border-slate-200';
  } else if (role.includes('Chủ nhiệm')) {
    color = 'bg-amber-50 text-amber-700 border border-amber-200';
  } else if (role.includes('QLDA')) {
    color = 'bg-emerald-50 text-emerald-600 border border-emerald-150';
  } else if (role.includes('KTV')) {
    color = 'bg-sky-50 text-sky-600 border border-sky-150';
  } else if (role.includes('Phó GĐ') || role.includes('GĐ') || role.includes('Giám đốc')) {
    color = 'bg-rose-50 text-rose-600 border border-rose-150';
  } else if (role.includes('Quản lý Phòng')) {
    color = 'bg-teal-50 text-teal-600 border border-teal-150';
  } else if (role.includes('Quản lý Kinh doanh')) {
    color = 'bg-purple-50 text-purple-600 border border-purple-150';
  } else if (role.includes('Nhân viên')) {
    color = 'bg-indigo-50 text-indigo-600 border border-indigo-150';
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap select-none ${color}`}>
      {role}
    </span>
  );
}

interface VaiTroPhanQuyenProps {
  users: UserItem[];
}

export default function VaiTroPhanQuyen({ users }: VaiTroPhanQuyenProps) {
  const [expandedRoles, setExpandedRoles] = useState<string[]>([]);

  const toggleRole = (roleName: string) => {
    if (expandedRoles.includes(roleName)) {
      setExpandedRoles(prev => prev.filter(r => r !== roleName));
    } else {
      setExpandedRoles(prev => [...prev, roleName]);
    }
  };

  const getRoleUserCount = (roleName: string) => {
    return users.filter(u => u.roles.includes(roleName)).length;
  };

  const getRoleUsers = (roleName: string) => {
    return users.filter(u => u.roles.includes(roleName));
  };

  const renderRoleRow = (role: RoleItem) => {
    const count = getRoleUserCount(role.name);
    const isExpanded = expandedRoles.includes(role.name);
    const roleUsers = getRoleUsers(role.name);

    return (
      <div key={role.name} className="flex flex-col border-b border-slate-100/70 last:border-b-0 py-2">
        <div
          onClick={() => toggleRole(role.name)}
          className="flex items-center justify-between cursor-pointer hover:bg-slate-50/40 transition-colors p-2 rounded-lg -mx-2"
        >
          <div className="flex items-center gap-4 text-left min-w-0">
            <RoleBadge role={role.name} />
            <span className="text-[11px] text-slate-400 font-medium truncate hidden md:inline">
              {role.description}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 pl-4 select-none">
            <span className="text-[11px] font-bold text-slate-500">{count} người</span>
            <IconChevronDown
              size={13}
              className={`text-slate-400 transition-transform duration-250 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        {/* Dynamic Accordion showing assigned users */}
        {isExpanded && (
          <div className="bg-slate-50/40 border border-slate-100 rounded-xl p-3.5 mt-1.5 mb-2 ml-4 animate-fade-in">
            {roleUsers.length === 0 ? (
              <p className="text-[10px] text-slate-400 italic text-left">Chưa có người dùng nào được gán vai trò này.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-left">
                {roleUsers.map(u => (
                  <div key={u.id} className="flex items-center gap-2.5 bg-white border border-slate-100 p-2.5 rounded-lg shadow-3xs">
                    <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500 uppercase shrink-0">
                      {u.fullName.charAt(0)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-slate-700 truncate leading-tight">{u.fullName}</span>
                      <span className="text-[9px] text-slate-400 font-medium truncate">@{u.username}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200/50 rounded-xl shadow-xs p-5 sm:p-6 flex flex-col flex-1 min-h-0 overflow-hidden animate-fade-in text-left">
      <div className="flex-1 overflow-y-auto pr-1 no-scrollbar space-y-6">
        {ROLE_GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col">
            {/* Group Title Header */}
            <h3 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider pb-1.5 border-b border-slate-100 mb-2">
              {group.title}
            </h3>

            {/* List of roles or sub-groups */}
            {group.roles && (
              <div className="flex flex-col">
                {group.roles.map(role => renderRoleRow(role))}
              </div>
            )}

            {group.subGroups && (
              <div className="space-y-4">
                {group.subGroups.map(sub => (
                  <div key={sub.title} className="flex flex-col">
                    <h4 className="text-[11px] font-black text-slate-500 mb-1 pt-1">
                      {sub.title}
                    </h4>
                    <div className="flex flex-col">
                      {sub.roles.map(role => renderRoleRow(role))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
