import { NextResponse } from "next/server";
import { obtenerCountries } from "@/lib/services/sql-queries";
import { auth } from "@/auth";

export const POST = auth(async function POST(request) {
  try {
    if (!request.auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const countries = await obtenerCountries();
    return NextResponse.json(countries);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching departments" },
      { status: 500 }
    );
  }
});
