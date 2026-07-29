"use client";

import React, { useState } from 'react';
import {
  IconX,
  IconPlus,
  IconEdit,
  IconTrash,
  IconCopy,
  IconStack,
  IconBuildingSkyscraper,
  IconBooks,
} from '@tabler/icons-react';
import TaoTemplateMoiModal from '../TaoTemplateMoi';

export interface TemplateItem {
  id: string;
  tenTemplate: string;
  phamVi: string; // e.g. "Tổng thể dự án", "Ban Giám đốc", "Phòng Ghép", "Phòng Mộc Sơn"...
  phongBan: string;
  soCongViecText: string; // e.g. "— công việc", "16 công việc"
  moTa?: string;
  taoBoi: string;
  soLanDung: number;
  isPurpleIcon?: boolean;
}

const INITIAL_TEMPLATES: TemplateItem[] = [
  {
    id: 'tpl-1',
    tenTemplate: 'DA KHU CONG NGHIEP - MH NHAN BAN',
    phamVi: 'Tổng thể dự án',
    phongBan: 'Tất cả phòng',
    soCongViecText: '— công việc',
    taoBoi: 'Thảo Phùng',
    soLanDung: 1,
    isPurpleIcon: true,
  },
  {
    id: 'tpl-2',
    tenTemplate: 'P.CN&TK - MẪU 1',
    phamVi: 'Tổng thể dự án',
    phongBan: 'Phòng CN&TK',
    soCongViecText: '— công việc',
    taoBoi: 'Trần Diễm My',
    soLanDung: 0,
    isPurpleIcon: true,
  },
  {
    id: 'tpl-3',
    tenTemplate: 'BGĐ-MẪU 1',
    phamVi: 'Ban Giám đốc',
    phongBan: 'Ban Giám đốc',
    soCongViecText: '16 công việc',
    taoBoi: 'Thảo Phùng',
    soLanDung: 4,
    isPurpleIcon: false,
  },
  {
    id: 'tpl-4',
    tenTemplate: 'P. GHÉP - MẪU 1',
    phamVi: 'Phòng Ghép',
    phongBan: 'Phòng Ghép',
    soCongViecText: '— công việc',
    taoBoi: 'Trần Diễm My',
    soLanDung: 1,
    isPurpleIcon: false,
  },
  {
    id: 'tpl-5',
    tenTemplate: 'P. CẮT - MẪU 1',
    phamVi: 'Phòng Cắt',
    phongBan: 'Phòng Cắt',
    soCongViecText: '— công việc',
    taoBoi: 'Trần Diễm My',
    soLanDung: 1,
    isPurpleIcon: false,
  },
  {
    id: 'tpl-6',
    tenTemplate: 'P. KHAI TRIỂN - MẪU 1',
    phamVi: 'Phòng Khai triển',
    phongBan: 'Phòng Khai triển',
    soCongViecText: '— công việc',
    taoBoi: 'Trần Diễm My',
    soLanDung: 3,
    isPurpleIcon: false,
  },
  {
    id: 'tpl-7',
    tenTemplate: 'P. CẢNH QUAN - MẪU 1',
    phamVi: 'Phòng Cảnh quan',
    phongBan: 'Phòng Cảnh quan',
    soCongViecText: '— công việc',
    taoBoi: 'Trần Diễm My',
    soLanDung: 2,
    isPurpleIcon: false,
  },
  {
    id: 'tpl-8',
    tenTemplate: 'P.ĐIỆN - MẪU 1',
    phamVi: 'Phòng Điện',
    phongBan: 'Phòng Điện',
    soCongViecText: '— công việc',
    taoBoi: 'Trần Diễm My',
    soLanDung: 1,
    isPurpleIcon: false,
  },
  {
    id: 'tpl-9',
    tenTemplate: 'P.MỘC SƠN - MẪU 1',
    phamVi: 'Phòng Mộc Sơn',
    phongBan: 'Phòng Mộc Sơn',
    soCongViecText: '— công việc',
    taoBoi: 'Trần Diễm My',
    soLanDung: 1,
    isPurpleIcon: false,
  },
  {
    id: 'tpl-10',
    tenTemplate: 'P. CÔNG NGHỆ & TK - MẪU 1',
    phamVi: 'Phòng Công nghệ và Thiết kế',
    phongBan: 'Phòng CN&TK',
    soCongViecText: '— công việc',
    taoBoi: 'congnghevathietke.mhv',
    soLanDung: 8,
    isPurpleIcon: false,
  },
  {
    id: 'tpl-11',
    tenTemplate: 'TEMP 1',
    phamVi: 'Phòng Khai triển',
    phongBan: 'Phòng Khai triển',
    soCongViecText: '— công việc',
    moTa: 'Mẫu báo cáo dùng chung cho tất cả các loại dự án',
    taoBoi: 'trandiemmy86',
    soLanDung: 3,
    isPurpleIcon: false,
  },
  {
    id: 'tpl-12',
    tenTemplate: 'DỰ ÁN QUY HOẠCH',
    phamVi: 'Tổng thể dự án',
    phongBan: 'Tất cả phòng',
    soCongViecText: '— công việc',
    taoBoi: 'Thao Phung',
    soLanDung: 0,
    isPurpleIcon: true,
  },
];

interface QuanLyTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuanLyTemplateModal({ isOpen, onClose }: QuanLyTemplateModalProps) {
  const [templates, setTemplates] = useState<TemplateItem[]>(INITIAL_TEMPLATES);
  const [selectedPhamVi, setSelectedPhamVi] = useState<string>('Tất cả phạm vi');
  const [selectedPhong, setSelectedPhong] = useState<string>('Tất cả phòng');
  const [isCreating, setIsCreating] = useState(false);
  const [isTaoTemplateMoiOpen, setIsTaoTemplateMoiOpen] = useState(false);

  const handleCreateNewTemplateSubmit = (data: {
    tenTemplate: string;
    phamVi: string;
    phongBan: string;
    moTa: string;
    tasks: any[];
  }) => {
    const newItem: TemplateItem = {
      id: `tpl-${Date.now()}`,
      tenTemplate: data.tenTemplate,
      phamVi: data.phamVi,
      phongBan: data.phongBan,
      soCongViecText: `${data.tasks.length} công việc`,
      moTa: data.moTa || undefined,
      taoBoi: 'Quản trị viên',
      soLanDung: 0,
      isPurpleIcon: data.phamVi === 'Tổng thể dự án',
    };
    setTemplates([newItem, ...templates]);
  };

  // Form states
  const [newTen, setNewTen] = useState('');
  const [newPhamVi, setNewPhamVi] = useState('Tổng thể dự án');
  const [newPhong, setNewPhong] = useState('Ban Giám đốc');
  const [newMoTa, setNewMoTa] = useState('');

  if (!isOpen) return null;

  const filteredTemplates = templates.filter(tpl => {
    const matchPhamVi = selectedPhamVi === 'Tất cả phạm vi' || tpl.phamVi === selectedPhamVi;
    const matchPhong = selectedPhong === 'Tất cả phòng' || tpl.phongBan === selectedPhong;
    return matchPhamVi && matchPhong;
  });

  const handleAddTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTen.trim()) return;

    const newItem: TemplateItem = {
      id: `tpl-${Date.now()}`,
      tenTemplate: newTen,
      phamVi: newPhamVi,
      phongBan: newPhong,
      soCongViecText: '— công việc',
      moTa: newMoTa || undefined,
      taoBoi: 'Quản trị viên',
      soLanDung: 0,
      isPurpleIcon: newPhamVi === 'Tổng thể dự án',
    };

    setTemplates([newItem, ...templates]);
    setIsCreating(false);
    setNewTen('');
    setNewMoTa('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa template này?')) {
      setTemplates(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleCopy = (tpl: TemplateItem) => {
    const copied: TemplateItem = {
      ...tpl,
      id: `tpl-${Date.now()}`,
      tenTemplate: `${tpl.tenTemplate} - BẢN SAO`,
      soLanDung: 0,
    };
    setTemplates([copied, ...templates]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-2 sm:p-4 animate-fade-in">
      <div className="bg-[#f8fafc] rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-5xl max-h-[95vh] sm:max-h-[92vh] flex flex-col overflow-hidden text-slate-700">

        {/* ══ HEADER ══ */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-white border-b border-slate-200/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 text-[#406c89] min-w-0">
            <IconBooks size={22} className="stroke-[2.2] shrink-0" />
            <h3 className="text-base sm:text-lg font-extrabold tracking-tight truncate">Quản lý Template Dự án</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* ══ TOOLBAR / FILTERS (RESPONSIVE) ══ */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-slate-50 border-b border-slate-200/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-wrap flex-1">
            <select
              value={selectedPhamVi}
              onChange={e => setSelectedPhamVi(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#406c89] shadow-2xs cursor-pointer w-full sm:w-auto"
            >
              <option value="Tất cả phạm vi">Tất cả phạm vi</option>
              <option value="Tổng thể dự án">Tổng thể dự án</option>
              <option value="Ban Giám đốc">Ban Giám đốc</option>
              <option value="Phòng Mộc Sơn">Phòng Mộc Sơn</option>
              <option value="Phòng Công nghệ và Thiết kế">Phòng Công nghệ và Thiết kế</option>
              <option value="Phòng Khai triển">Phòng Khai triển</option>
              <option value="Phòng Cảnh quan">Phòng Cảnh quan</option>
              <option value="Phòng Điện">Phòng Điện</option>
              <option value="Phòng Ghép">Phòng Ghép</option>
              <option value="Phòng Cắt">Phòng Cắt</option>
            </select>

            <select
              value={selectedPhong}
              onChange={e => setSelectedPhong(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#406c89] shadow-2xs cursor-pointer w-full sm:w-auto"
            >
              <option value="Tất cả phòng">Tất cả phòng</option>
              <option value="Ban Giám đốc">Ban Giám đốc</option>
              <option value="Phòng CN&amp;TK">Phòng CN&amp;TK</option>
              <option value="Phòng Mộc Sơn">Phòng Mộc Sơn</option>
              <option value="Phòng Khai triển">Phòng Khai triển</option>
              <option value="Phòng Cảnh quan">Phòng Cảnh quan</option>
              <option value="Phòng Điện">Phòng Điện</option>
              <option value="Phòng Ghép">Phòng Ghép</option>
              <option value="Phòng Cắt">Phòng Cắt</option>
            </select>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <span className="text-xs text-slate-400 font-medium">{filteredTemplates.length} mẫu</span>
            <button
              type="button"
              onClick={() => setIsTaoTemplateMoiOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <IconPlus size={14} />
              <span>Tạo mẫu mới</span>
            </button>
          </div>
        </div>

        {/* ══ BODY / LIST (HIDDEN SCROLLBAR & RESPONSIVE) ══ */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3.5 sm:py-4 space-y-2.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

          {isCreating && (
            <form onSubmit={handleAddTemplate} className="bg-white border border-[#406c89]/40 rounded-xl p-4 space-y-3 shadow-sm mb-3">
              <h4 className="text-xs font-bold text-[#406c89]">TẠO MẪU TEMPLATE MỚI</h4>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tên Mẫu Template *</label>
                <input
                  type="text"
                  required
                  value={newTen}
                  onChange={e => setNewTen(e.target.value)}
                  placeholder="VD: P.MỘC SƠN - MẪU 1"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-[#406c89]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Phạm vi</label>
                  <select
                    value={newPhamVi}
                    onChange={e => setNewPhamVi(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700"
                  >
                    <option value="Tổng thể dự án">Tổng thể dự án</option>
                    <option value="Ban Giám đốc">Ban Giám đốc</option>
                    <option value="Phòng Mộc Sơn">Phòng Mộc Sơn</option>
                    <option value="Phòng Khai triển">Phòng Khai triển</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Phòng ban</label>
                  <select
                    value={newPhong}
                    onChange={e => setNewPhong(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700"
                  >
                    <option value="Ban Giám đốc">Ban Giám đốc</option>
                    <option value="Phòng CN&amp;TK">Phòng CN&amp;TK</option>
                    <option value="Phòng Mộc Sơn">Phòng Mộc Sơn</option>
                    <option value="Phòng Khai triển">Phòng Khai triển</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Mô tả (tùy chọn)</label>
                <input
                  type="text"
                  value={newMoTa}
                  onChange={e => setNewMoTa(e.target.value)}
                  placeholder="Mẫu báo cáo dùng chung cho tất cả các loại dự án..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-[#406c89]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-1 border border-slate-200 rounded-md text-xs text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-[#406c89] text-white text-xs font-semibold rounded-md hover:bg-[#345972] cursor-pointer"
                >
                  Lưu
                </button>
              </div>
            </form>
          )}

          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              Không có mẫu nào phù hợp với bộ lọc.
            </div>
          ) : (
            filteredTemplates.map((item) => {
              const isPurple = item.isPurpleIcon || item.phamVi === 'Tổng thể dự án';
              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl p-3 sm:p-3.5 shadow-2xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 group"
                >
                  {/* Left Side: Icon + Details */}
                  <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    {/* Icon Box */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isPurple ? 'bg-purple-100 text-purple-600' : 'bg-[#406c89]/10 text-[#406c89]'
                    }`}>
                      {isPurple ? <IconStack size={18} /> : <IconBuildingSkyscraper size={18} />}
                    </div>

                    {/* Text content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <span className="text-xs font-bold text-[#406c89] tracking-tight leading-snug">
                          {item.tenTemplate}
                        </span>

                        {/* Badge */}
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium shrink-0 ${
                          isPurple
                            ? 'bg-purple-100/80 text-purple-700'
                            : 'bg-[#406c89]/10 text-[#406c89] border border-[#406c89]/20'
                        }`}>
                          {item.phamVi}
                        </span>

                        <span className="text-xs text-slate-400 font-medium shrink-0">
                          {item.soCongViecText}
                        </span>
                      </div>

                      {/* Description if present */}
                      {item.moTa && (
                        <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                          {item.moTa}
                        </p>
                      )}

                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Tạo bởi: <span className="text-slate-500 font-medium">{item.taoBoi}</span> · Dùng {item.soLanDung} lần
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Action Icons */}
                  <div className="flex items-center justify-end gap-1 shrink-0 opacity-90 sm:opacity-80 group-hover:opacity-100 transition-opacity border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <button
                      type="button"
                      onClick={() => alert(`Chỉnh sửa ${item.tenTemplate}`)}
                      className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Sửa"
                    >
                      <IconEdit size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopy(item)}
                      className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Sao chép"
                    >
                      <IconCopy size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Xóa"
                    >
                      <IconTrash size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ══ FOOTER ══ */}
        <div className="px-4 sm:px-6 py-3.5 bg-white border-t border-slate-200/80 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center"
          >
            Đóng
          </button>
        </div>

      </div>

      {/* TAO TEMPLATE MOI MODAL */}
      <TaoTemplateMoiModal
        isOpen={isTaoTemplateMoiOpen}
        onClose={() => setIsTaoTemplateMoiOpen(false)}
        onSubmit={handleCreateNewTemplateSubmit}
      />
    </div>
  );
}
