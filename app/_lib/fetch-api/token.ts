import { IBodyLogin, IBodyTokenRefresh, IFetchLogin } from "@/app/_types/login";
import { FetchError } from "../customTypeError/fetchError";

export async function fetchApiLogin(params: IBodyLogin): Promise<IFetchLogin> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/Accounts/Login`,
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          usu_Correo: params.usu_Correo,
          usu_Clave: params.usu_Clave,
        }),
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

export async function fetchApiTokenRefresh(params: IBodyTokenRefresh) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/Token/refresh`,
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          token: params.token,
          refreshToken: params.refreshToken,
        }),
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
