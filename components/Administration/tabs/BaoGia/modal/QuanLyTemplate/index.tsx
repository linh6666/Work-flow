"use client";

import React, { useState } from 'react';
import {
  IconX,
  IconWorld,
  IconHome,
  IconPlus,
  IconTemplate,
  IconPin,
  IconPencil,
  IconCopy,
  IconDownload,
  IconTrash,
  IconBuilding,
  IconClock,
  IconShieldCheck
} from '@tabler/icons-react';

export interface BaoGiaTemplateItem {
  id: string;
  langCode: string;
  title: string;
  subtitle: string;
}

export interface SavedTemplateItem {
  id: string;
  title: string;
  badgeTitle: string;
  langCode: string;
  isSystem?: boolean;
  savedDate: string;
  author: string;
  categoryCount: string;
  duAnMau?: string;
  itemSummary: string;
  productionTime: string;
  warrantyPeriod: string;
}

interface QuanLyTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate?: (template: any) => void;
}

const ENGLISH_TEMPLATE_LIST: BaoGiaTemplateItem[] = [
  {
    id: 'eng-1',
    langCode: 'GB',
    title: 'Building Model Quotation (ENG)',
    subtitle: 'Template hệ thống tiếng Anh',
  },
  {
    id: 'eng-2',
    langCode: 'GB',
    title: 'Lighting Control System Quotation (ENG)',
    subtitle: 'Template hệ thống tiếng Anh',
  },
  {
    id: 'eng-3',
    langCode: 'GB',
    title: 'Masterplan Model Quotation (ENG)',
    subtitle: 'Template hệ thống tiếng Anh',
  },
  {
    id: 'eng-4',
    langCode: 'GB',
    title: 'Galaxy Tab Control Quotation (ENG)',
    subtitle: 'Template hệ thống tiếng Anh',
  },
  {
    id: 'eng-5',
    langCode: 'GB',
    title: 'Advanced Lighting System Quotation (ENG)',
    subtitle: 'Template hệ thống tiếng Anh',
  },
  {
    id: 'eng-6',
    langCode: 'GB',
    title: 'Running Car System Quotation (ENG)',
    subtitle: 'Template hệ thống tiếng Anh',
  },
];

const VIETNAMESE_TEMPLATE_LIST: BaoGiaTemplateItem[] = [
  {
    id: 'vn-1',
    langCode: 'VN',
    title: 'Báo giá Mô hình Quy hoạch',
    subtitle: 'Template hệ thống tiếng Việt',
  },
  {
    id: 'vn-2',
    langCode: 'VN',
    title: 'Báo giá Mô hình Công trình',
    subtitle: 'Template hệ thống tiếng Việt',
  },
  {
    id: 'vn-3',
    langCode: 'VN',
    title: 'Báo giá Mô hình Biệt thự - Nội thất',
    subtitle: 'Template hệ thống tiếng Việt',
  },
  {
    id: 'vn-4',
    langCode: 'VN',
    title: 'Báo giá Vận chuyển mô hình',
    subtitle: 'Template hệ thống tiếng Việt',
  },
  {
    id: 'vn-5',
    langCode: 'VN',
    title: 'Báo giá Lựa chọn Công nghệ',
    subtitle: 'Template hệ thống tiếng Việt',
  },
  {
    id: 'vn-6',
    langCode: 'VN',
    title: 'Báo giá Điều khiển Ánh sáng',
    subtitle: 'Template hệ thống tiếng Việt',
  },
  {
    id: 'vn-7',
    langCode: 'VN',
    title: 'Báo giá Lựa chọn Điều khiển Ánh sáng Galaxy Tab',
    subtitle: 'Template hệ thống tiếng Việt',
  },
  {
    id: 'vn-8',
    langCode: 'VN',
    title: 'Báo giá Hệ thống Ánh sáng Nâng cao',
    subtitle: 'Template hệ thống tiếng Việt',
  },
  {
    id: 'vn-9',
    langCode: 'VN',
    title: 'Báo giá Lựa chọn Hệ thống Xe chạy',
    subtitle: 'Template hệ thống tiếng Việt',
  },
];

const INITIAL_SAVED_TEMPLATES: SavedTemplateItem[] = [
  {
    id: 'saved-1',
    title: 'Elevator System Quotation (ENG)',
    badgeTitle: 'Elevator System Quotation (ENG)',
    langCode: 'GB',
    isSystem: false,
    savedDate: '17/7/2026',
    author: '—',
    categoryCount: '1 phần',
    itemSummary: '1 phần, 2 hạng mục',
    productionTime: '60 ngày sản xuất',
    warrantyPeriod: '18 tháng bảo hành',
  },
  {
    id: 'saved-2',
    title: 'QUOTATION FOR BUILDING MODEL',
    badgeTitle: 'Building Model Quotation',
    langCode: 'GB',
    isSystem: true,
    savedDate: '26/6/2026',
    author: 'Thao Phung',
    categoryCount: '4 phần',
    duAnMau: 'CÔNG TY TNHH BẤT ĐỘNG SẢN HỒ AN',
    itemSummary: '4 phần, 9 hạng mục',
    productionTime: '60 ngày sản xuất',
    warrantyPeriod: '18 tháng bảo hành',
  },
  {
    id: 'saved-3',
    title: 'QUOTATION MASTER PLAN MODEL',
    badgeTitle: 'Masterplan Model Quotation',
    langCode: 'GB',
    isSystem: true,
    savedDate: '26/6/2026',
    author: 'Thao Phung',
    categoryCount: '4 phần',
    duAnMau: 'CÔNG TY TNHH BẤT ĐỘNG SẢN HỒ AN',
    itemSummary: '4 phần, 9 hạng mục',
    productionTime: '60 ngày sản xuất',
    warrantyPeriod: '18 tháng bảo hành',
  },
];

export default function QuanLyTemplateModal({
  isOpen,
  onClose,
  onSelectTemplate,
}: QuanLyTemplateModalProps) {
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplateItem[]>(INITIAL_SAVED_TEMPLATES);

  if (!isOpen) return null;

  const handleDuplicateSaved = (item: SavedTemplateItem) => {
    const newItem: SavedTemplateItem = {
      ...item,
      id: `saved-${Date.now()}`,
      title: `${item.title} (Bản sao)`,
    };
    setSavedTemplates((prev) => [newItem, ...prev]);
  };

  const handleDeleteSaved = (id: string) => {
    setSavedTemplates((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-4xl overflow-hidden animate-scale-up flex flex-col h-[90vh] max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#BB8D38]/10 text-[#BB8D38] flex items-center justify-center shrink-0">
              <IconTemplate size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base tracking-tight">
                Quản lý Template Báo giá
              </h3>
              <p className="text-[11px] text-slate-400 font-normal">Nạp các mẫu báo giá chuẩn hệ thống và mẫu đã lưu</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-7 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          
          {/* SECTION 1: NẠP MẪU HỆ THỐNG - TIẾNG ANH */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
              <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <IconWorld size={16} />
              </div>
              <span>Nạp mẫu Hệ thống - Tiếng Anh</span>
            </div>

            <div className="space-y-2.5">
              {ENGLISH_TEMPLATE_LIST.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="bg-[#f8fafc]/90 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all hover:border-slate-300 shadow-2xs"
                >
                  {/* Left Title & Subtitle */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs sm:text-sm">
                      <span className="text-slate-500 font-mono text-[11px] uppercase">{tmpl.langCode}</span>
                      <span>{tmpl.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-normal">
                      {tmpl.subtitle}
                    </p>
                  </div>

                  {/* Right Action Button (+ Nạp) - Indigo Blue */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectTemplate) onSelectTemplate(tmpl);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs shrink-0"
                  >
                    <IconPlus size={14} />
                    <span>Nạp</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: NẠP MẪU HỆ THỐNG - TIẾNG VIỆT */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
              <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <IconHome size={16} />
              </div>
              <span>Nạp mẫu Hệ thống - Tiếng Việt</span>
            </div>

            <div className="space-y-2.5">
              {VIETNAMESE_TEMPLATE_LIST.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="bg-[#f4fbf7]/90 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all hover:border-emerald-300 shadow-2xs"
                >
                  {/* Left Title & Subtitle */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs sm:text-sm">
                      <span className="text-slate-500 font-mono text-[11px] uppercase">{tmpl.langCode}</span>
                      <span>{tmpl.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-normal">
                      {tmpl.subtitle}
                    </p>
                  </div>

                  {/* Right Action Button (+ Nạp) - Emerald Green */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectTemplate) onSelectTemplate(tmpl);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs shrink-0"
                  >
                    <IconPlus size={14} />
                    <span>Nạp</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: MẪU ĐÃ LƯU */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
              <IconPin size={18} className="text-red-500 fill-red-500 rotate-45" />
              <span>Mẫu đã lưu</span>
            </div>

            <div className="space-y-4">
              {savedTemplates.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#f8fafc]/90 border border-slate-200/90 rounded-2xl p-5 space-y-3.5 shadow-2xs transition-all hover:border-slate-300"
                >
                  {/* Top Row: Title, Badges & Action Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    
                    {/* Left Details */}
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">
                        {item.title}
                      </h4>

                      {/* Badges */}
                      <div className="flex items-center gap-2 flex-wrap pt-0.5">
                        <span className="bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-md text-[11px] font-semibold">
                          {item.badgeTitle}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {item.langCode}
                        </span>
                        {item.isSystem && (
                          <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                            Hệ thống
                          </span>
                        )}
                      </div>

                      {/* Meta line */}
                      <p className="text-xs text-slate-400 font-normal pt-1">
                        Lưu: <span className="text-slate-600 font-medium">{item.savedDate}</span> | Bởi: <span className="text-slate-600 font-medium">{item.author}</span> | Danh mục: <span className="text-slate-600 font-medium">{item.categoryCount}</span>
                      </p>
                    </div>

                    {/* Right 4 Action Buttons */}
                    <div className="flex items-center gap-2 flex-wrap shrink-0">
                      <button
                        type="button"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200/90 text-indigo-600 hover:bg-indigo-100 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                      >
                        <IconPencil size={14} />
                        <span>Chỉnh sửa</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDuplicateSaved(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                      >
                        <IconCopy size={14} />
                        <span>Sao chép</span>
                      </button>

                      <button
                        type="button"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                      >
                        <IconDownload size={14} />
                        <span>Xuất</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteSaved(item.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200/90 text-red-500 hover:bg-red-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                      >
                        <IconTrash size={14} />
                        <span>Xóa</span>
                      </button>
                    </div>

                  </div>

                  {/* Bottom Summary Box inside Card */}
                  <div className="bg-white border border-slate-200/70 rounded-xl p-3.5 text-xs text-slate-600 space-y-1.5 font-normal">
                    {item.duAnMau && (
                      <div className="flex items-center gap-2 text-slate-700">
                        <IconBuilding size={16} className="text-slate-400 shrink-0" />
                        <span>Dự án mẫu: <strong className="font-bold text-slate-800">{item.duAnMau}</strong></span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <IconPin size={15} className="text-slate-400 shrink-0" />
                      <span>{item.itemSummary}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <IconClock size={15} className="text-slate-400 shrink-0" />
                      <span>{item.productionTime}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <IconShieldCheck size={15} className="text-slate-400 shrink-0" />
                      <span>{item.warrantyPeriod}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-end bg-slate-50/60 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
