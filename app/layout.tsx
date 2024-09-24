import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { auth } from "@/auth";
import dynamic from "next/dynamic";
import AblySuscriptionProvider from "@/context/context-ably-suscription";
import ThemeProvider from "@/components/theme-provider";
const AblyPimary = dynamic(() => import("@/context/ably"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: {
    template: "%s | SGPU",
    default: "SGPU",
  },
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="es" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AblyPimary session={session}>
            <AblySuscriptionProvider>{children}</AblySuscriptionProvider>
          </AblyPimary>
        </ThemeProvider>
      </body>
    </html>
  );
}
