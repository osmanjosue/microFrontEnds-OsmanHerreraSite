# Configuración de Nginx para Osman Herrera Site (Astro SSG)

Este documento contiene la configuración propuesta para el servidor web Nginx en producción tras la migración de la arquitectura de microfrontends (Angular + React + Vanilla JS) a un sitio unificado con **Astro SSG**.

> **Nota importante:** Este documento es una especificación y guía técnica para el despliegue en el VPS. No se debe modificar la configuración en caliente del servidor sin previa validación.

---

## 1. Resumen de Cambios Arquitecturales

| Aspecto | Antes (Microfrontends) | Ahora (Astro SSG) |
|---|---|---|
| **Página Principal (Home)** | React SPA servido en `/react/` con proxy inverso | HTML estático: inglés en `/` (idioma por defecto) y español en `/es/`; el viejo `/en/...` redirige 301 a la raíz |
| **Sitio Angular** | Aplicación legado en `/angular/` | Redirigido permanentemente (301) a `/` |
| **Vector Work** | SPA Vanilla en `/vectorwork/` | Páginas estáticas `/vectorwork/` (inglés) y `/es/vectorwork/` (español) con visor interactivo hidratado en cliente |
| **CV** | — | `/cv/` y `/es/cv/` con `<meta name="robots" content="noindex">` (no se indexan; el teléfono no llega a buscadores) |
| **Política de Privacidad** | `/react/politicadeprivacidad` | `/privacy-policy/` y `/es/politicadeprivacidad/`; `/politicadeprivacidad` redirige 301 a la versión en español |
| **API de Correo** | Proxy inverso hacia Express en `:3000` | Mismo proxy inverso en `/api/` sin modificaciones |
| **Manejo de 404** | Fallback genérico de SPA | Página 404 estática bilingüe (`/404.html`) generada desde `src/pages/404.astro` |

---

## 2. Bloque de Configuración Nginx (`/etc/nginx/sites-available/osmanherrera-site`)

Es la configuración real en producción (Nginx 1.24, sin `http2` para no afectar a los otros sitios del mismo puerto). La copia editable está en `docs/osmanherrera-site.nginx.conf` (fuera de git).

```nginx
server {
    server_name osmanherrera.dev www.osmanherrera.dev;
    charset utf-8;

    root /var/www/osmanherrera-site/osmanHerreraSiteAstro/dist;
    index index.html;

    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript image/svg+xml;

    # --- 1. Rutas viejas (Angular / React) -> sitio nuevo ---
    location ~ ^/react/politicadeprivacidad/?$ { return 301 /es/politicadeprivacidad/; }
    location /react/   { return 301 /; }
    location = /react  { return 301 /; }
    location /angular/ { return 301 /; }
    location = /angular { return 301 /; }

    # --- 2. Ingles por defecto: el viejo /en/... pasa a la raiz ---
    location = /en   { return 301 /; }
    location = /en/privacy-policy { return 301 /privacy-policy/; }
    location ^~ /en/ { rewrite ^/en/(.*)$ /$1 permanent; }
    location ~ ^/politicadeprivacidad/?$ { return 301 /es/politicadeprivacidad/; }

    # --- 3. Barra final canonica ---
    location = /vectorwork     { return 301 /vectorwork/; }
    location = /cv             { return 301 /cv/; }
    location = /privacy-policy { return 301 /privacy-policy/; }
    location = /es             { return 301 /es/; }
    location = /es/vectorwork  { return 301 /es/vectorwork/; }
    location = /es/cv          { return 301 /es/cv/; }
    location = /es/politicadeprivacidad { return 301 /es/politicadeprivacidad/; }

    # --- 4. Vector Work: artes y titulos fuera de git ---
    location /vectorwork/data/ {
        alias /var/www/vectorwork-assets/data/;
        add_header X-Robots-Tag "noindex, nofollow" always;
        add_header Cache-Control "no-cache" always;
        add_header X-Content-Type-Options "nosniff" always;
    }
    location /vectorwork/works/ {
        alias /var/www/vectorwork-assets/works/;
        add_header X-Robots-Tag "noindex" always;
        add_header Cache-Control "public, max-age=2592000" always;
        add_header X-Content-Type-Options "nosniff" always;
    }

    # --- 5. API (Express en PM2, puerto 3000) ---
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # --- 6. Assets con hash de Astro: cache larga ---
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        add_header X-Content-Type-Options "nosniff" always;
        access_log off;
    }

    # --- 7. Paginas estaticas y 404 bilingue ---
    location / {
        try_files $uri $uri/ $uri.html =404;
    }
    error_page 404 /404.html;
    location = /404.html { internal; }

    # --- Logs ---
    access_log /var/log/nginx/osmanherrera_access.log;
    error_log /var/log/nginx/osmanherrera_error.log;

    # --- SSL (Certbot, sin cambios) ---
    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/osmanherrera.dev/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/osmanherrera.dev/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = www.osmanherrera.dev) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = osmanherrera.dev) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    listen [::]:80;

    server_name osmanherrera.dev www.osmanherrera.dev;
    return 404; # managed by Certbot
}
```

---

## 3. Guía de Despliegue en el VPS

1. **Estructura de Directorios en el VPS (TODO: confirmar rutas exactas):**
   ```bash
   # Carpeta del repositorio / build
   /var/www/osmanherrera-site/osmanHerreraSiteAstro/dist/

   # Carpeta persistente de activos vectoriales protegidos
   /var/www/vectorwork-assets/
   ├── data/
   │   └── titles.json
   └── works/
       ├── pieza-01/
       ├── pieza-02/
       └── ...
   ```

   Los assets de Vector Work no están en git y el build los borra del `dist`. Se suben desde la PC local:
   ```bash
   # En la PC (origen: osmanHerreraSiteAstro/public/vectorwork/)
   scp -r osmanHerreraSiteAstro/public/vectorwork/works osmanHerreraSiteAstro/public/vectorwork/data/titles.json usuario@IP:/tmp/vw/
   # En el VPS
   sudo mkdir -p /var/www/vectorwork-assets/data
   sudo mv /tmp/vw/works /var/www/vectorwork-assets/
   sudo mv /tmp/vw/titles.json /var/www/vectorwork-assets/data/
   ```
   No subir `titles.example.json` ni los originales de `scripts/vector/source/`.

   **Build (Node ≥ 22.12, lo exige Astro 7):**
   ```bash
   git checkout main && git pull
   npm ci
   npm run build:all
   npm run start:backend   # reinicia pm2 (osmanherrera-site-backend)
   ```

2. **Permisos recomendados:**
   ```bash
   sudo chown -R www-data:www-data /var/www/osmanherrera-site/osmanHerreraSiteAstro/dist
   sudo chown -R www-data:www-data /var/www/vectorwork-assets
   sudo chmod -R 755 /var/www/osmanherrera-site/osmanHerreraSiteAstro/dist
   sudo chmod -R 755 /var/www/vectorwork-assets
   ```

3. **Verificación y Recarga de Nginx:**
   ```bash
   # Probar sintaxis sin interrumpir servicio
   sudo nginx -t

   # Recargar configuración
   sudo systemctl reload nginx
   ```
