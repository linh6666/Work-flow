import React from 'react';

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
  return (
    <div className="space-y-6 tab-content-active">
      {/* Calculations & VAT Selection */}
      <div className="grid grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Điều khoản thanh toán
            </label>
            <textarea
              rows={3.5}
              placeholder="VD: Tạm ứng 50% ngay sau khi ký HĐ..."
              value={dieuKhoanThanhToan}
              onChange={(e) => setDieuKhoanThanhToan(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none font-medium"
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Ghi chú báo giá
            </label>
            <textarea
              rows={3.5}
              placeholder="Các lưu ý hoặc điều kiện kèm theo..."
              value={ghiChu}
              onChange={(e) => setGhiChu(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none font-medium"
            />
          </div>
        </div>

        {/* Calculations Box */}
        <div className="border border-slate-200 bg-slate-50/50 p-5 rounded-xl space-y-3.5 text-sm select-none">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Cộng tiền hàng / Subtotal:</span>
            <span className="font-bold text-slate-800">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-3">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              Thuế suất VAT (%) / Tax:
              <select
                value={vatPercent}
                onChange={(e) => setVatPercent(parseInt(e.target.value) || 0)}
                className="text-xs bg-white border border-slate-200 rounded px-1.5 py-0.5 font-bold focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="8">8%</option>
                <option value="10">10%</option>
              </select>
            </span>
            <span className="font-bold text-slate-800">{formatCurrency(vatAmount)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 pt-3.5">
            <span className="text-slate-800 font-extrabold text-base">Tổng cộng thanh toán:</span>
            <span className="font-black text-amber-600 text-lg">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
