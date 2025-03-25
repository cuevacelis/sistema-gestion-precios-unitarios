import { auth } from "@/auth";
import { obtenerDepartments } from "@/lib/services/sql-queries";
import { NextResponse } from "next/server";

export const POST: any = auth(async function POST(request) {
	try {
		if (!request.auth) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
		const { idCountry } = await request.json();

		if (!idCountry) {
			return NextResponse.json(
				{ error: "idCountry is required" },
				{ status: 400 },
			);
		}

		const departments = await obtenerDepartments(Number(idCountry));
		return NextResponse.json(departments);
	} catch (error) {
		return NextResponse.json(
			{ error: "Error fetching departments" },
			{ status: 500 },
		);
	}
});
