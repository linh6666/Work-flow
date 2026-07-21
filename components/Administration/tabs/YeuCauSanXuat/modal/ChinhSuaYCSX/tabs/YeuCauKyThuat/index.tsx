"use client";

import React, { useState } from 'react';

export interface ChinhSuaYeuCauKyThuatTabProps {
  khungSatMatBang?: string;
  setKhungSatMatBang?: (v: string) => void;
  chanMoHinh?: string;
  setChanMoHinh?: (v: string) => void;
  congTrinh?: string;
  setCongTrinh?: (v: string) => void;
  noiThat?: string;
  setNoiThat?: (v: string) => void;
  nenCanhQuan?: string;
  setNenCanhQuan?: (v: string) => void;
  heThongAnhSang?: string;
  setHeThongAnhSang?: (v: string) => void;
  yeuCauDacBietAnhSang?: string;
  setYeuCauDacBietAnhSang?: (v: string) => void;
  kinhBaoVe?: string;
  setKinhBaoVe?: (v: string) => void;
  hopVanChuyen?: string;
  setHopVanChuyen?: (v: string) => void;
  yeuCauDacBietKhac?: string;
  setYeuCauDacBietKhac?: (v: string) => void;
  [key: string]: any;
}

const DEFAULT_KHUNG_SAT = `- Khung làm từ kim loại 20×40, dày 1.2 mm.
- Mặt bằng bằng gỗ MDF xanh dày 12 mm.`;

const DEFAULT_CHAN_MO_HINH = `- Chân mô hình: chân vuông bo cong 4 góc, sử dụng gỗ công nghiệp bọc laminate.
- Có ánh sáng.
- Bánh xe tăng chỉnh, chịu lực.`;

const DEFAULT_CONG_TRINH = `- Công trình được khai triển từ bản vẽ kiến trúc. Sau đó được cắt bằng máy cắt Laser, ghép và sơn hoàn thiện.`;

const DEFAULT_NOI_THAT = `Không`;
const DEFAULT_YEU_CAU_ANH_SANG = `Không có`;
const DEFAULT_KINH_BAO_VE = `Không có`;
const DEFAULT_HOP_VAN_CHUYEN = `Đi xe nguyên chuyến`;

export default function ChinhSuaYeuCauKyThuatTab(props: ChinhSuaYeuCauKyThuatTabProps) {
  // Local fallback state
  const [localKhungSat, setLocalKhungSat] = useState(DEFAULT_KHUNG_SAT);
  const [localChanMoHinh, setLocalChanMoHinh] = useState(DEFAULT_CHAN_MO_HINH);
  const [localCongTrinh, setLocalCongTrinh] = useState(DEFAULT_CONG_TRINH);
  const [localNoiThat, setLocalNoiThat] = useState(DEFAULT_NOI_THAT);
  const [localNenCanhQuan, setLocalNenCanhQuan] = useState('');
  const [localAnhSang, setLocalAnhSang] = useState('');
  const [localDacBietAnhSang, setLocalDacBietAnhSang] = useState(DEFAULT_YEU_CAU_ANH_SANG);
  const [localKinhBaoVe, setLocalKinhBaoVe] = useState(DEFAULT_KINH_BAO_VE);
  const [localHopVanChuyen, setLocalHopVanChuyen] = useState(DEFAULT_HOP_VAN_CHUYEN);
  const [localDacBietKhac, setLocalDacBietKhac] = useState('');

  const khungSatMatBang = props.khungSatMatBang !== undefined ? props.khungSatMatBang : localKhungSat;
  const setKhungSatMatBang = props.setKhungSatMatBang || setLocalKhungSat;

  const chanMoHinh = props.chanMoHinh !== undefined ? props.chanMoHinh : localChanMoHinh;
  const setChanMoHinh = props.setChanMoHinh || setLocalChanMoHinh;

  const congTrinh = props.congTrinh !== undefined ? props.congTrinh : localCongTrinh;
  const setCongTrinh = props.setCongTrinh || setLocalCongTrinh;

  const noiThat = props.noiThat !== undefined ? props.noiThat : localNoiThat;
  const setNoiThat = props.setNoiThat || setLocalNoiThat;

  const nenCanhQuan = props.nenCanhQuan !== undefined ? props.nenCanhQuan : localNenCanhQuan;
  const setNenCanhQuan = props.setNenCanhQuan || setLocalNenCanhQuan;

  const heThongAnhSang = props.heThongAnhSang !== undefined ? props.heThongAnhSang : localAnhSang;
  const setHeThongAnhSang = props.setHeThongAnhSang || setLocalAnhSang;

  const yeuCauDacBietAnhSang = props.yeuCauDacBietAnhSang !== undefined ? props.yeuCauDacBietAnhSang : localDacBietAnhSang;
  const setYeuCauDacBietAnhSang = props.setYeuCauDacBietAnhSang || setLocalDacBietAnhSang;

  const kinhBaoVe = props.kinhBaoVe !== undefined ? props.kinhBaoVe : localKinhBaoVe;
  const setKinhBaoVe = props.setKinhBaoVe || setLocalKinhBaoVe;

  const hopVanChuyen = props.hopVanChuyen !== undefined ? props.hopVanChuyen : localHopVanChuyen;
  const setHopVanChuyen = props.setHopVanChuyen || setLocalHopVanChuyen;

  const yeuCauDacBietKhac = props.yeuCauDacBietKhac !== undefined ? props.yeuCauDacBietKhac : localDacBietKhac;
  const setYeuCauDacBietKhac = props.setYeuCauDacBietKhac || setLocalDacBietKhac;

  return (
    <div className="space-y-4 animate-fade-in text-xs text-slate-800">
      
      {/* 1. KHUNG SẮT VÀ MẶT BẰNG */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Khung sắt và mặt bằng
        </label>
        <textarea
          rows={3}
          value={khungSatMatBang}
          onChange={(e) => setKhungSatMatBang(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs resize-y font-normal leading-relaxed min-h-[70px]"
        />
      </div>

      {/* 2. CHÂN MÔ HÌNH */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Chân mô hình
        </label>
        <textarea
          rows={4}
          value={chanMoHinh}
          onChange={(e) => setChanMoHinh(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs resize-y font-normal leading-relaxed min-h-[85px]"
        />
      </div>

      {/* 3. CÔNG TRÌNH */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Công trình
        </label>
        <textarea
          rows={3}
          value={congTrinh}
          onChange={(e) => setCongTrinh(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs resize-y font-normal leading-relaxed min-h-[70px]"
        />
      </div>

      {/* 4. NỘI THẤT */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Nội thất
        </label>
        <textarea
          rows={3}
          value={noiThat}
          onChange={(e) => setNoiThat(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs resize-y font-normal leading-relaxed min-h-[70px]"
        />
      </div>

      {/* 5. NỀN VÀ CẢNH QUAN MÔ HÌNH */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Nền và cảnh quan mô hình
        </label>
        <textarea
          rows={4}
          value={nenCanhQuan}
          onChange={(e) => setNenCanhQuan(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs resize-y font-normal leading-relaxed min-h-[85px]"
        />
      </div>

      {/* 6. HỆ THỐNG ÁNH SÁNG MÔ HÌNH */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Hệ thống ánh sáng mô hình
        </label>
        <textarea
          rows={3}
          value={heThongAnhSang}
          onChange={(e) => setHeThongAnhSang(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs resize-y font-normal leading-relaxed min-h-[70px]"
        />
      </div>

      {/* 7. YÊU CẦU ĐẶC BIỆT ÁNH SÁNG */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Yêu cầu đặc biệt ánh sáng
        </label>
        <textarea
          rows={3}
          value={yeuCauDacBietAnhSang}
          onChange={(e) => setYeuCauDacBietAnhSang(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs resize-y font-normal leading-relaxed min-h-[70px]"
        />
      </div>

      {/* 8. KÍNH BẢO VỆ MÔ HÌNH */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Kính bảo vệ mô hình
        </label>
        <textarea
          rows={3}
          value={kinhBaoVe}
          onChange={(e) => setKinhBaoVe(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs resize-y font-normal leading-relaxed min-h-[70px]"
        />
      </div>

      {/* 9. HỘP VẬN CHUYỂN */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Hộp vận chuyển
        </label>
        <textarea
          rows={3}
          value={hopVanChuyen}
          onChange={(e) => setHopVanChuyen(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs resize-y font-normal leading-relaxed min-h-[70px]"
        />
      </div>

      {/* 10. YÊU CẦU ĐẶC BIỆT KHÁC */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-800">
          Yêu cầu đặc biệt khác
        </label>
        <textarea
          rows={4}
          value={yeuCauDacBietKhac}
          onChange={(e) => setYeuCauDacBietKhac(e.target.value)}
          placeholder=""
          className="w-full bg-[#fbfcfd] border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all shadow-2xs resize-y font-normal leading-relaxed min-h-[85px]"
        />
      </div>

    </div>
  );
}
