# INSALES — formulário nativo Contact Form 7

A página usa o formulário que o Ronaldo já configurou no WordPress:

```php
echo do_shortcode('[contact-form-7 id="aac8881" title="Formulário NOVO PAGINA FALE CONOSCO"]');
```

O PHP renderiza o shortcode antes de `wp_head()`. O React exibe o mesmo elemento nativo dentro de `<div id="formulario">`, sem formulário externo, cópia de campos ou novo envio para a API do tema.

O ID `formulario` permanece como âncora no contêiner. Os identificadores, nomes de campos e atributos internos do Contact Form 7 permanecem como foram configurados pelo Ronaldo. O componente move o elemento original para preservar eventos, validação e valores ao navegar pelas páginas; não chama a inicialização do plugin novamente.

## Instalação e conferência pelo programador

1. Instalar o ZIP em uma cópia de homologação do WordPress atual, com os mesmos plugins e o formulário já cadastrado.
2. Manter o Contact Form 7 ativo e confirmar a existência do formulário `aac8881`.
3. Preservar o CSS que o Ronaldo preparou no WordPress. O novo contêiner não recria nem sobrescreve esse CSS.
4. Limpar o cache do tema/site e conferir a home e `/fale-conosco`, no celular e no computador.
5. Conferir os CTAs que levam a `#formulario` e navegar de outra página para o contato.
6. Fazer um único cadastro identificado como teste e confirmar a criação do contato e do negócio no funil novo, pelo fluxo existente do Contact Form 7.
7. Confirmar também o comportamento após envio que o Ronaldo configurou, inclusive WhatsApp caso esteja previsto no fluxo existente.

## Escopo

- Nenhuma alteração no formulário salvo no WordPress, nas credenciais ou na integração do Ronaldo.
- O arquivo anterior `includes/pipedrive-lead.php` permanece sem mudanças; o formulário desta página deixa de chamar seu endpoint.
- Sem novo redirecionamento ou automação de envio adicionado pelo React.
- Sem submissão real de dados durante os testes automatizados.
- Este pacote não foi instalado em produção; a integração real e o CSS local precisam ser conferidos no WordPress atual.

Documentação oficial: https://contactform7.com/faq/can-i-embed-a-contact-form-into-my-template-file/
