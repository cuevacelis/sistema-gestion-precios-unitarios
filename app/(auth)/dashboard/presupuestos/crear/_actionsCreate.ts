"use server";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function create(prevState: any, formData: FormData) {
  try {
    const session = await auth();
    const res = await fetch(`https://apusoft.online/api/v1/Presupuesto/Crea`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      body: JSON.stringify({
        usu_NomApellidos: formData.get("usu_NomApellidos"),
        pre_Nombre: formData.get("pre_Nombre"),
        cli_NomApeRazSocial: formData.get("cli_NomApeRazSocial"),
        ubi_Departamento: formData.get("ubi_Departamento"),
        ubi_Provincia: formData.get("ubi_Provincia"),
        ubi_Distrito: formData.get("ubi_Distrito"),
        pre_Jornal: formData.get("pre_Jornal"),
      }),
      redirect: "follow",
    });

    await res.json();
    revalidatePath("/dashboard/presupuestos");
    redirect("/dashboard/presupuestos");
  } catch (error) {
    return {
      message: "Error: al insertar un nuevo presupuesto",
    };
  }
}
