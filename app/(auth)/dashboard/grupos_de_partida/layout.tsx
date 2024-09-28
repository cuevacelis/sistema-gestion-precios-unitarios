import React from "react";

interface IPropsLayout {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function GruposDePartidasLayout({ children, modal }: IPropsLayout) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
