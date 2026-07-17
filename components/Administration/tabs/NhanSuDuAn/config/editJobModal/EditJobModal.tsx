"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';

interface JobData {
  code: string;
  name: string;
}

interface EditJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobData | null;
  deptName: string;
  onSave: (updatedJob: JobData & { dept: string }) => void;
}

export default function EditJobModal({ isOpen, onClose, job, deptName, onSave }: EditJobModalProps) {
  const [jobName, setJobName] = useState('');

  // Prefill data when modal opens
  useEffect(() => {
    if (isOpen && job) {
      setJobName(job.name);
    }
  }, [isOpen, job]);

  if (!isOpen || !job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobName.trim()) {
      alert('Vui lòng nhập tên hạng mục công việc!');
      return;
    }
    onSave({
      code: job.code,
      name: jobName.trim(),
      dept: deptName,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content Card */}
      <div className="relative bg-white w-full max-w-[390px] rounded-2xl shadow-lg border border-slate-100/50 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-slate-800">Chỉnh sửa hạng mục</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-650 transition-colors cursor-pointer bg-transparent border-0"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Tên hạng mục */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700">
              Tên hạng mục <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              required
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              placeholder="VD: Cắt nền..."
              className="w-full px-4 py-3 text-xs font-semibold rounded-xl border border-indigo-500 bg-white text-slate-800 placeholder-slate-400/80 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-slate-650 hover:bg-slate-50 rounded-xl transition-all cursor-pointer bg-white border border-slate-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-[#2b2c7c] hover:bg-[#1e1f57] rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer border-0"
            >
              <IconDeviceFloppy size={16} />
              Lưu
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
