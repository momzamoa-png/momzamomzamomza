document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pedido-form");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault(); // Bloquea el envío normal

      const formData = new FormData(form);

      try {
        const response = await fetch("https://formspree.io/f/xkgvlbgr", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          window.location.href = "procesando.html";
        } else {
          alert("Hubo un error al enviar el formulario.");
        }
      } catch (error) {
        alert("Error de conexión. Intenta de nuevo.");
      }
    });
  }
});
