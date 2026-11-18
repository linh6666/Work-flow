"use client";

import React, { useState } from 'react';
import {
  IconX,
  IconChartBar,
  IconArrowsDiagonal,
  IconMaximize,
  IconMinimize,
} from '@tabler/icons-react';

interface SoDoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SoDoModal({ isOpen, onClose }: SoDoModalProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  if (!isOpen) return null;

  // Dữ liệu biểu đồ 1: So sánh chỉ số theo cột (Phễu sàng lọc ngang)
  const funnelData = [
    { label: "Tổng ứng viên", value: 312, color: "#4f6ef7" },
    { label: "Lọc CV đạt", value: 242, color: "#38bdf8" },
    { label: "Bài test đạt", value: 0, color: "#00bba7" },
    { label: "Tham gia PV", value: 63, color: "#f59e0b" },
    { label: "Đạt yêu cầu", value: 34, color: "#9333ea" },
    { label: "Nhận việc", value: 24, color: "#10b981" },
  ];

  const maxFunnelVal = 320;

  // Dữ liệu biểu đồ 2: So sánh chỉ số theo tháng 2026
  // Tháng T01 đến T12
  const monthlyData = [
    { month: "T01", tongUV: 8, locCV: 8, testDat: 0, thamGiaPV: 1, nhanViec: 1 },
    { month: "T02", tongUV: 0, locCV: 0, testDat: 0, thamGiaPV: 0, nhanViec: 0 },
    { month: "T03", tongUV: 88, locCV: 61, testDat: 0, thamGiaPV: 13, nhanViec: 4 },
    { month: "T04", tongUV: 67, locCV: 63, testDat: 0, thamGiaPV: 6, nhanViec: 2 },
    { month: "T05", tongUV: 29, locCV: 27, testDat: 0, thamGiaPV: 7, nhanViec: 2 },
    { month: "T06", tongUV: 1, locCV: 0, testDat: 0, thamGiaPV: 0, nhanViec: 0 },
    { month: "T07", tongUV: 1, locCV: 0, testDat: 0, thamGiaPV: 0, nhanViec: 1 },
    { month: "T08", tongUV: 6, locCV: 4, testDat: 0, thamGiaPV: 1, nhanViec: 0 },
    { month: "T09", tongUV: 53, locCV: 42, testDat: 0, thamGiaPV: 13, nhanViec: 4 },
    { month: "T10", tongUV: 7, locCV: 0, testDat: 0, thamGiaPV: 2, nhanViec: 1 },
    { month: "T11", tongUV: 49, locCV: 29, testDat: 0, thamGiaPV: 18, nhanViec: 9 },
    { month: "T12", tongUV: 0, locCV: 0, testDat: 0, thamGiaPV: 0, nhanViec: 0 },
  ];

  const maxMonthVal = 100;

  const legendSeries = [
    { key: "tongUV", label: "Tổng UV", color: "#4f6ef7" },
    { key: "locCV", label: "Lọc CV đạt", color: "#38bdf8" },
    { key: "testDat", label: "Bài test đạt", color: "#00bba7" },
    { key: "thamGiaPV", label: "Tham gia PV", color: "#f59e0b" },
    { key: "nhanViec", label: "Nhận việc", color: "#10b981" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col transition-all duration-200 overflow-hidden ${
          isFullScreen
            ? "w-[98vw] h-[95vh]"
            : "w-full max-w-[1250px] max-h-[92vh]"
        }`}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <IconChartBar className="w-5 h-5" />
            </span>
            <h2 className="text-sm font-bold text-slate-800">
              Sơ đồ thống kê tuyển dụng 2026
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title={isFullScreen ? "Thu nhỏ" : "Toàn màn hình"}
            >
              {isFullScreen ? (
                <IconMinimize className="w-4 h-4" />
              ) : (
                <IconMaximize className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Đóng"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chart Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
            
            {/* =================================================== */}
            {/* BIỂU ĐỒ 1: So sánh chỉ số theo cột (Phễu ngang) */}
            {/* =================================================== */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between">
              <div>
                {/* Title */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">
                      <IconChartBar className="w-4 h-4" />
                    </span>
                    <h3 className="text-xs sm:text-[13px] font-bold text-slate-800 tracking-tight">
                      So sánh chỉ số theo cột{" "}
                      <span className="font-normal text-slate-400 text-xs">
                        (số ứng viên đạt ở từng bước sàng lọc)
                      </span>
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
                  >
                    <IconArrowsDiagonal className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Horizontal Bar Chart (SVG Rendered) */}
                <div className="w-full relative mt-2">
                  <svg
                    viewBox="0 0 520 280"
                    className="w-full h-auto overflow-visible select-none"
                  >
                    {/* Background Grid Lines (Vertical dotted) */}
                    {[0, 80, 160, 240, 320].map((tick) => {
                      const xPos = 115 + (tick / maxFunnelVal) * 380;
                      return (
                        <g key={tick}>
                          <line
                            x1={xPos}
                            y1={15}
                            x2={xPos}
                            y2={235}
                            stroke="#e2e8f0"
                            strokeWidth="1"
                            strokeDasharray="3 3"
                          />
                          {/* X-axis tick marker */}
                          <line
                            x1={xPos}
                            y1={235}
                            x2={xPos}
                            y2={242}
                            stroke="#94a3b8"
                            strokeWidth="1.2"
                          />
                          {/* X-axis Label */}
                          <text
                            x={xPos}
                            y={257}
                            fontSize="11"
                            fill="#64748b"
                            textAnchor="middle"
                            fontFamily="inherit"
                          >
                            {tick}
                          </text>
                        </g>
                      );
                    })}

                    {/* Left Y-Axis Baseline */}
                    <line
                      x1={115}
                      y1={15}
                      x2={115}
                      y2={235}
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                    />

                    {/* Bottom X-Axis Baseline */}
                    <line
                      x1={115}
                      y1={235}
                      x2={495}
                      y2={235}
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                    />

                    {/* Funnel Horizontal Bars */}
                    {funnelData.map((item, idx) => {
                      const yPos = 24 + idx * 36;
                      const barHeight = 22;
                      const barWidth = (item.value / maxFunnelVal) * 380;

                      return (
                        <g
                          key={item.label}
                          className="group cursor-pointer"
                          onMouseEnter={() => setHoveredBar(`funnel-${item.label}`)}
                          onMouseLeave={() => setHoveredBar(null)}
                        >
                          {/* Y-axis Label */}
                          <text
                            x={107}
                            y={yPos + 15}
                            fontSize="11"
                            fill="#475569"
                            textAnchor="end"
                            fontFamily="inherit"
                            fontWeight="500"
                          >
                            {item.label}
                          </text>

                          {/* Y-axis tick mark */}
                          <line
                            x1={110}
                            y1={yPos + 11}
                            x2={115}
                            y2={yPos + 11}
                            stroke="#94a3b8"
                            strokeWidth="1.2"
                          />

                          {/* The Bar */}
                          {item.value > 0 && (
                            <rect
                              x={115}
                              y={yPos}
                              width={Math.max(barWidth, 4)}
                              height={barHeight}
                              fill={item.color}
                              rx={3}
                              className="transition-all duration-200 hover:opacity-90"
                            />
                          )}

                          {/* Tooltip text on hover */}
                          {hoveredBar === `funnel-${item.label}` && (
                            <g>
                              <rect
                                x={115 + barWidth + 8}
                                y={yPos + 2}
                                width={46}
                                height={20}
                                rx={4}
                                fill="#1e293b"
                              />
                              <text
                                x={115 + barWidth + 31}
                                y={yPos + 16}
                                fontSize="11"
                                fill="#ffffff"
                                fontWeight="bold"
                                textAnchor="middle"
                              >
                                {item.value}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>

            {/* =================================================== */}
            {/* BIỂU ĐỒ 2: So sánh chỉ số theo tháng 2026 */}
            {/* =================================================== */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between">
              <div>
                {/* Title */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">
                      <IconChartBar className="w-4 h-4" />
                    </span>
                    <h3 className="text-xs sm:text-[13px] font-bold text-slate-800 tracking-tight">
                      So sánh chỉ số theo tháng 2026{" "}
                      <span className="font-normal text-slate-400 text-xs">
                        (số ứng viên theo từng tháng)
                      </span>
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
                  >
                    <IconArrowsDiagonal className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Vertical Grouped Bar Chart (SVG Rendered) */}
                <div className="w-full relative mt-2">
                  <svg
                    viewBox="0 0 540 280"
                    className="w-full h-auto overflow-visible select-none"
                  >
                    {/* Horizontal Dotted Grid Lines */}
                    {[0, 25, 50, 75, 100].map((tick) => {
                      const yPos = 230 - (tick / maxMonthVal) * 200;
                      return (
                        <g key={tick}>
                          {tick > 0 && (
                            <line
                              x1={45}
                              y1={yPos}
                              x2={525}
                              y2={yPos}
                              stroke="#e2e8f0"
                              strokeWidth="1"
                              strokeDasharray="3 3"
                            />
                          )}
                          {/* Y-axis tick line */}
                          <line
                            x1={40}
                            y1={yPos}
                            x2={45}
                            y2={yPos}
                            stroke="#94a3b8"
                            strokeWidth="1.2"
                          />
                          {/* Y-axis Label */}
                          <text
                            x={35}
                            y={yPos + 4}
                            fontSize="11"
                            fill="#64748b"
                            textAnchor="end"
                            fontFamily="inherit"
                          >
                            {tick}
                          </text>
                        </g>
                      );
                    })}

                    {/* Y-Axis Line */}
                    <line
                      x1={45}
                      y1={30}
                      x2={45}
                      y2={230}
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                    />

                    {/* Bottom X-Axis Line */}
                    <line
                      x1={45}
                      y1={230}
                      x2={525}
                      y2={230}
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                    />

                    {/* Render Grouped Bars for Each Month */}
                    {monthlyData.map((d, mIdx) => {
                      const groupWidth = 38;
                      const groupLeft = 52 + mIdx * 39;
                      const barWidth = 4.5;
                      const barGap = 1.5;

                      const keys: Array<{
                        key: "tongUV" | "locCV" | "testDat" | "thamGiaPV" | "nhanViec";
                        color: string;
                      }> = [
                        { key: "tongUV", color: "#4f6ef7" },
                        { key: "locCV", color: "#38bdf8" },
                        { key: "testDat", color: "#00bba7" },
                        { key: "thamGiaPV", color: "#f59e0b" },
                        { key: "nhanViec", color: "#10b981" },
                      ];

                      return (
                        <g key={d.month}>
                          {/* Month Label under X axis */}
                          <text
                            x={groupLeft + groupWidth / 2}
                            y={246}
                            fontSize="10"
                            fill="#64748b"
                            textAnchor="middle"
                            fontFamily="inherit"
                            fontWeight="500"
                          >
                            {d.month}
                          </text>

                          {/* Bars in group */}
                          {keys.map((k, kIdx) => {
                            const val = d[k.key];
                            const barH = (val / maxMonthVal) * 200;
                            const barX = groupLeft + kIdx * (barWidth + barGap);
                            const barY = 230 - barH;

                            if (val <= 0) return null;

                            return (
                              <g
                                key={k.key}
                                className="group cursor-pointer"
                                onMouseEnter={() =>
                                  setHoveredBar(`month-${d.month}-${k.key}`)
                                }
                                onMouseLeave={() => setHoveredBar(null)}
                              >
                                <rect
                                  x={barX}
                                  y={barY}
                                  width={barWidth}
                                  height={barH}
                                  fill={k.color}
                                  rx={1.5}
                                  className="transition-all duration-200 hover:opacity-80"
                                />
                                {hoveredBar === `month-${d.month}-${k.key}` && (
                                  <g>
                                    <rect
                                      x={barX - 10}
                                      y={barY - 24}
                                      width={25}
                                      height={18}
                                      rx={3}
                                      fill="#1e293b"
                                    />
                                    <text
                                      x={barX + 2.5}
                                      y={barY - 11}
                                      fontSize="10"
                                      fill="#ffffff"
                                      fontWeight="bold"
                                      textAnchor="middle"
                                    >
                                      {val}
                                    </text>
                                  </g>
                                )}
                              </g>
                            );
                          })}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Legend Below Chart */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4 pt-3 border-t border-slate-100">
                  {legendSeries.map((s) => (
                    <div key={s.key} className="flex items-center gap-1.5">
                      <span
                        className="w-3.5 h-3 rounded-xs shrink-0"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="text-[11px] text-slate-600 font-medium">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Modal */}
        <div className="px-5 py-3 border-t border-slate-200 bg-white flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Hệ thống phân tích & Báo cáo tuyển dụng
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
