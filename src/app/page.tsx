"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
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
        <Button
          color="primary"
          variant="flat"
          onClick={() => router.push("/login")}
        >
          Iniciar Sesión
        </Button>
        <Button
          color="primary"
          variant="faded"
          onClick={() => router.push("/register")}
        >
          Registrate
        </Button>
      </section>
    </main>
  );
}
