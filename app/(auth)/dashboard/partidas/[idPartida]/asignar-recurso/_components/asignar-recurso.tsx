"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";

import { actionsAsignarRecursoToPartida } from "@/lib/actions/actions";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import { useSearchParams } from "next/navigation";
import { IDataDBObtenerPartidasPaginados } from "@/lib/types/types";
import { obtenerRecursos } from "@/lib/services/sql-queries";
import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";
import { cn } from "@/lib/utils";

interface IAsignarRecursoPartida {
  dataPartida: IDataDBObtenerPartidasPaginados;
  dataRecursos: Awaited<ReturnType<typeof obtenerRecursos>>;
}

export default function AsignarRecursoPartida({
  dataPartida,
  dataRecursos,
}: IAsignarRecursoPartida) {
  const [stateForm, formActionAsignarRecursoPartida] = useFormState(
    actionsAsignarRecursoToPartida,
    {
      isError: false,
      message: "",
    }
  );
  const [formDataExtra, setFormDataExtra] = useState({
    idPartida: String(dataPartida.par_id),
    idRecurso: null as string | null,
  });

  const handleSubmit = (formData: FormData) => {
    Object.entries(formDataExtra).forEach(([key, value]) => {
      formData.append(key, value || "");
    });

    formActionAsignarRecursoPartida(formData);
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
        <Label className="text-sm w-20 truncate">Nombre de partida</Label>
        <Input type="text" required value={dataPartida.par_nombre} disabled />
      </div>
      <div className={cn("sm:col-span-3", {})}>
        <Label className="text-sm w-20 truncate">Seleccione un recurso</Label>
        <ComboboxSingleSelection
          options={dataRecursos.map((item) => ({
            value: String(item.rec_id),
            label: `Id: ${item.rec_id} - Nombre: ${item.rec_nombre}`,
          }))}
          onSelect={(value) => handleSelectChange(value, "idRecurso")}
          disabled={false}
          value={formDataExtra["idRecurso"]}
        />
      </div>
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Cantidad</Label>
        <Input type="number" required name="cantidad" />
      </div>
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Cuadrilla</Label>
        <Input type="number" required name="cuadrilla" />
      </div>
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Precio</Label>
        <Input type="number" required name="precio" />
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
