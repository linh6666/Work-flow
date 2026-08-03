"use client";

import React, { useState, useEffect } from 'react';
import { 
  IconX, 
  IconInfoCircle, 
  IconListDetails, 
  IconReceipt,
  IconPaperclip,
  IconUpload,
  IconTrash,
  IconChevronUp
} from '@tabler/icons-react';
import { BaoGiaItem } from '../../index';
import ThongTinChungTab from './ThongTinChung';
import DanhMucGiaTab, { BaoGiaSection, HangMucDong } from './DanhMucGia';
import DieuKienBaoGiaTab, { DieuKienItem } from './DieuKienBaoGia';
import HoSoDinhKemTab from './HoSoDinhKem';

interface SuaBaoGiaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedItem: BaoGiaItem) => void;
  editingItem: BaoGiaItem | null;
}

export default function SuaBaoGiaModal({
  isOpen,
  onClose,
  onSave,
  editingItem,
}: SuaBaoGiaModalProps) {
  // Active Tab: 'info' | 'items' | 'terms' | 'attachments'
  const [activeTab, setActiveTab] = useState<'info' | 'items' | 'terms' | 'attachments'>('info');
  const [danhSachFile, setDanhSachFile] = useState<File[]>([]);

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
  const [trangThai, setTrangThai] = useState<BaoGiaItem['trangThai']>('Bản nháp');

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
    if (sections.length > 0) {
      const total = Math.round(afterDiscount + vatVal);
      setTongSauThue(total);
    }
  }, [afterDiscount, vatVal, sections.length]);

  // Prefill form when editingItem changes
  useEffect(() => {
    if (isOpen && editingItem) {
      setActiveTab('info');
      setNgonNgu('vi');
      setLoai(editingItem.loai || 'Mô hình Quy hoạch');
      setLienKetDeXuat('');
      setSoBg(editingItem.soBg || '');
      setNgay(editingItem.ngay || new Date().toISOString().split('T')[0]);
      setHieuLucNgay(10);
      setKhachHangSelect(editingItem.khachHang || '');
      setTenKhachHangManual(editingItem.khachHang || '');
      setTenDuAn(editingItem.soBg || '');
      setTyLe(editingItem.tyLe || '1/500');
      setKichThuoc(editingItem.kichThuoc || '2000X1500MM');
      setTrangThai(editingItem.trangThai || 'Bản nháp');

      setLoaiBaoGiaSelect(editingItem.loai || 'Mô hình Quy hoạch');
      setChietKhauChecked(true);
      setSauChietKhauChecked(true);
      setChietKhauPercent(0);
      setVatPercent(8);
      setTongSauThue(editingItem.tongSauThue || 0);
      setDanhSachFile([]);

      // Initialize prefilled section with the item's total
      const initialDong: HangMucDong = {
        id: 'edit-row-1',
        stt: '1',
        congViec: editingItem.soBg,
        loaiVatLieu: editingItem.loai,
        soLuong: 1,
        donVi: 'bộ',
        donGia: editingItem.tongSauThue ? Math.round(editingItem.tongSauThue / 1.08) : 500000000,
      };

      setSections([
        {
          id: 'edit-sec-1',
          index: 1,
          tenPhan: 'DANH MỤC HẠNG MỤC MÔ HÌNH',
          ckChecked: true,
          collapsed: false,
          dongs: [initialDong],
        }
      ]);
    }
  }, [isOpen, editingItem]);

  if (!isOpen || !editingItem) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setDanhSachFile(prev => [...prev, ...filesArray]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setDanhSachFile(prev => prev.filter((_, i) => i !== index));
  };

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
          donVi: 'bộ',
          donGia: 10000000,
        }
      ]
    };
    setSections(prev => [...prev, newSection]);
  };

  const handleUpdateSectionName = (sectionId: string, name: string) => {
    setSections(prev => prev.map(sec => sec.id === sectionId ? { ...sec, tenPhan: name } : sec));
  };

  const handleToggleSectionCk = (sectionId: string) => {
    setSections(prev => prev.map(sec => sec.id === sectionId ? { ...sec, ckChecked: !sec.ckChecked } : sec));
  };

  const handleToggleSectionCollapse = (sectionId: string) => {
    setSections(prev => prev.map(sec => sec.id === sectionId ? { ...sec, collapsed: !sec.collapsed } : sec));
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(prev => {
      const filtered = prev.filter(sec => sec.id !== sectionId);
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
        const updatedDongs = sec.dongs.map(dong => {
          if (dong.id === rowId) {
            return { ...dong, [field]: value };
          }
          return dong;
        });
        return { ...sec, dongs: updatedDongs };
      }
      return sec;
    }));
  };

  const handleDeleteRow = (sectionId: string, rowId: string) => {
    setSections(prev => prev.map(sec => {
      if (sec.id === sectionId) {
        const filtered = sec.dongs.filter(dong => dong.id !== rowId);
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
  };

  const handleLoadTemplate = () => {
    const defaultDong: HangMucDong = {
      id: Date.now().toString() + '-d1',
      stt: '1',
      congViec: 'Sản xuất sa bàn quy hoạch đô thị 1/500',
      loaiVatLieu: 'Gỗ công nghiệp MDF, Led, Mica...',
      soLuong: 1,
      donVi: 'm2',
      donGia: 800000000
    };
    
    const newSec: BaoGiaSection = {
      id: Date.now().toString(),
      index: sections.length + 1,
      tenPhan: 'MÔ HÌNH QUY HOẠCH ĐÔ THỊ (TEMPLATE)',
      ckChecked: true,
      collapsed: false,
      dongs: [defaultDong]
    };
    setSections(prev => [...prev, newSec]);
  };

  const handleImportExcel = (importedSections: BaoGiaSection[]) => {
    setSections(importedSections);
  };

  const handleAddDieuKien = () => {
    const newId = (dieuKienList.length + 1).toString();
    setDieuKienList(prev => [
      ...prev,
      { id: newId, tieuDe: `${newId}. Điều khoản bổ sung`, noiDung: 'Nội dung điều khoản...' }
    ]);
  };

  const handleUpdateDieuKien = (id: string, field: keyof DieuKienItem, value: string) => {
    setDieuKienList(prev => prev.map(dk => dk.id === id ? { ...dk, [field]: value } : dk));
  };

  const handleDeleteDieuKien = (id: string) => {
    setDieuKienList(prev => prev.filter(dk => dk.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalKh = tenKhachHangManual.trim() || khachHangSelect.trim();
    if (!soBg.trim() || !finalKh) {
      alert('Vui lòng nhập đầy đủ Số BG và Khách hàng!');
      return;
    }

    onSave({
      ...editingItem,
      soBg: soBg.trim(),
      loai,
      khachHang: finalKh,
      ngay,
      nguoiLap: editingItem.nguoiLap || 'Kỳ Anh',
      tyLe,
      kichThuoc,
      tongSauThue: tongSauThue || 0,
      trangThai,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 transition-all">
      <div 
        className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white select-none">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#406c89]/10 border border-[#406c89]/20 flex items-center justify-center text-[#406c89] font-bold text-sm">
              BG
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Chỉnh sửa Báo giá</h3>
              <p className="text-[11px] text-slate-400 font-medium">Mã báo giá: {editingItem.soBg}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Tab Selection Bar (4 Tabs) */}
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

          <button
            type="button"
            onClick={() => setActiveTab('attachments')}
            className={`py-3 flex items-center gap-1.5 border-b-2 text-xs font-bold transition-all cursor-pointer focus:outline-none ${
              activeTab === 'attachments'
                ? 'border-[#406c89] text-[#406c89]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <IconPaperclip size={16} />
            <span>Hồ sơ đính kèm</span>
            {danhSachFile.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-[#406c89]/10 text-[#406c89]">
                {danhSachFile.length}
              </span>
            )}
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
              setTrangThai={(v: string) => setTrangThai(v as BaoGiaItem['trangThai'])}
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
              onImportExcel={() => handleImportExcel([])}
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

          {/* TAB 4: HỒ SƠ ĐÍNH KÈM */}
          {activeTab === 'attachments' && (
            <HoSoDinhKemTab
              danhSachFile={danhSachFile}
              onFileUpload={handleFileUpload}
              onRemoveFile={handleRemoveFile}
            />
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0 select-none">
          <div></div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
            >
              Hủy
            </button>
            
            {activeTab !== 'attachments' ? (
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
                  } else if (activeTab === 'terms') {
                    setActiveTab('attachments');
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
                className="px-4 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
              >
                Lưu thay đổi
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
