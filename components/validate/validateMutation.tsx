"use client";

import { TStatusResponseActions } from "@/lib/types";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import ModalSuccessComponent from "../modals/modalSuccess/modalSucces";
import ModalLoading from "../ui/modal-loading";

interface IProps {
  children: React.ReactNode;
  statusMutation: TStatusResponseActions[];
  variant?: "modal" | "toast";
  showLoading?: boolean;
  showSuccess?: boolean;
  showError?: boolean;
}

export default function ValidateMutation({
  children,
  statusMutation,
  variant = "modal",
  showLoading = true,
  showSuccess = true,
}: IProps) {
  const isPending = statusMutation.some((status) => status === "pending");
  const isSuccess = statusMutation.some((status) => status === "success");
  // const isError = statusMutation.some((status) => status === "error");

  return (
    <ErrorBoundary errorComponent={undefined}>
      {children}
      {isPending && showLoading && <ModalLoading />}
      {isSuccess && variant === "modal" && showSuccess && (
        <ModalSuccessComponent />
      )}
    </ErrorBoundary>
  );
}
