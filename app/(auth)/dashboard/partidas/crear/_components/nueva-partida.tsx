"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";
import { useActionState, useState } from "react";

import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ContainerInput from "@/components/ui/container-input";
import { actionsCrearPartida } from "@/lib/actions/actions";
import type {
	obtenerGruposDePartidas,
	obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

interface INuevoPartida {
	dataGruposDePartidas: Awaited<ReturnType<typeof obtenerGruposDePartidas>>;
	dataUnidadesDeMedida: Awaited<ReturnType<typeof obtenerUnidadesDeMedida>>;
}

export default function NuevoPartida({
	dataGruposDePartidas,
	dataUnidadesDeMedida,
}: INuevoPartida) {
	const searchParams = useSearchParams();
	const grupoPartidaId = searchParams.get("grupoPartidaId");
	const [stateForm, formActionNewPartida, isPending] = useActionState(
		actionsCrearPartida,
		{
			isError: false,
			message: "",
		},
	);
	const [formDataExtra, setFormDataExtra] = useState({
		idGrupoPartida: grupoPartidaId,
		unidadMedida: null as string | null,
	});

	const handleSubmit = (formData: FormData) => {
		Object.entries(formDataExtra).forEach(([key, value]) => {
			formData.append(key, value || "");
		});

		formActionNewPartida(formData);
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
			<div className="col-span-6">
				<Alert className="border-blue-200 dark:border-blue-800">
					<InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
					<AlertTitle className="text-blue-800 dark:text-blue-200">
						Nota
					</AlertTitle>
					<AlertDescription className="text-blue-700 dark:text-blue-300">
						{grupoPartidaId ? (
							<>
								Esta sera la nueva partida, del grupo de partida: &quot;
								<span>
									{
										dataGruposDePartidas.find(
											(e) => String(e.grupar_id) === grupoPartidaId,
										)?.grupar_nombre
									}
								</span>
								&quot;
							</>
						) : (
							<>
								Esta sera la nueva partida del grupo de partida:{" "}
								{formDataExtra.idGrupoPartida ? (
									<span className="underline underline-offset-4">
										{
											dataGruposDePartidas.find(
												(e) =>
													String(e.grupar_id) === formDataExtra.idGrupoPartida,
											)?.grupar_nombre
										}
									</span>
								) : (
									"!Aún no se ha seleccionado un grupo de partida!"
								)}
								.
							</>
						)}
					</AlertDescription>
				</Alert>
			</div>
			{!grupoPartidaId && (
				<ContainerInput
					nameLabel="Grupo de partida:"
					htmlFor="jornal"
					icon="grupos de partida"
					className="sm:col-span-3"
				>
					<ComboboxSingleSelection
						placeholder="Seleccione un grupo de partida..."
						options={dataGruposDePartidas.map((item) => ({
							value: String(item.grupar_id),
							label: `Id: ${item.grupar_id} - Nombre: ${item.grupar_nombre}`,
						}))}
						onSelect={(value) => handleSelectChange(value, "idGrupoPartida")}
						disabled={Boolean(grupoPartidaId)}
						value={formDataExtra.idGrupoPartida}
					/>
				</ContainerInput>
			)}

			<ContainerInput
				nameLabel="Nombre de partida:"
				htmlFor="nombrePartida"
				icon="partida"
				className="col-span-full sm:col-span-3"
			>
				<Input
					type="text"
					name="nombrePartida"
					id="nombrePartida"
					required
					autoFocus
				/>
			</ContainerInput>

			<ContainerInput
				nameLabel="Rendimiento mano de obra:"
				htmlFor="rendimientoManoDeObra"
				icon="mano de obra"
				className="col-span-full sm:col-span-3"
			>
				<Input
					type="number"
					name="rendimientoManoDeObra"
					id="rendimientoManoDeObra"
					required
				/>
			</ContainerInput>

			<ContainerInput
				nameLabel="Rendimiento equipo:"
				htmlFor="rendimientoEquipo"
				icon="rendimiento de equipo"
				className="col-span-full sm:col-span-3"
			>
				<Input
					type="number"
					name="rendimientoEquipo"
					id="rendimientoEquipo"
					required
				/>
			</ContainerInput>

			<ContainerInput
				nameLabel="Unidad de medida:"
				htmlFor="unidadMedida"
				icon="unidad de medida"
				className="col-span-full sm:col-span-3"
			>
				<ComboboxSingleSelection
					placeholder="Seleccione una unidad de medida..."
					options={dataUnidadesDeMedida.map((item) => ({
						value: String(item.unimed_id),
						label: item.unimed_nombre,
					}))}
					onSelect={(value) => handleSelectChange(value, "unidadMedida")}
					disabled={false}
					value={formDataExtra.unidadMedida}
				/>
			</ContainerInput>

			<div className="col-span-full">
				<SubmitFormButtonComponent
					isPending={isPending}
					name="Crear partida"
					nameLoading="Creando..."
				/>
			</div>
			<div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
				{stateForm?.message && <ErrorMessage message={stateForm?.message} />}
			</div>
		</Form>
	);
}
