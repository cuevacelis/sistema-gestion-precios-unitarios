import Breadcrumbs from "@/app/_components/breadcrumbs/breadcrumbs";
import { Metadata } from "next";
import FormCreateComponent from "./_components/form";

export const metadata: Metadata = {
  title: "Crear presupuestos",
};

export default function Page() {
  return (
    <section className="mt-4 mx-5">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Presupuesto", href: "/dashboard/presupuestos" },
          {
            label: "Crear presupuesto",
            href: "/dashboard/presupuestos/crear",
            active: true,
          },
        ]}
      />
      <FormCreateComponent />
    </section>
  );
}
