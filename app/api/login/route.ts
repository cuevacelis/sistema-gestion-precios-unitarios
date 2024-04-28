import { findUserByUsernameAndPassword } from "@/lib/data/sql-queries";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  try {
    const res = await findUserByUsernameAndPassword({
      username: username,
      password: password,
    });

    if (Object.keys(res.recordset).length === 0) {
      return Response.json({ data: null, status: 400 });
    }
    return Response.json({
      data: {
        Usu_Id: res.recordset[0].Usu_Id,
        Usu_Correo: res.recordset[0].Usu_Correo,
        Usu_NomApellidos: res.recordset[0].Usu_NomApellidos,
        Rol_Id: res.recordset[0].Rol_Id,
        Usu_FecHoraRegistro: res.recordset[0].Usu_FecHoraRegistro,
      },
      status: 200,
    });
  } catch (error) {
    throw error;
  }
}
