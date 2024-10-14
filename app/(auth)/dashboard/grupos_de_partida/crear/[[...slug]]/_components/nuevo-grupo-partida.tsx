"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";

import { actionsCrearGrupoPartida } from "@/lib/actions/actions";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import { obtenerProyectos } from "@/lib/services/sql-queries";
import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";

interface INuevoGrupoPartida {
  idProyecto: string | null;
  lastSlug: string | null;
  dataProyectos: Awaited<ReturnType<typeof obtenerProyectos>>;
}

export default function NuevoGrupoPartida({
  idProyecto,
  lastSlug,
  dataProyectos,
}: INuevoGrupoPartida) {
  const [stateForm, formActionNewGrupoPartida] = useFormState(
    actionsCrearGrupoPartida,
    { isError: false, message: "" }
  );
  const [formDataExtra, setFormDataExtra] = useState({
    idProyecto: idProyecto || "",
    idLastGroupPartida: lastSlug || "",
  });

  const handleSubmit = (formData: FormData) => {
    Object.entries(formDataExtra).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formActionNewGrupoPartida(formData);
  };

  const handleSelectChange = (value: string | null) => {
    setFormDataExtra((prev) => ({ ...prev, idProyecto: value || "" }));
  };

  return (
    <form
      action={handleSubmit}
      className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className="sm:col-span-3">
        <Label className="text-sm">Nombre del grupo de partida</Label>
        <Input type="text" name="nombreGrupoPartida" required />
      </div>
      <div className="col-span-full sm:col-span-3">
        <Label className="text-sm w-20 truncate">Seleccione un proyecto</Label>
        <ComboboxSingleSelection
          options={dataProyectos.map((item) => ({
            value: String(item.pre_id),
            label: item.pre_nombre,
          }))}
          onSelect={(value) => handleSelectChange(value)}
          disabled={false}
          value={formDataExtra["idProyecto"]}
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
