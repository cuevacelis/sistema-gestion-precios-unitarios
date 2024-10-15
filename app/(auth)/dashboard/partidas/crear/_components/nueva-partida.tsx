"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";

import { actionsCrearPartida } from "@/lib/actions/actions";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import { useSearchParams } from "next/navigation";
import {
  obtenerGruposDePartidas,
  obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";
import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";
import { cn } from "@/lib/utils";

interface INuevoPartida {
  dataGruposDePartidas: Awaited<ReturnType<typeof obtenerGruposDePartidas>>;
  dataUnidadesDeMedida: Awaited<ReturnType<typeof obtenerUnidadesDeMedida>>;
}

export default function NuevoPartida({
  dataGruposDePartidas,
  dataUnidadesDeMedida,
}: INuevoPartida) {
  const searchParams = useSearchParams();
  const grupoPartidaId = searchParams.get("grupoPartidaId");
  const [stateForm, formActionNewPartida] = useFormState(actionsCrearPartida, {
    isError: false,
    message: "",
  });
  const [formDataExtra, setFormDataExtra] = useState({
    idGrupoPartida: grupoPartidaId,
    unidadMedida: null as string | null,
  });

  const handleSubmit = (formData: FormData) => {
    Object.entries(formDataExtra).forEach(([key, value]) => {
      formData.append(key, value || "");
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
    <form
      action={handleSubmit}
      className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className={cn("sm:col-span-3", {})}>
        <Label className="text-sm w-20 truncate">Grupo de partida</Label>
        <ComboboxSingleSelection
          options={dataGruposDePartidas.map((item) => ({
            value: String(item.grupar_id),
            label: `id: ${item.grupar_id} - nombre: ${item.grupar_nombre}`,
          }))}
          onSelect={(value) => handleSelectChange(value, "idGrupoPartida")}
          disabled={Boolean(grupoPartidaId)}
          value={formDataExtra["idGrupoPartida"]}
        />
      </div>
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Nombre de partida</Label>
        <Input type="text" name="nombrePartida" required />
      </div>
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">
          Rendimiento mano de obra
        </Label>
        <Input type="number" name="rendimientoManoDeObra" required />
      </div>
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Rendimiento equipo</Label>
        <Input type="number" name="rendimientoEquipo" required />
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
