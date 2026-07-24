import React from 'react';
import {
  IconSearch,
  IconX,
  IconPencil,
  IconTrash,
  IconChevronUp,
  IconChevronDown
} from '@tabler/icons-react';
import { UserItem, RoleType, StatusType } from '../types';

// ─── AVATAR COMPONENT ────────────────────────────────────────────────────────
function UserAvatar({ name }: { name: string }) {
  const letter = name.charAt(0).toUpperCase();
  const bgColors = [
    'bg-indigo-50 text-indigo-600 border-indigo-200',
    'bg-emerald-50 text-emerald-600 border-emerald-200',
    'bg-amber-50 text-amber-600 border-amber-200',
    'bg-rose-50 text-rose-600 border-rose-200',
    'bg-sky-50 text-sky-600 border-sky-200'
  ];
  const colorIndex = name.charCodeAt(0) % bgColors.length;
  const colorClass = bgColors[colorIndex];
  return (
    <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${colorClass}`}>
      {letter}
    </div>
  );
}

// ─── ROLE BADGE ──────────────────────────────────────────────────────────────
function RoleBadge({ role }: { role: RoleType }) {
  let color = 'bg-slate-100 text-slate-700 border-slate-200';
  if (role === 'Superadmin') color = 'bg-red-50 text-red-600 border-red-200';
  else if (role === 'Admin') color = 'bg-blue-50 text-blue-600 border-blue-200';
  else if (role === 'Quản lý Kinh doanh') color = 'bg-amber-50 text-amber-700 border-amber-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${color}`}>
      {role}
    </span>
  );
}

// ─── STATUS BADGE ────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: StatusType }) {
  const color = status === 'Hoạt động'
    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
    : 'bg-rose-50 text-rose-600 border-rose-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${color}`}>
      {status}
    </span>
  );
}

interface DanhSachTaiKhoanProps {
  users: UserItem[];
  search: string;
  setSearch: (val: string) => void;
  sortedUsers: UserItem[];
  handleSort: (key: 'fullName' | 'role' | 'createdDate') => void;
  sortKey: 'fullName' | 'role' | 'createdDate' | null;
  sortDir: 'asc' | 'desc';
  handleOpenEdit: (user: UserItem) => void;
  setDeletingUser: (user: UserItem | null) => void;
}

export default function DanhSachTaiKhoan({
  users,
  search,
  setSearch,
  sortedUsers,
  handleSort,
  sortKey,
  sortDir,
  handleOpenEdit,
  setDeletingUser
}: DanhSachTaiKhoanProps) {

  function SortIcon({ k }: { k: 'fullName' | 'role' | 'createdDate' }) {
    if (sortKey !== k) {
      return (
        <span className="inline-flex flex-col ml-1 opacity-40 shrink-0">
          <IconChevronUp size={9} />
          <IconChevronDown size={9} className="-mt-1" />
        </span>
      );
    }
    return sortDir === 'asc' ? (
      <IconChevronUp size={11} className="ml-1 text-[#406c89] shrink-0" />
    ) : (
      <IconChevronDown size={11} className="ml-1 text-[#406c89] shrink-0" />
    );
  }

  return (
    <div className="space-y-4 flex flex-col">
      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên, email, tên đăng nhập..."
          className="w-full text-xs font-medium bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all text-slate-700"
        />
        <IconSearch size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <IconX size={14} />
          </button>
        )}
      </div>

      {/* User Table Card */}
      <div className="bg-white border border-slate-200/50 rounded-xl shadow-xs overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/60 text-slate-400 font-bold select-none uppercase tracking-wide">
                <th className="p-3.5 cursor-pointer hover:bg-slate-100/70 transition-colors" onClick={() => handleSort('fullName')}>
                  <div className="flex items-center gap-0.5">
                    Họ và tên
                    <SortIcon k="fullName" />
                  </div>
                </th>
                <th className="p-3.5">Tên đăng nhập</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5 cursor-pointer hover:bg-slate-100/70 transition-colors" onClick={() => handleSort('role')}>
                  <div className="flex items-center gap-0.5">
                    Vai trò
                    <SortIcon k="role" />
                  </div>
                </th>
                <th className="p-3.5">Trạng thái</th>
                <th className="p-3.5 cursor-pointer hover:bg-slate-100/70 transition-colors" onClick={() => handleSort('createdDate')}>
                  <div className="flex items-center gap-0.5">
                    Ngày tạo
                    <SortIcon k="createdDate" />
                  </div>
                </th>
                <th className="p-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {sortedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.fullName} />
                      <span className="font-bold text-slate-800 leading-snug">{user.fullName}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-medium text-slate-500">{user.username}</td>
                  <td className="p-3.5 text-slate-500 font-medium">{user.email || '—'}</td>
                  <td className="p-3.5">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="p-3.5 text-slate-500 font-medium">{user.createdDate}</td>
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleOpenEdit(user)}
                        className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-[#406c89] transition-all cursor-pointer"
                        title="Sửa"
                      >
                        <IconPencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeletingUser(user)}
                        className="p-1.5 hover:bg-red-50 rounded text-slate-400 hover:text-red-650 transition-all cursor-pointer"
                        title="Xóa"
                      >
                        <IconTrash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {sortedUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400 font-medium">
                    Không tìm thấy người dùng phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Counter footer */}
      {sortedUsers.length > 0 && (
        <p className="text-[10px] text-slate-400 font-medium text-center">
          Hiển thị {sortedUsers.length} / {users.length} người dùng
        </p>
      )}
    </div>
  );
}
