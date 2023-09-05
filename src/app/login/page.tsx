"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [value, setValue] = useState("");
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-black dark:text-stone-300 text-4xl text-center">
        SISTEMA DE GESTION DE PRECIOS UNITARIOS <br />
        (SGPU)
      </h1>

      <section className="flex flex-col pt-10">
        <div className="mb-5">
          <Input
            label="Correo"
            value={value}
            onValueChange={setValue}
            errorMessage="Please enter a valid email"
            validationState="invalid"
            className="w-64"
          />
        </div>
        <div className="mb-5">
          <Input
            label="Contraseña"
            value={value}
            onValueChange={setValue}
            errorMessage="Please enter a valid email"
            validationState="invalid"
            className="w-64"
          />
        </div>
        <Button
          color="default"
          variant="flat"
          className="mx-auto"
          onClick={() => router.push("/login")}
        >
          Iniciar Sesión
        </Button>
      </section>
    </main>
  );
}
