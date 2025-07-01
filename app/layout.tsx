import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
// import BeamsBackground from "@/components/BeamsBackground";
import SilkBackground from "@/components/SilkBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "🛍️ Catálogo de Productos | Prueba Técnica Enzo Pontet",
  description:
    "Aplicación desarrollada con Next.js 15, TypeScript y shadcn/ui para gestionar un catálogo de productos. Incluye carga, edición, eliminación, filtrado, paginación y persistencia en localStorage. Proyecto técnico realizado por Enzo Pontet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        <SilkBackground />
        <main className="min-h-screen">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
