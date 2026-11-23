"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconReceipt,
  IconUser,
  IconBuilding,
  IconCalendar,
  IconFileText,
  IconCurrencyDong,
  IconCheck,
  IconClock,
  IconInfoCircle,
  IconShieldCheck,
  IconPercentage,
} from '@tabler/icons-react';
import { BaoGiaItem } from '../../index';
import { getQuotationById } from '@/api/apiGetQuotation';

interface XemChiTietBaoGiaModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: BaoGiaItem | null;
}

export default function XemChiTietBaoGiaModal({
  isOpen,
  onClose,
  item,
}: XemChiTietBaoGiaModalProps) {
  const [detailData, setDetailData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && item?.id) {
      // Gọi API lấy dữ liệu chi tiết nếu có ID hợp lệ từ backend
      const fetchDetail = async () => {
        try {
          setIsLoading(true);
          const res = await getQuotationById(item.id);
          if (res) {
            setDetailData(res);
          } else {
            setDetailData(null);
          }
        } catch (err) {
          console.warn('Lỗi khi tải chi tiết báo giá:', err);
          setDetailData(null);
        } finally {
          setIsLoading(false);
        }
      };

      fetchDetail();
    } else {
      setDetailData(null);
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const formatCurrency = (val: number | string | undefined) => {
    const num = typeof val === 'number' ? val : parseFloat(String(val || 0).replace(/[^\d.-]/g, '')) || 0;
    if (num === 0) return '—';
    return `VND ${num.toLocaleString('vi-VN')}`;
  };

  // Xác định badge trạng thái
  let statusBadge = 'bg-slate-100 text-slate-700 border-slate-200';
  if (item.trangThai === 'Đã gửi') statusBadge = 'bg-sky-50 text-[#406c89] border-sky-200';
  if (item.trangThai === 'Đang theo dõi') statusBadge = 'bg-cyan-50 text-cyan-700 border-cyan-300';
  if (item.trangThai === 'Đã chốt') statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-300';
  if (item.trangThai === 'Đã từ chối') statusBadge = 'bg-rose-50 text-rose-700 border-rose-300';
  if (item.trangThai === 'Chờ duyệt') statusBadge = 'bg-amber-50 text-amber-700 border-amber-300';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#406c89] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <IconReceipt size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base tracking-wide">Chi tiết Báo Giá</h3>
              <p className="text-[11px] text-white/80 font-mono mt-0.5">{item.soBg}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 flex-1">
          
          {/* Banner Card Tóm tắt */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                Số Báo Giá & Dự án
              </span>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                {detailData?.project_name || item.soBg}
              </h4>
              <p className="text-slate-500 text-xs mt-1">
                Khách hàng: <strong className="text-slate-800">{detailData?.customer_name || item.khachHang}</strong>
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                Tổng sau thuế
              </span>
              <span className="font-black text-base sm:text-lg text-[#406c89]">
                {formatCurrency(detailData?.total_after_tax || item.tongSauThue)}
              </span>
              <div className="mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${statusBadge}`}>
                  {detailData?.status || detailData?.approval_status || item.trangThai}
                </span>
              </div>
            </div>
          </div>

          {/* Grid thông tin chi tiết */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Cột 1: Thông số mô hình & dự án */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs space-y-3">
              <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 pb-2 border-b border-slate-100">
                <IconBuilding size={15} className="text-[#406c89]" />
                <span>Thông số mô hình & Dự án</span>
              </h5>

              <div className="divide-y divide-slate-100 space-y-2 text-xs">
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400 font-medium">Loại báo giá:</span>
                  <span className="font-semibold text-slate-800">{detailData?.quote_type || item.loai}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Tỷ lệ mô hình:</span>
                  <span className="font-semibold text-slate-800 font-mono">{detailData?.scale || item.tyLe || '—'}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Kích thước:</span>
                  <span className="font-semibold text-slate-800 font-mono">{detailData?.size || item.kichThuoc || '—'}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Địa điểm lắp đặt:</span>
                  <span className="font-semibold text-slate-800">{detailData?.install_location || '—'}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Thời gian sản xuất:</span>
                  <span className="font-semibold text-slate-800">{detailData?.production_days ? `${detailData.production_days} ngày` : '—'}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Thời hạn bảo hành:</span>
                  <span className="font-semibold text-slate-800">{detailData?.warranty_months ? `${detailData.warranty_months} tháng` : '—'}</span>
                </div>
              </div>
            </div>

            {/* Cột 2: Thông tin giao dịch & Người duyệt */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs space-y-3">
              <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 pb-2 border-b border-slate-100">
                <IconUser size={15} className="text-[#406c89]" />
                <span>Thông tin lập & Phê duyệt</span>
              </h5>

              <div className="divide-y divide-slate-100 space-y-2 text-xs">
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400 font-medium">Ngày lập:</span>
                  <span className="font-semibold text-slate-800">{detailData?.date || item.ngay}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Hiệu lực:</span>
                  <span className="font-semibold text-slate-800">{detailData?.valid_days ? `${detailData.valid_days} ngày` : '10 ngày'}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Người lập:</span>
                  <span className="font-semibold text-slate-800">{detailData?.creator_name || item.nguoiLap || '—'}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Quản lý KD duyệt:</span>
                  <span className="font-semibold text-slate-800">{detailData?.qlkd_approver_name || '—'}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Phó GĐ duyệt:</span>
                  <span className="font-semibold text-slate-800">{detailData?.pgd_approver_name || '—'}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">VAT:</span>
                  <span className="font-semibold text-slate-800 font-mono">{detailData?.vat_percent ? `${detailData.vat_percent}%` : '8%'}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Điều khoản thanh toán */}
          {detailData?.payment_terms && (
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60">
              <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 mb-1.5">
                <IconShieldCheck size={15} className="text-[#406c89]" />
                <span>Phương thức thanh toán</span>
              </h5>
              <p className="text-slate-600 text-xs leading-relaxed">
                {detailData.payment_terms}
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
