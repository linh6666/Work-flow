"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  IconX,
  IconFileDescription,
  IconPencil,
  IconCopy,
  IconDownload,
  IconCircleArrowDown,
  IconTrash,
  IconCalendar,
  IconUser,
  IconFolder,
  IconBuilding,
  IconClock,
  IconShieldCheck,
  IconTemplate,
} from "@tabler/icons-react";
import {
  getQuotationTemplateList,
  deleteQuotationTemplate,
  updateQuotationTemplate,
  createQuotationTemplate,
  QuotationTemplateRecord,
} from "@/api/apiQuotationTemplate";
import { NotificationExtension } from "@/common/extension/NotificationExtension";
import ChinhSuaTemplateModal from "./modal/ChinhSuaTemplate";

export interface SavedTemplateItem {
  id: string;
  title: string;
  loaiBaoGia: string;
  langCode: string;
  ngayTao: string;
  author: string;
  soPhan: number;
  duAnMau: string;
  productionTime: string;
  warrantyPeriod: string;
  isSystem?: boolean;
  kichThuoc?: string;
  tyLe?: string;
  badgeTitle?: string;
  savedDate?: string;
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
  const [templates, setTemplates] = useState<QuotationTemplateRecord[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters for Vietnamese column
  const [searchVi, setSearchVi] = useState("");
  const [typeFilterVi, setTypeFilterVi] = useState("");

  // Filters for English column
  const [searchEn, setSearchEn] = useState("");
  const [typeFilterEn, setTypeFilterEn] = useState("");

  // State for Edit Modal
  const [selectedTemplateForEdit, setSelectedTemplateForEdit] = useState<SavedTemplateItem | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Fetch list of templates
  const loadTemplates = async () => {
    try {
      setLoading(true);
      const res = await getQuotationTemplateList(200);
      if (Array.isArray(res)) {
        setTemplates(res);
      }
    } catch (err) {
      console.error("Failed to load quotation templates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadTemplates();
    }
  }, [isOpen]);

  // Separate Vietnamese vs English templates
  const { vietnameseList, englishList } = useMemo(() => {
    const vi: QuotationTemplateRecord[] = [];
    const en: QuotationTemplateRecord[] = [];

    templates.forEach((t) => {
      const name = t.template_name || t.name || "";
      const lang = (t.quote_language || "").toLowerCase();
      if (lang === "en") {
        en.push(t);
      } else if (lang === "vi") {
        vi.push(t);
      } else {
        // Fallback check name or quote_type
        const text = `${name} ${t.quote_type || ""}`.toLowerCase();
        if (
          text.includes("quotation") ||
          text.includes("lighting control") ||
          text.includes("scale model") ||
          text.includes("modification") ||
          text.includes("transportation")
        ) {
          en.push(t);
        } else {
          vi.push(t);
        }
      }
    });

    return { vietnameseList: vi, englishList: en };
  }, [templates]);

  // Get distinct quote types for dropdowns
  const viTypes = useMemo(() => {
    const set = new Set<string>();
    vietnameseList.forEach((t) => {
      if (t.quote_type) set.add(t.quote_type);
    });
    return Array.from(set);
  }, [vietnameseList]);

  const enTypes = useMemo(() => {
    const set = new Set<string>();
    englishList.forEach((t) => {
      if (t.quote_type) set.add(t.quote_type);
    });
    return Array.from(set);
  }, [englishList]);

  // Filtered lists
  const filteredViList = useMemo(() => {
    return vietnameseList.filter((item) => {
      const name = item.template_name || item.name || "";
      const matchSearch =
        !searchVi ||
        name.toLowerCase().includes(searchVi.toLowerCase()) ||
        (item.quote_type && item.quote_type.toLowerCase().includes(searchVi.toLowerCase())) ||
        (item.project_name && item.project_name.toLowerCase().includes(searchVi.toLowerCase())) ||
        (item.created_by_name && item.created_by_name.toLowerCase().includes(searchVi.toLowerCase()));

      const matchType = !typeFilterVi || item.quote_type === typeFilterVi;
      return matchSearch && matchType;
    });
  }, [vietnameseList, searchVi, typeFilterVi]);

  const filteredEnList = useMemo(() => {
    return englishList.filter((item) => {
      const name = item.template_name || item.name || "";
      const matchSearch =
        !searchEn ||
        name.toLowerCase().includes(searchEn.toLowerCase()) ||
        (item.quote_type && item.quote_type.toLowerCase().includes(searchEn.toLowerCase())) ||
        (item.project_name && item.project_name.toLowerCase().includes(searchEn.toLowerCase())) ||
        (item.created_by_name && item.created_by_name.toLowerCase().includes(searchEn.toLowerCase()));

      const matchType = !typeFilterEn || item.quote_type === typeFilterEn;
      return matchSearch && matchType;
    });
  }, [englishList, searchEn, typeFilterEn]);

  // Helper date formatter
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "--/--/----";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  // Helper count sections/phần
  const getSectionCount = (t: QuotationTemplateRecord) => {
    if (!t.items_json) return 0;
    try {
      if (typeof t.items_json === "string" && (t.items_json.startsWith("[") || t.items_json.startsWith("{"))) {
        const parsed = JSON.parse(t.items_json);
        if (Array.isArray(parsed)) return parsed.length;
        if (parsed.sections && Array.isArray(parsed.sections)) return parsed.sections.length;
      }
    } catch {
      // ignore
    }
    return 0;
  };

  // Convert QuotationTemplateRecord to SavedTemplateItem for Edit Modal
  const recordToSavedItem = (t: QuotationTemplateRecord): SavedTemplateItem => {
    const isEn = (t.quote_language || "").toLowerCase() === "en";
    return {
      id: t.id,
      title: t.template_name || t.name || "",
      loaiBaoGia: t.quote_type || "",
      langCode: isEn ? "GB" : "VN",
      ngayTao: formatDate(t.created_date || t.updated_date),
      author: t.created_by_name || "Thảo Phùng",
      soPhan: getSectionCount(t),
      duAnMau: t.project_name || "",
      productionTime: `${t.production_days || 60} ngày`,
      warrantyPeriod: `${t.warranty_months || 18} tháng`,
      isSystem: t.is_system !== false,
      kichThuoc: t.size || "",
      tyLe: t.scale || "",
      raw: t,
    };
  };

  // Actions
  const handleOpenEdit = (t: QuotationTemplateRecord) => {
    setSelectedTemplateForEdit(recordToSavedItem(t));
    setIsEditOpen(true);
  };

  const handleSaveEdit = async (updated: SavedTemplateItem) => {
    try {
      await updateQuotationTemplate(updated.id, {
        template_name: updated.title,
        project_name: updated.duAnMau,
        quote_type: updated.loaiBaoGia,
        quote_language: updated.langCode === "GB" ? "en" : "vi",
        scale: updated.tyLe,
        size: updated.kichThuoc,
        is_system: updated.isSystem,
      });
      setIsEditOpen(false);
      setSelectedTemplateForEdit(null);
      await loadTemplates();
    } catch (err) {
      console.error("Lỗi khi lưu chỉnh sửa template:", err);
      alert("Không thể lưu chỉnh sửa!");
    }
  };

  const handleDuplicate = async (t: QuotationTemplateRecord) => {
    try {
      const name = t.template_name || t.name || "";
      const payload: Partial<QuotationTemplateRecord> = {
        template_name: `${name} (Bản sao)`,
        quote_type: t.quote_type,
        quote_language: t.quote_language,
        project_name: t.project_name,
        production_days: t.production_days,
        warranty_months: t.warranty_months,
        valid_days: t.valid_days,
        is_system: t.is_system,
        items_json: t.items_json,
        notes: t.notes,
        scale: t.scale,
        size: t.size,
      };
      await createQuotationTemplate(payload);
      NotificationExtension.Success(`Đã nhân bản template "${name}" thành công!`);
      await loadTemplates();
    } catch (err) {
      console.error("Lỗi khi nhân bản template:", err);
      NotificationExtension.Fails("Không thể sao chép template!");
    }
  };

  const handleToggleSystem = async (t: QuotationTemplateRecord) => {
    try {
      const newStatus = !t.is_system;
      const name = t.template_name || t.name || "";
      await updateQuotationTemplate(t.id, { is_system: newStatus });
      NotificationExtension.Success(
        newStatus ? `Đã nâng cấp "${name}" thành mẫu Hệ thống!` : `Đã hạ cấp "${name}" khỏi mẫu Hệ thống!`
      );
      await loadTemplates();
    } catch (err) {
      console.error("Lỗi cập nhật phân loại hệ thống:", err);
      NotificationExtension.Fails("Không thể thay đổi phân loại!");
    }
  };

  const handleDelete = async (t: QuotationTemplateRecord) => {
    const name = t.template_name || t.name || "";
    if (confirm(`Bạn có chắc muốn xóa template "${name}"?`)) {
      try {
        await deleteQuotationTemplate(t.id);
        NotificationExtension.Success(`Đã xóa template "${name}" thành công!`);
        await loadTemplates();
      } catch (err) {
        console.error("Lỗi khi xóa template:", err);
        NotificationExtension.Fails("Xóa template thất bại!");
      }
    }
  };

  const handleSelect = (t: QuotationTemplateRecord) => {
    if (onSelectTemplate) {
      const name = t.template_name || t.name || "";
      onSelectTemplate(t);
      NotificationExtension.Success(`Đã nạp template "${name}" vào báo giá!`);
      onClose();
    }
  };

  if (!isOpen) return null;

  // Render a template card exactly as shown in screenshot
  const renderTemplateCard = (t: QuotationTemplateRecord) => {
    const isEn = (t.quote_language || "").toLowerCase() === "en";
    const sectionCount = getSectionCount(t);
    const name = t.template_name || t.name || "";

    return (
      <div
        key={t.id}
        className="bg-white border border-slate-200/90 rounded-md px-2 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-sm transition-shadow relative flex flex-col gap-0.5"
      >
        {/* Row 1: Title & Action icons */}
        <div className="flex items-center justify-between gap-1">
          <h4
            className="text-[11.5px] font-bold text-slate-900 leading-tight flex-1 cursor-pointer hover:text-indigo-600 transition-colors uppercase line-clamp-1"
            onClick={() => handleSelect(t)}
            title={name}
          >
            {name}
          </h4>

          {/* Action icon buttons */}
          <div className="flex items-center gap-0.5 shrink-0 text-slate-400">
            <button
              onClick={() => handleOpenEdit(t)}
              className="p-0.5 hover:bg-slate-100 rounded text-indigo-600 hover:text-indigo-800 transition-colors"
              title="Chỉnh sửa"
            >
              <IconPencil size={13} stroke={1.8} />
            </button>
            <button
              onClick={() => handleDuplicate(t)}
              className="p-0.5 hover:bg-slate-100 rounded hover:text-slate-700 transition-colors"
              title="Sao chép"
            >
              <IconCopy size={13} stroke={1.8} />
            </button>
            <button
              onClick={() => handleSelect(t)}
              className="p-0.5 hover:bg-slate-100 rounded hover:text-slate-700 transition-colors"
              title="Nạp vào báo giá"
            >
              <IconDownload size={13} stroke={1.8} />
            </button>
            <button
              onClick={() => handleToggleSystem(t)}
              className="p-0.5 hover:bg-slate-100 rounded hover:text-slate-700 transition-colors"
              title={t.is_system ? "Hạ cấp khỏi Hệ thống" : "Nâng cấp lên Hệ thống"}
            >
              <IconCircleArrowDown size={13} stroke={1.8} />
            </button>
            <button
              onClick={() => handleDelete(t)}
              className="p-0.5 hover:bg-rose-50 rounded text-rose-500 hover:text-rose-700 transition-colors"
              title="Xóa"
            >
              <IconTrash size={13} stroke={1.8} />
            </button>
          </div>
        </div>

        {/* Row 2: Badges */}
        <div className="flex flex-wrap items-center gap-1">
          {t.quote_type && (
            <span className="inline-block bg-indigo-50 text-indigo-700 border border-indigo-100 px-1 py-[1px] rounded font-semibold text-[9.5px] uppercase">
              {t.quote_type}
            </span>
          )}
          <span className="text-[9px] font-bold text-slate-500 font-mono tracking-wider uppercase">
            {isEn ? "GB" : "VN"}
          </span>
          {t.is_system !== false && (
            <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200 px-1 py-[1px] rounded text-[9.5px] font-semibold">
              Hệ thống
            </span>
          )}
        </div>

        {/* Row 3: Meta info with icons */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[10.5px] text-slate-500">
          <div className="flex items-center gap-1 shrink-0">
            <IconCalendar size={11} className="text-slate-400" />
            <span>{formatDate(t.created_date || t.updated_date)}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <IconUser size={11} className="text-slate-400" />
            <span className="font-medium text-slate-600">{t.created_by_name || "Thảo Phùng"}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <IconFolder size={11} className="text-slate-400" />
            <span>{sectionCount} phần</span>
          </div>

          {t.project_name && (
            <div className="flex items-center gap-1 shrink-0 max-w-[220px] truncate" title={t.project_name}>
              <IconBuilding size={11} className="text-slate-400 shrink-0" />
              <span className="truncate uppercase font-medium">{t.project_name}</span>
            </div>
          )}
        </div>

        {/* Row 4: Specs (Production days, warranty) */}
        {(t.production_days !== undefined || t.warranty_months !== undefined) && (
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[10.5px] text-slate-500">
            {t.production_days !== undefined && Number(t.production_days) > 0 && (
              <div className="flex items-center gap-1 shrink-0">
                <IconClock size={11} className="text-slate-400" />
                <span>{t.production_days} ngày</span>
              </div>
            )}
            {t.warranty_months !== undefined && Number(t.warranty_months) > 0 && (
              <div className="flex items-center gap-1 shrink-0">
                <IconShieldCheck size={11} className="text-slate-400" />
                <span>{t.warranty_months} tháng</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl w-[96vw] max-w-[1400px] h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-2.5 border-b border-slate-200 flex items-start justify-between bg-white shrink-0">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <IconFileDescription size={19} className="text-slate-800" />
              <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">
                Quản lý Template Báo giá
              </h2>
              <span className="inline-flex items-center gap-1 bg-sky-50 text-[#306485] border border-sky-200 px-2 py-0.5 rounded text-[10.5px] font-semibold">
                <IconTemplate size={12} />
                Template hệ thống đã lưu
              </span>
            </div>
            <p className="text-[11px] text-slate-500 pl-0.5">
              Mẫu hệ thống do quản lý lưu, dùng chung cho toàn team. Có thể chỉnh sửa, sao chép, xóa hoặc hạ cấp.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-lg transition-colors"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* 2-Column Body Layout */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-[#f8fafc] flex flex-col">
          {/* Khối 1: Template Hệ thống (2 cột) */}
          <div className="grid grid-cols-2 divide-x divide-slate-200 border-b border-slate-200">
            {/* Cột 1: Tiếng Việt */}
            <div className="flex flex-col p-3">
              {/* Header Cột VN */}
              <div className="flex items-center justify-between pb-1.5 shrink-0">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 text-[12px]">
                  <span className="font-mono text-[9.5px] uppercase bg-slate-200 text-slate-700 px-1 py-0.2 rounded font-bold">VN</span>
                  <span>Tiếng Việt</span>
                  <span className="text-slate-500 font-normal">({filteredViList.length})</span>
                </div>
              </div>

              {/* Filter VN */}
              <div className="grid grid-cols-[1fr_auto] gap-2 pb-2 shrink-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm theo tên, loại, dự án, người lưu..."
                    value={searchVi}
                    onChange={(e) => setSearchVi(e.target.value)}
                    className="w-full pl-2.5 pr-2.5 py-1 bg-white border border-slate-300 rounded text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <select
                  value={typeFilterVi}
                  onChange={(e) => setTypeFilterVi(e.target.value)}
                  className="bg-white border border-slate-300 rounded text-xs px-2 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Tất cả loại</option>
                  {viTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Danh sách thẻ VN */}
              <div className="space-y-1.5 pr-1">
                {loading ? (
                  <div className="py-8 text-center text-xs text-slate-400">Đang tải danh sách...</div>
                ) : filteredViList.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">Không tìm thấy template nào</div>
                ) : (
                  filteredViList.map(renderTemplateCard)
                )}
              </div>
            </div>

            {/* Cột 2: Tiếng Anh */}
            <div className="flex flex-col p-3">
              {/* Header Cột GB */}
              <div className="flex items-center justify-between pb-1.5 shrink-0">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 text-[12px]">
                  <span className="font-mono text-[9.5px] uppercase bg-slate-200 text-slate-700 px-1 py-0.2 rounded font-bold">GB</span>
                  <span>Tiếng Anh</span>
                  <span className="text-slate-500 font-normal">({filteredEnList.length})</span>
                </div>
              </div>

              {/* Filter GB */}
              <div className="grid grid-cols-[1fr_auto] gap-2 pb-2 shrink-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm theo tên, loại, dự án, người lưu..."
                    value={searchEn}
                    onChange={(e) => setSearchEn(e.target.value)}
                    className="w-full pl-2.5 pr-2.5 py-1 bg-white border border-slate-300 rounded text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <select
                  value={typeFilterEn}
                  onChange={(e) => setTypeFilterEn(e.target.value)}
                  className="bg-white border border-slate-300 rounded text-xs px-2 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Tất cả loại</option>
                  {enTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Danh sách thẻ GB */}
              <div className="space-y-1.5 pr-1">
                {loading ? (
                  <div className="py-8 text-center text-xs text-slate-400">Đang tải danh sách...</div>
                ) : filteredEnList.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">Không tìm thấy template nào</div>
                ) : (
                  filteredEnList.map(renderTemplateCard)
                )}
              </div>
            </div>
          </div>

          {/* Khối 2: Mẫu cá nhân đã lưu */}
          <div className="p-4 bg-white/70 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-base">📌</span>
              <h3 className="text-[13.5px] font-bold text-slate-900 tracking-tight">
                Mẫu cá nhân đã lưu
              </h3>
            </div>

            {/* Empty state nếu chưa có mẫu cá nhân */}
            <div className="py-10 flex flex-col items-center justify-center text-center">
              <p className="text-[13px] font-medium text-slate-600 mb-1">
                Chưa có mẫu báo giá cá nhân nào được lưu.
              </p>
              <p className="text-[12px] text-slate-400">
                Hãy chỉnh sửa mẫu hệ thống ở trên hoặc lưu báo giá làm mẫu từ trang Chi tiết báo giá.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Chỉnh Sửa Template */}
      {isEditOpen && selectedTemplateForEdit && (
        <ChinhSuaTemplateModal
          isOpen={isEditOpen}
          template={selectedTemplateForEdit}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedTemplateForEdit(null);
          }}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
