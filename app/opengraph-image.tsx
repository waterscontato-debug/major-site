import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Major — Agência de marketing pra clínicas, consultórios e escolas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OG image dinâmica (1200x630) gerada em build/edge. Aparece quando
 * o link do site é compartilhado em WhatsApp, redes sociais, etc.
 *
 * Layout: fundo Jet Black da Major + "MAJOR" tipográfico grande +
 * tagline embaixo. Sem dependência de assets externos pra carregar
 * rápido em qualquer crawler (WhatsApp/Facebook timeout em ~5s).
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1A1A1A",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "72px 96px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#E0E0E0",
            fontSize: 28,
            letterSpacing: 6,
            fontWeight: 600,
          }}
        >
          MAJOR
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            color: "#E0E0E0",
          }}
        >
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            Marketing pra
            <br />
            quem cuida de gente.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#BFBFBF",
              fontWeight: 400,
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            Tráfego, conteúdo e estratégia pra clínicas, consultórios e
            escolas crescerem com previsibilidade.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            color: "#BFBFBF",
            fontSize: 22,
            letterSpacing: 1,
          }}
        >
          <span>agenciamajor.com.br</span>
          <span>@major.agencia</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
