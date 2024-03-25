import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { IDataPresupuestoPginado } from "../page";

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/presupuestos/crear"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Nuevo</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/presupuestos/${id}/editar`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
      <p>Editar</p>
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  // const deletePresupuestosWithId = deletePresupuestosId.bind(null, id);
  const deletePresupuestosWithId = "";
  return (
    <form action={deletePresupuestosWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <p>Eliminar</p>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export default async function InvoicesTable({
  query,
  currentPage,
  data,
}: {
  query: string;
  currentPage: number;
  data: IDataPresupuestoPginado[];
}) {
  const invoices = data;

  return (
    <div className="overflow-x-auto mt-5">
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="uppercase text-sm leading-normal">
            <th className="text-left px-3 py-3" scope="col">
              usu_NomApellidos
            </th>
            <th className="text-left px-3 py-3" scope="col">
              pre_Nombre
            </th>
            <th className="text-left px-3 py-3" scope="col">
              cli_NomApeRazSocial
            </th>
            <th className="text-left px-3 py-3" scope="col">
              ubi_Departamento
            </th>
            <th className="text-left px-3 py-3" scope="col">
              ubi_Provincia
            </th>
            <th className="text-left px-3 py-3" scope="col">
              ubi_Distrito
            </th>
            <th className="text-left px-3 py-3" scope="col">
              pre_Jornal
            </th>
            <th className="text-left px-3 py-3" scope="col">
              pre_FecHorRegistro
            </th>
            <th className="text-left px-3 py-3" scope="col">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices?.map((invoice) => (
            <tr key={invoice.pre_Id}>
              <td className="text-left whitespace-nowrap px-3 py-3">
                <div>
                  <p>{invoice.usu_NomApellidos}</p>
                </div>
              </td>
              <td className="text-left whitespace-nowrap px-3 py-3">
                {invoice.pre_Nombre}
              </td>
              <td className="text-left whitespace-nowrap px-3 py-3">
                {invoice.cli_NomApeRazSocial}
              </td>
              <td className="text-left whitespace-nowrap px-3 py-3">
                {invoice.ubi_Departamento}
              </td>
              <td className="text-left whitespace-nowrap px-3 py-3">
                {invoice.ubi_Provincia}
              </td>
              <td className="text-left whitespace-nowrap px-3 py-3">
                {invoice.ubi_Distrito}
              </td>
              <td className="text-left whitespace-nowrap px-3 py-3">
                {invoice.pre_Jornal}
              </td>
              <td className="text-left whitespace-nowrap px-3 py-3">
                {invoice.pre_FecHorRegistro}
              </td>
              <td className="text-left whitespace-nowrap px-3 py-3">
                <div className="flex justify-end gap-3">
                  <UpdateInvoice id={invoice.pre_Id} />
                  <DeleteInvoice id={invoice.pre_Id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
