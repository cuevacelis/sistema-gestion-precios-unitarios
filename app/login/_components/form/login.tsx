"use client";

import { actionsSignInCredentials } from "@/app/_actions/authenticate";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import SubmitButtonComponent from "./button-submit";
import InputPassComponent from "./input-pass";
import InputUserComponent from "./input-user";

export default function LoginComponent() {
  const [errorMessage, formActionSignInCredentials] = useFormState(
    actionsSignInCredentials,
    undefined
  );

  return (
    <form
      action={formActionSignInCredentials}
      className="flex flex-col pt-10 mb-5"
    >
      <InputUserComponent />
      <InputPassComponent />

      <div className="flex flex-col text-center">
        <SubmitButtonComponent />
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}
