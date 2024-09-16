"use client";

import Portal from "../portal/portal";

export default function ModalLoading() {
  return (
    <Portal>
      <div className="fixed inset-0 flex items-center justify-center bg-[rgba(249,249,249,0.48)] z-50">
        <div className="flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-blue-300 border-4 border-t-blue-500 border-t-4"></div>
        </div>
      </div>
    </Portal>
  );
}
