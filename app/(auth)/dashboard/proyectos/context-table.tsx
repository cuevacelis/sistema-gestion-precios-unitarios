"use client";
import {
  ColumnDef,
  RowData,
  SortingState,
  Table,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface TableContextType<TData extends RowData> {
  table: Table<TData>;
  updateColumns: (columns: ColumnDef<TData>[]) => void;
  updateData: (data: TData[]) => void;
}

const TableContext = createContext<TableContextType<any> | undefined>(
  undefined
);

interface TableProviderProps {
  children: React.ReactNode;
}

export const TableProvider = <TData extends RowData>(
  props: TableProviderProps
) => {
  const TableContextTypes: React.Context<TableContextType<TData> | undefined> =
    TableContext;
  const [data, setData] = useState<TData[]>([]);
  const [columns, setColumns] = useState<ColumnDef<TData>[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  const updateColumns = (newColumns: ColumnDef<TData>[]) => {
    setColumns(newColumns);
  };

  const updateData = (newData: TData[]) => {
    setData(newData);
  };

  const value = useMemo(
    () => ({
      table,
      updateColumns,
      updateData,
    }),
    [table, updateColumns, updateData]
  );

  return (
    <TableContextTypes.Provider value={value}>
      {props.children}
    </TableContextTypes.Provider>
  );
};

interface TableSetupProps<TData extends RowData> {
  data: TData[];
  columns: ColumnDef<TData>[];
}

export const useTableContext = <TData extends RowData>(
  props?: TableSetupProps<TData>
) => {
  const context = useContext<TableContextType<TData> | undefined>(TableContext);

  if (context === undefined) {
    throw new Error("useTableContext must be used within a TableProvider");
  }

  useEffect(() => {
    if (props?.data && props?.columns) {
      context.updateData(props.data);
      context.updateColumns(props.columns);
    }
  }, [props?.data, props?.columns, context.updateData, context.updateColumns]);

  return context;
};
