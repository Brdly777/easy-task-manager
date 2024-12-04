// Registrar Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service Worker registrado'))
      .catch(err => console.error('Error registrando Service Worker:', err));
  }
  
  // Solicitar permiso para notificaciones
  document.querySelector('.notification-btn').addEventListener('click', () => {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('Byke Energy', {
          body: '¡Has generado un nuevo récord de energía!',
          icon: '/icon.png'
        });
      }
    });
  });
  