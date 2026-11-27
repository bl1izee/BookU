// Comportamiento de la cabecera de index.html. Lo ha añadido Jesús.
//
// 1. Arriba del todo la cabecera es transparente y se funde con la portada;
//    al bajar se vuelve obsidiana sólida (clase .cabecera--transparente).
//    Sin JavaScript se queda siempre sólida, así que nunca deja de leerse.
// 2. El enlace del menú de la sección que se está viendo se ilumina
//    (clase .activo y aria-current), para saber en qué parte estás.
// Los estilos están en la sección 3 de css/styles.css.

//A partir de cuántos píxeles de scroll la cabecera deja de ser transparente
const SCROLL_CABECERA_SOLIDA = 10;

function actualizarFondoCabecera(cabecera) {
    const arriba = window.scrollY <= SCROLL_CABECERA_SOLIDA;
    cabecera.classList.toggle("cabecera--transparente", arriba);
}

//Marca como activo el enlace cuya sección ocupa la franja central de la pantalla
function vigilarSecciones(enlaces) {
    if (!("IntersectionObserver" in window)) return;

    const porId = new Map(enlaces.map(enlace => [enlace.hash.slice(1), enlace]));

    const observador = new IntersectionObserver(entradas => {
        for (const entrada of entradas) {
            if (!entrada.isIntersecting) continue;

            for (const enlace of enlaces) {
                enlace.classList.remove("activo");
                enlace.removeAttribute("aria-current");
            }
            //Las secciones sin enlace (portada, preguntas) dejan el menú sin marcar
            const enlace = porId.get(entrada.target.id);
            if (enlace) {
                enlace.classList.add("activo");
                enlace.setAttribute("aria-current", "location");
            }
        }
    }, { rootMargin: "-45% 0px -50% 0px" }); //Solo cuenta la franja del medio

    for (const seccion of document.querySelectorAll("main > section[id]")) {
        observador.observe(seccion);
    }
}

function iniciarCabecera() {
    const cabecera = document.querySelector(".cabecera");
    if (!cabecera) return;

    actualizarFondoCabecera(cabecera);
    window.addEventListener("scroll", () => actualizarFondoCabecera(cabecera), { passive: true });

    vigilarSecciones([...document.querySelectorAll(".menu a[href^='#']")]);
}

document.addEventListener("DOMContentLoaded", iniciarCabecera);
