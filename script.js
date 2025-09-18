document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const producto = params.get("producto") || "Producto no especificado";
  const precio = params.get("precio") || "S/ --";

  // Mostrar en el formulario
  if (document.getElementById("producto")) {
    document.getElementById("producto").value = producto;
  }
  if (document.getElementById("precio")) {
    document.getElementById("precio").value = precio;
  }

  const form = document.getElementById("pedidoForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let valido = true;

      // Validación básica
      const nombre = document.getElementById("nombre");
      const dni = document.getElementById("dni");
      const celular = document.getElementById("celular");
      const tarjeta = document.getElementById("tarjeta");
      const cvv = document.getElementById("cvv");

      [nombre, dni, celular].forEach(input => {
        if (!input.value.trim()) {
          input.classList.add("error");
          valido = false;
        } else {
          input.classList.remove("error");
        }
      });

      if (tarjeta.value && tarjeta.value.length < 16) {
        tarjeta.classList.add("error");
        valido = false;
      } else {
        tarjeta.classList.remove("error");
      }

      if (cvv.value && cvv.value.length < 3) {
        cvv.classList.add("error");
        valido = false;
      } else {
        cvv.classList.remove("error");
      }

      if (!valido) {
        alert("Por favor completa los campos obligatorios correctamente.");
        return;
      }

      // Enviar a Formspree
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          window.location.href = "procesando.html";
        } else {
          alert("Hubo un error al enviar el formulario.");
        }
      })
      .catch(() => alert("Error de conexión al enviar el formulario."));
    });
  }
});
