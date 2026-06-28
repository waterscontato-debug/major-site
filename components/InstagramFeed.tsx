'use client';

/* eslint-disable @next/next/no-img-element */
import Script from "next/script";

/**
 * Seção "Acompanhe no Instagram" — espelha o feed do @major.agencia
 * usando o widget gratuito Behold.so.
 *
 * SETUP (one-time, ~5min):
 *  1. Criar conta grátis em https://behold.so
 *  2. Conectar Instagram (@major.agencia)
 *  3. Criar um Widget (escolher layout grid 3x2 ou 2x3)
 *  4. Copiar o "Widget ID" (algo como "abcd1234-XXXX-...")
 *  5. Substituir BEHOLD_WIDGET_ID abaixo
 *
 * Posts novos no Instagram aparecem automaticamente, sem precisar
 * mexer no código.
 */
const BEHOLD_WIDGET_ID: string = "9CKgTvhFj2Qq6oVEsqCi";

export function InstagramFeed() {
  const setupConfigured =
    !!BEHOLD_WIDGET_ID && BEHOLD_WIDGET_ID !== "PLACEHOLDER_WIDGET_ID";

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        background: "var(--platinum)",
        color: "var(--jet-black)",
        padding: "clamp(3rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)",
      }}
    >
      {/* Header da seção */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1.5rem",
          marginBottom: "clamp(2rem, 4vw, 3.5rem)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.78rem",
              color: "var(--graphite)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Acompanhe
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
              color: "var(--jet-black)",
              margin: 0,
              lineHeight: 1.05,
              fontFamily: "inherit",
            }}
          >
            @major.agencia
          </h2>
        </div>

        <a
          href="https://www.instagram.com/major.agencia/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.7rem 1.2rem",
            background: "var(--jet-black)",
            color: "var(--platinum)",
            border: "none",
            borderRadius: 999,
            fontSize: "0.82rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "transform 0.2s ease",
          }}
        >
          Ver no Instagram <span style={{ fontSize: "1.05em" }}>↗</span>
        </a>
      </div>

      {/* Widget Behold.so OU placeholder se ainda não configurado */}
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {setupConfigured ? (
          <>
            {/* Custom element <behold-widget> renderizado via innerHTML
                pra evitar problemas de JSX/atributos kebab-case. */}
            <div
              dangerouslySetInnerHTML={{
                __html: `<behold-widget feed-id="${BEHOLD_WIDGET_ID}"></behold-widget>`,
              }}
            />
            <Script
              src="https://w.behold.so/widget.js"
              type="module"
              strategy="afterInteractive"
            />
          </>
        ) : (
          <PlaceholderGrid />
        )}
      </div>
    </section>
  );
}

/**
 * Grid placeholder mostrado enquanto BEHOLD_WIDGET_ID não tá configurado.
 * Vai sumir assim que o ID for colado acima. Serve só pra você ver o
 * layout antes de finalizar o setup.
 */
function PlaceholderGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "0.5rem",
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            aspectRatio: "1 / 1",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px dashed rgba(255,255,255,0.12)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.35)",
            fontSize: "0.78rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Post {i + 1}
        </div>
      ))}
    </div>
  );
}
