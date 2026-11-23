"use client";

import React, { useState } from 'react';
import { IconX, IconFileText, IconCheck, IconLoader2, IconAlertCircle } from '@tabler/icons-react';

import ThongTinChungTab from './tabs/ThongTinChung';
import YeuCauKyThuatTab from './tabs/YeuCauKyThuat';
import TienDoTab from './tabs/TienDo';
import { createProductionRequest } from '@/api/apiCreateProductionRequest';
import { NotificationExtension } from '@/common/extension/NotificationExtension';

interface TaoYCSXModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (data: any) => void;
}

const DEFAULT_HO_SO_XAC_NHAN = `- Khung Tổng mặt bằng của mô hình.
- Bản vẽ thiết kế Khung của mô hình.
- Bản vẽ mặt bằng, mặt đứng của Công trình (Đối với các hạng mục mô hình công trình)
- Bảng mã màu sắc của công trình.`;

const DEFAULT_KHOI_LUONG_NGHIEM_THU = `- Hoàn thành 80% phần nền: khai triển xong nền, sơn đường, đường đi bộ, vỉa hè; đã dán đường.
- Hoàn thành 80% khối lượng công trình: Sơn, ghép lên khối bao gồm cốt, tường, đế, kính và đang dán các chi tiết công trình như đố kính, lan can, ban công.
- Hoàn thành 80% phần trang trí cảnh quan: bao gồm chuẩn bị đầy đủ nguyên, phụ liệu trang trí cảnh quan...`;

const DEFAULT_KHUNG_SAT = `- Khung làm từ kim loại 20×40, dày 1.2 mm.
- Mặt bằng bằng gỗ MDF xanh dày 12 mm.`;

const DEFAULT_CHAN_MO_HINH = `- Chân mô hình: chân vuông bo cong 4 góc, sử dụng gỗ công nghiệp bọc laminate.
- Có ánh sáng.
- Bánh xe tăng chỉnh, chịu lực.`;

const DEFAULT_CONG_TRINH = `- Công trình được khai triển từ bản vẽ kiến trúc. Sau đó được cắt bằng máy cắt Laser, ghép và sơn hoàn thiện.`;

export default function TaoYCSXModal({ isOpen, onClose, onSubmitSuccess }: TaoYCSXModalProps) {
  const [activeTab, setActiveTab] = useState<'thongTinChung' | 'yeuCauKyThuat' | 'tienDo'>('thongTinChung');

  // ── Tab 1: Thông tin chung State ──
  const [soYcsx, setSoYcsx] = useState('');
  const [maDuAn, setMaDuAn] = useState('');
  const [tenDuAn, setTenDuAn] = useState('');
  const [khachHang, setKhachHang] = useState('');
  const [capDoDuAn, setCapDoDuAn] = useState('V');
  const [tyLe, setTyLe] = useState('1/1000');
  const [kichThuoc, setKichThuoc] = useState('1300×2400mm');
  const [diaDiemLapDat, setDiaDiemLapDat] = useState('');
  const [lienKetHopDong, setLienKetHopDong] = useState('');
  const [dinhHuongHopDong, setDinhHuongHopDong] = useState('');
  const [hoSoXacNhan, setHoSoXacNhan] = useState(DEFAULT_HO_SO_XAC_NHAN);
  const [khoiLuongNghiemThu, setKhoiLuongNghiemThu] = useState(DEFAULT_KHOI_LUONG_NGHIEM_THU);
  const [ghiChu, setGhiChu] = useState('');

  // ── Tab 2: Yêu cầu kỹ thuật State ──
  const [khungSatMatBang, setKhungSatMatBang] = useState(DEFAULT_KHUNG_SAT);
  const [chanMoHinh, setChanMoHinh] = useState(DEFAULT_CHAN_MO_HINH);
  const [congTrinh, setCongTrinh] = useState(DEFAULT_CONG_TRINH);
  const [noiThat, setNoiThat] = useState('Không');
  const [nenCanhQuan, setNenCanhQuan] = useState('');
  const [heThongAnhSang, setHeThongAnhSang] = useState('');
  const [yeuCauDacBietAnhSang, setYeuCauDacBietAnhSang] = useState('Không có');
  const [kinhBaoVe, setKinhBaoVe] = useState('Không có');
  const [hopVanChuyen, setHopVanChuyen] = useState('Đi xe nguyên chuyến');
  const [yeuCauDacBietKhac, setYeuCauDacBietKhac] = useState('');

  // ── Tab 3: Tiến độ State ──
  const [thoiGianBatDau, setThoiGianBatDau] = useState('');
  const [thoiGianKetThuc, setThoiGianKetThuc] = useState('');
  const [tongThoiGian, setTongThoiGian] = useState('');
  const [nghiemThuLan1, setNghiemThuLan1] = useState('');
  const [nghiemThuCuoiCung, setNghiemThuCuoiCung] = useState('');
  const [duKienVanChuyen, setDuKienVanChuyen] = useState('');
  const [duKienLapDat, setDuKienLapDat] = useState('');
  const [soNhanSuLapDat, setSoNhanSuLapDat] = useState('');

  // UI State
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null); // 'draft' | 'submit' | null
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Hàm xóa trắng toàn bộ dữ liệu nhập để form trở về trạng thái ban đầu
  const resetForm = () => {
    setActiveTab('thongTinChung');
    setSoYcsx('');
    setMaDuAn('');
    setTenDuAn('');
    setKhachHang('');
    setCapDoDuAn('V');
    setTyLe('1/1000');
    setKichThuoc('1300×2400mm');
    setDiaDiemLapDat('');
    setLienKetHopDong('');
    setDinhHuongHopDong('');
    setHoSoXacNhan(DEFAULT_HO_SO_XAC_NHAN);
    setKhoiLuongNghiemThu(DEFAULT_KHOI_LUONG_NGHIEM_THU);
    setGhiChu('');

    setKhungSatMatBang(DEFAULT_KHUNG_SAT);
    setChanMoHinh(DEFAULT_CHAN_MO_HINH);
    setCongTrinh(DEFAULT_CONG_TRINH);
    setNoiThat('Không');
    setNenCanhQuan('');
    setHeThongAnhSang('');
    setYeuCauDacBietAnhSang('Không có');
    setKinhBaoVe('Không có');
    setHopVanChuyen('Đi xe nguyên chuyến');
    setYeuCauDacBietKhac('');

    setThoiGianBatDau('');
    setThoiGianKetThuc('');
    setTongThoiGian('');
    setNghiemThuLan1('');
    setNghiemThuCuoiCung('');
    setDuKienVanChuyen('');
    setDuKienLapDat('');
    setSoNhanSuLapDat('');
    setErrorMessage(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const handleSave = async (status: 'Bản nháp' | 'Chờ QL KD duyệt') => {
    // Validate các trường bắt buộc
    if (!tenDuAn.trim()) {
      setActiveTab('thongTinChung');
      setErrorMessage('Vui lòng nhập Tên dự án!');
      NotificationExtension.Warn('Vui lòng nhập Tên dự án!', 'Thiếu thông tin');
      return;
    }
    if (!khachHang.trim()) {
      setActiveTab('thongTinChung');
      setErrorMessage('Vui lòng nhập Tên khách hàng!');
      NotificationExtension.Warn('Vui lòng nhập Tên khách hàng!', 'Thiếu thông tin');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(status === 'Bản nháp' ? 'draft' : 'submit');

    try {
      const payload = {
        request_number: soYcsx.trim() || undefined,
        project_code: maDuAn.trim() || undefined,
        project_name: tenDuAn.trim(),
        customer_name: khachHang.trim(),
        project_level: capDoDuAn || 'V',
        scale: tyLe || undefined,
        size: kichThuoc || undefined,
        install_location: diaDiemLapDat.trim() || undefined,
        contract_orientation: dinhHuongHopDong.trim() || undefined,
        technical_docs: hoSoXacNhan.trim() || undefined,
        acceptance_milestone_1: khoiLuongNghiemThu.trim() || undefined,
        notes: ghiChu.trim() || undefined,

        // Kỹ thuật
        frame_board: khungSatMatBang.trim() || undefined,
        base_legs: chanMoHinh.trim() || undefined,
        buildings: congTrinh.trim() || undefined,
        interior: noiThat.trim() || undefined,
        ground_landscape: nenCanhQuan.trim() || undefined,
        lighting_system: heThongAnhSang.trim() || undefined,
        special_lighting: yeuCauDacBietAnhSang.trim() || undefined,
        glass_cover: kinhBaoVe.trim() || undefined,
        transport_box: hopVanChuyen.trim() || undefined,
        other_requirements: yeuCauDacBietKhac.trim() || undefined,

        // Tiến độ
        start_date: thoiGianBatDau || undefined,
        end_date: thoiGianKetThuc || undefined,
        total_days: tongThoiGian ? Number(tongThoiGian) || tongThoiGian : undefined,
        acceptance_date_1: nghiemThuLan1 || undefined,
        acceptance_date_final: nghiemThuCuoiCung || undefined,
        transport_date: duKienVanChuyen || undefined,
        install_date: duKienLapDat || undefined,
        install_staff_count: soNhanSuLapDat || undefined,

        approval_status: status,
      };

      const result = await createProductionRequest(payload);

      if (result.success) {
        NotificationExtension.Success(
          status === 'Bản nháp'
            ? 'Lưu nháp Yêu cầu sản xuất thành công!'
            : 'Tạo và gửi duyệt Yêu cầu sản xuất thành công!',
          'Thành công'
        );
        resetForm();
        if (onSubmitSuccess) {
          onSubmitSuccess(result.data);
        }
        onClose();
      } else {
        const msg = result.error || 'Có lỗi xảy ra khi tạo YCSX. Vui lòng thử lại!';
        setErrorMessage(msg);
        NotificationExtension.Fails(msg, 'Tạo YCSX thất bại');
      }
    } catch (err: any) {
      const msg = err?.message || 'Lỗi hệ thống khi gửi yêu cầu!';
      setErrorMessage(msg);
      NotificationExtension.Fails(msg, 'Lỗi hệ thống');
    } finally {
      setIsSubmitting(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden select-none animate-in fade-in zoom-in-95 duration-150">
        
        {/* 1. Header Modal */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#406c89]/10 text-[#406c89] flex items-center justify-center shrink-0">
              <IconFileText size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                TẠO YÊU CẦU SẢN XUẤT MÔ HÌNH
              </h3>
              <p className="text-xs text-slate-400 font-normal">
                Nhập đầy đủ thông tin để khởi tạo YCSX mô hình mới
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting !== null}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer disabled:opacity-40"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* 2. Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-slate-200/60 bg-white flex items-center gap-8 shrink-0 text-xs sm:text-sm font-semibold select-none">
          <button
            type="button"
            onClick={() => setActiveTab('thongTinChung')}
            className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'thongTinChung'
                ? 'border-[#406c89] text-[#406c89] font-bold -mb-px'
                : 'border-transparent text-slate-600 hover:text-slate-900 font-medium -mb-px'
            }`}
          >
            <span>Thông tin chung</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('yeuCauKyThuat')}
            className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'yeuCauKyThuat'
                ? 'border-[#406c89] text-[#406c89] font-bold -mb-px'
                : 'border-transparent text-slate-600 hover:text-slate-900 font-medium -mb-px'
            }`}
          >
            <span>Yêu cầu kỹ thuật</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tienDo')}
            className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'tienDo'
                ? 'border-[#406c89] text-[#406c89] font-bold -mb-px'
                : 'border-transparent text-slate-600 hover:text-slate-900 font-medium -mb-px'
            }`}
          >
            <span>Tiến độ</span>
          </button>
        </div>

        {/* Alert Error Message */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs animate-shake">
            <IconAlertCircle size={16} className="shrink-0 text-rose-500" />
            <span className="flex-1 font-medium">{errorMessage}</span>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-rose-600 p-0.5 rounded cursor-pointer"
            >
              <IconX size={14} />
            </button>
          </div>
        )}

        {/* 3. Form Content Body */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            
            {/* TAB 1: THÔNG TIN CHUNG */}
            {activeTab === 'thongTinChung' && (
              <ThongTinChungTab
                soYcsx={soYcsx}
                setSoYcsx={setSoYcsx}
                maDuAn={maDuAn}
                setMaDuAn={setMaDuAn}
                tenDuAn={tenDuAn}
                setTenDuAn={setTenDuAn}
                khachHang={khachHang}
                setKhachHang={setKhachHang}
                capDoDuAn={capDoDuAn}
                setCapDoDuAn={setCapDoDuAn}
                tyLe={tyLe}
                setTyLe={setTyLe}
                kichThuoc={kichThuoc}
                setKichThuoc={setKichThuoc}
                diaDiemLapDat={diaDiemLapDat}
                setDiaDiemLapDat={setDiaDiemLapDat}
                lienKetHopDong={lienKetHopDong}
                setLienKetHopDong={setLienKetHopDong}
                dinhHuongHopDong={dinhHuongHopDong}
                setDinhHuongHopDong={setDinhHuongHopDong}
                hoSoXacNhan={hoSoXacNhan}
                setHoSoXacNhan={setHoSoXacNhan}
                khoiLuongNghiemThu={khoiLuongNghiemThu}
                setKhoiLuongNghiemThu={setKhoiLuongNghiemThu}
                ghiChu={ghiChu}
                setGhiChu={setGhiChu}
              />
            )}

            {/* TAB 2: YÊU CẦU KỸ THUẬT */}
            {activeTab === 'yeuCauKyThuat' && (
              <YeuCauKyThuatTab
                khungSatMatBang={khungSatMatBang}
                setKhungSatMatBang={setKhungSatMatBang}
                chanMoHinh={chanMoHinh}
                setChanMoHinh={setChanMoHinh}
                congTrinh={congTrinh}
                setCongTrinh={setCongTrinh}
                noiThat={noiThat}
                setNoiThat={setNoiThat}
                nenCanhQuan={nenCanhQuan}
                setNenCanhQuan={setNenCanhQuan}
                heThongAnhSang={heThongAnhSang}
                setHeThongAnhSang={setHeThongAnhSang}
                yeuCauDacBietAnhSang={yeuCauDacBietAnhSang}
                setYeuCauDacBietAnhSang={setYeuCauDacBietAnhSang}
                kinhBaoVe={kinhBaoVe}
                setKinhBaoVe={setKinhBaoVe}
                hopVanChuyen={hopVanChuyen}
                setHopVanChuyen={setHopVanChuyen}
                yeuCauDacBietKhac={yeuCauDacBietKhac}
                setYeuCauDacBietKhac={setYeuCauDacBietKhac}
              />
            )}

            {/* TAB 3: TIẾN ĐỘ */}
            {activeTab === 'tienDo' && (
              <TienDoTab
                thoiGianBatDau={thoiGianBatDau}
                setThoiGianBatDau={setThoiGianBatDau}
                thoiGianKetThuc={thoiGianKetThuc}
                setThoiGianKetThuc={setThoiGianKetThuc}
                tongThoiGian={tongThoiGian}
                setTongThoiGian={setTongThoiGian}
                nghiemThuLan1={nghiemThuLan1}
                setNghiemThuLan1={setNghiemThuLan1}
                nghiemThuCuoiCung={nghiemThuCuoiCung}
                setNghiemThuCuoiCung={setNghiemThuCuoiCung}
                duKienVanChuyen={duKienVanChuyen}
                setDuKienVanChuyen={setDuKienVanChuyen}
                duKienLapDat={duKienLapDat}
                setDuKienLapDat={setDuKienLapDat}
                soNhanSuLapDat={soNhanSuLapDat}
                setSoNhanSuLapDat={setSoNhanSuLapDat}
              />
            )}

          </div>

          {/* 4. Fixed Footer Buttons */}
          <div className="px-6 py-3.5 border-t border-slate-100 bg-white flex items-center justify-end gap-3 select-none shrink-0 shadow-2xs">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting !== null}
              className="px-5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs disabled:opacity-40"
            >
              Hủy
            </button>

            <button
              type="button"
              disabled={isSubmitting !== null}
              onClick={() => handleSave('Bản nháp')}
              className="px-5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs disabled:opacity-50 flex items-center gap-1.5"
            >
              {isSubmitting === 'draft' && <IconLoader2 size={14} className="animate-spin text-slate-600" />}
              <span>{isSubmitting === 'draft' ? 'Đang lưu...' : 'Lưu nháp'}</span>
            </button>

            <button
              type="button"
              disabled={isSubmitting !== null}
              onClick={() => handleSave('Chờ QL KD duyệt')}
              className="px-6 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs disabled:opacity-50 flex items-center gap-1.5"
            >
              {isSubmitting === 'submit' && <IconLoader2 size={14} className="animate-spin text-white" />}
              <span>{isSubmitting === 'submit' ? 'Đang gửi...' : 'Gửi duyệt'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
