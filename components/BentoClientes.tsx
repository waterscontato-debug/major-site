'use client';

/* eslint-disable @next/next/no-img-element */
import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

/**
 * BentoClientes — seção com um bento grid por cliente + arraste horizontal
 * pra trocar de cliente inteiro.
 *
 * Layout do bento (6 slots, 3 colunas × 3 linhas em desktop):
 *   [ VIDEO   ] [ LOGO   ] [ FOTO1 ]
 *   [ VIDEO   ] [ FOTO2  ] [ FOTO3 ]
 *   [ VIDEO   ] [ TEXTO ×2 (span col-2)  ]
 *
 * Ou seja: vídeo vertical ocupa a coluna esquerda inteira (3 linhas);
 * logo + 2 fotos formam a linha do topo; 2 fotos formam o meio; texto
 * ocupa 2 colunas no rodapé.
 *
 * Drag pra o lado: framer-motion `drag="x"`. Threshold de 100px OU
 * velocity > 400 troca de bento. Setas nas laterais também navegam.
 *
 * Placeholder com pranchetas dos clientes até chegarem os dados reais.
 * Substituir array CLIENTES pra ir ao ar.
 */

interface Cliente {
  slug: string;
  nome: string;
  categoria: string;
  descricao: string;
  logoSrc: string;
  videoSrc?: string;    // .mp4 vertical (9:16). Se null, mostra placeholder.
  fotos: [string, string, string]; // exatamente 3 fotos
}

const CLIENTES: Cliente[] = [
  {
    slug: "cliente-a",
    nome: "Cliente A",
    categoria: "Educação",
    descricao:
      "Substituir por descrição real do case: reposicionamento, direção criativa, resultados alcançados.",
    logoSrc: "/clientes/prancheta-3.png",
    fotos: [
      "/clientes/prancheta-4.png",
      "/clientes/prancheta-5.png",
      "/clientes/prancheta-6.png",
    ],
  },
  {
    slug: "cliente-b",
    nome: "Cliente B",
    categoria: "Saúde",
    descricao:
      "Substituir por descrição real do case: reposicionamento, direção criativa, resultados alcançados.",
    logoSrc: "/clientes/prancheta-10.png",
    fotos: [
      "/clientes/prancheta-11.png",
      "/clientes/prancheta-12.png",
      "/clientes/prancheta-14.png",
    ],
  },
  {
    slug: "cliente-c",
    nome: "Cliente C",
    categoria: "Varejo",
    descricao:
      "Substituir por descrição real do case: reposicionamento, direção criativa, resultados alcançados.",
    logoSrc: "/clientes/prancheta-19.png",
    fotos: [
      "/clientes/prancheta-20.png",
      "/clientes/prancheta-22.png",
      "/clientes/prancheta-25.png",
    ],
  },
];

const DRAG_THRESHOLD = 100;
const VELOCITY_THRESHOLD = 400;

export function BentoClientes() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const total = CLIENTES.length;

  const irPara = useCallback(
    (novoIndex: number, dir: 1 | -1) => {
      const clamped = ((novoIndex % total) + total) % total;
      setDirection(dir);
      setIndex(clamped);
    },
    [total],
  );

  const proximo = () => irPara(index + 1, 1);
  const anterior = () => irPara(index - 1, -1);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const dx = info.offset.x;
    const vx = info.velocity.x;
    if (dx < -DRAG_THRESHOLD || vx < -VELOCITY_THRESHOLD) proximo();
    else if (dx > DRAG_THRESHOLD || vx > VELOCITY_THRESHOLD) anterior();
  };

  const cliente = CLIENTES[index];

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Setas de navegação (desktop) */}
      <NavArrow lado="esq" onClick={anterior} label="Cliente anterior" />
      <NavArrow lado="dir" onClick={proximo} label="Próximo cliente" />

      {/* Container que arrasta */}
      <div style={{ overflow: "hidden", touchAction: "pan-y" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={cliente.slug}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
              center: { opacity: 1, x: 0 },
              exit: (dir: number) => ({ opacity: 0, x: -dir * 60 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            style={{ cursor: "grab" }}
            whileDrag={{ cursor: "grabbing" }}
          >
            <BentoCliente cliente={cliente} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicador de posição */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginTop: "1.5rem",
        }}
      >
        {CLIENTES.map((c, i) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => irPara(i, i > index ? 1 : -1)}
            aria-label={`Ir pro cliente ${i + 1}`}
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              border: "none",
              background:
                i === index ? "var(--platinum, #E0E0E0)" : "rgba(224,224,224,0.3)",
              cursor: "pointer",
              padding: 0,
              transition: "background 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function NavArrow({
  lado,
  onClick,
  label,
}: {
  lado: "esq" | "dir";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="bento-nav-arrow"
      style={{
        position: "absolute",
        top: "50%",
        [lado === "esq" ? "left" : "right"]: "-8px",
        transform: "translateY(-50%)",
        width: 42,
        height: 42,
        borderRadius: 999,
        background: "rgba(224,224,224,0.08)",
        border: "1px solid rgba(224,224,224,0.14)",
        color: "var(--platinum, #E0E0E0)",
        cursor: "pointer",
        zIndex: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d={lado === "esq" ? "M9 2 L4 7 L9 12" : "M5 2 L10 7 L5 12"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    </button>
  );
}

/** Bento grid de um cliente. 3 cols × 3 rows em desktop. */
function BentoCliente({ cliente }: { cliente: Cliente }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <div
      className="bento-cliente"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "auto auto auto",
        gap: 14,
        // desktop: rows explícitas pra o vídeo ocupar coluna inteira
      }}
    >
      {/* Slot 1: VIDEO VERTICAL (col 1, spans 3 rows) */}
      <div
        className="bento-cel bento-video"
        style={{
          gridColumn: "1 / span 1",
          gridRow: "1 / span 3",
          background: "var(--onyx, #222526)",
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
          minHeight: 460,
          aspectRatio: "9 / 16",
        }}
      >
        {cliente.videoSrc ? (
          <>
            <video
              ref={videoRef}
              src={cliente.videoSrc}
              playsInline
              muted
              loop
              onClick={togglePlay}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                cursor: "pointer",
              }}
            />
            {!playing && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Reproduzir vídeo"
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.35)",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--platinum, #E0E0E0)",
                }}
              >
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
                  <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M20 17 L36 26 L20 35 Z" fill="currentColor" />
                </svg>
              </button>
            )}
          </>
        ) : (
          <PlaceholderVideo />
        )}
      </div>

      {/* Slot 2: LOGO (col 2, row 1) */}
      <div
        className="bento-cel"
        style={{
          gridColumn: "2 / span 1",
          gridRow: "1 / span 1",
          background: "var(--onyx, #222526)",
          borderRadius: 16,
          padding: "clamp(1.5rem, 3vw, 2.5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 150,
        }}
      >
        <img
          src={cliente.logoSrc}
          alt={`Logo ${cliente.nome}`}
          style={{
            maxWidth: "80%",
            maxHeight: 100,
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* Slot 3: FOTO 1 (col 3, row 1) */}
      <FotoCel src={cliente.fotos[0]} col={3} row={1} />

      {/* Slot 4: FOTO 2 (col 2, row 2) */}
      <FotoCel src={cliente.fotos[1]} col={2} row={2} />

      {/* Slot 5: FOTO 3 (col 3, row 2) */}
      <FotoCel src={cliente.fotos[2]} col={3} row={2} />

      {/* Slot 6: TEXTO (col 2-3, row 3, spans 2 cols) */}
      <div
        className="bento-cel"
        style={{
          gridColumn: "2 / span 2",
          gridRow: "3 / span 1",
          background: "var(--onyx, #222526)",
          borderRadius: 16,
          padding: "clamp(1.4rem, 2.4vw, 2rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 12,
          minHeight: 150,
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.68rem",
              color: "var(--ash, #BFBFBF)",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              fontWeight: 600,
              marginBottom: "0.6rem",
            }}
          >
            {cliente.categoria}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              color: "var(--platinum, #E0E0E0)",
              lineHeight: 1,
              margin: 0,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            {cliente.nome}
          </h3>
        </div>
        <p
          style={{
            fontSize: "0.92rem",
            color: "var(--ash, #BFBFBF)",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {cliente.descricao}
        </p>
      </div>
    </div>
  );
}

function FotoCel({ src, col, row }: { src: string; col: number; row: number }) {
  return (
    <div
      className="bento-cel"
      style={{
        gridColumn: `${col} / span 1`,
        gridRow: `${row} / span 1`,
        background: "var(--onyx, #222526)",
        borderRadius: 16,
        overflow: "hidden",
        minHeight: 150,
      }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

function PlaceholderVideo() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        color: "var(--ash, #BFBFBF)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
      }}
    >
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none" aria-hidden>
        <circle cx="23" cy="23" r="22" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
        <path d="M18 15 L32 23 L18 31 Z" fill="currentColor" opacity="0.5" />
      </svg>
      <span style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
        Vídeo em breve
      </span>
    </div>
  );
}
