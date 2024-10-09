"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";

import { actionsEditarGrupoPartida } from "@/lib/actions/actions";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";

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

  const handleSubmit = (formData: FormData) => {
    formActionNewPresupuesto(formData);
  };

  return (
    <form
      action={handleSubmit}
      className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">
          Nombre del grupo de partida
        </Label>
        <Input
          type="text"
          name="nombreGrupoPartida"
          required
          defaultValue={nombreGrupoPartida}
        />
      </div>
      <div className="col-span-full">
        <SubmitFormButtonComponent
          name="Editar"
          nameLoading="Editando, por favor espere..."
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm?.message && <ErrorMessage message={stateForm?.message} />}
      </div>
    </form>
  );
}
