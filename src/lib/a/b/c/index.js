const secretMessage = () => {
  const jcpsh = document.createElement("div");
  jcpsh.setAttribute("id", "jcpsh");
  jcpsh.classList.add("fixed", "top-3/4", "left-2");
  jcpsh.innerHTML = `<a class="block text-gray-100 text-xs cursor-crosshair" title="Me encontraste 😁" href="https://jcpsh.xyz">JCPSH</a>`;
  document.body.appendChild(jcpsh);
};

window.addEventListener("load", (event) => {
  secretMessage();
});
