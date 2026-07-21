"use client";

import React, { useState } from 'react';

export interface ChinhSuaTienDoTabProps {
  thoiGianBatDau?: string;
  setThoiGianBatDau?: (v: string) => void;
  thoiGianKetThuc?: string;
  setThoiGianKetThuc?: (v: string) => void;
  tongThoiGian?: string;
  setTongThoiGian?: (v: string) => void;
  nghiemThuLan1?: string;
  setNghiemThuLan1?: (v: string) => void;
  nghiemThuCuoiCung?: string;
  setNghiemThuCuoiCung?: (v: string) => void;
  duKienVanChuyen?: string;
  setDuKienVanChuyen?: (v: string) => void;
  duKienLapDat?: string;
  setDuKienLapDat?: (v: string) => void;
  soNhanSuLapDat?: string;
  setSoNhanSuLapDat?: (v: string) => void;
  [key: string]: any;
}

export default function ChinhSuaTienDoTab(props: ChinhSuaTienDoTabProps) {
  // Local fallback state
  const [localBatDau, setLocalBatDau] = useState('2026-07-21');
  const [localKetThuc, setLocalKetThuc] = useState('');
  const [localTongThoiGian, setLocalTongThoiGian] = useState('');
  const [localNghiemThu1, setLocalNghiemThu1] = useState('');
  const [localNghiemThuCuoi, setLocalNghiemThuCuoi] = useState('');
  const [localVanChuyen, setLocalVanChuyen] = useState('');
  const [localLapDat, setLocalLapDat] = useState('');
  const [localNhanSu, setLocalNhanSu] = useState('');
  const [showError, setShowError] = useState(false);

  const thoiGianBatDau = props.thoiGianBatDau !== undefined ? props.thoiGianBatDau : localBatDau;
  const setThoiGianBatDau = props.setThoiGianBatDau || setLocalBatDau;

  const thoiGianKetThuc = props.thoiGianKetThuc !== undefined ? props.thoiGianKetThuc : localKetThuc;
  const setThoiGianKetThuc = props.setThoiGianKetThuc || setLocalKetThuc;

  const tongThoiGian = props.tongThoiGian !== undefined ? props.tongThoiGian : localTongThoiGian;
  const setTongThoiGian = props.setTongThoiGian || setLocalTongThoiGian;

  const nghiemThuLan1 = props.nghiemThuLan1 !== undefined ? props.nghiemThuLan1 : localNghiemThu1;
  const setNghiemThuLan1 = props.setNghiemThuLan1 || setLocalNghiemThu1;

  const nghiemThuCuoiCung = props.nghiemThuCuoiCung !== undefined ? props.nghiemThuCuoiCung : localNghiemThuCuoi;
  const setNghiemThuCuoiCung = props.setNghiemThuCuoiCung || setLocalNghiemThuCuoi;

  const duKienVanChuyen = props.duKienVanChuyen !== undefined ? props.duKienVanChuyen : localVanChuyen;
  const setDuKienVanChuyen = props.setDuKienVanChuyen || setLocalVanChuyen;

  const duKienLapDat = props.duKienLapDat !== undefined ? props.duKienLapDat : localLapDat;
  const setDuKienLapDat = props.setDuKienLapDat || setLocalLapDat;

  const soNhanSuLapDat = props.soNhanSuLapDat !== undefined ? props.soNhanSuLapDat : localNhanSu;
  const setSoNhanSuLapDat = props.setSoNhanSuLapDat || setLocalNhanSu;

  return (
    <div className="space-y-4 animate-fade-in text-xs text-slate-800">
      
      {/* 1. ROW 1: THỜI GIAN BẮT ĐẦU & THỜI GIAN KẾT THÚC */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Thời gian bắt đầu
          </label>
          <input
            type="date"
            value={thoiGianBatDau}
            onChange={(e) => setThoiGianBatDau(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Thời gian kết thúc
          </label>
          <input
            type="date"
            value={thoiGianKetThuc}
            onChange={(e) => setThoiGianKetThuc(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs cursor-pointer"
          />
        </div>
      </div>

      {/* 2. ROW 2: TỔNG THỜI GIAN THỰC HIỆN (NGÀY) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Tổng thời gian thực hiện (ngày)
        </label>
        <input
          type="text"
          value={tongThoiGian}
          onChange={(e) => setTongThoiGian(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
        />
      </div>

      {/* 3. ROW 3: NGHIỆM THU LẦN 1 & NGHIỆM THU CUỐI CÙNG */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Nghiệm thu lần 1
          </label>
          <input
            type="date"
            value={nghiemThuLan1}
            onChange={(e) => setNghiemThuLan1(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Nghiệm thu cuối cùng
          </label>
          <input
            type="date"
            value={nghiemThuCuoiCung}
            onChange={(e) => setNghiemThuCuoiCung(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs cursor-pointer"
          />
        </div>
      </div>

      {/* 4. ROW 4: DỰ KIẾN VẬN CHUYỂN & DỰ KIẾN LẮP ĐẶT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Dự kiến vận chuyển
          </label>
          <input
            type="date"
            value={duKienVanChuyen}
            onChange={(e) => setDuKienVanChuyen(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Dự kiến lắp đặt
          </label>
          <input
            type="date"
            value={duKienLapDat}
            onChange={(e) => setDuKienLapDat(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs cursor-pointer"
          />
        </div>
      </div>

      {/* 5. ROW 5: SỐ NHÂN SỰ ĐI LẮP ĐẶT * */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Số nhân sự đi lắp đặt <span className="text-red-500 font-normal">*</span>
        </label>
        <input
          type="text"
          required
          value={soNhanSuLapDat}
          onChange={(e) => {
            setSoNhanSuLapDat(e.target.value);
            if (e.target.value) setShowError(false);
          }}
          onBlur={() => {
            if (!soNhanSuLapDat) setShowError(true);
          }}
          placeholder="VD: 3 người"
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs placeholder:text-slate-400"
        />
        {(!soNhanSuLapDat || showError) && (
          <p className="text-[11px] text-red-500 font-normal pt-0.5">
            Vui lòng nhập số nhân sự đi lắp đặt
          </p>
        )}
      </div>

    </div>
  );
}
