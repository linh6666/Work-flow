"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconPencil,
  IconCheck,
  IconSettings,
  IconListDetails,
  IconReceipt
} from '@tabler/icons-react';
import { SavedTemplateItem } from '../../index';
import { BaoGiaSection, HangMucDong } from '../../../DanhMucGia';
import { DieuKienItem } from '../../../DieuKienBaoGia';

import CaiDatMauTab from './CaiDatMau';
import DanhMucGiaTabWrapper from './DanhMucGia';
import DieuKienThanhToanTabWrapper from './DieuKienThanhToan';

interface ChinhSuaTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: SavedTemplateItem | null;
  onSave: (updatedTemplate: SavedTemplateItem) => void;
}

const DEFAULT_SECTIONS: BaoGiaSection[] = [
  {
    id: 'sec-1',
    index: 1,
    tenPhan: 'PHẦN A: MÔ HÌNH KIẾN TRÚC & QUY HOẠCH',
    ckChecked: false,
    collapsed: false,
    dongs: [
      {
        id: 'row-1',
        stt: '1',
        congViec: 'Chế tạo Khối công trình chính',
        loaiVatLieu: 'Chất liệu mica cao cấp nhập khẩu, sơn bóng phủ PU 2K',
        soLuong: 1,
        donVi: 'Bộ',
        donGia: 120000000,
      },
      {
        id: 'row-2',
        stt: '2',
        congViec: 'Hệ thống Ánh sáng Led thông minh',
        loaiVatLieu: 'Led chíp Samsung, nguồn Meanwell 12V, lập trình vi điều khiển',
        soLuong: 1,
        donVi: 'Gói',
        donGia: 35000000,
      },
    ],
  },
  {
    id: 'sec-2',
    index: 2,
    tenPhan: 'PHẦN B: CHÂN ĐẾ MÔ HÌNH & BÀN NÂNG',
    ckChecked: false,
    collapsed: false,
    dongs: [
      {
        id: 'row-3',
        stt: '1',
        congViec: 'Chân đế khung thép hộp 40x80mm',
        loaiVatLieu: 'Thép mạ kẽm, ốp gỗ công nghiệp MDF chống ẩm An Cường',
        soLuong: 1,
        donVi: 'Bộ',
        donGia: 25000000,
      },
    ],
  },
];

const DEFAULT_DIEU_KIEN: DieuKienItem[] = [
  {
    id: 'dk-1',
    tieuDe: '1. Báo giá dựa trên hồ sơ thiết kế',
    noiDung: 'Giá trên được tính toán dựa trên file bản vẽ CAD/3D do bên A cung cấp. Trường hợp có chỉnh sửa thiết kế trong quá trình thi công sẽ tính phát sinh theo thỏa thuận.',
  },
  {
    id: 'dk-2',
    tieuDe: '2. Phạm vi bàn giao và lắp đặt',
    noiDung: 'Bao gồm chi phí vận chuyển và lắp đặt hoàn thiện tại địa điểm của bên A trong phạm vi nội thành.',
  },
];

export default function ChinhSuaTemplateModal({
  isOpen,
  onClose,
  template,
  onSave,
}: ChinhSuaTemplateModalProps) {
  const [activeTab, setActiveTab] = useState<'settings' | 'items' | 'terms'>('settings');
  
  // Tab 1: Cài đặt mẫu state
  const [formData, setFormData] = useState<SavedTemplateItem | null>(null);

  // Tab 2: Danh mục & Giá state
  const [sections, setSections] = useState<BaoGiaSection[]>(DEFAULT_SECTIONS);
  const [loaiBaoGiaSelect, setLoaiBaoGiaSelect] = useState('Mô hình Quy hoạch');
  const [chietKhauChecked, setChietKhauChecked] = useState(false);
  const [sauChietKhauChecked, setSauChietKhauChecked] = useState(false);
  const [chietKhauPercent, setChietKhauPercent] = useState(0);
  const [vatPercent, setVatPercent] = useState(10);

  // Tab 3: Điều kiện & Thanh toán state
  const [thoiGianSanXuat, setThoiGianSanXuat] = useState(60);
  const [baoHanhThang, setBaoHanhThang] = useState(18);
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState(
    '— Đợt 1: Tạm ứng 40% giá trị hợp đồng ngay sau khi ký hợp đồng.\n— Đợt 2: Thanh toán 40% sau khi duyệt xong khối công trình thô.\n— Đợt 3: Thanh toán 20% còn lại sau khi bàn giao, nghiệm thu.'
  );
  const [dieuKienList, setDieuKienList] = useState<DieuKienItem[]>(DEFAULT_DIEU_KIEN);

  useEffect(() => {
    if (template) {
      setFormData({ ...template });
      setActiveTab('settings');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
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
            <div className="w-8 h-8 rounded-xl bg-[#406c89]/10 text-[#406c89] flex items-center justify-center shrink-0">
              <IconPencil size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base tracking-tight">
                Chỉnh sửa Template Báo giá
              </h3>
              <p className="text-[11px] text-slate-400 font-normal">Chỉnh sửa chi tiết thông tin mẫu, danh mục giá và điều kiện thanh toán</p>
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

        {/* 3 Tabs Header Bar */}
        <div className="px-6 border-b border-slate-100 flex gap-6 shrink-0 bg-slate-50/50 select-none">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`py-3 flex items-center gap-2 border-b-2 text-xs font-bold transition-all cursor-pointer focus:outline-none ${
              activeTab === 'settings'
                ? 'border-[#406c89] text-[#406c89]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconSettings size={16} />
            <span>Cài đặt mẫu</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('items')}
            className={`py-3 flex items-center gap-2 border-b-2 text-xs font-bold transition-all cursor-pointer focus:outline-none ${
              activeTab === 'items'
                ? 'border-[#406c89] text-[#406c89]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconListDetails size={16} />
            <span>Danh mục & Giá</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === 'items' ? 'bg-[#406c89]/10 text-[#406c89]' : 'bg-slate-200 text-slate-600'
            }`}>
              {sections.reduce((sum, sec) => sum + sec.dongs.length, 0)}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`py-3 flex items-center gap-2 border-b-2 text-xs font-bold transition-all cursor-pointer focus:outline-none ${
              activeTab === 'terms'
                ? 'border-[#406c89] text-[#406c89]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconReceipt size={16} />
            <span>Điều kiện & Thanh toán</span>
          </button>
        </div>

        {/* Scrollable Form Content based on active tab */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 overflow-y-auto flex-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            
            {/* TAB 1: CÀI ĐẶT MẪU */}
            {activeTab === 'settings' && (
              <CaiDatMauTab
                formData={formData}
                setFormData={setFormData}
              />
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
              className="px-4 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              <IconCheck size={16} />
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
