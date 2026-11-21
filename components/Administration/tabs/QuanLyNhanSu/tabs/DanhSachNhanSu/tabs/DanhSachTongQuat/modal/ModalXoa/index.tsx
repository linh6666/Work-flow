"use client";

import React, { useState } from 'react';
import { IconTrash, IconLoader2 } from '@tabler/icons-react';
import { NhanSuItem } from '../../index';
import { deleteStaff } from '@/api/apiGetStaffList';

interface ModalXoaProps {
  isOpen: boolean;
  item: NhanSuItem | null;
  onConfirm: (item: NhanSuItem) => void;
  onClose: () => void;
}

export default function ModalXoa({
  isOpen,
  item,
  onConfirm,
  onClose,
}: ModalXoaProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !item) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteStaff(item.id);
      onConfirm(item);
      onClose();
    } catch (err: any) {
      console.error("Lỗi khi xóa nhân sự:", err);
      alert(err?.message || "Không thể xóa nhân sự trên máy chủ");
      onConfirm(item);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-150 p-6 text-center">
        {/* Icon Header with theme color #406c89 */}
        <div className="w-12 h-12 rounded-full bg-[#406c89]/10 text-[#406c89] flex items-center justify-center mx-auto mb-3.5 ring-8 ring-[#406c89]/5">
          <IconTrash size={24} />
        </div>
        
        <h4 className="text-sm font-bold text-slate-800 mb-1.5">Xác nhận xóa nhân sự</h4>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Bạn có chắc chắn muốn xóa nhân sự{' '}
          <span className="font-semibold text-slate-800">{item.hoTen}</span>{' '}
          (<span className="font-medium text-[#406c89]">{item.maNV}</span>) khỏi hệ thống không?
        </p>

        <div className="flex items-center justify-center gap-2.5">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 text-xs font-medium cursor-pointer transition shadow-2xs"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-[#406c89] hover:bg-[#345870] disabled:opacity-70 text-white text-xs font-medium shadow-xs cursor-pointer transition flex items-center gap-1.5"
          >
            {isDeleting && <IconLoader2 size={14} className="animate-spin" />}
            <span>{isDeleting ? 'Đang xóa...' : 'Xác nhận xóa'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
