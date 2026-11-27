"use client";

import React from 'react';
import { IconX, IconTrash } from '@tabler/icons-react';
import { ThamNienItem } from '../../index';

interface XoaThamNienModalProps {
  item: ThamNienItem | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export default function XoaThamNienModal({
  item,
  onClose,
  onConfirm,
}: XoaThamNienModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-[1px] p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#406c89] text-white">
          <div className="flex items-center gap-2">
            <IconTrash size={18} />
            <h3 className="text-sm font-bold">Xác nhận xóa</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
          >
            <IconX size={16} />
          </button>
        </div>

        <div className="p-5 text-xs text-slate-600 space-y-2">
          <p>
            Bạn có chắc chắn muốn xóa bản ghi thâm niên của{' '}
            <span className="font-bold text-slate-800">{item.hoTen}</span> ({item.maNV})?
          </p>
          <p className="text-[11px] text-slate-400">Hành động này không thể hoàn tác.</p>
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-medium cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(item.id);
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold cursor-pointer"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
