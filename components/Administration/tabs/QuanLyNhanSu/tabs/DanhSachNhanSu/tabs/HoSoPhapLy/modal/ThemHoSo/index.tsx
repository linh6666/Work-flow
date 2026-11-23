"use client";

import React, { useState, useMemo } from 'react';
import { IconX, IconLoader2, IconCalendar, IconChevronDown } from '@tabler/icons-react';
import { HoSoPhapLyItem } from '../../index';
import { createHoSoPhapLy } from '@/api/apiGetHoSoPhapLy';

export interface ModalThemHoSoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Danh sách các giấy tờ cần theo dõi
const HO_SO_DOCS = [
  { key: 'soYeuLyLich', label: 'SƠ YẾU LÝ LỊCH' },
  { key: 'cmtCccd', label: 'CMT/CCCD' },
  { key: 'hoKhau', label: 'HỘ KHẨU' },
  { key: 'khaiSinh', label: 'KHAI SINH' },
  { key: 'khamSucKhoe', label: 'KHÁM SỨC KHỎE' },
  { key: 'bangGcn', label: 'BẰNG / GCN' },
  { key: 'theSv', label: 'THẺ SV' },
  { key: 'anhCmt', label: 'ẢNH CMT' },
];

export default function ModalThemHoSo({
  isOpen,
  onClose,
  onSuccess,
}: ModalThemHoSoProps) {
  // Form fields
  const [formData, setFormData] = useState({
    hoTen: '',
    phongBan: 'Ban Giám đốc',
    trangThaiLamViec: 'Đang làm việc',
    bacLuong: 'Chưa xếp bậc - — đ',
    soCCCD: '',
    ngayCapCCCD: '',
    noiCapCCCD: '',
    soBHXH: '',
    mstCaNhan: '',
    // Hồ sơ giấy tờ
    docs: {
      soYeuLyLich: 'Chưa có',
      cmtCccd: 'Chưa có',
      hoKhau: 'Chưa có',
      khaiSinh: 'Chưa có',
      khamSucKhoe: 'Chưa có',
      bangGcn: 'Chưa có',
      theSv: 'Chưa có',
      anhCmt: 'Chưa có',
    } as Record<string, string>,
    // Giấy khai sinh của con
    giayKhaiSinhBanSao: '',
    anhGiayKhaiSinh: '',
    giayKhaiSinhConThieu: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tính số lượng giấy tờ đã có / chưa có
  const docStats = useMemo(() => {
    let daCo = 0;
    let chuaCo = 0;
    HO_SO_DOCS.forEach((d) => {
      if (formData.docs[d.key] === 'Đã có') {
        daCo += 1;
      } else {
        chuaCo += 1;
      }
    });
    return { daCo, chuaCo, total: HO_SO_DOCS.length };
  }, [formData.docs]);

  if (!isOpen) return null;

  const handleDocChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      docs: {
        ...prev.docs,
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const generatedMaNV = `NV${Math.floor(100 + Math.random() * 900)}`;

      await createHoSoPhapLy({
        maNV: generatedMaNV,
        hoTen: formData.hoTen.trim() || 'Nhân sự mới',
        phongBan: formData.phongBan,
        chucVu: 'Nhân viên',
        soCCCD: formData.soCCCD || '—',
        ngayCapCCCD: formData.ngayCapCCCD || '—',
        noiCapCCCD: formData.noiCapCCCD || '—',
        mstCaNhan: formData.mstCaNhan || '—',
        soBHXH: formData.soBHXH || '—',
        nganHang: '—',
        soTaiKhoan: '—',
        ghiChu: `Hồ sơ: ${docStats.daCo}/${docStats.total} giấy tờ`,
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Lỗi khi thêm hồ sơ:', err);
      alert(err?.message || 'Không thể tạo mới hồ sơ');
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelCls = 'block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5';
  const inputCls =
    'w-full h-10 px-3.5 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89]/20 text-xs text-slate-700 bg-white placeholder:text-slate-400 transition';
  const selectCls =
    'w-full h-10 px-3.5 pr-8 border border-slate-200 rounded-lg outline-none focus:border-[#406c89] focus:ring-1 focus:ring-[#406c89]/20 text-xs text-slate-700 bg-white transition appearance-none cursor-pointer';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#f8fafc] rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header trên cùng */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100 shrink-0">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Thêm hồ sơ pháp lý</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Form Body - scrollable */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            
            {/* Banner Thông tin Nhân sự mới */}
            <div className="bg-[#466984] text-white p-5 rounded-lg flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-xl shrink-0">
                ?
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base text-white tracking-wide">
                  {formData.hoTen.trim() || 'Nhân sự mới'}
                </h3>
                <p className="text-white/80 text-xs mt-0.5">{formData.phongBan}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-medium">
                    {formData.trangThaiLamViec}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-medium">
                    {formData.phongBan}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-medium">
                    {formData.bacLuong}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-medium">
                    Hồ sơ: {docStats.daCo} giấy tờ
                  </span>
                </div>
              </div>
            </div>

            {/* BLOCK 1: GIẤY TỜ TÙY THÂN & PHÁP LÝ */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
              <h4 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-4">
                Giấy tờ tùy thân & pháp lý
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Số CMT/CCCD</label>
                  <input
                    type="text"
                    value={formData.soCCCD}
                    onChange={(e) => setFormData((p) => ({ ...p, soCCCD: e.target.value }))}
                    placeholder=""
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Ngày cấp</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.ngayCapCCCD}
                      onChange={(e) => setFormData((p) => ({ ...p, ngayCapCCCD: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Nơi cấp</label>
                  <input
                    type="text"
                    value={formData.noiCapCCCD}
                    onChange={(e) => setFormData((p) => ({ ...p, noiCapCCCD: e.target.value }))}
                    placeholder=""
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Số sổ BHXH</label>
                  <input
                    type="text"
                    value={formData.soBHXH}
                    onChange={(e) => setFormData((p) => ({ ...p, soBHXH: e.target.value }))}
                    placeholder=""
                    className={inputCls}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls}>Mã số thuế</label>
                  <input
                    type="text"
                    value={formData.mstCaNhan}
                    onChange={(e) => setFormData((p) => ({ ...p, mstCaNhan: e.target.value }))}
                    placeholder=""
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* BLOCK 2: HỒ SƠ GIẤY TỜ */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Hồ sơ giấy tờ
                  </h4>
                  <span className="text-[11px] text-slate-400 font-normal">
                    Đánh dấu tình trạng từng loại giấy tờ
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200">
                  {docStats.daCo}/{docStats.total} đã có • {docStats.chuaCo} chưa có
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {HO_SO_DOCS.map((doc) => (
                  <div key={doc.key}>
                    <label className={labelCls}>{doc.label}</label>
                    <div className="relative">
                      <select
                        value={formData.docs[doc.key]}
                        onChange={(e) => handleDocChange(doc.key, e.target.value)}
                        className={selectCls}
                      >
                        <option value="Chưa có">Chưa có</option>
                        <option value="Đã có">Đã có</option>
                        <option value="Bản sao">Bản sao</option>
                        <option value="Công chứng">Công chứng</option>
                      </select>
                      <IconChevronDown
                        size={15}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BLOCK 3: GIẤY KHAI SINH CỦA CON */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
              <div className="flex items-center gap-2 mb-4">
                <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Giấy khai sinh của con
                </h4>
                <span className="text-[11px] text-slate-400 font-normal">
                  Thông tin bổ sung (không tính vào trạng thái bộ hồ sơ)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>GIẤY KHAI SINH CỦA CON (BẢN SAO CÔNG CHỨNG)</label>
                  <input
                    type="text"
                    value={formData.giayKhaiSinhBanSao}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, giayKhaiSinhBanSao: e.target.value }))
                    }
                    placeholder=""
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>ẢNH GIẤY KHAI SINH</label>
                  <input
                    type="text"
                    value={formData.anhGiayKhaiSinh}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, anhGiayKhaiSinh: e.target.value }))
                    }
                    placeholder=""
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>GIẤY KHAI SINH CÒN THIẾU</label>
                  <input
                    type="text"
                    value={formData.giayKhaiSinhConThieu}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, giayKhaiSinhConThieu: e.target.value }))
                    }
                    placeholder=""
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Footer nút Hủy & Lưu */}
          <div className="bg-white px-6 py-3.5 border-t border-slate-200 flex justify-end gap-2.5 shrink-0">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center min-w-[70px] px-5 py-2 rounded-lg bg-[#8da2b5] hover:bg-[#7b92a6] text-white font-medium text-xs shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <IconLoader2 size={14} className="animate-spin mr-1.5" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <span>Lưu</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
