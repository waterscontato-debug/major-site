@AGENTS.md

# Paleta oficial do site

A Major usa esses 5 tons em todo o site público. Estão expostos como
CSS variables em `app/globals.css` (`--onyx`, `--graphite`, etc).

| Token        | Hex      | Uso típico                                          |
|--------------|----------|-----------------------------------------------------|
| Jet Black    | #1A1A1A  | Fundo geral mais escuro (--bg)                      |
| Onyx         | #222526  | Cards, superfícies elevadas (--bg-card)             |
| Graphite     | #353A3E  | Section secundária, bordas marcantes                |
| Ash          | #BFBFBF  | Texto secundário, ícones em superfícies escuras     |
| Platinum     | #E0E0E0  | Texto principal claro, destaques em fundo escuro    |

## Regras quando o Roger pedir paleta

- **Paleta padrão / "estilo Major"** → fundo Jet Black, cards Onyx, texto
  Platinum, microcopy Ash. É o padrão de todo o site.
- **"Paleta mais clara"** → trocar fundo pra Platinum (#E0E0E0), texto
  pra Jet Black (#1A1A1A), e usar Ash (#BFBFBF) pras superfícies
  secundárias. Bom pra landings de prospecção ou seções "convite".
- Quando criar componente novo, sempre usar as CSS variables. Nunca
  hard-codar hex.
