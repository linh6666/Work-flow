import React, { useState, useEffect } from 'react';
import {
  IconSearch,
  IconX,
  IconChevronUp,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react';
import { UserItem, StatusType } from '../types';

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

// ─── ROLE PILL BADGE ─────────────────────────────────────────────────────────
function RoleBadge({ role }: { role: string }) {
  let color = 'bg-slate-50 text-slate-600 border-slate-200';
  
  if (role.includes('Quản trị viên') || role.includes('Admin')) {
    color = 'bg-slate-50 text-slate-600 border-slate-200';
  } else if (role.includes('Chủ nhiệm')) {
    color = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (role.includes('QLDA')) {
    color = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (role.includes('KTV')) {
    color = 'bg-sky-50 text-sky-700 border-sky-200';
  } else if (role.includes('Phó GĐ') || role.includes('GĐ') || role.includes('Giám đốc')) {
    color = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (role.includes('Quản lý')) {
    color = 'bg-purple-50 text-purple-700 border-purple-200';
  } else if (role.includes('Nhân viên')) {
    color = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold border whitespace-nowrap ${color}`}>
      {role}
    </span>
  );
}

// ─── TRẠNG THÁI BADGE (Single line badge) ────────────────────────────────────
function StatusBadge({ status }: { status: StatusType }) {
  if (status === 'Hoạt động') {
    return (
      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-bold whitespace-nowrap">
        Hoạt động
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-bold whitespace-nowrap">
      Tạm dừng
    </span>
  );
}

interface DanhSachTaiKhoanProps {
  users: UserItem[];
  search: string;
  setSearch: (val: string) => void;
  sortedUsers: UserItem[];
  handleSort: (key: 'fullName' | 'email' | 'role') => void;
  sortKey: 'fullName' | 'email' | 'role' | null;
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
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(sortedUsers.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + PAGE_SIZE);

  function SortIcon({ k }: { k: 'fullName' | 'email' | 'role' }) {
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

  // Calculate statistics (using mock total values but dynamically responsive if needed)
  const totalUsersCount = 40;
  const adminCount = 2;
  const normalUsersCount = 38;

  return (
    <div className="space-y-4 flex flex-col flex-1 min-h-0 overflow-hidden">

      {/* 1. TOP STATISTICS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 text-left">
        <div className="bg-white border border-slate-200/50 rounded-xl py-3 px-4 shadow-2xs">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tổng người dùng</p>
          <p className="text-2xl font-black mt-0.5 text-indigo-750">{totalUsersCount}</p>
        </div>
        <div className="bg-white border border-slate-200/50 rounded-xl py-3 px-4 shadow-2xs">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Lãnh đạo & Admin</p>
          <p className="text-2xl font-black mt-0.5 text-red-550">{adminCount}</p>
        </div>
        <div className="bg-white border border-slate-200/50 rounded-xl py-3 px-4 shadow-2xs">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Người dùng thường</p>
          <p className="text-2xl font-black mt-0.5 text-slate-750">{normalUsersCount}</p>
        </div>
      </div>

      {/* 2. SEARCH BAR */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên hoặc email..."
          className="w-full text-xs font-medium bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all text-slate-700 shadow-2xs"
        />
        <IconSearch size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450" />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-450 hover:text-slate-655 cursor-pointer"
          >
            <IconX size={14} />
          </button>
        )}
      </div>

      {/* 3. USER TABLE CARD */}
      <div className="bg-white border border-slate-200/50 rounded-xl shadow-xs overflow-hidden flex flex-col flex-1 min-h-0">
        <div className="overflow-y-auto overflow-x-auto flex-1 min-h-0 no-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/60 text-slate-400 font-bold select-none uppercase tracking-wide">
                <th className="p-3.5 sticky top-0 bg-slate-50 z-10 cursor-pointer hover:bg-slate-100/70 transition-colors border-b border-slate-200/60" onClick={() => handleSort('fullName')}>
                  <div className="flex items-center gap-0.5">
                    Người dùng
                    <SortIcon k="fullName" />
                  </div>
                </th>
                <th className="p-3.5 sticky top-0 bg-slate-50 z-10 border-b border-slate-200/60 cursor-pointer hover:bg-slate-100/70 transition-colors" onClick={() => handleSort('email')}>
                  <div className="flex items-center gap-0.5">
                    Email
                    <SortIcon k="email" />
                  </div>
                </th>
                <th className="p-3.5 sticky top-0 bg-slate-50 z-10 border-b border-slate-200/60 cursor-pointer hover:bg-slate-100/70 transition-colors" onClick={() => handleSort('role')}>
                  <div className="flex items-center gap-0.5">
                    Vai trò hệ thống
                    <SortIcon k="role" />
                  </div>
                </th>
                <th className="p-3.5 sticky top-0 bg-slate-50 z-10 text-center border-b border-slate-200/60">TRẠNG THÁI</th>
                <th className="p-3.5 sticky top-0 bg-slate-50 z-10 text-right pr-6 border-b border-slate-200/60">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/20 transition-colors">
                  <td className="p-3.5 py-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.fullName} />
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-slate-800 leading-snug">{user.fullName}</span>
                        {user.isCurrentUser && (
                          <span className="text-[10px] text-blue-500 font-medium mt-0.5">Tài khoản của bạn</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 py-4 text-slate-500 font-medium">{user.email || '—'}</td>
                  <td className="p-3.5 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {user.roles.map((role, idx) => (
                        <RoleBadge key={idx} role={role} />
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5 py-4 text-center">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="p-3.5 py-4 text-right pr-6">
                    {!user.isCurrentUser && (
                      <div className="inline-flex items-center gap-2 justify-end">
                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:border-slate-350 hover:bg-slate-50 text-xs font-semibold rounded-lg shadow-2xs transition-all cursor-pointer active:scale-95 whitespace-nowrap"
                        >
                          Đổi vai trò
                        </button>
                        <button
                          onClick={() => setDeletingUser(user)}
                          className="w-7 h-7 rounded-full border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer"
                          title="Xóa"
                        >
                          <IconX size={12} strokeWidth={2.5} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {sortedUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-400 font-medium">
                    Không tìm thấy người dùng phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 bg-white px-4 py-3 sm:px-6 select-none">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                Trước
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="relative ml-3 inline-flex items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-550 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                Sau
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between text-left">
              <div>
                <p className="text-xs text-slate-500">
                  Hiển thị từ <span className="font-bold text-slate-700">{startIndex + 1}</span> đến <span className="font-bold text-slate-700">{Math.min(startIndex + PAGE_SIZE, sortedUsers.length)}</span> trong tổng số <span className="font-bold text-slate-700">{sortedUsers.length}</span> kết quả
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-3xs" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-l-md border border-slate-200 bg-white px-2 py-2 text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <IconChevronLeft size={14} strokeWidth={2.5} />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-3.5 py-2 text-xs font-bold border transition-all cursor-pointer ${
                        currentPage === page
                          ? 'z-10 bg-[#406c89] border-[#406c89] text-white'
                          : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-750'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center rounded-r-md border border-slate-200 bg-white px-2 py-2 text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <IconChevronRight size={14} strokeWidth={2.5} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
