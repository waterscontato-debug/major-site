'use client';

/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";

/**
 * PortfolioCarrossel — carrossel abaixo da seção Major2026/Portfólio.
 *
 * Estética Major: fundo Jet Black, cards Onyx com borda arredondada,
 * pagination Platinum. Efeito "creative" do Swiper (Z-translate) mantido
 * do referência do usuário.
 *
 * As imagens abaixo são placeholders (as pranchetas dos clientes que já
 * existem em /public/clientes). Quando o Roger tiver as fotos reais das
 * produções, é só trocar as URLs no array IMAGES.
 */

const IMAGES: { src: string; alt: string }[] = [
  { src: "/clientes/prancheta-3.png",  alt: "Case Major 01" },
  { src: "/clientes/prancheta-6.png",  alt: "Case Major 02" },
  { src: "/clientes/prancheta-10.png", alt: "Case Major 03" },
  { src: "/clientes/prancheta-14.png", alt: "Case Major 04" },
  { src: "/clientes/prancheta-16.png", alt: "Case Major 05" },
  { src: "/clientes/prancheta-19.png", alt: "Case Major 06" },
  { src: "/clientes/prancheta-22.png", alt: "Case Major 07" },
  { src: "/clientes/prancheta-25.png", alt: "Case Major 08" },
];

export function PortfolioCarrossel() {
  const css = `
    .major-carrossel {
      width: 100%;
      height: clamp(320px, 46vw, 520px);
      padding-bottom: 44px !important;
    }
    .major-carrossel .swiper-slide {
      background-position: center;
      background-size: cover;
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 24px 60px rgba(0,0,0,0.55);
    }
    .major-carrossel .swiper-pagination-bullet {
      background-color: var(--platinum, #E0E0E0) !important;
      opacity: 0.35;
      width: 8px;
      height: 8px;
      transition: opacity 0.2s, transform 0.2s;
    }
    .major-carrossel .swiper-pagination-bullet-active {
      opacity: 1;
      transform: scale(1.25);
    }
  `;

  return (
    <section
      style={{
        width: "100%",
        background: "var(--jet-black, #1A1A1A)",
        padding: "clamp(3rem, 7vw, 6rem) clamp(1rem, 3vw, 3rem)",
      }}
      aria-label="Portfólio Major — carrossel"
    >
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "0.7rem",
            color: "var(--ash, #BFBFBF)",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            fontWeight: 600,
            marginBottom: "0.75rem",
          }}
        >
          Nosso portfólio
        </div>
        <h2
          style={{
            margin: 0,
            color: "var(--platinum, #E0E0E0)",
            lineHeight: 1.1,
            fontSize: "clamp(1.6rem, 3.6vw, 2.6rem)",
            fontWeight: 300,
            letterSpacing: "-0.01em",
          }}
        >
          Marcas que{" "}
          <span
            style={{
              fontFamily: "'Times New Roman', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            construímos juntos
          </span>
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 900,
            padding: "0 clamp(0.5rem, 2vw, 1.5rem)",
          }}
        >
          <style>{css}</style>
          <Swiper
            spaceBetween={0}
            autoplay={{ delay: 1800, disableOnInteraction: true }}
            effect="creative"
            grabCursor
            slidesPerView="auto"
            centeredSlides
            loop
            pagination={{ clickable: true }}
            className="major-carrossel"
            creativeEffect={{
              prev: { shadow: true, translate: [0, 0, -400] },
              next: { translate: ["100%", 0, 0] },
            }}
            modules={[EffectCreative, Pagination, Autoplay]}
          >
            {IMAGES.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  style={{
                    height: "100%",
                    width: "100%",
                    transform: "scale(1.05)",
                    borderRadius: 22,
                    objectFit: "cover",
                    background: "var(--onyx, #222526)",
                    display: "block",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
