'use client';

import { motion } from "framer-motion";

export function ProvaSocial() {
  const numeros = [
    { valor: "20+", label: "clínicas e escolas atendidas" },
    { valor: "13", label: "especialistas no time" },
    { valor: "+6 anos", label: "no mercado de saúde" },
    { valor: "100%", label: "metodologia própria" },
  ];

  return (
    <section
      style={{
        background: "var(--bg-section)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "3rem 0",
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          textAlign: "center",
        }}
      >
        {numeros.map((n) => (
          <motion.div
            key={n.label}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <div
              className="h-display"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                color: "var(--text)",
                marginBottom: "0.35rem",
              }}
            >
              {n.valor}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "var(--muted)",
                lineHeight: 1.4,
              }}
            >
              {n.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 700px) {
          section[style*="bg-section"] > .container,
          section > .container {}
        }
        @media (max-width: 700px) {
          section .container {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2.5rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
