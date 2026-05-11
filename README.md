# BHC | Broker Hipotecario Castellón — Web

Sitio web estático para BHC, broker hipotecario en Castellón de la Plana, optimizado para SEO orgánico transaccional y SEO local (Google Maps).

## Stack

- **Astro 6** (static-first, cero JS por defecto)
- **Tailwind CSS 4** (`@tailwindcss/vite`)
- **Sveltia CMS** (drop-in Decap-compatible) para el blog en `/admin`
- **Formspree** para envío de formularios
- **Vercel** hosting + CI/CD
- **Manrope** self-hosted (sin Google Fonts CDN)
- **Lucide icons** vía `astro-icon`
- Sin tracking, sin cookies de terceros, sin banner de consentimiento

## Scripts

```bash
npm install         # instalar dependencias
npm run dev         # dev server en http://localhost:4321
npm run build       # build estático en /dist
npm run preview     # preview del build
```

## Estructura

```
src/
├─ data/           NAP, services, locations, faq, banks
├─ components/     Componentes reutilizables Astro (~20)
├─ layouts/        Layout.astro (wrapper con LocalBusiness Schema)
├─ pages/          21 páginas + RSS
│  ├─ servicios/[slug].astro     ← 7 service pages dinámicas
│  └─ broker-hipotecario/[slug]  ← 4 location pages dinámicas
└─ content/blog/   Posts en Markdown (gestionados por CMS)

public/
├─ admin/          Sveltia CMS
├─ fonts/          Manrope WOFF2 (400/500/600/700)
├─ img/            Logos, OG, fotos cliente, video aerial
└─ robots.txt
```

## Documentación

- **Diseño**: [docs/superpowers/specs/2026-05-11-bhc-broker-hipotecario-castellon-design.md](docs/superpowers/specs/2026-05-11-bhc-broker-hipotecario-castellon-design.md)
- **Plan de implementación**: [docs/superpowers/plans/2026-05-11-bhc-implementation.md](docs/superpowers/plans/2026-05-11-bhc-implementation.md)
- **Pasos del cliente pre/post launch**: [docs/NEXT_STEPS_CLIENTE.md](docs/NEXT_STEPS_CLIENTE.md)

## Páginas

- `/` — Home
- `/servicios` + 7 servicios
- `/broker-hipotecario` + 4 localidades (Vila-real, Almassora, Benicàssim, Borriol)
- `/sobre-bhc`, `/contacto`
- `/blog` + posts
- `/aviso-legal`, `/politica-privacidad`, `/politica-cookies` (noindex)
- `/admin` — Sveltia CMS para editar blog (noindex)

## SEO

- Schema.org en todas las páginas: `LocalBusiness/FinancialService`, `Service`, `FAQPage`, `BreadcrumbList`, `Article`
- Anti-canibalización: 1 keyword primaria por página, Castellón ciudad = home
- Sitemap auto-generado en `/sitemap-index.xml`
- RSS feed en `/rss.xml`
- OG + Twitter Card tags
- Canonical en todas las páginas
- Manrope preload, fonts self-hosted (sin terceros)
- Imágenes WebP/AVIF con Astro `<Image />`

## Acción requerida antes de production deploy

Ver [docs/NEXT_STEPS_CLIENTE.md](docs/NEXT_STEPS_CLIENTE.md) para el checklist completo. Resumen:

1. Comprar dominio + configurar DNS a Vercel
2. Crear Google Business Profile
3. Configurar Formspree ID en `src/components/ContactForm.astro`
4. Email corporativo `info@brokerhipotecariocastellon.es`
5. Nº registro Ley 5/2019 en `src/data/business.ts`
6. Lista oficial de bancos en `src/data/banks.ts`
7. Configurar Sveltia CMS OAuth (Cloudflare Worker)
