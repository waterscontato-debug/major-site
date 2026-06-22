/* eslint-disable @next/next/no-img-element */
/**
 * Footer — última seção do site. Estrutura:
 *  - Topo: CTA grande de WhatsApp (substitui a antiga section "Contato")
 *  - Meio: 3 colunas (logo + descrição, navegue, contato)
 *  - Rodapé: copyright + cidade
 *
 * O botão de WhatsApp segue o estilo Player Roberts Bell (sem bordas
 * arredondadas exageradas, hover de inversão), mas em verde WhatsApp
 * porque é a cor reconhecível do app.
 */

const WHATSAPP_NUMBER = "5561982792200"; // (61) 98279-2200
const WHATSAPP_MSG = "Oi! Vim pelo site da Major e gostaria de conversar.";

/** Ícone SVG do WhatsApp */
function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Footer() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* ===== CTA WhatsApp (em destaque) ===== */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "clamp(3rem, 6vw, 5rem) 0",
        }}
      >
        <div
          className="footer-inner"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(1.5rem, 5vw, 3rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 540 }}>
            <div
              style={{
                fontFamily: "'Times New Roman', Georgia, serif",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "var(--ash)",
                marginBottom: "0.8rem",
              }}
            >
              (fala com a gente)
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                color: "var(--platinum)",
                margin: 0,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
              }}
            >
              Prefere conversar direto?
            </h3>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-wa-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.7rem",
              padding: "0.85rem 1.4rem",
              background: "transparent",
              color: "var(--platinum)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 8,
              fontSize: "0.92rem",
              fontWeight: 500,
              letterSpacing: "0.01em",
              textDecoration: "none",
              boxShadow: "0 0 0 rgba(37, 211, 102, 0)",
              transition:
                "background 0.3s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <WhatsAppIcon size={18} />
            Falar no WhatsApp
          </a>
        </div>
      </div>

      {/* ===== Meio: logo + links + contato ===== */}
      <div
        className="footer-inner footer-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(3rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3rem) clamp(2rem, 4vw, 3rem)",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr",
          gap: "clamp(2.5rem, 5vw, 4rem)",
        }}
      >
        <div>
          <img
            src="/logo-major.png"
            alt="Major"
            style={{
              height: "clamp(42px, 5vw, 56px)",
              width: "auto",
              filter: "brightness(0) invert(1)",
              marginBottom: "1.4rem",
              objectFit: "contain",
              display: "block",
            }}
          />
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              maxWidth: 380,
            }}
          >
            Marketing completo, sob direção criativa única. Da estratégia ao
            primeiro reel publicado — tudo na mesma agência.
          </p>
        </div>

        <div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--dim)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Navegue
          </div>
          <ul style={{ listStyle: "none", display: "grid", gap: "0.7rem", padding: 0 }}>
            <li>
              <a href="#servicos" style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
                O que fazemos
              </a>
            </li>
            <li>
              <a href="#major-2026" style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
                Portfólio
              </a>
            </li>
            <li>
              <a href="#proposta" style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
                Montar proposta
              </a>
            </li>
            <li>
              <a
                href="https://app.agenciamajor.com.br"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--muted)", fontSize: "0.95rem" }}
              >
                Portal do colaborador →
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--dim)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Contato
          </div>
          <ul style={{ listStyle: "none", display: "grid", gap: "0.7rem", padding: 0 }}>
            <li>
              <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
                (61) 98279-2200
              </a>
            </li>
            <li>
              <a href="mailto:contato@agenciamajor.com.br" style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
                contato@agenciamajor.com.br
              </a>
            </li>
            <li>
              <span style={{ color: "var(--muted)", fontSize: "0.95rem" }}>Brasília · DF</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ===== Rodapé final ===== */}
      <div
        className="footer-inner"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "1.6rem clamp(1.5rem, 5vw, 3rem)",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.78rem",
          color: "var(--dim)",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div>© {new Date().getFullYear()} Agência Major. Todos os direitos reservados.</div>
        <div>Brasília, DF</div>
      </div>

      <style>{`
        .footer-wa-btn:hover {
          background: #25D366 !important;
          color: #0a3d20 !important;
          border-color: #25D366 !important;
          box-shadow:
            0 0 24px rgba(37, 211, 102, 0.45),
            0 0 60px rgba(37, 211, 102, 0.2);
          transform: translateY(-1px);
        }
        .footer-wa-btn:active {
          /* No clique fica ainda mais intenso e brilhante */
          background: #20bd5a !important;
          color: #0a3d20 !important;
          border-color: #20bd5a !important;
          box-shadow:
            0 0 32px rgba(37, 211, 102, 0.65),
            0 0 80px rgba(37, 211, 102, 0.35),
            0 0 120px rgba(37, 211, 102, 0.15);
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
