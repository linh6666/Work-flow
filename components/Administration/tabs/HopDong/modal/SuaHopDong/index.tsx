"use client";

import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconSignature,
  IconClipboardList,
  IconCoin,
  IconCreditCard,
  IconFileText,
  IconPaperclip,
  IconArrowRight,
  IconDownload,
  IconChevronDown,
  IconCheck
} from '@tabler/icons-react';

import ThongTinChungTab from '../TaoHopDong/tabs/ThongTinChung';
import HangMucGiaTriTab, { HangMucItem } from '../TaoHopDong/tabs/HangMucGiaTri';
import TinhTienThanhToanTab from '../TaoHopDong/tabs/TinhTienThanhToan';
import DieuKhoanThanhToanTab from '../TaoHopDong/tabs/DieuKhoanThanhToan';
import HoSoKemTheoTab from '../TaoHopDong/tabs/HoSoKemTheo';

interface SuaHopDongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedHopDong: any) => void;
  hopDong: any;
}

const TAB_ORDER = ['info', 'items', 'payment', 'terms', 'files'] as const;
type TabType = typeof TAB_ORDER[number];

export default function SuaHopDongModal({ isOpen, onClose, onSave, hopDong }: SuaHopDongModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [ngonNgu, setNgonNgu] = useState<'VN' | 'GB' | 'VNGB'>('VN');
  const [mauHopDongCoSan, setMauHopDongCoSan] = useState('');

  // --- Tab 1 State: Thông tin chung ---
  const [loaiHopDong, setLoaiHopDong] = useState('Mô hình Quy hoạch');
  const [soHopDong, setSoHopDong] = useState('');
  const [tenHopDong, setTenHopDong] = useState('');
  const [ngayKy, setNgayKy] = useState('');
  const [khachHang, setKhachHang] = useState('');
  const [tenDuAn, setTenDuAn] = useState('');
  const [tyLe, setTyLe] = useState('1/500');
  const [kichThuoc, setKichThuoc] = useState('2000X1500MM');
  const [thoiGian, setThoiGian] = useState('30 ngày');

  // --- Tab 2 State: Hạng mục & Giá trị ---
  const [hangMucs, setHangMucs] = useState<HangMucItem[]>([]);

  // --- Tab 3 State: Tính tiền thanh toán ---
  const [chietKhauPercent, setChietKhauPercent] = useState(0);
  const [vatPercent, setVatPercent] = useState(8);

  // --- Tab 4 State: Điều khoản & Thanh toán ---
  const [dieuKhoan, setDieuKhoan] = useState('');

  // --- Tab 5 State: Hồ sơ kèm theo ---
  const [filesAttached, setFilesAttached] = useState<string[]>([]);

  // --- Edit extra states: Trạng thái & Bước duyệt ---
  const [trangThai, setTrangThai] = useState('Bản nháp');
  const [buocDuyet, setBuocDuyet] = useState<'soan_thao' | 'cho_kd_duyet' | 'cho_gd_duyet' | 'trien_khai'>('soan_thao');

  useEffect(() => {
    if (isOpen) {
      setActiveTab('info');
    }
    if (hopDong && isOpen) {
      setNgonNgu(hopDong.ngonNgu || 'VN');
      setMauHopDongCoSan(hopDong.mauHopDongCoSan || '');
      setLoaiHopDong(hopDong.loaiHopDong || 'Mô hình Quy hoạch');
      setSoHopDong(hopDong.soHopDong || '');
      setTenHopDong(hopDong.tenHopDong || '');
      setNgayKy(hopDong.ngayKy || '');
      setKhachHang(hopDong.khachHang || '');
      setTenDuAn(hopDong.tenDuAn || '');
      setTyLe(hopDong.tyLe || '1/500');
      setKichThuoc(hopDong.kichThuoc || '2000X1500MM');
      setThoiGian(hopDong.thoiGian || '30 ngày');
      setHangMucs(hopDong.hangMucs || []);
      setChietKhauPercent(hopDong.chietKhauPercent || 0);
      setVatPercent(hopDong.vatPercent || 8);
      setDieuKhoan(hopDong.dieuKhoan || '');
      setFilesAttached(hopDong.filesAttached || []);
      setTrangThai(hopDong.trangThai || 'Bản nháp');
      setBuocDuyet(hopDong.buocDuyet || 'soan_thao');
    }
  }, [hopDong, isOpen]);

  if (!isOpen) return null;

  // Calculation helpers
  const subtotal = hangMucs.reduce((sum, hm) => sum + hm.soLuong * hm.donGia, 0);
  const discountVal = (subtotal * chietKhauPercent) / 100;
  const afterDiscount = subtotal - discountVal;
  const vatVal = (afterDiscount * vatPercent) / 100;
  const tongSauThue = afterDiscount + vatVal;

  const currentTabIndex = TAB_ORDER.indexOf(activeTab);
  const isLastTab = currentTabIndex === TAB_ORDER.length - 1;

  const handleNext = () => {
    if (!isLastTab) {
      setActiveTab(TAB_ORDER[currentTabIndex + 1]);
    }
  };

  const handleAddHangMuc = () => {
    const newHm: HangMucItem = {
      id: `hm-${Date.now()}`,
      tenHangMuc: '',
      soLuong: 1,
      donVi: 'Bộ',
      donGia: 0,
    };
    setHangMucs((prev) => [...prev, newHm]);
  };

  const handleUpdateHangMuc = (id: string, field: keyof HangMucItem, val: any) => {
    setHangMucs((prev) =>
      prev.map((hm) => (hm.id === id ? { ...hm, [field]: val } : hm))
    );
  };

  const handleDeleteHangMuc = (id: string) => {
    setHangMucs((prev) => prev.filter((hm) => hm.id !== id));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const updatedHopDong = {
      ...hopDong,
      soHopDong,
      tenHopDong,
      khachHang,
      tenDuAn,
      giaTri: tongSauThue,
      ngayKy,
      thoiGian,
      hangMucs,
      chietKhauPercent,
      vatPercent,
      dieuKhoan,
      filesCount: filesAttached.length,
      filesAttached,
      ngonNgu,
      mauHopDongCoSan,
      loaiHopDong,
      tyLe,
      kichThuoc,
      trangThai,
      buocDuyet,
    };

    onSave(updatedHopDong);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 sm:p-6 animate-fade-in">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-6xl overflow-hidden animate-scale-up flex flex-col h-[92vh] max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#406c89]/10 text-[#406c89] flex items-center justify-center shrink-0">
              <IconSignature size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base tracking-tight">Chỉnh sửa hợp đồng</h3>
              <p className="text-[11px] text-slate-400 font-normal">Cập nhật và cấu hình thông tin chi tiết hợp đồng</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* TOP BANNER ABOVE TABS: Ngôn ngữ HĐ & Tạo từ mẫu hợp đồng có sẵn */}
        <div className="px-6 pt-4 pb-3 space-y-3.5 border-b border-slate-100 bg-white shrink-0 select-none">
          {/* Row 1: Ngôn ngữ HĐ */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-600 shrink-0">Ngôn ngữ HĐ:</span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setNgonNgu('VN')}
                className={`px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  ngonNgu === 'VN'
                    ? 'bg-[#406c89] text-white font-bold shadow-xs'
                    : 'bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 font-semibold shadow-2xs'
                }`}
              >
                <span className="text-[10px] opacity-80 uppercase font-mono">VN</span>
                <span>Tiếng Việt</span>
              </button>

              <button
                type="button"
                onClick={() => setNgonNgu('GB')}
                className={`px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  ngonNgu === 'GB'
                    ? 'bg-[#406c89] text-white font-bold shadow-xs'
                    : 'bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 font-semibold shadow-2xs'
                }`}
              >
                <span className="text-[10px] opacity-80 uppercase font-mono">GB</span>
                <span>Tiếng Anh</span>
              </button>

              <button
                type="button"
                onClick={() => setNgonNgu('VNGB')}
                className={`px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  ngonNgu === 'VNGB'
                    ? 'bg-[#406c89] text-white font-bold shadow-xs'
                    : 'bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 font-semibold shadow-2xs'
                }`}
              >
                <span className="text-[10px] opacity-80 uppercase font-mono">VNGB</span>
                <span>Việt - Anh</span>
              </button>
            </div>
          </div>

          {/* Row 2: Card Green Accent - TẠO TỪ MẪU HỢP ĐỒNG CÓ SẴN */}
          <div className="bg-[#f0fdf4]/90 border border-[#86efac] rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs tracking-wide uppercase">
              <div className="flex items-center gap-1 text-emerald-700">
                <IconDownload size={16} />
                <IconClipboardList size={16} />
              </div>
              <span>TẠO TỪ MẪU HỢP ĐỒNG CÓ SẴN</span>
            </div>

            <div className="relative">
              <select
                value={mauHopDongCoSan}
                onChange={(e) => setMauHopDongCoSan(e.target.value)}
                className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 appearance-none cursor-pointer pr-9"
              >
                <option value="" disabled hidden>
                  Chọn mẫu để tải nội dung hợp đồng...
                </option>
                <option value="mau-01">Mẫu 01: Hợp đồng sản xuất mô hình quy hoạch tổng thể</option>
                <option value="mau-02">Mẫu 02: Hợp đồng chế tác sa bàn kiến trúc dự án</option>
                <option value="mau-03">Mẫu 03: Hợp đồng sản xuất mô hình nội thất thương mại</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <IconChevronDown size={16} />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium pt-0.5">
              <IconCheck size={16} className="text-emerald-600 shrink-0" />
              <span>Nội dung hợp đồng sẽ được tải từ mẫu đã chọn</span>
            </div>
          </div>
        </div>

        {/* Top 5 Horizontal Tabs Navigation Bar */}
        <div className="px-6 border-b border-slate-100 flex items-center gap-6 overflow-x-auto no-scrollbar bg-white shrink-0 pt-3 select-none">
          
          {/* Tab 1: Thông tin chung */}
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`pb-3 border-b-2 flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'info'
                ? 'border-[#406c89] text-[#406c89] font-bold -mb-px'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-semibold -mb-px'
            }`}
          >
            <IconClipboardList size={18} />
            <span>Thông tin chung</span>
          </button>

          {/* Tab 2: Hạng mục & Giá trị */}
          <button
            type="button"
            onClick={() => setActiveTab('items')}
            className={`pb-3 border-b-2 flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'items'
                ? 'border-[#406c89] text-[#406c89] font-bold -mb-px'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-semibold -mb-px'
            }`}
          >
            <IconCoin size={18} className="text-amber-600" />
            <span>Hạng mục & Giá trị</span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              activeTab === 'items' ? 'bg-[#406c89]/10 text-[#406c89]' : 'bg-slate-100 text-slate-600'
            }`}>
              {hangMucs.length}
            </span>
          </button>

          {/* Tab 3: Tính tiền thanh toán */}
          <button
            type="button"
            onClick={() => setActiveTab('payment')}
            className={`pb-3 border-b-2 flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'payment'
                ? 'border-[#406c89] text-[#406c89] font-bold -mb-px'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-semibold -mb-px'
            }`}
          >
            <IconCreditCard size={18} className={activeTab === 'payment' ? 'text-[#406c89]' : 'text-slate-400'} />
            <span>Tính tiền thanh toán</span>
          </button>

          {/* Tab 4: Điều khoản & Thanh toán */}
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`pb-3 border-b-2 flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'terms'
                ? 'border-[#406c89] text-[#406c89] font-bold -mb-px'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-semibold -mb-px'
            }`}
          >
            <IconFileText size={18} />
            <span>Điều khoản & Thanh toán</span>
          </button>

          {/* Tab 5: Hồ sơ kèm theo */}
          <button
            type="button"
            onClick={() => setActiveTab('files')}
            className={`pb-3 border-b-2 flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'files'
                ? 'border-amber-500 text-amber-900 font-bold -mb-px bg-amber-50/70 px-3 py-1 rounded-t-lg'
                : 'border-transparent text-amber-800/80 hover:text-amber-900 font-semibold -mb-px bg-amber-50/40 px-3 py-1 rounded-t-lg'
            }`}
          >
            <IconPaperclip size={18} className="text-amber-700" />
            <span>Hồ sơ kèm theo ({filesAttached.length} đã chọn)</span>
          </button>

        </div>

        {/* Tab Form Content (Scrollable Middle with hidden scrollbar) */}
        <form id="sua-hop-dong-form" onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-5 bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          
          {/* TAB 1: THÔNG TIN CHUNG */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <ThongTinChungTab
                loaiHopDong={loaiHopDong}
                setLoaiHopDong={setLoaiHopDong}
                soHopDong={soHopDong}
                setSoHopDong={setSoHopDong}
                tenHopDong={tenHopDong}
                setTenHopDong={setTenHopDong}
                khachHang={khachHang}
                setKhachHang={setKhachHang}
                tenDuAn={tenDuAn}
                setTenDuAn={setTenDuAn}
                tyLe={tyLe}
                setTyLe={setTyLe}
                kichThuoc={kichThuoc}
                setKichThuoc={setKichThuoc}
                ngayKy={ngayKy}
                setNgayKy={setNgayKy}
                thoiGian={thoiGian}
                setThoiGian={setThoiGian}
              />
              
              {/* TRẠNG THÁI & QUY TRÌNH DUYỆT */}
              <div className="bg-[#f8fafc]/80 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3.5 mt-4 select-none">
                <h4 className="text-xs font-bold text-[#406c89] tracking-wider uppercase">
                  TRẠNG THÁI & QUY TRÌNH DUYỆT
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Trạng thái HĐ */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">Trạng thái hợp đồng</label>
                    <select
                      value={trangThai}
                      onChange={(e) => setTrangThai(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                    >
                      <option value="Bản nháp">Bản nháp</option>
                      <option value="Đang thực hiện">Đang thực hiện</option>
                      <option value="Hoàn thành">Hoàn thành</option>
                    </select>
                  </div>

                  {/* Bước quy trình */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">Bước quy trình duyệt</label>
                    <select
                      value={buocDuyet}
                      onChange={(e) => setBuocDuyet(e.target.value as any)}
                      className="w-full text-xs bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                    >
                      <option value="soan_thao">1. NV Kinh doanh soạn</option>
                      <option value="cho_kd_duyet">2. Quản lý KD duyệt</option>
                      <option value="cho_gd_duyet">3. Phó GĐ KD-HC duyệt cuối</option>
                      <option value="trien_khai">4. Triển khai HĐ</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HẠNG MỤC & GIÁ TRỊ */}
          {activeTab === 'items' && (
            <HangMucGiaTriTab
              hangMucs={hangMucs}
              onAddHangMuc={handleAddHangMuc}
              onUpdateHangMuc={handleUpdateHangMuc}
              onDeleteHangMuc={handleDeleteHangMuc}
              subtotal={subtotal}
            />
          )}

          {/* TAB 3: TÍNH TIỀN THANH TOÁN */}
          {activeTab === 'payment' && (
            <TinhTienThanhToanTab
              chietKhauPercent={chietKhauPercent}
              setChietKhauPercent={setChietKhauPercent}
              vatPercent={vatPercent}
              setVatPercent={setVatPercent}
              subtotal={subtotal}
              discountVal={discountVal}
              vatVal={vatVal}
              tongSauThue={tongSauThue}
            />
          )}

          {/* TAB 4: ĐIỀU KHOẢN & THANH TOÁN */}
          {activeTab === 'terms' && (
            <DieuKhoanThanhToanTab
              dieuKhoan={dieuKhoan}
              setDieuKhoan={setDieuKhoan}
            />
          )}

          {/* TAB 5: HỒ SƠ KÈM THEO */}
          {activeTab === 'files' && (
            <HoSoKemTheoTab
              filesAttached={filesAttached}
              setFilesAttached={setFilesAttached}
            />
          )}

        </form>

        {/* ALWAYS VISIBLE STICKY FOOTER: Right-aligned buttons (Hủy, Tiếp tục / Lưu hợp đồng) */}
        <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/60 shrink-0 z-30 shadow-xs">

          {/* Hủy button */}
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            Hủy
          </button>

          {/* Action button: Tiếp tục vs Lưu hợp đồng */}
          {!isLastTab ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <span>Tiếp tục</span>
              <IconArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="px-5 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Lưu thay đổi
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
