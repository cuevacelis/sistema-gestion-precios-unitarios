"use client";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actionsEditarPresupuesto } from "@/lib/actions";
import {
  IDataDBCliente,
  IDataDBObtenerPresupuestosId,
  IDataDBUbicacion,
} from "@/lib/types";
import { combineFormDatas } from "@/lib/utils";
import { IProcedureResult } from "mssql";
import { Session } from "next-auth";
import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButtonComponent from "./button-submit";

interface IEditarProyecto {
  id: string;
  dataUbicacion: IProcedureResult<IDataDBUbicacion>;
  dataClientes: IProcedureResult<IDataDBCliente>;
  dataEditPresupuesto: IProcedureResult<IDataDBObtenerPresupuestosId>;
  session: Session | null;
}

export default function EditarProyectoPage(props: IEditarProyecto) {
  const [formDataController, setFormDataController] = useState({
    departamento: props.dataEditPresupuesto.recordset[0].Ubi_Departamento,
    provincia: props.dataEditPresupuesto.recordset[0].Ubi_Provincia,
    distrito: props.dataEditPresupuesto.recordset[0].Ubi_Distrito,
    client: props.dataEditPresupuesto.recordset[0].Cli_NomApeRazSocial,
  });

  const [provincias, setProvincias] = useState<string[]>([]);
  const [distritos, setDistritos] = useState<string[]>([]);

  const initialState = { message: "", errors: {} };
  const actionsEditarPresupuestoWithId = actionsEditarPresupuesto.bind(
    null,
    props.id
  );
  const [state, dispatch] = useFormState(
    actionsEditarPresupuestoWithId,
    initialState
  );

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
      className="grid grid-cols-1 mt-4 gap-y-6 gap-x-6"
    >
      <div className="flex flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="text-sm w-20 truncate">Código</label>
          <Badge variant="outline">
            {props.dataEditPresupuesto.recordset[0].Pre_Id}
          </Badge>
        </div>
        <SubmitButtonComponent />
      </div>
      <div className="flex flex-row gap-4 items-center">
        <label className="text-sm w-20 truncate">Nombre usuario</label>
        <Input
          type="text"
          name="name-user"
          readOnly
          value={String(props.session?.user?.name)}
        />
      </div>
      <div className="flex flex-row gap-4 items-center">
        <label className="text-sm w-20 truncate">Nombre</label>
        <Input
          type="text"
          name="name"
          defaultValue={props.dataEditPresupuesto.recordset[0].Pre_Nombre}
        />
      </div>
      <div className="flex flex-row gap-4 items-center">
        <label className="text-sm w-20 truncate">Departamento</label>
        <Select
          defaultValue={props.dataEditPresupuesto.recordset[0].Ubi_Departamento}
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
      <div className="flex flex-row gap-4 items-center">
        <label className="text-sm w-20 truncate">Provincia</label>
        <Select
          defaultValue={props.dataEditPresupuesto.recordset[0].Ubi_Provincia}
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
      <div className="flex flex-row gap-4 items-center">
        <label className="text-sm w-20 truncate">Distrito</label>
        <Select
          defaultValue={props.dataEditPresupuesto.recordset[0].Ubi_Distrito}
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
      <div className="flex flex-row gap-4 items-center">
        <label className="text-sm w-20 truncate">Cliente</label>
        <Select
          defaultValue={
            props.dataEditPresupuesto.recordset[0].Cli_NomApeRazSocial
          }
          onValueChange={(value) => handleSelectChange("client", value)}
        >
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
      <div className="flex flex-row gap-4 items-center">
        <label className="text-sm w-20 truncate">Jornal</label>
        <Input
          type="number"
          name="jornal"
          defaultValue={props.dataEditPresupuesto.recordset[0].Pre_Jornal}
        />
      </div>
      <div aria-live="polite" aria-atomic="true">
        {state.message ? (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        ) : null}
      </div>
    </form>
  );
}
