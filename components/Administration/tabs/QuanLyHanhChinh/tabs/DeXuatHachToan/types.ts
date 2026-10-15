export interface DeXuatHachToanItem {
  id: string;
  // Các trường hiển thị trong bảng
  soDeXuat: string;          // SỐ ĐỀ XUẤT (VD: 41-2026/ĐXDC-HC)
  dienGiai: string;          // DIỄN GIẢI
  soMuc: number | string;    // SỐ MỤC
  tongTien: string;          // TỔNG TIỀN (VD: 4.000.000 đ)
  trangThaiDuyet: string;    // TRẠNG THÁI DUYỆT (VD: Chờ PGĐ duyệt, PGĐ đã duyệt, Chờ QL KD duyệt)
  soHT: string;              // SỐ HT (VD: + Lập hạch toán, 40-2026/HT-HC)
  tongTienHT: string;        // TỔNG TIỀN HT
  trangThaiHT: string;       // TRẠNG THÁI HT

  // Các trường thời gian & phân loại
  thang: string;             // Tháng 10
  nam: number;               // 2026
  loai: string[];            // ['Đề xuất duyệt chi', 'Hạch toán']
  soBanGhi: number;
  [key: string]: any;
}
