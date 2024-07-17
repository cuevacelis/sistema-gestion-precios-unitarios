"use client";
import { Badge } from "@/components/ui/badge";
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
import { actionsCrearPresupuesto } from "@/lib/actions";
import { IDataDBCliente, IDataDBUbicacion } from "@/lib/types";
import { combineFormDatas } from "@/lib/utils";
import { IProcedureResult, IResult } from "mssql";
import { Session } from "next-auth";
import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButtonComponent from "./button-submit";

interface INuevoProyecto {
  dataUbicacion: IProcedureResult<IDataDBUbicacion>;
  dataClientes: IProcedureResult<IDataDBCliente>;
  lastPresupuesto: IResult<any>;
  session: Session | null;
}

export default function NuevoProyectoPage(props: INuevoProyecto) {
  const [formDataController, setFormDataController] = useState({
    departamento: "",
    provincia: "",
    distrito: "",
    client: "",
  });

  const [provincias, setProvincias] = useState<string[]>([]);
  const [distritos, setDistritos] = useState<string[]>([]);

  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(actionsCrearPresupuesto, initialState);

  const uniqueDepartamentos = useMemo(() => {
    return [
      ...new Set(
        props.dataUbicacion.recordset.map((item) => item.Ubi_Departamento)
      ),
    ];
  }, [props.dataUbicacion.recordset]);

  useEffect(() => {
    if (formDataController.departamento) {
      const filteredProvincias = props.dataUbicacion.recordset
        .filter(
          (item) => item.Ubi_Departamento === formDataController.departamento
        )
        .map((item) => item.Ubi_Provincia);
      setProvincias([...new Set(filteredProvincias)]);
      setDistritos([]);
    } else {
      setProvincias([]);
      setDistritos([]);
    }
  }, [formDataController.departamento, props.dataUbicacion.recordset]);

  useEffect(() => {
    if (formDataController.provincia) {
      const filteredDistritos = props.dataUbicacion.recordset
        .filter((item) => item.Ubi_Provincia === formDataController.provincia)
        .map((item) => item.Ubi_Distrito);
      setDistritos([...new Set(filteredDistritos)]);
    } else {
      setDistritos([]);
    }
  }, [formDataController.provincia, props.dataUbicacion.recordset]);

  const handleSelectChange = (name: string, value: string) => {
    setFormDataController((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      action={async (formData: FormData) => {
        const formData2 = new FormData();
        for (const [key, value] of Object.entries(formDataController)) {
          formData2.append(key, String(value));
        }
        const combinedData = combineFormDatas(formData, formData2);
        dispatch(combinedData);
      }}
      className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className="col-span-full">
        <Label htmlFor="code">Código</Label>
        <Badge variant={"secondary"}>
          {Number(props.lastPresupuesto?.recordset[0].Pre_Id) + 1}
        </Badge>
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
        <label className="text-sm w-20 truncate">Departamento</label>
        <Select
          onValueChange={(value) => handleSelectChange("departamento", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {uniqueDepartamentos.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="sm:col-span-3">
        <label className="text-sm w-20 truncate">Provincia</label>
        <Select
          onValueChange={(value) => handleSelectChange("provincia", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione provincia" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {provincias.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="sm:col-span-3">
        <label className="text-sm w-20 truncate">Distrito</label>
        <Select
          onValueChange={(value) => handleSelectChange("distrito", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione distrito" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {distritos.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
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
              {props.dataClientes.recordset.map((item) => (
                <SelectItem
                  key={item.Cli_NomApeRazSocial}
                  value={item.Cli_NomApeRazSocial}
                >
                  {item.Cli_NomApeRazSocial}
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
        {state.message ? (
          <p className="mt-2 text-sm text-destructive">{state.message}</p>
        ) : null}
      </div>
    </form>
  );
}
