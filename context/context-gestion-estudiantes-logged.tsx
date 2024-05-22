"use client";
import { createContext, useContext, useState } from "react";

interface GestionEstudiantesLoggedContextProps {
  stateSidebar: boolean;
  setStateSidebar: (state: boolean) => void;
}

const GestionEstudiantesLoggedContext = createContext<
  GestionEstudiantesLoggedContextProps | undefined
>(undefined);

interface IPropsGestionEstudiantesLogged {
  children: React.ReactNode;
}

export const GestionEstudiantesLoggedProvider = ({
  children,
}: IPropsGestionEstudiantesLogged) => {
  const [stateSidebar, setStateSidebar] = useState<boolean>(true);

  return (
    <GestionEstudiantesLoggedContext.Provider
      value={{ stateSidebar, setStateSidebar }}
    >
      {children}
    </GestionEstudiantesLoggedContext.Provider>
  );
};

export const useGestionEstudiantesLogged = () => {
  const context = useContext(GestionEstudiantesLoggedContext);
  if (context === undefined) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};
