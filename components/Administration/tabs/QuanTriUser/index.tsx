"use client";

import React, { useState } from 'react';
import {
  IconShield,
  IconPlus,
  IconX,
  IconUser,
  IconMail,
  IconKey,
  IconLock
} from '@tabler/icons-react';
import { UserItem, RoleType, StatusType } from './types';
import DanhSachTaiKhoan from './DanhSachTaiKhoan';
import VaiTroPhanQuyen from './VaiTroPhanQuyen';

const DEFAULT_USERS: UserItem[] = [
  {
    id: 'usr-1',
    fullName: 'Nguyễn Khắc Hợp',
    email: 'hopnk@mohingviet.vn',
    username: 'hopnk1',
    role: 'Superadmin',
    status: 'Hoạt động',
    createdDate: '2026-03-04',
  },
  {
    id: 'usr-2',
    fullName: 'Nguyễn Thị Mai',
    email: 'maintt@mohingviet.vn',
    username: 'maintt',
    role: 'Admin',
    status: 'Hoạt động',
    createdDate: '2026-03-11',
  },
  {
    id: 'usr-3',
    fullName: 'Phùng Thị Thảo',
    email: 'thaopt@mohingviet.vn',
    username: 'thaopt',
    role: 'Quản lý Kinh doanh',
    status: 'Hoạt động',
    createdDate: '2026-03-12',
  },
  {
    id: 'usr-4',
    fullName: 'Lê Công Chiến',
    email: 'lecongchien2472002@gmail.com',
    username: 'chienlc',
    role: 'Nhân viên',
    status: 'Hoạt động',
    createdDate: '2026-03-15',
  },
  {
    id: 'usr-5',
    fullName: 'Trần Văn An',
    email: 'antv@mohingviet.vn',
    username: 'antv',
    role: 'Nhân viên',
    status: 'Tạm dừng',
    createdDate: '2026-03-20',
  }
];

export default function QuanTriUser() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [users, setUsers] = useState<UserItem[]>(DEFAULT_USERS);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'fullName' | 'role' | 'createdDate' | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Modal control states
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserItem | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formRole, setFormRole] = useState<RoleType>('Nhân viên');
  const [formStatus, setFormStatus] = useState<StatusType>('Hoạt động');
  const [formPassword, setFormPassword] = useState('');

  // Handle invite submission
  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formUsername.trim()) return;

    const newUser: UserItem = {
      id: `usr-${Date.now()}`,
      fullName: formName.trim(),
      email: formEmail.trim(),
      username: formUsername.trim(),
      role: formRole,
      status: formStatus,
      createdDate: new Date().toISOString().split('T')[0],
    };

    setUsers(prev => [newUser, ...prev]);
    resetForm();
    setIsInviteOpen(false);
  };

  // Handle edit submission
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser || !formName.trim() || !formEmail.trim() || !formUsername.trim()) return;

    setUsers(prev =>
      prev.map(u =>
        u.id === editingUser.id
          ? {
              ...u,
              fullName: formName.trim(),
              email: formEmail.trim(),
              username: formUsername.trim(),
              role: formRole,
              status: formStatus,
            }
          : u
      )
    );
    setEditingUser(null);
    resetForm();
  };

  // Open edit modal & prefill form
  const handleOpenEdit = (user: UserItem) => {
    setEditingUser(user);
    setFormName(user.fullName);
    setFormEmail(user.email);
    setFormUsername(user.username);
    setFormRole(user.role);
    setFormStatus(user.status);
    setFormPassword('');
  };

  // Confirm delete
  const handleDeleteConfirm = () => {
    if (deletingUser) {
      setUsers(prev => prev.filter(u => u.id !== deletingUser.id));
      setDeletingUser(null);
    }
  };

  const resetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormUsername('');
    setFormRole('Nhân viên');
    setFormStatus('Hoạt động');
    setFormPassword('');
  };

  // Search logic
  const filteredUsers = users.filter(u => {
    const q = search.toLowerCase();
    return (
      u.fullName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q)
    );
  });

  // Sort logic
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey].toLowerCase();
    const valB = b[sortKey].toLowerCase();
    return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  const handleSort = (key: 'fullName' | 'role' | 'createdDate') => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fafbfc] overflow-hidden select-none">
      
      {/* 1. STICKY HEADER MATCHING SCREENSHOT */}
      <div className="sticky top-0 z-10 bg-[#fafbfc] px-4 sm:px-8 pt-6 pb-4 border-b border-slate-100 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div>
            <div className="flex items-center gap-2 text-[#406c89]">
              <IconShield size={20} className="text-[#406c89] stroke-[2.25]" />
              <span className="text-lg font-bold text-slate-900 tracking-tight">Quản trị người dùng</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Phân quyền và quản lý tài khoản hệ thống
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setIsInviteOpen(true);
            }}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#406c89] hover:bg-[#345a74] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer w-full sm:w-auto active:scale-95"
          >
            <IconPlus size={15} strokeWidth={2.5} />
            Mời người dùng
          </button>
        </div>
      </div>

      {/* 2. SUB TABS */}
      <div className="flex border-b border-slate-200 bg-white px-4 sm:px-8 shrink-0">
        <button
          onClick={() => setActiveTab('users')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'users'
              ? 'border-[#406c89] text-[#406c89]'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Danh sách tài khoản
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'roles'
              ? 'border-[#406c89] text-[#406c89]'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Vai trò & Phân quyền
        </button>
      </div>

      {/* 3. SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-5 flex flex-col gap-4">
        {activeTab === 'users' ? (
          <DanhSachTaiKhoan
            users={users}
            search={search}
            setSearch={setSearch}
            sortedUsers={sortedUsers}
            handleSort={handleSort}
            sortKey={sortKey}
            sortDir={sortDir}
            handleOpenEdit={handleOpenEdit}
            setDeletingUser={setDeletingUser}
          />
        ) : (
          <VaiTroPhanQuyen />
        )}
      </div>

      {/* 4. INVITE USER MODAL */}
      {isInviteOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in border border-slate-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">Mời người dùng hệ thống</h3>
              <button onClick={() => setIsInviteOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <IconX size={16} />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="p-5 space-y-4 text-left">
              {/* Họ và tên */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Họ và tên</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Nhập họ và tên..."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] text-slate-700"
                  />
                  <IconUser size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Tên đăng nhập */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tên đăng nhập</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    placeholder="Nhập tên tài khoản..."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] text-slate-700"
                  />
                  <IconLock size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Email liên hệ</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Nhập email..."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] text-slate-700"
                  />
                  <IconMail size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Mật khẩu */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Mật khẩu ban đầu</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    placeholder="Nhập mật khẩu..."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] text-slate-700"
                  />
                  <IconKey size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Vai trò và Trạng thái */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Vai trò</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as RoleType)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] text-slate-700"
                  >
                    <option value="Superadmin">Superadmin</option>
                    <option value="Admin">Admin</option>
                    <option value="Quản lý Kinh doanh">Quản lý Kinh doanh</option>
                    <option value="Nhân viên">Nhân viên</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Trạng thái</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as StatusType)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] text-slate-700"
                  >
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Tạm dừng">Tạm dừng</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#406c89] hover:bg-[#345a74] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. EDIT USER MODAL */}
      {editingUser !== null && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in border border-slate-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">Chỉnh sửa thông tin</h3>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <IconX size={16} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-5 space-y-4 text-left">
              {/* Họ và tên */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Họ và tên</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Nhập họ và tên..."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] text-slate-700"
                  />
                  <IconUser size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Tên đăng nhập */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tên đăng nhập</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    placeholder="Nhập tên tài khoản..."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] text-slate-700"
                  />
                  <IconLock size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Email liên hệ</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Nhập email..."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] text-slate-700"
                  />
                  <IconMail size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Vai trò và Trạng thái */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Vai trò</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as RoleType)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] text-slate-700"
                  >
                    <option value="Superadmin">Superadmin</option>
                    <option value="Admin">Admin</option>
                    <option value="Quản lý Kinh doanh">Quản lý Kinh doanh</option>
                    <option value="Nhân viên">Nhân viên</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Trạng thái</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as StatusType)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] text-slate-700"
                  >
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Tạm dừng">Tạm dừng</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#406c89] hover:bg-[#345a74] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. DELETE CONFIRMATION MODAL */}
      {deletingUser !== null && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-fade-in border border-slate-100">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-red-50">
              <h3 className="font-bold text-red-750 text-sm">Xóa tài khoản người dùng</h3>
              <button onClick={() => setDeletingUser(null)} className="text-red-400 hover:text-red-650 cursor-pointer">
                <IconX size={16} />
              </button>
            </div>
            
            <div className="p-5 space-y-4 text-left">
              <p className="text-xs text-slate-600 leading-relaxed">
                Bạn có chắc chắn muốn xóa tài khoản của người dùng <span className="font-bold text-slate-800">{deletingUser.fullName}</span>?
                Hành động này không thể hoàn tác và tài khoản này sẽ bị xóa hoàn toàn khỏi cơ sở dữ liệu.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setDeletingUser(null)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Đồng ý xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
