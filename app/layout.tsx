import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Major — Marketing pra quem cuida de gente",
  description:
    "Agência de marketing especializada em saúde e educação. Tráfego pago, conteúdo, design e gestão estratégica pra clínicas, consultórios e escolas.",
  openGraph: {
    title: "Major — Marketing pra quem cuida de gente",
    description:
      "Tráfego, conteúdo e estratégia pra clínicas, consultórios e escolas crescerem com previsibilidade.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
