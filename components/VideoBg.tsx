'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";

/**
 * Seção com vídeo de background full-screen. No canto esquerdo,
 * o logotipo "MAJOR" tipográfico + ícone (seta) da Major lado a lado.
 *
 * Posicionada entre Major2026 (portfólio) e Proposta na home.
 */
export function VideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay programático — alguns browsers exigem chamada explícita
  // mesmo com o atributo autoPlay.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener("canplay", tryPlay, { once: true });
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Vídeo de background — autoPlay, muted, loop pra rodar como ambiente. */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/Timeline-1.mp4" type="video/mp4" />
      </video>

      {/* Overlay sutil pra dar contraste com o texto dos dois lados */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Layout em 2 colunas centralizadas verticalmente:
          Esquerda: "Majors" + seta  |  Direita: descrição */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          padding: "clamp(2rem, 5vw, 5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "clamp(2rem, 5vw, 6rem)",
        }}
      >
        {/* Esquerda: Majors + seta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(0.9rem, 1.4vw, 1.6rem)",
            flex: "0 0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              margin: 0,
              lineHeight: 1,
              fontFamily: "inherit",
            }}
          >
            Majors
          </h2>
          <img
            src="/logo-major-icone.png"
            alt=""
            aria-hidden
            style={{
              height: "clamp(36px, 5vw, 72px)",
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* Direita: descrição da equipe */}
        <p
          style={{
            fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)",
            lineHeight: 1.55,
            color: "var(--muted)",
            fontWeight: 400,
            maxWidth: "min(440px, 40vw)",
            margin: 0,
            flex: "0 1 auto",
          }}
        >
          As pessoas habilidosas por trás da Major. Estrategistas,
          criativos, designers e produtores que fazem cada entrega
          acontecer. É essa equipe que sustenta tudo o que você vê.
        </p>
      </div>
    </section>
  );
}
