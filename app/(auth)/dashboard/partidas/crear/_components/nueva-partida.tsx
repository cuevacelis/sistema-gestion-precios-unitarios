"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";

import { actionsCrearPartida } from "@/lib/actions/actions";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import { useSearchParams } from "next/navigation";

interface INuevoPartida {}

export default function NuevoPartida({}: INuevoPartida) {
  const searchParams = useSearchParams();
  const grupoPartidaId = searchParams.get("grupoPartidaId");
  const [stateForm, formActionNewPartida] = useFormState(actionsCrearPartida, {
    isError: false,
    message: "",
  });
  const [formDataExtra, setFormDataExtra] = useState({
    idGrupoPartida: grupoPartidaId,
  });

  const handleSubmit = (formData: FormData) => {
    Object.entries(formDataExtra).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    formActionNewPartida(formData);
  };

  return (
    <form
      action={handleSubmit}
      className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
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
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Unidad de medida</Label>
        <Input type="text" name="unidadMedida" required />
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
