import Modal from "@/components/modal/modal";
import { GetDataEditarProyecto } from "../../../[idProyecto]/editar/page";
import { Suspense } from "react";
import ModalLoading from "@/components/ui/modal-loading";

interface IPropsEditProyectoModalPage {
  params: {
    idProyecto: string;
  };
}

export default function EditarProyectoModalPage(
  props: IPropsEditProyectoModalPage
) {
  return (
    <Modal title="Editar proyecto">
      <Suspense fallback={<ModalLoading />}>
        <ModalLoading />
        <GetDataEditarProyecto id={props.params.idProyecto} />
      </Suspense>
    </Modal>
  );
}
