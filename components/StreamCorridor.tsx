'use client';

/* eslint-disable @next/next/no-img-element */
import * as React from "react";

/**
 * StreamCorridor — carrossel 3D em "corredor" onde os cards saem de um
 * ponto de fuga no fundo e vêm em direção ao viewer, em dois trilhos
 * espelhados. Baseado no ImageStreamHero de referência do usuário.
 *
 * Diferenças pro código original:
 * - Sem @/lib/utils (não existe no projeto); classes concatenadas direto.
 * - Sem classes Tailwind (o projeto usa CSS inline); tudo em <style>.
 * - Container-query (cqw) mantido — a corridor é responsiva à largura
 *   do próprio container, então funciona bem em qualquer viewport.
 *
 * Ponytail: as imagens do array IMAGES são placeholders (pranchetas
 * dos clientes que já estão em /public/clientes). Quando o Roger tiver
 * fotos reais das produções, troca o array e pronto.
 */

/** Geometria do corredor (unidades em `cqw` = % da largura do container). */
export type CorridorPath = {
  perspective?: number;
  cardWidth?: number;
  cardHeight?: number;
  cardRadius?: number;
  birthHeight?: number;
  exitHeight?: number;
  railBirth?: number;
  railExit?: number;
  fan?: number;
  turnBirth?: number;
  turnExit?: number;
  stops?: number;
};

const PATH: Required<CorridorPath> = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

/** Amostra o path uma vez pros keyframes CSS traçarem a curva real. */
function keyframes(dir: 1 | -1, name: string, p: Required<CorridorPath>) {
  const steps: string[] = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    const scale = (p.birthHeight / p.cardHeight) * Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail = p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(2)}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`,
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

export interface StreamImage {
  src: string;
  alt?: string;
}

export interface StreamCorridorProps {
  images: StreamImage[];
  cards?: number;
  speed?: number;
  axis?: number;
  path?: CorridorPath;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function StreamCorridor({
  images,
  cards = 9,
  speed = 18,
  axis = 55,
  path,
  children,
  className,
  style,
}: StreamCorridorProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `ish-r-${id}`;
  const left = `ish-l-${id}`;
  const card = `ish-c-${id}`;
  const p = React.useMemo(() => ({ ...PATH, ...path }), [path]);
  const css = React.useMemo(
    () =>
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      `@media(prefers-reduced-motion:reduce){.${card}{animation-play-state:paused}}`,
    [right, left, card, p],
  );

  if (images.length === 0) return null;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        containerType: "inline-size",
        ...style,
      }}
    >
      <style>{css}</style>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          {[right, left].map((name) =>
            Array.from({ length: cards }, (_, i) => {
              const img = images[i % Math.max(images.length, 1)];
              return (
                <div
                  key={`${name}-${i}`}
                  className={card}
                  style={{
                    position: "absolute",
                    overflow: "hidden",
                    left: "50%",
                    top: `${axis}%`,
                    width: `${p.cardWidth}cqw`,
                    height: `${p.cardHeight}cqw`,
                    marginLeft: `${-p.cardWidth / 2}cqw`,
                    marginTop: `${-p.cardHeight / 2}cqw`,
                    borderRadius: `${p.cardRadius}cqw`,
                    animation: `${name} ${speed}s linear infinite`,
                    animationDelay: `${-(i * speed) / cards}s`,
                    backfaceVisibility: "hidden",
                    background: "var(--onyx, #222526)",
                  }}
                >
                  {img && (
                    <img
                      src={img.src}
                      alt={img.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  )}
                </div>
              );
            }),
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
