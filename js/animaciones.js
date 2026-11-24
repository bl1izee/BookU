// Animación de entrada al hacer scroll. La ha añadido Jesús.
//
// Cada bloque de las secciones (etiqueta, título, tarjetas...) aparece
// subiendo suavemente cuando entra en pantalla. Son animaciones ligeras,
// así que siempre están activas.
// Los estilos están en la sección 14 de css/styles.css.

//Retraso entre un bloque y el siguiente de la misma sección (en ms)
const PASO_RETRASO = 90;

//Máximo de retraso, para que las secciones largas no se hagan eternas
const RETRASO_MAXIMO = 360;

//Marca los hijos directos de cada sección y les da un retraso escalonado
function prepararBloques() {
    const bloques = [];

    for (const seccion of document.querySelectorAll("main > section")) {
        [...seccion.children].forEach((bloque, posicion) => {
            const retraso = Math.min(posicion * PASO_RETRASO, RETRASO_MAXIMO);
            bloque.classList.add("revelar");
            bloque.style.setProperty("--retraso", `${retraso}ms`);
            bloques.push(bloque);
        });
    }

    return bloques;
}

function observarBloques(bloques) {
    //Navegadores muy antiguos: se muestra todo sin animación
    if (!("IntersectionObserver" in window)) {
        bloques.forEach(bloque => bloque.classList.add("visible"));
        return;
    }

    const observador = new IntersectionObserver(entradas => {
        for (const entrada of entradas) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observador.unobserve(entrada.target); //Solo se anima una vez
            }
        }
    }, { rootMargin: "0px 0px -10% 0px" }); //Se activa algo antes del borde inferior

    bloques.forEach(bloque => observador.observe(bloque));
}

function iniciarAnimaciones() {
    //Esta clase activa el estado oculto inicial definido en el CSS
    document.documentElement.classList.add("animaciones-activas");
    observarBloques(prepararBloques());
}

document.addEventListener("DOMContentLoaded", iniciarAnimaciones);
