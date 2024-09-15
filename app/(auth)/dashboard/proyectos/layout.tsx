// import ProyectosProvider from "@/context/context-proyectos";
import React from "react";

interface IPropsLayout {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default async function Layout({ children, modal }: IPropsLayout) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
