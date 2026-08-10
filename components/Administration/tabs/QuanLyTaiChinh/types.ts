export type LoaiGiaoDich = 'Thu' | 'Chi';

export type DanhMuc =
  | 'Thu hợp đồng'
  | 'Thu báo giá'
  | 'Thu khác'
  | 'Chi vật liệu'
  | 'Chi nhân công'
  | 'Chi vận chuyển'
  | 'Chi lắp đặt'
  | 'Chi khác';

export type TrangThaiThanhToan = 'Đã thanh toán' | 'Chờ thanh toán' | 'Quá hạn';

export interface GiaoDichItem {
  id: string;
  loai: LoaiGiaoDich;
  danhMuc: DanhMuc;
  tenGiaoDich: string;
  soTien: number; // VNĐ
  ngay: string; // YYYY-MM-DD
  duAn?: string;
  trangThai: TrangThaiThanhToan;
  ghiChu?: string;
}

export const DEFAULT_DATA: GiaoDichItem[] = [
  {
    id: 'gd-1',
    loai: 'Thu',
    danhMuc: 'Thu hợp đồng',
    tenGiaoDich: 'Đợt 1 - VSIP LẠNG SƠN',
    soTien: 320_000_000,
    ngay: '2026-07-10',
    duAn: 'VSIP LẠNG SƠN',
    trangThai: 'Đã thanh toán',
  },
  {
    id: 'gd-2',
    loai: 'Thu',
    danhMuc: 'Thu hợp đồng',
    tenGiaoDich: 'Đợt 1 - 22 LIỄU GIAI',
    soTien: 450_000_000,
    ngay: '2026-06-20',
    duAn: '22 LIỄU GIAI',
    trangThai: 'Đã thanh toán',
  },
  {
    id: 'gd-3',
    loai: 'Thu',
    danhMuc: 'Thu hợp đồng',
    tenGiaoDich: 'Đợt 2 - THE HERITAGE TÂY NINH',
    soTien: 580_000_000,
    ngay: '2026-07-15',
    duAn: 'THE HERITAGE TÂY NINH',
    trangThai: 'Chờ thanh toán',
  },
  {
    id: 'gd-4',
    loai: 'Thu',
    danhMuc: 'Thu hợp đồng',
    tenGiaoDich: 'Đợt 1 - FLAMINGO ĐÔNG ANH',
    soTien: 210_000_000,
    ngay: '2026-07-01',
    duAn: 'FLAMINGO ĐÔNG ANH',
    trangThai: 'Quá hạn',
  },
  {
    id: 'gd-5',
    loai: 'Thu',
    danhMuc: 'Thu khác',
    tenGiaoDich: 'Phí tư vấn thiết kế',
    soTien: 15_000_000,
    ngay: '2026-07-18',
    trangThai: 'Đã thanh toán',
    ghiChu: 'Khách lẻ',
  },
  {
    id: 'gd-6',
    loai: 'Chi',
    danhMuc: 'Chi vật liệu',
    tenGiaoDich: 'Mua vật liệu mô hình tháng 7',
    soTien: 85_000_000,
    ngay: '2026-07-05',
    trangThai: 'Đã thanh toán',
    ghiChu: 'NCC Minh Đức',
  },
  {
    id: 'gd-7',
    loai: 'Chi',
    danhMuc: 'Chi nhân công',
    tenGiaoDich: 'Lương tháng 7 - Phòng Mộc Sơn',
    soTien: 120_000_000,
    ngay: '2026-07-31',
    trangThai: 'Chờ thanh toán',
  },
  {
    id: 'gd-8',
    loai: 'Chi',
    danhMuc: 'Chi vận chuyển',
    tenGiaoDich: 'Vận chuyển mô hình VSIP Lạng Sơn',
    soTien: 18_500_000,
    ngay: '2026-07-12',
    duAn: 'VSIP LẠNG SƠN',
    trangThai: 'Đã thanh toán',
  },
  {
    id: 'gd-9',
    loai: 'Chi',
    danhMuc: 'Chi lắp đặt',
    tenGiaoDich: 'Chi phí lắp đặt - 22 LIỄU GIAI',
    soTien: 35_000_000,
    ngay: '2026-07-20',
    duAn: '22 LIỄU GIAI',
    trangThai: 'Đã thanh toán',
  },
  {
    id: 'gd-10',
    loai: 'Chi',
    danhMuc: 'Chi khác',
    tenGiaoDich: 'Chi phí văn phòng tháng 7',
    soTien: 12_000_000,
    ngay: '2026-07-03',
    trangThai: 'Đã thanh toán',
  },
];

export const formatCurrency = (amount: number) => {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(2)} Tỷ`;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
  return amount.toLocaleString('vi-VN') + 'đ';
};

export const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  return dateStr;
};
