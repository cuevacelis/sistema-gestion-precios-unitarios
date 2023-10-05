import { cookies } from "next/headers";
import "server-only";

// export const preload = (id: string) => {
//   void getItem(id)
// }

// export const getItem = cache(async (id: string) => {
//   // ...
// })

export async function getSessionUser() {
  const cookieStore = cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/Usuario/Obten_Usuario_Logeado`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieStore.get("token")?.value}`,
      },
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export const runtime = "edge";
