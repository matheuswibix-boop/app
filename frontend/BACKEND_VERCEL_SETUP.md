# Backend INSALES na Vercel

Esta branch prepara as rotas /api/leads, /api/auth/login, /api/auth/logout, /api/auth/me, /api/health e DELETE /api/leads/:id no mesmo domínio do site.

O armazenamento de leads usa **Vercel Blob PRIVADO**. A API retorna **503 (fail closed)** quando não há armazenamento: não gera falso sucesso nem perde contatos silenciosamente.

## Configuração obrigatória na Vercel

1. Em Storage, crie e conecte ao projeto `estruturaseoinsales` um Vercel Blob com acesso **private**. Ele deve provisionar `BLOB_STORE_ID` e credenciais OIDC ou `BLOB_READ_WRITE_TOKEN`.
2. Em Settings → Environment Variables configure: `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` e `SESSION_SECRET` (32+ caracteres gerados com fonte criptográfica segura), nos ambientes desejados.
3. Gere a senha hash com `node scripts/create-admin-hash.cjs` na pasta `frontend`. Copie somente a linha `ADMIN_PASSWORD_HASH=...` para o painel Vercel; não grave segredos no GitHub.
4. Faça Redeploy. Em `/api/health`, verifique `storage: configured` e `admin: configured` com status HTTP 200. Antes disso, os leads não podem ser enviados ao site como se houvesse persistência.
5. Envie um contato de teste no formulário; verifique em `/admin`, exporte CSV e exclua o contato de teste.

## Segurança

- Sessão assinada HMAC, cookie HttpOnly, Secure, SameSite=Strict, expiração em 12h.
- Nenhum dado de lead é público; Blob privado só é lido pelo servidor.
- A API tem validação de entrada, controle de origem e limites de payload. **A integração com Vercel Firewall/rate limiting ainda precisa ser configurada** para proteger o login e o endpoint de contatos.
- Faça backup e defina retenção/LGPD. O MongoDB antigo não é importado automaticamente.
- Para fluxos grandes, usuários múltiplos ou consultas analíticas, considere migrar o armazenamento para um Postgres gerenciado conectado à Vercel (mantendo API e frontend na Vercel).
