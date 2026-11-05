#!/usr/bin/env python3
"""Package a fully compiled INSALES React app as an installable WP theme ZIP."""
from pathlib import Path
import json, sys, shutil, zipfile, hashlib
repo = Path(__file__).resolve().parents[2]
template = repo / 'wordpress-theme' / 'insales-react'
build = repo / 'frontend' / 'build'
out = repo / 'wordpress-theme' / 'output' / 'INSALES_TEMA_WORDPRESS_INSTALAVEL.zip'
services = ['branding','meta-ads','social-media','seo','ecommerce','google-ads',
            'sites-institucionais','materiais-de-venda','videos','geo',
            'trafego-pago','ia-atendimento','crm-automacao-comercial']
articles = ['o-que-e-data-marketing','pago-e-organico-motor-de-vendas','ia-no-funil-comercial',
            'diagnostico-estrategico-marketing-antes-de-anunciar',
            'metodo-prima-rastreio-do-clique-a-venda','crm-conversao-ticket-medio-marketing-vendas']
routes = ['/','/servicos','/metodologia','/consultoria-estrategica','/quem-somos',
          '/fale-conosco','/blog'] + ['/servicos/'+s for s in services] + ['/blog/'+a for a in articles]
errors=[]
for route in routes:
    target=build/('index.html' if route=='/' else route.strip('/')+'/index.html')
    if not target.is_file(): errors.append(str(target))
for required in ['static','img','sitemap.xml','favicon.svg']:
    if not (build/required).exists():errors.append(str(build/required))
if not list((build/'static').rglob('*.js')) or not list((build/'static').rglob('*.css')):
    errors.append('Compiled JavaScript or CSS bundle')
if not list((build/'img').rglob('*.webp')):
    errors.append('Original image assets')
if not template.joinpath('index.php').is_file() or not template.joinpath('style.css').is_file():
    errors.append('WordPress theme PHP/CSS')
if errors:
    print('INVALID BUILD: '+', '.join(errors),file=sys.stderr);sys.exit(1)
html=(build/'index.html').read_text(encoding='utf-8')
if 'id="root"' not in html or '%PUBLIC_URL%' in html:
    print('INVALID REACT HTML SHELL',file=sys.stderr);sys.exit(1)
staging=repo/'wordpress-theme'/'output'/'_staging'
if staging.exists():shutil.rmtree(staging)
theme=staging/'insales-react'
shutil.copytree(template,theme)
shutil.copytree(build,theme/'dist')
(theme/'dist'/'routes.json').write_text(json.dumps(routes,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
out.parent.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=7) as z:
    for file in sorted(theme.rglob('*')):
        if file.is_file(): z.write(file,str(file.relative_to(staging)).replace('\\','/'))
with zipfile.ZipFile(out) as z:
    for f in ['insales-react/style.css','insales-react/functions.php',
              'insales-react/index.php','insales-react/dist/routes.json',
              'insales-react/dist/index.html']:
        if f not in z.namelist(): raise ValueError('Missing '+f)
checksum=hashlib.sha256(out.read_bytes()).hexdigest()
print('SUCCESS: '+str(out))
print('Size (bytes): '+str(out.stat().st_size))
print('SHA-256: '+checksum)
print('Validated routes: '+str(len(routes)))
shutil.rmtree(staging)
