export interface YearlyPlanRow {
  id: string;
  nam: string;
  nguoiLap: string;
  ngayLap: string;
  viTriTuyenDung: number;
  tongChiPhi: string;
  trangThai: string;
  moTa?: string;
  chiTietCacViTri?: {
    phongBan: string;
    chucDanh: string;
    soLuong: number;
    duToan: string;
    thoiGianCan: string;
    lyDo: string;
  }[];
}
