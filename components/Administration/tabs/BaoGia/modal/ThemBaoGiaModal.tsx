"use client";

import React, { useState, useEffect } from 'react';
import { 
  IconX, 
  IconInfoCircle, 
  IconListDetails, 
  IconReceipt 
} from '@tabler/icons-react';
import { BaoGiaItem } from '../index';
import ThongTinChungTab from './ThongTinChung';
import DanhMucGiaTab, { BaoGiaSection, HangMucDong } from './DanhMucGia';
import DieuKienBaoGiaTab, { DieuKienItem } from './DieuKienBaoGia';

interface ThemBaoGiaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newItem: Omit<BaoGiaItem, 'id'>) => void;
  suggestedSoBg: string;
}

export default function ThemBaoGiaModal({
  isOpen,
  onClose,
  onSave,
  suggestedSoBg,
}: ThemBaoGiaModalProps) {
  // Active Tab: 'info' | 'items' | 'terms'
  const [activeTab, setActiveTab] = useState<'info' | 'items' | 'terms'>('info');

  // --- Tab 1: Thông tin chung states ---
  const [ngonNgu, setNgonNgu] = useState('vi');
  const [loai, setLoai] = useState('Mô hình Quy hoạch');
  const [lienKetDeXuat, setLienKetDeXuat] = useState('');
  const [soBg, setSoBg] = useState('');
  const [ngay, setNgay] = useState('');
  const [hieuLucNgay, setHieuLucNgay] = useState(10);
  const [khachHangSelect, setKhachHangSelect] = useState('');
  const [tenKhachHangManual, setTenKhachHangManual] = useState('');
  const [tenDuAn, setTenDuAn] = useState('');
  const [tyLe, setTyLe] = useState('1/800');
  const [kichThuoc, setKichThuoc] = useState('2650X1900MM');
  const [trangThai, setTrangThai] = useState('Bản nháp');

  // --- Tab 2: Danh mục & Giá states ---
  const [loaiBaoGiaSelect, setLoaiBaoGiaSelect] = useState('Mô hình Quy hoạch');
  const [chietKhauChecked, setChietKhauChecked] = useState(true);
  const [sauChietKhauChecked, setSauChietKhauChecked] = useState(true);
  const [chietKhauPercent, setChietKhauPercent] = useState(0);
  const [vatPercent, setVatPercent] = useState(8);

  const [sections, setSections] = useState<BaoGiaSection[]>([]);
  const [tongSauThue, setTongSauThue] = useState(0);

  // --- Tab 3: Điều kiện báo giá states ---
  const [thoiGianSanXuat, setThoiGianSanXuat] = useState(60);
  const [baoHanhThang, setBaoHanhThang] = useState(18);
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState('Tạm ứng: 50%, Thanh toán lần 1: 40% sau khi đạt 90% khối lượng công việc, Thanh toán cuối cùng: 10%');
  const [dieuKienList, setDieuKienList] = useState<DieuKienItem[]>([
    {
      id: '1',
      tieuDe: '1. Dự tính thời gian sản xuất mô hình',
      noiDung: '45-50 ngày làm việc (trừ chủ nhật và ngày lễ) kể từ ngày tạm ứng và nhận đầy đủ bản vẽ. Quý khách vui lòng đặt lịch sản xuất mô hình trước 1 tháng. Nếu mô hình có thêm lựa chọn hệ thống điều khiển ánh sáng, thời gian sản xuất mô hình sẽ phụ thuộc vào lựa chọn của khách hàng và phần hệ thống điều khiển ánh sáng.'
    },
    {
      id: '2',
      tieuDe: '2. Báo giá dựa trên hồ sơ',
      noiDung: 'Báo giá dựa trên hồ sơ được cung cấp ngày 16/05/2026 và trên cơ sở hồ sơ dùng để sản xuất mô hình là hồ sơ CAD. Nếu hồ sơ có sự thay đổi hoặc hồ sơ sản xuất mô hình không phải hồ sơ CAD thì các thời gian sản xuất và giá trị của báo giá cũng sẽ được điều chỉnh dựa trên hồ sơ mới'
    }
  ]);

  // Calculated values
  const subtotal = sections.reduce((sumSec, sec) => {
    return sumSec + sec.dongs.reduce((sumRow, dong) => sumRow + (dong.soLuong * dong.donGia), 0);
  }, 0);
  const discountVal = Math.round(subtotal * (chietKhauPercent / 100));
  const afterDiscount = subtotal - discountVal;
  const vatVal = Math.round(afterDiscount * (vatPercent / 100));

  // Sync / calculate total after tax
  useEffect(() => {
    const total = Math.round(afterDiscount + vatVal);
    setTongSauThue(total);
  }, [afterDiscount, vatVal]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab('info');
      setNgonNgu('vi');
      setLoai('Mô hình Quy hoạch');
      setLienKetDeXuat('');
      setSoBg(suggestedSoBg);
      const today = new Date().toISOString().split('T')[0];
      setNgay(today);
      setHieuLucNgay(10);
      setKhachHangSelect('');
      setTenKhachHangManual('');
      setTenDuAn('');
      setTyLe('1/800');
      setKichThuoc('2650X1900MM');
      setTrangThai('Bản nháp');

      setLoaiBaoGiaSelect('Mô hình Quy hoạch');
      setChietKhauChecked(true);
      setSauChietKhauChecked(true);
      setChietKhauPercent(0);
      setVatPercent(8);
      setSections([]);

      setThoiGianSanXuat(60);
      setBaoHanhThang(18);
      setPhuongThucThanhToan('Tạm ứng: 50%, Thanh toán lần 1: 40% sau khi đạt 90% khối lượng công việc, Thanh toán cuối cùng: 10%');
      setDieuKienList([
        {
          id: '1',
          tieuDe: '1. Dự tính thời gian sản xuất mô hình',
          noiDung: '45-50 ngày làm việc (trừ chủ nhật và ngày lễ) kể từ ngày tạm ứng và nhận đầy đủ bản vẽ. Quý khách vui lòng đặt lịch sản xuất mô hình trước 1 tháng. Nếu mô hình có thêm lựa chọn hệ thống điều khiển ánh sáng, thời gian sản xuất mô hình sẽ phụ thuộc vào lựa chọn của khách hàng và phần hệ thống điều khiển ánh sáng.'
        },
        {
          id: '2',
          tieuDe: '2. Báo giá dựa trên hồ sơ',
          noiDung: 'Báo giá dựa trên hồ sơ được cung cấp ngày 16/05/2026 và trên cơ sở hồ sơ dùng để sản xuất mô hình là hồ sơ CAD. Nếu hồ sơ có sự thay đổi hoặc hồ sơ sản xuất mô hình không phải hồ sơ CAD thì các thời gian sản xuất và giá trị của báo giá cũng sẽ được điều chỉnh dựa trên hồ sơ mới'
        }
      ]);
    }
  }, [isOpen, suggestedSoBg]);

  if (!isOpen) return null;

  const handleAddSection = () => {
    const newSection: BaoGiaSection = {
      id: Date.now().toString(),
      index: sections.length + 1,
      tenPhan: 'PHÂN MỚI',
      ckChecked: true,
      collapsed: false,
      dongs: [
        {
          id: Date.now().toString() + '-d1',
          stt: '1',
          congViec: 'TÊN HẠNG MỤC',
          loaiVatLieu: 'Mô tả...',
          soLuong: 1,
          donVi: 'm2',
          donGia: 0,
        }
      ]
    };
    setSections(prev => [...prev, newSection]);
  };

  const handleUpdateSectionName = (sectionId: string, name: string) => {
    setSections(prev => prev.map(sec => sec.id === sectionId ? { ...sec, tenPhan: name } : sec));
  };

  const handleToggleSectionCk = (sectionId: string, checked: boolean) => {
    setSections(prev => prev.map(sec => sec.id === sectionId ? { ...sec, ckChecked: checked } : sec));
  };

  const handleToggleSectionCollapse = (sectionId: string) => {
    setSections(prev => prev.map(sec => sec.id === sectionId ? { ...sec, collapsed: !sec.collapsed } : sec));
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(prev => {
      const filtered = prev.filter(sec => sec.id !== sectionId);
      // Re-index remaining sections
      return filtered.map((sec, idx) => ({ ...sec, index: idx + 1 }));
    });
  };

  const handleAddRow = (sectionId: string) => {
    setSections(prev => prev.map(sec => {
      if (sec.id === sectionId) {
        const nextStt = (sec.dongs.length + 1).toString();
        const newDong: HangMucDong = {
          id: Date.now().toString(),
          stt: nextStt,
          congViec: '',
          loaiVatLieu: '',
          soLuong: 1,
          donVi: 'm2',
          donGia: 0,
        };
        return { ...sec, dongs: [...sec.dongs, newDong] };
      }
      return sec;
    }));
  };

  const handleUpdateRow = (sectionId: string, rowId: string, field: keyof HangMucDong, value: any) => {
    setSections(prev => prev.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          dongs: sec.dongs.map(dong => dong.id === rowId ? { ...dong, [field]: value } : dong)
        };
      }
      return sec;
    }));
  };

  const handleDeleteRow = (sectionId: string, rowId: string) => {
    setSections(prev => prev.map(sec => {
      if (sec.id === sectionId) {
        const filtered = sec.dongs.filter(dong => dong.id !== rowId);
        // Re-index remaining rows inside section
        const reindexed = filtered.map((dong, idx) => ({ ...dong, stt: (idx + 1).toString() }));
        return { ...sec, dongs: reindexed };
      }
      return sec;
    }));
  };

  const handleClearAllSections = () => {
    setSections([]);
  };

  const handleAutoFill = (proposalId: string) => {
    setLienKetDeXuat(proposalId);
    if (proposalId === 'dx01') {
      setKhachHangSelect('KH001');
      setTenKhachHangManual('Tập đoàn T&T');
      setTenDuAn('Mô hình quy hoạch phân khu A - Tập đoàn T&T');
      setTyLe('1/500');
      setKichThuoc('2000X1500MM');
      setLoai('Mô hình Quy hoạch');
      setLoaiBaoGiaSelect('Mô hình Quy hoạch');
    } else if (proposalId === 'dx02') {
      setKhachHangSelect('KH004');
      setTenKhachHangManual('Công ty CP Flamingo');
      setTenDuAn('Mô hình kiến trúc resort nghỉ dưỡng Flamingo');
      setTyLe('1/200');
      setKichThuoc('1800X1200MM');
      setLoai('Mô hình Kiến trúc');
      setLoaiBaoGiaSelect('Mô hình Kiến trúc');
    } else {
      setKhachHangSelect('');
      setTenKhachHangManual('');
      setTenDuAn('');
      setTyLe('');
      setKichThuoc('');
    }
  };

  const handleLoadTemplate = () => {
    let defaultDong: HangMucDong = {
      id: Date.now().toString() + '-d1',
      stt: '1',
      congViec: 'Sản xuất sa bàn quy hoạch đô thị 1/500',
      loaiVatLieu: 'Gỗ công nghiệp MDF, Led, Mica...',
      soLuong: 1,
      donVi: 'm2',
      donGia: 800000000
    };
    if (loaiBaoGiaSelect === 'Mô hình Kiến trúc') {
      defaultDong = {
        id: Date.now().toString() + '-d1',
        stt: '1',
        congViec: 'Sản xuất mô hình kiến trúc cao tầng 1/200',
        loaiVatLieu: 'Nhựa Formex, Nhựa ABS, Sơn cao cấp...',
        soLuong: 1,
        donVi: 'bộ',
        donGia: 1200000000
      };
    } else if (loaiBaoGiaSelect === 'Mô hình Nội thất') {
      defaultDong = {
        id: Date.now().toString() + '-d1',
        stt: '1',
        congViec: 'Sản xuất sa bàn nội thất căn hộ luxury 1/20',
        loaiVatLieu: 'Mica tản sáng, phụ kiện mini...',
        soLuong: 1,
        donVi: 'căn',
        donGia: 350000000
      };
    }
    
    const newSec: BaoGiaSection = {
      id: Date.now().toString(),
      index: sections.length + 1,
      tenPhan: 'PHẦN MẪU BÁO GIÁ',
      ckChecked: true,
      collapsed: false,
      dongs: [defaultDong]
    };
    setSections(prev => [...prev, newSec]);
  };

  const handleImportExcel = () => {
    alert('Nhập khẩu danh mục từ Excel thành công! Nạp 2 hạng mục mẫu vào Phân đoạn mới.');
    const importedSection: BaoGiaSection = {
      id: Date.now().toString(),
      index: sections.length + 1,
      tenPhan: 'DANH MỤC EXCEL IMPORT',
      ckChecked: true,
      collapsed: false,
      dongs: [
        { id: Date.now().toString() + '-e1', stt: '1', congViec: 'Gia công phần khung thép chịu lực mô hình', loaiVatLieu: 'Thép hộp mạ kẽm', soLuong: 1, donVi: 'kg', donGia: 12000000 },
        { id: Date.now().toString() + '-e2', stt: '2', congViec: 'Lắp ráp hệ thống mạch điện điều khiển led 3 chế độ', loaiVatLieu: 'Mạch nạp ESP32, Relay', soLuong: 1, donVi: 'bộ', donGia: 28000000 }
      ]
    };
    setSections(prev => [...prev, importedSection]);
  };

  const handleAddDieuKien = () => {
    const newItem: DieuKienItem = {
      id: Date.now().toString(),
      tieuDe: '',
      noiDung: '',
    };
    setDieuKienList(prev => [...prev, newItem]);
  };

  const handleUpdateDieuKien = (id: string, field: keyof DieuKienItem, value: string) => {
    setDieuKienList(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleDeleteDieuKien = (id: string) => {
    setDieuKienList(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalKhachHang = tenKhachHangManual.trim() || khachHangSelect.trim();
    if (!soBg.trim() || !finalKhachHang) {
      setActiveTab('info');
      return;
    }

    // Map tracking status to the required status format in index.tsx
    let mainStatus: BaoGiaItem['trangThai'] = 'Đang soạn';
    if (trangThai === 'Đã gửi') mainStatus = 'Đã gửi';
    else if (trangThai === 'Đã chốt') mainStatus = 'Đã chốt';
    else if (trangThai === 'Từ chối báo giá') mainStatus = 'Đã từ chối';
    else if (trangThai === 'Đang đàm phán') mainStatus = 'Chờ duyệt';
    else if (trangThai === 'Bản nháp') mainStatus = 'Đang soạn';

    onSave({
      soBg: soBg.trim(),
      loai: loai.trim(),
      khachHang: finalKhachHang,
      ngay: ngay || new Date().toISOString().split('T')[0],
      tongSauThue: tongSauThue,
      trangThai: mainStatus,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] transform transition-all animate-scale-up">
        
        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <IconReceipt size={20} className="text-[#406c89]" />
            <h3 className="text-base font-bold text-slate-800">Tạo báo giá mới</h3>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 border-b border-slate-100 flex gap-6 shrink-0 bg-slate-50/50 select-none">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`py-3 flex items-center gap-1.5 border-b-2 text-xs font-bold transition-all cursor-pointer focus:outline-none ${
              activeTab === 'info'
                ? 'border-[#406c89] text-[#406c89]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconInfoCircle size={16} />
            <span>Thông tin chung</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('items')}
            className={`py-3 flex items-center gap-1.5 border-b-2 text-xs font-bold transition-all cursor-pointer focus:outline-none ${
              activeTab === 'items'
                ? 'border-[#406c89] text-[#406c89]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconListDetails size={16} />
            <span>Danh mục & Giá</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === 'items' ? 'bg-[#406c89]/10 text-[#406c89]' : 'bg-slate-200 text-slate-600'
            }`}>
              {sections.reduce((sum, sec) => sum + sec.dongs.length, 0)}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`py-3 flex items-center gap-1.5 border-b-2 text-xs font-bold transition-all cursor-pointer focus:outline-none ${
              activeTab === 'terms'
                ? 'border-[#406c89] text-[#406c89]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconReceipt size={16} />
            <span>Điều kiện báo giá</span>
          </button>
        </div>
        
        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 text-left">
          
          {/* TAB 1: THÔNG TIN CHUNG */}
          {activeTab === 'info' && (
            <ThongTinChungTab
              ngonNgu={ngonNgu}
              setNgonNgu={setNgonNgu}
              loai={loai}
              setLoai={setLoai}
              lienKetDeXuat={lienKetDeXuat}
              setLienKetDeXuat={setLienKetDeXuat}
              soBg={soBg}
              setSoBg={setSoBg}
              ngay={ngay}
              setNgay={setNgay}
              hieuLucNgay={hieuLucNgay}
              setHieuLucNgay={setHieuLucNgay}
              khachHangSelect={khachHangSelect}
              setKhachHangSelect={setKhachHangSelect}
              tenKhachHangManual={tenKhachHangManual}
              setTenKhachHangManual={setTenKhachHangManual}
              tenDuAn={tenDuAn}
              setTenDuAn={setTenDuAn}
              tyLe={tyLe}
              setTyLe={setTyLe}
              kichThuoc={kichThuoc}
              setKichThuoc={setKichThuoc}
              trangThai={trangThai}
              setTrangThai={setTrangThai}
              onAutoFill={handleAutoFill}
            />
          )}

          {/* TAB 2: DANH MỤC & GIÁ */}
          {activeTab === 'items' && (
            <DanhMucGiaTab
              sections={sections}
              onAddSection={handleAddSection}
              onUpdateSectionName={handleUpdateSectionName}
              onToggleSectionCk={handleToggleSectionCk}
              onToggleSectionCollapse={handleToggleSectionCollapse}
              onDeleteSection={handleDeleteSection}
              onAddRow={handleAddRow}
              onUpdateRow={handleUpdateRow}
              onDeleteRow={handleDeleteRow}
              onClearAllSections={handleClearAllSections}
              loaiBaoGiaSelect={loaiBaoGiaSelect}
              setLoaiBaoGiaSelect={setLoaiBaoGiaSelect}
              onLoadTemplate={handleLoadTemplate}
              chietKhauChecked={chietKhauChecked}
              setChietKhauChecked={setChietKhauChecked}
              sauChietKhauChecked={sauChietKhauChecked}
              setSauChietKhauChecked={setSauChietKhauChecked}
              chietKhauPercent={chietKhauPercent}
              setChietKhauPercent={setChietKhauPercent}
              vatPercent={vatPercent}
              setVatPercent={setVatPercent}
              subtotal={subtotal}
              discountVal={discountVal}
              afterDiscount={afterDiscount}
              vatVal={vatVal}
              tongSauThue={tongSauThue}
              onAddTemplateItem={handleLoadTemplate}
              onImportExcel={handleImportExcel}
            />
          )}

          {/* TAB 3: ĐIỀU KIỆN BÁO GIÁ */}
          {activeTab === 'terms' && (
            <DieuKienBaoGiaTab
              thoiGianSanXuat={thoiGianSanXuat}
              setThoiGianSanXuat={setThoiGianSanXuat}
              baoHanhThang={baoHanhThang}
              setBaoHanhThang={setBaoHanhThang}
              phuongThucThanhToan={phuongThucThanhToan}
              setPhuongThucThanhToan={setPhuongThucThanhToan}
              dieuKienList={dieuKienList}
              onAddDieuKien={handleAddDieuKien}
              onUpdateDieuKien={handleUpdateDieuKien}
              onDeleteDieuKien={handleDeleteDieuKien}
            />
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0 select-none">
          {/* Navigation helpers hidden */}
          <div></div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
            >
              Hủy
            </button>
            
            {activeTab !== 'terms' ? (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'info') {
                    const finalKh = tenKhachHangManual.trim() || khachHangSelect.trim();
                    if (!soBg.trim() || !finalKh) {
                      alert('Vui lòng điền đầy đủ Số BG và Tên Khách hàng trước khi tiếp tục!');
                      return;
                    }
                    setActiveTab('items');
                  } else if (activeTab === 'items') {
                    setActiveTab('terms');
                  }
                }}
                className="px-4 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
              >
                Tiếp tục
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#406c89] hover:bg-[#406c89]/90 text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
              >
                Xác nhận
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
