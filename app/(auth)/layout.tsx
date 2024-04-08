import NavbarLoggedComponent from "@/components/navbar/navbar-logged/navbar-logged";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarLoggedComponent>{children}</NavbarLoggedComponent>
    </>
  );
}
