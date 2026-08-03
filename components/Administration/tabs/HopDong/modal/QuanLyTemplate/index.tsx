"use client";

import React, { useState } from 'react';
import {
  IconX,
  IconEye,
  IconPencil,
  IconDownload,
  IconCopy,
  IconTrash,
  IconPlus,
  IconFileExport,
  IconFileImport,
  IconFileWord,
} from '@tabler/icons-react';
import TaoMauMoiModal from '../TaoMauMoi';
import XemMauModal from '../XemMau';
import ChinhSuaMauModal from '../ChinhSuaMau';
import XoaMauModal from '../XoaMau';

export interface ContractTemplateItem {
  id: string;
  title: string;
  lang: string;
  author: string;
  usedCount: number;
}

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuanLyTemplateModal({ isOpen, onClose }: TemplateModalProps) {
  const [isTaoMauModalOpen, setIsTaoMauModalOpen] = useState(false);
  const [isXemMauModalOpen, setIsXemMauModalOpen] = useState(false);
  const [isChinhSuaModalOpen, setIsChinhSuaModalOpen] = useState(false);
  const [isXoaMauModalOpen, setIsXoaMauModalOpen] = useState(false);

  const [selectedTemplateForView, setSelectedTemplateForView] = useState<ContractTemplateItem | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<ContractTemplateItem | null>(null);
  const [deletingTemplate, setDeletingTemplate] = useState<ContractTemplateItem | null>(null);

  const [templates, setTemplates] = useState<ContractTemplateItem[]>([
    {
      id: 'tpl-1',
      title: 'Mẫu Hợp đồng song ngữ VIE_ENG_2026',
      lang: 'vi_en',
      author: 'Thảo Phùng',
      usedCount: 0,
    },
    {
      id: 'tpl-2',
      title: 'Model Making Contract (Eng)_2026',
      lang: 'en',
      author: 'Hệ thống (Import)',
      usedCount: 0,
    },
    {
      id: 'tpl-3',
      title: 'Mẫu Hợp đồng Tiếng Việt_2026',
      lang: 'vi',
      author: 'Thao Phung',
      usedCount: 0,
    },
  ]);

  if (!isOpen) return null;

  const handleDuplicate = (tpl: ContractTemplateItem) => {
    const newTpl: ContractTemplateItem = {
      ...tpl,
      id: `tpl-${Date.now()}`,
      title: `${tpl.title} (Sao chép)`,
    };
    setTemplates((prev) => [...prev, newTpl]);
  };

  const handleDelete = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const handleRequestDelete = (tpl: ContractTemplateItem) => {
    setDeletingTemplate(tpl);
    setIsXoaMauModalOpen(true);
  };

  const handleCreateNew = () => {
    setIsTaoMauModalOpen(true);
  };

  const handleEditTemplate = (tpl: ContractTemplateItem) => {
    setEditingTemplate(tpl);
    setIsChinhSuaModalOpen(true);
  };

  const handleViewTemplate = (tpl: ContractTemplateItem) => {
    setSelectedTemplateForView(tpl);
    setIsXemMauModalOpen(true);
  };

  const handleSaveNewTemplate = (newTpl: ContractTemplateItem) => {
    setTemplates((prev) => [newTpl, ...prev]);
  };

  const handleSaveUpdatedTemplate = (updatedTpl: ContractTemplateItem) => {
    setTemplates((prev) => prev.map((t) => (t.id === updatedTpl.id ? updatedTpl : t)));
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
        {/* Modal Container */}
        <div className="bg-white rounded-xl shadow-2xl border border-slate-100 w-full max-w-2xl overflow-hidden animate-scale-up p-6 space-y-5">

          {/* Header Title & Close Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Quản lý Mẫu Hợp đồng
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
            >
              <IconX size={18} />
            </button>
          </div>

          {/* Count & Action Buttons Row */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs text-slate-500 font-medium">
              {templates.length} mẫu
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Xuất Word */}
              <button
                type="button"
                onClick={() => alert('Xuất danh sách mẫu ra Word')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                <IconFileExport size={14} className="text-slate-500" />
                <span>Xuất Word</span>
              </button>

              {/* Nhập JSON */}
              <button
                type="button"
                onClick={() => alert('Nhập mẫu từ file JSON')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                <IconFileImport size={14} className="text-slate-500" />
                <span>Nhập JSON</span>
              </button>

              {/* Nhập từ Word */}
              <button
                type="button"
                onClick={() => alert('Nhập mẫu từ file Word')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                <IconFileWord size={14} className="text-slate-500" />
                <span>Nhập từ Word</span>
              </button>

              {/* Tạo mẫu mới */}
              <button
                type="button"
                onClick={handleCreateNew}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <IconPlus size={14} />
                <span>Tạo mẫu mới</span>
              </button>
            </div>
          </div>

          {/* Template List */}
          <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
            {templates.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 bg-slate-50/50 rounded-xl border border-slate-100">
                Chưa có mẫu hợp đồng nào. Nhấn "Tạo mẫu mới" để thêm.
              </div>
            ) : (
              templates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-white border border-slate-200/80 rounded-xl px-4 py-3 flex items-center justify-between transition-all hover:border-slate-300 hover:bg-slate-50/40"
                >
                  {/* Left: Title & Metadata */}
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-800 text-sm leading-snug">
                      {tpl.title}
                    </div>
                    <div className="text-[11px] text-[#d97706] font-medium flex items-center gap-1">
                      <span>{tpl.lang}</span>
                      <span className="text-slate-300">·</span>
                      <span>{tpl.author}</span>
                      <span className="text-slate-300">·</span>
                      <span>Dùng {tpl.usedCount} lần</span>
                    </div>
                  </div>

                  {/* Right: Action Icons */}
                  <div className="flex items-center gap-2 text-slate-400 shrink-0 ml-4">
                    <button
                      type="button"
                      title="Xem chi tiết"
                      onClick={() => handleViewTemplate(tpl)}
                      className="p-1 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      <IconEye size={16} />
                    </button>
                    <button
                      type="button"
                      title="Chỉnh sửa"
                      onClick={() => handleEditTemplate(tpl)}
                      className="p-1 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      <IconPencil size={16} />
                    </button>
                    <button
                      type="button"
                      title="Tải xuống"
                      onClick={() => alert(`Tải xuống mẫu: ${tpl.title}`)}
                      className="p-1 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      <IconDownload size={16} />
                    </button>
                    <button
                      type="button"
                      title="Nhân bản"
                      onClick={() => handleDuplicate(tpl)}
                      className="p-1 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      <IconCopy size={16} />
                    </button>
                    <button
                      type="button"
                      title="Xóa"
                      onClick={() => handleRequestDelete(tpl)}
                      className="p-1 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <IconTrash size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Close Button */}
          <div className="pt-1 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              Đóng
            </button>
          </div>

        </div>
      </div>

      {/* 1. Modal Tạo Mẫu Mới */}
      <TaoMauMoiModal
        isOpen={isTaoMauModalOpen}
        onClose={() => setIsTaoMauModalOpen(false)}
        onSave={handleSaveNewTemplate}
      />

      {/* 2. Modal Chỉnh Sửa Mẫu */}
      <ChinhSuaMauModal
        isOpen={isChinhSuaModalOpen}
        onClose={() => setIsChinhSuaModalOpen(false)}
        template={editingTemplate}
        onSave={handleSaveUpdatedTemplate}
      />

      {/* 3. Modal Xem Mẫu */}
      <XemMauModal
        isOpen={isXemMauModalOpen}
        onClose={() => setIsXemMauModalOpen(false)}
        template={selectedTemplateForView}
        onDeleteRequest={(templateToDelete) => {
          setIsXemMauModalOpen(false);
          handleRequestDelete(templateToDelete);
        }}
        onEdit={(templateToEdit) => {
          setIsXemMauModalOpen(false);
          handleEditTemplate(templateToEdit);
        }}
      />

      {/* 4. Modal Xác Nhận Xóa */}
      <XoaMauModal
        isOpen={isXoaMauModalOpen}
        onClose={() => setIsXoaMauModalOpen(false)}
        template={deletingTemplate}
        onConfirm={handleDelete}
      />
    </>
  );
}
