# Auditoria multilíngue e painel de cookies — INSALES (05/11/2026)

## Escopo
Correções de EN-US e ES baseadas no arquivo `VALIDACAO_IDIOMAS_INSALES_2026-11-05.md`.
PT, imagens, CSS, logo, animações e rotas permanecem preservados.

## Cookie banner mostrado no site publicado
O texto "Utilizamos cookies ... Settings / Aceitar" está **presente no HTML entregue por insales.com.br**, mas **não existe no código dos componentes React neste repositório**.
Possíveis fontes: plugin de consentimento no WordPress, inserção em wp_head/wp_footer,
tag manager ou script externo. NÃO ocultar por CSS enquanto scripts de rastreamento opcionais estiverem ativos.

### Ação obrigatória do responsável pela hospedagem WordPress
1. Em ambiente de homologação, identificar o plugin/script específico via Inspetor de Elementos,
   lista de plugins e Network/Initiator. Registrar plugin e versão.
2. Conferir todos os scripts de análise, personalização, anúncios, mapa e gravação.
   O arquivo `frontend/public/index.html` contém inicialização de PostHog, que
   precisa ser avaliada como script de rastreamento opcional.
3. Para retirar o banner completamente, desativar primeiro os scripts/cookies não essenciais
   ou implementar outra solução juridicamente adequada. NÃO retirar apenas a interface de escolha.
4. Limpar cache WordPress/CDN e verificar em janela anônima, EN e ES.
5. Não remover a Política de Privacidade publicada: ela continua sendo necessária.
6. Verificar consentimento antes de mapas, pixels, Analytics, PostHog e demais ferramentas,
   conforme a política de privacidade e LGPD.
7. Na versão WordPress, garantir **apenas uma camada de metadata SEO**. Desativar a geração
   automática de canonicals/descrições do plugin SEO nas rotas atendidas pelo React,
   ou desativar a injeção de wp_head/wp_footer onde apropriado ao tema React.
8. Proteger o staging contra indexação. Liberar a indexação em produção somente após testes.

## Validação das traduções
- 4 cards da jornada PRIMA e rótulos de etapas EN/ES
- Categoria do CRM
- Títulos e 3 perguntas FAQ específicas por serviço nas 13 páginas
- Footer global e WhatsApp genérico
- Headline natural da home, números e título Quem Somos
- Exemplos de contato, rótulos acessíveis, atributos alt e iframe
- Uma única fonte de título do documento (SeoHead); deduplicação de tags DOM
- Canonical sem // na home; hreflang pt-BR/es/en-US/x-default, URLs com ?lang=
- Conteúdo dos 6 artigos mantido, sem alterações editoriais

## Observações de SEO
A estratégia atual usa `?lang=en` e `?lang=es`. As tags HTML atualizadas por React
aparecem após a hidratação. A versão fonte HTML compilada permanece PT.
Para indexação multinacional de alta qualidade, recomenda-se uma etapa adicional
de renderização estática/SSR por idioma ou rotas /en/ e /es/ com HTML inicial
localizado, antes de solicitar indexação internacional.
