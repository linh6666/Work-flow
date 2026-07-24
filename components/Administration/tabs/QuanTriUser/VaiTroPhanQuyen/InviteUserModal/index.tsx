"use client";

import React, { useState } from 'react';
import {
  IconX,
  IconUser,
  IconLock,
  IconMail,
  IconKey
} from '@tabler/icons-react';
import { StatusType } from '../../types';

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (user: {
    fullName: string;
    username: string;
    email: string;
    roles: string[];
    status: StatusType;
  }) => void;
  roleOptions: string[];
}

export default function InviteUserModal({
  isOpen,
  onClose,
  onInvite,
  roleOptions
}: InviteUserModalProps) {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formRoles, setFormRoles] = useState<string[]>([]);
  const [formStatus, setFormStatus] = useState<StatusType>('Hoạt động');
  const [formPassword, setFormPassword] = useState('');

  const resetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormUsername('');
    setFormRoles([]);
    setFormStatus('Hoạt động');
    setFormPassword('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formUsername.trim()) return;

    onInvite({
      fullName: formName.trim(),
      username: formUsername.trim(),
      email: formEmail.trim(),
      roles: formRoles.length > 0 ? formRoles : ['Quản trị viên hệ thống'],
      status: formStatus,
    });

    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in border border-slate-100">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-sm">Mời người dùng hệ thống</h3>
          <button 
            onClick={() => {
              resetForm();
              onClose();
            }} 
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <IconX size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-left">
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
          <div className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Vai trò hệ thống</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-slate-200 rounded-lg p-3 bg-slate-50 max-h-36 overflow-y-auto">
                {roleOptions.map(role => (
                  <label key={role} className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formRoles.includes(role)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormRoles(prev => [...prev, role]);
                        } else {
                          setFormRoles(prev => prev.filter(r => r !== role));
                        }
                      }}
                      className="rounded text-[#406c89] focus:ring-[#406c89] w-3.5 h-3.5 border-slate-300"
                    />
                    <span className="truncate">{role}</span>
                  </label>
                ))}
              </div>
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
              onClick={() => {
                resetForm();
                onClose();
              }}
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
  );
}
