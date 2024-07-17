import NavbarLoggedComponent from "@/components/navbar/navbar-logged/navbar-logged";
import { GestionEstudiantesLoggedProvider } from "@/context/context-gestion-estudiantes-logged";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GestionEstudiantesLoggedProvider>
      <NavbarLoggedComponent>{children}</NavbarLoggedComponent>
    </GestionEstudiantesLoggedProvider>
  );
}
