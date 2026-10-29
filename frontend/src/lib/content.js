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
  { id: "servicos", to: "/servicos", label: "Soluções" },
  { id: "metodologia", to: "/metodologia", label: "Metodologia" },
  { id: "quem-somos", to: "/quem-somos", label: "Quem Somos" },
  { id: "blog", to: "/blog", label: "Blog" },
  { id: "fale-conosco", to: "/fale-conosco", label: "Fale Conosco" },
];

export const STATS = [
  { pre: "+", n: 1, suf: " BI", label: "em vendas geradas" },
  { pre: "+", n: 2000, suf: "", label: "empresas atendidas" },
  { pre: "+", n: 15, suf: "", label: "anos de mercado" },
];

export const SERVICES = [
  { key: "branding", n: "01", title: "Branding", tag: "Marca", text: "Identidade e posicionamento que tornam sua marca reconhecida e desejada." },
  { key: "meta", n: "02", title: "Meta Ads", tag: "Mídia paga", text: "Campanhas no Facebook e Instagram otimizadas para gerar leads e vendas." },
  { key: "social", n: "03", title: "Social Media", tag: "Conteúdo", text: "Gestão de redes com estratégia, calendário e conteúdo que engaja." },
  { key: "seo", n: "04", title: "SEO — Tráfego Orgânico", tag: "Orgânico", text: "Suas páginas nas primeiras posições do Google, gerando demanda contínua." },
  { key: "ecommerce", n: "05", title: "Criação de E-commerce", tag: "Loja virtual", text: "Lojas virtuais rápidas, rastreáveis e estruturadas para vender online." },
  { key: "google", n: "06", title: "Google Ads", tag: "Mídia paga", text: "Anúncios na pesquisa, YouTube e display para quem já procura o que você vende." },
  { key: "sites", n: "07", title: "Sites Institucionais", tag: "Presença digital", text: "Sites profissionais que transmitem credibilidade e convertem visitantes." },
  { key: "materiais", n: "08", title: "Materiais de Venda", tag: "Comercial", text: "Apresentações, propostas e catálogos que ajudam seu time a fechar negócios." },
  { key: "videos", n: "09", title: "Vídeos Social e Institucionais", tag: "Audiovisual", text: "Vídeos para redes sociais e institucionais que contam a história da sua marca." },
  { key: "geo", n: "10", title: "SEO para IA (GEO)", tag: "Inteligência artificial", text: "Sua empresa citada nas respostas do ChatGPT, Gemini e outras IAs." },
];

export const PRIMA = [
  { l: "P", t: "Planejar", d: "Pesquisa de mercado, concorrentes, ICP, MQL, demanda e plano comercial com prioridades claras." },
  { l: "R", t: "Rastrear", d: "Eventos, UTMs e CRM para relacionar canais e palavras-chave a oportunidades, vendas e receita." },
  { l: "I", t: "Integrar", d: "Mídia paga, SEO/GEO, atendimento e comercial integrados numa mesma jornada de dados." },
  { l: "M", t: "Melhorar", d: "Análise de conversão, CAC, ticket, ROI e ROAS para corrigir gargalos e priorizar ações." },
  { l: "A", t: "Acelerar", d: "Escala controlada por margem, capacidade comercial e indicadores de retorno reais." },
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
{
  "slug": "diagnostico-estrategico-marketing-antes-de-anunciar",
  "title": "Diagnóstico estratégico de marketing: o que analisar antes de investir em anúncios",
  "category": "Diagnóstico e estratégia",
  "date": "25 out 2026",
  "read": "7 min",
  "excerpt": "Uma campanha pode gerar cliques e ainda assim não trazer clientes. Saiba como avaliar mercado, concorrentes, intenção de compra e estrutura comercial antes de investir.",
  "body": [
    "O erro mais caro de uma campanha pode acontecer antes do primeiro anúncio: investir sem conhecer o setor, a demanda real, a margem e a jornada de compra. Uma boa operação começa por perguntas e dados, não por escolher uma plataforma de mídia.",
    "## 1. Existe procura pelo que sua empresa vende?",
    "Pesquise a demanda por serviços e produtos em cada região, a sazonalidade e o comportamento de busca. Volume de pesquisa é um sinal de interesse, mas não equivale a volume de vendas. Entenda também como a concorrência se posiciona e onde existem necessidades ainda mal atendidas.",
    "## 2. Qual busca indica intenção de compra?",
    "Palavras-chave de fundo de funil revelam intenções distintas: comparar alternativas, pedir orçamento, agendar, contratar ou comprar. Priorize termos compatíveis com sua oferta e sua margem. É necessário separar procura informacional de demanda comercial antes de estimar retorno.",
    "## 3. Quem vale a pena atrair?",
    "O ICP descreve o cliente ideal: perfil, necessidade, potencial de compra e compatibilidade com a entrega. O MQL define critérios mensuráveis para identificar contatos que merecem abordagem. Sem alinhamento com vendas, o marketing pode aumentar o volume de contatos e piorar a eficiência da equipe.",
    "## 4. Seu negócio consegue atender a nova demanda?",
    "Antes de aumentar o orçamento, avalie o tempo de primeira resposta, quem assume cada oportunidade, as etapas do CRM e o histórico de conversões. Uma operação lenta pode desperdiçar investimento, mesmo com campanhas tecnicamente bem executadas.",
    "## 5. O que o diagnóstico precisa entregar?",
    "Ao final, o empresário deve entender os principais gargalos, oportunidades e indicadores que precisam ser organizados. O plano inicial de 90 dias pode começar pela instrumentação de dados, melhoria do atendimento ou testes de mensagens e canais, em vez de exigir mais verba imediatamente.",
    "## Comece com clareza",
    "A Consultoria Estratégica inicial da INSALES foi desenhada para mergulhar nesse cenário em cerca de uma hora. O aprofundamento depende dos dados disponíveis; o diagnóstico orienta decisões, sem prometer faturamento ou resultados garantidos."
  ]
},
{
  "slug": "metodo-prima-rastreio-do-clique-a-venda",
  "title": "Do clique à venda: como rastrear o marketing e identificar os canais que trazem receita",
  "category": "Data Marketing",
  "date": "25 out 2026",
  "read": "8 min",
  "excerpt": "Cliques e leads não bastam. Veja como conectar campanha, palavra-chave, CRM, ticket médio e receita para tomar decisões melhores.",
  "body": [
    "Você sabe qual canal trouxe mais faturamento no mês passado? E qual palavra-chave gerou o cliente de maior ticket? Se a resposta depende de planilhas desconectadas ou de memória, a empresa ainda não controla todo o seu processo de aquisição.",
    "## O que medir além do lead",
    "O custo por lead é útil, mas pode esconder baixa qualificação. O caminho completo relaciona origem e campanha, primeiro contato, qualificação, atendimento, proposta, venda e valor recebido. Nem toda venda pode ser atribuída perfeitamente; o importante é combinar fontes de dados com critérios consistentes.",
    "## Como o rastreio começa",
    "Uma implementação inicial verifica eventos de conversão, GA4, identificadores de campanha e UTMs. O registro precisa acompanhar o contato quando ele chega ao CRM, respeitando privacidade e consentimentos aplicáveis. Se o usuário liga ou retorna por outro canal, vale documentar a incerteza da atribuição.",
    "## O papel do CRM",
    "O CRM deve mostrar quem atendeu, quando respondeu, qual é a próxima atividade e em que etapa está cada negociação. Sem essas informações, a equipe não consegue separar um problema de geração de demanda de um problema de atendimento ou fechamento.",
    "## Quais indicadores ajudam o empresário",
    "CAC indica custos de aquisição segundo os itens incluídos no cálculo. ROAS compara receita atribuída à publicidade com a verba de mídia. ROI examina o retorno financeiro frente ao investimento definido. Taxas de passagem no funil e ticket médio ajudam a descobrir onde a receita está sendo perdida.",
    "## Onde entra o Método PRIMA",
    "Planejar o mercado, Rastrear as origens, Integrar canais e vendas, Melhorar as conversões e Acelerar investimentos de forma fundamentada. A lógica é simples: não aumentar o gasto sem saber quais oportunidades foram geradas e se existe capacidade para convertê-las.",
    "## Próxima ação",
    "Mapeie uma única campanha, sua chegada ao CRM e a receita efetiva obtida. Se não conseguir seguir esse trajeto, organizar dados pode ser mais importante do que aumentar o orçamento."
  ]
},
{
  "slug": "crm-conversao-ticket-medio-marketing-vendas",
  "title": "Seu CRM vende ou apenas armazena contatos? Como melhorar conversão e ticket médio",
  "category": "Gestão comercial",
  "date": "25 out 2026",
  "read": "7 min",
  "excerpt": "Descubra como priorização de oportunidades, velocidade de atendimento e indicadores comerciais se conectam ao retorno do marketing.",
  "body": [
    "Gerar mais oportunidades não garante crescimento. É comum investir em anúncios, receber contatos e perder vendas por demora no atendimento, falta de priorização e ausência de uma rotina de acompanhamento.",
    "## A velocidade da primeira resposta",
    "Registre quanto tempo leva para o primeiro contato e qual é a taxa de resposta por canal, unidade e vendedor. Um lead com alta intenção comercial pode desistir enquanto aguarda. Compare horários, equipes e etapas antes de automatizar indiscriminadamente.",
    "## Priorizar não é só distribuir leads",
    "Um CRM pode ajudar a definir critérios de prioridade: perfil do ICP, urgência, orçamento, estágio da jornada e interesse declarado. As regras precisam ser simples, transparentes e revisadas com base nas vendas realizadas.",
    "## Diagnosticar perdas no funil",
    "Compare as taxas de conversão entre recebimento, qualificação, agendamento, proposta e fechamento. Observe também no-shows, follow-up, motivos de perda e tempo médio em cada etapa. Esses números mostram onde treinar, ajustar abordagem ou redesenhar o processo.",
    "## Como trabalhar o ticket médio",
    "Ticket não aumenta apenas oferecendo um serviço mais caro. Analise adequação da solução, pacotes complementares, percepção de valor, segmentação de clientes e condições comerciais. Respeite capacidade de entrega e margem para não crescer com rentabilidade menor.",
    "## Marketing e vendas precisam dividir os indicadores",
    "Se o tráfego pago é otimizado apenas por quantidade de leads enquanto o vendedor é cobrado por faturamento, os incentivos ficam desalinhados. Acompanhe custo por oportunidade qualificada, taxa de fechamento, receita por campanha e eventual retorno dos clientes no tempo.",
    "## Um plano inicial de 90 dias",
    "Nos primeiros 30 dias, estruture dados e etapas do CRM. Nos 30 seguintes, teste SLAs e priorizações. Até o dia 90, revise conversões, qualidade e ticket para decidir onde expandir. Os prazos são um exemplo de organização, ajustável à maturidade de cada operação.",
    "## Próxima ação",
    "Comece perguntando: meu vendedor sabe hoje quais oportunidades têm maior probabilidade de avanço? Se não, a próxima otimização talvez esteja no processo comercial, não em comprar mais cliques."
  ]
}
];
