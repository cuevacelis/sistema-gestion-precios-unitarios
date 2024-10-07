import { NextResponse } from "next/server";
import { obtenerDistricts } from "@/lib/services/sql-queries";
import { auth } from "@/auth";

export const POST = auth(async function POST(request) {
  try {
    if (!request.auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { idCountry, idDepartment, idProvince } = await request.json();

    if (!idCountry || !idDepartment || !idProvince) {
      return NextResponse.json(
        { error: "idCountry, idDepartment, and idProvince are required" },
        { status: 400 }
      );
    }

    const districts = await obtenerDistricts(
      Number(idCountry),
      Number(idDepartment),
      Number(idProvince)
    );
    return NextResponse.json(districts);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching districts" },
      { status: 500 }
    );
  }
});
