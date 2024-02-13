import { auth } from "@/auth";

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
