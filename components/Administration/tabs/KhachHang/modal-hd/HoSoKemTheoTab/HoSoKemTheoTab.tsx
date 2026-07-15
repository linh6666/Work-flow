"use client";

import React from 'react';
import { IconUpload, IconTrash } from '@tabler/icons-react';

interface HoSoKemTheoTabProps {
  danhSachFile: File[];
  setDanhSachFile: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function HoSoKemTheoTab({ danhSachFile, setDanhSachFile }: HoSoKemTheoTabProps) {
  const extColors: Record<string, string> = {
    pdf: 'bg-red-50 text-red-600 border-red-200',
    doc: 'bg-blue-50 text-blue-600 border-blue-200',
    docx: 'bg-blue-50 text-blue-600 border-blue-200',
    xls: 'bg-green-50 text-green-600 border-green-200',
    xlsx: 'bg-green-50 text-green-600 border-green-200',
    jpg: 'bg-amber-50 text-amber-600 border-amber-200',
    jpeg: 'bg-amber-50 text-amber-600 border-amber-200',
    png: 'bg-purple-50 text-purple-600 border-purple-200',
  };

  return (
    <div className="tab-content-active space-y-4">
      {/* Drop zone */}
      <label
        htmlFor="hd-file-upload"
        className="flex flex-col items-center justify-center gap-3 w-full border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/60 py-8 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
      >
        <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-100 transition-all">
          <IconUpload size={22} className="text-emerald-500" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-700">Nhấn để chọn file hoặc kéo thả vào đây</p>
          <p className="text-xs text-slate-400 mt-0.5">PDF, DOCX, XLSX, JPG, PNG – tối đa 20MB mỗi file</p>
        </div>
        <input
          id="hd-file-upload"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => {
            const newFiles = Array.from(e.target.files || []);
            setDanhSachFile((prev) => [
              ...prev,
              ...newFiles.filter((nf) => !prev.some((f) => f.name === nf.name && f.size === nf.size)),
            ]);
            e.target.value = '';
          }}
        />
      </label>

      {/* File list */}
      {danhSachFile.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {danhSachFile.length} tệp đã chọn
          </p>
          {danhSachFile.map((file, idx) => {
            const sizeKb = (file.size / 1024).toFixed(1);
            const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
            const displaySize = file.size > 1024 * 1024 ? `${sizeMb} MB` : `${sizeKb} KB`;
            const ext = file.name.split('.').pop()?.toLowerCase() || '';
            const extColor = extColors[ext] || 'bg-slate-50 text-slate-600 border-slate-200';
            return (
              <div
                key={idx}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg border border-slate-100 bg-white shadow-xs hover:border-slate-200 transition-all"
              >
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-md border text-[10px] font-extrabold uppercase ${extColor}`}>
                  {ext}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{file.name}</p>
                  <p className="text-xs text-slate-400">{displaySize}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDanhSachFile((prev) => prev.filter((_, i) => i !== idx))}
                  className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                  title="Xóa tệp"
                >
                  <IconTrash size={14} />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-xs text-slate-400 py-2">Chưa có tệp nào được chọn.</p>
      )}
    </div>
  );
}
