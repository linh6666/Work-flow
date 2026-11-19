"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  IconX,
  IconPlus,
  IconTrash,
  IconDeviceFloppy,
} from "@tabler/icons-react";
import {
  CompetencyFrameworkItem,
  CompetencyCriteria,
} from "@/api/apiGetCompetencyFramework";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  departments: string[];
  suggestedCode?: string;
  onAdd: (newItem: CompetencyFrameworkItem) => void;
}

export default function ModalAddKhungDanhGia({
  isOpen,
  onClose,
  departments,
  suggestedCode,
  onAdd,
}: AddModalProps) {
  const [positionCode, setPositionCode] = useState<string>("");
  const [positionTitle, setPositionTitle] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [criteria, setCriteria] = useState<CompetencyCriteria[]>([
    {
      name: "",
      weight: 0,
      level: "",
      question: "",
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      setPositionCode(suggestedCode || "");
      setPositionTitle("");
      setDepartment("");
      setNotes("");
      setCriteria([
        {
          name: "",
          weight: 0,
          level: "",
          question: "",
        },
      ]);
    }
  }, [isOpen, suggestedCode]);

  // Đóng modal khi bấm Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Tính tổng tỷ trọng (%)
  const totalWeight = useMemo(() => {
    return criteria.reduce((sum, item) => sum + (Number(item.weight) || 0), 0);
  }, [criteria]);

  if (!isOpen) return null;

  const handleCriteriaChange = (
    index: number,
    field: keyof CompetencyCriteria,
    value: any
  ) => {
    setCriteria((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        [field]: value,
      };
      return next;
    });
  };

  const handleAddCriteria = () => {
    setCriteria((prev) => [
      ...prev,
      {
        name: "",
        weight: 0,
        level: "",
        question: "",
      },
    ]);
  };

  const handleRemoveCriteria = (index: number) => {
    setCriteria((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!positionTitle.trim()) {
      alert("Vui lòng nhập tên Vị trí!");
      return;
    }

    const newItem: CompetencyFrameworkItem = {
      id: `pos-${Date.now()}`,
      position_code: positionCode.trim().toUpperCase() || "P01",
      position_title: positionTitle.trim(),
      department: department.trim() || "Chưa phân loại",
      notes: notes.trim() || null,
      criteria: criteria.filter((c) => c.name.trim() !== ""),
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal đúng theo ảnh: nền xanh đậm #274555, chữ trắng */}
        <div className="px-5 py-3.5 bg-[#274555] flex items-center justify-between text-white">
          <h3 className="text-sm sm:text-base font-bold tracking-wide">
            Thêm khung đánh giá năng lực
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Hàng 1: Mã vị trí, Vị trí *, Phòng/Ban */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-end">
              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Mã vị trí
                </label>
                <input
                  type="text"
                  value={positionCode}
                  onChange={(e) => setPositionCode(e.target.value)}
                  placeholder="VD: P01"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] focus:outline-hidden text-slate-700 placeholder:text-slate-400"
                />
              </div>

              <div className="sm:col-span-5">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Vị trí <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={positionTitle}
                  onChange={(e) => setPositionTitle(e.target.value)}
                  placeholder="VD: Nhân viên vận hành máy cắt laser"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] focus:outline-hidden text-slate-700 placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Phòng/Ban
                </label>
                <div className="relative">
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] focus:outline-hidden text-slate-700 cursor-pointer appearance-none"
                  >
                    <option value="">— Không chọn —</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Khung Tiêu chí năng lực */}
            <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50/40">
              {/* Tiêu đề & Tổng tỷ trọng */}
              <div className="px-4 py-2 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-[#274555]">Tiêu chí năng lực</span>
                <span className="font-semibold text-slate-600">
                  Tổng tỷ trọng: {totalWeight}%
                </span>
              </div>

              {/* Bảng Tiêu chuẩn theo ảnh */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#274555] text-white font-bold text-[11px] divide-x divide-[#375a6e]">
                      <th className="py-2 px-2 text-center w-10">#</th>
                      <th className="py-2 px-3 text-center">Tiêu chí</th>
                      <th className="py-2 px-2 text-center w-20 leading-tight">
                        Tỷ trọng<br />(%)
                      </th>
                      <th className="py-2 px-2 text-center w-24">Bậc</th>
                      <th className="py-2 px-3 text-center">Câu hỏi & dấu hiệu đạt</th>
                      <th className="py-2 px-2 text-center w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {criteria.map((item, idx) => (
                      <tr key={idx} className="divide-x divide-slate-200 hover:bg-slate-50/50">
                        {/* Cột # */}
                        <td className="p-2 text-center font-medium text-slate-500 align-top">
                          {idx + 1}
                        </td>

                        {/* Cột Tiêu chí */}
                        <td className="p-2 align-top">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) =>
                              handleCriteriaChange(idx, "name", e.target.value)
                            }
                            placeholder="VD: Vận hành & bảo dưỡng máy cắt laser"
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-sm focus:outline-hidden focus:border-[#406c89] placeholder:text-slate-400"
                          />
                        </td>

                        {/* Cột Tỷ trọng (%) */}
                        <td className="p-2 align-top w-20">
                          <input
                            type="number"
                            value={item.weight || ""}
                            onChange={(e) =>
                              handleCriteriaChange(
                                idx,
                                "weight",
                                e.target.value === "" ? 0 : Number(e.target.value)
                              )
                            }
                            min={0}
                            max={100}
                            placeholder="0"
                            className="w-full px-2 py-1.5 text-xs text-center border border-slate-200 rounded-sm focus:outline-hidden focus:border-[#406c89]"
                          />
                        </td>

                        {/* Cột Bậc */}
                        <td className="p-2 align-top w-24">
                          <select
                            value={item.level}
                            onChange={(e) =>
                              handleCriteriaChange(idx, "level", e.target.value)
                            }
                            className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded-sm focus:outline-hidden focus:border-[#406c89] text-slate-700 cursor-pointer"
                          >
                            <option value="">—</option>
                            <option value="Bậc 1">Bậc 1</option>
                            <option value="Bậc 2">Bậc 2</option>
                            <option value="Bậc 3">Bậc 3</option>
                            <option value="Bậc 4">Bậc 4</option>
                            <option value="Bậc 5">Bậc 5</option>
                          </select>
                        </td>

                        {/* Cột Câu hỏi & dấu hiệu đạt */}
                        <td className="p-2 align-top">
                          <textarea
                            rows={2}
                            value={item.question}
                            onChange={(e) =>
                              handleCriteriaChange(idx, "question", e.target.value)
                            }
                            placeholder="Gợi ý hỏi/test... Dấu hiệu đạt..."
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-sm focus:outline-hidden focus:border-[#406c89] placeholder:text-slate-400 resize-y"
                          />
                        </td>

                        {/* Cột nút xóa */}
                        <td className="p-2 text-center align-middle w-10">
                          {criteria.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveCriteria(idx)}
                              title="Xóa tiêu chí"
                              className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                            >
                              <IconTrash size={15} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Nút + Thêm tiêu chí */}
            <div>
              <button
                type="button"
                onClick={handleAddCriteria}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md shadow-2xs transition-colors cursor-pointer"
              >
                <IconPlus size={15} />
                <span>Thêm tiêu chí</span>
              </button>
            </div>

            {/* Trường Ghi chú */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Ghi chú
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-[#406c89] focus:border-[#406c89] focus:outline-hidden text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Footer: Hủy & Lưu (#406c89) */}
          <div className="p-3.5 sm:px-6 border-t border-slate-200 bg-white flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-md transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-1.5 text-xs font-bold text-white bg-[#406c89] hover:bg-[#345972] active:bg-[#2b495e] rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <IconDeviceFloppy size={16} />
              <span>Lưu</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
