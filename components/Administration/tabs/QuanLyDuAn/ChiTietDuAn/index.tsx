"use client";

import React, { useState } from 'react';
import { DuAnItem } from '../index';
import YeuCauSanXuatModal from '../modal/YeuCauSanXuat';
import LuuTemplateModal from '../modal/LuuTemplate';
import ChiTietTienDoTab from './tabs/ChiTietTienDo';
import BaoCaoTienDoTab from './tabs/BaoCaoTienDo';
import NhanSuCongViecTab from './tabs/NhanSuCongViec';
import ChiPhiPhongBanTab from './tabs/ChiPhiPhongBan';
import PheDuyetBaoCaoTab from './tabs/PheDuyetBaoCao';
import NghiemThuTab from './tabs/NghiemThu';
import {
  IconArrowLeft,
  IconFlag,
  IconChevronDown,
  IconChevronUp,
  IconClipboardList,
  IconTrendingUp,
  IconUsers,
  IconCoin,
  IconChartBar,
  IconCheck,
  IconDownload,
  IconCopy,
  IconGridDots,
  IconGauge,
  IconFileText,
  IconPlus,
  IconListCheck,
  IconPaperclip
} from '@tabler/icons-react';

interface ChiTietDuAnProps {
  project: DuAnItem;
  onBack: () => void;
}

export default function ChiTietDuAn({ project, onBack }: ChiTietDuAnProps) {
  const [activeTab, setActiveTab] = useState<
    'chi-tiet-tien-do' | 'bao-cao-tien-do' | 'nhan-su-cong-viec' | 'chi-phi-phong-ban' | 'phe-duyet' | 'nghiem-thu'
  >('chi-tiet-tien-do');

  const [isYcsxOpen, setIsYcsxOpen] = useState(false);
  const [isHoSoOpen, setIsHoSoOpen] = useState(true);
  const [isYcsxModalOpen, setIsYcsxModalOpen] = useState(false);
  const [isLuuTemplateOpen, setIsLuuTemplateOpen] = useState(false);

  // Department report list matching user reference image exactly
  const departments = [
    { name: 'Ban Giám đốc', statusText: 'Hoàn thành · 17 báo cáo · Tạo bởi: Thảo Phùng' },
    { name: 'Khối Văn phòng', statusText: 'Đang triển khai · 40 báo cáo · Tạo bởi: Thảo Phùng' },
    { name: 'Phòng Khai triển', statusText: 'Hoàn thành · 29 báo cáo · Tạo bởi: Trần Diễm My' },
    { name: 'Phòng Cắt', statusText: 'Hoàn thành · 39 báo cáo · Tạo bởi: Trần Diễm My' },
    { name: 'Phòng Ghép', statusText: 'Hoàn thành · 94 báo cáo · Tạo bởi: Trần Diễm My' },
    { name: 'Phòng Mộc Sơn', statusText: 'Đang triển khai · 70 báo cáo · Tạo bởi: Trần Diễm My' },
    { name: 'Phòng Điện', statusText: 'Hoàn thành · 77 báo cáo · Tạo bởi: Trần Diễm My' },
    { name: 'Phòng Cảnh Quan', statusText: 'Hoàn thành · 243 báo cáo · Tạo bởi: Trần Diễm My' },
    { name: 'Phòng Công nghệ và Thiết kế', statusText: 'Đang triển khai · 11 báo cáo · Tạo bởi: Thảo Phùng' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#f4f6fa] min-h-screen select-none">
      
      {/* 1. TOP HEADER */}
      <div className="bg-[#f4f6fa] px-4 sm:px-8 py-4 border-b border-slate-200/60 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Back button & Title */}
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={onBack}
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-all cursor-pointer shadow-2xs shrink-0 mt-0.5"
              title="Quay lại"
            >
              <IconArrowLeft size={16} />
            </button>

            <div>
              <span className="text-[11px] font-bold text-slate-400 font-mono tracking-tight block">
                {project.maDuAn}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#406c89] tracking-tight leading-tight">
                {project.tenDuAn}
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {project.tenDuAn}
              </p>
            </div>
          </div>

          {/* Right Badges */}
          <div className="flex items-center gap-3 self-start sm:self-center">
            <span className="px-5 py-2 rounded-full text-sm font-bold bg-[#fffbeb] text-[#9a6700] border border-[#fde68a] shadow-xs">
              {project.trangThai}
            </span>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f8fafc] border border-slate-200 text-sm font-medium text-[#406c89] shadow-xs">
              <IconGauge size={18} className="text-slate-700" />
              <span>Sức chứa/ngày: <strong className="font-extrabold text-[#406c89] ml-1">12h</strong></span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. BODY CONTENT */}
      <div className="flex-1 px-4 sm:px-8 py-5 pb-16 space-y-4">

        {/* SECTION 1: YÊU CẦU SẢN XUẤT (ACCORDION & MODAL TRIGGER) */}
        <div className="bg-[#406c89]/10 border border-[#406c89]/20 rounded-2xl overflow-hidden shadow-2xs transition-all">
          <button
            type="button"
            onClick={() => setIsYcsxModalOpen(true)}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#406c89]/15 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <IconFlag size={18} className="text-[#406c89]" />
              <span className="font-bold text-xs text-[#406c89]">Yêu cầu sản xuất</span>
            </div>
            <IconChevronDown
              size={18}
              className={`text-[#406c89] transition-transform duration-200 ${isYcsxOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isYcsxOpen && (
            <div className="p-4 bg-white border-t border-[#406c89]/20 text-xs text-slate-600 space-y-2">
              <p>Mã YCSX: <strong className="font-mono text-slate-800">YCSX-2026-VSIP-01</strong></p>
              <p>Phạm vi: Cắt CNC, mộc khung gỗ, sơn bóng bề mặt và lắp đặt mô hình tổng thể.</p>
            </div>
          )}
        </div>

        {/* SECTION 2: HỒ SƠ QUẢN LÝ DỰ ÁN (MAIN CONTAINER) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
          
          {/* Main Title Bar */}
          <div
            onClick={() => setIsHoSoOpen(!isHoSoOpen)}
            className="bg-[#fffdf5] border-b border-[#fef3c7] px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#fff9e6] transition-all"
          >
            <div className="flex items-center gap-2">
              <IconClipboardList size={18} className="text-[#9a6700]" />
              <span className="font-extrabold text-xs text-[#855300] tracking-tight">Hồ sơ Quản lý Dự án</span>
            </div>
            <IconChevronUp
              size={18}
              className={`text-[#855300] transition-transform duration-200 ${!isHoSoOpen ? 'rotate-180' : ''}`}
            />
          </div>

          {isHoSoOpen && (
            <div className="p-4 sm:p-5 space-y-4">

              {/* TAB BAR BUTTONS */}
              <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] pb-1">
                
                {/* Tab 1 */}
                <button
                  type="button"
                  onClick={() => setActiveTab('chi-tiet-tien-do')}
                  className={`px-3.5 py-2 text-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                    activeTab === 'chi-tiet-tien-do'
                      ? 'bg-[#eef4f8] text-[#406c89] font-bold rounded-t-lg border-b-[2.5px] border-[#406c89]'
                      : 'bg-[#f1f5f9] text-slate-600 hover:text-slate-800 hover:bg-slate-200/70 font-semibold rounded-lg border-b-[2.5px] border-transparent'
                  }`}
                >
                  <IconClipboardList size={15} className={activeTab === 'chi-tiet-tien-do' ? 'text-[#406c89]' : 'text-slate-500'} />
                  <span>Chi tiết Tiến độ</span>
                </button>

                {/* Tab 2 */}
                <button
                  type="button"
                  onClick={() => setActiveTab('bao-cao-tien-do')}
                  className={`px-3.5 py-2 text-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                    activeTab === 'bao-cao-tien-do'
                      ? 'bg-[#eef4f8] text-[#406c89] font-bold rounded-t-lg border-b-[2.5px] border-[#406c89]'
                      : 'bg-[#f1f5f9] text-slate-600 hover:text-slate-800 hover:bg-slate-200/70 font-semibold rounded-lg border-b-[2.5px] border-transparent'
                  }`}
                >
                  <IconTrendingUp size={15} className={activeTab === 'bao-cao-tien-do' ? 'text-[#406c89]' : 'text-slate-500'} />
                  <span>Báo cáo Tiến độ</span>
                </button>

                {/* Tab 3 */}
                <button
                  type="button"
                  onClick={() => setActiveTab('nhan-su-cong-viec')}
                  className={`px-3.5 py-2 text-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                    activeTab === 'nhan-su-cong-viec'
                      ? 'bg-[#eef4f8] text-[#406c89] font-bold rounded-t-lg border-b-[2.5px] border-[#406c89]'
                      : 'bg-[#f1f5f9] text-slate-600 hover:text-slate-800 hover:bg-slate-200/70 font-semibold rounded-lg border-b-[2.5px] border-transparent'
                  }`}
                >
                  <IconUsers size={15} className={activeTab === 'nhan-su-cong-viec' ? 'text-[#406c89]' : 'text-slate-500'} />
                  <span>Nhân sự & Công việc</span>
                </button>

                {/* Tab 4 */}
                <button
                  type="button"
                  onClick={() => setActiveTab('chi-phi-phong-ban')}
                  className={`px-3.5 py-2 text-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                    activeTab === 'chi-phi-phong-ban'
                      ? 'bg-[#eef4f8] text-[#406c89] font-bold rounded-t-lg border-b-[2.5px] border-[#406c89]'
                      : 'bg-[#f1f5f9] text-slate-600 hover:text-slate-800 hover:bg-slate-200/70 font-semibold rounded-lg border-b-[2.5px] border-transparent'
                  }`}
                >
                  <IconCoin size={15} className={activeTab === 'chi-phi-phong-ban' ? 'text-[#406c89]' : 'text-slate-500'} />
                  <span>Chi phí Phòng ban</span>
                </button>

                {/* Tab 5 */}
                <button
                  type="button"
                  onClick={() => setActiveTab('phe-duyet')}
                  className={`px-3.5 py-2 text-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                    activeTab === 'phe-duyet'
                      ? 'bg-[#eef4f8] text-[#406c89] font-bold rounded-t-lg border-b-[2.5px] border-[#406c89]'
                      : 'bg-[#f1f5f9] text-slate-600 hover:text-slate-800 hover:bg-slate-200/70 font-semibold rounded-lg border-b-[2.5px] border-transparent'
                  }`}
                >
                  <IconChartBar size={15} className={activeTab === 'phe-duyet' ? 'text-[#406c89]' : 'text-slate-500'} />
                  <span>Phê duyệt Báo cáo</span>
                </button>

                {/* Tab 6 */}
                <button
                  type="button"
                  onClick={() => setActiveTab('nghiem-thu')}
                  className={`px-3.5 py-2 text-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                    activeTab === 'nghiem-thu'
                      ? 'bg-[#eef4f8] text-[#406c89] font-bold rounded-t-lg border-b-[2.5px] border-[#406c89]'
                      : 'bg-[#f1f5f9] text-slate-600 hover:text-slate-800 hover:bg-slate-200/70 font-semibold rounded-lg border-b-[2.5px] border-transparent'
                  }`}
                >
                  <IconFlag size={15} className={activeTab === 'nghiem-thu' ? 'text-[#406c89]' : 'text-slate-500'} />
                  <span>Nghiệm thu 80%/100%</span>
                </button>

              </div>

              {/* TAB CONTENT 1: CHI TIẾT TIẾN ĐỘ */}
              {activeTab === 'chi-tiet-tien-do' && (
                <ChiTietTienDoTab
                  project={project}
                  onOpenLuuTemplate={() => setIsLuuTemplateOpen(true)}
                />
              )}

              {/* TAB CONTENT 2: BÁO CÁO TIẾN ĐỘ */}
              {activeTab === 'bao-cao-tien-do' && (
                <BaoCaoTienDoTab project={project} />
              )}

              {/* TAB CONTENT 3: NHÂN SỰ & CÔNG VIỆC */}
              {activeTab === 'nhan-su-cong-viec' && (
                <NhanSuCongViecTab project={project} />
              )}

              {/* TAB CONTENT 4: CHI PHÍ PHÒNG BAN */}
              {activeTab === 'chi-phi-phong-ban' && (
                <ChiPhiPhongBanTab project={project} />
              )}

              {/* TAB CONTENT 5: PHÊ DUYỆT BÁO CÁO */}
              {activeTab === 'phe-duyet' && (
                <PheDuyetBaoCaoTab project={project} />
              )}

              {/* TAB CONTENT 6: NGHIỆM THU */}
              {activeTab === 'nghiem-thu' && (
                <NghiemThuTab project={project} />
              )}

            </div>
          )}

        </div>

      </div>

      {/* YÊU CẦU SẢN XUẤT MODAL */}
      <YeuCauSanXuatModal
        isOpen={isYcsxModalOpen}
        onClose={() => setIsYcsxModalOpen(false)}
        project={project}
      />

      {/* LƯU TEMPLATE MODAL */}
      <LuuTemplateModal
        isOpen={isLuuTemplateOpen}
        onClose={() => setIsLuuTemplateOpen(false)}
        project={project}
      />

    </div>
  );
}
