# Configuración de Nginx para Osman Herrera Site (Astro SSG)

Este documento contiene la configuración propuesta para el servidor web Nginx en producción tras la migración de la arquitectura de microfrontends (Angular + React + Vanilla JS) a un sitio unificado con **Astro SSG**.

> **Nota importante:** Este documento es una especificación y guía técnica para el despliegue en el VPS. No se debe modificar la configuración en caliente del servidor sin previa validación.

---

## 1. Resumen de Cambios Arquitecturales

| Aspecto | Antes (Microfrontends) | Ahora (Astro SSG) |
|---|---|---|
| **Página Principal (Home)** | React SPA servido en `/react/` con proxy inverso | HTML estático generado en build servido en `/` y `/en/` |
| **Sitio Angular** | Aplicación legado en `/angular/` | Redirigido permanentemente (301) a `/` |
| **Vector Work** | SPA Vanilla en `/vectorwork/` | Páginas estáticas `/vectorwork/` y `/en/vectorwork/` con visor interactivo hidratado en cliente |
| **Política de Privacidad** | `/react/politicadeprivacidad` | Rutas estáticas canónicas `/politicadeprivacidad` y `/en/privacy-policy` |
| **API de Correo** | Proxy inverso hacia Express en `:3000` | Mismo proxy inverso en `/api/` sin modificaciones |
| **Manejo de 404** | Fallback genérico de SPA | Página 404 estática bilingüe (`/404.html`) generada desde `src/pages/404.astro` |

---

## 2. Bloque de Configuración Nginx (`/etc/nginx/sites-available/...`)

```nginx
# ==============================================================================
# CONFIGURACIÓN NGINX — OSMAN HERRERA SITE (ASTRO SSG + EXPRESS API)
# ==============================================================================

# Redirección HTTP a HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name osmanherrera.dev www.osmanherrera.dev;

    return 301 https://$host$request_uri;
}

# Servidor HTTPS Principal
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    # Nota para Nginx >= 1.25.1: el parámetro 'http2' en la directiva 'listen' está obsoleto.
    # En instalaciones recientes, sustituir por:
    # listen 443 ssl;
    # http2 on;

    server_name osmanherrera.dev www.osmanherrera.dev;

    # Certificados SSL (gestionados por Certbot / Let's Encrypt)
    # TODO: confirmar rutas de certificados SSL en el VPS
    ssl_certificate /etc/letsencrypt/live/osmanherrera.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/osmanherrera.dev/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Directorio raíz del sitio (dist compilado por Astro)
    # TODO: confirmar ruta base en el VPS (ej. /var/www/osmanherrera-site/osmanHerreraSiteAstro/dist)
    root /var/www/osmanherrera-site/osmanHerreraSiteAstro/dist;
    index index.html;

    # Charset y cabeceras de seguridad globales
    charset utf-8;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Compresión Gzip para optimizar transferencia
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    # --------------------------------------------------------------------------
    # 1. REDIRECCIONES DE RUTAS LEGADO (ANGULAR & REACT)
    # --------------------------------------------------------------------------
    # Redirección de política de privacidad antigua en React (con o sin barra final)
    location ~ ^/react/politicadeprivacidad/?$ {
        return 301 /politicadeprivacidad;
    }

    # Redirección de todas las subrutas de React al nuevo Home
    location /react/ {
        return 301 /;
    }
    location = /react {
        return 301 /;
    }

    # Redirección de todas las subrutas de Angular al nuevo Home
    location /angular/ {
        return 301 /;
    }
    location = /angular {
        return 301 /;
    }

    # --------------------------------------------------------------------------
    # 2. CANONICAL SLUG REDIRECTS (TRAILING SLASH PARA SUBDIRECTORIOS ASTRO)
    # --------------------------------------------------------------------------
    location = /vectorwork {
        return 301 /vectorwork/;
    }

    location = /en {
        return 301 /en/;
    }

    location = /en/vectorwork {
        return 301 /en/vectorwork/;
    }

    # --------------------------------------------------------------------------
    # 3. ASSETS PROTEGIDOS DE VECTOR WORK (ALMACENADOS FUERA DE GIT)
    # --------------------------------------------------------------------------
    # Longest prefix match asegura que /vectorwork/data/ y /vectorwork/works/
    # tengan precedencia absoluta sobre la raíz /vectorwork/
    # NOTA: Nginx NO hereda los 'add_header' del bloque 'server' en ningún 'location'
    # que defina sus propias cabeceras, por lo que se deben repetir explícitamente.

    # Títulos reales: protegidos contra indexación en buscadores y sin caché
    location /vectorwork/data/ {
        alias /var/www/vectorwork-assets/data/;
        add_header X-Robots-Tag "noindex, nofollow" always;
        add_header Cache-Control "no-cache" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    }

    # Obras e ilustraciones WebP: excluidas de Google Imágenes con caché
    # NOTA: No se usa 'immutable' porque los archivos de obras en works/ no contienen
    # hash en el nombre y deben poder actualizarse dentro de la ventana de 30 días.
    location /vectorwork/works/ {
        alias /var/www/vectorwork-assets/works/;
        add_header X-Robots-Tag "noindex" always;
        add_header Cache-Control "public, max-age=2592000" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    }

    # --------------------------------------------------------------------------
    # 4. API BACKEND (PROXY INVERSO A EXPRESS EN PM2)
    # --------------------------------------------------------------------------
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts para envío de correos
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # --------------------------------------------------------------------------
    # 5. ASSETS ESTÁTICOS Y REGLAS DE CACHÉ DE ASTRO
    # --------------------------------------------------------------------------
    # Assets inmutables con hash generados por Astro / Vite
    location ~* ^/_astro/.*\.(css|js|webp|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        access_log off;
    }

    # Favicon y robots.txt
    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        log_not_found off;
        access_log off;
        try_files $uri =404;
    }

    # --------------------------------------------------------------------------
    # 6. ENRUTAMIENTO GENERAL Y PÁGINA 404 BILINGÜE
    # --------------------------------------------------------------------------
    # Resolución de páginas estáticas: busca archivo directo, carpeta con index.html o .html
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Página de error 404 personalizada generada por Astro
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }
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
