import Link from "next/link";

export default function MenuLateralComponent(props: {
  children: React.ReactNode;
}) {
  return (
    <section className="menu-lateral flex flex-row h-[calc(100vh-65px)]">
      <ul className="hidden sm:flex flex-col w-44 h-full px-4 gap-y-4 pt-4 border-r-1 border-gray-300 dark:border-gray-800">
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
      <>{props.children}</>
    </section>
  );
}
