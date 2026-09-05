"use client";

import React, { useRef, useState } from 'react';
import { IconPencil, IconTrash } from '@tabler/icons-react';

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
];

interface NhapKhoProps {
  search?: string;
  nhom?: string;
}

export default function NhapKho({ search = '', nhom = 'Tất cả nhóm hàng' }: NhapKhoProps) {
  const [items, setItems] = useState<NhapKhoItem[]>(mockNhapKho);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

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

  const handleDelete = (maHang: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa vật tư "${maHang}"?`)) {
      setItems((prev) => prev.filter((item) => item.ma_hang !== maHang));
    }
  };

  const handleEdit = (item: NhapKhoItem) => {
    alert(`Chỉnh sửa thông tin vật tư: ${item.ten_hang} (${item.ma_hang})`);
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

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
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
          <thead className="bg-[#406c89] text-white sticky top-0 z-10 shadow-sm">
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
              <th className="text-center px-3 py-2.5 font-bold whitespace-nowrap sticky right-0 bg-[#406c89] z-20 shadow-[-3px_0_6px_rgba(0,0,0,0.12)]">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={20} className="px-4 py-8 text-center text-slate-400">
                  Không tìm thấy dữ liệu nhập kho phù hợp
                </td>
              </tr>
            ) : (
              filtered.map((v, i) => (
                <tr
                  key={`${v.ma_hang}-${i}`}
                  className={`border-b border-slate-100 hover:bg-slate-50/80 transition-colors ${
                    i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                  }`}
                >
                  <td className="px-3 py-2.5 text-center text-slate-500 font-medium">
                    {v.stt ?? i + 1}
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
                          handleEdit(v);
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
                          handleDelete(v.ma_hang);
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
    </div>
  );
}
