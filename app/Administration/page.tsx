import type { Metadata } from "next";
import PageAdministration from "../../components/Administration";

export const metadata: Metadata = {
  title: "Quản lý công việc - WorkFlow",
  description: "Bảng quản lý công việc (Kanban Board) và các phân hệ quản lý dự án.",
};

export default function AdministrationPage() {
  return (
    <>
      <PageAdministration />
    </>
  );
}
