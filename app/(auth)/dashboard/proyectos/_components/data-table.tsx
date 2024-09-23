"use client";

import { useEffect, useMemo, useState } from "react";
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
import { actionsDeletePresupuesto } from "@/lib/actions";
import {
  IDataDBObtenerProyectosPaginados,
  ISpPresupuestoObtenPaginado,
  TStatusResponseActions,
} from "@/lib/types";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Trash2, Copy, FileEdit, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import useUpdateTableComplete from "@/hooks/useTableComplete";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface IProps {
  dataProyectos: ISpPresupuestoObtenPaginado[];
}

export default function TableComponent({ dataProyectos }: IProps) {
  const [statusRespDeletePresupuesto, setStatusRespDeletePresupuesto] =
    useState<TStatusResponseActions>("idle");
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [rowSelected, setRowSelected] =
    useState<IDataDBObtenerProyectosPaginados | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const totalResults = dataProyectos[0]?.result?.meta?.total_registro ?? 0;

  useEffect(
    function showToastSearch() {
      const query = searchParams.get("query");
      if (query) {
        toast({
          title:
            totalResults > 0 ? "Resultados de búsqueda" : "No hay resultados",
          description: `Se encontraron ${totalResults} resultado(s) para "${query}"`,
          duration: 5000,
        });
      }
    },
    [searchParams, totalResults, toast, router]
  );

  const columns: ColumnDef<IDataDBObtenerProyectosPaginados>[] = useMemo(
    () => [
      {
        accessorKey: "pre_codigo",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Código" />
        ),
      },
      {
        accessorKey: "usu_nomapellidos",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Usuario" />
        ),
      },
      {
        accessorKey: "pre_nombre",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nombre" />
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
      },
      {
        accessorKey: "pre_fechorregistro",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Fecha" />
        ),
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
        pre_fechorregistro: false,
        pai_nombre: false,
        prov_nombre: false,
        dist_nombre: false,
      },
    },
  });

  const handleDeleteConfirm = async () => {
    if (!rowSelected) return;
    setStatusRespDeletePresupuesto("pending");
    try {
      await actionsDeletePresupuesto(rowSelected.pre_id);
      setStatusRespDeletePresupuesto("success");
      toast({
        title: "Presupuesto eliminado",
        description: "El presupuesto ha sido eliminado exitosamente.",
        action: (
          <ToastAction
            altText="Deshacer cambios"
            onClick={async () => {
              setStatusRespDeletePresupuesto("pending");
              await actionsDeletePresupuesto(rowSelected.pre_id, 1);
              setStatusRespDeletePresupuesto("success");
            }}
          >
            Deshacer cambios
          </ToastAction>
        ),
      });
    } catch (error) {
      setStatusRespDeletePresupuesto("error");
      toast({
        title: "Error",
        description:
          "No se pudo eliminar el presupuesto. Por favor, intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsShowDeleteModal(false);
    }
  };

  const handleRowClick = (row: IDataDBObtenerProyectosPaginados) => {
    setRowSelection((prev) => ({
      ...prev,
      [row.pre_id.toString()]: !prev[row.pre_id.toString()],
    }));
  };

  const handleRowDoubleClick = (row: IDataDBObtenerProyectosPaginados) => {
    router.push(`/dashboard/proyectos/${row.pre_id}/grupos-de-partida`);
  };

  if (!table || !table.getRowModel().rows.length) {
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
              {table.getRowModel().rows.map((row) => (
                <ContextMenu key={row.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleRowClick(row.original)}
                      onDoubleClick={() => handleRowDoubleClick(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-64">
                    <ContextMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Duplicar</span>
                    </ContextMenuItem>
                    <ContextMenuItem asChild>
                      <Link
                        href={`proyectos/${row.original.pre_id}/grupos-de-partida`}
                        className="flex items-center"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>Grupos de Partida</span>
                      </Link>
                    </ContextMenuItem>
                    <ContextMenuItem asChild>
                      <Link
                        href={`proyectos/${row.original.pre_id}/editar`}
                        className="flex items-center"
                      >
                        <FileEdit className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                      </Link>
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() => {
                        setRowSelected(row.original);
                        setIsShowDeleteModal(true);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
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
          title="¿Está seguro de eliminar el presupuesto?"
          message="Esta acción se puede revertir, aun asi tener precaución."
          show={isShowDeleteModal}
          onClose={() => setIsShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          classNameButtonAction="bg-destructive text-white hover:bg-destructive/80"
          isLoading={statusRespDeletePresupuesto === "pending"}
          messageActionButton="Eliminar"
          messageActionButtonLoading="Eliminando..."
        />
      )}
    </ValidateMutation>
  );
}
