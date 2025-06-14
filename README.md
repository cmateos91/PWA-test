# PWA Test - Instrucciones de Configuración

## ✅ Lo que ya tienes implementado:

1. **index.html** - Con todos los meta tags necesarios para PWA
2. **manifest.json** - Configuración de la PWA
3. **sw.js** - Service Worker para hacer la app instalable
4. **app.js** - Lógica para manejar la instalación
5. **style.css** - Estilos mejorados

## 📋 Lo que necesitas hacer:

### 1. Generar los iconos
Necesitas crear iconos en varios tamaños. Puedes usar herramientas online como:
- https://www.pwabuilder.com/imageGenerator
- https://realfavicongenerator.net/

Sube una imagen de 512x512px y genera los siguientes tamaños:
- 72x72.png
- 96x96.png
- 128x128.png
- 144x144.png
- 152x152.png
- 192x192.png
- 384x384.png
- 512x512.png

Coloca todos los iconos en la carpeta `/icons/`

### 2. Configurar HTTPS
Las PWAs requieren HTTPS para funcionar. Opciones:
- **Desarrollo local**: Usa `http-server` con certificado SSL
- **Producción**: Despliega en servicios como Netlify, Vercel o GitHub Pages

### 3. Probar la instalación

#### En Android:
1. Abre la web en Chrome
2. Espera unos segundos
3. Aparecerá el botón "Instalar App"
4. Click y seguir las instrucciones

#### En iOS:
1. Abre la web en Safari
2. Toca el botón compartir (cuadrado con flecha)
3. Selecciona "Añadir a pantalla de inicio"
4. Dale un nombre y toca "Añadir"

## 🚀 Ejecutar el proyecto localmente:

### Opción 1: Con Python (si lo tienes instalado)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Opción 2: Con Node.js
```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar
http-server -p 8000
```

### Opción 3: Con Live Server de VS Code
Si usas VS Code, instala la extensión "Live Server" y haz click derecho en index.html → "Open with Live Server"

## 🔍 Verificar que todo funciona:

1. Abre las DevTools de Chrome (F12)
2. Ve a la pestaña "Application"
3. En el menú lateral, verifica:
   - **Manifest**: Debe mostrar tu configuración
   - **Service Workers**: Debe mostrar sw.js activo
   - **Storage**: Verifica el cache

## 📱 Características implementadas:

- ✅ Instalable en Android
- ✅ Añadible a pantalla de inicio en iOS
- ✅ Funciona offline (caché básico)
- ✅ Detecta si ya está instalada
- ✅ Muestra instrucciones específicas para iOS
- ✅ Responsive design
- ✅ Tema personalizado

## 🛠️ Personalización:

Puedes modificar:
- **manifest.json**: Nombre, colores, orientación
- **sw.js**: Estrategia de caché
- **style.css**: Diseño y colores
- **app.js**: Comportamiento de instalación