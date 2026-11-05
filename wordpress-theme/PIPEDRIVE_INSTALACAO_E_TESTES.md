# INSALES — integração Pipedrive implementada no código (para o WordPress)

**Não é apenas um prompt:** este pacote compila o React atualizado e inclui o endpoint PHP do WordPress que efetua as chamadas à API v2 do Pipedrive.

## Fluxo já codificado

1. O formulário `/fale-conosco` coleta nome, telefone, e-mail, empresa, faturamento, interesse e desafio.
2. UTMs (`source`, `medium`, `campaign`, `term`, `content`) são guardadas por sessão desde a primeira visita e seguem para a API.
3. O visitante aceita o texto de tratamento de dados.
4. O JavaScript executa `POST /wp-json/insales/v1/lead` no **mesmo domínio WordPress**.
5. O PHP valida a submissão, consulta os nove campos personalizados e valida a etapa 44 no funil 8.
6. O backend localiza ou cria Organização, localiza ou cria Pessoa e cria Negócio Pipedrive.
7. O negócio recebe `owner_id=15076190`, `pipeline_id=8`, `stage_id=44`, `status=open` e `custom_fields` conforme IDs fornecidos.
8. Somente após resposta com `success:true` e `deal_id` o usuário segue ao WhatsApp.
9. Falha da API preserva o formulário, exibe erro e **não afirma cadastro**.

## Como instalar

O desenvolvedor deverá baixar o **ZIP do tema WordPress recompilado** gerado pelo GitHub Actions, com o nome `INSALES_TEMA_WORDPRESS_INSTALAVEL.zip`, e instalar pela área Aparência → Temas da instalação de homologação WordPress. O endpoint PHP está dentro do tema e é carregado por `functions.php`.

O código React precisa ser **recompilado**: não basta editar os arquivos `.jsx` em um tema já instalado, porque o WordPress serve os bundles em `dist/static`.

## Credencial no servidor — OBRIGATÓRIA

A credencial antiga foi compartilhada em uma conversa; **revogue e gere uma nova**. A nova chave **não deve ser inserida no GitHub, no JavaScript nem dentro do ZIP**.

Configurar no servidor uma variável de ambiente `PIPEDRIVE_API_TOKEN`. Alternativamente, em `wp-config.php` **fora do controle de versão** e antes de `wp-settings.php`, adicionar:

```php
define('INSALES_PIPEDRIVE_API_TOKEN', getenv('PIPEDRIVE_API_TOKEN'));
```

Se o provedor não disponibilizar variável de ambiente à aplicação PHP, o administrador poderá usar uma constante protegida diretamente em `wp-config.php`. Nunca enviar o valor em prints, tickets, e-mails abertos ou commits.

## Campos personalizados do Negócio

| Dado | Chave |
| --- | --- |
| utm_source | `922afdd28a4dd1dd392b7124704ae06c60852c2a` |
| utm_medium | `e9313761b4437915eedc3dfed2f3f783ff394859` |
| utm_campaign | `a24c06e2e665e3377c4b26ac41bd3e6273790ba5` |
| utm_term | `c64e891fb7b4a1a1c06c2834c1b830fc663dbd75` |
| utm_content | `8190f7914c853815ff97850eaf91f4329a8ed38c` |
| desafio | `0880a965044c79a758dc2ae4ecad3642bcf7de32` |
| empresa | `1a8d2a3510c33c9a208574a51da63ac4729d6dbe` |
| faturamento | `f6c067dd82e2dd2664f36b568954bb1b46b3bb51` |
| interesse | `7cc1f7e360e46906f2b85cd698a2bd2651a4978a` |

## Campos de seleção — conferir antes de publicar

O backend consulta `GET /api/v2/dealFields/{field_code}` e, nos campos `enum` ou `set`, converte a resposta do formulário para **IDs de opções**, e não para texto livre.

**Se o texto de uma opção não coincidir** com o cadastro do Pipedrive, o endpoint retorna `custom_field_option_not_mapped` (HTTP 422) **antes de criar Pessoa e Negócio**. O desenvolvedor deve conferir as opções da conta e, caso necessário, configurar em `wp-config.php`:

```php
define('INSALES_PIPEDRIVE_OPTION_MAP', array(
    'f6c067dd82e2dd2664f36b568954bb1b46b3bb51' => array(
        // 'Até R$ 50 mil/mês' => 1234, // substituir pelo ID verdadeiro do Pipedrive
    ),
    '7cc1f7e360e46906f2b85cd698a2bd2651a4978a' => array(
        // 'Tráfego Pago' => 5678, // substituir pelo ID verdadeiro do Pipedrive
    ),
));
```

Nunca inventar IDs de opções ou converter faturamento mensal em valor do negócio.

## Segurança

- Sem chave de API no navegador.
- HTTPS e mesma origem para o endpoint WordPress.
- Captcha/honeypot simplificado e limite por IP: 12 tentativas em 10 minutos.
- Controle de idempotência pelo UUID de submissão no banco WordPress.
- Se a criação remota do negócio tiver resultado desconhecido por timeout, a submissão fica bloqueada para **revisão manual**, evitando a segunda criação cega.
- É necessário revisar a política de privacidade, o aviso de tratamento de dados e o consentimento de cookies na hospedagem.

## Testes em homologação com credencial nova

1. Validar PHP 8.1+, WordPress 6+, permalinks e rota `/wp-json/insales/v1/lead`.
2. Testar com campos de seleção corretamente mapeados.
3. Confirmar Pessoa e Negócio real no Pipedrive, atribuição ao usuário 15076190, funil 8 e etapa 44.
4. Confirmar preenchimento dos 9 campos customizados (quando não vazios).
5. Testar com e sem UTMs, incluindo navegação intermediária.
6. Reenviar o **mesmo** `submission_id` e verificar que nenhum novo Negócio foi criado.
7. Conferir mensagens de erro e não abrir WhatsApp caso o Pipedrive falhe.
8. Testar desktop e celular em português, espanhol e inglês.
9. Confirmar que o site Vercel só recebe essa integração quando existir um endpoint compatível; esta entrega é **para a versão WordPress**.

## Pontos ainda pendentes da hospedagem

- Configurar a nova chave privada no servidor WordPress.
- Conferir tipos/IDs das opções de faturamento e interesse.
- Executar teste real contra a conta Pipedrive, incluindo remoção do registro de teste se apropriado.
- Garantir acesso aos endpoints REST, inclusive quando plugins de segurança/caches estão ativos.
- Fazer backup do WordPress antigo e implantar primeiro em homologação.
- Não remover painel de consentimento de cookies sem revisar pixels/analytics e base legal.
