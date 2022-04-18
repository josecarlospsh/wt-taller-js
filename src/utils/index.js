export const createButton = (el) => {
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
  button.setAttribute("aria-current", "marcas");
  button.textContent = el.Marca;
  button.addEventListener("click", el.onClick);
  return button;
};

export const createCard = (item) => {
  const card = `<div class="relative group">
    <div class="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 h-32 opacity-90 group-hover:opacity-100 transition-all lg:h-52">
      <img src="${item.Imagen}" alt="" class="w-auto mx-auto h-full lg:h-full">
    </div>
    <div class="flex justify-between mt-4">
      <div>
        <h3 class="text-md text-gray-700">
          <a href="#">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${item.Marca} ${item.Modelo}
          </a>
        </h3>
        <p class="mt-1 text-sm text-gray-500">${item.TextoColor}</p>
      </div>
      <p class="text-md font-medium text-gray-900"><small>S/</small>${item.PrecioContado}</p>
    </div>
  </div>`;
  return card;
};
