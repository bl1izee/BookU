# Estructura de la web

## Páginas

| Página | Para qué sirve |
|---|---|
| `index.html` | La web completa: presentación del proyecto, demo de reservas, vídeo, equipo y preguntas |
| `reservas.html` | Solo la demo de reservas, con un botón para volver a la principal. **Es la página del QR** de la exposición del Sprint 3, para que cada persona del público pruebe la demo en su móvil. **No se modifica.** |

`index.html` enlaza a `reservas.html` con el botón «Abrir las reservas en una página aparte» de la sección Pruébalo tú.

## Orden de `index.html`

El enunciado del Sprint 3 pide que la web siga esta estructura: **problema → solución → vídeo conceptual → llamada a la acción**. El orden actual lo cumple y el equipo decidió **no cambiarlo**.

| # | `id` | Etiqueta visible | Fondo | Qué contiene |
|---|---|---|---|---|
| — | `inicio` | (cabecera) | Transparente / obsidiana | Logo, menú de 8 enlaces y botón «Probar BookU» |
| — | `portada` | (hero) | Obsidiana con vetas | Logo grande (es el `<h1>`), eslogan, descripción y dos botones |
| 01 | `problema` | EL PROBLEMA | Blanco | Tarjeta de Art (usuario real), tres tarjetas del problema y franja de cifras con fuentes |
| 02 | `como-funciona` | LA SOLUCIÓN | Obsidiana | Tres pasos en línea de tiempo, criterios de éxito y tabla frente a la competencia |
| 03 | `para-quien` | PARA QUIÉN | Blanco | Tres segmentos de mercado: estudiantes, docentes y personal universitario |
| 04 | `proyecto` | EL PROYECTO | Azul | Presentación del Sprint 3 incrustada desde Canva |
| 05 | `reservar` | PRUÉBALO TÚ | Blanco | Demo de reservas (la pinta `reservas.js`) y pop-ups |
| 06 | `video` | VÍDEO CONCEPTUAL | Obsidiana | Vídeo conceptual incrustado desde Google Drive |
| 07 | `equipo` | EQUIPO 8 · PROYECTOS 3 | Blanco | Foto de grupo panorámica con «Somos BookU» y tarjetas «Roles de BookU» |
| 08 | `faq` | NUESTRA REVISIÓN | Azul | Preguntas frecuentes con `<details>` |
| 09 | `empieza` | EMPIEZA AHORA | Obsidiana (se une con el pie) | Llamada a la acción final con dos botones |
| — | (pie) | — | Obsidiana | Logo, «BookU · Equipo 8 · Proyectos 3» y botón «Volver arriba» |

Los números 01, 02… **no están escritos en el HTML**: los pone un contador de CSS en cada `.etiqueta`. Si se añade o se quita una sección con etiqueta, se renumeran solos.

## Menú de la cabecera

Ocho enlaces: El problema · La solución · Para quién · El proyecto · Reservar · Vídeo · El equipo · Preguntas. La portada y «Empieza ahora» no tienen enlace.

- `js/cabecera.js` ilumina el enlace de la sección que se está viendo.
- Por debajo de 1024 px de ancho el menú se oculta (no hay menú desplegable) y queda el botón «Probar BookU».

## Botones y a dónde llevan

| Botón | Destino |
|---|---|
| «Probar BookU» (cabecera) | `#reservar` |
| «Probar una reserva» (portada y llamada a la acción) | `#reservar` |
| «Cómo funciona» (portada) | `#problema` (decisión del equipo: empieza por el problema) |
| «Abrir las reservas en una página aparte» | `reservas.html` |
| «Ver el vídeo» (llamada a la acción) | `#video` |
| «Volver arriba» (pie) y logos | `#inicio` |

## Contenido externo incrustado

| Qué | Dónde | Nota |
|---|---|---|
| Presentación del Sprint 3 | `iframe` de Canva en `#proyecto` | La actualiza quien se encarga de la presentación; si cambia el diseño, solo hay que cambiar el `src` |
| Vídeo conceptual | `iframe` de Google Drive en `#video` | Debe estar compartido como «cualquier persona con el enlace» o no se verá en la web publicada |

## Iconos

Los iconos (ubicación, lupa, reloj, calendario, check, birrete, pantalla, personas y comillas) están **dentro de `index.html`**, en un `<svg class="sprite-iconos">` al principio del `<body>`. Se usan con `<svg><use href="#nombre"></use></svg>`.

No se sacaron a un archivo `.svg` aparte porque, al abrir el HTML directamente (`file://`), el navegador bloquea los `<use>` que apuntan a otro archivo. Los trazos están basados en Lucide (licencia ISC).

## Accesibilidad

- Un solo `<h1>` (el logo, con `alt="BookU"`, y el eslogan).
- Las fotos de las tarjetas del equipo tienen `alt=""` porque el nombre va justo debajo. La foto de grupo y la de Art tienen descripción.
- La tabla de competencia tiene `<caption>` y textos «Sí» y «No» para lectores de pantalla (clase `.solo-lectores`).
- El mensaje de la demo usa `role="status"` y `aria-live`. Los pop-ups son `<dialog>` nativos.
