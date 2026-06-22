/* eslint-disable @next/next/no-img-element */
const WHATSAPP_URL =
  "https://wa.me/5561982792200?text=Oi%2C%20vim%20pelo%20site%20da%20Major%20e%20quero%20saber%20mais.";

export function Nav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(15, 15, 16, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}
      >
        <a href="#hero" aria-label="Major — Home">
          <img
            src="/logo-major.png"
            alt="Major"
            style={{
              height: 28,
              filter: "brightness(0) invert(1)",
              objectFit: "contain",
            }}
          />
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <a
            href="#servicos"
            style={{
              color: "var(--muted)",
              fontSize: "0.88rem",
              padding: "0.5rem 0.8rem",
            }}
            className="nav-link"
          >
            Serviços
          </a>
          <a
            href="#cases"
            style={{
              color: "var(--muted)",
              fontSize: "0.88rem",
              padding: "0.5rem 0.8rem",
            }}
            className="nav-link"
          >
            Cases
          </a>
          <a
            href="#contato"
            style={{
              color: "var(--muted)",
              fontSize: "0.88rem",
              padding: "0.5rem 0.8rem",
            }}
            className="nav-link"
          >
            Contato
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "var(--text)",
              color: "var(--bg)",
              padding: "0.6rem 1.1rem",
              borderRadius: 999,
              fontSize: "0.85rem",
              fontWeight: 500,
              marginLeft: "0.5rem",
              transition: "transform 0.15s",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            Pedir análise gratuita
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-link { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
