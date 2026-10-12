"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconFilePlus,
} from '@tabler/icons-react';
import { DeXuatNVLItem } from '../../index';

interface ModalBoSungNVLProps {
  isOpen: boolean;
  item: DeXuatNVLItem | null;
  onClose: () => void;
  onSave: (itemId: string, additionalCount: number, additionalAmount: number) => void;
}

export default function ModalBoSungNVL({
  isOpen,
  item,
  onClose,
  onSave,
}: ModalBoSungNVLProps) {
  const [lyDo, setLyDo] = useState('');

  useEffect(() => {
    if (isOpen) {
      setLyDo('');
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(item.id, 0, 0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start gap-3 mb-3">
            <IconFilePlus size={22} className="text-[#406c89] shrink-0 mt-0.5" />
            <h3 className="text-[15px] font-bold text-slate-800">Lập đề xuất bổ sung</h3>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Đề xuất{' '}
            <span className="font-semibold text-slate-800">{item.thangNam}</span>{' '}
            của{' '}
            <span className="font-semibold text-[#406c89]">{item.phongBan}</span>{' '}
            đã được PGĐ duyệt và không thể chỉnh sửa. Đề xuất bổ sung sẽ tạo bản mới với danh sách NVL trống (giữ cột dự án gốc), đi luồng phê duyệt lại.
          </p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="px-5 pb-5 space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Lý do bổ sung
              </label>
              <textarea
                rows={4}
                value={lyDo}
                onChange={(e) => setLyDo(e.target.value)}
                placeholder="Mô tả lý do cần bổ sung NVL..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 focus:border-[#406c89] placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-[#406c89] hover:bg-[#345973] rounded-lg transition-colors cursor-pointer"
            >
              Tạo bổ sung
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
