"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableViewOptions } from "@/components/data-table/view-options";
import ModalConfirmacionComponent from "@/components/modals/modalConfirmacion/modalConfirmacion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuContent,
} from "@/components/ui/context-menu";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as TableUI,
} from "@/components/ui/table";
import ValidateMutation from "@/components/validate/validateMutation";
import { actionsDeleteUsuario } from "@/lib/actions/actions";
import {
  ISpUsuarioObtenPaginado,
  TDataDBObtenerUsuariosPaginados,
  TStatusResponseActions,
} from "@/lib/types/types";
import useUpdateTableComplete from "@/hooks/useTableComplete";
import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";
import { useWindowSize } from "usehooks-ts";
import { useSearchToast } from "@/hooks/useSearchToast";
import { formatDateToDateTimeWith12HourFormat } from "@/lib/utils";

interface IProps {
  dataUsuarios: ISpUsuarioObtenPaginado[];
}

export default function TableComponent({ dataUsuarios }: IProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalResults = dataUsuarios[0]?.result?.meta?.total_registro ?? 0;
  useSearchToast(totalResults);
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [statusRespDeleteUsuarios, setStatusRespDeleteUsuarios] =
    useState<TStatusResponseActions>("idle");
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [rowSelected, setRowSelected] =
    useState<TDataDBObtenerUsuariosPaginados | null>(null);
  const searchParamsShowColumns = searchParams.getAll("fshow");

  const columns: ColumnDef<TDataDBObtenerUsuariosPaginados>[] = useMemo(
    () => [
      {
        accessorKey: "usu_id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Id" />
        ),
      },
      {
        accessorKey: "usu_correo",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Correo electrónico" />
        ),
      },
      {
        accessorKey: "usu_nomapellidos",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nombres y apellidos" />
        ),
      },
      {
        accessorKey: "rol_nombre",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Rol" />
        ),
      },
      {
        accessorKey: "usu_fechoraregistro",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Fecha de registro" />
        ),
        cell: ({ row }) =>
          formatDateToDateTimeWith12HourFormat(
            row.original.usu_fechoraregistro
          ),
      },
      {
        accessorKey: "usu_observacion",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Observaciones" />
        ),
      },
    ],
    []
  );

  const { table, rowSelection, setRowSelection } = useUpdateTableComplete({
    data: dataUsuarios[0]?.result?.data ?? [],
    columns,
    rowCount: totalResults,
    identifierField: "usu_id",
    initialState: {
      columnVisibility: {
        usu_id:
          searchParamsShowColumns.includes("usu_id") ||
          searchParamsShowColumns.length === 0,
        usu_correo:
          searchParamsShowColumns.includes("usu_correo") ||
          searchParamsShowColumns.length === 0,
        usu_nomapellidos:
          searchParamsShowColumns.includes("usu_nomapellidos") || false,
        rol_nombre:
          searchParamsShowColumns.includes("rol_nombre") ||
          searchParamsShowColumns.length === 0,
        usu_fechoraregistro:
          searchParamsShowColumns.includes("usu_fechoraregistro") ||
          searchParamsShowColumns.length === 0,
        usu_observacion:
          searchParamsShowColumns.includes("usu_observacion") ||
          searchParamsShowColumns.length === 0,
      },
    },
  });

  const handleDeleteConfirm = async () => {
    if (!rowSelected) return;
    setStatusRespDeleteUsuarios("pending");
    try {
      const respDelete = await actionsDeleteUsuario(rowSelected.usu_id);
      if (respDelete?.isError) {
        throw respDelete.message;
      }
      setStatusRespDeleteUsuarios("success");
      toast.success("Usuario eliminado", {
        action: {
          label: "Deshacer cambios",
          onClick: async () => {
            setStatusRespDeleteUsuarios("pending");
            await actionsDeleteUsuario(rowSelected.usu_id, 1);
            setStatusRespDeleteUsuarios("success");
          },
        },
      });
    } catch (error) {
      setStatusRespDeleteUsuarios("error");
      toast.error(
        "No se pudo eliminar el usuario, por favor intente nuevamente."
      );
    } finally {
      setIsShowDeleteModal(false);
    }
  };

  const handleRowClick = (row: TDataDBObtenerUsuariosPaginados) => {
    const rowId = row.usu_id.toString();
    if (isMobile) {
      router.push(
        `/dashboard/usuarios/${row.usu_id}`
      );
    } else {
      setRowSelection((prev) => {
        const newSelection = { ...prev };
        if (newSelection[rowId]) {
          delete newSelection[rowId];
        } else {
          newSelection[rowId] = true;
        }
        return newSelection;
      });
    }
  };

  const handleRowDoubleClick = (row: TDataDBObtenerUsuariosPaginados) => {
    if (!isMobile) {
      router.push(`/dashboard/usuarios/${row.usu_id}`);
    }
  };

  if (!table || !table?.getRowModel()?.rows.length) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <ValidateMutation
      showLoading={false}
      variant="toast"
      statusMutation={[statusRespDeleteUsuarios]}
    >
      <div className="relative mb-6 flex flex-row gap-2 items-center">
        <DataTableViewOptions table={table} />
      </div>
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <TableUI>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table?.getRowModel()?.rows.map((row) => (
                <ContextMenu key={row.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      className="cursor-pointer hover:bg-muted/50 select-none group"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRowClick(row.original);
                      }}
                      onDoubleClick={(e) => {
                        e.preventDefault();
                        handleRowDoubleClick(row.original);
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          <Link
                            href={`/dashboard/usuarios/${row.original.usu_id}`}
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Link>
                        </TableCell>
                      ))}
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-64">
                    <ContextMenuItem asChild>
                      <Link
                        href={`/dashboard/usuarios/${row.original.usu_id}`}
                        className="flex items-center"
                      >
                        <ModuleIconsComponent
                          className="mr-2 h-4 w-4"
                          modNombre="Ver Detalle"
                        />
                        <span>Ver Detalle</span>
                      </Link>
                    </ContextMenuItem>
                    <ContextMenuItem asChild>
                      <Link
                        href={`usuarios/${row.original.usu_id}/editar?${searchParams.toString()}`}
                        scroll={false}
                        className="flex items-center"
                      >
                        <ModuleIconsComponent
                          className="mr-2 h-4 w-4"
                          modNombre="Editar"
                        />
                        <span>Editar</span>
                      </Link>
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() => {
                        setRowSelected(row.original);
                        setIsShowDeleteModal(true);
                      }}
                      className="text-red-500 focus:text-red-500 focus:bg-[#FF666618] [&>svg]:!text-red-500"
                    >
                      <ModuleIconsComponent
                        className="mr-2 h-4 w-4"
                        modNombre="Eliminar"
                      />
                      <span>Eliminar</span>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </TableBody>
          </TableUI>
        </CardContent>
        <CardFooter className="pt-2">
          <DataTablePagination table={table} rowSelection={rowSelection} />
        </CardFooter>
      </Card>
      <ModalConfirmacionComponent
        title={
          <>
            ¿Está seguro de eliminar el usuario{" "}
            <span className="font-bold underline">
              {rowSelected?.usu_correo}
            </span>
            ?
          </>
        }
        message={
          <span className="flex flex-col gap-2">
            Esta acción se puede revertir, aun asi tener precaución.
          </span>
        }
        show={isShowDeleteModal}
        onClose={() => setIsShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        classNameButtonAction="bg-destructive text-white hover:bg-destructive/80"
        isLoading={statusRespDeleteUsuarios === "pending"}
        messageActionButton="Eliminar"
        messageActionButtonLoading="Eliminando"
      />
    </ValidateMutation>
  );
}
