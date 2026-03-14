import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Activewear Store — Одежда для активного отдыха",
  description: "MVP интернет-магазин одежды для активного отдыха",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
