document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector("form");
  const formularioCompra = document.getElementById('formulario-compra');
  const pasarelaSimulada = document.getElementById('pasarela-simulada');
  const pagoStatus = document.querySelector('.status-info');

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); 
      
      const formData = new FormData(form);
      console.log("Datos del formulario a enviar:", Object.fromEntries(formData.entries()));

      // Añade una pequeña animación antes de ocultar el formulario
      formularioCompra.style.opacity = '0';
      setTimeout(() => {
        formularioCompra.classList.add('oculto');
        pasarelaSimulada.classList.remove('oculto');
        pasarelaSimulada.style.opacity = '1';
      }, 300); // Coincide con la duración de la transición CSS
    });
  }

  window.simularPago = (estado) => {
    pagoStatus.textContent = `Procesando pago...`;
    
    setTimeout(() => {
      if (estado === 'exitoso') {
        pagoStatus.textContent = '¡Pago exitoso! Redirigiendo...';
        alert('¡Tu pago ha sido procesado con éxito!');
      } else {
        pagoStatus.textContent = 'Pago fallido. Inténtalo de nuevo.';
        alert('Hubo un problema con el pago. Por favor, inténtalo de nuevo.');
        
        // Vuelve a mostrar el formulario con una transición
        pasarelaSimulada.style.opacity = '0';
        setTimeout(() => {
          pasarelaSimulada.classList.add('oculto');
          formularioCompra.classList.remove('oculto');
          formularioCompra.style.opacity = '1';
        }, 300);
      }
    }, 2000);
  };
});