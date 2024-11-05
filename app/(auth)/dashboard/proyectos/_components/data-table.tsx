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
import {
  actionsDeleteEstadoPresupuestoRecursivo,
  actionsDeletePresupuesto,
} from "@/lib/actions/actions";
import {
  TDataDBObtenerProyectosPaginados,
  ISpPresupuestoObtenPaginado,
  TStatusResponseActions,
} from "@/lib/types/types";
import useUpdateTableComplete from "@/hooks/useTableComplete";
import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";
import { useWindowSize } from "usehooks-ts";
import { useSearchToast } from "@/hooks/useSearchToast";
import { formatDateToDateTimeWith12HourFormat } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface IProps {
  dataProyectos: ISpPresupuestoObtenPaginado[];
}

export default function TableComponent({ dataProyectos }: IProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalResults = dataProyectos[0]?.result?.meta?.total_registro ?? 0;
  useSearchToast(totalResults);
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [statusRespDeletePresupuesto, setStatusRespDeletePresupuesto] =
    useState<TStatusResponseActions>("idle");
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [rowSelected, setRowSelected] =
    useState<TDataDBObtenerProyectosPaginados | null>(null);
  const [isDeleteRecursive, setIsDeleteRecursive] = useState(false);
  const searchParamsShowColumns = searchParams.getAll("fshow");

  const columns: ColumnDef<TDataDBObtenerProyectosPaginados>[] = useMemo(
    () => [
      {
        accessorKey: "pre_codigo",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Código" />
        ),
      },
      {
        accessorKey: "pre_nombre",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nombre del proyecto" />
        ),
      },
      {
        accessorKey: "usu_nomapellidos",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Usuario" />
        ),
      },
      {
        accessorKey: "cli_nomaperazsocial",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Razón social" />
        ),
      },
      {
        accessorKey: "pre_jornal",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Jornal" />
        ),
        cell: ({ row }) => `${row.original.pre_jornal}h`,
      },
      {
        accessorKey: "pre_fechorregistro",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Fecha de creación" />
        ),
        cell: ({ row }) =>
          formatDateToDateTimeWith12HourFormat(row.original.pre_fechorregistro),
      },
      {
        accessorKey: "pai_nombre",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Pais" />
        ),
      },
      {
        accessorKey: "dep_nombre",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Departamento" />
        ),
      },
      {
        accessorKey: "prov_nombre",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Provincia" />
        ),
      },
      {
        accessorKey: "dist_nombre",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Distrito" />
        ),
      },
    ],
    []
  );

  const { table, rowSelection, setRowSelection } = useUpdateTableComplete({
    data: dataProyectos[0]?.result?.data ?? [],
    columns,
    rowCount: totalResults,
    identifierField: "pre_id",
    initialState: {
      columnVisibility: {
        pre_codigo:
          searchParamsShowColumns.includes("pre_codigo") ||
          searchParamsShowColumns.length === 0,
        pre_nombre:
          searchParamsShowColumns.includes("pre_nombre") ||
          searchParamsShowColumns.length === 0,
        usu_nomapellidos:
          searchParamsShowColumns.includes("usu_nomapellidos") || false,
        cli_nomaperazsocial:
          searchParamsShowColumns.includes("cli_nomaperazsocial") ||
          searchParamsShowColumns.length === 0,
        pre_jornal:
          searchParamsShowColumns.includes("pre_jornal") ||
          searchParamsShowColumns.length === 0,
        pre_fechorregistro:
          searchParamsShowColumns.includes("pre_fechorregistro") ||
          searchParamsShowColumns.length === 0,
        pai_nombre: searchParamsShowColumns.includes("pai_nombre") || false,
        dep_nombre:
          searchParamsShowColumns.includes("dep_nombre") ||
          searchParamsShowColumns.length === 0,
        prov_nombre: searchParamsShowColumns.includes("prov_nombre") || false,
        dist_nombre: searchParamsShowColumns.includes("dist_nombre") || false,
      },
    },
  });

  const handleDeleteConfirm = async () => {
    if (!rowSelected) return;
    setStatusRespDeletePresupuesto("pending");
    try {
      if (isDeleteRecursive) {
        const respDelete = await actionsDeleteEstadoPresupuestoRecursivo(
          rowSelected.pre_id
        );
        if (respDelete?.isError) {
          throw respDelete.message;
        }
      } else {
        await actionsDeletePresupuesto(rowSelected.pre_id);
      }
      setStatusRespDeletePresupuesto("success");
      toast.success("Proyecto eliminado", {
        action: {
          label: "Deshacer cambios",
          onClick: async () => {
            setStatusRespDeletePresupuesto("pending");
            if (isDeleteRecursive) {
              await actionsDeleteEstadoPresupuestoRecursivo(
                rowSelected.pre_id,
                1
              );
            } else {
              await actionsDeletePresupuesto(rowSelected.pre_id, 1);
            }
            setStatusRespDeletePresupuesto("success");
          },
        },
      });
    } catch (error) {
      setStatusRespDeletePresupuesto("error");
      toast.error(
        "No se pudo eliminar el proyecto, por favor intente nuevamente."
      );
    } finally {
      setIsShowDeleteModal(false);
    }
  };

  const handleRowClick = (row: TDataDBObtenerProyectosPaginados) => {
    const rowId = row.pre_id.toString();
    if (isMobile) {
      router.push(
        `/dashboard/grupos_de_partida/subgrupos?proyectoId=${row.pre_id}`
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

  const handleRowDoubleClick = (row: TDataDBObtenerProyectosPaginados) => {
    if (!isMobile) {
      router.push(
        `/dashboard/grupos_de_partida/subgrupos?proyectoId=${row.pre_id}`
      );
    }
  };

  if (!table || !table?.getRowModel()?.rows.length) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <ValidateMutation
      showLoading={false}
      variant="toast"
      statusMutation={[statusRespDeletePresupuesto]}
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
                            href={`/dashboard/grupos_de_partida/subgrupos?proyectoId=${row.original.pre_id}`}
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
                    <ContextMenuItem disabled>
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Duplicar</span>
                    </ContextMenuItem>
                    <ContextMenuItem asChild>
                      <Link
                        href={`/dashboard/proyectos/${row.original.pre_id}`}
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
                        href={`proyectos/${row.original.pre_id}/editar?${searchParams.toString()}`}
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
                    <ContextMenuItem asChild>
                      <Link
                        href={`/dashboard/hoja_del_presupuesto?proyectoId=${row.original.pre_id}`}
                        className="flex items-center"
                      >
                        <ModuleIconsComponent
                          className="mr-2 h-4 w-4"
                          modNombre="hoja de presupuesto"
                        />
                        <span>Ver Hoja de Presupuesto</span>
                      </Link>
                    </ContextMenuItem>
                    <ContextMenuItem asChild>
                      <Link
                        href={`/dashboard/grupos_de_partida/subgrupos?proyectoId=${row.original.pre_id}`}
                        className="flex items-center"
                      >
                        <ModuleIconsComponent
                          className="mr-2 h-4 w-4"
                          modNombre="Grupos de Partida"
                        />
                        <span>Ver Grupos de Partida</span>
                      </Link>
                    </ContextMenuItem>
                    <ContextMenuItem asChild>
                      <Link
                        href={`/dashboard/grupos_de_partida/crear?proyectoId=${row.original.pre_id}`}
                        className="flex items-center"
                      >
                        <ModuleIconsComponent
                          className="mr-2 h-4 w-4"
                          modNombre="Grupos de Partida"
                        />
                        <span>Agregar grupo de partida</span>
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
            ¿Está seguro de eliminar el proyecto{" "}
            <span className="font-bold underline">
              {rowSelected?.pre_nombre}
            </span>
            ?
          </>
        }
        message={
          <span className="flex flex-col gap-2">
            Esta acción se puede revertir, aun asi tener precaución.
            <span className="flex items-center space-x-2">
              <Checkbox
                id="delete-recursive"
                checked={isDeleteRecursive}
                onCheckedChange={(checked) =>
                  setIsDeleteRecursive(checked as boolean)
                }
              />
              <label
                htmlFor="delete-recursive"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Eliminar grupos de partidas y partidas asociados al proyecto.
              </label>
            </span>
          </span>
        }
        show={isShowDeleteModal}
        onClose={() => setIsShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        classNameButtonAction="bg-destructive text-white hover:bg-destructive/80"
        isLoading={statusRespDeletePresupuesto === "pending"}
        messageActionButton="Eliminar"
        messageActionButtonLoading="Eliminando"
      />
    </ValidateMutation>
  );
}
