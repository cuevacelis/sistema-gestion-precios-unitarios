import { ISearchParams } from "@/lib/types";
import { redirect } from "next/navigation";

interface ISubgruposDePartidaPageProps {
  searchParams: ISearchParams;
}

export default async function SubgruposDePartidaPage({
  searchParams,
}: ISubgruposDePartidaPageProps) {
  const currentParams = new URLSearchParams(
    searchParams as Record<string, string>
  );
  const redirectUrl = `/dashboard/grupos_de_partida/subgrupos?${currentParams.toString()}`;
  redirect(redirectUrl);
}
