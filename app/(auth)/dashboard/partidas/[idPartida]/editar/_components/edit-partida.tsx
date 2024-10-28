"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";

import { actionsEditarPartida } from "@/lib/actions/actions";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import { useSearchParams } from "next/navigation";
import { IDataDBObtenerPartidasPaginados } from "@/lib/types/types";
import {
  obtenerGruposDePartidas,
  obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";
import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";
import { cn } from "@/lib/utils";
import Form from "next/form";

interface IEditarPartida {
  dataPartida: IDataDBObtenerPartidasPaginados;
  dataGruposDePartidas: Awaited<ReturnType<typeof obtenerGruposDePartidas>>;
  dataUnidadesDeMedida: Awaited<ReturnType<typeof obtenerUnidadesDeMedida>>;
}

export default function EditarPartida({
  dataPartida,
  dataGruposDePartidas,
  dataUnidadesDeMedida,
}: IEditarPartida) {
  const [stateForm, formActionNewPartida, isPending] = useActionState(
    actionsEditarPartida,
    {
      isError: false,
      message: "",
    }
  );
  const [formDataExtra, setFormDataExtra] = useState({
    idPartida: dataPartida.par_id,
    unidadMedida: String(dataPartida.unimed_id),
  });

  const handleSubmit = (formData: FormData) => {
    Object.entries(formDataExtra).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    formActionNewPartida(formData);
  };

  const handleSelectChange = (
    value: string | null,
    type: keyof typeof formDataExtra
  ) => {
    setFormDataExtra((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <Form
      action={handleSubmit}
      className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Nombre de partida</Label>
        <Input
          type="text"
          name="nombrePartida"
          required
          defaultValue={dataPartida.par_nombre}
        />
      </div>
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">
          Rendimiento mano de obra
        </Label>
        <Input
          type="number"
          name="rendimientoManoDeObra"
          required
          defaultValue={dataPartida.par_renmanobra}
        />
      </div>
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Rendimiento equipo</Label>
        <Input
          type="number"
          name="rendimientoEquipo"
          required
          defaultValue={dataPartida.par_renequipo}
        />
      </div>
      <div className={cn("sm:col-span-3", {})}>
        <Label className="text-sm w-20 truncate">Unidad de medida</Label>
        <ComboboxSingleSelection
          options={dataUnidadesDeMedida.map((item) => ({
            value: String(item.unimed_id),
            label: item.unimed_nombre,
          }))}
          onSelect={(value) => handleSelectChange(value, "unidadMedida")}
          disabled={false}
          value={formDataExtra["unidadMedida"]}
        />
      </div>
      <div className="col-span-full">
        <SubmitFormButtonComponent
          isPending={isPending}
          name="Editar partida"
          nameLoading="Editando..."
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm?.message && <ErrorMessage message={stateForm?.message} />}
      </div>
    </Form>
  );
}
