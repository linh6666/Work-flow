"use client";

import React, { useEffect, useState } from "react";
import {
  IconX,
  IconPrinter,
  IconFileSpreadsheet,
  IconFileText,
  IconCheck,
  IconEdit,
} from "@tabler/icons-react";
import { InterviewEvaluationRecord } from "@/api/apiGetInterviewEvaluation";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InterviewEvaluationRecord | null;
}

interface CriteriaItem {
  stt: number;
  tieuChi: string;
  canCu: string;
  mucDiem: number | null; // 1: Yếu (0-3), 2: TB (4-5), 3: Khá (6-7), 4: Tốt (8-9), 5: Xuất sắc (10)
  diem: number | null;
  nhanXet?: string;
}

interface SectionCriteria {
  key: string;
  title: string;
  tyTrong: number; // e.g. 5 = 5%
  diemTb: number;
  diemQuyDoi: number;
  items: CriteriaItem[];
}

export default function ModalXemPhieuDanhGia({
  isOpen,
  onClose,
  data,
}: ViewModalProps) {
  // Đóng khi bấm phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Tab kết quả sau phỏng vấn
  const [quyetDinh, setQuyetDinh] = useState<string>("KY_HOP_DONG");
  const [loaiHd, setLoaiHd] = useState<string>("HD_THU_VIEC");
  const [thoiHanHd, setThoiHanHd] = useState<string>("2 tháng");

  useEffect(() => {
    if (data) {
      if (data.decision?.toUpperCase().includes("KHÔNG")) {
        setQuyetDinh("KHONG_TUYEN_DUNG");
      } else if (data.decision?.toUpperCase().includes("DỰ PHÒNG")) {
        setQuyetDinh("LUU_HO_SO");
      } else if (data.decision?.toUpperCase().includes("XEM XÉT")) {
        setQuyetDinh("CHO_XEM_XET");
      } else {
        setQuyetDinh("KY_HOP_DONG");
      }

      if (data.contract_type?.toLowerCase().includes("chính thức")) {
        setLoaiHd("HD_CHINH_THUC");
      } else {
        setLoaiHd("HD_THU_VIEC");
      }
    }
  }, [data]);

  if (!isOpen || !data) return null;

  // Dữ liệu bảng đánh giá 6 mục A - F chuẩn theo hình ảnh mẫu
  const sections: SectionCriteria[] = [
    {
      key: "A",
      title: "A. Chuẩn bị phỏng vấn (5%)",
      tyTrong: 5,
      diemTb: 9.0,
      diemQuyDoi: 4.5,
      items: [
        {
          stt: 1,
          tieuChi: "Hồ sơ ứng viên",
          canCu: "CV đầy đủ, rõ ràng, trung thực; khớp yêu cầu vị trí; có bản sao bằng cấp/chứng chỉ.",
          mucDiem: 4,
          diem: 9,
        },
        {
          stt: 2,
          tieuChi: "Ngoại hình/Trang phục/Tác phong",
          canCu: "Gọn gàng, lịch sự, phù hợp môi trường làm việc; tác phong chuyên nghiệp.",
          mucDiem: 4,
          diem: 9,
        },
        {
          stt: 3,
          tieuChi: "Thông tin về công ty",
          canCu: "Ứng viên có tìm hiểu lĩnh vực mô hình kiến trúc, sản phẩm, dự án của công ty trước buổi phỏng vấn.",
          mucDiem: 4,
          diem: 9,
        },
        {
          stt: 4,
          tieuChi: "Kỹ năng diễn đạt/Phong thái tự tin, chủ động thể hiện",
          canCu: "Trình bày mạch lạc, ngắn gọn, tự tin; chủ động đặt câu hỏi.",
          mucDiem: 4,
          diem: 9,
        },
        {
          stt: 5,
          tieuChi: "Đúng giờ & thái độ tôn trọng buổi phỏng vấn",
          canCu: "Đến đúng giờ hoặc báo trước nếu trễ; thái độ lịch sự với mọi người trong công ty.",
          mucDiem: 4,
          diem: 9,
        },
        {
          stt: 6,
          tieuChi: "Động cơ ứng tuyển (lý do chọn công ty và vị trí)",
          canCu: "Hỏi: Vì sao bạn chọn công ty và vị trí này? Điều gì thu hút bạn?",
          mucDiem: 4,
          diem: 9,
        },
      ],
    },
    {
      key: "B",
      title: "B. Học vấn kiến thức - Kinh nghiệm chuyên môn (20%)",
      tyTrong: 20,
      diemTb: 8.0,
      diemQuyDoi: 16.0,
      items: [
        {
          stt: 1,
          tieuChi: "Học vấn trình độ chuyên môn",
          canCu: "Chuyên ngành, trường, kết quả học tập có phù hợp yêu cầu trong JD.",
          mucDiem: 4,
          diem: 9,
        },
        {
          stt: 2,
          tieuChi: "Kinh nghiệm làm việc thực tế",
          canCu: "Số năm, nơi làm việc, vai trò thực tế; đối chiếu với CV.",
          mucDiem: 4,
          diem: 9,
        },
        {
          stt: 3,
          tieuChi: "Kinh nghiệm liên quan đến vị trí ứng tuyển",
          canCu: "Mức độ trùng khớp giữa nhiệm vụ đã làm và JD vị trí ứng tuyển.",
          mucDiem: 4,
          diem: 9,
        },
        {
          stt: 4,
          tieuChi: "Hiểu biết về mô tả công việc của vị trí ứng tuyển",
          canCu: "Ứng viên tự mô tả lại được nhiệm vụ chính và đầu ra của vị trí.",
          mucDiem: 3,
          diem: 7,
        },
        {
          stt: 5,
          tieuChi: "Khả năng đáp ứng công việc",
          canCu: "Tổng hợp: có thể bắt tay vào việc ngay không; cần bao lâu đào tạo thêm.",
          mucDiem: 3,
          diem: 7,
        },
        {
          stt: 6,
          tieuChi: "Kiến thức chuyên môn qua câu hỏi/bài test",
          canCu: "Hỏi 2-3 câu chuyên môn cốt lõi hoặc làm bài test thực hành; ghi điểm test vào cột nhận xét.",
          mucDiem: 3,
          diem: 7,
        },
        {
          stt: 7,
          tieuChi: "Thành tích & dự án/sản phẩm tiêu biểu (portfolio)",
          canCu: "Yêu cầu kể 1-2 dự án/sản phẩm tiêu biểu: vai trò, kết quả đạt được; xem portfolio nếu có.",
          mucDiem: null,
          diem: null,
        },
        {
          stt: 8,
          tieuChi: "Sử dụng phần mềm/công cụ chuyên ngành theo JD",
          canCu: "Ví dụ CAD, SketchUp, 3D Max, ngôn ngữ lập trình, phần mềm dựng phim... theo JD; cho thao tác hoặc giải thích thực tế.",
          mucDiem: null,
          diem: null,
        },
        {
          stt: 9,
          tieuChi: "Tin học văn phòng & Internet",
          canCu: "Word, Excel, PowerPoint, email, Internet - JD hầu hết các vị trí yêu cầu thành thạo.",
          mucDiem: null,
          diem: null,
        },
        {
          stt: 10,
          tieuChi: "Chứng chỉ, đào tạo chuyên ngành & ngoại ngữ (nếu JD yêu cầu)",
          canCu: "Bằng cấp, chứng chỉ, khóa đào tạo liên quan; bỏ trống nếu không áp dụng.",
          mucDiem: null,
          diem: null,
        },
      ],
    },
    {
      key: "C",
      title: "C. Khả năng hội nhập - Nguyện vọng của ứng viên (10%)",
      tyTrong: 10,
      diemTb: 8.5,
      diemQuyDoi: 8.5,
      items: [
        {
          stt: 1,
          tieuChi: "Môi trường và yêu cầu trong công việc",
          canCu: "Ứng viên hiểu và chấp nhận đặc thù môi trường (văn phòng/xưởng sản xuất, tiến độ dự án).",
          mucDiem: 4,
          diem: 9,
        },
        {
          stt: 2,
          tieuChi: "Thu nhập",
          canCu: "Mức thu nhập mong muốn so với khung lương của vị trí.",
          mucDiem: 3,
          diem: 7,
        },
        {
          stt: 3,
          tieuChi: "Thời gian làm việc",
          canCu: "Chấp nhận giờ làm việc, ca/tăng ca theo tiến độ dự án.",
          mucDiem: 4,
          diem: 9,
        },
        {
          stt: 4,
          tieuChi: "Chế độ đãi ngộ",
          canCu: "Kỳ vọng về phúc lợi, bảo hiểm, thưởng, đào tạo; mức phù hợp với chế độ công ty.",
          mucDiem: 4,
          diem: 9,
        },
        {
          stt: 5,
          tieuChi: "Mục tiêu nghề nghiệp & định hướng phát triển",
          canCu: "Mục tiêu 3-5 năm; mong muốn phát triển; có gắn với lộ trình tại công ty không.",
          mucDiem: null,
          diem: null,
        },
        {
          stt: 6,
          tieuChi: "Sự phù hợp văn hóa & giá trị công ty",
          canCu: "Phong cách làm việc có phù hợp văn hóa công ty (sáng tạo, tỉ mỉ, kỷ luật, hợp tác) không.",
          mucDiem: null,
          diem: null,
        },
        {
          stt: 7,
          tieuChi: "Khả năng đi công tác, làm ngoài giờ theo dự án",
          canCu: "Sẵn sàng đi công tác/làm ngoài giờ khi dự án yêu cầu (JD khối sản xuất, công nghệ có nội dung đi công tác).",
          mucDiem: null,
          diem: null,
        },
        {
          stt: 8,
          tieuChi: "Địa điểm làm việc & thời gian có thể nhận việc",
          canCu: "Nơi ở, khoảng cách đi lại; thời gian báo trước ở công ty cũ, ngày có thể nhận việc.",
          mucDiem: null,
          diem: null,
        },
      ],
    },
    {
      key: "D",
      title: "D. Đạo đức trong công việc và cuộc sống (15%)",
      tyTrong: 15,
      diemTb: 9.0,
      diemQuyDoi: 13.5,
      items: [
        {
          stt: 1,
          tieuChi: "Khả năng học hỏi, thích ứng với công việc mới",
          canCu: "Ví dụ ứng viên tự học kỹ năng/phần mềm mới; tốc độ làm quen môi trường mới.",
          mucDiem: 4,
          diem: 9,
        },
        {
          stt: 2,
          tieuChi: "Lý do thay đổi công việc (đối với ứng viên đã từng đi làm)",
          canCu: "Lý do rõ ràng, hợp lý, không đổ lỗi; nhất quán với CV.",
          mucDiem: 4,
          diem: 9,
        },
        {
          stt: 3,
          tieuChi: "Trung thực & nhất quán giữa hồ sơ và câu trả lời",
          canCu: "Câu trả lời khớp hồ sơ; không phóng đại; không né tránh câu hỏi về lịch sử làm việc. (Điểm dưới 4 = cảnh báo loại trừ)",
          mucDiem: 4,
          diem: 9,
        },
        {
          stt: 4,
          tieuChi: "Tinh thần trách nhiệm & kỷ luật",
          canCu: "Cách nhận lỗi, cam kết kết quả; ví dụ hoàn thành việc dù khó khăn.",
          mucDiem: null,
          diem: null,
        },
        {
          stt: 5,
          tieuChi: "Thái độ với đồng nghiệp/cấp quản lý cũ",
          canCu: "Nhận xét khách quan, tôn trọng; không phàn nàn tiêu cực.",
          mucDiem: null,
          diem: null,
        },
        {
          stt: 6,
          tieuChi: "Tính ổn định & mức độ gắn bó",
          canCu: "Thời gian gắn bó mỗi nơi; số lần nghỉ việc ngắn hạn và lý do.",
          mucDiem: null,
          diem: null,
        },
        {
          stt: 7,
          tieuChi: "Bảo mật thông tin & tuân thủ nội quy, an toàn lao động",
          canCu: "Hiểu việc giữ bí mật thông tin dự án/khách hàng; tuân thủ nội quy và quy định an toàn.",
          mucDiem: null,
          diem: null,
        },
      ],
    },
    {
      key: "E",
      title: "E. Kỹ năng / Các yếu tố thể hiện mức phù hợp với CV (20%)",
      tyTrong: 20,
      diemTb: 7.0,
      diemQuyDoi: 14.0,
      items: [
        {
          stt: 1,
          tieuChi: "Kỹ năng giao tiếp và lắng nghe",
          canCu: "Nghe hiểu đúng câu hỏi, diễn đạt rõ ràng, phản hồi phù hợp.",
          mucDiem: 3,
          diem: 7,
        },
        {
          stt: 2,
          tieuChi: "Kỹ năng chuyên môn liên quan đến công việc (nếu có - ghi rõ chi tiết: 1..., 2..., 3...)",
          canCu: "Ghi rõ các kỹ năng chuyên môn ứng viên thể hiện được; đối chiếu với JD.",
          mucDiem: 3,
          diem: 7,
        },
        {
          stt: 3,
          tieuChi: "Tư duy trong công việc",
          canCu: "Cách tiếp cận công việc: logic, có kế hoạch, nhìn tổng thể; đặt 1 tình huống công việc.",
          mucDiem: null,
          diem: null,
        },
        {
          stt: 4,
          tieuChi: "Giải quyết vấn đề & xử lý tình huống",
          canCu: "Tình huống: dự án sắp trễ hạn/phát hiện lỗi sản phẩm - bạn làm gì? Đánh giá phân tích và hướng xử lý.",
          mucDiem: null,
          diem: null,
        },
        {
          stt: 5,
          tieuChi: "Làm việc nhóm & phối hợp",
          canCu: "Ví dụ phối hợp với bộ phận khác; vai trò trong nhóm; cách xử lý bất đồng.",
          mucDiem: null,
          diem: null,
        },
        {
          stt: 6,
          tieuChi: "Quản lý thời gian & chịu áp lực công việc",
          canCu: "Cách sắp xếp ưu tiên khi nhiều việc gấp; trải nghiệm làm việc dưới áp lực/deadline.",
          mucDiem: null,
          diem: null,
        },
        {
          stt: 7,
          tieuChi: "Chủ động & định hướng kết quả",
          canCu: "Ví dụ chủ động đề xuất/cải tiến; theo dõi công việc đến kết quả cuối.",
          mucDiem: null,
          diem: null,
        },
        {
          stt: 8,
          tieuChi: "Sáng tạo, tỉ mỉ & chú ý chi tiết",
          canCu: "Quan trọng với sản xuất mô hình, thiết kế, thủ công; xem sản phẩm/mẫu thực tế nếu có.",
          mucDiem: null,
          diem: null,
        },
        {
          stt: 9,
          tieuChi: "Kỹ năng quản lý & lãnh đạo (chỉ áp dụng vị trí quản lý)",
          canCu: "Phân công, đánh giá, đào tạo nhân viên; bỏ trống nếu không áp dụng.",
          mucDiem: null,
          diem: null,
        },
      ],
    },
    {
      key: "F",
      title: "F. Năng lực đặc thù theo vị trí - tiêu chí tối ưu lấy từ Khung năng lực (30%)",
      tyTrong: 30,
      diemTb: 7.0,
      diemQuyDoi: 21.0,
      items: [
        {
          stt: 1,
          tieuChi: "Thi công tiểu cảnh (cây, cỏ, ô, bàn ghế, vườn hoa...) (90%)",
          canCu: "Gợi ý hỏi/test: Cho làm thử 1 chi tiết tiểu cảnh (cây, ô, bàn ghế...) theo mẫu; đánh giá độ tỉ mỉ, đồng đều.\nDấu hiệu đạt (Bậc 3): Làm đúng, tỉ mỉ các chi tiết tiểu cảnh theo hồ sơ; đạt chất lượng và số lượng đề ra.\nKỳ vọng: Bậc 3",
          mucDiem: 3,
          diem: 7,
        },
        {
          stt: 2,
          tieuChi: "Kiểm tra chất lượng chi tiết/sản phẩm (10%)",
          canCu: "Gợi ý hỏi/test: Cho xem 2-3 chi tiết/sản phẩm có lỗi ẩn; yêu cầu chỉ ra lỗi và nêu cách xử lý.\nDấu hiệu đạt (Bậc 3): Kiểm tra đúng tiêu chuẩn, phát hiện và báo lỗi kịp thời ở mỗi công đoạn nhận/giao.\nKỳ vọng: Bậc 3",
          mucDiem: null,
          diem: null,
        },
      ],
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[1440px] bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden my-auto max-h-[96vh]"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header trên cùng có nút đóng X góc phải */}
        <div className="relative pt-2 px-3 flex justify-end bg-white">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Banner tiêu đề xanh đậm chính giữa */}
        <div className="mx-4 mb-3">
          <div className="bg-[#295679] text-white text-center py-2 px-4 rounded-md shadow-xs">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
              PHIẾU ĐÁNH GIÁ - NHẬN XÉT ỨNG VIÊN THAM GIA PHỎNG VẤN
            </h2>
          </div>
        </div>

        {/* Nội dung bảng có scroll cuộn */}
        <div className="px-4 overflow-y-auto flex-1 space-y-4 text-xs pb-4">
          {/* ════ I. PHẦN PHỎNG VẤN ════ */}
          <div className="border border-slate-200 rounded-md overflow-hidden">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#295679] text-white font-semibold text-center divide-x divide-slate-300">
                  <th className="py-2 px-2 w-10 text-center">STT</th>
                  <th className="py-2 px-3 w-48 text-left">TIÊU CHÍ ĐÁNH GIÁ</th>
                  <th className="py-2 px-3 text-center">GỢI Ý CÂU HỎI / CĂN CỨ CHẤM</th>
                  <th className="py-2 px-2 w-14 text-center text-[10px] leading-tight">
                    Yếu<br /><span className="font-normal">0 - 3 điểm</span>
                  </th>
                  <th className="py-2 px-2 w-14 text-center text-[10px] leading-tight">
                    TB<br /><span className="font-normal">4 - 5 điểm</span>
                  </th>
                  <th className="py-2 px-2 w-14 text-center text-[10px] leading-tight">
                    Khá<br /><span className="font-normal">6 - 7 điểm</span>
                  </th>
                  <th className="py-2 px-2 w-14 text-center text-[10px] leading-tight">
                    Tốt<br /><span className="font-normal">8 - 9 điểm</span>
                  </th>
                  <th className="py-2 px-2 w-16 text-center text-[10px] leading-tight">
                    Xuất sắc<br /><span className="font-normal">10 điểm</span>
                  </th>
                  <th className="py-2 px-2 w-12 text-center">ĐIỂM</th>
                  <th className="py-2 px-3 w-44 text-center">ĐÁNH GIÁ VỀ ỨNG VIÊN</th>
                </tr>
                {/* Dòng tiêu đề mục I màu vàng cát đậm */}
                <tr className="bg-[#bc9b5d] text-white font-bold">
                  <td colSpan={10} className="py-1.5 px-3 uppercase tracking-wider text-left text-xs">
                    I. PHẦN PHỎNG VẤN
                  </td>
                </tr>
              </thead>

              <tbody>
                {sections.map((sec) => (
                  <React.Fragment key={sec.key}>
                    {/* Header từng mục A, B, C, D, E, F màu vàng cát nhạt */}
                    <tr className="bg-[#ede4d0] font-bold text-slate-800">
                      <td colSpan={10} className="py-1.5 px-3 text-left">
                        {sec.title}
                      </td>
                    </tr>

                    {/* Tiêu đề Khung năng lực đặc biệt cho mục F */}
                    {sec.key === "F" && (
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <td colSpan={10} className="p-2.5">
                          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-800">Khung năng lực áp dụng:</span>
                              <div className="px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-700 font-medium">
                                P31 — P31 - NV Cảnh quan — Phòng Cảnh Quan
                              </div>
                            </div>
                            <span className="text-slate-500 italic">2 tiêu chí theo vị trí</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1">
                            Quy đổi bậc → điểm: Bậc 1 = 0-3 • Bậc 2 = 4-5 • Bậc 3 = 6-7 • Bậc 4 = 8-9 • Bậc 5 = 10. Điểm mục F = trung bình có trọng số các tiêu chí.
                          </p>
                        </td>
                      </tr>
                    )}

                    {/* Danh sách tiêu chí */}
                    {sec.items.map((it) => (
                      <tr
                        key={it.stt}
                        className="border-b border-slate-200 hover:bg-slate-50/60 transition-colors divide-x divide-slate-100"
                      >
                        <td className="py-2 px-1 text-center font-medium text-slate-500">
                          {it.stt}
                        </td>
                        <td className="py-2 px-2.5 font-semibold text-slate-800 text-[11px]">
                          {it.tieuChi}
                        </td>
                        <td className="py-2 px-2.5 text-slate-600 text-[11px] whitespace-pre-line leading-relaxed">
                          {it.canCu}
                        </td>
                        {/* 5 Radio dots mức điểm */}
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <td key={lvl} className="py-2 px-1 text-center">
                            <div
                              className={`w-3.5 h-3.5 mx-auto rounded-full border flex items-center justify-center ${
                                it.mucDiem === lvl
                                  ? "border-slate-500 bg-slate-400"
                                  : "border-slate-300 bg-transparent"
                              }`}
                            >
                              {it.mucDiem === lvl && (
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                              )}
                            </div>
                          </td>
                        ))}
                        {/* Điểm */}
                        <td className="py-2 px-1 text-center font-bold text-slate-800 text-xs">
                          {it.diem !== null ? it.diem : "—"}
                        </td>
                        {/* Nhận xét */}
                        <td className="py-2 px-2 text-slate-500 italic text-[11px]">
                          {it.nhanXet || ""}
                        </td>
                      </tr>
                    ))}

                    {/* Dòng tổng kết điểm của từng mục */}
                    <tr className="bg-slate-50/80 border-b border-slate-200 font-semibold text-xs">
                      <td colSpan={8} className="py-1.5 px-3 text-right text-slate-700">
                        Điểm tổng kết mục {sec.key}
                      </td>
                      <td colSpan={2} className="py-1.5 px-3 text-center text-slate-900 font-bold">
                        {sec.diemTb.toFixed(2)}/10 — quy đổi {sec.diemQuyDoi.toFixed(2)}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Tổng điểm phỏng vấn */}
                <tr className="bg-slate-100 font-bold text-slate-900 text-xs border-t-2 border-slate-300">
                  <td colSpan={8} className="py-2.5 px-3 text-right uppercase tracking-wider">
                    TỔNG ĐIỂM PHỎNG VẤN
                  </td>
                  <td colSpan={2} className="py-2.5 px-3 text-center text-indigo-900 text-sm">
                    {data.total_score || "7.75"}/10 ({data.total_score ? (Number(data.total_score) * 10).toFixed(2) : "77.50"}/100)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ════ II. TỔNG KẾT ĐÁNH GIÁ ════ */}
          <div className="border border-slate-200 rounded-md overflow-hidden">
            <div className="bg-[#bc9b5d] text-white font-bold py-1.5 px-3 text-xs uppercase tracking-wider">
              II. TỔNG KẾT ĐÁNH GIÁ
            </div>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#295679] text-white font-semibold text-center divide-x divide-slate-300 text-[11px]">
                  <th className="py-2 px-3 w-16">Mục</th>
                  <th className="py-2 px-4 text-left">Nội dung đánh giá</th>
                  <th className="py-2 px-3 w-24">Tỷ trọng</th>
                  <th className="py-2 px-3 w-28">Điểm TB mục (0-10)</th>
                  <th className="py-2 px-3 w-32">Điểm quy đổi (0-100)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sections.map((sec) => (
                  <tr key={sec.key} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 px-3 text-center font-bold text-slate-700">
                      {sec.key}
                    </td>
                    <td className="py-2 px-4 text-slate-800">
                      {sec.title.substring(3).replace(/\s*\(\d+%\)/, "")}
                    </td>
                    <td className="py-2 px-3 text-center text-slate-600 font-medium">
                      {sec.tyTrong}%
                    </td>
                    <td className="py-2 px-3 text-center text-slate-800 font-semibold">
                      {sec.diemTb.toFixed(2)}
                    </td>
                    <td className="py-2 px-3 text-center text-slate-900 font-bold">
                      {sec.diemQuyDoi.toFixed(2)}
                    </td>
                  </tr>
                ))}
                {/* Tổng điểm quy đổi */}
                <tr className="bg-slate-50 font-bold text-slate-900 border-t border-slate-300">
                  <td colSpan={4} className="py-2 px-4 text-right">
                    TỔNG điểm quy đổi (thang 100)
                  </td>
                  <td className="py-2 px-3 text-center text-indigo-900 text-sm">
                    77.50
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Chi tiết kết luận */}
            <div className="p-3 bg-white border-t border-slate-200 space-y-2 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700 w-36">Tổng điểm (thang 10):</span>
                  <span className="font-semibold text-slate-900">7.75</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700 w-36">Xếp loại chung:</span>
                  <span className="font-semibold text-slate-900">Khá</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700 w-36">Gợi ý kết luận:</span>
                  <span className="text-slate-800">Phù hợp – cân nhắc nhận / Mời phỏng vấn vòng 2</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700 w-36">Cảnh báo loại trừ:</span>
                  <span className="text-slate-500">Không có</span>
                </div>
              </div>
              <div className="pt-2">
                <span className="font-bold text-slate-800 block mb-1">
                  Tóm tắt nhận xét và đề xuất về ứng viên:
                </span>
                <textarea
                  rows={2}
                  readOnly
                  value="Ứng viên có kiến thức nền tảng tốt, tác phong nhanh nhẹn, hòa đồng, phù hợp yêu cầu vị trí NV Cảnh quan."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* ════ III. KẾT QUẢ SAU PHỎNG VẤN ════ */}
          <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
            <div className="bg-[#bc9b5d] text-white font-bold py-1.5 px-3 text-xs uppercase tracking-wider">
              III. KẾT QUẢ SAU PHỎNG VẤN
            </div>

            <div className="p-3.5 space-y-3.5 text-xs">
              {/* Checkbox các lựa chọn quyết định */}
              <div className="flex flex-wrap items-center gap-5 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={quyetDinh === "KY_HOP_DONG"}
                    onChange={() => setQuyetDinh("KY_HOP_DONG")}
                    className="w-4 h-4 text-blue-600 rounded-sm border-slate-300"
                  />
                  <span className="text-blue-900">KÝ HỢP ĐỒNG</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-600">
                  <input
                    type="checkbox"
                    checked={quyetDinh === "MOI_PV_LAN_2"}
                    onChange={() => setQuyetDinh("MOI_PV_LAN_2")}
                    className="w-4 h-4 text-blue-600 rounded-sm border-slate-300"
                  />
                  <span>MỜI PHỎNG VẤN LẦN 2</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-emerald-800">
                  <input
                    type="checkbox"
                    checked={quyetDinh === "LUU_HO_SO"}
                    onChange={() => setQuyetDinh("LUU_HO_SO")}
                    className="w-4 h-4 text-emerald-600 rounded-sm border-slate-300"
                  />
                  <span>LƯU HỒ SƠ DỰ PHÒNG</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-600">
                  <input
                    type="checkbox"
                    checked={quyetDinh === "CHO_XEM_XET"}
                    onChange={() => setQuyetDinh("CHO_XEM_XET")}
                    className="w-4 h-4 text-blue-600 rounded-sm border-slate-300"
                  />
                  <span>CHỜ XEM XÉT</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-red-600">
                  <input
                    type="checkbox"
                    checked={quyetDinh === "KHONG_TUYEN_DUNG"}
                    onChange={() => setQuyetDinh("KHONG_TUYEN_DUNG")}
                    className="w-4 h-4 text-red-600 rounded-sm border-slate-300"
                  />
                  <span>KHÔNG TUYỂN DỤNG</span>
                </label>
              </div>

              {/* Thông tin vị trí, thời gian hiệu lực, bậc lương, loại hợp đồng */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center border-t border-slate-100 pt-3">
                <div>
                  <span className="text-slate-600">Vị trí công việc: </span>
                  <strong className="text-slate-900">{data.position || "NV Cảnh quan"}</strong>
                </div>
                <div>
                  <span className="text-slate-600">Thời gian hiệu lực: Từ ngày </span>
                  <strong className="text-slate-900">11/23/2026</strong>
                </div>
                <div>
                  <span className="text-slate-600">Bậc lương: </span>
                  <strong className="text-slate-900">C.03.1</strong>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1 cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="loai_hd"
                      checked={loaiHd === "HD_THU_VIEC"}
                      onChange={() => setLoaiHd("HD_THU_VIEC")}
                    />
                    <span>HĐ Thử việc</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="loai_hd"
                      checked={loaiHd === "HD_CHINH_THUC"}
                      onChange={() => setLoaiHd("HD_CHINH_THUC")}
                    />
                    <span>HĐ Chính thức</span>
                  </label>
                </div>
              </div>

              {/* Thời hạn hợp đồng & Mức lương */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">Thời hạn hợp đồng:</span>
                  <button
                    type="button"
                    onClick={() => setThoiHanHd("1 tháng")}
                    className={`px-2 py-0.5 rounded-sm text-[11px] font-medium border ${
                      thoiHanHd === "1 tháng"
                        ? "bg-[#295679] text-white border-[#295679]"
                        : "bg-white text-slate-700 border-slate-300"
                    }`}
                  >
                    1 tháng
                  </button>
                  <button
                    type="button"
                    onClick={() => setThoiHanHd("2 tháng")}
                    className={`px-2 py-0.5 rounded-sm text-[11px] font-medium border ${
                      thoiHanHd === "2 tháng"
                        ? "bg-[#295679] text-white border-[#295679]"
                        : "bg-white text-slate-700 border-slate-300"
                    }`}
                  >
                    2 tháng
                  </button>
                </div>
                <div>
                  <span className="text-slate-600">Mức lương đề xuất: </span>
                  <strong className="text-slate-900">9.152.000</strong>
                </div>
                <div className="md:col-span-2">
                  <span className="text-slate-600">Điểm bài test: </span>
                  <span className="text-slate-400">—</span>
                </div>
              </div>

              {/* Điểm mạnh và rủi ro */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-slate-100 pt-2">
                <div>
                  <span className="text-slate-700 font-semibold block mb-1">
                    Điểm mạnh/cần cải thiện:
                  </span>
                  <textarea
                    rows={2}
                    readOnly
                    value="Thái độ cầu thị, ham học hỏi, kỹ năng giao tiếp tốt."
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 focus:outline-hidden"
                  />
                </div>
                <div>
                  <span className="text-slate-700 font-semibold block mb-1">
                    Rủi ro/lưu ý:
                  </span>
                  <textarea
                    rows={2}
                    readOnly
                    value="Cần bổ sung thêm thực hành các chi tiết phức tạp trong tháng thử việc đầu tiên."
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* ══ 4 Ô KÝ DUYỆT CẤP DƯỚI ĐÚNG THEO ẢNH ══ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-lg overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-slate-200 mt-2">
                {/* 1. NGƯỜI LẬP */}
                <div className="p-3 text-center bg-white flex flex-col justify-between min-h-[110px]">
                  <span className="font-bold text-[11px] text-slate-700 uppercase tracking-wider">
                    NGƯỜI LẬP
                  </span>
                  <div className="my-2">
                    <strong className="text-slate-900 text-xs block">
                      {data.interviewer_name || "Vũ Thanh Thuỷ"}
                    </strong>
                    <span className="text-[11px] text-slate-500">11/17/2026</span>
                  </div>
                </div>

                {/* 2. QUẢN LÝ KHỐI VP */}
                <div className="p-3 text-center bg-white flex flex-col justify-between min-h-[110px]">
                  <span className="font-bold text-[11px] text-slate-700 uppercase tracking-wider">
                    QUẢN LÝ KHỐI VP
                  </span>
                  <div className="my-2">
                    <strong className="text-slate-900 text-xs block">
                      {data.vp_approver_name || "Vũ Thanh Thuỷ"}
                    </strong>
                    <span className="text-[11px] text-slate-500">17/11/2026</span>
                  </div>
                </div>

                {/* 3. QUẢN LÝ PHÒNG BAN PHỤ TRÁCH */}
                <div className="p-3 text-center bg-[#fdfbf6] flex flex-col justify-between min-h-[110px]">
                  <span className="font-bold text-[11px] text-slate-700 uppercase tracking-wider">
                    QUẢN LÝ PHÒNG BAN PHỤ TRÁCH
                  </span>
                  <div className="my-2">
                    <strong className="text-slate-900 text-xs block">
                      {data.dept_approver_name || "Phạm Thị Thu Trang"}
                    </strong>
                    <span className="text-[11px] text-slate-500 block">17/11/2026</span>
                    <span className="text-[10px] text-slate-400">
                      Phụ trách: {data.candidate_department || "Phòng Cảnh Quan"}
                    </span>
                  </div>
                </div>

                {/* 4. PHÓ GIÁM ĐỐC KINH DOANH */}
                <div className="p-3 text-center bg-[#f2faf5] flex flex-col justify-between min-h-[110px]">
                  <span className="font-bold text-[11px] text-emerald-800 uppercase tracking-wider">
                    PHÓ GIÁM ĐỐC KINH DOANH
                  </span>
                  <div className="my-2">
                    <span className="text-xs text-slate-600 block mb-2 font-medium">
                      {data.pgd_approver_name ? data.pgd_approver_name : "Chờ duyệt"}
                    </span>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                      >
                        <IconCheck size={14} strokeWidth={2.5} />
                        <span>Duyệt</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-red-50 text-red-600 border border-red-300 rounded-md text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <IconX size={14} />
                        <span>Từ chối</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════ FOOTER CHỨC NĂNG ════ */}
        <div className="px-5 py-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {/* Nút in & xuất file bên trái */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <IconPrinter size={15} />
              <span>In phiếu</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <IconFileSpreadsheet size={15} />
              <span>Excel</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <IconFileText size={15} />
              <span>PDF</span>
            </button>
          </div>

          {/* Các nút hành động bên phải */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <IconFileSpreadsheet size={15} />
              <span>Nhập Excel</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              Đóng
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#406c89] hover:bg-[#345870] rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <IconEdit size={15} />
              <span>Sửa phiếu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
