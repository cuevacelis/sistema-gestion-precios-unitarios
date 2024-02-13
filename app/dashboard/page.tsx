import { auth } from "@/auth";
import { cookies } from "next/headers";

async function getData() {
  const cookieStore = cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/Presupuesto/Obten_Paginado/100/1/%20`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieStore.get("token")?.value}`,
      },
      method: "GET",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function Page() {
  const xd = await auth();
  // console.log(xd?.user?.token);
  // const dataFetch = await getData();
  return (
    <>
      <h1 className="text-black dark:text-stone-300 text-4xl text-center mb-10">
        SISTEMA DE GESTION DE PRECIOS UNITARIOS <br />
        (SGPU)
      </h1>
      {/* <FunctionPagePrincipal dataFetch={dataFetch} /> */}
    </>
  );
}
