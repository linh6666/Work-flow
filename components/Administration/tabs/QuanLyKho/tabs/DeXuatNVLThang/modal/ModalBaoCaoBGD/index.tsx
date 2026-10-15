"use client";

import React, { useState } from 'react';
import {
  IconX,
  IconChartBar,
  IconListDetails,
  IconGitBranch,
  IconDownload,
  IconPrinter,
  IconChevronDown,
} from '@tabler/icons-react';
import TongHopTheoPhong from './tabs/TongHopTheoPhong';
import ChiTietMaNVL from './tabs/ChiTietMaNVL';
import PhanBoTheoDuAn from './tabs/PhanBoTheoDuAn';

interface ModalBaoCaoBGDProps {
  isOpen: boolean;
  onClose: () => void;
  kyBaoCao?: string;
  donViDeXuat?: string;
  tongDuToan?: number;
}

export default function ModalBaoCaoBGD({
  isOpen,
  onClose,
}: ModalBaoCaoBGDProps) {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [activeTab, setActiveTab] = useState<'tongHop' | 'chiTiet' | 'duAn'>('tongHop');

  if (!isOpen) return null;

  const handleExportExcel = () => {
    alert('Xuất file Excel báo cáo tổng hợp đề xuất NVL thành công!');
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[1240px] overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
        {/* ── Header ── */}
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="text-indigo-600 flex items-center justify-center">
              <IconChartBar size={20} stroke={2.2} />
            </div>
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">
              Báo cáo tổng hợp Đề xuất NVL Tháng — Khối Kỹ thuật
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Đóng modal"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* ── Sub-header Toolbar ── */}
        <div className="px-5 py-3 flex items-center justify-between flex-wrap gap-3 bg-white shrink-0">
          {/* Filter Năm & Tháng */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-medium">Năm</span>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-semibold rounded-md pl-3 pr-7 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-2xs cursor-pointer"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
              <IconChevronDown
                size={14}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
            </div>

            {/* Filter Tháng */}
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="appearance-none bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-semibold rounded-md pl-3 pr-7 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-2xs cursor-pointer"
              >
                <option value="all">Tất cả các tháng</option>
                <option value="9">Tháng 9</option>
                <option value="10">Tháng 10</option>
              </select>
              <IconChevronDown
                size={14}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Action Tabs & Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Tab: Tổng hợp theo phòng */}
            <button
              type="button"
              onClick={() => setActiveTab('tongHop')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-xs ${
                activeTab === 'tongHop'
                  ? 'bg-[#2b338f] text-white hover:bg-[#232a76]'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              <IconChartBar size={14} />
              <span>Tổng hợp theo phòng</span>
            </button>

            {/* Tab: Chi tiết mã NVL */}
            <button
              type="button"
              onClick={() => setActiveTab('chiTiet')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-2xs ${
                activeTab === 'chiTiet'
                  ? 'bg-[#2b338f] text-white hover:bg-[#232a76]'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              <IconListDetails
                size={14}
                className={activeTab === 'chiTiet' ? 'text-white' : 'text-slate-500'}
              />
              <span>Chi tiết mã NVL</span>
            </button>

            {/* Tab: Phân bổ theo dự án */}
            <button
              type="button"
              onClick={() => setActiveTab('duAn')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-2xs ${
                activeTab === 'duAn'
                  ? 'bg-[#2b338f] text-white hover:bg-[#232a76]'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              <IconGitBranch
                size={14}
                className={activeTab === 'duAn' ? 'text-white' : 'text-slate-500'}
              />
              <span>Phân bổ theo dự án</span>
            </button>

            {/* Button: Xuất Excel */}
            <button
              type="button"
              onClick={handleExportExcel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer ml-1"
            >
              <IconDownload size={14} className="text-slate-600" />
              <span>Xuất Excel</span>
            </button>

            {/* Button: In PDF */}
            <button
              type="button"
              onClick={handlePrintPDF}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <IconPrinter size={14} className="text-slate-600" />
              <span>In PDF</span>
            </button>
          </div>
        </div>

        {/* ── Table & Content ── */}
        <div className="px-5 pb-4 overflow-hidden flex-1 flex flex-col min-h-0">
          {activeTab === 'tongHop' && <TongHopTheoPhong selectedYear={selectedYear} />}
          {activeTab === 'chiTiet' && (
            <ChiTietMaNVL selectedYear={selectedYear} selectedMonth={selectedMonth} />
          )}
          {activeTab === 'duAn' && <PhanBoTheoDuAn selectedYear={selectedYear} />}
        </div>
      </div>
    </div>
  );
}
