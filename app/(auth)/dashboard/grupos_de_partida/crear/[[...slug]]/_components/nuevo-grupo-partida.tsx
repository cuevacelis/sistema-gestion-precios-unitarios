"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";

import { actionsCrearGrupoPartida } from "@/lib/actions/actions";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import {
  obtenerNombreGruposDePartidasById,
  obtenerProyectos,
} from "@/lib/services/sql-queries";
import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface INuevoGrupoPartida {
  idProyecto: string | null;
  lastSlug: string | null;
  dataProyectos: Awaited<ReturnType<typeof obtenerProyectos>>;
  isSubGroup: boolean;
  dataGrupoPartidaParent: Awaited<
    ReturnType<typeof obtenerNombreGruposDePartidasById>
  >;
}

export default function NuevoGrupoPartida({
  idProyecto,
  lastSlug,
  dataProyectos,
  isSubGroup,
  dataGrupoPartidaParent,
}: INuevoGrupoPartida) {
  const [stateForm, formActionNewGrupoPartida, isPending] = useActionState(
    actionsCrearGrupoPartida,
    { isError: false, message: "" }
  );
  const [formDataExtra, setFormDataExtra] = useState({
    idProyecto: idProyecto,
    idLastGroupPartida: lastSlug,
  });

  const handleSubmit = (formData: FormData) => {
    Object.entries(formDataExtra).forEach(([key, value]) => {
      formData.append(key, value || "");
    });

    formActionNewGrupoPartida(formData);
  };

  const handleSelectChange = (value: string | null) => {
    setFormDataExtra((prev) => ({ ...prev, idProyecto: value }));
  };

  return (
    <form
      action={handleSubmit}
      className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className="col-span-6">
        <Alert className="border-blue-200 dark:border-blue-800">
          <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-200">
            Nota
          </AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300">
            {dataGrupoPartidaParent?.grupar_nombre ? (
              <>
                Este sera el nuevo subgrupo de partida, del proyecto{" "}
                <span className="underline underline-offset-4">
                  {dataProyectos[0].pre_nombre}
                </span>
                , y sera hijo del grupo de partida{" "}
                <span className="underline underline-offset-4">
                  {dataGrupoPartidaParent.grupar_nombre}.
                </span>
              </>
            ) : (
              <>
                Este sera el nuevo grupo de partida, del proyecto{" "}
                {formDataExtra.idProyecto ? (
                  <span className="underline underline-offset-4">
                    {
                      dataProyectos.find(
                        (e) => String(e.pre_id) === formDataExtra.idProyecto
                      )?.pre_nombre
                    }
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
      {!(isSubGroup || Boolean(idProyecto)) && (
        <div className={cn("col-span-full sm:col-span-3", {})}>
          <Label className="text-sm w-20 truncate">Proyectos</Label>
          <ComboboxSingleSelection
            placeholder="Selecciona un proyecto..."
            options={dataProyectos.map((item) => ({
              value: String(item.pre_id),
              label: item.pre_nombre,
            }))}
            onSelect={(value) => handleSelectChange(value)}
            disabled={isSubGroup || Boolean(idProyecto)}
            value={formDataExtra["idProyecto"]}
          />
        </div>
      )}
      <div className="sm:col-span-3">
        <Label className="text-sm">Nombre del grupo de partida</Label>
        <Input type="text" name="nombreGrupoPartida" required autoFocus />
      </div>
      <div className="col-span-full">
        <SubmitFormButtonComponent
          isPending={isPending}
          name="Crear grupo de partida"
          nameLoading="Creando..."
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm?.message && <ErrorMessage message={stateForm?.message} />}
      </div>
    </form>
  );
}
