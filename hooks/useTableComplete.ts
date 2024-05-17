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
  data: initialData,
  columns: initialColumns,
  rowCount: initialRowCount,
  identifierField,
}: UseUpdateTableProps<TData>): {
  table: Table<TData>;
  setTableData: (data: TData[]) => void;
  setTableColumns: (columns: ColumnDef<TData>[]) => void;
  rowSelection: {};
  setRowSelection: React.Dispatch<React.SetStateAction<{}>>;
} {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;
  const [data, setData] = useState<TData[]>(initialData);
  const [columns, setColumns] = useState<ColumnDef<TData>[]>(initialColumns);
  const [rowCount, setRowCount] = useState(initialRowCount || 0);
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
    rowCount: rowCount,
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

  const setTableData = (newData: TData[]) => {
    setData(newData);
    setRowCount(newData.length);
  };

  const setTableColumns = (newColumns: ColumnDef<TData>[]) => {
    setColumns(newColumns);
  };

  return {
    table,
    rowSelection,
    setRowSelection,
    setTableData,
    setTableColumns,
  };
}

export default useUpdateTableComplete;
