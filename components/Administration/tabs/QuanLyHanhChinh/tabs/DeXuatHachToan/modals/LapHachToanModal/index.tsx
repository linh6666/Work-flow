"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconReceipt,
  IconCalendar,
  IconFileText,
  IconCheck,
} from '@tabler/icons-react';
import type { DeXuatHachToanItem } from '../../types';

interface LapHachToanModalProps {
  isOpen: boolean;
  record: DeXuatHachToanItem | null;
  onClose: () => void;
  onSubmit: (updatedRecord: DeXuatHachToanItem) => void;
}

export default function LapHachToanModal({
  isOpen,
  record,
  onClose,
  onSubmit,
}: LapHachToanModalProps) {
  const [soHT, setSoHT] = useState('');
  const [ngayHachToan, setNgayHachToan] = useState('');
  const [tongTienHT, setTongTienHT] = useState('');
  const [trangThaiHT, setTrangThaiHT] = useState('Chờ QL KD duyệt');
  const [taiKhoanNo, setTaiKhoanNo] = useState('6422 - Chi phí quản lý doanh nghiệp');
  const [taiKhoanCo, setTaiKhoanCo] = useState('1121 - Tiền gửi ngân hàng');
  const [nguoiLap, setNguoiLap] = useState('Kế toán viên');
  const [dienGiaiHT, setDienGiaiHT] = useState('');

  useEffect(() => {
    if (record) {
      // Tự động tạo gợi ý mã chứng từ HT từ mã đề xuất
      let suggestedSoHT = '';
      if (record.soDeXuat && record.soDeXuat !== '—') {
        suggestedSoHT = record.soDeXuat.replace('ĐXDC', 'HT').replace('ĐX', 'HT');
      } else {
        const cleanThang = (record.thang || '10').replace('Tháng ', '');
        suggestedSoHT = `${cleanThang}-${record.nam || 2026}/HT-HC`;
      }

      setSoHT(suggestedSoHT);
      setTongTienHT(record.tongTien && record.tongTien !== '—' ? record.tongTien : '0 đ');
      setDienGiaiHT(
        record.dienGiai && record.dienGiai !== '—'
          ? `Hạch toán chi phí: ${record.dienGiai}`
          : `Hạch toán chi phí ${record.thang || ''}/${record.nam || ''}`
      );
      setTrangThaiHT('Chờ QL KD duyệt');

      // Ngày hiện tại định dạng YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0];
      setNgayHachToan(today);
    }
  }, [record]);

  if (!isOpen || !record) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!record) return;

    const loaiArr = Array.isArray(record.loai) ? record.loai : [];
    const updatedRecord: DeXuatHachToanItem = {
      ...record,
      soHT: soHT.trim() || `${(record.thang || '10').replace('Tháng ', '')}-${record.nam || 2026}/HT-HC`,
      tongTienHT: tongTienHT.trim() || record.tongTien,
      trangThaiHT: trangThaiHT,
      loai: loaiArr.includes('Hạch toán')
        ? loaiArr
        : [...loaiArr, 'Hạch toán'],
    };

    onSubmit(updatedRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <IconReceipt size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Lập phiếu hạch toán chi phí
              </h2>
              <p className="text-xs text-slate-500">
                Khởi tạo chứng từ hạch toán cho đề xuất duyệt chi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 text-xs overflow-y-auto flex-1">
          {/* Card thông tin đề xuất liên quan */}
          <div className="bg-[#fbfcfd] border border-slate-200 rounded-xl p-3.5 space-y-2">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <IconFileText size={14} className="text-[#406c89]" />
              <span>Thông tin đề xuất được liên kết</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1 border-t border-slate-100">
              <div>
                <span className="text-slate-400 block text-[11px]">Số đề xuất:</span>
                <span className="font-bold text-[#6366f1]">{record.soDeXuat}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Kỳ chi phí:</span>
                <span className="font-semibold text-slate-700">{record.thang} / {record.nam}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Số mục:</span>
                <span className="font-semibold text-slate-700">{record.soMuc}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Tổng tiền đề xuất:</span>
                <span className="font-bold text-[#406c89]">{record.tongTien}</span>
              </div>
            </div>
            {record.dienGiai && record.dienGiai !== '—' && (
              <div className="text-slate-600 text-[11.5px] pt-1 border-t border-slate-100">
                <span className="text-slate-400">Nội dung đề xuất: </span>
                {record.dienGiai}
              </div>
            )}
          </div>

          {/* Nhập liệu chứng từ hạch toán */}
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Số chứng từ HT */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Số chứng từ hạch toán (Số HT) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={soHT}
                  onChange={(e) => setSoHT(e.target.value)}
                  placeholder="VD: 41-2026/HT-HC"
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                />
              </div>

              {/* Ngày hạch toán */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Ngày hạch toán <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={ngayHachToan}
                    onChange={(e) => setNgayHachToan(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                  />
                  <IconCalendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Tổng tiền HT */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tổng tiền hạch toán <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={tongTienHT}
                  onChange={(e) => setTongTienHT(e.target.value)}
                  placeholder="VD: 4.000.000 đ"
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                />
              </div>

              {/* Trạng thái HT ban đầu */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Trạng thái duyệt hạch toán
                </label>
                <select
                  value={trangThaiHT}
                  onChange={(e) => setTrangThaiHT(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer"
                >
                  <option value="Chờ QL KD duyệt">Chờ QL KD duyệt</option>
                  <option value="Chờ PGĐ duyệt">Chờ PGĐ duyệt</option>
                  <option value="PGĐ đã duyệt">PGĐ đã duyệt</option>
                </select>
              </div>
            </div>

            {/* Tài khoản định khoản */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tài khoản Nợ
                </label>
                <select
                  value={taiKhoanNo}
                  onChange={(e) => setTaiKhoanNo(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer"
                >
                  <option value="6422 - Chi phí quản lý doanh nghiệp">6422 - Chi phí quản lý doanh nghiệp</option>
                  <option value="6421 - Chi phí bán hàng">6421 - Chi phí bán hàng</option>
                  <option value="154 - Chi phí SXKD dở dang">154 - Chi phí SXKD dở dang</option>
                  <option value="242 - Chi phí trả trước">242 - Chi phí trả trước</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tài khoản Có
                </label>
                <select
                  value={taiKhoanCo}
                  onChange={(e) => setTaiKhoanCo(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer"
                >
                  <option value="1121 - Tiền gửi ngân hàng">1121 - Tiền gửi ngân hàng</option>
                  <option value="1111 - Tiền mặt tại quỹ">1111 - Tiền mặt tại quỹ</option>
                  <option value="331 - Phải trả người bán">331 - Phải trả người bán</option>
                  <option value="141 - Tạm ứng nội bộ">141 - Tạm ứng nội bộ</option>
                </select>
              </div>
            </div>

            {/* Diễn giải hạch toán */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Diễn giải nội dung hạch toán
              </label>
              <textarea
                rows={2}
                value={dienGiaiHT}
                onChange={(e) => setDienGiaiHT(e.target.value)}
                placeholder="Nhập ghi chú định khoản chi tiết..."
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] resize-none"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#406c89] hover:bg-[#345870] rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <IconCheck size={15} />
              <span>Xác nhận lập hạch toán</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
