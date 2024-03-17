import Link from "next/link";
import { IDataPresupuestoPginado } from "../page";

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/presupuestos/crear"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Nuevo presupuesto</span>
      {/* <PlusIcon className="h-5 md:ml-4" /> */}
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/presupuestos/${id}/editar`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      {/* <PencilIcon className="w-5" /> */}
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
        {/* <TrashIcon className="w-5" /> */}
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
  // const invoices = await fetchFilteredInvoices(query, currentPage);
  const invoices = data;

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  usu_NomApellidos
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  pre_Nombre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  cli_NomApeRazSocial
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  ubi_Departamento
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  ubi_Provincia
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  ubi_Distrito
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  pre_Jornal
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  pre_FecHorRegistro
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.pre_Id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{invoice.usu_NomApellidos}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.pre_Nombre}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.cli_NomApeRazSocial}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.ubi_Departamento}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.ubi_Provincia}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.ubi_Distrito}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.pre_Jornal}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.pre_FecHorRegistro}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
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
      </div>
    </div>
  );
}
