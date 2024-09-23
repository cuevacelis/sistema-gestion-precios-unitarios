"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableViewOptions } from "@/components/data-table/view-options";
import ModalConfirmacionComponent from "@/components/modals/modalConfirmacion/modalConfirmacion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
  IDataDBObtenerGruposDePartidasId,
  TStatusResponseActions,
} from "@/lib/types";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Trash2, FileEdit, FolderOpen, Layers } from "lucide-react";
import Link from "next/link";
import useUpdateTableComplete from "@/hooks/useTableComplete";
import { replaceSegmentInPath } from "@/lib/utils";

interface IProps {
  dataGruposDePartidas: IDataDBObtenerGruposDePartidasId[];
  idProyecto: string;
  currentPath: string[];
}

export default function TableComponent({
  dataGruposDePartidas,
  idProyecto,
  currentPath,
}: IProps) {
  console.log(currentPath);
  const router = useRouter();
  const pathname = usePathname();
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [rowSelected, setRowSelected] =
    useState<IDataDBObtenerGruposDePartidasId | null>(null);
  const [statusRespDeleteGrupoPartida, setStatusRespDeleteGrupoPartida] =
    useState<TStatusResponseActions>("idle");

  const columns: ColumnDef<IDataDBObtenerGruposDePartidasId>[] = useMemo(
    () => [
      {
        id: "grupar_id",
        accessorKey: "grupar_id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Id" />
        ),
      },
      {
        accessorKey: "grupar_nombre",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nombre" />
        ),
      },
    ],
    []
  );

  const { table, rowSelection, setRowSelection } = useUpdateTableComplete({
    data: dataGruposDePartidas,
    columns,
    rowCount: dataGruposDePartidas.length,
    identifierField: "grupar_id",
  });

  const handleDeleteConfirm = async () => {
    if (!rowSelected) return;
    setStatusRespDeleteGrupoPartida("pending");
    // await actionsDeleteGrupoPartida(rowSelected.grupar_id);
    setStatusRespDeleteGrupoPartida("success");
    setIsShowDeleteModal(false);
  };

  const handleNavigateToSubgroup = (grupoPartidaId: number) => {
    router.push(pathname + "/" + grupoPartidaId);
  };

  const handleRowClick = (row: IDataDBObtenerGruposDePartidasId) => {
    setRowSelection((prev) => ({
      ...prev,
      [row.grupar_id]: !prev[row.grupar_id],
    }));
  };

  const handleRowDoubleClick = (row: IDataDBObtenerGruposDePartidasId) => {
    handleNavigateToSubgroup(row.grupar_id);
  };

  if (dataGruposDePartidas.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[400px]">
        <Layers
          className="w-16 h-16 text-muted-foreground mb-4"
          aria-hidden="true"
        />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          No hay grupos de partidas
        </h2>
        <p className="text-center text-muted-foreground max-w-md">
          Aún no se han creado grupos de partidas. Cuando se agreguen,
          aparecerán aquí.
        </p>
      </section>
    );
  }

  return (
    <ValidateMutation statusMutation={[statusRespDeleteGrupoPartida]}>
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
                    <ContextMenuItem
                      onClick={() =>
                        handleNavigateToSubgroup(row.original.grupar_id)
                      }
                    >
                      <FolderOpen className="mr-2 h-4 w-4" />
                      <span>Ver Subgrupos</span>
                    </ContextMenuItem>
                    <ContextMenuItem asChild>
                      <Link
                        href={
                          replaceSegmentInPath(
                            pathname,
                            "subgrupos",
                            "editar"
                          ) +
                          "/" +
                          row.original.grupar_id
                        }
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
          title="¿Está seguro de eliminar el grupo de partida?"
          show={isShowDeleteModal}
          onClose={() => setIsShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          classNameButtonAction="bg-destructive text-white hover:bg-destructive/80"
        />
      )}
    </ValidateMutation>
  );
}
