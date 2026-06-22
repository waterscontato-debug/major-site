'use client';

import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

interface Etapa {
  numero: string;
  titulo: string;
  desc: string;
}

const ETAPAS: Etapa[] = [
  {
    numero: "01",
    titulo: "Diagnóstico",
    desc: "Mergulhamos no seu negócio: clientes, concorrência, números, o que funciona e o que não. Sem chute.",
  },
  {
    numero: "02",
    titulo: "Estratégia",
    desc: "Construímos o plano: onde vamos brigar, com qual mensagem, pra qual público, com qual orçamento.",
  },
  {
    numero: "03",
    titulo: "Execução",
    desc: "Time inteiro dedicado: tráfego, conteúdo, design e mídia trabalhando junto, não em silos.",
  },
  {
    numero: "04",
    titulo: "Resultado mensurado",
    desc: "Relatórios mensais transparentes. Você vê o que voltou de cada real investido.",
  },
];

export function Metodo() {
  return (
    <section style={{ background: "var(--bg-section)", padding: "6rem 0", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3.5rem", maxWidth: 720, margin: "0 auto 3.5rem" }}>
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
              Método
            </div>
            <h2
              className="h-display"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}
            >
              Sem improviso.
              <br />
              Sem promessa vazia.
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>
              Nossas 4 etapas existem porque marketing sério não é luz acesa, é processo.
            </p>
          </div>
        </Reveal>

        <StaggerGroup stagger={0.12}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            position: "relative",
          }}
          className="metodo-grid"
        >
          {ETAPAS.map((e) => (
            <StaggerItem key={e.numero}>
            <div
              style={{
                background: "transparent",
                padding: "1.5rem 0",
              }}
            >
              <div
                className="h-display"
                style={{
                  fontSize: "3rem",
                  color: "var(--accent)",
                  fontWeight: 300,
                  marginBottom: "0.75rem",
                  lineHeight: 1,
                }}
              >
                {e.numero}
              </div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  marginBottom: "0.6rem",
                  color: "var(--text)",
                }}
              >
                {e.titulo}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--muted)",
                  lineHeight: 1.55,
                }}
              >
                {e.desc}
              </p>
            </div>
            </StaggerItem>
          ))}
        </div>
        </StaggerGroup>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .metodo-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 2rem !important; }
        }
        @media (max-width: 600px) {
          .metodo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
