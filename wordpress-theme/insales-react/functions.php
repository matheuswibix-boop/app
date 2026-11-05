<?php
/**
 * INSALES React Host - serve the compiled CRA site with WordPress routing.
 * Version: 1.0.0
 * The theme requires the dist/ directory created by the GitHub Actions builder.
 */
if (!defined('ABSPATH')) { exit; }

// Backend privado Pipedrive — carregado somente após o WordPress inicializar.
require_once __DIR__ . '/includes/pipedrive-lead.php';

function insales_theme_dist($path='') {
    return trailingslashit(get_stylesheet_directory()) . 'dist/' . ltrim((string)$path,'/');
}
function insales_theme_routes() {
    static $routes=null;
    if ($routes!==null) return $routes;
    $data=insales_theme_dist('routes.json');
    $parsed=is_readable($data) ? json_decode(file_get_contents($data),true) : array();
    $routes=is_array($parsed) ? array_values(array_filter($parsed,'is_string')) : array();
    return $routes;
}
function insales_theme_path() {
    $request=isset($_SERVER['REQUEST_URI']) ? (string)$_SERVER['REQUEST_URI'] : '/';
    $path=wp_parse_url($request,PHP_URL_PATH);
    $path=is_string($path) ? rawurldecode($path) : '/';
    return '/'.trim($path,'/');
}
function insales_theme_is_page() {
    return in_array(insales_theme_path(),insales_theme_routes(),true);
}
function insales_theme_indexable() {
    return defined('INSALES_ALLOW_INDEX') && INSALES_ALLOW_INDEX===true && (int)get_option('blog_public',0)===1;
}
add_filter('query_vars',function($vars) {
    $vars[]='insales_react_page'; $vars[]='insales_react_asset'; $vars[]='insales_react_sitemap';
    return $vars;
});
add_action('init',function(){
    foreach (insales_theme_routes() as $route) {
        if($route==='/') continue;
        $path=trim($route,'/');
        if (!preg_match('~^[a-zA-Z0-9/_-]+$~',$path)) continue;
        add_rewrite_rule('^'.preg_quote($path,'~').'/?$','index.php?insales_react_page=1','top');
    }
    add_rewrite_rule('^sitemap\\.xml$','index.php?insales_react_sitemap=1','top');
    add_rewrite_rule('^(img/.+|static/.+|favicon\\.svg|manifest\\.json|asset-manifest\\.json)$','index.php?insales_react_asset=$matches[1]','top');
},5);
add_action('after_switch_theme',function(){flush_rewrite_rules();});
add_filter('redirect_canonical',function($redirect){return insales_theme_is_page()?false:$redirect;},10,1);
function insales_theme_send_asset($path) {
    $path=ltrim((string)$path,'/');
    if ($path==='' || strpos($path,'..')!==false || strpos($path,'\\')!==false) {status_header(400);exit;}
    $base=realpath(insales_theme_dist()); $real=realpath(insales_theme_dist($path));
    if (!$base || !$real || !is_file($real) || strpos($real,$base.DIRECTORY_SEPARATOR)!==0) {status_header(404);exit;}
    $types=array(
      'js'=>'application/javascript; charset=UTF-8','css'=>'text/css; charset=UTF-8',
      'json'=>'application/json; charset=UTF-8','png'=>'image/png','jpg'=>'image/jpeg',
      'jpeg'=>'image/jpeg','gif'=>'image/gif','webp'=>'image/webp',
      'svg'=>'image/svg+xml','ico'=>'image/x-icon','woff'=>'font/woff',
      'woff2'=>'font/woff2','ttf'=>'font/ttf','txt'=>'text/plain; charset=UTF-8',
      'xml'=>'application/xml; charset=UTF-8','map'=>'application/json; charset=UTF-8'
    );
    $extension=strtolower(pathinfo($real,PATHINFO_EXTENSION));
    header('Content-Type: '.(isset($types[$extension])?$types[$extension]:'application/octet-stream'));
    header('Cache-Control: public,max-age=604800');
    header('X-Content-Type-Options: nosniff');
    readfile($real);exit;
}
add_action('template_redirect',function(){
    if (get_query_var('insales_react_asset')!=='') insales_theme_send_asset(get_query_var('insales_react_asset'));
    if (get_query_var('insales_react_sitemap')!=='') {
        $file=insales_theme_dist('sitemap.xml');
        if (!is_readable($file)){status_header(404);exit;}
        header('Content-Type: application/xml; charset=UTF-8');
        readfile($file);exit;
    }
    if (insales_theme_path()==='/admin') {status_header(404);exit;}
    if (insales_theme_is_page()&&!insales_theme_indexable()) {
        header('X-Robots-Tag: noindex, nofollow');
    }
},1);
add_filter('template_include',function($template){
    return insales_theme_is_page() ? get_stylesheet_directory().'/index.php' : $template;
},100);
add_filter('robots_txt',function($result,$public){
    if (!insales_theme_indexable()) return "User-agent: *\nDisallow: /\n";
    return "User-agent: *\nDisallow: /wp-admin/\nDisallow: /admin\nAllow: /wp-admin/admin-ajax.php\nSitemap: ".home_url('/sitemap.xml')."\n";
},100,2);
// Do not enable indexation until production URL, canonical, 301 redirects and staging have been validated.
