import React from "react";

interface IPropsLayout {
  children: React.ReactNode;
  modal: React.ReactNode;
}

// function IP() {
//   const FALLBACK_IP_ADDRESS = '0.0.0.0'
//   const forwardedFor = headers().get('x-forwarded-for')

//   if (forwardedFor) {
//     return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS
//   }

//   return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS
// }

export default async function Layout({ children, modal }: IPropsLayout) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
