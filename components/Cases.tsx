'use client';

import { motion } from "framer-motion";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

interface Case {
  cliente: string;
  segmento: string;
  resultado: string;
  texto: string;
}

const CASES: Case[] = [
  {
    cliente: "Praxxis Odontologia",
    segmento: "Clínica odontológica · Brasília",
    resultado: "+300% leads qualificados",
    texto:
      "Reposicionamos a marca, refizemos o funil e em 6 meses triplicamos o volume de pacientes interessados em tratamento estético.",
  },
  {
    cliente: "Implant Center",
    segmento: "Implantodontia · Centro-Oeste",
    resultado: "R$ 800k de receita em 90 dias",
    texto:
      "Campanha integrada de tráfego + remarketing + conteúdo de autoridade levou a clínica a bater meta semestral em um trimestre.",
  },
  {
    cliente: "Dr. André Jardim",
    segmento: "Consultório · Goiânia",
    resultado: "Agenda lotada 3 meses à frente",
    texto:
      "Estratégia de marca pessoal + Reels educativos posicionaram o doutor como referência regional e estabilizaram demanda.",
  },
];

export function Cases() {
  return (
    <section id="cases" style={{ background: "var(--bg)", padding: "6rem 0" }}>
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
              Cases
            </div>
            <h2
              className="h-display"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}
            >
              Resultados reais,
              <br />
              de clientes reais.
            </h2>
          </div>
        </Reveal>

        <StaggerGroup stagger={0.1}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
          }}
          className="cases-grid"
        >
          {CASES.map((c) => (
            <StaggerItem key={c.cliente}>
            <motion.div
              whileHover={{ y: -8, borderColor: "rgba(91,141,239,0.4)" }}
              transition={{ duration: 0.25 }}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "2rem 1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--accent)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {c.segmento}
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 500 }}>{c.cliente}</h3>
              <div
                className="h-display"
                style={{
                  fontSize: "1.6rem",
                  color: "var(--text)",
                  fontWeight: 500,
                  padding: "0.75rem 0",
                  borderTop: "1px solid var(--border)",
                  borderBottom: "1px solid var(--border)",
                  margin: "0.25rem 0",
                }}
              >
                {c.resultado}
              </div>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "var(--muted)",
                  lineHeight: 1.55,
                  marginTop: "auto",
                }}
              >
                {c.texto}
              </p>
            </motion.div>
            </StaggerItem>
          ))}
        </div>
        </StaggerGroup>

        <p
          style={{
            textAlign: "center",
            marginTop: "3rem",
            fontSize: "0.85rem",
            color: "var(--dim)",
          }}
        >
          * Dados anonimizados ou compartilhados sob autorização do cliente.
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cases-grid { grid-template-columns: 1fr !important; max-width: 520px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
