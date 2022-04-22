/**
 * Semana 1 - JavaScript
 * Variables
 */
// Objecto global -> Window
// console.log(globalThis, window, global);
// var: Puede ser redeclarada en cualquier punto de la app, cambiar su valor y su ambito es global, y si esta dentro de una funcion tiene un ambito local
var xiaomi = "Xiaomi Mi 9";
var xiaomi = "Xiaomi Mi 10"; // valor por defecto
var tiempoRenovacion = 18;
function renovarEquipo() {
  var xiaomi = "Xiaomi Note 11T";
  if (tiempoRenovacion >= 18) {
    // var xiaomi = "Xiaomi Mi 14";
    // xiaomi = "Xiaomi Mi 15";
    // console.log(`Tu equipo Xiaomi para renovar es: ${xiaomi}`);
  }
  console.log(`Mi Modelo de Xiaomi - Renovar: ${xiaomi}`);
}
// console.log(`Mi Modelo de Xiaomi : ${xiaomi}`);
// renovarEquipo();

// const: No puede ser redeclarada, ni actualizar su valor y su ambito es local(bloque). Pd: Si puede ser definida en diferentes ambitos sin problema
const samsung = "Samsung Galaxy S10";
// samsung = "Samsung Galaxy S12";
if (true) {
  const samsung = "Samsung Galaxy S22";
  // console.log(`Tu equipo Samsung para renovar es: ${samsung}`);
}
// console.log(`Mi Modelo de Samsung: ${samsung}`);

// let: No puede ser redeclarada, si permite actualizar su valor y su ambito es local(bloque). Pd: Si puede ser definida en diferentes ambitos sin problema
let iphone = "iPhone 11";
iphone = "iPhone 12";
if (true) {
  let iphone = "iPhone 13";
  // console.log(`Tu equipo iPhone para renovar es: ${iphone}`);
}
// console.log(`Mi Modelo de iPhone: ${iphone}`);

/**
 * Selectores, Eventos y Arrays(Metodos)
 */

// Importamos los datos json
import { equipos, usuarios } from "./../data/equipos.json";
import { marcas, planes } from "./../data/caeq.json";

//Importamos las funciones de ayuda - utils
import { createButton, createCard, openSortMenu, parseUrl } from "./../utils";

// Mostramos en consola los datos
console.table(equipos, ["IdEquipo", "Marca", "Modelo", "PrecioContado"]);
// console.table(usuarios, ["IdUsuario", "Nombres", "Apellidos", "Email"]);
console.table(marcas, ["Marca", "Modelo", "Link"]);
// console.table(planes, ["CodigoProducto", "Plan", "IdPlan", "Precio", "Link"]);

// Seleccionamos el elemento HTML(padre) donde insertaremos el card de los equipos - document.getElementById("equipos")
const domListaEquipos = document.getElementById("equipos");

// Funcion para crear el template de los equipos (Card) - templateEquipo
const templateEquipo = function (equipo) {
  const url = new URL(equipo.LinkDetalle, "https://catalogo2020dev.serviciosmovistar.com");
  return `<div class="relative group">
    <div class="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 h-32 py-2 opacity-90 group-hover:opacity-100 transition-all lg:h-52">
      <img src="${equipo.Imagen}" alt="" class="w-auto mx-auto h-full lg:h-full">
    </div>
    <div class="flex justify-between mt-4">
      <div>
        <h3 class="text-md text-gray-700">
          <a href="${url}" target="_blank">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${equipo.Marca} ${equipo.Modelo}
          </a>
        </h3>
        <p class="mt-1 text-sm text-gray-500">${equipo.TextoColor}</p>
      </div>
      <p class="text-md font-medium text-gray-900"><small>S/</small>${equipo.PrecioTotal || equipo.PrecioContado.toFixed(2)}</p>
    </div>
  </div>`;
};

// Forma imperativa de iterar un array - For loop
let equiposFl = "";
for (let i = 0; i < equipos.length; i++) {
  // console.log("FI:", equipos, equipos[i], i);
  // equiposFl += templateEquipo(equipos[i]);
}
// domListaEquipos.innerHTML = equiposFl;

// Forma declarativa de iterar un array - ForEach
let equiposFe = "";
let nuevosEquiposFe = [];
equipos.forEach(function callback(equipo, index, equipos) {
  // console.log("FE", equipos, equipo, index);
  let PrecioTotal = Number((equipo.PrecioContado + equipo.PrecioContado * 0.18).toFixed(2));
  let nuevoEquipo = {
    ...equipo,
    PrecioTotal,
  };
  nuevosEquiposFe.push(nuevoEquipo);
  equiposFe += templateEquipo(equipo);
  // equiposFe.push({
  //   ...equipo,
  //   // Marca: equipo.Marca,
  //   // Modelo: equipo.Modelo,
  //   PrecioTotal: Number((equipo.PrecioContado + equipo.PrecioContado * 0.18).toFixed(2)),
  // });
});
console.log("Nuevos Equipos con PrecioTotal - ForEach:", nuevosEquiposFe);
domListaEquipos.innerHTML = equiposFe;

// Retornar un nuevo array con mas o menos datos - map
let equiposMap = "";
const nuevosEquipos = equipos.map(function (equipo, index, equipos) {
  // console.log("FMap", equipos, equipo, index);
  let { Modelo, ...restoDatos } = equipo;
  let PrecioTotal = Number((equipo.PrecioContado + equipo.PrecioContado * 0.18).toFixed(2));
  let nuevoEquipo = {
    ...restoDatos,
    PrecioTotal,
  };
  equiposMap += templateEquipo(nuevoEquipo);
  // return { ...restoDatos, PrecioTotal };
  return nuevoEquipo;
});
console.log("Nuevos Equipos con PrecioTotal - Map:", nuevosEquipos);
domListaEquipos.innerHTML = equiposMap;

// Listar botones con las marcas de equipos
const domListaMarcas = document.querySelector("#marcas");
// const marcaLink = document.getElementsByClassName("marca-link");
marcas.forEach(function (marca, index) {
  marca.onClick = function (event) {
    // console.log("Marca Click:", marca.Marca,event);
    filtrarPorMarca(marca.Marca);
  };
  domListaMarcas.appendChild(createButton(marca));
  // marcaLink[index].addEventListener("click", function (e) {
  //   const marca = e.target.innerText;
  //   // console.log(e.target.getAttribute("data-marca"));
  //   filtrarPorMarca(marca);
  // });
});

// Funcion para filtrar por marca los equipos
function filtrarPorMarca(marca) {
  const equiposFiltrados = equipos.filter(function (equipo, index, equipos) {
    return equipo.Marca === marca;
  });
  console.log(`Equipos - ${marca}`, equiposFiltrados);
  mostrarEquipos(equiposFiltrados);
}

// Funcion para mostrar la lista de los equipos en el DOM
function mostrarEquipos(equipos) {
  domListaEquipos.innerHTML = "";
  let equiposAr = "";
  equipos.forEach(function (equipo) {
    equiposAr += createCard(equipo);
  });
  sumarPrecios(equipos);
  domListaEquipos.innerHTML = equiposAr;
}

// Suma de los precios de los equipos y muestra en el DOM - sumarPrecios
function sumarPrecios(equipos) {
  const domTotalPrecios = document.querySelector(".total-precios");
  const totalPrecios = equipos.reduce(function (acc, equipo, index, equipos) {
    const total = acc + equipo.PrecioContado;
    // console.log("Acc:", acc, "Total", total);
    return total;
  }, 0);
  //Formateo de numeros segun idioma
  const numberFormat = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 2,
  });
  const totalPreciosFormateado = numberFormat.format(totalPrecios);
  domTotalPrecios.innerHTML = totalPreciosFormateado;
}
sumarPrecios(equipos);

// El metodo sort modifica(muta) el array original - tip arr.slice(0) o [...arr] - no retorna nada
// Funcion para ordenar los equipos por nombre Marca
function filtrarPorEquipoMarca() {
  openSortMenu();
  equipos.sort(function (equipoA, equipoB) {
    let sorted = 0;
    if (equipoA.Marca < equipoB.Marca) {
      sorted = -1;
    }
    if (equipoA.Marca > equipoB.Marca) {
      sorted = 1;
    }
    // console.log("Equipos ordenados por Marca:", sorted, equipoA.Marca, equipoB.Marca);
    return sorted;
  });
  console.log("Equipos ordenados por Marca:", equipos);
  mostrarEquipos(equipos);
}

// Funcion para ordenar los equipos por precio (menor-mayor)
function filtrarPorEquipoPrecioAsc() {
  openSortMenu();
  const equiposSorted = equipos.sort(function (equipoA, equipoB) {
    // console.log("A-B->", equipoA.PrecioContado - equipoB.PrecioContado, equipoA.PrecioContado, equipoB.PrecioContado);
    return equipoA.PrecioContado - equipoB.PrecioContado;
  });
  console.log("Equipos ordenados x Precio ASC:", equiposSorted);
  mostrarEquipos(equipos);
}

// Funcion para ordenar los equipos por precio (mayor-menor)
function filtrarPorEquipoPrecioDesc() {
  openSortMenu();
  const equiposSorted = equipos.sort(function (equipoA, equipoB) {
    // console.log("B-A->", equipoB.PrecioContado - equipoA.PrecioContado, equipoA.PrecioContado, equipoB.PrecioContado);
    return equipoB.PrecioContado - equipoA.PrecioContado;
  });
  console.log("Equipos ordenados x Precio DESC:", equiposSorted);
  mostrarEquipos(equipos);
}

// Seleccionamos los botones de filtrar por nombre(A-Z), precios, y le agregamos el evento click
const sortMarca = document.getElementById("sort-menu-0");
const sortMenorPrecio = document.getElementById("sort-menu-1");
const sortMayorPrecio = document.getElementById("sort-menu-2");
sortMarca.addEventListener("click", filtrarPorEquipoMarca);
sortMenorPrecio.addEventListener("click", filtrarPorEquipoPrecioAsc);
sortMayorPrecio.addEventListener("click", filtrarPorEquipoPrecioDesc);

// Seleccionamos el boton que abre el submenu de filtros
const btnSort = document.getElementById("sort-button");
// Agregamos el evento click al boton para abrir el submenu
btnSort.addEventListener("click", openSortMenu);

// Seleccionamos los elementos del formulario
const form = document.getElementById("form-equipo");
const btnSubmit = form.querySelector("button[type=submit]");
const nombreEquipo = document.getElementById("nombre-equipo");
const marcaEquipo = document.getElementById("marca-equipo");
const precioEquipo = document.getElementById("precio-equipo");
const descripcionEquipo = document.getElementById("descripcion-equipo");
const linkDetalle = document.getElementById("link-equipo");
const stockEquipo = document.getElementById("stock-equipo");

// Seleccionamos el elemento preview para mostrar el texto
const preview = document.getElementById("preview");

// Vista Previa del formulario
function previewText(event) {
  let previewText = event.target.value;
  let input = event.target.id;
  // console.log(`El input es ${event.target.value}`, event.target.id);
  preview.querySelector(`[data-preview=${input}]`).textContent = previewText;
}

// Agregamos el eventos a los campos del formulario
nombreEquipo.addEventListener("focus", function (event) {
  event.target.classList.toggle("bg-gray-200");
});
nombreEquipo.addEventListener("blur", function (event) {
  event.target.classList.remove("bg-gray-200");
});
nombreEquipo.addEventListener("input", previewText);
marcaEquipo.addEventListener("input", previewText);
precioEquipo.addEventListener("input", previewText);
descripcionEquipo.addEventListener("input", previewText);
linkDetalle.addEventListener("input", function (event) {
  console.log(event.target.value);
});

btnSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  let marca = marcaEquipo.value.trim() || "Sin Marca";
  let nombre = nombreEquipo.value.trim() || "Sin Nombre";
  let id = Math.floor(Math.random() * 1000);
  let precio = parseInt(precioEquipo.value) || 0;
  let link = parseUrl(linkDetalle.value.trim()).href;
  let stock = parseInt(stockEquipo.value) || 0;
  const equipo = {
    Marca: marca,
    Modelo: nombre,
    LinkDetalle: link,
    Imagen: "https://via.placeholder.com/150",
    EstadoEspecial: 1,
    NroCuotas: 0,
    PrecioOfertaContado: precio,
    PrecioContado: precio,
    IdPlan: 331,
    PrecioPlan: 55.9,
    NombrePlan: "Plan Ilimitado Mi Movistar S/55.90",
    CodigoProducto: `1-26-1-2-1-${id}-331-0-1`,
    IdColor: 1,
    TextoColor: "Negro",
    IdEquipo: id,
    Stock: stock,
    Orden: 0,
  };
  equipos.push(equipo);
  mostrarEquipos(equipos);
  form.reset();
  console.log("Nuevo equipoy y equipos:", equipo, equipos);
});

// Restaura el estado de los campos de un formulario por defecto
form.addEventListener("reset", logReset);
function logReset(event) {
  for (const input of event.target) {
    console.log(`Input: ${input.name} value: ${input.value}`);
    preview.querySelector(`[data-preview=${input.name}]`).textContent = "";
  }
}

// Eventos comunes
// click, input, focus, blur, change, submit, keydown, scroll, load, DOMContentLoaded
// https://developer.mozilla.org/es/docs/Web/Events

// Evento se ejecuta tan pronto el DOM se cargue completamente
window.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM cargado y parseado por completo");
});

// Evento se ejecuta cuando la pagina ha cargado por completo
window.addEventListener("load", function (event) {
  console.log("Window cargado");
});

// Evento se ejecuta al tener tecla presionada
document.addEventListener("keydown", logKeydown);
function logKeydown(event) {
  console.log(`KEYDOWN: ${event.code == "KeyA" ? "Es una A" : event.code + " " + event.key}`);
}

// Evento se ejecuta al dejar  de presionar la tecla
document.addEventListener("keyup", logKeyup);
function logKeyup(event) {
  console.log(`KEYUP: ${event.code == "KeyA" ? "Es una A" : event.code + " " + event.key}`);
}

// Evento se ejecuta cuando se redimensiona la ventana
window.addEventListener("resize", logWindowSize);
function logWindowSize() {
  // console.log(window, window.innerHeight, window.innerWidth);
}

// Evento se ejecuta cuando el scroll del navegador se mueve
document.addEventListener("scroll", function () {
  let scrollTop = document.documentElement.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight;
  let clientHeight = document.documentElement.clientHeight;
  let clientWidth = document.documentElement.clientWidth;
  let scrollWidth = document.documentElement.scrollWidth;
  let scrollLeft = document.documentElement.scrollLeft;
  let scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
  // console.log(
  //   `scrollTop: ${scrollTop} scrollHeight: ${scrollHeight} clientHeight: ${clientHeight} clientWidth: ${clientWidth} scrollWidth: ${scrollWidth} scrollLeft: ${scrollLeft}`
  // );
  // welcome.style.width = `${scrolled}%`;
  welcome.style.opacity = `${scrolled / 100}`;
  welcome.style.visibility = `${scrolled > 0 ? "visible" : "hidden"}`;
  welcome.style.backgroundColor = `rgba(255, 255, 255, ${scrolled / 100})`;
});
