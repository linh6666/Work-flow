"use client";

import React, { useState } from 'react';
import {
  IconGripVertical,
  IconPlus,
  IconTrash,
  IconChevronUp,
  IconChevronDown,
  IconRefresh,
  IconUpload
} from '@tabler/icons-react';

export interface HangMucDong {
  id: string;
  stt: string;
  congViec: string;
  loaiVatLieu: string;
  soLuong: number;
  donVi: string;
  donGia: number;
  checked?: boolean;
}

export interface BaoGiaSection {
  id: string;
  romanIdx: string;
  tenPhan: string;
  ckChecked: boolean;
  collapsed: boolean;
  dongs: HangMucDong[];
}

const INITIAL_SECTIONS: BaoGiaSection[] = [
  {
    id: 'sec-1',
    romanIdx: 'I',
    tenPhan: 'PODIUM & MODEL STAND',
    ckChecked: true,
    collapsed: false,
    dongs: [
      {
        id: 'r-1',
        stt: '1',
        congViec: 'PODIUM & BOARD',
        loaiVatLieu: 'Steel frame and MDF board with protective coating',
        soLuong: 2.5,
        donVi: 'md',
        donGia: 1000000,
        checked: false,
      },
      {
        id: 'r-2',
        stt: '2',
        congViec: 'WOOD BASE',
        loaiVatLieu: 'Wood base for model framing',
        soLuong: 2.5,
        donVi: 'md',
        donGia: 1000000,
        checked: false,
      },
      {
        id: 'r-3',
        stt: '3',
        congViec: 'MODEL STAND',
        loaiVatLieu: 'Model Stand type 2: Curving Model Stand',
        soLuong: 3,
        donVi: 'm2',
        donGia: 8500000,
        checked: false,
      },
    ],
  },
  {
    id: 'sec-2',
    romanIdx: 'II',
    tenPhan: 'BUILDING STRUCTURE',
    ckChecked: true,
    collapsed: false,
    dongs: [
      {
        id: 'r-4',
        stt: '1',
        congViec: 'ARCHITECTURAL',
        loaiVatLieu: 'Buildings cut from CAD drawings, laser cutting and assembly',
        soLuong: 1.5,
        donVi: 'm²',
        donGia: 80000000,
        checked: false,
      },
      {
        id: 'r-5',
        stt: '2',
        congViec: 'INTERIOR DETAILS',
        loaiVatLieu: 'Interior furnishings and detailed decorations',
        soLuong: 1,
        donVi: 'Set',
        donGia: 25000000,
        checked: false,
      },
    ],
  },
  {
    id: 'sec-3',
    romanIdx: 'III',
    tenPhan: 'LANDSCAPE AND LOW-RISE',
    ckChecked: true,
    collapsed: false,
    dongs: [
      {
        id: 'r-6',
        stt: '1',
        congViec: 'GROUND AND LAN',
        loaiVatLieu: 'Ground base, roads, plants and landscape elements',
        soLuong: 1.5,
        donVi: 'm²',
        donGia: 35000000,
        checked: false,
      },
    ],
  },
  {
    id: 'sec-4',
    romanIdx: 'IV',
    tenPhan: 'LIGHTING & ACCESSORIES',
    ckChecked: true,
    collapsed: false,
    dongs: [
      {
        id: 'r-7',
        stt: '1',
        congViec: 'STANDARD LIGHT',
        loaiVatLieu: 'Material: Ultra-bright LED lighting system installed inside',
        soLuong: 2,
        donVi: 'set',
        donGia: 40000000,
        checked: false,
      },
      {
        id: 'r-8',
        stt: '2',
        congViec: 'PROTECTIVE GLA:',
        loaiVatLieu: 'Tempered glass 10mm, height 400mm according to design',
        soLuong: 3.2,
        donVi: 'm2',
        donGia: 4500000,
        checked: false,
      },
      {
        id: 'r-9',
        stt: '3',
        congViec: 'TRANSPORTATION',
        loaiVatLieu: 'Transportation and installation service for model (1 time).',
        soLuong: 1,
        donVi: 'time',
        donGia: 18000000,
        checked: false,
      },
    ],
  },
];

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export default function DanhMucGiaTabWrapper(_props?: any) {
  const [sections, setSections] = useState<BaoGiaSection[]>(INITIAL_SECTIONS);
  const [chietKhauPercent, setChietKhauPercent] = useState<number>(0);
  const [vatPercent, setVatPercent] = useState<number>(8);

  // Helper calculations
  const calculateSectionTotal = (sec: BaoGiaSection) => {
    return sec.dongs.reduce((sum, item) => sum + (item.soLuong || 0) * (item.donGia || 0), 0);
  };

  const totalBeforeDiscount = sections.reduce((sum, sec) => sum + calculateSectionTotal(sec), 0);
  const discountVal = (totalBeforeDiscount * (chietKhauPercent || 0)) / 100;
  const afterDiscount = totalBeforeDiscount - discountVal;
  const vatVal = (afterDiscount * (vatPercent || 0)) / 100;
  const totalAfterVat = afterDiscount + vatVal;

  // Handlers
  const handleAddSection = () => {
    const nextRoman = ROMAN_NUMERALS[sections.length] || `${sections.length + 1}`;
    const newSec: BaoGiaSection = {
      id: `sec-${Date.now()}`,
      romanIdx: nextRoman,
      tenPhan: 'TÊN PHẦN MỚI',
      ckChecked: true,
      collapsed: false,
      dongs: [],
    };
    setSections([...sections, newSec]);
  };

  const handleUpdateSectionName = (id: string, name: string) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, tenPhan: name } : s)));
  };

  const handleToggleSectionCk = (id: string, checked: boolean) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ckChecked: checked } : s)));
  };

  const handleToggleCollapse = (id: string) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, collapsed: !s.collapsed } : s)));
  };

  const handleDeleteSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const handleClearAll = () => {
    setSections([]);
  };

  const handleAddRow = (sectionId: string) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId) {
          const newDong: HangMucDong = {
            id: `r-${Date.now()}`,
            stt: `${sec.dongs.length + 1}`,
            congViec: 'TÊN HẠNG MỤC MỚI',
            loaiVatLieu: '',
            soLuong: 1,
            donVi: 'Bộ',
            donGia: 0,
            checked: false,
          };
          return { ...sec, dongs: [...sec.dongs, newDong] };
        }
        return sec;
      })
    );
  };

  const handleUpdateRow = (sectionId: string, rowId: string, field: keyof HangMucDong, value: any) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            dongs: sec.dongs.map((d) => (d.id === rowId ? { ...d, [field]: value } : d)),
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
            dongs: sec.dongs.filter((d) => d.id !== rowId),
          };
        }
        return sec;
      })
    );
  };

  return (
    <div className="space-y-5 animate-fade-in text-xs text-slate-700">
      
      {/* 1. TOP TITLE & ACTION BUTTONS BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 select-none pb-1">
        <h4 className="font-bold text-slate-900 text-sm tracking-tight">
          Danh mục hạng mục
        </h4>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
          >
            <IconRefresh size={14} className="text-slate-500" />
            <span>Thêm mẫu báo giá</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
          >
            <IconUpload size={14} className="text-slate-500" />
            <span>Import Excel</span>
          </button>

          <button
            type="button"
            onClick={handleClearAll}
            className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            Xóa tất cả
          </button>

          <button
            type="button"
            onClick={handleAddSection}
            className="flex items-center gap-1 px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
          >
            <IconPlus size={14} className="text-slate-600" />
            <span>Thêm phần</span>
          </button>
        </div>
      </div>

      {/* 2. SECTIONS LIST */}
      <div className="space-y-4">
        {sections.map((sec) => {
          const secTotal = calculateSectionTotal(sec);
          return (
            <div
              key={sec.id}
              className="bg-[#f8fafc]/80 border border-slate-200 rounded-2xl overflow-hidden shadow-2xs"
            >
              {/* Section Header Row */}
              <div className="p-3.5 bg-white border-b border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <IconGripVertical size={16} className="text-slate-300 cursor-grab shrink-0" />
                  
                  {/* Roman Index Badge */}
                  <span className="px-2 py-0.5 border border-slate-200 bg-slate-50 rounded-md text-[11px] font-bold font-mono text-slate-700 shrink-0">
                    {sec.romanIdx}
                  </span>

                  {/* Section Title Input */}
                  <input
                    type="text"
                    value={sec.tenPhan}
                    onChange={(e) => handleUpdateSectionName(sec.id, e.target.value)}
                    className="flex-1 font-extrabold text-slate-900 text-xs uppercase tracking-wide bg-transparent focus:outline-none focus:bg-slate-50 px-2 py-1 rounded"
                  />
                </div>

                <div className="flex items-center gap-3 shrink-0 select-none">
                  {/* Section Subtotal */}
                  <span className="font-extrabold text-[#406c89] text-xs">
                    {secTotal.toLocaleString('vi-VN')}đ
                  </span>

                  {/* CK Checkbox */}
                  <label className="flex items-center gap-1 text-[11px] font-bold text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sec.ckChecked}
                      onChange={(e) => handleToggleSectionCk(sec.id, e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-[#406c89] focus:ring-[#406c89]"
                    />
                    <span>CK</span>
                  </label>

                  {/* Collapse Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleCollapse(sec.id)}
                    className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    {sec.collapsed ? <IconChevronDown size={16} /> : <IconChevronUp size={16} />}
                  </button>

                  {/* Delete Section */}
                  <button
                    type="button"
                    onClick={() => handleDeleteSection(sec.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>

              {/* Section Body (Table & Add Row button) */}
              {!sec.collapsed && (
                <div className="p-3.5 space-y-3">
                  
                  {/* Table Header Row */}
                  <div className="grid grid-cols-[20px_20px_1.5fr_2fr_70px_60px_80px_110px_24px] gap-2 items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                    <span></span>
                    <span></span>
                    <span>STT CÔNG VIỆC</span>
                    <span>LOẠI VẬT LIỆU</span>
                    <span className="text-center">SỐ LƯỢNG</span>
                    <span className="text-center">ĐƠN VỊ</span>
                    <span className="text-right">ĐƠN GIÁ</span>
                    <span className="text-right">THÀNH TIỀN</span>
                    <span></span>
                  </div>

                  {/* Table Rows */}
                  <div className="space-y-2">
                    {sec.dongs.map((row) => {
                      const rowTotal = (row.soLuong || 0) * (row.donGia || 0);
                      return (
                        <div
                          key={row.id}
                          className="grid grid-cols-[20px_20px_1.5fr_2fr_70px_60px_80px_110px_24px] gap-2 items-center text-xs py-1"
                        >
                          {/* Drag handle */}
                          <IconGripVertical size={15} className="text-slate-300 cursor-grab" />

                          {/* Checkbox */}
                          <input
                            type="checkbox"
                            checked={row.checked || false}
                            onChange={(e) => handleUpdateRow(sec.id, row.id, 'checked', e.target.checked)}
                            className="w-3.5 h-3.5 rounded border-slate-300 text-[#406c89] focus:ring-[#406c89]"
                          />

                          {/* CÔNG VIỆC */}
                          <input
                            type="text"
                            value={row.congViec}
                            onChange={(e) => handleUpdateRow(sec.id, row.id, 'congViec', e.target.value)}
                            placeholder="Tên hạng mục..."
                            className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-extrabold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] uppercase"
                          />

                          {/* LOẠI VẬT LIỆU */}
                          <input
                            type="text"
                            value={row.loaiVatLieu}
                            onChange={(e) => handleUpdateRow(sec.id, row.id, 'loaiVatLieu', e.target.value)}
                            placeholder="Mô tả vật liệu..."
                            className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 font-normal focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                          />

                          {/* SỐ LƯỢNG */}
                          <input
                            type="number"
                            step="0.1"
                            value={row.soLuong}
                            onChange={(e) => handleUpdateRow(sec.id, row.id, 'soLuong', parseFloat(e.target.value) || 0)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-semibold text-slate-800 text-center focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                          />

                          {/* ĐƠN VỊ */}
                          <input
                            type="text"
                            value={row.donVi}
                            onChange={(e) => handleUpdateRow(sec.id, row.id, 'donVi', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-semibold text-slate-700 text-center focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                          />

                          {/* ĐƠN GIÁ */}
                          <input
                            type="number"
                            value={row.donGia}
                            onChange={(e) => handleUpdateRow(sec.id, row.id, 'donGia', parseFloat(e.target.value) || 0)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-semibold text-slate-800 text-right focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                          />

                          {/* THÀNH TIỀN */}
                          <span className="font-extrabold text-[#406c89] text-xs text-right truncate">
                            VNĐ {rowTotal.toLocaleString('vi-VN')}
                          </span>

                          {/* Delete Row Button */}
                          <button
                            type="button"
                            onClick={() => handleDeleteRow(sec.id, row.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer text-right"
                          >
                            <IconTrash size={15} />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Row Button */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => handleAddRow(sec.id)}
                      className="flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-[#406c89] cursor-pointer"
                    >
                      <IconPlus size={14} />
                      <span>Thêm dòng</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. BOTTOM SUMMARY SECTION */}
      <div className="space-y-3 pt-2 select-none">
        {/* Total Before Tax Box (Top Right Card) */}
        <div className="p-4 border border-[#406c89]/20 bg-[#406c89]/5 rounded-2xl w-[280px] ml-auto text-right space-y-1">
          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">TỔNG GIÁ TRỊ TRƯỚC THUẾ</div>
          <div className="text-xl font-black text-[#406c89]">
            VNĐ {totalBeforeDiscount.toLocaleString('vi-VN')}
          </div>
        </div>

        {/* Calculation Table */}
        <div className="p-5 border border-slate-200/90 bg-white rounded-2xl space-y-3.5 text-xs">
          
          {/* Row 1: Tổng trước chiết khấu */}
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium text-xs">Tổng trước chiết khấu</span>
            <span className="font-bold text-slate-800 text-xs">
              VNĐ {totalBeforeDiscount.toLocaleString('vi-VN')}
            </span>
          </div>

          {/* Row 2: Chiết khấu (%) */}
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium text-xs">Chiết khấu (%)</span>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="100"
                value={chietKhauPercent}
                onChange={(e) => setChietKhauPercent(parseFloat(e.target.value) || 0)}
                className="w-16 h-7 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
              <span className="font-bold text-slate-800 text-xs w-[120px] text-right">
                -VNĐ {discountVal.toLocaleString('vi-VN')}
              </span>
            </div>
          </div>

          {/* Row 3: Sau chiết khấu */}
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium text-xs">Sau chiết khấu</span>
            <span className="font-bold text-slate-800 text-xs">
              VNĐ {afterDiscount.toLocaleString('vi-VN')}
            </span>
          </div>

          {/* Row 4: VAT (%) */}
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium text-xs">VAT (%)</span>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="100"
                value={vatPercent}
                onChange={(e) => setVatPercent(parseFloat(e.target.value) || 0)}
                className="w-16 h-7 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
              <span className="font-bold text-slate-800 text-xs w-[120px] text-right">
                VNĐ {vatVal.toLocaleString('vi-VN')}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 pt-1"></div>

          {/* Final Total Row */}
          <div className="flex items-center justify-between">
            <span className="text-slate-900 font-bold text-xs uppercase tracking-tight">TỔNG GIÁ TRỊ SAU THUẾ</span>
            <span className="font-black text-[#406c89] text-base">
              VNĐ {totalAfterVat.toLocaleString('vi-VN')}
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
