# Decisiones y pendientes

## Contexto: Sprint 3

Entrega y exposición el **1 de diciembre de 2026**. Lo que pide el enunciado para la web:

- Web desplegada online y **actualizada con el contenido del Sprint 3**: la presentación del Sprint 3 y el vídeo conceptual incorporados.
- Pensada para **usuarios reales**, no para el profesor; orientada a beneficios, sin tecnicismos y fácil de recorrer de un vistazo.
- Estructura: **problema → solución → vídeo conceptual → llamada a la acción**.
- *Back-end* opcional; se puede simular (por eso las reservas van en `localStorage`).

Feedback del profesor en el Sprint 2 que la web ya recoge: fotos reales, cifras del problema con fuentes, separar usuario / problema / solución y un MVP acotado.

## Decisiones ya tomadas (no reabrir)

**Estructura y contenido**
- El orden de las secciones no se cambia.
- La llamada a la acción final (`#empieza`) va después de las preguntas frecuentes.
- El botón «Cómo funciona» de la portada lleva a `#problema` y conserva ese texto.
- En el menú, la sección 02 se llama «La solución». La etiqueta 07 se mantiene como «EQUIPO 8 · PROYECTOS 3».
- No hay frase «No es un servicio oficial de U-tad» en la demo: BookU es para todas las universidades.
- Sin versión en inglés antes de la entrega: no suma en la rúbrica y obligaría a tocar la lógica de reservas.

**Diseño**
- Fondo de obsidiana con vetas azules en la portada, las secciones oscuras, la llamada a la acción y el pie.
- Ritmo de fondos: blanco, obsidiana y azul alternados. El paso a la obsidiana va difuminado a través del azul.
- Portada sin imagen de calendario: logo, eslogan, descripción y dos botones.
- Etiquetas de sección: «01 —— NOMBRE», con contador de CSS (sin píldora ni punto brillante).
- Cabecera transparente arriba y sólida al bajar, con la sección activa iluminada.
- Animaciones de entrada siempre activas, sin interruptor.
- Sección del equipo en dos partes: foto de grupo panorámica con «Somos BookU» (opción A) y «Roles de BookU» con las tarjetas. **Si no convence al profesor**, la alternativa acordada es la opción B: título y frase a la izquierda y foto a la derecha.
- Cajas de fuente con esquinas cortadas, como las de la web personal de Jesús.
- Pie: logo y texto agrupados, con el botón «Volver arriba».

## Pendiente de verificar

1. La cifra de 341.682 estudiantes en Madrid, en la fuente oficial.
2. El ✓ de Robin en «Pensado para universidades» (contradice el Sprint 1).
3. «Tres pasos en menos de un minuto»: cronometrarlo en las pruebas.
4. Que el vídeo de Drive y la presentación de Canva se vean en una ventana de incógnito.
5. Publicar la web: el enlace del Sprint 2 apuntaba a la versión antigua de Lovable. El QR de la exposición debe llevar a la página publicada de `reservas.html`.

## Reformas futuras acordadas

- **5.1 · Más imágenes reales:** sacarlas del vídeo (fotogramas) cuando esté hecho el vídeo real. Faltan aulas, salas, boxes, material y estudiantes buscando sitio.
- **5.2 · Preguntas frecuentes:** actualizarlas cuando el equipo tenga hechas las *backup slides* (anexo) del Sprint 3. Aprovechar para cambiar «¿Es un servicio oficial de U-tad?», que choca con la idea de que BookU es para todas las universidades.
- **Validación con estudiantes:** cuando haya entrevistas (al menos 2 personas de fuera de la clase), se pueden añadir sus citas y resultados honestos en la web.
- **Versión en inglés (después de la entrega):** con un interruptor ES / EN, coordinado con quien mantiene `reservas.js`.
