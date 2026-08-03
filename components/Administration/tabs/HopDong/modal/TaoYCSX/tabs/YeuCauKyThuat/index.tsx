"use client";

import React, { useState } from 'react';

interface Section {
  key: string;
  label: string;
  defaultValue: string;
  rows: number;
}

const SECTIONS: Section[] = [
  {
    key: 'khung',
    label: 'Khung sắt và mặt bằng',
    defaultValue: '- Khung làm từ kim loại 20×40, dày 1.2 mm.\n- Mặt bằng bằng gỗ MDF xanh dày 12 mm.',
    rows: 3,
  },
  {
    key: 'chan',
    label: 'Chân mô hình',
    defaultValue: '- Chân mô hình: chân vuông bo cong 4 góc, sử dụng gỗ công nghiệp bọc laminate.\n- Có ánh sáng.\n- Bánh xe tăng chỉnh, chịu lực.',
    rows: 4,
  },
  {
    key: 'congtrinh',
    label: 'Công trình',
    defaultValue: '- Công trình được khai triển từ bản vẽ kiến trúc. Sau đó được cắt bằng máy cắt Laser, ghép và sơn hoàn thiện.',
    rows: 3,
  },
  {
    key: 'noithat',
    label: 'Nội thất',
    defaultValue: '- Không',
    rows: 3,
  },
  {
    key: 'nen_canhquan',
    label: 'Nền và cảnh quan mô hình',
    defaultValue: '',
    rows: 3,
  },
  {
    key: 'anhs_sang',
    label: 'Hệ thống ánh sáng mô hình',
    defaultValue: '',
    rows: 3,
  },
  {
    key: 'yc_anhs_ang',
    label: 'Yêu cầu đặc biệt ánh sáng',
    defaultValue: 'Không có',
    rows: 3,
  },
  {
    key: 'kinh_bv',
    label: 'Kinh bảo vệ mô hình',
    defaultValue: 'Không có',
    rows: 3,
  },
  {
    key: 'hop_vc',
    label: 'Hộp vận chuyển',
    defaultValue: 'Đi xe nguyên chuyên',
    rows: 3,
  },
  {
    key: 'yc_khac',
    label: 'Yêu cầu đặc biệt khác',
    defaultValue: '',
    rows: 3,
  },
];

export default function YeuCauKyThuatTab() {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(SECTIONS.map((s) => [s.key, s.defaultValue]))
  );

  const handleChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="space-y-4 text-xs text-slate-700 px-1 no-scrollbar">
      {SECTIONS.map((section) => (
        <div key={section.key} className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#406c89]">
            {section.label}
          </label>
          <textarea
            value={values[section.key]}
            onChange={(e) => handleChange(section.key, e.target.value)}
            rows={section.rows}
            placeholder={section.defaultValue ? undefined : `Nhập ${section.label.toLowerCase()}...`}
            className="w-full text-xs bg-white border border-slate-200/90 rounded-lg px-3 py-2.5 text-slate-700 leading-relaxed placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all resize-y"
          />
        </div>
      ))}
    </div>
  );
}
