if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("js/sw.js")
      .then((registration) => {
        console.log("Service Worker registrado con éxito:", registration);
      })
      .catch((error) => {
        console.error("Error al registrar el Service Worker:", error);
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notificaciones permitidas.");
      } else {
        console.warn("El usuario denegó las notificaciones.");
      }
    });
  }
});

if ("Notification" in window) {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      new Notification("Bienvenido de vuelta!", {
        body: "Estado de la bateria: 77%",
        icon: "icons/battery.png",
      });
    } else {
      console.warn("Permisos no concedidos para notificaciones.");
    }
  });
} else {
  console.error("El navegador no soporta notificaciones.");
}

// Contar notificaciones
let notificationCount = 1;

// Selecciona el botón
const notificationsBtn = document.querySelector(".notifications-btn");

// Maneja el clic del botón
notificationsBtn.addEventListener("click", () => {
  // Verifica si las notificaciones están soportadas en el navegador
  if ("Notification" in window) {
    // Solicita permisos si aún no han sido concedidos
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          enviarNotificacion();
        } else {
          console.warn("Permisos no concedidos para notificaciones.");
        }
      });
    } else if (Notification.permission === "granted") {
      enviarNotificacion();
    } else {
      console.warn("Permisos no concedidos para notificaciones.");
    }
  } else {
    console.error("El navegador no soporta notificaciones.");
  }
});

// Función para enviar la notificación
function enviarNotificacion() {
  new Notification("Notificaciones", {
    body: `Tienes ${notificationCount} nuevas notificaciones.`,
    icon: "icons/notification.png", // Ruta del icono
  });

  // Incrementa el contador para simular nuevas notificaciones
  notificationCount++;
}

// Boton menu
const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");

// Añadir evento para mostrar/ocultar el menu al hacer clic en el botón
menuBtn.addEventListener("click", () => {
  if (menu.style.display === "block") {
    menu.style.display = "none"; // Ocultar el menu
  } else {
    menu.style.display = "block"; // Mostrar el menu
  }
});
