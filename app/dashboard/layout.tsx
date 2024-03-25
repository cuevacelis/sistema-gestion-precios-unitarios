import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full grid grid-cols-12 h-[calc(100vh-65px)]">
      <ul className="hidden lg:flex lg:flex-col lg:col-span-2 list-decimal pl-10 pt-4 gap-y-4 border-r-1 border-gray-300 dark:border-gray-800">
        <li>
          <Link href={"/dashboard/proyectos"}>Proyectos</Link>
        </li>
        <li>
          <Link href={"/dashboard/presupuestos"}>Presupuestos</Link>
        </li>
        <li>
          <Link href={"/dashboard/sub-presupuestos"}>SubPresupuestos</Link>
        </li>
        <li>
          <Link href={"/dashboard/clientes"}>Clientes</Link>
        </li>
        <li>
          <Link href={"/dashboard/partidas"}>Partidas</Link>
        </li>
        <li>
          <Link href={"/dashboard/recursos"}>Recursos</Link>
        </li>
        <li>
          <Link href={"/dashboard/usuarios"}>Usuarios</Link>
        </li>
      </ul>
      <div className="block col-span-12 lg:col-span-10">{children}</div>
    </main>
  );
}
