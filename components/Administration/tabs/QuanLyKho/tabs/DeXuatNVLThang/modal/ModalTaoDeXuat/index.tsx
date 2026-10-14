"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  IconPlus,
  IconX,
  IconTrash,
  IconDeviceFloppy,
  IconLayoutColumns,
  IconBuildingStore,
  IconCheck,
} from '@tabler/icons-react';
import { DeXuatNVLItem } from '../../index';

interface ModalTaoDeXuatProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newItem: DeXuatNVLItem) => void;
}

interface NVLRowItem {
  id: string;
  stt: number;
  maNVL: string;
  tenHang: string;
  thongSo: string;
  dvt: string;
  ghiChu: string;
  duAnValues: Record<string, number>; // Project column values: { [colId]: number }
  soLuongManual?: number;
}

interface ColumnConfig {
  id: string;
  title: string;
  type: 'project' | 'shared';
}

const DANH_MUC_CHUAN_57_ITEMS: Omit<NVLRowItem, 'id' | 'stt' | 'duAnValues'>[] = [
  { maNVL: 'RIGID 110-TRANSP', tenHang: 'Nhựa in 3D Resin Rigid 110-Trans', thongSo: '1000g', dvt: 'g', ghiChu: '' },
  { maNVL: 'RIGID 110-GHI-1', tenHang: 'Nhựa in 3D Resin Rigid 110-Ghi', thongSo: '1000g', dvt: 'g', ghiChu: '' },
  { maNVL: 'CRYS 100-TRON', tenHang: 'Nhựa in 3D Resin Clear 100-Trong', thongSo: '1000g', dvt: 'g', ghiChu: '' },
  { maNVL: 'ELASTIC 600-DE', tenHang: 'Nhựa in 3D Elastic 600 - Đen', thongSo: '1000g', dvt: 'g', ghiChu: '' },
  { maNVL: 'ELASTIC 600-DE', tenHang: 'Nhựa in 3D Elastic 600 - Màu da', thongSo: '1000g', dvt: 'g', ghiChu: '' },
  { maNVL: 'ANYCUBIC BASI', tenHang: 'Nhựa in 3D Any Cubic Basic Đen', thongSo: '1000g', dvt: 'g', ghiChu: '' },
  { maNVL: 'FEP FILM-M3PL', tenHang: 'Phim FEP cho máy M3 Plus', thongSo: '260*175*0.15mm', dvt: 'Tấm', ghiChu: '' },
  { maNVL: 'FEP FILM-M3PL', tenHang: 'Phim FEP cho máy M3 Plus', thongSo: '260*175*0.2mm', dvt: 'Tấm', ghiChu: '' },
  { maNVL: 'GANG TAY', tenHang: 'Găng tay cao su', thongSo: '0.2mm', dvt: 'Cái / chiếc', ghiChu: '' },
  { maNVL: 'PHIEU INOX-60m', tenHang: 'Phễu inox D60-Mới', thongSo: '60mm', dvt: 'Cái / chiếc', ghiChu: '' },
  { maNVL: 'PHIEU INOX-60m', tenHang: 'Phễu inox D60-Đang sử dụng', thongSo: '60mm', dvt: 'Cái / chiếc', ghiChu: '' },
  { maNVL: 'PHIEU SILICON-D', tenHang: 'Phễu Silicon D60-Đang sử dụng', thongSo: '60mm', dvt: 'Cái / chiếc', ghiChu: '' },
  { maNVL: 'XENG ABS-0', tenHang: 'Xẻng nhựa ABS - Mới', thongSo: '100mm', dvt: 'Cái / chiếc', ghiChu: '' },
  { maNVL: 'XENG ABS-1', tenHang: 'Xẻng nhựa ABS-Đang sử dụng', thongSo: '100mm', dvt: 'Cái / chiếc', ghiChu: '' },
  { maNVL: 'XENG INOX-0', tenHang: 'Xẻng Inox - Mới', thongSo: '200mm', dvt: 'Cái / chiếc', ghiChu: '' },
  { maNVL: 'XENG INOX-1', tenHang: 'Xẻng Inox-Đang sử dụng', thongSo: '200mm', dvt: 'Cái / chiếc', ghiChu: '' },
  { maNVL: 'COC DONG-300', tenHang: 'Cốc đong resin 300ml', thongSo: '300ml', dvt: 'Cái / chiếc', ghiChu: '' },
  { maNVL: 'THAM SILICON-N', tenHang: 'Thảm đặt bàn phần in 3D', thongSo: '500*300mm', dvt: 'Cái / chiếc', ghiChu: '' },
  { maNVL: 'LUC LANG', tenHang: 'Bộ lục giác ốc', thongSo: 'Bộ', dvt: 'Cái', ghiChu: '' },
  { maNVL: 'ANYCUBIC-M3 M', tenHang: 'Máy in 3D Resin - M3 Max', thongSo: '298*165*30mm', dvt: 'Máy', ghiChu: '' },
  { maNVL: 'ANYCUBIC-M3 P', tenHang: 'Máy in 3D Resin - M3 Plus', thongSo: '197*122*245mm', dvt: 'Máy', ghiChu: '' },
  { maNVL: 'PHIEU GIAY', tenHang: 'Phễu giấy lọc cặn resin', thongSo: 'Có bản', dvt: 'Cái / chiếc', ghiChu: '' },
  { maNVL: 'HALOT X1-16-CO', tenHang: 'Máy in 3D Resin HALOT-X1', thongSo: '355*331*434m', dvt: 'Máy', ghiChu: '' },
  { maNVL: 'MAF FILM-HALO', tenHang: 'Tấm phim Nhựa cho máy HA', thongSo: '127*216*250', dvt: 'Tấm', ghiChu: '' },
  { maNVL: 'COC SILICON 25', tenHang: 'Cốc silicon 250ml', thongSo: '250ml', dvt: 'Cái / chiếc', ghiChu: '' },
  { maNVL: 'CREALITY ARR-N', tenHang: 'Nhựa in CREALITY ARR-N...', thongSo: '1000g', dvt: 'g', ghiChu: '' },
  { maNVL: 'CON 90', tenHang: 'Cồn 90 độ vệ sinh resin', thongSo: '30L/ Can', dvt: 'Lít', ghiChu: '' },
  { maNVL: 'KEO 502', tenHang: 'Keo dán nhanh 502 chuyên dụng', thongSo: 'Chai 100ml', dvt: 'Chai', ghiChu: '' },
  { maNVL: 'KEO SILICONE', tenHang: 'Keo silicone chịu nhiệt Apollo', thongSo: 'Tuýp 300ml', dvt: 'Tuýp', ghiChu: '' },
  { maNVL: 'GIAY NHAM 1000', tenHang: 'Giấy nhám nước P1000 đánh bóng', thongSo: '230x280mm', dvt: 'Tờ', ghiChu: '' },
  { maNVL: 'GIAY NHAM 2000', tenHang: 'Giấy nhám nước P2000 siêu mịn', thongSo: '230x280mm', dvt: 'Tờ', ghiChu: '' },
  { maNVL: 'DAO TRO-01', tenHang: 'Dao trổ kỹ thuật mỹ thuật cán nhôm', thongSo: 'Lưỡi 30 độ', dvt: 'Cây', ghiChu: '' },
  { maNVL: 'LUOI DAO TRO', tenHang: 'Lưỡi dao trổ thay thế SK5', thongSo: 'Hộp 10 lưỡi', dvt: 'Hộp', ghiChu: '' },
  { maNVL: 'KIM CAT CHAN', tenHang: 'Kìm cắt chân mô hình in 3D Plato', thongSo: '5 inch', dvt: 'Cái', ghiChu: '' },
  { maNVL: 'MAY SAY NHIET', tenHang: 'Máy sấy nhiệt mini sấy mẫu resin', thongSo: '300W - 220V', dvt: 'Máy', ghiChu: '' },
  { maNVL: 'DEN UV SAY', tenHang: 'Đèn sấy UV 405nm làm khô mẫu resin', thongSo: '6W - 405nm', dvt: 'Cái', ghiChu: '' },
  { maNVL: 'BAN XOAY UV', tenHang: 'Bàn xoay năng lượng mặt trời sấy UV', thongSo: 'D10cm', dvt: 'Cái', ghiChu: '' },
  { maNVL: 'KHAY INOX 304', tenHang: 'Khay inox ngâm cồn vệ sinh chi tiết', thongSo: '250x200x50mm', dvt: 'Cái', ghiChu: '' },
  { maNVL: 'BINH XIT CON', tenHang: 'Bình xịt cồn phun sương rửa mẫu', thongSo: '500ml', dvt: 'Bình', ghiChu: '' },
  { maNVL: 'KHAU TRANG THAN', tenHang: 'Khẩu trang than hoạt tính chống mùi', thongSo: '4 lớp lọc', dvt: 'Hộp', ghiChu: '' },
  { maNVL: 'KINH BAO HO', tenHang: 'Kính bảo hộ chống văng bắn hóa chất', thongSo: 'Trong suốt', dvt: 'Cái', ghiChu: '' },
  { maNVL: 'CHOI QUET SON', tenHang: 'Chổi quét vệ sinh cặn bồn in resin', thongSo: 'Rộng 2.5cm', dvt: 'Cái', ghiChu: '' },
  { maNVL: 'KHAN LAU PHONG', tenHang: 'Khăn lau phòng sạch không bụi Microfiber', thongSo: '20x20cm', dvt: 'Gói', ghiChu: '' },
  { maNVL: 'DAU BOI TRON', tenHang: 'Dầu bôi trơn ray trượt trục Z', thongSo: 'Chai 100ml', dvt: 'Chai', ghiChu: '' },
  { maNVL: 'MO BOI TRON', tenHang: 'Mỡ bôi trơn trục vít me chịu tải', thongSo: 'Hộp 50g', dvt: 'Hộp', ghiChu: '' },
  { maNVL: 'BANG DINH 2M', tenHang: 'Băng dính 2 mặt xốp dán mô hình', thongSo: '2cm x 10m', dvt: 'Cuộn', ghiChu: '' },
  { maNVL: 'SON LOT PRIMER', tenHang: 'Sơn lót xịt Surfacer cho mô hình 3D', thongSo: 'Chai 400ml', dvt: 'Chai', ghiChu: '' },
  { maNVL: 'SON XIT DEN', tenHang: 'Sơn xịt màu đen mờ chống phản quang', thongSo: 'Chai 400ml', dvt: 'Chai', ghiChu: '' },
  { maNVL: 'SON XIT TRANG', tenHang: 'Sơn xịt màu trắng bóng cao cấp', thongSo: 'Chai 400ml', dvt: 'Chai', ghiChu: '' },
  { maNVL: 'MAT KINH LCD', tenHang: 'Màn hình LCD 4K thay thế cho máy M3', thongSo: '7.6 inch 4K', dvt: 'Cái', ghiChu: '' },
  { maNVL: 'BO LOC KHONG KHI', tenHang: 'Cục lọc than hoạt tính khử mùi mini', thongSo: 'Mini USB', dvt: 'Bộ', ghiChu: '' },
  { maNVL: 'VAN XA RESIN', tenHang: 'Van xả đáy bồn chứa resin thay thế', thongSo: 'Ren đồng M8', dvt: 'Cái', ghiChu: '' },
  { maNVL: 'OC VIT INOX', tenHang: 'Bộ ốc vít inox siết bồn vat resin', thongSo: 'M4x20mm', dvt: 'Bộ', ghiChu: '' },
  { maNVL: 'QUE KHUAY GO', tenHang: 'Que khuấy resin y tế vô trùng', thongSo: 'Gói 100 que', dvt: 'Gói', ghiChu: '' },
  { maNVL: 'CAN DIEN TU', tenHang: 'Cân điện tử mini đo resin chính xác 0.1g', thongSo: 'Tối đa 3000g', dvt: 'Cái', ghiChu: '' },
  { maNVL: 'BONG GON Y TE', tenHang: 'Bông gòn vệ sinh màn hình LCD', thongSo: 'Gói 500g', dvt: 'Gói', ghiChu: '' },
  { maNVL: 'DUNG DICH CLEAN', tenHang: 'Dung dịch tẩy rửa buồng in resin', thongSo: 'Can 5L', dvt: 'Can', ghiChu: '' },
];

export default function ModalTaoDeXuat({
  isOpen,
  onClose,
  onSave,
}: ModalTaoDeXuatProps) {
  const currentMonth = 10;
  const currentYear = 2026;

  const [phongBan, setPhongBan] = useState('Phòng Khai triển');
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
  const [rows, setRows] = useState<NVLRowItem[]>([]);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  // Initialize standard items when opened
  useEffect(() => {
    if (isOpen) {
      setPhongBan('Phòng Khai triển');
      setColumns([]);
      const initialRows: NVLRowItem[] = DANH_MUC_CHUAN_57_ITEMS.map((item, index) => ({
        ...item,
        id: `row-${index + 1}`,
        stt: index + 1,
        duAnValues: {},
        soLuongManual: 0,
      }));
      setRows(initialRows);
    }
  }, [isOpen]);

  // Calculate row total quantity
  const getRowTotal = (row: NVLRowItem): number => {
    if (columns.length > 0) {
      return Object.values(row.duAnValues).reduce((sum, val) => sum + (Number(val) || 0), 0);
    }
    return row.soLuongManual || 0;
  };

  // Grand total sum
  const grandTotal = useMemo(() => {
    return rows.reduce((acc, row) => acc + getRowTotal(row), 0);
  }, [rows, columns]);

  if (!isOpen) return null;

  // Add a new custom NVL row
  const handleAddRow = () => {
    const newStt = rows.length + 1;
    const newRow: NVLRowItem = {
      id: `row-${Date.now()}`,
      stt: newStt,
      maNVL: `NVL-NEW-${newStt}`,
      tenHang: 'Nguyên vật liệu bổ sung mới',
      thongSo: 'Tiêu chuẩn',
      dvt: 'Cái',
      ghiChu: '',
      duAnValues: {},
      soLuongManual: 0,
    };
    setRows([...rows, newRow]);
  };

  // Delete a row
  const handleDeleteRow = (id: string) => {
    const filtered = rows.filter((r) => r.id !== id);
    // Re-index STT
    const reindexed = filtered.map((r, i) => ({ ...r, stt: i + 1 }));
    setRows(reindexed);
  };

  // Add project column
  const handleAddProjectColumn = () => {
    if (!newProjectName.trim()) return;
    const colId = `col_${Date.now()}`;
    setColumns([...columns, { id: colId, title: newProjectName.trim(), type: 'project' }]);
    setNewProjectName('');
    setShowAddProjectModal(false);
  };

  // Add shared usage column
  const handleAddSharedColumn = () => {
    const exists = columns.some((c) => c.type === 'shared');
    if (exists) {
      alert('Đã có cột Đề xuất SD Chung trong bảng!');
      return;
    }
    const colId = `col_sd_chung_${Date.now()}`;
    setColumns([...columns, { id: colId, title: 'Đề xuất SD Chung', type: 'shared' }]);
  };

  // Update cell value
  const handleQuantityChange = (rowId: string, colId: string | null, val: number) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== rowId) return r;
        if (colId) {
          return {
            ...r,
            duAnValues: {
              ...r.duAnValues,
              [colId]: Math.max(0, val),
            },
          };
        } else {
          return {
            ...r,
            soLuongManual: Math.max(0, val),
          };
        }
      })
    );
  };

  // Save proposal
  const handleSave = () => {
    const thangFormatted = String(currentMonth).padStart(2, '0');
    const totalCount = rows.filter((r) => getRowTotal(r) > 0).length || rows.length;

    const newItem: DeXuatNVLItem = {
      id: Date.now().toString(),
      maDeXuat: `DXNVL-${currentYear}-${thangFormatted}-${String(
        Math.floor(Math.random() * 90) + 10
      )}`,
      thang: currentMonth,
      nam: currentYear,
      thangNam: `Tháng ${thangFormatted}/${currentYear}`,
      phongBan: phongBan,
      nguoiLap: 'Phòng Khai triển',
      ngayLap: new Date().toLocaleDateString('vi-VN'),
      soMatHang: totalCount,
      tongTien: grandTotal * 50000 || 907200,
      trangThai: 'Chờ duyệt',
      trangThaiXuatKho: 'Chờ xuất',
      trangThaiHT: 'Chưa hạch toán',
      boSungNVL: 0,
      ghiChu: `Đề xuất nguyên vật liệu ${phongBan} tháng ${thangFormatted}/${currentYear}`,
    };

    onSave(newItem);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-2xs p-3 md:p-6 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[1220px] h-[86vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        {/* ── 1. Header Bar ── */}
        <div className="px-3.5 py-1.5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight">
              Tạo đề xuất NVL
            </span>

            <select
              value={phongBan}
              onChange={(e) => setPhongBan(e.target.value)}
              className="text-[11px] font-semibold px-2 py-0.5 bg-white border border-slate-300 rounded text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer"
            >
              <option value="Phòng Khai triển">Phòng Khai triển</option>
              <option value="Phòng Cắt">Phòng Cắt</option>
              <option value="Phòng Ghép">Phòng Ghép</option>
              <option value="Phòng Cảnh Quan">Phòng Cảnh Quan</option>
              <option value="Khối Kỹ thuật">Khối Kỹ thuật</option>
              <option value="Bộ phận Kho & Vật tư">Bộ phận Kho & Vật tư</option>
            </select>

            <span className="text-[11px] font-semibold text-slate-700">
              — Tháng {currentMonth}/{currentYear}
            </span>

            <span className="text-[10px] text-slate-500 italic">
              Đã nạp {rows.length} mặt hàng từ danh mục chuẩn
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold bg-[#2a4392] hover:bg-[#203474] text-white shadow-2xs transition-colors cursor-pointer"
            >
              <IconDeviceFloppy size={13} />
              <span>Lưu đề xuất</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <IconX size={13} />
              <span>Đóng</span>
            </button>
          </div>
        </div>

        {/* ── 2. Action Sub-header ── */}
        <div className="px-3 py-1.5 border-b border-slate-200 bg-white flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleAddRow}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <IconPlus size={12} className="text-slate-600" />
            <span>Thêm dòng NVL</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddProjectModal(true)}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <IconLayoutColumns size={12} className="text-slate-600" />
            <span>Thêm cột dự án</span>
          </button>

          <button
            type="button"
            onClick={handleAddSharedColumn}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <span>Thêm cột Đề xuất SD Chung</span>
          </button>
        </div>

        {/* ── 3. Table Container ── */}
        <div className="flex-1 overflow-auto flex flex-col">
          {/* Banner tiêu đề bảng màu xanh đậm */}
          <div className="bg-[#46667d] text-white py-1 px-3 text-center shrink-0">
            <h2 className="text-[11px] font-bold uppercase tracking-wider">
              ĐỀ XUẤT NGUYÊN VẬT LIỆU THÁNG {currentMonth} - {currentYear}
            </h2>
            <p className="text-[10px] font-medium text-slate-100 uppercase tracking-wide">
              PHÒNG BAN: {phongBan}
            </p>
          </div>

          {/* Bảng dữ liệu chi tiết */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-[10px] text-left border-collapse">
              <thead className="bg-[#f8fafc] text-slate-700 sticky top-0 z-10 border-b border-slate-200 font-semibold text-[10px]">
                <tr>
                  <th className="px-2 py-1.5 w-9 text-center border-r border-slate-200 whitespace-nowrap">
                    STT
                  </th>
                  <th className="px-2 py-1.5 w-28 border-r border-slate-200 whitespace-nowrap">
                    MÃ NVL
                  </th>
                  <th className="px-2.5 py-1.5 min-w-[200px] border-r border-slate-200 whitespace-nowrap">
                    Tên Nguyên vật liệu
                  </th>
                  <th className="px-2 py-1.5 w-24 border-r border-slate-200 whitespace-nowrap">
                    Thông số
                  </th>
                  <th className="px-2 py-1.5 w-18 text-center border-r border-slate-200 whitespace-nowrap">
                    Đơn vị tính
                  </th>

                  {/* Các cột dự án động */}
                  {columns.map((col) => (
                    <th
                      key={col.id}
                      className="px-2 py-1.5 w-20 text-center border-r border-slate-200 whitespace-nowrap bg-blue-50/60 text-[#406c89]"
                    >
                      {col.title}
                    </th>
                  ))}

                  <th className="px-2 py-1.5 w-24 text-center border-r border-slate-200 whitespace-nowrap bg-slate-100/80">
                    Tổng số lượng đề xuất tháng
                  </th>
                  <th className="px-2.5 py-1.5 min-w-[100px] border-r border-slate-200 whitespace-nowrap">
                    Ghi chú
                  </th>
                  <th className="px-1.5 py-1.5 w-8 text-center whitespace-nowrap"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 text-[10px]">
                {rows.map((row) => {
                  const rowTotal = getRowTotal(row);

                  return (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* STT */}
                      <td className="px-2 py-0.5 text-center text-slate-500 border-r border-slate-200">
                        {row.stt}
                      </td>

                      {/* MÃ NVL */}
                      <td className="px-2 py-0.5 font-semibold text-slate-800 uppercase border-r border-slate-200 whitespace-nowrap">
                        {row.maNVL}
                      </td>

                      {/* Tên NVL */}
                      <td className="px-2.5 py-0.5 text-slate-700 border-r border-slate-200">
                        {row.tenHang}
                      </td>

                      {/* Thông số */}
                      <td className="px-2 py-0.5 text-slate-600 border-r border-slate-200 whitespace-nowrap">
                        {row.thongSo}
                      </td>

                      {/* Đơn vị tính */}
                      <td className="px-2 py-0.5 text-center text-slate-600 border-r border-slate-200 whitespace-nowrap">
                        {row.dvt}
                      </td>

                      {/* Cột dự án động */}
                      {columns.map((col) => (
                        <td
                          key={col.id}
                          className="px-1 py-0.5 text-center border-r border-slate-200 bg-blue-50/20"
                        >
                          <input
                            type="number"
                            min={0}
                            value={row.duAnValues[col.id] || 0}
                            onChange={(e) =>
                              handleQuantityChange(row.id, col.id, Number(e.target.value))
                            }
                            className="w-12 px-1 py-0.5 text-center text-[10px] bg-white border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                          />
                        </td>
                      ))}

                      {/* Tổng số lượng đề xuất tháng */}
                      <td className="px-2 py-0.5 text-center font-bold text-slate-800 border-r border-slate-200 bg-slate-50/40">
                        {columns.length > 0 ? (
                          rowTotal
                        ) : (
                          <input
                            type="number"
                            min={0}
                            value={row.soLuongManual ?? 0}
                            onChange={(e) =>
                              handleQuantityChange(row.id, null, Number(e.target.value))
                            }
                            className="w-12 px-1 py-0.5 text-center text-[10px] bg-white border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                          />
                        )}
                      </td>

                      {/* Ghi chú */}
                      <td className="px-2 py-0.5 text-slate-600 border-r border-slate-200">
                        <input
                          type="text"
                          placeholder="..."
                          value={row.ghiChu}
                          onChange={(e) => {
                            const val = e.target.value;
                            setRows(
                              rows.map((r) => (r.id === row.id ? { ...r, ghiChu: val } : r))
                            );
                          }}
                          className="w-full px-1 py-0.5 bg-transparent border-0 focus:bg-white focus:border focus:border-slate-200 rounded text-[10px] text-slate-700 focus:outline-none"
                        />
                      </td>

                      {/* Delete action */}
                      <td className="px-1 py-0.5 text-center">
                        <button
                          type="button"
                          onClick={() => handleDeleteRow(row.id)}
                          className="text-red-400 hover:text-red-600 p-0.5 rounded transition-colors cursor-pointer"
                          title="Xóa dòng NVL"
                        >
                          <IconTrash size={12} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              {/* ── Bottom Total Summary Row ── */}
              <tfoot className="sticky bottom-0 z-10 bg-[#fedec6] text-slate-800 font-bold border-t border-slate-300">
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-1.5 text-right uppercase tracking-wider text-[10px] border-r border-slate-300"
                  >
                    TỔNG SỐ LƯỢNG ĐỀ XUẤT THÁNG
                  </td>

                  {/* Tổng từng cột dự án */}
                  {columns.map((col) => {
                    const colTotal = rows.reduce(
                      (sum, r) => sum + (Number(r.duAnValues[col.id]) || 0),
                      0
                    );
                    return (
                      <td
                        key={col.id}
                        className="px-1.5 py-1.5 text-center text-[10px] border-r border-slate-300"
                      >
                        {colTotal}
                      </td>
                    );
                  })}

                  {/* Tổng chung */}
                  <td className="px-2 py-1.5 text-center text-[11px] font-extrabold text-slate-900 border-r border-slate-300">
                    {grandTotal}
                  </td>

                  <td colSpan={2} className="px-2 py-1.5"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* ── Dialog Thêm cột dự án ── */}
        {showAddProjectModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4">
            <div className="bg-white rounded-lg shadow-xl border border-slate-200 w-full max-w-sm overflow-hidden p-4 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h4 className="text-xs font-bold text-slate-800">Thêm cột dự án mới</h4>
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <IconX size={14} />
                </button>
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">
                  Tên mã cột dự án (VD: DA 31, DA 129...)
                </label>
                <input
                  type="text"
                  autoFocus
                  placeholder="Nhập tên cột dự án..."
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddProjectColumn();
                  }}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="px-3 py-1 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleAddProjectColumn}
                  className="px-3 py-1 text-xs font-semibold text-white bg-[#406c89] hover:bg-[#345973] rounded"
                >
                  Thêm cột
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
