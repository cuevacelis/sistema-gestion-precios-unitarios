import { cookies } from "next/headers";
import { FunctionPagePrincipal } from "./dataPagePrincipal";

interface IPropsPage {
  isSuccessful: boolean;
  errorMessage: any;
  data: [
    {
      pre_Codigo: string;
      usu_NomApellidos: string;
      pre_Nombre: string;
      cli_NomApeRazSocial: string;
      ubi_Departamento: string;
      ubi_Provincia: string;
      ubi_Distrito: string;
      pre_Jornal: string;
      pre_FecHorRegistro: string;
    }
  ];
}

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
  const dataFetch = await getData();
  return (
    <>
      <h1 className="text-black dark:text-stone-300 text-4xl text-center mb-10">
        SISTEMA DE GESTION DE PRECIOS UNITARIOS <br />
        (SGPU)
      </h1>
      <FunctionPagePrincipal dataFetch={dataFetch} />
    </>
  );
}
