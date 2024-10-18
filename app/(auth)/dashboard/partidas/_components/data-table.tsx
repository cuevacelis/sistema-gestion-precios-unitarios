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
  actionsDeletePartida,
  actionsDeletePresupuesto,
} from "@/lib/actions/actions";
import {
  IDataDBObtenerPartidasPaginados,
  ISpPresupuestoObtenPaginado,
  TStatusResponseActions,
} from "@/lib/types/types";
import useUpdateTableComplete from "@/hooks/useTableComplete";
import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";
import { useWindowSize } from "usehooks-ts";
import { useSearchToast } from "@/hooks/useSearchToast";

interface IProps {
  dataPartidas: IDataDBObtenerPartidasPaginados[];
}

export default function TableComponent({ dataPartidas }: IProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalResults = dataPartidas.length ?? 0;
  useSearchToast(totalResults);
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [statusRespDeletePartida, setstatusRespDeletePartida] =
    useState<TStatusResponseActions>("idle");
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [rowSelected, setRowSelected] =
    useState<IDataDBObtenerPartidasPaginados | null>(null);
  const searchParamsShowColumns = searchParams.getAll("fshow");

  const columns: ColumnDef<IDataDBObtenerPartidasPaginados>[] = useMemo(
    () => [
      {
        accessorKey: "par_id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Id" />
        ),
      },
      {
        accessorKey: "grupar_id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Id grupo de partida" />
        ),
      },
      {
        accessorKey: "grupar_nombre",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Nombre grupo de partida"
          />
        ),
      },
      {
        accessorKey: "par_nombre",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nombre partida" />
        ),
      },
      {
        accessorKey: "par_renmanobra",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Rendimiento mano de obra"
          />
        ),
      },
      {
        accessorKey: "par_renequipo",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Rendimiento equipo" />
        ),
      },
      {
        accessorKey: "unimed_nombre",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Unidad de medida" />
        ),
      },
      {
        accessorKey: "par_preunitario",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Precio unitario" />
        ),
      },
    ],
    []
  );

  const { table, rowSelection, setRowSelection } = useUpdateTableComplete({
    data: dataPartidas ?? [],
    columns,
    rowCount: totalResults,
    identifierField: "par_id",
    initialState: {
      columnVisibility: {
        par_id:
          searchParamsShowColumns.includes("par_id") ||
          searchParamsShowColumns.length === 0,
        grupar_id: searchParamsShowColumns.includes("grupar_id") || false,
        grupar_nombre:
          searchParamsShowColumns.includes("grupar_nombre") || false,
        par_nombre:
          searchParamsShowColumns.includes("par_nombre") ||
          searchParamsShowColumns.length === 0,
        par_renmanobra:
          searchParamsShowColumns.includes("par_renmanobra") ||
          searchParamsShowColumns.length === 0,
        par_renequipo:
          searchParamsShowColumns.includes("par_renequipo") ||
          searchParamsShowColumns.length === 0,
        unimed_nombre:
          searchParamsShowColumns.includes("unimed_nombre") ||
          searchParamsShowColumns.length === 0,
        par_preunitario:
          searchParamsShowColumns.includes("par_preunitario") ||
          searchParamsShowColumns.length === 0,
      },
    },
  });

  const handleDeleteConfirm = async () => {
    if (!rowSelected) return;
    setstatusRespDeletePartida("pending");
    try {
      const respDelete = await actionsDeletePartida(rowSelected.par_id);
      if (respDelete?.isError) {
        throw respDelete.message;
      }
      setstatusRespDeletePartida("success");
      toast.success("Partida eliminada", {
        action: {
          label: "Deshacer cambios",
          onClick: async () => {
            setstatusRespDeletePartida("pending");
            await actionsDeletePartida(rowSelected.par_id, 1);
            setstatusRespDeletePartida("success");
          },
        },
      });
    } catch (error) {
      setstatusRespDeletePartida("error");
      toast.error(
        "No se pudo eliminar la partida, por favor intente nuevamente."
      );
    } finally {
      setIsShowDeleteModal(false);
    }
  };

  const handleRowClick = (row: IDataDBObtenerPartidasPaginados) => {
    // const rowId = row.par_id.toString();
    // if (isMobile) {
    //   router.push(
    //     `/dashboard/grupos_de_partida/subgrupos?grupoPartidaId=${row.par_id}`
    //   );
    // } else {
    //   setRowSelection((prev) => {
    //     const newSelection = { ...prev };
    //     if (newSelection[rowId]) {
    //       delete newSelection[rowId];
    //     } else {
    //       newSelection[rowId] = true;
    //     }
    //     return newSelection;
    //   });
    // }
  };

  const handleRowDoubleClick = (row: IDataDBObtenerPartidasPaginados) => {
    // if (!isMobile) {
    //   router.push(
    //     `/dashboard/grupos_de_partida/subgrupos?grupoPartidaId=${row.par_id}`
    //   );
    // }
  };

  if (!table || !table.getRowModel().rows.length) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <ValidateMutation
      showLoading={false}
      variant="toast"
      statusMutation={[statusRespDeletePartida]}
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
              {table.getRowModel().rows.map((row) => (
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
                            href={`/dashboard/partidas?${searchParams.toString()}`}
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
                    <ContextMenuItem asChild disabled>
                      <Link
                        href={`/dashboard/partidas/${row.original.par_id}?${searchParams.toString()}`}
                        className="flex items-center"
                      >
                        <ModuleIconsComponent
                          className="mr-2 h-4 w-4"
                          modNombre="Ver Detalle"
                        />
                        <span>Ver Detalle</span>
                      </Link>
                    </ContextMenuItem>
                    <ContextMenuItem asChild disabled>
                      <Link
                        href={`/dashboard/partidas/${row.original.par_id}?${searchParams.toString()}`}
                        className="flex items-center"
                      >
                        <ModuleIconsComponent
                          className="mr-2 h-4 w-4"
                          modNombre="Recurso"
                        />
                        <span>Ver recursos asignados</span>
                      </Link>
                    </ContextMenuItem>
                    <ContextMenuItem asChild>
                      <Link
                        href={`/dashboard/partidas/${row.original.par_id}/asignar-recurso?${searchParams.toString()}`}
                        className="flex items-center"
                      >
                        <ModuleIconsComponent
                          className="mr-2 h-4 w-4"
                          modNombre="Recurso"
                        />
                        <span>Asignar recurso</span>
                      </Link>
                    </ContextMenuItem>
                    <ContextMenuItem asChild disabled>
                      <Link
                        href={`/dashboard/partidas/${row.original.par_id}?${searchParams.toString()}`}
                        className="flex items-center"
                      >
                        <ModuleIconsComponent
                          className="mr-2 h-4 w-4"
                          modNombre="Recurso"
                        />
                        <span>Editar recurso asignado</span>
                      </Link>
                    </ContextMenuItem>
                    <ContextMenuItem asChild>
                      <Link
                        href={`partidas/${row.original.par_id}/editar?${searchParams.toString()}`}
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
      {isShowDeleteModal && (
        <ModalConfirmacionComponent
          title={
            <>
              ¿Está seguro de eliminar la partida{" "}
              <span className="font-bold underline">
                {rowSelected?.par_nombre}
              </span>
              ?
            </>
          }
          message="Esta acción se puede revertir, aun asi tener precaución."
          show={isShowDeleteModal}
          onClose={() => setIsShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          classNameButtonAction="bg-destructive text-white hover:bg-destructive/80"
          isLoading={statusRespDeletePartida === "pending"}
          messageActionButton="Eliminar"
          messageActionButtonLoading="Eliminando"
        />
      )}
    </ValidateMutation>
  );
}
