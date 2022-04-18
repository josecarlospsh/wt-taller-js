// @ts-check//
/**
 * Semana 1 - JavaScript
 * Variables, Selectores, Eventos y Arrays(Metodos)
 */

//Var: Puede ser redeclarada en cualquier punto de la app, cambiar su valor y su ambito es global, y si esta dentro de una funcion tiene un ambito local
// console.log(globalThis);
var xiaomi = "Xiaomi Mi 9";
var xiaomi = "Xiaomi Mi 10";
var tiempoContrato = 18; //meses de contrato
// function renovarEquipo() {
//   var xiaomi = "Xiaomi Note 10";
if (true) {
  let xiaomi = "Xiaomi Mi 14";
  // console.log(`Tu equipo Xiaomi para renovar es: ${xiaomi}`);
}
// console.log(`Mi Modelo de Xiaomi: ${xiaomi}`);
// }
// console.log(`Mi Modelo de Xiaomi: ${xiaomi}`);
// renovarEquipo();

//const: No puede ser redeclarada, ni actualizar su valor y su ambito es local(bloque). Pd: Si puede ser definida en diferentes ambitos sin problema
const samsung = "Samsung Galaxy S10";
// samsung = "Samsung Galaxy S12";
if (true) {
  const samsung = "Samsung Galaxy S22";
  // console.log(`Tu equipo Samsung para renovar es: ${samsung}`);
}
// console.log(`Mi Modelo de Samsung: ${samsung}`);

//let: No puede ser redeclarada, si permite actualizar su valor y su ambito es local(bloque). Pd: Si puede ser definida en diferentes ambitos sin problema
let iphone = "iPhone 11";
iphone = "iPhone 12";
if (true) {
  let iphone = "iPhone 13";
  // console.log(`Tu equipo iPhone para renovar es: ${iphone}`);
}
// console.log(`Mi Modelo de iPhone: ${iphone}`);

/**
 * Selectores y Eventos
 */
import { equipos, usuarios } from "./../data/equipos.json";
import { marcas, planes } from "./../data/caeq.json";
console.table(equipos, ["IdEquipo", "Marca", "Modelo", "PrecioContado"]);
console.table(usuarios, ["Nombre", "Apellido", "Edad"]);
console.table(marcas, ["Marca", "Modelo", "Link"]);
console.table(planes, ["CodigoProducto", "Plan", "IdPlan", "Precio", "Link"]);
const listaEquipos = document.getElementById("equipos");
//Forma imperativa de iterar un array - For loop
let equiposAr = "";
for (let i = 0; i < equipos.length; i++) {
  // console.log(equipos[i].Modelo);
  //   equiposAr += `
  //   <div class="relative group">
  //   <div class="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 h-32 group-hover:opacity-75 lg:h-52">
  //     <img src="${equipos[i].Imagen}" alt="" class="w-auto mx-auto h-full lg:h-full">
  //   </div>
  //   <div class="flex justify-between mt-4">
  //     <div>
  //       <h3 class="text-sm text-gray-700">
  //         <a href="#">
  //           <span aria-hidden="true" class="absolute inset-0"></span>
  //            1 ${equipos[i].Marca} ${equipos[i].Modelo}
  //         </a>
  //       </h3>
  //       <p class="mt-1 text-sm text-gray-500">${equipos[i].TextoColor}</p>
  //     </div>
  //     <p class="text-sm font-medium text-gray-900"><small>S/</small> ${equipos[i].PrecioContado}</p>
  //   </div>
  // </div>
  //   `;
}
//Forma declarativa de iterar un array - ForEach
equipos.forEach(function (equipo, index, equipos) {
  equiposAr += `
  <div class="relative group">
  <div class="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 h-32 opacity-90 group-hover:opacity-100 transition-all lg:h-52">
    <img src="${equipo.Imagen}" alt="" class="w-auto mx-auto h-full lg:h-full">
  </div>
  <div class="flex justify-between mt-4">
    <div>
      <h3 class="text-md text-gray-700">
        <a href="#">
          <span aria-hidden="true" class="absolute inset-0"></span>
          ${equipo.Marca} ${equipo.Modelo}
        </a>
      </h3>
      <p class="mt-1 text-sm text-gray-500">${equipo.TextoColor}</p>
    </div>
    <p class="text-md font-medium text-gray-900"><small>S/</small>${equipo.PrecioContado}</p>
  </div>
</div>
  `;
  listaEquipos.innerHTML = equiposAr;
});

import { createButton, createCard } from "./../utils";
const listaMarcas = document.getElementById("marcas");
// const marcasLink = document.getElementsByClassName("marca-link");
// console.log(marcasLink);
marcas.forEach(function (marca, index, marcas) {
  marca.onClick = function () {
    console.log("Evento click:", marca.Marca);
  };
  listaMarcas.appendChild(createButton(marca));
  const marcaLink = document.getElementsByClassName("marca-link");
  marcaLink[index].addEventListener("click", function (e) {
    filtrarEquipo(e.target.innerText);
  });
});
const nombreMarcas = marcas.map(function (marca, index, marcas) {
  let nuevasMarcas = {
    // Marca: marca.Marca,
    // Modelo: marca.Modelo,
    // Link: marca.Link,
    // Marca: "Mi marca",
    ...marca,
    StockDisponible: 1,
  };
  return nuevasMarcas;
});
console.log("Nombre marcas:", nombreMarcas);
function filtrarEquipo(marca) {
  const equiposFiltrados = equipos.filter(function (equipo, index, equipos) {
    return equipo.Marca === marca;
  });
  mostrarEquipos(equiposFiltrados);
}

function mostrarEquipos(equipos) {
  listaEquipos.innerHTML = "";
  let equiposAr = "";
  equipos.forEach(function (equipo, index, equipos) {
    //   equiposAr += `
    //   <div class="relative group">
    //   <div class="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 h-32 group-hover:opacity-75 lg:h-52">
    //     <img src="${equipo.Imagen}" alt="" class="w-auto mx-auto h-full lg:h-full">
    //   </div>
    //   <div class="flex justify-between mt-4">
    //     <div>
    //       <h3 class="text-sm text-gray-700">
    //         <a href="#">
    //           <span aria-hidden="true" class="absolute inset-0"></span>
    //           ${index} ${equipos[index].IdEquipo} ${equipo.Marca} ${equipo.Modelo}
    //         </a>
    //       </h3>
    //       <p class="mt-1 text-sm text-gray-500">${equipo.TextoColor}</p>
    //     </div>
    //     <p class="text-sm font-medium text-gray-900"><small>S/</small> ${equipo.PrecioContado}</p>
    //   </div>
    // </div>
    //   `;
    equiposAr += createCard(equipo);
    listaEquipos.innerHTML = equiposAr;

    // console.log("Equipos html:", equiposAr, listaEquipos);
  });
}
const form = document.getElementById("form-equipo");
const btnSubmit = form.querySelector("button[type=submit]");
const nombreEquipo = document.getElementById("nombre-equipo");
const marcaEquipo = document.getElementById("marca-equipo");
const precioEquipo = document.getElementById("precio-equipo");
const descripcionEquipo = document.getElementById("descripcion-equipo");

nombreEquipo.addEventListener("input", previewText);
marcaEquipo.addEventListener("input", previewText);
precioEquipo.addEventListener("input", previewText);
descripcionEquipo.addEventListener("input", previewText);

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  const equipo = {
    Marca: marcaEquipo.value.trim(),
    Modelo: nombreEquipo.value,
    IdEquipo: Math.floor(Math.random() * 1000),
    Imagen: "https://via.placeholder.com/150",
    TextoColor: "Negro",
    PrecioContado: precioEquipo.value,
  };
  equipos.push(equipo);
  mostrarEquipos(equipos);
  form.reset();
  console.log("Nuevos equipos:", equipos);
});

const preview = document.getElementById("preview");
const previewNombre = document.querySelector(".preview-nombre");
const previewPrecio = document.querySelector(".preview-precio");

// for (let i = 0; i < preview.children.length; i++) {
//   console.log("Child Preview:", preview.childNodes[i]);
// }
function previewText(event) {
  let previewText = event.target.value;
  let input = event.target.id;
  // console.log(`El nombre es ${event.target.value}`, event.target.id);
  // if (input === "nombre-equipo") {
  preview.querySelector(`[data-preview=${input}]`).textContent = previewText;
  // } else {
  //   preview.querySelector(".preview-precio").textContent = previewText;
  // }
}
