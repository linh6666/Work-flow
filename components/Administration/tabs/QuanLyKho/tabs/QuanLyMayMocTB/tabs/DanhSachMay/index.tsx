"use client";

import React, { useState, useRef } from 'react';
import {
  IconSearch,
  IconChartBar,
  IconUpload,
  IconDownload,
  IconPlus,
  IconArrowsSort,
  IconEdit,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import ModalSua from './ModalSua';
import ModalXoa from './ModalXoa';
import ModalThem from './ModalThem';

export interface PhongBanMayItem {
  id: string;
  ten_phong: string;
  so_may: number;
  gia_tri: string;
}

export interface MayMocChiTietItem {
  id: string;
  stt: number;
  phong_ban: string;
  phong_ban_quan_ly: string;
  nam_nhap: number;
  ngay_nhap: string;
  ma_may: string;
  ten_may: string;
  thong_so_ky_thuat: string;
  don_vi_tinh: string;
  sl_nhap: number;
  don_gia: number;
  thanh_tien_nhap: number;
  tinh_trang_khi_nhap: string;
  thong_tin_ncc: string;
}

export const mockPhongBanMay: PhongBanMayItem[] = [
  { id: '1', ten_phong: 'Phòng ban quản lý', so_may: 1, gia_tri: '0 đ' },
  { id: '2', ten_phong: 'Phòng cảnh quan', so_may: 11, gia_tri: '264 đ' },
  { id: '3', ten_phong: 'Phòng cắt', so_may: 8, gia_tri: '0 đ' },
  { id: '4', ten_phong: 'Phòng điện', so_may: 7, gia_tri: '2.032 đ' },
  { id: '5', ten_phong: 'Phòng ghép', so_may: 3, gia_tri: '503 đ' },
  { id: '6', ten_phong: 'Phòng khai triển', so_may: 1, gia_tri: '0 đ' },
  { id: '7', ten_phong: 'Phòng Khai triển', so_may: 7, gia_tri: '729 đ' },
  { id: '8', ten_phong: 'Phòng mộc', so_may: 7, gia_tri: '968,4 đ' },
  { id: '9', ten_phong: 'Phòng Mộc', so_may: 36, gia_tri: '567,84 đ' },
  { id: '10', ten_phong: 'Phòng sơn', so_may: 5, gia_tri: '0 đ' },
  { id: '11', ten_phong: 'Phòng Sơn', so_may: 1, gia_tri: '0 đ' },
];

export const mockDanhSachMayChiTiet: MayMocChiTietItem[] = [
  {
    id: '1',
    stt: 1,
    phong_ban: 'Phòng ban quản lý',
    phong_ban_quan_ly: 'Ban Giám Đốc',
    nam_nhap: 2024,
    ngay_nhap: '12/03/2024',
    ma_may: 'MM-QL-01',
    ten_may: 'Máy in laser đa năng Canon MF244dw',
    thong_so_ky_thuat: 'In/Scan/Copy, 27 tr/phút, Wifi, 2 mặt tự động',
    don_vi_tinh: 'Chiếc',
    sl_nhap: 1,
    don_gia: 6500000,
    thanh_tien_nhap: 6500000,
    tinh_trang_khi_nhap: 'Mới 100%',
    thong_tin_ncc: 'Công ty CP Đầu tư Thương mại Phúc Anh',
  },
  {
    id: '2',
    stt: 2,
    phong_ban: 'Phòng cảnh quan',
    phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2024,
    ngay_nhap: '15/05/2024',
    ma_may: 'MM-CQ-01',
    ten_may: 'Máy cắt cỏ cầm tay Honda GX35',
    thong_so_ky_thuat: 'Động cơ 4 thì, 1.3HP, dung tích 35.8cc',
    don_vi_tinh: 'Chiếc',
    sl_nhap: 2,
    don_gia: 5200000,
    thanh_tien_nhap: 10400000,
    tinh_trang_khi_nhap: 'Mới 100%',
    thong_tin_ncc: 'Công ty TNHH Thiết bị Nông nghiệp Miền Bắc',
  },
  {
    id: '3',
    stt: 3,
    phong_ban: 'Phòng cắt',
    phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2023,
    ngay_nhap: '20/11/2023',
    ma_may: 'MM-CAT-01',
    ten_may: 'Máy cắt CNC Router 4 đầu trục Z cao',
    thong_so_ky_thuat: 'Hành trình 1300x2500mm, công suất 4x4.5kW',
    don_vi_tinh: 'Hệ thống',
    sl_nhap: 1,
    don_gia: 145000000,
    thanh_tien_nhap: 145000000,
    tinh_trang_khi_nhap: 'Mới 100%',
    thong_tin_ncc: 'Công ty TNHH Cơ điện & Tự động hóa Tân Phát',
  },
  {
    id: '4',
    stt: 4,
    phong_ban: 'Phòng cắt',
    phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2023,
    ngay_nhap: '05/12/2023',
    ma_may: 'MM-CAT-02',
    ten_may: 'Máy cưa bàn trượt 2 lưỡi Altendorf F45',
    thong_so_ky_thuat: 'Bàn trượt 3200mm, nghiêng 0-45 độ, motor 5.5kW',
    don_vi_tinh: 'Chiếc',
    sl_nhap: 1,
    don_gia: 98000000,
    thanh_tien_nhap: 98000000,
    tinh_trang_khi_nhap: 'Mới 100%',
    thong_tin_ncc: 'Đại diện Altendorf CHLB Đức tại Việt Nam',
  },
  {
    id: '5',
    stt: 5,
    phong_ban: 'Phòng điện',
    phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2024,
    ngay_nhap: '18/01/2024',
    ma_may: 'MM-DIEN-01',
    ten_may: 'Máy nén khí trục vít Puma 20HP kèm bình chứa',
    thong_so_ky_thuat: 'Áp lực 8-10 bar, 2.3m3/phút, bình 500L',
    don_vi_tinh: 'Hệ thống',
    sl_nhap: 1,
    don_gia: 68000000,
    thanh_tien_nhap: 68000000,
    tinh_trang_khi_nhap: 'Mới 100%',
    thong_tin_ncc: 'Công ty TNHH Khí nén & Thiết bị Tân Á',
  },
  {
    id: '6',
    stt: 6,
    phong_ban: 'Phòng ghép',
    phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2023,
    ngay_nhap: '02/09/2023',
    ma_may: 'MM-GHEP-01',
    ten_may: 'Máy ghép gỗ cao tần tự động',
    thong_so_ky_thuat: 'Khổ ép 1200x2400mm, công suất phát 30kW',
    don_vi_tinh: 'Chiếc',
    sl_nhap: 1,
    don_gia: 210000000,
    thanh_tien_nhap: 210000000,
    tinh_trang_khi_nhap: 'Mới 100%',
    thong_tin_ncc: 'Công ty CP Kỹ thuật Gỗ Tân Đại Phát',
  },
  {
    id: '7',
    stt: 7,
    phong_ban: 'Phòng khai triển',
    phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2024,
    ngay_nhap: '10/02/2024',
    ma_may: 'MM-KT-01',
    ten_may: 'Máy in phun khổ lớn khổ A0 Canon IPF771',
    thong_so_ky_thuat: '5 màu mực, 2400x1200dpi, chuyên CAD/GIS',
    don_vi_tinh: 'Chiếc',
    sl_nhap: 1,
    don_gia: 32000000,
    thanh_tien_nhap: 32000000,
    tinh_trang_khi_nhap: 'Mới 100%',
    thong_tin_ncc: 'Công ty TNHH Thiết bị Văn phòng Nam Cường',
  },
  {
    id: '8',
    stt: 8,
    phong_ban: 'Phòng mộc',
    phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2023,
    ngay_nhap: '14/06/2023',
    ma_may: 'MM-MOC-01',
    ten_may: 'Máy dán cạnh tự động 6 chức năng KDT 650',
    thong_so_ky_thuat: 'Tốc độ 15-23m/phút, bo góc tròn, cạo keo',
    don_vi_tinh: 'Chiếc',
    sl_nhap: 1,
    don_gia: 165000000,
    thanh_tien_nhap: 165000000,
    tinh_trang_khi_nhap: 'Mới 100%',
    thong_tin_ncc: 'Tập đoàn Máy chế biến gỗ KDT',
  },
  {
    id: '9',
    stt: 9,
    phong_ban: 'Phòng mộc',
    phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2023,
    ngay_nhap: '22/07/2023',
    ma_may: 'MM-MOC-02',
    ten_may: 'Máy khoan ngang CNC laser định vị hồng ngoại',
    thong_so_ky_thuat: 'Tốc độ trục chính 4500v/p, cảm biến laser',
    don_vi_tinh: 'Chiếc',
    sl_nhap: 1,
    don_gia: 85000000,
    thanh_tien_nhap: 85000000,
    tinh_trang_khi_nhap: 'Mới 100%',
    thong_tin_ncc: 'Công ty TNHH Máy công nghiệp Đông Dương',
  },
  {
    id: '10',
    stt: 10,
    phong_ban: 'Phòng sơn',
    phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2023,
    ngay_nhap: '08/08/2023',
    ma_may: 'MM-SON-01',
    ten_may: 'Hệ thống buồng phun sơn màng nước 4 mét',
    thong_so_ky_thuat: '4000x1200x2200mm, 2 quạt hút 2.2kW, bơm 1.5kW',
    don_vi_tinh: 'Hệ thống',
    sl_nhap: 1,
    don_gia: 48000000,
    thanh_tien_nhap: 48000000,
    tinh_trang_khi_nhap: 'Mới 100%',
    thong_tin_ncc: 'Công ty TNHH Kỹ thuật Xử lý Môi trường Xanh',
  },
  // ── Phòng cảnh quan ──
  {
    id: '11', stt: 11, phong_ban: 'Phòng cảnh quan', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 0, ngay_nhap: '', ma_may: 'MM-KHOAN-MKT-653-CQ-01', ten_may: 'Máy khoan MKT 653 - 1',
    thong_so_ky_thuat: '', don_vi_tinh: 'Cái', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '12', stt: 12, phong_ban: 'Phòng cảnh quan', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 0, ngay_nhap: '', ma_may: 'MM-KHOAN-MKT-653-CQ-02', ten_may: 'Máy khoan MKT 653 - 2',
    thong_so_ky_thuat: '', don_vi_tinh: 'Cái', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '13', stt: 13, phong_ban: 'Phòng cảnh quan', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 0, ngay_nhap: '', ma_may: 'MM-HUT-BUI-PRX-CQ-01', ten_may: 'Máy hút bụi Proxxon - 1',
    thong_so_ky_thuat: '', don_vi_tinh: 'Cái', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '14', stt: 14, phong_ban: 'Phòng cảnh quan', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 0, ngay_nhap: '', ma_may: 'MM-HUT-BUI-PRX-CQ-02', ten_may: 'Máy hút bụi Proxxon - 2',
    thong_so_ky_thuat: '', don_vi_tinh: 'Cái', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '15', stt: 15, phong_ban: 'Phòng cảnh quan', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 0, ngay_nhap: '', ma_may: 'MM-XAY-MUT-CQ-01', ten_may: 'Máy xay mút - 1',
    thong_so_ky_thuat: '', don_vi_tinh: 'Cái', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '16', stt: 16, phong_ban: 'Phòng cảnh quan', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '01/02/2025', ma_may: 'MM-TICH-DIEN-2025-CQ-01', ten_may: 'Máy hút tích điện cò - 1',
    thong_so_ky_thuat: '', don_vi_tinh: 'Cái', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '17', stt: 17, phong_ban: 'Phòng cảnh quan', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 0, ngay_nhap: '', ma_may: 'MM-XAY-CO-01', ten_may: 'Máy xay cỏ - 1',
    thong_so_ky_thuat: '', don_vi_tinh: 'Cái', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '18', stt: 18, phong_ban: 'Phòng cảnh quan', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2024, ngay_nhap: '16/08/2024', ma_may: 'MM-KHOAN-M6501B-05-2024-CQ-03', ten_may: 'Máy khoan cầm tay M6501B-05',
    thong_so_ky_thuat: 'M6501B', don_vi_tinh: 'Cái', sl_nhap: 2, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '19', stt: 19, phong_ban: 'Phòng cảnh quan', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '03/03/2025', ma_may: 'MLC-JK 120', ten_may: 'Máy tích điện làm cỏ JK120',
    thong_so_ky_thuat: '150-250w', don_vi_tinh: 'Cái', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '20', stt: 20, phong_ban: 'Phòng cảnh quan', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '17/03/2025', ma_may: 'CC-SUNG NEN', ten_may: 'Súng keo nén to',
    thong_so_ky_thuat: '', don_vi_tinh: 'Cái', sl_nhap: 2, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '21', stt: 21, phong_ban: 'Phòng cảnh quan', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '10/07/2025', ma_may: 'MM-XAY MUT', ten_may: 'Máy xay gió 2kg + 1 lưỡi dao',
    thong_so_ky_thuat: 'Mô tơ: 1.1KW Lõi đồng (võ gang) Điện áp: 220V/50Hz tại Việt Nam Chất liệu: 100% Inox201 Công suất: 1kg - 2Kg/lần Dao: 03 cánh bằng thép tôi Kích thước: 19Kg x 50cm x 30cm x 30cm Xay gió chả, xúc xích, pate, cua cả, giềng sả tỏi ớt, gia vị...',
    don_vi_tinh: 'Cái', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  // ── Phòng cắt ──
  {
    id: '22', stt: 22, phong_ban: 'Phòng cắt', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2016, ngay_nhap: '', ma_may: 'MM-CM-1390-B-A-2016-CAT-03', ten_may: 'Máy Laser ST1390',
    thong_so_ky_thuat: 'Kích thước: 1300×900mm Công suất: 130-150W', don_vi_tinh: 'Máy', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '23', stt: 23, phong_ban: 'Phòng cắt', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2021, ngay_nhap: '', ma_may: 'MM-BABYLON-6040-2021-CAT-01', ten_may: 'Máy khắc laser 6040',
    thong_so_ky_thuat: 'Kích thước: 600×400mm', don_vi_tinh: 'Máy', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '24', stt: 24, phong_ban: 'Phòng cắt', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2021, ngay_nhap: '30/06/2021', ma_may: 'MM-GH 16000', ten_may: 'Máy lọc tĩnh điện GH 16000',
    thong_so_ky_thuat: 'Model: GH16000 • Lưu lượng gió: 16000m3/h • Kích thước máy: 2000×1200×1800mm • Chất liệu võ: Inox 304 • Công suất điện: 1.5kw • Số phim: 2 phim lọc tĩnh điện • Tủ điện điều khiển báo tín hiệu đèn • Ống thoát đầu lắp đầy thiết bị • Mặt bích kết nối phi 400 • Tỉ lệ làm sạch > 98% • Độ cản áp: 180PA • Bộ đốt môi inox 304: 3 bộ',
    don_vi_tinh: 'Máy', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '25', stt: 25, phong_ban: 'Phòng cắt', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2021, ngay_nhap: '', ma_may: 'MM-HUT MUI', ten_may: 'Máy hút mùi',
    thong_so_ky_thuat: '', don_vi_tinh: 'Máy', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '26', stt: 26, phong_ban: 'Phòng cắt', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2022, ngay_nhap: '04/06/2022', ma_may: 'MM-CMH1309-B-A-2022-CAT-04', ten_may: 'Máy cắt laser CMH1309-B-A-4',
    thong_so_ky_thuat: 'Kích thước: 1300×900mm', don_vi_tinh: 'Máy', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '27', stt: 27, phong_ban: 'Phòng cắt', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '22/09/2025', ma_may: 'MM-CHM-1610-B-A-2025-CAT-05', ten_may: 'Máy cắt laser 1610 B-A-5',
    thong_so_ky_thuat: '130W', don_vi_tinh: 'Máy', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '28', stt: 28, phong_ban: 'Phòng cắt', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '03/12/2025', ma_may: 'MM-CMH1309-B-A-2025-CAT-01', ten_may: 'Máy cắt laser CMH1309-B-A-1',
    thong_so_ky_thuat: 'Model: CMH1309-B-A', don_vi_tinh: 'Máy', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '29', stt: 29, phong_ban: 'Phòng cắt', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '03/12/2025', ma_may: 'MM-CMH1309-B-A-2025-CAT-02', ten_may: 'Máy cắt laser CMH1309-B-A-2',
    thong_so_ky_thuat: 'Model: CMH1309-B-A', don_vi_tinh: 'Máy', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  // ── Phòng điện ──
  {
    id: '30', stt: 30, phong_ban: 'Phòng điện', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2017, ngay_nhap: '', ma_may: 'CC-SUNG-BAN-GHIM-01', ten_may: 'Súng bắn ghim 16/6',
    thong_so_ky_thuat: 'Súng bắn ghim 16/6', don_vi_tinh: 'Cái', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '31', stt: 31, phong_ban: 'Phòng điện', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '18/04/2025', ma_may: 'CC-MO HAN-110W', ten_may: 'Mô hàn xung thông minh 110W - Bản tiêu chuẩn',
    thong_so_ky_thuat: 'Mỗi bộ Bao gồm: - Mô hàn xung thông minh 110W (WS-1110): 01 máy - Nguồn adaptor 142W + dây nguồn: 01 cái - Đầu hàn gia nhiệt không độ trễ - mũi Tù (T20): 02 cái - Mũi nhọn B20: 01 cái (Dùng chung với T20) - Mũi nhọn K20: 01 cái (Dùng chung với T20) - 4 vít - 1 lục giác',
    don_vi_tinh: 'Bộ', sl_nhap: 2, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '32', stt: 32, phong_ban: 'Phòng điện', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '10/08/2025', ma_may: 'MM-IN TEM PT E110', ten_may: 'Máy in nhãn cầm tay Brother P-touch PT E110',
    thong_so_ky_thuat: '- Phù hợp: Văn phòng - Tính năng: Đơn năng In - Tốc độ/Khổ giấy: 20mm/giây. 6-12mm - Độ phân giải: 180 dpi - Kết nối: Khác',
    don_vi_tinh: 'Cái', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '33', stt: 33, phong_ban: 'Phòng điện', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '10/08/2025', ma_may: 'CC-MO HAN DELI-01', ten_may: 'Mô hàn điện Deli',
    thong_so_ky_thuat: '90W', don_vi_tinh: 'Cái', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '34', stt: 34, phong_ban: 'Phòng điện', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '10/08/2025', ma_may: 'CC-KIM TUOT DELI', ten_may: 'Kim tuốt dây điện mỏ qua đa năng Deli',
    thong_so_ky_thuat: '', don_vi_tinh: 'Cái', sl_nhap: 2, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '35', stt: 35, phong_ban: 'Phòng điện', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '10/08/2025', ma_may: 'CC-SUNG GHIM', ten_may: 'Súng bắn ghim 16/6',
    thong_so_ky_thuat: '', don_vi_tinh: 'Cái', sl_nhap: 3, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '36', stt: 36, phong_ban: 'Phòng điện', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2026, ngay_nhap: '24/04/2026', ma_may: 'CC-MO HAN PRX-02', ten_may: 'Mô hàn điện Proxxon',
    thong_so_ky_thuat: '2 - 18V, 40W, 5,000 - 20,000rpm. Length 220mm. Weight 230g.',
    don_vi_tinh: 'Cái', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  // ── Phòng ghép ──
  {
    id: '37', stt: 37, phong_ban: 'Phòng ghép', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2018, ngay_nhap: '', ma_may: 'CC-SUNG GHIM 16-01', ten_may: 'Súng bắn ghim 16/6',
    thong_so_ky_thuat: '', don_vi_tinh: 'Cái', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '38', stt: 38, phong_ban: 'Phòng ghép', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '17/03/2025', ma_may: 'CC-SUNG GHIM 16-02', ten_may: 'Súng bắn ghim 16/6',
    thong_so_ky_thuat: '', don_vi_tinh: 'Cái', sl_nhap: 2, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '39', stt: 39, phong_ban: 'Phòng ghép', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 0, ngay_nhap: '', ma_may: 'MM-MAY-KHO', ten_may: 'Máy Thổi Hơi Nóng Makita HG5030K (1600W)',
    thong_so_ky_thuat: '', don_vi_tinh: 'Cái', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  // ── Phòng Khai triển ──
  {
    id: '40', stt: 40, phong_ban: 'Phòng Khai triển', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2015, ngay_nhap: '', ma_may: 'MM-IN3D 1-2015', ten_may: 'MÁY IN 3D - mý',
    thong_so_ky_thuat: '', don_vi_tinh: 'Máy', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '41', stt: 41, phong_ban: 'Phòng Khai triển', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2021, ngay_nhap: '10/09/2021', ma_may: 'MM-IN3D 1-2021', ten_may: 'Máy in 3D Anycubie Photon Mono SE',
    thong_so_ky_thuat: '', don_vi_tinh: 'Máy', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '42', stt: 42, phong_ban: 'Phòng Khai triển', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2022, ngay_nhap: '05/05/2022', ma_may: 'MM-IN3D 2-2022', ten_may: 'Máy in 3D Anycubie Photon M3 Max',
    thong_so_ky_thuat: 'Kích thước 59.6×40×40.8cm Công suất: 120w', don_vi_tinh: 'Máy', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '43', stt: 43, phong_ban: 'Phòng Khai triển', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2022, ngay_nhap: '05/05/2022', ma_may: 'MM-IN3D-3-2022', ten_may: 'Máy in 3D Anycubie Photon M3 Plus',
    thong_so_ky_thuat: 'Kích thước 47.5×36×29cm Công suất: 144w', don_vi_tinh: 'Máy', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '44', stt: 44, phong_ban: 'Phòng Khai triển', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '15/08/2025', ma_may: 'MM-IN 3D HALOT X1-16K', ten_may: 'Máy In 3D Resin HALOT-X1 16K',
    thong_so_ky_thuat: 'Máy in 3D có khả năng kết nối với máy tính, dùng để in các mô hình bằng nhựa, công nghệ in Resin, model: Halot-x1, Cs: 350W, kt in: 211.68×118.37×200mm, NSX: SHENZHEN CREALITY 3D TECHNOLOGY CO., LTD',
    don_vi_tinh: 'Chiếc', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '45', stt: 45, phong_ban: 'Phòng Khai triển', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '15/08/2025', ma_may: 'CC-IN 3D HALOT X1', ten_may: 'Thiết bị bơm máy in 3D Halot X1',
    thong_so_ky_thuat: 'Thiết bị bơm nhựa tự động, phụ kiện của máy in 3D resin Halotseries, mã 1003010114, NSX: SHENZHEN CREALITY 3D TECHNOLOGY CO., LTD',
    don_vi_tinh: 'Chiếc', sl_nhap: 1, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
  {
    id: '46', stt: 46, phong_ban: 'Phòng Khai triển', phong_ban_quan_ly: 'Phòng ban quản lý',
    nam_nhap: 2025, ngay_nhap: '15/08/2025', ma_may: 'NO-CODE-38', ten_may: 'fep máy m3 max',
    thong_so_ky_thuat: 'Tấm màng lót, một mặt đã gia công phủ lớp chống dính, chất liệu: nhựa NFEP dùng cho máy tạo hình nhựa 3D, kt: 0.127×210×290mm, NSX: Aorita New Material Technology (SuZhou)Co.,Ltd',
    don_vi_tinh: 'Chiếc', sl_nhap: 3, don_gia: 0, thanh_tien_nhap: 0,
    tinh_trang_khi_nhap: 'Mới 100%', thong_tin_ncc: '',
  },
];

export default function DanhSachMay() {
  const [machines, setMachines] = useState<MayMocChiTietItem[]>(mockDanhSachMayChiTiet);
  const [editingItem, setEditingItem] = useState<MayMocChiTietItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<MayMocChiTietItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedPhong, setSelectedPhong] = useState('all');
  const [sortKey, setSortKey] = useState<keyof MayMocChiTietItem | ''>('');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 15;

  // ── Xử lý kéo chuột để trượt ngang bảng (Drag-to-scroll) ──
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !scrollContainerRef.current) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('select')) return;

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

  const handleSort = (key: keyof MayMocChiTietItem) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  // Reset về trang 1 khi filter/sort thay đổi
  const handleSearch = (val: string) => { setSearch(val); setCurrentPage(1); };
  const handlePhong = (val: string) => { setSelectedPhong(val); setCurrentPage(1); };

  // Lọc phòng ban cho các thẻ tóm tắt
  const filteredPhong = mockPhongBanMay.filter((item) =>
    item.ten_phong.toLowerCase().includes(search.toLowerCase())
  );

  // Xử lý lưu sau khi chỉnh sửa
  const handleSaveEdit = (updatedItem: MayMocChiTietItem) => {
    setMachines((prev) =>
      prev.map((m) => (m.id === updatedItem.id ? updatedItem : m))
    );
  };

  // Xử lý xác nhận xóa
  const handleDeleteConfirm = (id: string) => {
    setMachines((prev) => prev.filter((m) => m.id !== id));
  };

  const handleCreate = (newItem: MayMocChiTietItem) => {
    setMachines((prev) => [...prev, newItem]);
    setIsCreateModalOpen(false);
  };

  // Lọc và sắp xếp dữ liệu bảng máy móc chi tiết
  const filteredMachines = machines
    .filter((m) => {
      const matchSearch =
        m.ma_may.toLowerCase().includes(search.toLowerCase()) ||
        m.ten_may.toLowerCase().includes(search.toLowerCase()) ||
        m.phong_ban.toLowerCase().includes(search.toLowerCase()) ||
        m.phong_ban_quan_ly.toLowerCase().includes(search.toLowerCase()) ||
        m.thong_tin_ncc.toLowerCase().includes(search.toLowerCase()) ||
        m.thong_so_ky_thuat.toLowerCase().includes(search.toLowerCase());

      const matchPhong =
        selectedPhong === 'all' ||
        m.phong_ban.toLowerCase() === selectedPhong.toLowerCase() ||
        m.phong_ban_quan_ly.toLowerCase() === selectedPhong.toLowerCase();

      return matchSearch && matchPhong;
    })
    .sort((a, b) => {
      if (!sortKey) return 0;
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB), 'vi')
        : String(valB).localeCompare(String(valA), 'vi');
    });

  // Phân trang
  const totalPages = Math.max(1, Math.ceil(filteredMachines.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pagedMachines = filteredMachines.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const renderSortTh = (
    label: string,
    key: keyof MayMocChiTietItem,
    align: 'left' | 'center' | 'right' = 'left',
    minWidth = '',
    stickyClass = ''
  ) => (
    <th
      onClick={() => handleSort(key)}
      className={`px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap select-none cursor-pointer hover:bg-white/10 transition-colors ${
        align === 'center'
          ? 'text-center'
          : align === 'right'
          ? 'text-right'
          : 'text-left'
      } ${minWidth} ${stickyClass}`}
    >
      <div
        className={`inline-flex items-center gap-1.5 w-full ${
          align === 'center'
            ? 'justify-center'
            : align === 'right'
            ? 'justify-end'
            : 'justify-between'
        }`}
      >
        <span>{label}</span>
        <IconArrowsSort
          size={12}
          className={`shrink-0 transition-opacity ${
            sortKey === key ? 'text-white opacity-100' : 'text-white/60 opacity-80'
          }`}
        />
      </div>
    </th>
  );

  return (
    <div className="flex-1 flex flex-col gap-2.5 overflow-hidden">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-3 shrink-0 flex-wrap">
        {/* Search & Filter */}
        <div className="flex items-center gap-2 flex-1 max-w-md">
          {/* Ô tìm kiếm */}
          <div className="relative flex-1">
            <IconSearch
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Tìm máy..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 text-slate-700 placeholder:text-slate-400"
            />
          </div>

          {/* Chọn phòng ban */}
          <select
            value={selectedPhong}
            onChange={(e) => handlePhong(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#406c89]/30 cursor-pointer font-medium"
          >
            <option value="all">Tất cả phòng ban</option>
            {Array.from(new Set(mockPhongBanMay.map((p) => p.ten_phong))).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Báo cáo */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium cursor-pointer shadow-xs"
          >
            <IconChartBar size={14} className="text-slate-600" />
            <span>Báo cáo</span>
          </button>

          {/* Import Excel */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium cursor-pointer shadow-xs"
          >
            <IconUpload size={14} className="text-slate-600" />
            <span>Import Excel</span>
          </button>

          {/* Xuất Excel */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium cursor-pointer shadow-xs"
          >
            <IconDownload size={14} className="text-slate-600" />
            <span>Xuất Excel</span>
          </button>

          {/* Thêm máy */}
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs bg-[#406c89] text-white rounded-lg hover:bg-[#355a75] transition-colors font-medium cursor-pointer shadow-xs"
          >
            <IconPlus size={14} />
            <span>Thêm máy</span>
          </button>
        </div>
      </div>

      {/* ── Danh sách phòng ban máy móc (2 dòng) ── */}
      <div className="shrink-0 overflow-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {filteredPhong.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                setSelectedPhong(selectedPhong === item.ten_phong ? 'all' : item.ten_phong)
              }
              className={`rounded-lg border px-3 py-1.5 flex flex-col justify-between transition-all cursor-pointer select-none ${
                selectedPhong === item.ten_phong
                  ? 'bg-[#406c89]/10 border-[#406c89] text-[#406c89] shadow-xs ring-1 ring-[#406c89]/20'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <h4
                className="text-xs font-semibold text-slate-800 truncate"
                title={item.ten_phong}
              >
                {item.ten_phong}
              </h4>
              <div className="flex items-center justify-between gap-1 mt-0.5">
                <span className="text-[11px] text-slate-400 font-normal">
                  {item.so_may} máy
                </span>
                <span className="text-xs font-bold text-[#406c89]">
                  {item.gia_tri}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bảng dữ liệu máy móc chi tiết (Header chuẩn theo hình ảnh) ── */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden min-h-0">
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`overflow-auto flex-1 cursor-grab active:cursor-grabbing no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? 'select-none cursor-grabbing' : ''
          }`}
          title="Nhấn giữ chuột để trượt ngang bảng"
        >
          <table className="w-full text-xs border-collapse">
            <thead className="bg-[#406c89] text-white sticky top-0 z-20 shadow-sm">
              <tr>
                {/* 1. STT */}
                <th className="text-center px-3 py-2.5 font-bold text-xs text-white border-r border-white/20 whitespace-nowrap w-12 min-w-[48px]">
                  STT
                </th>

                {/* 2. Phòng ban (Ghim cố định mép trái) */}
                {renderSortTh(
                  'Phòng ban',
                  'phong_ban',
                  'left',
                  'min-w-[150px]',
                  'sticky top-0 left-0 z-30 bg-[#406c89] shadow-[3px_0_6px_rgba(0,0,0,0.15)]'
                )}

                {/* 3. Phòng ban quản lý */}
                {renderSortTh('Phòng ban quản lý', 'phong_ban_quan_ly', 'left', 'min-w-[150px]')}

                {/* 4. Năm nhập */}
                {renderSortTh('Năm nhập', 'nam_nhap', 'center', 'min-w-[95px]')}

                {/* 5. Ngày nhập */}
                {renderSortTh('Ngày nhập', 'ngay_nhap', 'center', 'min-w-[100px]')}

                {/* 6. Mã máy */}
                {renderSortTh('Mã máy', 'ma_may', 'left', 'min-w-[110px]')}

                {/* 7. Tên máy */}
                {renderSortTh('Tên máy', 'ten_may', 'left', 'min-w-[180px]')}

                {/* 8. Thông số kĩ thuật */}
                {renderSortTh('Thông số kĩ thuật', 'thong_so_ky_thuat', 'left', 'min-w-[200px]')}

                {/* 9. Đơn vị tính */}
                {renderSortTh('Đơn vị tính', 'don_vi_tinh', 'center', 'min-w-[95px]')}

                {/* 10. SL nhập */}
                {renderSortTh('SL nhập', 'sl_nhap', 'right', 'min-w-[90px]')}

                {/* 11. Đơn giá */}
                {renderSortTh('Đơn giá', 'don_gia', 'right', 'min-w-[110px]')}

                {/* 12. Thành tiền nhập */}
                {renderSortTh('Thành tiền nhập', 'thanh_tien_nhap', 'right', 'min-w-[130px]')}

                {/* 13. Tình trạng khi nhập */}
                {renderSortTh('Tình trạng khi nhập', 'tinh_trang_khi_nhap', 'left', 'min-w-[140px]')}

                {/* 14. Thông tin NCC */}
                {renderSortTh('Thông tin NCC', 'thong_tin_ncc', 'left', 'min-w-[200px]')}

                {/* 15. Hành động (Ghim cố định ở mép phải) */}
                <th className="text-center px-3.5 py-2.5 font-bold text-xs text-white whitespace-nowrap sticky top-0 right-0 z-30 bg-[#406c89] shadow-[-3px_0_6px_rgba(0,0,0,0.15)] min-w-[90px] w-24">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {pagedMachines.length === 0 ? (
                <tr>
                  <td colSpan={15} className="text-center py-10 text-slate-400 italic">
                    Không tìm thấy máy móc phù hợp với bộ lọc
                  </td>
                </tr>
              ) : (
                pagedMachines.map((row, idx) => (
                  <tr
                    key={row.id}
                    className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* STT */}
                    <td className="px-3 py-2.5 text-center text-slate-500 font-medium border-r border-slate-100 whitespace-nowrap w-12 min-w-[48px]">
                      {(safePage - 1) * PAGE_SIZE + idx + 1}
                    </td>

                    {/* Phòng ban (Ghim cố định) */}
                    <td className="px-3.5 py-2.5 text-slate-800 font-medium border-r border-slate-200 whitespace-nowrap min-w-[150px] sticky left-0 z-10 bg-white group-hover:bg-slate-50 shadow-[3px_0_6px_rgba(0,0,0,0.06)]">
                      {row.phong_ban}
                    </td>

                    {/* Phòng ban quản lý */}
                    <td className="px-3.5 py-2.5 text-slate-600 border-r border-slate-100 whitespace-nowrap">
                      {row.phong_ban_quan_ly}
                    </td>

                    {/* Năm nhập */}
                    <td className="px-3 py-2.5 text-center text-slate-600 border-r border-slate-100 whitespace-nowrap">
                      {row.nam_nhap || ''}
                    </td>

                    {/* Ngày nhập */}
                    <td className="px-3 py-2.5 text-center text-slate-600 border-r border-slate-100 whitespace-nowrap">
                      {row.ngay_nhap}
                    </td>

                    {/* Mã máy */}
                    <td className="px-3.5 py-2.5 font-mono font-semibold text-[#406c89] hover:underline cursor-pointer border-r border-slate-100 whitespace-nowrap">
                      {row.ma_may}
                    </td>

                    {/* Tên máy */}
                    <td className="px-3.5 py-2.5 font-medium text-slate-800 border-r border-slate-100 whitespace-nowrap">
                      {row.ten_may}
                    </td>

                    {/* Thông số kĩ thuật */}
                    <td
                      className="px-3.5 py-2.5 text-slate-600 text-[11px] border-r border-slate-100 max-w-xs truncate"
                      title={row.thong_so_ky_thuat}
                    >
                      {row.thong_so_ky_thuat}
                    </td>

                    {/* Đơn vị tính */}
                    <td className="px-3 py-2.5 text-center text-slate-600 border-r border-slate-100 whitespace-nowrap">
                      {row.don_vi_tinh}
                    </td>

                    {/* SL nhập */}
                    <td className="px-3 py-2.5 text-right font-semibold text-slate-800 border-r border-slate-100 whitespace-nowrap">
                      {row.sl_nhap}
                    </td>

                    {/* Đơn giá */}
                    <td className="px-3 py-2.5 text-right text-slate-700 font-medium border-r border-slate-100 whitespace-nowrap">
                      {row.don_gia.toLocaleString('vi-VN')} đ
                    </td>

                    {/* Thành tiền nhập */}
                    <td className="px-3.5 py-2.5 text-right font-bold text-[#406c89] border-r border-slate-100 whitespace-nowrap">
                      {row.thanh_tien_nhap.toLocaleString('vi-VN')} đ
                    </td>

                    {/* Tình trạng khi nhập */}
                    <td className="px-3 py-2.5 border-r border-slate-100 whitespace-nowrap">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {row.tinh_trang_khi_nhap}
                      </span>
                    </td>

                    {/* Thông tin NCC */}
                    <td
                      className="px-3.5 py-2.5 text-slate-700 text-[11px] whitespace-nowrap truncate max-w-xs border-r border-slate-100"
                      title={row.thong_tin_ncc}
                    >
                      {row.thong_tin_ncc}
                    </td>

                    {/* Hành động (Ghim cố định ở mép phải) */}
                    <td className="px-3 py-2.5 text-center whitespace-nowrap sticky right-0 z-10 bg-white group-hover:bg-slate-50 shadow-[-3px_0_6px_rgba(0,0,0,0.06)] border-l border-slate-100">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingItem(row)}
                          title="Chỉnh sửa"
                          className="p-1.5 rounded text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                        >
                          <IconEdit size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingItem(row)}
                          title="Xóa"
                          className="p-1.5 rounded text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <IconTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
          <div>
            Hiển thị{' '}
            <span className="font-bold text-slate-700">
              {filteredMachines.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}
            </span>
            {' '}-{' '}
            <span className="font-bold text-slate-700">
              {Math.min(safePage * PAGE_SIZE, filteredMachines.length)}
            </span>
            {' '}trên tổng số{' '}
            <span className="font-bold text-slate-700">{filteredMachines.length}</span> máy móc
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                style={safePage === page ? { backgroundColor: '#406c89' } : {}}
                className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                  safePage === page
                    ? 'text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
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

      {/* Modal Sửa */}
      <ModalThem
        key={isCreateModalOpen ? 'create-open' : 'create-closed'}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreate}
      />

      <ModalSua
        isOpen={!!editingItem}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onSave={handleSaveEdit}
      />

      {/* Modal Xóa */}
      <ModalXoa
        isOpen={!!deletingItem}
        item={deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
