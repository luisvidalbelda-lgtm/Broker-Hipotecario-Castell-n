# BHC | Broker Hipotecario Castellón — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 14-page Astro static site for BHC | Broker Hipotecario Castellón optimized for SEO orgánico transaccional + SEO local (Maps) in Castellón ciudad + cinturón.

**Architecture:** Static-first Astro 5 site, zero JS by default, Tailwind 4 design tokens in CSS, Decap CMS for blog at `/admin`, Formspree for form submissions, deployed to Vercel free tier. Single repo on GitHub.

**Tech Stack:** Astro 5 · Tailwind CSS 4 (`@tailwindcss/vite`) · Decap CMS (with GitHub OAuth via Vercel serverless or Sveltia CMS fork) · Formspree · Vercel · GitHub · Manrope self-hosted · Lucide icons via astro-icon

**Spec:** [docs/superpowers/specs/2026-05-11-bhc-broker-hipotecario-castellon-design.md](../specs/2026-05-11-bhc-broker-hipotecario-castellon-design.md)

**Working directory:** `C:\Users\mgarc\Desktop\PROYECTO INMOBILIARIA`

---

## Assets proporcionados por el cliente

Tres archivos colocados en la raíz del proyecto el día 2026-05-11. Se renombran y mueven a `public/img/` como parte de la Task 6b (recién insertada).

| Archivo origen | Renombrado a | Uso |
|---|---|---|
| `metropolis-building-facade-and-aerial-cityscape-of-2025-12-17-21-22-51-utc.webm` | `public/img/castellon-aerial.webm` | Hero background (autoplay/muted/loop/playsinline) con poster JPG para móvil |
| `businessman-or-real-estate-agents-holding-house-mo-2026-01-07-00-44-11-utc.webp` | `public/img/asesor-con-maqueta.webp` | Decorativa en `/servicios` (index) o en sección "Cómo trabajamos" |
| `team-diversity-women-selling-house-real-estate-age-2026-04-10-15-28-59-utc.webp` | `public/img/asesoramiento-profesional.webp` | Decorativa en `/sobre-bhc` (NO se etiqueta como "nuestro equipo" — coherencia con decisión v1 anónima) |

**Nota perf:** el WebM de 21 MB es demasiado pesado para móvil. Estrategia:
- Desktop: `<video>` con autoplay/muted/loop/playsinline, `preload="metadata"`
- Mobile (CSS media query): ocultar `<video>`, mostrar imagen poster estática
- Generar poster JPG (`castellon-aerial-poster.jpg`) con un frame del video o usando ffmpeg

---

## File Structure

```
PROYECTO INMOBILIARIA/
├─ astro.config.mjs                  ← Astro config: site URL, integrations
├─ package.json                       ← deps
├─ tsconfig.json                      ← TS strict
├─ .gitignore
├─ vercel.json                        ← Vercel config (headers, rewrites)
│
├─ public/
│  ├─ admin/
│  │  ├─ index.html                   ← Decap CMS shell
│  │  └─ config.yml                   ← CMS config
│  ├─ fonts/
│  │  ├─ manrope-400.woff2
│  │  ├─ manrope-500.woff2
│  │  ├─ manrope-600.woff2
│  │  └─ manrope-700.woff2
│  ├─ img/
│  │  ├─ og-default.jpg               ← OpenGraph fallback 1200×630
│  │  ├─ logo.svg                     ← logo principal
│  │  ├─ logo-mark.svg                ← solo monograma
│  │  └─ oficina-map.webp             ← screenshot estático Maps
│  ├─ robots.txt
│  └─ favicon.svg
│
├─ src/
│  ├─ env.d.ts
│  ├─ styles/
│  │  └─ global.css                   ← Tailwind 4 + tokens + base styles
│  ├─ data/
│  │  ├─ business.ts                  ← NAP, contacto, horario, registro Ley 5/2019
│  │  ├─ services.ts                  ← 7 servicios con keyword, slug, copy
│  │  ├─ locations.ts                 ← 4 localidades con datos únicos
│  │  ├─ faq.ts                       ← FAQ por página (home, servicios, localidades)
│  │  └─ banks.ts                     ← lista placeholder de bancos
│  ├─ layouts/
│  │  └─ Layout.astro                 ← layout base con SEO + header + footer
│  ├─ components/
│  │  ├─ Seo.astro                    ← meta tags + canonical + OG + Twitter + JSON-LD
│  │  ├─ Logo.astro                   ← componente logo SVG inline
│  │  ├─ Button.astro                 ← variants primary, secondary, whatsapp, ghost
│  │  ├─ Navigation.astro             ← header + dropdowns + mobile menu
│  │  ├─ Footer.astro                 ← NAP + links + Ley 5/2019 + Schema LocalBusiness
│  │  ├─ Hero.astro                   ← hero home con form
│  │  ├─ HeroInterior.astro           ← hero compacto para páginas internas
│  │  ├─ ContactForm.astro            ← form Formspree con validación
│  │  ├─ ContactFormExtended.astro    ← form largo para /contacto
│  │  ├─ BanksStrip.astro             ← strip "Comparamos con +X bancos"
│  │  ├─ ServiceCard.astro            ← card de servicio
│  │  ├─ ServicesGrid.astro           ← grid de servicios
│  │  ├─ LocationCard.astro           ← card de localidad
│  │  ├─ LocationsGrid.astro          ← grid de localidades
│  │  ├─ WhyBHC.astro                 ← 4 columnas valor
│  │  ├─ Process3Steps.astro          ← proceso 3 pasos
│  │  ├─ FAQAccordion.astro           ← FAQ + Schema FAQPage
│  │  ├─ BreadcrumbNav.astro          ← breadcrumbs + Schema BreadcrumbList
│  │  ├─ CtaBand.astro                ← banda CTA final
│  │  ├─ WhatsAppFAB.astro            ← botón flotante WhatsApp
│  │  ├─ StaticMap.astro              ← mapa estático + CTA Maps
│  │  ├─ BlogCard.astro               ← card de blog post
│  │  └─ RelatedItems.astro           ← items relacionados (servicios/posts)
│  ├─ content/
│  │  ├─ config.ts                    ← content collections schema
│  │  └─ blog/
│  │     └─ ejemplo-subrogacion.md    ← post de ejemplo
│  └─ pages/
│     ├─ index.astro
│     ├─ sobre-bhc.astro
│     ├─ contacto.astro
│     ├─ aviso-legal.astro
│     ├─ politica-privacidad.astro
│     ├─ politica-cookies.astro
│     ├─ servicios/
│     │  ├─ index.astro
│     │  ├─ hipoteca-primera-vivienda.astro
│     │  ├─ hipoteca-segunda-vivienda.astro
│     │  ├─ subrogacion-hipotecaria.astro
│     │  ├─ maxima-financiacion.astro
│     │  ├─ hipoteca-no-residentes.astro
│     │  ├─ hipoteca-autonomos.astro
│     │  └─ hipoteca-joven.astro
│     ├─ broker-hipotecario/
│     │  ├─ index.astro
│     │  ├─ vila-real.astro
│     │  ├─ almassora.astro
│     │  ├─ benicassim.astro
│     │  └─ borriol.astro
│     └─ blog/
│        ├─ index.astro
│        ├─ [...slug].astro
│        └─ categoria/[slug].astro
│
└─ docs/
   ├─ specs/2026-05-11-bhc-broker-hipotecario-castellon-design.md
   ├─ plans/2026-05-11-bhc-implementation.md       (este fichero)
   └─ NEXT_STEPS_CLIENTE.md                          (entregable día 7)
```

---

## Notas previas a la ejecución

**Decap CMS auth en Vercel:** la versión clásica de Decap CMS requiere git-gateway de Netlify para OAuth. En Vercel hay dos opciones limpias:
- **Opción recomendada:** usar **Sveltia CMS** (fork drop-in compatible de Decap, mismo `config.yml`, con OAuth nativo para Vercel/Cloudflare). Cambio en `index.html`: cambiar `<script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js">` por `<script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js">`.
- Si el cliente prefiere Decap puro: añadir un OAuth provider serverless (`/api/auth.ts` en Vercel). Más complejo. Posponer si timeline aprieta.

**Sin tests automatizados:** este proyecto es contenido + diseño, no lógica. La verificación es: dev server visual + Lighthouse + Schema validators + W3C HTML. No introducimos Vitest/Playwright en v1.

**Git:** el directorio no es git repo todavía. Se inicializa en Task 1.

**Commits frecuentes:** cada task termina con commit. No batching.

---

## Phase 1 — Foundation (Day 1)

### Task 1: Inicializar proyecto y git

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`
- Init: git repo

- [ ] **Step 1: Inicializar Astro con TypeScript strict**

En la raíz `C:\Users\mgarc\Desktop\PROYECTO INMOBILIARIA`:

```bash
npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git --skip-houston --yes
```

Esto crea `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro` mínimos.

- [ ] **Step 2: Inicializar git y .gitignore**

```bash
git init -b main
```

Crear `.gitignore`:
```
node_modules/
dist/
.astro/
.env
.env.*
.vercel/
.DS_Store
.superpowers/
.agents/
.claude/
skills-lock.json
```

- [ ] **Step 3: Instalar deps**

```bash
npm install
npm install @astrojs/sitemap @astrojs/mdx @astrojs/check astro-icon @iconify-json/lucide
npm install -D @tailwindcss/vite tailwindcss@^4
```

- [ ] **Step 4: Primer commit**

```bash
git add -A
git commit -m "chore: init Astro 5 + TypeScript strict project"
```

---

### Task 2: Configurar astro.config.mjs + Tailwind 4

**Files:**
- Modify: `astro.config.mjs`
- Create: `src/styles/global.css`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Escribir astro.config.mjs**

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://brokerhipotecariocastellon.es',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/aviso-legal') &&
        !page.includes('/politica-privacidad') &&
        !page.includes('/politica-cookies'),
    }),
    mdx(),
    icon({ include: { lucide: ['*'] } }),
  ],
});
```

- [ ] **Step 2: Crear src/styles/global.css con tokens Tailwind 4**

```css
@import "tailwindcss";

@theme {
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-900: #1e3a8a;

  --color-accent-amber: #f59e0b;
  --color-success: #10b981;
  --color-whatsapp: #25D366;
  --color-whatsapp-dk: #128C7E;

  --color-text-base: #0f172a;
  --color-text-muted: #475569;
  --color-text-soft: #94a3b8;
  --color-border: #e2e8f0;
  --color-bg-soft: #f8fafc;
  --color-bg-dark: #0a1929;

  --font-sans: 'Manrope', system-ui, -apple-system, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, monospace;

  --shadow-card: 0 4px 24px rgba(15, 23, 42, 0.06);
}

@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/manrope-400.woff2') format('woff2');
}
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/manrope-500.woff2') format('woff2');
}
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/manrope-600.woff2') format('woff2');
}
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/manrope-700.woff2') format('woff2');
}

html {
  font-family: var(--font-sans);
  color: var(--color-text-base);
  background-color: #ffffff;
  scroll-behavior: smooth;
}

body {
  font-feature-settings: 'cv11', 'ss01';
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; }
h2 { font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 700; line-height: 1.2; letter-spacing: -0.01em; }
h3 { font-size: clamp(1.25rem, 2vw, 1.75rem); font-weight: 600; line-height: 1.3; }
h4 { font-size: 1.125rem; font-weight: 600; }
p { line-height: 1.65; }

a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid var(--color-primary-600);
  outline-offset: 2px;
  border-radius: 4px;
}

.skip-to-content {
  position: absolute;
  left: -9999px;
  top: 1rem;
  z-index: 100;
  padding: 0.5rem 1rem;
  background: var(--color-primary-600);
  color: white;
  border-radius: 6px;
  font-weight: 600;
}
.skip-to-content:focus {
  left: 1rem;
}
```

- [ ] **Step 3: Verificar dev server**

```bash
npm run dev
```

Abre `http://localhost:4321` → debe cargar sin errores.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: configure Astro 5 with Tailwind 4 tokens and Manrope font face"
```

---

### Task 3: Descargar fuentes Manrope self-hosted

**Files:**
- Create: `public/fonts/manrope-400.woff2`, `manrope-500.woff2`, `manrope-600.woff2`, `manrope-700.woff2`

- [ ] **Step 1: Descargar WOFF2 desde Google Fonts**

Usar [google-webfonts-helper](https://gwfh.mranftl.com/fonts/manrope?subsets=latin) o descargar manualmente:

```bash
mkdir -p public/fonts
cd public/fonts
curl -L -o manrope-400.woff2 "https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggOxSvfeS5HBQA.woff2"
curl -L -o manrope-500.woff2 "https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSvfeS5HBQA.woff2"
curl -L -o manrope-600.woff2 "https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggKxSvfeS5HBQA.woff2"
curl -L -o manrope-700.woff2 "https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggGxSvfeS5HBQA.woff2"
cd ../..
```

(Si los hash URLs cambian en el futuro, usar la herramienta gwfh.mranftl.com o `npx google-fonts-helper`.)

- [ ] **Step 2: Verificar fuente carga**

```bash
npm run dev
```

Inspector DOM → Network → debería ver `manrope-400.woff2` cargando desde tu dominio. No requests a `fonts.googleapis.com` o `fonts.gstatic.com`.

- [ ] **Step 3: Commit**

```bash
git add public/fonts/
git commit -m "feat: self-host Manrope font (400/500/600/700)"
```

---

### Task 4: Crear data files (business, services, locations, faq, banks)

**Files:**
- Create: `src/data/business.ts`, `src/data/services.ts`, `src/data/locations.ts`, `src/data/faq.ts`, `src/data/banks.ts`

- [ ] **Step 1: src/data/business.ts**

```typescript
// src/data/business.ts
export const business = {
  name: 'BHC | Broker Hipotecario Castellón',
  shortName: 'BHC',
  legalName: 'BHC | Broker Hipotecario Castellón',
  tagline: 'No trabajamos para los bancos. Trabajamos para ti.',
  description:
    'Tu broker hipotecario en Castellón de la Plana. Comparamos más de 30 bancos para conseguirte la mejor hipoteca. Estudio gratuito y sin compromiso.',
  url: 'https://brokerhipotecariocastellon.es',
  email: 'info@brokerhipotecariocastellon.es',
  phone: '+34864872186',
  phoneDisplay: '864 87 21 86',
  whatsapp: '34864872186', // sin + para wa.me
  whatsappMessage: 'Hola, me interesa información sobre hipotecas',
  address: {
    street: 'Calle Egual, 34',
    locality: 'Castellón de la Plana',
    postalCode: '12002',
    region: 'Castellón',
    country: 'ES',
    countryName: 'España',
  },
  geo: {
    latitude: 39.9864,
    longitude: -0.0513,
  },
  hours: [
    { days: 'Lunes a Viernes', opens: '09:00', closes: '19:00' },
  ],
  hoursMachine: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  registroLey5_2019: 'PENDIENTE — cliente proporcionará nº de inscripción',
  ogImage: '/img/og-default.jpg',
  social: {
    // Pendientes — añadir cuando existan
  },
} as const;
```

- [ ] **Step 2: src/data/services.ts**

```typescript
// src/data/services.ts
export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  icon: string;
  intro: string;
  what: string[];
  howWeHelp: { icon: string; text: string }[];
  process: { step: number; title: string; description: string }[];
  forWho: string[];
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: 'hipoteca-primera-vivienda',
    title: 'Hipoteca para primera vivienda en Castellón',
    shortTitle: 'Primera vivienda',
    primaryKeyword: 'hipoteca primera vivienda Castellón',
    metaTitle: 'Hipoteca primera vivienda Castellón | BHC Broker Hipotecario',
    metaDescription:
      'Conseguimos la mejor hipoteca para tu primera casa en Castellón. Comparamos +30 bancos por ti. Estudio gratuito y sin compromiso.',
    icon: 'lucide:home',
    intro:
      'Comprar la primera casa es la decisión financiera más importante de tu vida. En BHC negociamos por ti con más de 30 entidades para conseguir el tipo de interés y las condiciones que mejor encajen con tu perfil.',
    what: [
      'Negociamos hipotecas fijas, variables y mixtas con las principales entidades de Castellón.',
      'Analizamos tu viabilidad financiera antes de mover ficha — sabemos qué bancos van a decirte que sí y cuáles no merece la pena ni consultar.',
      'Te acompañamos desde el primer cálculo hasta la firma ante notario, sin que tengas que pisar una sucursal.',
    ],
    howWeHelp: [
      { icon: 'lucide:percent', text: 'Buscamos el tipo de interés más bajo: fijo, variable o mixto.' },
      { icon: 'lucide:shield-check', text: 'Negociamos eliminar vinculaciones innecesarias (seguros, planes, tarjetas).' },
      { icon: 'lucide:calculator', text: 'Calculamos el coste real total (TAE) más allá del nominal.' },
      { icon: 'lucide:file-check', text: 'Revisamos cláusulas suelo, comisiones y gastos antes de firmar.' },
    ],
    process: [
      { step: 1, title: 'Estudio gratuito', description: 'Nos cuentas tu situación (ingresos, ahorro, vivienda objetivo). Analizamos viabilidad en 24h.' },
      { step: 2, title: 'Negociación con bancos', description: 'Presentamos tu caso a las entidades que mejor encajan. Recibimos ofertas oficiales.' },
      { step: 3, title: 'Comparativa y decisión', description: 'Te presentamos las 2-3 mejores ofertas con coste real comparado. Tú decides.' },
      { step: 4, title: 'Firma ante notario', description: 'Acompañamiento en la firma. Te avisamos de cualquier cláusula a vigilar.' },
    ],
    forWho: [
      'Tienes ahorrado al menos un 10-20% del precio de la vivienda',
      'Tu trabajo es estable (indefinido o autónomo con histórico)',
      'No tienes deudas pendientes significativas en CIRBE',
      'Quieres comparar varias entidades sin pisar bancos uno a uno',
    ],
    faq: [
      {
        q: '¿Cuánto cobra BHC por buscarme la hipoteca?',
        a: 'No cobramos al cliente. Los bancos nos retribuyen por traerles operaciones que cumplen sus criterios. Para ti el estudio y el servicio son completamente gratuitos.',
      },
      {
        q: '¿Cuánto tiempo tarda todo el proceso?',
        a: 'Desde el primer estudio hasta la firma, lo habitual son 4-8 semanas. Si la documentación está completa desde el inicio, puede cerrarse en 4 semanas. Casos complejos llegan a 10.',
      },
      {
        q: '¿Qué documentación necesito para empezar?',
        a: 'Para el estudio inicial basta con: DNI, contratos laborales, últimas 3 nóminas, declaración de IRPF del último año, y vida laboral. Nada más al principio.',
      },
      {
        q: '¿Puedo conseguir hipoteca con menos del 20% de entrada?',
        a: 'Sí, en algunos perfiles llegamos al 90% de financiación e incluso 95% o 100% en casos concretos (avales ICO, vivienda joven, perfiles muy solventes). Lo evaluamos en el estudio inicial.',
      },
    ],
  },
  {
    slug: 'hipoteca-segunda-vivienda',
    title: 'Hipoteca para segunda vivienda en Castellón',
    shortTitle: 'Segunda vivienda',
    primaryKeyword: 'hipoteca segunda vivienda Castellón',
    metaTitle: 'Hipoteca segunda vivienda Castellón | BHC Broker Hipotecario',
    metaDescription:
      'Hipoteca para segunda residencia en Castellón y costa (Benicàssim, Oropesa). Comparamos +30 bancos. Estudio gratis.',
    icon: 'lucide:palm-tree',
    intro:
      'La hipoteca para una segunda vivienda funciona distinta: menor porcentaje de financiación, plazos más cortos y bancos más exigentes. En BHC sabemos cuáles aceptan operaciones de segunda residencia en costa de Castellón con buenas condiciones.',
    what: [
      'Hipotecas para segunda residencia en costa Castellón: Benicàssim, Oropesa, Peñíscola, Vinaròs.',
      'Hipotecas para inversión inmobiliaria (alquilar tu segunda vivienda).',
      'Refinanciación de segundas viviendas con condiciones mejorables.',
    ],
    howWeHelp: [
      { icon: 'lucide:percent', text: 'Identificamos bancos que financian segunda vivienda hasta el 70-80%.' },
      { icon: 'lucide:trending-up', text: 'Calculamos rentabilidad si vas a alquilarla (vacacional o larga estancia).' },
      { icon: 'lucide:scale', text: 'Comparamos hipoteca segunda vivienda vs. ampliación de la primera (más barato a veces).' },
      { icon: 'lucide:building-2', text: 'Trabajamos con bancos que aceptan complejos turísticos en costa.' },
    ],
    process: [
      { step: 1, title: 'Estudio de viabilidad', description: 'Evaluamos tu primera hipoteca (si la tienes) + capacidad para segunda.' },
      { step: 2, title: 'Selección de entidades', description: 'No todos los bancos financian segunda vivienda. Vamos directos a los que sí.' },
      { step: 3, title: 'Negociación y oferta', description: 'Recibimos ofertas y te las presentamos comparadas.' },
      { step: 4, title: 'Firma con tranquilidad', description: 'Acompañamiento en escritura.' },
    ],
    forWho: [
      'Ya tienes hipoteca de primera vivienda (o está pagada)',
      'Buscas vivienda en costa Castellón o pueblos interior',
      'Tu intención puede ser uso propio o alquiler vacacional',
      'Quieres invertir parte de tu patrimonio en inmueble',
    ],
    faq: [
      {
        q: '¿Hasta qué porcentaje me financian una segunda vivienda?',
        a: 'Lo habitual en segunda residencia es 70-80% del valor de tasación. En algunos casos (inversor solvente, primera ya pagada) llegamos al 80% sin problema.',
      },
      {
        q: '¿Es mejor pedir una segunda hipoteca o ampliar la primera?',
        a: 'Depende. Si tu primera hipoteca tiene buen interés y quedan pocos años, suele ser mejor segunda. Si la primera es cara, a veces ampliarla (refinanciar todo a la vez) sale mejor. Lo calculamos.',
      },
      {
        q: '¿Acepta el banco que la alquile como vacacional?',
        a: 'Algunos sí y otros no. En BHC vamos solo a los que aceptan uso vacacional desde el principio, para que no haya sorpresas.',
      },
    ],
  },
  {
    slug: 'subrogacion-hipotecaria',
    title: 'Subrogación hipotecaria en Castellón (cambio de banco)',
    shortTitle: 'Subrogación',
    primaryKeyword: 'subrogación hipoteca Castellón',
    metaTitle: 'Subrogación hipoteca Castellón | Cambio de banco — BHC',
    metaDescription:
      'Cambia tu hipoteca a un banco que te dé mejores condiciones. Ahorra hasta miles de € en intereses. Subrogación en Castellón con BHC.',
    icon: 'lucide:repeat',
    intro:
      'Si firmaste tu hipoteca hace años y los tipos han cambiado, probablemente estés pagando de más. La subrogación (también llamada "cambio de banco" o "refinanciación") consiste en trasladar tu hipoteca actual a otra entidad con mejores condiciones. En BHC lo gestionamos íntegro.',
    what: [
      'Analizamos tu hipoteca actual (interés, plazo, cuota, capital pendiente) y la comparamos con lo que el mercado ofrece hoy.',
      'Negociamos con tu banco actual primero (ahorra costes) — si no mejoran, ejecutamos la subrogación.',
      'Cubrimos también la novación: cambiar condiciones manteniendo el mismo banco.',
      'Refinanciación: ampliar plazo, reducir cuota, consolidar préstamos personales.',
    ],
    howWeHelp: [
      { icon: 'lucide:trending-down', text: 'Calculamos el ahorro real (en €) durante toda la vida restante de la hipoteca.' },
      { icon: 'lucide:scissors', text: 'Estudiamos eliminar bonificaciones que no usas (seguros, planes, tarjetas).' },
      { icon: 'lucide:file-text', text: 'Gestionamos todos los trámites: tasación, gestoría, notaría.' },
      { icon: 'lucide:wallet', text: 'Algunas subrogaciones tienen coste 0€ — buscamos esas primero.' },
    ],
    process: [
      { step: 1, title: 'Auditoría de tu hipoteca actual', description: 'Nos enseñas tu cuadro de amortización + escritura. Calculamos cuánto estás pagando de más.' },
      { step: 2, title: 'Negociación con tu banco', description: 'Antes de cambiar, le damos opción de mejorar. Muchas veces aceptan.' },
      { step: 3, title: 'Búsqueda de banco objetivo', description: 'Si el tuyo no mejora, presentamos tu caso a entidades que ofrecen subrogación con costes mínimos.' },
      { step: 4, title: 'Firma de subrogación', description: 'Acompañamos en la firma ante notario. Sale más barato de lo que parece.' },
    ],
    forWho: [
      'Tu hipoteca actual tiene interés superior al 3% (revisa tu última factura)',
      'Te quedan al menos 10 años de hipoteca por delante',
      'Tu situación laboral/económica es similar o mejor que cuando firmaste',
      'Pagas seguros o productos vinculados que no usas',
    ],
    faq: [
      {
        q: '¿Cuánto cuesta hacer una subrogación?',
        a: 'Por ley, la subrogación a otro banco tiene costes muy reducidos: tasación (~300€) y notaría (~500€). Algunos bancos los asumen ellos. La comisión por subrogación de tu banco actual está limitada por ley al 0,5%-0,15% según años transcurridos.',
      },
      {
        q: '¿Cuánto puedo ahorrar al subrogar?',
        a: 'Depende del diferencial. Bajar 1 punto de interés en una hipoteca de 150.000€ a 20 años son ~17.000€ de ahorro. Calculamos tu caso real en el estudio gratuito.',
      },
      {
        q: '¿Cuál es la diferencia entre subrogación, novación y refinanciación?',
        a: 'Subrogación = cambias de banco. Novación = mismo banco, mejores condiciones. Refinanciación = término amplio que engloba ambos + ampliar plazo o consolidar deudas. En la práctica buscamos la opción que más te ahorre, sea cual sea.',
      },
      {
        q: '¿Mi banco puede negarse a la subrogación?',
        a: 'No. Por ley tiene derecho a igualar la oferta del nuevo banco (derecho de tanteo), pero si no la iguala, la subrogación se ejecuta.',
      },
    ],
  },
  {
    slug: 'maxima-financiacion',
    title: 'Hipoteca al 100% en Castellón (máxima financiación)',
    shortTitle: 'Máxima financiación',
    primaryKeyword: 'hipoteca 100 financiación Castellón',
    metaTitle: 'Hipoteca 100% Castellón | Máxima financiación — BHC',
    metaDescription:
      'Hipoteca al 100% en Castellón sin entrada. Buscamos los bancos que financian el máximo según tu perfil. Estudio gratis.',
    icon: 'lucide:trending-up',
    intro:
      'No tener el 20% de ahorro para una entrada no significa quedarte sin casa. Hay bancos que financian al 90%, 95% e incluso 100% según perfil. En BHC sabemos cuáles y bajo qué condiciones. También gestionamos los avales ICO que permiten llegar al 95-100% para jóvenes y familias.',
    what: [
      'Identificamos bancos que ofrecen máxima financiación según tu perfil concreto.',
      'Gestionamos el aval público ICO (jóvenes <35 y familias con menores).',
      'Estudiamos doble garantía (segundo inmueble) para llegar al 100%.',
      'Combinamos préstamos puente si estás vendiendo tu vivienda anterior.',
    ],
    howWeHelp: [
      { icon: 'lucide:percent', text: 'Conocemos qué bancos financian al 90/95/100% en cada perfil.' },
      { icon: 'lucide:shield', text: 'Tramitamos el aval ICO si calificas (joven, familia con hijos).' },
      { icon: 'lucide:home', text: 'Estudiamos garantía hipotecaria adicional con familiares.' },
      { icon: 'lucide:lightbulb', text: 'Alternativas creativas: hipoteca tasación > compra, préstamo personal complementario.' },
    ],
    process: [
      { step: 1, title: 'Diagnóstico de perfil', description: 'Ingresos, edad, situación familiar, ahorro existente, vivienda objetivo.' },
      { step: 2, title: 'Estrategia de financiación', description: 'Decidimos qué vía usar: 100% banco, 90% + aval ICO, doble garantía, etc.' },
      { step: 3, title: 'Negociación', description: 'Presentamos tu caso a los bancos que financian máximo según tu vía.' },
      { step: 4, title: 'Firma', description: 'Acompañamos hasta notaría.' },
    ],
    forWho: [
      'Tienes ahorrado menos del 20% de la vivienda',
      'Eres joven (<35) o familia con menores (aval ICO)',
      'Tienes ingresos sólidos pero poco ahorro acumulado',
      'Cuentas con familia que puede aportar garantía hipotecaria',
    ],
    faq: [
      {
        q: '¿Realmente hay hipotecas al 100% en 2026?',
        a: 'Sí, pero no para todos los perfiles. Los bancos las dan a perfiles muy solventes (ingresos altos, trabajo estable) o con apoyo público (aval ICO para jóvenes y familias). En BHC vemos rápido si encajas.',
      },
      {
        q: '¿Qué es el aval ICO y cómo funciona?',
        a: 'Es un aval del Estado que cubre hasta el 20% del préstamo. Permite que el banco te financie el 100% (el suyo 80% + aval ICO 20%). Lo gestionamos por ti si calificas.',
      },
      {
        q: '¿Me sale más caro pedir el 100% que el 80%?',
        a: 'Habitualmente sí, en interés (entre 0,1 y 0,5 puntos más). Pero te permite comprar antes y empezar a amortizar antes. Calculamos si compensa en tu caso.',
      },
    ],
  },
  {
    slug: 'hipoteca-no-residentes',
    title: 'Hipoteca para no residentes en Castellón',
    shortTitle: 'No residentes',
    primaryKeyword: 'hipoteca no residentes Castellón',
    metaTitle: 'Hipoteca no residentes Castellón | Mortgage Spain — BHC',
    metaDescription:
      'Hipoteca en España para extranjeros no residentes. Compra tu vivienda en Castellón, Benicàssim u Oropesa. Asesoramiento bilingüe.',
    icon: 'lucide:globe',
    intro:
      'Si vives fuera de España pero quieres comprar vivienda en costa Castellón, los bancos te tratan distinto: financian un porcentaje menor (60-70%), piden más documentación y son más exigentes con el perfil. En BHC trabajamos a diario con compradores británicos, alemanes, belgas, holandeses y franceses.',
    what: [
      'Hipotecas para no residentes en costa Castellón: Benicàssim, Oropesa, Peñíscola, Vinaròs.',
      'Asesoramiento en NIE (Número de Identificación de Extranjero) — necesario para escriturar.',
      'Acompañamiento en apertura de cuenta bancaria española.',
      'Coordinación con asesor fiscal si es necesario (ITP, Impuesto sobre Bienes Inmuebles).',
    ],
    howWeHelp: [
      { icon: 'lucide:globe', text: 'Trabajamos con bancos especializados en clientes internacionales.' },
      { icon: 'lucide:file-text', text: 'Sabemos qué documentación piden y cómo traducirla.' },
      { icon: 'lucide:euro', text: 'Negociamos en euros incluso si cobras en libras/dólares.' },
      { icon: 'lucide:map-pin', text: 'Conocemos el mercado de costa Castellón al detalle.' },
    ],
    process: [
      { step: 1, title: 'Análisis de tu situación', description: 'País de residencia, moneda de ingresos, vivienda objetivo en España.' },
      { step: 2, title: 'Trámites previos', description: 'NIE, cuenta bancaria española, documentación traducida si hace falta.' },
      { step: 3, title: 'Negociación con bancos', description: 'Bancos que financian a no residentes con buenas condiciones.' },
      { step: 4, title: 'Firma en España (o por poder)', description: 'Podemos coordinar firma por poder si no puedes venir.' },
    ],
    forWho: [
      'Vives fuera de España (UE o no UE)',
      'Quieres comprar vivienda en Castellón, principalmente costa',
      'Tienes ingresos demostrables en tu país de residencia',
      'No tienes (o no quieres usar) financiación de tu banco extranjero',
    ],
    faq: [
      {
        q: '¿Cuánto me financia el banco si no soy residente?',
        a: 'Lo habitual son 60-70% del valor de tasación para no residentes de la UE, y 50-60% para no residentes fuera de la UE. Hay excepciones para perfiles muy solventes.',
      },
      {
        q: '¿Qué es el NIE y cómo lo consigo?',
        a: 'NIE = Número de Identificación de Extranjero. Es obligatorio para comprar inmueble en España. Se solicita en consulados españoles en tu país o en comisarías en España. Nosotros te indicamos el proceso paso a paso.',
      },
      {
        q: '¿Puedo firmar sin venir a España?',
        a: 'Sí, mediante poder notarial otorgado en tu país (con apostilla de La Haya si aplica). Coordinamos toda la operación remotamente.',
      },
      {
        q: '¿Atendéis en inglés / otros idiomas?',
        a: 'Sí. Atención principal en castellano e inglés. Para otros idiomas (alemán, francés) facilitamos traductor.',
      },
    ],
  },
  {
    slug: 'hipoteca-autonomos',
    title: 'Hipoteca para autónomos en Castellón',
    shortTitle: 'Autónomos',
    primaryKeyword: 'hipoteca autónomos Castellón',
    metaTitle: 'Hipoteca autónomos Castellón | Sin trabas — BHC Broker',
    metaDescription:
      'Hipoteca para autónomos en Castellón. Los bancos no te lo ponen fácil; nosotros sí. Conocemos qué entidades aceptan tu perfil.',
    icon: 'lucide:briefcase',
    intro:
      'Ser autónomo es la condición laboral que más rechazan los bancos al pedir hipoteca, aunque tus ingresos sean superiores a un asalariado. En BHC sabemos qué entidades sí valoran al autónomo, qué documentación les convence y cómo presentar tu caso para que digan que sí.',
    what: [
      'Hipotecas para autónomos con al menos 2 años de actividad demostrable.',
      'Hipotecas para profesionales del régimen RETA: médicos, abogados, ingenieros, consultores.',
      'Asesoramiento para mejorar tu perfil antes de pedir (gestión de IRPF, módulos vs estimación directa).',
      'Estudiamos también societarios (administrador único de SL).',
    ],
    howWeHelp: [
      { icon: 'lucide:briefcase', text: 'Vamos solo a bancos que aceptan autónomos sin penalizar.' },
      { icon: 'lucide:trending-up', text: 'Sabemos qué cuadros de cuentas convencen al risk de cada banco.' },
      { icon: 'lucide:scale', text: 'Comparamos hipoteca personal vs. como administrador SL — la mejor opción depende del caso.' },
      { icon: 'lucide:file-check', text: 'Preparamos el dossier financiero para que parezca de empleado fijo.' },
    ],
    process: [
      { step: 1, title: 'Auditoría fiscal', description: 'IRPF últimos 2-3 años, modelo 130, vida laboral. Vemos qué muestra el SII al banco.' },
      { step: 2, title: 'Selección de bancos', description: 'Solo bancos friendly con autónomos. Otros directamente no los pisamos.' },
      { step: 3, title: 'Presentación reforzada', description: 'Preparamos memoria de actividad, evolución facturación, cartera de clientes recurrentes.' },
      { step: 4, title: 'Negociación y firma', description: 'Acompañamos hasta el final.' },
    ],
    forWho: [
      'Llevas al menos 2 años como autónomo',
      'Tu IRPF muestra ingresos sólidos (no oculta beneficios)',
      'No tienes deudas con Hacienda ni Seguridad Social',
      'Puedes acreditar facturación regular o clientes recurrentes',
    ],
    faq: [
      {
        q: '¿Cuántos años tengo que llevar de autónomo para que me den hipoteca?',
        a: 'Mínimo 2 años fiscales completos como autónomo. Algunos bancos piden 3. Si tienes menos, conviene esperar o que un cónyuge asalariado sea titular principal.',
      },
      {
        q: '¿Me penaliza tener "pocos beneficios" en el IRPF aunque facture mucho?',
        a: 'Sí. El banco mira beneficio neto en IRPF, no facturación bruta. Si llevas años "minimizando" para pagar menos impuestos, te penaliza ahora. Lo ideal es planificar 2 ejercicios antes de pedir hipoteca.',
      },
      {
        q: '¿Es mejor pedir la hipoteca como persona física o como SL?',
        a: 'Casi siempre como persona física (administrador único de la SL). Las hipotecas a sociedades son más caras y restrictivas. Excepciones: locales comerciales y operaciones de inversión grandes.',
      },
    ],
  },
  {
    slug: 'hipoteca-joven',
    title: 'Hipoteca joven en Castellón (avales ICO + ayudas)',
    shortTitle: 'Hipoteca joven',
    primaryKeyword: 'hipoteca joven Castellón',
    metaTitle: 'Hipoteca joven Castellón | Aval ICO 2026 — BHC',
    metaDescription:
      'Hipoteca para jóvenes <35 en Castellón con aval ICO + ayudas Generalitat Valenciana. Hasta 95-100% financiación. Estudio gratis.',
    icon: 'lucide:sparkles',
    intro:
      'Si tienes menos de 35 años, hay ayudas públicas para comprar tu primera vivienda. El aval ICO te permite financiar hasta el 100% (cubre lo que el banco no financia), y las ayudas de la Generalitat Valenciana pueden cubrir parte del IBI, ITP o gastos de gestión. En BHC tramitamos todo.',
    what: [
      'Aval público ICO para vivienda habitual (cubre hasta el 20% del precio).',
      'Ayudas autonómicas Generalitat Valenciana: bonos jóvenes, ayudas a entrada.',
      'Hipoteca al 95-100% combinando aval ICO + banco.',
      'Asesoramiento sobre límites de renta, edad, ubicación de vivienda elegible.',
    ],
    howWeHelp: [
      { icon: 'lucide:sparkles', text: 'Sabemos qué jóvenes califican para aval ICO y cuáles para ayudas GVA.' },
      { icon: 'lucide:file-text', text: 'Tramitamos toda la documentación de las ayudas por ti.' },
      { icon: 'lucide:calculator', text: 'Calculamos el ahorro real combinando ayudas + mejor hipoteca.' },
      { icon: 'lucide:home', text: 'Te decimos qué viviendas en Castellón califican para qué ayudas (no todas).' },
    ],
    process: [
      { step: 1, title: 'Verificación de elegibilidad', description: 'Edad, ingresos, vivienda objetivo. Vemos qué ayudas aplican.' },
      { step: 2, title: 'Solicitud de ayudas', description: 'Tramitamos aval ICO + bonos GVA en paralelo.' },
      { step: 3, title: 'Hipoteca complementaria', description: 'Negociamos con bancos que aceptan combinar aval ICO.' },
      { step: 4, title: 'Firma con ahorro máximo', description: 'Acompañamos en notaría.' },
    ],
    forWho: [
      'Tienes menos de 35 años (algunas ayudas <40)',
      'Compras tu primera vivienda habitual',
      'Tu renta no supera el límite (suele ser 4-4,5 veces IPREM)',
      'Vivienda objetivo en Castellón cumple criterios de superficie/precio',
    ],
    faq: [
      {
        q: '¿Cuál es el límite de renta para el aval ICO 2026?',
        a: 'Aproximadamente 4,5 veces el IPREM (límite varía cada año, en 2026 está cerca de 37.800€/año individual, 50.000€ en familia). Verificamos tu caso concreto.',
      },
      {
        q: '¿Las ayudas son compatibles con cualquier banco?',
        a: 'No todos los bancos están adheridos al programa de avales ICO. En BHC vamos directos a los que sí.',
      },
      {
        q: '¿Cuánto tarda el aval ICO?',
        a: 'La aprobación del aval ICO suele tardar 2-4 semanas. Si la operación corre prisa, planificamos el calendario al detalle.',
      },
    ],
  },
];
```

- [ ] **Step 3: src/data/locations.ts**

```typescript
// src/data/locations.ts
export interface Location {
  slug: string;
  name: string;
  comarca: string;
  postalCode: string;
  population: number;
  distanceFromOfficeKm: number;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  marketDataM2: number; // €/m² medio
  marketDataYoY: number; // variación % 12 meses
  marketSource: string;
  references: string[]; // landmarks locales
  uniqueText: string;
  faq: { q: string; a: string }[];
}

export const locations: Location[] = [
  {
    slug: 'vila-real',
    name: 'Vila-real',
    comarca: 'Plana Baixa',
    postalCode: '12540',
    population: 51367,
    distanceFromOfficeKm: 8,
    primaryKeyword: 'broker hipotecario Vila-real',
    metaTitle: 'Broker hipotecario Vila-real | BHC — Tu asesor independiente',
    metaDescription:
      'Broker hipotecario en Vila-real. Te conseguimos la mejor hipoteca comparando +30 bancos. Oficina a 8 km en Castellón centro. Estudio gratis.',
    description:
      'Vila-real es la segunda ciudad más poblada de la provincia y tiene mercado inmobiliario propio con dinámica distinta a Castellón ciudad: precio medio más bajo, ritmo de compraventa estable y demanda de jóvenes que trabajan en Castellón pero compran en Vila-real por relación calidad-precio.',
    marketDataM2: 1095,
    marketDataYoY: 4.2,
    marketSource: 'Idealista índice de precios — actualizar trimestralmente',
    references: ['Estadio de la Cerámica', 'Termet', 'Centro histórico', 'Polígono Carinyena'],
    uniqueText:
      'Si vives o quieres comprar en Vila-real, estamos a 8 km de tu casa. No hace falta que vengas a Castellón ciudad — gestionamos toda la operación por WhatsApp, teléfono y email. Solo tendrás que venir a firmar a notaría (o lo hacemos en una notaría de Vila-real si lo prefieres). Conocemos bien el mercado local: el corredor de la N-340, las zonas residenciales del barrio Sant Pasqual, la oferta de obra nueva en el sector Madrigal. Sabemos qué bancos valoran las viviendas de Vila-real con mejor tasación.',
    faq: [
      {
        q: '¿Tenéis oficina en Vila-real?',
        a: 'No, nuestra oficina está en Castellón ciudad (C. Egual 34), a 8 km. Pero gestionamos operaciones de Vila-real con la misma agilidad — solo necesitas venir a firmar.',
      },
      {
        q: '¿Cuál es el precio medio de la vivienda en Vila-real?',
        a: `En 2026 el precio medio en Vila-real ronda los 1.095 €/m², con una variación del +4,2% respecto al año anterior (fuente: Idealista). Más asequible que Castellón ciudad (~1.450 €/m²).`,
      },
    ],
  },
  {
    slug: 'almassora',
    name: 'Almassora',
    comarca: 'Plana Alta',
    postalCode: '12550',
    population: 26194,
    distanceFromOfficeKm: 6,
    primaryKeyword: 'broker hipotecario Almassora',
    metaTitle: 'Broker hipotecario Almassora | BHC — Asesor hipotecario',
    metaDescription:
      'Broker hipotecario en Almassora. Negociamos con +30 bancos para conseguirte la mejor hipoteca. A 6 km de tu casa. Estudio gratuito.',
    description:
      'Almassora combina núcleo histórico, urbanizaciones residenciales y playa. Es un mercado con perfil familiar consolidado y demanda creciente de segundas residencias en la franja de costa.',
    marketDataM2: 1180,
    marketDataYoY: 5.1,
    marketSource: 'Idealista índice de precios — actualizar trimestralmente',
    references: ['Playa de Almassora', 'Riu Millars', 'Centro histórico', 'Urbanización Boqueres'],
    uniqueText:
      'Almassora es uno de los mercados más activos del cinturón de Castellón. Trabajamos tanto viviendas habituales en el núcleo urbano como segundas residencias en la playa. Si compras en zona de playa, conocemos los bancos que mejor valoran tasaciones en costa.',
    faq: [
      {
        q: '¿Cuál es el precio medio en Almassora?',
        a: `En 2026 ronda los 1.180 €/m² de media (Idealista), con variación del +5,1% YoY. La playa puede llegar a 1.500-1.800 €/m² en obra nueva.`,
      },
      {
        q: '¿Financiáis vivienda en la playa de Almassora?',
        a: 'Sí, distinguimos vivienda habitual (más fácil de financiar al 80%) de segunda residencia en la franja de playa (suele financiarse al 70%).',
      },
    ],
  },
  {
    slug: 'benicassim',
    name: 'Benicàssim',
    comarca: 'Plana Alta',
    postalCode: '12560',
    population: 18098,
    distanceFromOfficeKm: 14,
    primaryKeyword: 'broker hipotecario Benicàssim',
    metaTitle: 'Broker hipotecario Benicàssim | BHC — También no residentes',
    metaDescription:
      'Broker hipotecario en Benicàssim. Especialistas en segunda vivienda y no residentes en costa Castellón. Estudio gratuito.',
    description:
      'Benicàssim es el mercado por excelencia de segunda residencia en Castellón: alta presencia de compradores británicos, alemanes y belgas, oferta consolidada en primera línea y planes urbanísticos en zonas como Las Villas y Heliópolis.',
    marketDataM2: 1820,
    marketDataYoY: 6.8,
    marketSource: 'Idealista índice de precios — actualizar trimestralmente',
    references: ['Las Villas', 'Voramar', 'Heliópolis', 'Castillo del Toro Bonete'],
    uniqueText:
      'Benicàssim es donde más operaciones de segunda vivienda y no residentes hacemos. Conocemos las particularidades: tasación en primera línea (los bancos son cautos), hipotecas a clientes UE no residentes, financiación para inversores que alquilan vacacional. Si compras en Benicàssim, somos los que mejor entendemos tu caso.',
    faq: [
      {
        q: '¿Atendéis a no residentes que compran en Benicàssim?',
        a: 'Sí, es una de nuestras especialidades. Atendemos en inglés. Tenemos página específica sobre [hipoteca no residentes](/servicios/hipoteca-no-residentes).',
      },
      {
        q: '¿Cuánto financiaría un banco una vivienda en primera línea de Benicàssim?',
        a: 'Si es vivienda habitual y eres residente: 80%. Si es segunda residencia: 70-75%. Si eres no residente: 60-70%. Tasación en primera línea suele ser conservadora.',
      },
    ],
  },
  {
    slug: 'borriol',
    name: 'Borriol',
    comarca: 'Plana Alta',
    postalCode: '12190',
    population: 5341,
    distanceFromOfficeKm: 5,
    primaryKeyword: 'broker hipotecario Borriol',
    metaTitle: 'Broker hipotecario Borriol | BHC — Asesor hipotecario',
    metaDescription:
      'Broker hipotecario en Borriol. Te conseguimos la mejor hipoteca. A solo 5 km de tu casa en Castellón centro. Estudio gratuito.',
    description:
      'Borriol es un mercado pequeño pero muy específico: predominio de chalets en urbanizaciones (Sant Vicent, Pedrera, Les Forques), precios medios más altos que núcleos urbanos por el tipo de vivienda, y compradores que buscan zona residencial cerca de Castellón ciudad.',
    marketDataM2: 1340,
    marketDataYoY: 3.8,
    marketSource: 'Idealista índice de precios — actualizar trimestralmente',
    references: ['Urbanización Sant Vicent', 'Pedrera', 'Les Forques', 'Centro histórico'],
    uniqueText:
      'Borriol tiene mercado de chalets en urbanización: precios por encima de la media del cinturón, mayor superficie por vivienda, y tasaciones más variables. Trabajamos con bancos que entienden las urbanizaciones de Borriol y dan buena financiación a chalets unifamiliares.',
    faq: [
      {
        q: '¿Financiáis chalets en urbanización en Borriol?',
        a: 'Sí, conocemos bien los proyectos urbanos de Sant Vicent y Pedrera. Sabemos qué bancos tasan mejor los chalets unifamiliares.',
      },
    ],
  },
];
```

- [ ] **Step 4: src/data/faq.ts y src/data/banks.ts**

```typescript
// src/data/faq.ts
export const homeFaq = [
  {
    q: '¿Qué hace un broker hipotecario y por qué necesito uno?',
    a: 'Un broker hipotecario es un intermediario independiente entre tú y los bancos. Negocia por ti con varias entidades para conseguir las mejores condiciones. A diferencia de un comercial de banco, no defiende los intereses de una sola entidad — busca lo mejor para ti.',
  },
  {
    q: '¿Cuánto cuesta el servicio de BHC?',
    a: 'Para ti, 0 €. Los bancos nos retribuyen por traerles operaciones que cumplen sus criterios. Nuestro estudio inicial, asesoramiento, negociación y acompañamiento hasta la firma son completamente gratuitos.',
  },
  {
    q: '¿En qué se diferencia BHC de ir directo al banco?',
    a: 'Cuando vas al banco, te ofrecen su producto. Cuando vienes a nosotros, comparamos más de 30 entidades en paralelo para ofrecerte el mejor. Además, sabemos cuáles aceptan tu perfil y cuáles no — te ahorramos consultas inútiles.',
  },
  {
    q: '¿Cuánto tarda todo el proceso desde que os contacto?',
    a: 'Desde el primer estudio hasta la firma ante notario, lo habitual son 4-8 semanas. Si tu documentación está completa y tu perfil es claro, puede cerrarse en 4 semanas.',
  },
  {
    q: '¿Tenéis oficina física para reuniones?',
    a: 'Sí, en Calle Egual 34, 12002 Castellón de la Plana. Atendemos con cita previa. También trabajamos por WhatsApp, teléfono y email si te resulta más cómodo.',
  },
  {
    q: '¿Trabajáis con todo tipo de perfiles?',
    a: 'Atendemos perfiles muy diversos: primeras viviendas, segundas, autónomos, no residentes, jóvenes con avales ICO. Cada perfil requiere bancos distintos — los conocemos.',
  },
];

// src/data/banks.ts
// Placeholder hasta recibir lista oficial del cliente
export const banks = {
  count: 30,
  names: [
    'BBVA', 'Banco Santander', 'CaixaBank', 'Sabadell', 'Bankinter',
    'ING', 'Openbank', 'EVO Banco', 'MyInvestor', 'Banco Mediolanum',
    'Unicaja', 'Kutxabank', 'Abanca', 'Ibercaja', 'Cajamar',
    // ... a completar cuando cliente proporcione lista oficial
  ],
};
```

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add data files (business, services, locations, faq, banks)"
```

---

### Task 5: Componente Seo.astro (meta tags + Schema)

**Files:**
- Create: `src/components/Seo.astro`

- [ ] **Step 1: Crear src/components/Seo.astro**

```astro
---
// src/components/Seo.astro
import { business } from '../data/business';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: object | object[];
}

const {
  title,
  description,
  canonical,
  ogImage = business.ogImage,
  ogType = 'website',
  noindex = false,
  jsonLd,
} = Astro.props;

const canonicalUrl = canonical
  ? new URL(canonical, business.url).toString()
  : new URL(Astro.url.pathname, business.url).toString();

const ogImageUrl = new URL(ogImage, business.url).toString();
const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
---

<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalUrl} />
{noindex && <meta name="robots" content="noindex, nofollow" />}

<meta property="og:type" content={ogType} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageUrl} />
<meta property="og:locale" content="es_ES" />
<meta property="og:site_name" content={business.name} />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageUrl} />

<meta name="theme-color" content="#2563eb" />
<link rel="preload" href="/fonts/manrope-400.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/manrope-700.woff2" as="font" type="font/woff2" crossorigin />

{jsonLdArray.map((data) => (
  <script type="application/ld+json" set:html={JSON.stringify(data)} />
))}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Seo.astro
git commit -m "feat: add Seo component with meta, OG, Twitter, JSON-LD"
```

---

### Task 6: Logo y Button components

**Files:**
- Create: `src/components/Logo.astro`, `src/components/Button.astro`
- Create: `public/img/logo.svg`, `public/img/logo-mark.svg`, `public/img/og-default.jpg`

- [ ] **Step 1: Crear logo SVG inicial**

`public/img/logo.svg` (logo completo: monograma + wordmark):

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 64" width="280" height="64" role="img" aria-label="BHC Broker Hipotecario Castellón">
  <defs>
    <linearGradient id="bhcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="60" height="60" rx="12" fill="url(#bhcGrad)"/>
  <text x="32" y="44" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="26" font-weight="800" fill="#ffffff" letter-spacing="-0.5">BHC</text>
  <text x="78" y="30" font-family="Manrope, system-ui, sans-serif" font-size="18" font-weight="700" fill="#0f172a">Broker Hipotecario</text>
  <text x="78" y="50" font-family="Manrope, system-ui, sans-serif" font-size="13" font-weight="500" fill="#475569" letter-spacing="2">CASTELLÓN</text>
</svg>
```

`public/img/logo-mark.svg` (solo monograma, para favicon y header móvil):

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="BHC">
  <defs>
    <linearGradient id="bhcMarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="60" height="60" rx="12" fill="url(#bhcMarkGrad)"/>
  <text x="32" y="44" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="26" font-weight="800" fill="#ffffff" letter-spacing="-0.5">BHC</text>
</svg>
```

- [ ] **Step 2: Crear OG image fallback**

`public/img/og-default.jpg` — generar con cualquier tool (Figma, Canva, mockingbot). 1200×630 px. Diseño: fondo `#0a1929`, logo BHC blanco, headline "Broker Hipotecario Castellón", subtítulo "Comparamos +30 bancos por ti". Si no puedes generar imagen ahora, copia un placeholder cualquiera de 1200×630 a esa ruta y reemplaza después.

- [ ] **Step 3: Crear src/components/Logo.astro**

```astro
---
// src/components/Logo.astro
interface Props {
  variant?: 'full' | 'mark';
  class?: string;
}
const { variant = 'full', class: className = '' } = Astro.props;
const src = variant === 'mark' ? '/img/logo-mark.svg' : '/img/logo.svg';
const height = variant === 'mark' ? 36 : 40;
---
<a href="/" aria-label="Inicio · BHC Broker Hipotecario Castellón" class={`inline-flex items-center ${className}`}>
  <img src={src} alt="BHC Broker Hipotecario Castellón" height={height} class="h-9 w-auto md:h-10" />
</a>
```

- [ ] **Step 4: Crear src/components/Button.astro**

```astro
---
// src/components/Button.astro
interface Props {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'ghost' | 'link';
  href?: string;
  type?: 'button' | 'submit';
  class?: string;
  rel?: string;
  target?: string;
  ariaLabel?: string;
}
const {
  variant = 'primary',
  href,
  type = 'button',
  class: className = '',
  rel,
  target,
  ariaLabel,
} = Astro.props;

const base =
  'inline-flex items-center justify-center gap-2 font-semibold text-sm leading-none rounded-md transition-colors duration-150 px-5 py-3 select-none';
const variants: Record<string, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 shadow-sm',
  secondary:
    'bg-white text-primary-700 border border-primary-600 hover:bg-primary-50',
  whatsapp:
    'bg-whatsapp text-white hover:bg-whatsapp-dk',
  ghost:
    'text-text-base hover:bg-bg-soft',
  link:
    'text-primary-600 hover:text-primary-700 underline underline-offset-4 px-0 py-0',
};

const classes = `${base} ${variants[variant]} ${className}`;
const Tag = href ? 'a' : 'button';
---
{href ? (
  <a href={href} class={classes} rel={rel} target={target} aria-label={ariaLabel}>
    <slot />
  </a>
) : (
  <button type={type} class={classes} aria-label={ariaLabel}>
    <slot />
  </button>
)}
```

- [ ] **Step 5: Commit**

```bash
git add public/img/ src/components/Logo.astro src/components/Button.astro
git commit -m "feat: add Logo and Button components + initial SVG logo"
```

---

### Task 6b: Mover y procesar assets del cliente

**Files:** Move 3 files de raíz a `public/img/`, generar poster del video.

- [ ] **Step 1: Mover y renombrar los 3 assets**

```bash
mv "businessman-or-real-estate-agents-holding-house-mo-2026-01-07-00-44-11-utc.webp" public/img/asesor-con-maqueta.webp
mv "team-diversity-women-selling-house-real-estate-age-2026-04-10-15-28-59-utc.webp" public/img/asesoramiento-profesional.webp
mv "metropolis-building-facade-and-aerial-cityscape-of-2025-12-17-21-22-51-utc.webm" public/img/castellon-aerial.webm
```

- [ ] **Step 2: Generar poster JPG del video (frame inicial)**

Necesita ffmpeg instalado. Si no lo tienes:
- Windows: `winget install ffmpeg` o descargar de ffmpeg.org
- macOS: `brew install ffmpeg`

```bash
ffmpeg -i public/img/castellon-aerial.webm -ss 00:00:01.5 -frames:v 1 -q:v 3 public/img/castellon-aerial-poster.jpg
```

Si no puedes ejecutar ffmpeg ahora, crear placeholder temporal:

```bash
# Alternativa: copiar la imagen del businessman como poster temporal
cp public/img/asesor-con-maqueta.webp public/img/castellon-aerial-poster.jpg
```

(El poster real lo puedes regenerar después con ffmpeg cuando esté disponible.)

- [ ] **Step 3: Comprimir el video para web (opcional pero recomendado)**

Si quieres servir un video <8 MB para mejor performance (recomendado), comprimir:

```bash
ffmpeg -i public/img/castellon-aerial.webm \
  -c:v libvpx-vp9 -crf 35 -b:v 0 \
  -vf "scale=1920:-2,fps=24" \
  -an -row-mt 1 \
  public/img/castellon-aerial-optimized.webm

# Si la versión optimizada queda bien, sustituir
mv public/img/castellon-aerial-optimized.webm public/img/castellon-aerial.webm
```

Si no puedes/no quieres comprimir ahora, dejar el original — funcionará pero penaliza algo el LCP en conexiones lentas.

- [ ] **Step 4: Commit**

```bash
git add public/img/
git commit -m "feat: add client-provided assets (aerial video + 2 photos) for hero, sobre, servicios"
```

---

### Task 7: Navigation y Footer

**Files:**
- Create: `src/components/Navigation.astro`, `src/components/Footer.astro`, `src/components/WhatsAppFAB.astro`

- [ ] **Step 1: src/components/Navigation.astro**

```astro
---
// src/components/Navigation.astro
import Logo from './Logo.astro';
import Button from './Button.astro';
import { Icon } from 'astro-icon/components';
import { business } from '../data/business';
import { services } from '../data/services';
import { locations } from '../data/locations';
---

<header class="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-border">
  <a href="#main" class="skip-to-content">Saltar al contenido</a>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 md:h-20">
      <Logo />

      <nav class="hidden lg:flex items-center gap-8 text-sm font-medium" aria-label="Principal">
        <a href="/" class="text-text-base hover:text-primary-600">Inicio</a>

        <div class="relative group">
          <button class="flex items-center gap-1 text-text-base hover:text-primary-600" aria-haspopup="true" aria-expanded="false">
            Servicios
            <Icon name="lucide:chevron-down" class="w-4 h-4" />
          </button>
          <div class="absolute left-0 top-full pt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity">
            <ul class="bg-white border border-border rounded-lg shadow-md py-2 min-w-[260px]">
              {services.map((s) => (
                <li>
                  <a href={`/servicios/${s.slug}`} class="block px-4 py-2 hover:bg-bg-soft text-text-base">
                    {s.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div class="relative group">
          <button class="flex items-center gap-1 text-text-base hover:text-primary-600" aria-haspopup="true">
            Dónde estamos
            <Icon name="lucide:chevron-down" class="w-4 h-4" />
          </button>
          <div class="absolute left-0 top-full pt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity">
            <ul class="bg-white border border-border rounded-lg shadow-md py-2 min-w-[220px]">
              <li>
                <a href="/" class="block px-4 py-2 hover:bg-bg-soft text-text-base font-semibold">
                  Castellón de la Plana
                </a>
              </li>
              {locations.map((l) => (
                <li>
                  <a href={`/broker-hipotecario/${l.slug}`} class="block px-4 py-2 hover:bg-bg-soft text-text-base">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a href="/sobre-bhc" class="text-text-base hover:text-primary-600">Sobre BHC</a>
        <a href="/blog" class="text-text-base hover:text-primary-600">Blog</a>
        <a href="/contacto" class="text-text-base hover:text-primary-600">Contacto</a>
      </nav>

      <div class="flex items-center gap-2">
        <Button
          variant="whatsapp"
          href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`}
          rel="noopener"
          target="_blank"
          ariaLabel="Abrir conversación en WhatsApp"
          class="!px-3 !py-2 !text-xs md:!text-sm md:!px-4 md:!py-2.5"
        >
          <Icon name="lucide:message-circle" class="w-4 h-4" />
          <span class="hidden sm:inline">WhatsApp</span>
        </Button>

        <button
          type="button"
          class="lg:hidden p-2 -mr-2"
          id="mobile-menu-toggle"
          aria-label="Abrir menú"
          aria-expanded="false"
          aria-controls="mobile-menu"
        >
          <Icon name="lucide:menu" class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>

  <div id="mobile-menu" class="lg:hidden hidden border-t border-border bg-white">
    <nav class="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Móvil">
      <a href="/" class="px-3 py-2 rounded hover:bg-bg-soft">Inicio</a>
      <details class="group">
        <summary class="flex items-center justify-between px-3 py-2 rounded hover:bg-bg-soft cursor-pointer list-none">
          Servicios <Icon name="lucide:chevron-down" class="w-4 h-4 group-open:rotate-180 transition-transform" />
        </summary>
        <ul class="pl-3">
          {services.map((s) => (
            <li><a href={`/servicios/${s.slug}`} class="block px-3 py-2 text-sm rounded hover:bg-bg-soft">{s.shortTitle}</a></li>
          ))}
        </ul>
      </details>
      <details class="group">
        <summary class="flex items-center justify-between px-3 py-2 rounded hover:bg-bg-soft cursor-pointer list-none">
          Dónde estamos <Icon name="lucide:chevron-down" class="w-4 h-4 group-open:rotate-180 transition-transform" />
        </summary>
        <ul class="pl-3">
          <li><a href="/" class="block px-3 py-2 text-sm rounded hover:bg-bg-soft font-semibold">Castellón de la Plana</a></li>
          {locations.map((l) => (
            <li><a href={`/broker-hipotecario/${l.slug}`} class="block px-3 py-2 text-sm rounded hover:bg-bg-soft">{l.name}</a></li>
          ))}
        </ul>
      </details>
      <a href="/sobre-bhc" class="px-3 py-2 rounded hover:bg-bg-soft">Sobre BHC</a>
      <a href="/blog" class="px-3 py-2 rounded hover:bg-bg-soft">Blog</a>
      <a href="/contacto" class="px-3 py-2 rounded hover:bg-bg-soft">Contacto</a>
    </nav>
  </div>
</header>

<script>
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu?.classList.toggle('hidden');
  });
</script>
```

- [ ] **Step 2: src/components/Footer.astro**

```astro
---
// src/components/Footer.astro
import { business } from '../data/business';
import { services } from '../data/services';
import { locations } from '../data/locations';

const year = new Date().getFullYear();
---

<footer class="bg-bg-dark text-white mt-24">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
    <div>
      <div class="text-2xl font-extrabold">BHC</div>
      <div class="text-sm text-slate-300 mt-1">Broker Hipotecario Castellón</div>
      <address class="not-italic mt-4 text-sm text-slate-300 leading-relaxed">
        {business.address.street}<br />
        {business.address.postalCode} {business.address.locality}<br />
        {business.address.region}, {business.address.countryName}
      </address>
      <div class="mt-4 text-sm">
        <a href={`tel:${business.phone}`} class="block text-slate-200 hover:text-white">Tel. {business.phoneDisplay}</a>
        <a href={`mailto:${business.email}`} class="block text-slate-200 hover:text-white break-all">{business.email}</a>
      </div>
      <div class="mt-4 text-xs text-slate-400">
        Lunes a Viernes · 09:00 - 19:00
      </div>
    </div>

    <div>
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400">Servicios</h3>
      <ul class="mt-4 space-y-2 text-sm">
        {services.map((s) => (
          <li><a href={`/servicios/${s.slug}`} class="text-slate-300 hover:text-white">{s.shortTitle}</a></li>
        ))}
      </ul>
    </div>

    <div>
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400">Dónde estamos</h3>
      <ul class="mt-4 space-y-2 text-sm">
        <li><a href="/" class="text-slate-300 hover:text-white font-semibold">Castellón de la Plana</a></li>
        {locations.map((l) => (
          <li><a href={`/broker-hipotecario/${l.slug}`} class="text-slate-300 hover:text-white">{l.name}</a></li>
        ))}
      </ul>
    </div>

    <div>
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400">Legal</h3>
      <ul class="mt-4 space-y-2 text-sm">
        <li><a href="/aviso-legal" class="text-slate-300 hover:text-white">Aviso legal</a></li>
        <li><a href="/politica-privacidad" class="text-slate-300 hover:text-white">Política de privacidad</a></li>
        <li><a href="/politica-cookies" class="text-slate-300 hover:text-white">Política de cookies</a></li>
        <li><a href="/sobre-bhc" class="text-slate-300 hover:text-white">Sobre BHC</a></li>
        <li><a href="/contacto" class="text-slate-300 hover:text-white">Contacto</a></li>
      </ul>
      <p class="mt-6 text-xs text-slate-400 leading-relaxed">
        Inscrito en el registro de intermediarios de crédito inmobiliario<br />
        nº {business.registroLey5_2019}
      </p>
    </div>
  </div>

  <div class="border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
      <p>© {year} {business.legalName}. Todos los derechos reservados.</p>
      <p>{business.tagline}</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 3: src/components/WhatsAppFAB.astro**

```astro
---
// src/components/WhatsAppFAB.astro
import { business } from '../data/business';
import { Icon } from 'astro-icon/components';
const waUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`;
---

<a
  href={waUrl}
  target="_blank"
  rel="noopener"
  aria-label="Contactar por WhatsApp"
  class="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-lg hover:bg-whatsapp-dk transition-colors"
>
  <Icon name="lucide:message-circle" class="w-7 h-7" />
</a>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Navigation.astro src/components/Footer.astro src/components/WhatsAppFAB.astro
git commit -m "feat: add Navigation (with dropdowns + mobile menu), Footer (with NAP + legal), WhatsAppFAB"
```

---

### Task 8: Layout.astro (wrapper de todas las páginas)

**Files:**
- Create: `src/layouts/Layout.astro`

- [ ] **Step 1: src/layouts/Layout.astro**

```astro
---
// src/layouts/Layout.astro
import '../styles/global.css';
import Seo from '../components/Seo.astro';
import Navigation from '../components/Navigation.astro';
import Footer from '../components/Footer.astro';
import WhatsAppFAB from '../components/WhatsAppFAB.astro';
import { business } from '../data/business';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: object | object[];
  hideFab?: boolean;
}

const props = Astro.props;

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'FinancialService'],
  '@id': `${business.url}/#localbusiness`,
  name: business.name,
  image: `${business.url}${business.ogImage}`,
  logo: `${business.url}/img/logo.svg`,
  url: business.url,
  telephone: business.phone,
  email: business.email,
  priceRange: 'Gratis',
  description: business.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.locality,
    postalCode: business.address.postalCode,
    addressRegion: business.address.region,
    addressCountry: business.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: business.geo.latitude,
    longitude: business.geo.longitude,
  },
  openingHoursSpecification: business.hoursMachine.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.dayOfWeek,
    opens: h.opens,
    closes: h.closes,
  })),
  areaServed: [
    { '@type': 'City', name: 'Castellón de la Plana' },
    { '@type': 'City', name: 'Vila-real' },
    { '@type': 'City', name: 'Almassora' },
    { '@type': 'City', name: 'Benicàssim' },
    { '@type': 'City', name: 'Borriol' },
  ],
};

const pageJsonLd = props.jsonLd
  ? Array.isArray(props.jsonLd)
    ? [localBusinessSchema, ...props.jsonLd]
    : [localBusinessSchema, props.jsonLd]
  : [localBusinessSchema];
---

<!DOCTYPE html>
<html lang="es-ES">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/img/logo-mark.svg" />
    <Seo
      title={props.title}
      description={props.description}
      canonical={props.canonical}
      ogImage={props.ogImage}
      ogType={props.ogType}
      noindex={props.noindex}
      jsonLd={pageJsonLd}
    />
  </head>
  <body class="min-h-screen flex flex-col">
    <Navigation />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <Footer />
    {!props.hideFab && <WhatsAppFAB />}
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add Layout.astro with global LocalBusiness Schema and shell"
```

---

### Task 9: Páginas legales y robots.txt

**Files:**
- Create: `src/pages/aviso-legal.astro`, `src/pages/politica-privacidad.astro`, `src/pages/politica-cookies.astro`
- Create: `public/robots.txt`

- [ ] **Step 1: public/robots.txt**

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /aviso-legal
Disallow: /politica-privacidad
Disallow: /politica-cookies

Sitemap: https://brokerhipotecariocastellon.es/sitemap-index.xml
```

- [ ] **Step 2: src/pages/aviso-legal.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import { business } from '../data/business';
---

<Layout
  title="Aviso legal | BHC Broker Hipotecario Castellón"
  description="Aviso legal de BHC Broker Hipotecario Castellón."
  noindex={true}
>
  <article class="max-w-3xl mx-auto px-4 md:px-6 py-16 prose prose-slate">
    <h1>Aviso legal</h1>
    <p>
      En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
      Información y Comercio Electrónico (LSSI-CE), se informa de los siguientes datos:
    </p>

    <h2>1. Titular del sitio web</h2>
    <ul>
      <li><strong>Denominación:</strong> {business.legalName}</li>
      <li><strong>Domicilio:</strong> {business.address.street}, {business.address.postalCode} {business.address.locality}, {business.address.region}, España</li>
      <li><strong>Teléfono:</strong> {business.phoneDisplay}</li>
      <li><strong>Email:</strong> {business.email}</li>
      <li><strong>Registro:</strong> Inscrito en el registro de intermediarios de crédito inmobiliario nº {business.registroLey5_2019}, conforme a la Ley 5/2019, de 15 de marzo, reguladora de los contratos de crédito inmobiliario.</li>
    </ul>

    <h2>2. Objeto</h2>
    <p>
      El presente Aviso Legal regula el uso del sitio web {business.url}, propiedad de {business.legalName}.
    </p>
    <p>
      La navegación por este sitio atribuye la condición de usuario e implica la aceptación plena y sin reservas
      de todas y cada una de las disposiciones incluidas en este Aviso Legal.
    </p>

    <h2>3. Servicios</h2>
    <p>
      {business.legalName} actúa como intermediario de crédito inmobiliario, prestando servicios de asesoramiento
      y mediación con entidades financieras conforme a la normativa aplicable.
    </p>

    <h2>4. Propiedad intelectual e industrial</h2>
    <p>
      Todos los contenidos del sitio web (textos, imágenes, logotipos, gráficos, código fuente) son propiedad de
      {business.legalName} o de terceros que han autorizado su uso, y están protegidos por la legislación sobre
      propiedad intelectual e industrial. Queda prohibida la reproducción, distribución, comunicación pública o
      transformación de los mismos sin autorización expresa.
    </p>

    <h2>5. Exención de responsabilidad</h2>
    <p>
      {business.legalName} no se hace responsable de los daños y perjuicios que pudieran derivarse del uso de la
      información contenida en este sitio web o de la interrupción de su funcionamiento. La información sobre
      condiciones financieras tiene carácter orientativo y queda sujeta a las condiciones particulares que cada
      entidad financiera pueda aplicar tras el análisis individual de cada solicitud.
    </p>

    <h2>6. Legislación aplicable</h2>
    <p>
      El presente Aviso Legal se rige por la legislación española. Para la resolución de cualquier controversia
      las partes se someten a los Juzgados y Tribunales de Castellón de la Plana.
    </p>

    <p class="text-sm text-text-muted">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
  </article>
</Layout>
```

- [ ] **Step 3: src/pages/politica-privacidad.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import { business } from '../data/business';
---

<Layout
  title="Política de privacidad | BHC Broker Hipotecario Castellón"
  description="Política de privacidad y protección de datos de BHC."
  noindex={true}
>
  <article class="max-w-3xl mx-auto px-4 md:px-6 py-16 prose prose-slate">
    <h1>Política de privacidad</h1>
    <p>
      En cumplimiento del Reglamento (UE) 2016/679 de Protección de Datos Personales (RGPD) y la Ley Orgánica
      3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), se informa:
    </p>

    <h2>1. Responsable del tratamiento</h2>
    <ul>
      <li><strong>Responsable:</strong> {business.legalName}</li>
      <li><strong>Domicilio:</strong> {business.address.street}, {business.address.postalCode} {business.address.locality}</li>
      <li><strong>Email:</strong> {business.email}</li>
    </ul>

    <h2>2. Finalidad del tratamiento</h2>
    <p>
      Los datos personales que nos proporcione a través del formulario de contacto o por otros medios (WhatsApp,
      teléfono, email) se tratarán para:
    </p>
    <ul>
      <li>Gestionar su solicitud de información o estudio hipotecario.</li>
      <li>Prestar el servicio de intermediación crediticia.</li>
      <li>Mantener comunicaciones relativas al servicio contratado o solicitado.</li>
    </ul>

    <h2>3. Legitimación</h2>
    <p>
      La base legal para el tratamiento de sus datos es el consentimiento prestado al cumplimentar el formulario
      o iniciar el contacto, así como la ejecución de un contrato o medidas precontractuales.
    </p>

    <h2>4. Conservación</h2>
    <p>
      Sus datos se conservarán durante el tiempo necesario para la prestación del servicio y, posteriormente,
      durante los plazos legales aplicables (en particular, los previstos por la normativa financiera y fiscal).
    </p>

    <h2>5. Destinatarios</h2>
    <p>
      Para gestionar su solicitud, sus datos podrán ser comunicados a las entidades financieras con las que
      colaboramos, exclusivamente con la finalidad de obtener las mejores condiciones para usted. No se realizan
      transferencias internacionales de datos.
    </p>

    <h2>6. Derechos</h2>
    <p>
      Tiene derecho a acceder, rectificar, suprimir, oponerse, limitar el tratamiento y a la portabilidad de sus
      datos. Puede ejercer estos derechos enviando un email a <a href={`mailto:${business.email}`}>{business.email}</a> aportando copia de su DNI.
    </p>
    <p>
      Asimismo, tiene derecho a presentar reclamación ante la Agencia Española de Protección de Datos
      (<a href="https://www.aepd.es" rel="external">aepd.es</a>).
    </p>

    <h2>7. Tratamiento por procesadores</h2>
    <p>
      Para el envío del formulario de contacto utilizamos el servicio <strong>Formspree</strong>, que actúa como
      encargado del tratamiento conforme a contrato. Los datos del formulario se transmiten a Formspree y se
      reenvían a nuestro email corporativo.
    </p>

    <p class="text-sm text-text-muted">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
  </article>
</Layout>
```

- [ ] **Step 4: src/pages/politica-cookies.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import { business } from '../data/business';
---

<Layout
  title="Política de cookies | BHC Broker Hipotecario Castellón"
  description="Política de cookies de BHC."
  noindex={true}
>
  <article class="max-w-3xl mx-auto px-4 md:px-6 py-16 prose prose-slate">
    <h1>Política de cookies</h1>

    <h2>¿Utilizamos cookies?</h2>
    <p>
      Este sitio web <strong>NO utiliza cookies de terceros</strong> ni cookies de seguimiento o publicitarias.
      Tampoco usa herramientas de analítica que instalen cookies (no usamos Google Analytics, Facebook Pixel,
      Hotjar ni similares).
    </p>

    <h2>Cookies técnicas</h2>
    <p>
      El sitio puede generar cookies estrictamente técnicas para el funcionamiento básico (por ejemplo, recordar
      preferencias temporales de visualización). Estas cookies están exentas del deber de consentimiento conforme
      al artículo 22.2 de la LSSI-CE.
    </p>

    <h2>Servicios de terceros</h2>
    <p>
      Si utiliza el botón de WhatsApp, será redirigido a la aplicación de WhatsApp (propiedad de Meta Platforms),
      cuyo tratamiento de datos se rige por su propia política. Si pulsa "Abrir en Google Maps", será redirigido
      a Google Maps con su política propia.
    </p>

    <p class="text-sm text-text-muted">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
  </article>
</Layout>
```

- [ ] **Step 5: Verificar dev server**

```bash
npm run dev
```

Visita:
- `http://localhost:4321/aviso-legal`
- `http://localhost:4321/politica-privacidad`
- `http://localhost:4321/politica-cookies`

Confirma que renderizan, header y footer aparecen, y view-source contiene `<meta name="robots" content="noindex, nofollow">`.

- [ ] **Step 6: Commit**

```bash
git add public/robots.txt src/pages/aviso-legal.astro src/pages/politica-privacidad.astro src/pages/politica-cookies.astro
git commit -m "feat: add legal pages (aviso, privacidad, cookies) + robots.txt"
```

---

## Phase 2 — Componentes compartidos + Home (Day 2)

### Task 10: BreadcrumbNav + CtaBand

**Files:** Create `src/components/BreadcrumbNav.astro`, `src/components/CtaBand.astro`

- [ ] **Step 1: src/components/BreadcrumbNav.astro**

```astro
---
import { business } from '../data/business';
import { Icon } from 'astro-icon/components';
interface Crumb { name: string; href?: string; }
interface Props { items: Crumb[]; }
const { items } = Astro.props;
const fullItems = [{ name: 'Inicio', href: '/' }, ...items];
const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: fullItems.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.href ? new URL(item.href, business.url).toString() : undefined,
  })),
};
---
<nav aria-label="Breadcrumb" class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 text-sm">
  <ol class="flex flex-wrap items-center gap-2 text-text-muted">
    {fullItems.map((item, i) => (
      <li class="flex items-center gap-2">
        {i > 0 && <Icon name="lucide:chevron-right" class="w-4 h-4 text-text-soft" />}
        {item.href && i < fullItems.length - 1 ? (
          <a href={item.href} class="hover:text-primary-600">{item.name}</a>
        ) : (
          <span class="text-text-base font-medium">{item.name}</span>
        )}
      </li>
    ))}
  </ol>
</nav>
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

- [ ] **Step 2: src/components/CtaBand.astro**

```astro
---
import Button from './Button.astro';
import { Icon } from 'astro-icon/components';
import { business } from '../data/business';
interface Props { title?: string; subtitle?: string; }
const {
  title = '¿Quieres ahorrar en tu hipoteca?',
  subtitle = 'Estudio gratuito y sin compromiso. Te contestamos en menos de 24 horas.',
} = Astro.props;
const waUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`;
---
<section class="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 text-center">
    <h2 class="text-white max-w-3xl mx-auto">{title}</h2>
    <p class="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">{subtitle}</p>
    <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
      <Button href="/contacto" variant="secondary" class="!bg-white !text-primary-700 hover:!bg-blue-50">Solicitar estudio gratuito</Button>
      <Button href={waUrl} variant="whatsapp" rel="noopener" target="_blank" ariaLabel="WhatsApp">
        <Icon name="lucide:message-circle" class="w-4 h-4" />WhatsApp
      </Button>
      <Button href={`tel:${business.phone}`} variant="ghost" class="!text-white hover:!bg-white/10">
        <Icon name="lucide:phone" class="w-4 h-4" />{business.phoneDisplay}
      </Button>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/BreadcrumbNav.astro src/components/CtaBand.astro
git commit -m "feat: add BreadcrumbNav (with Schema) and CtaBand"
```

---

### Task 11: ContactForm (Formspree)

**Files:** Create `src/components/ContactForm.astro`

- [ ] **Step 1: src/components/ContactForm.astro**

NOTA: Reemplazar `YOUR_FORMSPREE_ID` con el ID real tras dar de alta el form en formspree.io apuntando a `info@brokerhipotecariocastellon.es`.

```astro
---
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID';
interface Props { variant?: 'hero' | 'inline'; title?: string; subtitle?: string; }
const { variant = 'hero', title, subtitle } = Astro.props;
const isHero = variant === 'hero';
---
<form
  action={`https://formspree.io/f/${FORMSPREE_ID}`}
  method="POST"
  class={`w-full ${isHero ? 'bg-white text-text-base rounded-2xl p-6 md:p-8 shadow-card' : 'bg-bg-soft rounded-xl p-6 md:p-8'}`}
>
  {title && <h3 class="text-lg font-bold mb-1">{title}</h3>}
  {subtitle && <p class="text-sm text-text-muted mb-5">{subtitle}</p>}
  <div class="space-y-3">
    <label class="block">
      <span class="text-sm font-medium">Nombre y apellidos *</span>
      <input type="text" name="nombre" required autocomplete="name"
        class="mt-1 block w-full rounded-md border border-border px-3 py-2.5 focus:border-primary-600 focus:outline-none" />
    </label>
    <label class="block">
      <span class="text-sm font-medium">Teléfono *</span>
      <input type="tel" name="telefono" required pattern="[0-9+\s\-]{9,}" autocomplete="tel"
        class="mt-1 block w-full rounded-md border border-border px-3 py-2.5 focus:border-primary-600 focus:outline-none" />
    </label>
    <label class="block">
      <span class="text-sm font-medium">Email</span>
      <input type="email" name="email" autocomplete="email"
        class="mt-1 block w-full rounded-md border border-border px-3 py-2.5 focus:border-primary-600 focus:outline-none" />
    </label>
    <label class="block">
      <span class="text-sm font-medium">Tipo de operación</span>
      <select name="tipo_operacion"
        class="mt-1 block w-full rounded-md border border-border px-3 py-2.5 bg-white focus:border-primary-600 focus:outline-none">
        <option value="">Selecciona…</option>
        <option value="primera_vivienda">Primera vivienda</option>
        <option value="segunda_vivienda">Segunda vivienda</option>
        <option value="subrogacion">Mejorar mi hipoteca actual</option>
        <option value="maxima_financiacion">Máxima financiación</option>
        <option value="no_residente">No residente</option>
        <option value="autonomo">Autónomo</option>
        <option value="otra">Otra</option>
      </select>
    </label>
    <label class="block">
      <span class="text-sm font-medium">Mensaje (opcional)</span>
      <textarea name="mensaje" rows="3"
        class="mt-1 block w-full rounded-md border border-border px-3 py-2.5 focus:border-primary-600 focus:outline-none"></textarea>
    </label>
    <input type="text" name="_gotcha" class="hidden" tabindex="-1" autocomplete="off" />
    <input type="hidden" name="_subject" value="Nuevo lead web BHC" />
    <input type="hidden" name="origen" value={Astro.url.pathname} />
    <label class="flex items-start gap-2 text-xs text-text-muted">
      <input type="checkbox" name="privacidad" required class="mt-1" />
      <span>He leído y acepto la <a href="/politica-privacidad" class="text-primary-600 underline">política de privacidad</a>. *</span>
    </label>
    <button type="submit"
      class="w-full inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-semibold rounded-md px-5 py-3 hover:bg-primary-700">
      Solicitar estudio gratuito →
    </button>
    <p class="text-xs text-text-soft text-center">Respuesta en menos de 24h · Sin compromiso · 0€</p>
  </div>
</form>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactForm.astro
git commit -m "feat: add ContactForm with Formspree + RGPD checkbox"
```

---

### Task 12: Hero + BanksStrip

**Files:** Create `src/components/Hero.astro`, `src/components/BanksStrip.astro`

- [ ] **Step 1: src/components/Hero.astro**

```astro
---
import ContactForm from './ContactForm.astro';
import Button from './Button.astro';
import { Icon } from 'astro-icon/components';
import { business } from '../data/business';
const waUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`;
---
<section class="bg-gradient-to-br from-bg-dark via-primary-900 to-bg-dark text-white relative overflow-hidden">
  <div class="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
    <div class="absolute top-20 right-10 w-96 h-96 rounded-full bg-primary-500 blur-3xl opacity-30"></div>
    <div class="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-primary-700 blur-3xl opacity-40"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
    <div class="lg:col-span-7">
      <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-300 bg-blue-500/10 border border-blue-500/30 rounded-full px-3 py-1">
        <Icon name="lucide:map-pin" class="w-3 h-3" />Castellón de la Plana
      </div>
      <h1 class="mt-5 text-white">Tu broker hipotecario en <span class="text-blue-300">Castellón de la Plana</span></h1>
      <p class="mt-5 text-xl text-blue-100 max-w-2xl">{business.tagline} Comparamos más de 30 bancos por ti para conseguirte la mejor hipoteca.</p>
      <ul class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <li class="flex items-center gap-2 text-blue-100"><Icon name="lucide:check-circle-2" class="w-5 h-5 text-blue-300" />Estudio gratuito</li>
        <li class="flex items-center gap-2 text-blue-100"><Icon name="lucide:check-circle-2" class="w-5 h-5 text-blue-300" />Sin compromiso</li>
        <li class="flex items-center gap-2 text-blue-100"><Icon name="lucide:check-circle-2" class="w-5 h-5 text-blue-300" />Respuesta en 24h</li>
      </ul>
      <div class="mt-8 flex flex-wrap items-center gap-3">
        <Button href={waUrl} variant="whatsapp" rel="noopener" target="_blank" ariaLabel="WhatsApp">
          <Icon name="lucide:message-circle" class="w-4 h-4" />WhatsApp ahora
        </Button>
        <Button href={`tel:${business.phone}`} variant="ghost" class="!text-white !border !border-white/30 hover:!bg-white/10">
          <Icon name="lucide:phone" class="w-4 h-4" />{business.phoneDisplay}
        </Button>
      </div>
    </div>
    <div class="lg:col-span-5">
      <ContactForm variant="hero" title="Solicita tu estudio gratuito" subtitle="Te contestamos en menos de 24 horas." />
    </div>
  </div>
</section>
```

- [ ] **Step 2: src/components/BanksStrip.astro**

```astro
---
import { banks } from '../data/banks';
---
<section class="bg-white border-y border-border">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
    <p class="text-center text-xs font-bold uppercase tracking-widest text-text-muted mb-6">
      Comparamos con más de {banks.count} entidades bancarias
    </p>
    <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-text-soft font-medium text-sm">
      {banks.names.slice(0, 12).map((name) => (
        <span class="opacity-60 hover:opacity-100 transition-opacity">{name}</span>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro src/components/BanksStrip.astro
git commit -m "feat: add Hero (home) and BanksStrip"
```

---

### Task 13: Service/Location cards + grids

**Files:** Create 4 componentes: `ServiceCard.astro`, `ServicesGrid.astro`, `LocationCard.astro`, `LocationsGrid.astro`

- [ ] **Step 1: src/components/ServiceCard.astro**

```astro
---
import { Icon } from 'astro-icon/components';
import type { Service } from '../data/services';
interface Props { service: Service; }
const { service } = Astro.props;
---
<a href={`/servicios/${service.slug}`}
  class="group relative block bg-white border border-border rounded-xl p-6 hover:border-primary-600 hover:shadow-card transition-all">
  <div class="w-12 h-12 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
    <Icon name={service.icon} class="w-6 h-6" />
  </div>
  <h3 class="text-lg font-bold group-hover:text-primary-700">{service.shortTitle}</h3>
  <p class="mt-2 text-sm text-text-muted line-clamp-3">{service.intro}</p>
  <div class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
    Saber más<Icon name="lucide:arrow-right" class="w-4 h-4" />
  </div>
</a>
```

- [ ] **Step 2: src/components/ServicesGrid.astro**

```astro
---
import ServiceCard from './ServiceCard.astro';
import { services } from '../data/services';
interface Props { title?: string; subtitle?: string; excludeSlug?: string; limit?: number; }
const {
  title = 'Nuestros servicios',
  subtitle = 'Cubrimos cualquier situación hipotecaria. Comparamos +30 bancos para encontrar tu mejor opción.',
  excludeSlug, limit,
} = Astro.props;
let list = excludeSlug ? services.filter((s) => s.slug !== excludeSlug) : services;
if (limit) list = list.slice(0, limit);
---
<section class="bg-bg-soft">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
    <div class="text-center max-w-3xl mx-auto">
      <h2>{title}</h2>
      <p class="mt-4 text-lg text-text-muted">{subtitle}</p>
    </div>
    <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {list.map((s) => <ServiceCard service={s} />)}
    </div>
  </div>
</section>
```

- [ ] **Step 3: src/components/LocationCard.astro**

```astro
---
import { Icon } from 'astro-icon/components';
import type { Location } from '../data/locations';
interface Props { location: Location; }
const { location } = Astro.props;
---
<a href={`/broker-hipotecario/${location.slug}`}
  class="group block bg-white border border-border rounded-xl p-6 hover:border-primary-600 hover:shadow-card transition-all">
  <div class="flex items-start justify-between gap-2">
    <div class="flex items-center gap-2 text-primary-600">
      <Icon name="lucide:map-pin" class="w-5 h-5" />
      <span class="text-xs font-bold uppercase tracking-wider">{location.comarca}</span>
    </div>
    <span class="text-xs text-text-soft">{location.distanceFromOfficeKm} km</span>
  </div>
  <h3 class="mt-3 text-xl font-bold group-hover:text-primary-700">{location.name}</h3>
  <p class="mt-2 text-sm text-text-muted">{location.population.toLocaleString('es-ES')} habitantes · {location.marketDataM2.toLocaleString('es-ES')} €/m²</p>
  <div class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
    Broker hipotecario en {location.name}<Icon name="lucide:arrow-right" class="w-4 h-4" />
  </div>
</a>
```

- [ ] **Step 4: src/components/LocationsGrid.astro**

```astro
---
import LocationCard from './LocationCard.astro';
import { locations } from '../data/locations';
interface Props { title?: string; subtitle?: string; excludeSlug?: string; }
const {
  title = 'También te ayudamos en',
  subtitle = 'Trabajamos en Castellón ciudad y en el cinturón cercano. Gestionamos todo por WhatsApp, email y teléfono.',
  excludeSlug,
} = Astro.props;
const list = excludeSlug ? locations.filter((l) => l.slug !== excludeSlug) : locations;
---
<section class="bg-white">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
    <div class="text-center max-w-3xl mx-auto">
      <h2>{title}</h2>
      <p class="mt-4 text-lg text-text-muted">{subtitle}</p>
    </div>
    <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {list.map((l) => <LocationCard location={l} />)}
    </div>
  </div>
</section>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ServiceCard.astro src/components/ServicesGrid.astro src/components/LocationCard.astro src/components/LocationsGrid.astro
git commit -m "feat: add Service and Location card + grid components"
```

---

### Task 14: WhyBHC + Process3Steps + FAQAccordion

**Files:** Create `WhyBHC.astro`, `Process3Steps.astro`, `FAQAccordion.astro`

- [ ] **Step 1: src/components/WhyBHC.astro**

```astro
---
import { Icon } from 'astro-icon/components';
const reasons = [
  { icon: 'lucide:user-check', title: 'Independencia', text: 'No trabajamos para ningún banco en exclusiva. Trabajamos para ti.' },
  { icon: 'lucide:euro', title: 'Ahorro real', text: 'Comparamos +30 entidades para conseguir el menor coste total (TAE).' },
  { icon: 'lucide:shield-check', title: 'Transparencia', text: 'Ves todas las ofertas comparadas. Tú decides con información completa.' },
  { icon: 'lucide:map-pin', title: 'Cercanía local', text: 'Oficina en Castellón centro (C. Egual 34) o por WhatsApp y email.' },
];
---
<section class="bg-white">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
    <div class="text-center max-w-3xl mx-auto">
      <h2>¿Por qué BHC?</h2>
      <p class="mt-4 text-lg text-text-muted">Cuatro razones por las que nuestros clientes nos eligen frente a ir directos al banco.</p>
    </div>
    <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {reasons.map((r) => (
        <div class="text-center">
          <div class="inline-flex w-14 h-14 rounded-full bg-primary-50 text-primary-600 items-center justify-center mb-4">
            <Icon name={r.icon} class="w-7 h-7" />
          </div>
          <h3 class="text-lg font-bold">{r.title}</h3>
          <p class="mt-2 text-sm text-text-muted">{r.text}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: src/components/Process3Steps.astro**

```astro
---
const steps = [
  { n: 1, title: 'Cuéntanos tu caso', text: 'Conversación de 10 minutos por teléfono o WhatsApp. Sin compromiso.' },
  { n: 2, title: 'Negociamos con +30 bancos', text: 'Presentamos tu caso solo a los bancos que mejor encajan.' },
  { n: 3, title: 'Eliges y firmas', text: 'Te traemos 2-3 ofertas reales comparadas. Tú decides. Acompañamos hasta la notaría.' },
];
---
<section class="bg-bg-soft">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
    <div class="text-center max-w-3xl mx-auto">
      <h2>Tu hipoteca lista en 3 pasos</h2>
      <p class="mt-4 text-lg text-text-muted">Sin pisar un banco. Sin esperas innecesarias.</p>
    </div>
    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((s) => (
        <div class="bg-white border border-border rounded-xl p-8">
          <div class="inline-flex w-12 h-12 rounded-full bg-primary-600 text-white items-center justify-center font-bold text-lg mb-4">{s.n}</div>
          <h3 class="text-xl font-bold">{s.title}</h3>
          <p class="mt-2 text-text-muted">{s.text}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: src/components/FAQAccordion.astro**

```astro
---
interface FAQItem { q: string; a: string; }
interface Props { title?: string; subtitle?: string; items: FAQItem[]; emitSchema?: boolean; }
const { title = 'Preguntas frecuentes', subtitle, items, emitSchema = true } = Astro.props;
const schema = emitSchema ? {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
} : null;
---
<section class="bg-white">
  <div class="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-24">
    <div class="text-center">
      <h2>{title}</h2>
      {subtitle && <p class="mt-4 text-lg text-text-muted">{subtitle}</p>}
    </div>
    <div class="mt-10 space-y-3">
      {items.map((item) => (
        <details class="group bg-bg-soft border border-border rounded-lg">
          <summary class="flex items-start justify-between gap-4 cursor-pointer p-5 list-none">
            <span class="font-semibold">{item.q}</span>
            <span class="text-primary-600 mt-1 transition-transform group-open:rotate-45">+</span>
          </summary>
          <div class="px-5 pb-5 text-text-muted leading-relaxed" set:html={item.a} />
        </details>
      ))}
    </div>
  </div>
</section>
{schema && <script type="application/ld+json" set:html={JSON.stringify(schema)} />}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/WhyBHC.astro src/components/Process3Steps.astro src/components/FAQAccordion.astro
git commit -m "feat: add WhyBHC, Process3Steps, FAQAccordion (Schema FAQPage)"
```

---

### Task 15: Ensamblar home (index.astro)

**Files:** Modify `src/pages/index.astro`

- [ ] **Step 1: Reemplazar src/pages/index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import BanksStrip from '../components/BanksStrip.astro';
import ServicesGrid from '../components/ServicesGrid.astro';
import WhyBHC from '../components/WhyBHC.astro';
import Process3Steps from '../components/Process3Steps.astro';
import LocationsGrid from '../components/LocationsGrid.astro';
import FAQAccordion from '../components/FAQAccordion.astro';
import CtaBand from '../components/CtaBand.astro';
import { homeFaq } from '../data/faq';
---
<Layout
  title="Broker hipotecario Castellón | BHC — Comparamos +30 bancos por ti"
  description="Tu broker hipotecario en Castellón de la Plana. Comparamos más de 30 bancos para conseguirte la mejor hipoteca. Estudio gratuito y sin compromiso."
  ogType="website"
>
  <Hero />
  <BanksStrip />
  <ServicesGrid />
  <WhyBHC />
  <Process3Steps />
  <LocationsGrid />
  <FAQAccordion items={homeFaq} subtitle="Las dudas más comunes antes de empezar." />
  <CtaBand />
</Layout>
```

- [ ] **Step 2: Verificar en dev** — `npm run dev`, abrir `http://localhost:4321`. Comprobar hero+form, servicios grid (7), localidades grid (4), FAQ accordion, CTA. View Source debe contener Schema `LocalBusiness` + `FAQPage`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: build home page with all sections"
```

---

## Phase 3 — Páginas de Servicio (Day 3-4)

### Task 16: HeroInterior + RelatedItems

**Files:** Create `HeroInterior.astro`, `RelatedItems.astro`

- [ ] **Step 1: src/components/HeroInterior.astro**

```astro
---
import Button from './Button.astro';
import { Icon } from 'astro-icon/components';
import { business } from '../data/business';
interface Props { title: string; subtitle?: string; eyebrow?: string; }
const { title, subtitle, eyebrow = 'BROKER HIPOTECARIO · CASTELLÓN' } = Astro.props;
const waUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`;
---
<section class="bg-gradient-to-br from-bg-soft via-white to-bg-soft border-b border-border">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
    <div class="max-w-3xl">
      <div class="text-xs font-bold uppercase tracking-widest text-primary-600">{eyebrow}</div>
      <h1 class="mt-3">{title}</h1>
      {subtitle && <p class="mt-4 text-lg text-text-muted">{subtitle}</p>}
      <div class="mt-7 flex flex-wrap items-center gap-3">
        <Button href="#estudio-gratuito" variant="primary">Solicitar estudio gratuito</Button>
        <Button href={waUrl} variant="whatsapp" rel="noopener" target="_blank" ariaLabel="WhatsApp">
          <Icon name="lucide:message-circle" class="w-4 h-4" />WhatsApp
        </Button>
        <Button href={`tel:${business.phone}`} variant="ghost">
          <Icon name="lucide:phone" class="w-4 h-4" />{business.phoneDisplay}
        </Button>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: src/components/RelatedItems.astro**

```astro
---
import ServiceCard from './ServiceCard.astro';
import { services } from '../data/services';
interface Props { excludeSlug: string; limit?: number; title?: string; }
const { excludeSlug, limit = 3, title = 'Otros servicios relacionados' } = Astro.props;
const list = services.filter((s) => s.slug !== excludeSlug).slice(0, limit);
---
<section class="bg-bg-soft">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
    <h2 class="text-center">{title}</h2>
    <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
      {list.map((s) => <ServiceCard service={s} />)}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroInterior.astro src/components/RelatedItems.astro
git commit -m "feat: add HeroInterior and RelatedItems components"
```

---

### Task 17: Dynamic service pages (1 template → 7 páginas)

**Files:** Create `src/pages/servicios/[slug].astro`, `src/pages/servicios/index.astro`

Esta tarea usa `getStaticPaths` para generar las 7 páginas de servicio desde el array `services`. Cada página renderiza el contenido específico del servicio + breadcrumbs + Schema Service + FAQ + relacionados.

- [ ] **Step 1: src/pages/servicios/[slug].astro**

```astro
---
import Layout from '../../layouts/Layout.astro';
import HeroInterior from '../../components/HeroInterior.astro';
import BreadcrumbNav from '../../components/BreadcrumbNav.astro';
import FAQAccordion from '../../components/FAQAccordion.astro';
import RelatedItems from '../../components/RelatedItems.astro';
import CtaBand from '../../components/CtaBand.astro';
import ContactForm from '../../components/ContactForm.astro';
import { Icon } from 'astro-icon/components';
import { services } from '../../data/services';
import { business } from '../../data/business';

export async function getStaticPaths() {
  return services.map((s) => ({ params: { slug: s.slug }, props: { service: s } }));
}

const { service } = Astro.props;

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  serviceType: service.shortTitle,
  provider: { '@id': `${business.url}/#localbusiness` },
  areaServed: [
    { '@type': 'City', name: 'Castellón de la Plana' },
    { '@type': 'City', name: 'Vila-real' },
    { '@type': 'City', name: 'Almassora' },
    { '@type': 'City', name: 'Benicàssim' },
    { '@type': 'City', name: 'Borriol' },
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    description: 'Estudio gratuito sin compromiso',
  },
};
---

<Layout
  title={service.metaTitle}
  description={service.metaDescription}
  jsonLd={serviceSchema}
>
  <BreadcrumbNav items={[
    { name: 'Servicios', href: '/servicios' },
    { name: service.shortTitle },
  ]} />

  <HeroInterior title={service.title} subtitle={service.intro} />

  <section class="bg-white">
    <div class="max-w-3xl mx-auto px-4 md:px-6 py-16 prose prose-slate">
      <h2>¿Qué es {service.shortTitle.toLowerCase()}?</h2>
      {service.what.map((p) => <p>{p}</p>)}
    </div>
  </section>

  <section class="bg-bg-soft">
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
      <h2 class="text-center max-w-3xl mx-auto">Cómo te ayudamos</h2>
      <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        {service.howWeHelp.map((item) => (
          <div class="bg-white border border-border rounded-xl p-6 flex gap-4">
            <div class="shrink-0 w-12 h-12 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
              <Icon name={item.icon} class="w-6 h-6" />
            </div>
            <p class="text-text-base font-medium leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section class="bg-white">
    <div class="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-20">
      <h2 class="text-center">Cómo funciona el proceso</h2>
      <ol class="mt-12 space-y-6">
        {service.process.map((step) => (
          <li class="flex gap-5">
            <div class="shrink-0 w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
              {step.step}
            </div>
            <div>
              <h3 class="text-lg font-bold">{step.title}</h3>
              <p class="mt-1 text-text-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>

  <section class="bg-bg-soft">
    <div class="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-20">
      <h2 class="text-center">¿Para quién es este servicio?</h2>
      <ul class="mt-10 max-w-2xl mx-auto space-y-3">
        {service.forWho.map((item) => (
          <li class="flex items-start gap-3 bg-white rounded-lg border border-border p-4">
            <Icon name="lucide:check-circle-2" class="w-5 h-5 text-success shrink-0 mt-0.5" />
            <span class="text-text-base">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>

  <div id="estudio-gratuito" class="bg-white">
    <div class="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-20">
      <h2 class="text-center">¿Empezamos con tu caso?</h2>
      <p class="text-center text-text-muted mt-3">Completa el formulario y te contestamos en menos de 24h. Sin compromiso.</p>
      <div class="mt-8">
        <ContactForm variant="inline" />
      </div>
    </div>
  </div>

  <FAQAccordion items={service.faq} title={`Preguntas frecuentes sobre ${service.shortTitle.toLowerCase()}`} />
  <RelatedItems excludeSlug={service.slug} />
  <CtaBand />
</Layout>
```

- [ ] **Step 2: src/pages/servicios/index.astro**

```astro
---
import Layout from '../../layouts/Layout.astro';
import BreadcrumbNav from '../../components/BreadcrumbNav.astro';
import HeroInterior from '../../components/HeroInterior.astro';
import ServicesGrid from '../../components/ServicesGrid.astro';
import CtaBand from '../../components/CtaBand.astro';
---
<Layout
  title="Servicios | BHC Broker Hipotecario Castellón"
  description="Todos los servicios hipotecarios que ofrecemos en Castellón: primera vivienda, segunda, subrogación, máxima financiación, no residentes, autónomos y joven."
>
  <BreadcrumbNav items={[{ name: 'Servicios' }]} />
  <HeroInterior
    title="Nuestros servicios"
    subtitle="Cubrimos cualquier situación hipotecaria. Comparamos más de 30 bancos para encontrar la mejor opción para tu caso concreto."
  />
  <ServicesGrid title="" subtitle="" />
  <CtaBand />
</Layout>
```

- [ ] **Step 3: Verificar en dev**

```bash
npm run dev
```

Visitar las 7 URLs:
- `http://localhost:4321/servicios`
- `http://localhost:4321/servicios/hipoteca-primera-vivienda`
- `http://localhost:4321/servicios/hipoteca-segunda-vivienda`
- `http://localhost:4321/servicios/subrogacion-hipotecaria`
- `http://localhost:4321/servicios/maxima-financiacion`
- `http://localhost:4321/servicios/hipoteca-no-residentes`
- `http://localhost:4321/servicios/hipoteca-autonomos`
- `http://localhost:4321/servicios/hipoteca-joven`

Cada página debe mostrar contenido único, breadcrumbs, FAQ específica, y view-source contener Schema `Service` + `FAQPage` + `BreadcrumbList`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/servicios/
git commit -m "feat: add 7 service pages via dynamic template + services index"
```

---

## Phase 4 — Páginas de Localidad (Day 5)

### Task 18: Dynamic location pages (1 template → 4 páginas)

**Files:** Create `src/pages/broker-hipotecario/[slug].astro`, `src/pages/broker-hipotecario/index.astro`

- [ ] **Step 1: src/pages/broker-hipotecario/[slug].astro**

```astro
---
import Layout from '../../layouts/Layout.astro';
import HeroInterior from '../../components/HeroInterior.astro';
import BreadcrumbNav from '../../components/BreadcrumbNav.astro';
import FAQAccordion from '../../components/FAQAccordion.astro';
import ServicesGrid from '../../components/ServicesGrid.astro';
import CtaBand from '../../components/CtaBand.astro';
import ContactForm from '../../components/ContactForm.astro';
import { Icon } from 'astro-icon/components';
import { locations } from '../../data/locations';
import { business } from '../../data/business';

export async function getStaticPaths() {
  return locations.map((l) => ({ params: { slug: l.slug }, props: { location: l } }));
}

const { location } = Astro.props;
const mapsUrl = `https://www.google.com/maps/dir/${location.name}+${location.postalCode}/${encodeURIComponent(`${business.address.street}, ${business.address.postalCode} ${business.address.locality}`)}`;
---

<Layout
  title={location.metaTitle}
  description={location.metaDescription}
>
  <BreadcrumbNav items={[
    { name: 'Dónde estamos', href: '/broker-hipotecario' },
    { name: location.name },
  ]} />

  <HeroInterior
    eyebrow={`${location.comarca.toUpperCase()} · ${location.distanceFromOfficeKm} KM DE NUESTRA OFICINA`}
    title={`Broker hipotecario en ${location.name}`}
    subtitle={location.description}
  />

  <section class="bg-white">
    <div class="max-w-5xl mx-auto px-4 md:px-6 py-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-bg-soft rounded-lg">
          <div class="text-xs uppercase tracking-wide text-text-soft">Habitantes</div>
          <div class="text-2xl font-bold text-text-base mt-1">{location.population.toLocaleString('es-ES')}</div>
        </div>
        <div class="text-center p-4 bg-bg-soft rounded-lg">
          <div class="text-xs uppercase tracking-wide text-text-soft">Precio medio €/m²</div>
          <div class="text-2xl font-bold text-text-base mt-1">{location.marketDataM2.toLocaleString('es-ES')}</div>
        </div>
        <div class="text-center p-4 bg-bg-soft rounded-lg">
          <div class="text-xs uppercase tracking-wide text-text-soft">Variación 12m</div>
          <div class="text-2xl font-bold text-success mt-1">+{location.marketDataYoY}%</div>
        </div>
        <div class="text-center p-4 bg-bg-soft rounded-lg">
          <div class="text-xs uppercase tracking-wide text-text-soft">Distancia oficina</div>
          <div class="text-2xl font-bold text-text-base mt-1">{location.distanceFromOfficeKm} km</div>
        </div>
      </div>
      <p class="text-xs text-text-soft mt-3 text-center">Fuente: {location.marketSource}.</p>
    </div>
  </section>

  <section class="bg-white">
    <div class="max-w-3xl mx-auto px-4 md:px-6 py-16 prose prose-slate">
      <h2>Tu broker hipotecario en {location.name}</h2>
      <p>{location.uniqueText}</p>
      <h3>Zonas y referencias de {location.name} que conocemos</h3>
      <ul>
        {location.references.map((r) => <li>{r}</li>)}
      </ul>
    </div>
  </section>

  <ServicesGrid
    title={`Servicios disponibles para ${location.name}`}
    subtitle="Todos nuestros servicios cubren completamente tu zona. Sin distinción por localidad."
  />

  <section class="bg-bg-soft">
    <div class="max-w-5xl mx-auto px-4 md:px-6 py-16">
      <h2 class="text-center">Cómo llegar a nuestra oficina</h2>
      <p class="text-center text-text-muted mt-3 max-w-2xl mx-auto">
        Estamos en {business.address.street}, {business.address.postalCode} {business.address.locality}, a solo {location.distanceFromOfficeKm} km desde {location.name}.
        Aunque también gestionamos todo por WhatsApp y email — solo necesitas venir a firmar.
      </p>
      <div class="mt-8 flex justify-center">
        <a href={mapsUrl} target="_blank" rel="noopener"
          class="inline-flex items-center gap-2 bg-primary-600 text-white font-semibold rounded-md px-6 py-3 hover:bg-primary-700">
          <Icon name="lucide:map" class="w-5 h-5" />
          Cómo llegar desde {location.name}
        </a>
      </div>
    </div>
  </section>

  <div class="bg-white">
    <div class="max-w-3xl mx-auto px-4 md:px-6 py-16">
      <h2 class="text-center">Pide tu estudio gratuito</h2>
      <p class="text-center text-text-muted mt-3">Vivas donde vivas en el cinturón de Castellón, gestionamos sin que tengas que desplazarte.</p>
      <div class="mt-8">
        <ContactForm variant="inline" />
      </div>
    </div>
  </div>

  <FAQAccordion items={location.faq} title={`Preguntas frecuentes — ${location.name}`} />
  <CtaBand />
</Layout>
```

- [ ] **Step 2: src/pages/broker-hipotecario/index.astro**

```astro
---
import Layout from '../../layouts/Layout.astro';
import BreadcrumbNav from '../../components/BreadcrumbNav.astro';
import HeroInterior from '../../components/HeroInterior.astro';
import LocationsGrid from '../../components/LocationsGrid.astro';
import CtaBand from '../../components/CtaBand.astro';
---
<Layout
  title="Dónde estamos | BHC Broker Hipotecario en Castellón y cinturón"
  description="BHC trabaja en Castellón de la Plana y cinturón cercano: Vila-real, Almassora, Benicàssim, Borriol. Estudio gratuito de hipoteca sin desplazarte."
>
  <BreadcrumbNav items={[{ name: 'Dónde estamos' }]} />
  <HeroInterior
    title="Dónde trabajamos"
    subtitle="Castellón de la Plana ciudad y cinturón cercano. Gestionamos por WhatsApp, email y teléfono — solo necesitas venir a firmar."
  />
  <LocationsGrid title="" subtitle="" />
  <CtaBand />
</Layout>
```

- [ ] **Step 3: Verificar en dev**

```bash
npm run dev
```

Visitar las 5 URLs:
- `http://localhost:4321/broker-hipotecario`
- `http://localhost:4321/broker-hipotecario/vila-real`
- `http://localhost:4321/broker-hipotecario/almassora`
- `http://localhost:4321/broker-hipotecario/benicassim`
- `http://localhost:4321/broker-hipotecario/borriol`

Cada localidad debe tener contenido único (uniqueText, references, marketData, faq local).

- [ ] **Step 4: Commit**

```bash
git add src/pages/broker-hipotecario/
git commit -m "feat: add 4 location pages via dynamic template + locations index"
```

---

## Phase 5 — Sobre + Contacto + Blog + Decap CMS (Day 6)

### Task 19: Página Sobre BHC

**Files:** Create `src/pages/sobre-bhc.astro`

- [ ] **Step 1: src/pages/sobre-bhc.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import BreadcrumbNav from '../components/BreadcrumbNav.astro';
import HeroInterior from '../components/HeroInterior.astro';
import CtaBand from '../components/CtaBand.astro';
import WhyBHC from '../components/WhyBHC.astro';
import { Icon } from 'astro-icon/components';
---
<Layout
  title="Sobre BHC | Broker Hipotecario independiente en Castellón"
  description="Conoce a BHC, tu broker hipotecario independiente en Castellón. Trabajamos para ti, no para los bancos. Estudio gratuito y acompañamiento hasta la firma."
>
  <BreadcrumbNav items={[{ name: 'Sobre BHC' }]} />

  <HeroInterior
    title="Sobre BHC"
    subtitle="No somos un banco. No somos un comercial. Somos tu intermediario independiente en Castellón."
  />

  <section class="bg-white">
    <div class="max-w-3xl mx-auto px-4 md:px-6 py-16 prose prose-slate">
      <h2>Quiénes somos</h2>
      <p>
        BHC | Broker Hipotecario Castellón nace para resolver un problema concreto: <strong>cuando vas a pedir una hipoteca,
        ir banco por banco es agotador, lento y al final no sabes si te están dando la mejor oferta del mercado o solo la que les
        interesa colocarte a ti</strong>.
      </p>
      <p>
        Como broker independiente, nuestro trabajo es el inverso: tú nos cuentas tu caso una sola vez, y nosotros llevamos tu
        operación a las entidades que mejor encajan con tu perfil. Recibimos varias ofertas, las comparamos contigo y tú decides
        con información completa.
      </p>

      <h2>Nuestra forma de trabajar</h2>
      <p>
        Trabajamos con más de 30 entidades bancarias activas en el mercado español. No tenemos contratos de exclusividad con
        ninguna. Eso significa que <strong>no tenemos incentivo para llevarte a un banco concreto</strong>; nuestro incentivo
        coincide con el tuyo: cerrar la operación con las mejores condiciones posibles.
      </p>
      <p>
        Nuestro servicio para ti es <strong>gratuito</strong>. Los bancos nos retribuyen por traerles operaciones que cumplen
        sus criterios — pero esa retribución es independiente del interés que te dan a ti. Si un banco nos paga más pero te
        ofrece peor condición, no te lo vamos a recomendar.
      </p>

      <h2>Broker independiente vs. ir directo al banco</h2>
      <p>
        Cuando vas a una sucursal bancaria, te ofrecen <strong>su</strong> producto. No el mejor del mercado. Y tampoco te
        dicen los productos vinculados que podrías evitarte (seguros, planes de pensiones, tarjetas) que disparan el coste real
        de la hipoteca.
      </p>
      <p>
        Cuando vienes a BHC, vemos toda la foto: varias ofertas comparadas, sus letras pequeñas, sus vinculaciones, y la TAE real.
        El proceso es el mismo en duración (4-8 semanas), pero terminas firmando una hipoteca que te ahorra años de intereses.
      </p>

      <h2>Nuestro compromiso</h2>
      <ul>
        <li><strong>Transparencia total:</strong> ves todas las ofertas que recibimos, sin filtrar.</li>
        <li><strong>Sin coste para ti:</strong> nuestro servicio es gratuito. Los bancos nos retribuyen.</li>
        <li><strong>Sin compromiso:</strong> el estudio inicial es gratis y no genera ninguna obligación.</li>
        <li><strong>Acompañamiento hasta la firma:</strong> revisamos contrato, te avisamos de cláusulas a vigilar y vamos contigo a notaría.</li>
        <li><strong>Datos protegidos:</strong> tu información solo se comparte con las entidades necesarias para tu operación, conforme al RGPD.</li>
      </ul>

      <h2>Inscritos en el registro oficial</h2>
      <p>
        BHC | Broker Hipotecario Castellón está inscrito en el registro de intermediarios de crédito inmobiliario conforme a la
        <strong>Ley 5/2019</strong>, de 15 de marzo, reguladora de los contratos de crédito inmobiliario. Esta inscripción es
        obligatoria para poder operar como broker hipotecario en España y es tu garantía de que trabajamos bajo supervisión de la
        autoridad competente.
      </p>
    </div>
  </section>

  <WhyBHC />
  <CtaBand />
</Layout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/sobre-bhc.astro
git commit -m "feat: add Sobre BHC institutional page"
```

---

### Task 20: StaticMap + Contacto page

**Files:** Create `src/components/StaticMap.astro`, `src/pages/contacto.astro`

**NOTA:** El asset `public/img/oficina-map.webp` (screenshot de Google Maps de C. Egual 34, 12002 Castellón) debe generarse aparte. Mientras tanto, el componente puede usar un placeholder solid color o una imagen genérica de OpenStreetMap export. El cliente debería tomar la captura cuando tenga la ficha GBP creada.

- [ ] **Step 1: Crear imagen placeholder**

Crear `public/img/oficina-map.webp` como placeholder gris 1200×500 hasta tener la imagen real:

```bash
# Opción rápida: imagen SVG inline (sin descargas)
# Crea un archivo SVG temporal en public/img/oficina-map.svg con un mapa-ish
```

Crear `public/img/oficina-map.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500" width="1200" height="500">
  <rect width="1200" height="500" fill="#e8eef5"/>
  <g stroke="#cbd5e1" stroke-width="2" fill="none">
    <line x1="0" y1="160" x2="1200" y2="160"/>
    <line x1="0" y1="320" x2="1200" y2="320"/>
    <line x1="300" y1="0" x2="300" y2="500"/>
    <line x1="700" y1="0" x2="700" y2="500"/>
    <line x1="950" y1="0" x2="950" y2="500"/>
  </g>
  <circle cx="600" cy="250" r="20" fill="#dc2626"/>
  <circle cx="600" cy="250" r="8" fill="#fff"/>
  <text x="600" y="200" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="18" font-weight="700" fill="#0f172a">
    BHC · C. Egual, 34
  </text>
  <text x="600" y="295" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-size="14" fill="#475569">
    Castellón de la Plana
  </text>
  <text x="1180" y="490" text-anchor="end" font-family="Manrope, system-ui, sans-serif" font-size="11" fill="#94a3b8">
    Placeholder — sustituir por screenshot real
  </text>
</svg>
```

- [ ] **Step 2: src/components/StaticMap.astro**

```astro
---
import { Icon } from 'astro-icon/components';
import { business } from '../data/business';
const fullAddress = `${business.address.street}, ${business.address.postalCode} ${business.address.locality}`;
const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;
---
<section class="bg-bg-soft">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
    <div class="bg-white rounded-2xl overflow-hidden border border-border shadow-card">
      <a href={mapsSearchUrl} target="_blank" rel="noopener" class="block group">
        <img
          src="/img/oficina-map.svg"
          alt={`Mapa de ubicación de BHC en ${fullAddress}`}
          class="w-full h-72 md:h-96 object-cover"
          loading="lazy"
        />
      </a>
      <div class="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div class="text-xs font-bold uppercase tracking-widest text-primary-600">Oficina BHC</div>
          <p class="mt-1 font-semibold text-text-base">{fullAddress}</p>
          <p class="text-sm text-text-muted">Lunes a Viernes · 09:00 - 19:00</p>
        </div>
        <div class="flex gap-2">
          <a href={mapsSearchUrl} target="_blank" rel="noopener"
            class="inline-flex items-center gap-2 bg-white border border-primary-600 text-primary-700 font-semibold rounded-md px-5 py-2.5 hover:bg-primary-50">
            <Icon name="lucide:map-pin" class="w-4 h-4" />Ver en Maps
          </a>
          <a href={mapsDirUrl} target="_blank" rel="noopener"
            class="inline-flex items-center gap-2 bg-primary-600 text-white font-semibold rounded-md px-5 py-2.5 hover:bg-primary-700">
            <Icon name="lucide:navigation" class="w-4 h-4" />Cómo llegar
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: src/pages/contacto.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import BreadcrumbNav from '../components/BreadcrumbNav.astro';
import HeroInterior from '../components/HeroInterior.astro';
import ContactForm from '../components/ContactForm.astro';
import StaticMap from '../components/StaticMap.astro';
import FAQAccordion from '../components/FAQAccordion.astro';
import { Icon } from 'astro-icon/components';
import { business } from '../data/business';
const waUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`;
const contactoFaq = [
  { q: '¿Tiene algún coste consultaros?', a: 'No. El estudio inicial, la negociación y todo nuestro asesoramiento son completamente gratuitos. Los bancos nos retribuyen por traerles operaciones.' },
  { q: '¿Cuánto tardáis en contestar?', a: 'Menos de 24 horas, normalmente en el mismo día si nos contactas por WhatsApp o teléfono en horario de oficina.' },
  { q: '¿Tengo que ir a vuestra oficina?', a: 'Solo si quieres. Trabajamos por WhatsApp, teléfono, email y videollamada. La oficina está disponible con cita previa.' },
  { q: '¿Trabajáis solo en Castellón ciudad?', a: 'Trabajamos en Castellón de la Plana y todo el cinturón: Vila-real, Almassora, Benicàssim, Borriol y cualquier localidad cercana. También atendemos no residentes en la costa.' },
];
---
<Layout title="Contacto | BHC Broker Hipotecario Castellón" description="Contacta con BHC en Castellón. Teléfono, WhatsApp, email o visítanos en C. Egual 34. Estudio gratuito de hipoteca en 24h.">
  <BreadcrumbNav items={[{ name: 'Contacto' }]} />
  <HeroInterior title="Contacta con BHC" subtitle="Tres formas de llegar a nosotros. La más rápida: WhatsApp." />

  <section class="bg-white">
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div class="lg:col-span-5">
        <h2 class="text-2xl">Tres canales</h2>

        <a href={waUrl} target="_blank" rel="noopener"
          class="mt-6 flex items-start gap-4 p-5 bg-bg-soft hover:bg-primary-50 border border-border rounded-xl transition-colors">
          <div class="w-12 h-12 rounded-lg bg-whatsapp text-white flex items-center justify-center shrink-0">
            <Icon name="lucide:message-circle" class="w-6 h-6" />
          </div>
          <div>
            <div class="font-bold">WhatsApp</div>
            <div class="text-sm text-text-muted mt-1">La forma más rápida. Respuesta &lt; 1h en horario.</div>
            <div class="text-sm font-medium text-primary-600 mt-1">Abrir conversación →</div>
          </div>
        </a>

        <a href={`tel:${business.phone}`}
          class="mt-3 flex items-start gap-4 p-5 bg-bg-soft hover:bg-primary-50 border border-border rounded-xl transition-colors">
          <div class="w-12 h-12 rounded-lg bg-primary-600 text-white flex items-center justify-center shrink-0">
            <Icon name="lucide:phone" class="w-6 h-6" />
          </div>
          <div>
            <div class="font-bold">Teléfono</div>
            <div class="text-sm text-text-muted mt-1">Atención directa en horario de oficina.</div>
            <div class="text-sm font-medium text-primary-600 mt-1">{business.phoneDisplay}</div>
          </div>
        </a>

        <a href={`mailto:${business.email}`}
          class="mt-3 flex items-start gap-4 p-5 bg-bg-soft hover:bg-primary-50 border border-border rounded-xl transition-colors">
          <div class="w-12 h-12 rounded-lg bg-text-base text-white flex items-center justify-center shrink-0">
            <Icon name="lucide:mail" class="w-6 h-6" />
          </div>
          <div>
            <div class="font-bold">Email</div>
            <div class="text-sm text-text-muted mt-1">Para documentación o consultas largas.</div>
            <div class="text-sm font-medium text-primary-600 mt-1 break-all">{business.email}</div>
          </div>
        </a>

        <div class="mt-8 p-5 bg-primary-50 border border-primary-100 rounded-xl">
          <div class="flex items-center gap-2 text-primary-700 font-bold">
            <Icon name="lucide:clock" class="w-5 h-5" />Horario
          </div>
          <p class="mt-2 text-sm text-text-base">Lunes a Viernes · 09:00 - 19:00</p>
          <p class="mt-1 text-sm text-text-muted">Sábados con cita previa.</p>
        </div>
      </div>

      <div class="lg:col-span-7">
        <ContactForm variant="hero" title="O escríbenos por aquí" subtitle="Te contestamos en menos de 24 horas (normalmente, el mismo día)." />
      </div>
    </div>
  </section>

  <StaticMap />
  <FAQAccordion items={contactoFaq} title="Preguntas frecuentes — contacto" />
</Layout>
```

- [ ] **Step 4: Commit**

```bash
git add public/img/oficina-map.svg src/components/StaticMap.astro src/pages/contacto.astro
git commit -m "feat: add StaticMap component + Contacto page with NAP and form"
```

---

### Task 21: Blog setup (content collection + páginas)

**Files:** Create `src/content/config.ts`, `src/content/blog/ejemplo-subrogacion.md`, `src/pages/blog/index.astro`, `src/pages/blog/[...slug].astro`, `src/components/BlogCard.astro`

- [ ] **Step 1: src/content/config.ts**

```typescript
import { defineCollection, z } from 'astro:content';
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    image: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});
export const collections = { blog };
```

- [ ] **Step 2: src/content/blog/ejemplo-subrogacion.md**

```markdown
---
title: "Subrogación hipotecaria: cuándo merece la pena en 2026"
description: "Guía completa sobre la subrogación de hipoteca. Cuándo te ahorra dinero, cuánto cuesta, cómo se tramita y qué errores evitar."
pubDate: 2026-05-11
category: "subrogacion"
image: "/img/og-default.jpg"
---

La subrogación hipotecaria es uno de esos términos financieros que suena complicado pero significa algo muy concreto: **cambiar tu hipoteca de un banco a otro** porque otro banco te ofrece mejores condiciones.

## ¿Cuándo merece la pena subrogar?

Hay un cálculo simple para saber si te conviene:

1. **Mira el interés de tu hipoteca actual** (TAE) en tu última factura.
2. **Compáralo con lo que un banco te ofrece hoy.**
3. Si la diferencia es de **más de 0,5 puntos** y te quedan **al menos 10 años**, casi seguro merece la pena.

## ¿Cuánto cuesta?

Por ley, los costes de subrogación están limitados:

- **Tasación**: ~300€. Algunos bancos la cubren.
- **Comisión por subrogación** (tu banco actual): máximo **0,5%** los primeros 5 años, **0,25%** entre el 5º y 10º, y **0,15%** a partir del 10º (en hipotecas variables).
- **Gastos de notaría y registro**: a menudo los asume el banco nuevo como gancho.

## Pasos del proceso

1. **Compara tu hipoteca con el mercado actual.** Lo hacemos gratis en BHC.
2. **Conseguimos una oferta vinculante de otro banco.**
3. **Tu banco actual tiene 15 días para igualar la oferta.** Si la iguala, sigues con él (más barato para ti, no hay coste de subrogación).
4. **Si no la iguala, ejecutamos la subrogación.** Firmamos en notaría y a partir de ahí pagas al banco nuevo.

## Errores comunes que conviene evitar

- **No pedir oferta vinculante por escrito**: sin esa oferta, tu banco actual no tiene presión para igualar.
- **Olvidar los productos vinculados**: seguros y planes pueden encarecer mucho la hipoteca aunque el interés sea bajo.
- **No revisar la TAE, solo el nominal**: la TAE incluye todos los costes. Es la cifra que de verdad importa.

## ¿Quieres saber si tu caso merece la pena?

Si tu hipoteca tiene un interés superior al 3% y te quedan más de 10 años, lo más probable es que estés pagando de más. [Pide tu estudio gratuito](/contacto) — calculamos cuánto puedes ahorrar antes de tomar ninguna decisión.
```

- [ ] **Step 3: src/components/BlogCard.astro**

```astro
---
import { Icon } from 'astro-icon/components';
interface Props {
  post: {
    slug: string;
    data: {
      title: string;
      description: string;
      pubDate: Date;
      category: string;
      image?: string;
    };
  };
}
const { post } = Astro.props;
const dateFmt = post.data.pubDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
---
<a href={`/blog/${post.slug}`}
  class="group block bg-white border border-border rounded-xl overflow-hidden hover:border-primary-600 hover:shadow-card transition-all">
  {post.data.image && (
    <div class="aspect-video bg-bg-soft">
      <img src={post.data.image} alt={post.data.title} class="w-full h-full object-cover" loading="lazy" />
    </div>
  )}
  <div class="p-6">
    <div class="flex items-center gap-2 text-xs text-text-soft">
      <span class="bg-primary-50 text-primary-700 px-2 py-0.5 rounded font-medium">{post.data.category}</span>
      <span>·</span>
      <time>{dateFmt}</time>
    </div>
    <h3 class="mt-3 text-lg font-bold group-hover:text-primary-700">{post.data.title}</h3>
    <p class="mt-2 text-sm text-text-muted line-clamp-3">{post.data.description}</p>
    <div class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
      Leer artículo<Icon name="lucide:arrow-right" class="w-4 h-4" />
    </div>
  </div>
</a>
```

- [ ] **Step 4: src/pages/blog/index.astro**

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import BreadcrumbNav from '../../components/BreadcrumbNav.astro';
import HeroInterior from '../../components/HeroInterior.astro';
import BlogCard from '../../components/BlogCard.astro';
import CtaBand from '../../components/CtaBand.astro';

const allPosts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---
<Layout
  title="Blog hipotecario | BHC Broker Hipotecario Castellón"
  description="Artículos y guías sobre hipotecas, subrogación, financiación y mercado inmobiliario en Castellón. Información práctica para tomar mejores decisiones."
>
  <BreadcrumbNav items={[{ name: 'Blog' }]} />
  <HeroInterior
    title="Blog hipotecario"
    subtitle="Artículos prácticos para entender mejor cómo funcionan las hipotecas, qué te conviene y cómo ahorrar."
  />
  <section class="bg-bg-soft">
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
      {allPosts.length === 0 ? (
        <p class="text-center text-text-muted">Próximamente publicaremos los primeros artículos.</p>
      ) : (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.map((post) => <BlogCard post={post} />)}
        </div>
      )}
    </div>
  </section>
  <CtaBand />
</Layout>
```

- [ ] **Step 5: src/pages/blog/[...slug].astro**

```astro
---
import { getCollection, type CollectionEntry } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import BreadcrumbNav from '../../components/BreadcrumbNav.astro';
import CtaBand from '../../components/CtaBand.astro';
import { business } from '../../data/business';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.slug }, props: { post } }));
}

interface Props { post: CollectionEntry<'blog'>; }
const { post } = Astro.props;
const { Content } = await post.render();
const dateFmt = post.data.pubDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.data.title,
  description: post.data.description,
  datePublished: post.data.pubDate.toISOString(),
  dateModified: (post.data.updatedDate ?? post.data.pubDate).toISOString(),
  author: { '@type': 'Organization', name: business.name },
  publisher: { '@id': `${business.url}/#localbusiness` },
  mainEntityOfPage: `${business.url}/blog/${post.slug}`,
  image: post.data.image ? `${business.url}${post.data.image}` : `${business.url}${business.ogImage}`,
};
---
<Layout
  title={`${post.data.title} | BHC Blog`}
  description={post.data.description}
  ogType="article"
  ogImage={post.data.image}
  jsonLd={articleSchema}
>
  <BreadcrumbNav items={[
    { name: 'Blog', href: '/blog' },
    { name: post.data.title },
  ]} />

  <article class="bg-white">
    <div class="max-w-3xl mx-auto px-4 md:px-6 pt-8 pb-16">
      <div class="text-xs text-text-muted">
        <span class="bg-primary-50 text-primary-700 px-2 py-0.5 rounded font-medium">{post.data.category}</span>
        <span class="mx-2">·</span>
        <time>{dateFmt}</time>
        <span class="mx-2">·</span>
        BHC
      </div>
      <h1 class="mt-4">{post.data.title}</h1>
      <p class="mt-3 text-lg text-text-muted">{post.data.description}</p>

      {post.data.image && (
        <div class="mt-8 aspect-video bg-bg-soft rounded-xl overflow-hidden">
          <img src={post.data.image} alt={post.data.title} class="w-full h-full object-cover" />
        </div>
      )}

      <div class="mt-10 prose prose-slate prose-lg max-w-none">
        <Content />
      </div>
    </div>
  </article>

  <CtaBand title="¿Necesitas ayuda con tu hipoteca?" subtitle="Estudio gratuito de tu caso real, en menos de 24h." />
</Layout>
```

- [ ] **Step 6: Verificar y commit**

```bash
npm run dev
```

Visitar `http://localhost:4321/blog` y `http://localhost:4321/blog/ejemplo-subrogacion`. Verificar:
- Index muestra el post
- Post renderiza markdown
- View-source contiene Schema Article + BreadcrumbList

```bash
git add src/content/ src/pages/blog/ src/components/BlogCard.astro
git commit -m "feat: add blog content collection + index + post template + example post"
```

---

### Task 22: Decap CMS / Sveltia CMS setup

**Files:** Create `public/admin/index.html`, `public/admin/config.yml`

NOTA: Usamos **Sveltia CMS** (drop-in replacement de Decap) por compatibilidad nativa con Vercel + OAuth GitHub. Si el cliente prefiere Decap puro, cambiar el `<script>` por la URL de Decap y configurar OAuth provider serverless.

- [ ] **Step 1: public/admin/index.html**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>BHC CMS</title>
  <link rel="stylesheet" href="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.css" />
</head>
<body>
  <script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
</body>
</html>
```

- [ ] **Step 2: public/admin/config.yml**

```yaml
backend:
  name: github
  repo: USUARIO/REPO          # cambiar por usuario/repo real de GitHub
  branch: main
  base_url: https://api.netlify.com   # Sveltia OAuth o serverless propio
  auth_endpoint: auth

publish_mode: simple
media_folder: public/img/blog
public_folder: /img/blog

collections:
  - name: blog
    label: Blog
    folder: src/content/blog
    create: true
    slug: '{{slug}}'
    extension: md
    format: yaml-frontmatter
    fields:
      - { label: Título, name: title, widget: string }
      - { label: Descripción meta, name: description, widget: text, pattern: ['.{50,160}', 'Entre 50 y 160 caracteres'] }
      - { label: Categoría, name: category, widget: select, options: ['hipoteca-general','subrogacion','primera-vivienda','autonomos','no-residentes','jovenes','mercado-castellon'] }
      - { label: Fecha publicación, name: pubDate, widget: datetime, format: 'YYYY-MM-DD', date_format: 'YYYY-MM-DD', time_format: false }
      - { label: Fecha actualización, name: updatedDate, widget: datetime, format: 'YYYY-MM-DD', date_format: 'YYYY-MM-DD', time_format: false, required: false }
      - { label: Imagen destacada, name: image, widget: image, required: false }
      - { label: Borrador, name: draft, widget: boolean, default: false, required: false }
      - { label: Contenido, name: body, widget: markdown }
```

- [ ] **Step 3: Documentar requisitos en docs/CMS_SETUP.md**

```markdown
# Setup del CMS (Sveltia / Decap)

## Pasos para activar /admin

1. **Subir repo a GitHub** (`USUARIO/REPO`).
2. **Editar `public/admin/config.yml`** y reemplazar `USUARIO/REPO` con el path real del repo.
3. **Configurar OAuth de GitHub para Sveltia CMS:**
   - Opción A (recomendada): usar [Sveltia CMS Auth para Cloudflare Workers](https://github.com/sveltia/sveltia-cms-auth) — 5 min de setup.
   - Opción B: deployar un endpoint OAuth serverless propio en `/api/auth` de Vercel.
4. **Probar acceso** en `https://tudominio.es/admin`.
5. Login con cuenta GitHub que tenga permisos en el repo.

## Crear posts del blog

- Login en `/admin` → New Blog → rellenar campos → Save → Publish.
- Cada Publish hace commit a `main` y Vercel redeploya automáticamente en ~30 segundos.
```

- [ ] **Step 4: Commit**

```bash
git add public/admin/ docs/CMS_SETUP.md
git commit -m "feat: add Sveltia CMS admin + config + setup docs"
```

---

## Phase 6 — SEO Audit + Deploy (Day 7)

### Task 23: vercel.json + build verification

**Files:** Create `vercel.json`

- [ ] **Step 1: vercel.json**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "trailingSlash": false,
  "headers": [
    {
      "source": "/fonts/(.*).woff2",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/img/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

- [ ] **Step 2: Build local**

```bash
npm run build
```

Esperado: build sin errores. Carpeta `dist/` con HTML para todas las páginas.

- [ ] **Step 3: Preview local**

```bash
npm run preview
```

Abrir `http://localhost:4321` y comprobar que TODAS las páginas funcionan (no solo dev).

- [ ] **Step 4: Commit**

```bash
git add vercel.json
git commit -m "chore: add vercel.json with cache headers and security headers"
```

---

### Task 24: Auditoría SEO técnica

Esta tarea es una checklist de verificación, no de código nuevo.

- [ ] **Step 1: Lighthouse audit**

Con el preview corriendo (`npm run preview`):

```bash
npx lighthouse http://localhost:4321/ --view --preset=desktop --output html --output-path ./.lighthouse-home.html
npx lighthouse http://localhost:4321/servicios/hipoteca-primera-vivienda --view --preset=mobile --output html --output-path ./.lighthouse-service.html
npx lighthouse http://localhost:4321/broker-hipotecario/vila-real --view --preset=mobile --output html --output-path ./.lighthouse-location.html
```

Objetivos: Performance ≥ 95, SEO ≥ 100, Accessibility ≥ 95, Best Practices ≥ 100.

Si alguna falla, ir a fix antes de continuar.

- [ ] **Step 2: Validar Schemas en Rich Results Test**

Para cada plantilla, pegar HTML rendered (`view-source`) en https://search.google.com/test/rich-results:
- Home → debe detectar `LocalBusiness/FinancialService`, `FAQPage`
- Service page → `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`
- Location page → `LocalBusiness`, `FAQPage`, `BreadcrumbList`
- Blog post → `LocalBusiness`, `Article`, `BreadcrumbList`

Anotar warnings y corregir si son críticos.

- [ ] **Step 3: Validar HTML W3C**

Para home + 1 servicio + 1 ubicación, ejecutar https://validator.w3.org/nu/ con `view-source`. Corregir errores (warnings de Astro como `is:inline` son aceptables).

- [ ] **Step 4: Checklist accesibilidad manual**

- Navegar SOLO con teclado (Tab + Shift+Tab) en home → ¿todos los focusables son accesibles? ¿Focus ring visible?
- Comprobar `<html lang="es-ES">` correcto.
- Verificar contraste en herramientas DevTools → todos AA.
- Skip-to-content funciona al pulsar Tab al cargar.

- [ ] **Step 5: Checklist SEO meta**

Para cada plantilla, en `view-source`:
- [ ] `<title>` único + < 60 chars
- [ ] `<meta name="description">` único + < 160 chars
- [ ] `<link rel="canonical">` presente y correcto
- [ ] OG tags presentes (`og:title`, `og:description`, `og:image`, `og:url`)
- [ ] Twitter Card tags
- [ ] Un único `<h1>` por página
- [ ] Imágenes con alt no vacío
- [ ] Páginas legales con `<meta name="robots" content="noindex, nofollow">`

- [ ] **Step 6: Commit cualquier fix**

```bash
git add -A
git commit -m "fix: SEO audit corrections (if any)"
```

---

### Task 25: Deploy a Vercel

- [ ] **Step 1: Crear repo en GitHub**

En https://github.com/new → nombre `bhc-castellon` (o el que prefieras) → private/public según preferencia → NO inicializar con README.

```bash
git remote add origin https://github.com/USUARIO/bhc-castellon.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Importar a Vercel**

1. https://vercel.com/new → import the repo.
2. Framework Preset: **Astro** (auto-detectado).
3. Build Command: `npm run build` (default).
4. Output: `dist` (default).
5. Environment variables: ninguna por ahora.
6. Deploy.

- [ ] **Step 3: Verificar preview deploy**

URL `https://bhc-castellon-XXX.vercel.app` operativa. Probar:
- Home, 1 servicio, 1 ubicación, sobre, contacto, blog, 1 legal
- View-source en producción para confirmar Schema markup
- Lighthouse en URL real (no localhost) — móvil

- [ ] **Step 4: Configurar dominio (cuando el cliente lo compre)**

En Vercel → project → Settings → Domains → Add `brokerhipotecariocastellon.es` y `www.brokerhipotecariocastellon.es`.

Configurar DNS:
- A record `@` → IP que Vercel indique
- CNAME `www` → `cname.vercel-dns.com`

SSL automático en ~5 minutos.

- [ ] **Step 5: Sin commit (deploy)**

Push automático sigue activo (cada `git push` a main → deploy).

---

### Task 26: Documento "Próximos pasos del cliente"

**Files:** Create `docs/NEXT_STEPS_CLIENTE.md`

- [ ] **Step 1: docs/NEXT_STEPS_CLIENTE.md**

```markdown
# BHC — Próximos pasos del cliente tras el lanzamiento

Esta guía cubre todo lo que tienes que hacer TÚ (BHC) post-deploy para activar el sitio en buscadores y Maps.

## 1. Comprar dominio brokerhipotecariocastellon.es (si no está comprado)

- Registrador recomendado: dondominio.com, namecheap, o Cloudflare Registrar.
- Coste: ~12€/año.
- Una vez comprado, avísanos para configurar DNS hacia Vercel.

## 2. Crear ficha Google Business Profile

1. Ve a https://business.google.com
2. Reclama / crea ficha con dirección **Calle Egual, 34, 12002 Castellón de la Plana**.
3. **Categoría primaria**: Corredor hipotecario (Mortgage Broker).
4. **Categorías secundarias**: Asesor financiero, Servicio financiero.
5. **Solicita verificación por video** (más rápida que tarjeta postal, ~24-48h).
6. Una vez verificada:
   - Foto de perfil = logo BHC
   - Foto de portada = foto exterior de oficina (o de momento la del logo)
   - Sube mínimo 5 fotos (interior, exterior, equipo trabajando)
   - Añade los 7 servicios uno a uno (descripción + precio "Gratis")
   - Configura horario: Lunes a Viernes 09:00-19:00
   - Activa atributos: cita previa, accesibilidad si aplica

## 3. Citations / directorios locales (post-launch, primer mes)

Dar de alta el negocio en (NAP idéntico al de la web):

- Páginas Amarillas (paginasamarillas.es)
- Yelp España (yelp.es)
- eRecomendable (erecomendable.com)
- GuíaLocal (guialocal.es)
- PYME World
- Cámara de Comercio Castellón
- LinkedIn Company Page

**Nombre exacto**: `BHC | Broker Hipotecario Castellón`
**Dirección exacta**: `Calle Egual, 34, 12002 Castellón de la Plana, Castellón, España`
**Teléfono exacto**: `864 87 21 86`

## 4. Search Console + sitemap

1. https://search.google.com/search-console/
2. Añadir propiedad → "Domain" → `brokerhipotecariocastellon.es`
3. Verificar con DNS TXT record (Vercel facilita esto).
4. En Sitemaps → enviar `https://brokerhipotecariocastellon.es/sitemap-index.xml`
5. En URL inspection → para home, /servicios/hipoteca-primera-vivienda, /broker-hipotecario/vila-real → "Request indexing"

## 5. Estrategia de reseñas (crítico para Maps)

Los primeros 5-10 reviews son los más difíciles, pero clave para ranking en Maps:

1. **Email post-firma**: cuando cierres una operación, envía email con link directo a tu Maps review URL (la consigues en GBP → Reseñas → Compartir).
2. **Tarjeta NFC en oficina**: encarga una con link review (~30€).
3. **Pide a familiares/conocidos** que conozcan tu trabajo que dejen una reseña honesta.
4. **Responde a TODAS las reseñas** en menos de 48h.

**Objetivo trimestre 1**: 10 reseñas con 4.5+ estrellas.

## 6. Activar WhatsApp Business

1. Instala WhatsApp Business en el teléfono con el número que usaremos en la web.
2. Configura horario, mensaje de bienvenida, etiquetas.
3. **Asegúrate de que el número del WhatsApp coincide exactamente con el que está en la web** (864 87 21 86).

## 7. Activar email corporativo

1. En tu hosting de dominio, crea `info@brokerhipotecariocastellon.es`.
2. Configura Formspree → ve a formspree.io, da de alta el form con destino `info@brokerhipotecariocastellon.es`.
3. Una vez tengas el ID de Formspree (formato `xpzkxxxxx`), avísanos para sustituirlo en `src/components/ContactForm.astro` (línea 3: `FORMSPREE_ID`).

## 8. Nº registro Ley 5/2019 al footer

Avísanos con tu nº de inscripción como intermediario de crédito inmobiliario para sustituir el placeholder en el footer.

## 9. Lista oficial de bancos para el "Comparamos con +30 bancos"

Pásanos la lista oficial de bancos con los que trabajáis para sustituir el placeholder en `src/data/banks.ts`.

## 10. Foto de la oficina exterior (cuando puedas)

Sube las fotos a `public/img/` para usarlas en hero contacto, GBP, y secciones del sitio.

## 11. Plan editorial del blog

Para mantener el SEO informacional, publica **1-2 posts al mes**. Ideas iniciales:

- "Cuándo subrogar tu hipoteca y cuándo no merece la pena"
- "Diferencias entre hipoteca fija, variable y mixta en 2026"
- "Avales ICO 2026: qué son y quién puede pedirlos"
- "Comprar segunda vivienda en Benicàssim: lo que debes saber"
- "Hipoteca para no residentes en España: guía británica"
- "Errores al comparar hipotecas: TAE vs interés nominal"

Publica desde `tudominio.es/admin` (Sveltia CMS).
```

- [ ] **Step 2: Commit**

```bash
git add docs/NEXT_STEPS_CLIENTE.md
git commit -m "docs: add NEXT_STEPS_CLIENTE.md with post-launch client tasks"
```

---

## Self-Review

**Spec coverage check** (cada sección del spec mapeada a tasks):

| Spec section | Cubierto en task |
|---|---|
| 1. Resumen ejecutivo | Tasks 1-2 (stack setup) |
| 2.1 Sitemap | Tasks 15, 17, 18, 19, 20, 21 (cubren las 14 páginas) |
| 2.2 Keyword map | Aplicado en data files (Task 4) — cada service y location tiene primaryKeyword |
| 2.3 Anti-canibalización | Aplicado en data files + arquitectura (Castellón ciudad = home, subrogación unificada) |
| 2.4 Navegación | Task 7 (Navigation + Footer) |
| 3.1 Paleta | Task 2 (Tailwind tokens) |
| 3.2 Tipografía | Tasks 2-3 (Manrope self-hosted) |
| 3.3 Layout | Aplicado en Layout.astro (Task 8) y componentes |
| 3.4 Componentes | Tasks 5-14, 16, 20 |
| 3.5 Iconografía | Task 1 (astro-icon + lucide) |
| 3.6 Imágenes | Aplicado en BlogCard (Task 21) — `<img loading="lazy">` con dimensiones |
| 3.7 Accesibilidad | Aplicado transversal: skip-to-content (CSS Task 2), aria-labels, focus rings, semántica HTML |
| 4. Templates | Tasks 15, 17, 18, 19, 20, 21 |
| 5.1 SEO técnico | Task 2 (astro config), Task 5 (Seo component), Task 24 (audit) |
| 5.2 JSON-LD Schemas | Layout (LocalBusiness), BreadcrumbNav (BreadcrumbList), FAQAccordion (FAQPage), dynamic service page (Service), blog post (Article) |
| 5.3 sitemap.xml + robots.txt + RSS | Task 2 (sitemap integration), Task 9 (robots.txt). **GAP: RSS no incluido en el plan.** → ADD Task 21b para RSS. |
| 5.4 SEO local — GBP, citations, reviews | Task 26 (NEXT_STEPS_CLIENTE.md) |
| 5.5 Indexación | Task 26 (Search Console steps) |
| 6. Plan implementación 7 días | Phases 1-6 |
| 7. Assets requeridos | Mapeado en Task 26 y nota en Task 11 (FORMSPREE_ID), Task 22 (registro Ley 5/2019), Task 4 (banks placeholder) |
| 8. Fuera de scope | Respetado — no se introduce simulador, agenda, i18n, analytics, banner cookies |

**Gap fix:** añado RSS al plan ahora.

### Task 21b: Añadir RSS feed (gap fix)

**Files:** Modify `astro.config.mjs`, create `src/pages/rss.xml.js`

- [ ] **Step 1: Instalar dep**

```bash
npm install @astrojs/rss
```

- [ ] **Step 2: Crear src/pages/rss.xml.js**

```javascript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { business } from '../data/business';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return rss({
    title: `${business.name} — Blog`,
    description: 'Artículos y guías sobre hipotecas en Castellón.',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.slug}`,
      })),
    customData: `<language>es-ES</language>`,
  });
}
```

- [ ] **Step 3: Añadir link al RSS en `<head>` del Layout**

En `src/layouts/Layout.astro` dentro del `<head>`, añadir:

```html
<link rel="alternate" type="application/rss+xml" title="Blog BHC" href="/rss.xml" />
```

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs package.json package-lock.json src/pages/rss.xml.js src/layouts/Layout.astro
git commit -m "feat: add RSS feed for blog"
```

---

**Placeholder scan:** ✅ Sin placeholders TBD/TODO en el plan. Únicas marcas legítimas: `YOUR_FORMSPREE_ID` (asset pendiente del cliente), `USUARIO/REPO` (asset pendiente del cliente), `PENDIENTE` registro Ley 5/2019 (asset pendiente del cliente). Todas con instrucciones claras de sustitución.

**Type consistency:** ✅ Interfaces `Service` y `Location` se definen en `data/services.ts` y `data/locations.ts` y se importan correctamente en cards y dynamic pages.

**Scope check:** ✅ El plan cubre exactamente el sprint de 1 semana del spec. No introduce subsistemas independientes que requieran spec aparte.

---

## Resumen

- **26 tasks (+ 1 fix Task 21b)** distribuidas en 6 phases
- **Phase 1 — Foundation** (Tasks 1-9): proyecto + Tailwind + data files + componentes base + páginas legales + robots.txt
- **Phase 2 — Componentes + Home** (Tasks 10-15): breadcrumb, CTA, form, hero, banks, cards, grids, FAQ, home
- **Phase 3 — Servicios** (Tasks 16-17): hero interior + 7 páginas dinámicas
- **Phase 4 — Ubicaciones** (Task 18): 4 páginas dinámicas
- **Phase 5 — Sobre + Contacto + Blog + CMS** (Tasks 19-22, 21b): páginas restantes + Sveltia CMS + RSS
- **Phase 6 — SEO Audit + Deploy** (Tasks 23-26): vercel.json, auditoría, deploy, docs cliente

**Cada task termina con commit.** Estimación realista: 26-30 commits totales.

---
