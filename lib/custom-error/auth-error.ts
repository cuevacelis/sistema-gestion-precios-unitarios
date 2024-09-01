import { CredentialsSignin } from "next-auth";

export class CredentialsError extends CredentialsSignin {
  messages: string[];

  constructor({ message }: { message: string | string[] }) {
    if (typeof message === "string") {
      super(message);
      this.messages = [message];
    } else {
      super(message.join(", "));
      this.messages = message;
    }

    // Esto es necesario en TypeScript para que la herencia funcione correctamente
    Object.setPrototypeOf(this, CredentialsError.prototype);
  }

  hasMultipleMessages(): boolean {
    return this.messages.length > 1;
  }
}
