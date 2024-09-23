import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AblyPimary } from "@/context/ably";
import { AblySuscriptionProvider } from "@/context/context-ably-suscription";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { auth } from "@/auth";

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
            <AblySuscriptionProvider>
              {children}
              <Toaster />
            </AblySuscriptionProvider>
          </AblyPimary>
        </ThemeProvider>
      </body>
    </html>
  );
}
