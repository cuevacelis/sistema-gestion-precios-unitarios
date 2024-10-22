import { ISearchParams } from "@/lib/types/types";
import { redirect } from "next/navigation";

interface ISubgruposDePartidaPageProps {
  searchParams: Promise<ISearchParams>;
}

export default async function SubgruposDePartidaPage(props: ISubgruposDePartidaPageProps) {
  const searchParams = await props.searchParams;
  const currentParams = new URLSearchParams(
    searchParams as Record<string, string>
  );
  const redirectUrl = `/dashboard/grupos_de_partida/subgrupos?${currentParams.toString()}`;
  redirect(redirectUrl);
}
