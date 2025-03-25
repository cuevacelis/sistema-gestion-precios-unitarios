import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
	rowSelection: {};
}

export function DataTablePagination<TData>({
	table,
	rowSelection,
}: DataTablePaginationProps<TData>) {
	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 w-full">
			<div className="text-sm text-muted-foreground">
				<span className="font-medium text-foreground">
					{Object.keys(rowSelection).length ||
						table.getFilteredSelectedRowModel().rows.length}
				</span>{" "}
				de{" "}
				<span className="font-medium text-foreground">
					{table.getRowCount() || table.getPreFilteredRowModel().rows.length}
				</span>{" "}
				fila(s) seleccionada(s)
			</div>
			<div className="flex flex-col sm:flex-row items-center gap-4">
				<div className="flex items-center gap-2">
					<p className="text-sm font-medium">Filas por página</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPagination({ pageSize: Number(value), pageIndex: 0 });
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{[20, 50, 100, 200, 400].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="icon"
						className="hidden sm:flex"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<DoubleArrowLeftIcon className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<ChevronLeftIcon className="h-4 w-4" />
					</Button>
					<div className="flex items-center gap-1">
						{/* <Input
              className="h-8 w-12 text-center"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            /> */}
						<span className="text-sm text-muted-foreground">
							{table.getState().pagination.pageIndex + 1} de{" "}
							{table.getPageCount()}
						</span>
					</div>
					<Button
						variant="outline"
						size="icon"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="hidden sm:flex"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<DoubleArrowRightIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
