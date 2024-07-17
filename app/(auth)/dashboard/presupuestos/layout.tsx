import PresupuestosProvider from "@/context/context-presupuestos";
import React from "react";

interface IPropsLayout {
  children: React.ReactNode;
}

// const title = 'Client Context';

// export const metadata = {
//   title,
//   openGraph: {
//     title,
//     images: [`/api/og?title=${title}`],
//   },
// };

export default async function Layout(props: IPropsLayout) {
  return <PresupuestosProvider>{props.children}</PresupuestosProvider>;
}
