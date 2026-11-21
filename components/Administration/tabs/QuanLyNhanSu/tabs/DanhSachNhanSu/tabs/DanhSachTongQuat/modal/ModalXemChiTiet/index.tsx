"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconPrinter,
  IconId,
  IconPhone,
  IconBriefcase,
  IconSchool,
  IconListDetails,
  IconLoader2,
} from '@tabler/icons-react';
import { NhanSuItem } from '../../index';
import { getStaffDetail } from '@/api/apiGetStaffList';

interface ModalXemChiTietProps {
  isOpen: boolean;
  item: NhanSuItem | null;
  onClose: () => void;
}

export default function ModalXemChiTiet({ isOpen, item, onClose }: ModalXemChiTietProps) {
  const [detailData, setDetailData] = useState<NhanSuItem | null>(item);
  const [loading, setLoading] = useState<boolean>(false);

  // Call API to fetch full staff details when modal opens
  useEffect(() => {
    if (isOpen && item) {
      setDetailData(item);
      let isMounted = true;

      const fetchDetail = async () => {
        if (!item.id) return;
        try {
          setLoading(true);
          const res = await getStaffDetail(item.id);
          if (isMounted && res) {
            setDetailData({ ...item, ...res });
          }
        } catch (err) {
          console.warn("Không thể tải chi tiết nhân sự từ API:", err);
        } finally {
          if (isMounted) setLoading(false);
        }
      };

      fetchDetail();

      return () => {
        isMounted = false;
      };
    }
  }, [isOpen, item]);

  if (!isOpen || !detailData) return null;

  const current = detailData;

  // ── Handle Print in dedicated new tab with document template ──
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    const todayStr = new Date().toLocaleDateString('vi-VN');

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="utf-8" />
        <title>Hồ sơ - ${current.hoTen || 'Nhân sự'}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 8mm 12mm 8mm 12mm;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #334155;
            font-size: 9.5px;
            line-height: 1.3;
            margin: 0;
            padding: 0;
            background: #fff;
          }

          /* Header Top */
          .header-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 2px;
          }
          .company-name {
            font-size: 13px;
            font-weight: 700;
            color: #406c89;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          .doc-sub {
            font-size: 9px;
            color: #64748b;
            text-transform: uppercase;
            font-weight: 600;
            margin-top: 1px;
          }
          .print-date {
            font-size: 9px;
            color: #64748b;
          }

          /* Underline line */
          .hero-divider {
            height: 2px;
            background-color: #406c89;
            margin: 4px 0 8px 0;
          }

          /* Profile Hero */
          .person-name {
            font-size: 16px;
            font-weight: 600;
            color: #406c89;
            margin: 0 0 2px 0;
          }
          .person-sub {
            font-size: 10px;
            color: #64748b;
            margin-bottom: 6px;
          }

          /* Pill Badges */
          .badges-row {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
            margin-bottom: 8px;
          }
          .badge-pill {
            display: inline-flex;
            align-items: center;
            padding: 1.5px 8px;
            border-radius: 12px;
            font-size: 9px;
            font-weight: 500;
            border: 1px solid #406c89;
            color: #406c89;
            background-color: #fff;
          }

          /* Section Header Bar (#406c89 with white text) */
          .section-bar {
            background-color: #406c89;
            color: #ffffff;
            font-size: 9.5px;
            font-weight: 700;
            padding: 3.5px 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 6px;
            border: 1px solid #406c89;
            border-bottom: none;
          }

          /* Bordered Data Table */
          table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 0px;
          }
          table.data-table tr {
            page-break-inside: avoid;
          }
          table.data-table td, table.data-table th {
            border: 1px solid #cbd5e1;
            padding: 2.8px 8px;
            font-size: 9px;
            vertical-align: middle;
          }
          table.data-table th {
            background-color: #f8fafc;
            color: #334155;
            font-weight: 600;
            text-align: left;
          }
          table.data-table td.col-label {
            width: 32%;
            color: #334155;
            font-weight: 500;
            background-color: #fff;
          }
          table.data-table td.col-val {
            width: 68%;
            color: #0f172a;
            font-weight: 500;
            background-color: #fff;
          }

          /* Signatures */
          .signature-section {
            display: flex;
            justify-content: space-between;
            margin-top: 18px;
            padding: 0 50px;
            page-break-inside: avoid;
          }
          .signature-box {
            text-align: center;
          }
          .sig-title {
            font-weight: 700;
            font-size: 10.5px;
            color: #0f172a;
          }
          .sig-sub {
            font-size: 9px;
            font-style: italic;
            color: #64748b;
            margin-top: 1px;
          }
        </style>
      </head>
      <body>

        <!-- Header: MÔ HÌNH VIỆT & In ngày -->
        <div class="header-top">
          <div>
            <div class="company-name">MÔ HÌNH VIỆT</div>
            <div class="doc-sub">HỒ SƠ NHÂN SỰ CHI TIẾT</div>
          </div>
          <div class="print-date">
            In ngày ${todayStr}
          </div>
        </div>

        <div class="hero-divider"></div>

        <!-- Họ và tên & Chức danh -->
        <div class="person-name">${current.hoTen || 'Vũ Quang Trung'}</div>
        <div class="person-sub">
          ${current.maNV || 'NV014'} • ${current.chucVu || 'Lái xe'} - ${current.phongBan || 'Khối Văn phòng'} • ${current.trangThai || 'Đang làm việc'}
        </div>

        <!-- 4 Badges hình viên thuốc viền #406c89 mỏng -->
        <div class="badges-row">
          <span class="badge-pill">Thâm niên: ${current.thamNien || '3 năm 6 tháng'}</span>
          <span class="badge-pill">Bậc lương: ${current.bacLuong || 'Bậc 3'}</span>
          <span class="badge-pill">Lương hiện tại: ${current.mucLuongHienTai ? current.mucLuongHienTai.toLocaleString('vi-VN') : '8.500.000'} đ</span>
          <span class="badge-pill">${current.trangThaiHoSo || 'Thiếu hồ sơ'}</span>
        </div>

        <!-- 1. THÔNG TIN CHUNG -->
        <div class="section-bar">THÔNG TIN CHUNG</div>
        <table class="data-table">
          <tr>
            <td class="col-label">Mã nhân viên</td>
            <td class="col-val">${current.maNV || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Họ và tên</td>
            <td class="col-val">${current.hoTen || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Phòng ban</td>
            <td class="col-val">${current.phongBan || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Chức vụ</td>
            <td class="col-val">${current.chucVu || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Trạng thái</td>
            <td class="col-val">${current.trangThai || 'Đang làm việc'}</td>
          </tr>
          <tr>
            <td class="col-label">Giới tính</td>
            <td class="col-val">${current.gioiTinh || 'Nam'}</td>
          </tr>
          <tr>
            <td class="col-label">Ngày sinh</td>
            <td class="col-val">${current.ngaySinh || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Tình trạng hôn nhân</td>
            <td class="col-val">${current.tinhTrangHonNhan || 'Đã lập gia đình'}</td>
          </tr>
          <tr>
            <td class="col-label">Chiều cao (cm)</td>
            <td class="col-val">${current.chieuCao || (current.chieuCaoCanNang ? current.chieuCaoCanNang.split('•')[0]?.replace('cm', '').trim() : '165')}</td>
          </tr>
          <tr>
            <td class="col-label">Cân nặng (kg)</td>
            <td class="col-val">${current.canNang || (current.chieuCaoCanNang ? current.chieuCaoCanNang.split('•')[1]?.replace('kg', '').trim() : '61.8')}</td>
          </tr>
          <tr>
            <td class="col-label">Nick / tên thường dùng</td>
            <td class="col-val">${current.tenThuongDung || current.hoTen || '—'}</td>
          </tr>
        </table>

        <!-- 2. LIÊN HỆ -->
        <div class="section-bar">LIÊN HỆ</div>
        <table class="data-table">
          <tr>
            <td class="col-label">Điện thoại</td>
            <td class="col-val">${current.dienThoai || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Email</td>
            <td class="col-val">${current.email || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Facebook</td>
            <td class="col-val">${current.facebook || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Địa chỉ đang ở</td>
            <td class="col-val">${current.diaChiHienTai || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Địa chỉ hộ khẩu</td>
            <td class="col-val">${current.diaChiHoKhau || '—'}</td>
          </tr>
        </table>

        <!-- 3. GIẤY TỜ TÙY THÂN -->
        <div class="section-bar">GIẤY TỜ TÙY THÂN</div>
        <table class="data-table">
          <tr>
            <td class="col-label">Số CMT/CCCD</td>
            <td class="col-val">${current.soCCCD || current.cccd || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Ngày cấp CMT/CCCD</td>
            <td class="col-val">${current.ngayCapCCCD || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Nơi cấp CMT/CCCD</td>
            <td class="col-val">${current.noiCapCCCD || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Mã số thuế</td>
            <td class="col-val">${current.mstCaNhan || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Số sổ BHXH</td>
            <td class="col-val">${current.soBHXH || '—'}</td>
          </tr>
        </table>

        <!-- 4. GIA ĐÌNH & NGƯỜI PHỤ THUỘC -->
        <div class="section-bar">GIA ĐÌNH & NGƯỜI PHỤ THUỘC</div>
        <table class="data-table">
          <tr>
            <td class="col-label">Người thân (họ tên, quan hệ)</td>
            <td class="col-val">—</td>
          </tr>
          <tr>
            <td class="col-label">SĐT người thân</td>
            <td class="col-val">—</td>
          </tr>
          <tr>
            <td class="col-label">Số CMT/CCCD vợ/chồng</td>
            <td class="col-val">—</td>
          </tr>
          <tr>
            <td class="col-label">Ngày cấp CMT/CCCD vợ/chồng</td>
            <td class="col-val">—</td>
          </tr>
          <tr>
            <td class="col-label">Nơi cấp CMT/CCCD vợ/chồng</td>
            <td class="col-val">—</td>
          </tr>
          <tr>
            <td class="col-label">Con (họ tên – ngày sinh)</td>
            <td class="col-val">—</td>
          </tr>
          <tr>
            <td class="col-label">Số con</td>
            <td class="col-val">0</td>
          </tr>
        </table>

        <!-- 5. HỌC VẤN & TUYỂN DỤNG -->
        <div class="section-bar">HỌC VẤN & TUYỂN DỤNG</div>
        <table class="data-table">
          <tr>
            <td class="col-label">Trường học</td>
            <td class="col-val">${current.truongHoc || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Chuyên ngành</td>
            <td class="col-val">${current.chuyenNganh || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Bằng cấp / Trình độ chuyên môn</td>
            <td class="col-val">${current.bangCapTrinhDo || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Nguồn tuyển dụng</td>
            <td class="col-val">${current.nguonTuyenDung || '—'}</td>
          </tr>
        </table>

        <!-- 6. CÔNG VIỆC & THÂM NIÊN -->
        <div class="section-bar">CÔNG VIỆC & THÂM NIÊN</div>
        <table class="data-table">
          <tr>
            <td class="col-label">Ngày vào (thử việc)</td>
            <td class="col-val">${current.ngayVao || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Ngày bắt đầu chính thức</td>
            <td class="col-val">${current.ngayChinhThuc || current.ngayVao || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Ngày bắt đầu nghỉ việc</td>
            <td class="col-val">${current.ngayBatDauNghi || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Thâm niên</td>
            <td class="col-val">${current.thamNien || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Tình trạng hồ sơ giấy tờ</td>
            <td class="col-val">${current.trangThaiHoSo || 'Thiếu hồ sơ'}</td>
          </tr>
        </table>

        <!-- 7. LƯƠNG & THU NHẬP -->
        <div class="section-bar">LƯƠNG & THU NHẬP</div>
        <table class="data-table">
          <tr>
            <td class="col-label">Bậc lương hiện tại</td>
            <td class="col-val">${current.bacLuong || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Mức lương hiện tại</td>
            <td class="col-val">${current.mucLuongHienTai ? current.mucLuongHienTai.toLocaleString('vi-VN') : '0'} đ</td>
          </tr>
          <tr>
            <td class="col-label">Mức lương cứng</td>
            <td class="col-val">${current.mucLuongCung ? current.mucLuongCung.toLocaleString('vi-VN') : '0'} đ</td>
          </tr>
          <tr>
            <td class="col-label">Mức lương mềm</td>
            <td class="col-val">${current.mucLuongMem ? current.mucLuongMem.toLocaleString('vi-VN') : '0'} đ</td>
          </tr>
          <tr>
            <td class="col-label">Tổng mức lương cơ bản</td>
            <td class="col-val">0 đ</td>
          </tr>
          <tr>
            <td class="col-label">Tổng trợ cấp</td>
            <td class="col-val">${current.tongTroCap ? current.tongTroCap.toLocaleString('vi-VN') : '0'} đ</td>
          </tr>
          <tr>
            <td class="col-label">Thời điểm điều chỉnh bậc lương</td>
            <td class="col-val">${current.thoiDiemTangLuong || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Thời điểm tăng bậc dự kiến</td>
            <td class="col-val">${current.thoiDiemTangBacBacLuongDuKien || '—'}</td>
          </tr>
          <tr>
            <td class="col-label">Ghi chú lương</td>
            <td class="col-val">${current.ghiChuLuong || '—'}</td>
          </tr>
        </table>

        <!-- 8. DỮ LIỆU BỔ SUNG -->
        <div class="section-bar">DỮ LIỆU BỔ SUNG</div>
        <table class="data-table">
          <tr>
            <td class="col-label" style="width: 32%;">STT</td>
            <td class="col-val" style="width: 68%;">${current.sttBoSung || '1'}</td>
          </tr>
        </table>

        <!-- CHỮ KÝ (Người lao động - Phòng Nhân sự) -->
        <div class="signature-section">
          <div class="signature-box">
            <div class="sig-title">Người lao động</div>
            <div class="sig-sub">(Ký, ghi rõ họ tên)</div>
          </div>
          <div class="signature-box">
            <div class="sig-title">Phòng Nhân sự</div>
            <div class="sig-sub">(Ký, ghi rõ họ tên)</div>
          </div>
        </div>

      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Trigger Print dialog once DOM is ready
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
        
        {/* ── 1. Header Bar: Tiêu đề "Hồ sơ nhân sự" và nút Đóng ── */}
        <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-800 tracking-tight">Hồ sơ nhân sự</h2>
            {loading && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-500 font-medium">
                <IconLoader2 size={13} className="animate-spin text-[#ba8e3a]" />
                <span>Đang đồng bộ...</span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* ── Scrollable Content Container ── */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto no-scrollbar flex-1 bg-white text-xs">
          
          {/* ── 2. Top Profile Hero Card (#406c89 tone) ── */}
          <div className="bg-[#406c89] text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              {/* Avatar Circle */}
              <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-inner">
                {current.hoTen ? current.hoTen.slice(0, 1).toUpperCase() : 'N'}
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  {current.hoTen || '—'}
                </h3>
                <p className="text-xs text-white/80 font-medium mt-0.5">
                  {current.maNV || '—'} • {current.chucVu || '—'} - {current.phongBan || '—'}
                </p>
                {/* Badges / Pill Tags */}
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 text-white border border-white/25">
                    {current.trangThai || 'Đang làm việc'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#ba8e3a] text-white shadow-2xs">
                    Thâm niên {current.thamNien || '—'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 text-white border border-white/25 font-mono">
                    {current.bacLuong || '—'} - {current.mucLuongHienTai ? current.mucLuongHienTai.toLocaleString('vi-VN') : '0'} đ
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-500/30 text-white border border-rose-300/40">
                    {current.trangThaiHoSo || 'Thiếu hồ sơ'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions (Print) */}
            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
              <button
                type="button"
                onClick={handlePrint}
                title="In hồ sơ"
                className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              >
                <IconPrinter size={16} />
              </button>
            </div>
          </div>

          {/* ── 3. Grid of Information Cards (Row 1: THÔNG TIN CÁ NHÂN & LIÊN HỆ) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* THÔNG TIN CÁ NHÂN */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div className="px-4 py-2.5 bg-[#406c89] text-white flex items-center gap-2 font-bold text-xs">
                <IconId size={16} className="text-white/80" />
                <span>THÔNG TIN CÁ NHÂN</span>
              </div>
              <div className="p-4 space-y-3.5 text-xs text-slate-800">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Mã nhân viên</span>
                    <span className="font-semibold text-slate-700 font-mono">{current.maNV || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Họ và tên</span>
                    <span className="font-bold text-slate-900">{current.hoTen || '—'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Giới tính</span>
                    <span className="font-medium text-slate-700">{current.gioiTinh || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Ngày sinh</span>
                    <span className="font-medium text-slate-700 font-mono">{current.ngaySinh || '—'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Tình trạng hôn nhân</span>
                    <span className="font-medium text-slate-700">{current.tinhTrangHonNhan || 'Đã lập gia đình'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Chiều cao / Cân nặng</span>
                    <span className="font-medium text-slate-700">{current.chieuCaoCanNang || '165 cm • 61.8 kg'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Nick / Tên thường dùng</span>
                    <span className="font-medium text-slate-700">{current.tenThuongDung || current.hoTen || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Ghi chú</span>
                    <span className="font-medium text-slate-700">
                      {current.ghiChu || (current.ngayVao ? `Đi làm từ ngày ${current.ngayVao}` : '—')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* LIÊN HỆ */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div className="px-4 py-2.5 bg-[#406c89] text-white flex items-center gap-2 font-bold text-xs">
                <IconPhone size={16} className="text-white/80" />
                <span>LIÊN HỆ</span>
              </div>
              <div className="p-4 space-y-3.5 text-xs text-slate-800">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Điện thoại</span>
                    <span className="font-semibold text-slate-800 font-mono">{current.dienThoai || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Email</span>
                    <span className="font-medium text-slate-700">{current.email || '—'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Facebook</span>
                  {current.facebook && current.facebook !== '—' ? (
                    <a
                      href={current.facebook.startsWith('http') ? current.facebook : `https://${current.facebook}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-blue-600 hover:underline break-all"
                    >
                      {current.facebook}
                    </a>
                  ) : (
                    <span className="font-medium text-slate-500">—</span>
                  )}
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Địa chỉ đang ở</span>
                  <span className="font-medium text-slate-700 leading-relaxed block">
                    {current.diaChiHienTai || '—'}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Địa chỉ hộ khẩu</span>
                  <span className="font-medium text-slate-700">{current.diaChiHoKhau || '—'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 4. Grid of Information Cards (Row 2: CÔNG TÁC & HỌC VẤN & TUYỂN DỤNG) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* CÔNG TÁC */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div className="px-4 py-2.5 bg-[#406c89] text-white flex items-center gap-2 font-bold text-xs">
                <IconBriefcase size={16} className="text-white/80" />
                <span>CÔNG TÁC</span>
              </div>
              <div className="p-4 space-y-3.5 text-xs text-slate-800">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Phòng ban</span>
                    <span className="font-medium text-slate-800">{current.phongBan || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Chức vụ</span>
                    <span className="font-medium text-slate-800">{current.chucVu || '—'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Trạng thái</span>
                    <span className="font-medium text-slate-800">{current.trangThai || 'Đang làm việc'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Thâm niên</span>
                    <span className="font-medium text-slate-800">{current.thamNien || '—'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Ngày vào (thử việc)</span>
                    <span className="font-medium text-slate-800 font-mono">{current.ngayVao || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Ngày chính thức</span>
                    <span className="font-medium text-slate-800 font-mono">{current.ngayChinhThuc || current.ngayVao || '—'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Ngày bắt đầu nghỉ</span>
                  <span className="font-medium text-slate-700">{current.ngayBatDauNghi || '—'}</span>
                </div>
              </div>
            </div>

            {/* HỌC VẤN & TUYỂN DỤNG */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div className="px-4 py-2.5 bg-[#406c89] text-white flex items-center gap-2 font-bold text-xs">
                <IconSchool size={16} className="text-white/80" />
                <span>HỌC VẤN & TUYỂN DỤNG</span>
              </div>
              <div className="p-4 space-y-3.5 text-xs text-slate-800">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Trường học</span>
                    <span className="font-medium text-slate-800">{current.truongHoc || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Chuyên ngành</span>
                    <span className="font-medium text-slate-800">{current.chuyenNganh || '—'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Bằng cấp / Trình độ</span>
                    <span className="font-medium text-slate-800">{current.bangCapTrinhDo || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-0.5">Nguồn tuyển dụng</span>
                    <span className="font-medium text-slate-700">{current.nguonTuyenDung || '—'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 5. CỘT DỮ LIỆU BỔ SUNG ── */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <div className="px-4 py-2.5 bg-[#406c89] text-white flex items-center gap-2 font-bold text-xs">
              <IconListDetails size={16} className="text-white/80" />
              <span>CỘT DỮ LIỆU BỔ SUNG</span>
            </div>
            <div className="p-4 text-xs text-slate-800">
              <span className="text-[11px] text-slate-400 font-medium block uppercase tracking-wider mb-1">STT</span>
              <span className="font-medium text-slate-800">{current.sttBoSung || '1'}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
