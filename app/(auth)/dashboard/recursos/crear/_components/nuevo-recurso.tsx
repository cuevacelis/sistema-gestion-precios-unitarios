"use client";

import { useActionState, useState } from "react";
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
import Form from "next/form";
import ContainerInput from "@/components/ui/container-input";

interface INuevoRecurso {
  dataUnidadesDeMedida: Awaited<ReturnType<typeof obtenerUnidadesDeMedida>>;
  dataTipoRecurso: Awaited<ReturnType<typeof obtenerTipoRecurso>>;
}

export default function NuevoRecurso({
  dataUnidadesDeMedida,
  dataTipoRecurso,
}: INuevoRecurso) {
  const [stateForm, formActionNewPartida, isPending] = useActionState(
    actionsCrearRecurso,
    {
      isError: false,
      message: "",
    }
  );
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
    <Form
      action={handleSubmit}
      className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-h-[500px] lg:max-h-full"
    >
      <ContainerInput
        nameLabel="Indunificado:"
        htmlFor="indunificado"
        icon="indunificado"
        className="col-span-full sm:col-span-3"
      >
        <Input type="text" name="indunificado" required autoFocus />
      </ContainerInput>

      <ContainerInput
        nameLabel="Nombre del recurso:"
        htmlFor="nombreRecurso"
        icon="recurso"
        className="col-span-full sm:col-span-3"
      >
        <Input type="text" name="nombreRecurso" required />
      </ContainerInput>

      <ContainerInput
        nameLabel="Tipo de recurso:"
        htmlFor="tipoRecurso"
        icon="tipo de recurso"
        className="col-span-full sm:col-span-3"
      >
        <ComboboxSingleSelection
          options={dataTipoRecurso.map((item) => ({
            value: String(item.tiprec_id),
            label: item.tiprec_nombre,
          }))}
          onSelect={(value) => handleSelectChange(value, "tipoRecurso")}
          disabled={false}
          value={formDataExtra["tipoRecurso"]}
        />
      </ContainerInput>

      <ContainerInput
        nameLabel="Unidad de medida:"
        htmlFor="unidadMedida"
        icon="unidad de medida"
        className="col-span-full sm:col-span-3"
      >
        <ComboboxSingleSelection
          options={dataUnidadesDeMedida.map((item) => ({
            value: String(item.unimed_id),
            label: item.unimed_nombre,
          }))}
          onSelect={(value) => handleSelectChange(value, "unidadMedida")}
          disabled={false}
          value={formDataExtra["unidadMedida"]}
        />
      </ContainerInput>

      <div className="col-span-full">
        <SubmitFormButtonComponent
          isPending={isPending}
          name="Crear recurso"
          nameLoading="Creando..."
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm?.message && <ErrorMessage message={stateForm?.message} />}
      </div>
    </Form>
  );
}
