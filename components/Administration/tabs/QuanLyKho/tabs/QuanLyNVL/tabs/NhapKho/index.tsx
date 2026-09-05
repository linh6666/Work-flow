"use client";

import React, { useRef, useState, useEffect } from 'react';
import { IconPencil, IconTrash, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import SuaVatTuModal from './modal/SuaVatTu';
import XoaVatTuModal from './modal/XoaVatTu';

export interface NhapKhoItem {
  stt: number;
  ngay_nhap: string;
  nhom_hang: string;
  ma_hang: string;
  ten_hang: string;
  thong_so: string;
  dvt: string;
  so_luong: number;
  don_gia_nhap: number;
  chi_phi_van_chuyen: number;
  thue: number;
  don_gia_nhap_kho: number;
  thanh_tien: number;
  so_thanh_toan: number;
  chua_thanh_toan: number;
  tinh_trang_hh: string;
  ncc: string;
  lien_he_ncc: string;
  dia_chi_ncc: string;
  du_an?: string;
}

export const mockNhapKho: NhapKhoItem[] = [
  {
    stt: 1,
    ngay_nhap: '20/06/2026',
    nhom_hang: 'Gỗ công nghiệp',
    ma_hang: 'GG-MF-1.5MM',
    ten_hang: 'MDF thường 1.5mm',
    thong_so: '1.5mm',
    dvt: 'tấm',
    so_luong: 150,
    don_gia_nhap: 180_000,
    chi_phi_van_chuyen: 250_000,
    thue: 2_700_000,
    don_gia_nhap_kho: 199_667,
    thanh_tien: 29_950_000,
    so_thanh_toan: 29_950_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Gỗ An Cường',
    lien_he_ncc: '028 3862 5786',
    dia_chi_ncc: 'Bình Dương',
    du_an: 'DA-HN-01',
  },
  {
    stt: 2,
    ngay_nhap: '22/06/2026',
    nhom_hang: 'Gỗ công nghiệp',
    ma_hang: 'GG-MF-2.0MM',
    ten_hang: 'MDF chống ẩm 2.0mm',
    thong_so: '2.0mm',
    dvt: 'tấm',
    so_luong: 80,
    don_gia_nhap: 240_000,
    chi_phi_van_chuyen: 200_000,
    thue: 1_920_000,
    don_gia_nhap_kho: 266_500,
    thanh_tien: 21_320_000,
    so_thanh_toan: 15_000_000,
    chua_thanh_toan: 6_320_000,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Gỗ Minh Long',
    lien_he_ncc: '0988 123 456',
    dia_chi_ncc: 'Hà Nội',
    du_an: 'DA-HCM-02',
  },
  {
    stt: 3,
    ngay_nhap: '25/06/2026',
    nhom_hang: 'Kim loại',
    ma_hang: 'KL-TH-4040',
    ten_hang: 'Thép hộp mạ kẽm',
    thong_so: '40x40x1.4mm',
    dvt: 'cây',
    so_luong: 300,
    don_gia_nhap: 190_000,
    chi_phi_van_chuyen: 500_000,
    thue: 5_700_000,
    don_gia_nhap_kho: 210_667,
    thanh_tien: 63_200_000,
    so_thanh_toan: 63_200_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Thép Hoà Phát',
    lien_he_ncc: '024 3974 7751',
    dia_chi_ncc: 'Hưng Yên',
    du_an: 'DA-HN-01',
  },
  {
    stt: 4,
    ngay_nhap: '28/06/2026',
    nhom_hang: 'Kim loại',
    ma_hang: 'KL-NT-3.0MM',
    ten_hang: 'Nhôm tấm 3mm',
    thong_so: '3.0mm',
    dvt: 'tấm',
    so_luong: 40,
    don_gia_nhap: 400_000,
    chi_phi_van_chuyen: 300_000,
    thue: 1_600_000,
    don_gia_nhap_kho: 447_500,
    thanh_tien: 17_900_000,
    so_thanh_toan: 10_000_000,
    chua_thanh_toan: 7_900_000,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Nhôm Việt Pháp',
    lien_he_ncc: '0912 345 678',
    dia_chi_ncc: 'Đà Nẵng',
    du_an: 'DA-DN-03',
  },
  {
    stt: 5,
    ngay_nhap: '02/07/2026',
    nhom_hang: 'Sơn & hoá chất',
    ma_hang: 'HC-SE-XAM',
    ten_hang: 'Sơn epoxy xám',
    thong_so: 'Thùng 20kg',
    dvt: 'thùng',
    so_luong: 15,
    don_gia_nhap: 650_000,
    chi_phi_van_chuyen: 150_000,
    thue: 975_000,
    don_gia_nhap_kho: 725_000,
    thanh_tien: 10_875_000,
    so_thanh_toan: 10_875_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Sơn Bạch Tuyết',
    lien_he_ncc: '028 3855 0041',
    dia_chi_ncc: 'TP. Hồ Chí Minh',
    du_an: 'DA-HN-01',
  },
  {
    stt: 6,
    ngay_nhap: '05/07/2026',
    nhom_hang: 'Điện – điện tử',
    ma_hang: 'DD-CV-2.5',
    ten_hang: 'Dây điện đơn Cadivi',
    thong_so: 'Cu/PVC 1x2.5mm²',
    dvt: 'cuộn',
    so_luong: 25,
    don_gia_nhap: 150_000,
    chi_phi_van_chuyen: 100_000,
    thue: 375_000,
    don_gia_nhap_kho: 169_000,
    thanh_tien: 4_225_000,
    so_thanh_toan: 4_225_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Điện Cadivi',
    lien_he_ncc: '028 3829 9443',
    dia_chi_ncc: 'TP. Hồ Chí Minh',
    du_an: 'DA-HCM-02',
  },
  {
    stt: 7,
    ngay_nhap: '08/07/2026',
    nhom_hang: 'Gỗ công nghiệp',
    ma_hang: 'GG-HDF-12',
    ten_hang: 'Gỗ HDF siêu chống ẩm',
    thong_so: '12mm x 1220x2440',
    dvt: 'tấm',
    so_luong: 65,
    don_gia_nhap: 310_000,
    chi_phi_van_chuyen: 350_000,
    thue: 2_015_000,
    don_gia_nhap_kho: 346_385,
    thanh_tien: 22_515_000,
    so_thanh_toan: 22_515_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Gỗ An Cường',
    lien_he_ncc: '028 3862 5786',
    dia_chi_ncc: 'Bình Dương',
    du_an: 'DA-HN-01',
  },
  {
    stt: 8,
    ngay_nhap: '10/07/2026',
    nhom_hang: 'Gỗ công nghiệp',
    ma_hang: 'GG-MEL-VAN',
    ten_hang: 'Ván Melamine vân sồi',
    thong_so: '17mm phủ 2 mặt',
    dvt: 'tấm',
    so_luong: 90,
    don_gia_nhap: 285_000,
    chi_phi_van_chuyen: 400_000,
    thue: 2_565_000,
    don_gia_nhap_kho: 317_944,
    thanh_tien: 28_615_000,
    so_thanh_toan: 20_000_000,
    chua_thanh_toan: 8_615_000,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Gỗ Minh Long',
    lien_he_ncc: '0988 123 456',
    dia_chi_ncc: 'Hà Nội',
    du_an: 'DA-DN-03',
  },
  {
    stt: 9,
    ngay_nhap: '12/07/2026',
    nhom_hang: 'Gỗ công nghiệp',
    ma_hang: 'GG-PLY-18',
    ten_hang: 'Gỗ Plywood phủ phim',
    thong_so: '18mm x 1220x2440',
    dvt: 'tấm',
    so_luong: 120,
    don_gia_nhap: 340_000,
    chi_phi_van_chuyen: 600_000,
    thue: 4_080_000,
    don_gia_nhap_kho: 379_000,
    thanh_tien: 45_480_000,
    so_thanh_toan: 45_480_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Ván Ép Thuận Phát',
    lien_he_ncc: '0903 889 912',
    dia_chi_ncc: 'Đồng Nai',
    du_an: 'DA-HCM-02',
  },
  {
    stt: 10,
    ngay_nhap: '15/07/2026',
    nhom_hang: 'Gỗ công nghiệp',
    ma_hang: 'GG-VEN-XOAN',
    ten_hang: 'Veneer xoan đào tự nhiên',
    thong_so: '0.6mm dán cốt MDF',
    dvt: 'm²',
    so_luong: 220,
    don_gia_nhap: 95_000,
    chi_phi_van_chuyen: 150_000,
    thue: 2_090_000,
    don_gia_nhap_kho: 105_182,
    thanh_tien: 23_140_000,
    so_thanh_toan: 23_140_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Mộc Xinh Group',
    lien_he_ncc: '0918 776 231',
    dia_chi_ncc: 'Bắc Ninh',
    du_an: 'DA-HN-01',
  },
  {
    stt: 11,
    ngay_nhap: '18/07/2026',
    nhom_hang: 'Kim loại',
    ma_hang: 'KL-INX-304',
    ten_hang: 'Ống Inox 304 phi 25',
    thong_so: 'Phi 25 x 1.2mm x 6m',
    dvt: 'cây',
    so_luong: 160,
    don_gia_nhap: 225_000,
    chi_phi_van_chuyen: 320_000,
    thue: 3_600_000,
    don_gia_nhap_kho: 249_500,
    thanh_tien: 39_920_000,
    so_thanh_toan: 30_000_000,
    chua_thanh_toan: 9_920_000,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Inox Tiến Đạt',
    lien_he_ncc: '028 3750 8899',
    dia_chi_ncc: 'Long An',
    du_an: 'DA-HCM-02',
  },
  {
    stt: 12,
    ngay_nhap: '20/07/2026',
    nhom_hang: 'Kim loại',
    ma_hang: 'KL-TH-50100',
    ten_hang: 'Thép hộp 50x100 mạ kẽm',
    thong_so: '50x100 x 2.0mm x 6m',
    dvt: 'cây',
    so_luong: 180,
    don_gia_nhap: 410_000,
    chi_phi_van_chuyen: 700_000,
    thue: 7_380_000,
    don_gia_nhap_kho: 454_889,
    thanh_tien: 81_880_000,
    so_thanh_toan: 81_880_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Thép Hoà Phát',
    lien_he_ncc: '024 3974 7751',
    dia_chi_ncc: 'Hưng Yên',
    du_an: 'DA-HN-01',
  },
  {
    stt: 13,
    ngay_nhap: '23/07/2026',
    nhom_hang: 'Kim loại',
    ma_hang: 'KL-BL-M12',
    ten_hang: 'Bu lông neo mạ kẽm M12',
    thong_so: 'M12 x 300mm kèm tán',
    dvt: 'bộ',
    so_luong: 500,
    don_gia_nhap: 14_500,
    chi_phi_van_chuyen: 80_000,
    thue: 725_000,
    don_gia_nhap_kho: 16_110,
    thanh_tien: 8_055_000,
    so_thanh_toan: 8_055_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Kim khí Tân Cương',
    lien_he_ncc: '0975 321 654',
    dia_chi_ncc: 'Hà Nội',
    du_an: 'DA-HN-01',
  },
  {
    stt: 14,
    ngay_nhap: '25/07/2026',
    nhom_hang: 'Kim loại',
    ma_hang: 'KL-TON-045',
    ten_hang: 'Tôn mạ kẽm cuộn',
    thong_so: 'Dày 0.45mm khổ 1200',
    dvt: 'kg',
    so_luong: 1200,
    don_gia_nhap: 22_000,
    chi_phi_van_chuyen: 650_000,
    thue: 2_640_000,
    don_gia_nhap_kho: 24_742,
    thanh_tien: 29_690_000,
    so_thanh_toan: 25_000_000,
    chua_thanh_toan: 4_690_000,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Tôn Hoa Sen',
    lien_he_ncc: '028 3822 5588',
    dia_chi_ncc: 'Bình Dương',
    du_an: 'DA-HCM-02',
  },
  {
    stt: 15,
    ngay_nhap: '28/07/2026',
    nhom_hang: 'Kim loại',
    ma_hang: 'KL-BM-10MM',
    ten_hang: 'Bản mã thép 200x200',
    thong_so: '200x200x10mm đột lỗ',
    dvt: 'cái',
    so_luong: 250,
    don_gia_nhap: 75_000,
    chi_phi_van_chuyen: 250_000,
    thue: 1_875_000,
    don_gia_nhap_kho: 83_500,
    thanh_tien: 20_875_000,
    so_thanh_toan: 20_875_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Gia Công Cơ Khí Đức Long',
    lien_he_ncc: '0908 456 123',
    dia_chi_ncc: 'Hải Phòng',
    du_an: 'DA-HN-01',
  },
  {
    stt: 16,
    ngay_nhap: '30/07/2026',
    nhom_hang: 'Sơn & hoá chất',
    ma_hang: 'HC-TB-G2',
    ten_hang: 'Keo dán gỗ Titebond II',
    thong_so: 'Chai 1 Gallon (3.78L)',
    dvt: 'bình',
    so_luong: 30,
    don_gia_nhap: 480_000,
    chi_phi_van_chuyen: 120_000,
    thue: 1_440_000,
    don_gia_nhap_kho: 532_000,
    thanh_tien: 15_960_000,
    so_thanh_toan: 15_960_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Hoá Chất Phương Nam',
    lien_he_ncc: '0913 221 445',
    dia_chi_ncc: 'TP. Hồ Chí Minh',
    du_an: 'DA-HCM-02',
  },
  {
    stt: 17,
    ngay_nhap: '02/08/2026',
    nhom_hang: 'Sơn & hoá chất',
    ma_hang: 'HC-SIL-A500',
    ten_hang: 'Keo silicone Apollo A500',
    thong_so: 'Chai 300ml màu trắng',
    dvt: 'chai',
    so_luong: 200,
    don_gia_nhap: 52_000,
    chi_phi_van_chuyen: 100_000,
    thue: 1_040_000,
    don_gia_nhap_kho: 57_700,
    thanh_tien: 11_540_000,
    so_thanh_toan: 11_540_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Apollo Silicone VN',
    lien_he_ncc: '028 3930 2233',
    dia_chi_ncc: 'Bình Dương',
    du_an: 'DA-DN-03',
  },
  {
    stt: 18,
    ngay_nhap: '05/08/2026',
    nhom_hang: 'Sơn & hoá chất',
    ma_hang: 'HC-PU-BONG',
    ten_hang: 'Sơn bóng PU 2K gỗ cao cấp',
    thong_so: 'Bộ 16kg (Sơn + Đóng rắn)',
    dvt: 'bộ',
    so_luong: 20,
    don_gia_nhap: 850_000,
    chi_phi_van_chuyen: 180_000,
    thue: 1_700_000,
    don_gia_nhap_kho: 944_000,
    thanh_tien: 18_880_000,
    so_thanh_toan: 10_000_000,
    chua_thanh_toan: 8_880_000,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Sơn Đại Kiều',
    lien_he_ncc: '0944 657 890',
    dia_chi_ncc: 'Đồng Nai',
    du_an: 'DA-HCM-02',
  },
  {
    stt: 19,
    ngay_nhap: '08/08/2026',
    nhom_hang: 'Sơn & hoá chất',
    ma_hang: 'HC-TM-XANG',
    ten_hang: 'Dung môi Thinner pha sơn',
    thong_so: 'Phuy 200L chất lượng cao',
    dvt: 'phuy',
    so_luong: 4,
    don_gia_nhap: 5_200_000,
    chi_phi_van_chuyen: 400_000,
    thue: 2_080_000,
    don_gia_nhap_kho: 5_820_000,
    thanh_tien: 23_280_000,
    so_thanh_toan: 23_280_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Dung Môi Toàn Cầu',
    lien_he_ncc: '0902 114 336',
    dia_chi_ncc: 'Hưng Yên',
    du_an: 'DA-HN-01',
  },
  {
    stt: 20,
    ngay_nhap: '10/08/2026',
    nhom_hang: 'Sơn & hoá chất',
    ma_hang: 'HC-LT-CHONGI',
    ten_hang: 'Sơn lót chống rỉ đỏ',
    thong_so: 'Thùng 20L gốc Alkyd',
    dvt: 'thùng',
    so_luong: 18,
    don_gia_nhap: 720_000,
    chi_phi_van_chuyen: 160_000,
    thue: 1_296_000,
    don_gia_nhap_kho: 800_889,
    thanh_tien: 14_416_000,
    so_thanh_toan: 14_416_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Sơn Đại Bàng',
    lien_he_ncc: '024 3864 1234',
    dia_chi_ncc: 'Hà Nội',
    du_an: 'DA-HN-01',
  },
  {
    stt: 21,
    ngay_nhap: '12/08/2026',
    nhom_hang: 'Điện – điện tử',
    ma_hang: 'DD-CB-3P',
    ten_hang: 'Aptomat khối 3 pha 63A',
    thong_so: 'MCCB 3P 63A 18kA Panasonic',
    dvt: 'cái',
    so_luong: 12,
    don_gia_nhap: 920_000,
    chi_phi_van_chuyen: 60_000,
    thue: 1_104_000,
    don_gia_nhap_kho: 1_017_000,
    thanh_tien: 12_204_000,
    so_thanh_toan: 12_204_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Thiết Bị Điện Panasonic',
    lien_he_ncc: '028 3823 4567',
    dia_chi_ncc: 'TP. Hồ Chí Minh',
    du_an: 'DA-HCM-02',
  },
  {
    stt: 22,
    ngay_nhap: '15/08/2026',
    nhom_hang: 'Điện – điện tử',
    ma_hang: 'DD-LED-600',
    ten_hang: 'Đèn LED panel âm trần',
    thong_so: '600x600 48W Rạng Đông',
    dvt: 'bộ',
    so_luong: 80,
    don_gia_nhap: 215_000,
    chi_phi_van_chuyen: 200_000,
    thue: 1_720_000,
    don_gia_nhap_kho: 239_000,
    thanh_tien: 19_120_000,
    so_thanh_toan: 15_000_000,
    chua_thanh_toan: 4_120_000,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Rạng Đông Plaza',
    lien_he_ncc: '024 3858 4310',
    dia_chi_ncc: 'Hà Nội',
    du_an: 'DA-HN-01',
  },
  {
    stt: 23,
    ngay_nhap: '18/08/2026',
    nhom_hang: 'Điện – điện tử',
    ma_hang: 'DD-RG-D20',
    ten_hang: 'Ống luồn ruột gà lõi thép',
    thong_so: 'D20 bọc nhựa PVC (50m)',
    dvt: 'cuộn',
    so_luong: 30,
    don_gia_nhap: 380_000,
    chi_phi_van_chuyen: 150_000,
    thue: 1_140_000,
    don_gia_nhap_kho: 423_000,
    thanh_tien: 12_690_000,
    so_thanh_toan: 12_690_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Vật Tư Điện Nhật Phát',
    lien_he_ncc: '0936 887 112',
    dia_chi_ncc: 'Bắc Ninh',
    du_an: 'DA-HN-01',
  },
  {
    stt: 24,
    ngay_nhap: '20/08/2026',
    nhom_hang: 'Điện – điện tử',
    ma_hang: 'DD-OC-AM',
    ten_hang: 'Ổ cắm đôi 3 chấu âm tường',
    thong_so: 'Sino 16A có màng che',
    dvt: 'cái',
    so_luong: 150,
    don_gia_nhap: 48_000,
    chi_phi_van_chuyen: 70_000,
    thue: 720_000,
    don_gia_nhap_kho: 53_267,
    thanh_tien: 7_990_000,
    so_thanh_toan: 7_990_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Sino Electric',
    lien_he_ncc: '024 3789 0011',
    dia_chi_ncc: 'Hưng Yên',
    du_an: 'DA-DN-03',
  },
  {
    stt: 25,
    ngay_nhap: '22/08/2026',
    nhom_hang: 'Điện – điện tử',
    ma_hang: 'DD-CAT6-UTP',
    ten_hang: 'Cáp mạng Commscope Cat6',
    thong_so: 'Thùng 305m đồng nguyên chất',
    dvt: 'thùng',
    so_luong: 10,
    don_gia_nhap: 2_150_000,
    chi_phi_van_chuyen: 120_000,
    thue: 2_150_000,
    don_gia_nhap_kho: 2_377_000,
    thanh_tien: 23_770_000,
    so_thanh_toan: 20_000_000,
    chua_thanh_toan: 3_770_000,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Công Nghệ Mạng Á Châu',
    lien_he_ncc: '028 3920 1199',
    dia_chi_ncc: 'TP. Hồ Chí Minh',
    du_an: 'DA-HCM-02',
  },
  {
    stt: 26,
    ngay_nhap: '25/08/2026',
    nhom_hang: 'Gỗ & vật liệu xây dựng',
    ma_hang: 'VL-PVC-D90',
    ten_hang: 'Ống nhựa PVC D90',
    thong_so: 'D90 x 3.8mm x 4m Tiền Phong',
    dvt: 'cây',
    so_luong: 140,
    don_gia_nhap: 135_000,
    chi_phi_van_chuyen: 350_000,
    thue: 1_890_000,
    don_gia_nhap_kho: 151_000,
    thanh_tien: 21_140_000,
    so_thanh_toan: 21_140_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Nhựa Tiền Phong',
    lien_he_ncc: '0225 381 3979',
    dia_chi_ncc: 'Hải Phòng',
    du_an: 'DA-HN-01',
  },
  {
    stt: 27,
    ngay_nhap: '28/08/2026',
    nhom_hang: 'Gỗ & vật liệu xây dựng',
    ma_hang: 'VL-XM-HT',
    ten_hang: 'Xi măng Hà Tiên đa dụng',
    thong_so: 'Bao 50kg PCB40',
    dvt: 'bao',
    so_luong: 400,
    don_gia_nhap: 88_000,
    chi_phi_van_chuyen: 800_000,
    thue: 3_520_000,
    don_gia_nhap_kho: 98_800,
    thanh_tien: 39_520_000,
    so_thanh_toan: 39_520_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Xi Măng Hà Tiên',
    lien_he_ncc: '028 3822 5599',
    dia_chi_ncc: 'Kiên Giang',
    du_an: 'DA-HCM-02',
  },
  {
    stt: 28,
    ngay_nhap: '30/08/2026',
    nhom_hang: 'Gỗ & vật liệu xây dựng',
    ma_hang: 'VL-TC-CHONGAM',
    ten_hang: 'Tấm thạch cao Gyproc',
    thong_so: '9mm x 1220x2440 chống ẩm',
    dvt: 'tấm',
    so_luong: 180,
    don_gia_nhap: 165_000,
    chi_phi_van_chuyen: 450_000,
    thue: 2_970_000,
    don_gia_nhap_kho: 184_000,
    thanh_tien: 33_120_000,
    so_thanh_toan: 25_000_000,
    chua_thanh_toan: 8_120_000,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Saint-Gobain Việt Nam',
    lien_he_ncc: '028 3776 1888',
    dia_chi_ncc: 'Bình Dương',
    du_an: 'DA-DN-03',
  },
  {
    stt: 29,
    ngay_nhap: '02/09/2026',
    nhom_hang: 'Gỗ & vật liệu xây dựng',
    ma_hang: 'VL-GC-6060',
    ten_hang: 'Gạch granite Viglacera',
    thong_so: '600x600 bóng kính',
    dvt: 'hộp',
    so_luong: 110,
    don_gia_nhap: 210_000,
    chi_phi_van_chuyen: 500_000,
    thue: 2_310_000,
    don_gia_nhap_kho: 235_545,
    thanh_tien: 25_910_000,
    so_thanh_toan: 25_910_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Viglacera Ceramic',
    lien_he_ncc: '024 3553 6660',
    dia_chi_ncc: 'Bắc Ninh',
    du_an: 'DA-HN-01',
  },
  {
    stt: 30,
    ngay_nhap: '05/09/2026',
    nhom_hang: 'Gỗ & vật liệu xây dựng',
    ma_hang: 'VL-KN-8MM',
    ten_hang: 'Kính cường lực an toàn',
    thong_so: '8mm phôi Việt Nhật Hải Long',
    dvt: 'm²',
    so_luong: 75,
    don_gia_nhap: 450_000,
    chi_phi_van_chuyen: 600_000,
    thue: 3_375_000,
    don_gia_nhap_kho: 503_000,
    thanh_tien: 37_725_000,
    so_thanh_toan: 30_000_000,
    chua_thanh_toan: 7_725_000,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Kính Hải Long Glass',
    lien_he_ncc: '024 3827 1144',
    dia_chi_ncc: 'Hà Nội',
    du_an: 'DA-HN-01',
  },
  {
    stt: 31,
    ngay_nhap: '08/09/2026',
    nhom_hang: 'Gỗ công nghiệp',
    ma_hang: 'GG-MF-09',
    ten_hang: 'MDF Melamine trắng',
    thong_so: '9mm x 1220x2440',
    dvt: 'tấm',
    so_luong: 100,
    don_gia_nhap: 195_000,
    chi_phi_van_chuyen: 300_000,
    thue: 1_950_000,
    don_gia_nhap_kho: 217_500,
    thanh_tien: 21_750_000,
    so_thanh_toan: 21_750_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Gỗ Minh Long',
    lien_he_ncc: '0988 123 456',
    dia_chi_ncc: 'Hà Nội',
    du_an: 'DA-HN-01',
  },
  {
    stt: 32,
    ngay_nhap: '10/09/2026',
    nhom_hang: 'Kim loại',
    ma_hang: 'KL-LA-404',
    ten_hang: 'Thép la mạ kẽm 40x4',
    thong_so: '40x4mm x 6m nhúng kẽm',
    dvt: 'cây',
    so_luong: 220,
    don_gia_nhap: 82_000,
    chi_phi_van_chuyen: 280_000,
    thue: 1_804_000,
    don_gia_nhap_kho: 91_473,
    thanh_tien: 20_124_000,
    so_thanh_toan: 20_124_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Thép Hoà Phát',
    lien_he_ncc: '024 3974 7751',
    dia_chi_ncc: 'Hưng Yên',
    du_an: 'DA-HN-01',
  },
  {
    stt: 33,
    ngay_nhap: '12/09/2026',
    nhom_hang: 'Sơn & hoá chất',
    ma_hang: 'HC-BK-2P',
    ten_hang: 'Bột bả tường ngoài trời',
    thong_so: 'Bao 40kg chống thấm Kova',
    dvt: 'bao',
    so_luong: 85,
    don_gia_nhap: 210_000,
    chi_phi_van_chuyen: 250_000,
    thue: 1_785_000,
    don_gia_nhap_kho: 233_941,
    thanh_tien: 19_885_000,
    so_thanh_toan: 19_885_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Sơn Kova Trading',
    lien_he_ncc: '028 3716 5566',
    dia_chi_ncc: 'Đồng Nai',
    du_an: 'DA-HCM-02',
  },
  {
    stt: 34,
    ngay_nhap: '15/09/2026',
    nhom_hang: 'Điện – điện tử',
    ma_hang: 'DD-APT-1P',
    ten_hang: 'Aptomat tép 1 pha 20A',
    thong_so: 'MCB 1P 20A 6kA Schneider',
    dvt: 'cái',
    so_luong: 100,
    don_gia_nhap: 78_000,
    chi_phi_van_chuyen: 50_000,
    thue: 780_000,
    don_gia_nhap_kho: 86_300,
    thanh_tien: 8_630_000,
    so_thanh_toan: 8_630_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Schneider Electric VN',
    lien_he_ncc: '028 3829 0033',
    dia_chi_ncc: 'TP. Hồ Chí Minh',
    du_an: 'DA-HCM-02',
  },
  {
    stt: 35,
    ngay_nhap: '18/09/2026',
    nhom_hang: 'Gỗ & vật liệu xây dựng',
    ma_hang: 'VL-LUM-10',
    ten_hang: 'Lưới thép hàn D4',
    thong_so: 'D4 ô 100x100 cuộn 2x25m',
    dvt: 'cuộn',
    so_luong: 35,
    don_gia_nhap: 750_000,
    chi_phi_van_chuyen: 400_000,
    thue: 2_625_000,
    don_gia_nhap_kho: 836_429,
    thanh_tien: 29_275_000,
    so_thanh_toan: 20_000_000,
    chua_thanh_toan: 9_275_000,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Lưới Thép Hưng Thịnh',
    lien_he_ncc: '0978 223 998',
    dia_chi_ncc: 'Bình Dương',
    du_an: 'DA-HCM-02',
  },
  {
    stt: 36,
    ngay_nhap: '20/09/2026',
    nhom_hang: 'Khác',
    ma_hang: 'KH-GT-BAOHO',
    ten_hang: 'Găng tay bảo hộ lao động',
    thong_so: 'Phủ cao su chống trượt',
    dvt: 'đôi',
    so_luong: 300,
    don_gia_nhap: 12_000,
    chi_phi_van_chuyen: 50_000,
    thue: 360_000,
    don_gia_nhap_kho: 13_367,
    thanh_tien: 4_010_000,
    so_thanh_toan: 4_010_000,
    chua_thanh_toan: 0,
    tinh_trang_hh: 'Đạt chuẩn',
    ncc: 'Bảo Hộ Lao Động Việt An',
    lien_he_ncc: '0934 044 255',
    dia_chi_ncc: 'TP. Hồ Chí Minh',
    du_an: 'DA-HN-01',
  },
];

interface NhapKhoProps {
  search?: string;
  nhom?: string;
}

export default function NhapKho({ search = '', nhom = 'Tất cả nhóm hàng' }: NhapKhoProps) {
  const [items, setItems] = useState<NhapKhoItem[]>(mockNhapKho);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  // Tự động về trang 1 khi lọc hoặc tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [search, nhom]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !scrollContainerRef.current) return;
    dragInfo.current.isDown = true;
    dragInfo.current.startX = e.pageX - scrollContainerRef.current.offsetLeft;
    dragInfo.current.scrollLeft = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragInfo.current.isDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - dragInfo.current.startX) * 1.5;
    if (Math.abs(x - dragInfo.current.startX) > 3) {
      if (!isDragging) setIsDragging(true);
      scrollContainerRef.current.scrollLeft = dragInfo.current.scrollLeft - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    dragInfo.current.isDown = false;
    setIsDragging(false);
  };

  // Modal Sửa & Xóa
  const [selectedItemForEdit, setSelectedItemForEdit] = useState<NhapKhoItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedItemForDelete, setSelectedItemForDelete] = useState<NhapKhoItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenEditModal = (item: NhapKhoItem) => {
    setSelectedItemForEdit(item);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (item: NhapKhoItem) => {
    setSelectedItemForDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = (updatedItem: NhapKhoItem) => {
    setItems((prev) =>
      prev.map((it) => (it.ma_hang === updatedItem.ma_hang ? updatedItem : it))
    );
  };

  const handleConfirmDelete = (maHang: string) => {
    setItems((prev) => prev.filter((it) => it.ma_hang !== maHang));
  };

  const filtered = items.filter((row) => {
    const matchNhom = nhom === 'Tất cả nhóm hàng' || row.nhom_hang === nhom;
    const matchSearch =
      row.ma_hang.toLowerCase().includes(search.toLowerCase()) ||
      row.ten_hang.toLowerCase().includes(search.toLowerCase()) ||
      row.nhom_hang.toLowerCase().includes(search.toLowerCase()) ||
      row.thong_so.toLowerCase().includes(search.toLowerCase()) ||
      row.ncc.toLowerCase().includes(search.toLowerCase()) ||
      row.lien_he_ncc.toLowerCase().includes(search.toLowerCase()) ||
      row.dia_chi_ncc.toLowerCase().includes(search.toLowerCase()) ||
      row.tinh_trang_hh.toLowerCase().includes(search.toLowerCase()) ||
      (row.du_an && row.du_an.toLowerCase().includes(search.toLowerCase()));
    return matchNhom && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

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
        title="Nhấn giữ chuột để trượt xem hết dữ liệu"
      >
        <table className="w-full text-xs">
          <thead className="bg-[#406c89] text-white sticky top-0 z-20 shadow-sm">
            <tr>
              <th className="text-center px-3 py-2.5 font-bold whitespace-nowrap border-r border-white/20 w-12">
                STT
              </th>
              <th className="text-center px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Ngày nhập
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Nhóm hàng
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Mã hàng
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Tên hàng
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Thông số
              </th>
              <th className="text-center px-3 py-2.5 font-bold whitespace-nowrap border-r border-white/20 w-16">
                ĐVT
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Số lượng
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Đơn giá nhập
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Chi phí vận chuyển
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Thuế
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Đơn giá nhập kho
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Thành tiền
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Số thanh toán
              </th>
              <th className="text-right px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Chưa thanh toán
              </th>
              <th className="text-center px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Tình trạng HH
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Nhà cung cấp
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Thông tin liên hệ NCC
              </th>
              <th className="text-left px-3.5 py-2.5 font-bold whitespace-nowrap border-r border-white/20">
                Địa chỉ NCC
              </th>
              <th className="text-center px-3 py-2.5 font-bold whitespace-nowrap sticky top-0 right-0 bg-[#406c89] z-30 shadow-[-3px_0_6px_rgba(0,0,0,0.12)]">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={20} className="px-4 py-8 text-center text-slate-400">
                  Không tìm thấy dữ liệu nhập kho phù hợp
                </td>
              </tr>
            ) : (
              paginatedData.map((v, i) => (
                <tr
                  key={`${v.ma_hang}-${i}`}
                  className={`border-b border-slate-100 hover:bg-slate-50/80 transition-colors ${
                    i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                  }`}
                >
                  <td className="px-3 py-2.5 text-center text-slate-500 font-medium">
                    {v.stt ?? startIndex + i + 1}
                  </td>
                  <td className="px-3.5 py-2.5 text-center text-slate-600 whitespace-nowrap">
                    {v.ngay_nhap}
                  </td>
                  <td className="px-3.5 py-2.5 whitespace-nowrap">
                    <span className="inline-block bg-[#406c89]/10 text-[#406c89] px-2 py-0.5 rounded text-[11px] font-semibold">
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
                    {v.don_gia_nhap.toLocaleString()}đ
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-600 text-right">
                    {v.chi_phi_van_chuyen.toLocaleString()}đ
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-600 text-right">
                    {v.thue.toLocaleString()}đ
                  </td>
                  <td className="px-3.5 py-2.5 font-semibold text-slate-700 text-right">
                    {Math.round(v.don_gia_nhap_kho).toLocaleString()}đ
                  </td>
                  <td className="px-3.5 py-2.5 font-bold text-[#406c89] text-right">
                    {v.thanh_tien.toLocaleString()}đ
                  </td>
                  <td className="px-3.5 py-2.5 font-medium text-emerald-600 text-right">
                    {v.so_thanh_toan.toLocaleString()}đ
                  </td>
                  <td className="px-3.5 py-2.5 text-right font-medium">
                    {v.chua_thanh_toan > 0 ? (
                      <span className="text-red-500 font-semibold">{v.chua_thanh_toan.toLocaleString()}đ</span>
                    ) : (
                      <span className="text-slate-400">0đ</span>
                    )}
                  </td>
                  <td className="px-3.5 py-2.5 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                      ✓ {v.tinh_trang_hh}
                    </span>
                  </td>
                  <td className="px-3.5 py-2.5 font-medium text-slate-700 whitespace-nowrap">
                    {v.ncc}
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-500 whitespace-nowrap">
                    {v.lien_he_ncc}
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-500 whitespace-nowrap">
                    {v.dia_chi_ncc}
                  </td>
                  <td className={`px-3 py-2 text-center whitespace-nowrap sticky right-0 z-10 shadow-[-3px_0_6px_rgba(0,0,0,0.04)] border-l border-slate-100 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-[#fcfdfd]'
                  }`}>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditModal(v);
                        }}
                        className="p-1.5 text-slate-400 hover:text-[#406c89] hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                        title="Sửa"
                      >
                        <IconPencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDeleteModal(v);
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
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

      {/* ── Pagination Footer Bar ── */}
      <div className="border-t border-slate-200/80 px-4 py-2 bg-white flex items-center justify-between gap-3 flex-wrap shrink-0 select-none">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>
            Hiển thị <span className="font-semibold text-slate-700">{filtered.length > 0 ? startIndex + 1 : 0}</span> - <span className="font-semibold text-slate-700">{Math.min(startIndex + pageSize, filtered.length)}</span> trên tổng số <span className="font-semibold text-slate-700">{filtered.length}</span> vật tư
          </span>
          <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200">
            <span>Hiển thị</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-0.5 text-xs border border-slate-200 rounded bg-white text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer"
            >
              <option value={15}>15 / trang</option>
              <option value={20}>20 / trang</option>
              <option value={25}>25 / trang</option>
              <option value={50}>50 / trang</option>
              <option value={100}>100 / trang</option>
            </select>
          </div>
        </div>

        {/* Pagination Controls */}
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

          {Array.from({ length: totalPages }, (_, idx) => idx + 1)
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

      {/* ── Modal Sửa vật tư ── */}
      <SuaVatTuModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedItemForEdit(null);
        }}
        item={selectedItemForEdit}
        onSave={handleSaveEdit}
      />

      {/* ── Modal Xóa vật tư ── */}
      <XoaVatTuModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedItemForDelete(null);
        }}
        item={selectedItemForDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
