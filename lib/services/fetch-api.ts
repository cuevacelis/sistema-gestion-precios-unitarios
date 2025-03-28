import { FetchError } from "../custom-error/fetch-error";
import type { IBodyLogin } from "../types/types";

export async function fetchLogged(params: IBodyLogin) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: params.username,
			password: params.password,
			userAgent: params.userAgent,
		}),
		cache: "no-store",
	});
	if (!res.ok) {
		throw new FetchError({
			message: `Logged: Respuesta de red OK pero respuesta HTTP no OK: ${res.status}`,
			type: res.statusText,
			options: { cause: res },
		});
	}
	return res.json();
}
