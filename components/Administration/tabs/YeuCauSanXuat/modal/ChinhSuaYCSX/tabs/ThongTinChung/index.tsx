"use client";

import React, { useState } from 'react';
import { IconLink } from '@tabler/icons-react';

export interface ChinhSuaThongTinChungTabProps {
  soYcsx?: string;
  setSoYcsx?: (v: string) => void;
  maDuAn?: string;
  setMaDuAn?: (v: string) => void;
  tenDuAn?: string;
  setTenDuAn?: (v: string) => void;
  khachHang?: string;
  setKhachHang?: (v: string) => void;
  capDoDuAn?: string;
  setCapDoDuAn?: (v: string) => void;
  tyLe?: string;
  setTyLe?: (v: string) => void;
  kichThuoc?: string;
  setKichThuoc?: (v: string) => void;
  diaDiemLapDat?: string;
  setDiaDiemLapDat?: (v: string) => void;
  lienKetHopDong?: string;
  setLienKetHopDong?: (v: string) => void;
  dinhHuongHopDong?: string;
  setDinhHuongHopDong?: (v: string) => void;
  hoSoXacNhan?: string;
  setHoSoXacNhan?: (v: string) => void;
  khoiLuongNghiemThu?: string;
  setKhoiLuongNghiemThu?: (v: string) => void;
  ghiChu?: string;
  setGhiChu?: (v: string) => void;
  [key: string]: any;
}

const DEFAULT_HO_SO_XAC_NHAN = `- Khung Tổng mặt bằng của mô hình.
- Bản vẽ thiết kế Khung của mô hình.
- Bản vẽ mặt bằng, mặt đứng của Công trình (Đối với các hạng mục mô hình công trình)
- Bảng mã màu sắc của công trình.`;

const DEFAULT_KHOI_LUONG_NGHIEM_THU = `- Hoàn thành 80% phần nền: khai triển xong nền, sơn đường, đường đi bộ, vỉa hè; đã dán đường.
- Hoàn thành 80% khối lượng công trình: Sơn, ghép lên khối bao gồm cốt, tường, đế, kính và đang dán các chi tiết công trình như đố kính, lan can, ban công.
- Hoàn thành 80% phần trang trí cảnh quan: bao gồm chuẩn bị đầy đủ nguyên, phụ liệu trang trí cảnh quan...`;

export default function ChinhSuaThongTinChungTab(props: ChinhSuaThongTinChungTabProps) {
  // Local fallback state
  const [localSoYcsx, setLocalSoYcsx] = useState('');
  const [localMaDuAn, setLocalMaDuAn] = useState('');
  const [localTenDuAn, setLocalTenDuAn] = useState('');
  const [localKhachHang, setLocalKhachHang] = useState('');
  const [localCapDo, setLocalCapDo] = useState('V');
  const [localTyLe, setLocalTyLe] = useState('1/1000');
  const [localKichThuoc, setLocalKichThuoc] = useState('1300×2400mm');
  const [localDiaDiem, setLocalDiaDiem] = useState('');
  const [localHopDong, setLocalHopDong] = useState('');
  const [localDinhHuong, setLocalDinhHuong] = useState('');
  const [localHoSo, setLocalHoSo] = useState(DEFAULT_HO_SO_XAC_NHAN);
  const [localNghiemThu, setLocalNghiemThu] = useState(DEFAULT_KHOI_LUONG_NGHIEM_THU);
  const [localGhiChu, setLocalGhiChu] = useState('');

  const soYcsx = props.soYcsx !== undefined ? props.soYcsx : localSoYcsx;
  const setSoYcsx = props.setSoYcsx || setLocalSoYcsx;

  const maDuAn = props.maDuAn !== undefined ? props.maDuAn : localMaDuAn;
  const setMaDuAn = props.setMaDuAn || setLocalMaDuAn;

  const tenDuAn = props.tenDuAn !== undefined ? props.tenDuAn : localTenDuAn;
  const setTenDuAn = props.setTenDuAn || setLocalTenDuAn;

  const khachHang = props.khachHang !== undefined ? props.khachHang : localKhachHang;
  const setKhachHang = props.setKhachHang || setLocalKhachHang;

  const capDoDuAn = props.capDoDuAn !== undefined ? props.capDoDuAn : localCapDo;
  const setCapDoDuAn = props.setCapDoDuAn || setLocalCapDo;

  const tyLe = props.tyLe !== undefined ? props.tyLe : localTyLe;
  const setTyLe = props.setTyLe || setLocalTyLe;

  const kichThuoc = props.kichThuoc !== undefined ? props.kichThuoc : localKichThuoc;
  const setKichThuoc = props.setKichThuoc || setLocalKichThuoc;

  const diaDiemLapDat = props.diaDiemLapDat !== undefined ? props.diaDiemLapDat : localDiaDiem;
  const setDiaDiemLapDat = props.setDiaDiemLapDat || setLocalDiaDiem;

  const lienKetHopDong = props.lienKetHopDong !== undefined ? props.lienKetHopDong : localHopDong;
  const setLienKetHopDong = props.setLienKetHopDong || setLocalHopDong;

  const dinhHuongHopDong = props.dinhHuongHopDong !== undefined ? props.dinhHuongHopDong : localDinhHuong;
  const setDinhHuongHopDong = props.setDinhHuongHopDong || setLocalDinhHuong;

  const hoSoXacNhan = props.hoSoXacNhan !== undefined ? props.hoSoXacNhan : localHoSo;
  const setHoSoXacNhan = props.setHoSoXacNhan || setLocalHoSo;

  const khoiLuongNghiemThu = props.khoiLuongNghiemThu !== undefined ? props.khoiLuongNghiemThu : localNghiemThu;
  const setKhoiLuongNghiemThu = props.setKhoiLuongNghiemThu || setLocalNghiemThu;

  const ghiChu = props.ghiChu !== undefined ? props.ghiChu : localGhiChu;
  const setGhiChu = props.setGhiChu || setLocalGhiChu;

  return (
    <div className="space-y-4 animate-fade-in text-xs text-slate-800">
      
      {/* 1. TOP BANNER: LIÊN KẾT BÁO GIÁ & LIÊN KẾT HỢP ĐỒNG */}
      <div className="bg-[#f4f6ff]/70 border border-[#dbe0fe] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none">
        
        {/* Left: Liên kết Báo giá */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#406c89] text-xs">
            <IconLink size={16} className="text-[#406c89]" />
            <span>Liên kết Báo giá</span>
          </div>
          <p className="text-xs text-slate-400 italic font-normal">
            Tự động liên kết từ hợp đồng
          </p>
        </div>

        {/* Right: Liên kết Hợp đồng */}
        <div className="space-y-1 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 font-bold text-[#406c89] text-xs">
            <IconLink size={16} className="text-[#406c89]" />
            <span>Liên kết Hợp đồng</span>
          </div>
          <select
            value={lienKetHopDong}
            onChange={(e) => setLienKetHopDong(e.target.value)}
            className="w-full sm:w-[260px] text-xs bg-white border border-[#406c89]/40 focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89] rounded-xl px-3.5 py-2 text-slate-700 focus:outline-none transition-all cursor-pointer shadow-2xs"
          >
            <option value="">-- Chọn hợp đồng --</option>
            <option value="hd-01">HĐ-01/2026/MHV - Dự án HAUS COASTAL</option>
            <option value="hd-02">HĐ-02/2026/MHV - Sa bàn 22 Liễu Giai</option>
            <option value="hd-03">HĐ-03/2026/MHV - The Heritage Tây Ninh</option>
          </select>
        </div>

      </div>

      {/* 2. ROW 1: SỐ YÊU CẦU & MÃ DỰ ÁN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Số yêu cầu
          </label>
          <input
            type="text"
            value={soYcsx}
            onChange={(e) => setSoYcsx(e.target.value)}
            placeholder=""
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Mã dự án
          </label>
          <input
            type="text"
            value={maDuAn}
            onChange={(e) => setMaDuAn(e.target.value)}
            placeholder=""
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* 3. ROW 2: TÊN DỰ ÁN / MÔ HÌNH * */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Tên dự án / mô hình <span className="text-slate-800 font-normal">*</span>
        </label>
        <input
          type="text"
          required
          value={tenDuAn}
          onChange={(e) => setTenDuAn(e.target.value)}
          placeholder="VD: MÔ HÌNH DỰ ÁN HAUS COASTAL..."
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs placeholder:text-slate-400"
        />
      </div>

      {/* 4. ROW 3: KHÁCH HÀNG * & CẤP ĐỘ DỰ ÁN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Khách hàng <span className="text-slate-800 font-normal">*</span>
          </label>
          <input
            type="text"
            required
            value={khachHang}
            onChange={(e) => setKhachHang(e.target.value)}
            placeholder=""
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Cấp độ dự án
          </label>
          <select
            value={capDoDuAn}
            onChange={(e) => setCapDoDuAn(e.target.value)}
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs cursor-pointer"
          >
            <option value="V">V</option>
            <option value="IV">IV</option>
            <option value="III">III</option>
            <option value="II">II</option>
            <option value="I">I</option>
          </select>
        </div>
      </div>

      {/* 5. ROW 4: TỶ LỆ & KÍCH THƯỚC */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Tỷ lệ
          </label>
          <input
            type="text"
            value={tyLe}
            onChange={(e) => setTyLe(e.target.value)}
            placeholder="1/1000"
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Kích thước
          </label>
          <input
            type="text"
            value={kichThuoc}
            onChange={(e) => setKichThuoc(e.target.value)}
            placeholder="1300×2400mm"
            className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* 6. ROW 5: ĐỊA ĐIỂM LẮP ĐẶT */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Địa điểm lắp đặt
        </label>
        <input
          type="text"
          value={diaDiemLapDat}
          onChange={(e) => setDiaDiemLapDat(e.target.value)}
          placeholder="Nhập địa điểm lắp đặt..."
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs placeholder:text-slate-400"
        />
      </div>

      {/* 7. ROW 6: ĐỊNH HƯỚNG THEO HỢP ĐỒNG */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Định hướng theo hợp đồng
        </label>
        <textarea
          rows={3}
          value={dinhHuongHopDong}
          onChange={(e) => setDinhHuongHopDong(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs resize-y min-h-[70px] leading-relaxed"
        />
      </div>

      {/* 8. ROW 7: BỘ HỒ SƠ XÁC NHẬN KHAI TRIỂN */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Bộ hồ sơ xác nhận khai triển
        </label>
        <textarea
          rows={5}
          value={hoSoXacNhan}
          onChange={(e) => setHoSoXacNhan(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs resize-y font-normal leading-relaxed"
        />
      </div>

      {/* 9. ROW 8: KHỐI LƯỢNG NGHIỆM THU LẦN 1 */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Khối lượng nghiệm thu lần 1
        </label>
        <textarea
          rows={5}
          value={khoiLuongNghiemThu}
          onChange={(e) => setKhoiLuongNghiemThu(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs resize-y font-normal leading-relaxed"
        />
      </div>

      {/* 10. ROW 9: GHI CHÚ */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Ghi chú
        </label>
        <textarea
          rows={3}
          value={ghiChu}
          onChange={(e) => setGhiChu(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs resize-y min-h-[70px] leading-relaxed"
        />
      </div>

    </div>
  );
}
