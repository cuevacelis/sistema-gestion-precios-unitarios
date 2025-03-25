"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputUserComponent() {
	return (
		<div className="grid gap-2">
			<Label htmlFor="email">Correo electrónico</Label>
			<Input
				id="email"
				name="email"
				type="email"
				autoComplete="username"
				placeholder="Ingresa tu correo electrónico."
				required
			/>
		</div>
	);
}
