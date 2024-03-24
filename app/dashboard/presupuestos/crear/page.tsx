import { Metadata } from "next";
import BreadcrumbsComponent from "./_components/breadcrumbs";
import FormCreateComponent from "./_components/form";

export const metadata: Metadata = {
  title: "Crear presupuestos",
};

export default function Page() {
  return (
    <main className="w-full mt-4 ml-5 flex flex-col gap-4">
      <BreadcrumbsComponent />
      <FormCreateComponent />
    </main>
  );
}
