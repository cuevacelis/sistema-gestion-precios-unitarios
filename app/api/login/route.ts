import { findUserByUsernameAndPassword } from "@/lib/services/sql-queries";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  try {
    const res = await findUserByUsernameAndPassword({
      username: username,
      password: password,
    });

    if (res.length === 0) {
      return Response.json({ data: null, status: 400 });
    }
    return Response.json({
      data: {
        Usu_Id: res[0]?.usu_id,
        Usu_Correo: res[0]?.usu_correo,
        Usu_NomApellidos: res[0]?.usu_nomapellidos,
        Rol_Id: res[0]?.rol_id,
        Usu_FecHoraRegistro: res[0]?.usu_fechoraregistro,
      },
      status: 200,
    });
  } catch (error) {
    throw error;
  }
}
