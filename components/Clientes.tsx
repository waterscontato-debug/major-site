'use client';

/* eslint-disable @next/next/no-img-element */
/**
 * Section "Clientes" — dois marquees infinitos em direções opostas
 * (linha de cima → esquerda, linha de baixo → direita). Pausa no hover.
 *
 * Pra adicionar/trocar logos:
 *   1. Arraste o arquivo (svg/png transparente, fundo claro) pra
 *      /public/clientes/{nome-em-slug}.png
 *   2. Atualize o array CLIENTES abaixo. Se uma logo não existir,
 *      o card mostra o NOME do cliente como fallback.
 *
 * Por que CSS animation e não Framer/JS?
 *   - 60fps garantido (animação em GPU via transform)
 *   - Funciona mesmo com JS desligado / hydration ainda rolando
 *   - Sem RAF nem listener de scroll consumindo CPU
 */
import { motion } from "framer-motion";

interface Cliente {
  nome: string;
  logo?: string;
  setor?: string;
}

/**
 * 20 logos do portfólio Major (arquivos em /public/clientes/prancheta-X.png).
 * As logos são monocromáticas em fundo transparente — funcionam direto
 * sobre os cards Onyx escuros.
 *
 * NOTA: os nomes ainda estão como "Cliente N" (placeholder). Roger vai
 * me passar o mapping "Prancheta X = Marca Y" pra eu trocar o `nome`
 * (usado em alt= e fallback) por algo descritivo.
 */
const CLIENTES: Cliente[] = [
  { nome: "Cliente 3",  logo: "/clientes/prancheta-3.png" },
  { nome: "Cliente 4",  logo: "/clientes/prancheta-4.png" },
  { nome: "Cliente 5",  logo: "/clientes/prancheta-5.png" },
  { nome: "Cliente 6",  logo: "/clientes/prancheta-6.png" },
  { nome: "Cliente 8",  logo: "/clientes/prancheta-8.png" },
  { nome: "Cliente 9",  logo: "/clientes/prancheta-9.png" },
  { nome: "Cliente 10", logo: "/clientes/prancheta-10.png" },
  { nome: "Cliente 11", logo: "/clientes/prancheta-11.png" },
  { nome: "Cliente 12", logo: "/clientes/prancheta-12.png" },
  { nome: "Cliente 14", logo: "/clientes/prancheta-14.png" },
  { nome: "Cliente 15", logo: "/clientes/prancheta-15.png" },
  { nome: "Cliente 16", logo: "/clientes/prancheta-16.png" },
  { nome: "Cliente 18", logo: "/clientes/prancheta-18.png" },
  { nome: "Cliente 19", logo: "/clientes/prancheta-19.png" },
  { nome: "Cliente 20", logo: "/clientes/prancheta-20.png" },
  { nome: "Cliente 21", logo: "/clientes/prancheta-21.png" },
  { nome: "Cliente 22", logo: "/clientes/prancheta-22.png" },
  { nome: "Cliente 23", logo: "/clientes/prancheta-23.png" },
  { nome: "Cliente 24", logo: "/clientes/prancheta-24.png" },
  { nome: "Cliente 25", logo: "/clientes/prancheta-25.png" },
];

/**
 * Divide a lista em 2 rows distribuindo as marcas alternadamente
 * pra cada linha ter mistura de setores (não fica "linha das clínicas"
 * em cima e "linha de eventos" embaixo).
 */
const ROW_1 = CLIENTES.filter((_, i) => i % 2 === 0);
const ROW_2 = CLIENTES.filter((_, i) => i % 2 === 1);

function ClienteCard({ c }: { c: Cliente }) {
  return (
    <div
      className="cliente-card"
      style={{
        flex: "0 0 auto",
        width: "clamp(240px, 22vw, 340px)",
        height: "clamp(120px, 11vw, 170px)",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.2rem 1.6rem",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      {c.logo ? (
        <img
          src={c.logo}
          alt={c.nome}
          loading="lazy"
          draggable={false}
          style={{
            maxWidth: "92%",
            maxHeight: "82%",
            objectFit: "contain",
            opacity: 0.85,
            transition: "opacity 0.3s ease",
            userSelect: "none",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            const next = e.currentTarget.nextElementSibling as HTMLElement | null;
            if (next) next.style.display = "block";
          }}
        />
      ) : null}

      <div
        style={{
          display: c.logo ? "none" : "block",
          textAlign: "center",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
          color: "var(--muted)",
          letterSpacing: "0.02em",
          lineHeight: 1.15,
          textTransform: "uppercase",
          userSelect: "none",
        }}
      >
        {c.nome}
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  duration = 50,
}: {
  items: Cliente[];
  direction?: "left" | "right";
  duration?: number;
}) {
  // Duplicamos a lista pra criar o loop seamless: quando o track
  // chegou em -50% de translateX, a segunda metade já está exatamente
  // onde a primeira começou, então o jump é invisível.
  const doubled = [...items, ...items];

  return (
    <div className="marquee-row" style={{ overflow: "hidden", width: "100%" }}>
      <div
        className={`marquee-track ${direction === "right" ? "reverse" : ""}`}
        style={{
          display: "flex",
          gap: "0.85rem",
          width: "max-content",
          animationDuration: `${duration}s`,
        }}
      >
        {doubled.map((c, i) => (
          <ClienteCard key={`${c.nome}-${i}`} c={c} />
        ))}
      </div>
    </div>
  );
}

export function Clientes() {
  return (
    <section
      id="clientes"
      style={{
        background: "var(--bg)",
        padding: "clamp(2.5rem, 5vw, 4.5rem) 0 clamp(2rem, 4vw, 3.5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "0.72rem",
            color: "var(--accent)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: "0.9rem",
            textAlign: "center",
          }}
        >
          Quem confia
        </motion.div>

        {/* Título centralizado, igual a referência */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            margin: 0,
            textAlign: "center",
            lineHeight: 1.05,
            color: "var(--text)",
          }}
        >
          <span
            className="h-display"
            style={{
              display: "block",
              fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Marcas que confiam
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "'Times New Roman', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.8rem, 4vw, 3.1rem)",
              color: "var(--muted)",
              letterSpacing: "-0.01em",
              marginTop: "0.1em",
            }}
          >
            na Major
          </span>
        </motion.h2>
      </div>

      {/* Marquees — saem do container pra ocupar a viewport inteira */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{
          marginTop: "clamp(1.5rem, 3vw, 2.5rem)",
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
          position: "relative",
        }}
      >
        <MarqueeRow items={ROW_1} direction="left" duration={55} />
        <MarqueeRow items={ROW_2} direction="right" duration={60} />

        {/* Gradientes nas laterais — efeito "fade out" estilo Stripe/Linear */}
        <div className="marquee-fade marquee-fade-left" aria-hidden="true" />
        <div className="marquee-fade marquee-fade-right" aria-hidden="true" />
      </motion.div>

      {/* Rodapé sutil */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          marginTop: "clamp(1.2rem, 2.5vw, 2rem)",
          fontSize: "0.85rem",
          color: "var(--dim)",
          letterSpacing: "0.04em",
          textAlign: "center",
        }}
      >
        + de 20 marcas no portfólio atual da Major.
      </motion.div>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        .marquee-track {
          animation-name: marquee-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .marquee-track.reverse {
          animation-name: marquee-right;
        }

        /* Hover individual no card */
        .cliente-card:hover {
          border-color: rgba(91, 141, 239, 0.4) !important;
          background: rgba(34, 34, 38, 0.95) !important;
        }
        .cliente-card:hover img {
          opacity: 1 !important;
        }

        /* Gradientes laterais — "fade out" das logos nas bordas */
        .marquee-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          pointer-events: none;
          z-index: 2;
        }
        .marquee-fade-left {
          left: 0;
          background: linear-gradient(
            to right,
            var(--bg) 0%,
            transparent 100%
          );
        }
        .marquee-fade-right {
          right: 0;
          background: linear-gradient(
            to left,
            var(--bg) 0%,
            transparent 100%
          );
        }

        /* Respeita usuários com motion reduzido (acessibilidade) */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
          }
        }

        @media (max-width: 640px) {
          .marquee-fade { width: 60px; }
        }
      `}</style>
    </section>
  );
}
