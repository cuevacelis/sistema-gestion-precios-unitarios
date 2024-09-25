import NavbarLoggedComponent from "@/components/navbar/navbar-logged/navbar-logged";

export default function AuthDashboardLayout({
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
