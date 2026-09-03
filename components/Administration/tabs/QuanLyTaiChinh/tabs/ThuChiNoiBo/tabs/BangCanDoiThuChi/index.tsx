"use client";

import React from 'react';

export interface CategoryItem {
  name: string;
  acc?: string;
  dk?: string;
}

export interface CategoryGroup {
  groupName: string;
  items: CategoryItem[];
}

const TABLE_GROUPS: CategoryGroup[] = [
  {
    groupName: 'Bảng lương',
    items: [
      { name: 'Lương cứng', dk: '11' },
      { name: 'Lương kinh doanh (Lương mềm)', dk: '14' },
      { name: 'Phụ cấp ăn trưa', dk: '12' },
      { name: 'Trợ cấp xăng xe +dien thoai', dk: '19' },
      { name: 'Bảo hiểm y tế - XH- that nghiep', dk: '13' },
      { name: 'Lương làm thêm giờ', dk: '8' },
      { name: 'Thưởng Kết quả Kinh doanh cuối năm', dk: '15' },
      { name: 'Trợ cấp thai sản', dk: '9' },
      { name: 'Thưởng lễ tết và các thưởng khác', dk: '16' },
      { name: 'Trợ cấp nghề', dk: '18' },
    ],
  },
  {
    groupName: 'Tuyển dụng và đào tạo',
    items: [
      { name: 'Tuyển dụng NV', dk: '21' },
      { name: 'Đào tạo NV - Trong nước', dk: '22' },
      { name: 'Đào tạo NV - Nước ngoài', dk: '23' },
    ],
  },
  {
    groupName: 'Sử dụng các NVL khác có mức kiểm soát',
    items: [
      { name: 'Xăng/ Dầu', dk: '31' },
      { name: 'Các chi phí vật liệu phụ khác', dk: '32' },
      { name: 'Chi phí đóng gói hàng hoá', dk: '33' },
      { name: 'Lưu kho bãi', dk: '34' },
      { name: 'Chi phí khác', dk: '35' },
    ],
  },
  {
    groupName: 'Nguyên vật liệu mua mới',
    items: [
      { name: 'Sơn', dk: '41' },
      { name: 'Mica', dk: '42' },
      { name: 'Giấy', dk: '43' },
      { name: 'Formech', dk: '44' },
      { name: 'Đồ điện', dk: '45' },
      { name: 'Công nghệ', dk: '451' },
      { name: 'Kính', dk: '46' },
      { name: 'Gỗ', dk: '47' },
      { name: 'Bánh xe', dk: '471' },
      { name: 'Laminate- đá', dk: '472' },
      { name: 'Phay gỗ', dk: '473' },
      { name: 'Sắt', dk: '48' },
      { name: 'Các chất phụ gia', dk: '49' },
      { name: 'Vật liệu kết dính', dk: '410' },
      { name: 'Chi phí làm cây', dk: '411' },
      { name: 'Các loại vật liệu phụ khác', dk: '412' },
      { name: 'Chi phí mua hàng trung quốc', dk: '413' },
      { name: 'Chi phí mua hàng Preiser, Busch- Đức', dk: '414' },
      { name: 'Chi phí mua hàng UHU- Đức', dk: '415' },
    ],
  },
  {
    groupName: 'Công cụ dụng cụ',
    items: [
      { name: 'Mua mới công cụ', dk: '51' },
      { name: 'Mua mới máy móc các loại', dk: '52' },
      { name: 'Chi phí mua mới khác (bu long, ocvit, ...)', dk: '53' },
      { name: 'Chi phí mua hàng Proxxon', dk: '54' },
    ],
  },
  {
    groupName: 'Chi phí văn phòng',
    items: [
      { name: 'Sách và ấn phẩm', dk: '61' },
      { name: 'In ấn và photocopy', dk: '62' },
      { name: 'Văn phòng phẩm', dk: '63' },
      { name: 'Nhãn hiệu sản phẩm', dk: '64' },
      { name: 'Các chi phí văn phòng khác', dk: '65' },
      { name: 'Chi phí mua đồ văn phòng máy tính, bàn ghế, ...', dk: '66' },
    ],
  },
  {
    groupName: 'Thuế, phí và phụ phí',
    items: [
      { name: 'Thuế kinh doanh (Doanh thu)', dk: '71' },
      { name: 'Chi phí quản lý hành chính (Thuế môn bài)', dk: '72' },
      { name: 'Thuế nhập khẩu', dk: '73' },
      { name: 'Thuế VAT đầu vào không khấu trừ được', dk: '74' },
      { name: 'Các khoản thuế và phí khác', dk: '75' },
      { name: 'Phí hoá đơn', dk: '76' },
      { name: 'Nộp phạt thuế', dk: '77' },
      { name: 'Thuế TNCN', dk: '78' },
    ],
  },
  {
    groupName: 'Vận chuyển hàng hoá',
    items: [
      { name: 'Chi phí vận chuyển hàng hoá nội địa', dk: '81' },
      { name: 'Chi phí vận chuyển hàng hoá nước ngoài', dk: '82' },
      { name: 'Các loại phí khác', dk: '83' },
    ],
  },
  {
    groupName: 'Phí cho các nhà dịch vụ chuyên nghiệp',
    items: [
      { name: 'Phí kiểm toán', dk: '91' },
      { name: 'Các phí tư vấn hợp pháp', dk: '92' },
      { name: 'Phí ngân hàng', dk: '93' },
      { name: 'Phí mở L/C', dk: '94' },
      { name: 'Chi phí xin giấy phép hoặc nhãn hiệu bản quyền', dk: '95' },
      { name: 'Phí nghiên cứu và thăm dò dư luận', dk: '96' },
      { name: 'Phí bảo hiểm (bao hiem xe o to)', dk: '97' },
      { name: 'Phí kiểm tra chất lượng dịch vụ', dk: '98' },
      { name: 'Các loại phí khác (bồi dưỡng quản lý thuế, và các bên khác)', dk: '99' },
    ],
  },
  {
    groupName: 'Truyền thông',
    items: [
      { name: 'Điện thoại', dk: '111' },
      { name: 'Chuyển phát nhanh (Buu pham, buu kien, mo hinh)', dk: '112' },
      { name: 'Các phí truyền thông khác (cuoc truyen hinh cap)', dk: '113' },
    ],
  },
  {
    groupName: 'Dịch vụ công cộng và thuê ngoài',
    items: [
      { name: 'Điện', dk: '121' },
      { name: 'Nước', dk: '122' },
      { name: 'Chi phí thuê văn phòng', dk: '123' },
      { name: 'Các loại thuế khác', dk: '124' },
      { name: 'Phí thuê dịch vụ làm mô hình bên ngoài', dk: '17' },
      { name: 'Dịch vụ bảo vệ', dk: '125' },
      { name: 'Trật tự và Môi trường', dk: '126' },
      { name: 'Các chi phí dịch vụ công cộng khác', dk: '127' },
    ],
  },
  {
    groupName: 'Quyền lợi của Nhân viên và các Ưu đãi',
    items: [
      { name: 'Hồi sức đội ngũ NV (nghỉ mát)', dk: '131' },
      { name: 'Ăn tối', dk: '132' },
      { name: 'Đồng phục', dk: '133' },
      { name: 'Tiệc chiêu đãi, chúc mừng, quà tặng nhân viên Tết', dk: '134' },
      { name: 'Sinh nhật', dk: '1341' },
      { name: 'Thuốc và dịch vụ y tế', dk: '135' },
      { name: 'dịch vụ vệ sinh công cộng', dk: '136' },
      { name: 'Các chi phí khác (Mua đồ lễ cúng 1,15 hàng tháng).', dk: '137' },
    ],
  },
  {
    groupName: 'Chi phí đi lại - Trong nước',
    items: [
      { name: 'Chi phí ở - Trong nước', dk: '141' },
      { name: 'Chi phí ăn', dk: '142' },
      { name: 'Vé máy bay - Trong nước', dk: '143' },
      { name: 'Phương tiện đi lại & Taxi - Trong nước (Vạn Xuân & Taxi công tác)', dk: '144' },
      { name: 'Các phụ phí đi lại - Trong nước', dk: '145' },
    ],
  },
  {
    groupName: 'Chi phí đi lại - Nước ngoài',
    items: [
      { name: 'Chi phí ở - Nước ngoài', dk: '151' },
      { name: 'Vé máy bay - Nước ngoài', dk: '152' },
      { name: 'Phương tiện đi lại & Taxi - Nước ngoài', dk: '153' },
      { name: 'Các phụ phí đi lại - Nước ngoài', dk: '154' },
      { name: 'Phí làm visa và liên quan', dk: '155' },
      { name: 'Các chi phí đi lại khác - Nước ngoài', dk: '156' },
    ],
  },
  {
    groupName: 'Bán hàng và Marketing',
    items: [
      { name: 'Chi phí quảng cáo', dk: '161' },
      { name: 'In ấn tờ rơi và catalogue', dk: '162' },
      { name: 'Chi phí Quảng cáo Website & google ranking (Theo kế hoạch NS)', dk: '163' },
      { name: 'Chi phí khuyến mãi', dk: '164' },
      { name: 'Hỗ trợ đại lý hoạt động', dk: '165' },
      { name: 'Các sự kiện / Dự án', dk: '166' },
      { name: 'Tiếp khách', dk: '167' },
      { name: 'Đào tạo khách hàng', dk: '168' },
      { name: 'Chi phí bảo hành', dk: '169' },
      { name: 'Chi phí triển lãm, trưng bày', dk: '1610' },
    ],
  },
  {
    groupName: 'Sửa chữa và bảo trì',
    items: [
      { name: 'Sửa chữa và bảo trì - Nhà xưởng và văn phòng (sua chua nha cua)', dk: '171' },
      { name: 'Sửa chữa và bảo trì - Máy móc và thiết bị văn phòng (may tinh, ...)', dk: '172' },
      { name: 'Sửa chữa và bảo trì - Phương tiện vận chuyển', dk: '173' },
      { name: 'Sửa chữa và bảo trì - Thiết bị văn phòng & Đồ nội thất (camera)', dk: '174' },
      { name: 'Sửa chữa và bảo trì - Máy cắt Laser và máy in 3D', dk: '175' },
    ],
  },
  {
    groupName: 'Phải trả người bán',
    items: [
      { name: 'Phải trả cho Người bán', dk: '181' },
    ],
  },
  {
    groupName: 'Chi phí',
    items: [
      { name: 'Đóng góp công ích & từ thiện', dk: '191' },
      { name: 'Giải trí - thuê sân bóng', dk: '192' },
      { name: 'Chi phí - ốm đau, cưới hỏi', dk: '193' },
      { name: 'Bảo hiểm chi trả (thai sản, ốm đau)', dk: '197' },
      { name: 'Mua tài sản cố định (Trả tiền lãi & gốc Mua ô tô HSBC)', dk: '194' },
      { name: 'Bảo hiểm xe ô tô', dk: '195' },
      { name: 'Quỹ dự phòng', dk: '196' },
    ],
  },
  {
    groupName: 'Cân đối',
    items: [
      { name: 'Bảng lương', acc: '6271' },
      { name: 'Thưởng Kết quả Kinh doanh', dk: '15' },
      { name: 'Tuyển dụng và đào tạo', acc: '6271' },
      { name: 'Sử dụng các NVL khác có mức kiểm soát', acc: '6272' },
      { name: 'Formex - decan', dk: '44' },
      { name: 'Đồ điện- hệ thống ánh sáng Mh', dk: '45' },
      { name: 'Laminate - đá', dk: '472' },
      { name: 'Công cụ dụng cụ', acc: '6273' },
      { name: 'Chi phí mua mới khác (bu long, ocvit, ...) bánh xe', dk: '53' },
      { name: 'Chi phí văn phòng', acc: '6273' },
      { name: 'Thuế, phí và phụ phí', acc: '6275' },
      { name: 'Đầu vào GTGT', dk: '76' },
      { name: 'Vận chuyển hàng hoá', acc: '6277' },
      { name: 'Phí cho các nhà dịch vụ chuyên nghiệp', acc: '6277' },
      { name: 'Các phí tư vấn hợp pháp-công chứng', dk: '92' },
      { name: 'Chi phí xin giấy phép hoặc nhãn hiệu bản quyền - phí duy trì thầu qua mạng', dk: '95' },
      { name: 'Lãi vay ngân hàng', dk: '96' },
      { name: 'Phí bảo hiểm', dk: '97' },
      { name: 'Chi phí quản lý bên Úc', dk: '100' },
      { name: 'Truyền thông', acc: '6277' },
      { name: 'Các phí truyền thông khác (cáp mạng)', dk: '113' },
      { name: 'Dịch vụ công cộng và thuê ngoài', acc: '6277' },
      { name: 'Quyền lợi của Nhân viên và các Ưu đãi', acc: '6278' },
      { name: 'Chi phí đi lại - Trong nước', acc: '6278' },
      { name: 'Các phụ phí đi công tác khác', dk: '145' },
      { name: 'Chi phí đi lại - Nước ngoài', acc: '6278' },
      { name: 'Bán hàng và Marketing', acc: '6278' },
      { name: 'Chi phí triển lãm, trưng bày-quà tặng KH', dk: '1610' },
      { name: 'Sửa chữa và bảo trì', acc: '6278' },
      { name: 'Sửa chữa và bảo trì - Máy cắt Laser và máy in 3D, máy công cụ', dk: '175' },
      { name: 'Phải trả người bán', acc: '0' },
      { name: 'Chi phí', acc: '6278' },
      { name: 'Mua tài sản cố định (Trả tiền lãi & gốc Mua ô tô )', dk: '194' },
    ],
  },
];

export default function BangCanDoiThuChiTab() {
  const namFilter = '2026';
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-3 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-0.5">
      {/* Overview Stat Cards matching image */}
      <div className="grid grid-cols-3 gap-3 shrink-0">
        {/* Tồn đầu kỳ */}
        <div className="bg-[#fefce8] border border-[#fef08a] rounded-xl px-4 py-3 shadow-2xs">
          <p className="text-[11px] font-semibold text-[#854d0e] mb-1.5">
            Tồn đầu kỳ ({namFilter})
          </p>
          <p className="text-lg font-bold text-[#713f12]">
            0 <span className="underline decoration-1 underline-offset-2 font-semibold">đ</span>
          </p>
        </div>

        {/* Thu – Chi trong năm */}
        <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl px-4 py-3 shadow-2xs">
          <p className="text-[11px] font-semibold text-[#1e40af] mb-1.5">
            Thu – Chi trong năm
          </p>
          <p className="text-lg font-bold text-[#1e3a8a]">
            0 <span className="underline decoration-1 underline-offset-2 font-semibold">đ</span>
          </p>
        </div>

        {/* Tồn cuối kỳ */}
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3 shadow-2xs">
          <p className="text-[11px] font-semibold text-[#15803d] mb-1.5">
            Tồn cuối kỳ
          </p>
          <p className="text-lg font-bold text-[#14532d]">
            0 <span className="underline decoration-1 underline-offset-2 font-semibold">đ</span>
          </p>
        </div>
      </div>

      {/* Main Table: Bảng Chi Phí / Cân Đối Chi Tiết */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs overflow-hidden flex flex-col flex-1 min-h-0">
        <div className="overflow-x-auto flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200/80">
              <tr className="text-[11px] font-bold text-slate-500">
                <th className="py-2.5 px-4 min-w-[260px] text-slate-700">Nội dung / Định khoản</th>
                <th className="py-2.5 px-2 text-center w-12 text-slate-400 font-semibold">Acc</th>
                <th className="py-2.5 px-2 text-center w-12 text-slate-400 font-semibold">ĐK</th>
                {months.map((m) => (
                  <th key={m} className="py-2.5 px-2 text-center w-12 text-slate-400 font-semibold">
                    {m}
                  </th>
                ))}
                <th className="py-2.5 px-3 text-right w-24 text-slate-600 font-bold">Tổng cộng</th>
                <th className="py-2.5 px-3 text-right w-16 text-slate-600 font-bold">Tỷ lệ</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {TABLE_GROUPS.map((group, gIdx) => (
                <React.Fragment key={gIdx}>
                  {/* Category Group Header Row */}
                  <tr className="bg-slate-50/60 font-bold text-slate-800 text-[11px]">
                    <td className="py-2 px-4 text-slate-900 font-bold">{group.groupName}</td>
                    <td className="py-2 px-2 text-center text-slate-400">—</td>
                    <td className="py-2 px-2 text-center text-slate-400">—</td>
                    {months.map((m) => (
                      <td key={m} className="py-2 px-2 text-center text-slate-400">
                        —
                      </td>
                    ))}
                    <td className="py-2 px-3 text-right text-slate-400">—</td>
                    <td className="py-2 px-3 text-right text-slate-500 font-semibold">0.0%</td>
                  </tr>

                  {/* Category Items Rows */}
                  {group.items.map((item, iIdx) => (
                    <tr key={iIdx} className="hover:bg-slate-50/80 transition-colors border-b border-slate-100/60">
                      <td className="py-2 px-4 pl-7 text-slate-700 text-[11.5px] font-normal">
                        {item.name}
                      </td>
                      <td className="py-2 px-2 text-center text-slate-500 text-[11px] font-mono">
                        {item.acc || '—'}
                      </td>
                      <td className="py-2 px-2 text-center text-slate-500 text-[11px] font-mono">
                        {item.dk || '—'}
                      </td>
                      {months.map((m) => (
                        <td key={m} className="py-2 px-2 text-center text-slate-400 text-[11px]">
                          —
                        </td>
                      ))}
                      <td className="py-2 px-3 text-right text-slate-400 text-[11px]">—</td>
                      <td className="py-2 px-3 text-right text-slate-500 text-[11px] font-medium">0.0%</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}

              {/* Summary Footer Row */}
              <tr className="bg-[#eef2ff] border-t-2 border-indigo-100 font-extrabold text-indigo-950 text-xs">
                <td className="py-3 px-4 font-extrabold uppercase tracking-wider text-indigo-900">TỔNG CỘNG</td>
                <td className="py-3 px-2 text-center text-indigo-400">—</td>
                <td className="py-3 px-2 text-center text-indigo-400">—</td>
                {months.map((m) => (
                  <td key={m} className="py-3 px-2 text-center text-indigo-400">
                    —
                  </td>
                ))}
                <td className="py-3 px-3 text-right text-indigo-900 font-bold">0</td>
                <td className="py-3 px-3 text-right text-indigo-950 font-extrabold">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
