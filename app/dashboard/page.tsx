import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <main>
      <h1 className="text-black dark:text-stone-300 text-4xl text-center mb-10">
        SISTEMA DE GESTION DE PRECIOS UNITARIOS <br />
        (SGPU)
      </h1>
    </main>
  );
}
