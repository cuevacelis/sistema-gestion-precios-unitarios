import {
  ColumnDef,
  PaginationState,
  SortingState,
  Table,
  Updater,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
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
}

function useUpdateTableComplete<TData extends RowData>({
  data,
  columns,
  rowCount,
  identifierField,
}: UseUpdateTableProps<TData>): {
  table: Table<TData>;
  rowSelection: {};
  setRowSelection: React.Dispatch<React.SetStateAction<{}>>;
} {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

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
