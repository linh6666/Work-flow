"use client";

import React, { useState } from 'react';
import { IconX, IconPlus, IconTrash } from '@tabler/icons-react';

export interface DetailItem {
  id: string;
  dienGiai: string;
  sl: number;
  dv: string;
  donGia: number;
}

export interface MonthRecordData {
  thang: string;
  nam: number;
  loai: Array<'Đề xuất duyệt chi' | 'Hạch toán' | 'Chi thực tế'>;
  soBanGhi: number;
  tongTien: string;
}

interface ThemDeXuatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MonthRecordData) => void;
}

export default function ThemDeXuatModal({
  isOpen,
  onClose,
  onSubmit,
}: ThemDeXuatModalProps) {
  const [nam, setNam] = useState<number>(2026);
  const [thang, setThang] = useState<string>('10');
  const [loai, setLoai] = useState<string>('Đề nghị chi');
  const [nguoiDeNghi, setNguoiDeNghi] = useState<string>('');
  const [tieuDe, setTieuDe] = useState<string>('');
  const [ghiChu, setGhiChu] = useState<string>('');

  // Table items state
  const [items, setItems] = useState<DetailItem[]>([
    {
      id: 'item-1',
      dienGiai: '',
      sl: 1,
      dv: '',
      donGia: 0,
    },
  ]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `item-${Date.now()}`,
        dienGiai: '',
        sl: 1,
        dv: '',
        donGia: 0,
      },
    ]);
  };

  const handleAddGroup = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `group-${Date.now()}`,
        dienGiai: `Nhóm ${prev.length + 1}`,
        sl: 1,
        dv: '',
        donGia: 0,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (
    id: string,
    field: keyof DetailItem,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.sl || 0) * (item.donGia || 0), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = calculateTotal();
    const loaiMapped: 'Đề xuất duyệt chi' | 'Hạch toán' | 'Chi thực tế' =
      loai === 'Đề nghị chi' || loai === 'Đề xuất duyệt chi'
        ? 'Đề xuất duyệt chi'
        : loai === 'Hạch toán'
        ? 'Hạch toán'
        : 'Chi thực tế';

    onSubmit({
      thang: thang.startsWith('Tháng') ? thang : `Tháng ${thang}`,
      nam: Number(nam) || 2026,
      loai: [loaiMapped],
      soBanGhi: items.length,
      tongTien: `${total.toLocaleString('vi-VN')} đ`,
    });

    handleClose();
  };

  const handleClose = () => {
    setNam(2026);
    setThang('10');
    setLoai('Đề nghị chi');
    setNguoiDeNghi('');
    setTieuDe('');
    setGhiChu('');
    setItems([
      {
        id: 'item-1',
        dienGiai: '',
        sl: 1,
        dv: '',
        donGia: 0,
      },
    ]);
    onClose();
  };

  const totalSum = calculateTotal();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-800">Tạo mới đề nghị/hạch toán</h2>
          <button
            onClick={handleClose}
            type="button"
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 text-xs overflow-y-auto flex-1">
          {/* Row 1: Năm, Tháng, Loại, Người đề nghị */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Năm <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                required
                value={nam}
                onChange={(e) => setNam(Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Tháng <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={thang}
                onChange={(e) => setThang(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Loại</label>
              <select
                value={loai}
                onChange={(e) => setLoai(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89] cursor-pointer"
              >
                <option value="Đề nghị chi">Đề nghị chi</option>
                <option value="Hạch toán">Hạch toán</option>
                <option value="Chi thực tế">Chi thực tế</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Người đề nghị</label>
              <input
                type="text"
                value={nguoiDeNghi}
                onChange={(e) => setNguoiDeNghi(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
            </div>
          </div>

          {/* Row 2: Tên sheet/Tiêu đề, Ghi chú */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Tên sheet/Tiêu đề</label>
              <input
                type="text"
                value={tieuDe}
                onChange={(e) => setTieuDe(e.target.value)}
                placeholder="VD: Hạch toán chi tiêu, VS Công ty..."
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Ghi chú</label>
              <input
                type="text"
                value={ghiChu}
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
              />
            </div>
          </div>

          {/* Table Details */}
          <div className="border border-slate-200 rounded-lg overflow-hidden mt-3">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                <tr>
                  <th className="py-2.5 px-3 font-semibold text-center w-12 border-r border-slate-200">
                    STT
                  </th>
                  <th className="py-2.5 px-3 font-semibold border-r border-slate-200">
                    Diễn giải
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-center w-16 border-r border-slate-200">
                    SL
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-center w-20 border-r border-slate-200">
                    ĐV
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-center w-32 border-r border-slate-200">
                    Đơn giá
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-center w-36 border-r border-slate-200">
                    Thành tiền
                  </th>
                  <th className="py-2.5 px-2 w-10 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {items.map((item, index) => {
                  const thanhTien = (item.sl || 0) * (item.donGia || 0);
                  return (
                    <tr key={item.id}>
                      <td className="py-2 px-3 text-center font-medium text-slate-600 border-r border-slate-200">
                        {index + 1}
                      </td>
                      <td className="py-1.5 px-2 border-r border-slate-200">
                        <input
                          type="text"
                          value={item.dienGiai}
                          onChange={(e) =>
                            handleItemChange(item.id, 'dienGiai', e.target.value)
                          }
                          placeholder="Diễn giải..."
                          className="w-full border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                        />
                      </td>
                      <td className="py-1.5 px-2 border-r border-slate-200">
                        <input
                          type="number"
                          min={1}
                          value={item.sl}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              'sl',
                              Math.max(1, Number(e.target.value))
                            )
                          }
                          className="w-full border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 text-center focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                        />
                      </td>
                      <td className="py-1.5 px-2 border-r border-slate-200">
                        <input
                          type="text"
                          value={item.dv}
                          onChange={(e) =>
                            handleItemChange(item.id, 'dv', e.target.value)
                          }
                          className="w-full border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 text-center focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                        />
                      </td>
                      <td className="py-1.5 px-2 border-r border-slate-200">
                        <input
                          type="number"
                          min={0}
                          value={item.donGia}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              'donGia',
                              Number(e.target.value)
                            )
                          }
                          className="w-full border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 text-right focus:outline-none focus:ring-1 focus:ring-[#406c89]"
                        />
                      </td>
                      <td className="py-2 px-3 text-right font-medium text-slate-800 border-r border-slate-200">
                        {thanhTien.toLocaleString('vi-VN')}
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-rose-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          title="Xóa dòng"
                        >
                          <IconTrash size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {/* Total Row */}
                <tr className="bg-slate-50/70 border-t border-slate-200">
                  <td
                    colSpan={5}
                    className="py-2.5 px-4 text-right font-bold text-slate-800 border-r border-slate-200"
                  >
                    TỔNG:
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900 border-r border-slate-200">
                    {totalSum.toLocaleString('vi-VN')}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Add Item / Group Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleAddItem}
              className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs font-medium"
            >
              <IconPlus size={14} />
              <span>Thêm hạng mục</span>
            </button>

            <button
              type="button"
              onClick={handleAddGroup}
              className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs font-medium"
            >
              <IconPlus size={14} />
              <span>Thêm nhóm (I, II, III...)</span>
            </button>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 text-xs font-medium text-white bg-[#406c89] hover:bg-[#345870] rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
