"use client";

import React, { useState, useEffect } from 'react';
import ThongTinCoBan from '../TaoDuAn/tabs/ThongTinCoBan';
import ThongTinChung from '../TaoDuAn/tabs/ThongTinChung';
import TienDoDiaDiem from '../TaoDuAn/tabs/TienDoDiaDiem';
import { 
  IconX, 
  IconLink, 
  IconLayoutGrid 
} from '@tabler/icons-react';
import { NotificationExtension } from '@/common/extension/NotificationExtension';
import { DuAnItem } from '../../index';

interface SuaDuAnModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: DuAnItem | null;
  onSubmit: (updatedData: DuAnItem) => void;
}

type TabType = 'basic' | 'general' | 'progress';

export default function SuaDuAnModal({
  isOpen,
  onClose,
  project,
  onSubmit,
}: SuaDuAnModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basic');

  // Top level selections
  const [ycsxId, setYcsxId] = useState('');
  const [templateId, setTemplateId] = useState('');

  // Form states - Tab 1 (Thông tin cơ bản)
  const [maDuAn, setMaDuAn] = useState('');
  const [trangThai, setTrangThai] = useState<'Đang thực hiện' | 'Hoàn thành' | 'Tạm dừng' | 'Chưa bắt đầu'>('Đang thực hiện');
  const [tenDuAn, setTenDuAn] = useState('');
  const [ngayBatDau, setNgayBatDau] = useState('');
  const [ngayKetThuc, setNgayKetThuc] = useState('');
  const [baselineBatDau, setBaselineBatDau] = useState('');
  const [baselineKetThuc, setBaselineKetThuc] = useState('');
  const [tienDo, setTienDo] = useState(0);
  const [moTa, setMoTa] = useState('');

  // Tab 2 (Thông tin chung)
  const [khachHang, setKhachHang] = useState('');
  const [tyLe, setTyLe] = useState('');
  const [kichThuoc, setKichThuoc] = useState('');
  const [capDoDuAn, setCapDoDuAn] = useState('V');

  // Tab 3 (Tiến độ & Địa điểm)
  const [diaDiemLapDat, setDiaDiemLapDat] = useState('');
  const [duKienNtLan1, setDuKienNtLan1] = useState('');
  const [duKienNtCuoi, setDuKienNtCuoi] = useState('');
  const [duKienVanChuyen, setDuKienVanChuyen] = useState('');
  const [duKienLapDat, setDuKienLapDat] = useState('');
  const [soNvLapDat, setSoNvLapDat] = useState('');
  const [khoiLuongNtLan1, setKhoiLuongNtLan1] = useState('');

  // Extra hidden fields
  const [indexText, setIndexText] = useState('—');
  const [tienDoText, setTienDoText] = useState<'Chưa đánh giá' | 'Đúng tiến độ' | 'Trễ tiến độ' | 'Vượt tiến độ' | 'Chậm tiến độ, lỗi khách quan'>('Chưa đánh giá');

  useEffect(() => {
    if (project && isOpen) {
      setMaDuAn(project.maDuAn || '');
      setTenDuAn(project.tenDuAn || '');
      setMoTa(project.moTa || '');
      setNgayBatDau(project.ngayBatDau || '');
      setNgayKetThuc(project.ngayKetThuc || '');
      setTienDo(project.tienDo || 0);
      setTrangThai(project.trangThai || 'Đang thực hiện');
      setTienDoText(project.tienDoText || 'Chưa đánh giá');
      setIndexText(project.indexText || '—');
      setBaselineBatDau(project.baselineBatDau || '');
      setBaselineKetThuc(project.baselineKetThuc || '');
      setYcsxId(project.ycsxId || '');
      setTemplateId(project.templateId || '');
      setKhachHang(project.khachHang || '');
      setTyLe(project.tyLe || '');
      setKichThuoc(project.kichThuoc || '');
      setCapDoDuAn(project.capDoDuAn || 'V');
      setDiaDiemLapDat(project.diaDiemLapDat || project.diaDiem || '');
      setDuKienNtLan1(project.duKienNtLan1 || '');
      setDuKienNtCuoi(project.duKienNtCuoi || '');
      setDuKienVanChuyen(project.duKienVanChuyen || '');
      setDuKienLapDat(project.duKienLapDat || '');
      setSoNvLapDat(project.soNvLapDat || '');
      setKhoiLuongNtLan1(project.khoiLuongNtLan1 || '');
      setActiveTab('basic');
    }
  }, [project, isOpen]);

  if (!isOpen || !project) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!tenDuAn.trim()) {
      setActiveTab('basic');
      NotificationExtension.Warn("Vui lòng nhập Tên dự án tại tab Thông tin cơ bản!");
      return;
    }

    const updated: DuAnItem = {
      ...project,
      maDuAn,
      tenDuAn,
      moTa,
      ngayBatDau,
      ngayKetThuc,
      tienDo,
      indexText,
      trangThai,
      tienDoText,
      diaDiem: diaDiemLapDat,
      baselineBatDau,
      baselineKetThuc,
      ycsxId,
      templateId,
      khachHang,
      tyLe,
      kichThuoc,
      capDoDuAn,
      diaDiemLapDat,
      duKienNtLan1,
      duKienNtCuoi,
      duKienVanChuyen,
      duKienLapDat,
      soNvLapDat,
      khoiLuongNtLan1,
    };

    onSubmit(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all scale-100 animate-scale-up flex flex-col max-h-[95vh]">
        
        {/* Modal header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60 shrink-0">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base tracking-tight">Chỉnh sửa dự án</h3>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Modal body (Scrollable wrapper containing banners, tabs, and form content) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* TOP CARD 1: Liên kết YCSX */}
          <div className="bg-blue-50/40 border border-blue-100/70 rounded-xl p-3.5 space-y-1.5 text-left text-xs">
            <div className="flex items-center gap-1.5 text-[#1d4ed8] font-bold">
              <IconLink size={15} />
              <span>Liên kết YCSX đã duyệt</span>
            </div>
            <select
              value={ycsxId}
              onChange={(e) => setYcsxId(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            >
              <option value="">-- Chọn YCSX --</option>
              <option value="ycsx-01">YCSX-2026-001 (Thiết kế L'Aurora)</option>
              <option value="ycsx-02">YCSX-2026-002 (Mô hình Heritage Tây Ninh)</option>
            </select>
          </div>

          {/* TOP CARD 2: Áp dụng template */}
          <div className="bg-emerald-50/40 border border-emerald-100/70 rounded-xl p-3.5 space-y-1.5 text-left text-xs">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <IconLayoutGrid size={15} />
              <span>Áp dụng template hồ sơ phòng ban</span>
            </div>
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            >
              <option value="">-- Không áp dụng template --</option>
              <option value="temp-01">Template mô hình quy hoạch</option>
              <option value="temp-02">Template mô hình công trình cao tầng</option>
            </select>
          </div>

          {/* Tab Navigation */}
          <div className="bg-slate-100 p-1 rounded-xl flex gap-1 w-full text-xs font-semibold select-none">
            <button
              type="button"
              onClick={() => setActiveTab('basic')}
              className={`py-2 px-3 rounded-lg text-center flex-1 transition-all cursor-pointer ${
                activeTab === 'basic' ? 'bg-white text-slate-800 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Thông tin cơ bản
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('general')}
              className={`py-2 px-3 rounded-lg text-center flex-1 transition-all cursor-pointer ${
                activeTab === 'general' ? 'bg-white text-slate-800 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Thông tin chung
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('progress')}
              className={`py-2 px-3 rounded-lg text-center flex-1 transition-all cursor-pointer ${
                activeTab === 'progress' ? 'bg-white text-slate-800 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Tiến độ & Địa điểm
            </button>
          </div>

          {/* Tab Contents */}
          <div className="text-xs text-left text-slate-700">
            {activeTab === 'basic' && (
              <ThongTinCoBan
                maDuAn={maDuAn}
                setMaDuAn={setMaDuAn}
                trangThai={trangThai}
                setTrangThai={setTrangThai}
                tenDuAn={tenDuAn}
                setTenDuAn={setTenDuAn}
                ngayBatDau={ngayBatDau}
                setNgayBatDau={setNgayBatDau}
                ngayKetThuc={ngayKetThuc}
                setNgayKetThuc={setNgayKetThuc}
                baselineBatDau={baselineBatDau}
                setBaselineBatDau={setBaselineBatDau}
                baselineKetThuc={baselineKetThuc}
                setBaselineKetThuc={setBaselineKetThuc}
                tienDo={tienDo}
                setTienDo={setTienDo}
                moTa={moTa}
                setMoTa={setMoTa}
              />
            )}

            {activeTab === 'general' && (
              <ThongTinChung
                khachHang={khachHang}
                setKhachHang={setKhachHang}
                tyLe={tyLe}
                setTyLe={setTyLe}
                kichThuoc={kichThuoc}
                setKichThuoc={setKichThuoc}
                capDoDuAn={capDoDuAn}
                setCapDoDuAn={setCapDoDuAn}
              />
            )}

            {activeTab === 'progress' && (
              <TienDoDiaDiem
                diaDiemLapDat={diaDiemLapDat}
                setDiaDiemLapDat={setDiaDiemLapDat}
                duKienNtLan1={duKienNtLan1}
                setDuKienNtLan1={setDuKienNtLan1}
                duKienNtCuoi={duKienNtCuoi}
                setDuKienNtCuoi={setDuKienNtCuoi}
                duKienVanChuyen={duKienVanChuyen}
                setDuKienVanChuyen={setDuKienVanChuyen}
                duKienLapDat={duKienLapDat}
                setDuKienLapDat={setDuKienLapDat}
                soNvLapDat={soNvLapDat}
                setSoNvLapDat={setSoNvLapDat}
                khoiLuongNtLan1={khoiLuongNtLan1}
                setKhoiLuongNtLan1={setKhoiLuongNtLan1}
              />
            )}
          </div>
        </div>

        {/* Modal footer (Fixed style matching mockup buttons) */}
        <div className="px-6 py-4 border-t border-slate-100 flex gap-2.5 justify-end shrink-0 bg-slate-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg font-semibold transition-colors cursor-pointer shadow-2xs text-xs"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="px-5 py-2 bg-[#406c89] hover:bg-[#345972] active:scale-95 text-white rounded-lg font-semibold transition-all cursor-pointer shadow-sm text-xs"
          >
            Lưu
          </button>
        </div>

      </div>
    </div>
  );
}
