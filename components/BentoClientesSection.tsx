'use client';

/**
 * Section wrapper que envolve o BentoClientes com título Major.
 * Vai na home logo depois do CorridorSection e antes do Proposta.
 *
 * Contém o CSS responsivo do bento: em desktop 3 cols × 3 rows,
 * em mobile cai pra 2 colunas com vídeo ocupando fileira dupla no topo.
 */
import { BentoClientes } from "./BentoClientes";

export function BentoClientesSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        background: "var(--jet-black, #1A1A1A)",
        padding: "clamp(3.5rem, 7vw, 6rem) 0",
        overflow: "hidden",
      }}
      aria-label="Cases detalhados"
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
          <div
            style={{
              fontSize: "0.7rem",
              color: "var(--ash, #BFBFBF)",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontWeight: 600,
              marginBottom: "0.75rem",
            }}
          >
            Cases
          </div>
          <h2
            style={{
              margin: 0,
              color: "var(--platinum, #E0E0E0)",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
              maxWidth: 820,
            }}
          >
            Cada cliente,{" "}
            <span
              style={{
                fontFamily: "'Times New Roman', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                textTransform: "lowercase",
                fontSize: "1.18em",
                letterSpacing: "-0.005em",
              }}
            >
              uma historia
            </span>
            .
          </h2>
          <p
            style={{
              marginTop: "1rem",
              maxWidth: 560,
              color: "var(--ash, #BFBFBF)",
              fontSize: "0.95rem",
              lineHeight: 1.55,
            }}
          >
            Arraste pro lado ou use as setas pra navegar entre os cases.
          </p>
        </div>

        <BentoClientes />
      </div>

      {/* CSS responsivo do bento — em mobile empilha */}
      <style>{`
        .bento-nav-arrow:hover {
          background: rgba(224,224,224,0.15) !important;
          border-color: rgba(224,224,224,0.3) !important;
        }
        @media (max-width: 900px) {
          .bento-cliente {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto auto auto auto !important;
          }
          /* Vídeo: coluna 1-2 (full width), primeira linha */
          .bento-cliente .bento-video {
            grid-column: 1 / span 2 !important;
            grid-row: 1 / span 1 !important;
            aspect-ratio: 4 / 5 !important;
            min-height: 380px !important;
          }
          /* Logo + fotos + texto redistribuidos em 2 colunas */
          .bento-cliente > .bento-cel:nth-child(2) {
            grid-column: 1 / span 1 !important;
            grid-row: 2 / span 1 !important;
          }
          .bento-cliente > .bento-cel:nth-child(3) {
            grid-column: 2 / span 1 !important;
            grid-row: 2 / span 1 !important;
          }
          .bento-cliente > .bento-cel:nth-child(4) {
            grid-column: 1 / span 1 !important;
            grid-row: 3 / span 1 !important;
          }
          .bento-cliente > .bento-cel:nth-child(5) {
            grid-column: 2 / span 1 !important;
            grid-row: 3 / span 1 !important;
          }
          .bento-cliente > .bento-cel:nth-child(6) {
            grid-column: 1 / span 2 !important;
            grid-row: 4 / span 1 !important;
          }
        }
        @media (max-width: 480px) {
          .bento-nav-arrow {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
