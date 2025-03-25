"use client";

import { type ColumnDef, flexRender } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableViewOptions } from "@/components/data-table/view-options";
import ModalConfirmacionComponent from "@/components/modals/modalConfirmacion/modalConfirmacion";
import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
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
import { useSearchToast } from "@/hooks/useSearchToast";
import useUpdateTableComplete from "@/hooks/useTableComplete";
import {
	actionsDeleteCliente,
	actionsDeleteUsuario,
} from "@/lib/actions/actions";
import type {
	ISpClienteObtenPaginado,
	TDataDBObtenerClientesPaginados,
	TStatusResponseActions,
} from "@/lib/types/types";
import { useWindowSize } from "usehooks-ts";

interface IProps {
	dataClientes: ISpClienteObtenPaginado[];
}

export default function TableComponent({ dataClientes }: IProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const totalResults = dataClientes[0]?.result?.meta?.total_registro ?? 0;
	useSearchToast(totalResults);
	const { width } = useWindowSize();
	const isMobile = width < 768;
	const [statusRespDeleteUsuarios, setStatusRespDeleteUsuarios] =
		useState<TStatusResponseActions>("idle");
	const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
	const [rowSelected, setRowSelected] =
		useState<TDataDBObtenerClientesPaginados | null>(null);
	const searchParamsShowColumns = searchParams.getAll("fshow");

	const columns: ColumnDef<TDataDBObtenerClientesPaginados>[] = useMemo(
		() => [
			{
				accessorKey: "cli_id",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Id" />
				),
			},
			{
				accessorKey: "cli_nomaperazsocial",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Nombre/Razón social" />
				),
			},
			{
				accessorKey: "cli_abreviatura",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Abreviatura" />
				),
			},
			{
				accessorKey: "tipdoc_nombre",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Tipo de documento" />
				),
			},
			{
				accessorKey: "cli_numdocumento",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Número de documento" />
				),
			},
		],
		[],
	);

	const { table, rowSelection, setRowSelection } = useUpdateTableComplete({
		data: dataClientes[0]?.result?.data ?? [],
		columns,
		rowCount: totalResults,
		identifierField: "cli_id",
		initialState: {
			columnVisibility: {
				cli_id:
					searchParamsShowColumns.includes("cli_id") ||
					searchParamsShowColumns.length === 0,
				cli_nomaperazsocial:
					searchParamsShowColumns.includes("cli_nomaperazsocial") ||
					searchParamsShowColumns.length === 0,
				cli_abreviatura:
					searchParamsShowColumns.includes("cli_abreviatura") ||
					searchParamsShowColumns.length === 0,
				tipdoc_nombre:
					searchParamsShowColumns.includes("tipdoc_nombre") ||
					searchParamsShowColumns.length === 0,
				cli_numdocumento:
					searchParamsShowColumns.includes("cli_numdocumento") ||
					searchParamsShowColumns.length === 0,
			},
		},
	});

	const handleDeleteConfirm = async () => {
		if (!rowSelected) return;
		setStatusRespDeleteUsuarios("pending");
		try {
			const respDelete = await actionsDeleteCliente(rowSelected.cli_id);
			if (respDelete?.isError) {
				throw respDelete.message;
			}
			setStatusRespDeleteUsuarios("success");
			toast.success("Cliente eliminado", {
				action: {
					label: "Deshacer cambios",
					onClick: async () => {
						setStatusRespDeleteUsuarios("pending");
						await actionsDeleteUsuario(rowSelected.cli_id, 1);
						setStatusRespDeleteUsuarios("success");
					},
				},
			});
		} catch (error) {
			setStatusRespDeleteUsuarios("error");
			toast.error(
				"No se pudo eliminar el cliente, por favor intente nuevamente.",
			);
		} finally {
			setIsShowDeleteModal(false);
		}
	};

	const handleRowClick = (row: TDataDBObtenerClientesPaginados) => {
		const rowId = row.cli_id.toString();
		if (isMobile) {
			router.push(`/dashboard/clientes/${row.cli_id}`);
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

	const handleRowDoubleClick = (row: TDataDBObtenerClientesPaginados) => {
		if (!isMobile) {
			router.push(`/dashboard/clientes/${row.cli_id}`);
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
														header.getContext(),
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
														href={`/dashboard/clientes/${row.original.cli_id}`}
														onClick={(e) => {
															e.preventDefault();
														}}
													>
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext(),
														)}
													</Link>
												</TableCell>
											))}
										</TableRow>
									</ContextMenuTrigger>
									<ContextMenuContent className="w-64">
										<ContextMenuItem asChild>
											<Link
												href={`/dashboard/clientes/${row.original.cli_id}`}
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
												href={`clientes/${row.original.cli_id}/editar?${searchParams.toString()}`}
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
						¿Está seguro de eliminar el cliente{" "}
						<span className="font-bold underline">
							{rowSelected?.cli_nomaperazsocial}
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
