# Ámsterdam en bici — guía interactiva de 1 día

Herramienta práctica (no una web decorativa) para recorrer Ámsterdam en bici en un día, pensada para usarse desde el móvil, durante el viaje, con y sin conexión.

## Arquitectura, en breve

- **Next.js 14 (App Router) + TypeScript**, una única ruta (`/`). No hace falta más: es una app de una pantalla con pestañas, no un sitio con varias páginas indexables, así que una sola ruta reduce complejidad sin perder nada.
- **`AppShell.tsx`** es el único componente con estado de navegación (pestaña activa + si se ha pulsado "Empezar ruta"). Las 4 pantallas (`RouteScreen`, `MapScreen`, `ConsejosScreen`, `ProgresoScreen`) son "tontas": reciben datos y callbacks, no acceden a `localStorage` directamente salvo el propio hook.
- **`data/route.ts`** es la única fuente de verdad de la ruta: nombre, qué ver, tiempo, distancia al siguiente punto, coordenadas y consejo. Añadir, quitar o reordenar paradas se hace solo aquí; ningún componente tiene datos de la ruta escritos a mano.
- **`lib/useProgress.ts` + `lib/storage.ts`** encapsulan `localStorage` (paradas visitadas y checklist). Es lo único con estado persistente; todo lo demás es estado de UI efímero.
- **Leaflet se carga solo en cliente** (`next/dynamic` con `ssr: false`) porque Leaflet toca `window` directamente y rompería el renderizado en servidor si se importara arriba.
- **Service worker propio**, sin `next-pwa` ni dependencias extra: cachea el shell de la app y, aparte, cachea las teselas del mapa (OpenStreetMap) a medida que se van pidiendo, para que la zona ya vista del mapa siga funcionando sin cobertura.

### Identidad visual

El hilo conductor de todo el diseño es el sistema real de **knooppunten** (nodos numerados) que usa la señalización ciclista holandesa: los círculos numerados que ves en el hero, en cada parada de la lista y en el mapa son el mismo elemento, no una decoración distinta en cada sitio. El rojo de acento es el color real del asfalto de los carriles bici (`fietspad`); el azul oscuro de fondo es el del agua de los canales.

## Estructura de carpetas

```
amsterdam-bike-guide/
├─ app/
│  ├─ layout.tsx        # fuentes, metadata, PWA, registro del service worker
│  ├─ page.tsx          # entrada, monta AppShell
│  └─ globals.css
├─ components/
│  ├─ AppShell.tsx      # estado de navegación + hook de progreso
│  ├─ Home.tsx          # pantalla inicial (hero)
│  ├─ BottomNav.tsx     # navegación inferior fija
│  ├─ RouteScreen.tsx   # lista de paradas + chips de franja horaria
│  ├─ StopCard.tsx      # tarjeta de una parada
│  ├─ MapScreen.tsx     # wrapper con carga dinámica del mapa
│  ├─ LeafletMap.tsx    # lógica real de Leaflet (cliente only)
│  ├─ ConsejosScreen.tsx
│  └─ ProgresoScreen.tsx # % completado, checklist, reiniciar
├─ data/route.ts        # única fuente de verdad de la ruta
├─ lib/storage.ts        # localStorage
├─ lib/useProgress.ts    # hook de progreso
├─ types/index.ts
└─ public/
   ├─ manifest.webmanifest
   ├─ sw.js
   └─ icons/
```

## Instalar y ejecutar en local

Necesitas Node.js 18.18 o superior.

```bash
cd amsterdam-bike-guide
npm install
npm run dev
```

Abre `http://localhost:3000`. Para probarlo como se usaría en el viaje, ábrelo desde el móvil en la misma red (`http://TU_IP_LOCAL:3000`) o despliégalo (siguiente paso) y ábrelo desde el móvil directamente.

Para compilar la versión de producción en local:

```bash
npm run build
npm start
```

## Desplegar en Vercel

1. Sube el proyecto a un repositorio de GitHub (o GitLab/Bitbucket).
2. Entra en [vercel.com](https://vercel.com), pulsa **Add New → Project** e importa el repositorio.
3. Vercel detecta Next.js automáticamente: no hace falta tocar el build command ni el output directory.
4. Pulsa **Deploy**. En 1-2 minutos tendrás una URL pública (`tu-proyecto.vercel.app`).
5. Desde el móvil, abre esa URL en Safari o Chrome y usa "Añadir a pantalla de inicio" para instalarla como PWA.

También puedes hacerlo sin GitHub, directamente desde la CLI:

```bash
npm install -g vercel
vercel
```

## Cómo probar el modo sin conexión

1. Abre la app una vez con conexión y navega por las 4 pestañas (para que el service worker cachee el shell) y por el mapa en la zona de la ruta (para que se cacheen las teselas de esa zona).
2. Activa el modo avión.
3. Recarga: la app sigue abriendo y el progreso guardado se mantiene. El mapa mostrará la zona ya vista; si te alejas del área cacheada, esas teselas nuevas no cargarán hasta recuperar conexión.

## Consejos para una v2

- **Geolocalización en vivo**: mostrar un punto azul con la posición real del usuario sobre el mapa y detectar automáticamente cuándo ha llegado a una parada, para marcarla como visitada sola.
- **Modo nocturno automático**: cambiar a un tema de alto contraste sobre fondo oscuro cuando el atardecer se acerque, aprovechando que ya existe la franja "atardecer".
- **Alquiler de bici integrado**: enlazar cada parada de inicio con las ubicaciones reales de operadores de bike-sharing (p. ej. vía sus apps), en vez de asumir que el usuario ya tiene bici.
- **Alternativa por lluvia**: una segunda ruta más corta o con más tramos cubiertos, activable con un toggle, para días de mal tiempo.
- **Idioma**: extraer todos los textos a un diccionario simple (`es.ts`, `en.ts`) para poder ofrecer la guía también en inglés sin tocar componentes.
- **Compartir progreso**: botón para exportar el checklist y las paradas visitadas como texto, útil si se viaja en grupo y cada uno quiere comparar el día.

## Nota sobre las coordenadas

Las coordenadas de `data/route.ts` son aproximaciones fiables a nivel de calle, suficientes para centrar el mapa y trazar la ruta. Antes de un viaje real, merece la pena verificar cada punto una vez en Google Maps y ajustar el decimal si hace falta — es un cambio de una línea por parada, gracias a tener los datos centralizados.
