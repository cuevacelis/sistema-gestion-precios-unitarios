import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AblyPimary } from "@/context/ably";
import { AblySuscriptionProvider } from "@/context/context-ably-suscription";
import { GestionEstudiantesProvider } from "@/context/context-gestion-estudiantes";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

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
  return (
    <html lang="es" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AblyPimary>
            <AblySuscriptionProvider>
              <GestionEstudiantesProvider>
                {children}
                <Toaster />
              </GestionEstudiantesProvider>
            </AblySuscriptionProvider>
          </AblyPimary>
        </ThemeProvider>
      </body>
    </html>
  );
}
