"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  IconSearch,
  IconRefresh,
  IconTable,
  IconAlertCircle,
  IconEdit,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import {
  getCompetencyFrameworkList,
  CompetencyFrameworkItem,
  CompetencyCriteria,
} from "@/api/apiGetCompetencyFramework";

export default function KhungDanhGiaNangLuc() {
  const [data, setData] = useState<CompetencyFrameworkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDept, setSelectedDept] = useState<string>("all");

  // Phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Khi tìm kiếm hoặc đổi phòng ban, tự động đưa về trang 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDept]);

  // Ref & State cho tính năng giữ chuột kéo lướt bảng (drag-to-scroll)
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{
    startX: number;
    startY: number;
    scrollLeft: number;
    scrollTop: number;
    isDown: boolean;
  }>({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
    isDown: false,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Không bắt drag khi bấm vào form input/select/button
    const target = e.target as HTMLElement;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "BUTTON" ||
      target.closest("button")
    ) {
      return;
    }

    if (!tableContainerRef.current) return;
    dragStartRef.current = {
      startX: e.pageX - tableContainerRef.current.offsetLeft,
      startY: e.pageY - tableContainerRef.current.offsetTop,
      scrollLeft: tableContainerRef.current.scrollLeft,
      scrollTop: tableContainerRef.current.scrollTop,
      isDown: true,
    };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragStartRef.current.isDown || !tableContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - tableContainerRef.current.offsetLeft;
    const y = e.pageY - tableContainerRef.current.offsetTop;
    const walkX = (x - dragStartRef.current.startX) * 1.5; // Tốc độ lướt ngang
    const walkY = (y - dragStartRef.current.startY) * 1.5; // Tốc độ lướt dọc
    tableContainerRef.current.scrollLeft = dragStartRef.current.scrollLeft - walkX;
    tableContainerRef.current.scrollTop = dragStartRef.current.scrollTop - walkY;
  };

  const handleMouseUpOrLeave = () => {
    if (dragStartRef.current.isDown) {
      dragStartRef.current.isDown = false;
      setIsDragging(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCompetencyFrameworkList();
      setData(res);
    } catch (err: any) {
      console.error("Lỗi khi tải Khung đánh giá năng lực:", err);
      setError(err?.message || "Không thể tải danh sách Khung đánh giá năng lực.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Danh sách các phòng ban duy nhất để lọc
  const departments = useMemo(() => {
    const set = new Set<string>();
    data.forEach((item) => {
      if (item.department) set.add(item.department);
    });
    return Array.from(set);
  }, [data]);

  // Lọc dữ liệu theo từ khóa tìm kiếm và phòng ban
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        !searchTerm.trim() ||
        item.position_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.position_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.criteria.some(
          (c: CompetencyCriteria) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.question.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchDept = selectedDept === "all" || item.department === selectedDept;

      return matchSearch && matchDept;
    });
  }, [data, searchTerm, selectedDept]);

  // Tính toán dữ liệu phân trang
  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Format văn bản gợi ý câu hỏi & dấu hiệu (tô đậm các tiêu đề gợi ý)
  const renderQuestionText = (rawText: string) => {
    if (!rawText) return <span className="text-slate-300">—</span>;

    // Tách theo dòng \r\n hoặc \n
    const lines = rawText.split(/\r?\n/).filter((l) => l.trim().length > 0);

    return (
      <div className="space-y-1.5 text-left text-[11px] leading-relaxed text-slate-700">
        {lines.map((line, idx) => {
          if (line.startsWith("Gợi ý hỏi/test:")) {
            return (
              <p key={idx}>
                <span className="font-semibold text-sky-800">Gợi ý hỏi/test:</span>{" "}
                {line.replace("Gợi ý hỏi/test:", "").trim()}
              </p>
            );
          }
          if (line.startsWith("Dấu hiệu đạt")) {
            const match = line.match(/^(Dấu hiệu đạt\s*\([^)]+\):)(.*)$/);
            if (match) {
              return (
                <p key={idx}>
                  <span className="font-semibold text-emerald-800">{match[1]}</span>{" "}
                  {match[2].trim()}
                </p>
              );
            }
            return (
              <p key={idx}>
                <span className="font-semibold text-emerald-800">Dấu hiệu đạt:</span>{" "}
                {line.replace(/^Dấu hiệu đạt[^:]*:/, "").trim()}
              </p>
            );
          }
          return <p key={idx}>{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Header Toolbar */}
      <div className="p-3 sm:p-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1a384c] text-white flex items-center justify-center shadow-xs">
            <IconTable size={18} />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-800">
              Khung Đánh Giá Năng Lực Theo Vị Trí
            </h2>
            <p className="text-xs text-slate-500">
              Ma trận tiêu chuẩn, tỷ trọng, mức bậc và câu hỏi/dấu hiệu đánh giá (31 vị trí chuẩn hóa)
            </p>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2 flex-wrap ml-auto">
          {/* Ô tìm kiếm */}
          <div className="relative">
            <IconSearch
              size={15}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Tìm mã vị trí, tên, tiêu chí..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1a384c]/20 focus:border-[#1a384c] w-52 sm:w-64 transition-all"
            />
          </div>

          {/* Lọc phòng ban */}
          <div className="relative">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="pl-3 pr-7 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1a384c]/20 focus:border-[#1a384c] text-slate-700 cursor-pointer font-medium"
            >
              <option value="all">Tất cả phòng ban ({departments.length})</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Nút Làm mới */}
          <button
            onClick={fetchData}
            title="Tải lại dữ liệu"
            className="p-1.5 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
          >
            <IconRefresh size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Main Table Container (Hỗ trợ giữ chuột kéo lướt cả ngang và dọc, ẩn thanh cuộn) */}
      <div
        ref={tableContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className={`flex-1 overflow-auto relative select-none [&::-webkit-scrollbar]:hidden no-scrollbar ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-3 text-slate-400">
            <div className="w-8 h-8 border-3 border-[#1a384c] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-medium text-slate-600">Đang tải ma trận đánh giá năng lực...</p>
          </div>
        ) : error ? (
          <div className="h-96 flex flex-col items-center justify-center gap-2 p-6 text-center">
            <IconAlertCircle size={32} className="text-rose-500" />
            <p className="text-sm font-semibold text-slate-700">Lỗi khi tải dữ liệu</p>
            <p className="text-xs text-rose-600 max-w-md">{error}</p>
            <button
              onClick={fetchData}
              className="mt-2 px-3 py-1.5 text-xs font-medium text-white bg-[#1a384c] rounded-lg hover:bg-[#234b66] transition-colors cursor-pointer"
            >
              Thử lại
            </button>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="h-96 flex flex-col items-center justify-center gap-2 text-slate-400">
            <p className="text-xs">Không tìm thấy vị trí nào phù hợp với bộ lọc.</p>
          </div>
        ) : (
          <table className="w-full text-[11px] border-collapse min-w-[2400px]">
            {/* Table Header */}
            <thead className="sticky top-0 z-20 shadow-xs">
              {/* Row 1: Nhóm cột chính & 7 Tiêu chuẩn */}
              <tr className="bg-[#1b3b4f] text-white font-bold text-xs uppercase tracking-wider divide-x divide-[#2a5068]">
                <th
                  rowSpan={2}
                  className="p-2.5 text-center min-w-[70px] max-w-[70px] w-[70px] border-b border-[#2a5068]"
                >
                  MÃ VỊ TRÍ
                </th>
                <th
                  rowSpan={2}
                  className="p-2.5 text-left min-w-[200px] w-[200px] border-b border-[#2a5068]"
                >
                  VỊ TRÍ
                </th>
                <th
                  rowSpan={2}
                  className="p-2.5 text-left min-w-[160px] w-[160px] border-b border-[#2a5068]"
                >
                  PHÒNG BAN
                </th>

                {/* 7 Tiêu chuẩn */}
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <th
                    key={num}
                    colSpan={4}
                    className="p-2 text-center border-b border-[#2a5068] bg-[#1e435a]"
                  >
                    Tiêu chuẩn {num}
                  </th>
                ))}

                {/* Cột Hành động ở cuối bảng */}
                <th
                  rowSpan={2}
                  className="p-2.5 text-center min-w-[100px] w-[100px] sticky right-0 z-30 bg-[#1b3b4f] border-b border-[#2a5068] shadow-[-2px_0_4px_rgba(0,0,0,0.15)]"
                >
                  HÀNH ĐỘNG
                </th>
              </tr>

              {/* Row 2: Các cột con lặp lại cho mỗi tiêu chuẩn */}
              <tr className="bg-[#244b63] text-white font-semibold text-[11px] divide-x divide-[#315d78] border-b border-slate-300">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <React.Fragment key={num}>
                    <th className="p-2 text-left w-48 font-medium">Tiêu chí</th>
                    <th className="p-2 text-center w-16 font-medium">Tỷ trọng</th>
                    <th className="p-2 text-center w-16 font-medium">Mức</th>
                    <th className="p-2 text-left w-72 font-medium">Gợi ý câu hỏi & Dấu hiệu</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200 bg-white">
              {paginatedData.map((pos, rowIndex) => {
                const isEven = rowIndex % 2 === 0;
                return (
                  <tr
                    key={pos.id || pos.position_code}
                    className={`hover:bg-sky-50/50 transition-colors divide-x divide-slate-200 ${
                      isEven ? "bg-white" : "bg-slate-50/40"
                    }`}
                  >
                    {/* Cột 1: Mã vị trí */}
                    <td
                      className="p-2.5 text-center font-bold text-slate-800 align-top border-r border-slate-200"
                    >
                      <span className="inline-block px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-800 border border-slate-200 text-[10px]">
                        {pos.position_code}
                      </span>
                    </td>

                    {/* Cột 2: Tên vị trí */}
                    <td
                      className="p-2.5 font-semibold text-slate-800 align-top border-r border-slate-200"
                    >
                      {pos.position_title
                        ? pos.position_title.replace(
                            new RegExp(`^${pos.position_code}\\s*[-–:]?\\s*`, "i"),
                            ""
                          )
                        : pos.position_title}
                    </td>

                    {/* Cột 3: Phòng ban */}
                    <td
                      className="p-2.5 text-slate-600 align-top border-r border-slate-200"
                    >
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700">
                        {pos.department}
                      </span>
                    </td>

                    {/* 7 Tiêu chuẩn (mỗi tiêu chuẩn 4 cột con: Tiêu chí, Tỷ trọng, Mức, Gợi ý & Dấu hiệu) */}
                    {[0, 1, 2, 3, 4, 5, 6].map((criteriaIdx) => {
                      const criteria = pos.criteria[criteriaIdx];

                      if (!criteria) {
                        return (
                          <React.Fragment key={criteriaIdx}>
                            <td className="p-2 text-center text-slate-300 align-top">—</td>
                            <td className="p-2 text-center text-slate-300 align-top">—</td>
                            <td className="p-2 text-center text-slate-300 align-top">—</td>
                            <td className="p-2 text-center text-slate-300 align-top">—</td>
                          </React.Fragment>
                        );
                      }

                      return (
                        <React.Fragment key={criteriaIdx}>
                          {/* Tiêu chí */}
                          <td className="p-2 text-left font-medium text-slate-800 align-top leading-snug">
                            {criteria.name}
                          </td>

                          {/* Tỷ trọng */}
                          <td className="p-2 text-center font-semibold text-slate-700 align-top whitespace-nowrap">
                            <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-sm">
                              {criteria.weight != null ? `${criteria.weight}%` : "—"}
                            </span>
                          </td>

                          {/* Mức */}
                          <td className="p-2 text-center font-medium text-slate-700 align-top whitespace-nowrap">
                            <span className="text-[10px] bg-sky-50 text-sky-800 font-semibold px-1.5 py-0.5 rounded-sm border border-sky-100">
                              {criteria.level != null
                                ? String(criteria.level).startsWith("Bậc")
                                  ? criteria.level
                                  : `Bậc ${criteria.level}`
                                : "—"}
                            </span>
                          </td>

                          {/* Gợi ý câu hỏi & Dấu hiệu */}
                          <td className="p-2 text-left align-top">
                            {renderQuestionText(criteria.question)}
                          </td>
                        </React.Fragment>
                      );
                    })}

                    {/* Cột Hành động (Sửa, Xóa) - Ghim cố định ở mép phải bảng */}
                    <td
                      className={`p-2.5 text-center align-middle sticky right-0 z-10 border-l border-slate-200 shadow-[-2px_0_4px_rgba(0,0,0,0.05)] ${
                        isEven ? "bg-white" : "bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            console.log("Sửa vị trí:", pos);
                          }}
                          title="Chỉnh sửa vị trí"
                          className="p-1.5 rounded-md text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-colors cursor-pointer"
                        >
                          <IconEdit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            console.log("Xóa vị trí:", pos);
                          }}
                          title="Xóa vị trí"
                          className="p-1.5 rounded-md text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <IconTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer & Phân trang */}
      <div className="p-2.5 sm:px-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
        {/* Thông tin số lượng & Chọn page size */}
        <div className="flex items-center gap-3">
          <div>
            Hiển thị{" "}
            <span className="font-semibold text-slate-800">
              {totalItems === 0
                ? "0"
                : `${(currentPage - 1) * pageSize + 1} - ${Math.min(
                    currentPage * pageSize,
                    totalItems
                  )}`}
            </span>{" "}
            trên tổng số{" "}
            <span className="font-semibold text-slate-800">{totalItems}</span> vị trí
          </div>

          <div className="flex items-center gap-1.5 text-slate-500">
            <span>/ trang:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-0.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-hidden text-slate-700 cursor-pointer font-medium"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={31}>31 (Tất cả)</option>
            </select>
          </div>
        </div>

        {/* Nút điều hướng phân trang */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Về trang đầu */}
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            title="Trang đầu"
            className="p-1 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <IconChevronsLeft size={16} />
          </button>

          {/* Trang trước */}
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            title="Trang trước"
            className="p-1 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <IconChevronLeft size={16} />
          </button>

          {/* Các nút số trang */}
          <div className="flex items-center gap-1 px-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              // Hiển thị gọn nếu nhiều trang
              if (
                totalPages > 7 &&
                pageNum !== 1 &&
                pageNum !== totalPages &&
                Math.abs(pageNum - currentPage) > 1
              ) {
                if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return (
                    <span key={pageNum} className="text-slate-400 px-1">
                      ...
                    </span>
                  );
                }
                return null;
              }

              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`min-w-[28px] h-7 px-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#1b3b4f] text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {/* Trang kế tiếp */}
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            title="Trang kế tiếp"
            className="p-1 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <IconChevronRight size={16} />
          </button>

          {/* Đến trang cuối */}
          <button
            type="button"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            title="Trang cuối"
            className="p-1 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <IconChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
