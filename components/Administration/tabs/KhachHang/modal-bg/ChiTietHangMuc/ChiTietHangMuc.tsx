import React, { useState } from 'react';
import {
  IconChevronDown,
  IconChevronUp,
  IconFileImport,
  IconGripVertical,
  IconPlus,
  IconRefresh,
  IconTrash,
} from '@tabler/icons-react';
import { ItemBaoGia } from '../LapBgModal';

interface ChiTietHangMucProps {
  items: ItemBaoGia[];
  handleAddItem: () => void;
  handleRemoveItem: (id: string) => void;
  handleItemChange: (id: string, key: keyof ItemBaoGia, value: string | number) => void;
  formatCurrency: (amount: number) => string;
}

const inputClass =
  'h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-xs outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100';

const compactButtonClass =
  'inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-900 shadow-xs transition hover:bg-slate-50';

const savedTemplates = [
  'MAU BAO GIA CONG NGHE DK TAB & AR',
  'MAU BAO GIA MO HINH CONG TRINH',
  'MAU BAO GIA CONG NGHE NANG HA',
  'MAU BAO GIA MO HINH QUY HOACH',
  'MAU BAO GIA DIEU KHIEN ANH SANG TREN WEB',
  'MAU BAO GIA CHINH SUA VAN CHUYEN MH',
  'MAU BAO GIA CHINH SUA VAN CHUYEN MO HINH',
  'MAU BAO GIA PROJECTION MAPPING',
  'MAU BAO GIA NOI THAT CAN HO',
];

const systemTemplates = [
  'Báo giá Mô hình Quy hoạch',
  'Báo giá Mô hình Công trình',
  'Báo giá Mô hình Biệt Thự - Nội thất',
  'Báo giá Chỉnh sửa Mô hình',
  'Báo giá Công nghệ AR',
  'Báo giá Điều khiển ánh sáng Tab',
  'Báo giá Công nghệ Nâng hạ',
  'Báo giá Projection Mapping',
  'Báo giá Điều khiển ánh sáng Web',
];

export default function ChiTietHangMuc({
  handleAddItem,
  formatCurrency,
}: ChiTietHangMucProps) {
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [showNewSection, setShowNewSection] = useState(false);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([
    'Báo giá Mô hình Quy hoạch',
  ]);
  const subtotal = 0;
  const discount = 0;
  const afterDiscount = subtotal - discount;
  const vatPercent = 0;
  const vatAmount = Math.round(afterDiscount * (vatPercent / 100));
  const total = afterDiscount + vatAmount;

  return (
    <div className="tab-content-active space-y-4 text-left">
      <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 p-3">
        <div className="grid grid-cols-[90px_1fr_auto] items-center gap-3">
          <label className="text-xs font-bold text-indigo-700">Loại báo giá:</label>
          <div className="relative">
            <select className={`${inputClass} appearance-none pr-9 font-medium`}>
              <option>Báo giá Mô hình Quy hoạch</option>
              <option>Báo giá Mô hình Kiến trúc</option>
              <option>Báo giá Mô hình Nội thất</option>
            </select>
            <IconChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
          <button type="button" className={compactButtonClass}>
            <IconRefresh size={16} />
            Load
          </button>
        </div>
      </div>

      <p className="text-xs text-indigo-700">
        📋 Chọn loại báo giá phù hợp với ngôn ngữ Tiếng Việt — Nhấn Load để nạp chi tiết template
      </p>

      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-950">Danh mục hạng mục</h4>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowTemplatePicker((prev) => !prev)}
            className={compactButtonClass}
          >
            <IconRefresh size={16} />
            Thêm mẫu báo giá
          </button>
          <button type="button" className={compactButtonClass}>
            <IconFileImport size={16} />
            Import Excel
          </button>
          <button type="button" onClick={handleAddItem} className={compactButtonClass}>
            <IconPlus size={16} />
            Thêm phần
          </button>
        </div>
      </div>

      {showTemplatePicker && (
        <div className="rounded-lg border border-indigo-300 bg-indigo-50/50 p-4">
          <p className="mb-4 text-xs font-semibold text-indigo-700">
            Chọn một hoặc nhiều mẫu — sẽ được thêm vào cuối danh sách
          </p>

          <div className="mb-4">
            <h5 className="mb-2 text-xs font-bold uppercase text-amber-700">
              ★ Mẫu đã lưu
            </h5>
            <div className="grid grid-cols-2 gap-2">
              {savedTemplates.map((template) => (
                <label
                  key={template}
                  className="flex h-8 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-500 shadow-xs"
                >
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                  <span>{template}</span>
                  <span className="text-[9px] font-bold text-slate-300">VN</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h5 className="mb-2 text-xs font-bold uppercase text-slate-500">
              VN TIẾNG VIỆT <span className="normal-case">(Hệ thống)</span>
            </h5>
            <div className="grid grid-cols-2 gap-2">
              {systemTemplates.map((template) => {
                const checked = selectedTemplates.includes(template);

                return (
                  <label
                    key={template}
                    className={`flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-semibold shadow-xs ${
                      checked
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-200 bg-white text-slate-500'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        setSelectedTemplates((prev) =>
                          e.target.checked
                            ? [...prev, template]
                            : prev.filter((item) => item !== template),
                        );
                      }}
                      className="h-4 w-4 rounded border-slate-300 accent-emerald-600"
                    />
                    {template}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex h-9 items-center gap-2 rounded-md bg-indigo-700 px-3 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-800"
            >
              📋 Thêm {selectedTemplates.length} mẫu vào danh sách
            </button>
            <button
              type="button"
              onClick={() => setShowTemplatePicker(false)}
              className="h-9 rounded-md border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-800 shadow-xs transition hover:bg-slate-50"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
        <button
          type="button"
          className="mb-3 text-xs font-bold text-indigo-700"
        >
          ▶ ➖ Tùy chỉnh nhãn dòng tổng tiền
        </button>

        <div className="mb-3 flex items-center gap-4 text-xs text-slate-600">
          <label className="inline-flex items-center gap-1.5">
            <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-indigo-600" />
            Chiết khấu (%)
          </label>
          <label className="inline-flex items-center gap-1.5">
            <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-indigo-600" />
            Sau chiết khấu
          </label>
        </div>

        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-[1fr_90px_140px] items-center gap-4">
            <span className="text-slate-600">Tổng trước thuế</span>
            <span />
            <strong className="text-right text-slate-950">{formatCurrency(subtotal)}</strong>
          </div>
          <div className="grid grid-cols-[1fr_90px_140px] items-center gap-4">
            <span className="text-slate-600">Chiết khấu (%)</span>
            <input
              type="number"
              value={0}
              readOnly
              className="h-8 rounded-md border border-slate-200 bg-white px-3 text-center text-sm shadow-xs"
            />
            <span className="text-right text-slate-500">-{formatCurrency(discount)}</span>
          </div>
          <div className="grid grid-cols-[1fr_90px_140px] items-center gap-4">
            <span className="text-slate-600">Sau chiết khấu</span>
            <span />
            <strong className="text-right text-slate-950">{formatCurrency(afterDiscount)}</strong>
          </div>
          <div className="grid grid-cols-[1fr_90px_140px] items-center gap-4">
            <span className="text-slate-600">VAT (%)</span>
            <input
              type="number"
              value={vatPercent}
              readOnly
              className="h-8 rounded-md border border-slate-200 bg-white px-3 text-center text-sm shadow-xs"
            />
            <span className="text-right text-slate-600">{formatCurrency(vatAmount)}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
          <span className="text-base font-extrabold text-slate-950">TỔNG GIÁ TRỊ SAU THUẾ</span>
          <span className="text-base font-extrabold text-indigo-700">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
