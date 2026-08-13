'use client';

/**
 * Section wrapper que renderiza o StreamCorridor com título Major.
 * Fica logo abaixo da section VideoBg (a "Majors" com vídeo da equipe)
 * e antes da Proposta.
 *
 * Placeholder: usa as pranchetas dos clientes. Trocar por fotos reais
 * das produções quando estiverem prontas.
 */
import { StreamCorridor, type StreamImage } from "./StreamCorridor";

const IMAGES: StreamImage[] = [
  { src: "/clientes/prancheta-3.png",  alt: "" },
  { src: "/clientes/prancheta-6.png",  alt: "" },
  { src: "/clientes/prancheta-10.png", alt: "" },
  { src: "/clientes/prancheta-14.png", alt: "" },
  { src: "/clientes/prancheta-16.png", alt: "" },
  { src: "/clientes/prancheta-19.png", alt: "" },
  { src: "/clientes/prancheta-22.png", alt: "" },
  { src: "/clientes/prancheta-25.png", alt: "" },
  { src: "/clientes/prancheta-11.png", alt: "" },
];

export function CorridorSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        background: "var(--jet-black, #1A1A1A)",
        overflow: "hidden",
        padding: "clamp(4rem, 8vw, 7rem) 0 clamp(4rem, 8vw, 7rem)",
      }}
      aria-label="Cases em movimento"
    >
      {/* Título centralizado por cima do corredor */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 4vw, 3rem)",
          textAlign: "center",
          position: "relative",
          zIndex: 3,
        }}
      >
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
          Cases em movimento
        </div>
        <h2
          style={{
            margin: 0,
            color: "var(--platinum, #E0E0E0)",
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            textTransform: "uppercase",
          }}
        >
          Um fluxo{" "}
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
            que não para
          </span>
          .
        </h2>
      </div>

      {/* Corredor com altura própria — o container define o "cqw" da geometria */}
      <StreamCorridor
        images={IMAGES}
        cards={9}
        speed={18}
        axis={55}
        style={{
          width: "100%",
          height: "clamp(360px, 55vw, 620px)",
          marginTop: "clamp(1.5rem, 3vw, 2.5rem)",
        }}
      />
    </section>
  );
}
