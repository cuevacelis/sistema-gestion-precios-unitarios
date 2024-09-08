// app/dashboard/proyectos/[idProyecto]/grupos-de-partida/_components/data-table.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
// import { actionsDeleteGrupoPartida } from "@/lib/actions";
import {
  IDataDBObtenerGruposDePartidasId,
  TStatusResponseActions,
} from "@/lib/types";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Trash2, Copy, FileEdit, FolderOpen } from "lucide-react";
import Link from "next/link";
import useUpdateTableComplete from "@/hooks/useTableComplete";
// import { Breadcrumb } from "@/components/Breadcrumb";

interface IProps {
  dataGruposDePartidas: IDataDBObtenerGruposDePartidasId[];
  idProyecto: string;
  currentPath: string[];
  breadcrumbItems: { name: string; href: string }[];
}

export default function TableComponent({
  dataGruposDePartidas,
  idProyecto,
  currentPath,
  breadcrumbItems,
}: IProps) {
  const router = useRouter();
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [rowSelected, setRowSelected] =
    useState<IDataDBObtenerGruposDePartidasId | null>(null);
  const [statusRespDeleteGrupoPartida, setStatusRespDeleteGrupoPartida] =
    useState<TStatusResponseActions>("idle");

  const columns: ColumnDef<IDataDBObtenerGruposDePartidasId>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Seleccionar todos"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={`Seleccionar fila ${row.index + 1}`}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
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
      // Añade más columnas según sea necesario
    ],
    []
  );

  const { table, rowSelection, setRowSelection } = useUpdateTableComplete({
    data: dataGruposDePartidas,
    columns,
    rowCount: dataGruposDePartidas.length,
    identifierField: "grupar_id",
  });

  const handleDeselectAll = () => {
    setRowSelection({});
  };

  const handleDeleteConfirm = async () => {
    if (!rowSelected) return;
    setStatusRespDeleteGrupoPartida("pending");
    // await actionsDeleteGrupoPartida(rowSelected.grupar_id);
    setStatusRespDeleteGrupoPartida("success");
    setIsShowDeleteModal(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const handleNavigateToSubgroup = (grupoPartidaId: number) => {
    const newPath =
      currentPath.length > 1
        ? [...currentPath.slice(1), grupoPartidaId]
        : [grupoPartidaId];
    router.push(
      `/dashboard/proyectos/${idProyecto}/grupos-de-partida/${newPath.join("/")}`
    );
  };

  return (
    <ValidateMutation statusMutation={[statusRespDeleteGrupoPartida]}>
      {/* <Breadcrumb items={breadcrumbItems} /> */}
      <div className="relative mb-6 flex flex-row gap-2 items-center">
        <Button
          onClick={handleDeselectAll}
          variant="outline"
          className="btn btn-secondary"
          size="sm"
        >
          Deseleccionar Todo
        </Button>
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
                    <TableRow data-state={row.getIsSelected() && "selected"}>
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
                        handleCopyCode(String(row.original.grupar_nombre))
                      }
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Copiar: {row.original.grupar_nombre}</span>
                    </ContextMenuItem>
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
                        href={`/dashboard/proyectos/${idProyecto}/grupos-de-partida/${[...currentPath.slice(1), row.original.grupar_id].join("/")}/editar`}
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
