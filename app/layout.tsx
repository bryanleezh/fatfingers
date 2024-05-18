import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { ViewTransitions } from "next-view-transitions";

// TODO: Add fonts in as variables to be used in typing component
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fat Fingers",
  description: "How fast can your fingers take you?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem 
            disableTransitionOnChange
            themes={['light', 'dark', 'lightblue', 'darkblue']}
            >
            <main className={inter.className}>
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
