export const CONTACT = {
  phone: "(41) 99661-7279",
  phoneHref: "tel:+5541996617279",
  email: "contato@insales.com.br",
  address: "R. Urbâno Lopes, 277 B - Cristo Rei, Curitiba - PR, 80050-520",
  addressShort: "Cristo Rei · Curitiba - PR",
  instagram: "https://instagram.com/insalesmkt",
  instagramHandle: "@insalesmkt",
  maps: "https://www.google.com/maps/search/?api=1&query=R.+Urbano+Lopes,+277+B+-+Cristo+Rei,+Curitiba+-+PR,+80050-520",
  whatsapp:
    "https://wa.me/5541996617279?text=" +
    encodeURIComponent("Olá! Vim pelo site da INSALES e quero falar com um especialista."),
};

export const NAV = [
  { id: "servicos", label: "Serviços" },
  { id: "metodologia", label: "Metodologia" },
  { id: "cases", label: "Cases" },
  { id: "sobre", label: "Sobre" },
  { id: "blog", label: "Blog" },
];

export const STATS = [
  { pre: "+", n: 1, suf: " BI", label: "em vendas geradas" },
  { pre: "+", n: 2000, suf: "", label: "empresas atendidas" },
  { pre: "+", n: 15, suf: "", label: "anos de mercado" },
];

export const SERVICES = [
  {
    key: "trafego", n: "01", title: "Tráfego Pago", tag: "Performance",
    text: "Mais clientes com campanhas de alta performance em Google, Meta e LinkedIn. Otimização por MQL, SQL e venda — não por clique barato.",
    span: "md:col-span-2 md:row-span-2", big: true,
  },
  { key: "seo", n: "02", title: "SEO + GEO", tag: "Orgânico & IA", text: "Visibilidade e demanda orgânica no Google e nas respostas de IA, com estratégia e conteúdo.", span: "md:col-span-2" },
  { key: "crm", n: "03", title: "CRM e Automação", tag: "RevOps", text: "Processos que convertem e escalam suas vendas.", span: "" },
  { key: "ia", n: "04", title: "IA para Vendas", tag: "Inteligência", text: "Produtividade e inteligência no seu funil comercial.", span: "" },
  { key: "site", n: "05", title: "Sites e E-commerce", tag: "Conversão", text: "Estruturas rápidas, rastreáveis e feitas para vender online.", span: "md:col-span-2" },
  { key: "video", n: "06", title: "Video Branding e Social", tag: "Marca", text: "Branding, vídeos estratégicos e social media para posicionamento.", span: "md:col-span-2" },
];

export const PRIMA = [
  { l: "P", t: "Planejar", d: "Diagnóstico de mercado, dados e oportunidades. Projeto de aceleração de 12 meses." },
  { l: "R", t: "Rastrear", d: "GA4, UTMs dinâmicas e rastreio até o CRM. Cada venda com origem clara." },
  { l: "I", t: "Integrar", d: "Mídia paga, SEO e comercial conectados. Marketing e vendas no mesmo funil." },
  { l: "M", t: "Melhorar", d: "Otimização por venda e resultado, com dashboard completo de indicadores." },
  { l: "A", t: "Acelerar", d: "Escala baseada em CPA. Dados temporários viram ativos digitais permanentes." },
];

export const RESULTS = [
  { v: "+300%", l: "aumento médio de conversão" },
  { v: "-40%", l: "redução no custo de aquisição" },
  { v: "+250%", l: "crescimento médio de receita" },
];

export const COMPARE = [
  ["Otimização por clique mais barato", "Otimização por MQL e SQL"],
  ["Sem rastreabilidade", "Rastreabilidade total das campanhas"],
  ["Sem integração com CRM", "Integração completa com CRM"],
  ["Otimização por achismo", "Otimização por venda e resultado"],
  ["Sem escalabilidade", "Escalabilidade baseada em CPA"],
  ["Sem UTM dinâmica", "Uso de UTM dinâmica"],
  ["Apenas um canal de aquisição", "Múltiplos canais de aquisição"],
];

export const CASES = [
  {
    key: "madeleste", client: "Madeleste", img: "/img/madeleste.webp", metric: "+300%",
    label: "de faturamento em 10 meses",
    quote: "Além dos resultados, pudemos mensurar exatamente nossa performance.",
    author: "Paula Kakazu — Sócia, Madeleste",
  },
  {
    key: "primee", client: "Grupo Primee", img: "/img/primee.webp", metric: "20 → 1.100",
    label: "colaboradores, crescendo mais de 120% ao ano",
    quote: "A estratégia de construir um clube de síndicos, ao invés de disputar os termos mais concorridos do Google, nos possibilitou crescer todos os anos.",
    author: "Igor Marçal — Sócio, Grupo Primee",
  },
  {
    key: "technocoat", client: "Technocoat Group", img: "/img/technocoat.webp", metric: "R$ 9,4 mi",
    label: "de crescimento em ARR",
    quote: "Através das campanhas digitais aumentamos nosso faturamento e penetramos o mercado no Chile e na Venezuela.",
    author: "Cristiano Macedo — CEO, Technocoat Group",
  },
  {
    key: "speedo", client: "Speedo", img: null, logo: "/img/logos/speedo.webp", metric: "+97%",
    label: "de receita no e-commerce, com CAC 17% menor",
    quote: "Em 3 meses, +111% de palavras-chave na 1ª página do Google e o orgânico virou o 2º maior canal de receita do site.",
    author: "Resultado do projeto SEO + Performance",
  },
];

export const CLIENTS = [
  "tramontina", "renault", "sicredi", "sanepar", "sesc", "speedo", "gazeta_do_povo", "marabraz",
  "fecomercio_pr", "crea_pr", "curitiba", "racco", "marisol", "outdoormidia", "shopping_crystal",
  "technocoat", "grupo_primee", "fox_express", "diskingressos", "casa_china", "la_violetera", "beautycolor",
];

export const COMPANIES = [
  { key: "wibix", logo: "/img/logos/wibix.webp", text: "Aceleradora digital focada em tráfego pago e inbound, com captura de leads qualificados." },
  { key: "nexxis", logo: "/img/logos/nexxis.webp", text: "Branding e produção de vídeos estratégicos para crescimento e posicionamento de marca." },
  { key: "escalaseo", logo: "/img/logos/escalaseo.webp", text: "Consultoria e assessoria em SEO técnico e estratégico, com foco em crescimento orgânico previsível." },
  { key: "weecommerce", logo: "/img/logos/weecommerce.webp", text: "Consultoria especializada em e-commerces, performance e estruturação de vendas online." },
];

export const SEALS = ["selo_google_partner", "selo_meta_partner", "selo_gptw"];

export const POSTS = [
  {
    slug: "o-que-e-data-marketing",
    title: "O que é Data Marketing e por que ele substitui o marketing por achismo",
    category: "Estratégia",
    date: "12 out 2026",
    read: "6 min",
    excerpt: "Quando cada real investido tem origem, destino e resultado rastreáveis, marketing deixa de ser custo e vira motor de receita.",
    body: [
      "Durante anos, o marketing foi medido por métricas de vaidade: curtidas, alcance, cliques baratos. O problema é que nenhuma delas paga a folha no fim do mês.",
      "Data Marketing é a prática de estruturar dados estratégicos de marketing, integrar canais e tomar decisões orientadas por indicadores. Na prática, significa saber exatamente qual campanha, qual palavra-chave e qual público geraram cada venda.",
      "## Os três pilares",
      "Rastreabilidade: GA4 configurado, UTMs dinâmicas e integração com o CRM. Sem isso, não existe otimização — existe palpite.",
      "Integração: mídia paga, SEO e time comercial trabalhando sobre o mesmo funil, com a mesma definição de lead qualificado.",
      "Decisão por indicadores: ROAS, CPA e LTV acompanhados em dashboard, com reuniões de ajuste baseadas em números, não em opiniões.",
      "## Por onde começar",
      "Comece auditando o que você mede hoje. Se a resposta para \"de onde vieram as vendas do mês passado?\" não é imediata, o primeiro passo não é investir mais em mídia — é organizar os dados.",
    ],
  },
  {
    slug: "pago-e-organico-motor-de-vendas",
    title: "O motor de vendas: venda com dados do pago, escale no orgânico",
    category: "Performance",
    date: "28 set 2026",
    read: "5 min",
    excerpt: "A mídia paga traz receita e dados no curto prazo. O SEO transforma essa inteligência em ativo permanente.",
    body: [
      "Tráfego pago e SEO costumam ser tratados como concorrentes no orçamento. No Método PRIMA, eles são complementares: o pago é o combustível imediato, o SEO é o motor de autoridade.",
      "## A inteligência da curva A",
      "A mídia paga gera receita e, principalmente, dados. Ela revela os termos exatos que convertem em vendas — a sua curva A de palavras-chave.",
      "## O salto",
      "Com essa lista validada, o SEO passa a priorizar conteúdo e otimização para os termos que já provaram vender. O objetivo é conquistar as primeiras posições do Google de forma orgânica, reduzindo a dependência de mídia.",
      "## O resultado",
      "Usamos o pago para validar e o SEO para dominar. Dados temporários de campanha viram ativos digitais permanentes, e o custo de aquisição tende a cair conforme o orgânico ganha participação na receita.",
    ],
  },
  {
    slug: "ia-no-funil-comercial",
    title: "IA no funil comercial: onde ela realmente gera produtividade",
    category: "IA para Vendas",
    date: "15 set 2026",
    read: "4 min",
    excerpt: "Inteligência artificial não substitui o vendedor. Ela elimina o trabalho que impede o vendedor de vender.",
    body: [
      "A conversa sobre IA em vendas costuma oscilar entre o exagero e o ceticismo. O caminho útil está no meio: aplicar IA nos pontos do funil onde há volume, repetição e perda de tempo.",
      "## Pré-atendimento e qualificação",
      "Responder rápido é um dos fatores que mais influenciam a conversão de leads. Assistentes de IA podem fazer o primeiro contato, coletar informações e encaminhar ao time apenas quem tem perfil.",
      "## Enriquecimento de dados no CRM",
      "Resumos automáticos de conversas, classificação de leads e próximos passos sugeridos mantêm o CRM atualizado sem depender da disciplina manual do time.",
      "## Comece pequeno",
      "Escolha um gargalo mensurável — tempo de primeira resposta, por exemplo — implemente, meça e só então expanda. IA sem indicador é só mais uma ferramenta.",
    ],
  },
];
