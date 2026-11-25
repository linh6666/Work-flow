"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  IconPlus,
  IconSearch,
  IconPencil,
  IconTrash,
  IconChevronDown,
  IconArrowsSort,
  IconCheck,
  IconDownload,
  IconUpload,
  IconClock,
  IconChevronLeft,
  IconChevronRight,
  IconPhone,
  IconX,
} from '@tabler/icons-react';
import CreateProposalModal from './modal/CreateProposalModal';
import EditProposalModal from './edit/EditProposalModal';
import DeleteConfirmModal from './delete/DeleteConfirmModal';
import TrienKhaiHoanTatModal from './trienKhaiHoanTat/TrienKhaiHoanTatModal';
import TrienKhaiChuaLamModal from './trienKhaiChuaLam/TrienKhaiChuaLamModal';
import { getQuoteRequestList, QuoteRequestRecord } from '@/api/apiGetQuoteRequest';
import { createQuoteRequest } from '@/api/apiCreateQuoteRequest';
import { updateQuoteRequest } from '@/api/apiUpdateQuoteRequest';
import { deleteQuoteRequest } from '@/api/apiDeleteQuoteRequest';
import { bulkCreateQuoteRequest } from '@/api/apiBulkCreateQuoteRequest';
import { NotificationExtension } from '@/common/extension/NotificationExtension';
import Pagination from '@/common/pagination';
import * as XLSX from 'xlsx';

// ─── Types ────────────────────────────────────────────────────────────
export type TrangThai =
  | 'cho-tp'
  | 'tp-duyet'
  | 'tp-tu-choi'
  | 'cho-pgd'
  | 'pgd-duyet'
  | 'pgd-tu-choi';

export interface DeXuat {
  id: string;
  soDX: string;
  maPhu?: string;
  tenDuAn?: string;
  donViLienHe: string;
  nguoiLienHe: string;
  dienThoai?: string;
  nguoiLap: string;
  ngay: string;
  trangThai: TrangThai;
  buocHoanTat: number;
  tongBuoc: number;
  lyDoTuChoi?: string;
  khachHangCrm?: string;
  noiDungYeuCau?: string;
  tyLeMoHinh?: string;
  kichThuocDuKien?: string;
  diaDiemLapDat?: string;
  loaiChan?: string;
  kinh?: string;
  anhSang?: string[];
  congNghe?: string[];
  tinhTrangHoSo?: string;
  thoiGianBaoGia?: string;
  thoiGianMoHinh?: string;
  duongDanHoSo?: string;
  ghiChu?: string;
  danhSachFile?: File[];
}

// ─── Mock data matching screenshot data 100% ──────
// ─── Status config ────────────────────────────────────────────────────
const STATUS_CONFIG: Record<TrangThai, { label: string; color: string }> = {
  'cho-tp':      { label: 'Chờ QL KD duyệt',      color: 'text-amber-700 bg-amber-50 border-amber-300' },
  'tp-duyet':    { label: 'TP đã duyệt',          color: 'text-[#406c89] bg-sky-50 border-sky-200' },
  'tp-tu-choi':  { label: 'TP từ chối',           color: 'text-rose-600 bg-rose-50 border-rose-200' },
  'cho-pgd':     { label: 'Chờ PGĐ duyệt',       color: 'text-purple-600 bg-purple-50 border-purple-200' },
  'pgd-duyet':   { label: 'PGĐ KD-HC đã duyệt',  color: 'text-emerald-700 bg-emerald-50 border-emerald-300' },
  'pgd-tu-choi': { label: 'PGĐ KD-HC từ chối',   color: 'text-rose-700 bg-rose-50 border-rose-300' },
};

const FILTER_TABS: { key: TrangThai | 'all'; label: string }[] = [
  { key: 'all',        label: 'Tất cả' },
  { key: 'cho-tp',     label: 'Chờ TP duyệt' },
  { key: 'tp-duyet',   label: 'TP đã duyệt' },
  { key: 'tp-tu-choi', label: 'TP từ chối' },
  { key: 'cho-pgd',    label: 'Chờ PGĐ duyệt' },
  { key: 'pgd-duyet',  label: 'PGĐ đã duyệt' },
  { key: 'pgd-tu-choi',label: 'PGĐ từ chối' },
];

const ITEMS_PER_PAGE = 10;

// ─── Component ────────────────────────────────────────────────────────
export default function DeXuatBaoGia() {
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState<TrangThai | 'all'>('all');
  const [data, setData]       = useState<DeXuat[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProposalForEdit, setSelectedProposalForEdit] = useState<DeXuat | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProposalForDelete, setSelectedProposalForDelete] = useState<DeXuat | null>(null);

  const [isTrienKhaiHoanTatModalOpen, setIsTrienKhaiHoanTatModalOpen] = useState(false);
  const [isTrienKhaiChuaLamModalOpen, setIsTrienKhaiChuaLamModalOpen] = useState(false);
  const [selectedProposalForTrienKhai, setSelectedProposalForTrienKhai] = useState<DeXuat | null>(null);

  // Drag-to-scroll cho bảng
  const tableScrollRef = useRef<HTMLDivElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  const parseCsvRows = (text: string): string[][] => {
    const rows: string[][] = [];
    let row: string[] = [];
    let cell = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (inQuotes) {
        if (ch === '"') {
          if (text[i + 1] === '"') {
            cell += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          cell += ch;
        }
      } else if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(cell.trim());
        cell = '';
      } else if (ch === '\r' || ch === '\n') {
        if (ch === '\r' && text[i + 1] === '\n') i++;
        row.push(cell.trim());
        if (row.some((c) => c !== '')) rows.push(row);
        row = [];
        cell = '';
      } else {
        cell += ch;
      }
    }
    if (cell.length > 0 || row.length > 0) {
      row.push(cell.trim());
      if (row.some((c) => c !== '')) rows.push(row);
    }
    return rows;
  };

  const mapImportedRowToQuoteRequest = (obj: Record<string, any>): Partial<QuoteRequestRecord> => {
    const projectName = String(obj.project_name || obj['Tên dự án'] || obj.tenDuAn || '').trim();
    const contactCompany = String(obj.contact_company || obj['Đơn vị liên hệ'] || obj.donViLienHe || '').trim();
    return {
      request_number: String(obj.request_number || obj['Số ĐX'] || obj.soDX || '').trim(),
      date: String(obj.date || obj['Ngày'] || obj.ngay || new Date().toISOString().slice(0, 10)).trim(),
      contact_company: contactCompany,
      customer_name: String(obj.customer_name || contactCompany).trim(),
      contact_person: String(obj.contact_person || obj['Người liên hệ'] || obj.nguoiLienHe || '').trim(),
      contact_phone: String(obj.contact_phone || obj['Điện thoại'] || obj.dienThoai || '').trim(),
      project_name: projectName,
      quoting_content: String(obj.quoting_content || obj['Nội dung YC'] || obj.noiDungYeuCau || projectName || 'Import').trim(),
      model_scale: String(obj.model_scale || obj['Tỷ lệ'] || obj.tyLeMoHinh || '').trim(),
      model_size: String(obj.model_size || obj['Kích thước'] || obj.kichThuocDuKien || '').trim(),
      submitter_name: String(obj.submitter_name || obj['Người lập'] || obj.nguoiLap || '').trim(),
      approval_status: String(obj.approval_status || obj['Trạng thái'] || 'Chờ TP duyệt').trim(),
      notes: String(obj.notes || obj['Ghi chú'] || obj.ghiChu || '').trim(),
    };
  };

  const handleExportExcel = () => {
    if (filtered.length === 0) {
      NotificationExtension.Fails('Không có dữ liệu để xuất Excel!');
      return;
    }

    const rows = filtered.map((row) => ({
      'Số ĐX': row.soDX,
      'Ngày': row.ngay,
      'Đơn vị liên hệ': row.donViLienHe,
      'Người liên hệ': row.nguoiLienHe,
      'Điện thoại': row.dienThoai || '',
      'Tên dự án': row.tenDuAn || '',
      'Nội dung YC': row.noiDungYeuCau || '',
      'Tỷ lệ': row.tyLeMoHinh || '',
      'Kích thước': row.kichThuocDuKien || '',
      'Người lập': row.nguoiLap,
      'Trạng thái': mapTrangThaiToApprovalStatus(row.trangThai),
      'Ghi chú': row.ghiChu || '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DeXuatBaoGia');
    const fileName = `DeXuatBaoGia_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    NotificationExtension.Success(`Đã xuất ${rows.length} đề xuất ra file ${fileName}!`);
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    try {
      const lowerName = file.name.toLowerCase();
      let items: Partial<QuoteRequestRecord>[] = [];

      if (lowerName.endsWith('.json')) {
        const text = await file.text();
        const parsed = JSON.parse(text);
        items = Array.isArray(parsed) ? parsed : [parsed];
      } else if (lowerName.endsWith('.xlsx') || lowerName.endsWith('.xls')) {
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonRows = XLSX.utils.sheet_to_json<Record<string, any>>(firstSheet, { defval: '' });
        items = jsonRows.map(mapImportedRowToQuoteRequest);
      } else {
        const text = await file.text();
        const rows = parseCsvRows(text);
        if (rows.length < 2) {
          NotificationExtension.Fails('File CSV phải có dòng tiêu đề và ít nhất 1 dòng dữ liệu!');
          return;
        }
        const headers = rows[0];
        items = rows.slice(1).map((cols) => {
          const obj: Record<string, string> = {};
          headers.forEach((h, i) => {
            if (h) obj[h] = cols[i] || '';
          });
          return mapImportedRowToQuoteRequest(obj);
        });
      }

      if (items.length === 0) {
        NotificationExtension.Fails('Không có dữ liệu hợp lệ để Import!');
        return;
      }

      const res = await bulkCreateQuoteRequest(items);
      if (res.success && res.data) {
        setData((prev) => [...res.data!.map(mapQuoteRequestToDeXuat), ...prev]);
        NotificationExtension.Success(`Đã Import thành công ${res.data.length} đề xuất!`);
      } else {
        NotificationExtension.Fails(res.error || 'Import thất bại!');
      }
    } catch {
      NotificationExtension.Fails('Không thể đọc file Import!');
    }
  };
  const dragStateRef = useRef({ isDown: false, startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 });

  const handleTableMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, select, textarea')) return;
    const el = tableScrollRef.current;
    if (!el) return;
    dragStateRef.current = {
      isDown: true,
      startX: e.pageX - el.offsetLeft,
      startY: e.pageY - el.offsetTop,
      scrollLeft: el.scrollLeft,
      scrollTop: el.scrollTop,
    };
  };

  const handleTableMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.isDown) return;
    const el = tableScrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const y = e.pageY - el.offsetTop;
    el.scrollLeft = dragStateRef.current.scrollLeft - (x - dragStateRef.current.startX);
    el.scrollTop = dragStateRef.current.scrollTop - (y - dragStateRef.current.startY);
  };

  const handleTableMouseUp = () => {
    dragStateRef.current.isDown = false;
  };

const mapApprovalStatusToTrangThai = (status?: string): TrangThai => {
  const s = (status || '').toLowerCase();
  if (s.includes('pgđ') && s.includes('duyệt')) return 'pgd-duyet';
  if (s.includes('pgđ') && s.includes('từ chối')) return 'pgd-tu-choi';
  if (s.includes('chờ pgđ')) return 'cho-pgd';
  if (s.includes('tp') && s.includes('duyệt')) return 'tp-duyet';
  if (s.includes('tp') && s.includes('từ chối')) return 'tp-tu-choi';
  return 'cho-tp';
};

const mapTrangThaiToApprovalStatus = (tt: TrangThai): string => {
  switch (tt) {
    case 'tp-duyet': return 'TP đã duyệt';
    case 'tp-tu-choi': return 'TP từ chối';
    case 'cho-pgd': return 'Chờ PGĐ duyệt';
    case 'pgd-duyet': return 'PGĐ đã duyệt';
    case 'pgd-tu-choi': return 'PGĐ từ chối';
    default: return 'Chờ TP duyệt';
  }
};

const parseJsonStringArray = (raw?: string | string[] | null): string[] => {
  if (Array.isArray(raw)) return raw;
  if (!raw || typeof raw !== 'string') return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const mapQuoteRequestToDeXuat = (r: QuoteRequestRecord): DeXuat => {
  const tt = mapApprovalStatusToTrangThai(r.approval_status);
  return {
    id: r.id,
    soDX: r.request_number || 'ĐXBG',
    tenDuAn: r.project_name || '',
    donViLienHe: r.contact_company || r.customer_name || '',
    nguoiLienHe: r.contact_person || '',
    dienThoai: r.contact_phone || '',
    nguoiLap: r.submitter_name || '',
    ngay: r.date || (r.created_date ? String(r.created_date).slice(0, 10) : ''),
    trangThai: tt,
    buocHoanTat: tt === 'pgd-duyet' ? 2 : tt === 'tp-duyet' ? 1 : 0,
    tongBuoc: 2,
    lyDoTuChoi: r.pgd_rejection_reason || r.tp_rejection_reason || undefined,
    khachHangCrm: r.customer_name || r.customer_id || undefined,
    noiDungYeuCau: r.quoting_content || undefined,
    tyLeMoHinh: r.model_scale || undefined,
    kichThuocDuKien: r.model_size || undefined,
    diaDiemLapDat: r.install_location || undefined,
    loaiChan: r.leg_type || undefined,
    kinh: r.glass_type || undefined,
    anhSang: parseJsonStringArray(r.lighting_types),
    congNghe: parseJsonStringArray(r.tech_types),
    tinhTrangHoSo: r.drawing_status || undefined,
    thoiGianBaoGia: r.quotation_time || undefined,
    thoiGianMoHinh: r.model_needing_time || undefined,
    duongDanHoSo: r.document_shortcut || undefined,
    ghiChu: r.notes || undefined,
  };
};

  // Reset page to 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  useEffect(() => {
    getQuoteRequestList(200).then((records) => {
      if (Array.isArray(records) && records.length > 0) {
        setData(records.map(mapQuoteRequestToDeXuat));
      }
    });
  }, []);

  const handleCreateProposal = async (newDX: Omit<DeXuat, 'id' | 'buocHoanTat' | 'tongBuoc'>) => {
    const res = await createQuoteRequest({
      request_number: newDX.soDX,
      project_name: newDX.tenDuAn || '',
      quoting_content: newDX.noiDungYeuCau || newDX.tenDuAn || 'Yêu cầu báo giá',
      contact_company: newDX.donViLienHe,
      customer_name: newDX.donViLienHe,
      contact_person: newDX.nguoiLienHe,
      contact_phone: newDX.dienThoai,
      submitter_name: newDX.nguoiLap,
      date: newDX.ngay,
      approval_status: mapTrangThaiToApprovalStatus(newDX.trangThai),
      attachments_json:
        newDX.danhSachFile && newDX.danhSachFile.length > 0
          ? JSON.stringify(newDX.danhSachFile.map((f) => ({ name: f.name, url: '' })))
          : undefined,
    });

    if (res.success && res.data) {
      setData((prev) => [mapQuoteRequestToDeXuat(res.data!), ...prev]);
      NotificationExtension.Success('Đã tạo đề xuất báo giá mới!');
    } else {
      NotificationExtension.Fails(res.error || 'Không thể tạo đề xuất báo giá!');
    }
  };

  const handleEditProposal = async (updatedDX: DeXuat) => {
    const res = await updateQuoteRequest(updatedDX.id, {
      request_number: updatedDX.soDX,
      project_name: updatedDX.tenDuAn,
      contact_company: updatedDX.donViLienHe,
      customer_name: updatedDX.donViLienHe,
      contact_person: updatedDX.nguoiLienHe,
      contact_phone: updatedDX.dienThoai,
      submitter_name: updatedDX.nguoiLap,
      date: updatedDX.ngay,
      approval_status: mapTrangThaiToApprovalStatus(updatedDX.trangThai),
    });

    if (res.success) {
      setData(prev => prev.map(item => item.id === updatedDX.id ? updatedDX : item));
      NotificationExtension.Success('Đã cập nhật đề xuất báo giá!');
    } else {
      NotificationExtension.Fails(res.error || 'Không thể cập nhật đề xuất báo giá!');
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedProposalForDelete) {
      const targetId = selectedProposalForDelete.id;
      const res = await deleteQuoteRequest(targetId);
      if (res.success) {
        setData(prev => prev.filter(item => item.id !== targetId));
        setSelectedProposalForDelete(null);
        NotificationExtension.Success('Đã xóa đề xuất báo giá!');
      } else {
        NotificationExtension.Fails(res.error || 'Không thể xóa đề xuất báo giá!');
      }
    }
  };

  const handleApprove = async (id: string) => {
    const res = await updateQuoteRequest(id, { approval_status: 'PGĐ đã duyệt' });
    if (res.success) {
      setData(prev => prev.map(item => item.id === id ? { ...item, trangThai: 'pgd-duyet', buocHoanTat: 1 } : item));
      NotificationExtension.Success('Đã duyệt đề xuất báo giá!');
    } else {
      NotificationExtension.Fails(res.error || 'Không thể duyệt đề xuất!');
    }
  };

  const handleReject = async (id: string) => {
    const res = await updateQuoteRequest(id, { approval_status: 'TP từ chối', tp_rejection_reason: 'Từ chối phê duyệt' });
    if (res.success) {
      setData(prev => prev.map(item => item.id === id ? { ...item, trangThai: 'tp-tu-choi', lyDoTuChoi: 'Từ chối phê duyệt' } : item));
      NotificationExtension.Success('Đã từ chối đề xuất báo giá!');
    } else {
      NotificationExtension.Fails(res.error || 'Không thể từ chối đề xuất!');
    }
  };

  const handleUpdateSteps = (proposalId: string, steps: number) => {
    setData(prev => prev.map(item => {
      if (item.id === proposalId) {
        return { ...item, buocHoanTat: steps };
      }
      return item;
    }));
    setSelectedProposalForTrienKhai(prev => {
      if (prev && prev.id === proposalId) {
        const updated = { ...prev, buocHoanTat: steps };
        if (steps === 2) {
          setIsTrienKhaiChuaLamModalOpen(false);
          setIsTrienKhaiHoanTatModalOpen(true);
        }
        return updated;
      }
      return prev;
    });
  };

  const filtered = data.filter((d) => {
    const matchSearch =
      d.soDX.toLowerCase().includes(search.toLowerCase()) ||
      d.donViLienHe.toLowerCase().includes(search.toLowerCase()) ||
      d.nguoiLienHe.toLowerCase().includes(search.toLowerCase()) ||
      (d.tenDuAn || '').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || d.trangThai === filter;
    return matchSearch && matchFilter;
  });

  // Stats
  const total     = data.length;
  const choTP     = data.filter((d) => d.trangThai === 'cho-tp').length;
  const choPGD    = data.filter((d) => d.trangThai === 'cho-pgd').length;
  const daHoanTat = data.filter((d) => d.trangThai === 'pgd-duyet').length;

  // Pagination calculation
  const totalFiltered = filtered.length;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalFiltered);
  const paginatedList = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white space-y-2.5 sm:space-y-3 p-1">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ── Sub-header Action Bar (Matches Screenshot Exactly) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Đề xuất Báo giá</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            NV KD lập đề xuất → Quản lý KD duyệt → Phó GĐ KD-Hành chính duyệt
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto w-full sm:w-auto">
          <button
            type="button"
            onClick={handleExportExcel}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-2.5 py-1.5 sm:py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-md shadow-2xs transition-colors cursor-pointer active:scale-95"
          >
            <IconDownload size={13} className="text-slate-500" />
            <span>Export</span>
          </button>

          <input
            ref={importInputRef}
            type="file"
            accept=".json,.csv,.xlsx,.xls"
            onChange={handleImportFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => importInputRef.current?.click()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-2.5 py-1.5 sm:py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-md shadow-2xs transition-colors cursor-pointer active:scale-95"
          >
            <IconUpload size={13} className="text-slate-500" />
            <span>Import</span>
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-1 px-3 py-1.5 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-md shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            <IconPlus size={14} />
            <span>Lập đề xuất</span>
          </button>
        </div>
      </div>

      {/* ── Stats cards Row (2x2 on Mobile, 4 Cols on Desktop) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3 shrink-0">
        <div className="bg-white border border-slate-200/80 rounded-xl p-2.5 sm:p-3.5 shadow-2xs flex flex-col justify-center min-h-[54px] sm:min-h-[64px]">
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold mb-0.5 truncate">Tổng đề xuất</p>
          <p className="text-base sm:text-xl font-black text-[#406c89] tracking-tight">{total}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-2.5 sm:p-3.5 shadow-2xs flex flex-col justify-center min-h-[54px] sm:min-h-[64px]">
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold mb-0.5 truncate">Chờ TP duyệt</p>
          <p className="text-base sm:text-xl font-black text-[#d97706] tracking-tight">{choTP}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-2.5 sm:p-3.5 shadow-2xs flex flex-col justify-center min-h-[54px] sm:min-h-[64px]">
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold mb-0.5 truncate">Chờ PGĐ duyệt</p>
          <p className="text-base sm:text-xl font-black text-[#406c89] tracking-tight">{choPGD}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-2.5 sm:p-3.5 shadow-2xs flex flex-col justify-center min-h-[54px] sm:min-h-[64px]">
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold mb-0.5 truncate">Đã duyệt hoàn tất</p>
          <p className="text-base sm:text-xl font-black text-[#059669] tracking-tight">{daHoanTat}</p>
        </div>
      </div>

      {/* ── Warning Alert Banner (Matches Screenshot Exactly) ── */}
      {choTP > 0 && (
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#fffdf0] border border-[#fef08a] rounded-xl text-xs text-[#92400e] shadow-2xs shrink-0">
          <IconClock size={16} className="text-[#d97706] shrink-0" />
          <span className="text-[11px] sm:text-xs">
            Có <strong className="font-bold text-[#b45309]">{choTP}</strong> đề xuất đang chờ bạn phê duyệt.
          </span>
        </div>
      )}

      {/* ── Search + Filter tabs ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 shrink-0 pt-0.5">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo công ty, người liên hệ, số đề xuất..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 bg-white border border-slate-200/80 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89] shadow-2xs transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer"
              title="Xóa tìm kiếm"
            >
              <span className="text-xs font-bold leading-none">✕</span>
            </button>
          )}
        </div>
        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5 sm:pb-0 touch-pan-x sm:flex-wrap shrink-0">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key as TrangThai | 'all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                filter === tab.key
                  ? 'bg-[#406c89] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-[#406c89] hover:text-[#406c89]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE SCROLL HINT */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 sm:hidden">
        <span className="italic">← Vuốt ngang bảng để xem thêm thông tin & trạng thái →</span>
      </div>

      {/* ── Table (Matches Screenshot Columns & Data 100%) ── */}
      <div className="flex-1 flex flex-col min-h-[350px] sm:min-h-0 bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden">
        <div
          ref={tableScrollRef}
          onMouseDown={handleTableMouseDown}
          onMouseMove={handleTableMouseMove}
          onMouseUp={handleTableMouseUp}
          onMouseLeave={handleTableMouseUp}
          className="flex-1 overflow-x-auto sm:overflow-auto min-h-0 overscroll-x-contain [-webkit-overflow-scrolling:touch] no-scrollbar cursor-grab active:cursor-grabbing select-none"
        >
          <table className="w-full text-xs text-left border-collapse min-w-[880px] sm:min-w-[960px]">
            <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-slate-200">
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-4 py-3 font-bold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">Số ĐX <IconArrowsSort size={12} className="text-slate-300" /></span>
                </th>
                <th className="px-4 py-3 font-bold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">Tên mô hình / dự án <IconArrowsSort size={12} className="text-slate-300" /></span>
                </th>
                <th className="px-4 py-3 font-bold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">Đơn vị liên hệ <IconArrowsSort size={12} className="text-slate-300" /></span>
                </th>
                <th className="px-4 py-3 font-bold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">Người liên hệ <IconArrowsSort size={12} className="text-slate-300" /></span>
                </th>
                <th className="px-4 py-3 font-bold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">Người lập <IconArrowsSort size={12} className="text-slate-300" /></span>
                </th>
                <th className="px-4 py-3 font-bold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">Ngày <IconArrowsSort size={12} className="text-slate-300" /></span>
                </th>
                <th className="px-4 py-3 font-bold text-xs bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">Trạng thái <IconArrowsSort size={12} className="text-slate-300" /></span>
                </th>
                <th className="px-4 py-3 font-bold text-xs bg-slate-50 border-b border-slate-200 text-right whitespace-nowrap">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-xs text-slate-400">
                    Không tìm thấy đề xuất nào.
                  </td>
                </tr>
              ) : (
                paginatedList.map((row) => {
                  const st = STATUS_CONFIG[row.trangThai];
                  return (
                    <tr key={row.id} className="hover:bg-slate-50/70 transition-colors group">
                      {/* Số ĐX (Vd: 008-2026 ĐXBG-MHV) */}
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="text-[#406c89] font-bold text-xs hover:underline cursor-pointer">
                              {row.soDX}
                            </p>
                            {row.maPhu && (
                              <p className="text-[#406c89] font-bold text-xs leading-tight">
                                {row.maPhu}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Tên mô hình / dự án */}
                      <td className="px-4 py-3.5 align-middle font-medium text-slate-700 text-xs max-w-[220px] leading-snug">
                        {row.tenDuAn}
                      </td>

                      {/* Đơn vị liên hệ */}
                      <td className="px-4 py-3.5 align-middle font-bold text-slate-800 text-xs max-w-[220px] leading-snug">
                        {row.donViLienHe}
                      </td>

                      {/* Người liên hệ */}
                      <td className="px-4 py-3.5 align-middle text-xs">
                        <p className="font-medium text-slate-600">{row.nguoiLienHe || '—'}</p>
                        {row.dienThoai && (
                          <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                            <IconPhone size={11} className="text-slate-400 shrink-0" />
                            <span>{row.dienThoai}</span>
                          </p>
                        )}
                      </td>

                      {/* Người lập */}
                      <td className="px-4 py-3.5 align-middle text-xs font-medium text-slate-600 whitespace-nowrap">
                        {row.nguoiLap}
                      </td>

                      {/* Ngày */}
                      <td className="px-4 py-3.5 align-middle text-xs text-slate-500 whitespace-nowrap">
                        {row.ngay}
                      </td>

                      {/* Trạng thái */}
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        <div className="flex flex-col gap-1.5 items-start">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold border rounded-full px-2.5 py-0.5 ${st.color}`}>
                            {row.trangThai === 'cho-tp' ? (
                              <IconClock size={11} />
                            ) : row.trangThai.includes('tu-choi') ? (
                              <IconX size={11} strokeWidth={2.5} />
                            ) : (
                              <IconCheck size={11} strokeWidth={2.5} />
                            )}
                            {st.label}
                          </span>

                          {/* Action Buttons for Chờ QL KD duyệt */}
                          {row.trangThai === 'cho-tp' && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <button
                                type="button"
                                onClick={() => handleApprove(row.id)}
                                className="px-2 py-0.5 rounded border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold flex items-center gap-0.5 transition-colors cursor-pointer active:scale-95"
                              >
                                <IconCheck size={11} />
                                <span>Duyệt</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleReject(row.id)}
                                className="px-2 py-0.5 rounded border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 text-[10px] font-bold flex items-center gap-0.5 transition-colors cursor-pointer active:scale-95"
                              >
                                <IconX size={11} />
                                <span>Từ chối</span>
                              </button>
                            </div>
                          )}

                          {/* Reason for Rejection */}
                          {row.trangThai.includes('tu-choi') && row.lyDoTuChoi && (
                            <p className="text-[10px] text-rose-600 font-medium leading-tight">
                              ✗ {row.lyDoTuChoi}
                            </p>
                          )}

                          {/* Approved Status & Steps */}
                          {row.trangThai === 'pgd-duyet' && (
                            <>
                              <span className="text-[10px] font-semibold text-emerald-600">
                                {row.buocHoanTat === row.tongBuoc ? (
                                  <span>✓ Hoàn tất {row.tongBuoc} bước</span>
                                ) : (
                                  <span>{row.buocHoanTat}/{row.tongBuoc} bước</span>
                                )}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedProposalForTrienKhai(row);
                                  if (row.buocHoanTat === 2) {
                                    setIsTrienKhaiHoanTatModalOpen(true);
                                  } else {
                                    setIsTrienKhaiChuaLamModalOpen(true);
                                  }
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded border border-sky-300 bg-white text-[#406c89] hover:bg-sky-50 text-[10px] font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
                              >
                                Triển khai
                                <IconChevronDown size={11} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Hành động */}
                      <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProposalForEdit(row);
                              setIsEditModalOpen(true);
                            }}
                            className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer active:scale-95"
                            title="Sửa"
                          >
                            <IconPencil size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProposalForDelete(row);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-1.5 rounded border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer active:scale-95"
                            title="Xóa"
                          >
                            <IconTrash size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalFiltered}
          itemsPerPage={ITEMS_PER_PAGE}
          itemName="đề xuất"
          onPageChange={setCurrentPage}
        />
      </div>

      <CreateProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProposal}
      />

      <EditProposalModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProposalForEdit(null);
        }}
        onSubmit={handleEditProposal}
        proposal={selectedProposalForEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProposalForDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        proposalCode={selectedProposalForDelete?.soDX || ''}
      />

      <TrienKhaiHoanTatModal
        isOpen={isTrienKhaiHoanTatModalOpen}
        onClose={() => {
          setIsTrienKhaiHoanTatModalOpen(false);
          setSelectedProposalForTrienKhai(null);
        }}
        proposal={selectedProposalForTrienKhai}
      />

      <TrienKhaiChuaLamModal
        isOpen={isTrienKhaiChuaLamModalOpen}
        onClose={() => {
          setIsTrienKhaiChuaLamModalOpen(false);
          setSelectedProposalForTrienKhai(null);
        }}
        onUpdateSteps={handleUpdateSteps}
        proposal={selectedProposalForTrienKhai}
      />
    </div>
  );
}
