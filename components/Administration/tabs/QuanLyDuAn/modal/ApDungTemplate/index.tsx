"use client";

import React, { useState } from 'react';
import {
  IconCheck,
  IconTrash,
  IconStack2,
  IconFileText
} from '@tabler/icons-react';
import { DuAnItem } from '../../index';

interface ApDungTemplateProps {
  project?: DuAnItem;
  onApplySuccess?: (templateName: string) => void;
  onClose: () => void;
}

export default function ApDungTemplate({ project, onApplySuccess, onClose }: ApDungTemplateProps) {
  const [templateList, setTemplateList] = useState([
    {
      id: 'tmp-1',
      name: 'DA KHU CONG NGHIEP - MH NHAN BAN',
      badge: 'Toàn bộ hồ sơ',
      badgeType: 'purple',
      desc: '',
      author: 'Thảo Phùng',
      usageCount: 1
    },
    {
      id: 'tmp-2',
      name: 'P.CN&TK - MẪU 1',
      badge: 'Toàn bộ hồ sơ',
      badgeType: 'purple',
      desc: '',
      author: 'Trần Diễm My',
      usageCount: 0
    },
    {
      id: 'tmp-3',
      name: 'BGĐ-MẪU 1',
      badge: 'Ban Giám đốc',
      badgeType: 'blue',
      desc: '',
      author: 'Thảo Phùng',
      usageCount: 4
    },
    {
      id: 'tmp-4',
      name: 'P. GHÉP - MẪU 1',
      badge: 'Phòng Ghép',
      badgeType: 'blue',
      desc: '',
      author: 'Trần Diễm My',
      usageCount: 1
    },
    {
      id: 'tmp-5',
      name: 'P. CẮT - MẪU 1',
      badge: 'Phòng Cắt',
      badgeType: 'blue',
      desc: '',
      author: 'Trần Diễm My',
      usageCount: 1
    },
    {
      id: 'tmp-6',
      name: 'P. KHAI TRIỂN - MẪU 1',
      badge: 'Phòng Khai triển',
      badgeType: 'blue',
      desc: '',
      author: 'Trần Diễm My',
      usageCount: 3
    },
    {
      id: 'tmp-7',
      name: 'P. CẢNH QUAN - MẪU 1',
      badge: 'Phòng Cảnh Quan',
      badgeType: 'blue',
      desc: '',
      author: 'Trần Diễm My',
      usageCount: 2
    },
    {
      id: 'tmp-8',
      name: 'P.ĐIỆN - MẪU 1',
      badge: 'Phòng Điện',
      badgeType: 'blue',
      desc: '',
      author: 'Trần Diễm My',
      usageCount: 1
    },
    {
      id: 'tmp-9',
      name: 'P.MỘC SƠN - MẪU 1',
      badge: 'Phòng Mộc Sơn',
      badgeType: 'blue',
      desc: '',
      author: 'Trần Diễm My',
      usageCount: 1
    },
    {
      id: 'tmp-10',
      name: 'P. CÔNG NGHỆ & TK - MẪU 1',
      badge: 'Phòng Công nghệ và Thiết kế',
      badgeType: 'blue',
      desc: '',
      author: 'congnghevathietke.mhv',
      usageCount: 8
    },
    {
      id: 'tmp-11',
      name: 'TEMP 1',
      badge: 'Phòng Khai triển',
      badgeType: 'blue',
      desc: 'Mẫu báo cáo dùng chung cho tất cả các loại dự án',
      author: 'trandiemmy86',
      usageCount: 3
    },
    {
      id: 'tmp-12',
      name: 'DỰ ÁN QUY HOẠCH',
      badge: 'Toàn bộ hồ sơ',
      badgeType: 'purple',
      desc: '',
      author: 'Thao Phung',
      usageCount: 0
    }
  ]);

  const handleApplyItem = (templateName: string) => {
    if (onApplySuccess) {
      onApplySuccess(templateName);
    }
    onClose();
  };

  const handleDeleteItem = (id: string) => {
    setTemplateList(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-3 text-xs">
      
      {/* TEMPLATE CARDS LIST */}
      <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1.5 [scrollbar-width:thin]">
        {templateList.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-4 flex items-center justify-between gap-3 transition-all shadow-2xs"
          >
            {/* Left Side: Icon, Title, Badge, Description, Subtitle */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[#406c89] shrink-0">
                {item.badgeType === 'purple' ? (
                  <IconStack2 size={20} className="text-purple-600" />
                ) : (
                  <IconFileText size={20} className="text-[#406c89]" />
                )}
              </div>

              <div className="space-y-0.5 truncate">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm tracking-tight truncate">
                    {item.name}
                  </h4>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                      item.badgeType === 'purple'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-[#406c89]/10 text-[#406c89]'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                {item.desc && (
                  <p className="text-xs text-slate-500 font-medium leading-normal">
                    {item.desc}
                  </p>
                )}

                <p className="text-[11px] text-slate-400 font-medium">
                  Tạo bởi: {item.author} · Dùng {item.usageCount} lần
                </p>
              </div>
            </div>

            {/* Right Side: Apply Button & Delete Icon */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleApplyItem(item.name)}
                className="bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl inline-flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <IconCheck size={14} stroke={3} />
                <span>Áp dụng</span>
              </button>

              <button
                type="button"
                onClick={() => handleDeleteItem(item.id)}
                className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="Xóa template"
              >
                <IconTrash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
