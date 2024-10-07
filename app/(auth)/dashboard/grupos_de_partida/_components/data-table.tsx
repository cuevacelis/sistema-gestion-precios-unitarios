"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { useWindowSize } from "usehooks-ts";
import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";

interface IProps {
  dataGruposDePartidas: IDataDBObtenerGruposDePartidasId[];
  isPartidasAssigned: boolean;
  lastGrupoPartidaId: number;
}

export default function TableComponent({
  dataGruposDePartidas,
  isPartidasAssigned,
  lastGrupoPartidaId,
}: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { width } = useWindowSize();
  const isMobile = width < 768;
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
    router.push(
      pathname + "/" + grupoPartidaId + `?${searchParams.toString()}`
    );
  };

  const handleRowClick = (row: IDataDBObtenerGruposDePartidasId) => {
    const rowId = row.grupar_id.toString();
    if (isMobile) {
      router.push(
        pathname + "/" + row.grupar_id + `?${searchParams.toString()}`
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

  const handleRowDoubleClick = (row: IDataDBObtenerGruposDePartidasId) => {
    if (!isMobile) {
      router.push(
        pathname + "/" + row.grupar_id + `?${searchParams.toString()}`
      );
    }
  };

  if (isPartidasAssigned) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[400px]">
        <ModuleIconsComponent
          className="w-16 h-16 text-muted-foreground mb-4"
          modNombre="grupos de partida"
        />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Este grupo de partida ya tiene partidas asignada, por lo cual no se
          puede crear grupos de partidas.
        </h2>
        <p className="text-center text-muted-foreground max-w-md">
          De click abajo para ver las partidas asignadas.
        </p>
        <Link
          href={
            "/dashboard/partidas?grupoPartidaId=" +
            lastGrupoPartidaId?.toString()
          }
          scroll={false}
          className="flex items-center"
        >
          <ModuleIconsComponent className="mr-2 h-4 w-4" modNombre="partida" />
          <span>Ver partidas</span>
        </Link>
      </section>
    );
  }

  if (dataGruposDePartidas.length === 0 && !isPartidasAssigned) {
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
    <ValidateMutation
      showLoading={false}
      variant="toast"
      statusMutation={[statusRespDeleteGrupoPartida]}
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
                            href={
                              pathname +
                              "/" +
                              row.original.grupar_id +
                              `?${searchParams.toString()}`
                            }
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
                    <ContextMenuItem
                      onClick={() =>
                        handleNavigateToSubgroup(row.original.grupar_id)
                      }
                    >
                      <ModuleIconsComponent
                        className="mr-2 h-4 w-4"
                        modNombre="Grupos de Partida"
                      />
                      <span>Ver grupos de partida</span>
                    </ContextMenuItem>
                    {!row.original.tiene_hijos ? (
                      <ContextMenuItem>
                        <Link
                          href={
                            "/dashboard/partidas?grupoPartidaId=" +
                            row.original.grupar_id.toString()
                          }
                          scroll={false}
                          className="flex items-center"
                        >
                          <ModuleIconsComponent
                            className="mr-2 h-4 w-4"
                            modNombre="partida"
                          />
                          <span>Agregar partida</span>
                        </Link>
                      </ContextMenuItem>
                    ) : null}
                    <ContextMenuItem asChild>
                      <Link
                        href={
                          replaceSegmentInPath(
                            pathname,
                            "subgrupos",
                            "editar"
                          ) +
                          "/" +
                          row.original.grupar_id +
                          `?${searchParams.toString()}`
                        }
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
          title="¿Está seguro de eliminar el grupo de partida?"
          message="Esta acción se puede revertir, aun asi tener precaución."
          show={isShowDeleteModal}
          onClose={() => setIsShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          classNameButtonAction="bg-destructive text-white hover:bg-destructive/80"
          isLoading={statusRespDeleteGrupoPartida === "pending"}
          messageActionButton="Eliminar"
          messageActionButtonLoading="Eliminando"
        />
      )}
    </ValidateMutation>
  );
}
