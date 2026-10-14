"use client";

import React, { useState, useEffect } from 'react';
import { IconPlus, IconX } from '@tabler/icons-react';
import { DeXuatNVLItem } from '../../index';

interface ModalTaoDeXuatProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newItem: DeXuatNVLItem) => void;
}

export default function ModalTaoDeXuat({
  isOpen,
  onClose,
  onSave,
}: ModalTaoDeXuatProps) {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    thang: currentMonth,
    nam: currentYear,
    phongBan: 'Khối Kỹ thuật',
    nguoiLap: '',
    soMatHang: 1,
    tongTien: 0,
    trangThai: 'Chờ duyệt' as 'Chờ duyệt' | 'Đã duyệt',
    ghiChu: '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        thang: currentMonth,
        nam: currentYear,
        phongBan: 'Khối Kỹ thuật',
        nguoiLap: '',
        soMatHang: 1,
        tongTien: 0,
        trangThai: 'Chờ duyệt',
        ghiChu: '',
      });
    }
  }, [isOpen, currentMonth, currentYear]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const thangFormatted = String(formData.thang).padStart(2, '0');
    const thangNamStr = `Tháng ${thangFormatted}/${formData.nam}`;

    const newItem: DeXuatNVLItem = {
      id: Date.now().toString(),
      maDeXuat: `DXNVL-${formData.nam}-${thangFormatted}-${String(
        Math.floor(Math.random() * 90) + 10
      )}`,
      thang: Number(formData.thang),
      nam: Number(formData.nam),
      thangNam: thangNamStr,
      phongBan: formData.phongBan,
      nguoiLap: formData.nguoiLap || 'Người lập đề xuất',
      ngayLap: new Date().toLocaleDateString('vi-VN'),
      soMatHang: Number(formData.soMatHang) || 1,
      tongTien: Number(formData.tongTien) || 0,
      trangThai: formData.trangThai,
      trangThaiXuatKho: 'Chờ xuất',
      trangThaiHT: 'Chờ hạch toán',
      boSungNVL: 0,
      ghiChu: formData.ghiChu,
    };

    onSave(newItem);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <IconPlus size={18} className="text-[#406c89]" />
            <h3 className="text-sm font-bold text-slate-800">
              Tạo đề xuất NVL tháng mới
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
            title="Đóng modal"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-3 text-xs">
            {/* Tháng + Năm fields */}
            <div className="grid grid-cols-2 gap-3 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Tháng đề xuất *
                </label>
                <select
                  value={formData.thang}
                  onChange={(e) =>
                    setFormData({ ...formData, thang: Number(e.target.value) })
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>
                      Tháng {m}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Năm đề xuất *
                </label>
                <input
                  type="number"
                  required
                  min={2020}
                  max={2035}
                  value={formData.nam}
                  onChange={(e) =>
                    setFormData({ ...formData, nam: Number(e.target.value) })
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Phòng ban đề xuất *
                </label>
                <select
                  value={formData.phongBan}
                  onChange={(e) =>
                    setFormData({ ...formData, phongBan: e.target.value })
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
                >
                  <option value="Khối Kỹ thuật">Khối Kỹ thuật</option>
                  <option value="Bộ phận Kho & Vật tư">Bộ phận Kho & Vật tư</option>
                  <option value="Bộ phận Mua hàng">Bộ phận Mua hàng</option>
                  <option value="Xưởng sản xuất">Xưởng sản xuất</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Người lập đề xuất
                </label>
                <input
                  type="text"
                  placeholder="Nhập họ tên..."
                  value={formData.nguoiLap}
                  onChange={(e) =>
                    setFormData({ ...formData, nguoiLap: e.target.value })
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Số mặt hàng NVL
                </label>
                <input
                  type="number"
                  min={1}
                  value={formData.soMatHang}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      soMatHang: Number(e.target.value),
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Tổng tiền dự toán (VNĐ)
                </label>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={formData.tongTien}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tongTien: Number(e.target.value),
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">
                Trạng thái đề xuất *
              </label>
              <select
                value={formData.trangThai}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    trangThai: e.target.value as 'Chờ duyệt' | 'Đã duyệt',
                  })
                }
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
              >
                <option value="Chờ duyệt">Chờ duyệt</option>
                <option value="Đã duyệt">Đã duyệt</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">
                Ghi chú / Mục đích đề xuất
              </label>
              <textarea
                rows={3}
                placeholder="Nhập nội dung đề xuất NVL tháng..."
                value={formData.ghiChu}
                onChange={(e) =>
                  setFormData({ ...formData, ghiChu: e.target.value })
                }
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c89]/30"
              />
            </div>
          </div>

          <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-semibold bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors cursor-pointer"
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-semibold bg-[#406c89] hover:bg-[#345973] text-white rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Lưu đề xuất
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
