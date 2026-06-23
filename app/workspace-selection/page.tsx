import type { Metadata } from "next";
import PageWorkspaceSelection from "../../components/WorkspaceSelection";
export const metadata: Metadata = {
  title: "Quản lý quy trình công việc",
  description: "Trang lựa chọn công việc cho hệ thống",
};

export default function WorkspaceSelectionPage() {
  return (
   <>
    <PageWorkspaceSelection />
   </>
  );
}