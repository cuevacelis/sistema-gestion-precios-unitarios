"use client";
import { createContext, useContext } from "react";

const GestionEstudiantesContext = createContext({});

interface IPropsGestionEstudiantes {
  children: React.ReactNode;
}

export const GestionEstudiantesProvider = ({
  children,
}: IPropsGestionEstudiantes) => {
  return (
    <GestionEstudiantesContext.Provider value={{}}>
      {children}
    </GestionEstudiantesContext.Provider>
  );
};

export const useGestionEstudiantes = () => {
  return useContext(GestionEstudiantesContext);
};
