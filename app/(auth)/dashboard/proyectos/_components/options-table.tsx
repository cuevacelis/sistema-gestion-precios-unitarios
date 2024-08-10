"use client";
import ModalConfirmacionComponent from "@/components/modals/modalConfirmacion/modalConfirmacion";
import { Button } from "@/components/ui/button";
import ValidateMutation from "@/components/validate/validateMutation";
import { useGetGestionProyectos } from "@/context/context-proyectos";
import { actionsDeletePresupuesto } from "@/lib/actions";
import { TStatusResponseActions } from "@/lib/types";
import { Copy, Download, Edit, PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OptionsTable() {
  const router = useRouter();
  const [statusRespDeletePresupuesto, setStatusRespDeletePresupuesto] =
    useState<TStatusResponseActions>("idle");
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const {
    dataTable: { table },
  } = useGetGestionProyectos({});

  return (
    <ValidateMutation statusMutation={[statusRespDeletePresupuesto]}>
      <Button
        size="default"
        variant="default"
        className="h-9 gap-1"
        onClick={() => router.push("/dashboard/proyectos/crear")}
      >
        <PlusCircle className="w-4" />
        <span>Nuevo</span>
      </Button>
      <Button
        size="default"
        variant="secondary"
        className="h-9 gap-1"
        disabled={!(table.getFilteredSelectedRowModel().rows.length === 1)}
        tooltip="Para continuar, por favor seleccione una fila de la tabla."
        onClick={() =>
          router.push(
            `proyectos/${table.getSelectedRowModel().rows[0].original.Pre_Id}/editar`
          )
        }
      >
        <Edit className="w-4" />
        <span>Editar</span>
      </Button>
      <Button
        size="default"
        variant="destructive"
        className="h-9 gap-1"
        disabled={!(table.getFilteredSelectedRowModel().rows.length === 1)}
        tooltip="Para continuar, por favor seleccione una fila de la tabla."
        onClick={() => {
          setIsShowDeleteModal(true);
        }}
      >
        <Trash2 className="w-4" />
        <span>Eliminar</span>
      </Button>
      <Button
        size="default"
        variant="secondary"
        className="h-9 gap-1"
        disabled={!(table.getFilteredSelectedRowModel().rows.length === 1)}
        tooltip="Para continuar, por favor seleccione una fila de la tabla."
      >
        <Copy className="w-4" />
        <span>Duplicar</span>
      </Button>
      <Button
        size="default"
        variant="secondary"
        className="h-9 gap-1"
        onClick={() => router.push("/dashboard/proyectos/exportar")}
      >
        <Download className="w-4" />
        <span>Exportar</span>
      </Button>
      {isShowDeleteModal && (
        <ModalConfirmacionComponent
          show={isShowDeleteModal}
          onClose={() => setIsShowDeleteModal(false)}
          onConfirm={async () => {
            if (!table.getSelectedRowModel().rows[0]?.original) {
              return;
            }
            setStatusRespDeletePresupuesto("pending");
            const actionsDeletePresupuestoWithId =
              actionsDeletePresupuesto.bind(
                null,
                table.getSelectedRowModel().rows[0].original.Pre_Id
              );
            await actionsDeletePresupuestoWithId();
            setStatusRespDeletePresupuesto("success");
            setIsShowDeleteModal(false);
          }}
          classNameButtonAction="bg-destructive text-white hover:bg-destructive/80"
        />
      )}
    </ValidateMutation>
  );
}
