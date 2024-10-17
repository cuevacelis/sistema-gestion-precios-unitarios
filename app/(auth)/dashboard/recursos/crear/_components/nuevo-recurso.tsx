"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";

import { actionsCrearRecurso } from "@/lib/actions/actions";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import {
  obtenerTipoRecurso,
  obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";
import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";
import { cn } from "@/lib/utils";

interface INuevoRecurso {
  dataUnidadesDeMedida: Awaited<ReturnType<typeof obtenerUnidadesDeMedida>>;
  dataTipoRecurso: Awaited<ReturnType<typeof obtenerTipoRecurso>>;
}

export default function NuevoRecurso({
  dataUnidadesDeMedida,
  dataTipoRecurso,
}: INuevoRecurso) {
  const [stateForm, formActionNewPartida] = useFormState(actionsCrearRecurso, {
    isError: false,
    message: "",
  });
  const [formDataExtra, setFormDataExtra] = useState({
    tipoRecurso: null as string | null,
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
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Nombre del recurso</Label>
        <Input type="text" name="nombreRecurso" required />
      </div>
      <div className={cn("sm:col-span-3", {})}>
        <Label className="text-sm w-20 truncate">Tipo de recurso</Label>
        <ComboboxSingleSelection
          options={dataTipoRecurso.map((item) => ({
            value: String(item.tiprec_id),
            label: item.tiprec_nombre,
          }))}
          onSelect={(value) => handleSelectChange(value, "tipoRecurso")}
          disabled={false}
          value={formDataExtra["tipoRecurso"]}
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
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Indunificado</Label>
        <Input type="text" name="indunificado" required />
      </div>
      <div className="col-span-full">
        <SubmitFormButtonComponent
          name="Crear recurso"
          nameLoading="Creando..."
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm?.message && <ErrorMessage message={stateForm?.message} />}
      </div>
    </form>
  );
}
