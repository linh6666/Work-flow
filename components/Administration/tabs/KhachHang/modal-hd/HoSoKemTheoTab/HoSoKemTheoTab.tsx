"use client";

import React, { useState } from 'react';
import { IconUpload, IconTrash, IconFile, IconChevronDown } from '@tabler/icons-react';

interface HoSoKemTheoTabProps {
  danhSachFile: File[];
  setDanhSachFile: React.Dispatch<React.SetStateAction<File[]>>;
}

const DANH_MUC = [
  'Hợp đồng & Phụ lục',
  'Báo giá & Dự toán',
  'Bản vẽ thiết kế',
  'Biên bản nghiệm thu',
  'Hóa đơn & Chứng từ',
  'Khác',
];

const EXT_COLORS: Record<string, string> = {
  pdf:  'bg-red-50 text-red-600 border-red-200',
  doc:  'bg-blue-50 text-blue-600 border-blue-200',
  docx: 'bg-blue-50 text-blue-600 border-blue-200',
  xls:  'bg-green-50 text-green-600 border-green-200',
  xlsx: 'bg-green-50 text-green-600 border-green-200',
  jpg:  'bg-amber-50 text-amber-600 border-amber-200',
  jpeg: 'bg-amber-50 text-amber-600 border-amber-200',
  png:  'bg-purple-50 text-purple-600 border-purple-200',
  dwg:  'bg-cyan-50 text-cyan-600 border-cyan-200',
};

function formatSize(bytes: number) {
  if (bytes > 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

interface FileWithMeta {
  file: File;
  danhMuc: string;
  ghiChu: string;
}

export default function HoSoKemTheoTab({ danhSachFile, setDanhSachFile }: HoSoKemTheoTabProps) {
  const [fileMetas, setFileMetas] = useState<FileWithMeta[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const filtered = newFiles.filter(
      (nf) => !danhSachFile.some((f) => f.name === nf.name && f.size === nf.size)
    );
    setDanhSachFile((prev) => [...prev, ...filtered]);
    setFileMetas((prev) => [
      ...prev,
      ...filtered.map((f) => ({ file: f, danhMuc: 'Khác', ghiChu: '' })),
    ]);
    e.target.value = '';
  };

  const removeFile = (idx: number) => {
    setDanhSachFile((prev) => prev.filter((_, i) => i !== idx));
    setFileMetas((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateMeta = (idx: number, field: 'danhMuc' | 'ghiChu', val: string) => {
    setFileMetas((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, [field]: val } : m))
    );
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
          <p className="text-xs text-slate-400 mt-0.5">PDF, DOCX, XLSX, DWG, JPG, PNG – tối đa 20MB mỗi file</p>
        </div>
        <input
          id="hd-file-upload"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg,.jpg,.jpeg,.png"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* File list */}
      {danhSachFile.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {danhSachFile.length} tệp đã chọn
          </p>
          {danhSachFile.map((file, idx) => {
            const meta = fileMetas[idx] ?? { danhMuc: 'Khác', ghiChu: '' };
            const ext = file.name.split('.').pop()?.toLowerCase() || '';
            const extColor = EXT_COLORS[ext] || 'bg-slate-50 text-slate-600 border-slate-200';
            return (
              <div
                key={idx}
                className="rounded-lg border border-slate-100 bg-white shadow-xs overflow-hidden"
              >
                {/* File header row */}
                <div className="flex items-center gap-3 px-3.5 py-2.5">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-md border text-[10px] font-extrabold uppercase shrink-0 ${extColor}`}>
                    {ext || <IconFile size={14} />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{file.name}</p>
                    <p className="text-xs text-slate-400">{formatSize(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer shrink-0"
                    title="Xóa tệp"
                  >
                    <IconTrash size={14} />
                  </button>
                </div>

                {/* Danh mục + Ghi chú */}
                <div className="px-3.5 pb-3 flex gap-2 border-t border-slate-50">
                  <div className="relative w-44 shrink-0 pt-2">
                    <select
                      value={meta.danhMuc}
                      onChange={(e) => updateMeta(idx, 'danhMuc', e.target.value)}
                      className="h-8 w-full rounded-md border border-slate-200 bg-slate-50 pl-2.5 pr-7 text-xs text-slate-600 outline-none appearance-none cursor-pointer focus:border-indigo-300"
                    >
                      {DANH_MUC.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <IconChevronDown size={12} className="absolute right-2 top-1/2 translate-y-0.5 text-slate-400 pointer-events-none" />
                  </div>
                  <input
                    type="text"
                    value={meta.ghiChu}
                    onChange={(e) => updateMeta(idx, 'ghiChu', e.target.value)}
                    placeholder="Ghi chú..."
                    className="flex-1 mt-2 h-8 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-xs text-slate-700 outline-none focus:border-indigo-300 transition"
                  />
                </div>
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
