// script.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Capturar los datos del formulario
      const formData = new FormData(form);

      // Enviar a Formspree
      fetch("https://formspree.io/f/xkgvlbgr", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // Redirigir a la página "Procesando"
            window.location.href = "procesando.html";
          } else {
            alert("Hubo un error al enviar el formulario. Inténtalo de nuevo.");
          }
        })
        .catch(() => {
          alert("Error de conexión. Verifica tu internet.");
        });
    });
  }
});
