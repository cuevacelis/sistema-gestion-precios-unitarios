import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <main className="block p-4 lg:p-6">
      <h1 className="text-3xl text-center mb-10">
        SISTEMA DE GESTION DE PRECIOS UNITARIOS <br />
        (SGPU)
      </h1>
      <p className="text-lg text-foreground text-center">
        Bienvenido al sistema de gestión de precios unitarios (SGPU). Este
        sistema te permite gestionar los precios unitarios de tus proyectos de
        construcción. Puedes crear, editar y eliminar precios unitarios de tus
        proyectos. También puedes generar reportes de tus precios unitarios.
        ¡Comienza a gestionar tus precios unitarios ahora! 🚀
      </p>
    </main>
  );
}
