# INSALES — tema WordPress instalável (React completo)

Este diretório produz o **ZIP do tema WordPress**, não apenas código-fonte Git.
A execução automática está no menu **Actions > Gerar tema WordPress instalavel INSALES**.

## Arquivo que o desenvolvedor precisa
Após o workflow concluir com ✅ `success`, abra o run em Actions e baixe o artifact
`INSALES-TEMA-WORDPRESS-PRONTO`. Descompacte o artifact UMA vez para
encontrar **INSALES_TEMA_WORDPRESS_INSTALAVEL.zip**.

No WordPress de homologação: **Aparência > Temas > Adicionar novo > Enviar tema**
e selecione esse ZIP **interno**. Não envie o ZIP de código do GitHub nem a
pasta isolada `frontend/`.

## O que inclui
- Tema WordPress com `style.css`, `functions.php`, `index.php`
- Build completo do React + Framer Motion, Lenis, Tailwind, imagens, animações e fontes
- Conteúdos e HTMLs pré-renderizados de 26 URLs (13 serviços + 6 blogs)
- Versões PT, ES e EN-US, navegação Soluções, Método PRIMA e formulários
- Rotas, CSS e JS reunidos em `dist/`

**Limitação real:** o WordPress hospeda o React dentro do tema. Os textos e seções
não são blocos editáveis no Gutenberg/Elementor. Para essa edição nativa,
seria necessário reconstruir o site como tema WordPress com templates PHP/blocos.

## Operação segura
1. Backup completo do WP atual (arquivos, banco, anexos, plugins, redirecionamentos).
2. Criar staging protegido e validar PHP 8.1+ / WP 6+ / SSL.
3. Instalar ZIP do tema. Ativar apenas no staging.
4. Salvar novamente em **Configurações > Links permanentes**, para carregar as 26 rotas.
5. Validar todas as URLs de `dist/routes.json`, imagens, vídeos, animações,
   comportamento dos cards, menus, bandeiras, mapa e formulário antes do WhatsApp.
6. Conferir JS/CSS/imagens em `/static/` e `/img/`, sem erros 404 no Console.
7. Confirmar home + /metodologia + /consultoria-estrategica + /quem-somos +
   /servicos/seo + /blog + /fale-conosco + /sitemap.xml + /wp-admin.
8. Registrar URLs do WP antigo e criar redirecionamentos 301 quando necessários.
9. Configurar GA4, GTM, pixels e Search Console **sem duplicidade**.
10. Aprovar antes de ativar no WordPress de produção. Testar rollback.

## SEO / noindex
O tema bloqueia indexação por padrão enquanto não aprovado.
Em produção, **após validação e autorização**, configurar no `wp-config.php`:

```php
define('INSALES_ALLOW_INDEX', true);
```

Em Configurações > Leitura, desabilitar 'Desencorajar mecanismos de busca'.
Revisar respostas HTTP, cabeçalhos robots, canonical, sitemap e possíveis
tags duplicadas inseridas por plugins SEO. Não liberar indexação em staging.

## Formulário / backend
O fluxo atual envia os campos preenchidos ao WhatsApp **somente se a pessoa
confirmar o envio**. O site **não grava leads no WordPress**, banco ou CRM.
Não publicar textos que afirmem persistência até implementar e testar o backend.

## Git e fonte
- Repositório: https://github.com/matheuswibix-boop/app
- Fonte incluída no tema: `frontend/`
- Gerador: `wordpress-theme/scripts/build_wordpress_theme.py`
- Workflow: `.github/workflows/build-wordpress-theme.yml`

## Troubleshooting
- Se WordPress disser 'O tema não possui style.css': enviou o ZIP errado.
  Descompacte o artifact e envie o ZIP interno do tema.
- Se aparecer 'build ausente': o ZIP não veio de um run concluído com sucesso.
- Se páginas derem 404 após ativar: salvar links permanentes e verificar regras
  de rewrite Apache/Nginx e conflitos com páginas/plugins antigos.
- Se o hosting bloquear upload por tamanho: aumentar limite de upload WordPress/PHP,
  ou instalar com SFTP em `wp-content/themes/insales-react`.
- Se quiser arrastar e soltar texto no editor de blocos: **não é suportado**
  por esse tema React; contratar conversão nativa para WordPress.

**Nunca substitua o site antigo antes de homologar as 26 rotas e possuir rollback.**
