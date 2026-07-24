"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  IconX,
  IconMail,
  IconChevronDown,
  IconCheck
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

const ROLE_DESCRIPTIONS: Record<string, string> = {
  'Giám đốc': 'Truy cập toàn bộ tính năng, phê duyệt toàn bộ quy trình công việc...',
  'Phó GĐ Kinh doanh – Hành chính': 'Toàn quyền dự án, tạo Báo giá & Hợp đồng, phê duyệt cấp cao...',
  'Phó GĐ Kỹ thuật': 'Toàn quyền quản lý dự án kỹ thuật, khởi tạo & phê duyệt toàn bộ hồ sơ kỹ thuật...',
  'Quản trị viên hệ thống': 'Khởi tạo, thêm, bớt người dùng hệ thống. Quản lý phân quyền...',
  'Quản lý Kinh doanh': 'Tạo Đề xuất BG, Báo giá, Hợp đồng, Dự án. Phê duyệt đề xuất...',
  'Nhân viên Kinh doanh': 'Tạo Đề xuất BG, Báo giá, Hợp đồng, Dự án. Giao tiếp thông tin với Khối KT, tạo thông báo, tạm dừng/khôi phục dự án.',
  'Chủ nhiệm Dự án': 'Toàn quyền khởi tạo/tạm dừng dự án, phê duyệt báo cáo, chỉ định nhân sự...',
  'Quản lý Phòng Khai triển': 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng Khai triển...',
  'Quản lý Phòng Công nghệ & Thiết kế': 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng Công nghệ & Thiết kế...',
  'Quản lý Phòng Cắt': 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng Cắt...',
  'Quản lý Phòng Ghép': 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng Ghép...',
  'Quản lý Phòng Mộc Sơn': 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng Mộc Sơn...',
  'Quản lý Phòng Điện': 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng Điện...',
  'Quản lý Phòng Cảnh Quan': 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Phòng Cảnh Quan...',
  'Quản lý Khối Văn phòng (KT)': 'Phê duyệt & giám sát công việc hàng ngày của nhân viên Khối Văn phòng (kỹ thuật)...',
  'QLDA Phòng Khai triển': 'Quản lý tiến độ và báo cáo từng dự án của Phòng Khai triển...',
  'QLDA Phòng Công nghệ & Thiết kế': 'Quản lý tiến độ và báo cáo từng dự án của Phòng Công nghệ và Thiết kế...',
  'QLDA Phòng Cắt': 'Quản lý tiến độ và báo cáo từng dự án của Phòng Cắt...',
  'QLDA Phòng Ghép': 'Quản lý tiến độ và báo cáo từng dự án của Phòng Ghép...',
  'QLDA Phòng Mộc Sơn': 'Quản lý tiến độ và báo cáo từng dự án của Phòng Mộc Sơn...',
  'QLDA Phòng Điện': 'Quản lý tiến độ và báo cáo từng dự án của Phòng Điện...',
  'QLDA Phòng Cảnh Quan': 'Quản lý tiến độ và báo cáo từng dự án của Phòng Cảnh Quan...',
  'QLDA Khối Văn phòng (KT)': 'Quản lý tiến độ và báo cáo từng dự án của Khối Văn phòng (kỹ thuật)...',
  'KTV Phòng Khai triển': 'Nhân viên kỹ thuật Phòng Khai triển. Báo cáo công việc hàng ngày...',
  'KTV Phòng Công nghệ & Thiết kế': 'Nhân viên kỹ thuật Phòng Công nghệ và Thiết kế. Báo cáo công việc hàng ngày...',
  'KTV Phòng Cắt': 'Nhân viên kỹ thuật Phòng Cắt. Báo cáo công việc hàng ngày...',
  'KTV Phòng Ghép': 'Nhân viên kỹ thuật Phòng Ghép. Báo cáo công việc hàng ngày...',
  'KTV Phòng Mộc Sơn': 'Nhân viên kỹ thuật Phòng Mộc Sơn. Báo cáo công việc hàng ngày...',
  'KTV Phòng Điện': 'Nhân viên kỹ thuật Phòng Điện. Báo cáo công việc hàng ngày...',
  'KTV Phòng Cảnh Quan': 'Nhân viên kỹ thuật Phòng Cảnh Quan. Báo cáo công việc hàng ngày...',
  'KTV Khối Văn phòng (KT)': 'Nhân viên kỹ thuật Khối Văn phòng. Báo cáo công việc hàng ngày...'
};

export default function InviteUserModal({
  isOpen,
  onClose,
  onInvite,
  roleOptions
}: InviteUserModalProps) {
  const [formEmail, setFormEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState(roleOptions[0] || 'Quản trị viên hệ thống');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resetForm = () => {
    setFormEmail('');
    setSelectedRole(roleOptions[0] || 'Quản trị viên hệ thống');
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail.trim()) return;

    const emailVal = formEmail.trim();
    const prefix = emailVal.split('@')[0] || 'user';
    const username = prefix.toLowerCase();
    const fullName = prefix.charAt(0).toUpperCase() + prefix.slice(1);

    onInvite({
      fullName,
      username,
      email: emailVal,
      roles: [selectedRole],
      status: 'Hoạt động',
    });

    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm border border-slate-100/50 p-6 flex flex-col gap-5 text-left relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-1 shrink-0">
          <div className="flex items-center gap-2.5 text-[#406c89]">
            <IconMail size={18} className="stroke-[2.2]" />
            <h3 className="font-bold text-slate-800 text-sm tracking-tight">Mời người dùng mới</h3>
          </div>
          <button 
            onClick={() => {
              resetForm();
              onClose();
            }} 
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-0.5 rounded-full hover:bg-slate-50"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-700 tracking-wide">
              Email *
            </label>
            <input
              type="email"
              required
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              placeholder="email@congty.com"
              className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] transition-all text-slate-750 placeholder-slate-400 shadow-3xs"
            />
          </div>

          {/* Role Dropdown (Always opens BELOW) */}
          <div className="flex flex-col gap-1.5" ref={dropdownRef}>
            <label className="text-[10px] font-bold text-slate-700 tracking-wide">
              Vai trò
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full text-xs font-semibold pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-750 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] cursor-pointer transition-all shadow-3xs text-left flex items-center justify-between"
              >
                <span className="truncate">{selectedRole}</span>
              </button>

              {/* Dot Icon indicator */}
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full bg-[#406c89]/10 border border-[#406c89]/20 pointer-events-none select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#406c89]"></span>
              </div>

              {/* Chevron Down indicator */}
              <div className={`absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none select-none text-slate-450 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#406c89]' : ''}`}>
                <IconChevronDown size={14} className="stroke-[2.2]" />
              </div>

              {/* Dropdown Menu (Always displays BELOW) */}
              {isDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-slate-200/80 rounded-xl shadow-xl max-h-52 overflow-y-auto p-1 flex flex-col gap-0.5 animate-fade-in">
                  {roleOptions.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setSelectedRole(role);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between font-medium cursor-pointer ${
                        selectedRole === role
                          ? 'bg-[#406c89]/10 text-[#406c89] font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{role}</span>
                      {selectedRole === role && (
                        <IconCheck size={14} className="text-[#406c89] shrink-0 ml-2" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Role Description Box */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-3 text-[11px] leading-relaxed text-slate-500 shadow-3xs select-none">
            <span className="font-bold text-slate-800">{selectedRole}: </span>
            <span>{ROLE_DESCRIPTIONS[selectedRole] || 'Quyền hạn đang được cập nhật...'}</span>
          </div>

          {/* Lightbulb Tips Card */}
          <div className="bg-[#406c89]/5 border border-[#406c89]/15 rounded-lg p-3 flex items-start gap-2 select-none">
            <span className="text-[11px] leading-none pt-0.5">💡</span>
            <p className="text-[10px] font-bold text-[#406c89] leading-relaxed text-left">
              Người dùng sẽ nhận email mời và tự đặt mật khẩu khi đăng ký tài khoản.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3.5 border-t border-slate-100/60 shrink-0">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50/60 text-slate-600 text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-3xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#406c89] hover:bg-[#345870] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-md active:scale-98"
            >
              Gửi lời mời
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
