"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";
import { actionsEditarGrupoPartida } from "@/lib/actions/actions";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import { obtenerNombreGruposDePartidasById } from "@/lib/services/sql-queries";
import { useActionState, useState } from "react";

interface IEditarGrupoPartida {
  idGrupoPartida: string | null;
  dataGrupoPartida: Awaited<
    ReturnType<typeof obtenerNombreGruposDePartidasById>
  >;
}

export default function EditarGrupoPartida({
  idGrupoPartida,
  dataGrupoPartida,
}: IEditarGrupoPartida) {
  const [stateForm, formActionEditGrupoPartida, isPending] = useActionState(
    actionsEditarGrupoPartida,
    { isError: false, message: "" }
  );

  const [formDataExtra, setFormDataExtra] = useState({
    idGrupoPartida: idGrupoPartida,
  });

  const handleSubmit = (formData: FormData) => {
    Object.entries(formDataExtra).forEach(([key, value]) => {
      formData.append(key, value || "");
    });
    formActionEditGrupoPartida(formData);
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
          defaultValue={dataGrupoPartida?.grupar_nombre}
        />
      </div>
      <div className="col-span-full">
        <SubmitFormButtonComponent
          isPending={isPending}
          name="Editar grupo de partida"
          nameLoading="Editando..."
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm?.message && <ErrorMessage message={stateForm?.message} />}
      </div>
    </form>
  );
}
