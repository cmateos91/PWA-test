//variables globales
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
const iosInstructions = document.getElementById('iosInstallInstructions');
const installStatus = document.getElementById('installStatus');

//debug info
console.log('PWA Script cargado');
console.log('User Agent:', navigator.userAgent);
console.log('HTTPS:', location.protocol === 'https:');
console.log('Service Worker soportado:', 'serviceWorker' in navigator);

//detectar si es ios
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

//detectar si ya está instalado en ios
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

//registrar service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registrado:', registration);
        showStatus('Service Worker registrado correctamente', 'success');
      })
      .catch(error => {
        console.log('Error al registrar Service Worker:', error);
        showStatus('Error al registrar Service Worker', 'error');
      });
  });
}

//manejar el evento beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('Evento beforeinstallprompt detectado!');
  //prevenir el mini-infobar
  e.preventDefault();
  //guardar el evento para usarlo después
  deferredPrompt = e;
  //mostrar el botón de instalación
  showInstallButton();
});

//función para mostrar el botón de instalación
function showInstallButton() {
  if (isIos()) {
    //en ios mostramos las instrucciones
    if (!isInStandaloneMode()) {
      iosInstructions.style.display = 'block';
    } else {
      showStatus('La app ya está instalada', 'info');
    }
  } else {
    //en android/desktop mostramos el botón
    installBtn.style.display = 'inline-flex';
  }
}

//manejar click en el botón de instalación
installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) {
    showStatus('La app ya está instalada o no es compatible', 'info');
    return;
  }
  
  //mostrar el prompt
  deferredPrompt.prompt();
  
  //esperar la respuesta del usuario
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    showStatus('¡Gracias por instalar la app!', 'success');
  } else {
    showStatus('Instalación cancelada', 'info');
  }
  
  //limpiar el prompt
  deferredPrompt = null;
  installBtn.style.display = 'none';
});

//detectar cuando la app se instala
window.addEventListener('appinstalled', () => {
  showStatus('¡App instalada correctamente!', 'success');
  installBtn.style.display = 'none';
  deferredPrompt = null;
});

//función para mostrar mensajes de estado
function showStatus(message, type) {
  installStatus.textContent = message;
  installStatus.className = `status ${type}`;
  
  //ocultar después de 5 segundos
  setTimeout(() => {
    installStatus.textContent = '';
    installStatus.className = 'status';
  }, 5000);
}

//verificar si la app puede ser instalada al cargar
window.addEventListener('load', () => {
  //si es ios y no está en modo standalone
  if (isIos() && !isInStandaloneMode()) {
    iosInstructions.style.display = 'block';
  }
  
  //verificar si ya está instalada (para navegadores que lo soporten)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    showStatus('La app está ejecutándose en modo standalone', 'info');
  }
});

//función para forzar mostrar el botón (debug)
function forceShowInstall() {
  console.log('Forzando visualización del botón...');
  if (isIos()) {
    iosInstructions.style.display = 'block';
    showStatus('Mostrando instrucciones para iOS', 'info');
  } else {
    installBtn.style.display = 'inline-flex';
    showStatus('Botón mostrado (modo debug)', 'warning');
  }
}