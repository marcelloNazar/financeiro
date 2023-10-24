import "./globals.css";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import Header from "@/components/partials/Header";

export const metadata: Metadata = {
  title: "Controle Financeiro",
  description: "By Marcello Nazar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`flex flex-col h-screen mx-auto bg-black text-gray-400`}
        >
          <header className="flex h-16">
            <Header />
          </header>
          <main className="flex flex-col w-full h-full overflow-hidden">
            {children}
          </main>
        </body>
      </Providers>
    </html>
  );
}
