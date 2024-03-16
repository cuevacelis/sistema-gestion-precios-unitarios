export { auth as default } from "./auth";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|register|.favicon.ico|.*\\.png$).*)",
  ],
};
