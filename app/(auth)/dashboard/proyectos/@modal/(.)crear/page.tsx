import Modal from "@/components/modal/modal";
import { GetDataNuevoProyecto } from "../../crear/page";
import { Suspense } from "react";
import ModalLoading from "@/components/ui/modal-loading";

export default async function NuevoProyectoModalPage() {
  return (
    <Modal title="Crear nuevo proyecto">
      <Suspense fallback={<ModalLoading />}>
        <GetDataNuevoProyecto />
      </Suspense>
    </Modal>
  );
}
