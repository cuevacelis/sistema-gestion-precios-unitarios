import { IFetchUserLogged } from "@/app/_lib/types/user";
import { FetchError } from "../../types/classFetchError";

const BASE_URL = process.env.URL_API;

export async function fetchLoggedUser(params: { token: string }) {
  try {
    const res = await fetch(`${BASE_URL}/Usuario/Obten_Usuario_Logeado`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.token}`,
      },
      method: "GET",
      next: { tags: ["user-logged"], revalidate: 86400 },
    });
    if (!res.ok) {
      throw new FetchError({
        message: `LoggedUser: Respuesta de red OK pero respuesta HTTP no OK: ${res.status}`,
        type: res.statusText,
        options: { cause: res },
      });
    }
    return res.json() as IFetchUserLogged;
  } catch (error) {
    throw error;
  }
}
