"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useFormState } from "react-dom";
import create from "../_actionsCreate";

export default function FormCreateComponent() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create as any, initialState);

  return (
    <form action={dispatch}>
      <section className="flex flex-col gap-4">
        <Input
          id="usu_NomApellidos"
          name="usu_NomApellidos"
          type="text"
          placeholder="Ingresa el dato"
          aria-describedby="amount-error"
        />

        <Input
          id="pre_Nombre"
          name="pre_Nombre"
          type="text"
          placeholder="Ingresa el dato"
          aria-describedby="amount-error"
        />

        <Input
          id="cli_NomApeRazSocial"
          name="cli_NomApeRazSocial"
          type="text"
          placeholder="Ingresa el dato"
          aria-describedby="amount-error"
        />

        <Input
          id="ubi_Departamento"
          name="ubi_Departamento"
          type="text"
          placeholder="Ingresa el dato"
          aria-describedby="amount-error"
        />

        <Input
          id="ubi_Provincia"
          name="ubi_Provincia"
          type="text"
          placeholder="Ingresa el dato"
          aria-describedby="amount-error"
        />

        <Input
          id="ubi_Distrito"
          name="ubi_Distrito"
          type="text"
          placeholder="Ingresa el dato"
          aria-describedby="amount-error"
        />
        <Input
          id="pre_Jornal"
          name="pre_Jornal"
          type="text"
          placeholder="Ingresa el dato"
          aria-describedby="amount-error"
        />
      </section>

      <div aria-live="polite" aria-atomic="true">
        {state.message ? (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        ) : null}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/presupuestos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear presupuesto</Button>
      </div>
    </form>
  );
}
