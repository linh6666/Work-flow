import type { Metadata } from "next";
import TongQuan from "../../../components/Administration/tabs/TongQuan";
import KhachHang from "../../../components/Administration/tabs/KhachHang";
import DeXuatBaoGia from "../../../components/Administration/tabs/DeXuatBaoGia";
import NhanSuDuAn from "../../../components/Administration/tabs/NhanSuDuAn";
import BaoGia from "../../../components/Administration/tabs/BaoGia";
import HopDong from "../../../components/Administration/tabs/HopDong";
import YeuCauSanXuat from "../../../components/Administration/tabs/YeuCauSanXuat";
import QuanTriUser from "../../../components/Administration/tabs/QuanTriUser";

export const metadata: Metadata = {
  title: "Quản lý công việc - WorkFlow",
  description: "Bảng quản lý công việc (Kanban Board) và các phân hệ quản lý dự án.",
};

export default async function AdministrationTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const resolvedParams = await params;
  const tab = resolvedParams.tab;

  switch (tab) {
    case 'tong-quan':
    case 'quan-ly-du-an':
      return <TongQuan />;
    case 'khach-hang':
      return <KhachHang />;
    case 'de-xuat-bao-gia':
      return <DeXuatBaoGia />;
    case 'nhan-su-du-an':
      return <NhanSuDuAn />;
    case 'bao-gia':
      return <BaoGia />;
    case 'hop-dong':
      return <HopDong />;
    case 'yeu-cau-san-xuat':
      return <YeuCauSanXuat />;
    case 'quan-tri-user':
      return <QuanTriUser />;
    default:
      return <TongQuan />;
  }
}
