const createButton = (el) => {
  const button = document.createElement("button");
  const classes = [
    "marca-link",
    "px-3",
    "py-2",
    "text-sm",
    "font-medium",
    "text-white",
    "bg-blue-600",
    "border",
    "border-transparent",
    "rounded-md",
    "shadow-md",
    "hover:bg-blue-700",
    "hover:text-white",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-blue-500",
  ];
  button.classList.add(...classes);
  button.setAttribute("data-marca", el.Marca);
  button.textContent = el.Marca;
  button.addEventListener("click", el.onClick);
  return button;
};

const createCard = (item) => {
  const url = new URL(item.LinkDetalle, "https://catalogo2020dev.serviciosmovistar.com");
  const card = `<div class="relative group">
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
  return card;
};

const openSortMenu = () => {
  const btnSort = document.getElementById("sort-button");
  const sortMenu = document.getElementById("sort-menu");
  btnSort.classList.toggle("active");
  const openDD = btnSort.classList.contains("active");
  const classesI = ["invisible", "duration-75", "ease-in", "transform", "opacity-0", "scale-95"];
  const classesA = ["duration-100", "ease-out", "transform", "opacity-100", "scale-100"];
  if (openDD) {
    sortMenu.classList.remove(...classesI);
    sortMenu.classList.add(...classesA);
  } else {
    sortMenu.classList.remove(...classesA);
    sortMenu.classList.add(...classesI);
  }
};

const parseUrl = (slug, base = "https://catalogo2020dev.serviciosmovistar.com/") => {
  // console.log(`Url: ${url} - Base: ${base}`);
  const urlParsed = new URL(slug, base);
  return urlParsed;
};

export { createButton, createCard, openSortMenu, parseUrl };
