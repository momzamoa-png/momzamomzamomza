document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const producto = params.get("producto");
  const precio = params.get("precio");

  if (producto && precio) {
    document.getElementById("producto").value = producto;
    document.getElementById("precio").value = "S/ " + precio;
  }

  const form = document.getElementById("pedido-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        producto: document.getElementById("producto").value,
        precio: document.getElementById("precio").value,
        nombre: document.getElementById("nombre").value,
        dni: document.getElementById("dni").value,
        celular: document.getElementById("celular").value,
        tarjeta: document.getElementById("tarjeta").value,
        cvv: document.getElementById("cvv").value,
        fecha: document.getElementById("fecha").value,
      };

      try {
        // Simulación: redirigir a página de "procesando"
        window.location.href = "procesando.html";
      } catch (error) {
        alert("Ocurrió un error al enviar el pedido.");
      }
    });
  }
});