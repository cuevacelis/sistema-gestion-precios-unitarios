// import ProyectosProvider from "@/context/context-proyectos";
import React from "react";

interface IPropsLayout {
  children: React.ReactNode;
}

export default async function Layout(props: IPropsLayout) {
  return <>{props.children}</>;
}
