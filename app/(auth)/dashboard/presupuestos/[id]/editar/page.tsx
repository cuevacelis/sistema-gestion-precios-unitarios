import { auth } from "@/auth";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import { Metadata } from "next";
import FormEdit from "./_form";

export const metadata: Metadata = {
  title: "Editar presupuestos",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const session = await auth();

  const res = await fetch(`${process.env.URL_API}/Presupuesto/${id}`, {
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
