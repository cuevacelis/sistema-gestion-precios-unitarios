"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ children, title }: ModalProps) {
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
        className="sm:max-w-[800px] h-[500px] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>{title || "Modal"}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
