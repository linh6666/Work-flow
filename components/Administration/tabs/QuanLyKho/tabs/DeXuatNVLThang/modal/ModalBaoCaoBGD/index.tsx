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
          {/* Filter Năm */}
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
        <div className="px-5 pb-5 overflow-y-auto flex-1">
          {activeTab === 'tongHop' && (
            <div className="space-y-3">
              <div className="border border-slate-300 rounded-lg overflow-hidden shadow-2xs overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                  {/* Table Header */}
                  <thead>
                    <tr className="bg-[#3d5a6c] text-white">
                      <th className="px-4 py-2.5 text-left font-semibold border-r border-slate-400/30 whitespace-nowrap">
                        Tháng
                      </th>
                      <th className="px-3 py-2.5 text-center font-semibold border-r border-slate-400/30 whitespace-nowrap">
                        Khai triển
                      </th>
                      <th className="px-3 py-2.5 text-center font-semibold border-r border-slate-400/30 whitespace-nowrap">
                        CN & TK
                      </th>
                      <th className="px-3 py-2.5 text-center font-semibold border-r border-slate-400/30 whitespace-nowrap">
                        Cắt
                      </th>
                      <th className="px-3 py-2.5 text-center font-semibold border-r border-slate-400/30 whitespace-nowrap">
                        Ghép
                      </th>
                      <th className="px-3 py-2.5 text-center font-semibold border-r border-slate-400/30 whitespace-nowrap">
                        Mộc Sơn
                      </th>
                      <th className="px-3 py-2.5 text-center font-semibold border-r border-slate-400/30 whitespace-nowrap">
                        Điện
                      </th>
                      <th className="px-3 py-2.5 text-center font-semibold border-r border-slate-400/30 whitespace-nowrap">
                        Cảnh Quan
                      </th>
                      <th className="px-4 py-2.5 text-right font-semibold whitespace-nowrap">
                        TỔNG CỘNG
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {/* Tháng 9 */}
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-2 text-left font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">
                        Tháng 9
                      </td>
                      <td className="px-3 py-2 text-center text-slate-400 font-medium border-r border-slate-200">
                        —
                      </td>
                      <td className="px-3 py-2 text-center text-slate-400 font-medium border-r border-slate-200">
                        —
                      </td>
                      <td className="px-3 py-2 text-center border-r border-slate-200">
                        <div className="font-semibold text-slate-800">12.463.000</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#fef9c3] text-[#ca8a04] border border-[#fde047]">
                          Chờ duyệt
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center border-r border-slate-200">
                        <div className="font-semibold text-slate-800">17.320.684</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#fef9c3] text-[#ca8a04] border border-[#fde047]">
                          Chờ duyệt
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center border-r border-slate-200">
                        <div className="font-semibold text-slate-800">15.662.392</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#fef9c3] text-[#ca8a04] border border-[#fde047]">
                          Chờ duyệt
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center border-r border-slate-200">
                        <div className="font-semibold text-slate-800">20.428.718</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#fef9c3] text-[#ca8a04] border border-[#fde047]">
                          Chờ duyệt
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center border-r border-slate-200">
                        <div className="font-semibold text-slate-800">1.537.560</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#fef9c3] text-[#ca8a04] border border-[#fde047]">
                          Chờ duyệt
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right font-bold text-slate-900 whitespace-nowrap">
                        67.412.354
                      </td>
                    </tr>

                    {/* Tháng 10 */}
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-2 text-left font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">
                        Tháng 10
                      </td>
                      <td className="px-3 py-2 text-center border-r border-slate-200">
                        <div className="font-semibold text-slate-800">907.200</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                          Đã duyệt
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center text-slate-400 font-medium border-r border-slate-200">
                        —
                      </td>
                      <td className="px-3 py-2 text-center border-r border-slate-200">
                        <div className="font-semibold text-slate-800">12.463.000</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                          Đã duyệt
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center border-r border-slate-200">
                        <div className="font-semibold text-slate-800">17.320.684</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                          Đã duyệt
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center border-r border-slate-200">
                        <div className="font-semibold text-slate-800">15.662.392</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                          Đã duyệt
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center border-r border-slate-200">
                        <div className="font-semibold text-slate-800">20.412.218</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                          Đã duyệt
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center border-r border-slate-200">
                        <div className="font-semibold text-slate-800">1.537.560</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                          Đã duyệt
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right font-bold text-slate-900 whitespace-nowrap">
                        68.303.054
                      </td>
                    </tr>

                    {/* Footer Row: TỔNG CỘNG NĂM */}
                    <tr className="bg-[#3d5a6c] text-white font-bold">
                      <td className="px-4 py-2.5 text-left uppercase tracking-wider border-r border-slate-400/30 whitespace-nowrap">
                        TỔNG CỘNG NĂM
                      </td>
                      <td className="px-3 py-2.5 text-center border-r border-slate-400/30">
                        907.200
                      </td>
                      <td className="px-3 py-2.5 text-center border-r border-slate-400/30">
                        0
                      </td>
                      <td className="px-3 py-2.5 text-center border-r border-slate-400/30">
                        24.926.000
                      </td>
                      <td className="px-3 py-2.5 text-center border-r border-slate-400/30">
                        34.641.368
                      </td>
                      <td className="px-3 py-2.5 text-center border-r border-slate-400/30">
                        31.324.784
                      </td>
                      <td className="px-3 py-2.5 text-center border-r border-slate-400/30">
                        40.840.936
                      </td>
                      <td className="px-3 py-2.5 text-center border-r border-slate-400/30">
                        3.075.120
                      </td>
                      <td className="px-4 py-2.5 text-right bg-[#bf9146] whitespace-nowrap">
                        135.715.408
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Note caption */}
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Bảng tổng hợp giá trị đề xuất NVL tháng của 7 phòng ban Khối Kỹ thuật. Tổng tiền tính từ số lượng đề xuất × đơn giá tham chiếu (Danh sách NVL). Chuyển sang <span className="font-semibold text-slate-700">Chi tiết mã NVL</span> để xem từng mã NVL được đề xuất.
              </p>
            </div>
          )}

          {activeTab === 'chiTiet' && (
            <div className="p-8 text-center bg-slate-50/50 rounded-xl border border-slate-200">
              <IconListDetails size={32} className="mx-auto text-slate-400 mb-2" />
              <h4 className="text-sm font-semibold text-slate-700">Chi tiết mã NVL theo phòng ban</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Hiển thị danh mục chi tiết từng mã vật tư, chủng loại, quy cách và đơn giá tham chiếu đề xuất theo từng phòng ban.
              </p>
            </div>
          )}

          {activeTab === 'duAn' && (
            <div className="p-8 text-center bg-slate-50/50 rounded-xl border border-slate-200">
              <IconGitBranch size={32} className="mx-auto text-slate-400 mb-2" />
              <h4 className="text-sm font-semibold text-slate-700">Phân bổ NVL theo dự án</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Báo cáo tổng hợp hạn mức và tỷ lệ phân bổ chi phí vật tư cho từng công trình, dự án trọng điểm.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
