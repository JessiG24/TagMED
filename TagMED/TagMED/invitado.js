
// script para que el usuario pueda buscar en el contenido de la página
const buscar = document.getElementById("buscar");
const mensaje = document.getElementById("sinResultados"); // ✅


buscar.addEventListener("input", filtrarContenido);

function filtrarContenido() {
  const input = buscar.value.toLowerCase();
  const secciones = document.querySelectorAll(".seccion-buscable");
  let coincidencias = 0;

  secciones.forEach((seccion) => {
    const elementos = seccion.querySelectorAll("a");
    let visible = false;

    elementos.forEach((el) => {
      const texto = el.innerText.toLowerCase();
      if (texto.includes(input)) {
        el.style.display = "block";
        visible = true;
        coincidencias++;
      } else {
        el.style.display = "none";
      }
    });

    seccion.style.display = visible ? "block" : "none";
  });

  if (input === "") {
    mensaje.style.display = "none";
  } else {
    mensaje.style.display = coincidencias === 0 ? "block" : "none";
  }
}
