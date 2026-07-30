"use client";

import React, { useState } from 'react';
import {
  IconX,
  IconPencil,
  IconRefresh,
  IconStack2,
  IconRuler2,
  IconFileText,
  IconMapPin,
  IconCalendar,
  IconFlag,
  IconTruck,
  IconHammer,
  IconClock,
  IconUsers,
  IconChevronUp
} from '@tabler/icons-react';
import { DuAnItem } from '../../index';

interface YeuCauSanXuatModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: DuAnItem;
}

export default function YeuCauSanXuatModal({ isOpen, onClose, project }: YeuCauSanXuatModalProps) {
  const [isTienDoOpen, setIsTienDoOpen] = useState(true);
  const [isYcKyThuatOpen, setIsYcKyThuatOpen] = useState(true);
  const [isNghiemThu1Open, setIsNghiemThu1Open] = useState(true);
  const [isHoSoKhaiTrienOpen, setIsHoSoKhaiTrienOpen] = useState(true);

  if (!isOpen) return null;

  const tenDuAn = project?.tenDuAn || 'VSIP LẠNG SƠN';
  const maDuAn = project?.maDuAn || '21-2026/DA-MHV';
  const khachHang = project?.khachHang || 'VSIP Lạng Sơn';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] text-left select-none animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL TOP CLOSE BUTTON */}
        <div className="flex items-center justify-between px-6 pt-4 shrink-0">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
            Chi tiết Yêu cầu sản xuất
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-6 py-4 space-y-5 text-xs">
          
          {/* SECTION 1: HEADER CARD */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-3 relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">
                  YÊU CẦU SẢN XUẤT MÔ HÌNH
                </span>
                <h2 className="text-2xl font-extrabold text-[#2b357e] tracking-tight mt-0.5">
                  {tenDuAn}
                </h2>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  {maDuAn} | KH: {khachHang}
                </p>
              </div>

              {/* Status Badge */}
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#dcfce7] text-[#15803d] shadow-2xs shrink-0">
                PGĐ đã duyệt
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold cursor-pointer transition-all shadow-2xs"
              >
                <IconPencil size={15} />
                <span>Chỉnh sửa</span>
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#fde68a] bg-[#fffbeb] text-[#d97706] hover:bg-[#fff9e6] text-xs font-bold cursor-pointer transition-all shadow-2xs"
              >
                <IconRefresh size={15} />
                <span>Trả lại điều chỉnh</span>
              </button>
            </div>
          </div>

          {/* SECTION 2: QUY TRÌNH PHÊ DUYỆT */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-[#406c89] uppercase tracking-wider">
              QUY TRÌNH PHÊ DUYỆT
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Step 1: NGƯỜI LẬP */}
              <div className="bg-[#fffdf0] border border-[#fef3c7] rounded-xl p-4 text-center space-y-1.5">
                <span className="text-[11px] font-bold text-[#a16207] block uppercase tracking-wide">
                  NGƯỜI LẬP
                </span>
                <span className="font-extrabold text-slate-500 text-sm block">—</span>
              </div>

              {/* Step 2: QL KINH DOANH */}
              <div className="bg-[#f0f4ff] border border-[#dbe4ff] rounded-xl p-4 text-center space-y-1">
                <span className="text-[11px] font-bold text-[#406c89] block uppercase tracking-wide">
                  QL KINH DOANH
                </span>
                <h4 className="font-bold text-[#2b357e] text-xs">Thảo Phùng</h4>
                <span className="text-[11px] text-slate-400 font-mono block">2026-07-07</span>
              </div>

              {/* Step 3: PHÓ GIÁM ĐỐC */}
              <div className="bg-[#dcfce7] border border-[#86efac] rounded-xl p-4 text-center space-y-1">
                <span className="text-[11px] font-bold text-[#15803d] block uppercase tracking-wide">
                  PHÓ GIÁM ĐỐC
                </span>
                <h4 className="font-bold text-[#15803d] text-xs">Thảo Phùng</h4>
                <span className="text-[11px] text-[#15803d] font-mono block">2026-07-07</span>
              </div>
            </div>
          </div>

          {/* SECTION 3: BAN GIÁM ĐỐC BAN HÀNH BANNER */}
          <div className="bg-[#f5f7ff] border border-[#e2e8ff] rounded-2xl p-5 shadow-2xs relative space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                  BAN GIÁM ĐỐC CÔNG TY TNHH MÔ HÌNH VIỆT
                </span>
                <span className="text-xs text-slate-500 font-medium block mt-0.5 mb-1.5">
                  yêu cầu các phòng sản xuất mô hình dự án sau:
                </span>
                <h3 className="text-xl font-extrabold text-[#2b357e]">
                  {tenDuAn}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  {maDuAn} | KH: {khachHang}
                </p>
              </div>

              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#dcfce7] text-[#15803d] shadow-2xs shrink-0">
                PGĐ đã duyệt
              </span>
            </div>
          </div>

          {/* SECTION 4: SPECIFICATIONS 4-COLUMN GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Spec 1: Tỷ lệ */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
              <div className="p-2 rounded-lg bg-slate-50 text-[#406c89] border border-slate-100 shrink-0">
                <IconStack2 size={20} />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block">Tỷ lệ</span>
                <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{project?.tyLe || '1/1000'}</span>
              </div>
            </div>

            {/* Spec 2: Kích thước */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
              <div className="p-2 rounded-lg bg-slate-50 text-[#406c89] border border-slate-100 shrink-0">
                <IconRuler2 size={20} />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block">Kích thước</span>
                <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{project?.kichThuoc || '16.3m2'}</span>
              </div>
            </div>

            {/* Spec 3: Cấp độ */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
              <div className="p-2 rounded-lg bg-slate-50 text-[#406c89] border border-slate-100 shrink-0">
                <IconFileText size={20} />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block">Cấp độ</span>
                <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{project?.capDoDuAn || 'V+'}</span>
              </div>
            </div>

            {/* Spec 4: Lắp đặt tại */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
              <div className="p-2 rounded-lg bg-slate-50 text-[#406c89] border border-slate-100 shrink-0">
                <IconMapPin size={20} />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block">Lắp đặt tại</span>
                <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{project?.diaDiemLapDat || 'Lạng Sơn'}</span>
              </div>
            </div>
          </div>

          {/* SECTION 5: TIẾN ĐỘ SECTION */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
            <div
              onClick={() => setIsTienDoOpen(!isTienDoOpen)}
              className="flex items-center justify-between cursor-pointer"
            >
              <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">Tiến độ</h3>
              <IconChevronUp
                size={18}
                className={`text-slate-500 transition-transform duration-200 ${!isTienDoOpen ? 'rotate-180' : ''}`}
              />
            </div>

            {isTienDoOpen && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                {/* 1. THỜI GIAN BẮT ĐẦU */}
                <div className="bg-[#f0f4ff] border border-blue-100 rounded-xl p-3 flex items-center gap-3 relative overflow-hidden">
                  <div className="w-1 bg-blue-500 absolute left-0 top-0 bottom-0" />
                  <div className="p-2 rounded-lg bg-white/80 text-blue-600 shrink-0">
                    <IconCalendar size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      • THỜI GIAN BẮT ĐẦU
                    </span>
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      {project?.ngayBatDau ? project.ngayBatDau.split('-').reverse().join('/') : '16/06/2026'}
                    </span>
                  </div>
                </div>

                {/* 2. THỜI GIAN KẾT THÚC */}
                <div className="bg-[#fff1f2] border border-rose-100 rounded-xl p-3 flex items-center gap-3 relative overflow-hidden">
                  <div className="w-1 bg-rose-500 absolute left-0 top-0 bottom-0" />
                  <div className="p-2 rounded-lg bg-white/80 text-rose-600 shrink-0">
                    <IconCalendar size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      • THỜI GIAN KẾT THÚC
                    </span>
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      {project?.ngayKetThuc ? project.ngayKetThuc.split('-').reverse().join('/') : '13/07/2026'}
                    </span>
                  </div>
                </div>

                {/* 3. NGHIỆM THU LẦN 1 */}
                <div className="bg-[#fffdf0] border border-amber-100 rounded-xl p-3 flex items-center gap-3 relative overflow-hidden">
                  <div className="w-1 bg-amber-500 absolute left-0 top-0 bottom-0" />
                  <div className="p-2 rounded-lg bg-white/80 text-amber-600 shrink-0">
                    <IconFlag size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      • NGHIỆM THU LẦN 1
                    </span>
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      {project?.duKienNtLan1 || '04/07/2026'}
                    </span>
                  </div>
                </div>

                {/* 4. NGHIỆM THU CUỐI */}
                <div className="bg-[#f0fdf4] border border-emerald-100 rounded-xl p-3 flex items-center gap-3 relative overflow-hidden">
                  <div className="w-1 bg-emerald-500 absolute left-0 top-0 bottom-0" />
                  <div className="p-2 rounded-lg bg-white/80 text-emerald-600 shrink-0">
                    <IconFlag size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      • NGHIỆM THU CUỐI
                    </span>
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      {project?.duKienNtCuoi || '13/07/2026'}
                    </span>
                  </div>
                </div>

                {/* 5. DỰ KIẾN VẬN CHUYỂN */}
                <div className="bg-[#faf5ff] border border-purple-100 rounded-xl p-3 flex items-center gap-3 relative overflow-hidden">
                  <div className="w-1 bg-purple-500 absolute left-0 top-0 bottom-0" />
                  <div className="p-2 rounded-lg bg-white/80 text-purple-600 shrink-0">
                    <IconTruck size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      • DỰ KIẾN VẬN CHUYỂN
                    </span>
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      {project?.duKienVanChuyen || '14/07/2026'}
                    </span>
                  </div>
                </div>

                {/* 6. DỰ KIẾN LẮP ĐẶT */}
                <div className="bg-[#fff7ed] border border-orange-100 rounded-xl p-3 flex items-center gap-3 relative overflow-hidden">
                  <div className="w-1 bg-orange-500 absolute left-0 top-0 bottom-0" />
                  <div className="p-2 rounded-lg bg-white/80 text-orange-600 shrink-0">
                    <IconHammer size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      • DỰ KIẾN LẮP ĐẶT
                    </span>
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      {project?.duKienLapDat || '15/07/2026'}
                    </span>
                  </div>
                </div>

                {/* 7. TỔNG THỜI GIAN */}
                <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-3 flex items-center gap-3 relative overflow-hidden">
                  <div className="w-1 bg-indigo-500 absolute left-0 top-0 bottom-0" />
                  <div className="p-2 rounded-lg bg-white/80 text-indigo-600 shrink-0">
                    <IconClock size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      • TỔNG THỜI GIAN
                    </span>
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      27 ngày
                    </span>
                  </div>
                </div>

                {/* 8. NHÂN SỰ LẮP ĐẶT */}
                <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-3 flex items-center gap-3 relative overflow-hidden">
                  <div className="w-1 bg-[#406c89] absolute left-0 top-0 bottom-0" />
                  <div className="p-2 rounded-lg bg-white/80 text-[#406c89] shrink-0">
                    <IconUsers size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      • NHÂN SỰ LẮP ĐẶT
                    </span>
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      {project?.soNvLapDat || '8'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 6: YÊU CẦU KỸ THUẬT */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
            <div
              onClick={() => setIsYcKyThuatOpen(!isYcKyThuatOpen)}
              className="p-5 flex items-center justify-between cursor-pointer border-b border-slate-100"
            >
              <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">Yêu cầu kỹ thuật</h3>
              <IconChevronUp
                size={18}
                className={`text-slate-500 transition-transform duration-200 ${!isYcKyThuatOpen ? 'rotate-180' : ''}`}
              />
            </div>

            {isYcKyThuatOpen && (
              <div className="divide-y divide-slate-100 text-xs">
                {/* Row 1 */}
                <div className="flex flex-col md:flex-row bg-[#f8fafc] p-4 gap-2 md:gap-4">
                  <span className="font-semibold text-slate-500 w-48 shrink-0">Khung sắt & mặt bảng:</span>
                  <div className="text-slate-800 space-y-1 font-medium">
                    <p>- Khung làm từ kim loại 20×40, dày 1.2 mm.</p>
                    <p>- Mặt bảng bằng gỗ MDF xanh dày 12 mm.</p>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col md:flex-row bg-white p-4 gap-2 md:gap-4">
                  <span className="font-semibold text-slate-500 w-48 shrink-0">Chân mô hình:</span>
                  <div className="text-slate-800 space-y-1 font-medium">
                    <p>- Bo khung bảng được sản xuất theo bản vẽ thiết kế, có chiều cao 200-400mm, sử dụng gỗ công nghiệp bọc tấm Laminate theo thiết kế và màu sắc lựa chọn.</p>
                    <p>- Bánh xe tăng chỉnh, chịu lực.</p>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex flex-col md:flex-row bg-[#f8fafc] p-4 gap-2 md:gap-4">
                  <span className="font-semibold text-slate-500 w-48 shrink-0">Công trình:</span>
                  <div className="text-slate-800 font-medium">
                    <p>- Công trình được khai triển từ bản vẽ kiến trúc. Sau đó được cắt bằng máy cắt Laser, ghép và sơn hoàn thiện.</p>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="flex flex-col md:flex-row bg-white p-4 gap-2 md:gap-4">
                  <span className="font-semibold text-slate-500 w-48 shrink-0">Nội thất:</span>
                  <div className="text-slate-800 font-medium">
                    <p>Không</p>
                  </div>
                </div>

                {/* Row 5 */}
                <div className="flex flex-col md:flex-row bg-[#f8fafc] p-4 gap-2 md:gap-4">
                  <span className="font-semibold text-slate-500 w-48 shrink-0">Nền & cảnh quan:</span>
                  <div className="text-slate-800 space-y-1 font-medium">
                    <p>- Phần nền mô hình: được khai triển từ bản vẽ kiến trúc. Sau đó được cắt bằng máy cắt Laser, ghép và sơn hoàn thiện để thể hiện chi tiết nền cảnh quan bao gồm đường, vỉa hè, tim đường, nét phân làn, làn đường đi bộ, biển tên đường và các chi tiết phụ trợ khác.</p>
                    <p>- Cảnh quan mô hình: Vật liệu cỏ, cây, trang trí cảnh quan được sản xuất trực tiếp tại Mô hình Việt theo từng đơn hàng riêng biệt.</p>
                  </div>
                </div>

                {/* Row 6 */}
                <div className="flex flex-col md:flex-row bg-white p-4 gap-2 md:gap-4">
                  <span className="font-semibold text-slate-500 w-48 shrink-0">Hệ thống ánh sáng:</span>
                  <div className="text-slate-800 space-y-1 font-medium">
                    <p>- Phần ánh sáng công trình: sử dụng hệ thống đèn LED siêu sáng đặt vào phía trong công trình</p>
                    <p>- Phần ánh sáng nền và cảnh quan bao gồm: Đèn đường, đèn giao thông phân nhánh tín hiệu, đèn trang trí sân vườn</p>
                    <p>- Hệ thống ánh sáng được tích hợp với một bộ hẹn giờ tự động để bật / tắt ánh sáng trong khoảng thời gian từ 1 đến 2 tiếng để đảm bảo bảo vệ hệ thống luôn được duy trì ổn định dù người sử dụng có quên tắt trước khi ra về.</p>
                  </div>
                </div>

                {/* Row 7 */}
                <div className="flex flex-col md:flex-row bg-[#f8fafc] p-4 gap-2 md:gap-4">
                  <span className="font-semibold text-slate-500 w-48 shrink-0">Yêu cầu đặc biệt AS:</span>
                  <div className="text-slate-800 font-medium">
                    <p>Không có</p>
                  </div>
                </div>

                {/* Row 8 */}
                <div className="flex flex-col md:flex-row bg-white p-4 gap-2 md:gap-4">
                  <span className="font-semibold text-slate-500 w-48 shrink-0">Kính bảo vệ:</span>
                  <div className="text-slate-800 font-medium">
                    <p>Kính Việt Nhật 10mm - 12mm có hệ khung cao 900mm và tay vịn Inox (tay vịn ngoài thấp hơn kính) thể hiện theo bản vẽ thiết kế sẽ gửi tới khách hàng trong giai đoạn triển khai</p>
                  </div>
                </div>

                {/* Row 9 */}
                <div className="flex flex-col md:flex-row bg-[#f8fafc] p-4 gap-2 md:gap-4">
                  <span className="font-semibold text-slate-500 w-48 shrink-0">Hộp vận chuyển:</span>
                  <div className="text-slate-800 font-medium">
                    <p>Đi xe nguyên chuyến</p>
                  </div>
                </div>

                {/* Row 10 */}
                <div className="flex flex-col md:flex-row bg-white p-4 gap-2 md:gap-4">
                  <span className="font-semibold text-slate-500 w-48 shrink-0">Yêu cầu khác:</span>
                  <div className="text-slate-800 font-medium">
                    <p>Đảm bảo thời gian tiến độ dự án vì Khách hàng cần cho sự kiện đặc biệt</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 7: KHỐI LƯỢNG NGHIỆM THU LẦN 1 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-3">
            <div
              onClick={() => setIsNghiemThu1Open(!isNghiemThu1Open)}
              className="flex items-center justify-between cursor-pointer"
            >
              <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">Khối lượng nghiệm thu lần 1</h3>
              <IconChevronUp
                size={18}
                className={`text-slate-500 transition-transform duration-200 ${!isNghiemThu1Open ? 'rotate-180' : ''}`}
              />
            </div>

            {isNghiemThu1Open && (
              <div className="text-xs text-slate-700 leading-relaxed space-y-2 pt-1 font-medium">
                <p>- Hoàn thành 90% phần nền: sơn đường, vỉa hè, đường đi bộ; đã dán đường, vỉa hè.</p>
                <p>- Hoàn thành 90% khối lượng công trình: Sơn, ghép lên khối bao gồm cốt, tường, đế, kính và đang dán các chi tiết công trình như đố kính, lan can, ban công.</p>
                <p>- Hoàn thành 90% phần trang trí cảnh quan: bao gồm chuẩn bị đầy đủ nguyên, phụ liệu trang trí cảnh quan, đã trồng cây tuyến đường và một phần trang trí cây hoa cảnh quan.</p>
                <p>- Hoàn thành 90% phần khung, chân mô hình: đã xong phần thiết kế, ghép thô, lên khung.</p>
                <p>- Hoàn thành 80% hệ thống ánh sáng: chuẩn bị đủ sản phẩm điện cho toàn bộ mô hình, đã hoàn thành điện phần nền bao gồm: giao thông, đèn tín hiệu giao thông (nếu có), đèn trang trí cảnh quan (30%) và 30% phần đèn công trình.</p>
              </div>
            )}
          </div>

          {/* SECTION 8: BỘ HỒ SƠ XÁC NHẬN KHAI TRIỂN */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-3">
            <div
              onClick={() => setIsHoSoKhaiTrienOpen(!isHoSoKhaiTrienOpen)}
              className="flex items-center justify-between cursor-pointer"
            >
              <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">Bộ hồ sơ xác nhận khai triển</h3>
              <IconChevronUp
                size={18}
                className={`text-slate-500 transition-transform duration-200 ${!isHoSoKhaiTrienOpen ? 'rotate-180' : ''}`}
              />
            </div>

            {isHoSoKhaiTrienOpen && (
              <div className="bg-[#f0f4ff] border border-[#dbe4ff] rounded-xl p-4 text-xs font-semibold text-slate-800 space-y-1.5">
                <p>• Khung Tổng mặt bằng của mô hình.</p>
                <p>• Bản vẽ thiết kế Khung của mô hình.</p>
                <p>• Bản vẽ mặt bằng, mặt đứng của Công trình (Đối với các hạng mục mô hình công trình)</p>
                <p>• Bảng mã màu sắc của công trình.</p>
              </div>
            )}
          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="bg-[#f8fafc] border-t border-slate-200 px-6 py-3.5 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
