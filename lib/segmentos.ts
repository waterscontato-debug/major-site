/**
 * Páginas de segmento — uma por nicho que a Major quer dominar no Google
 * em Brasília. Cada entrada vira /<slug> (app/[slug]/page.tsx).
 *
 * Tom (definido pelo Roger em 14/11/2026): a Major NÃO promete resultado
 * (agenda cheia, venda, lead). Resultado depende também do cliente —
 * atendimento, preço, operação. A Major se garante como agência criativa
 * que entrega posicionamento e valor percebido. Nada de número inventado.
 */

export interface Segmento {
  slug: string;
  nome: string; // usado no rodapé e no breadcrumb
  title: string; // <title> — termo de busca primeiro
  description: string;
  h1: string;
  intro: string;
  dores: string[]; // sinais de marca sem posicionamento — nunca "falta de venda"
  entregas: { titulo: string; texto: string }[];
  faq: { p: string; r: string }[];
  keywords: string[];
}

export const SEGMENTOS: Segmento[] = [
  {
    slug: "marketing-odontologico-brasilia",
    nome: "Clínicas odontológicas",
    title: "Marketing odontológico em Brasília — agência criativa pra clínicas e dentistas",
    description:
      "A Major é uma agência criativa em Brasília que constrói posicionamento e valor de marca pra clínicas odontológicas e dentistas do DF: estratégia, identidade visual, conteúdo gravado na clínica e mídia.",
    h1: "Marketing odontológico em Brasília",
    intro:
      "A Major é uma agência criativa de Brasília que constrói o posicionamento de clínicas odontológicas. A gente faz o paciente enxergar valor no seu trabalho antes de perguntar o preço. Estratégia, identidade, conteúdo gravado na sua clínica e mídia, tudo sob a mesma direção criativa.",
    dores: [
      "A clínica parece igual a todas as outras do bairro",
      "O paciente compara você só pelo preço",
      "O conteúdo é genérico e poderia ser de qualquer dentista",
      "A marca não está à altura da qualidade do seu trabalho",
    ],
    entregas: [
      { titulo: "Posicionamento", texto: "O que torna a sua clínica diferente, pra quem ela é e como ela fala. É a base que faz o paciente escolher você pelo valor, e não pelo desconto." },
      { titulo: "Identidade visual", texto: "Marca, paleta, tipografia e um sistema visual que funciona da fachada ao story, com o padrão que o seu atendimento merece." },
      { titulo: "Conteúdo gravado na clínica", texto: "Nossa equipe vai até a sua operação todo mês. Reels, bastidores e conteúdo educativo com direção criativa, dentro das regras do CFO." },
      { titulo: "Mídia com direção criativa", texto: "Tráfego pago no Google e no Instagram pra levar a sua marca a quem ainda não te conhece, com criativo à altura do posicionamento." },
    ],
    faq: [
      { p: "Dentista pode anunciar no Instagram e no Google?", r: "Pode. O Código de Ética Odontológica e as resoluções do CFO definem o que é permitido. A Resolução CFO 271/2025 passou a permitir divulgar promoções e condições de pagamento, o que antes era proibido. Toda a comunicação da Major segue essas regras." },
      { p: "A Major garante que a agenda vai encher?", r: "Não, e desconfie de quem garante. A Major entrega posicionamento, marca e comunicação que fazem o paciente perceber valor. Atendimento, preço e experiência na cadeira são da clínica, e esses dois lados juntos é que geram resultado. A gente trabalha lado a lado com a sua equipe pra que eles andem juntos." },
      { p: "Vocês atendem clínicas fora do Plano Piloto?", r: "Sim. Atendemos clínicas em todo o Distrito Federal, como Águas Claras, Taguatinga, Lago Sul, Sudoeste, Guará e Sobradinho, e também no entorno." },
    ],
    keywords: ["marketing odontológico Brasília", "agência de marketing para dentistas DF", "branding para clínica odontológica", "agência criativa Brasília", "agência de publicidade Brasília odontologia"],
  },
  {
    slug: "marketing-para-clinicas-cirurgicas-brasilia",
    nome: "Clínicas cirúrgicas",
    title: "Marketing para clínicas cirúrgicas e cirurgiões em Brasília",
    description:
      "A Major é uma agência criativa em Brasília que constrói autoridade e posicionamento pra clínicas cirúrgicas e cirurgiões: estratégia de marca, conteúdo, produção audiovisual e mídia, dentro da Resolução CFM 2.336/2023.",
    h1: "Marketing para clínicas cirúrgicas em Brasília",
    intro:
      "Cirurgia é uma decisão cara e emocional: o paciente pesquisa por meses antes de escolher quem vai operá-lo. A Major, agência criativa de Brasília, constrói o posicionamento e a autoridade do cirurgião e da clínica pra que essa escolha seja feita pela confiança, e não pelo preço.",
    dores: [
      "Sua formação e sua técnica não aparecem na comunicação",
      "A clínica é lembrada pelo preço, e não pela segurança",
      "O conteúdo não transmite o nível do seu trabalho",
      "Cada canal fala de um jeito, sem uma marca por trás",
    ],
    entregas: [
      { titulo: "Autoridade do cirurgião", texto: "Marca pessoal e conteúdo educativo sobre procedimentos, recuperação e segurança. É o que constrói confiança antes da primeira consulta." },
      { titulo: "Posicionamento da clínica", texto: "Diferencial claro, tom de voz e identidade visual que comunicam o padrão do seu centro cirúrgico." },
      { titulo: "Produção audiovisual", texto: "Gravação na clínica, entrevistas e bastidores com qualidade de cinema e direção criativa própria." },
      { titulo: "Mídia com direção criativa", texto: "Google e Meta Ads pra levar a sua autoridade a quem está pesquisando o procedimento, sempre com criativo à altura da marca." },
    ],
    faq: [
      { p: "Médico pode fazer publicidade nas redes sociais?", r: "Pode. A Resolução CFM 2.336/2023 atualizou as regras e permite, entre outras coisas, mostrar o consultório, a equipe e conteúdo educativo, com limites claros. Todo material da Major passa por essa checagem." },
      { p: "A Major garante pacientes?", r: "Não. A Major entrega posicionamento, autoridade e comunicação de alto nível. A decisão do paciente também passa pela consulta, pelo atendimento e pela experiência na clínica. A gente trabalha junto com a sua equipe pra que a marca e a operação contem a mesma história." },
      { p: "Vocês atendem cirurgia plástica, bariátrica e outras especialidades?", r: "Sim. Trabalhamos com clínicas e cirurgiões de diferentes especialidades. A estratégia muda conforme o procedimento e o tempo de decisão do paciente." },
    ],
    keywords: ["marketing para clínicas cirúrgicas Brasília", "marketing para cirurgião plástico DF", "marketing médico Brasília", "agência de marketing médico DF", "branding médico Brasília"],
  },
  {
    slug: "marketing-para-escolas-brasilia",
    nome: "Escolas",
    title: "Marketing para escolas em Brasília — agência criativa educacional",
    description:
      "A Major é uma agência criativa em Brasília que constrói posicionamento e valor de marca pra escolas e colégios do DF: estratégia, identidade, conteúdo da rotina escolar e campanhas de matrícula.",
    h1: "Marketing para escolas em Brasília",
    intro:
      "Escolher escola é uma das decisões mais importantes de uma família, e ela é feita por confiança. A Major, agência criativa de Brasília, traduz o projeto pedagógico da sua escola em uma marca clara e mostra o que acontece dentro da sala de aula com a qualidade que ele merece.",
    dores: [
      "O projeto pedagógico é ótimo, mas ninguém de fora entende",
      "A escola é comparada às grandes redes só pela mensalidade",
      "A comunicação muda a cada campanha de matrícula",
      "Os eventos e projetos da escola não viram conteúdo",
    ],
    entregas: [
      { titulo: "Posicionamento da escola", texto: "O que faz a sua escola única, dito de um jeito que os pais entendem e lembram. É o que sustenta o valor da mensalidade." },
      { titulo: "Identidade e marca", texto: "Sistema visual consistente, do uniforme à rede social, com cuidado com a reputação e a avaliação no Google." },
      { titulo: "Conteúdo da rotina escolar", texto: "Equipe gravando eventos, projetos e o dia a dia da escola. É a prova que os pais procuram antes de visitar." },
      { titulo: "Campanha de matrícula", texto: "Conceito criativo e mídia para o ciclo de matrícula e rematrícula, com a mesma marca do ano inteiro." },
    ],
    faq: [
      { p: "Quando a escola deve começar a campanha de matrícula?", r: "O ideal é planejar entre julho e agosto, para estar no ar no segundo semestre, quando as famílias começam a pesquisar para o ano seguinte. Mas a marca se constrói o ano inteiro, e é ela que faz a campanha funcionar." },
      { p: "A Major garante número de matrículas?", r: "Não. A Major entrega posicionamento, marca e comunicação que fazem as famílias enxergarem o valor da sua escola. A visita, o atendimento da secretaria e a experiência pedagógica são da escola. A gente trabalha junto para que tudo conte a mesma história." },
      { p: "Atendem escolas em todo o DF?", r: "Sim. Atendemos escolas no Plano Piloto e nas regiões administrativas, como Águas Claras, Taguatinga, Guará, Sudoeste, Lago Sul e Lago Norte." },
    ],
    keywords: ["marketing para escolas Brasília", "marketing educacional DF", "agência de publicidade para escolas", "branding para escolas", "agência criativa Brasília"],
  },
  {
    slug: "marketing-para-construtoras-brasilia",
    nome: "Construtoras",
    title: "Marketing para construtoras e incorporadoras em Brasília",
    description:
      "A Major é uma agência criativa em Brasília que constrói marca e posicionamento pra construtoras e incorporadoras: branding de empreendimento, produção audiovisual, campanhas de lançamento e marca institucional no DF.",
    h1: "Marketing para construtoras em Brasília",
    intro:
      "Um empreendimento vale o que ele comunica. A Major, agência criativa de Brasília, constrói a marca de construtoras, incorporadoras e empreendimentos do DF, do nome e do conceito até o filme de lançamento, pra que o comprador enxergue valor antes de pisar no stand.",
    dores: [
      "O empreendimento parece igual aos outros da região",
      "A construtora não tem uma marca forte por trás dos lançamentos",
      "O material de venda não está à altura do projeto",
      "Cada lançamento começa a comunicação do zero",
    ],
    entregas: [
      { titulo: "Branding de empreendimento", texto: "Nome, conceito, identidade visual e materiais de venda, do book ao stand." },
      { titulo: "Marca da construtora", texto: "Posicionamento institucional que dá credibilidade e valor a cada novo lançamento." },
      { titulo: "Produção audiovisual", texto: "Filme do empreendimento, drone, acompanhamento de obra e conteúdo pra redes com padrão de cinema." },
      { titulo: "Campanha de lançamento", texto: "Conceito criativo e mídia no Google e no Meta, segmentada por região do DF, com a mesma linguagem do produto." },
    ],
    faq: [
      { p: "Vocês fazem só o lançamento ou a marca da construtora também?", r: "Os dois. Dá para contratar a criação de um empreendimento específico ou o trabalho contínuo de marca da construtora." },
      { p: "A Major garante vendas?", r: "Não. A Major entrega marca, posicionamento e comunicação que fazem o comprador perceber o valor do empreendimento. Preço, condições, atendimento do corretor e o próprio produto são da construtora. A gente trabalha junto com o time comercial para que a marca e a venda falem a mesma língua." },
      { p: "Atendem incorporadoras de fora de Brasília?", r: "Sim. A base é Brasília, mas atendemos empreendimentos em outras cidades do Centro-Oeste." },
    ],
    keywords: ["marketing para construtoras Brasília", "marketing imobiliário DF", "branding de empreendimento", "agência criativa Brasília", "publicidade para incorporadoras"],
  },
];
