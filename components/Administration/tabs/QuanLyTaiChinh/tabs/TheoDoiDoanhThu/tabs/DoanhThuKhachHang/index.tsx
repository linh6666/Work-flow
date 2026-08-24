"use client";

import React, { useState } from 'react';
import {
  IconDownload,
  IconUpload,
  IconRefresh,
  IconX,
} from '@tabler/icons-react';

interface KhachHangDoanhThuItem {
  id: string;
  tenKhachHang: string;
  daThucNhan: number;
  nam: number;
}

const SAMPLE_KHACH_HANG_LIST: KhachHangDoanhThuItem[] = [
  { id: '1', tenKhachHang: 'CÔNG TY CỔ PHẦN XÂY LẮP SUNSHINE E&C', daThucNhan: 2784148752, nam: 2019 },
  { id: '2', tenKhachHang: 'CÔNG TY CỔ PHẦN ADG HOLDING', daThucNhan: 1721863857, nam: 2019 },
  { id: '3', tenKhachHang: 'Cty CP Thực phẩm Bim', daThucNhan: 1354830723, nam: 2019 },
  { id: '4', tenKhachHang: 'CÔNG TY TNHH BẤT ĐỘNG SẢN S - LAND', daThucNhan: 1173198000, nam: 2019 },
  { id: '5', tenKhachHang: 'CÔNG TY TNHH ĐẦU TƯ PHÁT TRIỂN S...', daThucNhan: 1070621254, nam: 2019 },
  { id: '6', tenKhachHang: 'TẬP ĐOÀN VINGROUP - CÔNG TY CP', daThucNhan: 999269700, nam: 2019 },
  { id: '7', tenKhachHang: 'CÔNG TY TNHH KINH DOANH BẤT ĐỘNG...', daThucNhan: 977524130, nam: 2019 },
  { id: '8', tenKhachHang: 'CÔNG TY TNHH VSIP BẮC NINH', daThucNhan: 955735000, nam: 2019 },
  { id: '9', tenKhachHang: 'FPT CITY', daThucNhan: 799871600, nam: 2019 },
  { id: '10', tenKhachHang: 'CÔNG TY TNHH BIM KIÊN GIANG', daThucNhan: 790736100, nam: 2019 },
  { id: '11', tenKhachHang: 'CÔNG TY CỔ PHẦN VEGA CITY', daThucNhan: 776549950, nam: 2019 },
  { id: '12', tenKhachHang: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN HANAKA', daThucNhan: 711799000, nam: 2019 },
  { id: '13', tenKhachHang: 'CÔNG TY CỔ PHẦN MBLAND TONKIN', daThucNhan: 676170000, nam: 2019 },
  { id: '14', tenKhachHang: 'MÔ HÌNH DỰ ÁN VINHOMES MARINA', daThucNhan: 609503400, nam: 2019 },
  { id: '15', tenKhachHang: 'CÔNG TY CỔ PHẦN BẤT ĐỘNG SẢN BEL...', daThucNhan: 469099664, nam: 2019 },
  { id: '16', tenKhachHang: 'CÔNG TY CỔ PHẦN ĐẦU TƯ PHÁT TRIỂN...', daThucNhan: 435767200, nam: 2019 },
  { id: '17', tenKhachHang: 'CÔNG TY CỔ PHẦN BITEXCO (BITEXCO J...', daThucNhan: 417100000, nam: 2019 },
  { id: '18', tenKhachHang: 'NIKKEN SEKKEI LTD', daThucNhan: 408707200, nam: 2019 },
  { id: '19', tenKhachHang: 'CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ PHÁT TR...', daThucNhan: 363636364, nam: 2019 },
  { id: '20', tenKhachHang: 'DỰ ÁN DAMEVA RESIDENCE NHA TRANG', daThucNhan: 314657200, nam: 2019 },
  { id: '21', tenKhachHang: 'TẬP ĐOÀN VINGROUP – CÔNG TY CP', daThucNhan: 270185850, nam: 2019 },
  { id: '22', tenKhachHang: 'Công ty CP Thực phẩm Bim', daThucNhan: 269472895.8, nam: 2019 },
  { id: '23', tenKhachHang: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN AE', daThucNhan: 239958400, nam: 2019 },
  { id: '24', tenKhachHang: 'CÔNG TY CỔ PHẦN PHÚC AN KHANG BÌ...', daThucNhan: 230989000, nam: 2019 },
  { id: '25', tenKhachHang: 'Sunshine', daThucNhan: 179410000, nam: 2019 },
  { id: '26', tenKhachHang: 'Chỉnh sửa Hà Đô', daThucNhan: 171600000, nam: 2019 },
  { id: '27', tenKhachHang: 'Chỉnh sửa MH Nam Vĩnh Yên', daThucNhan: 169180000, nam: 2019 },
  { id: '28', tenKhachHang: 'CÔNG TY CỔ PHẦN KỸ THUẬT VÀ XÂY D...', daThucNhan: 156521040, nam: 2019 },
  { id: '29', tenKhachHang: 'CÔNG TY ĐẦU TƯ PHÁT TRIỂN SẢN XUẤT...', daThucNhan: 156123687, nam: 2019 },
  { id: '30', tenKhachHang: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN SUNSHINE', daThucNhan: 154660000, nam: 2019 },
  { id: '31', tenKhachHang: 'Chỉnh sửa Mô hình Himlam', daThucNhan: 154660000, nam: 2019 },
  { id: '32', tenKhachHang: 'CÔNG TY TNHH GIÁO DỤC VÀ ĐÀO TẠO ...', daThucNhan: 118239000, nam: 2019 },
  { id: '33', tenKhachHang: 'CÔNG TY TNHH NIPPON KOEI', daThucNhan: 116000000, nam: 2019 },
  { id: '34', tenKhachHang: 'CHỈNH SỬA HIM LAM', daThucNhan: 115577000, nam: 2019 },
  { id: '35', tenKhachHang: 'DỰ ÁN FIVE STAR WEST LAKE', daThucNhan: 95840112, nam: 2019 },
  { id: '36', tenKhachHang: 'GAMUDA LAND VIETNAM LLC', daThucNhan: 88000000, nam: 2019 },
  { id: '37', tenKhachHang: 'CHI NHÁNH CÔNG TY CỔ PHẦN XUẤT NH...', daThucNhan: 85716600, nam: 2019 },
  { id: '38', tenKhachHang: 'CÔNG TY CỔ PHẦN KINH DOANH ĐỊA ỐC ...', daThucNhan: 83773800, nam: 2019 },
  { id: '39', tenKhachHang: 'Vận chuyển Mh Ciputra', daThucNhan: 79090000, nam: 2019 },
  { id: '40', tenKhachHang: 'VẬN CHUYỂN MÔ HÌNH SUNSHINE CITY, ...', daThucNhan: 66440000, nam: 2019 },
  { id: '41', tenKhachHang: 'CÔNG TY TNHH MTV TƯ VẤN THIẾT KẾ V...', daThucNhan: 63800000, nam: 2019 },
  { id: '42', tenKhachHang: 'BHXH', daThucNhan: 59714144, nam: 2019 },
  { id: '43', tenKhachHang: 'GMP INTERNATIONAL GMBH', daThucNhan: 55950317, nam: 2019 },
  { id: '44', tenKhachHang: 'CÔNG TY TNHH KHU DU LỊCH VỊNH THIÊ...', daThucNhan: 50424000, nam: 2019 },
  { id: '45', tenKhachHang: 'Chỉnh sửa MH Gamuda', daThucNhan: 50105000, nam: 2019 },
  { id: '46', tenKhachHang: 'Chỉnh sửa MH Meiko', daThucNhan: 48500000, nam: 2019 },
  { id: '47', tenKhachHang: 'Thái hưng', daThucNhan: 42659100, nam: 2019 },
  { id: '48', tenKhachHang: 'TK 10321066966010 So tien GD:+36,135,54...', daThucNhan: 36135542, nam: 2019 },
  { id: '49', tenKhachHang: 'Vận chuyển MH vinhomes hải phòng', daThucNhan: 35200000, nam: 2019 },
  { id: '50', tenKhachHang: 'BHXH chi trả tiền thai sản: Hiếu, Thủy Vũ, T...', daThucNhan: 31960691, nam: 2019 },
  { id: '51', tenKhachHang: 'CHỈNH SỬA MÔ HÌNH SUNSHINE', daThucNhan: 31680000, nam: 2019 },
  { id: '52', tenKhachHang: 'BẢO HIỂM XH', daThucNhan: 29396379, nam: 2019 },
  { id: '53', tenKhachHang: 'TRANG TRÍ NỘI THẤT VĂN PHÒNG ATS SỐ...', daThucNhan: 24571250, nam: 2019 },
  { id: '54', tenKhachHang: 'Vận chuyển MH Sunshine City', daThucNhan: 22715000, nam: 2019 },
  { id: '55', tenKhachHang: 'Tháo dỡ, vận chuyển lắp đặt Mô hình Suns...', daThucNhan: 22715000, nam: 2019 },
  { id: '56', tenKhachHang: 'Vận chuyển Thái Hưng', daThucNhan: 19800000, nam: 2019 },
  { id: '57', tenKhachHang: 'Vận chuyển MH ADG2', daThucNhan: 17215000, nam: 2019 },
  { id: '58', tenKhachHang: 'VẬN CHUYỂN MÔ HÌNH CT8', daThucNhan: 9900000, nam: 2019 },
  { id: '59', tenKhachHang: 'VẬN CHUYỂN MÔ HÌNH QH BITEXCO LÀO ...', daThucNhan: 8250000, nam: 2019 },
  { id: '60', tenKhachHang: 'VỆ SINH 2 MÔ HÌNH QH TỔNG THỂ ECOPA...', daThucNhan: 6600000, nam: 2019 },
  { id: '61', tenKhachHang: 'CTY CP DAI VIET TRI TUE', daThucNhan: 3850000, nam: 2019 },
  { id: '62', tenKhachHang: 'Công ty CP Bitexco', daThucNhan: 0, nam: 2019 },
  { id: '63', tenKhachHang: 'NIKKEN SEKKEI CIVIL ENGINEERING COMPANY', daThucNhan: 0, nam: 2019 },
  { id: '64', tenKhachHang: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN MIK GROUP VIỆT NAM', daThucNhan: 0, nam: 2019 },
  { id: '65', tenKhachHang: 'Viện QH xây dựng Hà Nội', daThucNhan: 0, nam: 2019 },
  { id: '66', tenKhachHang: 'FPT', daThucNhan: 0, nam: 2019 },
  { id: '67', tenKhachHang: 'CÔNG TY CỔ PHẦN TMS HOMES', daThucNhan: 0, nam: 2019 },
  { id: '68', tenKhachHang: 'THAY DOI MAU SON BOOYOUNG', daThucNhan: 0, nam: 2019 },
  { id: '69', tenKhachHang: 'CÔNG TY CP ĐẦU TƯ & PT ĐÔ THỊ VIỆT HƯNG (VIH...', daThucNhan: 0, nam: 2019 },
  { id: '70', tenKhachHang: 'BQL dự án ĐTXD công trình nhà quốc hội và hội trườ...', daThucNhan: 0, nam: 2019 },
  { id: '71', tenKhachHang: 'Tập đoàn Vingroup - Công ty CP', daThucNhan: 0, nam: 2019 },
  { id: '72', tenKhachHang: 'CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ PHÁT TRIỂN BẤT Đ...', daThucNhan: 0, nam: 2019 },
  { id: '73', tenKhachHang: 'CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ PHÁT TRIỂN HÒA BÌ...', daThucNhan: 0, nam: 2019 },
];

const formatVND = (val: number) => {
  if (val === 0) return '0 đ';
  if (val % 1 !== 0) {
    const intPart = Math.floor(val);
    const decPart = (val % 1).toFixed(1).split('.')[1];
    return `${new Intl.NumberFormat('vi-VN').format(intPart)},${decPart} đ`;
  }
  return `${new Intl.NumberFormat('vi-VN').format(val)} đ`;
};

export default function DoanhThuKhachHangTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNam, setSelectedNam] = useState<string>('2019');
  const [selectedThang, setSelectedThang] = useState<string>('Tất cả');

  // Filtered List
  const filteredData = SAMPLE_KHACH_HANG_LIST.filter((item) => {
    const matchSearch = item.tenKhachHang.toLowerCase().includes(searchTerm.toLowerCase());
    const matchNam = selectedNam === 'Tất cả' || item.nam.toString() === selectedNam;
    return matchSearch && matchNam;
  });

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-3">
      {/* Top Filter & Actions Row */}
      <div className="shrink-0 flex flex-wrap items-center justify-between gap-2">
        {/* Left Side: Dropdowns (Năm, Tháng) and Search input */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <select
              value={selectedNam}
              onChange={(e) => setSelectedNam(e.target.value)}
              className="bg-white border border-slate-200/90 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="2019">Năm 2019</option>
              <option value="2018">Năm 2018</option>
              <option value="2026">Năm 2026</option>
              <option value="Tất cả">Tất cả năm</option>
            </select>

            <select
              value={selectedThang}
              onChange={(e) => setSelectedThang(e.target.value)}
              className="bg-white border border-slate-200/90 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="Tất cả">Tất cả tháng</option>
              <option value="1">Tháng 1</option>
              <option value="2">Tháng 2</option>
              <option value="3">Tháng 3</option>
              <option value="4">Tháng 4</option>
              <option value="5">Tháng 5</option>
              <option value="6">Tháng 6</option>
              <option value="7">Tháng 7</option>
              <option value="8">Tháng 8</option>
              <option value="9">Tháng 9</option>
              <option value="10">Tháng 10</option>
              <option value="11">Tháng 11</option>
              <option value="12">Tháng 12</option>
            </select>
          </div>

          <div className="w-72 sm:w-80">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm theo số HĐ, công trình, khách hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200/90 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#406c89] shadow-2xs transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <IconX size={13} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-1.5 self-end sm:self-center">
          <button
            type="button"
            className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
          >
            <IconDownload size={13} className="text-slate-500" />
            <span>Export</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
          >
            <IconUpload size={13} className="text-slate-500" />
            <span>Import</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedNam('2019');
              setSelectedThang('Tất cả');
            }}
            className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
          >
            <IconRefresh size={13} className="text-slate-500" />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Revenue Table Section */}
      <div className="flex-1 min-h-0 bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-hidden flex flex-col">
        {/* Table Title Header */}
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            DOANH THU ĐÃ THU THEO KHÁCH HÀNG — NĂM {selectedNam.toUpperCase()}
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">
            Tổng cộng: <strong>{filteredData.length}</strong> khách hàng
          </span>
        </div>

        {/* 3-Column Grid Data Rows */}
        <div className="flex-1 overflow-auto p-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-0.5">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-1.5 px-2 border-b border-slate-100 hover:bg-slate-50/90 rounded transition-colors group text-[11px]"
              >
                <span
                  className="text-slate-700 font-medium truncate pr-2 group-hover:text-slate-900"
                  title={item.tenKhachHang}
                >
                  {item.tenKhachHang}
                </span>
                <span className="font-bold text-emerald-600 shrink-0 whitespace-nowrap">
                  {formatVND(item.daThucNhan)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
