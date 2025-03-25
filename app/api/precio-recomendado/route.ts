import { auth } from "@/auth";
import { obtenerPreciosRecomendadosByNombreAndDepartamento } from "@/lib/services/sql-queries";
import { NextResponse } from "next/server";

export const POST: any = auth(async function POST(request) {
	try {
		if (!request.auth) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
		const { idDepartament, nombreRecurso } = await request.json();

		if (!idDepartament || !nombreRecurso) {
			return NextResponse.json(
				{ error: "idDepartament and nombreRecurso are required" },
				{ status: 400 },
			);
		}

		const precioRecomendado =
			await obtenerPreciosRecomendadosByNombreAndDepartamento(
				String(nombreRecurso),
				Number(idDepartament),
			);
		return NextResponse.json(precioRecomendado);
	} catch (error) {
		return NextResponse.json(
			{ error: "Error fetching precios recomendados" },
			{ status: 500 },
		);
	}
});
