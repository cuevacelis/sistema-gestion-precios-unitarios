import { TStatusResponseActions } from "@/lib/types";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import ModalSuccessComponent from "../modals/modalSuccess/modalSucces";
import ModalLoading from "../ui/modal-loading";

interface IProps {
  children: React.ReactNode;
  statusMutation: TStatusResponseActions[];
}

export default function ValidateMutation(props: IProps) {
  const isPending = props.statusMutation.some((status) => status === "pending");
  const isSuccess = props.statusMutation.some((status) => status === "success");

  return (
    <ErrorBoundary errorComponent={undefined}>
      {props.children}
      {isPending && <ModalLoading />}
      {isSuccess && <ModalSuccessComponent />}
    </ErrorBoundary>
  );
}
