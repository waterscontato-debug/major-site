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

interface PillButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  delay?: number;
  /**
   * Variante visual:
   *  - 'primary' = fundo platinum, texto preto (CTA principal)
   *  - 'ghost'   = transparente com borda
   */
  variant?: 'primary' | 'ghost';
  /** Ícone customizado no lugar da seta (← →). */
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Pra links externos (abre em nova aba). */
  external?: boolean;
  /**
   * Adiciona um "halo" externo na cor da moldura (var(--bg)) — cria a
   * ilusão de que a moldura está "invadindo" o pill, igual à referência.
   */
  halo?: boolean;
}

/**
 * Botão em pílula no estilo da referência "INDIVIDUAL YOGA":
 * borda fina, padding bem balanceado, texto uppercase pequeno,
 * setinhas opcionais nas pontas e animação no hover.
 */
function PillButton({
  label,
  onClick,
  href,
  delay = 0,
  variant = 'ghost',
  leftIcon,
  rightIcon,
  external,
  halo,
}: PillButtonProps) {
  const isPrimary = variant === 'primary';

  const bg = isPrimary ? "var(--platinum)" : "rgba(0,0,0,0.42)";
  const fg = isPrimary ? "var(--jet-black)" : "var(--text)";
  const borderColor = isPrimary
    ? "var(--platinum)"
    : "rgba(224,224,224,0.5)";
  const iconBorder = isPrimary
    ? "rgba(26,26,26,0.45)"
    : "rgba(224,224,224,0.55)";

  const pill = (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        fontSize: "0.78rem",
        fontWeight: 500,
        letterSpacing: "0.02em",
        color: fg,
        fontFamily: "inherit",
        cursor: "pointer",
        padding: "0.45rem 0.85rem",
        background: bg,
        border: `1px solid ${borderColor}`,
        borderRadius: 999,
        backdropFilter: isPrimary ? "none" : "blur(6px)",
        WebkitBackdropFilter: isPrimary ? "none" : "blur(6px)",
        whiteSpace: "nowrap",
      }}
    >
      {/* Seta esquerda (decorativa, sem animação) */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 16,
          height: 16,
          borderRadius: 999,
          border: `1px solid ${iconBorder}`,
          fontSize: "0.55rem",
          lineHeight: 1,
          opacity: 0.55,
        }}
      >
        {leftIcon ?? "‹"}
      </span>

      <span>{label}</span>

      {/* Seta direita */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 16,
          height: 16,
          borderRadius: 999,
          border: `1px solid ${iconBorder}`,
          fontSize: "0.55rem",
          lineHeight: 1,
          opacity: 0.55,
        }}
      >
        {rightIcon ?? "›"}
      </span>
    </span>
  );

  const wrapperStyle: React.CSSProperties = {
    display: "inline-block",
    textDecoration: "none",
    background: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer",
    color: "inherit",
    fontFamily: "inherit",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className="hero-pill"
    >
      {(() => {
        const content = halo ? (
          <span
            style={{
              display: "inline-block",
              background: "var(--bg)",
              padding: "clamp(10px, 1.2vw, 16px)",
              borderRadius: 999,
            }}
          >
            {pill}
          </span>
        ) : (
          pill
        );
        if (href) {
          return external ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={wrapperStyle}
            >
              {content}
            </a>
          ) : (
            <Link href={href} style={wrapperStyle}>
              {content}
            </Link>
          );
        }
        return (
          <button type="button" onClick={onClick} style={wrapperStyle}>
            {content}
          </button>
        );
      })()}
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
        // Padding cria a "moldura" externa que permite as bordas arredondadas
        // da imagem ficarem visíveis e os pills "comerem" a borda.
        padding: "clamp(18px, 2.6vw, 36px)",
        display: "flex",
        alignItems: "flex-end",
        boxSizing: "border-box",
      }}
    >
      {/* Carrossel de fundo — fotos dos sócios em fade lento.
          Tem border-radius pra parecer um "card" dentro da moldura. */}
      <div
        aria-hidden
        className="hero-image-wrap"
        style={{
          position: "absolute",
          top: "clamp(18px, 2.6vw, 36px)",
          right: "clamp(18px, 2.6vw, 36px)",
          bottom: "clamp(18px, 2.6vw, 36px)",
          left: "clamp(18px, 2.6vw, 36px)",
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
          borderRadius: "clamp(16px, 1.8vw, 24px)",
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

      {/* Logo tipográfica no canto superior esquerdo — mesmo "esquema" dos pills
          (halo da cor da moldura), porém sem borda. */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          position: "absolute",
          top: "calc(clamp(18px, 2.6vw, 36px) + clamp(14px, 1.8vw, 24px))",
          left: "calc(clamp(18px, 2.6vw, 36px) + clamp(14px, 1.8vw, 24px))",
          zIndex: 3,
          display: "inline-flex",
          alignItems: "center",
          padding: "0.45rem 0.95rem",
          background: "rgba(0,0,0,0.42)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          borderRadius: 999,
        }}
      >
        <img
          src="/logo-text.png"
          alt="MAJOR"
          style={{
            height: "clamp(18px, 2vw, 24px)",
            width: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </motion.div>

      {/* Portal do colaborador — top-right, levemente mais pra direita
          (alinhado com o cluster dos CTAs lá embaixo). */}
      <div
        style={{
          position: "absolute",
          top: "clamp(8px, 1.3vw, 18px)",
          right: "clamp(8px, 1.3vw, 18px)",
          zIndex: 3,
        }}
      >
        <PillButton
          label="Portal do colaborador"
          href="https://app.agenciamajor.com.br"
          delay={0.25}
          variant="ghost"
          rightIcon="↗"
          external
          halo
        />
      </div>


      {/* Texto: alinhado à esquerda com distância da borda interna da imagem
          (padding da moldura + respiro extra). */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingLeft: "calc(clamp(18px, 2.6vw, 36px) + clamp(18px, 2.5vw, 40px))",
          paddingRight: "calc(clamp(18px, 2.6vw, 36px) + clamp(18px, 2.5vw, 40px))",
          paddingBottom: "calc(clamp(18px, 2.6vw, 36px) + clamp(18px, 2.5vw, 40px))",
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

      {/* Cluster de CTAs em pílula CRUZANDO a borda inferior direita da imagem
          (metade dentro / metade fora) — efeito "ENTRE EM CONTATO" cortando
          a moldura, igual à referência. Os pills agora são compactos. */}
      {/* HALO ÚNICO agrupando os 3 pills — com cantos CÔNCAVOS conectando
          com a borda da imagem (SVG inline). Cria a impressão de que a
          moldura é contínua e "abraça" o cluster, sem mostrar o fundo. */}
      <div
        className="hero-cta-cluster"
        style={{
          position: "absolute",
          bottom: "clamp(8px, 1.3vw, 18px)",
          right: "clamp(8px, 1.3vw, 18px)",
          zIndex: 3,
          background: "var(--bg)",
          padding: "clamp(10px, 1.2vw, 16px)",
          borderRadius: 999,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <PillButton
          label="Conheça nossos serviços"
          href="#servicos"
          delay={1.8}
          variant="ghost"
        />
        <PillButton
          label="Monte sua proposta"
          href="#proposta"
          delay={1.65}
          variant="ghost"
        />
        <PillButton
          label="Entre em contato"
          onClick={() => setModalOpen(true)}
          delay={1.5}
          variant="primary"
        />
      </div>

      <AnimatePresence>
        {modalOpen && <ContatoModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>

      <style>{`
        /* Tablet (≤960px): esconde os 2 CTAs secundários, deixa só "Entre em contato" */
        @media (max-width: 960px) {
          .hero-cta-cluster > div:nth-child(1),
          .hero-cta-cluster > div:nth-child(2) {
            display: none !important;
          }
        }

        /* Mobile real (≤640px): pills um pouco menores */
        @media (max-width: 640px) {
          .hero-pill button > span,
          .hero-pill a > span {
            font-size: 0.72rem !important;
            padding: 0.4rem 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
