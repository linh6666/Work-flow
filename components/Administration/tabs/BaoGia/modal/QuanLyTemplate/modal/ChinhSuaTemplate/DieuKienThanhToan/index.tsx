"use client";

import React, { useState } from 'react';
import { IconPlus, IconTrash } from '@tabler/icons-react';

export interface DieuKienItem {
  id: string;
  tieuDe: string;
  noiDung: string;
}

interface DieuKienThanhToanTabProps {
  thoiGianSanXuat?: number;
  setThoiGianSanXuat?: (v: number) => void;
  baoHanhThang?: number;
  setBaoHanhThang?: (v: number) => void;
  phuongThucThanhToan?: string;
  setPhuongThucThanhToan?: (v: string) => void;
  dieuKienList?: DieuKienItem[];
  onAddDieuKien?: () => void;
  onUpdateDieuKien?: (id: string, field: keyof DieuKienItem, value: string) => void;
  onDeleteDieuKien?: (id: string) => void;
}

const DEFAULT_DIEU_KIEN: DieuKienItem[] = [
  {
    id: 'dk-1',
    tieuDe: '1. Báo giá dựa trên hồ sơ thiết kế',
    noiDung: 'Giá trên được tính toán dựa trên file bản vẽ CAD/3D do bên A cung cấp. Trường hợp có chỉnh sửa thiết kế trong quá trình thi công sẽ tính phát sinh theo thỏa thuận.',
  },
  {
    id: 'dk-2',
    tieuDe: '2. Phạm vi bàn giao và lắp đặt',
    noiDung: 'Bao gồm chi phí vận chuyển và lắp đặt hoàn thiện tại địa điểm của bên A trong phạm vi nội thành.',
  },
];

export default function DieuKienThanhToanTabWrapper(props: DieuKienThanhToanTabProps) {
  // Fallback state
  const [localSanXuat, setLocalSanXuat] = useState<number>(60);
  const [localBaoHanh, setLocalBaoHanh] = useState<number>(18);
  const [localPhuongThuc, setLocalPhuongThuc] = useState<string>('');
  const [localList, setLocalList] = useState<DieuKienItem[]>(DEFAULT_DIEU_KIEN);

  const thoiGianSanXuat = props.thoiGianSanXuat !== undefined ? props.thoiGianSanXuat : localSanXuat;
  const setThoiGianSanXuat = props.setThoiGianSanXuat || setLocalSanXuat;

  const baoHanhThang = props.baoHanhThang !== undefined ? props.baoHanhThang : localBaoHanh;
  const setBaoHanhThang = props.setBaoHanhThang || setLocalBaoHanh;

  const phuongThucThanhToan = props.phuongThucThanhToan !== undefined ? props.phuongThucThanhToan : localPhuongThuc;
  const setPhuongThucThanhToan = props.setPhuongThucThanhToan || setLocalPhuongThuc;

  const dieuKienList = props.dieuKienList || localList;

  const handleAddDK = () => {
    if (props.onAddDieuKien) {
      props.onAddDieuKien();
    } else {
      const newDK: DieuKienItem = {
        id: `dk-${Date.now()}`,
        tieuDe: `${localList.length + 1}. Điều kiện mới`,
        noiDung: '',
      };
      setLocalList([...localList, newDK]);
    }
  };

  const handleUpdateDK = (id: string, field: keyof DieuKienItem, val: string) => {
    if (props.onUpdateDieuKien) {
      props.onUpdateDieuKien(id, field, val);
    } else {
      setLocalList((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: val } : item)));
    }
  };

  const handleDeleteDK = (id: string) => {
    if (props.onDeleteDieuKien) {
      props.onDeleteDieuKien(id);
    } else {
      setLocalList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-4 animate-fade-in text-xs text-slate-800">
      
      {/* 1. ROW 1: THỜI GIAN SẢN XUẤT (NGÀY) & BẢO HÀNH (THÁNG) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Thời gian sản xuất (ngày)
          </label>
          <input
            type="number"
            min="1"
            value={thoiGianSanXuat}
            onChange={(e) => setThoiGianSanXuat(parseInt(e.target.value) || 0)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Bảo hành (tháng)
          </label>
          <input
            type="number"
            min="1"
            value={baoHanhThang}
            onChange={(e) => setBaoHanhThang(parseInt(e.target.value) || 0)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* 2. ROW 2: PHƯƠNG THỨC THANH TOÁN */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Phương thức thanh toán
        </label>
        <textarea
          rows={3}
          value={phuongThucThanhToan}
          onChange={(e) => setPhuongThucThanhToan(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all min-h-[90px] leading-relaxed shadow-2xs resize-y"
        />
      </div>

      {/* 3. ROW 3: DIVIDER LINE & ĐIỀU KIỆN BÁO GIÁ HEADER BAR */}
      <div className="border-t border-slate-200/60 pt-4 space-y-3">
        <div className="flex items-center justify-between select-none">
          <h4 className="font-extrabold text-slate-900 text-xs tracking-tight">
            Điều kiện báo giá
          </h4>
          <button
            type="button"
            onClick={handleAddDK}
            className="flex items-center gap-1 px-3.5 py-1.5 bg-white border border-slate-200/90 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
          >
            <IconPlus size={14} className="text-slate-700" />
            <span>Thêm</span>
          </button>
        </div>

        {/* 4. DYNAMIC CARDS LIST */}
       
      </div>

    </div>
  );
}
