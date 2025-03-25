"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";
import { useActionState, useState } from "react";

import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import ContainerInput from "@/components/ui/container-input";
import { actionsCrearUsuario } from "@/lib/actions/actions";
import type { obtenerRoles } from "@/lib/services/sql-queries";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Form from "next/form";

interface ICrearUsuario {
	dataRoles: Awaited<ReturnType<typeof obtenerRoles>>;
}

export default function CrearUsuario({ dataRoles }: ICrearUsuario) {
	const [isVisiblePass, setIsVisiblePass] = useState<boolean>(false);
	const [stateForm, formActionNewUsuario, isPending] = useActionState(
		actionsCrearUsuario,
		{
			isError: false,
			message: "",
		},
	);
	const [formDataExtra, setFormDataExtra] = useState({
		idUsuario: null as string | null,
		rol: "",
	});

	const handleSubmit = (formData: FormData) => {
		Object.entries(formDataExtra).forEach(([key, value]) => {
			formData.append(key, String(value));
		});

		formActionNewUsuario(formData);
	};

	const handleSelectChange = (
		value: string | null,
		type: keyof typeof formDataExtra,
	) => {
		setFormDataExtra((prev) => ({ ...prev, [type]: value }));
	};

	return (
		<Form
			action={handleSubmit}
			className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
		>
			<div className="sm:col-span-3">
				<Label className="text-sm w-20 truncate">Correo electrónico</Label>
				<Input type="text" name="correo" required />
			</div>

			<div className="sm:col-span-3">
				<Label htmlFor="clave-new-user">Clave</Label>
				<div className="relative">
					<Input
						id="clave-new-user"
						name="clave"
						autoComplete="off"
						type={isVisiblePass ? "text" : "password"}
						className="pr-10"
						placeholder="Ingresa una contraseña."
						required
					/>
					<button
						type="button"
						className="absolute inset-y-0 right-0 flex items-center pr-3"
						onClick={() => setIsVisiblePass(!isVisiblePass)}
					>
						{isVisiblePass ? (
							<EyeOffIcon className="h-5 w-5 text-gray-500" />
						) : (
							<EyeIcon className="h-5 w-5 text-gray-500" />
						)}
					</button>
				</div>
			</div>

			<div className="sm:col-span-3">
				<Label className="text-sm w-20 truncate">Nombre</Label>
				<Input type="text" name="nombre" required />
			</div>

			<ContainerInput
				nameLabel="Rol"
				htmlFor="rol"
				icon="user"
				className="col-span-3"
			>
				<div className="flex flex-col w-full">
					<ComboboxSingleSelection
						className="bg-secondary"
						options={dataRoles.map((item) => ({
							value: String(item.rol_id),
							label: item.rol_nombre,
						}))}
						onSelect={(value) => handleSelectChange(value, "rol")}
						disabled={false}
						value={formDataExtra.rol}
					/>
				</div>
			</ContainerInput>

			<div className="col-span-full">
				<SubmitFormButtonComponent
					isPending={isPending}
					name="Crear usuario"
					nameLoading="Creando..."
				/>
			</div>
			<div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
				{stateForm?.message && <ErrorMessage message={stateForm?.message} />}
			</div>
		</Form>
	);
}
