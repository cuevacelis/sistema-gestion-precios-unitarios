import NavbarDashboard from "./_components/navbarDashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarDashboard />
      <section>{children}</section>
    </>
  );
}
