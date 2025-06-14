let deferredPrompt;
const installBtn = document.getElementById('installBtn');
const iosInstallBtn = document.getElementById('iosInstallBtn');

const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
const isInStandaloneMode = () => ('standalone' in navigator) && navigator.standalone;

if (isIos() && !isInStandaloneMode()) {
    iosInstallBtn.hidden = false;
}

iosInstallBtn.addEventListener('click', () => {
    alert('Para instalar la app, abre el menú de compartir y elige "Agregar a pantalla de inicio".');
});

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.hidden = false;
});

installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    console.log('User choice', result);
    deferredPrompt = null;
    installBtn.hidden = true;
});

window.addEventListener('appinstalled', () => {
    console.log('App installed');
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(() => console.log('Service Worker registered'))
            .catch((err) => console.log('SW registration failed', err));
    });
}
