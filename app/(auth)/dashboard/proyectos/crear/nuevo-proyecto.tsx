"use client";
import Combobox from "@/components/combobox/combobox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IDataDBCliente, IDataDBUbicacion, TMultipleSelect } from "@/lib/types";
import { IProcedureResult } from "mssql";
import { useMemo, useState } from "react";

interface INuevoProyecto {
  dataUbicacion: IProcedureResult<IDataDBUbicacion>;
  dataClientes: IProcedureResult<IDataDBCliente>;
}

export default function NuevoProyectoPage(props: INuevoProyecto) {
  const [selectedDepartamentos, setSelectedDepartamentos] =
    useState<TMultipleSelect>([]);

    const uniqueDepartamentos = useMemo(() => {
      return [
        ...new Set(
          props.dataUbicacion.recordset.map((item) => item.Ubi_Departamento)
        ),
      ];
    }, [props.dataUbicacion.recordset]); // Depende de recordset
  
    const uniqueProvincias = useMemo(() => {
      return [
        ...new Set(
          props.dataUbicacion.recordset.map((item) => item.Ubi_Provincia)
        ),
      ];
    }, [props.dataUbicacion.recordset]); // Depende de recordset
  
    const uniqueDistritos = useMemo(() => {
      return [
        ...new Set(
          props.dataUbicacion.recordset.map((item) => item.Ubi_Distrito)
        ),
      ];
    }, [props.dataUbicacion.recordset]); // Depende de recordset

  return (
    <form className="grid grid-cols-1 mt-4 gap-y-6 gap-x-6">
      <div className="flex flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="text-sm w-20 truncate">Código</label>
          <Badge variant="outline">{123}</Badge>
        </div>
        <Button type="submit" className="btn btn-primary">
          Guardar
        </Button>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <label className="text-sm w-20 truncate">Nombre</label>
        <Input type="text" name="nombre" value={"abc"} />
      </div>
      <div className="flex flex-row gap-4 items-center">
        <label className="text-sm w-20 truncate">Ubicación</label>
        <Combobox
          selectionType="single"
          isLoading={false}
          setSelectedItem={setSelectedDepartamentos}
          selectedItem={selectedDepartamentos}
          listElements={uniqueDepartamentos.map((e) => ({
            key: String(e),
            name: String(e),
          }))}
        />
      </div>
      <div className="flex flex-row gap-4 items-center">
        <label className="text-sm w-20 truncate">Departamento</label>

        <Select>
          <SelectTrigger className="">
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
        <label className="text-sm w-20 truncate">Departamento</label>
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Seleccione provincia" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {uniqueProvincias.map((item) => (
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
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Seleccione provincia" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {uniqueDistritos.map((item) => (
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
        <Select>
          <SelectTrigger className="">
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
        <Input type="number" name="jornal" value={0.5} />
      </div>
    </form>
  );
}
