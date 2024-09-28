import {
  ColumnDef,
  PaginationState,
  SortingState,
  Table,
  Updater,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  TableState,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface RowData {
  [key: string]: any;
}

interface UseUpdateTableProps<TData extends RowData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  rowCount: number;
  identifierField?: string;
  initialState?: Partial<TableState>;
}

function useUpdateTableComplete<TData extends RowData>({
  data,
  columns,
  rowCount,
  identifierField,
  initialState,
}: UseUpdateTableProps<TData>): {
  table: Table<TData>;
  rowSelection: Record<string, boolean>;
  setRowSelection: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
} {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || Number(process.env.NEXT_PUBLIC_DEFAULT_ROWS_PER_PAGE!);
  const [sorting, setSorting] = useState<SortingState>(
    initialState?.sorting || []
  );
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>(
    initialState?.rowSelection || {}
  );

  const handlePaginationChange = (
    paginationUpdate: Updater<PaginationState>
  ) => {
    const newPageState =
      typeof paginationUpdate === "function"
        ? paginationUpdate(table.getState().pagination)
        : paginationUpdate;
    const params = new URLSearchParams(searchParams);
    params.set("page", (newPageState.pageIndex + 1).toString());
    params.set("rowsPerPage", newPageState.pageSize.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const table = useReactTable<TData>({
    data,
    columns,
    manualPagination: true,
    rowCount: rowCount || 0,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: handlePaginationChange,
    initialState: {
      ...initialState,
      // pagination: {
      //   pageIndex: currentPage - 1,
      //   pageSize: rowsPerPage,
      //   ...initialState?.pagination,
      // },
    },
    getRowId: (row, index) =>
      row[identifierField || ""]?.toString() || index.toString(),
    state: {
      sorting,
      rowSelection,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: rowsPerPage,
      },
    },
  });

  return {
    table,
    rowSelection,
    setRowSelection,
  };
}

export default useUpdateTableComplete;
