"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";

export default function BreadcrumbsComponent() {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/dashboard/presupuestos">
        Presupuesto
      </BreadcrumbItem>
      <BreadcrumbItem href="/dashboard/presupuestos/crear">
        Crear presupuesto
      </BreadcrumbItem>
    </Breadcrumbs>
  );
}
