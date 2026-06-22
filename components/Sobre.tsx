'use client';

/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";

export function Sobre() {
  return (
    <section style={{ background: "var(--bg-section)", padding: "6rem 0", borderTop: "1px solid var(--border)" }}>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            borderRadius: 20,
            overflow: "hidden",
            aspectRatio: "4 / 5",
          }}
          className="sobre-img"
        >
          <img
            src="/equipe.jpg"
            alt="Sócios e equipe da Major"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
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
            Sobre a Major
          </div>

          <h2
            className="h-display"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1.25rem" }}
          >
            A gente não trabalha
            <br />
            <em style={{ fontStyle: "normal", color: "var(--accent)" }}>pra</em> você.
            <br />
            A gente trabalha <em style={{ fontStyle: "normal", color: "var(--accent)" }}>com</em> você.
          </h2>

          <p style={{ color: "var(--muted)", fontSize: "1.05rem", marginBottom: "1.25rem", lineHeight: 1.7 }}>
            A diferença é grande. Agência que trabalha <em>pra</em> você manda relatório, cumpre escopo
            e some até o próximo mês. Agência que trabalha <em>com</em> você senta na sua mesa, entende
            o que tira seu sono, fala com sua recepção, conhece seus pacientes pelo nome.
          </p>

          <p style={{ color: "var(--muted)", fontSize: "1.05rem", marginBottom: "1.25rem", lineHeight: 1.7 }}>
            A Major é o segundo time que você precisava ter dentro da clínica — mas não conseguia
            contratar. 13 especialistas em tráfego, conteúdo, design, vídeo e estratégia, todos
            empenhados em fazer <strong style={{ color: "var(--text)", fontWeight: 500 }}>seu</strong> negócio
            crescer como se fosse o nosso.
          </p>

          <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Quando o seu paciente chega indicado, quando a agenda lota, quando o aluno se matricula —
            a gente comemora junto. Porque também é nosso.
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section .container[style*="grid-template-columns: 1fr 1.1fr"] {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .sobre-img { max-width: 400px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
