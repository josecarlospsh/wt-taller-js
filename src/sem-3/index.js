/**
 * Semana 3 - JavaScript
 * Funciones
 */

// Funciones declarativas - function fn() {...}
function foo() {
  return "Funcion foo";
}
foo(); // llamar a la funcion foo
// console.log("foo:", foo()); // mostrar resultado funcion foo = "Funcion foo"

var bar = foo(); // guardar el resultado en una variable
// console.log("bar:", bar); // mostrar resultado que se asigno a la variable bar

function showMyName(name) {
  if (name == "Jose") {
    console.log(`En casa me llaman ${name}`);
    return `En casa me llaman ${name}`;
  }
  //evitar usar else si se espera como sea un retorno de valor luego de no cumplir el if
  // else {
  // return `Afuera me llaman ${name}...`;
  // }
  console.log(`Afuera me llaman ${name}...`);
  return `Afuera me llaman ${name}...`;
}
// showMyName("Carlos");

// Uso de Arguments - es un objeto especial similar a un arreglo tiene indice y propiedad length, pero no tiene los metodos de un arreglo
function showNamesConcat(separator) {
  let result = ""; // inicia lista con los nombres concatenados
  // itera a través de arguments
  console.log("Argumentos:", arguments);
  for (let i = 1; i < arguments.length; i++) {
    result += arguments[i] + separator;
  }
  // console.log("Nombres concatenados:", result);
  return result;
}
// showNamesConcat(", ", "Jose", "Carlos", "Luis");

// Parametros por defecto en funciones
function multiplyNumbers(a, b = 1) {
  // otras formas de darle valor por defecto
  //b = b || 1; //Si -> b: 0, false, null, undefined, NaN, asigna el valor 1
  // if (b === undefined) b = 1;
  // console.log(`Multiply: ${a} x ${b} = ${a * b}`);
  return a * b;
}
multiplyNumbers(2); // enviando solo un argumento - a
multiplyNumbers(2, 3); // enviando los dos argumentos - a y b

// ☼ Nullish Coalescing Operator - Operador de coalesción de nulos
function showCount(count) {
  count = count ?? "unknown"; // Si -> count: undefined o null, asigna el texto "unknown"
  // console.log("ShowCount: ", count);
  return count;
}
showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown

// Uso de la palabra new Fn() - crear una instancia(objeto) de una funcion como constructor
function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
  // console.log("this Person:", this);
}

let jose = new Person("Jose Perez", 33, "M");
let luis = new Person("Luis Salas", 39, "M");
// console.log(jose, luis);

function Car(name, year, owner) {
  //Crear un objeto con los atributos establecidos
  // console.log("New target:", new.target);
  // if (!new.target) {
  //   throw "La funcion Car no puede ser llamada sin el constructor new";
  // }
  this.name = name;
  this.year = year;
  this.owner = owner;
  // console.log("This Car:", this);
}
let toyota = new Car("Toyota", 2022, jose);
let honda = new Car("Honda", 2020, luis);
// console.log(toyota, honda);

Car.prototype.color = "color original"; // Crea una propiedad a todos los objeto instanciados con el constructor
// console.log("Toyota color:", toyota.color);
toyota.color = "negro"; // modificar el valor de la propiedad color
// console.log("Toyota cambio color:", toyota.color);
// console.log(Object.getPrototypeOf(toyota).color);

// Uso de Apply, Call y Bind
let cat = { type: "Gato", sound: "Meow" };
let dog = { type: "Perro", sound: "Woof" };

// Declaramos la funcion de expresion que mostrara "Como dice..."
const say = function (question) {
  console.log(this);
  question = question || "Como dice el " + this.type + "?";
  console.log("Pregunta:", question);
  console.log("Respuesta:", this.type + " dice " + this.sound);
};
// say(cat); // Como dice el Gato - undefined

// Vinculamos el this(propiedades) a la funcion
// say.call(cat);
// say.apply(dog, ["Como dice el perroo?"]);
// let sayBinding = say.bind(cat, "Como dice el gato?");
// sayBinding();

// Funciones Expresion - const fn = function() {...};
const nameUser = function (name) {
  // console.log("Mi nombre es: " + name);
  return "Mi nombre es: " + name;
};
const res = nameUser("Jose");
// console.log(res);

// Usos de funciones Expresion
// 1. Pasar funcion como argumento de una funcion
function loopNumbers(numbers, fn) {
  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    result[i] = fn(numbers[i]);
  }
  return result;
}

function fn(number) {
  return number * 2;
}

let numbers = [1, 2, 3, 4, 5];
let multiplyBy2 = loopNumbers(numbers, fn);
// console.log("MultiplyBy2:", multiplyBy2);

// Si declaramos una funcion de expresion despues de la llamada a la funcion - No funcionara
// const fn = function (number) {
//   return number * 2;
// };

// IIFE - Immediately Invoked Function Expression | Funcion Autoejecutable
(function () {
  var hello = "Hello World1";
  // console.log("IIFE 1 - variable:", hello);
  return "Hello World1";
})();
// console.log("IIFE 1:", hello);

var hello = (function () {
  // console.log("IIFE 2 - variable:", hello);
  return "Hello World2";
})();
// console.log("IIFE 2:", hello);

// Funciona calculadora - suma, multiplicacion
const calculator = (function () {
  function add(a, b) {
    return a + b;
  }

  function multiply(a, b) {
    return a * b;
  }
  return {
    add,
    multiply,
  };
})();
const sum = calculator.add(2, 4);
console.log("Suma:", sum);
const mul = calculator.multiply(3, 5);
console.log("Multiplicacion:", mul);

// Funciones feclas - siempre son anonimas y NO tiene this, arguments, super o new.target.
const getEquipos = () => {
  const equipos = ["Xiaomi", "Samsung", "Nokia", "Apple"];
  // console.log(this, arguments, new.target);
  console.log("Lista de equipos:", equipos);
  return equipos;
};
const ff = () => "Funcion flecha";
// getEquipos();

// Hoisting - mecanismo javascript sobre el contexto de ejecucion de las funciones y variables declaradas | no funcionan en funciones expresion
getNumbers();

function getNumbers() {
  const numbers = ["1", "2", "3", "4", "5"];
  // console.log("Lista de numeros:", numbers);
  return numbers;
}
// const getNumbers = function () {
//   const numbers = ["1", "2", "3", "4", "5"];
//   console.log(this, arguments, new.target);
//   console.log("Lista de numeros:", numbers);
//   return numbers;
// };

// Closures - proteger acceso a variables privadas
function createMessage(tipo, estilos) {
  return function message(str) {
    console.log(`%c ${tipo}: ${str} `, estilos);
  };
}

const error = createMessage("Error", "background: red; color: white;");
const warning = createMessage("Warning", "background: orange; color: white;");
const exito = createMessage("Éxito", "background: green; color: white;");

// error("Error al cargar la pagina");
// warning("La pagina se esta cargando");
// exito("La pagina se cargó correctamente");

// Callbacks - funcion que es pasada como argumento a una funcion para que sea ejecutada en la funcion de orden superior
function sendRequest(request, fn) {
  setTimeout(function () {
    let response = request + "- Si se encontro!";
    fn(response);
  }, 2000);
}

function getResponse(response) {
  console.log("Respuesta del servidor: " + response);
}

// sendRequest("Existen equipos ", getResponse);

/**
 * Objetos
 */

// Objeto literal
let obj2 = {};

let objA = {
  id: 1,
  data: "",
  inputs: [],
  setInputs: function (data) {
    this.inputs = data;
  },
};
objA.setInputs(["1", "2", "3"]);
objA.id = 2;
objA["prop"] = "prop1";
// console.log("ObjA:", objA);

// Objeto con constructor
let objB = new Object();
objB.id = 1;
objB.data = "";
objB.inputs = [];
objB.setInputs = function (data) {
  this.inputs = data;
};
// objB.setInputs(["2", "4", "6"]);

// console.log("ObjB:", objB, "id" in objB);

// Objeto con metodos - funciones
let objC = {
  id: 1,
  data: "",
  inputs: [],
  setInputs: function (data) {
    this.inputs = data;
  },
};
// console.log(Object.values(objC));

// for (const key in objC) {
//   if (objC.hasOwnProperty(key)) {
//     console.log(`propiedad: ${key} - valor: ${objC[key]}`);
//   }
// }
// console.log("ObjC:", objC);

// Objeto con propiedades computadas
let equipo = "apple";

let obj4 = {
  [equipo]: 899,
};
// console.log(`propiedad computada: ${equipo} - valor: ${obj4[equipo]}`);

// Copiar objetos - Object.assign
let user = { name: "Jose", canEdit: true };

let permissions1 = { canView: true };
let permissions2 = { canEdit: false };

// copia todas las propiedades desde permissions1 y permissions2 en user
Object.assign(user, permissions1, permissions2);
// console.log(user);

// object.values() - devuelve un array con todas los valores de las propiedades
// console.log(Object.values(user));

// object.keys() - devuelve un array con todas las propiedades de un objeto
// console.log(Object.keys(user));

// optional chaining operator en objetos - obj.prop?.
let fob = { someFooProp: "hola" };

// console.log(fob.someFooProp?.toUpperCase() ?? "No disponible"); // "HOLA"
// console.log(fob.someBarProp?.toUpperCase() ?? "No disponible"); // "No disponible"
