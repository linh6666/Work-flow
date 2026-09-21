"use client";

import React, { useState, useMemo } from 'react';
import {
  IconShieldCheck,
  IconPlus,
  IconRotateClockwise,
  IconDeviceFloppy,
  IconCheck,
  IconX,
  IconSearch
} from '@tabler/icons-react';
import TaoVaiTroModal from './TaoVaiTroModal';

// 33 Roles as shown in reference images
const DEFAULT_ROLES: string[] = [
  'Giám đốc',
  'Phó GĐ Kinh doanh – Hành chính',
  'Phó GĐ Kỹ thuật',
  'Quản trị viên hệ thống',
  'Quản lý Kinh doanh',
  'Nhân viên Kinh doanh',
  'Chủ nhiệm Dự án',
  'Quản lý Phòng Khai triển',
  'Quản lý Phòng Công nghệ & Thiết kế',
  'Quản lý Phòng Cắt',
  'Quản lý Phòng Ghép',
  'Quản lý Phòng Mộc Sơn',
  'Quản lý Phòng Điện',
  'Quản lý Phòng Cảnh Quan',
  'Quản lý Khối Văn phòng (KT)',
  'QLDA Phòng Khai triển',
  'QLDA Phòng Công nghệ & Thiết kế',
  'QLDA Phòng Cắt',
  'QLDA Phòng Ghép',
  'QLDA Phòng Mộc Sơn',
  'QLDA Phòng Điện',
  'QLDA Phòng Cảnh Quan',
  'QLDA Khối Văn phòng (KT)',
  'KTV Phòng Khai triển',
  'KTV Phòng Công nghệ & Thiết kế',
  'KTV Phòng Cắt',
  'KTV Phòng Ghép',
  'KTV Phòng Mộc Sơn',
  'KTV Phòng Điện',
  'KTV Phòng Cảnh Quan',
  'Nhân viên KVP',
  'Nhân viên Kho',
  'Nhân viên Hành chính'
];

// Helper to get badge style matching reference screenshots
function getRoleBadgeStyle(role: string): string {
  if (role === 'Giám đốc' || role.includes('Phó GĐ Kinh doanh')) {
    return 'bg-[#ffe4e6] text-[#be123c] border-[#fecdd3]';
  }
  if (role.includes('Phó GĐ Kỹ thuật')) {
    return 'bg-[#ffedd5] text-[#c2410c] border-[#fed7aa]';
  }
  if (role.includes('Quản trị viên')) {
    return 'bg-[#f1f5f9] text-[#334155] border-[#cbd5e1]';
  }
  if (role === 'Quản lý Kinh doanh') {
    return 'bg-[#f3e8ff] text-[#7e22ce] border-[#e9d5ff]';
  }
  if (role === 'Nhân viên Kinh doanh') {
    return 'bg-[#e0e7ff] text-[#4338ca] border-[#c7d2fe]';
  }
  if (role.includes('Chủ nhiệm')) {
    return 'bg-[#fef3c7] text-[#b45309] border-[#fde68a]';
  }
  if (role.startsWith('Quản lý Phòng') || role.startsWith('Quản lý Khối')) {
    return 'bg-[#ccfbf1] text-[#0f766e] border-[#99f6e4]';
  }
  if (role.startsWith('QLDA')) {
    return 'bg-[#dcfce7] text-[#15803d] border-[#bbf7d0]';
  }
  if (role.startsWith('KTV') || role === 'Nhân viên KVP') {
    return 'bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]';
  }
  if (role === 'Nhân viên Kho') {
    return 'bg-[#ecfccb] text-[#4d7c0f] border-[#d9f99d]';
  }
  if (role === 'Nhân viên Hành chính') {
    return 'bg-[#ede9fe] text-[#6d28d9] border-[#ddd6fe]';
  }
  return 'bg-slate-100 text-slate-700 border-slate-200';
}

// 9 Groups and 29 Actions matching the exact images
interface ActionDef {
  id: string;
  name: string;
}

interface GroupDef {
  name: string;
  actions: ActionDef[];
}

const PERMISSION_GROUPS: GroupDef[] = [
  {
    name: 'KHÁCH HÀNG (CRM)',
    actions: [
      { id: 'crm-view', name: 'Xem' },
      { id: 'crm-create-edit', name: 'Thêm / Sửa' },
      { id: 'crm-delete', name: 'Xoá' }
    ]
  },
  {
    name: 'ĐỀ XUẤT BÁO GIÁ',
    actions: [
      { id: 'prop-view', name: 'Xem' },
      { id: 'prop-create-edit', name: 'Thêm / Sửa' },
      { id: 'prop-delete', name: 'Xoá' }
    ]
  },
  {
    name: 'BÁO GIÁ',
    actions: [
      { id: 'quote-view', name: 'Xem' },
      { id: 'quote-create-edit', name: 'Thêm / Sửa' },
      { id: 'quote-delete', name: 'Xoá' }
    ]
  },
  {
    name: 'HỢP ĐỒNG',
    actions: [
      { id: 'contract-view', name: 'Xem' },
      { id: 'contract-create-edit', name: 'Thêm / Sửa' },
      { id: 'contract-delete', name: 'Xoá' }
    ]
  },
  {
    name: 'DỰ ÁN',
    actions: [
      { id: 'project-view', name: 'Xem' },
      { id: 'project-create', name: 'Tạo dự án' },
      { id: 'project-edit', name: 'Sửa' },
      { id: 'project-delete', name: 'Xoá' }
    ]
  },
  {
    name: 'NHÂN SỰ',
    actions: [
      { id: 'hr-view', name: 'Xem' },
      { id: 'hr-create-edit', name: 'Thêm / Sửa' },
      { id: 'hr-delete', name: 'Xoá' },
      { id: 'hr-salary-cost', name: 'Xem chi phí / lương' }
    ]
  },
  {
    name: 'YÊU CẦU SẢN XUẤT',
    actions: [
      { id: 'prod-view', name: 'Xem' },
      { id: 'prod-create-edit', name: 'Thêm / Sửa' },
      { id: 'prod-delete', name: 'Xoá' },
      { id: 'prod-approve', name: 'Phê duyệt' }
    ]
  },
  {
    name: 'QUẢN TRỊ USER',
    actions: [
      { id: 'user-view', name: 'Xem' },
      { id: 'user-edit-perm', name: 'Sửa quyền' },
      { id: 'user-delete', name: 'Xoá user' }
    ]
  },
  {
    name: 'BÁO CÁO TỔNG THỂ',
    actions: [
      { id: 'report-view', name: 'Xem' },
      { id: 'report-generate', name: 'Phát sinh báo cáo' }
    ]
  }
];

const ALL_ACTION_IDS = PERMISSION_GROUPS.flatMap((g) => g.actions.map((a) => a.id));

const BASE_TECHNICAL_ROLES = [
  'Quản lý Phòng Khai triển',
  'Quản lý Phòng Công nghệ & Thiết kế',
  'Quản lý Phòng Cắt',
  'Quản lý Phòng Ghép',
  'Quản lý Phòng Mộc Sơn',
  'Quản lý Phòng Điện',
  'Quản lý Phòng Cảnh Quan',
  'QLDA Phòng Khai triển',
  'QLDA Phòng Công nghệ & Thiết kế',
  'QLDA Phòng Cắt',
  'QLDA Phòng Ghép',
  'QLDA Phòng Mộc Sơn',
  'QLDA Phòng Điện',
  'QLDA Phòng Cảnh Quan'
];

const KTV_ROLES = [
  'KTV Phòng Khai triển',
  'KTV Phòng Công nghệ & Thiết kế',
  'KTV Phòng Cắt',
  'KTV Phòng Ghép',
  'KTV Phòng Mộc Sơn',
  'KTV Phòng Điện',
  'KTV Phòng Cảnh Quan',
  'Nhân viên KVP'
];

// Initial permissions mapping matching the exact checkmarks from images
const INITIAL_ROLE_PERMS: Record<string, string[]> = {
  'Giám đốc': [
    'crm-view', 'crm-create-edit', 'crm-delete',
    'prop-view', 'prop-create-edit', 'prop-delete',
    'quote-view', 'quote-create-edit', 'quote-delete',
    'contract-view', 'contract-create-edit', 'contract-delete',
    'project-view', 'project-create', 'project-delete',
    'hr-view', 'hr-create-edit', 'hr-delete', 'hr-salary-cost',
    'prod-view', 'prod-create-edit', 'prod-delete', 'prod-approve',
    'user-view',
    'report-view', 'report-generate'
  ], // 26/29
  'Phó GĐ Kinh doanh – Hành chính': [
    'crm-view', 'crm-create-edit', 'crm-delete',
    'prop-view', 'prop-create-edit', 'prop-delete',
    'quote-view', 'quote-create-edit', 'quote-delete',
    'contract-view', 'contract-create-edit',
    'project-view', 'project-create', 'project-edit', 'project-delete',
    'hr-view', 'hr-create-edit', 'hr-delete', 'hr-salary-cost',
    'prod-view', 'prod-create-edit', 'prod-delete', 'prod-approve',
    'report-view', 'report-generate'
  ], // 25/29
  'Phó GĐ Kỹ thuật': [
    'project-view', 'hr-view', 'prod-view', 'report-view'
  ], // 4/29
  'Quản trị viên hệ thống': ALL_ACTION_IDS, // 29/29
  'Quản lý Kinh doanh': [
    'crm-view', 'crm-create-edit', 'crm-delete',
    'prop-view', 'prop-create-edit', 'prop-delete',
    'quote-view', 'quote-create-edit', 'quote-delete',
    'contract-view', 'contract-create-edit',
    'project-view', 'project-create', 'project-edit', 'project-delete',
    'hr-view', 'hr-create-edit', 'hr-delete', 'hr-salary-cost',
    'prod-view', 'prod-create-edit', 'prod-delete', 'prod-approve',
    'report-view'
  ], // 24/29
  'Nhân viên Kinh doanh': [
    'crm-view', 'crm-create-edit',
    'prop-view', 'prop-create-edit',
    'quote-view', 'quote-create-edit',
    'contract-view',
    'project-view', 'project-create', 'project-edit',
    'hr-view', 'hr-create-edit',
    'prod-view', 'prod-create-edit',
    'report-view'
  ], // 15/29
  'Chủ nhiệm Dự án': [
    'project-view', 'project-create', 'project-edit', 'project-delete',
    'hr-view', 'hr-create-edit', 'hr-delete', 'hr-salary-cost',
    'prod-view',
    'report-view'
  ], // 10/29
  'Quản lý Khối Văn phòng (KT)': [
    'project-view',
    'hr-view', 'hr-create-edit', 'hr-delete', 'hr-salary-cost',
    'prod-view',
    'report-view'
  ], // 7/29
  'QLDA Khối Văn phòng (KT)': [
    'project-view', 'hr-view', 'hr-create-edit', 'prod-view', 'report-view'
  ], // 5/29
  'Nhân viên Kho': [
    'project-view', 'hr-view', 'prod-view'
  ], // 3/29
  'Nhân viên Hành chính': [] // 0/29
};

// Base Technical Roles (4/29 each)
BASE_TECHNICAL_ROLES.forEach((role) => {
  INITIAL_ROLE_PERMS[role] = ['project-view', 'hr-view', 'prod-view', 'report-view'];
});

// KTV Roles (2/29 each)
KTV_ROLES.forEach((role) => {
  INITIAL_ROLE_PERMS[role] = ['project-view', 'hr-view'];
});

// Flattened baseline map: Record<actionId, Record<roleName, boolean>>
function buildBaselineMatrix(): Record<string, Record<string, boolean>> {
  const matrix: Record<string, Record<string, boolean>> = {};
  ALL_ACTION_IDS.forEach((actId) => {
    matrix[actId] = {};
    DEFAULT_ROLES.forEach((role) => {
      const allowed = INITIAL_ROLE_PERMS[role] || [];
      matrix[actId][role] = allowed.includes(actId);
    });
  });
  return matrix;
}

export default function MaTranPhanQuyen() {
  // Roles list
  const [roles, setRoles] = useState<string[]>(DEFAULT_ROLES);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Saved baseline permissions: actionId -> (role -> boolean)
  const [savedMatrix, setSavedMatrix] = useState<Record<string, Record<string, boolean>>>(() =>
    buildBaselineMatrix()
  );

  // Current working permissions
  const [matrix, setMatrix] = useState<Record<string, Record<string, boolean>>>(() =>
    buildBaselineMatrix()
  );

  // Modal: Add Role
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Calculate changed cells
  const changedMap = useMemo(() => {
    const map = new Map<string, boolean>(); // key: `${actId}-${role}`
    ALL_ACTION_IDS.forEach((actId) => {
      roles.forEach((role) => {
        const currentVal = !!matrix[actId]?.[role];
        const savedVal = !!savedMatrix[actId]?.[role];
        if (currentVal !== savedVal) {
          map.set(`${actId}-${role}`, true);
        }
      });
    });
    return map;
  }, [matrix, savedMatrix, roles]);

  const unsavedCount = changedMap.size;

  // Calculate active permissions count per role dynamically
  const roleCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    roles.forEach((r) => {
      let c = 0;
      ALL_ACTION_IDS.forEach((actId) => {
        if (matrix[actId]?.[r]) c++;
      });
      counts[r] = c;
    });
    return counts;
  }, [matrix, roles]);

  // Filtered groups & actions
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return PERMISSION_GROUPS;
    const q = searchQuery.toLowerCase();
    return PERMISSION_GROUPS.map((g) => {
      const matchGroupName = g.name.toLowerCase().includes(q);
      if (matchGroupName) return g;
      const matchedActions = g.actions.filter((a) => a.name.toLowerCase().includes(q));
      return {
        ...g,
        actions: matchedActions
      };
    }).filter((g) => g.actions.length > 0);
  }, [searchQuery]);

  // Drag-to-scroll (giữ chuột kéo trượt ngang)
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = React.useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    const container = scrollRef.current;
    if (!container) return;

    dragRef.current.isDown = true;
    dragRef.current.startX = e.pageX - container.offsetLeft;
    dragRef.current.scrollLeft = container.scrollLeft;
    dragRef.current.hasMoved = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.isDown) return;
    const container = scrollRef.current;
    if (!container) return;

    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragRef.current.startX) * 1.6; // Multiplier for smooth scroll
    if (Math.abs(x - dragRef.current.startX) > 4) {
      if (!isDragging) setIsDragging(true);
      dragRef.current.hasMoved = true;
    }
    container.scrollLeft = dragRef.current.scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (!dragRef.current.isDown) return;
    dragRef.current.isDown = false;
    setTimeout(() => {
      setIsDragging(false);
      dragRef.current.hasMoved = false;
    }, 60);
  };

  const handleMouseLeave = () => {
    if (dragRef.current.isDown) {
      dragRef.current.isDown = false;
      setTimeout(() => {
        setIsDragging(false);
        dragRef.current.hasMoved = false;
      }, 60);
    }
  };

  // Toggle permission of a cell
  const handleToggle = (actId: string, role: string) => {
    // If the mouse was dragged to scroll, ignore toggle click
    if (dragRef.current.hasMoved || isDragging) return;

    setMatrix((prev) => ({
      ...prev,
      [actId]: {
        ...(prev[actId] || {}),
        [role]: !prev[actId]?.[role]
      }
    }));
  };

  // Undo changes
  const handleUndo = () => {
    if (unsavedCount === 0) return;
    setMatrix(JSON.parse(JSON.stringify(savedMatrix)));
    showToast('Đã hoàn tác tất cả các thay đổi chưa lưu.');
  };

  // Save changes
  const handleSave = () => {
    setSavedMatrix(JSON.parse(JSON.stringify(matrix)));
    showToast('Đã lưu thành công cấu hình phân quyền!');
  };

  // Handle Add Role (called from TaoVaiTroModal)
  const handleAddRoleSubmit = ({
    roleName,
    cloneFromRole,
    selectedPermissions
  }: {
    roleName: string;
    roleDesc?: string;
    roleCode?: string;
    roleGroup?: string;
    cloneFromRole?: string;
    selectedPermissions?: string[];
  }) => {
    setRoles((prev) => [...prev, roleName]);
    setMatrix((prev) => {
      const next = { ...prev };
      ALL_ACTION_IDS.forEach((actId) => {
        const isGranted = selectedPermissions && selectedPermissions.length > 0
          ? selectedPermissions.includes(actId)
          : cloneFromRole
          ? !!prev[actId]?.[cloneFromRole]
          : false;
        next[actId] = {
          ...(next[actId] || {}),
          [roleName]: isGranted
        };
      });
      return next;
    });
    setSavedMatrix((prev) => {
      const next = { ...prev };
      ALL_ACTION_IDS.forEach((actId) => {
        const isGranted = selectedPermissions && selectedPermissions.length > 0
          ? selectedPermissions.includes(actId)
          : cloneFromRole
          ? !!prev[actId]?.[cloneFromRole]
          : false;
        next[actId] = {
          ...(next[actId] || {}),
          [roleName]: isGranted
        };
      });
      return next;
    });
    setIsAddRoleOpen(false);
    showToast(`Đã thêm vai trò "${roleName}" thành công!`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fafbfc] overflow-hidden select-none relative h-full">
      {/* TOAST ALERT */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-medium animate-in fade-in slide-in-from-top-3 duration-200">
          <IconCheck size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HEADER */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3 shrink-0 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
          {/* Left: Icon, Title & Subtitle */}
          <div className="flex items-start gap-2.5">
            <IconShieldCheck className="w-5 h-5 shrink-0 mt-0.5" style={{color:'#406c89'}} stroke={2} />
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-snug">
                Ma trận phân quyền
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Cấu hình quyền tác nghiệp theo vai trò. Bấm vào ô để bật/tắt; thay đổi chỉ áp dụng sau khi Lưu.
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">

            {/* Tạo vai trò */}
            <button
              onClick={() => setIsAddRoleOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <IconPlus size={15} className="text-slate-600" />
              <span>Tạo vai trò</span>
            </button>

            {/* Hoàn tác */}
            <button
              onClick={handleUndo}
              disabled={unsavedCount === 0}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-xs font-medium rounded-lg shadow-2xs transition-colors ${
                unsavedCount > 0
                  ? 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 cursor-pointer'
                  : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <IconRotateClockwise
                size={15}
                className={unsavedCount > 0 ? 'text-slate-600' : 'text-slate-400'}
              />
              <span>Hoàn tác</span>
            </button>

            {/* Lưu (count) */}
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#406c89] hover:bg-[#335870] text-white text-xs font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <IconDeviceFloppy size={15} className="text-white" />
              <span>Lưu {unsavedCount > 0 ? `(${unsavedCount})` : ''}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SCROLLABLE MATRIX TABLE */}
      <div className="flex-1 overflow-hidden px-4 sm:px-8 py-4 flex flex-col min-h-0">
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-hidden flex flex-col flex-1 min-h-0">
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            className={`overflow-x-auto overflow-y-auto flex-1 min-h-0 no-scrollbar select-none cursor-grab ${
              isDragging ? 'cursor-grabbing' : ''
            }`}
          >
            <table className="w-full text-left border-collapse text-xs select-none">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200/90 select-none">
                  {/* Left Header Column: Empty placeholder or title */}
                  <th className="p-3 sticky top-0 left-0 z-30 bg-slate-50 border-b border-r border-slate-200 min-w-[200px] text-xs font-bold text-slate-700 tracking-wide align-bottom shadow-[2px_0_4px_-1px_rgba(0,0,0,0.05)] whitespace-nowrap">
                    <span className="text-[12px] font-bold text-slate-800">Phân hệ / Quyền</span>
                  </th>

                  {/* 33 Role Header Columns with Badges & Ratios (e.g. 26/29) */}
                  {roles.map((role) => {
                    const activeCount = roleCounts[role] ?? 0;
                    const totalCount = ALL_ACTION_IDS.length;

                    return (
                      <th
                        key={role}
                        className="px-2 py-2.5 sticky top-0 bg-slate-50 z-10 text-center border-b border-slate-200 whitespace-nowrap align-top"
                      >
                        <div className="flex flex-col items-center justify-start gap-1">
                          {/* Colored Pill Badge (1 line) */}
                          <div
                            className={`inline-flex items-center justify-center text-center px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap select-none shadow-2xs transition-transform hover:scale-105 ${getRoleBadgeStyle(
                              role
                            )}`}
                            title={role}
                          >
                            <span>{role}</span>
                          </div>

                          {/* Permission ratio (e.g. 26/29) */}
                          <span className="text-[11px] font-medium text-slate-500 tracking-tight whitespace-nowrap">
                            {activeCount}/{totalCount}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredGroups.map((group) => (
                  <React.Fragment key={group.name}>
                    {/* SECTION HEADER ROW (e.g. KHÁCH HÀNG (CRM), BÁO GIÁ...) */}
                    <tr className="bg-[#f8fafc] border-y border-slate-200/90 select-none">
                      <td className="px-3.5 py-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wide sticky left-0 z-20 bg-[#f8fafc] border-r border-slate-200/80 shadow-[2px_0_4px_-1px_rgba(0,0,0,0.05)] whitespace-nowrap">
                        {group.name}
                      </td>
                      <td colSpan={roles.length} className="bg-[#f8fafc] px-3 py-1.5" />
                    </tr>

                    {/* ACTION ROWS (Xem, Thêm / Sửa, Xoá, ...) */}
                    {group.actions.map((action) => (
                      <tr key={action.id} className="hover:bg-slate-50/70 transition-colors group">
                        {/* Fixed Left Column: Action Name */}
                        <td className="px-4 py-2 sticky left-0 bg-white group-hover:bg-slate-50/90 z-20 border-r border-slate-200/80 transition-colors shadow-[2px_0_4px_-1px_rgba(0,0,0,0.05)] whitespace-nowrap">
                          <span className="text-[12px] font-medium text-slate-700">
                            {action.name}
                          </span>
                        </td>

                        {/* Checkbox cells */}
                        {roles.map((role) => {
                          const hasPerm = !!matrix[action.id]?.[role];
                          const isChanged = changedMap.has(`${action.id}-${role}`);

                          return (
                            <td
                              key={role}
                              onClick={() => handleToggle(action.id, role)}
                              className={`p-1.5 text-center cursor-pointer transition-colors relative hover:bg-[#406c89]/10 ${
                                isChanged ? 'bg-amber-50/40' : ''
                              }`}
                              title={`Nhấn để ${hasPerm ? 'hủy quyền' : 'cấp quyền'} "${action.name}" (${group.name}) cho "${role}"`}
                            >
                              <div className="flex items-center justify-center">
                                {hasPerm ? (
                                  <div
                                    className={`w-[18px] h-[18px] rounded-[4px] bg-[#406c89] flex items-center justify-center text-white shadow-2xs transition-all hover:scale-110 ${
                                      isChanged ? 'ring-2 ring-amber-400 ring-offset-1' : ''
                                    }`}
                                  >
                                    <IconCheck size={13} strokeWidth={3} />
                                  </div>
                                ) : (
                                  <div
                                    className={`w-[18px] h-[18px] rounded-[4px] border bg-white transition-colors hover:border-slate-400 ${
                                      isChanged
                                        ? 'border-amber-400 ring-2 ring-amber-300'
                                        : 'border-slate-200/90'
                                    }`}
                                  />
                                )}
                              </div>

                              {/* Unsaved indicator dot */}
                              {isChanged && (
                                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-500 ring-1 ring-white" />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table footer info */}
          <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>
              Tổng số: 9 phân hệ • 29 quyền tác nghiệp • {roles.length} vai trò
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-[3px] bg-[#406c89] flex items-center justify-center text-white text-[9px]">
                  <IconCheck size={10} strokeWidth={3} />
                </span>
                <span>Có quyền</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-[3px] border border-slate-300 bg-white inline-block"></span>
                <span>Không có quyền</span>
              </span>
              {unsavedCount > 0 && (
                <span className="flex items-center gap-1 text-amber-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                  <span>{unsavedCount} ô đã sửa chưa lưu</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. MODAL: TẠO VAI TRÒ */}
      <TaoVaiTroModal
        isOpen={isAddRoleOpen}
        roles={roles}
        onClose={() => setIsAddRoleOpen(false)}
        onSubmit={handleAddRoleSubmit}
      />
    </div>
  );
}
