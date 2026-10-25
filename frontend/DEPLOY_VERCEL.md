# INSALES — Vercel

Frontend: React + CRACO + Tailwind.

Configuração verificada: Root Directory `frontend`; preset Create React App; Node 22.x; Install Command `yarn install --frozen-lockfile`; Build Command `yarn build`; Output Directory `build`.

O build também executa o gerador SEO e cria HTMLs com metadados para as 13 páginas de serviços. O HTML gerado usa `noindex` intencionalmente enquanto o site estiver em fase de testes; confirme o domínio principal e a política de indexação antes de liberar SEO em produção.

As páginas visuais, CSS, Tailwind, imagens e animações existentes não devem ser modificados nesta etapa.

Formulários com backend exigem configurar `REACT_APP_BACKEND_URL` e publicar separadamente a API.
