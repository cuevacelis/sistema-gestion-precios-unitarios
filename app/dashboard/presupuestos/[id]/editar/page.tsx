import Breadcrumbs from "@/app/_components/breadcrumbs/breadcrumbs";
import { auth } from "@/auth";
import { Metadata } from "next";
import FormEdit from "./_form";

export const metadata: Metadata = {
  title: "Editar presupuestos",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const session = await auth();

  const res = await fetch(`https://apusoft.online/api/v1/Presupuesto/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.token}`,
    },
    redirect: "follow",
  });

  const resJson = await res.json();

  if (!resJson) {
    return <p>not found</p>;
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Presupuestos", href: "/dashboard/presupuestos" },
          {
            label: "Editar presupuestos",
            href: `/dashboard/presupuestos/${id}/editar`,
            active: true,
          },
        ]}
      />
      <FormEdit data={resJson.data} id={id} />
    </main>
  );
}
