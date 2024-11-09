import { NextResponse } from "next/server";
import {
  obtenerDepartments,
  obtenerPartidaById,
} from "@/lib/services/sql-queries";
import { auth } from "@/auth";

export const POST: any = auth(async function POST(request) {
  try {
    if (!request.auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { idPartida } = await request.json();

    if (!idPartida) {
      return NextResponse.json(
        { error: "idPartida is required" },
        { status: 400 }
      );
    }

    const partida = await obtenerPartidaById(Number(idPartida));
    return NextResponse.json(partida);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching partida" },
      { status: 500 }
    );
  }
});
