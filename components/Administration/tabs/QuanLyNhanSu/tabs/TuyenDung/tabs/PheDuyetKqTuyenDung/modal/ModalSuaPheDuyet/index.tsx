"use client";

import React, { useState, useEffect } from "react";
import { IconX, IconEdit, IconCheck } from "@tabler/icons-react";
import { InterviewEvaluationRecord } from "@/api/apiGetInterviewEvaluation";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InterviewEvaluationRecord | null;
  onSave: (updated: InterviewEvaluationRecord) => void;
}

export default function ModalSuaPheDuyet({
  isOpen,
  onClose,
  data,
  onSave,
}: EditModalProps) {
  const [formData, setFormData] = useState<InterviewEvaluationRecord | null>(null);

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data, isOpen]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#1b3b4f] flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <IconEdit size={18} />
            <h3 className="text-sm sm:text-base font-bold">
              Chỉnh sửa phê duyệt kết quả tuyển dụng
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Họ tên ứng viên
              </label>
              <input
                type="text"
                value={formData.candidate_name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, candidate_name: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-hidden focus:border-[#406c89]"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Vị trí
              </label>
              <input
                type="text"
                value={formData.position || ""}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-hidden focus:border-[#406c89]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Phòng ban phụ trách
              </label>
              <input
                type="text"
                value={formData.candidate_department || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    candidate_department: e.target.value,
                  })
                }
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-hidden focus:border-[#406c89]"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Tổng điểm PV
              </label>
              <input
                type="text"
                value={formData.total_score || ""}
                onChange={(e) =>
                  setFormData({ ...formData, total_score: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-hidden focus:border-[#406c89]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Kết quả sau PV
              </label>
              <select
                value={formData.decision || "KÝ HỢP ĐỒNG"}
                onChange={(e) =>
                  setFormData({ ...formData, decision: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-hidden focus:border-[#406c89]"
              >
                <option value="KÝ HỢP ĐỒNG">KÝ HỢP ĐỒNG</option>
                <option value="KHÔNG TUYỂN">KHÔNG TUYỂN</option>
                <option value="DỰ PHÒNG">DỰ PHÒNG</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Loại HĐ
              </label>
              <select
                value={formData.contract_type || "HĐ Chính thức"}
                onChange={(e) =>
                  setFormData({ ...formData, contract_type: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-hidden focus:border-[#406c89]"
              >
                <option value="HĐ Thử việc">HĐ Thử việc</option>
                <option value="HĐ Chính thức">HĐ Chính thức</option>
                <option value="HĐ Học việc">HĐ Học việc</option>
                <option value="Thời vụ">Thời vụ</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Người phỏng vấn
              </label>
              <input
                type="text"
                value={formData.interviewer_name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, interviewer_name: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-hidden focus:border-[#406c89]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Trạng thái phê duyệt
              </label>
              <select
                value={formData.approval_status || "Chờ PGĐ duyệt"}
                onChange={(e) =>
                  setFormData({ ...formData, approval_status: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-hidden focus:border-[#406c89]"
              >
                <option value="Chờ PGĐ duyệt">Chờ PGĐ duyệt</option>
                <option value="PGĐ đã duyệt">PGĐ đã duyệt</option>
                <option value="Đã từ chối">Đã từ chối</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                QL Khối VP duyệt
              </label>
              <input
                type="text"
                value={formData.vp_approver_name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, vp_approver_name: e.target.value })
                }
                className="w-full px-2 py-1.5 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                QL Phòng ban duyệt
              </label>
              <input
                type="text"
                value={formData.dept_approver_name || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dept_approver_name: e.target.value,
                  })
                }
                className="w-full px-2 py-1.5 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                PGĐ duyệt
              </label>
              <input
                type="text"
                value={formData.pgd_approver_name || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pgd_approver_name: e.target.value,
                  })
                }
                placeholder="—"
                className="w-full px-2 py-1.5 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 text-white bg-[#406c89] hover:bg-[#345972] rounded-md transition-colors font-bold shadow-xs"
            >
              <IconCheck size={15} />
              <span>Lưu</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
