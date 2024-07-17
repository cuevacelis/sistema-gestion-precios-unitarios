"use client";

import useUpdateTableComplete from "@/hooks/useTableComplete";
import { Table } from "@tanstack/react-table";
import { createContext, useContext } from "react";

interface IPropsProvider {
  children: React.ReactNode;
}

interface IContextProps {
  table: Table<never>;
  rowSelection: {};
  setRowSelection: React.Dispatch<React.SetStateAction<{}>>;
}

interface IPropsGetHook {}

interface IPropsSetHook {
  data: any;
  columns: any;
  rowCount: number;
  identifierField: string;
}

export const PresupuestosContext = createContext<IContextProps | undefined>(
  undefined
);

export default function PresupuestosProvider({ children }: IPropsProvider) {
  const { table, rowSelection, setRowSelection } = useUpdateTableComplete({
    data: [],
    columns: [],
    rowCount: 0,
  });

  return (
    <PresupuestosContext.Provider
      value={{
        table,
        rowSelection,
        setRowSelection,
      }}
    >
      {children}
    </PresupuestosContext.Provider>
  );
}

export const useGetGestionPresupuestos = ({}: IPropsGetHook) => {
  const context = useContext(PresupuestosContext);
  if (context === undefined) {
    throw new Error("Error context Presupuestos");
  }
  return context;
};

export const useSetGestionPresupuestos = ({
  data,
  columns,
  rowCount,
  identifierField,
}: IPropsSetHook) => {
  const context = useContext(PresupuestosContext);
  const { table, rowSelection, setRowSelection } = useUpdateTableComplete({
    data,
    columns,
    rowCount,
    identifierField,
  });
  if (context === undefined) {
    throw new Error("Error context Presupuestos");
  }
  return { context, table, rowSelection, setRowSelection };
};
