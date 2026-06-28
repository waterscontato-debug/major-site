import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://agenciamajor.com.br";
const SITE_NAME = "Major";
const TITLE = "Major — Agência de marketing pra clínicas, consultórios e escolas";
const DESCRIPTION =
  "Agência de marketing especializada em saúde e educação. Tráfego pago, conteúdo, design e estratégia pra clínicas, consultórios e escolas crescerem com previsibilidade.";
const KEYWORDS = [
  "agência de marketing",
  "marketing pra clínicas",
  "marketing médico",
  "marketing pra dentistas",
  "marketing pra escolas",
  "tráfego pago",
  "social media",
  "agência criativa",
  "marketing pra saúde",
  "agência de publicidade Brasília",
  "agência Major",
  "Major agência",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Major",
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: "Major", url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "marketing",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    // Imagem gerada automaticamente por app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@major.agencia",
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#1A1A1A",
  width: "device-width",
  initialScale: 1,
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Major",
  alternateName: "Major Agência",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-major.png`,
  description: DESCRIPTION,
  sameAs: ["https://www.instagram.com/major.agencia/"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
  },
  areaServed: "BR",
  serviceType: [
    "Marketing digital",
    "Tráfego pago",
    "Social media",
    "Design",
    "Estratégia de marca",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Structured data: Organization (schema.org) — ajuda Google a
            entender que somos uma empresa, mostrando knowledge panel
            quando alguém pesquisa "Major agência". */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
