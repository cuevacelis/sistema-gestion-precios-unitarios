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

interface INuevoProyecto {
  dataClientes: ISpObtenerClientes[];
  session: Session | null;
}

export default function NuevoProyectoPage(props: INuevoProyecto) {
  const [stateForm, formActionNewPresupuesto] = useFormState(
    actionsCrearPresupuesto,
    { isError: false, message: "" }
  );

  const [countries, setCountries] = useState<ISpPaisObten[]>([]);
  const [departments, setDepartments] = useState<ISpDepartamentoObten[]>([]);
  const [provinces, setProvinces] = useState<ISpProvinciaObten[]>([]);
  const [districts, setDistricts] = useState<ISpDistritoObten[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [_selectedProvince, setSelectedProvince] = useState<string | null>(
    null
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchCountries = async () => {
      const { dataCountries } = await actionsObtenerCountries();

      // Verifica si dataCountries no es undefined antes de asignarlo al estado
      if (dataCountries) {
        setCountries(dataCountries);
      }
    };

    fetchCountries();
  }, []);
  const handleSelectChange = async (type: string, value: string) => {
    startTransition(async () => {
      if (type === "country") {
        setSelectedCountry(value);
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
        setSelectedDepartment(value);
        setProvinces([]);
        setDistricts([]);

        const { dataProvinces } = await actionsObtenerProvinces(
          Number(selectedCountry),
          Number(value)
        );
        if (dataProvinces) {
          setProvinces(dataProvinces);
        }
      } else if (type === "province") {
        setSelectedProvince(value);
        setDistricts([]);

        const { dataDistricts } = await actionsObtenerDistricts(
          Number(selectedCountry),
          Number(selectedDepartment),
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
      action={formActionNewPresupuesto}
      className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className="col-span-full">
        {/* <Label htmlFor="code">Código</Label>
        <Badge variant={"secondary"}>
          {Number(props.lastPresupuesto?[0].Pre_Id) + 1}
        </Badge> */}
        <SubmitButtonComponent />
      </div>
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Nombre usuario</Label>
        <Input
          type="text"
          name="name-user"
          readOnly
          value={String(props.session?.user?.name)}
        />
      </div>
      <div className="sm:col-span-3">
        <label className="text-sm w-20 truncate">Nombre</label>
        <Input type="text" name="name" />
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
          disabled={!departments.length || isPending}
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
      </div>
      <div className="sm:col-span-3">
        <label className="text-sm w-20 truncate">Provincia</label>
        <Select
          onValueChange={(value) => handleSelectChange("province", value)}
          disabled={!provinces.length || isPending}
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
      </div>
      <div className="sm:col-span-3">
        <label className="text-sm w-20 truncate">Distrito</label>
        <Select
          onValueChange={(value) => handleSelectChange("district", value)}
          disabled={!districts.length || isPending}
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
        <Input type="number" name="jornal" />
      </div>
      <div aria-live="polite" aria-atomic="true">
        {stateForm.message ? (
          <p className="mt-2 text-sm text-destructive">{stateForm.message}</p>
        ) : null}
      </div>
    </form>
  );
}
