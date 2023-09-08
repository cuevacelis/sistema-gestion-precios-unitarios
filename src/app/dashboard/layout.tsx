import MenuLateral from "./_components/menuLateral";
import NavbarDashboard from "./_components/navbarDashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarDashboard />
      <MenuLateral>{children}</MenuLateral>
    </>
  );
}
