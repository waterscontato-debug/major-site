'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

const WHATSAPP_URL =
  "https://wa.me/5561982792200?text=Oi%2C%20vim%20pelo%20site%20da%20Major%20e%20quero%20saber%20mais.";

interface CardProps {
  icone: string;
  titulo: string;
  desc: string;
  cta: string;
  href?: string;
  onClick?: () => void;
  highlighted?: boolean;
}

function CtaCard({ icone, titulo, desc, cta, href, onClick, highlighted }: CardProps) {
  const content = (
    <>
      <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{icone}</div>
      <h3 style={{ fontSize: "1.15rem", fontWeight: 500, marginBottom: "0.5rem" }}>{titulo}</h3>
      <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.55, marginBottom: "1.5rem", flex: 1 }}>
        {desc}
      </p>
      <div
        style={{
          color: highlighted ? "var(--bg)" : "var(--accent)",
          fontWeight: 600,
          fontSize: "0.9rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        {cta} →
      </div>
    </>
  );

  const baseStyle: React.CSSProperties = {
    background: highlighted ? "var(--text)" : "var(--bg-card)",
    color: highlighted ? "var(--bg)" : "var(--text)",
    border: "1px solid",
    borderColor: highlighted ? "var(--text)" : "var(--border)",
    borderRadius: 16,
    padding: "2rem 1.75rem",
    cursor: "pointer",
    transition: "transform 0.2s",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    textAlign: "left",
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={baseStyle}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} style={{ ...baseStyle, fontFamily: "inherit", textAlign: "left" }}>
      {content}
    </button>
  );
}

export function Contato() {
  const [open, setOpen] = useState(false);

  return (
    <section id="contato" style={{ background: "var(--bg)", padding: "6rem 0 7rem" }}>
      <div className="container">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3rem", maxWidth: 720, margin: "0 auto 3rem" }}>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--accent)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500,
                marginBottom: "0.8rem",
              }}
            >
              Contato
            </div>
            <h2
              className="h-display"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}
            >
              Bora marcar uma conversa?
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>
              Escolhe o caminho que combina mais com você.
            </p>
          </div>
        </Reveal>

        <StaggerGroup stagger={0.1}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
          }}
          className="contato-grid"
        >
          <StaggerItem><CtaCard
            icone="🎯"
            titulo="Pedir análise gratuita"
            desc="Nosso time avalia seu cenário atual e te entrega um diagnóstico em 48h. Sem custo, sem compromisso."
            cta="Quero análise"
            onClick={() => setOpen(true)}
            highlighted
          /></StaggerItem>
          <StaggerItem><CtaCard
            icone="💬"
            titulo="Falar no WhatsApp"
            desc="Conversa rápida e direta. Bom pra primeiras perguntas ou pra entender se faz sentido."
            cta="Abrir WhatsApp"
            href={WHATSAPP_URL}
          /></StaggerItem>
          <StaggerItem><CtaCard
            icone="📝"
            titulo="Preencher formulário"
            desc="Conta mais sobre seu negócio. Em 1 dia útil retornamos com proposta inicial."
            cta="Ir pro formulário"
            onClick={() => setOpen(true)}
          /></StaggerItem>
        </div>
        </StaggerGroup>

        {open && (
          <FormModal onClose={() => setOpen(false)} />
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contato-grid { grid-template-columns: 1fr !important; max-width: 480px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}

function FormModal({ onClose }: { onClose: () => void }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [segmento, setSegmento] = useState("");
  const [problema, setProblema] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function submeter(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    try {
      // Por enquanto envia pro Formspree ou similar. Vou setar um endpoint /api/contact depois.
      // Provisoriamente: abre WhatsApp com a mensagem montada
      const msg = `*Pedido pelo site da Major*\n\nNome: ${nome}\nTelefone: ${telefone}\nSegmento: ${segmento}\n\n${problema}`;
      window.open(
        `https://wa.me/5561982792200?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
      setEnviado(true);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(4px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-card)",
          borderRadius: 16,
          maxWidth: 480,
          width: "100%",
          padding: "2rem",
          border: "1px solid var(--border)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {enviado ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
            <h3 className="h-display" style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>
              Pedido enviado!
            </h3>
            <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
              Te chamamos no WhatsApp em até 1 dia útil.
            </p>
            <button
              onClick={onClose}
              style={{
                background: "var(--text)",
                color: "var(--bg)",
                border: "none",
                padding: "0.7rem 1.5rem",
                borderRadius: 999,
                fontWeight: 600,
              }}
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 className="h-display" style={{ fontSize: "1.5rem" }}>Vamos conversar</h3>
              <button
                onClick={onClose}
                aria-label="Fechar"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--muted)",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={submeter} style={{ display: "grid", gap: "1rem" }}>
              <Input label="Seu nome" value={nome} onChange={setNome} required />
              <Input label="Telefone / WhatsApp" value={telefone} onChange={setTelefone} required placeholder="(61) 9XXXX-XXXX" />
              <SelectField label="Segmento" value={segmento} onChange={setSegmento} required>
                <option value="">Selecione…</option>
                <option value="clinica_odonto">Clínica odontológica</option>
                <option value="clinica_medica">Clínica médica</option>
                <option value="consultorio">Consultório individual</option>
                <option value="escola">Escola</option>
                <option value="outro">Outro</option>
              </SelectField>
              <Textarea
                label="O que tá tirando seu sono hoje?"
                value={problema}
                onChange={setProblema}
                placeholder="Conta um pouco do seu cenário. Ex: 'agenda parada', 'cara do paciente que chega não é o que quero', 'sem tempo pra cuidar das redes'..."
                required
              />

              <button
                type="submit"
                disabled={enviando}
                style={{
                  background: "var(--text)",
                  color: "var(--bg)",
                  border: "none",
                  padding: "0.95rem",
                  borderRadius: 10,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: enviando ? "wait" : "pointer",
                  opacity: enviando ? 0.6 : 1,
                  marginTop: "0.25rem",
                }}
              >
                {enviando ? "Enviando..." : "Enviar e abrir WhatsApp"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Input(props: { label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string }) {
  return (
    <label style={{ display: "grid", gap: "0.35rem" }}>
      <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{props.label}</span>
      <input
        type="text"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        required={props.required}
        placeholder={props.placeholder}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "0.7rem 0.9rem",
          color: "var(--text)",
          fontSize: "0.95rem",
          fontFamily: "inherit",
          outline: "none",
        }}
      />
    </label>
  );
}

function SelectField(props: { label: string; value: string; onChange: (v: string) => void; required?: boolean; children: React.ReactNode }) {
  return (
    <label style={{ display: "grid", gap: "0.35rem" }}>
      <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{props.label}</span>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        required={props.required}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "0.7rem 0.9rem",
          color: "var(--text)",
          fontSize: "0.95rem",
          fontFamily: "inherit",
          outline: "none",
        }}
      >
        {props.children}
      </select>
    </label>
  );
}

function Textarea(props: { label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string }) {
  return (
    <label style={{ display: "grid", gap: "0.35rem" }}>
      <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{props.label}</span>
      <textarea
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        required={props.required}
        placeholder={props.placeholder}
        rows={4}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "0.7rem 0.9rem",
          color: "var(--text)",
          fontSize: "0.95rem",
          fontFamily: "inherit",
          outline: "none",
          resize: "vertical",
          minHeight: 100,
        }}
      />
    </label>
  );
}
