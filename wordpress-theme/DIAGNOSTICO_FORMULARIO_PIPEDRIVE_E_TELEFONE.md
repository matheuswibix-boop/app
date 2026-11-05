# INSALES — Diagnóstico do formulário Pipedrive (05/11/2026)

## Por que aparece "Não foi possível confirmar seu cadastro"?

O React faz POST `/wp-json/insales/v1/lead`. A mensagem vermelha aparece quando:
- a rota WordPress não existe (HTTP 404);
- o token não foi encontrado no PHP (HTTP 503, `integration_not_configured`);
- o token está inválido/revogado (HTTP 503, `crm_authorization_failed`);
- a opção de faturamento ou interesse não corresponde a um ID do Pipedrive (HTTP 422, `custom_field_option_not_mapped`);
- a etapa 44 não pertence ao funil 8 (HTTP 422, `wrong_pipeline_stage`);
- a API do Pipedrive responde 4xx/5xx, indisponibilidade ou timeout;
- o navegador não recebe `success:true` e `deal_id`.

### Causa concreta encontrada

A configuração sugerida pelo desenvolvedor utilizou **`INSALES_PIPEDRIVE_TOKEN`**.
O código anterior só lia **`INSALES_PIPEDRIVE_API_TOKEN`** e
`PIPEDRIVE_API_TOKEN`. **Se o servidor usar o primeiro nome, a chave não
é encontrada e retorna HTTP 503.** O novo código aceita todos esses nomes
exclusivamente no PHP (nenhum valor de token dentro do tema ou JS).

A chave anterior foi compartilhada por chat: **revogar e substituir no WordPress**.
Nunca inserir o segredo em `functions.php` de um projeto publicado no GitHub.

## Diagnóstico que o desenvolvedor deve executar

1. No navegador, abrir DevTools > Network > Fetch/XHR.
2. Preencher com dados de teste não reais e enviar uma única vez.
3. Localizar `POST /wp-json/insales/v1/lead`; anotar **status HTTP**
   e o valor `code` da aba Response.
4. Em Console, o novo JS exibe `[INSALES CRM] Submission rejected`
   com `status` e `code`; **não exibe dados pessoais ou credenciais**.
5. Não enviar screenshots da aba Headers completos nem do payload com
   e-mail/telefone; compartilhar apenas **status + code**.
6. No servidor WordPress, verificar se a constante privada ou variável de
   ambiente foi realmente carregada, sem imprimir seu valor.
7. Validar permissões, etapa 44/funil 8, IDs e opções dos campos personalizados.
8. Se for `custom_field_option_not_mapped`, consultar o Pipedrive e mapear
   em `INSALES_PIPEDRIVE_OPTION_MAP` os valores corretos de Faturamento/Interesse.
9. Se for `submission_in_progress_or_review`, antes de tentar outro cadastro
   verificar se já existe um negócio no Pipedrive; o registro pode estar
   bloqueado para evitar duplicidade por timeout.
10. Testar em homologação antes de colocar em produção.

## Máscara brasileira incluída

- Celular: `(41) 9 9999-9999`
- Fixo: `(41) 3333-4444`
- Aceita colar `+55`, remove caracteres não numéricos e valida DDD + 10/11 dígitos.
- Os números exibidos são formatados no navegador; PHP ainda valida tamanho e formato.

## Segurança

- O endpoint WordPress deve ficar no mesmo domínio do React.
- A integração continua exigindo consentimento e redireciona ao WhatsApp
  **somente após** criar o negócio com sucesso.
- Por favor, não repetir o envio de um formulário após timeout sem confirmar
  a ausência do negócio no Pipedrive.

## Testes pendentes

- Não foi possível acessar o resultado da requisição real feita no navegador
  da hospedagem; portanto este documento não confirma qual dos erros ocorreu.
- Novo tema precisa ser instalado e a chave substituída no `wp-config.php`.
- Negócio real no Pipedrive precisa ser confirmado antes de liberar em produção.
