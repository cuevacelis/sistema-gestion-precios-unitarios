"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Session } from "next-auth";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";
import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";

import {
  actionsCrearPresupuesto,
  actionsObtenerCountries,
  actionsObtenerDepartments,
  actionsObtenerProvinces,
  actionsObtenerDistricts,
} from "@/lib/actions";
import {
  ISpPaisObten,
  ISpDepartamentoObten,
  ISpProvinciaObten,
  ISpDistritoObten,
  ISpObtenerClientes,
} from "@/lib/types";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";

interface INuevoProyecto {
  dataClientes: ISpObtenerClientes[];
  session: Session | null;
}

type LoadingKeys =
  | "country"
  | "department"
  | "province"
  | "district"
  | "client";

export default function NuevoProyecto({
  dataClientes,
  session,
}: INuevoProyecto) {
  const [stateForm, formActionNewPresupuesto] = useFormState(
    actionsCrearPresupuesto,
    { isError: false, message: "" }
  );
  const [formData, setFormData] = useState({
    country: "",
    department: "",
    province: "",
    district: "",
    client: "",
    "name-user": session?.user?.name || "",
    "name-presupuesto": "",
    jornal: "",
  });

  const [locationData, setLocationData] = useState({
    country: [] as ISpPaisObten[],
    department: [] as ISpDepartamentoObten[],
    province: [] as ISpProvinciaObten[],
    district: [] as ISpDistritoObten[],
  });

  const [loading, setLoading] = useState<Record<LoadingKeys, boolean>>({
    country: true,
    department: false,
    province: false,
    district: false,
    client: false,
  });

  useEffect(() => {
    fetchData("country", actionsObtenerCountries);
  }, []);

  const fetchData = async (
    type: LoadingKeys,
    action: Function,
    ...params: number[]
  ) => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    try {
      const dataFetched = await action(...params);
      if (dataFetched) {
        setLocationData((prev) => ({
          ...prev,
          [type]: dataFetched,
        }));
      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = async (
    type: LoadingKeys,
    value: string | null
  ) => {
    handleInputChange(type, value || "");

    if (type === "country") {
      setLocationData((prev) => ({
        ...prev,
        department: [],
        province: [],
        district: [],
      }));
      setFormData((prev) => ({
        ...prev,
        department: "",
        province: "",
        district: "",
      }));
      await fetchData("department", actionsObtenerDepartments, Number(value));
    } else if (type === "department") {
      setLocationData((prev) => ({ ...prev, province: [], district: [] }));
      setFormData((prev) => ({ ...prev, province: "", district: "" }));
      await fetchData(
        "province",
        actionsObtenerProvinces,
        Number(formData.country),
        Number(value)
      );
    } else if (type === "province") {
      setLocationData((prev) => ({ ...prev, district: [] }));
      setFormData((prev) => ({ ...prev, district: "" }));
      await fetchData(
        "district",
        actionsObtenerDistricts,
        Number(formData.country),
        Number(formData.department),
        Number(value)
      );
    }
  };

  const renderCombobox = (
    type: LoadingKeys,
    options: { value: string; label: string }[],
    placeholder: string,
    label: string
  ) => (
    <div className="sm:col-span-3">
      <Label className="text-sm w-20 truncate">{label}</Label>
      <ComboboxSingleSelection
        options={options}
        onSelect={(value) => handleSelectChange(type, value)}
        placeholder={placeholder}
        disabled={!options.length || loading[type]}
        value={formData[type]}
      />
      {loading[type] && (
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

    formActionNewPresupuesto(formDataToSubmit);
  };

  return (
    <form
      action={handleSubmit}
      className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
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
          onChange={(e) =>
            handleInputChange("name-presupuesto", e.target.value)
          }
        />
      </div>
      {renderCombobox(
        "country",
        locationData.country.map((country) => ({
          value: String(country.pai_id),
          label: country.pai_nombre,
        })),
        "Seleccione un país",
        "País"
      )}
      {renderCombobox(
        "department",
        locationData.department.map((department) => ({
          value: String(department.dep_id),
          label: department.dep_nombre,
        })),
        "Seleccione un departamento",
        "Departamento"
      )}
      {renderCombobox(
        "province",
        locationData.province.map((province) => ({
          value: String(province.prov_id),
          label: province.prov_nombre,
        })),
        "Seleccione una provincia",
        "Provincia"
      )}
      {renderCombobox(
        "district",
        locationData.district.map((district) => ({
          value: String(district.dist_id),
          label: district.dist_nombre,
        })),
        "Seleccione un distrito",
        "Distrito"
      )}
      {renderCombobox(
        "client",
        dataClientes.map((item) => ({
          value: item.cli_nomaperazsocial,
          label: item.cli_nomaperazsocial,
        })),
        "Seleccione un cliente",
        "Cliente"
      )}
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Jornal</Label>
        <Input
          type="number"
          name="jornal"
          required
          onChange={(e) => handleInputChange("jornal", e.target.value)}
        />
      </div>
      <div className="col-span-full">
        <SubmitFormButtonComponent
          name="Guardar"
          nameLoading="Guardando, por favor espere..."
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm?.message && <ErrorMessage message={stateForm?.message} />}
      </div>
    </form>
  );
}
