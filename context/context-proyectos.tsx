"use client";

import useUpdateTableComplete from "@/hooks/useTableComplete";
import { IDataDBObtenerPresupuestosPaginados } from "@/lib/types";
import { ColumnDef, Table } from "@tanstack/react-table";
import { createContext, useContext, useEffect, useState } from "react";

interface IPropsProvider {
  children: React.ReactNode;
}

interface IContextProps {
  dataTable: {
    table: Table<IDataDBObtenerPresupuestosPaginados>;
    rowSelection: {};
    setRowSelection: React.Dispatch<
      React.SetStateAction<{
        [key: string]: any;
      }>
    >;
    seIDataDBObtenerPresupuestosPaginados: React.Dispatch<
      React.SetStateAction<IDataDBObtenerPresupuestosPaginados[]>
    >;
    setColumns: React.Dispatch<
      React.SetStateAction<ColumnDef<IDataDBObtenerPresupuestosPaginados>[]>
    >;
    setRowCount: React.Dispatch<React.SetStateAction<number>>;
    setIdentifierField: React.Dispatch<
      React.SetStateAction<string | undefined>
    >;
  };
}

interface IPropsGetHook {}

interface IPropsSetHook {
  data: IDataDBObtenerPresupuestosPaginados[];
  columns: ColumnDef<IDataDBObtenerPresupuestosPaginados>[];
  rowCount: number;
  identifierField?: string;
}

const ProyectosContext = createContext<IContextProps | undefined>(undefined);

export default function ProyectosProvider({ children }: IPropsProvider) {
  const [data, seIDataDBObtenerPresupuestosPaginados] = useState<
    IDataDBObtenerPresupuestosPaginados[]
  >([]);
  const [columns, setColumns] = useState<
    ColumnDef<IDataDBObtenerPresupuestosPaginados>[]
  >([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [identifierField, setIdentifierField] = useState<string>();

  const { table, rowSelection, setRowSelection } = useUpdateTableComplete({
    data,
    columns,
    rowCount: rowCount,
    identifierField,
  });

  return (
    <ProyectosContext.Provider
      value={{
        dataTable: {
          table,
          rowSelection,
          setRowSelection,
          seIDataDBObtenerPresupuestosPaginados,
          setColumns,
          setRowCount,
          setIdentifierField,
        },
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
}

export function useGetGestionProyectos({}: IPropsGetHook) {
  const context = useContext(ProyectosContext);
  if (context === undefined) {
    throw new Error("Error loading context");
  }
  return context;
}

export function useSetGestionProyectos({
  data,
  columns,
  rowCount,
  identifierField,
}: IPropsSetHook) {
  const context = useContext(ProyectosContext);
  if (context === undefined) {
    throw new Error("Error loading context");
  }
  useEffect(() => {
    context.dataTable.seIDataDBObtenerPresupuestosPaginados(data);
    context.dataTable.setColumns(columns);
    context.dataTable.setRowCount(rowCount);
    context.dataTable.setIdentifierField(identifierField);
  }, [data, columns, rowCount, identifierField]);

  return context;
}
