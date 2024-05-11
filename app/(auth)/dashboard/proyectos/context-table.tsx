"use client";
import { IDataDBObtenerPresupuestosPaginados } from "@/lib/types";
import {
  ColumnDef,
  PaginationState,
  RowData,
  SortingState,
  Table,
  Updater,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type DataService = IDataDBObtenerPresupuestosPaginados & RowData;

interface TableContextType<TData extends DataService> {
  table: Table<TData>;
  data: TData[];
  columns: ColumnDef<TData>[];
  rowSelection: {};
  setRowSelection: React.Dispatch<React.SetStateAction<{}>>;
  setColumns: React.Dispatch<React.SetStateAction<ColumnDef<TData>[]>>;
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
  setRowCount: React.Dispatch<React.SetStateAction<number>>;
}

interface TableProviderProps {
  children: React.ReactNode;
}

interface TableSetupProps<TData extends DataService> {
  data: TData[];
  columns: ColumnDef<TData>[];
  rowCount: number;
}

const TableContext = createContext<TableContextType<any> | undefined>(
  undefined
);

export const TableProvider = <TData extends DataService>(
  props: TableProviderProps
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;
  const TableContextTypes: React.Context<TableContextType<TData> | undefined> =
    TableContext;
  const [data, setData] = useState<TData[]>([]);
  const [columns, setColumns] = useState<ColumnDef<TData>[]>([]);
  const [rowCount, setRowCount] = useState(10);
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

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    rowCount: rowCount,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: handlePaginationChange,
    getRowId: (row) => row.Pre_Id.toString(),
    state: {
      sorting,
      rowSelection,
      pagination: {
        pageIndex: currentPage - 1 || 0,
        pageSize: rowsPerPage || 10,
      },
    },
  });

  const value = {
    table,
    data,
    columns,
    rowSelection,
    setRowSelection,
    setColumns,
    setData,
    setRowCount,
  };

  return (
    <TableContextTypes.Provider value={value}>
      {props.children}
    </TableContextTypes.Provider>
  );
};

export const useTableContext = <TData extends DataService>(
  props: TableSetupProps<TData>
) => {
  const context = useContext<TableContextType<TData> | undefined>(TableContext);

  if (context === undefined) {
    throw new Error("useTableContext must be used within a TableProvider");
  }

  useEffect(() => {
    context.setData(props.data);
    context.setColumns(props.columns);
    context.setRowCount(props.rowCount);
  }, [
    props.data,
    props.columns,
    props.rowCount,
    context.setData,
    context.setColumns,
    context.setRowCount,
  ]);

  return context;
};
