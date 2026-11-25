"use client";


import React, { useState, useEffect, useCallback } from 'react';
import {
  getQuotationTemplateList,
  getQuotationTemplateById,
  createQuotationTemplate,
  updateQuotationTemplate,
  deleteQuotationTemplate,
  QuotationTemplateRecord,
} from '@/api/apiGetQuotationTemplate';
import { NotificationExtension } from '@/common/extension/NotificationExtension';
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
  IconShieldCheck,
  IconLoader2,
  IconRefresh,
} from '@tabler/icons-react';
import ChinhSuaTemplateModal from './modal/ChinhSuaTemplate';

export interface BaoGiaTemplateItem {
  id: string;
  langCode: string;
  title: string;
  subtitle: string;
  raw?: QuotationTemplateRecord;
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
  tyLe?: string;
  kichThuoc?: string;
  loaiBaoGia?: string;
  itemSummary: string;
  productionTime: string;
  warrantyPeriod: string;
  raw?: QuotationTemplateRecord;
}

interface QuanLyTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate?: (template: any) => void;
}

export default function QuanLyTemplateModal({
  isOpen,
  onClose,
  onSelectTemplate,
}: QuanLyTemplateModalProps) {
  const [englishTemplates, setEnglishTemplates] = useState<BaoGiaTemplateItem[]>([]);
  const [vietnameseTemplates, setVietnameseTemplates] = useState<BaoGiaTemplateItem[]>([]);
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplateItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<SavedTemplateItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Gọi API lấy danh sách Template từ server
  const fetchTemplates = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getQuotationTemplateList(200);
      if (Array.isArray(data) && data.length > 0) {
        // 1. Phân loại Mẫu hệ thống tiếng Anh
        const enList: BaoGiaTemplateItem[] = data
          .filter(item => {
            const lang = (item.quote_language || '').toLowerCase();
            const name = (item.template_name || item.quote_type || '').toLowerCase();
            return lang === 'en' || name.includes('quotation') || name.includes('model') || name.includes('system') || name.includes('tab');
          })
          .map(item => ({
            id: item.id,
            langCode: 'GB',
            title: item.template_name || item.quote_type || 'Quotation Template (ENG)',
            subtitle: item.project_name || `Template hệ thống • Tỷ lệ ${item.scale || '—'} • KT ${item.size || '—'}`,
            raw: item,
          }));
        setEnglishTemplates(enList);

        // 2. Phân loại Mẫu hệ thống tiếng Việt
        const viList: BaoGiaTemplateItem[] = data
          .filter(item => {
            const lang = (item.quote_language || '').toLowerCase();
            const name = (item.template_name || item.quote_type || '').toLowerCase();
            const isEnglish = lang === 'en' || name.includes('quotation') || name.includes('model') || name.includes('system') || name.includes('tab');
            return !isEnglish;
          })
          .map(item => ({
            id: item.id,
            langCode: 'VN',
            title: item.template_name || item.quote_type || 'Mẫu Báo giá (VN)',
            subtitle: item.project_name || `Template hệ thống • Tỷ lệ ${item.scale || '—'} • KT ${item.size || '—'}`,
            raw: item,
          }));
        setVietnameseTemplates(viList);

        // 3. Toàn bộ mẫu đã lưu (Saved Templates)
        const mapped: SavedTemplateItem[] = data.map((item) => ({
          id: item.id,
          title: item.template_name || item.project_name || item.quote_type || 'Mẫu Báo giá',
          badgeTitle: item.quote_type || 'Báo giá',
          langCode: item.quote_language?.toUpperCase() === 'EN' ? 'GB' : item.quote_language?.toUpperCase() === 'VI-EN' ? 'VNGB' : 'VN',
          isSystem: item.is_system !== false,
          savedDate: item.created_date ? new Date(item.created_date).toLocaleDateString('vi-VN') : '—',
          author: item.created_by_name || 'Hệ thống',
          categoryCount: `${item.production_days || 60} ngày`,
          duAnMau: item.project_name || '',
          tyLe: item.scale || '',
          kichThuoc: item.size || '',
          loaiBaoGia: item.quote_type || '',
          itemSummary: `${item.scale ? `Tỷ lệ ${item.scale}` : ''} ${item.size ? `• KT ${item.size}` : ''}`,
          productionTime: `${item.production_days || 60} ngày sản xuất`,
          warrantyPeriod: `${item.warranty_months || 18} tháng bảo hành`,
          raw: item,
        }));
        setSavedTemplates(mapped);
      } else {
        setEnglishTemplates([]);
        setVietnameseTemplates([]);
        setSavedTemplates([]);
      }
    } catch (err) {
      console.warn('Lỗi khi fetch templates:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchTemplates();
    }
  }, [isOpen, fetchTemplates]);

  if (!isOpen) return null;

  const handleDuplicateSaved = async (item: SavedTemplateItem) => {
    const newTitle = `${item.title} (Bản sao)`;
    try {
      const res = await createQuotationTemplate({
        template_name: newTitle,
        project_name: item.duAnMau || newTitle,
        quote_type: item.loaiBaoGia || item.badgeTitle,
        quote_language: item.langCode === 'GB' ? 'en' : 'vi',
        scale: item.tyLe,
        size: item.kichThuoc,
        is_system: false,
        production_days: parseFloat(item.productionTime) || 60,
        warranty_months: parseFloat(item.warrantyPeriod) || 18,
      });

      if (res.success) {
        NotificationExtension.Success(`Nhân bản mẫu ${newTitle} thành công!`);
        await fetchTemplates();
      } else {
        NotificationExtension.Warn(res.error || 'Không thể nhân bản mẫu');
      }
    } catch (err: any) {
      console.warn('Lỗi khi nhân bản template:', err);
      NotificationExtension.Warn(err?.message || 'Lỗi kết nối khi nhân bản');
    }
  };

  const handleDeleteSaved = async (id: string) => {
    const target = savedTemplates.find((t) => t.id === id);
    setSavedTemplates((prev) => prev.filter((item) => item.id !== id));
    NotificationExtension.Success(`Đã xóa mẫu ${target?.title || ''} thành công!`);
    try {
      const res = await deleteQuotationTemplate(id);
      if (!res.success && res.error) {
        NotificationExtension.Warn(res.error, 'Cảnh báo đồng bộ máy chủ');
      }
    } catch (err) {
      console.warn('Lỗi khi xóa template:', err);
    }
  };

  const handleOpenEdit = (item: SavedTemplateItem) => {
    setEditingTemplate(item);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedItem: SavedTemplateItem) => {
    // 1. Cập nhật state UI ngay lập tức
    setSavedTemplates((prev) =>
      prev.map((t) => (t.id === updatedItem.id ? updatedItem : t))
    );
    setIsEditModalOpen(false);
    setEditingTemplate(null);
    NotificationExtension.Success(`Cập nhật mẫu ${updatedItem.title} thành công!`);

    // 2. Gửi API PUT lên server
    try {
      const payload: Partial<QuotationTemplateRecord> = {
        template_name: updatedItem.title,
        project_name: updatedItem.duAnMau || updatedItem.title,
        quote_type: updatedItem.loaiBaoGia || updatedItem.badgeTitle,
        quote_language: updatedItem.langCode === 'GB' ? 'en' : updatedItem.langCode === 'VNGB' ? 'vi-en' : 'vi',
        scale: updatedItem.tyLe,
        size: updatedItem.kichThuoc,
        production_days: parseFloat(updatedItem.productionTime) || 60,
        warranty_months: parseFloat(updatedItem.warrantyPeriod) || 18,
      };

      const res = await updateQuotationTemplate(updatedItem.id, payload);
      if (!res.success && res.error) {
        NotificationExtension.Warn(res.error, 'Cảnh báo đồng bộ máy chủ');
      }
    } catch (err: any) {
      console.warn('Lỗi khi cập nhật template:', err);
      NotificationExtension.Warn(err?.message || 'Không thể đồng bộ với máy chủ');
    }
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
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
              <IconLoader2 size={24} className="animate-spin text-[#406c89]" />
              <span className="text-xs">Đang tải danh sách mẫu báo giá từ server...</span>
            </div>
          ) : (
            <>
              {/* SECTION 1: NẠP MẪU HỆ THỐNG - TIẾNG ANH */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                    <div className="w-6 h-6 rounded-lg bg-[#406c89]/10 text-[#406c89] flex items-center justify-center shrink-0">
                      <IconWorld size={16} />
                    </div>
                    <span>Nạp mẫu Hệ thống - Tiếng Anh ({englishTemplates.length})</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {englishTemplates.length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2">Không có mẫu tiếng Anh nào.</p>
                  ) : (
                    englishTemplates.map((tmpl) => (
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

                        {/* Right Action Button (+ Nạp) - #406c89 */}
                        <button
                          type="button"
                          onClick={() => {
                            if (onSelectTemplate) onSelectTemplate(tmpl.raw || tmpl);
                            onClose();
                          }}
                          className="flex items-center gap-1 px-4 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs shrink-0"
                        >
                          <IconPlus size={14} />
                          <span>Nạp</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* SECTION 2: NẠP MẪU HỆ THỐNG - TIẾNG VIỆT */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <IconHome size={16} />
                  </div>
                  <span>Nạp mẫu Hệ thống - Tiếng Việt ({vietnameseTemplates.length})</span>
                </div>

                <div className="space-y-2.5">
                  {vietnameseTemplates.length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2">Không có mẫu tiếng Việt nào.</p>
                  ) : (
                    vietnameseTemplates.map((tmpl) => (
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
                            if (onSelectTemplate) onSelectTemplate(tmpl.raw || tmpl);
                            onClose();
                          }}
                          className="flex items-center gap-1 px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs shrink-0"
                        >
                          <IconPlus size={14} />
                          <span>Nạp</span>
                        </button>
                      </div>
                    ))
                  )}
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
                        <span className="bg-[#406c89]/10 text-[#406c89] px-2.5 py-0.5 rounded-md text-[11px] font-semibold">
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
                        onClick={() => handleOpenEdit(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#406c89]/10 border border-[#406c89]/30 text-[#406c89] hover:bg-[#406c89]/20 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
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
            </>
          )}

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

      {/* Edit Template Sub-Modal */}
      <ChinhSuaTemplateModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTemplate(null);
        }}
        template={editingTemplate}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
