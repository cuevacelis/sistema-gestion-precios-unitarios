"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";

import { actionsCrearPartida } from "@/lib/actions/actions";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import { useSearchParams } from "next/navigation";
import {
  obtenerGruposDePartidas,
  obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";
import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import Form from "next/form";
import ContainerInput from "@/components/ui/container-input";

interface INuevoPartida {
  dataGruposDePartidas: Awaited<ReturnType<typeof obtenerGruposDePartidas>>;
  dataUnidadesDeMedida: Awaited<ReturnType<typeof obtenerUnidadesDeMedida>>;
}

export default function NuevoPartida({
  dataGruposDePartidas,
  dataUnidadesDeMedida,
}: INuevoPartida) {
  const searchParams = useSearchParams();
  const grupoPartidaId = searchParams.get("grupoPartidaId");
  const [stateForm, formActionNewPartida, isPending] = useActionState(
    actionsCrearPartida,
    {
      isError: false,
      message: "",
    }
  );
  const [formDataExtra, setFormDataExtra] = useState({
    idGrupoPartida: grupoPartidaId,
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
      className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className="col-span-6">
        <Alert className="border-blue-200 dark:border-blue-800">
          <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-200">
            Nota
          </AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300">
            {Boolean(grupoPartidaId) ? (
              <>
                Esta sera la nueva partida, del grupo de partida: &quot;
                <span>
                  {
                    dataGruposDePartidas.find(
                      (e) => String(e.grupar_id) === grupoPartidaId
                    )?.grupar_nombre
                  }
                </span>
                &quot;
              </>
            ) : (
              <>
                Esta sera la nueva partida del grupo de partida{" "}
                {formDataExtra.idGrupoPartida ? (
                  <span>
                    &quot;
                    {
                      dataGruposDePartidas.find(
                        (e) =>
                          String(e.grupar_id) === formDataExtra.idGrupoPartida
                      )?.grupar_nombre
                    }
                    &quot;
                  </span>
                ) : (
                  "que selecciones"
                )}
                .
              </>
            )}
          </AlertDescription>
        </Alert>
      </div>
      {!Boolean(grupoPartidaId) && (
        <ContainerInput
          nameLabel="Grupo de partida:"
          htmlFor="jornal"
          icon="grupos de partida"
          className="sm:col-span-3"
        >
          <ComboboxSingleSelection
            placeholder="Seleccione un grupo de partida..."
            options={dataGruposDePartidas.map((item) => ({
              value: String(item.grupar_id),
              label: `Id: ${item.grupar_id} - Nombre: ${item.grupar_nombre}`,
            }))}
            onSelect={(value) => handleSelectChange(value, "idGrupoPartida")}
            disabled={Boolean(grupoPartidaId)}
            value={formDataExtra["idGrupoPartida"]}
          />
        </ContainerInput>
      )}
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
      <div className={cn("sm:col-span-3", {})}>
        <Label className="text-sm w-20 truncate">Unidad de medida</Label>
        <ComboboxSingleSelection
          placeholder="Seleccione una unidad de medida..."
          options={dataUnidadesDeMedida.map((item) => ({
            value: String(item.unimed_id),
            label: item.unimed_nombre,
          }))}
          onSelect={(value) => handleSelectChange(value, "unidadMedida")}
          disabled={false}
          value={formDataExtra["unidadMedida"]}
        />
      </div>
      <div className="col-span-full">
        <SubmitFormButtonComponent
          isPending={isPending}
          name="Crear partida"
          nameLoading="Creando..."
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm?.message && <ErrorMessage message={stateForm?.message} />}
      </div>
    </Form>
  );
}
