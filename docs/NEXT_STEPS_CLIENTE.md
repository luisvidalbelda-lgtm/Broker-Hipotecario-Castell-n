# BHC — Próximos pasos del cliente tras el lanzamiento

Esta guía cubre todo lo que tienes que hacer **TÚ (BHC)** post-deploy para activar el sitio en buscadores y Maps.

---

## 1. Comprar dominio `brokerhipotecariocastellon.es`

- Registrador recomendado: **dondominio.com**, **namecheap**, o **Cloudflare Registrar**.
- Coste: ~12 €/año.
- Una vez comprado, configurar DNS hacia Vercel:
  - Registro **A** `@` → IP que Vercel indique en su panel
  - Registro **CNAME** `www` → `cname.vercel-dns.com`
- SSL automático en ~5 min tras configurar DNS.

---

## 2. Crear ficha Google Business Profile (GBP)

1. Ve a https://business.google.com
2. Reclama / crea ficha con dirección **Calle Egual, 34, 12002 Castellón de la Plana**.
3. **Categoría primaria**: Corredor hipotecario (Mortgage Broker).
4. **Categorías secundarias**: Asesor financiero, Servicio financiero.
5. **Solicita verificación por video** (más rápida que tarjeta postal, ~24-48h).
6. Una vez verificada:
   - Foto de perfil = logo BHC (`public/img/logo-mark.svg`)
   - Foto de portada = foto exterior de oficina
   - Sube mínimo 5 fotos (interior, exterior, equipo trabajando)
   - Añade los 7 servicios uno a uno (descripción + precio "Gratis")
   - Configura horario: Lunes a Viernes 09:00-19:00
   - Activa atributos: cita previa, accesibilidad si aplica

---

## 3. Configurar Formspree para el formulario

1. Crea cuenta en https://formspree.io (tier gratis: 50 envíos/mes).
2. New Form → email destino: `info@brokerhipotecariocastellon.es`.
3. Copia el form ID (formato `xxxxxxxx` o `xpzkxxxxx`).
4. En `src/components/ContactForm.astro` línea 4, reemplaza:
   ```
   const FORMSPREE_ID = 'YOUR_FORMSPREE_ID';
   ```
   por tu ID real.
5. Commit + push → Vercel redeploya automáticamente.

---

## 4. Activar WhatsApp Business

1. Instala WhatsApp Business en el teléfono con el número que usaremos en la web.
2. Configura horario, mensaje de bienvenida, etiquetas.
3. **Verifica que el número coincide con el de la web** (864 87 21 86).
4. Si el número se confirma DIFERENTE al 864 87 21 86 (que es inusual para Castellón), actualiza `src/data/business.ts`:
   - Campo `phone`, `phoneDisplay`, `whatsapp`.

---

## 5. Crear email corporativo

1. En el panel del registrador del dominio, crea `info@brokerhipotecariocastellon.es`.
2. Configura DKIM/SPF si el registrador lo permite (mejora deliverability).
3. Apunta Formspree a este email (paso 3 arriba).

---

## 6. Nº de registro Ley 5/2019 al footer

Avísanos con tu nº de inscripción como intermediario de crédito inmobiliario. En `src/data/business.ts` línea 23 reemplazar:

```typescript
registroLey5_2019: 'PENDIENTE — cliente proporcionará nº de inscripción',
```

por tu número real. Aparece automáticamente en footer y aviso legal.

---

## 7. Lista oficial de bancos

Pásanos la lista real de bancos con los que trabajáis. Actualiza `src/data/banks.ts`:

```typescript
export const banks = {
  count: 30, // o el número real
  names: [
    'BBVA', 'Santander', // ... lista real
  ],
};
```

Aparece en el strip de la home.

---

## 8. Foto de la oficina (cuando puedas)

Sube las fotos a `public/img/` y referéncialas en `Hero.astro` o `Contacto.astro`. Recomendado:
- `public/img/oficina-exterior.webp` (para `/contacto`)
- `public/img/oficina-interior.webp` (para `/sobre-bhc`)

---

## 9. Sustituir poster del video

Cuando tengas ffmpeg disponible:

```bash
ffmpeg -i public/img/castellon-aerial.webm -ss 00:00:02 -frames:v 1 -q:v 3 public/img/castellon-aerial-poster.jpg
```

Cambia `Hero.astro` para usar `.jpg` en lugar del `.svg` actual.

---

## 10. Convertir OG image a JPG/PNG

Para máxima compatibilidad con Facebook/LinkedIn:

```bash
# Si tienes Inkscape:
inkscape public/img/og-default.svg -o public/img/og-default.jpg -w 1200 -h 630

# O usar herramienta online: cloudconvert, svg2png-online, etc.
```

Cambiar en `src/data/business.ts`:
```typescript
ogImage: '/img/og-default.jpg',
```

---

## 11. Subir repo a GitHub + Deploy en Vercel

```bash
# Crear repo nuevo en https://github.com/new (privado o público)
git remote add origin https://github.com/USUARIO/bhc-castellon.git
git push -u origin main
```

Luego:
1. https://vercel.com/new → Import the repo
2. Framework: Astro (auto)
3. Deploy

Tu sitio estará en `https://bhc-castellon-XXX.vercel.app` en ~1 min.

Tras configurar DNS del dominio (paso 1), conecta el dominio en Vercel → Settings → Domains.

---

## 12. Search Console + sitemap

1. https://search.google.com/search-console/
2. Añadir propiedad → "Domain" → `brokerhipotecariocastellon.es`
3. Verificar con DNS TXT record (Vercel facilita esto)
4. En Sitemaps → enviar `https://brokerhipotecariocastellon.es/sitemap-index.xml`
5. En URL inspection → para home, /servicios/hipoteca-primera-vivienda, /broker-hipotecario/vila-real → "Request indexing"

---

## 13. Configurar Sveltia CMS auth

Sveltia CMS requiere OAuth GitHub para que escribas posts desde `/admin`. Hay dos opciones:

### Opción A: Cloudflare Workers (gratis, ~5 min)
1. Sigue https://github.com/sveltia/sveltia-cms-auth
2. Deploy del worker en Cloudflare
3. El worker queda en `https://tu-worker.workers.dev`
4. Edita `public/admin/config.yml` y añade:
   ```yaml
   backend:
     ...
     base_url: https://tu-worker.workers.dev
   ```

### Opción B: Vercel Serverless Function
- Más complejo. Solo si no quieres usar Cloudflare.
- Documentación: https://decapcms.org/docs/external-oauth-clients/

Una vez configurado:
1. Visita `https://brokerhipotecariocastellon.es/admin`
2. Login con GitHub (usuario con permisos al repo)
3. Click "New Blog" → escribe post → Publish → Vercel redeploya en ~30s

---

## 14. Estrategia de reseñas (crítico para Maps)

Los primeros 5-10 reviews son los más difíciles, pero clave para ranking en Maps:

1. **Email post-firma**: cuando cierres una operación, envía email con link directo a tu Maps review URL (la consigues en GBP → Reseñas → Compartir).
2. **Tarjeta NFC en oficina**: encarga una con link review (~30 €).
3. **Pide a familiares/conocidos** que conozcan tu trabajo que dejen una reseña honesta.
4. **Responde a TODAS las reseñas** en menos de 48h.

**Objetivo trimestre 1**: 10 reseñas con 4.5+ estrellas.

---

## 15. Citations / directorios locales (primer mes)

Da de alta el negocio en (NAP idéntico al de la web):

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

---

## 16. Plan editorial del blog

Para mantener el SEO informacional, publica **1-2 posts al mes** desde `/admin`. Ideas iniciales:

- "Cuándo subrogar tu hipoteca y cuándo no merece la pena"
- "Diferencias entre hipoteca fija, variable y mixta en 2026"
- "Avales ICO 2026: qué son y quién puede pedirlos"
- "Comprar segunda vivienda en Benicàssim: lo que debes saber"
- "Hipoteca para no residentes en España: guía británica"
- "Errores al comparar hipotecas: TAE vs interés nominal"

---

## Checklist resumido pre-launch

- [ ] Dominio comprado y DNS apuntado a Vercel
- [ ] GBP creada y verificada
- [ ] Email corporativo creado
- [ ] Formspree configurado con su ID en ContactForm.astro
- [ ] WhatsApp Business activo en el número correcto
- [ ] Nº registro Ley 5/2019 actualizado en business.ts
- [ ] Lista de bancos real actualizada en banks.ts
- [ ] Fotos de oficina disponibles (opcional al lanzamiento)
- [ ] Sveltia CMS auth configurado para editar blog
- [ ] Search Console verificado + sitemap enviado
