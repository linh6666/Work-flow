"use client";

import React, { useState } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

const textareaClass =
  'w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 resize-none';
const labelClass = 'mb-1.5 block text-xs font-medium text-slate-600';

interface DieuKhoanTabProps {
  dieuKhoanThanhToan: string;
  setDieuKhoanThanhToan: (v: string) => void;
}

interface Section {
  key: string;
  title: string;
  placeholder: string;
  rows: number;
  defaultValue?: string;
}

const SECTIONS: Section[] = [
  {
    key: 'thoiGianThucHien',
    title: 'Thời gian thực hiện',
    placeholder: 'Ví dụ: Thời gian thi công 90 ngày kể từ ngày ký hợp đồng...',
    rows: 3,
  },
  {
    key: 'dieuKhoanThanhToan',
    title: 'Điều khoản thanh toán',
    placeholder: 'Mô tả điều khoản và lịch thanh toán...',
    rows: 3,
  },
  {
    key: 'dieuKhoanBanGiao',
    title: 'Điều khoản bàn giao',
    placeholder: 'Mô tả thời gian và điều kiện bàn giao sản phẩm/dịch vụ...',
    rows: 3,
  },
  {
    key: 'baoHanh',
    title: 'Bảo hành & Hỗ trợ sau bán',
    placeholder: 'Mô tả chính sách bảo hành, thời gian bảo hành, hỗ trợ kỹ thuật...',
    rows: 3,
    defaultValue: '12 tháng kể từ ngày nghiệm thu bàn giao.',
  },
  {
    key: 'phatViPham',
    title: 'Phạt vi phạm hợp đồng',
    placeholder: 'Mô tả mức phạt khi vi phạm các điều khoản trong hợp đồng...',
    rows: 3,
  },
  {
    key: 'giaiQuyetTranh',
    title: 'Giải quyết tranh chấp',
    placeholder: 'Ví dụ: Các bên ưu tiên giải quyết tranh chấp bằng thương lượng. Trường hợp không thỏa thuận được, tranh chấp sẽ được đưa ra Tòa án nhân dân...',
    rows: 3,
  },
];

export default function DieuKhoanTab({ dieuKhoanThanhToan, setDieuKhoanThanhToan }: DieuKhoanTabProps) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    SECTIONS.forEach((s) => {
      init[s.key] = s.key === 'dieuKhoanThanhToan' ? dieuKhoanThanhToan : (s.defaultValue || '');
    });
    return init;
  });
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const update = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (key === 'dieuKhoanThanhToan') setDieuKhoanThanhToan(val);
  };

  return (
    <div className="tab-content-active space-y-3">
      {SECTIONS.map((section) => {
        const isCollapsed = collapsed[section.key];
        return (
          <div key={section.key} className="rounded-lg border border-slate-200 bg-white overflow-hidden">
            {/* Section header */}
            <button
              type="button"
              onClick={() => toggle(section.key)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span className="text-sm font-semibold text-slate-700">{section.title}</span>
              {isCollapsed
                ? <IconChevronDown size={16} className="text-slate-400" />
                : <IconChevronUp size={16} className="text-slate-400" />
              }
            </button>

            {/* Section body */}
            {!isCollapsed && (
              <div className="px-4 py-3">
                <textarea
                  rows={section.rows}
                  value={values[section.key]}
                  onChange={(e) => update(section.key, e.target.value)}
                  placeholder={section.placeholder}
                  className={textareaClass}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
