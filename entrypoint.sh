#!/bin/sh

echo "📦 Generando archivo public/env.js con variables de entorno..."
echo "window.env = {" > /app/public/env.js
echo "  API_BASE_URL: \"${NEXT_PUBLIC_API_BASE_URL}\"" >> /app/public/env.js
echo "};" >> /app/public/env.js
echo "✅ Archivo public/env.js generado con:"
cat /app/public/env.js

exec "$@"
