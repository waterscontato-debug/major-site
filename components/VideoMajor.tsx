'use client';

/* eslint-disable @next/next/no-img-element */
/**
 * Section "VideoMajor" — apresenta um vídeo institucional curto
 * explicando o que é a Major.
 *
 * Paleta: Onyx + Graphite + Platinum — mais clara que as sections
 * Jet Black em volta, criando um respiro tonal no scroll.
 *
 * Pra colocar o vídeo real:
 *   - Hospede no YouTube/Vimeo ou no /public/ do projeto
 *   - Troque o `VIDEO_SRC` abaixo (URL ou caminho local)
 *   - Se for YouTube/Vimeo, troque `<video>` por `<iframe>` com a URL
 *     de embed (info no comentário do componente VideoPlayer)
 */
import { useState, useRef } from "react";
import { motion } from "framer-motion";

/** Caminho do vídeo (relativo a /public ou URL externa).
 *  Por enquanto deixei vazio — quando você me passar o arquivo,
 *  basta jogar em /public/ e atualizar essa string. */
const VIDEO_SRC = ""; // ex: "/major-manifesto.mp4"
const VIDEO_POSTER = "/Guiga.png"; // imagem de capa antes do play

/** Botão de play estilo cinema (círculo + triângulo) */
function PlayButton({ size = 88 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <circle cx="44" cy="44" r="43" stroke="currentColor" strokeWidth="1.5" />
      <path d="M36 28 L36 60 L62 44 Z" fill="currentColor" />
    </svg>
  );
}

function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      // Fallback enquanto não tem vídeo real configurado
      alert("Vídeo ainda não configurado. Coloque o arquivo em /public/ e atualize VIDEO_SRC.");
    }
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        background: "var(--jet-black)",
        borderRadius: "clamp(8px, 1.2vw, 14px)",
        overflow: "hidden",
      }}
      className="video-player"
    >
      {/* Vídeo nativo — só aparece se tiver VIDEO_SRC definido */}
      {VIDEO_SRC ? (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={VIDEO_POSTER}
          controls={playing}
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <img
          src={VIDEO_POSTER}
          alt="Vídeo Major"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.6)",
          }}
        />
      )}

      {/* Botão de play centralizado — esconde quando o vídeo tocar */}
      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Tocar vídeo da Major"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            color: "var(--platinum)",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          className="video-play-btn"
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "clamp(70px, 8vw, 110px)",
              height: "clamp(70px, 8vw, 110px)",
              transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="video-play-icon"
          >
            <PlayButton size={110} />
          </span>
        </button>
      )}
    </div>
  );
}

export function VideoMajor() {
  return (
    <section
      id="video"
      style={{
        background: "var(--onyx)",
        padding: "clamp(5rem, 10vw, 9rem) 0 clamp(5rem, 9vw, 8rem)",
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 3rem)",
        }}
      >
        {/* Cabeçalho */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 4rem)",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
            alignItems: "end",
          }}
          className="video-header"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Times New Roman', Georgia, serif",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "var(--ash)",
                marginBottom: "0.9rem",
              }}
            >
              (a major em movimento)
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
                color: "var(--platinum)",
                margin: 0,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                textTransform: "uppercase",
              }}
            >
              Em{" "}
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
                90 segundos
              </span>
              , o que a major é.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{
              fontSize: "1rem",
              color: "var(--ash)",
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 480,
              textAlign: "justify",
              hyphens: "auto",
            }}
            className="video-sub"
          >
            Antes de marcar uma conversa, dá um play. É a forma mais rápida
            de entender o tom, a operação e quem está por trás da Major — sem
            precisar ler uma palavra a mais.
          </motion.p>
        </div>

        {/* Player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <VideoPlayer />
        </motion.div>
      </div>

      <style>{`
        .video-play-btn:hover .video-play-icon {
          transform: scale(1.1);
        }
        .video-play-btn:hover {
          background: rgba(0, 0, 0, 0.2) !important;
        }
        @media (max-width: 820px) {
          .video-header {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            align-items: start !important;
          }
        }
      `}</style>
    </section>
  );
}
