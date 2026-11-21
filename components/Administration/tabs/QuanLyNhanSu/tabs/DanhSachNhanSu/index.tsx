"use client";

import React, { useState } from 'react';
import {
  IconSearch,
  IconDownload,
  IconUpload,
  IconPlus,
  IconChevronDown,
  IconUsers,
  IconShieldCheck,
  IconUserCheck,
  IconCertificate,
  IconWallet,
  IconFileText,
} from '@tabler/icons-react';

import DanhSachTongQuatTab, { PHONG_BAN_LIST, TRANG_THAI_LIST } from './tabs/DanhSachTongQuat';
import HoSoPhapLyTab from './tabs/HoSoPhapLy';
import ThanNhanPhuThuocTab from './tabs/ThanNhanPhuThuoc';
import ThamNienTab from './tabs/ThamNien';
import BacLuongTangBacTab from './tabs/BacLuongTangBac';

export type SubTabKey =
  | 'danh-sach-tong-quat'
  | 'ho-so-phap-ly'
  | 'than-nhan-phu-thuoc'
  | 'tham-nien'
  | 'bac-luong-tang-bac';

interface SubTabItem {
  key: SubTabKey;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const SUB_TABS: SubTabItem[] = [
  { key: 'danh-sach-tong-quat', label: 'Danh sách tổng quát', icon: IconUsers },
  { key: 'ho-so-phap-ly', label: 'Hồ sơ pháp lý', icon: IconShieldCheck },
  { key: 'than-nhan-phu-thuoc', label: 'Thân nhân & phụ thuộc', icon: IconUserCheck },
  { key: 'tham-nien', label: 'Thâm niên', icon: IconCertificate },
  { key: 'bac-luong-tang-bac', label: 'Bậc lương & tăng bậc', icon: IconWallet },
];

export default function DanhSachNhanSuTab() {
  const [activeSubTab, setActiveSubTab] = useState<SubTabKey>('danh-sach-tong-quat');

  // Shared Toolbar Controls
  const [search, setSearch] = useState('');
  const [filterPhongBan, setFilterPhongBan] = useState('ALL');
  const [filterTrangThai, setFilterTrangThai] = useState('ALL');
  const [filterPhuThuoc, setFilterPhuThuoc] = useState('ALL');
  const [filterTinhTrangHoSo, setFilterTinhTrangHoSo] = useState('ALL');

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      {/* ── 1. Ô Tab trên cùng (Khớp phong cách và màu sắc theo ảnh) ── */}
      <div className="px-5 pt-3 pb-2 bg-slate-50/70 border-b border-slate-200/80 shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {SUB_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveSubTab(tab.key)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                  isActive
                    ? 'bg-[#ba8e3a] text-white shadow-sm'
                    : 'bg-[#406c89] text-white/95 hover:bg-[#345870] hover:text-white'
                }`}
              >
                <Icon size={15} className="shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. Top Search & Action Bar ── */}
      <div className="px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 shrink-0">
        {/* Search Input */}
        <div className="relative w-full sm:w-[360px] md:w-[420px]">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên, mã NV, phòng ban, chức vụ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all shadow-2xs"
          />
        </div>

        {/* Action Controls & Buttons: Phòng ban, Trạng thái, Export, Xuất hồ sơ, Nhập Excel, + Thêm */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Lọc Phòng ban */}
          <div className="relative">
            <select
              value={filterPhongBan}
              onChange={(e) => setFilterPhongBan(e.target.value)}
              className="appearance-none h-8.5 pl-3 pr-7 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 outline-none transition-all shadow-2xs cursor-pointer"
            >
              <option value="ALL">Tất cả phòng ban</option>
              {PHONG_BAN_LIST.map((pb) => (
                <option key={pb} value={pb}>
                  {pb}
                </option>
              ))}
            </select>
            <IconChevronDown
              size={13}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          {/* Lọc Trạng thái / Tùy biến theo từng tab */}
          {activeSubTab === 'ho-so-phap-ly' ? (
            <div className="relative">
              <select
                value={filterTinhTrangHoSo}
                onChange={(e) => setFilterTinhTrangHoSo(e.target.value)}
                className="appearance-none h-8.5 pl-3 pr-7 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 outline-none transition-all shadow-2xs cursor-pointer"
              >
                <option value="ALL">Mọi tình trạng hồ sơ</option>
                <option value="Đầy đủ">Đầy đủ</option>
                <option value="Thiếu CCCD">Thiếu CCCD</option>
                <option value="Thiếu BHXH">Thiếu BHXH</option>
                <option value="Thiếu MST">Thiếu MST</option>
                <option value="Chưa nộp">Chưa nộp</option>
              </select>
              <IconChevronDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          ) : activeSubTab === 'than-nhan-phu-thuoc' ? (
            <div className="relative">
              <select
                value={filterPhuThuoc}
                onChange={(e) => setFilterPhuThuoc(e.target.value)}
                className="appearance-none h-8.5 pl-3 pr-7 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 outline-none transition-all shadow-2xs cursor-pointer"
              >
                <option value="ALL">Tất cả thân nhân</option>
                <option value="YES">Người phụ thuộc (NPT)</option>
                <option value="NO">Không phụ thuộc</option>
              </select>
              <IconChevronDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          ) : activeSubTab === 'bac-luong-tang-bac' ? (
            <div className="relative">
              <select
                value={filterTrangThai}
                onChange={(e) => setFilterTrangThai(e.target.value)}
                className="appearance-none h-8.5 pl-3 pr-7 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 outline-none transition-all shadow-2xs cursor-pointer"
              >
                <option value="ALL">Mọi trạng thái xét duyệt</option>
                <option value="Đủ điều kiện">Đủ điều kiện</option>
                <option value="Đang theo dõi">Đang theo dõi</option>
                <option value="Chưa xét duyệt">Chưa xét duyệt</option>
              </select>
              <IconChevronDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          ) : (
            <div className="relative">
              <select
                value={filterTrangThai}
                onChange={(e) => setFilterTrangThai(e.target.value)}
                className="appearance-none h-8.5 pl-3 pr-7 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 outline-none transition-all shadow-2xs cursor-pointer"
              >
                <option value="ALL">Mọi trạng thái</option>
                {TRANG_THAI_LIST.map((tt) => (
                  <option key={tt} value={tt}>
                    {tt}
                  </option>
                ))}
              </select>
              <IconChevronDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          )}

          {/* Nút Export */}
          <button
            type="button"
            onClick={() => alert('Xuất dữ liệu Excel thành công!')}
            className="inline-flex items-center gap-1.5 h-8.5 px-3 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <IconDownload size={14} className="text-slate-600" />
            <span>Export</span>
          </button>

          {/* Nút Xuất hồ sơ */}
          <button
            type="button"
            onClick={() => alert('Xuất hồ sơ thành công!')}
            className="inline-flex items-center gap-1.5 h-8.5 px-3 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <IconFileText size={14} className="text-slate-600" />
            <span>Xuất hồ sơ</span>
          </button>

          {/* Nút Nhập Excel */}
          <button
            type="button"
            onClick={() => alert('Chức năng Nhập Excel')}
            className="inline-flex items-center gap-1.5 h-8.5 px-3 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <IconUpload size={14} className="text-slate-600" />
            <span>Nhập Excel</span>
          </button>

          {/* Nút Thêm (màu vàng đồng #ba8e3a như ảnh đính kèm) */}
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('nhan-su-add-click', { detail: { tab: activeSubTab } }));
            }}
            className="inline-flex items-center gap-1 h-8.5 px-3.5 text-xs font-bold text-white bg-[#ba8e3a] hover:bg-[#a67c2e] active:scale-95 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <IconPlus size={15} />
            <span>Thêm</span>
          </button>
        </div>
      </div>

      {/* ── 3. Active Tab Content (Table Area) ── */}
      <div className="flex-1 flex flex-col min-h-0">
        {activeSubTab === 'danh-sach-tong-quat' && (
          <DanhSachTongQuatTab
            searchQuery={search}
            selectedPhongBan={filterPhongBan}
            selectedTrangThai={filterTrangThai}
          />
        )}
        {activeSubTab === 'ho-so-phap-ly' && (
          <HoSoPhapLyTab
            searchQuery={search}
            selectedPhongBan={filterPhongBan}
            selectedTinhTrang={filterTinhTrangHoSo}
          />
        )}
        {activeSubTab === 'than-nhan-phu-thuoc' && (
          <ThanNhanPhuThuocTab
            searchQuery={search}
            selectedPhongBan={filterPhongBan}
            selectedPhuThuoc={filterPhuThuoc}
          />
        )}
        {activeSubTab === 'tham-nien' && (
          <ThamNienTab
            searchQuery={search}
            selectedPhongBan={filterPhongBan}
          />
        )}
        {activeSubTab === 'bac-luong-tang-bac' && (
          <BacLuongTangBacTab
            searchQuery={search}
            selectedPhongBan={filterPhongBan}
            selectedTrangThai={filterTrangThai}
          />
        )}
      </div>
    </div>
  );
}

// Re-export types & constants for compatibility with other components
export * from './tabs/DanhSachTongQuat';
