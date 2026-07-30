"use client";

import React, { useState } from 'react';
import {
  IconX,
  IconGridDots,
  IconFolder,
  IconDeviceFloppy
} from '@tabler/icons-react';
import { DuAnItem } from '../../index';
import ApDungTemplate from '../ApDungTemplate';
import LuuTemplateMoi from '../LuuTemplateMoi';

interface LuuTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: DuAnItem;
  onSaveSuccess?: (templateName: string) => void;
}

export default function LuuTemplateModal({ isOpen, onClose, project, onSaveSuccess }: LuuTemplateModalProps) {
  const [activeTab, setActiveTab] = useState<'ap-dung' | 'luu-moi'>('luu-moi');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] text-left select-none animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#406c89]/10 text-[#406c89] flex items-center justify-center shrink-0 border border-[#406c89]/20">
              <IconGridDots size={18} />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 tracking-tight">
              Template Hồ sơ Quản lý Dự án
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* TAB NAVIGATION BAR */}
        <div className="px-6 border-b border-slate-200/80 flex items-center gap-6 text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('ap-dung')}
            className={`pb-2.5 pt-1 flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
              activeTab === 'ap-dung'
                ? 'text-[#406c89] border-b-2 border-[#406c89]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <IconFolder size={16} />
            <span>Áp dụng Template</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('luu-moi')}
            className={`pb-2.5 pt-1 flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
              activeTab === 'luu-moi'
                ? 'text-[#406c89] border-b-2 border-[#406c89]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <IconDeviceFloppy size={16} />
            <span>Lưu Template mới</span>
          </button>
        </div>

        {/* MODAL BODY RENDER TAB COMPONENTS FROM SEPARATE FOLDERS */}
        <div className="flex-1 overflow-y-auto p-6 text-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {activeTab === 'ap-dung' && (
            <ApDungTemplate
              project={project}
              onApplySuccess={onSaveSuccess}
              onClose={onClose}
            />
          )}

          {activeTab === 'luu-moi' && (
            <LuuTemplateMoi
              project={project}
              onSaveSuccess={onSaveSuccess}
              onClose={onClose}
            />
          )}
        </div>

      </div>
    </div>
  );
}
