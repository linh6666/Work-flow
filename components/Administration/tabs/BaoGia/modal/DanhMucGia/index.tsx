"use client";

import React from 'react';
import { 
  IconLink, 
  IconFileText, 
  IconRefresh, 
  IconUpload,
  IconTrash,
  IconGripVertical,
  IconChevronUp,
  IconChevronDown
} from '@tabler/icons-react';

export interface HangMucDong {
  id: string;
  stt: string;
  congViec: string;
  loaiVatLieu: string;
  soLuong: number;
  donVi: string;
  donGia: number;
}

export interface BaoGiaSection {
  id: string;
  index: number;
  tenPhan: string;
  ckChecked: boolean;
  collapsed: boolean;
  dongs: HangMucDong[];
}

interface DanhMucGiaTabProps {
  sections: BaoGiaSection[];
  onAddSection: () => void;
  onUpdateSectionName: (id: string, name: string) => void;
  onToggleSectionCk: (id: string, checked: boolean) => void;
  onToggleSectionCollapse: (id: string) => void;
  onDeleteSection: (id: string) => void;
  
  onAddRow: (sectionId: string) => void;
  onUpdateRow: (sectionId: string, rowId: string, field: keyof HangMucDong, value: any) => void;
  onDeleteRow: (sectionId: string, rowId: string) => void;
  onClearAllSections: () => void;
  
  loaiBaoGiaSelect: string;
  setLoaiBaoGiaSelect: (v: string) => void;
  onLoadTemplate: () => void;
  onAddTemplateItem: () => void;
  onImportExcel: () => void;
  
  chietKhauChecked: boolean;
  setChietKhauChecked: (v: boolean) => void;
  sauChietKhauChecked: boolean;
  setSauChietKhauChecked: (v: boolean) => void;
  chietKhauPercent: number;
  setChietKhauPercent: (v: number) => void;
  vatPercent: number;
  setVatPercent: (v: number) => void;
  
  subtotal: number;
  discountVal: number;
  afterDiscount: number;
  vatVal: number;
  tongSauThue: number;
}

export default function DanhMucGiaTab({
  sections,
  onAddSection,
  onUpdateSectionName,
  onToggleSectionCk,
  onToggleSectionCollapse,
  onDeleteSection,
  onAddRow,
  onUpdateRow,
  onDeleteRow,
  onClearAllSections,
  loaiBaoGiaSelect,
  setLoaiBaoGiaSelect,
  onLoadTemplate,
  chietKhauChecked,
  setChietKhauChecked,
  sauChietKhauChecked,
  setSauChietKhauChecked,
  chietKhauPercent,
  setChietKhauPercent,
  vatPercent,
  setVatPercent,
  subtotal,
  discountVal,
  afterDiscount,
  vatVal,
  tongSauThue,
  onAddTemplateItem,
  onImportExcel,
}: DanhMucGiaTabProps) {
  return (
    <div className="space-y-5 animate-fade-in text-[13px] text-slate-700">
      
      {/* 1. TOP SELECTION CARD (BLUE CONTAINER) */}
      <div className="p-4 bg-[#406c89]/5 border border-[#406c89]/20 rounded-xl space-y-2.5 select-none">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-700 shrink-0">Loại báo giá:</span>
          <select
            value={loaiBaoGiaSelect}
            onChange={(e) => setLoaiBaoGiaSelect(e.target.value)}
            className="flex-1 text-xs bg-white border border-slate-200 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#406c89] h-9 text-slate-800"
          >
            <option value="Mô hình Quy hoạch">Báo giá Mô hình Quy hoạch</option>
            <option value="Mô hình Kiến trúc">Báo giá Mô hình Kiến trúc</option>
            <option value="Mô hình Nội thất">Báo giá Mô hình Nội thất</option>
            <option value="Khác">Báo giá Khác</option>
          </select>
          <button
            type="button"
            onClick={onLoadTemplate}
            className="flex items-center gap-1.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-700 cursor-pointer shadow-xs shrink-0 h-9"
          >
            <IconLink size={13} className="text-slate-500" />
            Load
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-[#406c89] font-medium">
          <IconFileText size={15} className="text-[#406c89] shrink-0" />
          <span>Chọn loại báo giá phù hợp với ngôn ngữ Tiếng Việt — Nhấn <strong>Load</strong> để nạp chi tiết template</span>
        </div>
      </div>

      {/* 2. HEADER BUTTONS FOR ITEMS */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 select-none">
        <span className="text-sm font-bold text-slate-800">Danh mục hạng mục</span>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAddTemplateItem}
            className="flex items-center gap-1.5 px-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 cursor-pointer shadow-xs text-xs h-9"
          >
            <IconRefresh size={14} className="text-slate-500" />
            Thêm mẫu báo giá
          </button>
          <button
            type="button"
            onClick={onImportExcel}
            className="flex items-center gap-1.5 px-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 cursor-pointer shadow-xs text-xs h-9"
          >
            <IconUpload size={14} className="text-slate-500" />
            Import Excel
          </button>
          
          {sections.length > 0 && (
            <button
              type="button"
              onClick={onClearAllSections}
              className="text-slate-500 hover:text-red-600 font-semibold px-2 py-1 cursor-pointer text-xs transition-colors"
            >
              Xóa tất cả
            </button>
          )}
          
          <button
            type="button"
            onClick={onAddSection}
            className="flex items-center gap-1.5 px-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 cursor-pointer shadow-xs text-xs h-9"
          >
            <span className="text-slate-500 font-bold text-sm">+</span>
            Thêm phần
          </button>
        </div>
      </div>

      {/* 3. SECTIONS & ROWS CONTAINER (DYNAMIC DND TABLE MOCKUP) */}
      <div className="space-y-4 max-h-[35vh] overflow-y-auto no-scrollbar pr-1">
        {sections.map((section) => (
          <div key={section.id} className="border border-slate-200 bg-[#fafbfc]/30 rounded-xl overflow-hidden shadow-2xs">
            {/* Section Header Row */}
            <div className="flex items-center justify-between p-3 bg-slate-50/50 border-b border-slate-100 gap-3 select-none">
              <div className="flex items-center gap-2 flex-1">
                <IconGripVertical size={16} className="text-slate-400 cursor-grab active:cursor-grabbing" />
                <div className="w-6 h-6 flex items-center justify-center bg-white border border-slate-200 rounded text-slate-700 font-bold text-xs">
                  {section.index}
                </div>
                <input
                  type="text"
                  required
                  value={section.tenPhan}
                  onChange={(e) => onUpdateSectionName(section.id, e.target.value)}
                  className="bg-white border border-slate-200 rounded px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] w-64 uppercase"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 font-semibold text-xs">
                  <input
                    type="checkbox"
                    checked={section.ckChecked}
                    onChange={(e) => onToggleSectionCk(section.id, e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-[#406c89] focus:ring-[#406c89]"
                  />
                  CK
                </label>
                <button
                  type="button"
                  onClick={() => onToggleSectionCollapse(section.id)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded transition-all cursor-pointer"
                >
                  {section.collapsed ? <IconChevronDown size={16} /> : <IconChevronUp size={16} />}
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteSection(section.id)}
                  className="p-1 text-slate-400 hover:text-red-500 rounded transition-all cursor-pointer"
                >
                  <IconTrash size={16} />
                </button>
              </div>
            </div>

            {/* Section content (dongs) */}
            {!section.collapsed && (
              <div className="bg-white">
                {/* Table Header */}
                <div className="flex items-center gap-3 px-3 py-2 bg-slate-50/20 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center select-none">
                  <div className="w-14 shrink-0">STT</div>
                  <div className="flex-[1.5] text-left">CÔNG VIỆC</div>
                  <div className="flex-[2.5] text-left">LOẠI VẬT LIỆU</div>
                  <div className="w-20 shrink-0">SỐ LƯỢNG</div>
                  <div className="w-16 shrink-0">ĐƠN VỊ</div>
                  <div className="w-24 shrink-0 text-right">ĐƠN GIÁ</div>
                  <div className="w-28 shrink-0 text-right pr-2">THÀNH TIỀN</div>
                </div>

                {/* Rows List */}
                <div className="divide-y divide-slate-100/60">
                  {section.dongs.map((dong) => (
                    <div key={dong.id} className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50/20">
                      {/* Handle + Checkbox */}
                      <div className="w-14 shrink-0 flex items-center justify-center gap-1.5 select-none">
                        <IconGripVertical size={14} className="text-slate-400 cursor-grab" />
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-3.5 h-3.5 rounded border-slate-300 text-[#406c89] focus:ring-[#406c89]"
                        />
                      </div>
                      
                      {/* CÔNG VIỆC */}
                      <div className="flex-[1.5]">
                        <input
                          type="text"
                          required
                          value={dong.congViec}
                          onChange={(e) => onUpdateRow(section.id, dong.id, 'congViec', e.target.value)}
                          placeholder="TÊN HẠNG MỤC"
                          className="w-full text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#406c89] text-slate-800"
                        />
                      </div>

                      {/* LOẠI VẬT LIỆU */}
                      <div className="flex-[2.5]">
                        <textarea
                          rows={1}
                          value={dong.loaiVatLieu}
                          onChange={(e) => onUpdateRow(section.id, dong.id, 'loaiVatLieu', e.target.value)}
                          placeholder="Mô tả..."
                          className="w-full text-xs bg-white border border-slate-200 rounded px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#406c89] text-slate-700 leading-normal resize-none h-7 overflow-hidden"
                        />
                      </div>

                      {/* SỐ LƯỢNG */}
                      <div className="w-20 shrink-0">
                        <input
                          type="number"
                          min="1"
                          required
                          value={dong.soLuong}
                          onChange={(e) => onUpdateRow(section.id, dong.id, 'soLuong', parseInt(e.target.value) || 1)}
                          className="w-full text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#406c89] text-slate-800 text-center h-8"
                        />
                      </div>

                      {/* ĐƠN VỊ */}
                      <div className="w-16 shrink-0">
                        <input
                          type="text"
                          required
                          value={dong.donVi}
                          onChange={(e) => onUpdateRow(section.id, dong.id, 'donVi', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#406c89] text-slate-800 text-center h-8"
                        />
                      </div>

                      {/* ĐƠN GIÁ */}
                      <div className="w-24 shrink-0">
                        <input
                          type="number"
                          min="0"
                          required
                          value={dong.donGia}
                          onChange={(e) => onUpdateRow(section.id, dong.id, 'donGia', parseFloat(e.target.value) || 0)}
                          className="w-full text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#406c89] text-slate-800 text-right h-8"
                        />
                      </div>

                      {/* THÀNH TIỀN & DELETE */}
                      <div className="w-28 shrink-0 flex justify-between items-center pl-2 select-none">
                        <span className="text-slate-800 font-bold text-xs text-right flex-1 pr-2.5">
                          {dong.donGia ? `VNĐ ${(dong.soLuong * dong.donGia).toLocaleString('vi-VN')}` : '—'}
                        </span>
                        <button
                          type="button"
                          onClick={() => onDeleteRow(section.id, dong.id)}
                          className="text-slate-400 hover:text-red-500 cursor-pointer"
                        >
                          <IconTrash size={15} />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Add Row Button footer */}
                <div className="p-3.5 bg-slate-50/10 border-t border-slate-100 select-none">
                  <button
                    type="button"
                    onClick={() => onAddRow(section.id)}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#406c89] hover:underline cursor-pointer"
                  >
                    <span className="text-sm font-bold">+</span>
                    Thêm dòng
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 4. TOTAL BEFORE TAX BOX */}
      {sections.length > 0 && (
        <div className="p-4 border border-[#406c89]/20 bg-[#406c89]/5 rounded-xl w-[260px] ml-auto text-right space-y-1 select-none">
          <div className="text-[10px] font-bold text-slate-400 tracking-wider">TỔNG GIÁ TRỊ TRƯỚC THUẾ</div>
          <div className="text-xl font-black text-[#406c89]">
            VNĐ {subtotal.toLocaleString('vi-VN')}
          </div>
        </div>
      )}

      {/* 5. PRICE CALCULATION SUMMARY CARD */}
      <div className="p-5 border border-[#406c89]/20 bg-white rounded-xl space-y-4">
        {/* Toggle label */}
        <div className="text-[#406c89] font-semibold text-xs flex items-center gap-2 cursor-pointer select-none">
          <span>▶ — Tùy chỉnh nhãn dòng tổng tiền</span>
        </div>

        {/* Checkbox settings */}
        <div className="flex gap-4 font-semibold text-slate-500 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={chietKhauChecked}
              onChange={(e) => setChietKhauChecked(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-slate-300 text-[#406c89] focus:ring-[#406c89]"
            />
            Chiết khấu (%)
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={sauChietKhauChecked}
              onChange={(e) => setSauChietKhauChecked(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-slate-300 text-[#406c89] focus:ring-[#406c89]"
            />
            Sau chiết khấu
          </label>
        </div>

        {/* Price rows grid - aligned 3 columns grid matching image layout with natural wrapping */}
        <div className="grid grid-cols-[1fr_80px_100px] gap-y-4 items-center text-xs font-semibold text-slate-500">
          
          {/* Row 1: Tổng trước thuế */}
          <span className="text-left text-slate-500 font-medium text-[13px] self-start pt-1">Tổng trước thuế</span>
          <span></span>
          <span className="text-right text-slate-800 font-bold text-[13px] leading-tight break-all">
            <span className="text-slate-500 font-medium block">VNĐ</span>
            {subtotal.toLocaleString('vi-VN')}
          </span>

          {/* Row 2: Chiết khấu (%) */}
          {chietKhauChecked && (
            <>
              <span className="text-left text-slate-500 font-medium text-[13px]">Chiết khấu (%)</span>
              <div className="flex justify-center">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={chietKhauPercent}
                  onChange={(e) => setChietKhauPercent(parseFloat(e.target.value) || 0)}
                  className="w-16 h-7 text-center border border-slate-200 bg-white rounded focus:outline-none focus:ring-1 focus:ring-[#406c89] text-xs font-bold text-slate-700"
                />
              </div>
              <span className="text-right text-slate-800 font-bold text-[13px]">-VNĐ {discountVal.toLocaleString('vi-VN')}</span>
            </>
          )}

          {/* Row 3: Sau chiết khấu */}
          {sauChietKhauChecked && (
            <>
              <span className="text-left text-slate-500 font-medium text-[13px] self-start pt-1">Sau chiết khấu</span>
              <span></span>
              <span className="text-right text-slate-800 font-bold text-[13px] leading-tight break-all">
                <span className="text-slate-500 font-medium block">VNĐ</span>
                {afterDiscount.toLocaleString('vi-VN')}
              </span>
            </>
          )}

          {/* Row 4: VAT (%) */}
          <span className="text-left text-slate-500 font-medium text-[13px]">VAT (%)</span>
          <div className="flex justify-center">
            <input
              type="number"
              min="0"
              max="100"
              value={vatPercent}
              onChange={(e) => setVatPercent(parseFloat(e.target.value) || 0)}
              className="w-16 h-7 text-center border border-slate-200 bg-white rounded focus:outline-none focus:ring-1 focus:ring-[#406c89] text-xs font-bold text-slate-700"
            />
          </div>
          <span className="text-right text-slate-800 font-bold text-[13px]">VNĐ {vatVal.toLocaleString('vi-VN')}</span>
        </div>

        {/* Divider line */}
        <div className="border-t border-slate-200/50 my-1"></div>

        {/* Total final */}
        <div className="grid grid-cols-[1fr_80px_100px] items-center text-xs font-bold pt-1">
          <span className="text-left text-slate-800 font-bold text-[13px] uppercase">TỔNG GIÁ TRỊ SAU THUẾ</span>
          <span></span>
          <span className="text-right text-base font-extrabold text-[#406c89]">
            VNĐ {tongSauThue.toLocaleString('vi-VN')}
          </span>
        </div>
      </div>
      
    </div>
  );
}
