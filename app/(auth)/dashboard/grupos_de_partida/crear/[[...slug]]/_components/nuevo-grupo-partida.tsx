"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";

import { actionsCrearGrupoPartida } from "@/lib/actions/actions";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";

interface INuevoGrupoPartida {
  idProyecto: string;
  lastSlug?: string;
}

export default function NuevoGrupoPartida({
  idProyecto,
  lastSlug,
}: INuevoGrupoPartida) {
  const [stateForm, formActionNewPresupuesto] = useFormState(
    actionsCrearGrupoPartida,
    { isError: false, message: "" }
  );
  const [formDataExtra, setFormDataExtra] = useState({
    idProyecto: idProyecto,
    idLastGroupPartida: lastSlug ?? null,
  });

  const handleSubmit = (formData: FormData) => {
    Object.entries(formDataExtra).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    formActionNewPresupuesto(formData);
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
