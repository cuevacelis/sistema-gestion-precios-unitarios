"use client";

import { actionsSignInCredentials } from "@/lib/actions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import SubmitButtonComponent from "./button-submit";
import InputPassComponent from "./input-pass";
import InputUserComponent from "./input-user";

export default function LoginComponent() {
  const [stateForm, formActionSignInCredentials] = useFormState(
    async (state: any, formData: FormData) => {
      return await actionsSignInCredentials(
        state,
        formData,
        navigator.userAgent
      );
    },
    { isError: false, message: "" }
  );

  return (
    <form className="grid gap-4" action={formActionSignInCredentials}>
      <InputUserComponent />
      <InputPassComponent />
      <SubmitButtonComponent />
      <div
        className="flex min-h-10 items-end space-x-1 overflow-auto"
        aria-live="polite"
        aria-atomic="true"
      >
        {stateForm?.isError && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{stateForm.message}</p>
          </>
        )}
      </div>
    </form>
  );
}
