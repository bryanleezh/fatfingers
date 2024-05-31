import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { ViewTransitions } from "next-view-transitions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <body className="h-screen flex flex-col">
          <ThemeProvider 
            attribute="class" 
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
            themes={['light', 'dark', 'green', 'dgreen', 'orange']}
          >
            <Navbar />
            <main className={`flex-grow ${inter.className} flex flex-col`}>
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
