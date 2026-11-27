# JavaScript

Cuatro archivos, sin librerías. Todos se cargan con `defer` y arrancan en `DOMContentLoaded`.

| Archivo | Quién lo mantiene | Se usa en |
|---|---|---|
| `js/datos.js` | Compañeros de JS (Daniel Peralta) | `index.html` y `reservas.html` |
| `js/reservas.js` | Compañeros de JS (Daniel Peralta) | `index.html` y `reservas.html` |
| `js/animaciones.js` | Jesús León | Solo `index.html` |
| `js/cabecera.js` | Jesús León | Solo `index.html` |

## `datos.js`: datos ficticios

- `CATEGORIAS`: aulas, salas y boxes, material.
- `FRANJAS`: de 08:00 a 19:00, franjas de una hora (la última termina a las 20:00).
- `AULAS`: MD01–MD06 y BL01–BL06, generadas con capacidad de 20/30/40 personas y equipamiento alterno (pantalla o proyector, más pizarra).
- `RECURSOS`: las 12 aulas, 2 salas de estudio, 2 boxes y 4 materiales (2 portátiles, un lápiz digital y un proyector).

Para añadir un recurso basta con añadirlo a `RECURSOS`: la demo lo pinta sola.

## `reservas.js`: la demo

**Qué guarda en el navegador (`localStorage`):**

| Clave | Contenido |
|---|---|
| `booku-reservas` | Objeto `{ "AAAA-MM-DD|IDRECURSO|HH:MM": "Nombre" }` |
| `booku-nombre` | El último nombre de prueba escrito |

Las reservas solo existen en ese navegador. No hay servidor ni cuentas: el enunciado permite simularlo.

**Cómo funciona:**
- Un objeto `estado` guarda la categoría, la fecha, el recurso elegido, los filtros, el nombre y las reservas.
- `render()` vuelve a pintar todo: pestañas, 7 días, filtros, recursos, detalle, franjas y «Mis reservas».
- Cada franja tiene un estado: `libre`, `ocupada`, `pasada` (texto «Finalizado») o `mia`. Las ocupadas y las pasadas no se deshabilitan: al pulsarlas sale un pop-up explicando por qué no se puede reservar.
- **Recorrido de una reserva (`reservar`):** comprueba si es de otra persona, si ya pasó la hora y si hay nombre. Después abre el pop-up «¿Quieres hacer la reserva?». Al confirmar, vuelve a leer `localStorage` por si otra pestaña la ha cogido, la guarda y muestra el pop-up «¡Reserva hecha!».
- `abrirPopup()` usa el `<dialog id="popup">` y devuelve una promesa: `true` si se acepta.
- Solo se pueden cancelar las reservas del nombre escrito.
- Cada minuto se vuelve a pintar todo, para que las franjas pasen a «Finalizado» solas. También escucha el evento `storage` para sincronizar varias pestañas.
- `escapar()` limpia los nombres antes de meterlos en el HTML, para que no se pueda inyectar código.

**HTML que necesita** (tanto en `index.html` como en `reservas.html`): los `id` `tabs-categorias`, `nombre`, `dias`, `mensaje`, `filtros`, `lista-recursos`, `detalle-recurso`, `franjas`, `mis-reservas` y el `<dialog id="popup">` con `popup-titulo`, `popup-texto`, `popup-cancelar` y `popup-aceptar`. Si se cambia alguno, la demo deja de funcionar.

**Clases que genera y que el CSS estiliza:** `.activo`, `.dia`, `.recurso`, `.franja` (y `.libre`, `.ocupada`, `.pasada`, `.mia`), `.mensaje` (y `.ok`, `.error`).

## `animaciones.js`: animación de entrada

- Marca con `.revelar` cada hijo directo de cada `main > section` y le da un retraso escalonado (90 ms entre bloques, máximo 360 ms).
- Con un `IntersectionObserver` añade `.visible` cuando el bloque entra en pantalla. Cada bloque se anima una sola vez.
- Pone `.animaciones-activas` en `<html>`; sin esa clase no se oculta nada.
- Las animaciones están **siempre activas** (sin interruptor), por decisión del equipo.

## `cabecera.js`: cabecera y menú

- Con menos de 10 px de scroll añade `.cabecera--transparente`, para que se funda con la portada. Al bajar se quita y la cabecera pasa a obsidiana. Sin JS se queda sólida y siempre legible.
- Un `IntersectionObserver` sobre todas las `main > section[id]`, con la franja central de la pantalla, marca con `.activo` y `aria-current="location"` el enlace del menú de la sección visible. Las secciones sin enlace (portada, llamada a la acción) desmarcan el menú.

> Al probarlo con herramientas automáticas: si la pestaña del navegador está en segundo plano, los `IntersectionObserver` pueden tardar en dispararse hasta que la página se repinta. No es un fallo del código.
