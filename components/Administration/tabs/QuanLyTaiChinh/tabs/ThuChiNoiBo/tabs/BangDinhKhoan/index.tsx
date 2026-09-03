"use client";

import React, { useState } from 'react';
import {
  IconPlus,
  IconSearch,
  IconPencil,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';

import ThemMaModal from './modals/ThemMaModal';

export interface DinhKhoanItem {
  id: string;
  maDk: string;
  acc?: string;
  noiDung: string;
  nhom: string;
  dienGiai?: string;
}

const INITIAL_DINH_KHOAN: DinhKhoanItem[] = [
  // Bảng lương
  { id: 'dk-1', maDk: '11', acc: '—', noiDung: 'Lương cứng', nhom: 'Bảng lương', dienGiai: 'Lương cơ bản' },
  { id: 'dk-2', maDk: '14', acc: '—', noiDung: 'Lương kinh doanh (Lương mềm)', nhom: 'Bảng lương', dienGiai: 'Lương mềm theo hiệu suất tháng' },
  { id: 'dk-3', maDk: '12', acc: '—', noiDung: 'Phụ cấp ăn trưa', nhom: 'Bảng lương', dienGiai: 'Phụ cấp ăn trưa của nhân viên được công ty h...' },
  { id: 'dk-4', maDk: '19', acc: '—', noiDung: 'Trợ cấp xăng xe +dien thoai', nhom: 'Bảng lương', dienGiai: 'Trợ cấp xăng xe và trợ cấp điện thoại' },
  { id: 'dk-5', maDk: '13', acc: '—', noiDung: 'Bảo hiểm y tế - XH- that nghiep', nhom: 'Bảng lương', dienGiai: 'Bảo hiểm y tế, bảo hiểm xã hội, bảo hiểm thất ...' },
  { id: 'dk-6', maDk: '8', acc: '—', noiDung: 'Lương làm thêm giờ', nhom: 'Bảng lương', dienGiai: 'Lương làm thêm giờ' },
  { id: 'dk-7', maDk: '15', acc: '—', noiDung: 'Thưởng Kết quả Kinh doanh cuối năm', nhom: 'Bảng lương', dienGiai: 'Thưởng hiệu quả kinh doanh' },
  { id: 'dk-8', maDk: '9', acc: '—', noiDung: 'Trợ cấp thai sản', nhom: 'Bảng lương', dienGiai: '—' },
  { id: 'dk-9', maDk: '16', acc: '—', noiDung: 'Thưởng lễ tết và các thưởng khác', nhom: 'Bảng lương', dienGiai: 'Thưởng 30/4 và 1/5, 2-9, thưởng tết âm lịch, th...' },
  { id: 'dk-10', maDk: '18', acc: '—', noiDung: 'Trợ cấp nghề', nhom: 'Bảng lương', dienGiai: 'Trợ cấp nghề nghiệp' },

  // Tuyển dụng và đào tạo
  { id: 'dk-11', maDk: '21', acc: '—', noiDung: 'Tuyển dụng NV', nhom: 'Tuyển dụng và đào tạo', dienGiai: 'Gồm đăng báo tuyển dụng, tuyển dụng qua m...' },
  { id: 'dk-12', maDk: '22', acc: '—', noiDung: 'Đào tạo NV - Trong nước', nhom: 'Tuyển dụng và đào tạo', dienGiai: 'Chi phí đào tạo nhân viên trong nước' },
  { id: 'dk-13', maDk: '23', acc: '—', noiDung: 'Đào tạo NV - Nước ngoài', nhom: 'Tuyển dụng và đào tạo', dienGiai: 'Chi phí đào tạo nhân viên ngoài nước' },

  // Sử dụng các NVL khác có mức kiểm soát
  { id: 'dk-14', maDk: '31', acc: '—', noiDung: 'Xăng/ Dầu', nhom: 'Sử dụng các NVL khác có mức kiểm soát', dienGiai: 'Chi phí xăng, dầu' },
  { id: 'dk-15', maDk: '32', acc: '—', noiDung: 'Các chi phí vật liệu phụ khác', nhom: 'Sử dụng các NVL khác có mức kiểm soát', dienGiai: 'Các chi phí vật liệu phụ khác' },
  { id: 'dk-16', maDk: '33', acc: '—', noiDung: 'Chi phí đóng gói hàng hoá', nhom: 'Sử dụng các NVL khác có mức kiểm soát', dienGiai: 'Gồm nilon đậy mô hình, giấy bìa...' },
  { id: 'dk-17', maDk: '34', acc: '—', noiDung: 'Lưu kho bãi', nhom: 'Sử dụng các NVL khác có mức kiểm soát', dienGiai: 'Chi phí lưu hàng tại kho bãi' },
  { id: 'dk-18', maDk: '35', acc: '—', noiDung: 'Chi phí khác', nhom: 'Sử dụng các NVL khác có mức kiểm soát', dienGiai: 'Chi phí khác' },

  // Nguyên vật liệu mua mới
  { id: 'dk-19', maDk: '41', acc: '—', noiDung: 'Sơn', nhom: 'Nguyên vật liệu mua mới', dienGiai: 'Gồm các loại sơn toa, ve màu, sơn công nghệ...' },
  { id: 'dk-20', maDk: '42', acc: '—', noiDung: 'Mica', nhom: 'Nguyên vật liệu mua mới', dienGiai: 'Gồm mica các loại từ độ dày 0.5mm đến 20mm' },
  { id: 'dk-21', maDk: '43', acc: '—', noiDung: 'Giấy', nhom: 'Nguyên vật liệu mua mới', dienGiai: 'Gồm giấy làm cỏ, giấy bìa, giấy mỹ thuật...' },
  { id: 'dk-22', maDk: '44', acc: '—', noiDung: 'Formech', nhom: 'Nguyên vật liệu mua mới', dienGiai: 'Gồm fomex các loại độ dày từ 2mm đến 10mm...' },
  { id: 'dk-23', maDk: '45', acc: '—', noiDung: 'Đồ điện', nhom: 'Nguyên vật liệu mua mới', dienGiai: 'Gồm đèn LED, mạch điện, dây điện, công tắc, ...' },
  { id: 'dk-24', maDk: '451', acc: '—', noiDung: 'Công nghệ', nhom: 'Nguyên vật liệu mua mới', dienGiai: 'Mạch điều khiển, thiết bị điều khiển cho phần ...' },
  { id: 'dk-25', maDk: '46', acc: '—', noiDung: 'Kính', nhom: 'Nguyên vật liệu mua mới', dienGiai: 'Gồm Kính temper, kính LD Việt Nhật, kẹp kính' },
  { id: 'dk-26', maDk: '47', acc: '—', noiDung: 'Gỗ', nhom: 'Nguyên vật liệu mua mới', dienGiai: 'Gồm các loại gỗ ép công nghiệp, gỗ veneer, g...' },
  { id: 'dk-27', maDk: '471', acc: '—', noiDung: 'Bánh xe', nhom: 'Nguyên vật liệu mua mới', dienGiai: 'Bánh xe các loại cho chân' },

  // Công cụ dụng cụ & Các nhóm khác
  { id: 'dk-28', maDk: '51', acc: '—', noiDung: 'Mua mới công cụ', nhom: 'Công cụ dụng cụ', dienGiai: 'Mua sắm công cụ dụng cụ sản xuất' },
  { id: 'dk-29', maDk: '52', acc: '—', noiDung: 'Mua mới máy móc các loại', nhom: 'Công cụ dụng cụ', dienGiai: 'Máy cắt, máy CNC, máy laser' },
  { id: 'dk-30', maDk: '63', acc: '—', noiDung: 'Văn phòng phẩm', nhom: 'Chi phí văn phòng', dienGiai: 'Giấy in, bút, sổ sách văn phòng' },
  { id: 'dk-31', maDk: '71', acc: '—', noiDung: 'Thuế kinh doanh (Doanh thu)', nhom: 'Thuế, phí và phụ phí', dienGiai: 'Thuế giá trị gia tăng và thuế TNDN' },
  { id: 'dk-32', maDk: '81', acc: '—', noiDung: 'Chi phí vận chuyển hàng hoá nội địa', nhom: 'Vận chuyển hàng hoá', dienGiai: 'Cước xe vận chuyển sản phẩm' },
  { id: 'dk-33', maDk: '91', acc: '—', noiDung: 'Phí kiểm toán', nhom: 'Phí cho các nhà dịch vụ chuyên nghiệp', dienGiai: 'Chi phí kiểm toán báo cáo tài chính' },
];

export default function BangDinhKhoanTab() {
  const [list, setList] = useState<DinhKhoanItem[]>(INITIAL_DINH_KHOAN);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DinhKhoanItem | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleAddOrEdit = (itemData: Omit<DinhKhoanItem, 'id'>) => {
    if (editingItem) {
      setList((prev) =>
        prev.map((item) => (item.id === editingItem.id ? { ...item, ...itemData } : item))
      );
      setEditingItem(null);
    } else {
      setList((prev) => [{ id: `dk-${Date.now()}`, ...itemData }, ...prev]);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Xoá mã định khoản này?')) {
      setList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const filtered = list.filter((item) => {
    const q = search.toLowerCase();
    return (
      !q ||
      item.maDk.toLowerCase().includes(q) ||
      item.noiDung.toLowerCase().includes(q) ||
      item.nhom.toLowerCase().includes(q) ||
      (item.dienGiai ?? '').toLowerCase().includes(q)
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedList = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-3.5 overflow-hidden">
      {/* Top Toolbar */}
      <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-xs shrink-0 flex items-center justify-between gap-2 flex-wrap">
        <div className="relative">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Tìm theo mã ĐK, nội dung, nhóm..."
            className="pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 w-72 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2d4a63] text-white text-xs font-bold hover:bg-[#1e3448] cursor-pointer transition-colors ml-auto shadow-xs"
        >
          <IconPlus size={14} /> Thêm mã
        </button>
      </div>

      {/* Main Code Directory Table with Increased Sizing */}
      <div className="flex-1 overflow-hidden bg-white border border-slate-200/80 rounded-xl shadow-xs flex flex-col min-h-0">
        <div className="overflow-x-auto shrink-0">
          <div className="grid grid-cols-[90px_70px_2.2fr_2fr_3fr_90px] gap-3 px-5 py-3 border-b border-slate-200/80 text-xs font-bold text-slate-600 bg-slate-50 rounded-t-xl min-w-[800px]">
            <span>Mã ĐK</span>
            <span className="text-center">Acc</span>
            <span>Nội dung</span>
            <span>Nhóm</span>
            <span>Diễn giải</span>
            <span className="text-right">Thao tác</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-auto divide-y divide-slate-100 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {paginatedList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 min-w-[800px]">
              <p className="text-sm font-medium">Không tìm thấy mã định khoản nào</p>
            </div>
          ) : (
            paginatedList.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[90px_70px_2.2fr_2fr_3fr_90px] gap-3 px-5 py-3.5 items-center hover:bg-slate-50/70 transition-colors min-w-[800px] text-xs"
              >
                <span className="font-extrabold text-slate-800 text-xs font-mono">{item.maDk}</span>
                <span className="text-center text-slate-400 text-xs">{item.acc || '—'}</span>
                <span className="font-bold text-slate-800 text-xs truncate">{item.noiDung}</span>
                <span className="text-xs text-slate-500 font-medium truncate">{item.nhom}</span>
                <span className="text-xs text-slate-500 truncate">{item.dienGiai || '—'}</span>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(item);
                      setIsModalOpen(true);
                    }}
                    className="p-1.5 rounded-md text-[#6366f1] hover:bg-indigo-50 cursor-pointer transition-colors"
                    title="Chỉnh sửa"
                  >
                    <IconPencil size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-md text-rose-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                    title="Xoá"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination & Count Footer */}
        <div className="border-t border-slate-100 px-5 py-2.5 flex items-center justify-between text-xs text-slate-500 bg-slate-50/60 rounded-b-xl shrink-0 flex-wrap gap-2">
          <div>
            Hiển thị <span className="font-bold text-slate-700">{filtered.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> –{' '}
            <span className="font-bold text-slate-700">{Math.min(currentPage * itemsPerPage, filtered.length)}</span> trên tổng số{' '}
            <span className="font-bold text-[#406c89]">{filtered.length}</span> mã định khoản
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400">Hiển thị:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer"
              >
                <option value={10}>10 dòng / trang</option>
                <option value={15}>15 dòng / trang</option>
                <option value={20}>20 dòng / trang</option>
                <option value={50}>50 dòng / trang</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Trang trước"
              >
                <IconChevronLeft size={15} />
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setCurrentPage(p)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    currentPage === p
                      ? 'bg-[#406c89] text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Trang sau"
              >
                <IconChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ThemMaModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={handleAddOrEdit}
        editingItem={editingItem}
      />
    </div>
  );
}
