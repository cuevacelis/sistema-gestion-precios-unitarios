"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButtonComponent from "./button-submit";
import ErrorMessage from "@/components/validation/message/error-message";

import { actionsEditarGrupoPartida } from "@/lib/actions";

interface IEditarGrupoPartida {
  idGrupoPartida: string;
  nombreGrupoPartida?: string;
}

export default function EditarGrupoPartida({
  idGrupoPartida,
  nombreGrupoPartida,
}: IEditarGrupoPartida) {
  const actionsEditarGrupoPartidaWithId = actionsEditarGrupoPartida.bind(
    null,
    Number(idGrupoPartida)
  );

  const [stateForm, formActionNewPresupuesto] = useFormState(
    actionsEditarGrupoPartidaWithId,
    { isError: false, message: "" }
  );
  const [formData, setFormData] = useState({
    nombreGrupoPartida: nombreGrupoPartida,
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const formDataToSubmit = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataToSubmit.append(key, String(value));
      }
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
          defaultValue={nombreGrupoPartida}
          onChange={(e) =>
            handleInputChange("nombreGrupoPartida", e.target.value)
          }
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm?.message && <ErrorMessage message={stateForm?.message} />}
      </div>
    </form>
  );
}
