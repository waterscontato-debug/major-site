'use client';

/* eslint-disable @next/next/no-img-element */
/**
 * Section "Fundadores" — apresenta os 3 sócios da Major em fotos
 * verticais lado a lado (Guiga / Leonardo / Roger).
 *
 * As fotos originais são paisagem (provavelmente quadradas ou wide).
 * Pra conseguir formato vertical, uso aspect-ratio: 3/4 + object-fit:
 * cover + object-position pra centralizar no rosto.
 *
 * Posicionamento: entra DEPOIS do Major2026 (portfólio), antes da
 * section de vídeo (VideoMajor).
 */
import { motion } from "framer-motion";

interface Socio {
  nome: string;
  funcao: string;
  foto: string;
  /** Posição do object-position pra alinhar o rosto na crop vertical */
  fotoPos?: string;
  /** Microcopy embaixo do nome (especialidade ou frase curta) */
  bio: string;
}

const SOCIOS: Socio[] = [
  {
    nome: "Guiga",
    funcao: "Direção criativa",
    foto: "/Guiga.png",
    fotoPos: "center 30%",
    bio: "Direção de arte, estética e narrativa. Quem garante que tudo que sai da Major tem coerência visual.",
  },
  {
    nome: "Leonardo",
    funcao: "Direção de operações",
    foto: "/Leo.png",
    fotoPos: "center 25%",
    bio: "Estrutura, processo e gente. Quem mantém a operação rodando sem que ninguém perceba que ela existe.",
  },
  {
    nome: "Roger",
    funcao: "Direção de estratégia",
    foto: "/Roger.png",
    fotoPos: "center 28%",
    bio: "Posicionamento, planejamento e tecnologia. Quem transforma marketing em sistema mensurável.",
  },
];

function SocioCard({ s, idx }: { s: Socio; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: idx * 0.12,
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
      }}
    >
      {/* Foto vertical — crop pelo rosto */}
      <div
        style={{
          width: "100%",
          aspectRatio: "3 / 4",
          background: "var(--onyx)",
          overflow: "hidden",
          borderRadius: 8,
          position: "relative",
        }}
      >
        <img
          src={s.foto}
          alt={s.nome}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: s.fotoPos ?? "center",
            display: "block",
            filter: "grayscale(15%) brightness(0.95)",
            transition: "filter 0.5s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className="socio-foto"
        />
      </div>

      {/* Nome + função */}
      <div>
        <div
          style={{
            fontFamily: "'Times New Roman', Georgia, serif",
            fontStyle: "italic",
            fontSize: "0.78rem",
            color: "var(--ash)",
            letterSpacing: "0.02em",
            marginBottom: "0.3rem",
          }}
        >
          ({String(idx + 1).padStart(2, "0")}) {s.funcao}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
            color: "var(--platinum)",
            margin: 0,
            marginBottom: "0.6rem",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          {s.nome}
        </h3>
        <p
          style={{
            fontSize: "0.92rem",
            color: "var(--ash)",
            lineHeight: 1.55,
            margin: 0,
            maxWidth: 340,
          }}
        >
          {s.bio}
        </p>
      </div>
    </motion.div>
  );
}

export function Fundadores() {
  return (
    <section
      id="fundadores"
      style={{
        background: "var(--jet-black)",
        padding: "clamp(5rem, 10vw, 9rem) 0 clamp(4rem, 8vw, 7rem)",
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 3rem)",
        }}
      >
        {/* Cabeçalho */}
        <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)", maxWidth: 760 }}>
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
            (fundadores)
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
              marginBottom: "1rem",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
            }}
          >
            Três sócios,{" "}
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
              uma direção só
            </span>
            .
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{
              fontSize: "1.05rem",
              color: "var(--ash)",
              lineHeight: 1.55,
              maxWidth: 600,
              margin: 0,
            }}
          >
            Cada um cuida de uma área, mas todos respondem pelo todo. Sem
            departamentos isolados, sem ego de fundador, sem decisão importante
            tomada sem os três na mesa.
          </motion.p>
        </div>

        {/* Grid das 3 fotos verticais lado a lado */}
        <div
          className="fundadores-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          {SOCIOS.map((s, i) => (
            <SocioCard key={s.nome} s={s} idx={i} />
          ))}
        </div>
      </div>

      <style>{`
        .socio-foto:hover {
          filter: grayscale(0%) brightness(1.05) !important;
          transform: scale(1.02);
        }
        @media (max-width: 820px) {
          .fundadores-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
