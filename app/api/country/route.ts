import { auth } from "@/auth";
import { obtenerCountries } from "@/lib/services/sql-queries";
import { NextResponse } from "next/server";

export const POST: any = auth(async function POST(request) {
	try {
		if (!request.auth) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
		const countries = await obtenerCountries();
		return NextResponse.json(countries);
	} catch (error) {
		return NextResponse.json(
			{ error: "Error fetching departments" },
			{ status: 500 },
		);
	}
});
