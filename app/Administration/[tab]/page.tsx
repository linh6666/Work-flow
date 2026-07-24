import type { Metadata } from "next";
import TongQuan from "../../../components/Administration/tabs/TongQuan";
import KhachHang from "../../../components/Administration/tabs/KhachHang";
import DeXuatBaoGia from "../../../components/Administration/tabs/DeXuatBaoGia";
import NhanSuDuAn from "../../../components/Administration/tabs/NhanSuDuAn";
import QuanLyNhanSu from "../../../components/Administration/tabs/QuanLyNhanSu";
import BaoGia from "../../../components/Administration/tabs/BaoGia";
import HopDong from "../../../components/Administration/tabs/HopDong";
import YeuCauSanXuat from "../../../components/Administration/tabs/YeuCauSanXuat";
import QuanTriUser from "../../../components/Administration/tabs/QuanTriUser";
import QuanLyDuAn from "../../../components/Administration/tabs/QuanLyDuAn";
import TongQuatDuAn from "../../../components/Administration/tabs/TongQuatDuAn";
import BaoCaoTongThe from "../../../components/Administration/tabs/BaoCaoTongThe";
import MaTranPhanQuyen from "../../../components/Administration/tabs/MaTranPhanQuyen";

export const metadata: Metadata = {
  title: "Quản lý công việc - WorkFlow",
  description: "Bảng quản lý công việc (Kanban Board) và các phân hệ quản lý dự án.",
};

export default async function AdministrationTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const resolvedParams = await params;
  const tab = resolvedParams.tab;

  switch (tab) {
    case 'tong-quan':
      return <TongQuan />;
    case 'quan-ly-du-an':
      return <QuanLyDuAn />;
    case 'tong-quat-du-an':
      return <TongQuatDuAn />;
    case 'khach-hang':
      return <KhachHang />;
    case 'de-xuat-bao-gia':
      return <DeXuatBaoGia />;
    case 'quan-ly-nhan-su':
    case 'nhan-su-du-an':
      return <QuanLyNhanSu />;
    case 'bao-gia':
      return <BaoGia />;
    case 'hop-dong':
      return <HopDong />;
    case 'yeu-cau-san-xuat':
      return <YeuCauSanXuat />;
    case 'quan-tri-user':
      return <QuanTriUser />;
    case 'ma-tran-phan-quyen':
      return <MaTranPhanQuyen />;
    case 'bao-cao-tong-the':
      return <BaoCaoTongThe />;
    default:
      return <TongQuan />;
  }
}
