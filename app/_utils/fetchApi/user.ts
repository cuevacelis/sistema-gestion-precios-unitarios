// "use server";

import {
  IGetUserLoggedParams,
  IGetUserLoggedResp,
} from "@/app/_types/userTypes";
import { FetchError } from "../customTypeError/fetchError";

export async function getUserLogged(
  params: IGetUserLoggedParams
): Promise<IGetUserLoggedResp> {
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
    // console.log("fffffff");
    // console.error(error);
    // if (error instanceof FetchError) {
    //   console.log("type", error.type);
    //   switch (error.type) {
    //     case "Unauthorized":
    //       console.log("no  estas  autorizado");
    //       await signOutOnlyServer();
    //     default:
    //       await signOutOnlyServer();
    //   }
    // }
    console.error(error);
    throw error;
  }
}
