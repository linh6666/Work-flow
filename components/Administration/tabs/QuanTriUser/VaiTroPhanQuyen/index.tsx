import React from 'react';

export default function VaiTroPhanQuyen() {
  return (
    <div className="space-y-6 text-left">
      {/* Roles Description Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
        <div className="bg-white border-t-4 border-t-red-500 border border-slate-200/50 rounded-xl p-4 shadow-2xs">
          <h4 className="font-bold text-slate-800 text-sm">Superadmin</h4>
          <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
            Toàn quyền kiểm soát hệ thống, cấu hình cơ sở dữ liệu và quản trị tất cả tài khoản người dùng.
          </p>
        </div>
        <div className="bg-white border-t-4 border-t-blue-500 border border-slate-200/50 rounded-xl p-4 shadow-2xs">
          <h4 className="font-bold text-slate-800 text-sm">Admin</h4>
          <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
            Quản trị và cấu hình danh mục dữ liệu, xem và sửa đổi thông tin người dùng cấp dưới.
          </p>
        </div>
        <div className="bg-white border-t-4 border-t-amber-500 border border-slate-200/50 rounded-xl p-4 shadow-2xs">
          <h4 className="font-bold text-slate-800 text-sm">Quản lý Kinh doanh</h4>
          <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
            Quản lý và phê duyệt đề xuất báo giá, báo giá, hợp đồng. Xem tổng quan các dự án.
          </p>
        </div>
        <div className="bg-white border-t-4 border-t-slate-400 border border-slate-200/50 rounded-xl p-4 shadow-2xs">
          <h4 className="font-bold text-slate-800 text-sm">Nhân viên</h4>
          <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
            Thực hiện soạn thảo đề xuất, báo giá và cập nhật tiến độ công việc được giao.
          </p>
        </div>
      </div>

      {/* Permission Matrix Card */}
      <div className="bg-white border border-slate-200/50 rounded-xl shadow-xs overflow-hidden flex flex-col animate-fade-in">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-800 text-xs">Ma trận Phân quyền các phân hệ</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/60 text-slate-400 font-bold select-none uppercase tracking-wide">
                <th className="p-3.5">Phân hệ chức năng</th>
                <th className="p-3.5">Superadmin</th>
                <th className="p-3.5">Admin</th>
                <th className="p-3.5">Quản lý Kinh doanh</th>
                <th className="p-3.5">Nhân viên</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3.5 font-bold text-slate-800">Quản lý Khách hàng (CRM)</td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-100">Toàn quyền</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-100">Toàn quyền</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">Xem & Sửa</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">Xem & Soạn</span></td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-800">Đề xuất & Báo giá</td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-100">Toàn quyền</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-100">Toàn quyền</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100">Xem & Duyệt</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">Xem & Soạn</span></td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-800">Báo giá & Hợp đồng</td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-100">Toàn quyền</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-100">Toàn quyền</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100">Xem & Duyệt</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">Xem & Soạn</span></td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-800">Yêu cầu Sản xuất</td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-100">Toàn quyền</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-100">Toàn quyền</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100">Xem & Duyệt</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">Chỉ xem</span></td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-800">Quản lý Dự án</td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-100">Toàn quyền</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-100">Toàn quyền</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">Xem & Sửa</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">Chỉ xem</span></td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-800">Quản trị người dùng</td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-100">Toàn quyền</span></td>
                <td className="p-3.5"><span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">Xem & Sửa</span></td>
                <td className="p-3.5"><span className="text-slate-350 italic">Không có quyền</span></td>
                <td className="p-3.5"><span className="text-slate-350 italic">Không có quyền</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
