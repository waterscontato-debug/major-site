'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Intro animada em código (sem vídeo).
 * Sequência:
 *  0.0s — tela preta
 *  0.2s — logo tipográfica + ícone aparecem juntos no centro (fade in)
 *  1.1s — logo tipográfica desliza pra esquerda e some
 *  1.4s — ícone vai pro centro
 *  1.7s — ícone começa a escalar pra ocupar a tela toda
 *  2.5s — fade out revelando o site
 */
export function Intro() {
  const [stage, setStage] = useState<"hidden" | "together" | "iconAlone" | "expanding" | "done">("hidden");

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("[Intro] Iniciando animação");
    document.body.style.overflow = "hidden";

    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => { console.log("[Intro] together"); setStage("together"); }, 200));
    timers.push(setTimeout(() => { console.log("[Intro] iconAlone"); setStage("iconAlone"); }, 1400));
    timers.push(setTimeout(() => { console.log("[Intro] expanding"); setStage("expanding"); }, 2300));
    timers.push(
      setTimeout(() => {
        console.log("[Intro] done");
        setStage("done");
      }, 3500),
    );

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  // Quando a intro termina, libera o scroll do body imediatamente
  useEffect(() => {
    if (stage === "done") {
      document.body.style.overflow = "";
    }
  }, [stage]);

  const showLogos = stage === "together" || stage === "iconAlone" || stage === "expanding";
  const isVisible: boolean = (stage as string) !== "done";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {showLogos && (
            <>
              {/* Ícone — sempre centralizado na tela. Quando tipográfica some, ele cresce no centro. */}
              <motion.img
                src="/logo-icon.png"
                alt="Major"
                initial={{ opacity: 0, scale: 0.8, x: "-6rem" }}
                animate={
                  stage === "together"
                    ? { opacity: 1, scale: 1, x: "-6rem" }
                    : stage === "iconAlone"
                    ? { opacity: 1, scale: 1.2, x: 0 }
                    : stage === "expanding"
                    ? { opacity: 1, scale: 35, x: 0 }
                    : { opacity: 0, scale: 35, x: 0 }
                }
                transition={{
                  duration:
                    stage === "together"
                      ? 1.0
                      : stage === "iconAlone"
                      ? 0.85
                      : 1.2,
                  ease:
                    stage === "expanding"
                      ? [0.9, 0, 1, 0.15]
                      : [0.22, 1, 0.36, 1],
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  height: "clamp(50px, 8vw, 90px)",
                  width: "auto",
                  objectFit: "contain",
                  transformOrigin: "center center",
                  translate: "-50% -50%",
                }}
              />

              {/* Tipográfica — à direita do ícone, some pra direita quando entra em iconAlone */}
              <motion.img
                src="/logo-text.png"
                alt="MAJOR"
                initial={{ opacity: 0, x: "7rem" }}
                animate={
                  stage === "together"
                    ? { opacity: 1, x: "6rem" }
                    : { opacity: 0, x: "9rem" }
                }
                transition={{
                  duration: stage === "together" ? 1.0 : 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  height: "clamp(36px, 6vw, 70px)",
                  width: "auto",
                  objectFit: "contain",
                  translate: "-50% -50%",
                }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
