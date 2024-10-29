"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";

import { actionsCrearCliente } from "@/lib/actions/actions";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import { obtenerRoles, obtenerTipoDocumento } from "@/lib/services/sql-queries";
import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";
import Form from "next/form";
import ContainerInput from "@/components/ui/container-input";

interface ICrearCliente {
  dataTipoDocumento: Awaited<ReturnType<typeof obtenerTipoDocumento>>;
}

export default function CrearCliente({ dataTipoDocumento }: ICrearCliente) {
  const [stateForm, formActionNewCliente, isPending] = useActionState(
    actionsCrearCliente,
    {
      isError: false,
      message: "",
    }
  );
  const [formDataExtra, setFormDataExtra] = useState({
    idCliente: null as string | null,
    rol: "",
  });

  const handleSubmit = (formData: FormData) => {
    Object.entries(formDataExtra).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    formActionNewCliente(formData);
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
      className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Nombre</Label>
        <Input type="text" name="nombre" required />
      </div>

      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Abreviatura</Label>
        <Input type="text" name="abreviatura" required />
      </div>

      <ContainerInput
        nameLabel="Tipo de documento:"
        htmlFor="tipoDoc"
        icon="tipoDoc"
        className="col-span-3"
      >
        <div className="flex flex-col w-full">
          <ComboboxSingleSelection
            className="bg-secondary"
            options={dataTipoDocumento.map((item) => ({
              value: String(item.tipdoc_id),
              label: item.tipdoc_nombre,
            }))}
            onSelect={(value) => handleSelectChange(value, "rol")}
            disabled={false}
            value={formDataExtra["rol"]}
          />
        </div>
      </ContainerInput>

      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Número de documento</Label>
        <Input type="number" name="numDocumento" required />
      </div>

      <div className="col-span-full">
        <SubmitFormButtonComponent
          isPending={isPending}
          name="Crear cliente"
          nameLoading="Editando..."
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm?.message && <ErrorMessage message={stateForm?.message} />}
      </div>
    </Form>
  );
}
