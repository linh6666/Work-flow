"use client";

import React, { useState } from 'react';
import {
  IconUpload,
  IconBolt,
  IconPlus,
  IconWand,
  IconPencil,
  IconTrash,
  IconCloudUpload
} from '@tabler/icons-react';
import ThemDieuKhoanModal from './modal/ThemDieuKhoan';

interface DieuKhoanItem {
  id: string;
  title: string;
  content: string;
}

interface DieuKhoanThanhToanTabProps {
  [key: string]: any;
}

export default function DieuKhoanThanhToanTab({}: DieuKhoanThanhToanTabProps) {
  const [isThemModalOpen, setIsThemModalOpen] = useState(false);

  const [dieuKhoanList, setDieuKhoanList] = useState<DieuKhoanItem[]>([
    {
      id: 'dk-1',
      title: 'ĐIỀU 1 - NỘI DUNG CÔNG VIỆC - Tên sản phẩm',
      content: 'MÔ HÌNH "{project_name}" (Dưới đây gọi tắt là "mô hình")',
    },
    {
      id: 'dk-2',
      title: 'ĐIỀU 1 - NỘI DUNG CÔNG VIỆC - Số lượng',
      content: '01',
    },
    {
      id: 'dk-3',
      title: 'ĐIỀU 1 - NỘI DUNG CÔNG VIỆC - Tì lệ',
      content: '{scale}',
    },
  ]);

  const [thoiGianSanXuat, setThoiGianSanXuat] = useState<number>(60);
  const [baoHanhThang, setBaoHanhThang] = useState<number>(18);

  const handleAddNewTerm = (title: string, content: string) => {
    const newDk: DieuKhoanItem = {
      id: `dk-${Date.now()}`,
      title,
      content,
    };
    setDieuKhoanList((prev) => [...prev, newDk]);
  };

  const handleDelete = (id: string) => {
    setDieuKhoanList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="space-y-4 animate-fade-in text-xs text-slate-700">
        
        {/* BANNER 1: LẬP HỢP ĐỒNG THEO MẪU KHÁCH HÀNG GỬI */}
        <div className="bg-[#406c89]/5 border border-[#406c89]/20 rounded-2xl p-4 sm:p-5 space-y-3 select-none">
          
          {/* Title Row */}
          <div className="flex items-center gap-2 text-[#406c89] font-bold text-xs tracking-wide uppercase">
            <div className="flex items-center gap-1">
              <IconUpload size={16} />
              <IconCloudUpload size={16} />
            </div>
            <span>LẬP HỢP ĐỒNG THEO MẪU KHÁCH HÀNG GỬI</span>
          </div>

          {/* Description */}
          <p className="text-xs text-[#406c89]/90 leading-relaxed font-normal">
            Tải lên file hợp đồng mà Khách hàng gửi, AI sẽ trích xuất điều khoản và thông tin để bạn chỉnh sửa cho phù hợp hai bên.
          </p>

          {/* Upload Button */}
          <div>
            <label className="px-4 py-2.5 bg-white border border-[#406c89]/30 text-[#406c89] hover:bg-[#406c89]/10 rounded-xl text-xs font-semibold transition-colors shadow-2xs inline-flex items-center gap-2 cursor-pointer">
              <IconUpload size={16} />
              <span>Chọn file hợp đồng của Khách hàng</span>
              <input type="file" className="hidden" />
            </label>
          </div>

        </div>

        {/* SECTION 2: DANH SÁCH ĐIỀU KHOẢN & ACTION BUTTONS */}
        <div className="flex items-center justify-between pt-1">
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wide">
            DANH SÁCH ĐIỀU KHOẢN <span className="text-[#406c89] font-extrabold">({dieuKhoanList.length} MỤC)</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              <IconBolt size={16} className="text-amber-500" />
              <span>Nạp mặc định</span>
            </button>

            <button
              type="button"
              onClick={() => setIsThemModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#406c89] hover:bg-[#345972] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <IconPlus size={16} />
              <span>Thêm mới</span>
            </button>
          </div>
        </div>

        {/* SECTION 3: TERMS LIST CARDS */}
        <div className="space-y-3 max-h-[35vh] overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {dieuKhoanList.map((item) => (
            <div
              key={item.id}
              className="bg-[#f8fafc]/90 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all hover:border-slate-300"
            >
              {/* Left Content */}
              <div className="space-y-1">
                <h5 className="font-bold text-slate-900 text-xs tracking-wide">
                  {item.title}
                </h5>
                <p className="text-xs text-slate-400 font-normal">
                  {item.content}
                </p>
              </div>

              {/* Right Action Icons (3 rounded square buttons) */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  title="AI Tối ưu"
                  className="p-2 bg-white border border-[#406c89]/30 text-[#406c89] hover:bg-[#406c89]/10 rounded-xl transition-colors cursor-pointer shadow-2xs"
                >
                  <IconWand size={16} />
                </button>

                <button
                  type="button"
                  title="Chỉnh sửa"
                  className="p-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer shadow-2xs"
                >
                  <IconPencil size={16} />
                </button>

                <button
                  type="button"
                  title="Xóa"
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white border border-red-200 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer shadow-2xs"
                >
                  <IconTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 4: THAM SỐ THAM KHẢO */}
        <div className="pt-2 space-y-3">
          <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
            THAM SỐ THAM KHẢO
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Thời gian sản xuất (ngày)
              </label>
              <input
                type="number"
                value={thoiGianSanXuat}
                onChange={(e) => setThoiGianSanXuat(parseInt(e.target.value) || 0)}
                className="w-full text-xs bg-[#f8fafc]/90 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Bảo hành (tháng)
              </label>
              <input
                type="number"
                value={baoHanhThang}
                onChange={(e) => setBaoHanhThang(parseInt(e.target.value) || 0)}
                className="w-full text-xs bg-[#f8fafc]/90 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] transition-all font-mono"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Modal Thêm Điều Khoản Mới */}
      <ThemDieuKhoanModal
        isOpen={isThemModalOpen}
        onClose={() => setIsThemModalOpen(false)}
        onAdd={handleAddNewTerm}
      />
    </>
  );
}
