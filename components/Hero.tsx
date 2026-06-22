'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

/** Cada item da rotação. Inclui a preposição/artigo + local. */
const ROTACOES = [
  "nos escritórios",
  "nas clínicas",
  "nas escolas",
  "com os médicos",
  "nos estúdios",
];

/** Duração que cada frase fica visível antes de trocar (ms). */
const ROTATE_INTERVAL = 3200;

/** Imagens dos sócios no carrossel de fundo do hero. */
const BG_IMAGES = ["/Guiga.png", "/Roger.png", "/Leo.png"];

/** Tempo (ms) que cada imagem fica antes de trocar. */
const BG_INTERVAL = 5500;

/** Quebra string em chars com animação stagger ascendente. */
function SplitText({
  text,
  delay = 0,
  staggerChildren = 0.025,
}: {
  text: string;
  delay?: number;
  staggerChildren?: number;
}) {
  const chars = Array.from(text);
  return (
    <motion.span
      style={{ display: "inline-block" }}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren, delayChildren: delay } },
      }}
    >
      {chars.map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          variants={{
            hidden: { y: "100%", opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </motion.span>
  );
}

/** Mesma animação mas roda toda vez que `text` muda (pra rotação). */
function MorphText({ text }: { text: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={text}
        style={{ display: "inline-block", overflow: "hidden" }}
      >
        <SplitText text={text} staggerChildren={0.02} />
      </motion.span>
    </AnimatePresence>
  );
}

interface MinimalButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  delay?: number;
}

/** Botão minimalista — texto + linha embaixo + seta animada no hover */
function MinimalButton({ label, onClick, href, delay = 0 }: MinimalButtonProps) {
  const inner = (
    <motion.span
      whileHover="hover"
      initial="rest"
      animate="rest"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "0.92rem",
        fontWeight: 500,
        letterSpacing: "0.02em",
        color: "var(--text)",
        fontFamily: "inherit",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "0.5rem 0",
        position: "relative",
      }}
    >
      <span style={{ position: "relative", whiteSpace: "nowrap" }}>
        {label}
        {/* Linha embaixo (cresce no hover) */}
        <motion.span
          variants={{
            rest: { scaleX: 0.35, originX: 0 },
            hover: { scaleX: 1, originX: 0 },
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -4,
            height: 1,
            background: "currentColor",
            display: "block",
            transformOrigin: "left center",
          }}
        />
      </span>
      <motion.span
        variants={{
          rest: { x: 0 },
          hover: { x: 4 },
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "inline-block", fontSize: "1.05em", lineHeight: 1 }}
      >
        →
      </motion.span>
    </motion.span>
  );

  const wrapperStyle: React.CSSProperties = {
    display: "block",
    textDecoration: "none",
    background: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer",
    color: "inherit",
    textAlign: "right",
    width: "100%",
    fontFamily: "inherit",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {href ? (
        <Link href={href} style={wrapperStyle}>
          {inner}
        </Link>
      ) : (
        <button type="button" onClick={onClick} style={wrapperStyle}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}

/* ============================================================
 *  ContatoModal — mini-form de 5 perguntas que gera link WhatsApp
 *
 *  Fluxo: 5 perguntas curtas → no final, botão abre wa.me com a
 *  mensagem formatada com todas as respostas. Mais rápido que o
 *  form de 15 perguntas (Proposta) — pra quem só quer trocar uma
 *  ideia rápida via WhatsApp.
 * ============================================================ */

const WA_NUMBER = "5561982792200";

interface MiniStep {
  key: string;
  pergunta: string;
  kind: "text" | "single" | "textarea";
  options?: string[];
  placeholder?: string;
}

const MINI_QUESTIONS: MiniStep[] = [
  { key: "nome", pergunta: "Como você se chama?", kind: "text", placeholder: "Seu nome" },
  { key: "empresa", pergunta: "Qual sua empresa ou marca?", kind: "text", placeholder: "Nome da empresa" },
  {
    key: "segmento",
    pergunta: "Em qual segmento você atua?",
    kind: "single",
    options: ["Saúde", "Escritório", "Educação", "Estética", "Comércio", "Outro"],
  },
  {
    key: "precisa",
    pergunta: "O que você está buscando?",
    kind: "single",
    options: [
      "Identidade visual e posicionamento",
      "Social media e produção de conteúdo",
      "Anúncios e performance",
      "Marketing completo",
      "Só quero entender melhor",
    ],
  },
  {
    key: "mensagem",
    pergunta: "Alguma coisa que a gente precise saber?",
    kind: "textarea",
    placeholder: "(opcional — pode escrever o que vier)",
  },
];

function ContatoModal({ onClose }: { onClose: () => void }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [form, setForm] = useState<Record<string, string>>({});

  const total = MINI_QUESTIONS.length;
  const step = MINI_QUESTIONS[stepIdx];
  const isLast = stepIdx === total - 1;
  const progress = ((stepIdx + 1) / total) * 100;

  function canAdvance(): boolean {
    if (!step) return false;
    const val = form[step.key]?.trim() ?? "";
    if (step.kind === "textarea") return true; // último é opcional
    return val.length > 0;
  }

  function back() {
    if (stepIdx > 0) setStepIdx((i) => i - 1);
  }

  function advance() {
    if (!canAdvance()) return;
    if (isLast) {
      openWhatsApp();
    } else {
      setStepIdx((i) => i + 1);
    }
  }

  function openWhatsApp() {
    // Monta a mensagem formatada pra WhatsApp
    const msg = `Olá! Vim pelo site da Major e quero conversar.

*Nome:* ${form.nome ?? "—"}
*Empresa:* ${form.empresa ?? "—"}
*Segmento:* ${form.segmento ?? "—"}
*O que busco:* ${form.precisa ?? "—"}
${form.mensagem?.trim() ? `\n*Observações:*\n${form.mensagem}` : ""}`.trim();

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 540,
          width: "100%",
          background: "rgba(34, 34, 38, 0.65)",
          backdropFilter: "blur(40px) saturate(140%)",
          WebkitBackdropFilter: "blur(40px) saturate(140%)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 18,
          padding: "2.25rem 2rem",
          color: "var(--text)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          position: "relative",
        }}
      >
        {/* Botão fechar */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          style={{
            position: "absolute",
            top: "0.9rem",
            right: "1.1rem",
            background: "transparent",
            border: "none",
            color: "var(--muted)",
            fontSize: "1.4rem",
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* Progresso */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.68rem",
            color: "var(--muted)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: "0.6rem",
          }}
        >
          <span>Pergunta {stepIdx + 1} de {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div
          style={{
            height: 2,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 2,
            overflow: "hidden",
            marginBottom: "1.6rem",
          }}
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "100%", background: "var(--platinum)" }}
          />
        </div>

        {/* Pergunta + input */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step.key}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3
              className="h-display"
              style={{
                fontSize: "clamp(1.3rem, 2.4vw, 1.7rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "1.2rem",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {step.pergunta}
            </h3>

            {step.kind === "text" && (
              <input
                autoFocus
                type="text"
                value={form[step.key] ?? ""}
                onChange={(e) => setForm({ ...form, [step.key]: e.target.value })}
                placeholder={step.placeholder}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && canAdvance()) advance();
                }}
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 8,
                  color: "var(--text)",
                  fontSize: "1rem",
                  fontFamily: "var(--font-body)",
                  outline: "none",
                }}
              />
            )}

            {step.kind === "textarea" && (
              <textarea
                autoFocus
                rows={4}
                value={form[step.key] ?? ""}
                onChange={(e) => setForm({ ...form, [step.key]: e.target.value })}
                placeholder={step.placeholder}
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 8,
                  color: "var(--text)",
                  fontSize: "1rem",
                  fontFamily: "var(--font-body)",
                  outline: "none",
                  resize: "vertical",
                  minHeight: 90,
                  lineHeight: 1.5,
                }}
              />
            )}

            {step.kind === "single" && step.options && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {step.options.map((opt) => {
                  const selected = form[step.key] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setForm({ ...form, [step.key]: opt });
                        setTimeout(() => setStepIdx((i) => Math.min(i + 1, total - 1)), 200);
                      }}
                      style={{
                        textAlign: "left",
                        padding: "0.8rem 1rem",
                        background: selected ? "var(--platinum)" : "rgba(255,255,255,0.05)",
                        color: selected ? "var(--jet-black)" : "var(--text)",
                        border: `1px solid ${selected ? "var(--platinum)" : "rgba(255,255,255,0.18)"}`,
                        borderRadius: 8,
                        cursor: "pointer",
                        fontSize: "0.92rem",
                        fontWeight: 500,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controles */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1.6rem",
            gap: "0.8rem",
          }}
        >
          <button
            type="button"
            onClick={back}
            disabled={stepIdx === 0}
            style={{
              padding: "0.7rem 1.1rem",
              background: "transparent",
              color: "var(--muted)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              cursor: stepIdx === 0 ? "not-allowed" : "pointer",
              opacity: stepIdx === 0 ? 0.4 : 1,
              fontSize: "0.82rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            ← Voltar
          </button>
          <button
            type="button"
            onClick={advance}
            disabled={!canAdvance()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.7rem 1.3rem",
              background: canAdvance() ? "var(--platinum)" : "rgba(255,255,255,0.12)",
              color: canAdvance() ? "var(--jet-black)" : "var(--muted)",
              border: "none",
              borderRadius: 8,
              cursor: canAdvance() ? "pointer" : "not-allowed",
              fontSize: "0.82rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {isLast ? "Abrir WhatsApp →" : "Próximo →"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const [idx, setIdx] = useState(0);
  const [bgIdx, setBgIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % ROTACOES.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(t);
  }, []);

  // Carrossel das fotos dos sócios — fade entre Guiga / Roger / Leo
  useEffect(() => {
    const t = setInterval(() => {
      setBgIdx((i) => (i + 1) % BG_IMAGES.length);
    }, BG_INTERVAL);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--bg)",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        paddingBottom: "clamp(4rem, 12vh, 9rem)",
      }}
    >
      {/* Carrossel de fundo — fotos dos sócios em fade lento */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={BG_IMAGES[bgIdx]}
            src={BG_IMAGES[bgIdx]}
            alt=""
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{
              opacity: { duration: 2.2, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: BG_INTERVAL / 1000 + 2, ease: "linear" },
            }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 30%",
            }}
          />
        </AnimatePresence>

        {/* Overlay escuro pra dar contraste com o texto */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.78) 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Vinheta lateral pra reforçar a leitura do texto à esquerda */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.35) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Logo tipográfica no canto superior esquerdo */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          position: "absolute",
          top: "clamp(1.5rem, 3vw, 2.5rem)",
          left: "clamp(1.5rem, 5vw, 4.5rem)",
          zIndex: 2,
        }}
      >
        <img
          src="/logo-text.png"
          alt="MAJOR"
          style={{
            height: "clamp(22px, 2.4vw, 32px)",
            width: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </motion.div>

      {/* Portal do colaborador — top-right, simétrico com a logo */}
      <motion.a
        href="https://app.agenciamajor.com.br"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        whileHover={{ y: -1 }}
        style={{
          position: "absolute",
          top: "clamp(1.5rem, 3vw, 2.5rem)",
          right: "clamp(1.5rem, 5vw, 4.5rem)",
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.45rem 0.85rem",
          background: "transparent",
          color: "var(--text)",
          border: "1px solid rgba(255,255,255,0.22)",
          borderRadius: 999,
          fontSize: "0.78rem",
          fontWeight: 500,
          letterSpacing: "0.02em",
          textDecoration: "none",
          transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease",
        }}
        className="hero-portal-btn"
      >
        <span className="hero-portal-btn-text">Portal do colaborador</span>
        <span className="hero-portal-btn-short">Portal</span>
        <span style={{ fontSize: "0.85em", lineHeight: 1 }}>↗</span>
      </motion.a>

      {/* Textura sutil ao fundo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 70%, rgba(91,141,239,0.06), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Texto centralizado verticalmente, alinhado à esquerda */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingLeft: "clamp(1.5rem, 5vw, 4.5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 4.5rem)",
          zIndex: 2,
        }}
      >
        <h1
          className="h-display"
          style={{
            fontSize: "clamp(2.1rem, 5.4vw, 4.6rem)",
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: "0.005em",
            color: "var(--text)",
            margin: 0,
            textTransform: "uppercase",
            // WebkitTextStroke removido — estava inflando o glifo além da
            // bounding box, fazendo o topo das letras ser cortado pelo overflow:hidden.
          }}
        >
          {/* Truque: padding alto pra acentos/descendentes terem ar dentro da caixa
              (que tem overflow:hidden por causa da animação SplitText), mas margin
              negativo IGUAL ao padding pra o espaçamento visual entre linhas ficar
              idêntico ao lineHeight original. */}
          {/* Linha 1 — fixa, branca */}
          <div
            style={{
              overflow: "hidden",
              paddingTop: "0.45em",
              paddingBottom: "0.25em",
              marginTop: "-0.45em",
              marginBottom: "-0.25em",
            }}
          >
            <SplitText text="Mais um dia" delay={0.3} />
          </div>

          {/* Linha 2 — variável, em cinza mais fraco (acentos: médicos, escritórios, etc) */}
          <div
            style={{
              overflow: "hidden",
              paddingTop: "0.45em",
              paddingBottom: "0.25em",
              marginTop: "-0.45em",
              marginBottom: "-0.25em",
              color: "var(--muted)",
            }}
          >
            <span style={{ display: "inline-block" }}>
              <MorphText text={ROTACOES[idx]} />
            </span>
          </div>

          {/* Linha 3 — fixa, branca (descendente do J + ponto final, mais espaço embaixo) */}
          <div
            style={{
              overflow: "hidden",
              paddingTop: "0.45em",
              paddingBottom: "0.32em",
              marginTop: "-0.45em",
              marginBottom: "-0.32em",
            }}
          >
            <SplitText text="da Major." delay={0.95} />
          </div>
        </h1>
      </div>

      {/* 3 botões minimalistas no canto inferior direito, alinhados com o título */}
      <div
        className="hero-cta-stack"
        style={{
          position: "absolute",
          bottom: "clamp(2rem, 8vh, 9rem)",
          right: "clamp(1.5rem, 5vw, 4.5rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "clamp(0.9rem, 1.6vw, 1.4rem)",
          zIndex: 2,
        }}
      >
        <MinimalButton
          label="Entre em contato"
          onClick={() => setModalOpen(true)}
          delay={1.5}
        />
        <div
          className="hero-cta-secondary"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "clamp(0.9rem, 1.6vw, 1.4rem)",
            width: "100%",
          }}
        >
          <MinimalButton label="Monte sua proposta" href="#proposta" delay={1.65} />
          <MinimalButton label="Conheça nossos serviços" href="#servicos" delay={1.8} />
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && <ContatoModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>

      <style>{`
        .hero-portal-btn:hover {
          background: var(--platinum) !important;
          color: var(--jet-black) !important;
          border-color: var(--platinum) !important;
        }

        /* Mobile: Portal vira só "Portal ↗" pra caber */
        @media (max-width: 480px) {
          .hero-portal-btn {
            font-size: 0.7rem !important;
            padding: 0.4rem 0.7rem !important;
          }
          .hero-portal-btn-text {
            display: none !important;
          }
          .hero-portal-btn-short {
            display: inline !important;
          }
        }
        .hero-portal-btn-short { display: none; }

        /* Mobile e tablet (≤960px): esconde os 2 CTAs secundários
           pra deixar só "Entre em contato" — texto mais limpo,
           foco em uma ação principal. */
        @media (max-width: 960px) {
          .hero-cta-secondary {
            display: none !important;
          }
          .hero-cta-stack {
            bottom: clamp(1.5rem, 5vh, 3rem) !important;
          }
        }
        /* Em mobile real (≤640px) o botão fica ainda mais compacto */
        @media (max-width: 640px) {
          .hero-cta-stack button span,
          .hero-cta-stack a span {
            font-size: 0.82rem !important;
          }
        }
      `}</style>
    </section>
  );
}
