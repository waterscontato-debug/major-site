'use client';

/**
 * Section "Paz" — narrativa emocional em 3 colunas (Design Conference ref).
 *
 * A história: a dor de empreender sem ter paz com marketing → o custo
 * invisível disso → a proposta da Major (paz por meio de planejamento
 * sob medida e execução completa).
 *
 * Layout: 3 colunas full-bleed, cada uma com fundo diferente da paleta
 * escura, separadas por divisória sutil. Tipografia Doner Light com
 * respiro generoso pra dar peso editorial.
 *
 * Posicionamento: entra entre Clientes (prova social) e Posicionamento
 * (manifesto + CTA) — funciona como bridge emocional.
 */
import { motion } from "framer-motion";

interface Coluna {
  /** Microcopy no topo (parêntese ou tag) */
  tag: string;
  /** Palavra única, gigante, central */
  palavra: string;
  /** Parágrafo descritivo abaixo do título */
  texto: string;
  /** Microcopy no rodapé da coluna (assinatura/contexto) */
  rodape: string;
  /** Cor de fundo da coluna */
  bg: string;
  /** Cor do texto */
  text: string;
  /** Cor do texto secundário */
  muted: string;
}

const COLUNAS: Coluna[] = [
  {
    tag: "(a realidade)",
    palavra: "Ruído",
    texto:
      "Gurus prometendo o impossível, termos que ninguém entende, planilhas, dashboards e a sensação de que cada mês você está apostando no que pode dar errado de novo.",
    rodape: "Empreender já é difícil. Marketing não devia ser.",
    bg: "var(--graphite)",
    text: "var(--platinum)",
    muted: "var(--ash)",
  },
  {
    tag: "(o custo invisível)",
    palavra: "Tempo",
    texto:
      "Cada trimestre testando o que outro alguém já tentou. Cada freelancer que entrega meia coisa. Cada reunião sobre o mesmo problema. Enquanto isso, sua marca precisa faturar — agora.",
    rodape: "O custo de não ter um marketing sério não está no orçamento. Está no calendário.",
    bg: "var(--onyx)",
    text: "var(--platinum)",
    muted: "var(--ash)",
  },
  {
    tag: "(a proposta Major)",
    palavra: "Paz",
    texto:
      "Marketing inteiro sob uma direção só. Planejamento construído pra sua marca, pro seu momento, pro seu tipo de cliente. Porque não existe método único — existe a sua operação, e o que ela precisa hoje.",
    rodape: "Você cuida do negócio. A gente cuida da sua marca chegar.",
    bg: "var(--jet-black)",
    text: "var(--platinum)",
    muted: "var(--ash)",
  },
];

function ColunaCard({ c, idx }: { c: Coluna; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
        delay: idx * 0.12,
      }}
      style={{
        background: c.bg,
        color: c.text,
        padding: "clamp(2.5rem, 4vw, 3.5rem) clamp(1.5rem, 2.5vw, 2.5rem)",
        minHeight: "clamp(420px, 60vh, 620px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        borderRight:
          idx < COLUNAS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      {/* Topo — micro-tag */}
      <div
        style={{
          fontFamily: "'Times New Roman', Georgia, serif",
          fontStyle: "italic",
          fontSize: "0.85rem",
          color: c.muted,
          letterSpacing: "0.02em",
        }}
      >
        {c.tag}
      </div>

      {/* Meio — palavra gigante + texto */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "2.5rem 0" }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(3.5rem, 7vw, 6rem)",
            color: c.text,
            margin: 0,
            marginBottom: "1.5rem",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          {c.palavra}.
        </h3>

        <p
          style={{
            fontSize: "0.97rem",
            color: c.text,
            opacity: 0.9,
            lineHeight: 1.6,
            margin: 0,
            maxWidth: 380,
            textAlign: "justify",
            textJustify: "inter-word",
            hyphens: "auto",
          }}
        >
          {c.texto}
        </p>
      </div>

      {/* Rodapé — assinatura */}
      <div
        style={{
          fontSize: "0.78rem",
          color: c.muted,
          lineHeight: 1.5,
          maxWidth: 300,
          letterSpacing: "0.01em",
          textAlign: "justify",
          textJustify: "inter-word",
          hyphens: "auto",
        }}
      >
        {c.rodape}
      </div>
    </motion.div>
  );
}

export function Paz() {
  return (
    <section
      id="paz"
      style={{
        background: "var(--jet-black)",
        position: "relative",
      }}
    >
      {/* Eyebrow centralizado fora do grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          textAlign: "center",
          padding: "clamp(4rem, 7vw, 6rem) 1.5rem clamp(2rem, 4vw, 3rem)",
          fontSize: "0.72rem",
          color: "var(--ash)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        Por que a Major existe
      </motion.div>

      {/* Título do bloco — centralizado, contido em max-width.
          Algumas palavras-chave em italic serif lowercase quebram o
          uppercase Doner e dão destaque editorial às emoções.
          Em mobile (<820px), cada mudança de fonte vira uma linha
          separada (mais respiro tipográfico). */}
      <motion.h2
        className="paz-title"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
          color: "var(--platinum)",
          textAlign: "center",
          margin: "0 auto",
          marginBottom: "clamp(3rem, 6vw, 5rem)",
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          maxWidth: 820,
          padding: "0 1.5rem",
          textTransform: "uppercase",
        }}
      >
        Empreender já
        <br className="paz-br-mobile" />{" "}
        <span
          style={{
            fontFamily: "'Times New Roman', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            textTransform: "lowercase",
            letterSpacing: "-0.005em",
            fontSize: "1.22em",
          }}
        >
          é difícil o suficiente
        </span>
        .
        <br />
        Marketing não devia ser mais
        <br className="paz-br-mobile" />{" "}
        <span
          style={{
            fontFamily: "'Times New Roman', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            textTransform: "lowercase",
            letterSpacing: "-0.005em",
            fontSize: "1.22em",
          }}
        >
          um problema
        </span>
        .
      </motion.h2>

      {/* 3 colunas full-bleed */}
      <div
        className="paz-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          width: "100%",
        }}
      >
        {COLUNAS.map((c, i) => (
          <ColunaCard key={c.palavra} c={c} idx={i} />
        ))}
      </div>

      <style>{`
        /* Por padrão (desktop) os <br className="paz-br-mobile">
           não quebram linha — pra título caber em 2 linhas com a
           transição Doner→serif inline. */
        .paz-br-mobile { display: none; }

        @media (max-width: 820px) {
          /* No mobile, cada mudança tipográfica vira linha separada. */
          .paz-br-mobile { display: inline; }

          /* Mais respiro entre linhas — em mobile a leitura precisa
             de ar pra a hierarquia ficar clara. */
          .paz-title {
            line-height: 1.18 !important;
          }

          .paz-grid {
            grid-template-columns: 1fr !important;
          }
          .paz-grid > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            min-height: auto !important;
            padding: clamp(2rem, 5vw, 2.8rem) clamp(1.5rem, 4vw, 2rem) !important;
          }
          .paz-grid > div:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
