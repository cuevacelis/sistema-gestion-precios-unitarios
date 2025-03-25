import { auth } from "@/auth";
import { obtenerDistricts } from "@/lib/services/sql-queries";
import { NextResponse } from "next/server";

export const POST: any = auth(async function POST(request) {
	try {
		if (!request.auth) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const { idCountry, idDepartment, idProvince } = await request.json();

		if (!idCountry || !idDepartment || !idProvince) {
			return NextResponse.json(
				{ error: "idCountry, idDepartment, and idProvince are required" },
				{ status: 400 },
			);
		}

		const districts = await obtenerDistricts(
			Number(idCountry),
			Number(idDepartment),
			Number(idProvince),
		);
		return NextResponse.json(districts);
	} catch (error) {
		return NextResponse.json(
			{ error: "Error fetching districts" },
			{ status: 500 },
		);
	}
});
