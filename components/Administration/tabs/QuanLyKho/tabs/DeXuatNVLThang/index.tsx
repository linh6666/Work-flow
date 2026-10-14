"use client";

import React, { useState, useMemo } from 'react';
import {
  IconPlus,
  IconCopy,
  IconTrash,
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconClipboardList,
  IconClipboardText,
  IconAlertCircle,
  IconPackage,
  IconChartBar,
  IconArrowsSort,
  IconReceipt,
} from '@tabler/icons-react';
import ModalBoSungNVL from './modal/ModalBoSungNVL';
import ModalXuatNVL from './modal/ModalXuatNVL';
import ModalTongHopXuatKho from './modal/ModalTongHopXuatKho';
import ModalBaoCaoBGD from './modal/ModalBaoCaoBGD';
import ModalTaoDeXuat from './modal/ModalTaoDeXuat';

export interface DeXuatNVLItem {
  id: string;
  maDeXuat: string;
  thang: number;
  nam: number;
  thangNam: string; // e.g. "Tháng 10/2026"
  phongBan: string;
  soMatHang: number;
  tongTien: number;
  trangThai: 'Chờ duyệt' | 'Đã duyệt';
  trangThaiXuatKho: 'Đã xuất đủ' | 'Đang xuất' | 'Chờ xuất' | 'Chưa xuất' | 'Đã xuất' | 'Đã nhận' | 'Chờ duyệt' | string;
  trangThaiHT: 'Đã hạch toán' | 'Chờ hạch toán' | 'Chưa HT' | 'Chưa hạch toán' | string;
  boSungNVL: number; // số lần bổ sung
  nguoiLap?: string;
  ngayLap?: string;
  ghiChu?: string;
}

const INITIAL_DATA: DeXuatNVLItem[] = [
  // ── THÁNG 10/2026 (Đã duyệt - 6 đơn) ──
  {
    id: 'DX-10-01',
    maDeXuat: 'DXNVL-2026-10-01',
    thang: 10,
    nam: 2026,
    thangNam: 'Tháng 10/2026',
    phongBan: 'Phòng Khai triển',
    soMatHang: 1,
    tongTien: 907200,
    trangThai: 'Đã duyệt',
    trangThaiXuatKho: 'Đã xuất',
    trangThaiHT: 'Chưa hạch toán',
    boSungNVL: 0,
    nguoiLap: 'Nguyễn Văn An',
    ngayLap: '02/10/2026',
    ghiChu: 'Đề xuất định kỳ NVL tháng 10 - Phòng Khai triển',
  },
  {
    id: 'DX-10-02',
    maDeXuat: 'DXNVL-2026-10-02',
    thang: 10,
    nam: 2026,
    thangNam: 'Tháng 10/2026',
    phongBan: 'Phòng Ghép',
    soMatHang: 16,
    tongTien: 17320684,
    trangThai: 'Đã duyệt',
    trangThaiXuatKho: 'Chưa xuất',
    trangThaiHT: 'Chưa hạch toán',
    boSungNVL: 0,
    nguoiLap: 'Trần Thị Bích',
    ngayLap: '03/10/2026',
    ghiChu: 'Đề xuất định kỳ NVL tháng 10 - Phòng Ghép',
  },
  {
    id: 'DX-10-03',
    maDeXuat: 'DXNVL-2026-10-03',
    thang: 10,
    nam: 2026,
    thangNam: 'Tháng 10/2026',
    phongBan: 'Phòng Cắt',
    soMatHang: 8,
    tongTien: 12463000,
    trangThai: 'Đã duyệt',
    trangThaiXuatKho: 'Đã nhận',
    trangThaiHT: 'Chưa hạch toán',
    boSungNVL: 0,
    nguoiLap: 'Lê Hoàng Nam',
    ngayLap: '04/10/2026',
    ghiChu: 'Đề xuất định kỳ NVL tháng 10 - Phòng Cắt',
  },
  {
    id: 'DX-10-04',
    maDeXuat: 'DXNVL-2026-10-04',
    thang: 10,
    nam: 2026,
    thangNam: 'Tháng 10/2026',
    phongBan: 'Phòng Điện',
    soMatHang: 43,
    tongTien: 20412218,
    trangThai: 'Đã duyệt',
    trangThaiXuatKho: 'Chưa xuất',
    trangThaiHT: 'Chưa hạch toán',
    boSungNVL: 0,
    nguoiLap: 'Phạm Đức Huy',
    ngayLap: '05/10/2026',
    ghiChu: 'Đề xuất định kỳ NVL tháng 10 - Phòng Điện',
  },
  {
    id: 'DX-10-05',
    maDeXuat: 'DXNVL-2026-10-05',
    thang: 10,
    nam: 2026,
    thangNam: 'Tháng 10/2026',
    phongBan: 'Phòng Cảnh Quan',
    soMatHang: 6,
    tongTien: 1537560,
    trangThai: 'Đã duyệt',
    trangThaiXuatKho: 'Chờ duyệt',
    trangThaiHT: 'Chưa hạch toán',
    boSungNVL: 0,
    nguoiLap: 'Võ Minh Trí',
    ngayLap: '06/10/2026',
    ghiChu: 'Đề xuất định kỳ NVL tháng 10 - Phòng Cảnh Quan',
  },
  {
    id: 'DX-10-06',
    maDeXuat: 'DXNVL-2026-10-06',
    thang: 10,
    nam: 2026,
    thangNam: 'Tháng 10/2026',
    phongBan: 'Phòng Mộc Sơn',
    soMatHang: 53,
    tongTien: 15662392,
    trangThai: 'Đã duyệt',
    trangThaiXuatKho: 'Chưa xuất',
    trangThaiHT: 'Chưa hạch toán',
    boSungNVL: 0,
    nguoiLap: 'Đỗ Quốc Bảo',
    ngayLap: '07/10/2026',
    ghiChu: 'Đề xuất định kỳ NVL tháng 10 - Phòng Mộc Sơn',
  },

  // ── THÁNG 9/2026 (Chờ duyệt - 6 đơn) ──
  {
    id: 'DX-09-01',
    maDeXuat: 'DXNVL-2026-09-01',
    thang: 9,
    nam: 2026,
    thangNam: 'Tháng 09/2026',
    phongBan: 'Phòng Điện',
    soMatHang: 43,
    tongTien: 20412218,
    trangThai: 'Chờ duyệt',
    trangThaiXuatKho: 'Chưa xuất',
    trangThaiHT: 'Chưa hạch toán',
    boSungNVL: 0,
    nguoiLap: 'Phạm Đức Huy',
    ngayLap: '05/09/2026',
    ghiChu: 'Đề xuất định kỳ NVL tháng 9 - Phòng Điện',
  },
  {
    id: 'DX-09-02',
    maDeXuat: 'DXNVL-2026-09-02',
    thang: 9,
    nam: 2026,
    thangNam: 'Tháng 09/2026',
    phongBan: 'Phòng Mộc Sơn',
    soMatHang: 53,
    tongTien: 15662392,
    trangThai: 'Chờ duyệt',
    trangThaiXuatKho: 'Chưa xuất',
    trangThaiHT: 'Chưa hạch toán',
    boSungNVL: 0,
    nguoiLap: 'Đỗ Quốc Bảo',
    ngayLap: '07/09/2026',
    ghiChu: 'Đề xuất định kỳ NVL tháng 9 - Phòng Mộc Sơn',
  },
  {
    id: 'DX-09-03',
    maDeXuat: 'DXNVL-2026-09-03',
    thang: 9,
    nam: 2026,
    thangNam: 'Tháng 09/2026',
    phongBan: 'Phòng Cảnh Quan',
    soMatHang: 6,
    tongTien: 1537560,
    trangThai: 'Chờ duyệt',
    trangThaiXuatKho: 'Chưa xuất',
    trangThaiHT: 'Chưa hạch toán',
    boSungNVL: 0,
    nguoiLap: 'Võ Minh Trí',
    ngayLap: '06/09/2026',
    ghiChu: 'Đề xuất định kỳ NVL tháng 9 - Phòng Cảnh Quan',
  },
  {
    id: 'DX-09-04',
    maDeXuat: 'DXNVL-2026-09-04',
    thang: 9,
    nam: 2026,
    thangNam: 'Tháng 09/2026',
    phongBan: 'Phòng Cắt',
    soMatHang: 8,
    tongTien: 12463000,
    trangThai: 'Chờ duyệt',
    trangThaiXuatKho: 'Chưa xuất',
    trangThaiHT: 'Chưa hạch toán',
    boSungNVL: 0,
    nguoiLap: 'Lê Hoàng Nam',
    ngayLap: '04/09/2026',
    ghiChu: 'Đề xuất định kỳ NVL tháng 9 - Phòng Cắt',
  },
  {
    id: 'DX-09-05',
    maDeXuat: 'DXNVL-2026-09-05',
    thang: 9,
    nam: 2026,
    thangNam: 'Tháng 09/2026',
    phongBan: 'Phòng Ghép',
    soMatHang: 16,
    tongTien: 17320684,
    trangThai: 'Chờ duyệt',
    trangThaiXuatKho: 'Chưa xuất',
    trangThaiHT: 'Chưa hạch toán',
    boSungNVL: 0,
    nguoiLap: 'Trần Thị Bích',
    ngayLap: '03/09/2026',
    ghiChu: 'Đề xuất định kỳ NVL tháng 9 - Phòng Ghép',
  },
  {
    id: 'DX-09-06',
    maDeXuat: 'DXNVL-2026-09-06',
    thang: 9,
    nam: 2026,
    thangNam: 'Tháng 09/2026',
    phongBan: 'Phòng Khai triển',
    soMatHang: 1,
    tongTien: 907200,
    trangThai: 'Chờ duyệt',
    trangThaiXuatKho: 'Chưa xuất',
    trangThaiHT: 'Chưa hạch toán',
    boSungNVL: 0,
    nguoiLap: 'Nguyễn Văn An',
    ngayLap: '02/09/2026',
    ghiChu: 'Đề xuất định kỳ NVL tháng 9 - Phòng Khai triển',
  },
];

type SortField = 'thang' | 'nam' | 'phongBan' | 'soMatHang' | 'tongTien' | 'trangThai';

export default function DeXuatNVLThang() {
  const [data, setData] = useState<DeXuatNVLItem[]>(INITIAL_DATA);
  const [filterStatus, setFilterStatus] = useState('Tất cả');

  // Sorting
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  // Modals state
  const [selectedItem, setSelectedItem] = useState<DeXuatNVLItem | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showXuatKhoModal, setShowXuatKhoModal] = useState(false);
  const [showBaoCaoBGDModal, setShowBaoCaoBGDModal] = useState(false);
  const [selectedHachToanItem, setSelectedHachToanItem] = useState<DeXuatNVLItem | null>(null);
  const [selectedBoSungItem, setSelectedBoSungItem] = useState<DeXuatNVLItem | null>(null);
  const [selectedXuatNVLItem, setSelectedXuatNVLItem] = useState<DeXuatNVLItem | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 30;



  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredData = useMemo(() => {
    let result = filterStatus === 'Tất cả'
      ? [...data]
      : data.filter((item) => item.trangThai === filterStatus);

    if (sortField) {
      result.sort((a, b) => {
        let valA: any = a[sortField];
        let valB: any = b[sortField];

        if (sortField === 'thang') {
          valA = a.thang;
          valB = b.thang;
        } else if (sortField === 'nam') {
          valA = a.nam;
          valB = b.nam;
        }

        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, filterStatus, sortField, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedData = filteredData.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleCreate = (newItem: DeXuatNVLItem) => {
    setData([newItem, ...data]);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xoá đề xuất NVL này?')) {
      setData(data.filter((item) => item.id !== id));
      if (selectedItem?.id === id) setSelectedItem(null);
    }
  };

  const handleCopy = (item: DeXuatNVLItem) => {
    const newItem: DeXuatNVLItem = {
      ...item,
      id: Date.now().toString(),
      maDeXuat: `${item.maDeXuat}-COPY`,
      ghiChu: item.ghiChu ? `${item.ghiChu} (Bản sao)` : 'Bản sao',
    };
    setData([newItem, ...data]);
  };

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  return (
    <div className="flex-1 flex flex-col gap-3 overflow-hidden">
      {/* ── Top Header Bar (Đề xuất NVL Tháng — Khối Kỹ thuật) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-0.5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <IconClipboardText size={18} className="text-[#406c89] shrink-0" />
            <h2 className="text-sm md:text-[15px] font-bold text-slate-800 tracking-tight">
              Đề xuất NVL Tháng — Khối Kỹ thuật
            </h2>
          </div>

          {/* Bộ lọc trạng thái: Chờ duyệt & Đã duyệt */}
          <div className="flex items-center gap-1 bg-slate-200/60 p-0.5 rounded-lg text-xs">
            {['Tất cả', 'Chờ duyệt', 'Đã duyệt'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  setFilterStatus(st);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  filterStatus === st
                    ? 'bg-white text-[#406c89] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#406c89] hover:bg-[#345973] text-white shadow-xs transition-colors cursor-pointer"
          >
            <IconPlus size={14} />
            <span>Tạo đề xuất tháng này</span>
          </button>

          <button
            type="button"
            onClick={() => setShowXuatKhoModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <IconPackage size={14} className="text-slate-600" />
            <span>Tổng hợp NVL Xuất kho</span>
          </button>

          <button
            type="button"
            onClick={() => setShowBaoCaoBGDModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <IconChartBar size={14} className="text-slate-600" />
            <span>Báo cáo tổng hợp BGĐ</span>
          </button>
        </div>
      </div>

      {/* ── Table Container với các cột chuẩn theo ảnh mẫu + Tháng Năm ── */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden min-h-0">
        <div className="overflow-auto flex-1">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-[#f8fafc] text-slate-600 sticky top-0 z-10 border-b border-slate-200 font-semibold text-[11px]">
              <tr>
                <th className="px-3 py-2.5 w-10 text-center whitespace-nowrap">STT</th>
                <th
                  className="px-3 py-2.5 whitespace-nowrap cursor-pointer select-none hover:text-[#406c89] transition-colors"
                  onClick={() => handleSort('thang')}
                >
                  <span className="inline-flex items-center gap-1">
                    Tháng
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </span>
                </th>
                <th
                  className="px-3 py-2.5 whitespace-nowrap cursor-pointer select-none hover:text-[#406c89] transition-colors"
                  onClick={() => handleSort('nam')}
                >
                  <span className="inline-flex items-center gap-1">
                    Năm
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </span>
                </th>
                <th
                  className="px-3 py-2.5 whitespace-nowrap cursor-pointer select-none hover:text-[#406c89] transition-colors"
                  onClick={() => handleSort('phongBan')}
                >
                  <span className="inline-flex items-center gap-1">
                    Phòng ban
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </span>
                </th>
                <th
                  className="px-3 py-2.5 whitespace-nowrap text-center cursor-pointer select-none hover:text-[#406c89] transition-colors"
                  onClick={() => handleSort('soMatHang')}
                >
                  <span className="inline-flex items-center gap-1 justify-center">
                    Số mặt hàng
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </span>
                </th>
                <th
                  className="px-3 py-2.5 whitespace-nowrap text-right cursor-pointer select-none hover:text-[#406c89] transition-colors"
                  onClick={() => handleSort('tongTien')}
                >
                  <span className="inline-flex items-center gap-1 justify-end">
                    Tổng tiền
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </span>
                </th>
                <th
                  className="px-3 py-2.5 whitespace-nowrap text-center cursor-pointer select-none hover:text-[#406c89] transition-colors"
                  onClick={() => handleSort('trangThai')}
                >
                  <span className="inline-flex items-center gap-1 justify-center">
                    Trạng thái
                    <IconArrowsSort size={12} className="text-slate-400" />
                  </span>
                </th>
                <th className="px-3 py-2.5 whitespace-nowrap text-center">Xuất NVL</th>
                <th className="px-3 py-2.5 whitespace-nowrap text-center">Trạng thái Xuất kho</th>
                <th className="px-3 py-2.5 whitespace-nowrap text-center">Hạch toán NVL</th>
                <th className="px-3 py-2.5 whitespace-nowrap text-center">Trạng thái HT</th>
                <th className="px-3 py-2.5 whitespace-nowrap text-center">Bổ sung NVL</th>
                <th className="px-3 py-2.5 whitespace-nowrap text-center w-24">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={13} className="text-center py-10 text-slate-400">
                    <IconAlertCircle size={30} className="mx-auto text-slate-300 mb-1.5" />
                    Không tìm thấy đề xuất NVL nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, idx) => {
                  const stt = (safePage - 1) * PAGE_SIZE + idx + 1;
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="px-3 py-2.5 text-center text-slate-500 whitespace-nowrap">{stt}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap font-bold text-[#406c89]">
                        Tháng {item.thang}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap font-semibold text-slate-700">
                        {item.nam}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap font-medium text-slate-700">
                        {item.phongBan}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-center font-semibold text-slate-700">
                        {item.soMatHang}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-right font-bold text-slate-800">
                        {formatVND(item.tongTien)}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                            item.trangThai === 'Đã duyệt'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : 'bg-amber-50 text-amber-700 border-amber-300'
                          }`}
                        >
                          {item.trangThai}
                        </span>
                      </td>

                      {/* Xuất NVL Action */}
                      <td className="px-3 py-2.5 whitespace-nowrap text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedXuatNVLItem(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-50/80 text-[#406c89] hover:bg-blue-100 border border-blue-200/80 transition-colors cursor-pointer"
                        >
                          <IconPackage size={12} />
                          <span>Xuất NVL</span>
                        </button>
                      </td>

                      {/* Trạng thái Xuất kho */}
                      <td className="px-3 py-2.5 whitespace-nowrap text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border ${
                            item.trangThaiXuatKho === 'Đã xuất đủ' || item.trangThaiXuatKho === 'Đã xuất'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : item.trangThaiXuatKho === 'Đã nhận'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : item.trangThaiXuatKho === 'Đang xuất'
                              ? 'bg-sky-50 text-sky-700 border-sky-200'
                              : item.trangThaiXuatKho === 'Chờ xuất' || item.trangThaiXuatKho === 'Chờ duyệt'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {item.trangThaiXuatKho}
                        </span>
                      </td>

                      {/* Hạch toán NVL Action */}
                      <td className="px-3 py-2.5 whitespace-nowrap text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedHachToanItem(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer"
                        >
                          <IconReceipt size={12} />
                          <span>Hạch toán</span>
                        </button>
                      </td>

                      {/* Trạng thái HT */}
                      <td className="px-3 py-2.5 whitespace-nowrap text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border ${
                            item.trangThaiHT === 'Đã hạch toán'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : item.trangThaiHT === 'Chờ hạch toán'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {item.trangThaiHT}
                        </span>
                      </td>

                      {/* Bổ sung NVL */}
                      <td className="px-3 py-2.5 whitespace-nowrap text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedBoSungItem(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                        >
                          <IconPlus size={11} />
                          <span>Bổ sung {item.boSungNVL > 0 ? `(${item.boSungNVL})` : ''}</span>
                        </button>
                      </td>

                      {/* Thao tác */}
                      <td className="px-3 py-2.5 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1 text-slate-500">
                          <button
                            type="button"
                            title="Sao chép đề xuất"
                            onClick={() => handleCopy(item)}
                            className="p-1 hover:text-[#406c89] hover:bg-slate-100 rounded transition-colors cursor-pointer"
                          >
                            <IconCopy size={14} />
                          </button>
                          <button
                            type="button"
                            title="Xoá đề xuất"
                            onClick={() => handleDelete(item.id)}
                            className="p-1 hover:text-rose-600 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                          >
                            <IconTrash size={14} />
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

        {/* ── Table Pagination Footer ── */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div>
            Hiển thị{' '}
            <span className="font-bold text-slate-700">
              {filteredData.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}
            </span>{' '}
            -{' '}
            <span className="font-bold text-slate-700">
              {Math.min(safePage * PAGE_SIZE, filteredData.length)}
            </span>{' '}
            trên tổng số <span className="font-bold text-slate-700">{filteredData.length}</span> đề xuất
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <IconChevronLeft size={13} />
              <span>Trước</span>
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setCurrentPage(p)}
                className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                  safePage === p
                    ? 'bg-[#406c89] text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Sau</span>
              <IconChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Modal Chi tiết đề xuất ── */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2">
                <IconClipboardList size={18} className="text-[#406c89]" />
                <h3 className="text-sm font-bold text-slate-800">Chi tiết đề xuất: {selectedItem.thangNam}</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
              >
                <IconX size={16} />
              </button>
            </div>
            <div className="p-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[11px]">Kỳ đề xuất</span>
                  <span className="font-bold text-[#406c89]">Tháng {selectedItem.thang} / {selectedItem.nam}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Mã đề xuất</span>
                  <span className="font-semibold text-slate-700">{selectedItem.maDeXuat}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Phòng ban</span>
                  <span className="font-semibold text-slate-700">{selectedItem.phongBan}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Ngày lập</span>
                  <span className="font-semibold text-slate-700">{selectedItem.ngayLap}</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Số loại NVL:</span>
                <span className="font-bold text-slate-800">{selectedItem.soMatHang} mặt hàng</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Tổng ngân sách:</span>
                <span className="font-bold text-[#406c89] text-sm">{formatVND(selectedItem.tongTien)}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Trạng thái:</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                    selectedItem.trangThai === 'Đã duyệt'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-amber-50 text-amber-700 border-amber-300'
                  }`}
                >
                  {selectedItem.trangThai}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-1 border-b border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[11px]">Trạng thái xuất kho</span>
                  <span className="font-semibold text-slate-700">{selectedItem.trangThaiXuatKho}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Trạng thái hạch toán</span>
                  <span className="font-semibold text-slate-700">{selectedItem.trangThaiHT}</span>
                </div>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] mb-1">Ghi chú & Mục đích:</span>
                <p className="bg-slate-50 p-2.5 rounded-md text-slate-600 border border-slate-100 italic">
                  {selectedItem.ghiChu || 'Không có ghi chú thêm.'}
                </p>
              </div>
            </div>
            <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="px-3.5 py-1.5 text-xs font-semibold bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Tạo đề xuất mới (Component trong folder riêng) ── */}
      <ModalTaoDeXuat
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreate}
      />

      {/* ── Modal Tổng hợp NVL Xuất kho (Component trong folder riêng) ── */}
      <ModalTongHopXuatKho
        isOpen={showXuatKhoModal}
        onClose={() => setShowXuatKhoModal(false)}
      />


      {/* ── Modal Báo cáo tổng hợp BGĐ (Component trong folder riêng) ── */}
      <ModalBaoCaoBGD
        isOpen={showBaoCaoBGDModal}
        onClose={() => setShowBaoCaoBGDModal(false)}
      />


      {/* ── Modal Hạch toán NVL ── */}
      {selectedHachToanItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2">
                <IconReceipt size={18} className="text-[#406c89]" />
                <h3 className="text-sm font-bold text-slate-800">
                  Hạch toán NVL: {selectedHachToanItem.thangNam}
                </h3>
              </div>
              <button
                onClick={() => setSelectedHachToanItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
              >
                <IconX size={16} />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Phòng ban:</span>
                  <span className="font-bold text-slate-800">{selectedHachToanItem.phongBan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tổng tiền đề xuất:</span>
                  <span className="font-bold text-[#406c89]">{formatVND(selectedHachToanItem.tongTien)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Trạng thái hiện tại:</span>
                  <span className="font-semibold text-slate-700">{selectedHachToanItem.trangThaiHT}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Mã chứng từ / Tài khoản hạch toán</label>
                <input
                  type="text"
                  defaultValue={`PKT-${selectedHachToanItem.thang}-${selectedHachToanItem.nam}`}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Ghi chú hạch toán</label>
                <textarea
                  rows={2}
                  placeholder="Nhập ghi chú định khoản chi phí NVL..."
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
                />
              </div>
            </div>

            <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedHachToanItem(null)}
                className="px-3.5 py-1.5 text-xs font-semibold bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  setData(data.map((d) => d.id === selectedHachToanItem.id ? { ...d, trangThaiHT: 'Đã hạch toán' } : d));
                  setSelectedHachToanItem(null);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold bg-[#406c89] hover:bg-[#345973] text-white rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Xác nhận hạch toán
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Bổ sung NVL (Component trong folder riêng) ── */}
      <ModalBoSungNVL
        isOpen={!!selectedBoSungItem}
        item={selectedBoSungItem}
        onClose={() => setSelectedBoSungItem(null)}
        onSave={(itemId, additionalCount, additionalAmount) => {
          setData(
            data.map((d) =>
              d.id === itemId
                ? {
                    ...d,
                    soMatHang: d.soMatHang + additionalCount,
                    tongTien: d.tongTien + additionalAmount,
                    boSungNVL: d.boSungNVL + 1,
                  }
                : d
            )
          );
        }}
      />

      {/* ── Modal Xuất NVL (Component trong folder riêng) ── */}
      <ModalXuatNVL
        isOpen={!!selectedXuatNVLItem}
        item={selectedXuatNVLItem}
        onClose={() => setSelectedXuatNVLItem(null)}
        onSave={(itemId) => {
          setData(
            data.map((d) =>
              d.id === itemId
                ? { ...d, trangThaiXuatKho: 'Đã xuất' }
                : d
            )
          );
        }}
      />
    </div>
  );
}
