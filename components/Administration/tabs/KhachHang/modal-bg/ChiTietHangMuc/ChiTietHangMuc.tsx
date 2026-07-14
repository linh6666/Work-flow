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
import { ItemBaoGia, SectionBaoGia } from '../LapBgModal';

interface ChiTietHangMucProps {
  sections: SectionBaoGia[];
  handleAddSection: (title?: string) => void;
  handleAddMultipleSections: (titles: string[]) => void;
  handleRemoveSection: (sectionId: string) => void;
  handleClearAllSections: () => void;
  handleSectionChange: (sectionId: string, key: keyof SectionBaoGia, value: any) => void;
  handleAddItemToSection: (sectionId: string) => void;
  handleRemoveItemFromSection: (sectionId: string, itemId: string) => void;
  handleItemChangeInSection: (sectionId: string, itemId: string, key: keyof ItemBaoGia, value: any) => void;
  formatCurrency: (amount: number) => string;
  subtotal: number;
  vatPercent: number;
  vatAmount: number;
  total: number;
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
  sections,
  handleAddSection,
  handleAddMultipleSections,
  handleRemoveSection,
  handleClearAllSections,
  handleSectionChange,
  handleAddItemToSection,
  handleRemoveItemFromSection,
  handleItemChangeInSection,
  formatCurrency,
  subtotal,
  vatPercent,
  vatAmount,
  total,
}: ChiTietHangMucProps) {
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([
    'Báo giá Mô hình Quy hoạch',
  ]);
  const discount = 0;
  const afterDiscount = subtotal - discount;

  return (
    <div className="tab-content-active space-y-4 text-left">
      {/* Chọn loại báo giá */}
      <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 p-3">
        <div className="grid grid-cols-[90px_1fr_auto] items-center gap-3">
          <label className="text-xs font-bold text-indigo-700">Loại báo giá:</label>
          <div className="relative">
            <select 
              className={`${inputClass} appearance-none pr-9 font-medium`}
              onChange={(e) => {
                const val = e.target.value;
                if (val) {
                  // Nạp phần mới dựa trên loại báo giá được chọn
                  handleAddSection(val);
                }
              }}
            >
              <option value="">Chọn loại báo giá...</option>
              <option value="Báo giá Mô hình Quy hoạch">Báo giá Mô hình Quy hoạch</option>
              <option value="Báo giá Mô hình Kiến trúc">Báo giá Mô hình Kiến trúc</option>
              <option value="Báo giá Mô hình Nội thất">Báo giá Mô hình Nội thất</option>
            </select>
            <IconChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
          <button 
            type="button" 
            className={compactButtonClass}
            onClick={() => handleAddSection('Báo giá Mới')}
          >
            <IconRefresh size={16} />
            Load
          </button>
        </div>
      </div>

      <p className="text-xs text-indigo-700">
        📋 Chọn loại báo giá phù hợp với ngôn ngữ Tiếng Việt — Nhấn Load để nạp chi tiết template
      </p>

      {/* Header Danh mục hạng mục */}
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
          {sections.length > 0 && (
            <button
              type="button"
              onClick={handleClearAllSections}
              className={`${compactButtonClass} text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200`}
            >
              Xóa tất cả
            </button>
          )}
          <button 
            type="button" 
            onClick={() => handleAddSection()} 
            className={compactButtonClass}
          >
            <IconPlus size={16} />
            Thêm phần
          </button>
        </div>
      </div>

      {/* Template Picker */}
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
                  className="flex h-8 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-500 shadow-xs cursor-pointer hover:bg-slate-50"
                >
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-slate-300 cursor-pointer"
                    onChange={(e) => {
                      setSelectedTemplates((prev) =>
                        e.target.checked
                          ? [...prev, template]
                          : prev.filter((item) => item !== template),
                      );
                    }}
                  />
                  <span className="truncate">{template}</span>
                  <span className="ml-auto text-[9px] font-bold text-slate-300 shrink-0">VN</span>
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
                    className={`flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-semibold shadow-xs cursor-pointer transition ${
                      checked
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
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
                      className="h-4 w-4 rounded border-slate-300 accent-emerald-600 cursor-pointer"
                    />
                    <span className="truncate">{template}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                handleAddMultipleSections(selectedTemplates);
                setShowTemplatePicker(false);
              }}
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

      {/* Danh sách các phần hạng mục */}
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={section.id} className="rounded-lg border border-slate-200 bg-white shadow-2xs overflow-hidden">
            {/* Tiêu đề của Phần */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-4 py-2 flex-wrap sm:flex-nowrap gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                {/* Grip icon */}
                <span className="text-slate-400 cursor-grab shrink-0">
                  <IconGripVertical size={16} />
                </span>
                
                {/* Số thứ tự phần */}
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-xs font-bold text-slate-700 shrink-0">
                  {sectionIndex + 1}
                </span>

                {/* Input nhập tên phần */}
                <input
                  type="text"
                  value={section.tenPhan}
                  onChange={(e) => handleSectionChange(section.id, 'tenPhan', e.target.value)}
                  className="h-8 px-2 text-sm font-bold text-slate-900 outline-none bg-transparent border-b border-transparent focus:border-slate-300 focus:bg-white rounded-sm w-full max-w-[400px] transition"
                  placeholder="Nhập tên phần..."
                />
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {/* Checkbox CK */}
                <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={section.ck}
                    onChange={(e) => handleSectionChange(section.id, 'ck', e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 accent-indigo-600 cursor-pointer"
                  />
                  <span>CK</span>
                </label>

                {/* Nút thu gọn / mở rộng */}
                <button
                  type="button"
                  onClick={() => handleSectionChange(section.id, 'isCollapsed', !section.isCollapsed)}
                  className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition"
                  title={section.isCollapsed ? "Mở rộng" : "Thu gọn"}
                >
                  {section.isCollapsed ? <IconChevronDown size={16} /> : <IconChevronUp size={16} />}
                </button>

                {/* Nút xóa phần */}
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Bạn có chắc chắn muốn xóa phần "${section.tenPhan}" không?`)) {
                      handleRemoveSection(section.id);
                    }
                  }}
                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition"
                  title="Xóa phần"
                >
                  <IconTrash size={16} />
                </button>
              </div>
            </div>

            {/* Bảng chi tiết hạng mục con của Phần */}
            {!section.isCollapsed && (
              <div className="p-3 overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-2 w-8"></th>
                      <th className="py-2 w-10 text-center">STT</th>
                      <th className="py-2 pl-2">CÔNG VIỆC</th>
                      <th className="py-2 pl-2">LOẠI VẬT LIỆU</th>
                      <th className="py-2 pl-2 w-20 text-right">SỐ LƯỢNG</th>
                      <th className="py-2 pl-2 w-16 text-center">ĐƠN VỊ</th>
                      <th className="py-2 pl-2 w-32 text-right">ĐƠN GIÁ</th>
                      <th className="py-2 pl-2 w-32 text-right">THÀNH TIỀN</th>
                      <th className="py-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item, itemIndex) => {
                      const amount = item.soLuong * item.donGia;
                      return (
                        <tr key={item.id} className="border-b border-slate-100/50 hover:bg-slate-50/50">
                          {/* Kéo thả */}
                          <td className="py-2 text-center text-slate-300">
                            <span className="cursor-grab">
                              <IconGripVertical size={14} />
                            </span>
                          </td>

                          {/* STT Hạng mục */}
                          <td className="py-2 text-center">
                            <div className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-[10px] font-medium text-slate-500">
                              {itemIndex + 1}
                            </div>
                          </td>

                          {/* Tên công việc */}
                          <td className="py-2 pl-2">
                            <input
                              type="text"
                              value={item.tenHangMuc}
                              onChange={(e) => handleItemChangeInSection(section.id, item.id, 'tenHangMuc', e.target.value)}
                              className="h-8 w-full rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100"
                              placeholder="TÊN HẠNG MỤC"
                            />
                          </td>

                          {/* Mô tả vật liệu */}
                          <td className="py-2 pl-2">
                            <textarea
                              rows={1}
                              value={item.moTa}
                              onChange={(e) => handleItemChangeInSection(section.id, item.id, 'moTa', e.target.value)}
                              className="h-8 min-h-8 w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 resize-none"
                              placeholder="Mô tả..."
                            />
                          </td>

                          {/* Số lượng */}
                          <td className="py-2 pl-2">
                            <input
                              type="number"
                              value={item.soLuong}
                              onChange={(e) => handleItemChangeInSection(section.id, item.id, 'soLuong', parseInt(e.target.value) || 0)}
                              className="h-8 w-full rounded-md border border-slate-200 bg-white px-2 text-right text-xs text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100"
                              min="1"
                            />
                          </td>

                          {/* Đơn vị tính */}
                          <td className="py-2 pl-2">
                            <input
                              type="text"
                              value={item.donViTinh}
                              onChange={(e) => handleItemChangeInSection(section.id, item.id, 'donViTinh', e.target.value)}
                              className="h-8 w-full rounded-md border border-slate-200 bg-white px-2 text-center text-xs text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100"
                            />
                          </td>

                          {/* Đơn giá */}
                          <td className="py-2 pl-2">
                            <input
                              type="number"
                              value={item.donGia}
                              onChange={(e) => handleItemChangeInSection(section.id, item.id, 'donGia', parseInt(e.target.value) || 0)}
                              className="h-8 w-full rounded-md border border-slate-200 bg-white px-2 text-right text-xs text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100"
                              min="0"
                            />
                          </td>

                          {/* Thành tiền */}
                          <td className="py-2 pl-2 text-right">
                            <span className="text-xs font-semibold text-slate-700 pr-2">
                              {formatCurrency(amount)}
                            </span>
                          </td>

                          {/* Xóa dòng hạng mục */}
                          <td className="py-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveItemFromSection(section.id, item.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition"
                              title="Xóa dòng"
                            >
                              <IconTrash size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Nút Thêm dòng trong phần */}
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => handleAddItemToSection(section.id)}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-indigo-700 hover:text-indigo-800 transition hover:bg-slate-50"
                  >
                    <IconPlus size={14} />
                    Thêm dòng
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hiển thị tổng hợp giá trị báo giá dưới chân tab */}
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
