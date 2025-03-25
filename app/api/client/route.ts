import { auth } from "@/auth";
import { obtenerClientes } from "@/lib/services/sql-queries";
import { NextResponse } from "next/server";

export const POST: any = auth(async function POST(request) {
	try {
		if (!request.auth) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
		const clients = await obtenerClientes();
		return NextResponse.json(clients);
	} catch (error) {
		return NextResponse.json(
			{ error: "Error fetching clients" },
			{ status: 500 },
		);
	}
});
