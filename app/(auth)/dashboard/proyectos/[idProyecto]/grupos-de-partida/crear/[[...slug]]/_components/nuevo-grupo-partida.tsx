"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButtonComponent from "./button-submit";
import ErrorMessage from "@/components/validation/message/error-message";

import { actionsCrearGrupoPartida } from "@/lib/actions";

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
  const [formData, setFormData] = useState({
    nombreGrupoPartida: "",
    idProyecto: idProyecto,
    idLastGroupPartida: lastSlug,
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const formDataToSubmit = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, String(value));
    });

    formActionNewPresupuesto(formDataToSubmit);
  };

  return (
    <form
      action={handleSubmit}
      className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className="col-span-full">
        <SubmitButtonComponent />
      </div>
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">
          Nombre del grupo de partida
        </Label>
        <Input
          type="text"
          name="nombreGrupoPartida"
          required
          onChange={(e) =>
            handleInputChange("nombreGrupoPartida", e.target.value)
          }
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm.message && <ErrorMessage message={stateForm?.message} />}
      </div>
    </form>
  );
}
