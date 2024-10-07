"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Session } from "next-auth";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";
import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";

import { actionsEditarPresupuesto } from "@/lib/actions";
import {
  ISpPaisObten,
  ISpDepartamentoObten,
  ISpProvinciaObten,
  ISpDistritoObten,
  ISpObtenerClientes,
} from "@/lib/types";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";

import useCountryQuery from "@/hooks/tanstack-query/useCountryQuery";
import useDepartmentQuery from "@/hooks/tanstack-query/useDepartmentQuery";
import useProvinceQuery from "@/hooks/tanstack-query/useProvinceQuery";
import useDistrictQuery from "@/hooks/tanstack-query/useDistrictQuery";
import useClientQuery from "@/hooks/tanstack-query/useClientQuery";

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
  const [stateForm, formActionEditPresupuesto] = useFormState(
    (prevState: any, formData: FormData) =>
      actionsEditarPresupuesto(presupuestoId, prevState, formData),
    { isError: false, message: "" }
  );
  const [formData, setFormData] = useState({
    country: initialData.country,
    department: initialData.department,
    province: initialData.province,
    district: initialData.district,
    client: initialData.client,
    "name-user": initialData.nameUser,
    "name-presupuesto": initialData.namePresupuesto,
    jornal: initialData.jornal,
  });

  const userId = Number(session?.user?.id);

  const { data: countries, isLoading: isLoadingCountries } = useCountryQuery({
    isEnabled: true,
  });

  const { data: departments, isLoading: isLoadingDepartments } =
    useDepartmentQuery({
      idCountry: formData.country,
      isEnabled: !!formData.country,
    });

  const { data: provinces, isLoading: isLoadingProvinces } = useProvinceQuery({
    idCountry: formData.country,
    idDepartment: formData.department,
    isEnabled: !!formData.country && !!formData.department,
  });

  const { data: districts, isLoading: isLoadingDistricts } = useDistrictQuery({
    idCountry: formData.country,
    idDepartment: formData.department,
    idProvince: formData.province,
    isEnabled:
      !!formData.country && !!formData.department && !!formData.province,
  });

  const { data: clients, isLoading: isLoadingClients } = useClientQuery({
    isEnabled: true,
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (type: LoadingKeys, value: string | null) => {
    handleInputChange(type, value || "");

    if (type === "country") {
      setFormData((prev) => ({
        ...prev,
        department: "",
        province: "",
        district: "",
      }));
    } else if (type === "department") {
      setFormData((prev) => ({ ...prev, province: "", district: "" }));
    } else if (type === "province") {
      setFormData((prev) => ({ ...prev, district: "" }));
    }
  };

  const renderCombobox = (
    type: LoadingKeys,
    options: { value: string; label: string }[],
    placeholder: string,
    label: string,
    isLoading: boolean
  ) => (
    <div className="sm:col-span-3">
      <Label className="text-sm w-20 truncate">{label}</Label>
      <ComboboxSingleSelection
        options={options}
        onSelect={(value) => handleSelectChange(type, value)}
        placeholder={placeholder}
        disabled={!options.length || isLoading}
        value={formData[type]}
      />
      {isLoading && (
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {`Cargando ${label.toLowerCase()}...`}
        </div>
      )}
    </div>
  );

  const handleSubmit = () => {
    const formDataToSubmit = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, String(value));
    });

    formActionEditPresupuesto(formDataToSubmit);
  };

  return (
    <form
      action={handleSubmit}
      className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Nombre usuario</Label>
        <Input
          type="text"
          name="name-user"
          required
          readOnly
          value={formData["name-user"]}
        />
      </div>
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Nombre del proyecto</Label>
        <Input
          type="text"
          name="name-presupuesto"
          required
          value={formData["name-presupuesto"]}
          onChange={(e) =>
            handleInputChange("name-presupuesto", e.target.value)
          }
        />
      </div>
      {renderCombobox(
        "country",
        countries?.map((country: ISpPaisObten) => ({
          value: String(country.pai_id),
          label: country.pai_nombre,
        })) || [],
        "Seleccione un país",
        "País",
        isLoadingCountries
      )}
      {renderCombobox(
        "department",
        departments?.map((department: ISpDepartamentoObten) => ({
          value: String(department.dep_id),
          label: department.dep_nombre,
        })) || [],
        "Seleccione un departamento",
        "Departamento",
        isLoadingDepartments
      )}
      {renderCombobox(
        "province",
        provinces?.map((province: ISpProvinciaObten) => ({
          value: String(province.prov_id),
          label: province.prov_nombre,
        })) || [],
        "Seleccione una provincia",
        "Provincia",
        isLoadingProvinces
      )}
      {renderCombobox(
        "district",
        districts?.map((district: ISpDistritoObten) => ({
          value: String(district.dist_id),
          label: district.dist_nombre,
        })) || [],
        "Seleccione un distrito",
        "Distrito",
        isLoadingDistricts
      )}
      {renderCombobox(
        "client",
        clients?.map((item: ISpObtenerClientes) => ({
          value: item.cli_nomaperazsocial,
          label: item.cli_nomaperazsocial,
        })) || [],
        "Seleccione un cliente",
        "Cliente",
        isLoadingClients
      )}
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Jornal</Label>
        <Input
          type="number"
          name="jornal"
          required
          value={formData.jornal}
          onChange={(e) => handleInputChange("jornal", e.target.value)}
        />
      </div>
      <div className="col-span-full">
        <SubmitFormButtonComponent
          disabled={!districts || districts.length === 0}
          name="Editar"
          nameLoading="Editando..."
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm?.message && <ErrorMessage message={stateForm?.message} />}
      </div>
    </form>
  );
}
