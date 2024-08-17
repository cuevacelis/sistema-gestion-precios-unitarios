import ProyectosProvider from "@/context/context-presupuestos";
import React from "react";

interface IPropsLayout {
  children: React.ReactNode;
}

export default async function Layout(props: IPropsLayout) {
  return <ProyectosProvider>{props.children}</ProyectosProvider>;
}
