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
  IconPaperclip,
  IconDownload,
  IconDiscount2,
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
            setDetailData(item.raw || null);
          }
        } catch (err) {
          console.warn('Lỗi khi tải chi tiết báo giá:', err);
          setDetailData(item.raw || null);
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
    if (num === 0) return '0 đ';
    return `${num.toLocaleString('vi-VN')} đ`;
  };

  // Xác định badge trạng thái báo giá
  const currentStatus = detailData?.status || item.trangThai;
  let statusBadge = 'bg-slate-100 text-slate-700 border-slate-200';
  if (currentStatus === 'Đã gửi') statusBadge = 'bg-sky-50 text-[#406c89] border-sky-200';
  else if (currentStatus === 'Đang theo dõi') statusBadge = 'bg-cyan-50 text-cyan-700 border-cyan-300';
  else if (currentStatus === 'Đang bổ sung thông tin') statusBadge = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  else if (currentStatus === 'Đang đàm phán') statusBadge = 'bg-purple-50 text-purple-700 border-purple-200';
  else if (currentStatus === 'Tạm dừng') statusBadge = 'bg-amber-50 text-amber-700 border-amber-200';
  else if (currentStatus === 'Đã chốt') statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-300';
  else if (currentStatus === 'Từ chối báo giá' || currentStatus === 'Đã từ chối') statusBadge = 'bg-rose-50 text-rose-700 border-rose-300';
  else if (currentStatus === 'Không thực hiện') statusBadge = 'bg-gray-100 text-gray-500 border-gray-300';

  // Xác định badge trạng thái phê duyệt
  const currentApproval = detailData?.approval_status || item.approvalStatus;

  // Parse notes JSON
  let parsedNotes: Array<{ id?: string; title?: string; tieuDe?: string; content?: string; noiDung?: string }> = [];
  const rawNotes = detailData?.notes || item.notes;
  if (rawNotes) {
    try {
      parsedNotes = typeof rawNotes === 'string' ? JSON.parse(rawNotes) : rawNotes;
      if (!Array.isArray(parsedNotes)) parsedNotes = [];
    } catch (e) {
      parsedNotes = [];
    }
  }

  // Parse attachments JSON
  let parsedAttachments: Array<{ name?: string; url?: string; uploaded_by?: string }> = [];
  const rawAttachments = detailData?.attachments_json || item.attachmentsJson;
  if (rawAttachments) {
    try {
      parsedAttachments = typeof rawAttachments === 'string' ? JSON.parse(rawAttachments) : rawAttachments;
      if (!Array.isArray(parsedAttachments)) parsedAttachments = [];
    } catch (e) {
      parsedAttachments = [];
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#406c89] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <IconReceipt size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base tracking-wide">Chi tiết Báo Giá</h3>
              <p className="text-[11px] text-white/80 font-mono mt-0.5">
                {detailData?.quote_number || item.quoteNumber || item.soBg}
              </p>
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
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Số Báo Giá:
                </span>
                <span className="font-mono font-bold text-slate-700 text-xs">
                  {detailData?.quote_number || item.quoteNumber || item.soBg}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                {detailData?.project_name || item.projectName || item.soBg}
              </h4>
              <p className="text-slate-500 text-xs mt-1">
                Khách hàng: <strong className="text-slate-800">{detailData?.customer_name || item.khachHang}</strong>
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                Tổng sau thuế
              </span>
              <span className="font-black text-base sm:text-xl text-[#406c89]">
                {formatCurrency(detailData?.total_after_tax || item.tongSauThue)}
              </span>
              <div className="mt-1.5 flex items-center gap-1.5 justify-start sm:justify-end flex-wrap">
                {/* Trạng thái Báo Giá */}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${statusBadge}`}>
                  {currentStatus}
                </span>

                {/* Trạng thái Phê Duyệt */}
                {currentApproval && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${
                    currentApproval.includes('đã duyệt') || currentApproval.includes('approved')
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : currentApproval.includes('từ chối') || currentApproval.includes('rejected')
                      ? 'bg-rose-50 text-rose-700 border-rose-300'
                      : 'bg-amber-50 text-amber-700 border-amber-300'
                  }`}>
                    {currentApproval}
                  </span>
                )}
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
                  <span className="font-semibold text-slate-800">{detailData?.quote_type || detailData?.type || item.loai}</span>
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
                  <span className="font-semibold text-slate-800 text-right max-w-[280px] break-words">{detailData?.install_location || item.installLocation || '—'}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Thời gian sản xuất:</span>
                  <span className="font-semibold text-slate-800">{detailData?.production_days || item.productionDays ? `${detailData?.production_days || item.productionDays} ngày` : '—'}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Thời hạn bảo hành:</span>
                  <span className="font-semibold text-slate-800">{detailData?.warranty_months || item.warrantyMonths ? `${detailData?.warranty_months || item.warrantyMonths} tháng` : '—'}</span>
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
                  <span className="font-semibold text-slate-800">{detailData?.date || detailData?.quote_date || item.ngay}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Hiệu lực báo giá:</span>
                  <span className="font-semibold text-slate-800">{detailData?.valid_days || item.validDays ? `${detailData?.valid_days || item.validDays} ngày` : '10 ngày'}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Người lập:</span>
                  <span className="font-semibold text-slate-800">{detailData?.creator_name || item.nguoiLap || '—'}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Quản lý KD duyệt:</span>
                  <span className="font-semibold text-slate-800">
                    {detailData?.qlkd_approver_name || '—'}
                    {detailData?.qlkd_approval_date ? ` (${detailData.qlkd_approval_date})` : ''}
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Phó Giám Đốc duyệt:</span>
                  <span className="font-semibold text-slate-800">
                    {detailData?.pgd_approver_name || item.pgdApproverName || '—'}
                    {detailData?.pgd_approval_date || item.pgdApprovalDate ? ` (${detailData?.pgd_approval_date || item.pgdApprovalDate})` : ''}
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-medium">Trạng thái phê duyệt:</span>
                  <span className="font-semibold text-emerald-700">
                    {currentApproval || '—'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Tổng hợp Tài chính / Chiết khấu / VAT */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs space-y-3">
            <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <IconCurrencyDong size={15} className="text-[#406c89]" />
              <span>Bảng tổng hợp giá trị & Thuế</span>
            </h5>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold mb-0.5">Trước chiết khấu</span>
                <span className="font-bold text-slate-800">
                  {formatCurrency(detailData?.subtotal_before_discount || item.subtotalBeforeDiscount || detailData?.subtotal_after_discount || item.tongSauThue)}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold mb-0.5">
                  Chiết khấu ({detailData?.discount_percent || item.discountPercent || 0}%)
                </span>
                <span className="font-bold text-slate-800">
                  {formatCurrency(detailData?.discount_amount || item.discountAmount || 0)}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold mb-0.5">
                  Thuế VAT ({detailData?.vat_percent || item.vatPercent || 8}%)
                </span>
                <span className="font-bold text-slate-800">
                  {formatCurrency(detailData?.vat_amount || item.vatAmount || 0)}
                </span>
              </div>
              <div className="bg-sky-50/70 p-2.5 rounded-lg border border-sky-100">
                <span className="text-[10px] text-[#406c89] block font-semibold mb-0.5">Tổng thanh toán sau thuế</span>
                <span className="font-black text-[#406c89]">
                  {formatCurrency(detailData?.total_after_tax || item.tongSauThue)}
                </span>
              </div>
            </div>
          </div>

          {/* Điều khoản thanh toán */}
          {(detailData?.payment_terms || item.paymentTerms) && (
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60">
              <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 mb-1.5">
                <IconShieldCheck size={15} className="text-[#406c89]" />
                <span>Phương thức thanh toán</span>
              </h5>
              <p className="text-slate-600 text-xs leading-relaxed">
                {detailData?.payment_terms || item.paymentTerms}
              </p>
            </div>
          )}

          {/* Danh sách Điều kiện Báo Giá (từ notes JSON) */}
          {parsedNotes.length > 0 && (
            <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs space-y-3">
              <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 pb-2 border-b border-slate-100">
                <IconFileText size={15} className="text-[#406c89]" />
                <span>Điều kiện & Ghi chú Báo Giá ({parsedNotes.length} mục)</span>
              </h5>
              <div className="grid grid-cols-1 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                {parsedNotes.map((note, idx) => (
                  <div key={note.id || idx} className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 text-xs">
                    <h6 className="font-bold text-slate-800 mb-1">{note.title || note.tieuDe || `Điều kiện ${idx + 1}`}</h6>
                    <p className="text-slate-600 leading-relaxed">{note.content || note.noiDung}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hồ sơ đính kèm (từ attachments_json) */}
          {parsedAttachments.length > 0 && (
            <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs space-y-3">
              <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 pb-2 border-b border-slate-100">
                <IconPaperclip size={15} className="text-[#406c89]" />
                <span>Tài liệu & Hồ sơ đính kèm ({parsedAttachments.length} tệp)</span>
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {parsedAttachments.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/70 transition-colors">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <IconFileText size={16} className="text-[#406c89] shrink-0" />
                      <div className="truncate">
                        <p className="font-bold text-slate-800 truncate text-xs">{file.name || `Tệp đính kèm ${idx + 1}`}</p>
                        {file.uploaded_by && <span className="text-[10px] text-slate-400">Tải lên: {file.uploaded_by}</span>}
                      </div>
                    </div>
                    {file.url && (
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 rounded bg-[#406c89] text-white hover:bg-[#32556d] text-[10px] font-bold flex items-center gap-1 shrink-0 transition-colors"
                      >
                        <IconDownload size={12} />
                        <span>Xem/Tải</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
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
