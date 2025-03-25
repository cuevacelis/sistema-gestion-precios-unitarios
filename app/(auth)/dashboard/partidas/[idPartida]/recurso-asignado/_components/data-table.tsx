"use client";

import { type ColumnDef, flexRender } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableViewOptions } from "@/components/data-table/view-options";
import ModalConfirmacionComponent from "@/components/modals/modalConfirmacion/modalConfirmacion";
import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
	obtenerAsignacionesRecursoToPartida,
	obtenerRecursos,
} from "@/lib/services/sql-queries";
import type {
	IDataDBObtenerAsignacionesRecursoToPartida,
	IDataDBObtenerPartidasPaginados,
	TStatusResponseActions,
} from "@/lib/types/types";
import { useWindowSize } from "usehooks-ts";
import EditarAsignacionRecursoPartida from "../editar/editar-recurso";

interface IVerAsignarRecursoPartida {
	dataPartida: IDataDBObtenerPartidasPaginados;
	dataRecursos: Awaited<ReturnType<typeof obtenerRecursos>>;
	dataPartidaRecursosAsignados: Awaited<
		ReturnType<typeof obtenerAsignacionesRecursoToPartida>
	>;
}

type LoadingKeys = "country" | "department" | "province" | "district";

export default function TableComponent({
	dataPartida,
	dataRecursos,
	dataPartidaRecursosAsignados,
}: IVerAsignarRecursoPartida) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const totalResults = dataPartidaRecursosAsignados.length || 0;
	useSearchToast(totalResults);
	const { width } = useWindowSize();
	const isMobile = width < 768;
	const [statusRespDeleteUsuarios, setStatusRespDeleteUsuarios] =
		useState<TStatusResponseActions>("idle");
	const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
	const [rowSelected, setRowSelected] =
		useState<IDataDBObtenerAsignacionesRecursoToPartida | null>(null);
	const searchParamsShowColumns = searchParams.getAll("fshow");

	const columns: ColumnDef<IDataDBObtenerAsignacionesRecursoToPartida>[] =
		useMemo(
			() => [
				{
					accessorKey: "detparrec_id",
					header: ({ column }) => (
						<DataTableColumnHeader column={column} title="detparrec_id" />
					),
				},
				{
					accessorKey: "v_par_id",
					header: ({ column }) => (
						<DataTableColumnHeader column={column} title="v_par_id" />
					),
				},
				{
					accessorKey: "manual_rec_id",
					header: ({ column }) => (
						<DataTableColumnHeader column={column} title="manual_rec_id" />
					),
				},
				{
					accessorKey: "rec_nombre",
					header: ({ column }) => (
						<DataTableColumnHeader column={column} title="Nombre del recurso" />
					),
				},
				{
					accessorKey: "unimed_id",
					header: ({ column }) => (
						<DataTableColumnHeader
							column={column}
							title="ID Unidad de medida"
						/>
					),
				},
				{
					accessorKey: "unimed_nombre",
					header: ({ column }) => (
						<DataTableColumnHeader
							column={column}
							title="Nombre Unidad de medida"
						/>
					),
				},
				{
					accessorKey: "tiprec_id",
					header: ({ column }) => (
						<DataTableColumnHeader column={column} title="ID Tipo Recurso" />
					),
				},
				{
					accessorKey: "tiprec_nombre",
					header: ({ column }) => (
						<DataTableColumnHeader
							column={column}
							title="Nombre Tipo Recurso"
						/>
					),
				},
				{
					accessorKey: "rec_cantidad",
					header: ({ column }) => (
						<DataTableColumnHeader column={column} title="Cantidad" />
					),
				},
				{
					accessorKey: "rec_cuadrilla",
					header: ({ column }) => (
						<DataTableColumnHeader column={column} title="Cuadrilla" />
					),
				},
				{
					accessorKey: "rec_precio",
					header: ({ column }) => (
						<DataTableColumnHeader column={column} title="Precio" />
					),
				},
				{
					accessorKey: "detparrec_preunitario",
					header: ({ column }) => (
						<DataTableColumnHeader column={column} title="Parcial" />
					),
				},
			],
			[],
		);

	const { table, rowSelection, setRowSelection } = useUpdateTableComplete({
		data: dataPartidaRecursosAsignados ?? [],
		columns,
		rowCount: totalResults,
		// identifierField: "detparrec_id",
		initialState: {
			columnVisibility: {
				detparrec_id: false,
				v_par_id: false,
				manual_rec_id: false,
			},
		},
	});

	const handleDeleteConfirm = async () => {
		if (!rowSelected) return;
		setStatusRespDeleteUsuarios("pending");
		try {
			const respDelete = await actionsDeleteCliente(rowSelected.detparrec_id);
			if (respDelete?.isError) {
				throw respDelete.message;
			}
			setStatusRespDeleteUsuarios("success");
			toast.success("Cliente eliminado", {
				action: {
					label: "Deshacer cambios",
					onClick: async () => {
						setStatusRespDeleteUsuarios("pending");
						await actionsDeleteUsuario(rowSelected.detparrec_id, 1);
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

	const handleRowClick = (row: IDataDBObtenerAsignacionesRecursoToPartida) => {
		// const rowId = row.detparrec_id.toString();
		// if (isMobile) {
		//   router.push(`/dashboard/clientes/${row.detparrec_id}`);
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

	const handleRowDoubleClick = (
		row: IDataDBObtenerAsignacionesRecursoToPartida,
	) => {
		// if (!isMobile) {
		//   router.push(`/dashboard/clientes/${row.detparrec_id}`);
		// }
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
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</TableCell>
											))}
										</TableRow>
									</ContextMenuTrigger>
									<ContextMenuContent className="w-64">
										<ContextMenuItem asChild>
											<Dialog>
												<DialogTrigger asChild>
													<Button
														size="default"
														variant="ghost"
														className="h-9 p-2 gap-1 w-full flex flex-row justify-start"
													>
														<ModuleIconsComponent
															className="mr-2 h-4 w-4"
															modNombre="Editar"
														/>
														<span>Editar</span>
													</Button>
												</DialogTrigger>
												<DialogContent className="sm:max-w-[525px]">
													<DialogHeader>
														<DialogTitle>Editar</DialogTitle>
														<DialogDescription />
													</DialogHeader>
													<EditarAsignacionRecursoPartida
														idPartida={row.original.v_par_id}
														idRecurso={row.original.manual_rec_id}
													/>
												</DialogContent>
											</Dialog>
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
							{rowSelected?.detparrec_id}
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
