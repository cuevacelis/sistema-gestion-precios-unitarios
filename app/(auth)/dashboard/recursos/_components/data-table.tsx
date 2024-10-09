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
// import { actionsDeleteRecurso } from "@/lib/actions/actions";
import {
  IDataDBObtenerRecursosPaginados,
  TStatusResponseActions,
} from "@/lib/types/types";
import useUpdateTableComplete from "@/hooks/useTableComplete";
import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";
import { useWindowSize } from "usehooks-ts";
import { useSearchToast } from "@/hooks/useSearchToast";
import { formatDateToDateTimeWith12HourFormat } from "@/lib/utils";

interface IProps {
  dataRecursos: IDataDBObtenerRecursosPaginados[];
}

export default function TableComponent({ dataRecursos }: IProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalResults = dataRecursos.length ?? 0;
  useSearchToast(totalResults);
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [statusRespDeleteRecurso, setStatusRespDeleteRecurso] =
    useState<TStatusResponseActions>("idle");
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [rowSelected, setRowSelected] =
    useState<IDataDBObtenerRecursosPaginados | null>(null);

  const columns: ColumnDef<IDataDBObtenerRecursosPaginados>[] = useMemo(
    () => [
      {
        accessorKey: "rec_id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Código" />
        ),
      },
      {
        accessorKey: "rec_nombre",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nombre" />
        ),
      },
    ],
    []
  );

  const { table, rowSelection, setRowSelection } = useUpdateTableComplete({
    data: dataRecursos ?? [],
    columns,
    rowCount: totalResults,
    identifierField: "rec_id",
    initialState: {
      columnVisibility: {
        usu_nomapellidos: false,
        pai_nombre: false,
        prov_nombre: false,
        dist_nombre: false,
      },
    },
  });

  const handleDeleteConfirm = async () => {
    // if (!rowSelected) return;
    // setStatusRespDeleteRecurso("pending");
    // try {
    //   await actionsDeleteRecurso(rowSelected.rec_id);
    //   setStatusRespDeleteRecurso("success");
    //   toast.success("Proyecto eliminado", {
    //     action: {
    //       label: "Deshacer cambios",
    //       onClick: async () => {
    //         setStatusRespDeleteRecurso("pending");
    //         await actionsDeleteRecurso(rowSelected.rec_id, 1);
    //         setStatusRespDeleteRecurso("success");
    //       },
    //     },
    //   });
    // } catch (error) {
    //   setStatusRespDeleteRecurso("error");
    //   toast.error(
    //     "No se pudo eliminar el proyecto, por favor intente nuevamente."
    //   );
    // } finally {
    //   setIsShowDeleteModal(false);
    // }
  };

  const handleRowClick = (row: IDataDBObtenerRecursosPaginados) => {
    const rowId = row.rec_id.toString();
    if (isMobile) {
      router.push(`/dashboard/recursos?proyectoId=${row.rec_id}`);
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

  const handleRowDoubleClick = (row: IDataDBObtenerRecursosPaginados) => {
    if (!isMobile) {
      router.push(`/dashboard/recursos?proyectoId=${row.rec_id}`);
    }
  };

  if (!table || !table.getRowModel().rows.length) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <ValidateMutation
      showLoading={false}
      variant="toast"
      statusMutation={[statusRespDeleteRecurso]}
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
                            href={`/dashboard/recursos?proyectoId=${row.original.rec_id}`}
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
                        href={`/dashboard/recurso/${row.original.rec_id}`}
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
                        href={`/dashboard/recursos?proyectoId=${row.original.rec_id}`}
                        className="flex items-center"
                      >
                        <ModuleIconsComponent
                          className="mr-2 h-4 w-4"
                          modNombre="Grupos de Partida"
                        />
                        <span>Grupos de Partida</span>
                      </Link>
                    </ContextMenuItem>
                    <ContextMenuItem asChild>
                      <Link
                        href={`recurso/${row.original.rec_id}/editar?${searchParams.toString()}`}
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
          title="¿Está seguro de eliminar el recurso?"
          message="Esta acción se puede revertir, aun asi tener precaución."
          show={isShowDeleteModal}
          onClose={() => setIsShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          classNameButtonAction="bg-destructive text-white hover:bg-destructive/80"
          isLoading={statusRespDeleteRecurso === "pending"}
          messageActionButton="Eliminar"
          messageActionButtonLoading="Eliminando"
        />
      )}
    </ValidateMutation>
  );
}
