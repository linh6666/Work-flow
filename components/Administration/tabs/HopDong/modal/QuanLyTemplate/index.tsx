"use client";

import React, { useState } from 'react';
import {
  IconX,
  IconEye,
  IconPencil,
  IconCopy,
  IconTrash,
  IconPlus
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
      title: 'MAU HOP DONG TIENG VIET',
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
      title: `${tpl.title} (SAO CHEP)`,
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
        <div className="bg-white rounded-xl shadow-2xl border border-slate-100 w-full max-w-2xl overflow-hidden animate-scale-up p-6 space-y-6">
          
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

          {/* Count & Action Button Row */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-400 font-normal">
              {templates.length} mẫu
            </span>
            <button
              type="button"
              onClick={handleCreateNew}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <IconPlus size={16} />
              <span>Tạo mẫu mới</span>
            </button>
          </div>

          {/* Template List */}
          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {templates.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 bg-slate-50/50 rounded-xl border border-slate-100">
                Chưa có mẫu hợp đồng nào. Nhấn "Tạo mẫu mới" để thêm.
              </div>
            ) : (
              templates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-4 flex items-center justify-between transition-all hover:border-slate-300"
                >
                  {/* Left Title & Metadata */}
                  <div className="space-y-1">
                    <div className="font-bold text-slate-800 text-xs tracking-wide uppercase">
                      {tpl.title}
                    </div>
                    <div className="text-xs text-slate-400 font-normal flex items-center gap-1">
                      <span>{tpl.lang}</span>
                      <span>·</span>
                      <span>{tpl.author}</span>
                      <span>·</span>
                      <span>Dùng {tpl.usedCount} lần</span>
                    </div>
                  </div>

                  {/* Right Action Icons */}
                  <div className="flex items-center gap-3 text-slate-600">
                    <button
                      type="button"
                      title="Xem chi tiết"
                      onClick={() => handleViewTemplate(tpl)}
                      className="p-1 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <IconEye size={18} />
                    </button>
                    <button
                      type="button"
                      title="Chỉnh sửa"
                      onClick={() => handleEditTemplate(tpl)}
                      className="p-1 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <IconPencil size={18} />
                    </button>
                    <button
                      type="button"
                      title="Nhân bản"
                      onClick={() => handleDuplicate(tpl)}
                      className="p-1 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <IconCopy size={18} />
                    </button>
                    <button
                      type="button"
                      title="Xóa"
                      onClick={() => handleRequestDelete(tpl)}
                      className="p-1 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <IconTrash size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Divider & Footer Close Button */}
          <div className="pt-2 border-t border-slate-100 flex justify-end">
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

      {/* 1. Modal Tạo Mẫu Mới trong folder riêng TaoMauMoi */}
      <TaoMauMoiModal
        isOpen={isTaoMauModalOpen}
        onClose={() => setIsTaoMauModalOpen(false)}
        onSave={handleSaveNewTemplate}
      />

      {/* 2. Modal Chỉnh Sửa Mẫu trong folder riêng ChinhSuaMau */}
      <ChinhSuaMauModal
        isOpen={isChinhSuaModalOpen}
        onClose={() => setIsChinhSuaModalOpen(false)}
        template={editingTemplate}
        onSave={handleSaveUpdatedTemplate}
      />

      {/* 3. Modal Xem Mẫu Hợp Đồng trong folder riêng XemMau */}
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

      {/* 4. Modal Xác Nhận Xóa Mẫu trong folder riêng XoaMau */}
      <XoaMauModal
        isOpen={isXoaMauModalOpen}
        onClose={() => setIsXoaMauModalOpen(false)}
        template={deletingTemplate}
        onConfirm={handleDelete}
      />
    </>
  );
}
