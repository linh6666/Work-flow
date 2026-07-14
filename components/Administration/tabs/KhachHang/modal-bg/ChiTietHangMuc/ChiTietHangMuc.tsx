import React from 'react';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { ItemBaoGia } from '../LapBgModal';

interface ChiTietHangMucProps {
  items: ItemBaoGia[];
  handleAddItem: () => void;
  handleRemoveItem: (id: string) => void;
  handleItemChange: (id: string, key: keyof ItemBaoGia, value: string | number) => void;
  formatCurrency: (amount: number) => string;
}

export default function ChiTietHangMuc({
  items,
  handleAddItem,
  handleRemoveItem,
  handleItemChange,
  formatCurrency,
}: ChiTietHangMucProps) {
  return (
    <div className="space-y-4 tab-content-active">
      {/* SECTION: HẠNG MỤC CHI TIẾT BÁO GIÁ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="block text-xs font-bold text-slate-500 tracking-wide">
            CHI TIẾT HẠNG MỤC BÁO GIÁ
          </span>
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded px-2.5 py-1 transition-all cursor-pointer"
          >
            <IconPlus size={14} />
            Thêm hạng mục
          </button>
        </div>

        {/* Items Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="px-4 py-2.5 w-[5%] text-center">STT</th>
                <th className="px-4 py-2.5 w-[45%]">Tên hạng mục / Nội dung yêu cầu *</th>
                <th className="px-4 py-2.5 w-[12%]">Đơn vị</th>
                <th className="px-4 py-2.5 w-[10%] text-center">Số lượng</th>
                <th className="px-4 py-2.5 w-[15%] text-right">Đơn giá (VNĐ)</th>
                <th className="px-4 py-2.5 w-[15%] text-right">Thành tiền</th>
                <th className="px-4 py-2.5 w-[5%] text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-2.5 text-center font-medium text-slate-400 select-none">
                    {idx + 1}
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      required
                      placeholder="Tên hạng mục..."
                      value={item.tenHangMuc}
                      onChange={(e) => handleItemChange(item.id, 'tenHangMuc', e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-200 rounded focus:outline-none focus:border-amber-500 bg-white"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      placeholder="Bộ/Gói/Cái..."
                      value={item.donViTinh}
                      onChange={(e) => handleItemChange(item.id, 'donViTinh', e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-200 rounded focus:outline-none focus:border-amber-500 bg-white"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      min="1"
                      value={item.soLuong}
                      onChange={(e) => handleItemChange(item.id, 'soLuong', Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-2 py-1.5 border border-slate-200 rounded text-center focus:outline-none focus:border-amber-500 bg-white"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      min="0"
                      value={item.donGia}
                      onChange={(e) => handleItemChange(item.id, 'donGia', Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-2 py-1.5 border border-slate-200 rounded text-right focus:outline-none focus:border-amber-500 bg-white"
                    />
                  </td>
                  <td className="px-4 py-2.5 text-right font-bold text-slate-700 select-none">
                    {formatCurrency(item.soLuong * item.donGia)}
                  </td>
                  <td className="px-2 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                      title="Xóa hạng mục"
                    >
                      <IconTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
