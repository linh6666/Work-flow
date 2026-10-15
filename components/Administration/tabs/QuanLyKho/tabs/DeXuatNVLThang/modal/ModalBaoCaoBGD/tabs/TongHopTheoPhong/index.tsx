"use client";

import React from 'react';

interface TongHopTheoPhongProps {
  selectedYear?: string;
}

export default function TongHopTheoPhong({
  selectedYear = '2026',
}: TongHopTheoPhongProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-2">
      <div className="flex-1 overflow-auto border border-slate-300 rounded-lg shadow-2xs max-h-[calc(92vh-220px)]">
        <table className="w-full border-collapse text-xs">
          {/* Table Header - Cố định sticky top */}
          <thead className="sticky top-0 z-20 shadow-xs">
            <tr className="bg-[#3d5a6c] text-white">
              <th className="sticky top-0 bg-[#3d5a6c] px-4 py-2.5 text-left font-semibold border-r border-slate-400/30 whitespace-nowrap">
                Tháng
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-3 py-2.5 text-center font-semibold border-r border-slate-400/30 whitespace-nowrap">
                Khai triển
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-3 py-2.5 text-center font-semibold border-r border-slate-400/30 whitespace-nowrap">
                CN & TK
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-3 py-2.5 text-center font-semibold border-r border-slate-400/30 whitespace-nowrap">
                Cắt
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-3 py-2.5 text-center font-semibold border-r border-slate-400/30 whitespace-nowrap">
                Ghép
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-3 py-2.5 text-center font-semibold border-r border-slate-400/30 whitespace-nowrap">
                Mộc Sơn
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-3 py-2.5 text-center font-semibold border-r border-slate-400/30 whitespace-nowrap">
                Điện
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-3 py-2.5 text-center font-semibold border-r border-slate-400/30 whitespace-nowrap">
                Cảnh Quan
              </th>
              <th className="sticky top-0 bg-[#3d5a6c] px-4 py-2.5 text-right font-semibold whitespace-nowrap">
                TỔNG CỘNG
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200 bg-white">
            {/* Tháng 9 */}
            <tr className="hover:bg-slate-50/60 transition-colors">
              <td className="px-4 py-2 text-left font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">
                Tháng 9
              </td>
              <td className="px-3 py-2 text-center text-slate-400 font-medium border-r border-slate-200">
                —
              </td>
              <td className="px-3 py-2 text-center text-slate-400 font-medium border-r border-slate-200">
                —
              </td>
              <td className="px-3 py-2 text-center border-r border-slate-200">
                <div className="font-semibold text-slate-800">12.463.000</div>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#fef9c3] text-[#ca8a04] border border-[#fde047]">
                  Chờ duyệt
                </span>
              </td>
              <td className="px-3 py-2 text-center border-r border-slate-200">
                <div className="font-semibold text-slate-800">17.320.684</div>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#fef9c3] text-[#ca8a04] border border-[#fde047]">
                  Chờ duyệt
                </span>
              </td>
              <td className="px-3 py-2 text-center border-r border-slate-200">
                <div className="font-semibold text-slate-800">15.662.392</div>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#fef9c3] text-[#ca8a04] border border-[#fde047]">
                  Chờ duyệt
                </span>
              </td>
              <td className="px-3 py-2 text-center border-r border-slate-200">
                <div className="font-semibold text-slate-800">20.428.718</div>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#fef9c3] text-[#ca8a04] border border-[#fde047]">
                  Chờ duyệt
                </span>
              </td>
              <td className="px-3 py-2 text-center border-r border-slate-200">
                <div className="font-semibold text-slate-800">1.537.560</div>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#fef9c3] text-[#ca8a04] border border-[#fde047]">
                  Chờ duyệt
                </span>
              </td>
              <td className="px-4 py-2 text-right font-bold text-slate-900 whitespace-nowrap">
                67.412.354
              </td>
            </tr>

            {/* Tháng 10 */}
            <tr className="hover:bg-slate-50/60 transition-colors">
              <td className="px-4 py-2 text-left font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">
                Tháng 10
              </td>
              <td className="px-3 py-2 text-center border-r border-slate-200">
                <div className="font-semibold text-slate-800">907.200</div>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                  Đã duyệt
                </span>
              </td>
              <td className="px-3 py-2 text-center text-slate-400 font-medium border-r border-slate-200">
                —
              </td>
              <td className="px-3 py-2 text-center border-r border-slate-200">
                <div className="font-semibold text-slate-800">12.463.000</div>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                  Đã duyệt
                </span>
              </td>
              <td className="px-3 py-2 text-center border-r border-slate-200">
                <div className="font-semibold text-slate-800">17.320.684</div>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                  Đã duyệt
                </span>
              </td>
              <td className="px-3 py-2 text-center border-r border-slate-200">
                <div className="font-semibold text-slate-800">15.662.392</div>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                  Đã duyệt
                </span>
              </td>
              <td className="px-3 py-2 text-center border-r border-slate-200">
                <div className="font-semibold text-slate-800">20.412.218</div>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                  Đã duyệt
                </span>
              </td>
              <td className="px-3 py-2 text-center border-r border-slate-200">
                <div className="font-semibold text-slate-800">1.537.560</div>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                  Đã duyệt
                </span>
              </td>
              <td className="px-4 py-2 text-right font-bold text-slate-900 whitespace-nowrap">
                68.303.054
              </td>
            </tr>
          </tbody>

          {/* Table Footer - Cố định sticky bottom */}
          <tfoot className="sticky bottom-0 z-20 shadow-md">
            <tr className="bg-[#3d5a6c] text-white font-bold">
              <td className="sticky bottom-0 bg-[#3d5a6c] px-4 py-2.5 text-left uppercase tracking-wider border-r border-slate-400/30 whitespace-nowrap">
                TỔNG CỘNG NĂM {selectedYear}
              </td>
              <td className="sticky bottom-0 bg-[#3d5a6c] px-3 py-2.5 text-center border-r border-slate-400/30">
                907.200
              </td>
              <td className="sticky bottom-0 bg-[#3d5a6c] px-3 py-2.5 text-center border-r border-slate-400/30">
                0
              </td>
              <td className="sticky bottom-0 bg-[#3d5a6c] px-3 py-2.5 text-center border-r border-slate-400/30">
                24.926.000
              </td>
              <td className="sticky bottom-0 bg-[#3d5a6c] px-3 py-2.5 text-center border-r border-slate-400/30">
                34.641.368
              </td>
              <td className="sticky bottom-0 bg-[#3d5a6c] px-3 py-2.5 text-center border-r border-slate-400/30">
                31.324.784
              </td>
              <td className="sticky bottom-0 bg-[#3d5a6c] px-3 py-2.5 text-center border-r border-slate-400/30">
                40.840.936
              </td>
              <td className="sticky bottom-0 bg-[#3d5a6c] px-3 py-2.5 text-center border-r border-slate-400/30">
                3.075.120
              </td>
              <td className="sticky bottom-0 bg-[#bf9146] px-4 py-2.5 text-right whitespace-nowrap">
                135.715.408
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Note caption */}
      <p className="text-[11px] text-slate-500 leading-relaxed shrink-0">
        Bảng tổng hợp giá trị đề xuất NVL tháng của 7 phòng ban Khối Kỹ thuật. Tổng tiền tính từ số lượng đề xuất × đơn giá tham chiếu (Danh sách NVL). Chuyển sang <span className="font-semibold text-slate-700">Chi tiết mã NVL</span> để xem từng mã NVL được đề xuất.
      </p>
    </div>
  );
}
