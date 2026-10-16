"use client";

import React, { useState, useEffect } from 'react';
import {
  IconPlus,
  IconCalendar,
  IconChevronDown,
  IconTrash,
} from '@tabler/icons-react';
import type { DeXuatHachToanItem } from '../../types';

export interface TableItemRow {
  id: string;
  dienGiai: string;
  sl: number | string;
  dv: string;
  donGia: number | string;
  dinhKhoan?: string;
  ngayChi?: string;
  hanChi?: string;
}

interface SuaDeXuatModalProps {
  isOpen: boolean;
  record: DeXuatHachToanItem | null;
  onClose: () => void;
  onSubmit: (updatedData: DeXuatHachToanItem) => void;
}

export default function SuaDeXuatModal({
  isOpen,
  record,
  onClose,
  onSubmit,
}: SuaDeXuatModalProps) {
  const [nam, setNam] = useState<number>(2026);
  const [thang, setThang] = useState<string>('8');
  const [loai, setLoai] = useState<string>('Hạch toán');
  const [soDeXuat, setSoDeXuat] = useState<string>('12-2026/HT-HC');
  const [nguoiDeNghi, setNguoiDeNghi] = useState<string>('Trần Thị Quỳnh Xuân');
  const [tieuDe, setTieuDe] = useState<string>('HẠCH TOÁN XĂNG XE Ô TÔ');
  const [ghiChu, setGhiChu] = useState<string>('Ngày 12/08/2026');

  const [items, setItems] = useState<TableItemRow[]>([
    {
      id: 'row-1',
      dienGiai: 'Xăng xe 30H-315.33',
      sl: 1,
      dv: 'Lần',
      donGia: 800000,
      dinhKhoan: '',
      ngayChi: '',
      hanChi: '800.000',
    },
  ]);

  useEffect(() => {
    if (record) {
      setNam(record.nam || 2026);
      const cleanThang = (record.thang || '8').replace('Tháng ', '').trim();
      setThang(cleanThang || '8');

      const loaiVal =
        record.loai && record.loai.length > 0
          ? record.loai.includes('Hạch toán')
            ? 'Hạch toán'
            : record.loai[0]
          : 'Hạch toán';
      setLoai(loaiVal);

      const soDXVal =
        record.soDeXuat && record.soDeXuat !== '—'
          ? record.soDeXuat
          : record.soHT && record.soHT !== '—' && record.soHT !== '+ Lập hạch toán'
          ? record.soHT
          : '12-2026/HT-HC';
      setSoDeXuat(soDXVal);

      if (record.dienGiai && record.dienGiai !== '—') {
        setTieuDe(record.dienGiai);
      } else {
        setTieuDe('HẠCH TOÁN XĂNG XE Ô TÔ');
      }

      const parsedDonGia =
        record.tongTien && record.tongTien !== '—'
          ? Number(record.tongTien.replace(/\D/g, '')) || 800000
          : 800000;

      setItems([
        {
          id: `row-${Date.now()}`,
          dienGiai:
            record.dienGiai && record.dienGiai !== '—'
              ? record.dienGiai
              : 'Xăng xe 30H-315.33',
          sl: record.soMuc && record.soMuc !== '—' ? Number(record.soMuc) || 1 : 1,
          dv: 'Lần',
          donGia: parsedDonGia,
          dinhKhoan: '',
          ngayChi: '',
          hanChi: parsedDonGia.toLocaleString('vi-VN'),
        },
      ]);
    }
  }, [record]);

  if (!isOpen || !record) return null;

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `row-${Date.now()}`,
        dienGiai: '',
        sl: 1,
        dv: 'Lần',
        donGia: 0,
        dinhKhoan: '',
        ngayChi: '',
        hanChi: '',
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
        dinhKhoan: '',
        ngayChi: '',
        hanChi: '',
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (
    id: string,
    field: keyof TableItemRow,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      const sl = Number(item.sl) || 0;
      const donGia =
        typeof item.donGia === 'number'
          ? item.donGia
          : Number(String(item.donGia).replace(/\D/g, '')) || 0;
      return sum + sl * donGia;
    }, 0);
  };

  const totalSum = calculateTotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!record) return;

    const formattedTongTien =
      totalSum > 0 ? `${totalSum.toLocaleString('vi-VN')} đ` : record.tongTien;

    const updatedData: DeXuatHachToanItem = {
      ...record,
      soDeXuat: soDeXuat.trim() || record.soDeXuat,
      thang: thang.startsWith('Tháng') ? thang.trim() : `Tháng ${thang.trim()}`,
      nam: Number(nam) || record.nam,
      dienGiai: tieuDe.trim() || record.dienGiai,
      soMuc: items.length,
      tongTien: formattedTongTien,
      loai: [loai],
      soBanGhi: items.length,
    };

    onSubmit(updatedData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-2xs p-3 sm:p-5 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-[960px] overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header - Trùng khớp hình ảnh */}
        <div className="px-6 pt-5 pb-3">
          <h2 className="text-[15px] font-bold text-slate-800">
            Chỉnh sửa đề nghị/hạch toán
          </h2>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-6 pb-5 space-y-3.5 text-xs overflow-y-auto flex-1">
          {/* Row 1: Năm *, Tháng *, Loại, Số đề xuất */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Năm <span className="text-slate-700">*</span>
              </label>
              <input
                type="number"
                required
                value={nam}
                onChange={(e) => setNam(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Tháng <span className="text-slate-700">*</span>
              </label>
              <input
                type="text"
                required
                value={thang}
                onChange={(e) => setThang(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Loại</label>
              <div className="relative">
                <select
                  value={loai}
                  onChange={(e) => setLoai(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer pr-8"
                >
                  <option value="Hạch toán">Hạch toán</option>
                  <option value="Đề nghị chi">Đề nghị chi</option>
                  <option value="Chi thực tế">Chi thực tế</option>
                </select>
                <IconChevronDown
                  size={15}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Số đề xuất</label>
              <input
                type="text"
                value={soDeXuat}
                onChange={(e) => setSoDeXuat(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Row 2: Người đề nghị, Tên sheet/Tiêu đề */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            <div className="sm:col-span-4">
              <label className="block font-medium text-slate-700 mb-1">Người đề nghị</label>
              <input
                type="text"
                value={nguoiDeNghi}
                onChange={(e) => setNguoiDeNghi(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="sm:col-span-8">
              <label className="block font-medium text-slate-700 mb-1">Tên sheet/Tiêu đề</label>
              <input
                type="text"
                value={tieuDe}
                onChange={(e) => setTieuDe(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Row 3: Ghi chú */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Ghi chú</label>
              <input
                type="text"
                value={ghiChu}
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Table chi tiết */}
          <div className="border border-slate-200 rounded overflow-x-auto mt-2">
            <table className="w-full text-xs text-left border-collapse min-w-[850px]">
              <thead className="bg-[#fcfdfe] border-b border-slate-200 text-slate-700 select-none">
                <tr>
                  <th className="py-2 px-2.5 font-bold text-center w-12 border-r border-slate-200">
                    STT
                  </th>
                  <th className="py-2 px-3 font-bold border-r border-slate-200 min-w-[210px]">
                    Diễn giải
                  </th>
                  <th className="py-2 px-2 font-bold text-center w-14 border-r border-slate-200">
                    SL
                  </th>
                  <th className="py-2 px-2 font-bold text-center w-16 border-r border-slate-200">
                    ĐV
                  </th>
                  <th className="py-2 px-3 font-bold text-center w-28 border-r border-slate-200">
                    Đơn giá
                  </th>
                  <th className="py-2 px-3 font-bold text-center w-28 border-r border-slate-200">
                    Thành tiền
                  </th>
                  <th className="py-2 px-2.5 font-bold text-center w-24 border-r border-slate-200">
                    Định khoản
                  </th>
                  <th className="py-2 px-3 font-bold text-center w-36 border-r border-slate-200">
                    Ngày chi (dự kiến)
                  </th>
                  <th className="py-2 px-3 font-bold text-center w-28 border-r border-slate-200">
                    Hạn chi
                  </th>
                  <th className="py-2 px-2 w-8 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {items.map((item, index) => {
                  const slNum = Number(item.sl) || 0;
                  const donGiaNum =
                    typeof item.donGia === 'number'
                      ? item.donGia
                      : Number(String(item.donGia).replace(/\D/g, '')) || 0;
                  const rowThanhTien = slNum * donGiaNum;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="py-1.5 px-2 text-center text-slate-700 border-r border-slate-200">
                        {index + 1}
                      </td>
                      <td className="py-1.5 px-2 border-r border-slate-200">
                        <input
                          type="text"
                          value={item.dienGiai}
                          onChange={(e) =>
                            handleItemChange(item.id, 'dienGiai', e.target.value)
                          }
                          className="w-full border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="py-1.5 px-1.5 border-r border-slate-200">
                        <input
                          type="number"
                          min={1}
                          value={item.sl}
                          onChange={(e) =>
                            handleItemChange(item.id, 'sl', e.target.value)
                          }
                          className="w-full border border-slate-300 rounded px-1.5 py-1 text-xs text-slate-800 text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="py-1.5 px-1.5 border-r border-slate-200">
                        <input
                          type="text"
                          value={item.dv}
                          onChange={(e) =>
                            handleItemChange(item.id, 'dv', e.target.value)
                          }
                          className="w-full border border-slate-300 rounded px-1.5 py-1 text-xs text-slate-800 text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="py-1.5 px-2 border-r border-slate-200">
                        <input
                          type="text"
                          value={
                            typeof item.donGia === 'number'
                              ? item.donGia.toLocaleString('vi-VN')
                              : item.donGia
                          }
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            handleItemChange(
                              item.id,
                              'donGia',
                              val ? Number(val) : 0
                            );
                          }}
                          className="w-full border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 text-right focus:outline-none focus:ring-1 focus:ring-indigo-500 font-normal"
                        />
                      </td>
                      <td className="py-1.5 px-3 text-right font-normal text-slate-800 border-r border-slate-200 whitespace-nowrap">
                        {rowThanhTien.toLocaleString('vi-VN')}
                      </td>
                      <td className="py-1.5 px-2 border-r border-slate-200">
                        <input
                          type="text"
                          value={item.dinhKhoan || ''}
                          onChange={(e) =>
                            handleItemChange(item.id, 'dinhKhoan', e.target.value)
                          }
                          className="w-full border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="py-1.5 px-2 border-r border-slate-200">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="mm/dd/yyyy"
                            value={item.ngayChi || ''}
                            onChange={(e) =>
                              handleItemChange(item.id, 'ngayChi', e.target.value)
                            }
                            className="w-full border border-slate-300 rounded px-2 py-1 pr-7 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                          <IconCalendar
                            size={14}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                          />
                        </div>
                      </td>
                      <td className="py-1.5 px-2 border-r border-slate-200">
                        <input
                          type="text"
                          value={item.hanChi || ''}
                          onChange={(e) =>
                            handleItemChange(item.id, 'hanChi', e.target.value)
                          }
                          className="w-full border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="py-1.5 px-1 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                          title="Xóa dòng"
                        >
                          <IconTrash size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {/* Dòng TỔNG - chuẩn hình ảnh */}
                <tr className="bg-white border-t border-slate-200">
                  <td
                    colSpan={5}
                    className="py-2 px-3 text-right font-bold text-slate-800 border-r border-slate-200"
                  >
                    TỔNG:
                  </td>
                  <td className="py-2 px-3 text-right font-bold text-slate-800 border-r border-slate-200 whitespace-nowrap">
                    {totalSum.toLocaleString('vi-VN')}
                  </td>
                  <td colSpan={4} className="border-r border-slate-200"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Các nút thêm hạng mục / nhóm - chuẩn hình ảnh */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleAddItem}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs rounded-md hover:bg-slate-50 transition-colors cursor-pointer font-medium"
            >
              <IconPlus size={14} />
              <span>Thêm hạng mục</span>
            </button>

            <button
              type="button"
              onClick={handleAddGroup}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs rounded-md hover:bg-slate-50 transition-colors cursor-pointer font-medium"
            >
              <IconPlus size={14} />
              <span>Thêm nhóm (I, II, III...)</span>
            </button>
          </div>

          {/* Footer Actions - chuẩn hình ảnh */}
          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-200 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 text-xs font-medium text-white bg-[#2b3696] hover:bg-[#202977] rounded-md transition-colors cursor-pointer"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
