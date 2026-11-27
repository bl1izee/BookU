//Las reservas se guardan en localStorage con este formato: { "2026-11-24|MD01|08:00": "Ana", ... }

const CLAVE_RESERVAS = "booku-reservas";

const CLAVE_NOMBRE = "booku-nombre";

//Valores de los filtros cuando no hay nada filtrado
const FILTROS_VACIOS = { edificio: "TODOS", capacidad: 0, equipamiento: "TODOS" };

//Convierte un Date en texto "AAAA-MM-DD" (ej. "2026-11-24")
function fechaATexto(fecha) {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); //getMonth() empieza en 0
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
}

//Convierte el texto "AAAA-MM-DD" en un Date.
//Se usa el mediodía para que la zona horaria no cambie el día.
function textoAFecha(texto) {
    return new Date(`${texto}T12:00:00`);
}

//Devuelve las fechas de hoy y de los 6 días siguientes, como texto
function proximos7Dias() {
    const resultado = [];
    for (let i = 0; i < 7; i++) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + i);
        resultado.push(fechaATexto(fecha));
    }
    return resultado;
}

//"2026-11-24" pasa a "martes, 24 de noviembre"
function fechaLarga(texto) {
    const opciones = { weekday: "long", day: "numeric", month: "long" };
    return textoAFecha(texto).toLocaleDateString("es-ES", opciones);
}

//Las franjas duran 1 hora
function horaFin(hora) {
    const siguiente = Number(hora.slice(0, 2)) + 1;
    return `${String(siguiente).padStart(2, "0")}:00`;
}

function yaHaPasado(fecha, hora) {
    const inicioFranja = new Date(`${fecha}T${hora}:00`);
    return inicioFranja.getTime() <= Date.now();
}

//ID unico de una reserva: "fecha|recurso|hora"
function claveReserva(fecha, recursoId, hora) {
    return `${fecha}|${recursoId}|${hora}`;
}

function leerReservas() {
    try {
        const texto = localStorage.getItem(CLAVE_RESERVAS);
        return JSON.parse(texto) ?? {};
    } catch {
        return {};
    }
}

function guardarReservas(reservas) {
    try {
        localStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas));
    } catch {
        mostrarMensaje("No se pudo guardar en este navegador.", "error");
    }
}

function leerNombre() {
    try {
        return localStorage.getItem(CLAVE_NOMBRE) || "";
    } catch {
        return "";
    }
}

function guardarNombre(nombre) {
    try {
        localStorage.setItem(CLAVE_NOMBRE, nombre);
    } catch {
        mostrarMensaje("No se pudo guardar en este navegador.", "error");
    }
}

//para que no se pueda inyectar codigo
function escapar(texto) {
    return String(texto)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

const dias = proximos7Dias();

const estado = {
    categoria: "aulas", //pestaña activa
    fecha: dias[0], //día elegido (empieza en hoy)
    recursoId: null, //recurso elegido (null = el primero de la lista)
    filtros: { ...FILTROS_VACIOS },
    nombre: leerNombre(), //nombre de prueba
    reservas: leerReservas(), //todas las reservas guardadas
};

//Para no escribir tantas veces document.getElementById
function $(id) {
    return document.getElementById(id);
}

//Nombre escrito por el usuario, sin espacios al principio ni al final
function nombreActual() {
    return estado.nombre.trim();
}

// Recursos de la pestaña activa que cumplen los filtros
function recursosFiltrados() {
    const filtros = estado.filtros;

    return RECURSOS.filter(recurso => {
        if (recurso.categoria !== estado.categoria) {
            return false;
        }
        if (filtros.edificio !== "TODOS" && recurso.edificio !== filtros.edificio) {
            return false;
        }
        if (recurso.capacidad !== undefined && recurso.capacidad < filtros.capacidad) {
            return false;
        }
        if (filtros.equipamiento !== "TODOS") {
            const equipamiento = recurso.equipamiento || [];
            if (!equipamiento.includes(filtros.equipamiento)) {
                return false;
            }
        }
        return true;
    });
}

function recursoSeleccionado() {
    const lista = recursosFiltrados();
    const elegido = lista.find(recurso => recurso.id === estado.recursoId);

    if (elegido) return elegido;
    if (lista.length > 0) return lista[0];
    return null;
}

function dueñoDeFranja(fecha, recursoId, hora) {
    return estado.reservas[claveReserva(fecha, recursoId, hora)];
}

function contarFranjasLibres(recursoId, fecha) {
    let libres = 0;
    for (const hora of FRANJAS) {
        const estaLibre = !yaHaPasado(fecha, hora) && !dueñoDeFranja(fecha, recursoId, hora);
        if (estaLibre) libres++;
    }
    return libres;
}

function estadoDeFranja(recursoId, hora) {
    const dueño = dueñoDeFranja(estado.fecha, recursoId, hora);

    if (dueño && dueño === nombreActual()) return "mia";
    if (dueño) return "ocupada";
    if (yaHaPasado(estado.fecha, hora)) return "pasada";
    return "libre";
}

function render() {
    pintarCategorias();
    pintarDias();
    pintarFiltros();
    pintarRecursos();
    pintarDetalle();
    pintarFranjas();
    pintarMisReservas();
}

function pintarCategorias() {
    let html = "";

    for (const categoria of CATEGORIAS) {
        const activa = categoria.id === estado.categoria;
        html += `
            <button type="button" data-categoria="${categoria.id}"
                class="${activa ? "activo" : ""}" aria-pressed="${activa}">
                ${categoria.nombre}
            </button>`;
    }

    $("tabs-categorias").innerHTML = html;
}

function pintarDias() {
    let html = "";

    for (const textoFecha of dias) {
        const fecha = textoAFecha(textoFecha);
        const activo = textoFecha === estado.fecha;
        const diaSemana = fecha.toLocaleDateString("es-ES", { weekday: "short" }); // "mar"
        const mes = fecha.toLocaleDateString("es-ES", { month: "short" }); // "nov"

        html += `
            <button type="button" data-fecha="${textoFecha}" class="dia ${activo ? "activo" : ""}"
                aria-pressed="${activo}" aria-label="${fechaLarga(textoFecha)}">
                <span>${diaSemana}</span>
                <strong>${fecha.getDate()}</strong>
                <span>${mes}</span>
            </button>`;
    }

    $("dias").innerHTML = html;
}

function opcionesSelect(valores, valorElegido, textoTodos) {
    let html = "";
    for (const valor of valores) {
        const texto = valor === "TODOS" ? textoTodos : valor;
        const seleccionada = valor === valorElegido ? "selected" : "";
        html += `<option value="${valor}" ${seleccionada}>${texto}</option>`;
    }
    return html;
}

function pintarFiltros() {
    const filtros = estado.filtros;
    let html = "";

    //Edificio: en todas las pestañas
    html += `
        <label>Edificio
            <select data-filtro="edificio">
                ${opcionesSelect(["TODOS", "MD", "BL"], filtros.edificio, "Todos")}
            </select>
        </label>`;

    //Capacidad: en todas menos Material
    if (estado.categoria !== "material") {
        html += `
            <label>Capacidad mínima
                <input type="number" min="0" step="1" data-filtro="capacidad"
                    value="${filtros.capacidad || ""}" placeholder="0">
            </label>`;
    }

    //Equipamiento: solo en Aulas
    if (estado.categoria === "aulas") {
        html += `
            <label>Equipamiento
                <select data-filtro="equipamiento">
                    ${opcionesSelect(["TODOS", "Pantalla", "Proyector", "Pizarra"], filtros.equipamiento, "Cualquiera")}
                </select>
            </label>`;
    }

    $("filtros").innerHTML = html;
}

function pintarRecursos() {
    const lista = recursosFiltrados();
    const seleccionado = recursoSeleccionado();

    if (lista.length === 0) {
        $("lista-recursos").innerHTML = `<p>No hay resultados con estos filtros.</p>`;
        return;
    }

    let html = "<ul>";

    for (const recurso of lista) {
        const activo = seleccionado && recurso.id === seleccionado.id;
        const libres = contarFranjasLibres(recurso.id, estado.fecha);

        let info = recurso.ubicacion;
        if (recurso.capacidad) {
            info += ` · ${recurso.capacidad} personas`;
        }

        let disponibilidad;
        if (libres > 0) {
            disponibilidad = `<small class="libre">${libres} franjas libres</small>`;
        } else {
            disponibilidad = `<small class="ocupado">Completo</small>`;
        }

        html += `
            <li>
                <button type="button" data-recurso="${recurso.id}"
                    class="recurso ${activo ? "activo" : ""}" aria-pressed="${activo}">
                    <strong>${recurso.nombre}</strong>
                    <small>${info}</small>
                    ${disponibilidad}
                </button>
            </li>`;
    }

    html += "</ul>";
    $("lista-recursos").innerHTML = html;
}

function pintarDetalle() {
    const recurso = recursoSeleccionado();

    if (!recurso) {
        $("detalle-recurso").innerHTML = "";
        return;
    }

    const filas = [];
    filas.push(["Tipo", recurso.tipo]);

    if (recurso.categoria === "material") {
        filas.push(["Recogida", recurso.ubicacion]);
    } else {
        filas.push(["Ubicación", recurso.ubicacion]);
    }

    if (recurso.capacidad !== undefined) {
        filas.push(["Capacidad", `${recurso.capacidad} personas`]);
    }

    if (recurso.equipamiento) {
        if (recurso.equipamiento.length > 0) {
            filas.push(["Equipamiento", recurso.equipamiento.join(", ")]);
        } else {
            filas.push(["Equipamiento", "Sin equipamiento"]);
        }
    }

    let filasHtml = "";
    for (const [titulo, valor] of filas) {
        filasHtml += `<dt>${titulo}</dt><dd>${valor}</dd>`;
    }

    $("detalle-recurso").innerHTML = `
        <h3>${recurso.nombre}</h3>
        <dl>${filasHtml}</dl>
        <p>Disponibilidad para el <strong>${fechaLarga(estado.fecha)}</strong>:</p>`;
}

function pintarFranjas() {
    const recurso = recursoSeleccionado();

    if (!recurso) {
        $("franjas").innerHTML = "";
        return;
    }

    let html = "";

    for (const hora of FRANJAS) {
        const tipo = estadoDeFranja(recurso.id, hora);

        let texto;
        if (tipo === "mia") {
            texto = "Tu reserva";
        } else if (tipo === "ocupada") {
            const dueño = dueñoDeFranja(estado.fecha, recurso.id, hora);
            texto = `Ocupada por ${escapar(dueño)}`;
        } else if (tipo === "pasada") {
            texto = "Finalizado";
        } else {
            texto = "Libre";
        }

        //Las ocupadas y las pasadas NO se deshabilitan: al pulsarlas sale un pop-up de aviso
        const deshabilitada = tipo === "mia";

        html += `
            <button type="button" class="franja ${tipo}" data-hora="${hora}" data-tipo="${tipo}"
                ${deshabilitada ? "disabled" : ""}>
                <span>${hora} – ${horaFin(hora)}</span>
                <small>${texto}</small>
            </button>`;
    }

    $("franjas").innerHTML = html;
}

function misReservas() {
    const nombre = nombreActual();
    if (!nombre) return [];

    const mias = [];
    for (const [clave, quien] of Object.entries(estado.reservas)) {
        if (quien === nombre) {
            mias.push([clave, quien]);
        }
    }

    mias.sort((a, b) => a[0].localeCompare(b[0]));
    return mias;
}

function pintarMisReservas() {
    const nombre = nombreActual();
    const mias = misReservas();
    const titulo = `<h3>Mis reservas de prueba (${mias.length})</h3>`;

    if (!nombre) {
        $("mis-reservas").innerHTML = `${titulo}<p>Introduce tu nombre de prueba para consultar tus reservas.</p>`;
        return;
    }

    if (mias.length === 0) {
        $("mis-reservas").innerHTML = `${titulo}<p>Todavía no tienes reservas, ${escapar(nombre)}.</p>`;
        return;
    }

    let html = "<ul>";

    for (const [clave, quien] of mias) {
        const [fecha, recursoId, hora] = clave.split("|");
        const recurso = RECURSOS.find(r => r.id === recursoId);
        const nombreRecurso = recurso ? recurso.nombre : recursoId;

        html += `
            <li>
                <span>
                    <strong>${nombreRecurso}</strong> · ${fechaLarga(fecha)} · ${hora} – ${horaFin(hora)}
                    · Reservado por: ${escapar(quien)}
                </span>
                <button type="button" data-cancelar="${clave}">Cancelar</button>
            </li>`;
    }

    html += "</ul>";
    $("mis-reservas").innerHTML = titulo + html;
}

function mostrarMensaje(texto, tipo = "ok") {
    const elemento = $("mensaje");
    elemento.textContent = texto;
    elemento.className = `mensaje ${tipo}`;
}

//Pop-up cuando se pulsa una franja que es de otra persona
function avisarOcupada(recurso, hora, quien) {
    return abrirPopup(
        "Franja ocupada",
        `${recurso.nombre} ya está reservada por ${quien}\n` +
        `${fechaLarga(estado.fecha)}, ${hora} – ${horaFin(hora)}.\n\n` +
        "Elige otra franja u otro espacio.",
        "Entendido",
        false
    );
}

//Pop-up cuando se pulsa una franja cuya hora ya ha pasado
function avisarPasada(recurso, fecha, hora) {
    return abrirPopup(
        "Franja no disponible",
        `No puedes reservar ${recurso.nombre}\n` +
        `${fechaLarga(fecha)}, ${hora} – ${horaFin(hora)}:\n` +
        "esa hora ya ha pasado.\n\n" +
        "Elige otro horario u otro día.",
        "Entendido",
        false
    );
}

//Abre el pop-up y devuelve una promesa: true si pulsa Aceptar, false si cancela
//(botón Cancelar, tecla Escape). Con conCancelar = false solo sale el botón Aceptar.
function abrirPopup(titulo, texto, textoAceptar = "Aceptar", conCancelar = true) {
    const popup = $("popup");
    $("popup-titulo").textContent = titulo;
    $("popup-texto").textContent = texto;
    $("popup-aceptar").textContent = textoAceptar;
    $("popup-cancelar").hidden = !conCancelar;

    return new Promise(resolver => {
        function alCerrar() {
            popup.removeEventListener("close", alCerrar);
            resolver(popup.returnValue === "aceptar");
        }

        popup.returnValue = "";
        popup.addEventListener("close", alCerrar);
        popup.showModal();
        $("popup-aceptar").focus();
    });
}

async function reservar(hora) {
    const recurso = recursoSeleccionado();
    const nombre = nombreActual();

    //Es de otra persona
    const dueño = dueñoDeFranja(estado.fecha, recurso.id, hora);
    if (dueño && dueño !== nombre) {
        avisarOcupada(recurso, hora, dueño);
        return;
    }

    //Es de una hora que ya ha pasado
    if (yaHaPasado(estado.fecha, hora)) {
        avisarPasada(recurso, estado.fecha, hora);
        render();
        return;
    }

    //Ha rellenado el nombre
    if (!nombre) {
        mostrarMensaje("Escribe tu nombre de prueba para reservar.", "error");
        $("nombre").focus();
        return;
    }

    //Guardamos la fecha por si cambia de día mientras el pop-up está abierto
    const fecha = estado.fecha;
    const franja = `${fechaLarga(fecha)}, ${hora} – ${horaFin(hora)}`;

    //Pop-up 1: confirmar la reserva
    const confirmado = await abrirPopup(
        "¿Quieres hacer la reserva?",
        `${recurso.nombre}\n${franja}\nA nombre de: ${nombre}`,
        "Reservar"
    );
    if (!confirmado) return;

    //Puede haber pasado la hora mientras el pop-up estaba abierto
    if (yaHaPasado(fecha, hora)) {
        avisarPasada(recurso, fecha, hora);
        render();
        return;
    }

    //Por si alguien mas lo ha reservado
    estado.reservas = leerReservas();
    const clave = claveReserva(fecha, recurso.id, hora);
    if (estado.reservas[clave]) {
        avisarOcupada(recurso, hora, estado.reservas[clave]);
        render();
        return;
    }

    estado.reservas[clave] = nombre;
    guardarReservas(estado.reservas);
    mostrarMensaje(`Reservado: ${recurso.nombre}, ${franja}.`);
    render();

    //Pop-up 2: reserva hecha
    await abrirPopup(
        "¡Reserva hecha!",
        `Has reservado ${recurso.nombre}\n${franja}.`,
        "Entendido",
        false
    );
}

function cancelar(clave) {
    estado.reservas = leerReservas();

    //Solo se pueden cancelar las reservas propias
    if (estado.reservas[clave] !== nombreActual()) {
        mostrarMensaje("Solo puedes cancelar las reservas de tu nombre de prueba.", "error");
        render();
        return;
    }

    delete estado.reservas[clave];
    guardarReservas(estado.reservas);
    mostrarMensaje("Reserva cancelada.");
    render();
}

function alPulsarCategoria(evento) {
    const boton = evento.target.closest("[data-categoria]");
    if (!boton) return;

    estado.categoria = boton.dataset.categoria;
    estado.recursoId = null;
    estado.filtros = { ...FILTROS_VACIOS };
    render();
}

function alPulsarDia(evento) {
    const boton = evento.target.closest("[data-fecha]");
    if (!boton) return;

    estado.fecha = boton.dataset.fecha;
    render();
}

function alCambiarFiltro(evento) {
    const campo = evento.target.dataset.filtro;
    if (!campo) return;

    if (campo === "capacidad") {
        estado.filtros.capacidad = Number(evento.target.value) || 0;
    } else {
        estado.filtros[campo] = evento.target.value;
    }
    estado.recursoId = null;

    pintarRecursos();
    pintarDetalle();
    pintarFranjas();
}

function alPulsarRecurso(evento) {
    const boton = evento.target.closest("[data-recurso]");
    if (!boton) return;

    estado.recursoId = boton.dataset.recurso;
    render();
}

function alPulsarFranja(evento) {
    const boton = evento.target.closest("[data-hora]");
    if (!boton || boton.disabled) return;

    reservar(boton.dataset.hora);
}

function alPulsarCancelar(evento) {
    const boton = evento.target.closest("[data-cancelar]");
    if (!boton) return;

    cancelar(boton.dataset.cancelar);
}

function alEscribirNombre(evento) {
    estado.nombre = evento.target.value;
    guardarNombre(estado.nombre);
    pintarFranjas();
    pintarMisReservas();
}

function alCambiarOtraPestana(evento) {
    if (evento.key !== CLAVE_RESERVAS) return;

    estado.reservas = leerReservas();
    render();
}

function iniciar() {
    $("nombre").value = estado.nombre;

    $("tabs-categorias").addEventListener("click", alPulsarCategoria);
    $("dias").addEventListener("click", alPulsarDia);
    $("filtros").addEventListener("input", alCambiarFiltro);
    $("lista-recursos").addEventListener("click", alPulsarRecurso);
    $("franjas").addEventListener("click", alPulsarFranja);
    $("mis-reservas").addEventListener("click", alPulsarCancelar);
    $("nombre").addEventListener("input", alEscribirNombre);
    window.addEventListener("storage", alCambiarOtraPestana);

    $("popup-aceptar").addEventListener("click", () => $("popup").close("aceptar"));
    $("popup-cancelar").addEventListener("click", () => $("popup").close("cancelar"));

    setInterval(render, 60 * 1000);

    render();
}

document.addEventListener("DOMContentLoaded", iniciar);
