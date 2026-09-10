"use client";

import React from 'react';
import type { PhieuSuaChuaItem } from '../../../SuaChua';

interface SuaChuaDeleteModalProps {
	isOpen: boolean;
	item: PhieuSuaChuaItem | null;
	onClose: () => void;
	onConfirm: (id: string) => void;
}

export default function SuaChuaDeleteModal({ isOpen, item, onClose, onConfirm }: SuaChuaDeleteModalProps) {
	if (!isOpen || !item) return null;

	const handleConfirm = () => {
		onConfirm(item.id);
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-1 backdrop-blur-sm sm:p-2">
			<div className="w-full max-w-[512px] rounded-lg border border-slate-200/80 bg-white p-6 text-slate-700 shadow-2xl">
				<h3 className="text-base font-bold tracking-tight text-slate-800">Xác nhận xóa</h3>
				<p className="mt-2 text-sm leading-5 text-slate-500">Bạn có chắc muốn xóa mục <span className="font-bold text-slate-800">&quot;{item.ten_may}&quot;</span>? Hành động này không thể hoàn tác.</p>
				<div className="mt-5 flex justify-end gap-2">
					<button type="button" onClick={onClose} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">Hủy</button>
					<button type="button" onClick={handleConfirm} className="rounded-lg bg-[#406c89] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#345870]">Xóa</button>
				</div>
			</div>
		</div>
	);
}
