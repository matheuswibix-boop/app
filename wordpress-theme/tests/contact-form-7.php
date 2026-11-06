<?php
// WordPress template smoke test; no real submission, email or CRM request.
define('ABSPATH', __DIR__);
$active = ($argv[1] ?? '') === 'active';
$shortcode_calls = [];
$asset_hook = null;
$js_enqueued = false;
$css_enqueued = false;
function insales_theme_path() { return '/fale-conosco'; }
function insales_theme_is_page() { return true; }
function insales_theme_dist($relative) { return dirname(__DIR__, 2) . '/frontend/build/' . $relative; }
function shortcode_exists($tag) { global $active; return $active && $tag === 'contact-form-7'; }
function do_shortcode($shortcode) {
  global $shortcode_calls;
  $shortcode_calls[] = $shortcode;
  return '<div class="wpcf7" id="wpcf7-f123-o1"><form><input type="hidden" name="_wpcf7" value="123"></form></div>';
}
function add_action($hook, $callback, $priority = 10) {
  global $asset_hook;
  if ($hook === 'wp_enqueue_scripts' && $priority === 99) $asset_hook = $callback;
}
function wpcf7_enqueue_scripts() { global $js_enqueued; $js_enqueued = true; }
function wpcf7_enqueue_styles() { global $css_enqueued; $css_enqueued = true; }
function wp_script_is($handle, $status) { global $js_enqueued; return $js_enqueued; }
function wp_style_is($handle, $status) { global $css_enqueued; return $css_enqueued; }
function get_stylesheet_directory_uri() { return 'https://example.test/wp-content/themes/insales-react'; }
function untrailingslashit($value) { return rtrim($value, '/'); }
function esc_url($url) { return $url; }
function insales_theme_indexable() { return false; }
function status_header($status) { if ($status !== 200) throw new RuntimeException('Unexpected status: '.$status); }
function wp_head() { global $asset_hook; if ($asset_hook) $asset_hook(); }
function wp_footer() {}
ob_start();
require dirname(__DIR__) . '/insales-react/index.php';
$html = ob_get_clean();
if (substr_count($html, 'id="root"') !== 1 || substr_count($html, 'id="insales-cf7-source"') !== 1) {
  throw new RuntimeException('Missing or duplicated React root / native source');
}
$expected = '[contact-form-7 id="aac8881" title="Formulário NOVO PAGINA FALE CONOSCO"]';
if ($active) {
  if ($shortcode_calls !== [$expected] || substr_count($html, 'class="wpcf7"') !== 1) {
    throw new RuntimeException('Wrong shortcode or duplicated native form');
  }
  if (!$js_enqueued || !$css_enqueued) throw new RuntimeException('Missing CF7 assets');
} elseif ($shortcode_calls !== [] || strpos($html, 'class="wpcf7"') !== false) {
  throw new RuntimeException('Plugin unavailable must not render a fake form');
}
echo "PASS: native CF7 template ($argv[1])\n";
