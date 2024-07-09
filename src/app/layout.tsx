import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Condomínio Conectado",
  description: "Conecte-se ao seu condomínio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
