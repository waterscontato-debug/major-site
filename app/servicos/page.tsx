export default function ServicosPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        fontFamily: "var(--font-body)",
      }}
    >
      <div style={{ maxWidth: 600, textAlign: "center" }}>
        <div
          style={{
            fontSize: "0.78rem",
            color: "var(--accent)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Nossos serviços
        </div>
        <h1
          className="h-display"
          style={{
            fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
            textTransform: "uppercase",
            marginBottom: "1.25rem",
          }}
        >
          Em construção
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.6 }}>
          Aqui vai ficar a descrição completa de cada serviço que a Major oferece.
          Volta em breve.
        </p>
      </div>
    </main>
  );
}
