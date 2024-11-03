"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";

import { actionsEditarCliente } from "@/lib/actions/actions";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import { obtenerRoles, obtenerTipoDocumento } from "@/lib/services/sql-queries";
import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";
import Form from "next/form";
import ContainerInput from "@/components/ui/container-input";
import { IDataDBObtenerClientesId } from "@/lib/types/types";

interface IEditarCliente {
  dataCliente: IDataDBObtenerClientesId;
  dataTipoDocumento: Awaited<ReturnType<typeof obtenerTipoDocumento>>;
}

export default function EditarCliente({
  dataCliente,
  dataTipoDocumento,
}: IEditarCliente) {
  const [stateForm, formActionEditCliente, isPending] = useActionState(
    actionsEditarCliente,
    {
      isError: false,
      message: "",
    }
  );
  const [formDataExtra, setFormDataExtra] = useState({
    idCliente: dataCliente?.cli_id,
    tipoDoc: String(dataCliente?.tipdoc_id) || null,
  });

  const handleSubmit = (formData: FormData) => {
    Object.entries(formDataExtra).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    formActionEditCliente(formData);
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
        <Input
          type="text"
          name="nombre"
          required
          defaultValue={dataCliente.cli_nomaperazsocial}
        />
      </div>

      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Abreviatura</Label>
        <Input
          type="text"
          name="abreviatura"
          required
          defaultValue={dataCliente.cli_abreviatura}
        />
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
            onSelect={(value) => handleSelectChange(value, "tipoDoc")}
            disabled={false}
            value={formDataExtra["tipoDoc"]}
          />
        </div>
      </ContainerInput>

      <div className="sm:col-span-3">
        <Label className="text-sm w-20 truncate">Número de documento</Label>
        <Input
          type="number"
          name="numeroDoc"
          defaultValue={dataCliente.cli_numdocumento}
          required
        />
      </div>
      <div className="col-span-full">
        <SubmitFormButtonComponent
          isPending={isPending}
          name="Editar cliente"
          nameLoading="Editando..."
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm?.message && <ErrorMessage message={stateForm?.message} />}
      </div>
    </Form>
  );
}
