"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { getQuoteRequestList, QuoteRequestRecord } from '@/api/apiGetQuoteRequest';
import { getQuotationTemplateList, QuotationTemplateRecord } from '@/api/apiGetQuotationTemplate';

interface ThongTinChungTabProps {
  ngonNgu: string;
  setNgonNgu: (v: string) => void;
  loai: string;
  setLoai: (v: string) => void;
  lienKetDeXuat: string;
  setLienKetDeXuat: (v: string) => void;
  soBg: string;
  setSoBg: (v: string) => void;
  ngay: string;
  setNgay: (v: string) => void;
  hieuLucNgay: number;
  setHieuLucNgay: (v: number) => void;
  khachHangSelect: string;
  setKhachHangSelect: (v: string) => void;
  tenKhachHangManual: string;
  setTenKhachHangManual: (v: string) => void;
  tenDuAn: string;
  setTenDuAn: (v: string) => void;
  tyLe: string;
  setTyLe: (v: string) => void;
  kichThuoc: string;
  setKichThuoc: (v: string) => void;
  trangThai: string;
  setTrangThai: (v: string) => void;
  onAutoFill: (proposalId: string) => void;
}

const STATUSES = [
  'Bản nháp',
  'Đã gửi',
  'Đang theo dõi',
  'Đang bổ sung thông tin',
  'Đang đàm phán',
  'Tạm dừng',
  'Đã chốt',
  'Từ chối báo giá',
  'Không thực hiện',
];

export default function ThongTinChungTab({
  ngonNgu,
  setNgonNgu,
  loai,
  setLoai,
  lienKetDeXuat,
  setLienKetDeXuat,
  soBg,
  setSoBg,
  ngay,
  setNgay,
  hieuLucNgay,
  setHieuLucNgay,
  khachHangSelect,
  setKhachHangSelect,
  tenKhachHangManual,
  setTenKhachHangManual,
  tenDuAn,
  setTyLe,
  tyLe,
  setTenDuAn,
  kichThuoc,
  setKichThuoc,
  trangThai,
  setTrangThai,
  onAutoFill,
}: ThongTinChungTabProps) {
  const [proposals, setProposals] = useState<QuoteRequestRecord[]>([]);
  const [allTemplates, setAllTemplates] = useState<QuotationTemplateRecord[]>([]);
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const proposalDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (proposalDropdownRef.current && !proposalDropdownRef.current.contains(event.target as Node)) {
        setIsProposalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    getQuoteRequestList(100).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setProposals(data);
      }
    });
    getQuotationTemplateList(500).then((data) => {
      if (Array.isArray(data)) setAllTemplates(data);
    });
  }, []);

  // Distinct quote_type list filtered by current language
  const quoteTypeOptions = useMemo(() => {
    const langMap: Record<string, string> = { vi: 'vi', en: 'en', 'vi-en': 'vi-en' };
    const activeLang = langMap[ngonNgu] ?? 'vi';
    const filtered = allTemplates.filter(
      (t) => !t.quote_language || t.quote_language === activeLang
    );
    const seen = new Set<string>();
    const result: string[] = [];
    for (const t of filtered) {
      const qt = t.quote_type?.trim();
      if (qt && !seen.has(qt)) {
        seen.add(qt);
        result.push(qt);
      }
    }
    return result;
  }, [allTemplates, ngonNgu]);
  const handleKhachHangChange = (ma: string) => {
    setKhachHangSelect(ma);
    setTenKhachHangManual(ma);
  };

  return (
    <div className="space-y-4 animate-fade-in text-xs text-slate-700">
      
      {/* SECTION 1: NGÔN NGỮ & LOẠI BÁO GIÁ (BLUE WRAPPER) */}
      <div className="p-4 bg-blue-50/20 border border-blue-100 rounded-xl space-y-3.5">
        <div>
          <label className="block text-slate-600 font-bold mb-1.5">Ngôn ngữ báo giá *</label>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setNgonNgu('vi')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                ngonNgu === 'vi'
                  ? 'bg-[#406c89] border-[#406c89] text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="opacity-70 mr-1 text-[10px]">VN</span> Tiếng Việt
            </button>
            <button
              type="button"
              onClick={() => setNgonNgu('en')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                ngonNgu === 'en'
                  ? 'bg-[#406c89] border-[#406c89] text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="opacity-70 mr-1 text-[10px]">GB</span> Tiếng Anh
            </button>
            <button
              type="button"
              onClick={() => setNgonNgu('vi-en')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                ngonNgu === 'vi-en'
                  ? 'bg-[#406c89] border-[#406c89] text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="opacity-70 mr-1 text-[10px]">VNGB</span> Việt - Anh
            </button>
          </div>
        </div>

        <div>
          <label className="block text-slate-600 font-bold mb-1">Loại báo giá *</label>
          <select
            value={loai}
            onChange={(e) => setLoai(e.target.value)}
            className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          >
            {quoteTypeOptions.length > 0 ? (
              quoteTypeOptions.map((qt) => (
                <option key={qt} value={qt}>
                  {qt.startsWith('Báo giá') ? qt : `Báo giá ${qt}`}
                </option>
              ))
            ) : (
              <option value="">Chưa có loại báo giá</option>
            )}
          </select>
          <span className="text-[10px] text-blue-500 font-medium mt-1 block">
            {ngonNgu === 'vi'
              ? 'Chỉ hiển thị mẫu hỗ trợ ngôn ngữ Tiếng Việt'
              : ngonNgu === 'en'
              ? 'Only showing templates supporting English'
              : 'Hiển thị mẫu hỗ trợ cả Việt - Anh'}
          </span>
        </div>
      </div>

      {/* SECTION 2: LIÊN KẾT ĐỀ XUẤT (AMBER WRAPPER) */}
      <div className="p-4 bg-amber-50/10 border border-amber-100 rounded-xl">
        <label className="block text-amber-700 font-bold mb-1">Liên kết Đề xuất Báo giá (tùy chọn)</label>
        <div ref={proposalDropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsProposalOpen((prev) => !prev)}
            className="w-full flex items-center justify-between text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer text-left"
          >
            <span className="truncate">
              {(() => {
                if (!lienKetDeXuat) return 'Chọn đề xuất để tự điền thông tin...';
                const found = proposals.find((p) => p.id === lienKetDeXuat);
                if (found) {
                  return `${found.request_number || 'ĐXBG'} - ${found.project_name} (${found.customer_name || 'Khách hàng'})`;
                }
                return 'Chọn đề xuất để tự điền thông tin...';
              })()}
            </span>
            <IconChevronDown
              size={14}
              className={`shrink-0 text-slate-400 transition-transform ${isProposalOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isProposalOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 z-30 max-h-60 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg py-1">
              <button
                type="button"
                onClick={() => {
                  onAutoFill('');
                  setIsProposalOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 cursor-pointer ${
                  !lienKetDeXuat ? 'bg-slate-50 font-semibold text-[#406c89]' : 'text-slate-500'
                }`}
              >
                Chọn đề xuất để tự điền thông tin...
              </button>
              {proposals.length > 0 ? (
                proposals.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      onAutoFill(p.id);
                      setIsProposalOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 cursor-pointer truncate ${
                      lienKetDeXuat === p.id ? 'bg-blue-50/60 font-semibold text-[#406c89]' : 'text-slate-700'
                    }`}
                  >
                    {p.request_number || 'ĐXBG'} - {p.project_name} ({p.customer_name || 'Khách hàng'})
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-xs text-slate-400">Chưa có đề xuất báo giá</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: CORE FORM FIELDS */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-slate-600 font-bold mb-1">Số báo giá * (tự động)</label>
          <input
            type="text"
            required
            value={soBg}
            onChange={(e) => setSoBg(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
        <div>
          <label className="block text-slate-600 font-bold mb-1">Ngày báo giá</label>
          <input
            type="date"
            required
            value={ngay}
            onChange={(e) => setNgay(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
        <div>
          <label className="block text-slate-600 font-bold mb-1">Hiệu lực (ngày)</label>
          <input
            type="number"
            min="1"
            required
            value={hieuLucNgay}
            onChange={(e) => setHieuLucNgay(parseInt(e.target.value) || 10)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-600 font-bold mb-1">Khách hàng</label>
          <select
            value={khachHangSelect}
            onChange={(e) => handleKhachHangChange(e.target.value)}
            className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          >
            <option value="">Chọn từ danh sách...</option>
          </select>
        </div>
        <div>
          <label className="block text-slate-600 font-bold mb-1">Tên khách hàng (nhập tay nếu chưa có) *</label>
          <input
            type="text"
            required
            value={tenKhachHangManual}
            onChange={(e) => setTenKhachHangManual(e.target.value)}
            placeholder="CÔNG TY CỔ PHẦN..."
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
      </div>

      <div>
        <label className="block text-slate-600 font-bold mb-1">Tên mô hình / dự án *</label>
        <input
          type="text"
          required
          value={tenDuAn}
          onChange={(e) => setTenDuAn(e.target.value)}
          placeholder="MÔ HÌNH DỰ ÁN..."
          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-600 font-bold mb-1">Tỷ lệ</label>
          <input
            type="text"
            value={tyLe}
            onChange={(e) => setTyLe(e.target.value)}
            placeholder="1/800"
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
        <div>
          <label className="block text-slate-600 font-bold mb-1">Kích thước</label>
          <input
            type="text"
            value={kichThuoc}
            onChange={(e) => setKichThuoc(e.target.value)}
            placeholder="2650X1900MM"
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>
      </div>

      {/* SECTION 4: TRẠNG THÁI THEO DÕI */}
      <div className="border-t border-slate-100 pt-3">
        <label className="block text-slate-600 font-bold mb-2">Trạng thái theo dõi</label>
        <div className="grid grid-cols-3 gap-2.5">
          {STATUSES.map(status => {
            const isActive = trangThai === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setTrangThai(status)}
                className={`py-2 px-3 border rounded-lg text-[11px] font-bold text-center transition-all cursor-pointer ${
                  isActive
                    ? 'border-slate-800 text-slate-800 bg-slate-50 border-2 shadow-xs'
                    : 'border-slate-200 text-slate-500 bg-white hover:bg-slate-50'
                }`}
              >
                {isActive ? `✓ ${status}` : status}
              </button>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}
