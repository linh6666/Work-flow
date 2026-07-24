"use client";

import React, { useState } from 'react';
import {
  IconKey,
  IconCheck,
  IconMinus,
  IconShield,
  IconLock,
  IconSearch
} from '@tabler/icons-react';

interface ModulePermission {
  module: string;
  category: string;
  permissions: Record<string, boolean>; // roleName -> hasPermission
}

const ROLES = [
  'Giám đốc',
  'Phó GĐ Kỹ thuật',
  'Quản trị viên',
  'Quản lý KD',
  'Chủ nhiệm DA',
  'QLDA Phòng',
  'Kỹ thuật viên'
];

const MODULE_PERMISSIONS: ModulePermission[] = [
  {
    module: 'Quản trị hệ thống & User',
    category: 'HỆ THỐNG',
    permissions: { 'Giám đốc': true, 'Phó GĐ Kỹ thuật': false, 'Quản trị viên': true, 'Quản lý KD': false, 'Chủ nhiệm DA': false, 'QLDA Phòng': false, 'KTV': false }
  },
  {
    module: 'Quản lý Khách hàng & Đối tác',
    category: 'KINH DOANH',
    permissions: { 'Giám đốc': true, 'Phó GĐ Kỹ thuật': true, 'Quản trị viên': true, 'Quản lý KD': true, 'Chủ nhiệm DA': true, 'QLDA Phòng': false, 'KTV': false }
  },
  {
    module: 'Khởi tạo Đề xuất Báo giá',
    category: 'KINH DOANH',
    permissions: { 'Giám đốc': true, 'Phó GĐ Kỹ thuật': true, 'Quản trị viên': true, 'Quản lý KD': true, 'Chủ nhiệm DA': true, 'QLDA Phòng': false, 'KTV': false }
  },
  {
    module: 'Phê duyệt Báo giá & Dự toán',
    category: 'KINH DOANH',
    permissions: { 'Giám đốc': true, 'Phó GĐ Kỹ thuật': true, 'Quản trị viên': false, 'Quản lý KD': true, 'Chủ nhiệm DA': false, 'QLDA Phòng': false, 'KTV': false }
  },
  {
    module: 'Tạo & Phê duyệt Hợp đồng',
    category: 'HỢP ĐỒNG',
    permissions: { 'Giám đốc': true, 'Phó GĐ Kỹ thuật': false, 'Quản trị viên': false, 'Quản lý KD': true, 'Chủ nhiệm DA': false, 'QLDA Phòng': false, 'KTV': false }
  },
  {
    module: 'Khởi tạo Lệnh Yêu cầu Sản xuất',
    category: 'SẢN XUẤT',
    permissions: { 'Giám đốc': true, 'Phó GĐ Kỹ thuật': true, 'Quản trị viên': false, 'Quản lý KD': false, 'Chủ nhiệm DA': true, 'QLDA Phòng': true, 'KTV': false }
  },
  {
    module: 'Phê duyệt Tiến độ & Hồ sơ Kỹ thuật',
    category: 'KỸ THUẬT',
    permissions: { 'Giám đốc': true, 'Phó GĐ Kỹ thuật': true, 'Quản trị viên': false, 'Quản lý KD': false, 'Chủ nhiệm DA': true, 'QLDA Phòng': true, 'KTV': false }
  },
  {
    module: 'Cập nhật Báo cáo công việc hàng ngày',
    category: 'KỸ THUẬT',
    permissions: { 'Giám đốc': true, 'Phó GĐ Kỹ thuật': true, 'Quản trị viên': true, 'Quản lý KD': true, 'Chủ nhiệm DA': true, 'QLDA Phòng': true, 'KTV': true }
  },
];

export default function MaTranPhanQuyen() {
  const [search, setSearch] = useState('');

  const filteredPermissions = MODULE_PERMISSIONS.filter(m =>
    m.module.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-[#fafbfc] overflow-hidden select-none">
      
      {/* 1. STICKY HEADER */}
      <div className="sticky top-0 z-10 bg-[#fafbfc] px-4 sm:px-8 pt-6 pb-4 border-b border-slate-100 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div>
            <div className="flex items-center gap-2 text-[#406c89]">
              <IconKey size={20} className="text-[#406c89] stroke-[2.25]" />
              <span className="text-lg font-bold text-slate-900 tracking-tight">Ma trận phân quyền</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Bảng ma trận chi tiết quyền hạn theo vai trò và chức năng hệ thống
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm chức năng..."
              className="w-full text-xs bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] text-slate-700 shadow-3xs"
            />
            <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      {/* 2. SCROLLABLE MATRIX TABLE */}
      <div className="flex-1 overflow-hidden px-4 sm:px-8 py-5 flex flex-col min-h-0">
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-2xs overflow-hidden flex flex-col flex-1 min-h-0">
          <div className="overflow-x-auto overflow-y-auto flex-1 min-h-0 custom-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/60 text-slate-500 font-bold uppercase tracking-wide select-none">
                  <th className="p-3.5 sticky top-0 left-0 z-20 bg-slate-50 border-b border-slate-200/60 min-w-[220px]">
                    Chức năng / Phân hệ
                  </th>
                  {ROLES.map((role) => (
                    <th key={role} className="p-3.5 sticky top-0 bg-slate-50 z-10 text-center border-b border-slate-200/60 whitespace-nowrap min-w-[110px]">
                      {role}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredPermissions.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                    <td className="p-3.5 sticky left-0 bg-white z-10 border-r border-slate-100">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800">{item.module}</span>
                        <span className="text-[10px] font-bold text-[#406c89] mt-0.5">{item.category}</span>
                      </div>
                    </td>
                    {ROLES.map((role) => {
                      const hasPerm = item.permissions[role];
                      return (
                        <td key={role} className="p-3.5 text-center">
                          {hasPerm ? (
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                              <IconCheck size={13} strokeWidth={2.5} />
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 text-slate-300">
                              <IconMinus size={13} strokeWidth={2} />
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
