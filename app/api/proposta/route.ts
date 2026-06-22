/**
 * POST /api/proposta
 *
 * Recebe as 15 respostas + dados de contato do formulário "Monte sua
 * proposta", valida e dispara email pros sócios da Major via Resend.
 *
 * .env.local necessário:
 *   RESEND_API_KEY=re_...                              (https://resend.com/api-keys)
 *   PROPOSTA_TO=waterscontato@gmail.com,outro@socio.com  (lista CSV)
 *   PROPOSTA_FROM=Major <propostas@agenciamajor.com.br>  (domínio verificado)
 *
 * Sem RESEND_API_KEY: o endpoint loga no console e retorna sucesso
 * pra não bloquear o usuário em ambiente local.
 */

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ===== Configuração das perguntas (mesmo idioma do front) ===== */

interface QField {
  key: string;
  label: string;
  /** Marca pra perguntas-chave que destacam o lead */
  highlight?: boolean;
}

const QUESTIONS: QField[] = [
  { key: "empresa", label: "Empresa / Marca" },
  { key: "segmento", label: "Segmento" },
  { key: "problema", label: "Principal problema da marca", highlight: true },
  { key: "construir", label: "O que quer construir agora" },
  { key: "cenario", label: "Cenário atual" },
  { key: "identidade", label: "Identidade visual" },
  { key: "redes", label: "Frequência nas redes" },
  { key: "anuncios_atual", label: "Anúncios hoje" },
  { key: "conteudo", label: "Tipo de conteúdo desejado" },
  { key: "interno", label: "Time interno pra marketing" },
  { key: "objetivo", label: "Objetivo (próximos 3 meses)", highlight: true },
  { key: "urgencia", label: "Urgência", highlight: true },
  { key: "investimento", label: "Investimento mensal previsto", highlight: true },
  { key: "verba_ads", label: "Verba pra anúncios" },
  { key: "por_que_agora", label: "Por que agora é o momento", highlight: true },
];

/* ===== Helpers ===== */

function esc(s: string | undefined | null): string {
  if (!s) return "—";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

/* ===== Handler ===== */

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = (await req.json()) as Record<string, string>;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  // Validação básica: contato obrigatório
  const nome = body.nome?.trim();
  const email = body.email?.trim();
  const telefone = body.telefone?.trim();

  if (!nome || !email || !telefone) {
    return NextResponse.json(
      { error: "Preencha nome, email e WhatsApp" },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  // Validação: pelo menos as 15 perguntas precisam ter resposta
  const respondidas = QUESTIONS.filter((q) => body[q.key]?.trim()).length;
  if (respondidas < QUESTIONS.length) {
    return NextResponse.json(
      { error: `Responda todas as ${QUESTIONS.length} perguntas` },
      { status: 400 },
    );
  }

  // Monta o email
  const empresa = body.empresa ?? "Sem nome";
  const subject = `📨 Proposta — ${empresa} (${body.segmento ?? "?"})`;

  const linhasContexto = QUESTIONS.filter((q) => !q.highlight)
    .map(
      (q) => `
        <tr>
          <td style="padding: 7px 12px 7px 0; color: #666; vertical-align: top; width: 38%;">${esc(q.label)}</td>
          <td style="padding: 7px 0;"><b>${esc(body[q.key])}</b></td>
        </tr>`,
    )
    .join("");

  const linhasDestaque = QUESTIONS.filter((q) => q.highlight)
    .map(
      (q) => `
        <div style="background: #f9f5f1; border-left: 3px solid #C97757; padding: 12px 16px; margin-bottom: 10px; border-radius: 0 6px 6px 0;">
          <div style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">${esc(q.label)}</div>
          <div style="font-size: 15px; color: #1a1a1a; line-height: 1.5; ${q.key === "por_que_agora" ? "white-space: pre-wrap;" : ""}"><b>${esc(body[q.key])}</b></div>
        </div>`,
    )
    .join("");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
      <h2 style="margin: 0 0 4px; font-size: 22px; font-weight: 600; letter-spacing: -0.02em;">Nova proposta — ${esc(empresa)}</h2>
      <p style="margin: 0 0 24px; color: #666; font-size: 13px;">Via formulário /proposta — major-site</p>

      <h3 style="margin: 0 0 14px; font-size: 14px; color: #C97757; text-transform: uppercase; letter-spacing: 0.1em;">⚡ Sinais de qualificação</h3>
      ${linhasDestaque}

      <h3 style="margin: 28px 0 12px; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px;">Contexto detalhado</h3>
      <table style="width:100%; border-collapse: collapse; font-size: 14px;">
        ${linhasContexto}
      </table>

      <h3 style="margin: 28px 0 12px; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px;">Contato</h3>
      <table style="width:100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 6px 12px 6px 0; color: #666; width: 38%;">Nome</td><td><b>${esc(nome)}</b></td></tr>
        <tr><td style="padding: 6px 12px 6px 0; color: #666;">Email</td><td><a href="mailto:${esc(email)}" style="color: #1a1a1a;"><b>${esc(email)}</b></a></td></tr>
        <tr><td style="padding: 6px 12px 6px 0; color: #666;">WhatsApp</td><td><a href="https://wa.me/${esc(telefone).replace(/\D/g, "")}" style="color: #1a1a1a;"><b>${esc(telefone)}</b></a></td></tr>
        <tr><td style="padding: 6px 12px 6px 0; color: #666;">Melhor horário</td><td>${esc(body.horario)}</td></tr>
      </table>

      ${
        body.observacoes?.trim()
          ? `
        <h3 style="margin: 28px 0 12px; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px;">Observações</h3>
        <p style="margin: 0; font-size: 14px; line-height: 1.55; background: #f5f5f5; padding: 12px 16px; border-radius: 6px; white-space: pre-wrap;">${esc(body.observacoes)}</p>
      `
          : ""
      }

      <p style="margin: 32px 0 0; padding-top: 16px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999;">
        SLA sugerido: responder no WhatsApp em até 24h. Use o Reply pra responder direto pro cliente.
      </p>
    </div>
  `;

  // Versão texto plano (fallback)
  const text = `
NOVA PROPOSTA — ${empresa}

== SINAIS DE QUALIFICAÇÃO ==
${QUESTIONS.filter((q) => q.highlight)
  .map((q) => `${q.label.toUpperCase()}:\n  ${body[q.key]}`)
  .join("\n\n")}

== CONTEXTO ==
${QUESTIONS.filter((q) => !q.highlight)
  .map((q) => `${q.label}: ${body[q.key]}`)
  .join("\n")}

== CONTATO ==
Nome: ${nome}
Email: ${email}
WhatsApp: ${telefone}
Horário: ${body.horario ?? "—"}

${body.observacoes?.trim() ? `OBS:\n${body.observacoes}\n` : ""}
  `.trim();

  // ===== Envio =====
  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.PROPOSTA_TO ?? "waterscontato@gmail.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const from = process.env.PROPOSTA_FROM ?? "Major Propostas <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("⚠️  [proposta] RESEND_API_KEY não setada — proposta NÃO enviada por email. Conteúdo:");
    console.log(text);
    return NextResponse.json({
      ok: true,
      delivered: false,
      message: "Recebido em modo dev (sem email).",
    });
  }

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
        text,
        reply_to: email,
      }),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error("[proposta] Resend rejeitou:", errorText);
      return NextResponse.json({
        ok: true,
        delivered: false,
        message: "Recebido. Problema no envio automático — entraremos em contato manualmente.",
      });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[proposta] Erro inesperado:", err);
    return NextResponse.json(
      { ok: true, delivered: false, message: "Recebido. Problema técnico — vamos te contatar." },
      { status: 200 },
    );
  }
}
