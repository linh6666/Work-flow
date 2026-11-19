"use client";

import React, { useState, useEffect } from "react";
import {
  IconX,
  IconEdit,
  IconPlus,
  IconTrash,
  IconCheck,
} from "@tabler/icons-react";
import {
  CompetencyFrameworkItem,
  CompetencyCriteria,
} from "@/api/apiGetCompetencyFramework";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CompetencyFrameworkItem | null;
  onSave?: (updatedItem: CompetencyFrameworkItem) => void;
}

export default function ModalEditKhungDanhGia({
  isOpen,
  onClose,
  data,
  onSave,
}: EditModalProps) {
  const [formData, setFormData] = useState<CompetencyFrameworkItem | null>(null);

  useEffect(() => {
    if (data) {
      setFormData(JSON.parse(JSON.stringify(data)));
    }
  }, [data, isOpen]);

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

  if (!isOpen || !formData) return null;

  const handleCriteriaChange = (
    index: number,
    field: keyof CompetencyCriteria,
    value: any
  ) => {
    setFormData((prev) => {
      if (!prev) return null;
      const nextCriteria = [...prev.criteria];
      nextCriteria[index] = {
        ...nextCriteria[index],
        [field]: value,
      };
      return {
        ...prev,
        criteria: nextCriteria,
      };
    });
  };

  const handleAddCriteria = () => {
    setFormData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        criteria: [
          ...prev.criteria,
          {
            name: "",
            weight: 10,
            level: "Bậc 3",
            question: "Gợi ý hỏi/test: ...\r\nDấu hiệu đạt (Bậc 3): ...",
          },
        ],
      };
    });
  };

  const handleRemoveCriteria = (index: number) => {
    setFormData((prev) => {
      if (!prev) return null;
      const nextCriteria = prev.criteria.filter((_, i) => i !== index);
      return {
        ...prev,
        criteria: nextCriteria,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:px-6 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-xs">
              <IconEdit size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Chỉnh sửa khung đánh giá năng lực
              </h3>
              <p className="text-xs text-slate-500">
                Mã vị trí:{" "}
                <span className="font-semibold text-slate-700">
                  {formData.position_code}
                </span>{" "}
                — {formData.department}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {/* Thông tin cơ bản */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mã vị trí
                </label>
                <input
                  type="text"
                  value={formData.position_code}
                  onChange={(e) =>
                    setFormData((prev) =>
                      prev ? { ...prev, position_code: e.target.value } : null
                    )
                  }
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chức danh vị trí
                </label>
                <input
                  type="text"
                  value={formData.position_title}
                  onChange={(e) =>
                    setFormData((prev) =>
                      prev ? { ...prev, position_title: e.target.value } : null
                    )
                  }
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phòng ban
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData((prev) =>
                      prev ? { ...prev, department: e.target.value } : null
                    )
                  }
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden"
                  required
                />
              </div>
            </div>

            {/* Danh sách tiêu chuẩn đánh giá */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-slate-800">
                  Tiêu chuẩn đánh giá ({formData.criteria.length})
                </h4>
                <button
                  type="button"
                  onClick={handleAddCriteria}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors cursor-pointer"
                >
                  <IconPlus size={14} />
                  <span>Thêm tiêu chuẩn</span>
                </button>
              </div>

              <div className="space-y-3.5">
                {formData.criteria.map((crit, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-[#1b3b4f] bg-slate-100 px-2 py-0.5 rounded-sm">
                        Tiêu chuẩn {idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCriteria(idx)}
                        className="text-xs text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1 rounded-md transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <IconTrash size={14} />
                        <span>Xóa</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">
                          Tên tiêu chí
                        </label>
                        <input
                          type="text"
                          value={crit.name}
                          onChange={(e) =>
                            handleCriteriaChange(idx, "name", e.target.value)
                          }
                          placeholder="Nhập tên tiêu chí..."
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-sky-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">
                          Tỷ trọng (%)
                        </label>
                        <input
                          type="number"
                          value={crit.weight}
                          onChange={(e) =>
                            handleCriteriaChange(
                              idx,
                              "weight",
                              Number(e.target.value)
                            )
                          }
                          min={0}
                          max={100}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">
                          Mức bậc
                        </label>
                        <input
                          type="text"
                          value={crit.level}
                          onChange={(e) =>
                            handleCriteriaChange(idx, "level", e.target.value)
                          }
                          placeholder="VD: Bậc 4"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-sky-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">
                        Gợi ý câu hỏi & Dấu hiệu đạt
                      </label>
                      <textarea
                        rows={3}
                        value={crit.question}
                        onChange={(e) =>
                          handleCriteriaChange(idx, "question", e.target.value)
                        }
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-sky-500 resize-y leading-relaxed"
                        placeholder="Gợi ý hỏi/test: ... &#10;Dấu hiệu đạt: ..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:px-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#1b3b4f] hover:bg-[#234b66] rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <IconCheck size={16} />
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
