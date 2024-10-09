"use client";

import { actionsSignInCredentials } from "@/lib/actions/actions";
import { useFormState, useFormStatus } from "react-dom";
import InputPassComponent from "./input-pass";
import InputUserComponent from "./input-user";
import { useUserAgent } from "@/hooks/useUserAgent";
import ErrorMessage from "../validation/message/error-message";
import SubmitFormButtonComponent from "../submit-button/submit-form-button";
import LoadingProgressModal from "./login-progress-modal";

export default function LoginComponent() {
  const userAgent = useUserAgent();

  const actionsSignInCredentialsWithUserAgent = actionsSignInCredentials.bind(
    null,
    String(userAgent)
  );

  const [stateForm, formActionSignInCredentials] = useFormState(
    actionsSignInCredentialsWithUserAgent,
    { isError: false, message: "" }
  );

  return (
    <>
      <form className="grid gap-4" action={formActionSignInCredentials}>
        <InputUserComponent />
        <InputPassComponent />
        <SubmitFormButtonComponent
          name="Iniciar sesión"
          nameLoading="Iniciando sesión..."
        />
        <div
          className="flex gap-2 items-start overflow-auto"
          aria-live="polite"
          aria-atomic="true"
        >
          {stateForm?.isError && <ErrorMessage message={stateForm?.message} />}
        </div>
        <LoadingProgressModal />
      </form>
    </>
  );
}
