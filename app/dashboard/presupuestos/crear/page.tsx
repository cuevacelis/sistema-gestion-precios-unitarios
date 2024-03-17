"use client";
import Breadcrumbs from "@/app/_components/breadcrumbs/breadcrumbs";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useFormState } from "react-dom";
import create from "./_actionsCreate";

// export const metadata: Metadata = {
//   title: "Crear presupuestos",
// };

export default async function Page() {
  const customers = "";
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create as any, initialState);

  return (
    <main className="w-max">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Presupuesto", href: "/dashboard/presupuestos" },
          {
            label: "Crear presupuesto",
            href: "/dashboard/presupuestos/crear",
            active: true,
          },
        ]}
      />
      <form action={dispatch}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <div className="mb-4">
            <label
              htmlFor="usu_NomApellidos"
              className="mb-2 block text-sm font-medium"
            >
              usu_NomApellidos
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="usu_NomApellidos"
                  name="usu_NomApellidos"
                  type="text"
                  placeholder="Ingresa el dato"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="pre_Nombre"
              className="mb-2 block text-sm font-medium"
            >
              pre_Nombre
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="pre_Nombre"
                  name="pre_Nombre"
                  type="text"
                  placeholder="Ingresa el dato"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="cli_NomApeRazSocial"
              className="mb-2 block text-sm font-medium"
            >
              cli_NomApeRazSocial
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="cli_NomApeRazSocial"
                  name="cli_NomApeRazSocial"
                  type="text"
                  placeholder="Ingresa el dato"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="ubi_Departamento"
              className="mb-2 block text-sm font-medium"
            >
              ubi_Departamento
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="ubi_Departamento"
                  name="ubi_Departamento"
                  type="text"
                  placeholder="Ingresa el dato"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="ubi_Provincia"
              className="mb-2 block text-sm font-medium"
            >
              ubi_Provincia
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="ubi_Provincia"
                  name="ubi_Provincia"
                  type="text"
                  placeholder="Ingresa el dato"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="ubi_Distrito"
              className="mb-2 block text-sm font-medium"
            >
              ubi_Distrito
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="ubi_Distrito"
                  name="ubi_Distrito"
                  type="text"
                  placeholder="Ingresa el dato"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="pre_Jornal"
              className="mb-2 block text-sm font-medium"
            >
              pre_Jornal
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="pre_Jornal"
                  name="pre_Jornal"
                  type="text"
                  placeholder="Ingresa el dato"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                />
              </div>
            </div>
          </div>

          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors && (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}
          </div>

          <div aria-live="polite" aria-atomic="true">
            {state.message ? (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            ) : null}
          </div>
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
    </main>
  );
}
