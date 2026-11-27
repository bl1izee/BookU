# Documentación de BookU

BookU es la web del **Equipo 8** para la asignatura **Proyectos III** (3.º de Ingeniería del Software, U-tad). Es una *one page* que presenta el proyecto y una **demo funcional de reservas** de aulas, salas de estudio, boxes y material universitario.

> Eslogan: **«BookU, tu espacio a un click»**.

Esta carpeta explica cómo está hecha la web para que cualquier persona del equipo, o un agente de IA, pueda entenderla y modificarla sin romper nada.

## Índice

| Documento | Qué explica |
|---|---|
| [estructura-web.md](estructura-web.md) | Las páginas, las secciones de `index.html` en orden, sus `id` y qué contiene cada una |
| [estilos.md](estilos.md) | Cómo está organizado `css/styles.css`: variables, componentes, fondos, fuentes y adaptación a móvil |
| [javascript.md](javascript.md) | Los cuatro archivos JS, quién los mantiene, cómo funciona la demo de reservas y qué guarda en el navegador |
| [contenido.md](contenido.md) | Textos importantes, cifras con sus fuentes y qué datos están verificados y cuáles no |
| [decisiones-y-pendientes.md](decisiones-y-pendientes.md) | Decisiones de diseño ya tomadas (no reabrirlas), requisitos del Sprint 3 y tareas pendientes |

## Archivos del proyecto

```
BookU/
├── index.html          Página principal (presentación + demo)
├── reservas.html       Solo la demo; es la página del QR de la exposición
├── css/styles.css      Todos los estilos (un único archivo, en 16 secciones)
├── js/
│   ├── datos.js        Datos ficticios: categorías, franjas horarias y recursos
│   ├── reservas.js     Lógica de la demo de reservas y pop-ups
│   ├── animaciones.js  Animación de entrada al hacer scroll
│   └── cabecera.js     Cabecera transparente/sólida y sección activa del menú
├── img/                Logo, favicon, fotos del equipo, foto de Art y vetas del fondo
├── fonts/              DM Sans, Bricolage Grotesque (con su licencia OFL) y Space Mono
└── docs/               Esta documentación
```

No hay *frameworks*, *build* ni dependencias: es HTML, CSS y JavaScript sin librerías.

## Cómo verla en local

Abrir `index.html` directamente funciona. Para probar como en la web publicada, es mejor un servidor local desde la carpeta del proyecto:

```powershell
python -m http.server 5500
```

Y abrir `http://localhost:5500`.

## Reglas para quien modifique la web (personas o agentes de IA)

1. **Es un proyecto en grupo.** Antes de cambiar algo, se acuerda con el equipo. No se tocan cosas que no hagan falta.
2. **`reservas.html` no se modifica.** Es la página a la que lleva el QR el día de la exposición. Los cambios de diseño se hacen en `index.html` y `css/styles.css`. Ojo: `reservas.html` usa el mismo CSS y el mismo `reservas.js`, así que todo cambio en esos archivos también le afecta.
3. **`js/datos.js` y `js/reservas.js` son de los compañeros de JavaScript** (sobre todo Daniel Peralta). Si hay que cambiarlos, se avisa.
4. **Objetivos no son resultados.** Las cifras de criterios de éxito llevan la etiqueta «OBJETIVO» porque todavía no se han medido. No se presentan como logros (ver [contenido.md](contenido.md)).
5. **Las cifras llevan fuente.** Si se añade un dato, se añade también de dónde sale.
6. **Estilo del CSS:** secciones numeradas con cabeceras `/* ==== N. TÍTULO ==== */`, variables en `:root` y comentarios en español explicando el porqué. Los nuevos estilos van en la sección que les corresponde, no al final del archivo.
7. **Las decisiones de [decisiones-y-pendientes.md](decisiones-y-pendientes.md) ya están tomadas.** No proponer revertirlas salvo que el equipo lo pida.
