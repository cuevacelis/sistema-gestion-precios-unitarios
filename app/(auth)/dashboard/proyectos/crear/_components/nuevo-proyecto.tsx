"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  actionsCrearPresupuesto,
  actionsObtenerCountries,
  actionsObtenerDepartments,
  actionsObtenerDistricts,
  actionsObtenerProvinces,
} from "@/lib/actions";
import {
  ISpDepartamentoObten,
  ISpDistritoObten,
  ISpObtenerClientes,
  ISpPaisObten,
  ISpProvinciaObten,
} from "@/lib/types";
import { Session } from "next-auth";
import { useFormState } from "react-dom";
import SubmitButtonComponent from "./button-submit";
import { useEffect, useState, useTransition } from "react";
import ErrorMessage from "@/components/validation/message/error-message";
import { Loader2 } from "lucide-react";

interface INuevoProyecto {
  dataClientes: ISpObtenerClientes[];
  session: Session | null;
}

export default function NuevoProyectoPage(props: INuevoProyecto) {
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
    "name-user": props.session?.user?.name || "",
    "name-presupuesto": "",
    jornal: "",
  });

  const [countries, setCountries] = useState<ISpPaisObten[]>([]);
  const [departments, setDepartments] = useState<ISpDepartamentoObten[]>([]);
  const [provinces, setProvinces] = useState<ISpProvinciaObten[]>([]);
  const [districts, setDistricts] = useState<ISpDistritoObten[]>([]);

  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const { dataCountries } = await actionsObtenerCountries();
      if (dataCountries) {
        setCountries(dataCountries);
      }
    };

    fetchCountries();
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = async (type: string, value: string) => {
    setFormData((prev) => ({ ...prev, [type]: value }));

    if (type === "country") {
      setDepartments([]);
      setProvinces([]);
      setDistricts([]);
      setIsLoadingDepartments(true);
      try {
        const { dataDepartments } = await actionsObtenerDepartments(
          Number(value)
        );
        if (dataDepartments) {
          setDepartments(dataDepartments);
        }
      } finally {
        setIsLoadingDepartments(false);
      }
    } else if (type === "department") {
      setProvinces([]);
      setDistricts([]);
      setIsLoadingProvinces(true);
      try {
        const { dataProvinces } = await actionsObtenerProvinces(
          Number(formData.country),
          Number(value)
        );
        if (dataProvinces) {
          setProvinces(dataProvinces);
        }
      } finally {
        setIsLoadingProvinces(false);
      }
    } else if (type === "province") {
      setDistricts([]);
      setIsLoadingDistricts(true);
      try {
        const { dataDistricts } = await actionsObtenerDistricts(
          Number(formData.country),
          Number(formData.department),
          Number(value)
        );
        if (dataDistricts) {
          setDistricts(dataDistricts);
        }
      } finally {
        setIsLoadingDistricts(false);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSubmit.append(key, String(value));
        });
        formActionNewPresupuesto(formDataToSubmit);
      }}
      className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className="col-span-full">
        <SubmitButtonComponent />
      </div>
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Nombre usuario</Label>
        <Input
          type="text"
          name="name-user"
          readOnly
          value={formData["name-user"]}
        />
      </div>
      <div className="sm:col-span-3">
        <label className="text-sm w-20 truncate">Nombre del presupuesto</label>
        <Input
          type="text"
          name="name-presupuesto"
          value={formData["name-presupuesto"]}
          onChange={(e) =>
            handleInputChange("name-presupuesto", e.target.value)
          }
        />
      </div>
      <div className="sm:col-span-3">
        <label className="text-sm w-20 truncate">País</label>
        <Select onValueChange={(value) => handleSelectChange("country", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un país" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {countries.map((country) => (
                <SelectItem key={country.pai_id} value={String(country.pai_id)}>
                  {country.pai_nombre}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="sm:col-span-3">
        <label className="text-sm w-20 truncate">Departamento</label>
        <Select
          onValueChange={(value) => handleSelectChange("department", value)}
          disabled={!departments.length || isLoadingDepartments}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {departments.map((department) => (
                <SelectItem
                  key={department.dep_id}
                  value={String(department.dep_id)}
                >
                  {department.dep_nombre}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {isLoadingDepartments && (
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Cargando departamentos...
          </div>
        )}
      </div>
      <div className="sm:col-span-3">
        <label className="text-sm w-20 truncate">Provincia</label>
        <Select
          onValueChange={(value) => handleSelectChange("province", value)}
          disabled={!provinces.length || isLoadingProvinces}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione una provincia" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {provinces.map((province) => (
                <SelectItem
                  key={province.prov_id}
                  value={String(province.prov_id)}
                >
                  {province.prov_nombre}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {isLoadingProvinces && (
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Cargando provincias...
          </div>
        )}
      </div>
      <div className="sm:col-span-3">
        <label className="text-sm w-20 truncate">Distrito</label>
        <Select
          onValueChange={(value) => handleSelectChange("district", value)}
          disabled={!districts.length || isLoadingDistricts}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un distrito" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {districts.map((district) => (
                <SelectItem
                  key={district.dist_id}
                  value={String(district.dist_id)}
                >
                  {district.dist_nombre}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {isLoadingDistricts && (
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Cargando distritos...
          </div>
        )}
      </div>
      <div className="sm:col-span-3">
        <label className="text-sm w-20 truncate">Cliente</label>
        <Select onValueChange={(value) => handleSelectChange("client", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un cliente" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {props.dataClientes.map((item) => (
                <SelectItem
                  key={item.cli_nomaperazsocial}
                  value={item.cli_nomaperazsocial}
                >
                  {item.cli_nomaperazsocial}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="sm:col-span-3">
        <label className="text-sm w-20 truncate">Jornal</label>
        <Input
          type="number"
          name="jornal"
          value={formData.jornal}
          onChange={(e) => handleInputChange("jornal", e.target.value)}
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm.message && <ErrorMessage message={stateForm?.message} />}
      </div>
    </form>
  );
}
