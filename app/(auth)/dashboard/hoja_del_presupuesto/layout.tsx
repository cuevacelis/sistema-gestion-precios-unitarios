import React from "react";

interface IPropsLayout {
  children: React.ReactNode;
  // modal: React.ReactNode;
}

export default function ProyectosLayout({ children }: IPropsLayout) {
  return (
    <>
      {children}
      {/* {modal} */}
    </>
  );
}
