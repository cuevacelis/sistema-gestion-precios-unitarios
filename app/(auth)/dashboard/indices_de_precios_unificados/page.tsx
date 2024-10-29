import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ISearchParams } from "@/lib/types/types";
import TableSkeleton from "@/components/ui/skeletons/table-skeleton";
import { auth } from "@/auth";
import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";
import { obtenerPreciosRecomendados } from "@/lib/services/sql-queries";
import Component from "./_components/content-page";

const BackButtonHistory = dynamic(
  () => import("@/components/back-button/back-button-history"),
  {
    loading: () => <Skeleton className="h-9 w-9" />,
  }
);

const Search = dynamic(() => import("@/components/search/search"), {
  loading: () => <></>,
});

const OptionsTable = dynamic(() => import("./_components/options-table"), {
  loading: () => <Skeleton className="h-10 w-full" />,
});

interface IProjectPage {}

export default async function ProyectPage({}: IProjectPage) {
  const session = await auth();

  return (
    <div className="space-y-6">
      <Suspense fallback={<TableSkeleton />}>
        <GetDataTable />
      </Suspense>
    </div>
  );
}

async function GetDataTable() {
  const dataIndicesDePreciosUnificados = await obtenerPreciosRecomendados();
  return (
    <Component
      dataIndicesDePreciosUnificados={dataIndicesDePreciosUnificados}
    />
  );
}
