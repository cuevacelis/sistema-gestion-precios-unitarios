import NavbarLoggedComponent from "@/components/navbar/navbar-logged/navbar-logged";
import { GestionEstudiantesLoggedProvider } from "@/context/context-gestion-estudiantes-logged";
import { Suspense } from "react";
import Loading from "./loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GestionEstudiantesLoggedProvider>
      <Suspense fallback={<Loading />}>
        <NavbarLoggedComponent>{children}</NavbarLoggedComponent>
      </Suspense>
    </GestionEstudiantesLoggedProvider>
  );
}
