import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

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
  );
}
