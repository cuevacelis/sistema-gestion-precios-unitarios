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
  actionsEditarPresupuesto,
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

interface IEditarPresupuesto {
  dataClientes: ISpObtenerClientes[];
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

export default function EditarPresupuestoPage(props: IEditarPresupuesto) {
  const [stateForm, formActionEditPresupuesto] = useFormState(
    (prevState: any, formData: FormData) =>
      actionsEditarPresupuesto(props.presupuestoId, prevState, formData),
    { isError: false, message: "" }
  );

  const [formData, setFormData] = useState({
    country: props.initialData.country,
    department: props.initialData.department,
    province: props.initialData.province,
    district: props.initialData.district,
    client: props.initialData.client,
    "name-user": props.initialData.nameUser,
    "name-presupuesto": props.initialData.namePresupuesto,
    jornal: props.initialData.jornal,
  });

  const [countries, setCountries] = useState<ISpPaisObten[]>([]);
  const [departments, setDepartments] = useState<ISpDepartamentoObten[]>([]);
  const [provinces, setProvinces] = useState<ISpProvinciaObten[]>([]);
  const [districts, setDistricts] = useState<ISpDistritoObten[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchInitialData = async () => {
      const { dataCountries } = await actionsObtenerCountries();
      if (dataCountries) {
        setCountries(dataCountries);
      }

      if (formData.country) {
        const { dataDepartments } = await actionsObtenerDepartments(
          Number(formData.country)
        );
        if (dataDepartments) {
          setDepartments(dataDepartments);
        }
      }

      if (formData.country && formData.department) {
        const { dataProvinces } = await actionsObtenerProvinces(
          Number(formData.country),
          Number(formData.department)
        );
        if (dataProvinces) {
          setProvinces(dataProvinces);
        }
      }

      if (formData.country && formData.department && formData.province) {
        const { dataDistricts } = await actionsObtenerDistricts(
          Number(formData.country),
          Number(formData.department),
          Number(formData.province)
        );
        if (dataDistricts) {
          setDistricts(dataDistricts);
        }
      }
    };

    fetchInitialData();
  }, [formData.country, formData.department, formData.province]);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = async (type: string, value: string) => {
    startTransition(async () => {
      setFormData((prev) => ({ ...prev, [type]: value }));

      if (type === "country") {
        setDepartments([]);
        setProvinces([]);
        setDistricts([]);
        const { dataDepartments } = await actionsObtenerDepartments(
          Number(value)
        );
        if (dataDepartments) {
          setDepartments(dataDepartments);
        }
      } else if (type === "department") {
        setProvinces([]);
        setDistricts([]);
        const { dataProvinces } = await actionsObtenerProvinces(
          Number(formData.country),
          Number(value)
        );
        if (dataProvinces) {
          setProvinces(dataProvinces);
        }
      } else if (type === "province") {
        setDistricts([]);
        const { dataDistricts } = await actionsObtenerDistricts(
          Number(formData.country),
          Number(formData.department),
          Number(value)
        );
        if (dataDistricts) {
          setDistricts(dataDistricts);
        }
      }
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSubmit.append(key, String(value));
        });
        formActionEditPresupuesto(formDataToSubmit);
      }}
      className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className="col-span-full">
        <SubmitButtonComponent />
      </div>
      <div className="sm:col-span-3">
        <Label htmlFor="name-user" className="text-sm w-20 truncate">
          Nombre usuario
        </Label>
        <Input
          id="name-user"
          type="text"
          name="name-user"
          readOnly
          value={formData["name-user"]}
        />
      </div>
      <div className="sm:col-span-3">
        <Label htmlFor="name-presupuesto" className="text-sm w-20 truncate">
          Nombre del presupuesto
        </Label>
        <Input
          id="name-presupuesto"
          type="text"
          name="name-presupuesto"
          value={formData["name-presupuesto"]}
          onChange={(e) =>
            handleInputChange("name-presupuesto", e.target.value)
          }
        />
      </div>
      <div className="sm:col-span-3">
        <Label htmlFor="country" className="text-sm w-20 truncate">
          País
        </Label>
        <Select
          onValueChange={(value) => handleSelectChange("country", value)}
          value={formData.country}
        >
          <SelectTrigger id="country">
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
        <Label htmlFor="department" className="text-sm w-20 truncate">
          Departamento
        </Label>
        <Select
          onValueChange={(value) => handleSelectChange("department", value)}
          disabled={!departments.length || isPending}
          value={formData.department}
        >
          <SelectTrigger id="department">
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
      </div>
      <div className="sm:col-span-3">
        <Label htmlFor="province" className="text-sm w-20 truncate">
          Provincia
        </Label>
        <Select
          onValueChange={(value) => handleSelectChange("province", value)}
          disabled={!provinces.length || isPending}
          value={formData.province}
        >
          <SelectTrigger id="province">
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
      </div>
      <div className="sm:col-span-3">
        <Label htmlFor="district" className="text-sm w-20 truncate">
          Distrito
        </Label>
        <Select
          onValueChange={(value) => handleSelectChange("district", value)}
          disabled={!districts.length || isPending}
          value={formData.district}
        >
          <SelectTrigger id="district">
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
      </div>
      <div className="sm:col-span-3">
        <Label htmlFor="client" className="text-sm w-20 truncate">
          Cliente
        </Label>
        <Select
          onValueChange={(value) => handleSelectChange("client", value)}
          value={formData.client}
        >
          <SelectTrigger id="client">
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
        <Label htmlFor="jornal" className="text-sm w-20 truncate">
          Jornal
        </Label>
        <Input
          id="jornal"
          type="number"
          name="jornal"
          value={formData.jornal}
          onChange={(e) => handleInputChange("jornal", e.target.value)}
        />
      </div>
      <div aria-live="polite" aria-atomic="true" className="col-span-full">
        {stateForm.message && (
          <p className="mt-2 text-sm text-destructive">{stateForm.message}</p>
        )}
      </div>
    </form>
  );
}
