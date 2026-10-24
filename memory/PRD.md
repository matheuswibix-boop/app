# PRD — Site INSALES

## Original problem statement
"CRIE UM SITE COMPLETO PARA MINHA AGÊNCIA, DADOS DE CONTATO: (41) 99661-7279 contato@insales.com.br Rua Urbano Lopes, 277 - instagram.com/insalesmkt" (+ mockup, pack de logos/imagens e Guia do Designer INSALES).
Respostas: endereço R. Urbâno Lopes, 277 B - Cristo Rei, Curitiba - PR, 80050-520; formulário que salva contato + WhatsApp; blog com artigos fixos; sem campo de newsletter.

## Architecture
- React (CRA) + framer-motion + lenis; fontes self-hosted (Archivo wide, Manrope, JetBrains Mono)
- FastAPI + MongoDB: POST /api/leads (público), GET/DELETE /api/leads (admin JWT cookie), /api/auth/login|logout|me
- Admin seed via env ADMIN_EMAIL/ADMIN_PASSWORD; brute-force lockout

## Personas
- Empresário buscando crescer vendas (visitante) · Equipe INSALES (admin de leads)

## Implemented (2026-10-24)
- Home: hero com reveal mascarado + parallax/tilt 3D (foto sede GGV), manifesto com scroll-highlight, marquee editorial, bento de 6 serviços, Método PRIMA (5 passos, linha animada), faixa de resultados, toggle Marketing quebrado vs integrado, 4 cases (Madeleste, Primee, Technocoat, Speedo), marquee de logos de clientes, Grupo GGV + selos + 4 empresas + sócios, prévia do blog, contato (form + WhatsApp + dados), footer
- /blog e /blog/:slug (3 artigos fixos), /admin (login, lista de leads, excluir, exportar CSV), botão WhatsApp flutuante, favicon SVG

## Backlog
- P1: Páginas de Política de Privacidade/Termos; nomes e bios dos sócios; aprovação dos depoimentos e logos de clientes
- P1: Notificação por e-mail/WhatsApp a cada novo lead
- P2: Blog editável pelo painel; SEO (sitemap, OG image); páginas individuais por serviço
