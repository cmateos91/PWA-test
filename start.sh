#!/bin/bash

echo "🚀 Iniciando servidor PWA..."
echo ""
echo "Selecciona una opción:"
echo "1) Node.js (si tienes Node instalado)"
echo "2) Python 3 (si tienes Python 3)"
echo "3) Python 2 (si tienes Python 2)"
echo ""
read -p "Opción (1-3): " option

case $option in
    1)
        echo "Iniciando con Node.js..."
        node server.js
        ;;
    2)
        echo "Iniciando con Python 3..."
        python -m http.server 8000
        ;;
    3)
        echo "Iniciando con Python 2..."
        python -m SimpleHTTPServer 8000
        ;;
    *)
        echo "Opción no válida"
        exit 1
        ;;
esac