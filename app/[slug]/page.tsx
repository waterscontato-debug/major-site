/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { SEGMENTOS } from "@/lib/segmentos";

const SITE_URL = "https://agenciamajor.com.br";
const WA = "https://wa.me/5561982792200?text=";

// Só os slugs de SEGMENTOS existem; qualquer outro vira 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SEGMENTOS.map((s) => ({ slug: s.slug }));
}

const find = (slug: string) => SEGMENTOS.find((s) => s.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = find((await params).slug);
  if (!s) return {};
  const url = `${SITE_URL}/${s.slug}`;
  return {
    title: { absolute: `${s.title} | Major` },
    description: s.description,
    keywords: s.keywords,
    alternates: { canonical: url },
    openGraph: { title: s.title, description: s.description, url, locale: "pt_BR", type: "website" },
  };
}

export default async function SegmentoPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = find((await params).slug);
  if (!s) notFound();

  const url = `${SITE_URL}/${s.slug}`;
  const waMsg = encodeURIComponent(`Oi! Vim pelo site da Major e quero falar sobre marketing para ${s.nome.toLowerCase()}.`);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.h1,
      description: s.description,
      url,
      serviceType: "Agência de publicidade e marketing",
      areaServed: { "@type": "City", name: "Brasília" },
      provider: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faq.map((f) => ({
        "@type": "Question",
        name: f.p,
        acceptedAnswer: { "@type": "Answer", text: f.r },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Major", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: s.nome, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="container seg-top">
        <a href="/" aria-label="Major — página inicial">
          <img src="/logo-major.png" alt="Major" className="seg-logo" />
        </a>
        <a href={WA + waMsg} target="_blank" rel="noopener noreferrer" className="seg-btn">
          Falar no WhatsApp
        </a>
      </header>

      <main>
        <section className="container seg-hero">
          <div className="seg-hero-in">
          <p className="seg-eyebrow">Major · Agência criativa de publicidade em Brasília</p>
          <h1 className="h-display">{s.h1}</h1>
          <p className="seg-lead">{s.intro}</p>
          <a href={WA + waMsg} target="_blank" rel="noopener noreferrer" className="seg-btn seg-btn-lg">
            Quero conversar com a Major
          </a>
          </div>
        </section>

        <section className="container seg-block">
          <h2 className="h-display">Você se reconhece aqui?</h2>
          <ul className="seg-dores">
            {s.dores.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </section>

        <section className="container seg-block">
          <h2 className="h-display">O que a Major faz por {s.nome.toLowerCase()}</h2>
          <div className="seg-grid">
            {s.entregas.map((e) => (
              <article key={e.titulo} className="seg-card">
                <h3>{e.titulo}</h3>
                <p>{e.texto}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container seg-block">
          <h2 className="h-display">O que a Major promete</h2>
          <div className="seg-promessa">
            <div>
              <h3>A gente garante</h3>
              <p>Posicionamento claro, criação de alto nível e uma marca que faz o seu cliente perceber valor. É nisso que a Major se garante: somos uma agência criativa, e a nossa entrega é a marca.</p>
            </div>
            <div>
              <h3>A gente não promete milagre</h3>
              <p>Resultado é construído a quatro mãos. Atendimento, preço, experiência e operação são do seu negócio e pesam tanto quanto o marketing. A gente trabalha junto com a sua equipe pra que a marca e o dia a dia contem a mesma história.</p>
            </div>
          </div>
        </section>

        <section className="container seg-block">
          <h2 className="h-display">Perguntas frequentes</h2>
          {s.faq.map((f) => (
            <details key={f.p} className="seg-faq">
              <summary>{f.p}</summary>
              <p>{f.r}</p>
            </details>
          ))}
        </section>

        <nav className="container seg-block" aria-label="Outros segmentos">
          <h2 className="h-display">A Major também atende</h2>
          <ul className="seg-links">
            {SEGMENTOS.filter((o) => o.slug !== s.slug).map((o) => (
              <li key={o.slug}><a href={`/${o.slug}`}>{o.h1}</a></li>
            ))}
          </ul>
        </nav>
      </main>

      <Footer />

      <style>{`
        .seg-top { display:flex; justify-content:space-between; align-items:center; padding-top:1.5rem; padding-bottom:1.5rem; }
        .seg-logo { height:40px; width:auto; filter:brightness(0) invert(1); display:block; }
        .seg-btn { display:inline-block; padding:.7rem 1.2rem; border:1px solid var(--border); color:var(--text); font-size:.9rem; transition:background .2s,color .2s; }
        .seg-btn:hover { background:var(--text); color:var(--bg); }
        .seg-btn-lg { padding:1rem 1.8rem; font-size:1rem; margin-top:2rem; }
        .seg-hero { padding-top:clamp(3rem,8vw,7rem); padding-bottom:clamp(3rem,6vw,5rem); }
        .seg-hero-in { max-width:900px; }
        .seg-eyebrow { color:var(--muted); font-size:.8rem; letter-spacing:.14em; text-transform:uppercase; margin-bottom:1rem; }
        .seg-hero h1 { font-size:clamp(2.4rem,6vw,4.4rem); text-transform:uppercase; line-height:.95; margin:0 0 1.5rem; }
        .seg-lead { color:var(--muted); font-size:clamp(1rem,1.6vw,1.2rem); line-height:1.65; max-width:720px; }
        .seg-block { padding-top:clamp(2.5rem,5vw,4rem); padding-bottom:clamp(2.5rem,5vw,4rem); border-top:1px solid var(--border); }
        .seg-block h2 { font-size:clamp(1.6rem,3.4vw,2.4rem); text-transform:uppercase; margin:0 0 2rem; }
        .seg-dores { list-style:none; padding:0; display:grid; gap:.9rem; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); }
        .seg-dores li { background:var(--bg-card); padding:1.2rem 1.4rem; color:var(--text); line-height:1.5; }
        .seg-grid { display:grid; gap:1rem; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); }
        .seg-card { background:var(--bg-card); padding:1.6rem; }
        .seg-card h3 { font-size:1.1rem; margin:0 0 .6rem; color:var(--text); }
        .seg-card p, .seg-faq p { color:var(--muted); line-height:1.6; margin:0; }
        .seg-promessa { display:grid; gap:1rem; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); }
        .seg-promessa > div { background:var(--bg-card); padding:1.8rem; }
        .seg-promessa h3 { font-size:1.15rem; margin:0 0 .7rem; color:var(--text); }
        .seg-promessa p { color:var(--muted); line-height:1.65; margin:0; }
        .seg-faq { border-bottom:1px solid var(--border); padding:1.1rem 0; }
        .seg-faq summary { cursor:pointer; color:var(--text); font-size:1.05rem; }
        .seg-faq p { margin-top:.8rem; }
        .seg-links { list-style:none; padding:0; display:flex; flex-wrap:wrap; gap:.8rem; }
        .seg-links a { display:inline-block; padding:.7rem 1.1rem; border:1px solid var(--border); color:var(--muted); }
        .seg-links a:hover { color:var(--text); border-color:var(--muted); }
      `}</style>
    </>
  );
}
