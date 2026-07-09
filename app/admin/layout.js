import AdminShell from "./AdminShell";

export const metadata = {
  title: "Panel de campaña · Juan José Peña",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
