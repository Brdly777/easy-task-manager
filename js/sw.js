// Instalación y caché
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("byke-energy-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/css/styles.css",
        "/js/script.js",
        "icons/icon-192x192.png",
        "icons/icon-512x512.png",
        "icons/battery.png",
      ]);
    })
  );
  console.log("Service Worker instalado.");
});

// Activación del Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker activado.");
});

// Fetch para servir desde el caché
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Manejo de eventos de notificación
self.addEventListener("notificationclick", (event) => {
  console.log("Notificación clickeada:", event.notification);

  event.notification.close(); // Cierra la notificación al hacer clic

  // Redirige al usuario a una URL específica
  event.waitUntil(
    clients.openWindow("/index.html") // Cambia la URL según sea necesario
  );
});
