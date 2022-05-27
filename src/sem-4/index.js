/**
 * Semana 4 - JavaScript
 * Clases
 */

// Crear Objetos con propiedades y metodos(funciones) - {}
const equipo1 = {
  marca: "Apple",
  modelo: "iPhone X",
  precio: 1499,
  nombreEquipo: function () {
    return `${this.marca} ${this.modelo}`;
  },
  linkDetalle: function () {
    const url = new URL(this.marca, "https://catalogo2020dev.serviciosmovistar.com");
    return url;
  },
};

const equipo2 = {
  marca: "Samsung",
  modelo: "Galaxy s22",
  precio: 3590,
  nombreEquipo: function () {
    return `${this.marca} ${this.modelo}`;
  },
};
console.log(equipo1, equipo2);

// Funcion constructora - new Fn()
function Equipo(marca, modelo, precio) {
  this.marca = marca;
  this.modelo = modelo;
  this.precio = precio;
  this.nombreEquipo = function () {
    return `${this.marca} ${this.modelo}`;
  };
}

// Crear objetos con funcion constructora Equipo
const apple = new Equipo();
apple.marca = "Apple";
apple.modelo = "iPhone X";
apple.precio = 1499;
apple.linkDetalle = function () {
  const url = new URL(this.marca, "https://catalogo2020dev.serviciosmovistar.com");
  return url;
};
apple.color = "verde"; // Crea una propiedad al objeto apple
console.log(apple);

// Crea una propiedad a todos los objetos instanciados con el constructor
Equipo.prototype.color = "color original";

// Crea un metodo a todos los objetos instanciados con el constructor
Equipo.prototype.generarId = function () {
  let id = Math.floor(Math.random() * 1000);
  return id;
};
console.log("Props y metodos de Equipo:", Equipo.prototype);

// Crear objetos con funcion constructora con parametros
const nokia = new Equipo("Nokia", "N4", 699);
const samsung = new Equipo("Samsung", "Galaxy s22", 3590);
nokia.color = "rojo"; // modifica la propiedad color del objeto nokia
// console.log(nokia.generarId()); // genera un id aleatorio
console.log(nokia, samsung);

// Nueva forma de Crear Clases en JS - ES6
class Equipos {
  constructor(marca, modelo, precio = 0, imagen = "https://via.placeholder.com/150", color = "color original") {
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
    this.imagen = imagen;
    this.color = color;
  }

  // getter
  get nombreEquipo() {
    return `${this.marca} | ${this.modelo}`;
  }

  // setter
  set nombreEquipo(value) {
    [this.marca, this.modelo] = value.split(" ");
  }

  generarId() {
    let id = Math.floor(Math.random() * 1000);
    return id;
  }

  // propiedad estatica
  static year = new Date().getFullYear();

  // metodo estatico
  static todayDate() {
    return new Date();
  }

  phoneTemplate() {
    const id = this.generarId();
    return `
    <div class="relative group">
    <div class="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 h-32 py-2 opacity-90 group-hover:opacity-100 transition-all lg:h-52">
      <img src="${this.imagen}" alt="" class="w-auto mx-auto h-full lg:h-full">
    </div>
    <div class="flex justify-between mt-4">
      <div>
        <h3 class="text-md text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${this.marca} ${this.modelo}
        </h3>
        <p class="mt-1 text-sm text-gray-500">${this.color} - ${id}</p>
      </div>
      <p class="text-md font-medium text-gray-900"><small>S/</small>${this.precio.toFixed(2)}</p>
    </div>
  </div>`;
  }

  buildPhones() {
    const domEquipos = document.querySelector("#equipos");
    let items = this.phoneTemplate();
    domEquipos.innerHTML += items;
  }

  init() {
    this.buildPhones();
  }
}

console.log("Props y metodos de Equipos:", Equipos.prototype);

// Crear objetos(instancias) de clase Equipos
const equipos1 = new Equipos("Samsung", "Galaxy s22", 3590, "https://via.placeholder.com/150", "gris");
const equipos2 = new Equipos("Nokia", "N4", 699);
console.log(equipos1, equipos2);

// Obtiene el valor de una propiedad del objeto - GETTER
console.log(equipos2.nombreEquipo);

// Setea una propiedad al objeto - SETTER
equipos2.nombreEquipo = "Nokia G11";

// Leer propiedades y metodos estaticos (static) de la clase - no puede ser accedido desde un objeto
console.log(Equipos.year);
console.log(Equipos.todayDate());

// Inicializamos la funcion init - mostrar en el DOM
equipos1.init();
equipos2.init();

// Herencia de la clase Equipos
class AppleEquipos extends Equipos {
  constructor(modelo, precio, stock, color, imagen) {
    super("Apple", modelo, precio, imagen, color); // llama al constructor de la clase padre
    this.stock = stock; // nueva propiedad de la clase hija
  }

  // Sobreescribir metodo de la clase padre
  phoneTemplate() {
    const id = this.generarId();
    return `
    <div class="relative group">
    <span class="absolute text-white font-medium text-base bg-blue-500 z-10 p-1 rounded-sm h-8 w-8 text-center">${this.stock}</span>
    <div class="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 h-32 py-2 opacity-90 group-hover:opacity-100 transition-all lg:h-52">
      <img src="${this.imagen}" alt="" class="w-auto mx-auto h-full lg:h-full">
    </div>
    <div class="flex justify-between mt-4">
      <div>
        <h3 class="text-md text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            <strong>${this.marca}</strong> ${this.modelo}
        </h3>
        <p class="mt-1 text-sm text-gray-500">${this.color} - ${id}</p>
      </div>
      <p class="text-md font-medium text-gray-900"><small>S/</small>${this.precio.toFixed(2)}</p>
    </div>
  </div>`;
  }
}

// Crear objetos(instancias) de clase AppleEquipos
const iphoneX = new AppleEquipos("iPhone X", 1499, 10, "verde");
const iphone11 = new AppleEquipos("iPhone 11", 1899, 5, "negro");
console.log(iphoneX, iphone11);

// Inicializamos la funcion init - mostrar en el DOM
iphoneX.init();
iphone11.init();

// Crear clases - obtener datos de una API
class EquiposAPI {
  constructor() {
    this.fetchedData = [];
  }

  get getEndpoint() {
    return "https://apimocha.com/equipos-mov/equipos";
  }

  getRequest() {
    // Si sale error en la consulta, instalar una extension que permitar desbloquear CORS
    return fetch(this.getEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Equipos:", data);
        this.fetchedData = data;
        this.buildPhones();
      })
      .catch((err) => {
        console.log("Error", err.statusText);
      });
  }

  phoneTemplate(item) {
    const url = new URL(item.LinkDetalle, "https://catalogo2020dev.serviciosmovistar.com");
    return `
    <div class="relative group">
    <div class="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 h-32 py-2 opacity-90 group-hover:opacity-100 transition-all lg:h-52">
      <img src="${item.Imagen}" alt="" class="w-auto mx-auto h-full lg:h-full">
    </div>
    <div class="flex justify-between mt-4">
      <div>
        <h3 class="text-md text-gray-700">
          <a href="${url}" target="_blank">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${item.Marca} ${item.Modelo}
          </a>
        </h3>
        <p class="mt-1 text-sm text-gray-500">${item.TextoColor}</p>
      </div>
      <p class="text-md font-medium text-gray-900"><small>S/</small>${item.PrecioTotal || item.PrecioContado.toFixed(2)}</p>
    </div>
  </div>`;
  }

  buildPhones() {
    const domEquipos = document.querySelector("#equiposApi");
    const data = this.fetchedData;
    let items = "";
    data.forEach((item) => {
      items += this.phoneTemplate(item);
    });
    domEquipos.innerHTML = items;
  }

  init() {
    this.getRequest();
  }
}

// Crear objeto(instancia) de clase EquiposAPI
const equiposAPI = new EquiposAPI();
console.log(equiposAPI);

// Inicializamos la funcion init - mostrar en el DOM
equiposAPI.init();
