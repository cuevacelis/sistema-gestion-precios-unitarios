import { IFetchUserLogged } from "@/app/_types/user";
import { FetchError } from "../customTypeError/fetchError";

export async function fetchUserLogged(params: any): Promise<IFetchUserLogged> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/Usuario/Obten_Usuario_Logeado`,
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${params.token}`,
        },
        method: "GET",
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) {
      throw new FetchError({
        message: `Respuesta de red OK pero respuesta HTTP no OK: ${res.status}`,
        type: res.statusText,
        options: { cause: res },
      });
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
