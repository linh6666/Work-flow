"use client";

import React, { useState } from 'react';
import {
  IconShield,
  IconPlus,
  IconX
} from '@tabler/icons-react';
import { UserItem, StatusType } from './types';
import DanhSachTaiKhoan from './DanhSachTaiKhoan';
import VaiTroPhanQuyen from './VaiTroPhanQuyen';
import InviteUserModal from './VaiTroPhanQuyen/InviteUserModal';
import EditUserModal from './VaiTroPhanQuyen/EditUserModal';
import { DEFAULT_USERS, ROLE_OPTIONS } from './DanhSachTaiKhoan/constants';

export default function QuanTriUser() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [users, setUsers] = useState<UserItem[]>(DEFAULT_USERS);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'fullName' | 'email' | 'role' | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Modal control states
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserItem | null>(null);

  // Handle invite submission
  const handleInviteSubmit = (newUserFields: {
    fullName: string;
    username: string;
    email: string;
    roles: string[];
    status: StatusType;
  }) => {
    const newUser: UserItem = {
      id: `usr-${Date.now()}`,
      ...newUserFields,
      createdDate: new Date().toISOString().split('T')[0],
    };

    setUsers(prev => [newUser, ...prev]);
    setIsInviteOpen(false);
  };

  // Handle edit submission
  const handleEditSave = (updatedUser: {
    id: string;
    fullName: string;
    username: string;
    email: string;
    roles: string[];
    status: StatusType;
  }) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === updatedUser.id
          ? {
              ...u,
              ...updatedUser,
            }
          : u
      )
    );
    setEditingUser(null);
  };

  // Open edit modal
  const handleOpenEdit = (user: UserItem) => {
    setEditingUser(user);
  };

  // Confirm delete
  const handleDeleteConfirm = () => {
    if (deletingUser) {
      setUsers(prev => prev.filter(u => u.id !== deletingUser.id));
      setDeletingUser(null);
    }
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
    if (sortKey === 'role') {
      const valA = (a.roles[0] || '').toLowerCase();
      const valB = (b.roles[0] || '').toLowerCase();
      return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    const valA = a[sortKey].toLowerCase();
    const valB = b[sortKey].toLowerCase();
    return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  const handleSort = (key: 'fullName' | 'email' | 'role') => {
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
            onClick={() => setIsInviteOpen(true)}
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
      <div className="flex-1 overflow-hidden px-4 sm:px-8 py-5 flex flex-col gap-4 min-h-0">
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
          <VaiTroPhanQuyen users={users} />
        )}
      </div>

      {/* 4. INVITE USER MODAL */}
      <InviteUserModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onInvite={handleInviteSubmit}
        roleOptions={ROLE_OPTIONS}
      />

      {/* 5. EDIT USER MODAL */}
      <EditUserModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleEditSave}
        roleOptions={ROLE_OPTIONS}
      />

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
