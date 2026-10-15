"use client";

import React, { useState, useMemo } from 'react';

export interface ChiTietNVLRow {
  stt: number;
  maNVL: string;
  nhomHang: string;
  tenNVL: string;
  thongSo: string;
  donVi: string;
  tongSLDeXuat: number;
  slXuat?: number;
  slSuDung?: string;
  donGia?: number;
  thanhTien?: number;
  phongDeXuat: string[];
  soThang: number;
}

interface ChiTietMaNVLProps {
  selectedYear?: string;
  selectedMonth?: string;
}

const DATA_CHI_TIET_143: ChiTietNVLRow[] = [
  {
    stt: 1,
    maNVL: 'VAL-26201',
    nhomHang: 'ACRYLICOS VALLEJO',
    tenNVL: 'Màu vẽ transparent water -26201',
    thongSo: '200ml',
    donVi: 'Lọ',
    tongSLDeXuat: 4,
    slXuat: 20,
    slSuDung: '—',
    donGia: 290103,
    thanhTien: 1160412,
    phongDeXuat: ['Ghép'],
    soThang: 2,
  },
  {
    stt: 2,
    maNVL: 'BD-TRONG...',
    nhomHang: 'Chất kết dính',
    tenNVL: 'Băng dính 2 mặt 5cm',
    thongSo: '—',
    donVi: 'Cuộn',
    tongSLDeXuat: 2,
    slXuat: 20,
    slSuDung: '—',
    donGia: 14000,
    thanhTien: 28000,
    phongDeXuat: ['Điện'],
    soThang: 2,
  },
  {
    stt: 3,
    maNVL: 'BD-GIAY 2',
    nhomHang: 'Chất kết dính',
    tenNVL: 'Băng dính giấy 2cm',
    thongSo: '—',
    donVi: 'Cuộn',
    tongSLDeXuat: 390,
    slXuat: 2595,
    slSuDung: '—',
    donGia: 3000,
    thanhTien: 1170000,
    phongDeXuat: ['Điện', 'Mộc Sơn', 'Cắt', 'Ghép'],
    soThang: 2,
  },
  {
    stt: 4,
    maNVL: 'KEO_502',
    nhomHang: 'Chất kết dính',
    tenNVL: 'Keo 502',
    thongSo: '150ml',
    donVi: 'Lọ',
    tongSLDeXuat: 18,
    slXuat: 125,
    slSuDung: '—',
    donGia: 27754,
    thanhTien: 499572,
    phongDeXuat: ['Điện', 'Ghép'],
    soThang: 2,
  },
  {
    stt: 5,
    maNVL: 'KEO_BUG...',
    nhomHang: 'Chất kết dính',
    tenNVL: 'Keo Bugjo',
    thongSo: '15kg/thùng',
    donVi: 'kg',
    tongSLDeXuat: 18,
    slXuat: 240,
    slSuDung: '—',
    donGia: 86400,
    thanhTien: 1555200,
    phongDeXuat: ['Ghép'],
    soThang: 2,
  },
  {
    stt: 6,
    maNVL: 'EPOXY A50',
    nhomHang: 'Chất kết dính',
    tenNVL: 'Keo Epoxy A50',
    thongSo: '—',
    donVi: 'kg',
    tongSLDeXuat: 120,
    slXuat: undefined,
    slSuDung: '—',
    donGia: 210600,
    thanhTien: 25272000,
    phongDeXuat: ['Ghép'],
    soThang: 2,
  },
  {
    stt: 7,
    maNVL: 'KEO_MICA',
    nhomHang: 'Chất kết dính',
    tenNVL: 'Keo Mica (CH2CL2)',
    thongSo: '0.5l/lọ',
    donVi: 'Lọ',
    tongSLDeXuat: 10,
    slXuat: 35,
    slSuDung: '—',
    donGia: 85000,
    thanhTien: 850000,
    phongDeXuat: ['Ghép'],
    soThang: 2,
  },
  {
    stt: 8,
    maNVL: 'KEO_SUA',
    nhomHang: 'Chất kết dính',
    tenNVL: 'Keo sữa dyno P115A',
    thongSo: '1kg/túi',
    donVi: 'kg',
    tongSLDeXuat: 30,
    slXuat: 208,
    slSuDung: '—',
    donGia: 40504,
    thanhTien: 1215120,
    phongDeXuat: ['Cảnh Quan'],
    soThang: 2,
  },
  {
    stt: 9,
    maNVL: 'UHU-53625',
    nhomHang: 'Chất kết dính',
    tenNVL: 'Keo UHU All purpose 5kg 53625',
    thongSo: '5kg/thùng',
    donVi: 'kg',
    tongSLDeXuat: 10,
    slXuat: 10,
    slSuDung: '—',
    donGia: 240000,
    thanhTien: 2400000,
    phongDeXuat: ['Ghép'],
    soThang: 2,
  },
  {
    stt: 10,
    maNVL: 'BA 2TP',
    nhomHang: 'Chất phụ gia',
    tenNVL: 'Bả 2 thành phần Mastic 380',
    thongSo: '—',
    donVi: 'kg',
    tongSLDeXuat: 8,
    slXuat: 9,
    slSuDung: '—',
    donGia: 60000,
    thanhTien: 480000,
    phongDeXuat: ['Ghép'],
    soThang: 2,
  },
  {
    stt: 11,
    maNVL: 'CUNG 404K',
    nhomHang: 'Chất phụ gia',
    tenNVL: 'Cứng 2K 404',
    thongSo: '—',
    donVi: 'Hộp',
    tongSLDeXuat: 2,
    slXuat: 5,
    slSuDung: '—',
    donGia: 95000,
    thanhTien: 190000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 12,
    maNVL: 'KEO_AB',
    nhomHang: 'Chất phụ gia',
    tenNVL: 'Keo dán gỗ 2 thành phần AB',
    thongSo: '1 cặp 2 lọ, mỗi lọ 1kg',
    donVi: 'kg',
    tongSLDeXuat: 4,
    slXuat: 16,
    slSuDung: '—',
    donGia: 308000,
    thanhTien: 1232000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 13,
    maNVL: 'NO 100',
    nhomHang: 'Chất phụ gia',
    tenNVL: 'Phủ mờ 100',
    thongSo: '—',
    donVi: 'kg',
    tongSLDeXuat: 2,
    slXuat: 9,
    slSuDung: '—',
    donGia: 90000,
    thanhTien: 180000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 14,
    maNVL: 'XANG BUT...',
    nhomHang: 'Chất phụ gia',
    tenNVL: 'Xăng butin',
    thongSo: '—',
    donVi: 'Lít',
    tongSLDeXuat: 194,
    slXuat: 1620,
    slSuDung: '—',
    donGia: 40000,
    thanhTien: 7760000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 15,
    maNVL: '3M 5N11',
    nhomHang: 'Công cụ dụng cụ',
    tenNVL: 'Bông lọc 3M 5N11',
    thongSo: '—',
    donVi: 'Cái / chiếc',
    tongSLDeXuat: 32,
    slXuat: 68,
    slSuDung: '—',
    donGia: 16000,
    thanhTien: 512000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 16,
    maNVL: 'CC-DAUNO...',
    nhomHang: 'Công cụ dụng cụ',
    tenNVL: 'Đầu nối hơi 10 ly',
    thongSo: '10 ly',
    donVi: 'Cái / chiếc',
    tongSLDeXuat: 8,
    slXuat: undefined,
    slSuDung: '—',
    donGia: 30800,
    thanhTien: 246400,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 17,
    maNVL: 'CC_GHIM...',
    nhomHang: 'Công cụ dụng cụ',
    tenNVL: 'Ghim 10/6',
    thongSo: '—',
    donVi: 'Hộp',
    tongSLDeXuat: 4,
    slXuat: 14,
    slSuDung: '—',
    donGia: 30000,
    thanhTien: 120000,
    phongDeXuat: ['Điện'],
    soThang: 2,
  },
  {
    stt: 18,
    maNVL: 'CC_NHO M...',
    nhomHang: 'Công cụ dụng cụ',
    tenNVL: 'Lọ nhỏ mắt',
    thongSo: '—',
    donVi: 'Lọ',
    tongSLDeXuat: 46,
    slXuat: 154,
    slSuDung: '—',
    donGia: 2000,
    thanhTien: 92000,
    phongDeXuat: ['Cảnh Quan', 'Ghép'],
    soThang: 2,
  },
  {
    stt: 19,
    maNVL: 'CC_LUOI...',
    nhomHang: 'Công cụ dụng cụ',
    tenNVL: 'Lưỡi dao trổ nhỏ SDI',
    thongSo: '—',
    donVi: 'Vỉ',
    tongSLDeXuat: 38,
    slXuat: 232,
    slSuDung: '—',
    donGia: 26000,
    thanhTien: 988000,
    phongDeXuat: ['Mộc Sơn', 'Ghép'],
    soThang: 2,
  },
  {
    stt: 20,
    maNVL: 'MAT-NA-3M',
    nhomHang: 'Công cụ dụng cụ',
    tenNVL: 'Mặt nạ 3M 6200-6001',
    thongSo: 'Dây đeo mặt nạ',
    donVi: 'Cái/chiếc',
    tongSLDeXuat: 4,
    slXuat: 1,
    slSuDung: '—',
    donGia: 864000,
    thanhTien: 3456000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 21,
    maNVL: 'GIA-80',
    nhomHang: 'Giấy',
    tenNVL: 'Giấy bìa vàng làm cỏ DL80',
    thongSo: '750 * 1100mm',
    donVi: 'Tấm',
    tongSLDeXuat: 100,
    slXuat: 732,
    slSuDung: '—',
    donGia: 5000,
    thanhTien: 500000,
    phongDeXuat: ['Cảnh Quan'],
    soThang: 2,
  },
  {
    stt: 22,
    maNVL: 'S_MDF-12',
    nhomHang: 'Gỗ',
    tenNVL: 'Gỗ MDF 12mm xanh chống ẩm',
    thongSo: '1220x2440 x12mm',
    donVi: 'Tấm',
    tongSLDeXuat: 16,
    slXuat: 178,
    slSuDung: '—',
    donGia: 333615,
    thanhTien: 5337840,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 23,
    maNVL: 'S_MDF-5.5',
    nhomHang: 'Gỗ',
    tenNVL: 'Gỗ MDF 5.5mm xanh chống ẩm',
    thongSo: '1220x2440 x5.5mm',
    donVi: 'Tấm',
    tongSLDeXuat: 6,
    slXuat: 35,
    slSuDung: '—',
    donGia: 165135,
    thanhTien: 990810,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 24,
    maNVL: 'S_MDF-3',
    nhomHang: 'Gỗ',
    tenNVL: 'Gỗ MDF thường 3mm',
    thongSo: '1220x2440 x3mm',
    donVi: 'Tấm',
    tongSLDeXuat: 4,
    slXuat: 30,
    slSuDung: '—',
    donGia: 89100,
    thanhTien: 356400,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 25,
    maNVL: 'LED_0603V',
    nhomHang: 'Hệ thống ánh sáng',
    tenNVL: 'Bóng led 0603 vàng',
    thongSo: '—',
    donVi: 'Bóng',
    tongSLDeXuat: 1000,
    slXuat: 11050,
    slSuDung: '—',
    donGia: 300,
    thanhTien: 300000,
    phongDeXuat: ['Điện'],
    soThang: 2,
  },
  {
    stt: 26,
    maNVL: 'MC_000-2',
    nhomHang: 'Mica',
    tenNVL: 'Mica trong 2mm',
    thongSo: '1220x2440mm',
    donVi: 'Tấm',
    tongSLDeXuat: 8,
    slXuat: 24,
    slSuDung: '—',
    donGia: 680000,
    thanhTien: 5440000,
    phongDeXuat: ['Cắt', 'Ghép'],
    soThang: 2,
  },
  {
    stt: 27,
    maNVL: 'MC_402-2',
    nhomHang: 'Mica',
    tenNVL: 'Mica trắng sứ 2mm',
    thongSo: '1220x2440mm',
    donVi: 'Tấm',
    tongSLDeXuat: 4,
    slXuat: 12,
    slSuDung: '—',
    donGia: 757000,
    thanhTien: 3028000,
    phongDeXuat: ['Cắt'],
    soThang: 2,
  },
  {
    stt: 28,
    maNVL: 'CON 90',
    nhomHang: 'Nhựa in 3D',
    tenNVL: 'Cồn 90 độ vệ sinh resin',
    thongSo: '30L/ Can',
    donVi: 'Lít',
    tongSLDeXuat: 30,
    slXuat: 30,
    slSuDung: '—',
    donGia: 30240,
    thanhTien: 907200,
    phongDeXuat: ['Khai triển'],
    soThang: 2,
  },
  {
    stt: 29,
    maNVL: 'RIGID 110-T',
    nhomHang: 'Nhựa in 3D',
    tenNVL: 'Nhựa in 3D Resin Rigid 110-Trans',
    thongSo: '1000g',
    donVi: 'g',
    tongSLDeXuat: 1000,
    slXuat: 2000,
    slSuDung: '—',
    donGia: 850,
    thanhTien: 850000,
    phongDeXuat: ['Khai triển'],
    soThang: 2,
  },

  // ── Nhóm hàng: Phụ liệu ngành mộc & Sắt & Sơn (tương ứng đoạn cuối 122 - 143) ──
  {
    stt: 122,
    maNVL: 'VTP-BTIN',
    nhomHang: '—',
    tenNVL: 'Xăng Butin',
    thongSo: '—',
    donVi: 'Lít',
    tongSLDeXuat: 8,
    slXuat: undefined,
    slSuDung: '—',
    donGia: undefined,
    thanhTien: undefined,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 123,
    maNVL: 'BULONG 8...',
    nhomHang: 'Phụ liệu ngành mộc',
    tenNVL: 'Bulong M8x80',
    thongSo: 'M8x80',
    donVi: 'Cái',
    tongSLDeXuat: 40,
    slXuat: 130,
    slSuDung: '—',
    donGia: 4320,
    thanhTien: 172800,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 124,
    maNVL: 'PLM-NAM...',
    nhomHang: 'Phụ liệu ngành mộc',
    tenNVL: 'Nam châm hít',
    thongSo: '—',
    donVi: 'Cái',
    tongSLDeXuat: 4,
    slXuat: 4,
    slSuDung: '—',
    donGia: 11800,
    thanhTien: 47200,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 125,
    maNVL: 'PLM_QUEH...',
    nhomHang: 'Phụ liệu ngành mộc',
    tenNVL: 'Que hàn sắt',
    thongSo: '—',
    donVi: 'Hộp',
    tongSLDeXuat: 1,
    slXuat: 2,
    slSuDung: '—',
    donGia: 99000,
    thanhTien: 99000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 126,
    maNVL: 'VIT_ST_3',
    nhomHang: 'Phụ liệu ngành mộc',
    tenNVL: 'Vít bắt sắt 3F',
    thongSo: '3cm',
    donVi: 'kg',
    tongSLDeXuat: 2,
    slXuat: 8,
    slSuDung: '—',
    donGia: 55000,
    thanhTien: 110000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 127,
    maNVL: 'VIT_ST_4',
    nhomHang: 'Phụ liệu ngành mộc',
    tenNVL: 'Vít bắt sắt 4F',
    thongSo: '4cm',
    donVi: 'kg',
    tongSLDeXuat: 1,
    slXuat: 2,
    slSuDung: '—',
    donGia: 55000,
    thanhTien: 55000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 128,
    maNVL: 'VIT_GV_1',
    nhomHang: 'Phụ liệu ngành mộc',
    tenNVL: 'Vít gỗ vàng 1F',
    thongSo: '1cm',
    donVi: 'kg',
    tongSLDeXuat: 1,
    slXuat: undefined,
    slSuDung: '—',
    donGia: 55000,
    thanhTien: 55000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 129,
    maNVL: 'VIT_GV_2',
    nhomHang: 'Phụ liệu ngành mộc',
    tenNVL: 'Vít gỗ vàng 2F',
    thongSo: '2cm',
    donVi: 'kg',
    tongSLDeXuat: 1,
    slXuat: undefined,
    slSuDung: '—',
    donGia: 55000,
    thanhTien: 55000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 130,
    maNVL: 'VIT_GV_3',
    nhomHang: 'Phụ liệu ngành mộc',
    tenNVL: 'Vít gỗ vàng 3F',
    thongSo: '3cm',
    donVi: 'kg',
    tongSLDeXuat: 0.6,
    slXuat: 1,
    slSuDung: '—',
    donGia: 55000,
    thanhTien: 33000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 131,
    maNVL: 'VIT_GV_4',
    nhomHang: 'Phụ liệu ngành mộc',
    tenNVL: 'Vít gỗ vàng 4F (8*1/2)',
    thongSo: '4cm',
    donVi: 'kg',
    tongSLDeXuat: 0.6,
    slXuat: 1,
    slSuDung: '—',
    donGia: 55000,
    thanhTien: 33000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 132,
    maNVL: 'THEP_20x...',
    nhomHang: 'Sắt',
    tenNVL: 'Thép hộp 20x40x1.1mm',
    thongSo: '6000m',
    donVi: 'Thanh',
    tongSLDeXuat: 4,
    slXuat: 70,
    slSuDung: '—',
    donGia: 168000,
    thanhTien: 672000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 133,
    maNVL: 'SON_AXP1...',
    nhomHang: 'Sơn',
    tenNVL: 'Sơn AXP 1070 cánh gián',
    thongSo: '850ml',
    donVi: 'Lon',
    tongSLDeXuat: 2,
    slXuat: 2,
    slSuDung: '—',
    donGia: 155000,
    thanhTien: 310000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 134,
    maNVL: 'SON HP G...',
    nhomHang: 'Sơn',
    tenNVL: 'Sơn chống gỉ HP ghi',
    thongSo: '3kg/thùng',
    donVi: 'kg',
    tongSLDeXuat: 2,
    slXuat: undefined,
    slSuDung: '—',
    donGia: 96667,
    thanhTien: 193334,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 135,
    maNVL: 'SON_TOA_...',
    nhomHang: 'Sơn',
    tenNVL: 'Sơn toa 881 vàng',
    thongSo: '850ml',
    donVi: 'Lon',
    tongSLDeXuat: 18,
    slXuat: 125,
    slSuDung: '—',
    donGia: 175000,
    thanhTien: 3150000,
    phongDeXuat: ['Mộc Sơn', 'Cảnh Quan'],
    soThang: 2,
  },
  {
    stt: 136,
    maNVL: 'SON_TOA_...',
    nhomHang: 'Sơn',
    tenNVL: 'Sơn toa 885 đỏ',
    thongSo: '850ml',
    donVi: 'Lon',
    tongSLDeXuat: 4,
    slXuat: 2,
    slSuDung: '—',
    donGia: 135000,
    thanhTien: 540000,
    phongDeXuat: ['Mộc Sơn', 'Cảnh Quan'],
    soThang: 2,
  },
  {
    stt: 137,
    maNVL: 'SON_TOA_...',
    nhomHang: 'Sơn',
    tenNVL: 'Sơn toa 911 trắng mờ',
    thongSo: '850ml',
    donVi: 'Lon',
    tongSLDeXuat: 36,
    slXuat: 336,
    slSuDung: '—',
    donGia: 120000,
    thanhTien: 4320000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 138,
    maNVL: 'SON_TOA_...',
    nhomHang: 'Sơn',
    tenNVL: 'Sơn toa 999 đen',
    thongSo: '850ml',
    donVi: 'Lon',
    tongSLDeXuat: 12,
    slXuat: 92,
    slSuDung: '—',
    donGia: 155000,
    thanhTien: 1860000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 139,
    maNVL: 'XIT_ATM_...',
    nhomHang: 'Sơn',
    tenNVL: 'Sơn xịt A10',
    thongSo: '—',
    donVi: 'Lọ',
    tongSLDeXuat: 2,
    slXuat: 18,
    slSuDung: '—',
    donGia: 35000,
    thanhTien: 70000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 140,
    maNVL: 'XIT_ATM_...',
    nhomHang: 'Sơn',
    tenNVL: 'Sơn xịt A100',
    thongSo: '—',
    donVi: 'Lọ',
    tongSLDeXuat: 2,
    slXuat: 17,
    slSuDung: '—',
    donGia: 35000,
    thanhTien: 70000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 141,
    maNVL: 'XIT_ATM_...',
    nhomHang: 'Sơn',
    tenNVL: 'Sơn xịt A228',
    thongSo: '—',
    donVi: 'Lọ',
    tongSLDeXuat: 2,
    slXuat: 10,
    slSuDung: '—',
    donGia: 40000,
    thanhTien: 80000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 142,
    maNVL: 'XIT_ATM_...',
    nhomHang: 'Sơn',
    tenNVL: 'Sơn xịt A400',
    thongSo: '—',
    donVi: 'Lọ',
    tongSLDeXuat: 2,
    slXuat: 6,
    slSuDung: '—',
    donGia: 40000,
    thanhTien: 80000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
  {
    stt: 143,
    maNVL: 'TEM MHV',
    nhomHang: 'Tem thương hiệu',
    tenNVL: 'Tất ăn mòn Mô hình Việt',
    thongSo: '—',
    donVi: 'Cái / chiếc',
    tongSLDeXuat: 10,
    slXuat: 12,
    slSuDung: '—',
    donGia: 22000,
    thanhTien: 220000,
    phongDeXuat: ['Mộc Sơn'],
    soThang: 2,
  },
];

export default function ChiTietMaNVL({
  selectedYear = '2026',
  selectedMonth = 'all',
}: ChiTietMaNVLProps) {
  const formatNumber = (num?: number) => {
    if (num === undefined || num === null) return '—';
    return num.toLocaleString('vi-VN');
  };

  const formatDecimal = (num: number) => {
    return num.toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2">
      <div className="flex-1 overflow-auto border border-slate-300 rounded-lg shadow-2xs max-h-[calc(92vh-220px)]">
        <table className="w-full border-collapse text-[11px]">
          {/* Table Header - Cố định sticky top */}
          <thead className="sticky top-0 z-20 shadow-xs">
            <tr className="bg-[#3d5a6c] text-white font-semibold">
              <th className="sticky top-0 bg-[#3d5a6c] px-2.5 py-2 w-10 text-center border-r border-slate-400/30 whitespace-nowrap">
                STT
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-2.5 py-2 w-24 text-left border-r border-slate-400/30 whitespace-nowrap">
                Mã NVL
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-3 py-2 w-32 text-left border-r border-slate-400/30 whitespace-nowrap">
                Nhóm hàng
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-3 py-2 min-w-[200px] text-left border-r border-slate-400/30 whitespace-nowrap">
                Tên NVL
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-2.5 py-2 w-28 text-left border-r border-slate-400/30 whitespace-nowrap">
                Thông số
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-2.5 py-2 w-16 text-center border-r border-slate-400/30 whitespace-nowrap">
                Đơn vị
              </th>
              <th className="sticky top-0 bg-[#344e5e] px-2.5 py-2 w-20 text-center border-r border-slate-400/30 whitespace-nowrap">
                Tổng SL đề xuất
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-2.5 py-2 w-16 text-center border-r border-slate-400/30 whitespace-nowrap">
                SL Xuất
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-2.5 py-2 w-16 text-center border-r border-slate-400/30 whitespace-nowrap">
                SL Sử dụng
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-3 py-2 w-20 text-right border-r border-slate-400/30 whitespace-nowrap">
                Đơn giá
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-3 py-2 w-24 text-right border-r border-slate-400/30 whitespace-nowrap">
                Thành tiền
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-3 py-2 min-w-[140px] text-left border-r border-slate-400/30 whitespace-nowrap">
                Phòng đề xuất
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-2.5 py-2 w-14 text-center whitespace-nowrap">
                Số tháng
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200 bg-white">
            {DATA_CHI_TIET_143.map((row) => (
              <tr key={row.stt} className="hover:bg-slate-50/70 transition-colors">
                {/* STT */}
                <td className="px-2.5 py-1 text-center text-slate-500 border-r border-slate-200">
                  {row.stt}
                </td>

                {/* Mã NVL */}
                <td className="px-2.5 py-1 font-semibold text-slate-800 uppercase border-r border-slate-200 whitespace-nowrap">
                  {row.maNVL}
                </td>

                {/* Nhóm hàng */}
                <td className="px-3 py-1 text-slate-600 border-r border-slate-200 whitespace-nowrap">
                  {row.nhomHang}
                </td>

                {/* Tên NVL */}
                <td className="px-3 py-1 text-slate-700 border-r border-slate-200">
                  {row.tenNVL}
                </td>

                {/* Thông số */}
                <td className="px-2.5 py-1 text-slate-500 border-r border-slate-200 whitespace-nowrap">
                  {row.thongSo}
                </td>

                {/* Đơn vị */}
                <td className="px-2.5 py-1 text-center text-slate-600 border-r border-slate-200 whitespace-nowrap">
                  {row.donVi}
                </td>

                {/* Tổng SL đề xuất */}
                <td className="px-2.5 py-1 text-center font-bold text-slate-800 border-r border-slate-200 bg-slate-50/50">
                  {formatDecimal(row.tongSLDeXuat)}
                </td>

                {/* SL Xuất */}
                <td className="px-2.5 py-1 text-center font-medium text-indigo-600 border-r border-slate-200">
                  {row.slXuat !== undefined ? formatNumber(row.slXuat) : '—'}
                </td>

                {/* SL Sử dụng */}
                <td className="px-2.5 py-1 text-center text-slate-400 border-r border-slate-200">
                  {row.slSuDung || '—'}
                </td>

                {/* Đơn giá */}
                <td className="px-3 py-1 text-right text-slate-700 border-r border-slate-200 whitespace-nowrap">
                  {row.donGia !== undefined ? formatNumber(row.donGia) : '—'}
                </td>

                {/* Thành tiền */}
                <td className="px-3 py-1 text-right font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">
                  {row.thanhTien !== undefined ? formatNumber(row.thanhTien) : '—'}
                </td>

                {/* Phòng đề xuất (Badges) */}
                <td className="px-2.5 py-1 border-r border-slate-200">
                  <div className="flex flex-wrap gap-1">
                    {row.phongDeXuat.map((p, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Số tháng */}
                <td className="px-2.5 py-1 text-center text-slate-600">
                  {row.soThang}
                </td>
              </tr>
            ))}
          </tbody>

          {/* Table Footer - Cố định sticky bottom */}
          <tfoot className="sticky bottom-0 z-20 shadow-md">
            <tr className="bg-[#3d5a6c] text-white font-bold text-xs">
              <td
                colSpan={6}
                className="sticky bottom-0 bg-[#3d5a6c] px-4 py-2.5 text-left uppercase tracking-wider border-r border-slate-400/30 whitespace-nowrap"
              >
                TỔNG CỘNG (143 mã NVL)
              </td>
              <td className="sticky bottom-0 bg-[#344e5e] px-2.5 py-2.5 text-center border-r border-slate-400/30 whitespace-nowrap">
                7.506,4
              </td>
              <td className="sticky bottom-0 bg-[#3d5a6c] px-2.5 py-2.5 text-center border-r border-slate-400/30 text-[#93c5fd] whitespace-nowrap">
                44.887
              </td>
              <td className="sticky bottom-0 bg-[#3d5a6c] px-2.5 py-2.5 text-center border-r border-slate-400/30 text-[#94a3b8] whitespace-nowrap">
                0
              </td>
              <td className="sticky bottom-0 bg-[#3d5a6c] px-3 py-2.5 text-right border-r border-slate-400/30 whitespace-nowrap">
                {/* Empty */}
              </td>
              <td className="sticky bottom-0 bg-[#344e5e] px-3 py-2.5 text-right whitespace-nowrap">
                135.715.408
              </td>
              <td colSpan={2} className="sticky bottom-0 bg-[#3d5a6c] px-3 py-2.5"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Note caption */}
      <p className="text-[11px] text-slate-500 leading-relaxed shrink-0">
        Bảng chi tiết đầy đủ các mã NVL được đề xuất trong năm {selectedYear}, gộp từ toàn bộ đề xuất của 7 phòng ban Khối Kỹ thuật. Sắp xếp theo thứ tự abc tên Nhóm hàng, trong từng nhóm xếp abc tên NVL. "SL Xuất" lấy từ phiếu xuất kho thực tế. "SL Sử dụng" lấy từ hạch toán NVL đã được QL KD duyệt. Chọn "Tất cả các tháng" để xem tổng cả năm, hoặc chọn tháng cụ thể để lọc.
      </p>
    </div>
  );
}
