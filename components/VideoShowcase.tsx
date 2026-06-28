'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";

/**
 * Seção VideoShowcase — vídeo grande do telão da Major rodando em loop.
 * Tem título "Conheça o que cria a Major" e botão pra ligar/desligar
 * volume (começa mutado pra atender política de autoplay dos browsers).
 */
export function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener("canplay", tryPlay, { once: true });
  }, []);

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    const novo = !muted;
    v.muted = novo;
    setMuted(novo);
    // Garante que continua rodando após a interação do user
    v.play().catch(() => {});
  }

  return (
    <section
      style={{
        width: "100%",
        background: "#000000",
        padding:
          "clamp(2.5rem, 6vw, 5.5rem) clamp(1rem, 3vw, 3rem)",
      }}
    >
      {/* Header da seção: título centralizado em 2 linhas + botão embaixo */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(1rem, 2vw, 1.6rem)",
          marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "var(--text)",
            lineHeight: 1.05,
          }}
        >
          <span
            className="h-display"
            style={{
              display: "block",
              fontSize: "clamp(1.8rem, 4vw, 3.4rem)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            Conheça
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "'Times New Roman', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
              letterSpacing: "-0.01em",
              marginTop: "0.15em",
            }}
          >
            quem cria a Major
          </span>
        </h2>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Ligar volume" : "Desligar volume"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.6rem 1.05rem",
            background: muted ? "transparent" : "var(--platinum)",
            color: muted ? "var(--text)" : "var(--jet-black)",
            border: `1px solid ${muted ? "rgba(224,224,224,0.4)" : "var(--platinum)"}`,
            borderRadius: 999,
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
          }}
        >
          <span style={{ fontSize: "1.05em", lineHeight: 1 }}>
            {muted ? "🔇" : "🔊"}
          </span>
          {muted ? "Ligar volume" : "Desligar volume"}
        </button>
      </div>

      {/* Vídeo grande */}
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <video
          ref={videoRef}
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="auto"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "92vh",
            objectFit: "cover",
            borderRadius: "clamp(14px, 1.8vw, 24px)",
            display: "block",
          }}
        >
          <source src="/Unico-Major-Telao-2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Bloco "Sobre a Major": texto justificado, tom comercial */}
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          marginTop: "clamp(2.5rem, 5vw, 4.5rem)",
          padding: "0 clamp(0.5rem, 1vw, 1rem)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "0.7rem",
            color: "var(--ash)",
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            fontWeight: 600,
            marginBottom: "0.65rem",
          }}
        >
          Sobre a Major
        </div>
        <p
          style={{
            fontSize: "clamp(0.85rem, 0.95vw, 0.98rem)",
            lineHeight: 1.65,
            color: "var(--text)",
            fontWeight: 400,
            margin: 0,
            opacity: 0.9,
            textAlign: "justify",
            hyphens: "auto",
            WebkitHyphens: "auto",
          }}
        >
          A Major constrói marcas que ocupam o topo. Combinamos estratégia,
          conteúdo de alta qualidade e produção dedicada pra entregar
          resultado consistente. <strong style={{ fontWeight: 600 }}>Não
          vendemos sonho — corremos atrás dos sonhos dos nossos
          clientes</strong>, transformando ambição em plano de execução e
          plano em entrega. Aqui você encontra a equipe certa pra colocar
          sua empresa onde ela precisa estar.{" "}
          <strong style={{ fontWeight: 600 }}>Pode deixar conosco.</strong>
        </p>
      </div>
    </section>
  );
}
