"use client";

import React, { useState, useEffect, useMemo } from 'react';
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
import { BaoGiaItem } from '../index';
import ThongTinChungTab from './ThongTinChung';
import DanhMucGiaTab, { BaoGiaSection, HangMucDong } from './DanhMucGia';
import DieuKienBaoGiaTab, { DieuKienItem } from './DieuKienBaoGia';
import { getQuoteRequestList, QuoteRequestRecord } from '@/api/apiGetQuoteRequest';
import { getQuotationTemplateList, QuotationTemplateRecord } from '@/api/apiGetQuotationTemplate';

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
  // Active Tab: 'info' | 'items' | 'terms' | 'attachments'
  const [activeTab, setActiveTab] = useState<'info' | 'items' | 'terms' | 'attachments'>('info');
  const [danhSachFile, setDanhSachFile] = useState<File[]>([]);

  // Danh sÃ¡ch Äá» xuáº¥t bÃ¡o giÃ¡ tá»« API
  const [proposals, setProposals] = useState<QuoteRequestRecord[]>([]);
  const [allTemplates, setAllTemplates] = useState<QuotationTemplateRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      getQuoteRequestList(100).then((data) => {
        if (Array.isArray(data)) setProposals(data);
      });
      getQuotationTemplateList(500).then((data) => {
        if (Array.isArray(data)) setAllTemplates(data);
      });
    }
  }, [isOpen]);

  // Distinct quote_type list filtered by current language
  const [ngonNgu, setNgonNgu] = useState('vi');

  const quoteTypeOptions = useMemo(() => {
    const filtered = allTemplates.filter(
      (t) => !t.quote_language || t.quote_language === ngonNgu
    );
    const seen = new Set<string>();
    const result: string[] = [];
    for (const t of filtered) {
      const qt = t.quote_type?.trim();
      if (qt && !seen.has(qt)) { seen.add(qt); result.push(qt); }
    }
    return result;
  }, [allTemplates, ngonNgu]);

  // --- Tab 1: ThÃ´ng tin chung states ---

  const [loai, setLoai] = useState('MÃ´ hÃ¬nh Quy hoáº¡ch');
  const [lienKetDeXuat, setLienKetDeXuat] = useState('');
  const [soBg, setSoBg] = useState('');
  const [ngay, setNgay] = useState('');
  const [hieuLucNgay, setHieuLucNgay] = useState(10);
  const [khachHangSelect, setKhachHangSelect] = useState('');
  const [tenKhachHangManual, setTenKhachHangManual] = useState('');
  const [tenDuAn, setTenDuAn] = useState('');
  const [tyLe, setTyLe] = useState('1/800');
  const [kichThuoc, setKichThuoc] = useState('2650X1900MM');
  const [trangThai, setTrangThai] = useState('Báº£n nhÃ¡p');

  // --- Tab 2: Danh má»¥c & GiÃ¡ states ---
  const [loaiBaoGiaSelect, setLoaiBaoGiaSelect] = useState('MÃ´ hÃ¬nh Quy hoáº¡ch');
  const [chietKhauChecked, setChietKhauChecked] = useState(true);
  const [sauChietKhauChecked, setSauChietKhauChecked] = useState(true);
  const [chietKhauPercent, setChietKhauPercent] = useState(0);
  const [vatPercent, setVatPercent] = useState(8);

  const [sections, setSections] = useState<BaoGiaSection[]>([]);
  const [tongSauThue, setTongSauThue] = useState(0);

  // --- Tab 3: Äiá»u kiá»‡n bÃ¡o giÃ¡ states ---
  const [thoiGianSanXuat, setThoiGianSanXuat] = useState(60);
  const [baoHanhThang, setBaoHanhThang] = useState(18);
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState('Táº¡m á»©ng: 50%, Thanh toÃ¡n láº§n 1: 40% sau khi Ä‘áº¡t 90% khá»‘i lÆ°á»£ng cÃ´ng viá»‡c, Thanh toÃ¡n cuá»‘i cÃ¹ng: 10%');
  const [dieuKienList, setDieuKienList] = useState<DieuKienItem[]>([
    {
      id: '1',
      tieuDe: '1. Dá»± tÃ­nh thá»i gian sáº£n xuáº¥t mÃ´ hÃ¬nh',
      noiDung: '45-50 ngÃ y lÃ m viá»‡c (trá»« chá»§ nháº­t vÃ  ngÃ y lá»…) ká»ƒ tá»« ngÃ y táº¡m á»©ng vÃ  nháº­n Ä‘áº§y Ä‘á»§ báº£n váº½. QuÃ½ khÃ¡ch vui lÃ²ng Ä‘áº·t lá»‹ch sáº£n xuáº¥t mÃ´ hÃ¬nh trÆ°á»›c 1 thÃ¡ng. Náº¿u mÃ´ hÃ¬nh cÃ³ thÃªm lá»±a chá»n há»‡ thá»‘ng Ä‘iá»u khiá»ƒn Ã¡nh sÃ¡ng, thá»i gian sáº£n xuáº¥t mÃ´ hÃ¬nh sáº½ phá»¥ thuá»™c vÃ o lá»±a chá»n cá»§a khÃ¡ch hÃ ng vÃ  pháº§n há»‡ thá»‘ng Ä‘iá»u khiá»ƒn Ã¡nh sÃ¡ng.'
    },
    {
      id: '2',
      tieuDe: '2. BÃ¡o giÃ¡ dá»±a trÃªn há»“ sÆ¡',
      noiDung: 'BÃ¡o giÃ¡ dá»±a trÃªn há»“ sÆ¡ Ä‘Æ°á»£c cung cáº¥p ngÃ y 16/05/2026 vÃ  trÃªn cÆ¡ sá»Ÿ há»“ sÆ¡ dÃ¹ng Ä‘á»ƒ sáº£n xuáº¥t mÃ´ hÃ¬nh lÃ  há»“ sÆ¡ CAD. Náº¿u há»“ sÆ¡ cÃ³ sá»± thay Ä‘á»•i hoáº·c há»“ sÆ¡ sáº£n xuáº¥t mÃ´ hÃ¬nh khÃ´ng pháº£i há»“ sÆ¡ CAD thÃ¬ cÃ¡c thá»i gian sáº£n xuáº¥t vÃ  giÃ¡ trá»‹ cá»§a bÃ¡o giÃ¡ cÅ©ng sáº½ Ä‘Æ°á»£c Ä‘iá»u chá»‰nh dá»±a trÃªn há»“ sÆ¡ má»›i'
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
      setLoai('MÃ´ hÃ¬nh Quy hoáº¡ch');
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
      setTrangThai('Báº£n nhÃ¡p');

      setLoaiBaoGiaSelect('MÃ´ hÃ¬nh Quy hoáº¡ch');
      setChietKhauChecked(true);
      setSauChietKhauChecked(true);
      setChietKhauPercent(0);
      setVatPercent(8);
      setSections([]);
      setDanhSachFile([]);

      setThoiGianSanXuat(60);
      setBaoHanhThang(18);
      setPhuongThucThanhToan('Táº¡m á»©ng: 50%, Thanh toÃ¡n láº§n 1: 40% sau khi Ä‘áº¡t 90% khá»‘i lÆ°á»£ng cÃ´ng viá»‡c, Thanh toÃ¡n cuá»‘i cÃ¹ng: 10%');
      setDieuKienList([
        {
          id: '1',
          tieuDe: '1. Dá»± tÃ­nh thá»i gian sáº£n xuáº¥t mÃ´ hÃ¬nh',
          noiDung: '45-50 ngÃ y lÃ m viá»‡c (trá»« chá»§ nháº­t vÃ  ngÃ y lá»…) ká»ƒ tá»« ngÃ y táº¡m á»©ng vÃ  nháº­n Ä‘áº§y Ä‘á»§ báº£n váº½. QuÃ½ khÃ¡ch vui lÃ²ng Ä‘áº·t lá»‹ch sáº£n xuáº¥t mÃ´ hÃ¬nh trÆ°á»›c 1 thÃ¡ng. Náº¿u mÃ´ hÃ¬nh cÃ³ thÃªm lá»±a chá»n há»‡ thá»‘ng Ä‘iá»u khiá»ƒn Ã¡nh sÃ¡ng, thá»i gian sáº£n xuáº¥t mÃ´ hÃ¬nh sáº½ phá»¥ thuá»™c vÃ o lá»±a chá»n cá»§a khÃ¡ch hÃ ng vÃ  pháº§n há»‡ thá»‘ng Ä‘iá»u khiá»ƒn Ã¡nh sÃ¡ng.'
        },
        {
          id: '2',
          tieuDe: '2. BÃ¡o giÃ¡ dá»±a trÃªn há»“ sÆ¡',
          noiDung: 'BÃ¡o giÃ¡ dá»±a trÃªn há»“ sÆ¡ Ä‘Æ°á»£c cung cáº¥p ngÃ y 16/05/2026 vÃ  trÃªn cÆ¡ sá»Ÿ há»“ sÆ¡ dÃ¹ng Ä‘á»ƒ sáº£n xuáº¥t mÃ´ hÃ¬nh lÃ  há»“ sÆ¡ CAD. Náº¿u há»“ sÆ¡ cÃ³ sá»± thay Ä‘á»•i hoáº·c há»“ sÆ¡ sáº£n xuáº¥t mÃ´ hÃ¬nh khÃ´ng pháº£i há»“ sÆ¡ CAD thÃ¬ cÃ¡c thá»i gian sáº£n xuáº¥t vÃ  giÃ¡ trá»‹ cá»§a bÃ¡o giÃ¡ cÅ©ng sáº½ Ä‘Æ°á»£c Ä‘iá»u chá»‰nh dá»±a trÃªn há»“ sÆ¡ má»›i'
        }
      ]);
    }
  }, [isOpen, suggestedSoBg]);

  if (!isOpen) return null;

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
      tenPhan: 'PHÃ‚N Má»šI',
      ckChecked: true,
      collapsed: false,
      dongs: [
        {
          id: Date.now().toString() + '-d1',
          stt: '1',
          congViec: 'TÃŠN Háº NG Má»¤C',
          loaiVatLieu: 'MÃ´ táº£...',
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
    const found = proposals.find((p) => p.id === proposalId || p.request_number === proposalId);
    if (found) {
      if (found.customer_name) {
        setKhachHangSelect(found.customer_id || found.customer_name);
        setTenKhachHangManual(found.customer_name);
      }
      if (found.project_name) setTenDuAn(found.project_name);
      if (found.model_scale) setTyLe(found.model_scale);
      if (found.model_size) setKichThuoc(found.model_size);
      if (found.model_needing_time) {
        const parsedDays = parseInt(found.model_needing_time.replace(/[^\d]/g, ''));
        if (parsedDays) setThoiGianSanXuat(parsedDays);
      }
      return;
    }

    if (proposalId === 'dx01') {
      setKhachHangSelect('KH001');
      setTenKhachHangManual('Táº­p Ä‘oÃ n T&T');
      setTenDuAn('MÃ´ hÃ¬nh quy hoáº¡ch phÃ¢n khu A - Táº­p Ä‘oÃ n T&T');
      setTyLe('1/500');
      setKichThuoc('2000X1500MM');
      setLoai('MÃ´ hÃ¬nh Quy hoáº¡ch');
      setLoaiBaoGiaSelect('MÃ´ hÃ¬nh Quy hoáº¡ch');
    } else if (proposalId === 'dx02') {
      setKhachHangSelect('KH004');
      setTenKhachHangManual('CÃ´ng ty CP Flamingo');
      setTenDuAn('MÃ´ hÃ¬nh kiáº¿n trÃºc resort nghá»‰ dÆ°á»¡ng Flamingo');
      setTyLe('1/200');
      setKichThuoc('1800X1200MM');
      setLoai('MÃ´ hÃ¬nh Kiáº¿n trÃºc');
      setLoaiBaoGiaSelect('MÃ´ hÃ¬nh Kiáº¿n trÃºc');
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
      congViec: 'Sáº£n xuáº¥t sa bÃ n quy hoáº¡ch Ä‘Ã´ thá»‹ 1/500',
      loaiVatLieu: 'Gá»— cÃ´ng nghiá»‡p MDF, Led, Mica...',
      soLuong: 1,
      donVi: 'm2',
      donGia: 800000000
    };
    if (loaiBaoGiaSelect === 'MÃ´ hÃ¬nh Kiáº¿n trÃºc') {
      defaultDong = {
        id: Date.now().toString() + '-d1',
        stt: '1',
        congViec: 'Sáº£n xuáº¥t mÃ´ hÃ¬nh kiáº¿n trÃºc cao táº§ng 1/200',
        loaiVatLieu: 'Nhá»±a Formex, Nhá»±a ABS, SÆ¡n cao cáº¥p...',
        soLuong: 1,
        donVi: 'bá»™',
        donGia: 1200000000
      };
    } else if (loaiBaoGiaSelect === 'MÃ´ hÃ¬nh Ná»™i tháº¥t') {
      defaultDong = {
        id: Date.now().toString() + '-d1',
        stt: '1',
        congViec: 'Sáº£n xuáº¥t sa bÃ n ná»™i tháº¥t cÄƒn há»™ luxury 1/20',
        loaiVatLieu: 'Mica táº£n sÃ¡ng, phá»¥ kiá»‡n mini...',
        soLuong: 1,
        donVi: 'cÄƒn',
        donGia: 350000000
      };
    }
    
    const newSec: BaoGiaSection = {
      id: Date.now().toString(),
      index: sections.length + 1,
      tenPhan: 'PHáº¦N MáºªU BÃO GIÃ',
      ckChecked: true,
      collapsed: false,
      dongs: [defaultDong]
    };
    setSections(prev => [...prev, newSec]);
  };

  const handleImportExcel = () => {
    alert('Nháº­p kháº©u danh má»¥c tá»« Excel thÃ nh cÃ´ng! Náº¡p 2 háº¡ng má»¥c máº«u vÃ o PhÃ¢n Ä‘oáº¡n má»›i.');
    const importedSection: BaoGiaSection = {
      id: Date.now().toString(),
      index: sections.length + 1,
      tenPhan: 'DANH Má»¤C EXCEL IMPORT',
      ckChecked: true,
      collapsed: false,
      dongs: [
        { id: Date.now().toString() + '-e1', stt: '1', congViec: 'Gia cÃ´ng pháº§n khung thÃ©p chá»‹u lá»±c mÃ´ hÃ¬nh', loaiVatLieu: 'ThÃ©p há»™p máº¡ káº½m', soLuong: 1, donVi: 'kg', donGia: 12000000 },
        { id: Date.now().toString() + '-e2', stt: '2', congViec: 'Láº¯p rÃ¡p há»‡ thá»‘ng máº¡ch Ä‘iá»‡n Ä‘iá»u khiá»ƒn led 3 cháº¿ Ä‘á»™', loaiVatLieu: 'Máº¡ch náº¡p ESP32, Relay', soLuong: 1, donVi: 'bá»™', donGia: 28000000 }
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
    let mainStatus: BaoGiaItem['trangThai'] = 'Äang soáº¡n';
    if (trangThai === 'ÄÃ£ gá»­i') mainStatus = 'ÄÃ£ gá»­i';
    else if (trangThai === 'ÄÃ£ chá»‘t') mainStatus = 'ÄÃ£ chá»‘t';
    else if (trangThai === 'Tá»« chá»‘i bÃ¡o giÃ¡') mainStatus = 'ÄÃ£ tá»« chá»‘i';
    else if (trangThai === 'Äang Ä‘Ã m phÃ¡n') mainStatus = 'Chá» duyá»‡t';
    else if (trangThai === 'Báº£n nhÃ¡p') mainStatus = 'Äang soáº¡n';

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
            <h3 className="text-base font-bold text-slate-800">Táº¡o bÃ¡o giÃ¡ má»›i</h3>
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
            <span>ThÃ´ng tin chung</span>
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
            <span>Danh má»¥c & GiÃ¡</span>
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
            <span>Äiá»u kiá»‡n bÃ¡o giÃ¡</span>
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
            <span>Há»“ sÆ¡ Ä‘Ã­nh kÃ¨m</span>
            {danhSachFile.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-[#406c89]/10 text-[#406c89]">
                {danhSachFile.length}
              </span>
            )}
          </button>
        </div>
        
        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 text-left">
          
          {/* TAB 1: THÃ”NG TIN CHUNG */}
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

          {/* TAB 2: DANH Má»¤C & GIÃ */}
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
              quoteTypeOptions={quoteTypeOptions}
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

          {/* TAB 3: ÄIá»€U KIá»†N BÃO GIÃ */}
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

          {/* TAB 4: Há»’ SÆ  ÄÃNH KÃˆM */}
          {activeTab === 'attachments' && (
            <div className="p-4 rounded-xl border border-slate-200/80 bg-[#f8fafc]/60 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                <h5 className="text-xs font-bold text-slate-800">
                  TÃ i liá»‡u / HÃ¬nh áº£nh Ä‘Ã­nh kÃ¨m (phá»¥c vá»¥ phÃª duyá»‡t)
                </h5>
                <IconChevronUp size={16} className="text-slate-400" />
              </div>

              <div className="space-y-3">
                <div>
                  <h6 className="text-xs font-bold text-slate-800">
                    TÃ i liá»‡u / HÃ¬nh áº£nh Ä‘Ã­nh kÃ¨m (phá»¥c vá»¥ phÃª duyá»‡t)
                  </h6>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Táº£i lÃªn báº£n váº½, há»“ sÆ¡, hÃ¬nh áº£nh tham kháº£o... Ä‘á»ƒ phá»¥c vá»¥ phÃª duyá»‡t bÃ¡o giÃ¡.
                  </p>
                </div>

                <div>
                  <label className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer">
                    <IconUpload size={14} className="text-[#406c89]" />
                    <span>Chá»n tá»‡p Ä‘á»ƒ táº£i lÃªn</span>
                    <input type="file" multiple className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>

                {/* File list preview */}
                {danhSachFile.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-200/50">
                    {danhSachFile.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <IconPaperclip size={14} className="text-[#406c89] shrink-0" />
                          <span className="font-medium text-slate-700 truncate max-w-[450px]">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                          title="XÃ³a tá»‡p"
                        >
                          <IconTrash size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
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
              Há»§y
            </button>
            
            {activeTab !== 'attachments' ? (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'info') {
                    const finalKh = tenKhachHangManual.trim() || khachHangSelect.trim();
                    if (!soBg.trim() || !finalKh) {
                      alert('Vui lÃ²ng Ä‘iá»n Ä‘áº§y Ä‘á»§ Sá»‘ BG vÃ  TÃªn KhÃ¡ch hÃ ng trÆ°á»›c khi tiáº¿p tá»¥c!');
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
                Tiáº¿p tá»¥c
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
              >
                XÃ¡c nháº­n
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
