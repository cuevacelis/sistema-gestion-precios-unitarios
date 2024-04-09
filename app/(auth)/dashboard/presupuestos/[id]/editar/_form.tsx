"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import update from "./_actionsUpdate";

export default function FormEdit(props: any) {
  console.log(props);

  const initialState = { message: null, errors: {} };
  const updatePresupuestoWithId = update.bind(null, props.id);
  const [state, dispatch] = useFormState(
    updatePresupuestoWithId as any,
    initialState
  );

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="pre_Id" className="mb-2 block text-sm font-medium">
            pre_Id
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="pre_Id"
                name="pre_Id"
                type="text"
                placeholder="Ingresa el dato"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
                defaultValue={props.data.pre_Id}
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="pre_Codigo"
            className="mb-2 block text-sm font-medium"
          >
            pre_Codigo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="pre_Codigo"
                name="pre_Codigo"
                type="text"
                placeholder="Ingresa el dato"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
                defaultValue={props.data.pre_Codigo}
              />
            </div>
          </div>
        </div>

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
                defaultValue={props.data.usu_NomApellidos}
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
                defaultValue={props.data.pre_Nombre}
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
                defaultValue={props.data.cli_NomApeRazSocial}
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
                defaultValue={props.data.ubi_Departamento}
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
                defaultValue={props.data.ubi_Provincia}
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
                defaultValue={props.data.ubi_Distrito}
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
                defaultValue={props.data.pre_Jornal}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="pre_Estado"
            className="mb-2 block text-sm font-medium"
          >
            pre_Estado
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="pre_Estado"
                name="pre_Estado"
                type="text"
                placeholder="Ingresa el dato"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
                defaultValue={props.data.pre_Estado}
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
        <Button type="submit">Actualizar presupuesto</Button>
      </div>
    </form>
  );
}
