"use client";

import React from 'react';
import { 
  IconChevronUp, 
  IconUpload, 
  IconPaperclip, 
  IconTrash 
} from '@tabler/icons-react';

interface HoSoDinhKemTabProps {
  danhSachFile: File[];
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}

export default function HoSoDinhKemTab({
  danhSachFile,
  onFileUpload,
  onRemoveFile,
}: HoSoDinhKemTabProps) {
  return (
    <div className="p-4 rounded-xl border border-slate-200/80 bg-[#f8fafc]/60 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
        <h5 className="text-xs font-bold text-slate-800">
          Tài liệu / Hình ảnh đính kèm (phục vụ phê duyệt)
        </h5>
        <IconChevronUp size={16} className="text-slate-400" />
      </div>

      <div className="space-y-3">
        <div>
          <h6 className="text-xs font-bold text-slate-800">
            Tài liệu / Hình ảnh đính kèm (phục vụ phê duyệt)
          </h6>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Tải lên bản vẽ, hồ sơ, hình ảnh tham khảo... để phục vụ phê duyệt báo giá.
          </p>
        </div>

        <div>
          <label className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer">
            <IconUpload size={14} className="text-[#406c89]" />
            <span>Chọn tệp để tải lên</span>
            <input type="file" multiple className="hidden" onChange={onFileUpload} />
          </label>
        </div>

        {/* File list preview */}
        {danhSachFile.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-200/50">
            {danhSachFile.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg text-xs">
                <div className="flex items-center gap-2 truncate">
                  <IconPaperclip size={14} className="text-[#406c89] shrink-0" />
                  <span className="font-medium text-slate-700 truncate max-w-[450px]">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveFile(idx)}
                  className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                  title="Xóa tệp"
                >
                  <IconTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
