"use client";

import { useActionState, useState } from "react";
import { Session } from "next-auth";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/validation/message/error-message";
import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";

import { actionsEditarPresupuesto } from "@/lib/actions/actions";
import {
  ISpPaisObten,
  ISpDepartamentoObten,
  ISpProvinciaObten,
  ISpDistritoObten,
  ISpObtenerClientes,
} from "@/lib/types/types";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";

import useCountryQuery from "@/hooks/tanstack-query/useCountryQuery";
import useDepartmentQuery from "@/hooks/tanstack-query/useDepartmentQuery";
import useProvinceQuery from "@/hooks/tanstack-query/useProvinceQuery";
import useDistrictQuery from "@/hooks/tanstack-query/useDistrictQuery";
import useClientQuery from "@/hooks/tanstack-query/useClientQuery";
import ContainerInput from "@/components/ui/container-input";
import Form from "next/form";

interface IEditarPresupuesto {
  session: Session | null;
  presupuestoId: string;
  initialData: {
    nameUser: string;
    namePresupuesto: string;
    country: string;
    department: string;
    province: string;
    district: string;
    client: string;
    jornal: string;
  };
}

type LoadingKeys =
  | "country"
  | "department"
  | "province"
  | "district"
  | "client";

export default function EditarProyectosPage({
  session,
  presupuestoId,
  initialData,
}: IEditarPresupuesto) {
  const [stateForm, formActionEditPresupuesto, isPending] = useActionState(
    (prevState: any, formData: FormData) =>
      actionsEditarPresupuesto(presupuestoId, prevState, formData),
    { isError: false, message: "" }
  );
  const [formDataExtra, setFormDataExtra] = useState({
    country: initialData.country,
    department: initialData.department,
    province: initialData.province,
    district: initialData.district,
    client: initialData.client,
    "name-user": initialData.nameUser,
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
    icon?: string
  ) => (
    <ContainerInput
      nameLabel={label}
      htmlFor=""
      icon={icon}
      className="col-span-3"
    >
      <div className="flex flex-col w-full">
        <ComboboxSingleSelection
          className="bg-secondary"
          options={options}
          onSelect={(value) => handleSelectChange(type, value)}
          placeholder={placeholder}
          disabled={!options.length || isLoading}
          value={formDataExtra[type]}
        />
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

    formActionEditPresupuesto(formData);
  };

  return (
    <Form
      action={handleSubmit}
      className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <ContainerInput
        nameLabel="Nombre usuario:"
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
        "cliente"
      )}
      <ContainerInput
        nameLabel="Nombre del proyecto:"
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
          defaultValue={initialData.namePresupuesto}
        />
      </ContainerInput>
      {renderCombobox(
        "country",
        countries?.map((country: ISpPaisObten) => ({
          value: String(country.pai_id),
          label: country.pai_nombre,
        })) || [],
        "Seleccione un país",
        "País:",
        isLoadingCountries,
        "ubicacion"
      )}
      {renderCombobox(
        "department",
        departments?.map((department: ISpDepartamentoObten) => ({
          value: String(department.dep_id),
          label: department.dep_nombre,
        })) || [],
        "Seleccione un departamento",
        "Departamento:",
        isLoadingDepartments,
        "ubicacion"
      )}
      {renderCombobox(
        "province",
        provinces?.map((province: ISpProvinciaObten) => ({
          value: String(province.prov_id),
          label: province.prov_nombre,
        })) || [],
        "Seleccione una provincia",
        "Provincia:",
        isLoadingProvinces,
        "ubicacion"
      )}
      {renderCombobox(
        "district",
        districts?.map((district: ISpDistritoObten) => ({
          value: String(district.dist_id),
          label: district.dist_nombre,
        })) || [],
        "Seleccione un distrito",
        "Distrito:",
        isLoadingDistricts,
        "ubicacion"
      )}
      <ContainerInput
        nameLabel="Jornal:"
        htmlFor="jornal"
        icon="jornal"
        className="col-span-3"
      >
        <Input
          type="number"
          id="jornal"
          name="jornal"
          className="bg-secondary"
          required
          defaultValue={initialData.jornal}
        />
      </ContainerInput>
      <div className="col-span-full">
        <SubmitFormButtonComponent
          isPending={isPending}
          disabled={!districts || districts.length === 0}
          name="Editar proyecto"
          nameLoading="Editando..."
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm?.message && <ErrorMessage message={stateForm?.message} />}
      </div>
    </Form>
  );
}
