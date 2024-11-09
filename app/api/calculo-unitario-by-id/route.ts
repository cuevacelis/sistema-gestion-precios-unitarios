import { NextResponse } from "next/server";
import { obtenerAsignacionesRecursoToPartidaByRecurso } from "@/lib/services/sql-queries";
import { auth } from "@/auth";

export const POST: any = auth(async function POST(request) {
  try {
    if (!request.auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { idPartida, idRecurso } = await request.json();

    if (!idPartida || !idRecurso) {
      return NextResponse.json(
        { error: "idPartida and idRecurso is required" },
        { status: 400 }
      );
    }

    const verRecursosAsignadosDeUnaPartida =
      await obtenerAsignacionesRecursoToPartidaByRecurso(
        Number(idPartida),
        Number(idRecurso)
      );
    return NextResponse.json(verRecursosAsignadosDeUnaPartida);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching partida" },
      { status: 500 }
    );
  }
});
