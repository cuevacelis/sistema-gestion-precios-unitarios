import { NextResponse } from "next/server";
import {
  obtenerDepartments,
  obtenerPartidaById,
  obtenerRecursos,
} from "@/lib/services/sql-queries";
import { auth } from "@/auth";

export const POST: any = auth(async function POST(request) {
  try {
    if (!request.auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const recursos = await obtenerRecursos();
    return NextResponse.json(recursos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching recursos" },
      { status: 500 }
    );
  }
});
