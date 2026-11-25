"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconPencil,
  IconCheck,
  IconSettings,
  IconListDetails,
  IconReceipt,
  IconLoader2
} from '@tabler/icons-react';
import { SavedTemplateItem } from '../../index';
import { BaoGiaSection, HangMucDong } from '../../../DanhMucGia';
import { DieuKienItem } from '../../../DieuKienBaoGia';
import { getQuotationTemplateById, updateQuotationTemplate } from '@/api/apiQuotationTemplate';
import { NotificationExtension } from '@/common/extension/NotificationExtension';

import CaiDatMauTab from './CaiDatMau';
import DanhMucGiaTabWrapper from './DanhMucGia';
import DieuKienThanhToanTabWrapper from './DieuKienThanhToan';

interface ChinhSuaTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: SavedTemplateItem | null;
  onSave?: (updatedTemplate: SavedTemplateItem) => void;
  onSaveSuccess?: () => void;
}

export default function ChinhSuaTemplateModal({
  isOpen,
  onClose,
  template,
  onSave,
  onSaveSuccess,
}: ChinhSuaTemplateModalProps) {
  const [activeTab, setActiveTab] = useState<'settings' | 'items' | 'terms'>('settings');
  const [formData, setFormData] = useState<SavedTemplateItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // States for Tab 2: Danh mục & Giá
  const [sections, setSections] = useState<BaoGiaSection[]>([]);
  const [loaiBaoGiaSelect, setLoaiBaoGiaSelect] = useState('BÁO GIÁ MH KHU CÔNG NGHIỆP');
  const [chietKhauChecked, setChietKhauChecked] = useState(false);
  const [sauChietKhauChecked, setSauChietKhauChecked] = useState(false);
  const [chietKhauPercent, setChietKhauPercent] = useState(0);
  const [vatPercent, setVatPercent] = useState(8);

  // States for Tab 3: Điều kiện & Thanh toán
  const [thoiGianSanXuat, setThoiGianSanXuat] = useState(60);
  const [baoHanhThang, setBaoHanhThang] = useState(18);
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState('');
  const [dieuKienList, setDieuKienList] = useState<DieuKienItem[]>([]);

  // Helper load items_json
  const loadItemsJson = async (itemsRaw: any) => {
    if (!itemsRaw) return;
    try {
      let rawData = itemsRaw;
      if (typeof itemsRaw === 'string') {
        const trimmed = itemsRaw.trim();
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
          // Fetch from URL
          const res = await fetch(trimmed);
          if (res.ok) {
            rawData = await res.json();
          }
        } else if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
          rawData = JSON.parse(trimmed);
        }
      }

      if (Array.isArray(rawData)) {
        // Map database array to BaoGiaSection
        const parsedSections: BaoGiaSection[] = rawData.map((sec: any, secIdx: number) => ({
          id: sec.id || `sec-${secIdx + 1}`,
          index: secIdx + 1,
          tenPhan: sec.name || sec.tenPhan || `PHẦN ${sec.stt || secIdx + 1}: ${sec.title || ''}`,
          ckChecked: sec.discountable !== undefined ? sec.discountable : (sec.ckChecked || false),
          collapsed: sec.collapsed || false,
          dongs: Array.isArray(sec.items)
            ? sec.items.map((row: any, rIdx: number) => ({
                id: row.id || `row-${secIdx}-${rIdx}`,
                stt: String(row.stt || rIdx + 1),
                congViec: row.name || row.congViec || '',
                loaiVatLieu: row.description || row.loaiVatLieu || '',
                soLuong: Number(row.qty !== undefined ? row.qty : row.soLuong) || 1,
                donVi: row.unit || row.donVi || 'Bộ',
                donGia: Number(row.unit_price !== undefined ? row.unit_price : row.donGia) || 0,
                checked: row.checked || false,
              }))
            : Array.isArray(sec.dongs)
            ? sec.dongs
            : [],
        }));

        if (parsedSections.length > 0) {
          setSections(parsedSections);
        }
      }
    } catch (err) {
      console.warn('Lỗi khi phân tích items_json:', err);
    }
  };

  useEffect(() => {
    if (template) {
      setFormData({ ...template });
      setActiveTab('settings');

      if (template.id && !template.id.startsWith('saved-')) {
        setIsLoading(true);
        getQuotationTemplateById(template.id)
          .then(async (detail) => {
            if (detail) {
              setFormData((prev: any) => prev ? ({
                ...prev,
                title: detail.template_name || prev.title,
                duAnMau: detail.project_name || prev.duAnMau,
                loaiBaoGia: detail.quote_type || prev.loaiBaoGia,
                langCode: detail.quote_language?.toUpperCase() === 'EN' ? 'GB' : detail.quote_language?.toUpperCase() === 'VI-EN' ? 'VNGB' : 'VN',
                tyLe: detail.scale || prev.tyLe,
                kichThuoc: detail.size || prev.kichThuoc,
                productionTime: `${detail.production_days || 60} ngày`,
                warrantyPeriod: `${detail.warranty_months || 18} tháng`,
                isSystem: detail.is_system !== false,
              }) : prev);

              if (detail.quote_type) setLoaiBaoGiaSelect(detail.quote_type);
              if (detail.production_days) setThoiGianSanXuat(parseFloat(String(detail.production_days)) || 60);
              if (detail.warranty_months) setBaoHanhThang(parseFloat(String(detail.warranty_months)) || 18);
              if (detail.vat_percent) setVatPercent(parseFloat(String(detail.vat_percent)) || 8);
              if (detail.payment_terms) setPhuongThucThanhToan(detail.payment_terms);

              // Parse notes
              if (detail.notes) {
                try {
                  const parsed = typeof detail.notes === 'string' ? JSON.parse(detail.notes) : detail.notes;
                  if (Array.isArray(parsed) && parsed.length > 0) {
                    setDieuKienList(parsed.map((n: any, idx: number) => ({
                      id: String(n.id || idx + 1),
                      tieuDe: n.title || n.tieuDe || `Điều kiện ${idx + 1}`,
                      noiDung: n.content || n.noiDung || '',
                    })));
                  }
                } catch (e) {
                  // ignore
                }
              }

              // Load items_json
              if (detail.items_json) {
                await loadItemsJson(detail.items_json);
              }
            }
          })
          .catch((err) => console.warn('Lỗi tải chi tiết template:', err))
          .finally(() => setIsLoading(false));
      }
    }
  }, [template]);

  if (!isOpen || !formData) return null;

  // Price calculations for Tab 2
  const subtotal = sections.reduce(
    (sum: number, sec: BaoGiaSection) =>
      sum + sec.dongs.reduce((sRow: number, d: HangMucDong) => sRow + (d.soLuong || 0) * (d.donGia || 0), 0),
    0
  );
  const discountVal = chietKhauChecked ? (subtotal * chietKhauPercent) / 100 : 0;
  const afterDiscount = subtotal - discountVal;
  const baseForVat = sauChietKhauChecked ? afterDiscount : subtotal;
  const vatVal = (baseForVat * vatPercent) / 100;
  const tongSauThue = afterDiscount + vatVal;

  // Xử lý Lưu thay đổi (Call API updateQuotationTemplate)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      setIsSaving(true);

      // 1. Chuyển đổi sections sang format items_json chuẩn
      const formattedItems = sections.map((sec, idx) => ({
        id: sec.id,
        stt: String(sec.index || idx + 1),
        name: sec.tenPhan,
        discountable: sec.ckChecked,
        items: sec.dongs.map((d, dIdx) => ({
          id: d.id,
          stt: d.stt || String(dIdx + 1),
          name: d.congViec,
          description: d.loaiVatLieu,
          qty: d.soLuong,
          unit: d.donVi,
          unit_price: d.donGia,
          total: (d.soLuong || 0) * (d.donGia || 0),
        })),
      }));

      // 2. Chuyển đổi điều kiện sang format notes chuẩn
      const formattedNotes = dieuKienList.map((dk) => ({
        id: dk.id,
        title: dk.tieuDe,
        content: dk.noiDung,
      }));

      // 3. Payload gửi API
      const payload = {
        template_name: formData.title,
        project_name: formData.duAnMau,
        quote_type: formData.loaiBaoGia || loaiBaoGiaSelect,
        quote_language: formData.langCode === 'GB' ? 'en' : 'vi',
        scale: formData.tyLe,
        size: formData.kichThuoc,
        is_system: formData.isSystem !== false,
        production_days: thoiGianSanXuat,
        warranty_months: baoHanhThang,
        vat_percent: vatPercent,
        payment_terms: phuongThucThanhToan,
        notes: JSON.stringify(formattedNotes),
        items_json: JSON.stringify(formattedItems),
      };

      if (formData.id && !formData.id.startsWith('saved-')) {
        await updateQuotationTemplate(formData.id, payload);
      }

      if (onSave) {
        onSave({
          ...formData,
          productionTime: `${thoiGianSanXuat} ngày`,
          warrantyPeriod: `${baoHanhThang} tháng`,
        });
      }

      if (onSaveSuccess) {
        onSaveSuccess();
      }

      NotificationExtension.Success(`Cập nhật template "${formData.title}" thành công!`);
      onClose();
    } catch (err) {
      console.error('Lỗi khi lưu template:', err);
      NotificationExtension.Fails('Không thể lưu cập nhật template!');
    } finally {
      setIsSaving(false);
    }
  };

  // --- Handlers for Tab 2: Danh mục & Giá ---
  const handleAddSection = () => {
    const newSec: BaoGiaSection = {
      id: `sec-${Date.now()}`,
      index: sections.length + 1,
      tenPhan: `PHẦN ${String.fromCharCode(65 + sections.length)}: HẠNG MỤC MỚI`,
      ckChecked: false,
      collapsed: false,
      dongs: [],
    };
    setSections([...sections, newSec]);
  };

  const handleUpdateSectionName = (id: string, name: string) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === id ? { ...sec, tenPhan: name } : sec))
    );
  };

  const handleToggleSectionCk = (id: string, checked: boolean) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === id ? { ...sec, ckChecked: checked } : sec))
    );
  };

  const handleToggleSectionCollapse = (id: string) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === id ? { ...sec, collapsed: !sec.collapsed } : sec))
    );
  };

  const handleDeleteSection = (id: string) => {
    setSections((prev) => prev.filter((sec) => sec.id !== id));
  };

  const handleAddRow = (sectionId: string) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId) {
          const newDong: HangMucDong = {
            id: `row-${Date.now()}`,
            stt: `${sec.dongs.length + 1}`,
            congViec: '',
            loaiVatLieu: '',
            soLuong: 1,
            donVi: 'Bộ',
            donGia: 0,
          };
          return { ...sec, dongs: [...sec.dongs, newDong] };
        }
        return sec;
      })
    );
  };

  const handleUpdateRow = (
    sectionId: string,
    rowId: string,
    field: keyof HangMucDong,
    value: any
  ) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            dongs: sec.dongs.map((d: HangMucDong) => (d.id === rowId ? { ...d, [field]: value } : d)),
          };
        }
        return sec;
      })
    );
  };

  const handleDeleteRow = (sectionId: string, rowId: string) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            dongs: sec.dongs.filter((d: HangMucDong) => d.id !== rowId),
          };
        }
        return sec;
      })
    );
  };

  const handleClearAllSections = () => {
    setSections([]);
  };

  // --- Handlers for Tab 3: Điều kiện & Thanh toán ---
  const handleAddDieuKien = () => {
    const newDK: DieuKienItem = {
      id: `dk-${Date.now()}`,
      tieuDe: `${dieuKienList.length + 1}. Điều kiện mới`,
      noiDung: '',
    };
    setDieuKienList([...dieuKienList, newDK]);
  };

  const handleUpdateDieuKien = (id: string, field: keyof DieuKienItem, value: string) => {
    setDieuKienList((prev) =>
      prev.map((dk) => (dk.id === id ? { ...dk, [field]: value } : dk))
    );
  };

  const handleDeleteDieuKien = (id: string) => {
    setDieuKienList((prev) => prev.filter((dk) => dk.id !== id));
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-4xl overflow-hidden animate-scale-up flex flex-col h-[90vh] max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <IconPencil size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 tracking-tight">
                Chỉnh sửa Template Báo giá
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {isLoading ? 'Đang tải dữ liệu template...' : (formData.title || 'Mẫu chưa đặt tên')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* 3 Tabs Navigation Bar */}
        <div className="px-6 border-b border-slate-100 flex gap-6 bg-white shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 py-3 border-b-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'border-[#406c89] text-[#406c89]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <IconSettings size={15} />
            <span>1. Cài đặt mẫu</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('items')}
            className={`flex items-center gap-2 py-3 border-b-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'items'
                ? 'border-[#406c89] text-[#406c89]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <IconListDetails size={15} />
            <span>2. Danh mục & Giá ({sections.length} phần)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 py-3 border-b-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'border-[#406c89] text-[#406c89]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <IconReceipt size={15} />
            <span>3. Điều kiện & Thanh toán ({dieuKienList.length})</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            
            {/* TAB 1: CÀI ĐẶT MẪU */}
            {activeTab === 'settings' && (
              <CaiDatMauTab formData={formData} setFormData={setFormData} />
            )}

            {/* TAB 2: DANH MỤC & GIÁ */}
            {activeTab === 'items' && (
              <DanhMucGiaTabWrapper
                sections={sections}
                onAddSection={handleAddSection}
                onUpdateSectionName={handleUpdateSectionName}
                onToggleSectionCk={handleToggleSectionCk}
                onToggleSectionCollapse={handleToggleSectionCollapse}
                onDeleteSection={handleDeleteSection}
                onAddRow={handleAddRow}
                onUpdateRow={handleUpdateRow}
                onDeleteRow={handleDeleteRow}
                onClearAllSections={handleClearAllSections}
                loaiBaoGiaSelect={loaiBaoGiaSelect}
                setLoaiBaoGiaSelect={setLoaiBaoGiaSelect}
                chietKhauChecked={chietKhauChecked}
                setChietKhauChecked={setChietKhauChecked}
                sauChietKhauChecked={sauChietKhauChecked}
                setSauChietKhauChecked={setSauChietKhauChecked}
                chietKhauPercent={chietKhauPercent}
                setChietKhauPercent={setChietKhauPercent}
                vatPercent={vatPercent}
                setVatPercent={setVatPercent}
                subtotal={subtotal}
                discountVal={discountVal}
                afterDiscount={afterDiscount}
                vatVal={vatVal}
                tongSauThue={tongSauThue}
              />
            )}

            {/* TAB 3: ĐIỀU KIỆN & THANH TOÁN */}
            {activeTab === 'terms' && (
              <DieuKienThanhToanTabWrapper
                thoiGianSanXuat={thoiGianSanXuat}
                setThoiGianSanXuat={setThoiGianSanXuat}
                baoHanhThang={baoHanhThang}
                setBaoHanhThang={setBaoHanhThang}
                phuongThucThanhToan={phuongThucThanhToan}
                setPhuongThucThanhToan={setPhuongThucThanhToan}
                dieuKienList={dieuKienList}
                onAddDieuKien={handleAddDieuKien}
                onUpdateDieuKien={handleUpdateDieuKien}
                onDeleteDieuKien={handleDeleteDieuKien}
              />
            )}

          </div>

          {/* Footer Buttons */}
          <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-end gap-2.5 bg-slate-50/60 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-1.5 px-5 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <IconLoader2 size={16} className="animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <IconCheck size={16} />
                  <span>Lưu thay đổi</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
