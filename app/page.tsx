import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-black dark:text-stone-300 text-4xl text-center">
        SISTEMA DE GESTION DE PRECIOS UNITARIOS <br />
        (SGPU)
      </h1>
      <span className="text-black dark:text-[#EDEDED] text-base opacity-50 mt-5">
        Por medio de este sistema se podra generar cotizaciones
      </span>

      <section className="flex gap-x-4 pt-10">
        <Link
          href="/login"
          className="rounded-lg bg-black text-[#EDEDED] px-4 py-2 hover:opacity-90 dark:bg-[#EDEDED] dark:text-black"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/register"
          className="rounded-lg border border-slate-300 text-black px-4 py-2 hover:bg-slate-100 dark:border-stone-700 dark:text-[#EDEDED] dark:hover:bg-gray-950 dark:hover:border-stone-400"
        >
          Regístrate
        </Link>
      </section>
    </main>
  );
}
