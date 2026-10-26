# Backend INSALES na Vercel

O React e as Functions `/api` usam o mesmo projeto, com Root Directory `frontend`.
O visual, CSS, fontes, assets, Lenis e Framer Motion foram preservados.

## Rotas

| Método | Rota | Acesso |
|---|---|---|
| POST | `/api/leads` | Formulário, JSON, origem do mesmo domínio e limite persistente |
| GET | `/api/leads` | Administrador com sessão válida |
| DELETE | `/api/leads/:id` | Administrador com sessão válida e mesma origem |
| POST | `/api/auth/login` | Mesma origem, hash e limite persistente |
| POST | `/api/auth/logout` | Mesma origem; revoga sessão no servidor |
| GET | `/api/auth/me` | Sessão válida |
| GET | `/api/health` | Diagnóstico sem dados pessoais ou segredos |

## Configuração

- `ADMIN_EMAIL`: e-mail do administrador.
- `ADMIN_PASSWORD_HASH`: formato `scrypt$salt$hash`, gerado por `node scripts/create-admin-hash.cjs` em `frontend`. O utilitário solicita e confirma uma senha oculta de 16 a 256 caracteres e salva somente o hash no arquivo local ignorado `.env.admin.local` (permissão 0600).
- `SESSION_SECRET`: 32+ caracteres criptograficamente aleatórios. Use valores diferentes para Production e Preview.
- `BLOB_STORE_ID`: conexão do Blob privado de produção, exclusiva de Production.
- `PREVIEW_BLOB_STORE_ID`: conexão de outro Blob privado, exclusiva de Preview.
- OIDC é fornecido pela Vercel. Não é necessário distribuir token permanente de leitura e escrita. Para desenvolvimento isolado, `BLOB_READ_WRITE_TOKEN` é um fallback opcional.

Após mudar variáveis, é necessário novo deploy. `/api/health` testa uma leitura real e só retorna 200 quando storage e configuração de admin estão presentes; envio e persistência também precisam ser testados de ponta a ponta.

## Persistência e concorrência

Cada lead é um JSON privado independente, com UUID e confirmação de leitura antes de retornar 201. Não existe banco em `/tmp` ou memória. As listagens percorrem todas as páginas do Blob e ordenam por data decrescente. Preview não recebe credenciais do Blob de produção.

Os limites usam contadores persistentes por IP pseudonimizado, com ETag e escrita condicional atômica; não dependem de memória local das Functions. Máximos: 5 tentativas de login em 15 minutos e 8 envios por IP em 1 hora. Conflitos simultâneos são bloqueados com 429 e Retry-After. Falhas no storage retornam 503. Sessões expiram em 12 horas; logout remove a sessão no servidor. Alterar a senha invalida sessões existentes. Cookies: HttpOnly, Secure, SameSite=Strict, Path=/api.

O Blob atende a captação atual sem sobrescrever uma lista compartilhada. Cada listagem precisa ler os objetos dos contatos; buscas complexas, grandes volumes, múltiplos administradores ou relatórios frequentes justificam evoluir para Postgres gerenciado. Custos e limites do plano Blob devem ser acompanhados. Sessões expiradas e contadores antigos permanecem privados e exigem rotina de retenção antes de operações em grande escala. Dados antigos do MongoDB não são importados automaticamente; a API antiga e suas credenciais não são utilizadas.

## Frontend e privacidade

O formulário verifica `ok` e `id` antes de exibir sucesso, preserva os dados quando há erro e oferece o WhatsApp existente. São capturados somente o caminho de origem e os parâmetros UTM conhecidos. O painel exporta CSV com proteção contra fórmulas, trata falhas de exclusão/logout e informa expiração da sessão. Os scripts de telemetria do ambiente Emergent foram removidos do HTML publicado para não executar dentro do painel com dados de contatos.

Todo o ambiente Vercel permanece com cabeçalho `X-Robots-Tag: noindex, nofollow`; o domínio `insales.com.br` e o DNS não são alterados. A liberação futura de indexação deve ser feita em uma mudança específica, após aprovação do domínio.

## Validação

- `yarn test:api`: testes de persistência, indisponibilidade, validação, acesso anônimo, limites distribuídos, concorrência, sessão, revogação, exclusão, paginação e health.
- `yarn build`: React/CRACO e geração das páginas com metadados.
- Testes com storage real e navegador são uma etapa separada e devem ser registrados no relatório da entrega; testes unitários usam um adaptador simulado, sem credenciais reais.
- A integração na `main` depende de preview, autenticação e persistência reais validados. Não considerar a migração publicada apenas porque o build passou.
