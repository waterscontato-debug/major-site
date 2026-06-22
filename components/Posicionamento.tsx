'use client';

/**
 * Section "Posicionamento" — manifesto curto + barra de CTAs.
 *
 * Funciona como bridge entre Clientes (prova social) e Servicos
 * (classificação detalhada). Define POR QUE a Major é diferente
 * antes de detalhar O QUE ela faz.
 *
 * Botão estilo Player Roberts Bell: barra horizontal com células
 * divididas por linhas finas, sem cantos arredondados, sem fundo
 * — só bordas, texto e hover de inversão (fundo Jet Black + texto
 * Platinum).
 *
 * Paleta clara: bg Platinum, texto Jet Black.
 */
import { motion } from "framer-motion";

interface CTA {
  label: string;
  href: string;
  external?: boolean;
}

const CTAS: CTA[] = [
  { label: "Ver portfólio", href: "#major-2026" },
  {
    label: "WhatsApp",
    href: "https://wa.me/5561982792200?text=" +
      encodeURIComponent("Oi! Vim pelo site da Major e gostaria de conversar."),
    external: true,
  },
];

/** Seta diagonal pro canto direito do botão, estilo PRB */
function ArrowUpRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d="M3 11 L11 3 M5 3 L11 3 L11 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        fill="none"
      />
    </svg>
  );
}

export function Posicionamento() {
  return (
    <section
      id="posicionamento"
      style={{
        background: "var(--platinum)",
        padding: "clamp(3rem, 6vw, 5rem) 0 clamp(2rem, 4vw, 3.5rem)",
        position: "relative",
        borderBottom: "1px solid rgba(26, 26, 26, 0.12)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        {/* Eyebrow em itálico */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Times New Roman', Georgia, serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "var(--graphite)",
            marginBottom: "1.5rem",
            letterSpacing: "0.02em",
          }}
        >
          (posicionamento)
        </motion.div>

        {/* Título manifesto — grande, leve, com pontinho */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
            color: "var(--jet-black)",
            margin: 0,
            marginBottom: "1.4rem",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            textTransform: "uppercase",
            maxWidth: 920,
          }}
        >
          Da estratégia{" "}
          <span
            style={{
              fontFamily: "'Times New Roman', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              textTransform: "lowercase",
              letterSpacing: "-0.005em",
              fontSize: "1.18em",
            }}
          >
            ao primeiro reels publicado
          </span>
          .
        </motion.h2>

        {/* Subtítulo — explicação curta do diferencial */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            fontSize: "1.05rem",
            color: "var(--graphite)",
            lineHeight: 1.55,
            maxWidth: 620,
            margin: 0,
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
            textAlign: "justify",
            textJustify: "inter-word",
            hyphens: "auto",
          }}
        >
          A Major não é um pedaço do seu marketing — é a estrutura inteira.
          Todas as áreas dentro da mesma agência, sob uma direção criativa
          só. Sem terceirização, sem ruído entre fornecedores.
        </motion.p>

        {/* Barra de CTAs estilo Player Roberts Bell */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="prb-bar"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${CTAS.length}, minmax(0, 1fr))`,
            borderTop: "1px solid var(--jet-black)",
            borderBottom: "1px solid var(--jet-black)",
            maxWidth: 720,
          }}
        >
          {CTAS.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="prb-cell"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.6rem",
                padding: "1.05rem 1.1rem",
                fontSize: "0.92rem",
                fontWeight: 500,
                color: "var(--jet-black)",
                background: "transparent",
                borderLeft: i === 0 ? "none" : "1px solid var(--jet-black)",
                transition:
                  "background 0.3s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <span>{c.label}</span>
              <ArrowUpRight />
            </a>
          ))}
        </motion.div>
      </div>

      <style>{`
        /* Hover: célula vira "preenchida" (Jet Black + Platinum) */
        .prb-cell:hover {
          background: var(--jet-black) !important;
          color: var(--platinum) !important;
        }

        @media (max-width: 640px) {
          .prb-bar {
            grid-template-columns: 1fr !important;
            max-width: 100% !important;
          }
          .prb-cell {
            min-height: 56px !important;
          }
          .prb-cell {
            border-left: none !important;
            border-top: 1px solid var(--jet-black) !important;
          }
          .prb-cell:first-child {
            border-top: none !important;
          }
        }
      `}</style>
    </section>
  );
}
