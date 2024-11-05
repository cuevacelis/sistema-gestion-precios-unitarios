"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  classNameDialogContent?: string;
}

export default function Modal({
  children,
  title,
  classNameDialogContent,
}: ModalProps) {
  const router = useRouter();

  const handleChangeModal = useCallback(
    (open: boolean) => {
      if (!open) {
        router.back();
      }
    },
    [router]
  );

  return (
    <Dialog
      key="modal"
      defaultOpen={true}
      open={true}
      onOpenChange={handleChangeModal}
    >
      <DialogContent
        aria-describedby="description"
        className={`sm:max-w-[900px] max-h-[calc(100vh_-_57px)] overflow-y-auto ${classNameDialogContent}`}
      >
        <DialogHeader>
          <DialogTitle>{title || "Modal"}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
