# BHC | Broker Hipotecario Castellón — Spec de diseño

**Fecha:** 2026-05-11
**Cliente:** BHC | Broker Hipotecario Castellón
**Working directory:** `C:\Users\mgarc\Desktop\PROYECTO INMOBILIARIA`

---

## 1. Resumen ejecutivo

Sitio web de **14 páginas indexables + 3 legales + admin** para BHC, un broker hipotecario que lanza desde cero en Castellón de la Plana. Foco dual: **SEO transaccional orgánico** + **SEO local en Google Maps** para Castellón ciudad y cinturón (Vila-real, Almassora, Benicàssim, Borriol).

**Mecanismo de conversión:** formulario corto (Formspree) + WhatsApp como CTA principal + teléfono fijo. Sin simulador ni agenda online en v1.

**Posicionamiento:** "no trabajamos para los bancos, trabajamos para ti". Estudio gratuito sin compromiso.

**Stack:**
- Astro 5 + Tailwind CSS 4
- Decap CMS (admin `/admin`)
- Formspree (forms)
- Vercel (hosting + CI/CD)
- GitHub (repo)
- Sin tracking ni cookies — sin banner de consentimiento
- Mapa estático (imagen) + botón "Abrir en Google Maps" en lugar de embed dinámico

**Coste mensual recurrente:** 0 €. Coste anual: ~12 € (renovación dominio `brokerhipotecariocastellon.es`).

**Idioma:** castellano único. Sin i18n en código.

**Equipo presentado como:** institucional/anónimo en v1, con secciones de equipo preparadas pero ocultas para activación futura.

**Timeline:** 1 semana de implementación.

---

## 2. Arquitectura de información

### 2.1 Sitemap

```
brokerhipotecariocastellon.es/
│
├─ /                                           HOME
│
├─ /servicios/                                 índice
│   ├─ /servicios/hipoteca-primera-vivienda
│   ├─ /servicios/hipoteca-segunda-vivienda
│   ├─ /servicios/subrogacion-hipotecaria       (cubre cambio de banco + refinanciación)
│   ├─ /servicios/maxima-financiacion
│   ├─ /servicios/hipoteca-no-residentes
│   ├─ /servicios/hipoteca-autonomos
│   └─ /servicios/hipoteca-joven
│
├─ /broker-hipotecario/                        índice
│   ├─ /broker-hipotecario/vila-real
│   ├─ /broker-hipotecario/almassora
│   ├─ /broker-hipotecario/benicassim
│   └─ /broker-hipotecario/borriol
│
├─ /sobre-bhc
├─ /contacto
│
├─ /blog/
│   ├─ /blog/[slug]
│   └─ /blog/categoria/[slug]
│
├─ /aviso-legal                                noindex
├─ /politica-privacidad                        noindex
├─ /politica-cookies                           noindex
│
└─ /admin                                      noindex + robots disallow
```

### 2.2 Mapa de keywords (1 primaria por página, anti-canibalización)

| Página | Keyword primaria | Intención |
|---|---|---|
| `/` | broker hipotecario Castellón | transaccional local |
| `/servicios/hipoteca-primera-vivienda` | hipoteca primera vivienda Castellón | transaccional |
| `/servicios/hipoteca-segunda-vivienda` | hipoteca segunda vivienda Castellón | transaccional |
| `/servicios/subrogacion-hipotecaria` | subrogación hipoteca Castellón | transaccional |
| `/servicios/maxima-financiacion` | hipoteca 100 financiación Castellón | transaccional |
| `/servicios/hipoteca-no-residentes` | hipoteca no residentes Castellón | transaccional |
| `/servicios/hipoteca-autonomos` | hipoteca autónomos Castellón | transaccional |
| `/servicios/hipoteca-joven` | hipoteca joven Castellón | transaccional |
| `/broker-hipotecario/vila-real` | broker hipotecario Vila-real | local |
| `/broker-hipotecario/almassora` | broker hipotecario Almassora | local |
| `/broker-hipotecario/benicassim` | broker hipotecario Benicàssim | local |
| `/broker-hipotecario/borriol` | broker hipotecario Borriol | local |
| `/sobre-bhc` | (sin target) | navegacional |
| `/contacto` | (sin target) | navegacional |
| Blog posts | informacionales SIN "Castellón" | informacional |

### 2.3 Reglas anti-canibalización

1. **Una sola keyword primaria por página.** Aparece en: `<title>`, `<h1>`, primer párrafo, slug URL, alt de imagen hero.
2. **Página de Castellón ciudad = home.** No existe `/broker-hipotecario/castellon-de-la-plana` para evitar duplicación.
3. **Páginas de localidad con contenido único** — datos demográficos, precio €/m² local, distancia desde oficina, referencias del lugar.
4. **Blog evita el sufijo "Castellón" en keywords informacionales** para no competir con servicios.
5. **Canonical explícita** en cada página vía `<link rel="canonical">`.
6. **Internal linking jerárquico:**
   - Home → servicios (anchor con keyword secundaria) + ubicaciones
   - Servicios → home (anchor "broker hipotecario Castellón", 1 vez) + servicios relacionados
   - Ubicaciones → servicios específicos + home
   - Blog → servicio relevante con anchor descriptivo
7. **Páginas legales y `/admin`** con `noindex` para no competir.

### 2.4 Navegación

**Header desktop (sticky con blur):**
```
[BHC logo] | Inicio · Servicios ▼ · Dónde estamos ▼ · Sobre BHC · Blog · Contacto | [WhatsApp ↗]
```

**Header móvil:** hamburguesa con árbol completo + WhatsApp sticky bottom.

**Dropdowns:**
- *Servicios ▼* → 7 servicios
- *Dónde estamos ▼* → Castellón ciudad (→ home) + 4 localidades

**Footer global (5 bloques):**
1. NAP completo: BHC | Broker Hipotecario Castellón, C. Egual 34 · 12002 Castellón de la Plana, 864 87 21 86, info@brokerhipotecariocastellon.es, horario
2. Enlaces a 7 servicios
3. Enlaces a 4 localidades
4. Aviso legal · Privacidad · Cookies + **Nº registro Ley 5/2019** (pendiente datos cliente)
5. © año dinámico

---

## 3. Design system

### 3.1 Paleta

```css
--color-primary-50:  #eff6ff;   /* fondos suaves */
--color-primary-100: #dbeafe;   /* tags */
--color-primary-500: #3b82f6;   /* links secundarios */
--color-primary-600: #2563eb;   /* CTA primario */
--color-primary-700: #1d4ed8;   /* hover CTA */
--color-primary-900: #1e3a8a;   /* hero dark variants */

--color-accent-amber: #f59e0b;  /* badges urgencia */
--color-success:     #10b981;
--color-whatsapp:    #25D366;   /* color oficial WhatsApp */
--color-whatsapp-dk: #128C7E;   /* hover */

--color-text-base:   #0f172a;
--color-text-muted:  #475569;
--color-text-soft:   #94a3b8;
--color-border:      #e2e8f0;
--color-bg-soft:     #f8fafc;
--color-bg-dark:     #0a1929;
```

### 3.2 Tipografía

- **Familia única:** Manrope, pesos **400, 500, 600, 700** (4 archivos WOFF2), **self-hosted** en `/public/fonts/` (sin Google Fonts CDN → sin cookies). Sin italic (no se usa en fintech).
- **Mono opcional (números destacados):** stack del sistema (`ui-monospace, SFMono-Regular, Menlo, monospace`) para evitar fuente extra.
- Preload solo del 400 y el 700 en `<head>` (resto se cargan on-demand).

Escala fluida con `clamp()`:
```
h1: clamp(2rem, 5vw, 3.5rem) / 700 / 1.1
h2: clamp(1.5rem, 3vw, 2.5rem) / 700 / 1.2
h3: clamp(1.25rem, 2vw, 1.75rem) / 600 / 1.3
h4: 1.125rem / 600
body: 1rem / 400 / 1.6
small: 0.875rem
caption: 0.75rem / 500
```

### 3.3 Layout

- Container: `max-w-7xl` (1280px), padding-x responsive
- Grid: 12 cols desktop / 4 tablet / 1 mobile
- Vertical rhythm de sección: `py-16 md:py-24 lg:py-32`
- Border-radius: 6px (botones/inputs) / 12px (cards) / 20px (hero panels)
- Sombras:
  - `shadow-sm` (hover cards)
  - `shadow-md` (dropdowns nav)
  - `shadow-card`: `0 4px 24px rgba(15, 23, 42, 0.06)`

### 3.4 Componentes (`src/components/`)

| Componente | Variants / detalles |
|---|---|
| `Button` | primary, secondary, whatsapp, ghost, link |
| `Hero` | home, interna (compacta) |
| `ServiceCard` | icono + título + descripción + CTA |
| `LocationCard` | mini-mapa SVG + datos + CTA |
| `BlogCard` | thumbnail + título + extracto + meta |
| `FAQAccordion` | con Schema.org `FAQPage` inyectado en `<head>` |
| `BreadcrumbNav` | con Schema.org `BreadcrumbList` |
| `ContactForm` | Formspree + validación cliente HTML5 |
| `BanksStrip` | grid grayscale de logos (placeholder hasta recibir lista) |
| `StaticMap` | **imagen PNG/WebP capturada de Google Maps stored en `/public/img/oficina-map.webp`** + CTA "Abrir en Google Maps" (link `https://maps.google.com/?q=...`). Sin API key, sin cookies, sin requests externos. |
| `WhatsAppFAB` | flotante bottom-right, sticky |
| `LegalFooter` | NAP + Schema.org `LocalBusiness` inline |
| `Navigation` | header + mobile menu + dropdowns |
| `Process3Steps` | 3 pasos con números grandes |
| `WhyBHC` | grid 4 columnas |
| `RelatedItems` | grid 3 cards de servicios/posts relacionados |
| `CtaBand` | banda CTA final con form repetido o lead text |

### 3.5 Iconografía

- **Lucide Icons** vía `astro-icon`
- Solo se compilan los iconos usados (no bundle completo)
- SVG inline para iconos hero/sección, no imágenes

### 3.6 Imágenes

- WebP/AVIF generados por `<Image />` de Astro
- Lazy loading nativo (`loading="lazy"`)
- `width` y `height` siempre presentes (evita CLS)
- Alt descriptivos con keyword cuando aplica

### 3.7 Accesibilidad

- Contraste AA en todo el texto (≥ 4.5:1)
- Focus ring visible: `focus:ring-2 focus:ring-primary-600 focus:ring-offset-2`
- Skip-to-content link al inicio del `<body>`
- `aria-label` en todos los botones-icono
- Semántica HTML5 estricta: `<main>`, `<nav>`, `<article>`, `<section>`
- Jerarquía de headings sin saltos (un solo `<h1>` por página)

---

## 4. Templates por página

### 4.1 Home `/`

```
Header (sticky)
HERO B
  ├─ H1: "Tu broker hipotecario en Castellón de la Plana"
  ├─ Sub: "No trabajamos para los bancos. Trabajamos para ti."
  └─ Form Formspree (4 campos) + CTA WhatsApp + Tel
Banks strip "Comparamos con +30 bancos"
Servicios — grid 3×2 + destacado
Why BHC — 4 columnas
Process 3 steps
Locations grid (4 cards)
FAQ (Schema FAQPage)
CTA band
Footer
```

### 4.2 Service page `/servicios/[slug]` ×7

```
Header
Breadcrumb (Inicio › Servicios › [Servicio])
Hero compacto: H1 con keyword + USP + CTA dual
"¿Qué es [servicio]?" — pedagogía 2-3 párrafos
"Cómo te ayudamos" — 4-5 bullets con icono
"Proceso paso a paso" — 4 hitos
"¿Para quién es este servicio?" — perfil cliente cualificador
FAQ específica (Schema FAQPage)
Servicios relacionados — 3 cards
CTA band
Footer
```

### 4.3 Location page `/broker-hipotecario/[localidad]` ×4

```
Header
Breadcrumb
Hero local: H1 + datos rápidos en línea (km desde oficina · CP · comarca · habitantes)
"Tu broker hipotecario en [Localidad]" — texto único
"Mercado inmobiliario en [Localidad]" — €/m² + variación 12m, fuente Idealista
"Servicios disponibles" — mini grid linkando 7 servicios
"Cómo llegar a nuestra oficina" — mini mapa con ruta
FAQ local (1-2 específicas + comunes)
CTA band
Footer
```

### 4.4 Sobre `/sobre-bhc`

```
Header + Breadcrumb
Hero "Sobre BHC"
"Quiénes somos" — institucional
"Nuestra forma de trabajar"
"Broker independiente vs. ir directo al banco"
"Nuestro compromiso"
[Hueco oculto v1: equipo + fotos]
CTA band
Footer
```

### 4.5 Contacto `/contacto`

```
Header + Breadcrumb
H1 "Contacta con BHC"
Layout 2 columnas:
  ├─ Izda: NAP grande + horario + WhatsApp + Tel + "Cómo llegar"
  └─ Dcha: Form Formspree extendido (8-10 campos)
Mapa estático full-width + botón "Abrir en Google Maps"
"¿Tiene coste consultarnos?" — bloque tranquilizador
Footer
```

### 4.6 Blog index `/blog/`

```
Header + Breadcrumb
H1 "Blog hipotecario"
Filtros por categoría (chips)
Grid posts 3 cols desktop / 1 mobile
Paginación
Footer
```

### 4.7 Blog post `/blog/[slug]`

```
Header + Breadcrumb (Inicio › Blog › [Categoría] › [Post])
H1 + meta (BHC · fecha · tiempo lectura · categoría)
Imagen destacada 16:9
TOC sticky lateral (desktop, generada de H2s)
Body Markdown (max-w-prose ≈ 65 chars)
Schema Article + BreadcrumbList
"¿Necesitas ayuda?" — CTA contextual
Posts relacionados (3 cards)
Footer
```

### 4.8 Legales

```
Header + Breadcrumb
H1 + cuerpo legal (max-w-prose, sin elementos comerciales)
Footer
[noindex en <head>]
```

---

## 5. Estrategia SEO

### 5.1 SEO técnico

**Performance targets (no negociables):**
- LCP < 2.5s, INP < 200ms, CLS < 0.1
- Lighthouse Performance ≥ 95
- Lighthouse SEO ≥ 100
- Lighthouse Best Practices ≥ 100
- Lighthouse Accessibility ≥ 95

**Implementación:**

- **Astro static** — cero JS por defecto, HTML servido directo
- **Tailwind purga** — solo CSS utilizado en bundle final
- **Fonts self-hosted** — Manrope WOFF2 en `/public/fonts/`, `font-display: swap`, preload del peso 400+700
- **Images** — `<Image />` de Astro: WebP+AVIF, sizes responsive, dimensions explícitas, lazy nativo (excepto hero LCP image que es `loading="eager"` + `fetchpriority="high"`)
- **No JS innecesario** — solo islands para nav móvil, FAQ accordion, dropdowns, form validation
- **CSS crítico inline** — Astro lo hace automático en build
- **Compresión** — Vercel sirve Brotli + gzip
- **CDN** — Vercel Edge

**Meta tags por página (auto-generadas vía layout `<Seo>`):**

```html
<title>{primaryKeyword} | BHC Broker Hipotecario Castellón</title>
<meta name="description" content="{<155 chars con keyword + USP + CTA verbo}" />
<link rel="canonical" href="{canonicalUrl}" />

<!-- OpenGraph -->
<meta property="og:type" content="{website|article}" />
<meta property="og:url" content="{canonicalUrl}" />
<meta property="og:title" content="{pageTitle}" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="{ogImage 1200x630 WebP}" />
<meta property="og:locale" content="es_ES" />
<meta property="og:site_name" content="BHC | Broker Hipotecario Castellón" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{pageTitle}" />
<meta name="twitter:description" content="{description}" />
<meta name="twitter:image" content="{ogImage}" />
```

**Para páginas legales y `/admin`:**
```html
<meta name="robots" content="noindex, nofollow" />
```

### 5.2 JSON-LD Schemas

**Global (en `<LegalFooter>` o `<Layout>`):**

```jsonld
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FinancialService"],
  "@id": "https://brokerhipotecariocastellon.es/#localbusiness",
  "name": "BHC | Broker Hipotecario Castellón",
  "image": "https://brokerhipotecariocastellon.es/img/og-default.jpg",
  "logo": "https://brokerhipotecariocastellon.es/img/logo.svg",
  "url": "https://brokerhipotecariocastellon.es",
  "telephone": "+34 864 87 21 86",
  "email": "info@brokerhipotecariocastellon.es",
  "priceRange": "Gratis (servicio sin coste al cliente)",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Egual, 34",
    "addressLocality": "Castellón de la Plana",
    "postalCode": "12002",
    "addressRegion": "Castellón",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "39.9864",
    "longitude": "-0.0513"
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "19:00"
  }],
  "areaServed": [
    {"@type":"City","name":"Castellón de la Plana"},
    {"@type":"City","name":"Vila-real"},
    {"@type":"City","name":"Almassora"},
    {"@type":"City","name":"Benicàssim"},
    {"@type":"City","name":"Borriol"}
  ],
  "sameAs": [
    "https://www.google.com/maps/?cid=..."
  ]
}
```

**Service pages — Schema `Service`:**

```jsonld
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "{nombre del servicio}",
  "provider": { "@id": "https://brokerhipotecariocastellon.es/#localbusiness" },
  "areaServed": [...],
  "offers": { "@type":"Offer", "price":"0", "priceCurrency":"EUR", "description":"Estudio gratuito sin compromiso" }
}
```

**Home, services, locations con FAQ — Schema `FAQPage`:**

```jsonld
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type":"Question", "name":"{pregunta}", "acceptedAnswer":{"@type":"Answer","text":"{respuesta}"} }
  ]
}
```

**Páginas internas con breadcrumb — `BreadcrumbList`:**

```jsonld
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type":"ListItem","position":1,"name":"Inicio","item":"https://brokerhipotecariocastellon.es/" }
  ]
}
```

**Blog posts — `Article`:**

```jsonld
{
  "@context":"https://schema.org",
  "@type":"Article",
  "headline":"{título}",
  "datePublished":"{ISO}",
  "dateModified":"{ISO}",
  "author":{"@type":"Organization","name":"BHC | Broker Hipotecario Castellón"},
  "publisher":{"@id":"https://brokerhipotecariocastellon.es/#localbusiness"},
  "mainEntityOfPage":"{canonical URL}",
  "image":"{featured image URL}"
}
```

### 5.3 sitemap.xml + robots.txt + RSS

- **sitemap.xml** — auto-generado por `@astrojs/sitemap`, incluye solo páginas indexables, prioridades y lastmod
- **robots.txt:**
  ```
  User-agent: *
  Allow: /
  Disallow: /admin
  Disallow: /aviso-legal
  Disallow: /politica-privacidad
  Disallow: /politica-cookies
  Sitemap: https://brokerhipotecariocastellon.es/sitemap.xml
  ```
- **RSS** — `/rss.xml` con últimos posts del blog (auto-generado)

### 5.4 SEO local — tareas del cliente (con guía paso a paso)

**Google Business Profile (GBP):**
- Crear ficha en business.google.com con dirección exacta: "Calle Egual, 34, 12002 Castellón de la Plana"
- Categoría primaria: **Corredor hipotecario** (Mortgage Broker)
- Categorías secundarias: **Asesor financiero**, **Servicio financiero**
- Verificación: solicitar **verificación por video** (más rápida que postal, ~24-48h)
- Foto de perfil = logo, foto de portada = foto exterior oficina
- Subir mínimo 5 fotos interior/exterior + 2 del equipo trabajando (cuando estén disponibles)
- Añadir 7 servicios uno a uno con descripción y precio "Gratis"
- Horario completo
- Publicar 1 post/semana primeras 8 semanas
- Activar mensajería + reservas (link a `/contacto`)

**NAP consistency** (mismo formato exacto en web + GBP + directorios):
- Nombre: `BHC | Broker Hipotecario Castellón`
- Dirección: `Calle Egual, 34, 12002 Castellón de la Plana, Castellón, España`
- Teléfono: `+34 864 87 21 86`

**Citations / directorios** (a hacer post-launch):
- Páginas Amarillas
- Yelp España
- eRecomendable
- GuíaLocal
- PYME World
- Cámara de Comercio Castellón
- Directorios sectoriales financieros si aplica

**Reviews strategy:**
- Email post-firma con link directo a Maps review
- Tarjeta NFC en oficina con link review
- Responder a TODAS las reviews (positivas y negativas) en <48h
- Objetivo primer trimestre: 10 reviews 4.5+ estrellas

**Linkbuilding inicial:**
- LinkedIn company page de BHC con enlace a web
- Perfil del broker en LinkedIn personal con enlace
- Listing en directorios locales con dofollow cuando posible

### 5.5 Indexación

- Tras deploy: submit `sitemap.xml` en Google Search Console
- Solicitar indexación manual de home + 4 servicios principales con "Inspect URL → Request indexing"
- Monitorizar cobertura semanal primer mes

---

## 6. Plan de implementación (7 días)

| Día | Entregables |
|---|---|
| **1** | Setup proyecto Astro 5 + Tailwind 4 + Decap CMS config + carpeta `/public/fonts/` con Manrope WOFF2 self-hosted. Base layout (`<Layout>`), header (`<Navigation>`), footer (`<LegalFooter>`) con NAP + Schema LocalBusiness. Páginas legales (3) con texto base RGPD/LSSI. Logo SVG inicial BHC. Deploy preliminar a Vercel (preview URL). |
| **2** | Home completa: hero B (form Formspree configurado), banks strip placeholder, services grid (cards), why BHC (4 cols), process 3 steps, locations grid, FAQ + Schema, CTA band. Botón WhatsApp flotante. |
| **3** | 4 páginas de servicio: primera vivienda, segunda vivienda, subrogación, máxima financiación. Cada una con contenido único + Schema Service + FAQ específica + 3 internal links a relacionados. |
| **4** | 3 páginas de servicio: no residentes, autónomos, joven. Mismo patrón. Total 7 páginas servicio terminadas. |
| **5** | 4 páginas de localidad: Vila-real, Almassora, Benicàssim, Borriol. Contenido único por localidad (datos €/m² obtenidos de Idealista/Fotocasa, distancia desde oficina vía Google Maps Directions, descripción de zona). Mini-mapas SVG con ruta. |
| **6** | `/sobre-bhc` + `/contacto` (con mapa estático + form extendido). Setup Decap CMS funcional con 1 post de ejemplo. Plantilla blog index + post template. RSS + sitemap.xml. Schema en todas las páginas auditado. |
| **7** | Auditoría completa: Lighthouse (≥95 en todo), validación Schema con Rich Results Test, validación HTML W3C, validación alt en todas las imágenes, verificación canonicals correctas, robots.txt, OG tags. Configuración DNS si dominio comprado, deploy production. Documento "Próximos pasos" para el cliente (GBP, Search Console, directorios). |

### 6.1 Definition of Done por página

Cada página, antes de marcarse "completa":

- [ ] H1 contiene keyword primaria exacta
- [ ] Title tag < 60 chars con keyword + marca
- [ ] Meta description < 155 chars con keyword + USP + CTA
- [ ] Canonical correcta
- [ ] OG image específica si aplica (o fallback global)
- [ ] Breadcrumb (excepto home) con Schema
- [ ] Internal links salientes ≥ 3 a páginas relevantes
- [ ] Internal links entrantes desde al menos otra página
- [ ] Schema markup específico del tipo de página
- [ ] FAQ con al menos 4 preguntas si la página la tiene
- [ ] CTA visible above-the-fold
- [ ] Validación Lighthouse mobile ≥ 95 performance
- [ ] Imágenes con alt descriptivo (no "image", no vacío)

### 6.2 Dependencies — qué del cliente bloquea qué

| Bloqueador del cliente | Bloquea | Workaround durante semana 1 |
|---|---|---|
| Compra dominio | Deploy a dominio final, DNS | Deploy en `bhc.vercel.app` mientras tanto |
| GBP creada y verificada | Aparición en Maps | NAP consistente en web ya prepara el terreno |
| Foto oficina | Hero contacto, GBP cover | Placeholder genérico (ilustración SVG) |
| Lista bancos | Banks strip realista | Placeholder con texto "+30 bancos" |
| Nº registro Ley 5/2019 | Footer legal completo | Placeholder "Inscrito en el registro de intermediarios de crédito inmobiliario nº PENDIENTE" |
| WhatsApp Business activado | CTA WhatsApp funcional | Link con `wa.me/34864872186` que funciona aunque no esté Business activado |
| Email info@dominio | Form Formspree puede ya operar con email personal del cliente | Configurar Formspree con email temporal hasta crear corporativo |
| Foto profesional retrato (futuro) | Activar sección equipo | Sección oculta hasta que existan |

### 6.3 Riesgos identificados

1. **Dominio no comprado a tiempo** — alta probabilidad de demorar lanzamiento. Mitigación: deploy a `.vercel.app` por defecto, switch DNS en <1h cuando esté el dominio.

2. **GBP no verificada en semana 1** — verificación de Google puede tardar 5-14 días con tarjeta postal. Sin GBP no se rankea en Maps. Mitigación: solicitar verificación por video el día 1 (~24h). Si no aceptan video, esperar postal — la web va saliendo igual.

3. **Sin reviews en GBP** — los primeros 5-10 reviews son los más difíciles. Sin reviews el ranking en Maps es lento. Mitigación: estrategia post-firma definida en spec, tarjeta NFC en oficina, email automático.

4. **Contenido genérico en páginas de localidad** — si todas se parecen, Google las trata como thin content. Mitigación: rigor en datos únicos por localidad (precio €/m², referencias geográficas, demografía).

5. **Performance degradada por imágenes mal optimizadas del cliente** — si suben JPG de 2 MB al CMS. Mitigación: documentación en `/admin` con instrucciones + Astro `<Image />` re-procesa todo al build.

6. **Cliente sin tiempo para crear contenido del blog** — blog sin actualizar = peor SEO. Mitigación: crear 3-4 posts iniciales como parte del lanzamiento (no semana 1, pero como adendum), dejar al cliente con cadencia clara.

7. **Teléfono 864 87 21 86 podría ser incorrecto** — el prefijo 864 no es estándar Castellón (Castellón fijo es 964). Cliente confirmó que es correcto, pero verificar antes del deploy production. Si fuera erróneo, cambia NAP en toda la web + Schema.

### 6.4 Definition of Done del proyecto

Web considerada lista para lanzamiento cuando:

- [ ] 14 páginas indexables construidas según template
- [ ] 3 páginas legales con texto RGPD/LSSI funcional
- [ ] Decap CMS operativo, 1 post ejemplo publicado, cliente puede editar
- [ ] Form Formspree recibe emails correctamente (test con dirección real)
- [ ] WhatsApp button abre conversación con número correcto
- [ ] Mapa estático muestra C. Egual 34 + botón "Abrir en Maps" funcional
- [ ] Lighthouse desktop + mobile ≥ 95 en home + 1 servicio + 1 localidad
- [ ] Sitemap.xml accesible y validado
- [ ] robots.txt accesible
- [ ] Schema validado en Rich Results Test para: home, 1 servicio, 1 localidad, 1 post
- [ ] OG tags validados en debugger Facebook + Twitter
- [ ] HTML W3C validado en home + 1 servicio
- [ ] Accesibilidad: navegación 100% con teclado en home + form + nav móvil
- [ ] Deploy production en Vercel con dominio (o preview si dominio pendiente)
- [ ] Documento "Próximos pasos del cliente" entregado (GBP, Search Console, citations, blog cadencia)

---

## 7. Assets requeridos del cliente (recopilatorio)

| Asset | Cuándo | Workaround si no llega |
|---|---|---|
| Compra dominio `brokerhipotecariocastellon.es` | Día 1-7 | Deploy en `bhc.vercel.app` |
| Logo SVG (si quiere reemplazar el inicial) | Cualquier momento post-launch | Logo inicial diseñado por nosotros |
| Foto oficina exterior + interior | Cuando pueda | Ilustración genérica SVG |
| Nº registro Ley 5/2019 | Antes de deploy production | Placeholder "PENDIENTE" |
| Lista bancos con los que trabaja | Día 5-6 | "+30 bancos" sin logos |
| WhatsApp Business activado al número del CTA | Antes de deploy production | wa.me link funciona sin Business |
| Email `info@brokerhipotecariocastellon.es` creado | Antes de deploy production | Email temporal del cliente |
| Acceso a Vercel + GitHub (o crear cuentas vía cliente) | Día 1 | Cuenta del dev como provisional |
| GBP creada y verificada | En paralelo, depende de Google | Sin GBP, ranking Maps tarda |
| Cuenta Google Search Console | Post-deploy | Configurar nosotros + traspaso |

---

## 8. Fuera de scope explícito v1

Lo siguiente NO entra en esta entrega (decidido en brainstorming):

- Simulador de hipoteca / calculadora de cuota
- Sistema de agenda online (Calendly)
- Chatbot / asistente virtual
- Comparador de bancos en tiempo real
- Área cliente / portal autenticado
- Pasarela de pago
- Versión en valenciano (i18n)
- Páginas de equipo con bios + fotos (preparado, oculto)
- Google Analytics / Tag Manager
- Cookie consent banner (no hay cookies de terceros que lo requieran)
- Mapa embed dinámico de Google Maps (sustituido por estático)
- Integración CRM
- Multi-idioma (solo castellano)

---

## 9. Decisiones tomadas en brainstorming

Log de decisiones clave con rationale, para futura referencia:

1. **Cobertura geográfica:** Castellón ciudad + 4 localidades cinturón (Vila-real, Almassora, Benicàssim, Borriol). Descartada la provincia entera por riesgo de thin content.
2. **Idioma único castellano.** Valenciano se reservó como posible fase 2 — i18n no implementado en código para mantener simplicidad.
3. **Equipo institucional/anónimo v1.** Espacios preparados para activar página equipo con fotos/bios cuando el cliente quiera.
4. **Conversión = form Formspree + WhatsApp + tel.** Descartado simulador y agenda online.
5. **Blog ligero (1-2 posts/mes) auto-gestionado desde Decap CMS.** Descartado WordPress por performance.
6. **Stack: Astro 5 + Tailwind 4 + Decap CMS + Formspree + Vercel.** Sin backend propio. Coste mensual 0 €.
7. **Tono visual: fintech moderno (B).** Descartado institucional, cercano local, premium boutique.
8. **Hero: promise + formulario visible (B).** Descartado number-led y process-led como hero (process se usa como sección interior).
9. **Subrogación + cambio banco + refinanciación = una sola página** para evitar canibalización.
10. **Sin tracking ni cookies.** Sin banner. Mapa estático en lugar de embed Google Maps.
11. **Página de Castellón ciudad = home** (no se crea `/broker-hipotecario/castellon-de-la-plana` para evitar canibalización con home).
12. **Timeline: 1 semana sprint.** Asume contenido AI-asistido revisado por el cliente.

---

## 10. Métricas de éxito post-lanzamiento

Para evaluar si la web funciona, monitorizar a 90 días:

- **Indexación Google:** ≥ 13 de 14 páginas indexables aparecen en `site:brokerhipotecariocastellon.es`
- **Posicionamiento Maps:** aparece en top-3 del local pack para "broker hipotecario Castellón" a partir de mes 3 (depende de reviews + GBP optimizada)
- **Posicionamiento orgánico:** keyword principal "broker hipotecario Castellón" en página 1 de Google a mes 6-9
- **Core Web Vitals:** verde en CrUX (≥ 75% de usuarios reales con buen LCP/INP/CLS) a mes 3
- **Reviews GBP:** ≥ 10 reviews 4.5+ estrellas a mes 3
- **Leads/mes desde la web (form + WhatsApp clicks):** target inicial 10-20 a mes 3, escalando

---

**Fin del spec.**
