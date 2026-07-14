import React, { useEffect, useState } from 'react';
import { IconPlus, IconTrash } from '@tabler/icons-react';

interface DieuKhoanTongHopProps {
  dieuKhoanThanhToan: string;
  setDieuKhoanThanhToan: (val: string) => void;
  ghiChu: string;
  setGhiChu: (val: string) => void;
  subtotal: number;
  vatPercent: number;
  setVatPercent: (val: number) => void;
  vatAmount: number;
  total: number;
  formatCurrency: (amount: number) => string;
}

interface DieuKienItem {
  id: string;
  title: string;
  content: string;
}

const inputClass =
  'h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-xs outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100';

const textareaClass =
  'w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100';

const defaultConditions: DieuKienItem[] = [
  {
    id: '1',
    title: '1. Dự tính thời gian sản xuất mô hình',
    content:
      '45-50 ngày làm việc (trừ chủ nhật và ngày lễ) kể từ ngày tạm ứng và nhận đầy đủ bản vẽ. Quý khách vui lòng đặt lịch sản xuất mô hình trước 1 tháng. Nếu mô hình có thêm lựa chọn hệ thống điều khiển ánh sáng, thời gian sản xuất mô hình sẽ phụ thuộc vào lựa chọn của khách hàng và phần hệ thống điều khiển ánh sáng.',
  },
  {
    id: '2',
    title: '2. Báo giá dựa trên hồ sơ',
    content:
      'Báo giá dựa trên hồ sơ được cung cấp và trên cơ sở hồ sơ dùng để sản xuất mô hình là hồ sơ CAD. Nếu hồ sơ có sự thay đổi hoặc hồ sơ sản xuất mô hình không phải hồ sơ CAD thì các thời gian sản xuất và giá trị của báo giá cũng sẽ được điều chỉnh dựa trên hồ sơ mới.',
  },
];

export default function DieuKhoanTongHop({
  dieuKhoanThanhToan,
  setDieuKhoanThanhToan,
  ghiChu,
  setGhiChu,
  subtotal,
  vatPercent,
  setVatPercent,
  vatAmount,
  total,
  formatCurrency,
}: DieuKhoanTongHopProps) {
  const [thoiGianSanXuat, setThoiGianSanXuat] = useState('60');
  const [baoHanh, setBaoHanh] = useState('18');
  const [conditions, setConditions] = useState<DieuKienItem[]>(() => {
    if (!ghiChu.trim()) return defaultConditions;

    return [
      {
        id: '1',
        title: '1. Ghi chú báo giá',
        content: ghiChu,
      },
      ...defaultConditions.slice(1),
    ];
  });

  useEffect(() => {
    const note = conditions
      .map((item) => `${item.title}\n${item.content}`)
      .join('\n\n');
    setGhiChu(note);
  }, [conditions, setGhiChu]);

  const handleConditionChange = (
    id: string,
    key: keyof Pick<DieuKienItem, 'title' | 'content'>,
    value: string,
  ) => {
    setConditions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    );
  };

  const handleAddCondition = () => {
    const nextNumber = conditions.length + 1;
    const nextId = String(Date.now());

    setConditions((prev) => [
      ...prev,
      {
        id: nextId,
        title: `${nextNumber}. Điều kiện báo giá`,
        content: '',
      },
    ]);
  };

  const handleRemoveCondition = (id: string) => {
    setConditions((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="tab-content-active overflow-hidden rounded-lg border border-slate-200 bg-slate-50 text-left shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <h4 className="text-sm font-bold text-slate-950">Điều kiện báo giá</h4>
        <span className="text-lg leading-none text-slate-400">⌃</span>
      </div>

      <div className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-900">
              Thời gian sản xuất (ngày làm việc)
            </label>
            <input
              type="number"
              min="0"
              value={thoiGianSanXuat}
              onChange={(e) => setThoiGianSanXuat(e.target.value)}
              className={inputClass}
            />
            <p className="mt-1.5 text-xs text-slate-500">
              Kể từ ngày tạm ứng và nhận đầy đủ bản vẽ
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-900">
              Bảo hành (tháng)
            </label>
            <input
              type="number"
              min="0"
              value={baoHanh}
              onChange={(e) => setBaoHanh(e.target.value)}
              className={inputClass}
            />
            <p className="mt-1.5 text-xs text-slate-500">
              Kể từ ngày bàn giao mô hình
            </p>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-900">
            Phương thức thanh toán
          </label>
          <textarea
            rows={3}
            placeholder="Tạm ứng: 50%, Thanh toán lần 1: 40% sau khi đạt 90% khối lượng công việc, Thanh toán cuối cùng: 10%"
            value={dieuKhoanThanhToan}
            onChange={(e) => setDieuKhoanThanhToan(e.target.value)}
            className={`${textareaClass} min-h-15 resize-y`}
          />
        </div>

        <div className="border-t border-slate-200 pt-4">
          <div className="mb-3 flex items-center justify-between">
            <h5 className="text-sm font-bold text-slate-950">Điều kiện báo giá</h5>
            <button
              type="button"
              onClick={handleAddCondition}
              className="inline-flex h-8 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 shadow-xs transition hover:bg-slate-50"
            >
              <IconPlus size={16} />
              Thêm điều kiện
            </button>
          </div>

          <div className="space-y-3">
            {conditions.map((condition) => (
              <div
                key={condition.id}
                className="rounded-md border border-slate-200 bg-slate-50/60 p-2"
              >
                <div className="mb-2 flex items-end gap-3">
                  <div className="min-w-0 flex-1">
                    <label className="mb-1.5 block text-xs font-semibold text-slate-800">
                      Tiêu đề
                    </label>
                    <input
                      type="text"
                      value={condition.title}
                      onChange={(e) =>
                        handleConditionChange(condition.id, 'title', e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCondition(condition.id)}
                    className="mb-1 flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                    aria-label="Xóa điều kiện"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>

                <label className="mb-1.5 block text-xs font-semibold text-slate-800">
                  Nội dung
                </label>
                <textarea
                  rows={3}
                  value={condition.content}
                  onChange={(e) =>
                    handleConditionChange(condition.id, 'content', e.target.value)
                  }
                  className={`${textareaClass} max-h-28 min-h-18 resize-y`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* <div className="rounded-md border border-slate-200 bg-white p-3">
          <div className="grid grid-cols-4 gap-3 text-sm">
            <div>
              <p className="text-xs font-medium text-slate-500">Tạm tính</p>
              <p className="mt-1 font-bold text-slate-900">{formatCurrency(subtotal)}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">VAT</label>
              <select
                value={vatPercent}
                onChange={(e) => setVatPercent(parseInt(e.target.value) || 0)}
                className="mt-1 h-8 w-full rounded-md border border-slate-200 bg-white px-2 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="8">8%</option>
                <option value="10">10%</option>
              </select>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Tiền VAT</p>
              <p className="mt-1 font-bold text-slate-900">{formatCurrency(vatAmount)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Tổng cộng</p>
              <p className="mt-1 font-extrabold text-amber-600">{formatCurrency(total)}</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
