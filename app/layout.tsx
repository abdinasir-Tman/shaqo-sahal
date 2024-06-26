import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./providers/NextAuthProvider";
import { Toaster } from "react-hot-toast";
import ReactQueryClientProvider from "./providers/ReactQueryClientProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { CategoryProvider } from "@/hooks/CategoryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shaqo Sahal",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/light_logo.svg"
          type="image/svg"
          sizes="<generated>"
        />
      </head>
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryClientProvider>
            <NextAuthProvider>
              <CategoryProvider>
                <main className="w-full">
                  {children}

                  <Toaster />
                </main>
              </CategoryProvider>
            </NextAuthProvider>
          </ReactQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
