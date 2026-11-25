"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconEye, IconLoader2 } from '@tabler/icons-react';
import { DeXuat } from '../index';
import { getQuoteRequestById, QuoteRequestRecord } from '@/api/apiGetQuoteRequest';

interface ViewProposalModalProps {
  isOpen: boolean;
  proposal: DeXuat | null;
  onClose: () => void;
}

const parseJsonArray = (raw?: string | string[] | null): string[] => {
  if (Array.isArray(raw)) return raw;
  if (!raw || typeof raw !== 'string') return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export default function ViewProposalModal({ isOpen, proposal, onClose }: ViewProposalModalProps) {
  const [detail, setDetail] = useState<QuoteRequestRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && proposal?.id) {
      setIsLoading(true);
      setDetail(null);
      getQuoteRequestById(proposal.id)
        .then((data) => {
          if (data) setDetail(data);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, proposal?.id]);

  if (!isOpen || !proposal) return null;

  const anhSang = detail ? parseJsonArray(detail.lighting_types) : proposal.anhSang || [];
  const congNghe = detail ? parseJsonArray(detail.tech_types) : proposal.congNghe || [];

  const fields = [
    { label: 'Số ĐX', value: detail?.request_number || proposal.soDX },
    { label: 'Ngày lập', value: detail?.date || proposal.ngay || '—' },
    { label: 'Trạng thái', value: detail?.approval_status || proposal.approvalStatusRaw || '—' },
    { label: 'Người lập', value: detail?.submitter_name || proposal.nguoiLap || '—' },
    { label: 'Đơn vị liên hệ', value: detail?.contact_company || detail?.customer_name || proposal.donViLienHe || '—' },
    { label: 'Người liên hệ', value: detail?.contact_person || proposal.nguoiLienHe || '—' },
    { label: 'Điện thoại', value: detail?.contact_phone || proposal.dienThoai || '—' },
    { label: 'Tên dự án', value: detail?.project_name || proposal.tenDuAn || '—' },
    { label: 'Tỷ lệ mô hình', value: detail?.model_scale || proposal.tyLeMoHinh || '—' },
    { label: 'Kích thước dự kiến', value: detail?.model_size || proposal.kichThuocDuKien || '—' },
    { label: 'Địa điểm lắp đặt', value: detail?.install_location || proposal.diaDiemLapDat || '—' },
    { label: 'Loại chân', value: detail?.leg_type || proposal.loaiChan || '—' },
    { label: 'Kính', value: detail?.glass_type || proposal.kinh || '—' },
    { label: 'Ánh sáng', value: anhSang.length ? anhSang.join(', ') : '—' },
    { label: 'Công nghệ', value: congNghe.length ? congNghe.join(', ') : '—' },
    { label: 'Tình trạng hồ sơ', value: detail?.drawing_status || proposal.tinhTrangHoSo || '—' },
    { label: 'Thời gian báo giá', value: detail?.quotation_time || proposal.thoiGianBaoGia || '—' },
    { label: 'Thời gian cần mô hình', value: detail?.model_needing_time || proposal.thoiGianMoHinh || '—' },
    { label: 'Đường dẫn hồ sơ', value: detail?.document_shortcut || proposal.duongDanHoSo || '—' },
  ];

  const noiDungYeuCau = detail?.quoting_content ?? proposal.noiDungYeuCau;
  const ghiChu = detail?.notes ?? proposal.ghiChu;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div
        className="w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[#406c89]">
            <IconEye size={20} />
            <h3 className="text-base font-bold text-slate-800">Chi tiết đề xuất báo giá</h3>
            {isLoading && <IconLoader2 size={15} className="animate-spin text-slate-400" />}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fields.map((f) => (
              <div key={f.label} className="rounded-lg border border-slate-100 bg-slate-50/70 px-3.5 py-2.5">
                <div className="text-[11px] font-semibold text-slate-500">{f.label}</div>
                <div className="mt-0.5 font-medium text-slate-800 break-words">{f.value}</div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50/70 px-3.5 py-2.5">
            <div className="text-[11px] font-semibold text-slate-500">Nội dung yêu cầu</div>
            <div className="mt-1 font-medium text-slate-800 whitespace-pre-line">
              {noiDungYeuCau || '—'}
            </div>
          </div>

          {ghiChu && (
            <div className="rounded-lg border border-slate-100 bg-slate-50/70 px-3.5 py-2.5">
              <div className="text-[11px] font-semibold text-slate-500">Ghi chú</div>
              <div className="mt-1 font-medium text-slate-800 whitespace-pre-line">{ghiChu}</div>
            </div>
          )}
        </div>

        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/60 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
