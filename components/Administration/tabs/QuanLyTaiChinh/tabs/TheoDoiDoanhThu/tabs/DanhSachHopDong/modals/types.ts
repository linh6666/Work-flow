export interface NewHopDongForm {
  soHD: string;
  subHD: string;
  namTheoDoi: string;
  tenCongTrinh: string;
  tenKH: string;
  maKH: string;
  kichThuoc: string;
  tyLe: string;
  tongGTHD: string;
  gtPhatSinh: string;
  dtNamCu: string;
  phanLoaiDuAn: string;
  doanhThuThang: string[]; // T1..T12
  ghiChu: string;
}

export const DEFAULT_NEW_FORM: NewHopDongForm = {
  soHD: '',
  subHD: 'HĐ-MHV',
  namTheoDoi: new Date().getFullYear().toString(),
  tenCongTrinh: '',
  tenKH: '',
  maKH: '',
  kichThuoc: '',
  tyLe: '',
  tongGTHD: '',
  gtPhatSinh: '',
  dtNamCu: '',
  phanLoaiDuAn: 'Khác',
  doanhThuThang: Array(12).fill(''),
  ghiChu: '',
};
