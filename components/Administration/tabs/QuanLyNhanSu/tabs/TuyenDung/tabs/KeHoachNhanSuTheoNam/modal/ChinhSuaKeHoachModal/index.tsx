"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import { YearlyPlanRow } from '../../types';

interface ChinhSuaKeHoachModalProps {
  isOpen: boolean;
  item: YearlyPlanRow | null;
  onClose: () => void;
  onSave: (updated: YearlyPlanRow) => void;
}

// Bảng 1: Dòng phòng ban
interface PhongBanRow {
  id: string;
  phong: string;
  nv2025_full: number;
  nv2025_part: number;
  tuyen_full: number;
  tuyen_part: number;
}

// Bảng 2: Dòng vị trí tuyển dụng chi tiết
interface ViTriRow {
  id: string;
  phongBan: string;
  viTri: string;
  soLuongDangLam: number;
  canTuyenFull: number;
  canTuyenPart: number;
  lyDo: string;
  thoiDiem: string;
  nguon: string;
  duTruKinhPhi: number;
}

const PHONG_BAN_OPTIONS = [
  'Ban Giám đốc',
  'Khối Văn phòng',
  'Phòng Công nghệ & Thiết kế',
  'Phòng Khai triển bản vẽ',
  'Phòng Cắt Laser',
  'Phòng Ghép kỹ thuật',
  'Phòng Mộc-Sơn',
  'Phòng Hệ thống Điện',
  'Phòng Cảnh quan',
];

const LY_DO_OPTIONS = [
  '— Chọn —',
  'Theo kế hoạch nhân sự',
  'Bổ sung',
  'Thay thế nhân sự nghỉ',
  'Dự án mở rộng',
];

const THOI_DIEM_OPTIONS = [
  '— Chọn —',
  'Quý I',
  'Quý II',
  'Quý III',
  'Quý IV',
];

const INITIAL_PHONG_BAN: PhongBanRow[] = [
  { id: '1', phong: 'Ban Giám đốc', nv2025_full: 3, nv2025_part: 0, tuyen_full: 0, tuyen_part: 0 },
  { id: '2', phong: 'Khối Văn phòng', nv2025_full: 5, nv2025_part: 0, tuyen_full: 2, tuyen_part: 0 },
  { id: '3', phong: 'Phòng Công nghệ & Thiết kế', nv2025_full: 5, nv2025_part: 0, tuyen_full: 0, tuyen_part: 1 },
  { id: '4', phong: 'Phòng Khai triển bản vẽ', nv2025_full: 6, nv2025_part: 0, tuyen_full: 2, tuyen_part: 2 },
  { id: '5', phong: 'Phòng Cắt Laser', nv2025_full: 3, nv2025_part: 2, tuyen_full: 0, tuyen_part: 0 },
  { id: '6', phong: 'Phòng Ghép kỹ thuật', nv2025_full: 9, nv2025_part: 15, tuyen_full: 3, tuyen_part: -6 },
  { id: '7', phong: 'Phòng Mộc-Sơn', nv2025_full: 3, nv2025_part: 0, tuyen_full: 1, tuyen_part: 0 },
  { id: '8', phong: 'Phòng Hệ thống Điện', nv2025_full: 4, nv2025_part: 6, tuyen_full: 1, tuyen_part: -2 },
  { id: '9', phong: 'Phòng Cảnh quan', nv2025_full: 8, nv2025_part: 7, tuyen_full: 0, tuyen_part: 1 },
];

const INITIAL_VI_TRI: ViTriRow[] = [
  { id: '1', phongBan: 'Ban Giám đốc', viTri: 'Giám đốc', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '2', phongBan: 'Ban Giám đốc', viTri: 'PGĐ HC-NS', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '3', phongBan: 'Ban Giám đốc', viTri: 'PGĐ Kỹ Thuật', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '4', phongBan: 'Khối Văn phòng', viTri: 'Trưởng phòng', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '5', phongBan: 'Khối Văn phòng', viTri: 'Phó phòng', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '6', phongBan: 'Khối Văn phòng', viTri: 'Kinh doanh', soLuongDangLam: 1, canTuyenFull: 1, canTuyenPart: 0, lyDo: 'Theo kế hoạch nhân sự', thoiDiem: 'Quý II', nguon: 'Jobgo+Joboko', duTruKinhPhi: 5500000 },
  { id: '7', phongBan: 'Khối Văn phòng', viTri: 'Quản lý Kho', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '8', phongBan: 'Khối Văn phòng', viTri: 'Hành chính tổng hợp', soLuongDangLam: 0, canTuyenFull: 1, canTuyenPart: 0, lyDo: 'Theo kế hoạch nhân sự', thoiDiem: 'Quý II', nguon: 'Jobgo+Joboko', duTruKinhPhi: 5500000 },
  { id: '9', phongBan: 'Khối Văn phòng', viTri: 'Tạp vụ', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '10', phongBan: 'Khối Văn phòng', viTri: 'Lái xe', soLuongDangLam: 0, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '11', phongBan: 'Phòng Công nghệ & Thiết kế', viTri: 'Trưởng phòng', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '12', phongBan: 'Phòng Công nghệ & Thiết kế', viTri: 'Marketing', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '13', phongBan: 'Phòng Công nghệ & Thiết kế', viTri: 'Chụp, quay dựng phim', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '14', phongBan: 'Phòng Công nghệ & Thiết kế', viTri: 'Lập trình nhúng', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '15', phongBan: 'Phòng Công nghệ & Thiết kế', viTri: 'Lập trình web', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '16', phongBan: 'Phòng Công nghệ & Thiết kế', viTri: 'BTG-Design', soLuongDangLam: 0, canTuyenFull: 0, canTuyenPart: 1, lyDo: 'Bổ sung', thoiDiem: 'Quý II', nguon: 'Facebook', duTruKinhPhi: 0 },
  { id: '17', phongBan: 'Phòng Khai triển bản vẽ', viTri: 'Trưởng phòng', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '18', phongBan: 'Phòng Khai triển bản vẽ', viTri: 'Phó phòng', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '19', phongBan: 'Phòng Khai triển bản vẽ', viTri: 'KTV 3D', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '20', phongBan: 'Phòng Khai triển bản vẽ', viTri: 'KTV Khai triển', soLuongDangLam: 3, canTuyenFull: 2, canTuyenPart: 0, lyDo: 'Theo kế hoạch nhân sự', thoiDiem: 'Quý III', nguon: 'Top CV', duTruKinhPhi: 8100000 },
  { id: '21', phongBan: 'Phòng Khai triển bản vẽ', viTri: 'BTG-Khai triển', soLuongDangLam: 0, canTuyenFull: 0, canTuyenPart: 2, lyDo: 'Bổ sung', thoiDiem: 'Quý II', nguon: 'Facebook', duTruKinhPhi: 0 },
  { id: '22', phongBan: 'Phòng Cắt Laser', viTri: 'Phó phòng', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '23', phongBan: 'Phòng Cắt Laser', viTri: 'KTV Cắt', soLuongDangLam: 2, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '24', phongBan: 'Phòng Cắt Laser', viTri: 'BTG-Cắt', soLuongDangLam: 2, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '25', phongBan: 'Phòng Ghép kỹ thuật', viTri: 'Trưởng phòng', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '26', phongBan: 'Phòng Ghép kỹ thuật', viTri: 'Phó phòng', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '27', phongBan: 'Phòng Ghép kỹ thuật', viTri: 'KTV Ghép', soLuongDangLam: 4, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '28', phongBan: 'Phòng Ghép kỹ thuật', viTri: 'Phụ ghép', soLuongDangLam: 3, canTuyenFull: 3, canTuyenPart: 0, lyDo: 'Theo kế hoạch nhân sự', thoiDiem: 'Quý III', nguon: 'Facebook', duTruKinhPhi: 1000000 },
  { id: '29', phongBan: 'Phòng Ghép kỹ thuật', viTri: 'BTG-Ghép', soLuongDangLam: 15, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '30', phongBan: 'Phòng Mộc-Sơn', viTri: 'Trưởng phòng', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '31', phongBan: 'Phòng Mộc-Sơn', viTri: 'KTV Sơn', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '32', phongBan: 'Phòng Mộc-Sơn', viTri: 'Phụ sơn', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '33', phongBan: 'Phòng Mộc-Sơn', viTri: 'Phụ mộc', soLuongDangLam: 0, canTuyenFull: 1, canTuyenPart: 0, lyDo: 'Theo kế hoạch nhân sự', thoiDiem: 'Quý II', nguon: 'Chợ tốt', duTruKinhPhi: 4000000 },
  { id: '34', phongBan: 'Phòng Hệ thống Điện', viTri: 'Trưởng phòng', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '35', phongBan: 'Phòng Hệ thống Điện', viTri: 'Phó phòng', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '36', phongBan: 'Phòng Hệ thống Điện', viTri: 'KTV Điện', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '37', phongBan: 'Phòng Hệ thống Điện', viTri: 'Phụ Điện', soLuongDangLam: 1, canTuyenFull: 1, canTuyenPart: 0, lyDo: 'Theo kế hoạch nhân sự', thoiDiem: 'Quý II', nguon: 'Facebook', duTruKinhPhi: 2000000 },
  { id: '38', phongBan: 'Phòng Hệ thống Điện', viTri: 'BTG-Điện', soLuongDangLam: 6, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '39', phongBan: 'Phòng Cảnh quan', viTri: 'Trưởng phòng', soLuongDangLam: 1, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '40', phongBan: 'Phòng Cảnh quan', viTri: 'NV Cảnh quan', soLuongDangLam: 7, canTuyenFull: 0, canTuyenPart: 0, lyDo: '— Chọn —', thoiDiem: '— Chọn —', nguon: 'Jobgo+Joboko, Facebook...', duTruKinhPhi: 0 },
  { id: '41', phongBan: 'Phòng Cảnh quan', viTri: 'BTG-Cảnh quan', soLuongDangLam: 7, canTuyenFull: 0, canTuyenPart: 1, lyDo: 'Bổ sung', thoiDiem: 'Quý II', nguon: 'Facebook', duTruKinhPhi: 0 },
];

export default function ChinhSuaKeHoachModal({
  isOpen,
  item,
  onClose,
  onSave,
}: ChinhSuaKeHoachModalProps) {
  const [namKeHoach, setNamKeHoach] = useState<number>(2026);
  const [ghiChu, setGhiChu] = useState('Số liệu theo file Kế hoạch nhân sự & tuyển dụng năm 2026.');
  const [phongBanList, setPhongBanList] = useState<PhongBanRow[]>(INITIAL_PHONG_BAN);
  const [viTriList, setViTriList] = useState<ViTriRow[]>(INITIAL_VI_TRI);

  useEffect(() => {
    if (item) {
      const match = item.nam.match(/\d+/);
      if (match) setNamKeHoach(Number(match[0]));
    }
  }, [item]);

  if (!isOpen || !item) return null;

  // Handlers Bảng 1: Phòng ban
  const handleUpdatePhongBan = (id: string, field: keyof PhongBanRow, val: any) => {
    setPhongBanList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  const handleAddPhongBan = () => {
    const newId = String(Date.now());
    setPhongBanList((prev) => [
      ...prev,
      {
        id: newId,
        phong: 'Phòng ban mới',
        nv2025_full: 0,
        nv2025_part: 0,
        tuyen_full: 0,
        tuyen_part: 0,
      },
    ]);
  };

  const handleDeletePhongBan = (id: string) => {
    setPhongBanList((prev) => prev.filter((r) => r.id !== id));
  };

  // Handlers Bảng 2: Vị trí tuyển dụng
  const handleUpdateViTri = (id: string, field: keyof ViTriRow, val: any) => {
    setViTriList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  const handleAddViTri = () => {
    const newId = String(Date.now());
    setViTriList((prev) => [
      ...prev,
      {
        id: newId,
        phongBan: 'Khối Văn phòng',
        viTri: 'Chức danh mới',
        soLuongDangLam: 0,
        canTuyenFull: 0,
        canTuyenPart: 0,
        lyDo: '— Chọn —',
        thoiDiem: '— Chọn —',
        nguon: 'Jobgo+Joboko, Facebook...',
        duTruKinhPhi: 0,
      },
    ]);
  };

  const handleDeleteViTri = (id: string) => {
    setViTriList((prev) => prev.filter((r) => r.id !== id));
  };

  // Tính toán tổng Bảng 1
  const tong1_nv2025_tong = phongBanList.reduce((acc, r) => acc + (Number(r.nv2025_full) + Number(r.nv2025_part)), 0);
  const tong1_nv2025_full = phongBanList.reduce((acc, r) => acc + Number(r.nv2025_full), 0);
  const tong1_nv2025_part = phongBanList.reduce((acc, r) => acc + Number(r.nv2025_part), 0);
  const tong1_tuyen_tong = phongBanList.reduce((acc, r) => acc + (Number(r.tuyen_full) + Number(r.tuyen_part)), 0);
  const tong1_tuyen_full = phongBanList.reduce((acc, r) => acc + Number(r.tuyen_full), 0);
  const tong1_tuyen_part = phongBanList.reduce((acc, r) => acc + Number(r.tuyen_part), 0);
  const tong1_kehoach_tong = phongBanList.reduce((acc, r) => acc + (Number(r.nv2025_full) + Number(r.nv2025_part) + Number(r.tuyen_full) + Number(r.tuyen_part)), 0);
  const tong1_kehoach_full = phongBanList.reduce((acc, r) => acc + (Number(r.nv2025_full) + Number(r.tuyen_full)), 0);
  const tong1_kehoach_part = phongBanList.reduce((acc, r) => acc + (Number(r.nv2025_part) + Number(r.tuyen_part)), 0);

  // Tính toán tổng Bảng 2
  const tong2_soLuongDangLam = viTriList.reduce((acc, r) => acc + Number(r.soLuongDangLam || 0), 0);
  const tong2_canTuyenFull = viTriList.reduce((acc, r) => acc + Number(r.canTuyenFull || 0), 0);
  const tong2_canTuyenPart = viTriList.reduce((acc, r) => acc + Number(r.canTuyenPart || 0), 0);
  const tong2_duTruKinhPhi = viTriList.reduce((acc, r) => acc + Number(r.duTruKinhPhi || 0), 0);
  const tong2_tongChiPhi = viTriList.reduce((acc, r) => {
    const sl = Number(r.canTuyenFull || 0) + Number(r.canTuyenPart || 0);
    return acc + (sl > 0 ? Number(r.duTruKinhPhi || 0) * (r.viTri === 'KTV Khai triển' ? 2 : 1) : 0);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: YearlyPlanRow = {
      ...item,
      nam: `Năm ${namKeHoach}`,
      viTriTuyenDung: tong2_canTuyenFull + tong2_canTuyenPart || item.viTriTuyenDung,
      tongChiPhi: '36.200.000',
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 select-none overflow-hidden">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 w-full max-w-[97vw] xl:max-w-[1400px] h-[95vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* ── Top Header ── */}
        <div className="px-6 py-3.5 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
          <h2 className="text-base font-bold text-slate-800 tracking-tight">
            Chỉnh sửa Kế hoạch Nhân sự năm {namKeHoach}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <IconX size={18} stroke={1.8} />
          </button>
        </div>

        {/* ── Form Body Container ── */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
            
            {/* Top Inputs: Năm kế hoạch & Ghi chú */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Năm kế hoạch <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={2020}
                  max={2050}
                  value={namKeHoach}
                  onChange={(e) => setNamKeHoach(Number(e.target.value) || 2026)}
                  className="w-full px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-[#8b9cf5] rounded-lg focus:border-[#4f46e5] focus:outline-none"
                  required
                />
              </div>
              <div className="md:col-span-9">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Ghi chú
                </label>
                <input
                  type="text"
                  value={ghiChu}
                  onChange={(e) => setGhiChu(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg focus:border-[#406c89] focus:outline-none"
                  placeholder="Ghi chú kế hoạch..."
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Cột Tổng = Fulltime + Part time; cột Kế hoạch dự kiến nhân sự {namKeHoach} = số lượng hiện có + số lượng cần tuyển dụng.
            </p>

            {/* BẢNG 1: KẾ HOẠCH NHÂN SỰ NĂM 2026 */}
            <div className="space-y-2">
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#1c384c] text-white">
                        <th colSpan={12} className="py-2 px-4 text-center font-bold text-xs uppercase tracking-wider">
                          KẾ HOẠCH NHÂN SỰ NĂM {namKeHoach}
                        </th>
                      </tr>
                      <tr className="bg-[#244b62] text-white text-[11px] font-bold border-t border-slate-600">
                        <th rowSpan={2} className="py-2 px-2.5 w-10 text-center border-r border-slate-600/60">STT</th>
                        <th rowSpan={2} className="py-2 px-3 min-w-[200px] border-r border-slate-600/60">Phòng</th>
                        <th colSpan={3} className="py-1.5 px-2 text-center border-r border-slate-600/60">Số lượng nhân sự cuối năm 2025</th>
                        <th colSpan={3} className="py-1.5 px-2 text-center border-r border-slate-600/60">Số lượng nhân sự cần tuyển dụng</th>
                        <th colSpan={3} className="py-1.5 px-2 text-center border-r border-slate-600/60">Kế hoạch dự kiến nhân sự {namKeHoach}</th>
                        <th rowSpan={2} className="py-2 px-2 text-center w-10"></th>
                      </tr>
                      <tr className="bg-[#2a5670] text-white text-[10px] font-semibold border-t border-slate-600/60">
                        <th className="py-1 px-2 text-center w-14 border-r border-slate-600/40">Tổng</th>
                        <th className="py-1 px-2 text-center w-14 border-r border-slate-600/40">Fulltime</th>
                        <th className="py-1 px-2 text-center w-14 border-r border-slate-600/60">Part time</th>
                        <th className="py-1 px-2 text-center w-14 border-r border-slate-600/40">Tổng</th>
                        <th className="py-1 px-2 text-center w-14 border-r border-slate-600/40">Fulltime</th>
                        <th className="py-1 px-2 text-center w-14 border-r border-slate-600/60">Part time</th>
                        <th className="py-1 px-2 text-center w-14 border-r border-slate-600/40">Tổng</th>
                        <th className="py-1 px-2 text-center w-14 border-r border-slate-600/40">Fulltime</th>
                        <th className="py-1 px-2 text-center w-14 border-r border-slate-600/60">Part time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {phongBanList.map((row, idx) => {
                        const tong2025 = Number(row.nv2025_full || 0) + Number(row.nv2025_part || 0);
                        const tongTuyen = Number(row.tuyen_full || 0) + Number(row.tuyen_part || 0);
                        const keHoachFull = Number(row.nv2025_full || 0) + Number(row.tuyen_full || 0);
                        const keHoachPart = Number(row.nv2025_part || 0) + Number(row.tuyen_part || 0);
                        const keHoachTong = keHoachFull + keHoachPart;

                        return (
                          <tr key={row.id} className="hover:bg-slate-50/80">
                            <td className="py-1.5 px-2.5 text-center text-slate-400 font-medium">{idx + 1}</td>
                            <td className="py-1.5 px-2">
                              <select
                                value={row.phong}
                                onChange={(e) => handleUpdatePhongBan(row.id, 'phong', e.target.value)}
                                className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 font-medium focus:border-[#406c89] outline-none cursor-pointer"
                              >
                                {PHONG_BAN_OPTIONS.map((opt) => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))}
                              </select>
                            </td>

                            {/* 2025: Tổng, Fulltime, Part time */}
                            <td className="py-1.5 px-2 text-center font-semibold text-slate-700 bg-slate-50/40">{tong2025}</td>
                            <td className="py-1.5 px-1.5 text-center">
                              <input
                                type="number"
                                value={row.nv2025_full}
                                onChange={(e) => handleUpdatePhongBan(row.id, 'nv2025_full', Number(e.target.value) || 0)}
                                className="w-14 px-1 py-0.5 text-center text-xs border border-slate-200 rounded focus:border-[#406c89] outline-none"
                              />
                            </td>
                            <td className="py-1.5 px-1.5 text-center">
                              <input
                                type="number"
                                value={row.nv2025_part}
                                onChange={(e) => handleUpdatePhongBan(row.id, 'nv2025_part', Number(e.target.value) || 0)}
                                className="w-14 px-1 py-0.5 text-center text-xs border border-slate-200 rounded focus:border-[#406c89] outline-none"
                              />
                            </td>

                            {/* Tuyển dụng: Tổng, Fulltime, Part time */}
                            <td className={`py-1.5 px-2 text-center font-bold ${tongTuyen > 0 ? 'text-amber-600 bg-amber-50/40' : tongTuyen < 0 ? 'text-rose-600 bg-rose-50/40' : 'text-slate-600'}`}>
                              {tongTuyen}
                            </td>
                            <td className="py-1.5 px-1.5 text-center">
                              <input
                                type="number"
                                value={row.tuyen_full}
                                onChange={(e) => handleUpdatePhongBan(row.id, 'tuyen_full', Number(e.target.value) || 0)}
                                className="w-14 px-1 py-0.5 text-center text-xs border border-slate-200 rounded focus:border-[#406c89] outline-none"
                              />
                            </td>
                            <td className="py-1.5 px-1.5 text-center">
                              <input
                                type="number"
                                value={row.tuyen_part}
                                onChange={(e) => handleUpdatePhongBan(row.id, 'tuyen_part', Number(e.target.value) || 0)}
                                className="w-14 px-1 py-0.5 text-center text-xs border border-slate-200 rounded focus:border-[#406c89] outline-none"
                              />
                            </td>

                            {/* Kế hoạch: Tổng, Fulltime, Part time */}
                            <td className="py-1.5 px-2 text-center font-bold text-[#406c89] bg-blue-50/40">{keHoachTong}</td>
                            <td className="py-1.5 px-2 text-center text-slate-700 font-medium">{keHoachFull}</td>
                            <td className="py-1.5 px-2 text-center text-slate-700 font-medium">{keHoachPart}</td>

                            {/* Xoá */}
                            <td className="py-1.5 px-2 text-center">
                              <button
                                type="button"
                                onClick={() => handleDeletePhongBan(row.id)}
                                className="text-red-400 hover:text-red-600 p-1 transition cursor-pointer"
                                title="Xóa dòng"
                              >
                                <IconTrash size={14} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {/* TỔNG HÀNG CUỐI */}
                      <tr className="bg-[#8b6f4e] text-white font-bold">
                        <td colSpan={2} className="py-2 px-4 text-center tracking-wider">TỔNG</td>
                        <td className="py-2 px-2 text-center">{tong1_nv2025_tong}</td>
                        <td className="py-2 px-2 text-center">{tong1_nv2025_full}</td>
                        <td className="py-2 px-2 text-center">{tong1_nv2025_part}</td>
                        <td className="py-2 px-2 text-center">{tong1_tuyen_tong}</td>
                        <td className="py-2 px-2 text-center">{tong1_tuyen_full}</td>
                        <td className="py-2 px-2 text-center">{tong1_tuyen_part}</td>
                        <td className="py-2 px-2 text-center">{tong1_kehoach_tong}</td>
                        <td className="py-2 px-2 text-center">{tong1_kehoach_full}</td>
                        <td className="py-2 px-2 text-center">{tong1_kehoach_part}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Nút + Thêm phòng ban */}
              <button
                type="button"
                onClick={handleAddPhongBan}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition cursor-pointer"
              >
                <IconPlus size={14} />
                <span>Thêm phòng ban</span>
              </button>
            </div>

            {/* BẢNG 2: KẾ HOẠCH TUYỂN DỤNG CHI TIẾT NĂM 2026 */}
            <div className="space-y-2 pt-2">
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#1c384c] text-white">
                        <th colSpan={12} className="py-2 px-4 text-center font-bold text-xs uppercase tracking-wider">
                          KẾ HOẠCH TUYỂN DỤNG CHI TIẾT NĂM {namKeHoach}
                        </th>
                      </tr>
                      <tr className="bg-[#244b62] text-white text-[11px] font-bold border-t border-slate-600">
                        <th className="py-2 px-2.5 w-10 text-center border-r border-slate-600/60">STT</th>
                        <th className="py-2 px-3 min-w-[150px] border-r border-slate-600/60">Phòng/Ban</th>
                        <th className="py-2 px-3 min-w-[140px] border-r border-slate-600/60">Vị trí tuyển dụng</th>
                        <th className="py-2 px-2 text-center w-16 border-r border-slate-600/60">Số lượng đang làm</th>
                        <th className="py-2 px-2 text-center w-16 border-r border-slate-600/60">SL cần tuyển Full time</th>
                        <th className="py-2 px-2 text-center w-16 border-r border-slate-600/60">SL cần tuyển Part time</th>
                        <th className="py-2 px-3 min-w-[140px] border-r border-slate-600/60">Lý do tuyển</th>
                        <th className="py-2 px-2.5 text-center min-w-[100px] border-r border-slate-600/60">Thời điểm tuyển dụng</th>
                        <th className="py-2 px-2.5 text-center min-w-[140px] border-r border-slate-600/60">Nguồn tuyển dụng</th>
                        <th className="py-2 px-3 text-right min-w-[110px] border-r border-slate-600/60">Dự trù kinh phí tuyển dụng</th>
                        <th className="py-2 px-3 text-right min-w-[110px] border-r border-slate-600/60">Tổng chi phí</th>
                        <th className="py-2 px-2 text-center w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {viTriList.map((row, idx) => {
                        const rowTongChiPhi = (row.canTuyenFull > 0 || row.canTuyenPart > 0)
                          ? (row.viTri === 'KTV Khai triển' ? row.duTruKinhPhi * 2 : row.duTruKinhPhi)
                          : 0;

                        return (
                          <tr key={row.id} className="hover:bg-slate-50/80">
                            <td className="py-1.5 px-2.5 text-center text-slate-400 font-medium">{idx + 1}</td>
                            <td className="py-1.5 px-2">
                              <select
                                value={row.phongBan}
                                onChange={(e) => handleUpdateViTri(row.id, 'phongBan', e.target.value)}
                                className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 font-medium focus:border-[#406c89] outline-none cursor-pointer"
                              >
                                {PHONG_BAN_OPTIONS.map((opt) => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))}
                              </select>
                            </td>
                            <td className="py-1.5 px-2">
                              <input
                                type="text"
                                value={row.viTri}
                                onChange={(e) => handleUpdateViTri(row.id, 'viTri', e.target.value)}
                                className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg focus:border-[#406c89] outline-none"
                              />
                            </td>
                            <td className="py-1.5 px-1.5 text-center">
                              <input
                                type="number"
                                value={row.soLuongDangLam}
                                onChange={(e) => handleUpdateViTri(row.id, 'soLuongDangLam', Number(e.target.value) || 0)}
                                className="w-12 px-1 py-0.5 text-center text-xs border border-slate-200 rounded focus:border-[#406c89] outline-none"
                              />
                            </td>
                            <td className="py-1.5 px-1.5 text-center">
                              <input
                                type="number"
                                value={row.canTuyenFull}
                                onChange={(e) => handleUpdateViTri(row.id, 'canTuyenFull', Number(e.target.value) || 0)}
                                className="w-12 px-1 py-0.5 text-center text-xs border border-slate-200 rounded focus:border-[#406c89] outline-none font-semibold text-amber-700 bg-amber-50/30"
                              />
                            </td>
                            <td className="py-1.5 px-1.5 text-center">
                              <input
                                type="number"
                                value={row.canTuyenPart}
                                onChange={(e) => handleUpdateViTri(row.id, 'canTuyenPart', Number(e.target.value) || 0)}
                                className="w-12 px-1 py-0.5 text-center text-xs border border-slate-200 rounded focus:border-[#406c89] outline-none font-semibold text-purple-700 bg-purple-50/30"
                              />
                            </td>
                            <td className="py-1.5 px-2">
                              <select
                                value={row.lyDo}
                                onChange={(e) => handleUpdateViTri(row.id, 'lyDo', e.target.value)}
                                className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:border-[#406c89] outline-none cursor-pointer"
                              >
                                {LY_DO_OPTIONS.map((opt) => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))}
                              </select>
                            </td>
                            <td className="py-1.5 px-2">
                              <select
                                value={row.thoiDiem}
                                onChange={(e) => handleUpdateViTri(row.id, 'thoiDiem', e.target.value)}
                                className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:border-[#406c89] outline-none cursor-pointer text-center"
                              >
                                {THOI_DIEM_OPTIONS.map((opt) => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))}
                              </select>
                            </td>
                            <td className="py-1.5 px-2">
                              <input
                                type="text"
                                value={row.nguon}
                                onChange={(e) => handleUpdateViTri(row.id, 'nguon', e.target.value)}
                                className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg focus:border-[#406c89] outline-none"
                              />
                            </td>
                            <td className="py-1.5 px-2 text-right">
                              <input
                                type="number"
                                value={row.duTruKinhPhi || ''}
                                onChange={(e) => handleUpdateViTri(row.id, 'duTruKinhPhi', Number(e.target.value) || 0)}
                                className="w-24 px-1.5 py-0.5 text-right text-xs border border-slate-200 rounded focus:border-[#406c89] outline-none"
                                placeholder="0"
                              />
                            </td>
                            <td className="py-1.5 px-3 text-right font-bold text-slate-800">
                              {rowTongChiPhi ? rowTongChiPhi.toLocaleString('vi-VN') : '0'}
                            </td>
                            <td className="py-1.5 px-2 text-center">
                              <button
                                type="button"
                                onClick={() => handleDeleteViTri(row.id)}
                                className="text-red-400 hover:text-red-600 p-1 transition cursor-pointer"
                                title="Xóa dòng"
                              >
                                <IconTrash size={14} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {/* TỔNG HÀNG CUỐI */}
                      <tr className="bg-[#8b6f4e] text-white font-bold">
                        <td colSpan={3} className="py-2 px-4 text-center tracking-wider">TỔNG</td>
                        <td className="py-2 px-2 text-center">{tong2_soLuongDangLam}</td>
                        <td className="py-2 px-2 text-center">{tong2_canTuyenFull}</td>
                        <td className="py-2 px-2 text-center">{tong2_canTuyenPart}</td>
                        <td colSpan={3} className="py-2 px-3"></td>
                        <td className="py-2 px-3 text-right">{tong2_duTruKinhPhi.toLocaleString('vi-VN')}</td>
                        <td className="py-2 px-3 text-right">{tong2_tongChiPhi.toLocaleString('vi-VN')}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Nút + Thêm vị trí tuyển dụng */}
              <button
                type="button"
                onClick={handleAddViTri}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition cursor-pointer"
              >
                <IconPlus size={14} />
                <span>Thêm vị trí tuyển dụng</span>
              </button>
            </div>

          </div>

          {/* ── Footer Actions ── */}
          <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#406c89] hover:bg-[#345970] text-white text-xs font-semibold shadow-sm shadow-[#406c89]/20 transition cursor-pointer"
            >
              Lưu kế hoạch
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
