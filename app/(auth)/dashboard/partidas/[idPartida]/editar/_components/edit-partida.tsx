"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";
import { useActionState, useState } from "react";

import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import ContainerInput from "@/components/ui/container-input";
import { actionsEditarPartida } from "@/lib/actions/actions";
import type {
	obtenerGruposDePartidas,
	obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";
import type { IDataDBObtenerPartidasPaginados } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

interface IEditarPartida {
	dataPartida: IDataDBObtenerPartidasPaginados;
	dataGruposDePartidas: Awaited<ReturnType<typeof obtenerGruposDePartidas>>;
	dataUnidadesDeMedida: Awaited<ReturnType<typeof obtenerUnidadesDeMedida>>;
}

export default function EditarPartida({
	dataPartida,
	dataGruposDePartidas,
	dataUnidadesDeMedida,
}: IEditarPartida) {
	const [stateForm, formActionNewPartida, isPending] = useActionState(
		actionsEditarPartida,
		{
			isError: false,
			message: "",
		},
	);
	const [formDataExtra, setFormDataExtra] = useState({
		idPartida: dataPartida.par_id,
		unidadMedida: String(dataPartida.unimed_id),
	});

	const handleSubmit = (formData: FormData) => {
		Object.entries(formDataExtra).forEach(([key, value]) => {
			formData.append(key, String(value));
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
			<ContainerInput
				nameLabel="Nombre de partida:"
				htmlFor="nombrePartida"
				icon="partida"
				className="col-span-full sm:col-span-3"
			>
				<Input
					type="text"
					name="nombrePartida"
					required
					defaultValue={dataPartida.par_nombre}
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
					required
					defaultValue={dataPartida.par_renmanobra}
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
					required
					defaultValue={dataPartida.par_renequipo}
				/>
			</ContainerInput>

			<ContainerInput
				nameLabel="Unidad de medida:"
				htmlFor="unidadMedida"
				icon="unidad de medida"
				className="col-span-full sm:col-span-3"
			>
				<ComboboxSingleSelection
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
					name="Editar partida"
					nameLoading="Editando..."
				/>
			</div>
			<div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
				{stateForm?.message && <ErrorMessage message={stateForm?.message} />}
			</div>
		</Form>
	);
}
