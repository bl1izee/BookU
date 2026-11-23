//Datos ficticios, si se quiere añadir algo se añade a RECURSOS

const CATEGORIAS = [
    { id: "aulas", nombre: "Aulas" },
    { id: "salas", nombre: "Salas y boxes" },
    { id: "material", nombre: "Material" },
];

const FRANJAS = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
];

const AULAS = ["MD", "BL"].flatMap(edificio =>
    [1, 2, 3, 4, 5, 6].map((n, i) => ({
        id: `${edificio}0${n}`,
        categoria: "aulas",
        nombre: `Aula ${edificio}0${n}`,
        tipo: "Aula",
        edificio,
        ubicacion: `Edificio ${edificio} · planta ${(i % 3) + 1}`,
        capacidad: 20 + (i % 3) * 10,
        equipamiento: i % 2 === 0 ? ["Pantalla", "Pizarra"] : ["Proyector", "Pizarra"],
    })),
);

const RECURSOS = [
    ...AULAS,

    {
        id: "sala-01",
        categoria: "salas",
        nombre: "Sala de estudio 01",
        tipo: "Sala",
        edificio: "MD",
        ubicacion: "Edificio MD · planta 1",
        capacidad: 8,
        equipamiento: ["Pantalla"],
    },
    {
        id: "sala-02",
        categoria: "salas",
        nombre: "Sala de estudio 02",
        tipo: "Sala",
        edificio: "BL",
        ubicacion: "Edificio BL · planta 1",
        capacidad: 12,
        equipamiento: ["Pizarra"],
    },
    {
        id: "box-01",
        categoria: "salas",
        nombre: "Box 01",
        tipo: "Box",
        edificio: "MD",
        ubicacion: "Edificio MD · planta 2",
        capacidad: 2,
        equipamiento: [],
    },
    {
        id: "box-02",
        categoria: "salas",
        nombre: "Box 02",
        tipo: "Box",
        edificio: "BL",
        ubicacion: "Edificio BL · planta 2",
        capacidad: 4,
        equipamiento: ["Pizarra"],
    },

    {
        id: "portatil-01",
        categoria: "material",
        nombre: "Portátil 01",
        tipo: "Portátil",
        edificio: "MD",
        ubicacion: "Mostrador MD",
    },
    {
        id: "portatil-02",
        categoria: "material",
        nombre: "Portátil 02",
        tipo: "Portátil",
        edificio: "MD",
        ubicacion: "Mostrador MD",
    },
    {
        id: "lapiz-01",
        categoria: "material",
        nombre: "Lápiz digital 01",
        tipo: "Lápiz digital",
        edificio: "BL",
        ubicacion: "Mostrador BL",
    },
    {
        id: "proyector-01",
        categoria: "material",
        nombre: "Proyector 01",
        tipo: "Proyector",
        edificio: "BL",
        ubicacion: "Mostrador BL",
    },
];
