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

      const tarjeta = document.getElementById("tarjeta").
