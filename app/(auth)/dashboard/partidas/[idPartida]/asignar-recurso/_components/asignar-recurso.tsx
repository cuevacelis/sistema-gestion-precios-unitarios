"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/validation/message/error-message";

import { actionsAsignarRecursoToPartida } from "@/lib/actions/actions";
import SubmitFormButtonComponent from "@/components/submit-button/submit-form-button";
import {
  IDataDBObtenerPartidasPaginados,
  ISpDepartamentoObten,
  ISpPaisObten,
} from "@/lib/types/types";
import { obtenerRecursos } from "@/lib/services/sql-queries";
import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";
import { cn } from "@/lib/utils";
import Form from "next/form";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ContainerInput from "@/components/ui/container-input";
import useCountryQuery from "@/hooks/tanstack-query/useCountryQuery";
import useDepartmentQuery from "@/hooks/tanstack-query/useDepartmentQuery";
import { InfoIcon, Loader2, RocketIcon, SearchSlash } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import usePrecioRecomendadoQuery from "@/hooks/tanstack-query/usePrecioRecomendadoQuery";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface IAsignarRecursoPartida {
  dataPartida: IDataDBObtenerPartidasPaginados;
  dataRecursos: Awaited<ReturnType<typeof obtenerRecursos>>;
}

type LoadingKeys = "country" | "department" | "province" | "district";

export default function AsignarRecursoPartida({
  dataPartida,
  dataRecursos,
}: IAsignarRecursoPartida) {
  const [isShowModalPreciosRecomendados, setIsShowModalPreciosRecomendados] =
    useState<boolean>(false);
  const [stateForm, formActionAsignarRecursoPartida, isPending] =
    useActionState(actionsAsignarRecursoToPartida, {
      isError: false,
      message: "",
    });
  const [formDataExtra, setFormDataExtra] = useState({
    idPartida: String(dataPartida.par_id),
    idRecurso: null as string | null,
    precio: "",
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

  const handleInputChange = (name: string, value: string) => {
    setFormDataExtra((prev) => ({ ...prev, [name]: value }));
  };

  //MODAL
  const [formDataExtraModal, setFormDataExtraModal] = useState({
    country: "1",
    department: "",
    precioRecomendado: "",
  });

  const { data: countries, isLoading: isLoadingCountries } = useCountryQuery({
    isEnabled: true,
  });

  const { data: departments, isLoading: isLoadingDepartments } =
    useDepartmentQuery({
      idCountry: formDataExtraModal.country,
      isEnabled: !!formDataExtraModal.country,
    });

  const { data: precioRecomendado, isLoading: isLoadingPrecioRecomendado } =
    usePrecioRecomendadoQuery({
      nombreRecurso:
        dataRecursos.find(
          (recursos) =>
            Number(recursos.rec_id) === Number(formDataExtra?.idRecurso)
        )?.rec_nombre || "",
      idDepartament: formDataExtraModal.department,
      isEnabled: !!formDataExtraModal.department && !!formDataExtra.idRecurso,
    });

  const handleInputChangeModal = (name: string, value: string) => {
    setFormDataExtraModal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChangeModal = (type: LoadingKeys, value: string | null) => {
    handleInputChangeModal(type, value || "");

    if (type === "country") {
      setFormDataExtraModal((prev) => ({
        ...prev,
        department: "",
        province: "",
        district: "",
      }));
    } else if (type === "department") {
      setFormDataExtraModal((prev) => ({
        ...prev,
        province: "",
        district: "",
      }));
    }
  };

  const handleUsePrecioRecomendado = () => {
    const precioRecomendadoValue = Number(precioRecomendado?.[0]?.precio) || "";
    setFormDataExtra((prev) => ({
      ...prev,
      precio: precioRecomendadoValue.toString(),
    }));
    setIsShowModalPreciosRecomendados(false);
  };

  const recursosFound = dataRecursos.find(
    (recurso) => recurso.rec_id === Number(formDataExtra.idRecurso)
  );

  return (
    <Form
      action={handleSubmit}
      className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <ContainerInput
        nameLabel={
          <div className="flex items-center justify-between w-full">
            <span>Seleccione un recurso:</span>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsShowModalPreciosRecomendados(true)}
              className="ml-2 animate-pulse"
            >
              <InfoIcon className="w-4 h-4 mr-1" />
              Precios recomendados
            </Button>
          </div>
        }
        htmlFor="idRecurso"
        icon="recurso"
        className="col-span-full"
      >
        <ComboboxSingleSelection
          options={dataRecursos.map((item) => ({
            value: String(item.rec_id),
            label: `Id: ${item.rec_id} - Nombre: ${item.rec_nombre}`,
          }))}
          onSelect={(value) => handleSelectChange(value, "idRecurso")}
          disabled={false}
          value={formDataExtra["idRecurso"]}
        />
      </ContainerInput>

      <ContainerInput
        nameLabel="Nombre de partida:"
        htmlFor="nombrePartida"
        icon="partida"
        className="col-span-full sm:col-span-3"
      >
        <Input type="text" required value={dataPartida.par_nombre} disabled />
      </ContainerInput>

      <ContainerInput
        nameLabel="Cantidad:"
        htmlFor="cantidad"
        icon="cantidad"
        className="col-span-full sm:col-span-3"
      >
        <Input type="number" required name="cantidad" />
      </ContainerInput>

      <ContainerInput
        nameLabel="Cuadrilla:"
        htmlFor="cuadrilla"
        icon="cuadrilla"
        className="col-span-full sm:col-span-3"
      >
        <Input type="number" required name="cuadrilla" />
      </ContainerInput>

      <ContainerInput
        nameLabel="Precio:"
        htmlFor="precio"
        icon="precio"
        className="col-span-full sm:col-span-3"
      >
        <Input
          type="number"
          required
          name="precio"
          value={formDataExtra.precio}
          onChange={(e) => handleInputChange("precio", e.target.value)}
        />
      </ContainerInput>

      <div className="col-span-full">
        <SubmitFormButtonComponent
          isPending={isPending}
          name="Guardar"
          nameLoading="Guardando, por favor espere..."
        />
      </div>
      <div className="sm:col-span-6" aria-live="polite" aria-atomic="true">
        {stateForm?.message && <ErrorMessage message={stateForm?.message} />}
      </div>

      <Dialog
        open={isShowModalPreciosRecomendados}
        onOpenChange={setIsShowModalPreciosRecomendados}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Precios recomendados</DialogTitle>
            <DialogDescription>
              Busca los precios recomendados según el índice unificado de
              precios de la construcción.
              <Link
                href="/dashboard/indices_unificados_de_precios"
                target="_blank"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Ver más
              </Link>
            </DialogDescription>
          </DialogHeader>
          <section className="flex flex-col gap-4">
            <Alert className="border-blue-200 dark:border-blue-800">
              <RocketIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle className="text-blue-800 dark:text-blue-200">
                Información importante
              </AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-300">
                Esta seccion te brinda recomendaciones de precios segun el
                recurso y el departamento seleccionado.
              </AlertDescription>
            </Alert>

            <ContainerInput
              nameLabel="Seleccione un recurso:"
              htmlFor="idRecurso"
              icon="recurso"
              className="col-span-full"
            >
              <ComboboxSingleSelection
                options={dataRecursos.map((item) => ({
                  value: String(item.rec_id),
                  label: `Id: ${item.rec_id} - Nombre: ${item.rec_nombre}`,
                }))}
                onSelect={(value) => handleSelectChange(value, "idRecurso")}
                disabled={false}
                value={formDataExtra["idRecurso"]}
              />
            </ContainerInput>

            <ContainerInput
              nameLabel="País"
              htmlFor="country"
              icon={"ubicacion"}
              className="col-span-3"
            >
              <ComboboxSingleSelection
                className="bg-secondary"
                options={
                  countries?.map((country: ISpPaisObten) => ({
                    value: String(country.pai_id),
                    label: country.pai_nombre,
                  })) || []
                }
                onSelect={(value) => handleSelectChangeModal("country", value)}
                placeholder={"Seleccione un país"}
                disabled={!countries?.length || isLoadingCountries}
                value={formDataExtraModal["country"]}
              />
              {isLoadingCountries && (
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {`Cargando países...`}
                </div>
              )}
            </ContainerInput>

            <ContainerInput
              nameLabel="Departamento"
              htmlFor="department"
              icon={"ubicacion"}
              className="col-span-3"
            >
              <ComboboxSingleSelection
                className="bg-secondary"
                options={
                  departments?.map((department: ISpDepartamentoObten) => ({
                    value: String(department.dep_id),
                    label: department.dep_nombre,
                  })) || []
                }
                onSelect={(value) =>
                  handleSelectChangeModal("department", value)
                }
                placeholder={"Seleccione un departamento"}
                disabled={!departments?.length || isLoadingDepartments}
                value={formDataExtraModal["department"]}
              />
              {isLoadingDepartments && (
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {`Cargando departamentos...`}
                </div>
              )}
            </ContainerInput>

            <ContainerInput
              nameLabel="Precio recomendado(soles):"
              htmlFor="precioRecomendado"
              icon="precioRecomendado"
              className="col-span-3"
            >
              <Input
                type="number"
                id="precioRecomendadoGenerado"
                name="precioRecomendadoGenerado"
                className="bg-secondary"
                value={Number(precioRecomendado?.[0]?.precio) || ""}
                readOnly
              />
              {!isLoadingPrecioRecomendado &&
                precioRecomendado?.length === 0 && (
                  <div className="mt-2 flex items-center text-sm text-muted-foreground text-red-400 dark:text-red-500">
                    <ExclamationCircleIcon className="mr-2 h-4 w-4" />
                    <p>
                      No hay precios recomendados para este recurso, obten una
                      lista de índices unificados{" "}
                      <Link
                        href="/dashboard/indices_unificados_de_precios"
                        target="_blank"
                        className="inline-block text-primary hover:underline"
                      >
                        aquí
                      </Link>
                    </p>
                  </div>
                )}
              {isLoadingPrecioRecomendado && (
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {`Buscando precios recomendados...`}
                </div>
              )}
            </ContainerInput>
          </section>
          <DialogFooter>
            <Button type="button" onClick={handleUsePrecioRecomendado}>
              Usar precio recomendado
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
