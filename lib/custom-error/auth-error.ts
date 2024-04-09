import { CredentialsSignin } from "next-auth";

export class CredentialsError extends CredentialsSignin {
  constructor({ message }: { message: string }) {
    super(message);
    this.message = message;
  }
}
