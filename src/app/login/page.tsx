import Login from "./_components/login";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-black dark:text-stone-300 text-4xl text-center">
        SISTEMA DE GESTION DE PRECIOS UNITARIOS <br />
        (SGPU)
      </h1>
      <Login />
    </main>
  );
}
