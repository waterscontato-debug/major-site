'use client';

/* eslint-disable @next/next/no-img-element */
/**
 * PortfolioOverlay — overlay full-screen que abre como se fosse uma
 * página separada do site.
 *
 * Características:
 * - Aparece com fade do backdrop + slide-up do modal
 * - Modal ocupa quase toda a tela, com margem cinza (Graphite) ao redor
 * - Bordas arredondadas pra parecer um "card-página"
 * - Fundo Jet Black, scroll interno
 * - Lista de clientes vertical, cada um com sua section dedicada
 * - Primeiro cliente: Colégio In-Nova (única referência educacional)
 *
 * Como adicionar/editar clientes:
 *   Mexer no array PORTFOLIO no topo. Cada entrada vira uma section
 *   dentro do overlay. Por enquanto sem mídia — quando você me passar
 *   as fotos/vídeos de cada cliente, eu plugo na propriedade `media`.
 */
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioCliente {
  /** Nome do cliente, exibido como título grande */
  nome: string;
  /** Categoria — aparece como tag pequena acima do nome */
  categoria: string;
  /** Subtítulo curto (1-2 frases descrevendo o trabalho com esse cliente) */
  resumo: string;
  /** Lista de entregas/destaques desse cliente */
  destaques?: string[];
  /** URLs de mídia futura (foto/vídeo) — quando Roger me passar */
  media?: string[];
}

const PORTFOLIO: PortfolioCliente[] = [
  {
    nome: "Colégio In-Nova",
    categoria: "Educação",
    resumo:
      "A única referência educacional do portfólio. Reposicionamento de marca, identidade visual, gestão de redes e produção audiovisual mensal — toda a presença digital do colégio sob direção criativa única.",
    destaques: [
      "Identidade visual reformulada",
      "Gestão de redes sociais",
      "Produção audiovisual mensal",
      "Direção de campanhas de matrícula",
    ],
  },
];

/** Botão X estilo PRB */
function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M2 2 L16 16 M16 2 L2 16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ClienteSection({ c, idx }: { c: PortfolioCliente; idx: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
        delay: idx === 0 ? 0.2 : 0, // primeiro animado, resto on-scroll natural
      }}
      style={{
        padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 4vw, 4rem)",
        borderTop: idx === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Categoria + número */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "0.8rem",
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            color: "var(--ash)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          {c.categoria}
        </span>
        <span
          style={{
            fontFamily: "'Times New Roman', Georgia, serif",
            fontStyle: "italic",
            fontSize: "0.85rem",
            color: "var(--ash)",
          }}
        >
          ({String(idx + 1).padStart(2, "0")})
        </span>
      </div>

      {/* Nome do cliente — gigante */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(2.2rem, 5.5vw, 4.4rem)",
          color: "var(--platinum)",
          margin: 0,
          marginBottom: "1.4rem",
          lineHeight: 0.98,
          letterSpacing: "-0.025em",
          textTransform: "uppercase",
        }}
      >
        {c.nome}
      </h3>

      {/* Resumo */}
      <p
        style={{
          fontSize: "1rem",
          color: "var(--ash)",
          lineHeight: 1.6,
          maxWidth: 720,
          marginBottom: c.destaques ? "1.6rem" : 0,
        }}
      >
        {c.resumo}
      </p>

      {/* Destaques em chips */}
      {c.destaques && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem 0.5rem" }}>
          {c.destaques.map((d) => (
            <span
              key={d}
              style={{
                fontSize: "0.72rem",
                color: "var(--platinum)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 100,
                padding: "0.35rem 0.85rem",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {d}
            </span>
          ))}
        </div>
      )}

      {/* Slot pra mídia futura */}
      {c.media && c.media.length > 0 && (
        <div
          style={{
            marginTop: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "0.8rem",
          }}
        >
          {c.media.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${c.nome} — ${i + 1}`}
              loading="lazy"
              style={{
                width: "100%",
                aspectRatio: "4/3",
                objectFit: "cover",
                borderRadius: 8,
                background: "var(--onyx)",
              }}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
}

export function PortfolioOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  /* Trava scroll do body enquanto overlay tá aberto + ESC pra fechar */
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — cinza Graphite (a "margem" ao redor) com blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "linear" }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--graphite)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 100,
              cursor: "pointer",
            }}
          />

          {/* Modal — card grande com bordas arredondadas */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Portfólio Major"
            initial={{ opacity: 0, y: "8%", scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: "5%", scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="portfolio-modal"
            style={{
              position: "fixed",
              top: "clamp(0.8rem, 3vw, 3rem)",
              left: "clamp(0.8rem, 3vw, 3rem)",
              right: "clamp(0.8rem, 3vw, 3rem)",
              bottom: "clamp(0.8rem, 3vw, 3rem)",
              background: "var(--jet-black)",
              borderRadius: "clamp(10px, 1.6vw, 20px)",
              zIndex: 101,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header sticky */}
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "clamp(1.2rem, 2vw, 1.8rem) clamp(2rem, 4vw, 4rem)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "var(--jet-black)",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.7rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
                    color: "var(--platinum)",
                    letterSpacing: "-0.01em",
                    textTransform: "uppercase",
                  }}
                >
                  Portfólio Major
                </span>
                <span
                  style={{
                    fontFamily: "'Times New Roman', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "0.85rem",
                    color: "var(--ash)",
                  }}
                >
                  ({PORTFOLIO.length} clientes)
                </span>
              </div>

              <button
                onClick={onClose}
                aria-label="Fechar portfólio"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "var(--platinum)",
                  padding: "0.5rem 0.9rem",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: "0.78rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  transition: "background 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                Fechar
                <CloseIcon />
              </button>
            </header>

            {/* Body — scrollável */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                background: "var(--jet-black)",
              }}
            >
              {PORTFOLIO.map((c, i) => (
                <ClienteSection key={c.nome} c={c} idx={i} />
              ))}

              {/* Footer minúsculo */}
              <div
                style={{
                  padding: "clamp(2rem, 4vw, 3rem) clamp(2rem, 4vw, 4rem)",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "0.78rem",
                  color: "var(--ash)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                Portfólio Major — DF + 3 estados + 3 países
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
