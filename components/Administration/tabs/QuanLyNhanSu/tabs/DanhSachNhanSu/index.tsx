"use client";

import React, { useState, useMemo } from 'react';
import {
  IconSearch,
  IconDownload,
  IconUpload,
  IconPlus,
  IconPencil,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconX,
  IconCheck,
  IconUser,
  IconPhone,
  IconMail,
} from '@tabler/icons-react';

// ─── Data Types ───────────────────────────────────────────────────────
export type TrangThaiNhanSu = 'dang-lam-viec' | 'thu-viec' | 'tam-nghi' | 'da-nghi';

export interface NhanSuItem {
  id: string;
  maNV: string;
  hoTen: string;
  avatar?: string;
  phongBan: string;
  chucVu: string;
  gioiTinh: 'Nam' | 'Nữ';
  soDienThoai: string;
  email: string;
  ngayVaoLam: string;
  trangThai: TrangThaiNhanSu;
}

// ─── Mock Data ────────────────────────────────────────────────────────
const INITIAL_DATA: NhanSuItem[] = [
  {
    id: '1',
    maNV: 'NV001',
    hoTen: 'Bùi Thị Duyên',
    phongBan: 'Phòng Kinh doanh',
    chucVu: 'Trưởng phòng Kinh doanh',
    gioiTinh: 'Nữ',
    soDienThoai: '0981 234 567',
    email: 'duyen.bt@mohinhtay.vn',
    ngayVaoLam: '2023-03-15',
    trangThai: 'dang-lam-viec',
  },
  {
    id: '2',
    maNV: 'NV002',
    hoTen: 'Nguyễn Phú Quang',
    phongBan: 'Phòng Khai triển',
    chucVu: 'Trưởng phòng Khai triển',
    gioiTinh: 'Nam',
    soDienThoai: '0972 345 678',
    email: 'quang.np@mohinhtay.vn',
    ngayVaoLam: '2022-08-01',
    trangThai: 'dang-lam-viec',
  },
  {
    id: '3',
    maNV: 'NV003',
    hoTen: 'Kỳ Anh',
    phongBan: 'Phòng Cảnh Quan',
    chucVu: 'Chuyên viên Cảnh quan',
    gioiTinh: 'Nam',
    soDienThoai: '0912 456 789',
    email: 'kyanh@mohinhtay.vn',
    ngayVaoLam: '2024-01-10',
    trangThai: 'dang-lam-viec',
  },
  {
    id: '4',
    maNV: 'NV004',
    hoTen: 'Bùi Phương Uyên',
    phongBan: 'Phòng Điện',
    chucVu: 'Kỹ sư Điện & Chiếu sáng',
    gioiTinh: 'Nữ',
    soDienThoai: '0903 567 890',
    email: 'uyen.bp@mohinhtay.vn',
    ngayVaoLam: '2023-11-20',
    trangThai: 'dang-lam-viec',
  },
  {
    id: '5',
    maNV: 'NV005',
    hoTen: 'Thao Phung',
    phongBan: 'Phòng Mộc Sơn',
    chucVu: 'Kỹ thuật viên Sơn hoàn thiện',
    gioiTinh: 'Nữ',
    soDienThoai: '0964 678 901',
    email: 'thao.phung@mohinhtay.vn',
    ngayVaoLam: '2024-05-02',
    trangThai: 'thu-viec',
  },
  {
    id: '6',
    maNV: 'NV006',
    hoTen: 'Lê Hoàng Long',
    phongBan: 'Phòng Cắt',
    chucVu: 'Kỹ thuật viên Laser & CNC',
    gioiTinh: 'Nam',
    soDienThoai: '0935 789 012',
    email: 'long.lh@mohinhtay.vn',
    ngayVaoLam: '2023-06-12',
    trangThai: 'dang-lam-viec',
  },
  {
    id: '7',
    maNV: 'NV007',
    hoTen: 'Trần Văn Mạnh',
    phongBan: 'Lắp đặt',
    chucVu: 'Đội trưởng Lắp đặt công trình',
    gioiTinh: 'Nam',
    soDienThoai: '0946 890 123',
    email: 'manh.tv@mohinhtay.vn',
    ngayVaoLam: '2022-10-15',
    trangThai: 'dang-lam-viec',
  },
  {
    id: '8',
    maNV: 'NV008',
    hoTen: 'Phạm Minh Trang',
    phongBan: 'Phòng Công nghệ và Thiết kế',
    chucVu: 'Kiến trúc sư 3D',
    gioiTinh: 'Nữ',
    soDienThoai: '0927 901 234',
    email: 'trang.pm@mohinhtay.vn',
    ngayVaoLam: '2024-06-01',
    trangThai: 'thu-viec',
  },
];

const PHONG_BAN_LIST = [
  'Phòng Kinh doanh',
  'Phòng Khai triển',
  'Phòng Cắt',
  'Phòng Ghép',
  'Phòng Mộc Sơn',
  'Phòng Điện',
  'Phòng Cảnh Quan',
  'Phòng Công nghệ và Thiết kế',
  'Lắp đặt',
  'Kế toán & Hành chính',
];

export default function DanhSachNhanSuTab() {
  const [data, setData] = useState<NhanSuItem[]>(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [filterPhongBan, setFilterPhongBan] = useState('ALL');
  const [filterTrangThai, setFilterTrangThai] = useState('ALL');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NhanSuItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<NhanSuItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<NhanSuItem>>({
    maNV: '',
    hoTen: '',
    phongBan: PHONG_BAN_LIST[0],
    chucVu: '',
    gioiTinh: 'Nam',
    soDienThoai: '',
    email: '',
    ngayVaoLam: new Date().toISOString().split('T')[0],
    trangThai: 'dang-lam-viec',
  });

  // Filtered data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.hoTen.toLowerCase().includes(q) ||
        item.maNV.toLowerCase().includes(q) ||
        item.phongBan.toLowerCase().includes(q) ||
        item.chucVu.toLowerCase().includes(q) ||
        item.soDienThoai.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q);

      const matchPB = filterPhongBan === 'ALL' || item.phongBan === filterPhongBan;
      const matchTT = filterTrangThai === 'ALL' || item.trangThai === filterTrangThai;

      return matchSearch && matchPB && matchTT;
    });
  }, [data, search, filterPhongBan, filterTrangThai]);

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRecords);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset page when filtering
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  // Add / Edit Handlers
  const handleOpenAdd = () => {
    const nextNum = (data.length + 1).toString().padStart(3, '0');
    setFormData({
      maNV: `NV${nextNum}`,
      hoTen: '',
      phongBan: PHONG_BAN_LIST[0],
      chucVu: '',
      gioiTinh: 'Nam',
      soDienThoai: '',
      email: '',
      ngayVaoLam: new Date().toISOString().split('T')[0],
      trangThai: 'dang-lam-viec',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item: NhanSuItem) => {
    setEditingItem(item);
    setFormData({ ...item });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hoTen || !formData.maNV) {
      alert('Vui lòng nhập đầy đủ Mã NV và Họ tên!');
      return;
    }

    if (editingItem) {
      setData((prev) =>
        prev.map((item) => (item.id === editingItem.id ? ({ ...item, ...formData } as NhanSuItem) : item))
      );
      setEditingItem(null);
    } else {
      const newItem: NhanSuItem = {
        ...(formData as NhanSuItem),
        id: Date.now().toString(),
      };
      setData((prev) => [newItem, ...prev]);
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingItem) {
      setData((prev) => prev.filter((i) => i.id !== deletingItem.id));
      setDeletingItem(null);
    }
  };

  // Render Status Badge
  const renderStatusBadge = (status: TrangThaiNhanSu) => {
    switch (status) {
      case 'dang-lam-viec':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Đang làm việc
          </span>
        );
      case 'thu-viec':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Thử việc
          </span>
        );
      case 'tam-nghi':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-sky-700 bg-sky-50 border border-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
            Tạm nghỉ
          </span>
        );
      case 'da-nghi':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            Đã nghỉ
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      {/* ── Top Toolbar (Matched to design image) ── */}
      <div className="px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 shrink-0">
        {/* Search Input */}
        <div className="relative w-full sm:w-[360px] md:w-[420px]">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên, mã NV, phòng ban, chức vụ..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all shadow-2xs"
          />
        </div>

        {/* Action Buttons: Export, Import, + Thêm */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => alert('Xuất danh sách nhân sự sang Excel thành công!')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <IconDownload size={14} className="text-slate-600" />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Chức năng Import danh sách nhân sự')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <IconUpload size={14} className="text-slate-600" />
            <span>Import</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            style={{ backgroundColor: '#406c89' }}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold text-white rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#30536b')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#406c89')}
          >
            <IconPlus size={15} />
            <span>Thêm</span>
          </button>
        </div>
      </div>

      {/* ── Table Container ── */}
      <div className="flex-1 min-h-0 px-5 py-3 flex flex-col">
        <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
          {/* Table */}
          <div className="flex-1 overflow-auto min-h-0 no-scrollbar">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 shadow-2xs">
                <tr>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Mã NV</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs">Họ và tên</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Phòng ban</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Chức vụ</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Giới tính</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Số điện thoại</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Email</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Ngày vào làm</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs whitespace-nowrap">Trạng thái</th>
                  <th className="px-4 py-3 font-bold text-slate-600 text-xs text-right whitespace-nowrap">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-12 text-slate-400">
                      <IconUser size={36} className="mx-auto mb-2 text-slate-300 stroke-1" />
                      <p className="font-semibold text-xs text-slate-600">Không tìm thấy nhân sự phù hợp</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Thử thay đổi từ khóa tìm kiếm</p>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                      {/* Mã NV */}
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap font-bold text-slate-700">
                        {item.maNV}
                      </td>

                      {/* Họ và tên */}
                      <td className="px-4 py-3.5 align-middle">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0 border border-indigo-100">
                            {item.hoTen.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-800 text-xs">{item.hoTen}</span>
                        </div>
                      </td>

                      {/* Phòng ban */}
                      <td className="px-4 py-3.5 align-middle text-slate-600 font-medium whitespace-nowrap">
                        {item.phongBan}
                      </td>

                      {/* Chức vụ */}
                      <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">
                        {item.chucVu}
                      </td>

                      {/* Giới tính */}
                      <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">
                        {item.gioiTinh}
                      </td>

                      {/* Số điện thoại */}
                      <td className="px-4 py-3.5 align-middle text-slate-600 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                          <IconPhone size={12} className="text-slate-400" />
                          {item.soDienThoai}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3.5 align-middle text-slate-500 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                          <IconMail size={12} className="text-slate-400" />
                          {item.email}
                        </span>
                      </td>

                      {/* Ngày vào làm */}
                      <td className="px-4 py-3.5 align-middle text-slate-500 whitespace-nowrap">
                        {item.ngayVaoLam}
                      </td>

                      {/* Trạng thái */}
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        {renderStatusBadge(item.trangThai)}
                      </td>

                      {/* Thao tác */}
                      <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            title="Chỉnh sửa"
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                          >
                            <IconPencil size={13} />
                          </button>
                          <button
                            type="button"
                            title="Xóa"
                            onClick={() => setDeletingItem(item)}
                            className="p-1.5 rounded border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                          >
                            <IconTrash size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="shrink-0 border-t border-slate-100 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/60">
            <div>
              Hiển thị <span className="font-bold text-slate-700">{totalRecords > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-slate-700">{endIndex}</span> trên tổng số <span className="font-bold text-slate-700">{totalRecords}</span> nhân sự
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <IconChevronLeft size={13} />
                <span>Trước</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  style={currentPage === page ? { backgroundColor: '#406c89' } : {}}
                  className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                    currentPage === page
                      ? 'text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Sau</span>
                <IconChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal Thêm / Chỉnh sửa Nhân sự ── */}
      {(isAddModalOpen || editingItem) && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-800">
                {editingItem ? 'Chỉnh sửa thông tin Nhân sự' : 'Thêm Nhân sự mới'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingItem(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <IconX size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveModal} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mã NV <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.maNV || ''}
                    onChange={(e) => setFormData({ ...formData, maNV: e.target.value })}
                    className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                    placeholder="VD: NV009"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.hoTen || ''}
                    onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
                    className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                    placeholder="VD: Nguyễn Văn A"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phòng ban</label>
                  <select
                    value={formData.phongBan}
                    onChange={(e) => setFormData({ ...formData, phongBan: e.target.value })}
                    className="w-full h-8 px-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 bg-white"
                  >
                    {PHONG_BAN_LIST.map((pb) => (
                      <option key={pb} value={pb}>{pb}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Chức vụ</label>
                  <input
                    type="text"
                    value={formData.chucVu || ''}
                    onChange={(e) => setFormData({ ...formData, chucVu: e.target.value })}
                    className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                    placeholder="VD: Kỹ thuật viên"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Giới tính</label>
                  <select
                    value={formData.gioiTinh}
                    onChange={(e) => setFormData({ ...formData, gioiTinh: e.target.value as 'Nam' | 'Nữ' })}
                    className="w-full h-8 px-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 bg-white"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    value={formData.soDienThoai || ''}
                    onChange={(e) => setFormData({ ...formData, soDienThoai: e.target.value })}
                    className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                    placeholder="09xx xxx xxx"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-8 px-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-400"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ngày vào làm</label>
                  <input
                    type="date"
                    value={formData.ngayVaoLam || ''}
                    onChange={(e) => setFormData({ ...formData, ngayVaoLam: e.target.value })}
                    className="w-full h-8 px-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Trạng thái làm việc</label>
                <select
                  value={formData.trangThai}
                  onChange={(e) => setFormData({ ...formData, trangThai: e.target.value as TrangThaiNhanSu })}
                  className="w-full h-8 px-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 bg-white"
                >
                  <option value="dang-lam-viec">Đang làm việc</option>
                  <option value="thu-viec">Thử việc</option>
                  <option value="tam-nghi">Tạm nghỉ</option>
                  <option value="da-nghi">Đã nghỉ</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: '#406c89' }}
                  className="px-4 py-1.5 rounded-lg text-white font-bold shadow-sm cursor-pointer transition"
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#30536b')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#406c89')}
                >
                  {editingItem ? 'Lưu thay đổi' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal Xóa Nhân sự ── */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-150 p-5 text-center">
            <div className="w-11 h-11 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <IconTrash size={22} />
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">Xác nhận xóa nhân sự</h4>
            <p className="text-xs text-slate-500 mb-4">
              Bạn có chắc chắn muốn xóa nhân sự <span className="font-bold text-slate-700">{deletingItem.hoTen}</span> ({deletingItem.maNV}) không?
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer transition"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm cursor-pointer transition"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
