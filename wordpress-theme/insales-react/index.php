<?php
if (!defined('ABSPATH')) {exit;}
$path=insales_theme_path();
if (!insales_theme_is_page()) {status_header(404);include get_404_template();return;}
$relative=$path==='/' ? 'index.html' : trim($path,'/').'/index.html';
$file=insales_theme_dist($relative);
if (!is_readable($file)) {status_header(503);echo 'INSALES: site build ausente. Instale o ZIP gerado pelo GitHub Actions.';return;}
$html=file_get_contents($file);
if (!is_string($html)||strpos($html,'id="root"')===false) {status_header(503);echo 'INSALES: build HTML invalido.';return;}
// Use Ronaldo's existing Contact Form 7 form and its existing CRM integration.
// Render on every React entry route so client-side navigation can reuse it.
$native_form = '';
if (shortcode_exists('contact-form-7')) {
  $native_form = do_shortcode('[contact-form-7 id="aac8881" title="Formulário NOVO PAGINA FALE CONOSCO"]');
  // CF7 registers its assets on wp_enqueue_scripts. Enqueue after registration
  // even when its global loading is disabled, before WordPress prints assets.
  add_action('wp_enqueue_scripts', function () {
    if (function_exists('wpcf7_enqueue_scripts') && !wp_script_is('contact-form-7', 'enqueued')) {
      wpcf7_enqueue_scripts();
    }
    if (function_exists('wpcf7_enqueue_styles') && !wp_style_is('contact-form-7', 'enqueued')) {
      wpcf7_enqueue_styles();
    }
  }, 99);
}
$html = str_replace('<div id="root"></div>',
  '<div id="root"></div><div id="insales-cf7-source" hidden>' . $native_form . '</div>', $html);
// Absolute /static/ and /img/ references are also handled by WordPress rewrite rules.
$base=untrailingslashit(get_stylesheet_directory_uri()).'/dist';
$html=preg_replace_callback('~(\\b(?:src|href)=["\\\'])/(static/[^"\\\']+|img/[^"\\\']+|favicon\\.svg|manifest\\.json|asset-manifest\\.json)(["\\\'])~i',
  function($m)use($base){return $m[1].esc_url($base.'/'.$m[2]).$m[3];},$html);
// The React builder emits noindex on generated HTML; remove only after approval.
if (insales_theme_indexable()) {
  $html=preg_replace('~<meta\\s+name=["\\\']robots["\\\']\\s+content=["\\\']noindex,\\s*follow["\\\']\\s*/?>~i',
    '<meta name="robots" content="index, follow" />',$html);
}
status_header(200);header('Content-Type: text/html; charset=UTF-8');
ob_start();wp_head();$head=ob_get_clean();
$html=preg_replace('~</head>~i',$head.'</head>',$html,1);
ob_start();wp_footer();$foot=ob_get_clean();
$html=preg_replace('~</body>~i',$foot.'</body>',$html,1);
echo $html; // precompiled source-controlled HTML; must be reviewed before deployment.
