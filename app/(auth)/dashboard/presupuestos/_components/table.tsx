import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Presupuesto } from "@/lib/data/sql-queries";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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

export function UpdateInvoice({ id }: { id: number }) {
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

export function DeleteInvoice({ id }: { id: number }) {
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
  data: Presupuesto[];
}) {
  const invoices = data;

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>usu_NomApellidos</TableHead>
          <TableHead>pre_Nombre</TableHead>
          <TableHead>cli_NomApeRazSocial</TableHead>
          <TableHead>ubi_Departamento</TableHead>
          <TableHead>ubi_Provincia</TableHead>
          <TableHead>ubi_Distrito</TableHead>
          <TableHead>pre_Jornal</TableHead>
          <TableHead>pre_FecHorRegistro</TableHead>
          <TableHead>pre_FecHorRegistro</TableHead>
          <TableHead>pre_FecHorRegistro</TableHead>
          <TableHead>pre_FecHorRegistro</TableHead>
          <TableHead>pre_FecHorRegistro</TableHead>
          <TableHead>pre_FecHorRegistro</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices?.map((invoice) => (
          <TableRow key={invoice.Pre_Id}>
            <TableCell>{invoice.Usu_NomApellidos}</TableCell>
            <TableCell>{invoice.Pre_Nombre}</TableCell>
            <TableCell>{invoice.Cli_NomApeRazSocial}</TableCell>
            <TableCell>{invoice.Ubi_Departamento}</TableCell>
            <TableCell>{invoice.Ubi_Provincia}</TableCell>
            <TableCell>{invoice.Ubi_Distrito}</TableCell>
            <TableCell>{invoice.Pre_Jornal}</TableCell>
            <TableCell>{invoice.Pre_FecHorRegistro}</TableCell>
            <TableCell>{invoice.Pre_FecHorRegistro}</TableCell>
            <TableCell>{invoice.Pre_FecHorRegistro}</TableCell>
            <TableCell>{invoice.Pre_FecHorRegistro}</TableCell>
            <TableCell>{invoice.Pre_FecHorRegistro}</TableCell>
            <TableCell>{invoice.Pre_FecHorRegistro}</TableCell>
            <TableCell className="flex flex-row justify-end gap-3">
              <UpdateInvoice id={invoice.Pre_Id} />
              <DeleteInvoice id={invoice.Pre_Id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
