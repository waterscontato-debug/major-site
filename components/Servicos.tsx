'use client';

/**
 * Section "O que a gente faz" — lista vertical de áreas de atuação
 * no estilo Player Roberts Bell / ZK Designers.
 *
 * Tom: agregar valor mostrando AMPLITUDE, não desconto.
 *
 * Paleta clara (Platinum bg + Jet Black texto + Graphite muted +
 * terracota --accent-warm pra setinha de destaque).
 */
import { motion } from "framer-motion";

interface Servico {
  numero: string;
  titulo: string;
  desc: string;
  entregaveis: string[];
}

const SERVICOS: Servico[] = [
  {
    numero: "01",
    titulo: "Estratégia de marca",
    desc: "O ponto de partida. Onde a marca está, onde quer chegar e o que precisa comunicar pra sair do lugar.",
    entregaveis: [
      "Pesquisa de mercado",
      "Análise de concorrentes",
      "Posicionamento",
      "Persona e tom de voz",
    ],
  },
  {
    numero: "02",
    titulo: "Identidade visual",
    desc: "Sistema visual completo, pensado pra escalar — funciona no story, no outdoor, no PDF do orçamento.",
    entregaveis: [
      "Logo e símbolo",
      "Paleta e tipografia",
      "Sistema de aplicações",
      "Manual da marca",
    ],
  },
  {
    numero: "03",
    titulo: "Direção criativa",
    desc: "A camada que ninguém vê mas todo mundo sente. Conceito, referências, direção de arte e fotografia.",
    entregaveis: [
      "Conceito de campanha",
      "Direção de fotografia",
      "Moodboards e referências",
      "Look & feel",
    ],
  },
  {
    numero: "04",
    titulo: "Produção audiovisual",
    desc: "Equipe vai até a sua operação todo mês. Capta, edita e entrega — sem freelancer, sem ruído.",
    entregaveis: [
      "Visitas mensais ao cliente",
      "Foto, vídeo e reels",
      "Edição e motion",
      "Banco de conteúdo organizado",
    ],
  },
  {
    numero: "05",
    titulo: "Social media",
    desc: "Gestão estratégica das redes — calendário, criação, publicação e leitura. Não é só postar.",
    entregaveis: [
      "Planejamento editorial",
      "Copy e design pra redes",
      "Agendamento e publicação",
      "Gestão de comunidade",
    ],
  },
  {
    numero: "06",
    titulo: "Performance",
    desc: "Mídia paga conectada com o conteúdo orgânico. Cada real é rastreado, cada criativo é testado.",
    entregaveis: [
      "Google, Meta e TikTok Ads",
      "Estrutura de campanhas",
      "Otimização contínua",
      "Dashboards e relatórios",
    ],
  },
  {
    numero: "07",
    titulo: "Produtora",
    desc: "Uma produtora de cinema dentro da agência. Sua clínica, escritório ou loja com a mesma qualidade técnica que filme publicitário de marca grande — sem orçamento de marca grande.",
    entregaveis: [
      "Equipamento profissional",
      "Direção de fotografia",
      "Color grading cinematográfico",
      "Direção de arte e set design",
    ],
  },
  {
    numero: "08",
    titulo: "Web design",
    desc: "Sites e landing pages que comunicam o que sua marca é — e convertem. Cada projeto pensado pra performance, SEO e mobile, não só pra ficar bonito no desktop.",
    entregaveis: [
      "Sites institucionais",
      "Landing pages de campanha",
      "Otimização SEO",
      "Performance e mobile-first",
    ],
  },
  {
    numero: "09",
    titulo: "Criação de plataformas",
    desc: "Sistemas, portais e aplicações sob medida pra automatizar o que sua operação faz repetido todo dia. Da prancheta ao deploy, dentro da própria agência.",
    entregaveis: [
      "Sistemas internos",
      "Dashboards e portais",
      "Aplicações web sob medida",
      "Integrações via API",
    ],
  },
];

/* Seta SVG isolada — vou animar a opacity + translate via CSS */
function ArrowRight() {
  return (
    <svg
      width="48"
      height="14"
      viewBox="0 0 48 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <path
        d="M0 7 H45 M38 1 L45 7 L38 13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
        fill="none"
      />
    </svg>
  );
}

function ServicoRow({ s, idx }: { s: Servico; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: idx * 0.04,
      }}
      className="servico-row"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "clamp(1.5rem, 3vw, 3rem)",
        alignItems: "baseline",
        padding: "clamp(1rem, 1.6vw, 1.4rem) 0",
        borderTop: "1px solid rgba(26, 26, 26, 0.22)",
        position: "relative",
        cursor: "default",
      }}
    >
      {/* Coluna esquerda — número + título + descrição */}
      <div>
        <div
          style={{
            fontFamily: "'Times New Roman', Georgia, serif",
            fontStyle: "italic",
            fontSize: "0.85rem",
            color: "var(--graphite)",
            marginBottom: "0.3rem",
            letterSpacing: "0.02em",
          }}
        >
          ({s.numero})
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(2rem, 4.6vw, 3.6rem)",
            color: "var(--jet-black)",
            margin: 0,
            marginBottom: "0.35rem",
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
            textTransform: "uppercase",
          }}
        >
          {s.titulo}
        </h3>

        <p
          style={{
            fontSize: "0.92rem",
            color: "var(--graphite)",
            lineHeight: 1.5,
            maxWidth: 520,
            margin: 0,
          }}
        >
          {s.desc}
        </p>
      </div>

      {/* Coluna do meio — lista de entregáveis (alinhada à direita) */}
      <div
        className="servico-entregaveis"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.3rem",
          paddingTop: "0.4rem",
          textAlign: "right",
          justifySelf: "end",
        }}
      >
        {s.entregaveis.map((e) => (
          <div
            key={e}
            style={{
              fontSize: "0.7rem",
              color: "var(--jet-black)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
              lineHeight: 1.4,
              whiteSpace: "nowrap",
            }}
          >
            {e}
          </div>
        ))}
      </div>

      {/* Seta animada (terracota) — posicionada absoluta no canto inferior
          esquerdo da row, embaixo da descrição. Não interfere com os
          entregáveis que ficam grudados no fim da linha à direita. */}
      <div
        className="servico-arrow"
        style={{
          position: "absolute",
          left: 0,
          bottom: "0.6rem",
          color: "var(--accent-warm)",
          opacity: 0,
          transform: "translateX(-12px)",
          transition:
            "opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
          pointerEvents: "none",
        }}
      >
        <ArrowRight />
      </div>
    </motion.div>
  );
}

export function Servicos() {
  return (
    <section
      id="servicos"
      style={{
        background: "var(--platinum)",
        padding: "clamp(3rem, 6vw, 5rem) 0 clamp(4rem, 8vw, 7rem)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3rem)" }}>
        {/* Eyebrow só pra ancorar a section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Times New Roman', Georgia, serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "var(--graphite)",
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
            letterSpacing: "0.02em",
          }}
        >
          (o que fazemos)
        </motion.div>

        {/* Lista de serviços */}
        <div>
          {SERVICOS.map((s, i) => (
            <ServicoRow key={s.numero} s={s} idx={i} />
          ))}
          {/* Borda final */}
          <div style={{ borderTop: "1px solid rgba(26, 26, 26, 0.22)" }} />
        </div>
      </div>

      <style>{`
        /* Hover na row: seta desliza pra direita + fica visível */
        .servico-row:hover .servico-arrow {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        /* Hover na row: título ganha um leve "respiro" no tracking */
        .servico-row:hover h3 {
          letter-spacing: -0.015em !important;
        }
        .servico-row h3 {
          transition: letter-spacing 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (max-width: 820px) {
          .servico-row {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
            padding: 1.5rem 0 !important;
          }
          /* Em mobile, esconde a lista de entregáveis (ficava
             carregado demais visualmente). Só título + descrição. */
          .servico-entregaveis {
            display: none !important;
          }
          .servico-arrow {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
