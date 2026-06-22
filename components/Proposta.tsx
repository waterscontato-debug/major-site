'use client';

/**
 * Section "Proposta" — formulário multi-step de 15 perguntas + contato.
 *
 * Filtro de qualificação rigoroso. Cada pergunta é um step pra UX
 * suave (1 decisão por vez). A pergunta 15 (por_que_agora) é texto
 * aberto — separa quem está sério de quem está só curiosando.
 *
 * Estilo: paleta clara (Platinum bg + Jet Black texto), Doner Light.
 * Backend: POST /api/proposta envia email pros sócios via Resend.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
 *  CONFIG DAS 15 PERGUNTAS
 * ============================================================ */

type StepKind = "text" | "single" | "textarea" | "contato";

interface Step {
  key: string;
  pergunta: string;
  sublabel?: string;
  kind: StepKind;
  options?: string[];
  /** Placeholder pra inputs text/textarea */
  placeholder?: string;
}

const QUESTIONS: Step[] = [
  {
    key: "empresa",
    pergunta: "Qual é o nome da sua empresa ou marca?",
    kind: "text",
    placeholder: "Ex: Clínica J. Fleury",
  },
  {
    key: "segmento",
    pergunta: "Em qual segmento você atua?",
    kind: "single",
    options: [
      "Clínica ou consultório de saúde",
      "Escritório (advocacia, contabilidade, consultoria)",
      "Arquitetura ou design de interiores",
      "Estética e beleza",
      "Gastronomia",
      "Educação",
      "Mercado imobiliário",
      "Outro",
    ],
  },
  {
    key: "problema",
    pergunta: "Hoje, qual é o principal problema da sua marca?",
    kind: "single",
    options: [
      "Não pareço profissional",
      "Não gero leads",
      "Minhas redes estão paradas",
      "Tenho identidade fraca",
      "Invisto em tráfego sem retorno",
      "Não tenho conteúdo bom",
      "Outro",
    ],
  },
  {
    key: "construir",
    pergunta: "O que você quer construir agora?",
    kind: "single",
    options: [
      "Posicionamento de marca",
      "Identidade visual",
      "Social media",
      "Produção de conteúdo",
      "Anúncios pagos",
      "Campanha",
      "Reposicionamento completo",
    ],
  },
  {
    key: "cenario",
    pergunta: "Qual desses cenários mais parece com você hoje?",
    kind: "single",
    options: [
      "Estou começando",
      "Já vendo mas quero crescer",
      "Tenho marca consolidada mas comunicação fraca",
      "Já tenho marketing mas quero melhorar o nível",
    ],
  },
  {
    key: "identidade",
    pergunta: "Você já tem identidade visual profissional?",
    kind: "single",
    options: [
      "Sim, e quero manter",
      "Sim, mas quero melhorar",
      "Não tenho",
      "Tenho só a logo",
    ],
  },
  {
    key: "redes",
    pergunta: "Suas redes sociais são atualizadas com frequência?",
    kind: "single",
    options: [
      "Sim, toda semana",
      "Às vezes",
      "Quase nunca",
      "Não tenho presença ativa",
    ],
  },
  {
    key: "anuncios_atual",
    pergunta: "Você já investe em anúncios?",
    kind: "single",
    options: [
      "Sim, Google",
      "Sim, Meta/Instagram",
      "Sim, TikTok",
      "Já investi mas parei",
      "Nunca investi",
    ],
  },
  {
    key: "conteudo",
    pergunta: "Qual tipo de conteúdo você mais precisa produzir?",
    kind: "single",
    options: [
      "Fotos profissionais",
      "Vídeos / Reels",
      "Posts institucionais",
      "Conteúdo educativo",
      "Campanhas",
      "Tudo isso",
    ],
  },
  {
    key: "interno",
    pergunta: "Você tem alguém interno pra aprovar e acompanhar o marketing?",
    kind: "single",
    options: [
      "Sim, eu mesmo",
      "Sim, equipe interna",
      "Não, preciso de direção completa",
    ],
  },
  {
    key: "objetivo",
    pergunta: "Qual o objetivo principal nos próximos 3 meses?",
    kind: "single",
    options: [
      "Atrair clientes melhores",
      "Vender mais",
      "Lançar produto ou serviço",
      "Reposicionar a marca",
      "Melhorar percepção de valor",
      "Organizar a comunicação",
    ],
  },
  {
    key: "urgencia",
    pergunta: "Qual o nível de urgência?",
    kind: "single",
    options: [
      "Quero começar agora",
      "Nos próximos 30 dias",
      "Nos próximos 3 meses",
      "Estou só pesquisando",
    ],
  },
  {
    key: "investimento",
    pergunta: "Qual faixa de investimento mensal você considera pra marketing e comunicação?",
    sublabel: "Inclui gestão, criação, produção — sem contar a verba de mídia.",
    kind: "single",
    options: [
      "Até R$ 2.000",
      "R$ 2.000 a R$ 5.000",
      "R$ 5.000 a R$ 10.000",
      "R$ 10.000+",
      "Ainda não sei",
    ],
  },
  {
    key: "verba_ads",
    pergunta: "Além da gestão e produção, você tem verba separada pra anúncios?",
    kind: "single",
    options: [
      "Sim, até R$ 1.000/mês",
      "R$ 1.000 a R$ 3.000",
      "R$ 3.000 a R$ 10.000",
      "Ainda não tenho verba de mídia",
    ],
  },
  {
    key: "por_que_agora",
    pergunta: "Por que você acredita que agora é o momento de investir melhor na sua marca?",
    sublabel: "Essa é a pergunta que mais importa. Responde com o que vier — quanto mais real, melhor.",
    kind: "textarea",
    placeholder: "Conta o que está acontecendo no seu negócio...",
  },
];

/* Step extra (não conta nas 15): dados de contato */
const CONTATO_STEP: Step = {
  key: "contato",
  pergunta: "Pra gente te chamar.",
  sublabel: "Última etapa — sem isso a gente não consegue te responder.",
  kind: "contato",
};

const ALL_STEPS = [...QUESTIONS, CONTATO_STEP];

const HORARIOS = ["Manhã", "Tarde", "Noite", "Tanto faz"];

/* ============================================================
 *  ESTADO DO FORMULÁRIO
 * ============================================================ */

type FormState = Record<string, string> & {
  nome: string;
  email: string;
  telefone: string;
  horario: string;
  observacoes: string;
};

function makeInitialForm(): FormState {
  const f: Record<string, string> = {};
  QUESTIONS.forEach((q) => {
    f[q.key] = "";
  });
  f.nome = "";
  f.email = "";
  f.telefone = "";
  f.horario = "";
  f.observacoes = "";
  return f as FormState;
}

/* ============================================================
 *  HELPERS DE UI
 * ============================================================ */

function OptionCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: "0.95rem 1.15rem",
        minHeight: 52, // touch-friendly em mobile
        background: selected ? "var(--jet-black)" : "transparent",
        color: selected ? "var(--platinum)" : "var(--jet-black)",
        border: `1px solid ${selected ? "var(--jet-black)" : "rgba(26,26,26,0.22)"}`,
        borderRadius: 10,
        cursor: "pointer",
        fontSize: "0.95rem",
        fontWeight: 500,
        transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: `1.5px solid ${selected ? "var(--platinum)" : "rgba(26,26,26,0.4)"}`,
          background: selected ? "var(--platinum)" : "transparent",
          flexShrink: 0,
          position: "relative",
        }}
      >
        {selected && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--jet-black)",
              fontSize: 12,
              lineHeight: 1,
              fontWeight: 700,
            }}
          >
            ✓
          </span>
        )}
      </span>
      {label}
    </button>
  );
}

function FieldLabel({ children, required }: { children: string; required?: boolean }) {
  return (
    <div
      style={{
        fontSize: "0.72rem",
        color: "var(--graphite)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: "0.4rem",
        fontWeight: 500,
      }}
    >
      {children}
      {required && <span style={{ color: "var(--accent-warm)" }}> *</span>}
    </div>
  );
}

function inputBaseStyle(): React.CSSProperties {
  return {
    width: "100%",
    padding: "0.85rem 1rem",
    background: "transparent",
    border: "1px solid rgba(26,26,26,0.25)",
    borderRadius: 8,
    color: "var(--jet-black)",
    fontSize: "1rem",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.25s ease",
  };
}

/* ============================================================
 *  COMPONENTE PRINCIPAL
 * ============================================================ */

export function Proposta() {
  const [stepIdx, setStepIdx] = useState(0);
  const [form, setForm] = useState<FormState>(makeInitialForm());
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const totalSteps = ALL_STEPS.length;
  const step = ALL_STEPS[stepIdx];
  const progress = done ? 100 : ((stepIdx + 1) / totalSteps) * 100;

  function canAdvance(): boolean {
    if (!step) return false;
    if (step.kind === "contato") {
      return !!form.nome.trim() && !!form.email.trim() && !!form.telefone.trim();
    }
    const val = form[step.key];
    if (step.kind === "textarea") return val.trim().length >= 10;
    return !!val?.trim();
  }

  function advance() {
    if (!canAdvance()) return;
    if (stepIdx === totalSteps - 1) {
      handleSubmit();
    } else {
      setStepIdx((i) => i + 1);
    }
  }

  function back() {
    if (stepIdx > 0) setStepIdx((i) => i - 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/proposta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Erro ao enviar proposta");
      setDone(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setErrorMsg(`${msg}. Tenta de novo ou fala direto no WhatsApp.`);
    } finally {
      setSubmitting(false);
    }
  }

  /* ===== Render ===== */

  return (
    <section
      id="proposta"
      style={{
        background: "var(--platinum)",
        color: "var(--jet-black)",
        padding: "clamp(5rem, 10vw, 9rem) 0 clamp(5rem, 9vw, 8rem)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 4vw, 3rem)",
          width: "100%",
        }}
      >
        {/* Cabeçalho */}
        <div style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
          <div
            style={{
              fontFamily: "'Times New Roman', Georgia, serif",
              fontStyle: "italic",
              fontSize: "1rem",
              color: "var(--graphite)",
              marginBottom: "0.9rem",
            }}
          >
            (proposta sob medida)
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 3.6vw, 2.8rem)",
              color: "var(--jet-black)",
              margin: 0,
              marginBottom: "1rem",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
            }}
          >
            Monte sua proposta.
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--graphite)",
              lineHeight: 1.55,
              maxWidth: 600,
              margin: 0,
            }}
          >
            São 15 perguntas rápidas pra a gente entender seu contexto antes da
            primeira conversa. No fim, a Major analisa e volta com uma proposta
            inicial em até 24h — direto no seu WhatsApp e email.
          </p>
        </div>

        {/* Barra de progresso (só se não terminou) */}
        {!done && (
          <div style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.7rem",
                color: "var(--graphite)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "0.55rem",
                fontWeight: 500,
              }}
            >
              <span>
                {stepIdx + 1} de {totalSteps}
                {step?.kind !== "contato" && ` · pergunta ${stepIdx + 1}`}
                {step?.kind === "contato" && " · contato"}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div
              style={{
                height: 3,
                background: "rgba(26,26,26,0.15)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: "100%", background: "var(--jet-black)", borderRadius: 2 }}
              />
            </div>
          </div>
        )}

        {/* Step atual */}
        <AnimatePresence mode="wait">
          {done ? (
            <SuccessBlock form={form} key="done" />
          ) : step ? (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <StepBlock
                pergunta={step.pergunta}
                sublabel={step.sublabel}
              >
                {step.kind === "text" && (
                  <input
                    autoFocus
                    type="text"
                    value={form[step.key]}
                    onChange={(e) => setForm({ ...form, [step.key]: e.target.value })}
                    placeholder={step.placeholder}
                    style={inputBaseStyle()}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--jet-black)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(26,26,26,0.25)")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && canAdvance()) advance();
                    }}
                  />
                )}

                {step.kind === "textarea" && (
                  <textarea
                    autoFocus
                    rows={5}
                    value={form[step.key]}
                    onChange={(e) => setForm({ ...form, [step.key]: e.target.value })}
                    placeholder={step.placeholder}
                    style={{
                      ...inputBaseStyle(),
                      resize: "vertical",
                      minHeight: 140,
                      lineHeight: 1.55,
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--jet-black)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(26,26,26,0.25)")}
                  />
                )}

                {step.kind === "single" && step.options && (
                  <>
                    {step.options.map((opt) => (
                      <OptionCard
                        key={opt}
                        label={opt}
                        selected={form[step.key] === opt}
                        onClick={() => {
                          setForm({ ...form, [step.key]: opt });
                          // auto-avanço sutil (200ms) pra dar dinamismo
                          setTimeout(() => {
                            setStepIdx((i) => Math.min(i + 1, totalSteps - 1));
                          }, 220);
                        }}
                      />
                    ))}
                  </>
                )}

                {step.kind === "contato" && (
                  <ContatoFields form={form} setForm={setForm} />
                )}
              </StepBlock>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Erro */}
        {errorMsg && (
          <div
            style={{
              marginTop: "1.4rem",
              padding: "1rem",
              border: "1px solid var(--accent-warm)",
              background: "rgba(201, 119, 87, 0.08)",
              borderRadius: 8,
              color: "var(--accent-warm)",
              fontSize: "0.92rem",
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Controles voltar/avançar */}
        {!done && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "clamp(1.8rem, 3.5vw, 2.8rem)",
              gap: "1rem",
            }}
          >
            <button
              type="button"
              onClick={back}
              disabled={stepIdx === 0 || submitting}
              style={{
                padding: "0.95rem 1.4rem",
                minHeight: 48,
                background: "transparent",
                color: "var(--jet-black)",
                border: "1px solid rgba(26,26,26,0.25)",
                borderRadius: 8,
                cursor: stepIdx === 0 ? "not-allowed" : "pointer",
                opacity: stepIdx === 0 ? 0.4 : 1,
                fontSize: "0.85rem",
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
              disabled={!canAdvance() || submitting}
              style={{
                padding: "0.95rem 1.6rem",
                minHeight: 48,
                background: canAdvance() ? "var(--jet-black)" : "rgba(26,26,26,0.18)",
                color: canAdvance() ? "var(--platinum)" : "var(--graphite)",
                border: "none",
                borderRadius: 8,
                cursor: canAdvance() && !submitting ? "pointer" : "not-allowed",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {submitting
                ? "Enviando..."
                : step?.kind === "contato"
                ? "Enviar proposta →"
                : "Próximo →"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================================================
 *  SUB-COMPONENTES
 * ============================================================ */

function StepBlock({
  pergunta,
  sublabel,
  children,
}: {
  pergunta: string;
  sublabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "clamp(1.3rem, 2.4vw, 1.85rem)",
          color: "var(--jet-black)",
          margin: 0,
          marginBottom: sublabel ? "0.4rem" : "1.4rem",
          lineHeight: 1.2,
          letterSpacing: "-0.015em",
          textTransform: "uppercase",
        }}
      >
        {pergunta}
      </h3>
      {sublabel && (
        <div
          style={{
            fontSize: "0.88rem",
            color: "var(--graphite)",
            marginBottom: "1.4rem",
            lineHeight: 1.5,
            maxWidth: 560,
          }}
        >
          {sublabel}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
        {children}
      </div>
    </div>
  );
}

function ContatoFields({
  form,
  setForm,
}: {
  form: FormState;
  setForm: (f: FormState) => void;
}) {
  return (
    <>
      <div
        className="proposta-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <label>
          <FieldLabel required>Nome</FieldLabel>
          <input
            autoFocus
            type="text"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            placeholder="Seu nome"
            style={inputBaseStyle()}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--jet-black)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(26,26,26,0.25)")}
          />
        </label>
        <label>
          <FieldLabel required>WhatsApp</FieldLabel>
          <input
            type="tel"
            value={form.telefone}
            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            placeholder="(61) 99999-9999"
            style={inputBaseStyle()}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--jet-black)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(26,26,26,0.25)")}
          />
        </label>
      </div>
      <label style={{ display: "block" }}>
        <FieldLabel required>Email</FieldLabel>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="voce@email.com"
          style={inputBaseStyle()}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--jet-black)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(26,26,26,0.25)")}
        />
      </label>
      <div>
        <FieldLabel>Melhor horário pra falar</FieldLabel>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {HORARIOS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setForm({ ...form, horario: h })}
              style={{
                padding: "0.55rem 1rem",
                background: form.horario === h ? "var(--jet-black)" : "transparent",
                color: form.horario === h ? "var(--platinum)" : "var(--jet-black)",
                border: `1px solid ${
                  form.horario === h ? "var(--jet-black)" : "rgba(26,26,26,0.22)"
                }`,
                borderRadius: 8,
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 500,
              }}
            >
              {h}
            </button>
          ))}
        </div>
      </div>
      <label style={{ display: "block" }}>
        <FieldLabel>Algo mais que a gente precise saber?</FieldLabel>
        <textarea
          value={form.observacoes}
          onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
          placeholder="(opcional)"
          rows={3}
          style={{ ...inputBaseStyle(), resize: "vertical", minHeight: 80 }}
        />
      </label>
      <style>{`
        @media (max-width: 640px) {
          .proposta-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

function SuccessBlock({ form }: { form: FormState }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ paddingTop: "1rem" }}
    >
      <div
        style={{
          fontFamily: "'Times New Roman', Georgia, serif",
          fontStyle: "italic",
          fontSize: "1rem",
          color: "var(--graphite)",
          marginBottom: "1rem",
        }}
      >
        (recebido)
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
          color: "var(--jet-black)",
          margin: 0,
          marginBottom: "1.2rem",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          textTransform: "uppercase",
        }}
      >
        Obrigado, {form.nome.split(" ")[0] || "fala com a gente"}.
      </h3>
      <p
        style={{
          fontSize: "1.05rem",
          color: "var(--graphite)",
          lineHeight: 1.6,
          maxWidth: 620,
          marginBottom: "0.6rem",
        }}
      >
        A gente vai analisar seu contexto e voltar em até 24h com uma proposta
        inicial — direto no seu WhatsApp{" "}
        <strong style={{ color: "var(--jet-black)" }}>{form.telefone}</strong> ou
        email <strong style={{ color: "var(--jet-black)" }}>{form.email}</strong>.
      </p>
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--graphite)",
          fontStyle: "italic",
          maxWidth: 560,
        }}
      >
        Se for urgência real, manda mensagem direta — respondemos em horário
        comercial.
      </p>
    </motion.div>
  );
}
