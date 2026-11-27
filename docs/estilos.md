# Estilos (`css/styles.css`)

Todo el CSS está en **un único archivo** dividido en secciones numeradas. Cada regla lleva un comentario en español que explica *por qué* está ahí.

## Secciones del archivo

| # | Sección | Qué contiene |
|---|---|---|
| 1 | Fuentes, colores y base general | `@font-face`, variables de `:root`, reset y foco visible |
| 2 | Elementos comunes | Relleno de secciones, ritmo de fondos, secciones oscuras, etiquetas numeradas, iconos, `h2`, `.intro`, botones |
| 3 | Cabecera y menú | Cabecera fija y transparente, logo, enlaces con línea azul |
| 4 | Portada | Fondo de obsidiana con vetas, logo grande, eslogan, descripción |
| 5 | El problema y cómo funciona | Tarjetas de pasos, línea de tiempo, tarjeta de Art, cifras, fuentes, tabla de competencia |
| 6 | Para quién | Rejilla de tres tarjetas |
| 7 | Proyecto y vídeo | `iframe` en 16:9 |
| 8–10 | Demo de reservas | Controles, ventana de la demo, recursos, franjas, mis reservas y pop-ups |
| 11 | Equipo | Foto panorámica con título y tarjetas de roles |
| 12 | Preguntas frecuentes | Tarjetas `<details>` numeradas |
| 13 | Pie de página | Obsidiana, logo y texto agrupados, botón «Volver arriba» |
| 14 | Animaciones de entrada | Estado oculto inicial y animación `entrada` |
| 15 | Pantallas medianas | `@media (max-width: 1200px)`, `1024px` y `960px` |
| 16 | Pantallas estrechas | `@media (max-width: 700px)` |

Al final del archivo queda una regla de `.enlace-pagina` que añadió un compañero para el enlace entre páginas.

## Variables principales (`:root`)

| Variable | Valor | Uso |
|---|---|---|
| `--fuente-texto` | DM Sans | Texto general |
| `--fuente-titulos` | Bricolage Grotesque | Títulos y números grandes |
| `--fuente-mono` | Space Mono | Etiquetas, horas, insignias, números de preguntas |
| `--color-primario` | `#155dfc` | Botones y elementos activos |
| `--color-acento` | `#00a6f4` | Eslogan y detalles sobre fondo oscuro |
| `--color-obsidiana` | `#03050c` | Portada, secciones oscuras y pie |
| `--color-seccion-azul` | `#dbe6ff` | Fondo de las secciones azules |
| `--color-fondo-azul` | `#e9f0ff` | Tarjetas y franjas de cifras |
| `--color-primario-suave` | `#eef4ff` | Fondos azules muy claros (iconos, avisos) |
| `--color-texto` / `--color-texto-secundario` | `#151d2d` / `#58616f` | Texto principal y secundario |
| `--altura-cabecera` | `72px` | Hueco que dejan las secciones al saltar desde el menú |
| `--margen-lateral` | `max(24px, …)` | Centra el contenido a 1120 px sin `div` contenedor |

## Técnicas que conviene conocer

**Ritmo de fondos.** Nunca hay dos secciones seguidas con el mismo fondo: blanco, obsidiana y azul se alternan (ver la tabla de [estructura-web.md](estructura-web.md)).

**Secciones oscuras con variables.** En `#como-funciona`, `#video` y `#empieza` no se reescribe el color de cada elemento: se cambian las variables `--color-texto`, `--color-texto-secundario` y `--color-borde`, y todo lo de dentro las hereda. Las tarjetas blancas de dentro (criterios de éxito y tabla) recuperan los valores normales.

**Difuminado hacia la obsidiana.** El paso de blanco a negro va por un degradado que atraviesa el azul de la marca. Así se lee como un resplandor y no como un gris sucio. El color base de esas secciones es **blanco** y la obsidiana la pinta el degradado: si la sección empieza en medio píxel, no aparece una línea oscura. Por eso esas secciones tienen más relleno arriba y abajo (210 px).

**Vetas de obsidiana.** `img/vetas.webp` es la imagen dorada de la web personal de Jesús, girada a azul con `filter: hue-rotate(180deg)`. Va en un `::before` con `z-index: -1` dentro de una sección con `isolation: isolate`. Una máscara la esconde en las zonas de difuminado.

**Etiquetas numeradas.** `main { counter-reset: seccion }` y cada `.etiqueta` hace `counter-increment`. El `::before` pinta el número y una línea azul de 36 px, que es un fondo y no un elemento.

**Cajas de fuente con esquinas cortadas.** `.fuentes a` usa `clip-path` con dos esquinas en diagonal. El borde en degradado es el fondo del enlace y el `::before` pinta el interior 1 px más adentro. El brillo al pasar el ratón es `drop-shadow` en el `<li>`, porque `box-shadow` quedaría recortado.

**Animaciones de entrada.** Solo se ocultan los bloques si `<html>` tiene `.animaciones-activas`, y esa clase la pone el JS. Si el JS no carga, todo se ve. Se usa `animation` con `backwards`, no `transition`, para no pisar los efectos de hover de las tarjetas.

**Cabecera.** Es `sticky` con `margin-bottom` negativo, así se superpone a la portada. La portada compensa con `padding-top: calc(96px + var(--altura-cabecera))`.

## Fuentes

| Archivo | Licencia |
|---|---|
| `fonts/DMSans-VariableFont_opsz,wght.ttf` (y la cursiva) | OFL (Google Fonts) |
| `fonts/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf` | OFL, con `fonts/OFL-BricolageGrotesque.txt` |
| `fonts/SpaceMono-Regular.ttf`, `SpaceMono-Bold.ttf` | OFL (Google Fonts) |

DM Sans y Bricolage son variables: un archivo cubre todos los grosores. Las cursivas de Space Mono no se usan.

## Puntos de corte

| Ancho | Qué cambia |
|---|---|
| ≤ 1200 px | El menú se compacta (menos separación, letra 0,85 rem) |
| ≤ 1024 px | El menú se oculta; queda el botón «Probar BookU» |
| ≤ 960 px | La demo pasa a una columna |
| ≤ 700 px | Rejillas a una columna, tablas con desplazamiento horizontal, línea de tiempo vertical, pie apilado, el texto de la foto de grupo pasa debajo de la imagen |

Comprobación habitual tras un cambio: que en 375 px de ancho `document.documentElement.scrollWidth` sea igual al ancho de la ventana, es decir, que nada se salga por los lados.
