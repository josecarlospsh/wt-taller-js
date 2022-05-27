/**
 * Semana 2 - JavaScript
 * Promises
 */

// Arreglo de equipos - local
let equiposAr = [
  {
    Marca: "Xiaomi",
    Modelo: "Redmi 9A",
    LinkDetalle: "/xiaomi-redmi-9a",
    EstadoEspecial: 1,
    NroCuotas: 0,
    PrecioOfertaContado: 359,
    PrecioContado: 399,
    IdPlan: 331,
    PrecioPlan: 55.9,
    NombrePlan: "Plan Ilimitado Mi Movistar S/55.90",
    Imagen: "https://catalogo2020dev.serviciosmovistar.com/ArchivosUsuario/ImagenEquipo/redmi-9a_78545845_Big_Imagen.png",
    CodigoProducto: "1-26-1-2-1-604-331-0-1",
    IdColor: 1,
    TextoColor: "Negro",
    IdEquipo: 604,
    Stock: 6,
    Orden: 1,
  },
  {
    Marca: "Xiaomi",
    Modelo: "Redmi Note 11",
    LinkDetalle: "/xiaomi-redmi-note-11",
    EstadoEspecial: 1,
    NroCuotas: 0,
    PrecioOfertaContado: 769,
    PrecioContado: 839,
    IdPlan: 331,
    PrecioPlan: 55.9,
    NombrePlan: "Plan Ilimitado Mi Movistar S/55.90",
    Imagen: "https://catalogo2020dev.serviciosmovistar.com/ArchivosUsuario/ImagenEquipo/redmi-note-11_78545850_Big_Imagen.png",
    CodigoProducto: "1-26-1-2-1-660-331-0-1",
    IdColor: 1,
    TextoColor: "Negro",
    IdEquipo: 660,
    Stock: 10,
    Orden: 2,
  },
  {
    Marca: "Samsung",
    Modelo: "Galaxy Z Fold 3",
    LinkDetalle: "/samsung-galaxy-z-fold-3",
    EstadoEspecial: 1,
    NroCuotas: 0,
    PrecioOfertaContado: 7059,
    PrecioContado: 7059,
    IdPlan: 334,
    PrecioPlan: 69.9,
    NombrePlan: "Plan Ilimitado Mi Movistar S/69.90",
    Imagen: "https://catalogo2020dev.serviciosmovistar.com/ArchivosUsuario/ImagenEquipo/galaxy-z-fold-3_78545713_Big_Imagen.png",
    CodigoProducto: "1-26-1-2-1-500-334-0-1",
    IdColor: 1,
    TextoColor: "Negro",
    IdEquipo: 500,
    Stock: 3,
    Orden: 3,
  },
  {
    Marca: "Samsung",
    Modelo: "Galaxy S22",
    LinkDetalle: "/samsung-galaxy-s22",
    EstadoEspecial: 1,
    NroCuotas: 0,
    PrecioOfertaContado: 3399,
    PrecioContado: 3399,
    IdPlan: 334,
    PrecioPlan: 69.9,
    NombrePlan: "Plan Ilimitado Mi Movistar S/69.90",
    Imagen: "https://catalogo2020dev.serviciosmovistar.com/ArchivosUsuario/ImagenEquipo/galaxy-s22_78545661_Big_Imagen.png",
    CodigoProducto: "1-26-1-2-1-538-334-0-1",
    IdColor: 1,
    TextoColor: "Negro",
    IdEquipo: 538,
    Stock: 5,
    Orden: 3,
  },
  {
    Marca: "Xiaomi",
    Modelo: "11T",
    LinkDetalle: "/xiaomi-11t",
    EstadoEspecial: 1,
    NroCuotas: 0,
    PrecioOfertaContado: 2369,
    PrecioContado: 2369,
    IdPlan: 331,
    PrecioPlan: 55.9,
    NombrePlan: "Plan Ilimitado Mi Movistar S/55.90",
    Imagen: "https://catalogo2020dev.serviciosmovistar.com/ArchivosUsuario/ImagenEquipo/xiaomi-11t_78545804_Big_Imagen.png",
    CodigoProducto: "1-26-1-2-1-634-331-0-1",
    IdColor: 1,
    TextoColor: "Gris",
    IdEquipo: 634,
    Stock: 7,
    Orden: 3,
  },
];
// equiposAr = [];

// Promise | metodos para obtener resultado - then, catch y finally | tres estados de la promesa - pending, fullfilled, rejected
const promise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    if (equiposAr.length > 0) {
      resolve(equiposAr);
    } else {
      reject("No hay equipos disponibles");
    }
  }, 2000);
});

promise
  .then(function (equipos) {
    console.log("promise - Then:", equipos);
  })
  .catch(function (error) {
    console.log("promise - Catch:", error);
  })
  .finally(function () {
    console.log("Finally - exitoso o rechazado se ejecuta");
  });

// Funcion para obtener equipos de la API - promesas
const promiseWithFetch = new Promise(function (resolve, reject) {
  //Cabeceras de la peticion - headers
  const headers = {
    method: "GET",
    mode: "no-cors",
    headers: { "Content-type": "application/json" },
  };
  // const request = new Request("https://apimocha.com/equipos-mov/equipos", headers);
  fetch("https://retoolapi.dev/QuV3RJ/equipos", headers)
    .then((response) => response.json())
    .then(function (equipos) {
      console.log("Fetch:", equipos);
      resolve(equipos);
    })
    .catch(function (error) {
      console.log("Error - Fetch:", error);
      reject("No se pudo obtener equipos");
    });
});

promiseWithFetch
  .then(function (equipos) {
    console.log("promiseWithFetch - Then:", equipos);
  })
  .catch(function (error) {
    console.log("promiseWithFetch - Catch:", error);
  });

// Funcion para obtener equipos de la API - promesas
function obtenerEquiposAPIpromise() {
  const res = new Promise((resolve, reject) => {
    const optionsGet = {
      method: "GET",
      mode: "no-cors",
      headers: { "Content-type": "application/json" },
    };
    fetch("https://retoolapi.dev/QuV3RJ/equipos")
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  console.log("Fetching Promise:", res);
  return res; //Retonar la promesa
}

function initWithPromise() {
  obtenerEquiposAPIpromise()
    .then((data) => {
      console.log("Response - initWithPromise", data);
    })
    .catch((error) => {
      console.log("Error - initWithPromise", error);
    });
}

//Iniciamos las funciones
initWithPromise();

// Funcion para buscar un equipo en la lista de equipos
function buscarEquipo(id) {
  return new Promise(function (resolve, reject) {
    // Obtenemos los datos de la API
    fetch(`https://retoolapi.dev/P0RUs9/equipos/${id}`)
      .then((response) => response.json())
      .then(function (equipo) {
        // console.log("Equipo  - buscarEquipo", equipo);
        resolve(equipo);
      })
      .catch(function (error) {
        // console.log("Error - buscarEquipo", error);
        reject("No se pudo obtener equipo - buscarEquipo");
      });
  });
}
// Obtenemos resultado de la promesa - buscarEquipo
buscarEquipo(4)
  .then(function (equipo) {
    console.log("Datos de Equipo:", equipo);
  })
  .catch((error) => {
    console.log("Hubo un error:", error);
  });

// Promise.resolve
const promiseResolve = Promise.resolve("Promise Resolve - Exitoso");
// console.log(promiseResolve);
promiseResolve.then((data) => {
  console.log(data);
});

// Promise.reject
const promiseReject = Promise.reject("Promise Reject - Error");
// console.log(promiseReject);
promiseReject.catch((error) => {
  console.log(error);
});

// Funcion convertida a promesa sin async await
function obtenerEquiposSinAsync(equipos) {
  if (equipos.length > 0) {
    return Promise.resolve(equipos);
  } else {
    return Promise.reject("No hay equipos disponibles");
  }
}

// Obtenemos resultado de la promesa con then y catch - obtenerEquiposSinAsync
obtenerEquiposSinAsync(equiposAr)
  .then((data) => {
    console.log("Then:", data);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// Obtenemos resultado de la promesa con async await - obtenerEquiposSinAsync
async function initWithAsync(equipos) {
  try {
    const res = await obtenerEquiposSinAsync(equipos);
    console.log("Async:", res);
  } catch (error) {
    console.log(error);
  }
}

//Iniciamos las funciones
initWithAsync(equiposAr);

// Promises - metodos
const promise1 = Promise.reject("Promesa rechazada 0");
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, "Promesa Resuelta 1 - mas rapido"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "Promesa Resuelta 2 - lenta"));

// Promise.any - retorna el valor de la promesa que se ha resuelto(resolve) mas rapido
Promise.any([promise1, promise2, promise3])
  .then((value) => {
    console.log("Any:", value);
  })
  .catch((error) => {
    console.log("Error-Any:", error);
  });

// Promise.race - retorna una promesa con el valor de la promesa que tan pronto se ha resuelto o rechazado, no importa si se resuelve o no
Promise.race([promise1, promise2, promise3])
  .then((value) => {
    console.log("Race:", value);
  })
  .catch((error) => {
    console.log("Error-Race:", error);
  });

// Promise.all - retorna una promesa en forma de array con los valores de cada promesa que se pasaron como argumento solo si se han resuelto
Promise.all([promise2, promise3])
  .then((value) => {
    console.log("All:", value);
  })
  .catch((error) => {
    console.log("Error-All:", error);
  });

// Promise.allSettled - retorna una promesa en forma de array de objeto cada una de las promesas en el argumento se han resuelto o rechazado
Promise.allSettled([promise1, promise2, promise3]).then((value) => {
  console.log("AllSettled:", value);
});

/**
 * Async - Await
 */
// Funcion para obtener equipos de la API - Async Await
async function obtenerEquiposAPIasync() {
  try {
    const headerFetch = {
      method: "GET",
      // mode: "no-cors",
      headers: { "Content-type": "application/json" },
    };
    const res = await fetch("https://retoolapi.dev/QuV3RJ/equipos", headerFetch); // obtenemos los equipos
    const data = await res.json(); // convertir el resultado  a json
    // console.log("Fetching Async:", data); // mostramos en consola los datos
    return data; // retornamos el objeto con los equipos
  } catch (error) {
    const er = new Error("Error - obtenerEquiposAPIasync");
    console.log(error);
  }
}

// Funcion donde se hara el llamado de la funcion asincrona
async function initWithAsyncAwait() {
  // console.log("Response - initWithAsyncAwait", res1);
  try {
    const res = await obtenerEquiposAPIasync();
    console.log("Response - initWithAsyncAwait", res);
  } catch (error) {
    console.log("Error - initWithAsyncAwait", error);
  }
}

//Iniciamos las funciones
initWithAsyncAwait();

/**
 * Manipulacion de peticiones asincronas HTTP - GET, POST, PUT, PATCH, DELETE... - retorna una promesa
 * Fetch - Axios | alternativa a ajax
 * 
 * $.ajax({
    url: endpoint,
    method: "POST",
    dataType: "json",
    data: data,
  })
    .done((response) => {
      console.log(response);
    })
    .fail(function(err) {
      console.log(err);
    });
 */

// Axios - https://github.com/axios/axios
// const axios = require("axios").default;
import axios from "axios";

// config por defecto para toda peticion o solicitud
axios.defaults.baseURL = "https://api.example.com";
axios.defaults.headers.get["Content-Type"] = "application/json";
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

// Agregamos interceptor a la peticion
axios.interceptors.request.use(
  function (config) {
    // hacer algo antes de enviar la peticion
    console.log("Interceptor Request", config);
    return config;
  },
  function (error) {
    // hacer algo si la peticion falla
    return Promise.reject(error);
  }
);

// Agregamos interceptor a la respuesta
axios.interceptors.response.use(
  function (response) {
    // 2xx
    console.log("Interceptor Response", response);
    return response;
  },
  function (error) {
    // 4xx
    return Promise.reject(error);
  }
);

// Con axios - convierte la respuesta en un objeto javascript -
const headerAxios = {
  method: "get",
  headers: { "Access-Control-Allow-Origin": "*" },
  withCredentials: false,
  "Content-type": "application/json",
};

axios
  .get("https://retoolapi.dev/QuV3RJ/equipos", headerAxios)
  .then((response) => {
    console.log("Axios:", response.data);
  })
  .catch((error) => {
    console.log("Error Axios", error);
  });

// Fetch - https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch
const headerFetch = {
  method: "GET",
  // mode: "no-cors",
  // headers: { "Content-type": "application/json" },
};
fetch("https://retoolapi.dev/QuV3RJ/equipos", headerFetch)
  .then((response) => response.json())
  .then((data) => {
    console.log("Fetch:", data);
  })
  .catch((error) => {
    console.log("Error Fetch", error);
  });
