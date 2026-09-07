"use client";

import React, { useRef, useState, useEffect } from 'react';
import { IconChevronLeft, IconChevronRight, IconPencil, IconTrash } from '@tabler/icons-react';

export interface XuatKhoItem {
  stt: number;
  ngay_xuat: string;
  du_an: string; // Mã dự án / Tên dự án
  nhom_hang: string;
  ma_hang: string;
  ten_hang: string;
  thong_so: string;
  dvt: string;
  so_luong: number;
  don_gia_xuat_kho: number;
  thanh_tien: number;
  phong_ban: string;
  nhan_su: string;
  ghi_chu: string;
}

export const getNhomHangBadgeClass = (nhom: string) => {
  switch (nhom) {
    case 'Chất kết dính':
      return 'bg-[#fce7f3] text-[#db2777] border-[#fbcfe8]';
    case 'Hệ thống ánh sáng':
      return 'bg-[#fae8ff] text-[#a21caf] border-[#f5d0fe]';
    case 'Công cụ dụng cụ':
      return 'bg-[#ccfbf1] text-[#0f766e] border-[#99f6e4]';
    case 'Linh kiện điện':
      return 'bg-[#fef9c3] text-[#a16207] border-[#fef08a]';
    case 'Chất phụ gia':
      return 'bg-[#ffedd5] text-[#b45309] border-[#fed7aa]';
    case 'Phụ liệu ngành mộc':
      return 'bg-[#ede9fe] text-[#6d28d9] border-[#ddd6fe]';
    case 'Phụ liệu cảnh quan':
      return 'bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]';
    case 'Đóng gói hàng':
      return 'bg-[#fef9c3] text-[#854d0e] border-[#fde047]';
    case 'Sơn':
      return 'bg-[#ffedd5] text-[#c2410c] border-[#fed7aa]';
    case 'NVL khác':
      return 'bg-[#e2e8f0] text-[#334155] border-[#cbd5e1]';
    case 'ACRYLICOS VALLEJO':
      return 'bg-[#f1f5f9] text-[#1e293b] border-[#e2e8f0]';
    case 'Mica':
      return 'bg-[#f1f5f9] text-[#475569] border-[#e2e8f0]';
    case 'Giấy':
      return 'bg-[#f5f5f4] text-[#44403c] border-[#e7e5e4]';
    default:
      return 'bg-[#406c89]/10 text-[#406c89] border-[#406c89]/20';
  }
};

export const mockXuatKho: XuatKhoItem[] = [
  {
    stt: 1,
    ngay_xuat: '20/01/2026',
    du_an: 'DA-HN-01 / Trụ sở VP Apex',
    nhom_hang: 'Giấy',
    ma_hang: 'BIA_0.6',
    ten_hang: 'giấy bìa 0.6mm',
    thong_so: '0',
    dvt: 'Tấm',
    so_luong: 18,
    don_gia_xuat_kho: 16_000,
    thanh_tien: 288_000,
    phong_ban: 'Phòng Thiết kế',
    nhan_su: 'Nguyễn Văn Hưng',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '20/01/2026',
    du_an: 'DA-HCM-02 / Biệt thự Vinhome Q9',
    nhom_hang: 'Chất kết dính',
    ma_hang: 'BD-GIAY 2',
    ten_hang: 'Băng dính giấy 2cm',
    thong_so: '0',
    dvt: 'Cuộn',
    so_luong: 15,
    don_gia_xuat_kho: 3_000,
    thanh_tien: 45_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Trần Đình Trọng',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '20/01/2026',
    du_an: 'DA-DN-03 / Pullman Resort Đà Nẵng',
    nhom_hang: 'Hệ thống ánh sáng',
    ma_hang: 'LED_2835V',
    ten_hang: 'Bóng led 2835 vàng',
    thong_so: '0',
    dvt: 'Bóng',
    so_luong: 500,
    don_gia_xuat_kho: 300,
    thanh_tien: 150_000,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Lê Hoàng Nam',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '21/01/2026',
    du_an: 'DA-HP-04 / Showroom Hải Phòng',
    nhom_hang: 'Công cụ dụng cụ',
    ma_hang: 'CC_LUOI DAO SDI',
    ten_hang: 'Lưỡi dao trổ nhỏ SDI',
    thong_so: '0',
    dvt: 'Vỉ',
    so_luong: 1,
    don_gia_xuat_kho: 26_000,
    thanh_tien: 26_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Phạm Quốc Bảo',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '21/01/2026',
    du_an: 'DA-VP-05 / Tòa nhà Discovery',
    nhom_hang: 'Chất kết dính',
    ma_hang: 'BD-GIAY 2',
    ten_hang: 'Băng dính giấy 2cm',
    thong_so: '0',
    dvt: 'Cuộn',
    so_luong: 2,
    don_gia_xuat_kho: 3_000,
    thanh_tien: 6_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Trần Đình Trọng',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '21/01/2026',
    du_an: 'DA-KHO-06 / Trung tâm Logistics Long An',
    nhom_hang: 'Chất kết dính',
    ma_hang: 'KEO_SILICOL500',
    ten_hang: 'Keo silicol A500 trong',
    thong_so: '300 mL/chai',
    dvt: 'lọ',
    so_luong: 1,
    don_gia_xuat_kho: 65_000,
    thanh_tien: 65_000,
    phong_ban: 'Phòng Thi công',
    nhan_su: 'Vũ Đức Thịnh',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '21/01/2026',
    du_an: 'DA-HN-01 / Trụ sở VP Apex',
    nhom_hang: 'Hệ thống ánh sáng',
    ma_hang: 'LED_0603T',
    ten_hang: 'Bóng led 0603 trắng',
    thong_so: '0',
    dvt: 'Bóng',
    so_luong: 100,
    don_gia_xuat_kho: 300,
    thanh_tien: 30_000,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Lê Hoàng Nam',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '21/01/2026',
    du_an: 'DA-HCM-02 / Biệt thự Vinhome Q9',
    nhom_hang: 'Hệ thống ánh sáng',
    ma_hang: 'LED_0603V',
    ten_hang: 'Bóng led 0603 vàng',
    thong_so: '0',
    dvt: 'Bóng',
    so_luong: 100,
    don_gia_xuat_kho: 300,
    thanh_tien: 30_000,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Lê Hoàng Nam',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '21/01/2026',
    du_an: 'DA-DN-03 / Pullman Resort Đà Nẵng',
    nhom_hang: 'Hệ thống ánh sáng',
    ma_hang: 'LED_0805V',
    ten_hang: 'Bóng led 0805 vàng',
    thong_so: '0',
    dvt: 'Bóng',
    so_luong: 150,
    don_gia_xuat_kho: 300,
    thanh_tien: 45_000,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Lê Hoàng Nam',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '21/01/2026',
    du_an: 'DA-HP-04 / Showroom Hải Phòng',
    nhom_hang: 'Hệ thống ánh sáng',
    ma_hang: 'LED_0805T',
    ten_hang: 'Bóng led 0805 trắng',
    thong_so: '0',
    dvt: 'Bóng',
    so_luong: 100,
    don_gia_xuat_kho: 300,
    thanh_tien: 30_000,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Lê Hoàng Nam',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '22/01/2026',
    du_an: 'DA-VP-05 / Tòa nhà Discovery',
    nhom_hang: 'Hệ thống ánh sáng',
    ma_hang: 'TU_30×40',
    ten_hang: 'Tủ điện 30×40×15mm',
    thong_so: '30×40×15mm',
    dvt: 'cái/chiếc',
    so_luong: 1,
    don_gia_xuat_kho: 275_000,
    thanh_tien: 275_000,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Lê Hoàng Nam',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '22/01/2026',
    du_an: 'DA-KHO-06 / Trung tâm Logistics Long An',
    nhom_hang: 'Linh kiện điện',
    ma_hang: 'AS-ROLE- LY2/220V',
    ten_hang: 'Rơle LY2/220V (Idec) + đế',
    thong_so: 'LY2/220V (Idec)',
    dvt: 'cái/chiếc',
    so_luong: 1,
    don_gia_xuat_kho: 65_000,
    thanh_tien: 65_000,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Hoàng Minh Tuấn',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '22/01/2026',
    du_an: 'DA-HN-01 / Trụ sở VP Apex',
    nhom_hang: 'Hệ thống ánh sáng',
    ma_hang: 'DAY_1X2',
    ten_hang: 'Dây điện 1×2mm',
    thong_so: '1×2mm',
    dvt: 'md',
    so_luong: 4,
    don_gia_xuat_kho: 9_610,
    thanh_tien: 38_440,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Lê Hoàng Nam',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '22/01/2026',
    du_an: 'DA-HCM-02 / Biệt thự Vinhome Q9',
    nhom_hang: 'Hệ thống ánh sáng',
    ma_hang: 'CONG TAC 1',
    ten_hang: 'Công tắc inox xanh lá có đèn',
    thong_so: '220v',
    dvt: 'cái/chiếc',
    so_luong: 1,
    don_gia_xuat_kho: 74_800,
    thanh_tien: 74_800,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Lê Hoàng Nam',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '22/01/2026',
    du_an: 'DA-DN-03 / Pullman Resort Đà Nẵng',
    nhom_hang: 'Hệ thống ánh sáng',
    ma_hang: 'NGUON_MENWALL LRS-350-12',
    ten_hang: 'Nguồn LRS-350-12',
    thong_so: 'LRS-350-12',
    dvt: 'cái/chiếc',
    so_luong: 2,
    don_gia_xuat_kho: 572_000,
    thanh_tien: 1_144_000,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Hoàng Minh Tuấn',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '22/01/2026',
    du_an: 'DA-HP-04 / Showroom Hải Phòng',
    nhom_hang: 'Hệ thống ánh sáng',
    ma_hang: 'LED_0603V',
    ten_hang: 'Bóng led 0603 vàng',
    thong_so: '0',
    dvt: 'Bóng',
    so_luong: 400,
    don_gia_xuat_kho: 300,
    thanh_tien: 120_000,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Lê Hoàng Nam',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '2/1/26',
    du_an: 'DA-VP-05 / Tòa nhà Discovery',
    nhom_hang: 'Mica',
    ma_hang: 'MC_000-0.5',
    ten_hang: 'Mica trong 0.5mm',
    thong_so: '1170×1650×0.5mm',
    dvt: 'Tấm',
    so_luong: 2,
    don_gia_xuat_kho: 920_000,
    thanh_tien: 1_840_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Bùi Quang Huy',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '2/1/26',
    du_an: 'DA-KHO-06 / Trung tâm Logistics Long An',
    nhom_hang: 'Mica',
    ma_hang: 'MC_000-1',
    ten_hang: 'mica trong 1mm',
    thong_so: '950X1870X1mm',
    dvt: 'Tấm',
    so_luong: 3,
    don_gia_xuat_kho: 680_000,
    thanh_tien: 2_040_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Bùi Quang Huy',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '2/1/26',
    du_an: 'DA-HN-01 / Trụ sở VP Apex',
    nhom_hang: 'Chất kết dính',
    ma_hang: 'BD-GIAY 2',
    ten_hang: 'Băng dính giấy 2cm',
    thong_so: '0',
    dvt: 'Cuộn',
    so_luong: 15,
    don_gia_xuat_kho: 3_000,
    thanh_tien: 45_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Trần Đình Trọng',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '2/1/26',
    du_an: 'DA-HCM-02 / Biệt thự Vinhome Q9',
    nhom_hang: 'Công cụ dụng cụ',
    ma_hang: 'CC_NYLON',
    ten_hang: 'Nylon che chắn bụi đa năng',
    thong_so: '1100×30000mm',
    dvt: 'cuộn',
    so_luong: 1,
    don_gia_xuat_kho: 30_000,
    thanh_tien: 30_000,
    phong_ban: 'Ban An toàn Lao động',
    nhan_su: 'Tạ Minh Khang',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '3/1/26',
    du_an: 'DA-DN-03 / Pullman Resort Đà Nẵng',
    nhom_hang: 'Công cụ dụng cụ',
    ma_hang: 'CC_NHIP',
    ten_hang: 'Nhíp',
    thong_so: 'VETUS ST12 thẳng nhọn',
    dvt: 'cái',
    so_luong: 2,
    don_gia_xuat_kho: 16_000,
    thanh_tien: 32_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Nguyễn Văn Hưng',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '3/1/26',
    du_an: 'DA-HP-04 / Showroom Hải Phòng',
    nhom_hang: 'Hệ thống ánh sáng',
    ma_hang: 'DAY_1X2',
    ten_hang: 'Dây điện 1×2mm',
    thong_so: '1×2mm',
    dvt: 'md',
    so_luong: 3,
    don_gia_xuat_kho: 9_610,
    thanh_tien: 28_830,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Lê Hoàng Nam',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '3/1/26',
    du_an: 'DA-VP-05 / Tòa nhà Discovery',
    nhom_hang: 'ACRYLICOS VALLEJO',
    ma_hang: 'VAL-26201',
    ten_hang: 'Màu vẽ transparent water -26201',
    thong_so: '200ml',
    dvt: 'lọ',
    so_luong: 1,
    don_gia_xuat_kho: 290_103_399,
    thanh_tien: 290_103_399,
    phong_ban: 'Phòng Thiết kế',
    nhan_su: 'Phạm Quốc Bảo',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '5/1/26',
    du_an: 'DA-KHO-06 / Trung tâm Logistics Long An',
    nhom_hang: 'Sơn',
    ma_hang: 'MO_50-G8',
    ten_hang: 'Phủ mờ 50 G8',
    thong_so: '0',
    dvt: 'kg',
    so_luong: 1,
    don_gia_xuat_kho: 97_200,
    thanh_tien: 97_200,
    phong_ban: 'Xưởng Sơn',
    nhan_su: 'Bùi Quang Huy',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '5/1/25',
    du_an: 'DA-HN-01 / Trụ sở VP Apex',
    nhom_hang: 'Chất kết dính',
    ma_hang: 'BD-GIAY 2',
    ten_hang: 'Băng dính giấy 2cm',
    thong_so: '0',
    dvt: 'Cuộn',
    so_luong: 5,
    don_gia_xuat_kho: 3_000,
    thanh_tien: 15_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Trần Đình Trọng',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '5/1/25',
    du_an: 'DA-HCM-02 / Biệt thự Vinhome Q9',
    nhom_hang: 'Công cụ dụng cụ',
    ma_hang: 'CC_LUOI DAO SDI',
    ten_hang: 'Lưỡi dao trổ nhỏ SDI',
    thong_so: '0',
    dvt: 'Vỉ',
    so_luong: 2,
    don_gia_xuat_kho: 26_000,
    thanh_tien: 52_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Phạm Quốc Bảo',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '5/1/25',
    du_an: 'DA-DN-03 / Pullman Resort Đà Nẵng',
    nhom_hang: 'Giấy',
    ma_hang: 'BIA_A4',
    ten_hang: 'Bìa màu ĐB A4 xanh vẹt-IT230',
    thong_so: 'DL80',
    dvt: 'Ram',
    so_luong: 200,
    don_gia_xuat_kho: 570,
    thanh_tien: 114_000,
    phong_ban: 'Phòng Thiết kế',
    nhan_su: 'Vũ Đức Thịnh',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '5/1/25',
    du_an: 'DA-HP-04 / Showroom Hải Phòng',
    nhom_hang: 'Công cụ dụng cụ',
    ma_hang: 'CC_MK_1.5MM',
    ten_hang: 'Mũi khoan 1.5mm',
    thong_so: '1.5mm',
    dvt: 'cái',
    so_luong: 3,
    don_gia_xuat_kho: 6_500,
    thanh_tien: 19_500,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Phạm Quốc Bảo',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '5/1/25',
    du_an: 'DA-VP-05 / Tòa nhà Discovery',
    nhom_hang: 'Công cụ dụng cụ',
    ma_hang: 'CC_MK_6MM',
    ten_hang: 'Mũi khoan 6mm',
    thong_so: '6mm',
    dvt: 'cái',
    so_luong: 3,
    don_gia_xuat_kho: 7_000,
    thanh_tien: 21_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Phạm Quốc Bảo',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '5/1/25',
    du_an: 'DA-KHO-06 / Trung tâm Logistics Long An',
    nhom_hang: 'Sơn',
    ma_hang: 'XIT_ATM_A100',
    ten_hang: 'sơn xịt a100',
    thong_so: '0',
    dvt: 'lọ',
    so_luong: 1,
    don_gia_xuat_kho: 35_000,
    thanh_tien: 35_000,
    phong_ban: 'Xưởng Sơn',
    nhan_su: 'Bùi Quang Huy',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '5/1/25',
    du_an: 'DA-HN-01 / Trụ sở VP Apex',
    nhom_hang: 'Sơn',
    ma_hang: 'SON_TOA 881',
    ten_hang: 'sơn toa 881 vàng',
    thong_so: '850ml',
    dvt: 'lon',
    so_luong: 3,
    don_gia_xuat_kho: 175_000,
    thanh_tien: 525_000,
    phong_ban: 'Xưởng Sơn',
    nhan_su: 'Bùi Quang Huy',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '5/1/25',
    du_an: 'DA-HCM-02 / Biệt thự Vinhome Q9',
    nhom_hang: 'Sơn',
    ma_hang: 'SON_AXP1069',
    ten_hang: 'sơn axp 1069 xanh lá',
    thong_so: '850ml',
    dvt: 'lon',
    so_luong: 2,
    don_gia_xuat_kho: 125_000,
    thanh_tien: 250_000,
    phong_ban: 'Xưởng Sơn',
    nhan_su: 'Bùi Quang Huy',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '5/1/25',
    du_an: 'DA-DN-03 / Pullman Resort Đà Nẵng',
    nhom_hang: 'NVL khác',
    ma_hang: 'GIAP A180',
    ten_hang: 'Giấy giáp A180',
    thong_so: '0',
    dvt: 'Tờ',
    so_luong: 1,
    don_gia_xuat_kho: 4_200,
    thanh_tien: 4_200,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Trần Đình Trọng',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '5/1/25',
    du_an: 'DA-HP-04 / Showroom Hải Phòng',
    nhom_hang: 'NVL khác',
    ma_hang: 'GIAP A320',
    ten_hang: 'Giấy giáp A320',
    thong_so: '0',
    dvt: 'Tờ',
    so_luong: 1,
    don_gia_xuat_kho: 4_200,
    thanh_tien: 4_200,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Trần Đình Trọng',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '5/1/25',
    du_an: 'DA-VP-05 / Tòa nhà Discovery',
    nhom_hang: 'NVL khác',
    ma_hang: 'XAM-XE-MAY',
    ten_hang: 'Xăm xe máy',
    thong_so: '0',
    dvt: 'cái/chiếc',
    so_luong: 4,
    don_gia_xuat_kho: 5_000,
    thanh_tien: 20_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Trần Đình Trọng',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '6/1/25',
    du_an: 'DA-KHO-06 / Trung tâm Logistics Long An',
    nhom_hang: 'Linh kiện điện',
    ma_hang: 'TRO_680',
    ten_hang: 'Điện trở đài loan 680 ôm 1/4w (A-11-21)',
    thong_so: '680 ôm/100con',
    dvt: 'Bộ',
    so_luong: 10,
    don_gia_xuat_kho: 1_833_333_333,
    thanh_tien: 10 * 1_833_333_333,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Hoàng Minh Tuấn',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '6/1/25',
    du_an: 'DA-HN-01 / Trụ sở VP Apex',
    nhom_hang: 'Linh kiện điện',
    ma_hang: 'TRO_1000',
    ten_hang: 'Điện trở đài loan 1000 ôm 1/4w',
    thong_so: '1000 ôm/100 con',
    dvt: 'Bộ',
    so_luong: 3,
    don_gia_xuat_kho: 16_580,
    thanh_tien: 49_740,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Hoàng Minh Tuấn',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '6/1/25',
    du_an: 'DA-HCM-02 / Biệt thự Vinhome Q9',
    nhom_hang: 'Công cụ dụng cụ',
    ma_hang: 'CC-DAO BA 7',
    ten_hang: 'Dao xúc bột bả inox 7.5cm',
    thong_so: '7.5cm',
    dvt: 'cái',
    so_luong: 1,
    don_gia_xuat_kho: 23_100,
    thanh_tien: 23_100,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Phạm Quốc Bảo',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '6/2/25',
    du_an: 'DA-DN-03 / Pullman Resort Đà Nẵng',
    nhom_hang: 'Chất phụ gia',
    ma_hang: 'XANG BUTIN',
    ten_hang: 'xăng butin',
    thong_so: '0',
    dvt: 'lít',
    so_luong: 60,
    don_gia_xuat_kho: 40_000,
    thanh_tien: 2_400_000,
    phong_ban: 'Xưởng Sơn',
    nhan_su: 'Bùi Quang Huy',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '8/1/26',
    du_an: 'DA-HN-01 / Trụ sở VP Apex',
    nhom_hang: 'Công cụ dụng cụ',
    ma_hang: 'CC_LUOI CUA LONG',
    ten_hang: 'Lưỡi cưa lọng cầm tay T344D (vỉ 5c)',
    thong_so: 'T344D (vỉ 5c)',
    dvt: 'hộp',
    so_luong: 2,
    don_gia_xuat_kho: 40_000,
    thanh_tien: 80_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Nguyễn Văn Hưng',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '8/1/26',
    du_an: 'DA-HP-04 / Showroom Hải Phòng',
    nhom_hang: 'Chất kết dính',
    ma_hang: 'KEO_502',
    ten_hang: 'keo 502',
    thong_so: '150ml',
    dvt: 'lọ',
    so_luong: 3,
    don_gia_xuat_kho: 2_775_438_596,
    thanh_tien: 3 * 2_775_438_596,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Trần Đình Trọng',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '8/1/26',
    du_an: 'DA-VP-05 / Tòa nhà Discovery',
    nhom_hang: 'Công cụ dụng cụ',
    ma_hang: 'CC_LUOI DAO SDI',
    ten_hang: 'Lưỡi dao trổ nhỏ SDI',
    thong_so: '0',
    dvt: 'Vỉ',
    so_luong: 3,
    don_gia_xuat_kho: 26_000,
    thanh_tien: 78_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Phạm Quốc Bảo',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '8/1/26',
    du_an: 'DA-KHO-06 / Trung tâm Logistics Long An',
    nhom_hang: 'Công cụ dụng cụ',
    ma_hang: 'NEP_GD85008',
    ten_hang: 'Chỉ nẹp cân trơn GD-85008',
    thong_so: '30×2400mm',
    dvt: 'Thanh',
    so_luong: 7,
    don_gia_xuat_kho: 60_000,
    thanh_tien: 420_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Đỗ Văn Thành',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '8/1/26',
    du_an: 'DA-HN-01 / Trụ sở VP Apex',
    nhom_hang: 'Công cụ dụng cụ',
    ma_hang: 'NEP_GD85001',
    ten_hang: 'Chỉ nẹp lệch trơn GD-85001',
    thong_so: '24×2400mm',
    dvt: 'Thanh',
    so_luong: 7,
    don_gia_xuat_kho: 60_000,
    thanh_tien: 420_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Đỗ Văn Thành',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '8/1/26',
    du_an: 'DA-HCM-02 / Biệt thự Vinhome Q9',
    nhom_hang: 'Phụ liệu ngành mộc',
    ma_hang: 'OP_LAM-SONG',
    ten_hang: 'Tấm ốp lam sóng bán nguyệt',
    thong_so: '160×15×3000mm',
    dvt: 'Tấm',
    so_luong: 3,
    don_gia_xuat_kho: 120_000,
    thanh_tien: 360_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Đỗ Văn Thành',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '8/1/26',
    du_an: 'DA-DN-03 / Pullman Resort Đà Nẵng',
    nhom_hang: 'Công cụ dụng cụ',
    ma_hang: 'B-07353_D165×48T',
    ten_hang: 'B-07353 Lưỡi cưa gỗ hợp kim D165×48T',
    thong_so: 'D165×48T',
    dvt: 'cái',
    so_luong: 1,
    don_gia_xuat_kho: 888_000,
    thanh_tien: 888_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Nguyễn Văn Hưng',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '8/1/26',
    du_an: 'DA-HP-04 / Showroom Hải Phòng',
    nhom_hang: 'Công cụ dụng cụ',
    ma_hang: 'CC_MUI PHAY ARDEN',
    ten_hang: 'Mũi phay thẳng Arden 0201-bi dưới 1/4*3/8',
    thong_so: 'Arden 0201-bi dưới 1/4*3/8',
    dvt: 'cái/chiếc',
    so_luong: 1,
    don_gia_xuat_kho: 172_500,
    thanh_tien: 172_500,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Phạm Quốc Bảo',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '8/1/26',
    du_an: 'DA-VP-05 / Tòa nhà Discovery',
    nhom_hang: 'Phụ liệu cảnh quan',
    ma_hang: 'CQ-DATSET',
    ten_hang: 'Đất sét trắng thái',
    thong_so: '0.25g/gói',
    dvt: 'kg',
    so_luong: 0.5,
    don_gia_xuat_kho: 155_000,
    thanh_tien: 77_500,
    phong_ban: 'Phòng Thiết kế',
    nhan_su: 'Vũ Đức Thịnh',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '8/1/26',
    du_an: 'DA-KHO-06 / Trung tâm Logistics Long An',
    nhom_hang: 'Sơn',
    ma_hang: 'SON_TOA 881',
    ten_hang: 'sơn toa 881 vàng',
    thong_so: '850ml',
    dvt: 'lon',
    so_luong: 1,
    don_gia_xuat_kho: 175_000,
    thanh_tien: 175_000,
    phong_ban: 'Xưởng Sơn',
    nhan_su: 'Bùi Quang Huy',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '8/1/26',
    du_an: 'DA-HN-01 / Trụ sở VP Apex',
    nhom_hang: 'Sơn',
    ma_hang: 'SON_TOA 991',
    ten_hang: 'Sơn toa 911 trắng mờ',
    thong_so: '850ml',
    dvt: 'lon',
    so_luong: 9,
    don_gia_xuat_kho: 120_000,
    thanh_tien: 1_080_000,
    phong_ban: 'Xưởng Sơn',
    nhan_su: 'Bùi Quang Huy',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '8/1/26',
    du_an: 'DA-HCM-02 / Biệt thự Vinhome Q9',
    nhom_hang: 'Sơn',
    ma_hang: 'SON_TOA 999',
    ten_hang: 'Sơn toa 999 đen',
    thong_so: '850ml',
    dvt: 'lon',
    so_luong: 3,
    don_gia_xuat_kho: 135_000,
    thanh_tien: 405_000,
    phong_ban: 'Xưởng Sơn',
    nhan_su: 'Bùi Quang Huy',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '9/1/26',
    du_an: 'DA-DN-03 / Pullman Resort Đà Nẵng',
    nhom_hang: 'Đóng gói hàng',
    ma_hang: 'DG-MANGPE',
    ten_hang: 'Màng bọc đồ PE',
    thong_so: '0',
    dvt: 'Cuộn',
    so_luong: 1,
    don_gia_xuat_kho: 200_000,
    thanh_tien: 200_000,
    phong_ban: 'Ban An toàn Lao động',
    nhan_su: 'Tạ Minh Khang',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '9/1/26',
    du_an: 'DA-HP-04 / Showroom Hải Phòng',
    nhom_hang: 'Chất kết dính',
    ma_hang: 'BD-TRONG 5',
    ten_hang: 'băng dính trong 5cm',
    thong_so: '0',
    dvt: 'cuộn',
    so_luong: 1,
    don_gia_xuat_kho: 33_000,
    thanh_tien: 33_000,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Trần Đình Trọng',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '9/1/26',
    du_an: 'DA-VP-05 / Tòa nhà Discovery',
    nhom_hang: 'Hệ thống ánh sáng',
    ma_hang: 'DAY_1X0.3',
    ten_hang: 'Dây điện 1×0.3mm',
    thong_so: '1×0.3mm',
    dvt: 'md',
    so_luong: 200,
    don_gia_xuat_kho: 1_199,
    thanh_tien: 239_800,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Lê Hoàng Nam',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '9/1/26',
    du_an: 'DA-KHO-06 / Trung tâm Logistics Long An',
    nhom_hang: 'Hệ thống ánh sáng',
    ma_hang: 'DAY_1X0.5',
    ten_hang: 'Dây điện 1×0.5mm',
    thong_so: '1×0.5mm',
    dvt: 'md',
    so_luong: 100,
    don_gia_xuat_kho: 1_751,
    thanh_tien: 175_100,
    phong_ban: 'Đội Cơ điện M&E',
    nhan_su: 'Lê Hoàng Nam',
    ghi_chu: '',
  },
  {
    stt: 1,
    ngay_xuat: '9/1/26',
    du_an: 'DA-HN-01 / Trụ sở VP Apex',
    nhom_hang: 'Công cụ dụng cụ',
    ma_hang: 'CC_DAO SDI',
    ten_hang: 'Dao trổ nhỏ SDI',
    thong_so: '0',
    dvt: 'cái',
    so_luong: 1,
    don_gia_xuat_kho: 26_400,
    thanh_tien: 26_400,
    phong_ban: 'Xưởng Sản xuất',
    nhan_su: 'Phạm Quốc Bảo',
    ghi_chu: '',
  },
];

interface XuatKhoProps {
  search?: string;
  nhom?: string;
}

export default function XuatKho({ search = '', nhom = 'Tất cả nhóm hàng' }: XuatKhoProps) {
  const [items, setItems] = useState<XuatKhoItem[]>(mockXuatKho);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, nhom]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !scrollContainerRef.current) return;
    dragInfo.current = {
      isDown: true,
      startX: e.pageX - scrollContainerRef.current.offsetLeft,
      scrollLeft: scrollContainerRef.current.scrollLeft,
    };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragInfo.current.isDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - dragInfo.current.startX) * 1.5;
    scrollContainerRef.current.scrollLeft = dragInfo.current.scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    dragInfo.current.isDown = false;
    setIsDragging(false);
  };

  const handleDelete = (item: XuatKhoItem) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa vật tư "${item.ten_hang}" (${item.ma_hang}) khỏi danh sách xuất kho?`)) {
      setItems((prev) => prev.filter((x) => x !== item));
    }
  };

  const handleEdit = (item: XuatKhoItem) => {
    alert(`Chỉnh sửa phiếu xuất kho cho vật tư: ${item.ten_hang} (${item.ma_hang})`);
  };

  const filtered = items.filter((row) => {
    const matchNhom = nhom === 'Tất cả nhóm hàng' || row.nhom_hang === nhom;
    const s = search.toLowerCase();
    const matchSearch =
      row.ma_hang.toLowerCase().includes(s) ||
      row.ten_hang.toLowerCase().includes(s) ||
      row.nhom_hang.toLowerCase().includes(s) ||
      row.du_an.toLowerCase().includes(s) ||
      row.thong_so.toLowerCase().includes(s) ||
      row.phong_ban.toLowerCase().includes(s) ||
      row.nhan_su.toLowerCase().includes(s) ||
      row.ghi_chu.toLowerCase().includes(s) ||
      row.ngay_xuat.includes(s);
    return matchNhom && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

  const totalSoLuong = filtered.reduce((acc, cur) => acc + cur.so_luong, 0);
  const totalThanhTien = filtered.reduce((acc, cur) => acc + cur.thanh_tien, 0);

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
      {/* ── Table scrollable container ── */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`overflow-auto flex-1 cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? 'select-none' : ''
        }`}
        title="Nhấn giữ chuột để trượt ngang bảng"
      >
        <table className="w-full text-xs">
          <thead className="bg-[#406c89] text-white sticky top-0 z-20 shadow-sm">
            <tr>
              <th className="text-center px-3 py-2.5 font-bold whitespace-nowrap border-r border-white/20 w-12 sticky top-0 bg-[#406c89]">
                STT
              </th>
              <th className="text-center px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Ngày xuất
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 left-0 z-30 bg-[#406c89] shadow-[3px_0_6px_rgba(0,0,0,0.15)] min-w-[200px]">
                Mã dự án / Tên dự án
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Nhóm hàng
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Mã hàng
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Tên hàng
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Thông số
              </th>
              <th className="text-center px-3 py-2.5 font-bold whitespace-nowrap border-r border-white/20 w-16 sticky top-0 bg-[#406c89]">
                ĐVT
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Số lượng
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Đơn giá xuất kho
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Thành tiền
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Phòng ban
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Nhân sự
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20 sticky top-0 bg-[#406c89]">
                Ghi chú
              </th>
              <th className="text-center px-3.5 py-2.5 font-bold whitespace-nowrap sticky top-0 right-0 z-30 bg-[#406c89] shadow-[-3px_0_6px_rgba(0,0,0,0.15)] min-w-[80px] w-20">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={15} className="px-4 py-10 text-center text-slate-400">
                  Không tìm thấy dữ liệu xuất kho phù hợp
                </td>
              </tr>
            ) : (
              paginatedData.map((v, i) => (
                <tr
                  key={`${v.ma_hang}-${i}`}
                  className={`group border-b border-slate-100 hover:bg-slate-50/80 transition-colors ${
                    i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                  }`}
                >
                  <td className="px-3 py-2.5 text-center text-slate-500 font-medium">
                    {v.stt ?? startIndex + i + 1}
                  </td>
                  <td className="px-3.5 py-2.5 text-center text-slate-600 whitespace-nowrap font-medium">
                    {v.ngay_xuat}
                  </td>
                  <td
                    className={`px-3.5 py-2.5 text-slate-700 font-medium whitespace-nowrap sticky left-0 z-10 min-w-[200px] shadow-[3px_0_6px_rgba(0,0,0,0.06)] transition-colors ${
                      i % 2 === 0 ? 'bg-white group-hover:bg-slate-50' : 'bg-[#f8fafc] group-hover:bg-slate-50'
                    }`}
                  >
                    {v.du_an || 'DA-HN-01 / Trụ sở VP Apex'}
                  </td>
                  <td className="px-3.5 py-2.5 whitespace-nowrap">
                    <span className={`inline-block border px-2 py-0.5 rounded text-[11px] font-semibold ${getNhomHangBadgeClass(v.nhom_hang)}`}>
                      {v.nhom_hang}
                    </span>
                  </td>
                  <td className="px-3.5 py-2.5 font-mono font-bold text-slate-700 whitespace-nowrap">
                    {v.ma_hang}
                  </td>
                  <td className="px-3.5 py-2.5 font-semibold text-slate-800 whitespace-nowrap">
                    {v.ten_hang}
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-600 whitespace-nowrap">
                    {v.thong_so}
                  </td>
                  <td className="px-3 py-2.5 text-center text-slate-600">
                    {v.dvt}
                  </td>
                  <td className="px-3.5 py-2.5 font-semibold text-slate-700 text-right">
                    {v.so_luong.toLocaleString()}
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-600 text-right">
                    {v.don_gia_xuat_kho.toLocaleString()}đ
                  </td>
                  <td className="px-3.5 py-2.5 font-bold text-[#406c89] text-right whitespace-nowrap">
                    {v.thanh_tien.toLocaleString()}đ
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-700 whitespace-nowrap">
                    {v.phong_ban}
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-700 font-medium whitespace-nowrap">
                    {v.nhan_su}
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-500 whitespace-nowrap">
                    {v.ghi_chu}
                  </td>
                  <td
                    className={`px-3 py-2.5 text-center whitespace-nowrap sticky right-0 z-10 min-w-[80px] w-20 shadow-[-3px_0_6px_rgba(0,0,0,0.06)] transition-colors ${
                      i % 2 === 0 ? 'bg-white group-hover:bg-slate-50' : 'bg-[#f8fafc] group-hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(v);
                        }}
                        className="p-1 text-[#406c89] hover:bg-[#406c89]/10 rounded transition-colors cursor-pointer"
                        title="Sửa"
                      >
                        <IconPencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(v);
                        }}
                        className="p-1 text-[#406c89] hover:bg-[#406c89]/10 rounded transition-colors cursor-pointer"
                        title="Xóa"
                      >
                        <IconTrash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Table Footer & Pagination ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-200 bg-slate-50/80 text-xs text-slate-600 gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <span>
            Hiển thị{' '}
            <strong className="text-slate-800">
              {filtered.length === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + pageSize, filtered.length)}
            </strong>{' '}
            trên <strong className="text-slate-800">{filtered.length}</strong> bản ghi
          </span>
          {filtered.length > 0 && (
            <span className="text-slate-300">|</span>
          )}
          {filtered.length > 0 && (
            <span>
              Tổng số lượng (tất cả các trang):{' '}
              <strong className="text-slate-800 font-bold">{totalSoLuong.toLocaleString()}</strong>
            </span>
          )}
          {filtered.length > 0 && (
            <span className="text-slate-300">|</span>
          )}
          {filtered.length > 0 && (
            <span>
              Tổng tiền xuất (tất cả các trang):{' '}
              <strong className="text-[#406c89] font-bold">{totalThanhTien.toLocaleString()}đ</strong>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage <= 1}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            title="Trang trước"
          >
            <IconChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
            .reduce((acc: (number | string)[], p, i, arr) => {
              if (i > 0 && p - (arr[i - 1] as number) > 1) {
                acc.push('...');
              }
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === '...' ? (
                <span key={`dots-${i}`} className="px-1.5 text-xs text-slate-400 select-none">
                  ...
                </span>
              ) : (
                <button
                  key={`page-${p}`}
                  type="button"
                  onClick={() => setCurrentPage(p as number)}
                  className={`min-w-[26px] h-6 px-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    currentPage === p
                      ? 'bg-[#406c89] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {p}
                </button>
              )
            )}

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage >= totalPages}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            title="Trang sau"
          >
            <IconChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
