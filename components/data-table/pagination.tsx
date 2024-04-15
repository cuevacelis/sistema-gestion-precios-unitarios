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
import { Table } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  serverPagination?: {
    totalPages: number;
    totalData: number;
  };
}

export function DataTablePagination<TData>({
  table,
  serverPagination,
}: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (serverPagination) {
    const currentPage = Number(searchParams.get("page")) || 1;
    const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;
    const createPageURL = (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      router.push(`${pathname}?${params.toString()}`);
    };
    const createRowsPerPageURL = (rowsPerPage: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("rowsPerPage", rowsPerPage.toString());
      router.push(`${pathname}?${params.toString()}`);
    };
    return (
      <div className="flex flex-wrap items-center justify-between px-2 w-full gap-5">
        <div className="flex text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s)
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center">
            <p className="text-sm font-medium">Filas por página</p>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={createRowsPerPageURL}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={rowsPerPage.toString()} />
              </SelectTrigger>
              <SelectContent side="top">
                {[1, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-center text-sm font-medium">
            Página {currentPage}-{serverPagination?.totalPages} de{" "}
            {serverPagination?.totalData} datos
          </div>
          <div className="flex items-center">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => createPageURL(1)}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Ir a la primera página</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => createPageURL(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <span className="sr-only">Regresar a la pagina anterior</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => createPageURL(currentPage + 1)}
              disabled={currentPage >= serverPagination?.totalPages}
            >
              <span className="sr-only">Ir a la página siguiente</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => createPageURL(serverPagination?.totalPages)}
              disabled={currentPage === serverPagination?.totalPages}
            >
              <span className="sr-only">Ir a la última página</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center justify-between px-2 w-full gap-5">
      <div className="flex text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s)
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <div className="flex items-center">
          <p className="text-sm font-medium">Filas por página</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value: any) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1}-
          {table.getPageCount()} de {table.getRowModel().rows.length} datos
        </div>
        <div className="flex items-center">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir a la primera página</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Regresar a la pagina anterior</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir a la página siguiente</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir a la última página</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
