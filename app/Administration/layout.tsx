import AdministrationLayout from "../../components/Administration/Layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdministrationLayout>
      {children}
    </AdministrationLayout>
  );
}
