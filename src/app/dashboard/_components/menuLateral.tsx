import Link from "next/link";

export default function MenuLateral(props: any) {
  return (
    <section className="menu-lateral flex flex-row gap-x-4 h-[calc(100vh-65px)]">
      <ul className="hidden sm:flex flex-col w-40 h-full px-4 gap-y-4 pt-4 ">
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
      <main className="contenido-principal overflow-y-auto">
        {props.children}
        <p>
          fefefefwefwef dqwdqw qwdq wdqw dqwdqwdqwd qwdq wdq dq wdqwd qwdq wdq
          qwdq wd qwd qdq wdq sdqwdwdqdededq qdqdqdqd qd q dqdqwdqd e dqeqfeqdq
          qdqdqdq dq
        </p>
        <p>
          fefefefwefwef dqwdqw qwdq wdqw dqwdqwdqwd qwdq wdq dq wdqwd qwdq wdq
          qwdq wd qwd qdq wdq sdqwdwdqdededq qdqdqdqd qd q dqdqwdqd e dqeqfeqdq
          qdqdqdq dq
        </p>
        <p>
          fefefefwefwef dqwdqw qwdq wdqw dqwdqwdqwd qwdq wdq dq wdqwd qwdq wdq
          qwdq wd qwd qdq wdq sdqwdwdqdededq qdqdqdqd qd q dqdqwdqd e dqeqfeqdq
          qdqdqdq dq
        </p>
        <p>
          fefefefwefwef dqwdqw qwdq wdqw dqwdqwdqwd qwdq wdq dq wdqwd qwdq wdq
          qwdq wd qwd qdq wdq sdqwdwdqdededq qdqdqdqd qd q dqdqwdqd e dqeqfeqdq
          qdqdqdq dq
        </p>
        <p>
          fefefefwefwef dqwdqw qwdq wdqw dqwdqwdqwd qwdq wdq dq wdqwd qwdq wdq
          qwdq wd qwd qdq wdq sdqwdwdqdededq qdqdqdqd qd q dqdqwdqd e dqeqfeqdq
          qdqdqdq dq
        </p>
        <p>
          fefefefwefwef dqwdqw qwdq wdqw dqwdqwdqwd qwdq wdq dq wdqwd qwdq wdq
          qwdq wd qwd qdq wdq sdqwdwdqdededq qdqdqdqd qd q dqdqwdqd e dqeqfeqdq
          qdqdqdq dq
        </p>
        <p>
          fefefefwefwef dqwdqw qwdq wdqw dqwdqwdqwd qwdq wdq dq wdqwd qwdq wdq
          qwdq wd qwd qdq wdq sdqwdwdqdededq qdqdqdqd qd q dqdqwdqd e dqeqfeqdq
          qdqdqdq dq
        </p>
        <p>
          fefefefwefwef dqwdqw qwdq wdqw dqwdqwdqwd qwdq wdq dq wdqwd qwdq wdq
          qwdq wd qwd qdq wdq sdqwdwdqdededq qdqdqdqd qd q dqdqwdqd e dqeqfeqdq
          qdqdqdq dq
        </p>
        <p>
          fefefefwefwef dqwdqw qwdq wdqw dqwdqwdqwd qwdq wdq dq wdqwd qwdq wdq
          qwdq wd qwd qdq wdq sdqwdwdqdededq qdqdqdqd qd q dqdqwdqd e dqeqfeqdq
          qdqdqdq dq
        </p>
        <p>
          fefefefwefwef dqwdqw qwdq wdqw dqwdqwdqwd qwdq wdq dq wdqwd qwdq wdq
          qwdq wd qwd qdq wdq sdqwdwdqdededq qdqdqdqd qd q dqdqwdqd e dqeqfeqdq
          qdqdqdq dq
        </p>
        <p>
          fefefefwefwef dqwdqw qwdq wdqw dqwdqwdqwd qwdq wdq dq wdqwd qwdq wdq
          qwdq wd qwd qdq wdq sdqwdwdqdededq qdqdqdqd qd q dqdqwdqd e dqeqfeqdq
          qdqdqdq dq
        </p>
        <p>
          fefefefwefwef dqwdqw qwdq wdqw dqwdqwdqwd qwdq wdq dq wdqwd qwdq wdq
          qwdq wd qwd qdq wdq sdqwdwdqdededq qdqdqdqd qd q dqdqwdqd e dqeqfeqdq
          qdqdqdq dq
        </p>
        <p>
          fefefefwefwef dqwdqw qwdq wdqw dqwdqwdqwd qwdq wdq dq wdqwd qwdq wdq
          qwdq wd qwd qdq wdq sdqwdwdqdededq qdqdqdqd qd q dqdqwdqd e dqeqfeqdq
          qdqdqdq dq
        </p>
      </main>
    </section>
  );
}
