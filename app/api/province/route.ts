import { NextResponse } from "next/server";
import { obtenerProvinces } from "@/lib/services/sql-queries";
import { auth } from "@/auth";

export const POST = auth(async function POST(request) {
  try {
    if (!request.auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { idCountry, idDepartment } = await request.json();

    if (!idCountry || !idDepartment) {
      return NextResponse.json(
        { error: "idCountry and idDepartment are required" },
        { status: 400 }
      );
    }

    const provinces = await obtenerProvinces(
      Number(idCountry),
      Number(idDepartment)
    );
    return NextResponse.json(provinces);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching provinces" },
      { status: 500 }
    );
  }
});
