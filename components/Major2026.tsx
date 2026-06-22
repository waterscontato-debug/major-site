'use client';

/* eslint-disable @next/next/no-img-element */
/**
 * Section "Major 2026" — assinatura tipográfica + CTA pro portfólio.
 *
 * Estilo inspirado em Furni Co. 2022: tipografia gigante peso médio,
 * micro-info distribuída pelos cantos (cidade, alcance, clientes),
 * fundo escuro. Letras surgem de baixo pra cima em stagger.
 *
 * Posicionamento: entra DEPOIS da Paz, antes dos Cases.
 *
 * Inclui um botão "Portfólio" que abre o componente PortfolioOverlay
 * (overlay full-screen com bordas arredondadas e margem cinza).
 */
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioOverlay } from "./PortfolioOverlay";

/* Variantes Framer pra stagger de palavras subindo de baixo */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};
const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/** Pega uma string e devolve cada palavra dentro de um <span>
 *  com overflow hidden no pai e variante "word" no filho. Cria o
 *  efeito de letras subindo pra dentro da linha. */
function Reveal({ children, className }: { children: string; className?: string }) {
  return (
    <>
      {children.split(" ").map((w, i) => (
        <span
          key={`${w}-${i}`}
          className={className}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            paddingBottom: "0.08em", // descender breathing room
            lineHeight: 1,
          }}
        >
          <motion.span
            variants={wordVariants}
            style={{ display: "inline-block" }}
          >
            {w}
            {i < children.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/** Seta diagonal ↗ pro botão Portfólio */
function ArrowOut() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d="M5 17 L17 5 M8 5 L17 5 L17 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        fill="none"
      />
    </svg>
  );
}

export function Major2026() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  /* Estado de transição (zoom-in do botão antes de abrir o overlay) */
  const [transitioning, setTransitioning] = useState(false);
  /* Origem do "círculo expansor" — pega a posição do botão no clique */
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
  const btnRef = useRef<HTMLButtonElement>(null);

  /** Handler do clique no botão Portfólio:
   *  1. Captura posição do botão pra usar como origem da expansão
   *  2. Liga `transitioning` → renderiza um círculo terracota que cresce
   *     do ponto do clique cobrindo a tela
   *  3. Após 480ms, abre o overlay do portfólio
   *  4. Após mais 120ms, esconde o círculo (overlay já tomou a tela) */
  function handlePortfolioClick() {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setOrigin({ x: `${cx}px`, y: `${cy}px` });
    }
    setTransitioning(true);
    setTimeout(() => {
      setOverlayOpen(true);
      setTimeout(() => setTransitioning(false), 120);
    }, 480);
  }

  return (
    <>
      <section
        id="major-2026"
        style={{
          background: "var(--jet-black)",
          color: "var(--platinum)",
          // 100svh = small viewport height (sem contar barras do nav mobile)
          // Fallback pra 100vh em browsers antigos.
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(3rem, 6vw, 5rem) clamp(1rem, 3vw, 2rem)",
          position: "relative",
        }}
        className="m2026-section"
      >
        {/* Wrapper interno que define o "retângulo" — todas as 3 linhas
            ocupam exatamente essa largura, com flex space-between alinhando
            o canto esquerdo (M, D, P) e o canto direito (2026, clientes,
            botão) em colunas verticais imaginárias. */}
        <div
          className="m2026-wrap"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(1.5rem, 4vw, 3rem)",
            width: "100%",
          }}
        >
          {/* ===== Linha 1: MAJOR ... [logo] 2026 =====
              Importante: SEM flex-wrap, pra garantir que [logo+2026]
              não vá pra próxima linha quando MAJOR fica largo demais. */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(2.6rem, 8.2vw, 6.8rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
              marginBottom: "clamp(0.3rem, 0.6vw, 0.6rem)",
              whiteSpace: "nowrap",
            }}
          >
            {/* Lado esquerdo: MAJOR sozinho */}
            <Reveal>MAJOR</Reveal>

            {/* Lado direito: [logo] + 2026 agrupados (estilo "©2022" da ref FURNI) */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "clamp(0.4rem, 1vw, 0.9rem)",
                flexShrink: 0,
              }}
            >
              <img
                src="/logo-major-icone.png"
                alt="Major"
                style={{
                  height: "0.75em",
                  width: "auto",
                  display: "block",
                  filter: "brightness(1.1)",
                  flexShrink: 0,
                }}
              />
              <Reveal>2026</Reveal>
            </span>
          </motion.div>

          {/* ===== Linha 2: DF + microcopy  ...  + de 30 clientes ===== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5,
            }}
            className="m2026-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: "2rem",
              marginBottom: "clamp(0.8rem, 1.8vw, 1.6rem)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: "clamp(0.5rem, 1.2vw, 1rem)",
            }}
          >
            {/* Lado esquerdo — DF + complemento */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.8rem", flexWrap: "wrap" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  color: "var(--platinum)",
                }}
              >
                DF
              </span>
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "var(--ash)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  maxWidth: 280,
                  lineHeight: 1.5,
                }}
              >
                (e em mais 3 estados <br className="m2026-br" />e 3 países)
              </span>
            </div>

            {/* Lado direito — + de 30 clientes */}
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "var(--ash)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.3rem",
                }}
              >
                Portfólio
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "var(--platinum)",
                }}
              >
                + de 30 clientes
              </div>
            </div>
          </motion.div>

          {/* ===== Linha 3: PORTFÓLIO + botão quadrado ===== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.65,
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "clamp(1rem, 2.5vw, 2rem)",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "clamp(2.6rem, 8.2vw, 6.8rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
                textTransform: "uppercase",
                color: "var(--platinum)",
                whiteSpace: "nowrap",
              }}
            >
              Portfólio
            </span>

            <button
              ref={btnRef}
              onClick={handlePortfolioClick}
              className="m2026-btn"
              aria-label="Abrir portfólio"
              disabled={transitioning}
              style={{
                width: "clamp(90px, 11vw, 130px)",
                height: "clamp(90px, 11vw, 130px)",
                border: "1.5px solid var(--platinum)",
                background: "transparent",
                color: "var(--platinum)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: transitioning ? "default" : "pointer",
                transition:
                  "background 0.35s cubic-bezier(0.22, 1, 0.36, 1), color 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                padding: 0,
              }}
            >
              <ArrowOut />
            </button>
          </motion.div>
        </div>

        <style>{`
          /* svh = small viewport height, leva em conta as barras do nav
             mobile que aparecem/desaparecem com scroll. Sem isso, em
             mobile o conteúdo pode ficar empurrado pra baixo do dobrar. */
          @supports (height: 100svh) {
            .m2026-section {
              min-height: 100svh !important;
            }
          }

          .m2026-btn:hover {
            background: var(--accent-warm) !important;
            color: var(--jet-black) !important;
            border-color: var(--accent-warm) !important;
          }

          /* ===== MOBILE =====
             Layout horizontal do desktop é PRESERVADO em mobile.
             Todas as 3 linhas mantêm a mesma estrutura (MAJOR | 2026,
             DF | clientes, PORTFÓLIO | botão), só encolhendo
             proporcionalmente via clamp() com mínimo bem baixo
             pra caber em qualquer viewport. */

          /* Linha 1 (MAJOR + [logo]2026) — clamp do JSX já cuida do
             encolhimento. Aqui só reforçamos mínimos seguros. */
          @media (max-width: 720px) {
            .m2026-wrap {
              padding: 0 clamp(1rem, 4vw, 1.8rem) !important;
            }
            /* Linha 1 — fonte com mínimo bem reduzido pra caber */
            .m2026-wrap > div:nth-child(1) {
              font-size: clamp(1.6rem, 9vw, 6.8rem) !important;
            }
            /* Linha 2 — DF e + de 30 clientes proporcionais */
            .m2026-row > div:first-child > span:first-child {
              font-size: clamp(1.3rem, 6vw, 4.4rem) !important;
            }
            .m2026-row > div:last-child > div:last-child {
              font-size: clamp(1rem, 4.4vw, 3.2rem) !important;
            }
            .m2026-row > div:first-child > span:last-child,
            .m2026-row > div:last-child > div:first-child {
              font-size: clamp(0.6rem, 2vw, 0.78rem) !important;
            }
            /* Linha 3 — PORTFÓLIO + botão proporcionais */
            .m2026-wrap > div:nth-child(3) > span:first-child {
              font-size: clamp(1.6rem, 9vw, 6.8rem) !important;
            }
            .m2026-btn {
              width: clamp(48px, 10vw, 130px) !important;
              height: clamp(48px, 10vw, 130px) !important;
              flex-shrink: 0 !important;
            }
            .m2026-br { display: none !important; }
          }
        `}</style>
      </section>

      {/* Camada de transição — círculo terracota que expande do botão
          até cobrir a tela. Funciona como ponte visual entre o clique
          e a abertura do PortfolioOverlay. */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{
              clipPath: `circle(0% at ${origin.x} ${origin.y})`,
            }}
            animate={{
              clipPath: `circle(150% at ${origin.x} ${origin.y})`,
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.25, ease: "linear" },
            }}
            transition={{
              duration: 0.55,
              ease: [0.7, 0, 0.3, 1],
            }}
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--platinum)",
              zIndex: 200,
              pointerEvents: "none",
              willChange: "clip-path, opacity",
            }}
          />
        )}
      </AnimatePresence>

      {/* Overlay do portfólio — controlado por estado */}
      <PortfolioOverlay open={overlayOpen} onClose={() => setOverlayOpen(false)} />
    </>
  );
}
