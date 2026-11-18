"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconCheck, IconFileCheck } from '@tabler/icons-react';
import { PhongVanItem } from '../index';

interface PhieuDanhGiaModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: PhongVanItem | null;
  onSave?: (updated: PhongVanItem) => void;
}

export default function PhieuDanhGiaModal({
  isOpen,
  onClose,
  candidate,
  onSave,
}: PhieuDanhGiaModalProps) {
  const [ketQua, setKetQua] = useState<'PASS' | 'FAIL' | '—'>('PASS');
  const [nhanViec, setNhanViec] = useState<'PASS' | 'FAIL' | '—'>('PASS');
  const [ngayDiLam, setNgayDiLam] = useState('');
  const [ghiChu, setGhiChu] = useState('');

  useEffect(() => {
    if (candidate) {
      setKetQua(candidate.ketQua !== '—' ? candidate.ketQua : 'PASS');
      setNhanViec(candidate.uvNhanViec !== '—' ? candidate.uvNhanViec : 'PASS');
      setNgayDiLam(candidate.ngayBatDauDiLam !== '—' ? candidate.ngayBatDauDiLam : '');
      setGhiChu(candidate.ghiChu !== '—' ? candidate.ghiChu : '');
    }
  }, [candidate]);

  if (!isOpen || !candidate) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        ...candidate,
        phieuDg: 'Đã lập phiếu',
        uvColor: ketQua === 'PASS' ? 'green' : 'red',
        uvDatYeuCau: ketQua,
        uvNhanViec: nhanViec,
        ketQua,
        ngayBatDauDiLam: ngayDiLam || candidate.ngayBatDauDiLam,
        ghiChu: ghiChu || candidate.ghiChu,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden animate-scale-up text-slate-700">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#406c89]/10 text-[#406c89] flex items-center justify-center">
              <IconFileCheck size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Phiếu Đánh Giá Phỏng Vấn
              </h3>
              <p className="text-[11px] text-slate-400">
                Ứng viên: <span className="font-semibold text-slate-700">{candidate.hoTenUv}</span> ({candidate.chucVu})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Candidate Quick Info */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px]">
            <div>
              <span className="text-slate-400">Phòng ban:</span>{' '}
              <strong className="text-slate-700">{candidate.phongBan}</strong>
            </div>
            <div>
              <span className="text-slate-400">Điện thoại:</span>{' '}
              <strong className="text-slate-700">{candidate.dienThoai}</strong>
            </div>
            <div>
              <span className="text-slate-400">Lịch PV:</span>{' '}
              <strong className="text-slate-700">{candidate.lichPv1Ngay} ({candidate.gioPv})</strong>
            </div>
            <div>
              <span className="text-slate-400">Trạng thái phiếu:</span>{' '}
              <strong className="text-blue-600 font-semibold">{candidate.phieuDg}</strong>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Đánh giá kết quả</label>
              <select
                value={ketQua}
                onChange={(e) => setKetQua(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] bg-white"
              >
                <option value="PASS">PASS (Đạt yêu cầu)</option>
                <option value="FAIL">FAIL (Không đạt)</option>
                <option value="—">— (Chưa đánh giá)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">Ứng viên nhận việc</label>
              <select
                value={nhanViec}
                onChange={(e) => setNhanViec(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89] bg-white"
              >
                <option value="PASS">PASS (Đồng ý nhận việc)</option>
                <option value="FAIL">FAIL (Từ chối nhận việc)</option>
                <option value="—">— (Chờ phản hồi)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Ngày bắt đầu đi làm</label>
            <input
              type="text"
              placeholder="VD: 23/11/2026"
              value={ngayDiLam}
              onChange={(e) => setNgayDiLam(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Ghi chú phỏng vấn</label>
            <textarea
              rows={3}
              placeholder="Nhập ghi chú, trình độ chuyên môn, ngoại ngữ..."
              value={ghiChu}
              onChange={(e) => setGhiChu(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#406c89]"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium rounded-lg text-xs transition-colors"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#406c89] hover:bg-[#345972] text-white font-medium rounded-lg text-xs transition-colors shadow-xs"
            >
              <IconCheck size={14} />
              <span>Lưu phiếu đánh giá</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
