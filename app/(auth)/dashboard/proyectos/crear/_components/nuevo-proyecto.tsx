"use client";

import { Info, Loader2, Plus } from "lucide-react";
import type { Session } from "next-auth";
import { useActionState, useState } from "react";

import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";

import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import { Button } from "@/components/ui/button";
import ContainerInput from "@/components/ui/container-input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import useClientQuery from "@/hooks/tanstack-query/useClientQuery";
import useCountryQuery from "@/hooks/tanstack-query/useCountryQuery";
import useDepartmentQuery from "@/hooks/tanstack-query/useDepartmentQuery";
import useDistrictQuery from "@/hooks/tanstack-query/useDistrictQuery";
import useProvinceQuery from "@/hooks/tanstack-query/useProvinceQuery";
import { actionsCrearPresupuesto } from "@/lib/actions/actions";
import type {
	ISpDepartamentoObten,
	ISpDistritoObten,
	ISpObtenerClientes,
	ISpPaisObten,
	ISpProvinciaObten,
} from "@/lib/types/types";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import Form from "next/form";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface INuevoProyecto {
	session: Session | null;
}

type LoadingKeys =
	| "country"
	| "department"
	| "province"
	| "district"
	| "client";

export default function NuevoProyecto({ session }: INuevoProyecto) {
	const pathname = usePathname();
	const [stateForm, formActionNewPresupuesto, isPending] = useActionState(
		actionsCrearPresupuesto,
		{ isError: false, message: "" },
	);
	const [formDataExtra, setFormDataExtra] = useState({
		country: "1",
		department: "",
		province: "",
		district: "",
		client: "",
		"name-user": session?.user?.name || "",
	});

	const { data: countries, isLoading: isLoadingCountries } = useCountryQuery({
		isEnabled: true,
	});

	const { data: departments, isLoading: isLoadingDepartments } =
		useDepartmentQuery({
			idCountry: formDataExtra.country,
			isEnabled: !!formDataExtra.country,
		});

	const { data: provinces, isLoading: isLoadingProvinces } = useProvinceQuery({
		idCountry: formDataExtra.country,
		idDepartment: formDataExtra.department,
		isEnabled: !!formDataExtra.country && !!formDataExtra.department,
	});

	const { data: districts, isLoading: isLoadingDistricts } = useDistrictQuery({
		idCountry: formDataExtra.country,
		idDepartment: formDataExtra.department,
		idProvince: formDataExtra.province,
		isEnabled:
			!!formDataExtra.country &&
			!!formDataExtra.department &&
			!!formDataExtra.province,
	});

	const { data: clients, isLoading: isLoadingClients } = useClientQuery({
		isEnabled: true,
	});

	const handleInputChange = (name: string, value: string) => {
		setFormDataExtra((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (type: LoadingKeys, value: string | null) => {
		handleInputChange(type, value || "");

		if (type === "country") {
			setFormDataExtra((prev) => ({
				...prev,
				department: "",
				province: "",
				district: "",
			}));
		} else if (type === "department") {
			setFormDataExtra((prev) => ({ ...prev, province: "", district: "" }));
		} else if (type === "province") {
			setFormDataExtra((prev) => ({ ...prev, district: "" }));
		}
	};

	const renderCombobox = (
		type: LoadingKeys,
		options: { value: string; label: string }[],
		placeholder: string,
		label: string,
		isLoading: boolean,
		icon?: string,
		messageEmpty?: React.ReactNode,
		labelReactNode?: React.ReactNode,
		moreInfo?: React.ReactNode,
	) => (
		<ContainerInput
			nameLabel={labelReactNode || label}
			htmlFor=""
			icon={icon}
			className="col-span-3"
		>
			<div className="flex flex-col w-full">
				<div className="flex items-center gap-2">
					<ComboboxSingleSelection
						className="bg-secondary"
						options={options}
						onSelect={(value) => handleSelectChange(type, value)}
						placeholder={placeholder}
						disabled={isLoading || isPending}
						value={formDataExtra[type]}
						messageEmpty={messageEmpty}
					/>
					{moreInfo}
				</div>
				{isLoading && (
					<div className="mt-2 flex items-center text-sm text-muted-foreground">
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						{`Cargando ${label.toLowerCase()}...`}
					</div>
				)}
			</div>
		</ContainerInput>
	);

	const handleSubmit = (formData: FormData) => {
		Object.entries(formDataExtra).forEach(([key, value]) => {
			formData.append(key, String(value));
		});

		formActionNewPresupuesto(formData);
	};

	return (
		<Form
			action={handleSubmit}
			className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
		>
			<ContainerInput
				nameLabel="Nombre usuario"
				htmlFor="name-user"
				icon="usuario"
				className="col-span-3"
			>
				<Input
					type="text"
					id="name-user"
					className="bg-secondary"
					readOnly
					disabled
					value={formDataExtra["name-user"]}
				/>
			</ContainerInput>
			{renderCombobox(
				"client",
				clients?.map((item: ISpObtenerClientes) => ({
					value: item.cli_nomaperazsocial,
					label: item.cli_nomaperazsocial,
				})) || [],
				"Seleccione un cliente",
				"Cliente",
				isLoadingClients,
				"cliente",
				<section className="flex flex-col gap-2 items-center">
					No se encontró ningún cliente.
					<br />
					<Link
						href={`/dashboard/clientes/crear?returnUrl=${encodeURIComponent(pathname)}`}
						className="underline underline-offset-4 flex items-center"
					>
						<ModuleIconsComponent
							className="mr-2 h-4 w-4 flex-shrink-0"
							modNombre="Cliente"
						/>
						Crear cliente +
					</Link>
				</section>,
				null,
				<TooltipProvider delayDuration={200}>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button asChild variant="secondary" size="sm">
								<Link
									href={`/dashboard/clientes/crear?returnUrl=${encodeURIComponent(pathname)}`}
								>
									<Plus className="size-4" />
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<TooltipArrow className="fill-primary" />
							<p>Agregar un nuevo cliente</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>,
			)}
			<ContainerInput
				nameLabel="Nombre del proyecto"
				htmlFor="name-presupuesto"
				icon="proyecto"
				className="col-span-full"
			>
				<Input
					type="text"
					id="name-presupuesto"
					name="name-presupuesto"
					className="bg-secondary"
					required
					autoFocus
					disabled={isPending}
				/>
			</ContainerInput>
			{renderCombobox(
				"country",
				countries?.map((country: ISpPaisObten) => ({
					value: String(country.pai_id),
					label: country.pai_nombre,
				})) || [],
				"Seleccione un país",
				"País",
				isLoadingCountries,
				"ubicacion",
				"No se encontró ningún país.",
			)}
			{renderCombobox(
				"department",
				departments?.map((department: ISpDepartamentoObten) => ({
					value: String(department.dep_id),
					label: department.dep_nombre,
				})) || [],
				"Seleccione un departamento",
				"Departamento",
				isLoadingDepartments,
				"ubicacion",
				formDataExtra.country !== ""
					? "No se encontró ningún departamento."
					: "Por favor, seleccione un país.",
			)}
			{renderCombobox(
				"province",
				provinces?.map((province: ISpProvinciaObten) => ({
					value: String(province.prov_id),
					label: province.prov_nombre,
				})) || [],
				"Seleccione una provincia",
				"Provincia",
				isLoadingProvinces,
				"ubicacion",
				formDataExtra.department !== ""
					? "No se encontró ningún provincia."
					: "Por favor, seleccione un departamento.",
			)}
			{renderCombobox(
				"district",
				districts?.map((district: ISpDistritoObten) => ({
					value: String(district.dist_id),
					label: district.dist_nombre,
				})) || [],
				"Seleccione un distrito",
				"Distrito",
				isLoadingDistricts,
				"ubicacion",
				formDataExtra.province !== ""
					? "No se encontró ningún distrito."
					: "Por favor, seleccione una provincia.",
			)}
			<ContainerInput
				nameLabel={
					<section className="flex flex-row items-center gap-1">
						<span>Jornal</span>
						<Info className="h-3 w-3 text-yellow-400" />
					</section>
				}
				htmlFor="jornal"
				icon="jornal"
				tooltip="El número de horas que se trabajará en el proyecto."
				className="col-span-3"
			>
				<Input
					type="number"
					id="jornal"
					name="jornal"
					className="bg-secondary"
					defaultValue={8}
					required
					disabled={isPending}
				/>
			</ContainerInput>
			<div className="col-span-full">
				<SubmitFormButtonComponent
					isPending={isPending}
					name="Crear proyecto"
					nameLoading="Creando..."
				/>
			</div>
			<div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
				{stateForm?.message && <ErrorMessage message={stateForm?.message} />}
			</div>
		</Form>
	);
}
