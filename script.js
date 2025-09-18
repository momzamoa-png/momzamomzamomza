document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario-compra");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita el envío tradicional

    let valido = true;

    // Validar campos
    form.querySelectorAll("input[required]").forEach(input => {
      if (!input.value.trim()) {
        input.classList.add("error");
        valido = false;
      } else {
        input.classList.remove("error");
      }
    });

    if (!valido) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Enviar datos a Formspree
      const formData = new FormData(form);
      const response = await fetch("https://formspree.io/f/mnnbkeaj", {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        // Redirigir a tu página
        window.location.href = "procesando.html";
      } else {
        alert("Error al enviar el formulario. Intenta nuevamente.");
      }
    } catch (err) {
      alert("Ocurrió un error al conectar con el servidor.");
    }
  });
});

