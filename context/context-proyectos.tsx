"use client";

import useUpdateTableComplete from "@/hooks/useTableComplete";
import { IDataDBObtenerProyectosPaginados } from "@/lib/types";
import { ColumnDef, Table } from "@tanstack/react-table";
import { createContext, useContext, useEffect, useState } from "react";

interface IPropsProvider {
  children: React.ReactNode;
}

interface IContextProps {
  dataTable: {
    table: Table<IDataDBObtenerProyectosPaginados>;
    rowSelection: {};
    setRowSelection: React.Dispatch<
      React.SetStateAction<{
        [key: string]: any;
      }>
    >;
    seIDataDBObtenerProyectosPaginados: React.Dispatch<
      React.SetStateAction<IDataDBObtenerProyectosPaginados[]>
    >;
    setColumns: React.Dispatch<
      React.SetStateAction<ColumnDef<IDataDBObtenerProyectosPaginados>[]>
    >;
    setRowCount: React.Dispatch<React.SetStateAction<number>>;
    setIdentifierField: React.Dispatch<
      React.SetStateAction<string | undefined>
    >;
  };
}

interface IPropsGetHook {}

interface IPropsSetHook {
  data: IDataDBObtenerProyectosPaginados[];
  columns: ColumnDef<IDataDBObtenerProyectosPaginados>[];
  rowCount: number;
  identifierField?: string;
}

const ProyectosContext = createContext<IContextProps | undefined>(undefined);

export default function ProyectosProvider({ children }: IPropsProvider) {
  const [data, seIDataDBObtenerProyectosPaginados] = useState<
    IDataDBObtenerProyectosPaginados[]
  >([]);
  const [columns, setColumns] = useState<
    ColumnDef<IDataDBObtenerProyectosPaginados>[]
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
          seIDataDBObtenerProyectosPaginados,
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
    context.dataTable.seIDataDBObtenerProyectosPaginados(data);
    context.dataTable.setColumns(columns);
    context.dataTable.setRowCount(rowCount);
    context.dataTable.setIdentifierField(identifierField);
  }, [data, columns, rowCount, identifierField]);

  return context;
}
